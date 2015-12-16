// JavaScript Document
/*********************************************************************/
/* Function: keyEvent												 */
/* Description: 遥控器按键处理函数									 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-11-11							 */
/*********************************************************************/
//document.onkeypress = keyEvent;
document.onkeydown = keyEvent;
var stopKeyStatus = false;		//按键锁定
function keyEvent(e) {
	var keyValue = e.which;
	//iPanel.ioctlWrite('printf', 'keyValue========zpj========='+keyValue+'\n');
	switch (keyValue) {
		case 213: //back(停止)
		case 8:
			returnMainPage();
			//keyBack();
			return (false);
			break;
		case 13: //Enter
			keyEnter();
			return (false);
			break;
		case 37: //left
			keyLeft();
			return (false);
			break;
		case 38: //up
			if (stopKeyStatus) {
				return;
			}
			keyUp();
			return (false);
			break;
		case 39: //right
			keyRight();
			return (false);
			break;
		case 40: //down
			if (stopKeyStatus) {
				return;
			}
			keyDown();
			return (false);
			break;
		case 1073741880:	//vol+
		//case 48:
			timeLengthUp();
			break;
		case 1073741884:	//vol-
		//case 49:
			timeLengthDown();
			break;
		case 415: //play/pause
			return (false);
			break;
		case 413: //stop
			return (false);
			break;
		case 403:	//red
			changePointerTimeout();
			return (false);
			break;
		default:
			return (-1);
			break;
	}
	return;
}

/*********************************************************************/
/* Function: returnMainPage											 */
/* Description: 返回特效页面										 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-11-11							 */
/*********************************************************************/
function returnMainPage() {
	var returnHref = document.location.href.split("?");
	if (returnHref.length == 1) {
		document.location.href = "show.html";
	} else {
		document.location.href = "show.html?"+returnHref[1]+"?"+returnHref[2];
	}
	return;
}

/*********************************************************************/
/* Function: keyEnter												 */
/* Description: keyEnter按键处理										 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-11-11							 */
/*********************************************************************/
function keyEnter() {
	return;
}

/*********************************************************************/
/* Function: keyLeft												 */
/* Description: keyLeft按键处理										 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-11-11							 */
/*********************************************************************/
function keyLeft() {
	if (focusPosition == 0) {
		if (folderFocus == 0) {
			return;
		}
		keyLeftOrRightStatus = true;
		document.getElementById("channelList"+folderFocus).style.color = "#999";
		folderFocus--;
		moveFolderFocus();
	} else {
		if (createDivFocus <= 0) {
			if (timeFocus == 0) {
				return;
			}
			if (timeBarLength == 60 && parseInt(timeFocus/2) == 0) {
				return;
			}
			if (stopKeyStatus) {
				return;
			}
			createDivFocus = 0;
			changeTimeArea(0);
			//hiddListText(0);
			freshListDiv(0);
			return;
		}
		clearListFocus();
		createDivFocus--;
		getListFocus(1);
	}
	return;
}

/*********************************************************************/
/* Function: keyRight												 */
/* Description: keyRight按键处理										 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-11-11							 */
/*********************************************************************/
function keyRight() {
	if (focusPosition == 0) {
		if (folderFocus == 3) {
			return;
		}
		keyLeftOrRightStatus = true;
		document.getElementById("channelList"+folderFocus).style.color = "#999";
		folderFocus++;
		moveFolderFocus();
	} else {
		if (createDivFocus >= listFocusTotal[channelFocus%5]-1) {
			if (timeFocus == 3) {
				return;
			}
			if (timeBarLength == 60 && parseInt(timeFocus/2) == 1) {
				return;
			}
			if (stopKeyStatus) {
				return;
			}
			createDivFocus = 0;
			changeTimeArea(1);
			//hiddListText(1);
			freshListDiv(1);
			return;
		}
		clearListFocus();
		createDivFocus++;
		getListFocus(1);
	}
	return;
}

/*********************************************************************/
/* Function: hiddListText											 */
/* Description: 隐藏节目列表											 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-11-22							 */
/*********************************************************************/
function hiddListText(num) {
	stopKeyStatus = true;
	document.getElementById("epgListDiv").style.opacity = "0.0";
	setTimeout("changeEpgText("+num+");", 500);
	return;
}

/*********************************************************************/
/* Function: changeEpgText											 */
/* Description: 刷新节目列表											 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-11-22							 */
/*********************************************************************/
function changeEpgText(num) {
	freshListDiv(num);
	showListText();
	return;
}

/*********************************************************************/
/* Function: showListText											 */
/* Description: 显示节目列表											 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-11-22							 */
/*********************************************************************/
function showListText() {
	document.getElementById("epgListDiv").style.opacity = "1.0";
	stopKeyStatus = false;
	return;
}

/*********************************************************************/
/* Function: changeTimeArea											 */
/* Description: 左右键时改变时间段										 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-11-18							 */
/*********************************************************************/
var timeStartAndEnd = new Array('201011152000', '201011152200', '201011160000', '201011160200', '201011160400');
function changeTimeArea(e) {
	if (timeBarLength == 60) {
		timeStartLength = parseInt(eval("dayTimeTwo"+e)[0].split(":")[0]);
		var dayNum = e == 0 ? "Today" : "Nov.16";
		timeFocus = e == 0 ? 0 : 2;
		document.getElementById("dateShow").innerHTML = dayNum;
		listTimeStart = timeStartAndEnd[e*2];
		listTimeEnd = timeStartAndEnd[e*2+2];
	} else {
		if (e == 1) {
			timeFocus++;
		} else if (e == 0) {
			timeFocus--;
		}
		timeStartLength = parseInt(eval("dayTime"+timeFocus)[0].split(":")[0]);
		var dayNum = timeFocus >= 2 ? "Nov.16" : "Today";
		document.getElementById("dateShow").innerHTML = dayNum;
		listTimeStart = timeStartAndEnd[timeFocus];
		listTimeEnd = timeStartAndEnd[timeFocus+1];
	}
	if (listTimeCurr < listTimeStart || listTimeCurr > listTimeEnd) {
		document.getElementById("programListPointer").style.opacity = "0.0";
	} else {
		window.clearTimeout(timer_pointer);
		timePointerStatus = false;
		showTimeFun();
	}
	hiddTimeArea();
	//freshTimeArea();
	return;
}

function hiddTimeArea() {
	stopKeyStatus = true;
	for (var i=0; i<4; i++) {
		document.getElementById("timeShow"+i).style.width = "0px";
	}
	setTimeout("freshTimeArea();", 400);
	return;
}

function showTimeArea() {
	var num;
	for (var i=0; i<4; i++) {
		if (i == 3) {
			num = "230px";
		} else {
			num = "229px";
		}
		document.getElementById("timeShow"+i).style.width = num;
	}
	stopKeyStatus = false;
	return;
}

/*********************************************************************/
/* Function: moveFolderFocus										 */
/* Description: 分类项目位置焦点左右移动								 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-11-12							 */
/*********************************************************************/
var timer_folder;
function moveFolderFocus() {
	window.clearTimeout(timer_folder);
	createDivFocus = 0;
	document.getElementById("focusGuideChannel").style.left = 224*folderFocus+"px";
	document.getElementById("channelList"+folderFocus).style.color = "#ffffff";
	var colorButton = folderFocus == 0 ? "#999" : "#fff";
	document.getElementById("leftButton").style.borderRightColor = colorButton;
	colorButton = folderFocus == 3 ? "#999" : "#fff";
	document.getElementById("rightButton").style.borderLeftColor = colorButton;
	//timer_folder = window.setTimeout("hiddListText(1);", 500);
	timer_folder = window.setTimeout("freshListDiv(1);", 500);
	return;
}


/*********************************************************************/
/* Function: keyUp													 */
/* Description: keyUp按键处理											 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-11-11							 */
/*********************************************************************/
function keyUp() {
	if (focusPosition == 0) {
		return;
	} else if (channelFocus == 0 && focusPosition == 1) {
		changeFolderFocus();
		//clearListFocus();
	} else {
		clearListFocus();
		channelFocus--;
		var pos = channelFocus%5;
		if (pos == 4) {
			beginIndex = parseInt(channelFocus/5)*5;
			freshListDiv(1);
			return;
		} else if (createDivFocus >= listFocusTotal[channelFocus%5]) {
			createDivFocus = listFocusTotal[channelFocus%5]-1;
		}
		getListFocus(1);
	}
	return;
}

/*********************************************************************/
/* Function: keyDown												 */
/* Description: keyDown按键处理										 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-11-11							 */
/*********************************************************************/
function keyDown() {
	if (focusPosition == 0) {
		changeFolderFocus();
		//getListFocus();
	} else if (channelFocus >= (channelTotal-1)) {
		return;
	} else {
		clearListFocus();
		channelFocus++;
		var pos = channelFocus%5;
		if (pos == 0) {
			beginIndex = parseInt(channelFocus/5)*5;
			//var begin = parseInt(channelFocus/5)*5;
			freshListDiv(1);
			return;
		} else if (createDivFocus >= listFocusTotal[channelFocus%5]) {
			createDivFocus = listFocusTotal[channelFocus%5]-1;
		}
		getListFocus(1);
	}
	return;
}

/*********************************************************************/
/* Function: changeFolderFocus										 */
/* Description: 分类列表和节目列表焦点切换控制							 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-11-18							 */
/*********************************************************************/
function changeFolderFocus() {
	focusPosition = focusPosition == 0 ? 1 : 0;
	if (focusPosition == 0) {
		document.getElementById("focusGuideChannel").style.background = "-webkit-gradient(linear, left top, left bottom, from(#011f55), to(#034eb3))";
		document.getElementById("programBgFocus").style.opacity = "0.0";
		clearListFocus();
		//document.getElementById("programBgFocus").style.background = "-webkit-gradient(linear, left top, left bottom, from(#464646), to(#757575))";
	} else {
		document.getElementById("focusGuideChannel").style.background = "-webkit-gradient(linear, left top, left bottom, from(#464646), to(#757575))";
		document.getElementById("programBgFocus").style.opacity = "1.0";
		getListFocus(1);
	}
	return;
}
/*********************************************************************/
/* Function: init													 */
/* Description: onload函数											 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-11-16							 */
/*********************************************************************/
var timePointerStatus = true;	//是否正常显示时间指针
function init() {
	timeStartLength = parseInt(eval("dayTime"+timeFocus)[0].split(":")[0]);
	freshListDiv(1);
	showTimeFun();
	//setBackOpacity();
	return;
}

function setBackOpacity()
{
	document.getElementById('logoShow').style.opacity = '0.7';
	document.getElementById('blackBack').style.opacity = '0.9';
	document.getElementById('channelTips').style.opacity = '0.7';
	document.getElementById('focusGuideChannel').style.opacity = '0.7';
	document.getElementById('backBar').style.opacity = '0.7';
	document.getElementById('programBgFocus').style.opacity = '0.7';
}

/*********************************************************************/
/* Function: freshListDiv											 */
/* Description: 刷新节目列表											 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-11-16							 */
/*********************************************************************/
var beginIndex = 0;
function freshListDiv(e) {
	keyLeftOrRightStatus = false;
	clearDiv();
	channelTotal = folderChannel[folderFocus].length;;
	channelPageTotal =( channelTotal-beginIndex) > 5 ? 5 : (channelTotal-beginIndex);
	document.getElementById("programListFrame").style.height = (channelPageTotal+1)*43+"px";
	document.getElementById("pointerLine").style.height = 14+(channelPageTotal+1)*43+"px";
	for (var i=0; i<channelPageTotal; i++) {
		if (keyLeftOrRightStatus) {
			break;
		}
		document.getElementById("channelOrder"+i).innerHTML = channel_name[folderChannel[folderFocus][beginIndex+i]];
		createDiv(i,folderChannel[folderFocus][beginIndex+i]);
	}
	if (focusPosition == 1) {
		getListFocus(e);
	}
	return;
}

/*********************************************************************/
/* Function: clearListFocus											 */
/* Description: 节目列表中，失去焦点方法								 */
/* Parameters: focusId 焦点位置										 */
/* Author&Date: zhaopengjun by 2010-11-16							 */
/*********************************************************************/
function clearListFocus() {
	var focusId = "createList"+channelFocus%5+"_"+createDivFocus;
	document.getElementById(focusId).style.color = "#999";
	document.getElementById("channelOrder"+channelFocus%5).style.color = "#999";
	return;
}

/*********************************************************************/
/* Function: getListFocus											 */
/* Description: 节目列表中，获得焦点方法								 */
/* Parameters: focusId 焦点位置										 */
/* Author&Date: zhaopengjun by 2010-11-15							 */
/*********************************************************************/
function getListFocus(e) {
	window.clearTimeout(timer_info);
	//alert(keyLeftOrRightStatus);
	if (e == 0) {
		createDivFocus = listFocusTotal[channelFocus%5]-1;
	}
	var focusId = "createList"+channelFocus%5+"_"+createDivFocus;
	var temp = document.getElementById(focusId).style.width;
	document.getElementById("channelOrder"+channelFocus%5).style.color = "#ffffff";
	document.getElementById(focusId).style.color = "#ffffff";
	
	var leftF = document.getElementById(focusId).style.left;
	var widthF = document.getElementById(focusId).style.width;
	leftF = parseInt(leftF.substring(0, leftF.length-2));
	document.getElementById("programBgFocus").style.top = 43+(channelFocus%5)*43+"px";
	document.getElementById("programBgFocus").style.left = leftF+2+"px";
	document.getElementById("programBgFocus").style.width = widthF;
	if (createDivFocus == listFocusTotal[channelFocus%5]-1) {
		document.getElementById("programBgFocus").style.borderBottomRightRadius = "5px";
		document.getElementById("programBgFocus").style.borderTopRightRadius = "5px";
	} else {
		document.getElementById("programBgFocus").style.borderBottomRightRadius = "0px";
		document.getElementById("programBgFocus").style.borderTopRightRadius = "0px";
	}
	timer_info = window.setTimeout("showProgramInfo();", 500);
	return;
}

/*********************************************************************/
/* Function: showProgramInfo										 */
/* Description: 显示节目信息											 */
/* Parameters: 														 */
/* Author&Date: zhaopengjun by 2010-11-18							 */
/*********************************************************************/
var timer_info;
function showProgramInfo() {
	if (keyLeftOrRightStatus) {
		return;
	}
	document.getElementById("proInfo").innerHTML = programInfoArray[channelFocus%5][createDivFocus];
	document.getElementById("imgPro").src = programPicArray[channelFocus%5][createDivFocus];
	return;
}

/*********************************************************************/
/* Function: createDiv												 */
/* Description: 动态创建节目列表										 */
/* Parameters: channelId 要创建节目列表的行号							 */
/* Author&Date: zhaopengjun by 2010-11-15							 */
/*********************************************************************/
var listFocusTotal = new Array();	//当前频道节目总数
var programInfoArray = new Array();	//当前频道节目信息
var programPicArray = new Array();	//当前频道节目图片
var listTimeStart = 201011152200;
var listTimeEnd = 201011160000;
function createDiv(divId,channelId) {
	var arrayNum = 0;
	var listTotalLength = 0;
	var saveListArray = new Array();
	var saveListName = new Array();
	var listWidth = new Array();
	var listLeft = new Array();
	programInfoArray[divId] = new Array();
	programPicArray[divId] = new Array();
	var timeLength = info_time[channelId].length;
	for (var i=0; i<timeLength; i++) {
		if (keyLeftOrRightStatus) {
			break;
		}
		if (info_time[channelId][i]>listTimeStart && info_time[channelId][i-1]<listTimeStart) {
			saveListArray[arrayNum] = info_time[channelId][i-1].substring(8,12);
			saveListName[arrayNum] = info_name[channelId][i-1];
			programInfoArray[divId][arrayNum] = info_info[channelId][i-1];
			programPicArray[divId][arrayNum] = info_picture[channelId][i-1];
			arrayNum++;
			saveListArray[arrayNum] = info_time[channelId][i].substring(8,12);
			saveListName[arrayNum] = info_name[channelId][i];
			programInfoArray[divId][arrayNum] = info_info[channelId][i];
			programPicArray[divId][arrayNum] = info_picture[channelId][i];
			arrayNum++;
		} else if (info_time[channelId][i]>=listTimeStart && info_time[channelId][i]<listTimeEnd) {
			saveListArray[arrayNum] = info_time[channelId][i].substring(8,12);
			saveListName[arrayNum] = info_name[channelId][i];
			programInfoArray[divId][arrayNum] = info_info[channelId][i];
			programPicArray[divId][arrayNum] = info_picture[channelId][i];
			arrayNum++;
		}
	}
	for (var i=0; i<saveListArray.length; i++) {
		if (keyLeftOrRightStatus) {
			break;
		}
		saveListArray[i] = parseInt(saveListArray[i].substring(0,2))*60+parseInt(saveListArray[i].substring(2,4));
	}
	for (var i=0; i<saveListArray.length; i++) {
		if (keyLeftOrRightStatus) {
			break;
		}
		if (i==0) {
			if (timeBarLength == 60) {
				var num = parseInt(timeFocus/2);
				listWidth[i] = (saveListArray[i+1]-parseInt(eval("dayTimeTwo"+num)[0])*60)*229/timeBarLength;
			} else {
				listWidth[i] = (saveListArray[i+1]-parseInt(eval("dayTime"+timeFocus)[0])*60)*229/timeBarLength;
			}
			listLeft[i] = listTotalLength;
			listTotalLength += listWidth[i];
		} else if (i<saveListArray.length-1) {
			listWidth[i] = (saveListArray[i+1]-saveListArray[i])*229/timeBarLength;
			listLeft[i] = listTotalLength;
			listTotalLength += listWidth[i];
		} else {
			listLeft[i] = listTotalLength;
			listWidth[i] = 927-listTotalLength;
		}
	}
	listFocusTotal[divId] = saveListArray.length;
	for (var i=0; i<saveListArray.length; i++) {
		if (keyLeftOrRightStatus) {
			break;
		}
		var obj = document.createElement("div");
		obj.id = "createList" + divId + "_" + i;
		obj.style.position = "absolute";
		obj.style.overflow = "hidden";
		obj.style.textIndent = "10px";
		obj.style.textOverflow = "ellipsis";
		obj.style.whiteSpace = "nowrap";
		obj.style.left = 224+i*3+listLeft[i]+"px";
		obj.style.top = "0px";
		obj.style.height = "40px";
		obj.style.fontSize = "22px";
		obj.style.color = "#999";
		obj.style.lineHeight = "40px";
		obj.style.fontWeight = "bolder";
		obj.style.borderLeft = "#373737 solid 2px";
		obj.style.width = listWidth[i]+"px";
		if (i < listFocusTotal[divId]-1) {
			obj.style.borderRight = "#000000 solid 2px";
		}
		if (i == listFocusTotal[divId]-1) {
			obj.style.borderStyle = "solid";
			obj.style.borderRight = "0px";
			obj.style.borderTop = "0px";
			obj.style.borderBottom = "0px";
			obj.style.width = (listWidth[i]-3*(listFocusTotal[divId]-1)-1)+"px";
			obj.style.borderBottomRightRadius = "5px";
			obj.style.borderTopRightRadius = "5px";
		}
		obj.style.webkitTransitionProperty = "all";
		obj.style.webkitTransitionDuration = "0.2s";
		obj.innerHTML = saveListName[i];
		document.getElementById("programListBg"+divId).appendChild(obj);
	}
	return;
}

/*********************************************************************/
/* Function: clearDiv												 */
/* Description: 删除节目列表											 */
/* Parameters: 														 */
/* Author&Date: zhaopengjun by 2010-11-17							 */
/*********************************************************************/
function clearDiv() {
	for (var i=0; i<5; i++) {
		document.getElementById("programListBg"+i).innerHTML = "";
	}
	return;
}

/*********************************************************************/
/* Function: timeLengthUp											 */
/* Description: 修改时间段里的时间为60分钟								 */
/* Parameters: 														 */
/* Author&Date: zhaopengjun by 2010-11-17							 */
/*********************************************************************/
function timeLengthUp() {
	if (timeBarLength == 30) {
		timeBarLength = 60;
		createDivFocus = 0;
		if (timeFocus <= 1) {
			timeStartLength = 20;
			listTimeStart = timeStartAndEnd[0];
			listTimeEnd = timeStartAndEnd[2];
		} else {
			timeStartLength = 0;
			listTimeStart = timeStartAndEnd[2]
			listTimeEnd = timeStartAndEnd[4];
		}
		//hiddListText(1);
		if (listTimeCurr < listTimeStart || listTimeCurr > listTimeEnd) {
			document.getElementById("programListPointer").style.opacity = "0.0";
		} else {
			window.clearTimeout(timer_pointer);
			timePointerStatus = false;
			showTimeFun();
		}
		freshListDiv(1);
		hiddTimeArea();
		//freshTimeArea();
	}
	//changeTimeArea(2);
	return;
}

/*********************************************************************/
/* Function: timeLengthDown											 */
/* Description: 修改时间段里的时间为30分钟								 */
/* Parameters: 														 */
/* Author&Date: zhaopengjun by 2010-11-17							 */
/*********************************************************************/
function timeLengthDown() {
	if (timeBarLength == 60) {
		timeBarLength = 30;
		timeStartLength = parseInt(eval("dayTime"+timeFocus)[0].split(":")[0]);
		createDivFocus = 0;
		listTimeStart = timeStartAndEnd[timeFocus];
		listTimeEnd = timeStartAndEnd[timeFocus+1];
		//hiddListText(1);
		if (listTimeCurr < listTimeStart || listTimeCurr > listTimeEnd) {
			document.getElementById("programListPointer").style.opacity = "0.0";
		} else {
			window.clearTimeout(timer_pointer);
			timePointerStatus = false;
			showTimeFun();
		}
		freshListDiv(1);
		hiddTimeArea();
		//freshTimeArea();
	}
	//changeTimeArea(2);
	return;
}

/*********************************************************************/
/* Function: freshTimeArea											 */
/* Description: 时间长度改变时，刷新时间显示							 */
/* Parameters: 														 */
/* Author&Date: zhaopengjun by 2010-11-23							 */
/*********************************************************************/
function freshTimeArea() {
	if (timeBarLength == 30) {
		for (var i=0; i<4; i++) {
			document.getElementById("timeShow"+i).innerHTML = eval("dayTime"+timeFocus)[i];
		}
	} else {
		var numTime = parseInt(timeFocus/2);
		for (var i=0; i<4; i++) {
			document.getElementById("timeShow"+i).innerHTML = eval("dayTimeTwo"+numTime)[i];
		}
	}
	setTimeout("showTimeArea();", 10);
	return;
}

/*********************************************************************/
/* Function: showTimeFun											 */
/* Description: 获得当前时间											 */
/* Parameters: 														 */
/* Author&Date: zhaopengjun by 2010-11-17							 */
/*********************************************************************/
var myDate = "201011152225";
var currMonth = parseInt(myDate.substring(4,6));
var currDate = parseInt(myDate.substring(6,8));
var currHour = parseInt(myDate.substring(8,10));
var currMin = parseInt(myDate.substring(10,12));
var timeStartLength;	//列表的起始时间，单位：小时
var listTimeCurr;
var timer_pointer;
var pointerMoveTime = 60000;		//时间指针的移动时间间隔，即每一分钟移动一次
function showTimeFun() {
	if (timePointerStatus) {
		currMin++;
	} else {
		timePointerStatus = true;
	}
	if (currMin >= 60) {
		currMin = currMin-60;
		currHour++;
	}
	if (currHour >= 24) {
		currHour = 0;
		currDate++;
	}
	var showCurrMin = currMin < 10 ? ("0"+currMin) : currMin;
	var showCurrHour = currHour < 10 ? ("0"+currHour) : currHour;
	document.getElementById("timeShow").innerHTML = showCurrHour+":"+showCurrMin+" "+currMonth+"/"+currDate;
	listTimeCurr = parseInt("2010"+currMonth+currDate+showCurrHour+showCurrMin);
	if (listTimeCurr < listTimeStart || listTimeCurr > listTimeEnd) {
		document.getElementById("programListPointer").style.opacity = "0.0";
	} else {
		moveTimePointer();
	}
	timer_pointer = setTimeout("showTimeFun();", pointerMoveTime);
	return;
}

/*********************************************************************/
/* Function: changePointerTimeout									 */
/* Description: 改变指针的移动速度										 */
/* Parameters: 														 */
/* Author&Date: zhaopengjun by 2010-11-24							 */
/*********************************************************************/
function changePointerTimeout() {
	window.clearTimeout(timer_pointer);
	pointerMoveTime = pointerMoveTime == 1000 ? 60000 : 1000;
	timer_pointer = setTimeout("showTimeFun();", pointerMoveTime);
	return;		
}

/*********************************************************************/
/* Function: moveTimePointer										 */
/* Description: 移动时间指针											 */
/* Parameters: 														 */
/* Author&Date: zhaopengjun by 2010-11-22							 */
/*********************************************************************/
function moveTimePointer() {
	listTimeStart = ""+listTimeStart;
	var endDate = parseInt(listTimeStart.substring(6,8));
	timeTotalLength = ((currDate-endDate)*24*60+(currHour-timeStartLength)*60+currMin);
	var minWidth = timeTotalLength*928/(timeBarLength*4)+280;
	minWidth = minWidth < 280 ? 280 : minWidth;
	document.getElementById("programListPointer").style.left = minWidth+"px";
	setTimeout("showTimePointer();", 10);
	return;
}

/*********************************************************************/
/* Function: showTimePointer										 */
/* Description: 显示时间指针											 */
/* Parameters: 														 */
/* Author&Date: zhaopengjun by 2010-11-22							 */
/*********************************************************************/
function showTimePointer() {
	var showCurrMin = currMin < 10 ? ("0"+currMin) : currMin;
	var showCurrHour = currHour < 10 ? ("0"+currHour) : currHour;
	listTimeCurr = parseInt("2010"+currMonth+currDate+showCurrHour+showCurrMin);
	if (listTimeCurr >= listTimeStart && listTimeCurr <= listTimeEnd) {
		document.getElementById("programListPointer").style.opacity = "1.0";
	}
	return;
}



var keyLeftOrRightStatus = false;	//左右按键状态
var timeBarLength = 30;	//记录时间段的值，每一段的时间
var focusPosition = 0;	//焦点的位置，0 喜好等分类位置，1 节目列表位置
var folderFocus = 0;	//喜好等分类的焦点位置，0 FAVORITES, 1 SUBSCRIBED, 2 SD CHANNELS, 3 HD CHANNELS
var channelFocus = 0;	//频道焦点位置
var timeFocus = 1;		//全天时间段焦点位置
var createDivFocus = 0;	//列表内，左右移动时，记录焦点位置
var channelPageTotal;		//每页的频道总数
var channelTotal;		//channel total

//channel name array
var channel_name = new Array();
channel_name[0] = "CCTV 1";
channel_name[1] = "CCTV 10";
channel_name[2] = "BTV 2";
channel_name[3] = "HLJTV 1";
channel_name[4] = "WEST CITY";
channel_name[5] = "TONIGHT";
channel_name[6] = "HAPPY DAY";
channel_name[7] = "FENGHUANG TV";
channel_name[8] = "STAR SKY";
channel_name[9] = "ENGLISH TV";
channel_name[10] = "MOVIES";
channel_name[11] = "LOOK WORLD";

//记录全天各时间段数组
var dayTime0 = new Array("20:00", "20:30", "21:00", "21:30");
var dayTime1 = new Array("22:00", "22:30", "23:00", "23:30");
var dayTime2 = new Array("00:00", "00:30", "01:00", "01:30");
var dayTime3 = new Array("02:00", "02:30", "03:00", "03:30");

var dayTimeTwo0 = new Array("20:00", "21:00", "22:00", "23:00");
var dayTimeTwo1 = new Array("00:00", "01:00", "02:00", "03:00");

//分类频道的数组
var folderChannel = new Array();
folderChannel[0] = new Array(0,1,2,4,8);
folderChannel[1] = new Array(2,4,7);
folderChannel[2] = new Array(1,3,5,7,8,9,10,11);
folderChannel[3] = new Array(0,2,4,6);

//各频道的节目时间表
var info_time = new Array();
info_time[0] = new Array('201011151930','201011152050','201011152140','201011152240','201011152340','201011160030','201011160110','201011160240','201011160350');
info_time[1] = new Array('201011151920','201011152030','201011152120','201011152310','201011160040','201011160120','201011160220','201011160340');
info_time[2] = new Array('201011151930','201011152020','201011152110','201011152250','201011160020','201011160140','201011160250');
info_time[3] = new Array('201011151940','201011152030','201011152100','201011152240','201011160040','201011160150','201011160230','201011160350');
info_time[4] = new Array('201011151950','201011152040','201011152130','201011152310','201011160000','201011160130','201011160310');
info_time[5] = new Array('201011151900','201011152110','201011152320','201011160000','201011160130','201011160330');
info_time[6] = new Array('201011151910','201011152020','201011152210','201011160010','201011160120','201011160300');
info_time[7] = new Array('201011151930','201011152050','201011152230','201011160030','201011160150','201011160350');
info_time[8] = new Array('201011151930','201011152030','201011152220','201011152330','201011160120','201011160250');
info_time[9] = new Array('201011151930','201011152040','201011152300','201011160020','201011160140','201011160320');
info_time[10] = new Array('201011151930','201011152100','201011152240','201011152350','201011160150','201011160320');
info_time[11] = new Array('201011151930','201011152130','201011152310','201011160040','201011160245','201011160355');

//各节目名称
var info_name = new Array();
info_name[0] = new Array('Inception','The Shawshank Redemption','All Quiet on the Western Front','It Happened One Night','Gone with the Wind','Casablanca','Hamlet','Joseph L.Mankiewicz','On the Waterfront');
info_name[1] = new Array('Lawrence of Arabia','George Cukor','The Sound of Music','A Man for All Seasons','Carol Reed','Midnight Cowboy','John Stevenson','Danny Boyle');
info_name[2] = new Array('The Godfather','The Sting','Hustle','One Flew Over the Cuckoos Nest','Rocky','The Deer Hunter','Kramer vs. Kramer');
info_name[3] = new Array('Out of Africa','Platoon','he Last Emperor','Rain Man','Dances with Wolves','The Silence of the Lambs','Unforgiven','Schindlers List');
info_name[4] = new Array('American Beauty','Gladiator','A Beautiful Mind','Chicago','The Fellowship of the Ring','The Two Towers','The Return of the King');
info_name[5] = new Array('The Vampire Chronicles','Lord of War','Blood Diamond','The Expendables','Shrek','The Extraordinary');
info_name[6] = new Array('Coraline','Iron Man','click','Quantum of Solace','Rise of the Machines','The Da Vinci Code');
info_name[7] = new Array('Harry Potter','Transformers','Astro Boy','Mr. & Mrs. Smith','Battle of the Smithsonian','Spirited Away');
info_name[8] = new Array('the Half-Blood Prince','Christopher Nolan','James L.Brooks','The Expendables','Shrek','The Extraordinary');
info_name[9] = new Array('Around the World in 80 Days','West Side Story','Pete Docter','Chariots of Fire','Gandhi','Terms of Endearment');
info_name[10] = new Array('Forrest Gump','Braveheart','The English Patient','Titanic','Shakespeare in Love','The Departed');
info_name[11] = new Array('Alice in Wonderland','Sherlock Holmes','WALL-E','Dawn of the Dinosaurs','The Meltdown','Alice in Wonderland');

//节目信息表
var info_info = new Array();
info_info[0] = new Array('Name: Inception<br>Genre: documentary<br>Released: 2010.2.23<br>Actor: Dileep Rao,Michael Caine<br>Director: Christopher Nolan','Name: The Shawshank Redemption<br>Genre: Horror film<br>Released: 2010.8.25<br>Actor: Shawn Kemp,Blake Lindsley,Jon Bielich<br>Director: Frank Darabont','Name: All Quiet on the Western Front<br>Genre: science fiction film<br>Released: 2010.3.16<br>Actor: John McTiernan,John Travolta<br>Director: Frank Capra','Name: It Happened One Night<br>Genre: movements <br>Released: 2010.10.8<br>Actor: Cynthia Cooper,Hugh Anderson<br>Director: David O.Selznick','Name: Gone with the Wind<br>Genre: Horror film<br>Released: 2010.1.3<br>Actor: Aryton Senna<br>Director: Mark Osborne','Name: Casablanca<br>Genre: history<br>Released: 2010.6.9<br>Actor: Alexander Kurlovich,Arthur Ashe<br>Director: Michael Curtiz','Name: Hamlet<br>Genre: science fiction film<br>Released: 2010.4.20<br>Actor: Yong Hock-kin<br>Director: Jon Landau','Name: Joseph L.Mankiewicz<br>Genre: Horror film<br>Released: 2010.1.18<br>Actor: Ian Rush,Kimiko Date<br>Director: Guy Ritchie','Name: On the Waterfront<br>Genre: love story<br>Released: 2010.3.7<br>Actor: Evander Holyfield<br>Director: Zeffirelli');

info_info[1] = new Array('Name: Lawrence of Arabia<br>Genre: Horror film<br>Released: 2010.6.12<br>Actor: Jurgen Klinsmann,Curtis Ricks<br>Director: Joseph L.Mankiewicz','Name: George Cukor<br>Genre: love story<br>Released: 2009.3.25<br>Actor: Lawrence DH<br>Director: Maurine Dallas Watkins','Name: The Sound of Music<br>Genre: science fiction film<br>Released: 2009.6.21<br>Actor: John Courtis<br>Director: Andrew Niccol','Name: A Man for All Seasons<br>Genre: movements <br>Released: 2008.12.15<br>Actor: Browning，Elizabeth<br>Director: Sylvester Stallone','Name: Carol Reed<br>Genre: Horror film<br>Released: 2008.10.10<br>Actor: Jonson, Ben<br>Director: Robert Zemeckis','Name: Midnight Cowboy<br>Genre: history<br>Released: 2007.9.21<br>Actor: Kawabata Yasunari<br>Director: Elia Kazan','Name: John Stevenson<br>Genre: documentary<br>Released: 2010.5.19<br>Actor: Woolf, Virginia<br>Director: Clyde Geronimi','Name: Danny Boyle<br>Genre: Horror film<br>Released: 2007.7.7<br>Actor: Garcia Marquez<br>Director: Carlos Saldanha');

info_info[2] = new Array('Name: The Godfather<br>Genre: science fiction film<br>Released: 2009.11.20<br>Actor: Aldington,Bessemer<br>Director: Zeffirelli','Name: The Sting<br>Genre: other<br>Released: 2007.4.26<br>Actor: Christopher<br>Director: William Wyler','Name: Hustle<br>Genre: Horror film<br>Released: 2010.1.30<br>Actor: Francis, Franklin<br>Director: Jon Landau','Name: One Flew Over the Cuckoos Nest<br>Genre: movements <br>Released: 2008.8.8<br>Actor: Christopher<br>Director: Dallas Watkins','Name: Rocky<br>Genre: science fiction film<br>Released: 2005.3.27<br>Actor: MacMillan, Macmillan<br>Director: Wilfred Jackson','Name: The Deer Hunter<br>Genre: Horror film<br>Released: 2009.8.6<br>Actor: Wilhelmina<br>Director: Jerome Robbins','Name: Kramer vs. Kramer<br>Genre: history<br>Released: 2010.11.11<br>Actor: Rockefeller<br>Director: George Cukor');

info_info[3] = new Array('Name: Out of Africa<br>Genre: science fiction film<br>Released: 2010.1.16<br>Actor: Sonmerfield<br>Director: Joseph L.Mankiewicz','Name: Platoon<br>Genre: love story<br>Released: 2003.9.19<br>Actor: Thompson<br>Director: Guy Ritchie','Name: he Last Emperor<br>Genre: documentary<br>Released: 2004.12.21<br>Actor: Solomon,Patrick,Michelle<br>Director: Michael Cimino','Name: Rain Man<br>Genre: Horror film<br>Released: 2008.7.22<br>Actor: Michelson<br>Director: Hayao Miyazaki','Name: Dances with Wolves<br>Genre: movements <br>Released: 2010.6.30<br>Actor: Elizabeth<br>Director: Michael Curtiz','Name: The Silence of the Lambs<br>Genre: science fiction film<br>Released: 2009.7.14<br>Actor: Jocelyn (Joyce)<br>Director: Hugh Hudson','Name: Unforgiven<br>Genre: history<br>Released: 2006.3.21<br>Actor: Farrah (Fara),Barden<br>Director: Ridley Scott','Name: Schindlers List<br>Genre: love story<br>Released: 2010.4.13<br>Actor: Caldwell,Esmeralda<br>Director: Elia Kazan');

info_info[4] = new Array('Name: American Beauty<br>Genre: movements <br>Released: 2005.5.25<br>Actor: Pebbles,Queenie<br>Director: Jon Favreau','Name: Gladiator<br>Genre: Horror film<br>Released: 2007.3.18<br>Actor: Sharman,Emerson<br>Director: Andrew Niccol','Name: A Beautiful Mind<br>Genre: science fiction film<br>Released: 2010.10.10<br>Actor: Courtland<br>Director: Clint Eastwood','Name: Chicago<br>Genre: other<br>Released: 2010.7.20<br>Actor: Forrester<br>Director: Zeffirelli','Name: The Fellowship of the Ring<br>Genre: history<br>Released: 2001.11.11<br>Actor: Garridan,Trudy<br>Director: William Wyler','Name: The Two Towers<br>Genre: Horror film<br>Released: 2002.6.23<br>Actor: Hamilton<br>Director: Jon Favreau','Name: The Return of the King<br>Genre: movements <br>Released: 2010.1.18<br>Actor: Creighton<br>Director: Jerome Robbins');

info_info[5] = new Array('Name: The Vampire Chronicles<br>Genre: science fiction film<br>Released: 2004.3.19<br>Actor: Dwennon,Zinnia<br>Director: Anthony Minghella','Name: Lord of War<br>Genre: Horror film<br>Released: 1999.5.26<br>Actor: Noelani,Kahoku<br>Director: Robert Zemeckis','Name: Blood Diamond<br>Genre: documentary<br>Released: 2004.12.4<br>Actor: Ciannait,Shawnnessy<br>Director: Sylvester Stallone','Name: The Expendables<br>Genre: love story<br>Released: 1998.8.30<br>Actor: Lujuana<br>Director: Clyde Geronimi','Name: Shrek<br>Genre: science fiction film<br>Released: 2007.9.24<br>Actor: Dominga,Melisenda<br>Director: Jon Landau','Name: The Extraordinary<br>Genre: Horror film<br>Released: 2005.12.8<br>Actor: Belladonna,Pancrazio<br>Director: William Wyler');

info_info[6] = new Array('Name: Coraline<br>Genre: other<br>Released: 2003.2.14<br>Actor: Rose, Rosalie<br>Director: Dallas Watkins','Name: Iron Man<br>Genre: science fiction film<br>Released: 2001.12.25<br>Actor: Varanese<br>Director: Joseph L.Mankiewicz','Name: click<br>Genre: science fiction film<br>Released: 2009.8.1<br>Actor: Mario, Marius<br>Director: Frank Capra','Name: Quantum of Solace<br>Genre: movements <br>Released: 2010.10.1<br>Actor: Asvathama<br>Director: Christopher Nolan','Name: Rise of the Machines<br>Genre: Horror film<br>Released: 2010.5.5<br>Actor: Annaliese<br>Director: Zeffirelli','Name: The Da Vinci Code<br>Genre: history<br>Released: 2003.11.20<br>Actor: Bronwynn,Rebecca<br>Director: Michael Cimino');

info_info[7] = new Array('Name: Harry Potter<br>Genre: documentary<br>Released: 2006.10.4<br>Actor: Chrislynn<br>Director: Elia Kazan','Name: Transformers<br>Genre: Horror film<br>Released: 2004.7.31<br>Actor: Katharyne,Makenzey<br>Director: Guy Ritchie','Name: Astro Boy<br>Genre: science fiction film<br>Released: 2008.3.25<br>Actor: Sabrina,Shanequa<br>Director: Clint Eastwood','Name: Mr. & Mrs. Smith<br>Genre: documentary<br>Released: 2006.1.29<br>Actor: Vanessa<br>Director: Maurine Dallas Watkins','Name: Battle of the Smithsonian<br>Genre: movements <br>Released: 2010.9.22<br>Actor: Dearbhorgaill<br>Director: George Cukor','Name: Spirited Away<br>Genre: Horror film<br>Released: 2005.8.30<br>Actor: Kristen Stewart<br>Director: Jerome Robbins');

info_info[8] = new Array('Name: the Half-Blood Prince<br>Genre: documentary<br>Released: 2008.3.11<br>Actor: Bryce Dallas Howard<br>Director: Michael Cimino','Name: Jon Favreau<br>Genre: history<br>Released: 2010.1.4<br>Actor: Michael Welch<br>Director: Robert Zemeckis','Name: James L.Brooks<br>Genre: Horror film<br>Released: 2009.8.12<br>Actor: ackson Rathbone<br>Director: Joseph L.Mankiewicz','Name: The Expendables<br>Genre: science fiction film<br>Released: 2001.6.20<br>Actor: Paul Jarrett,Sarah Clarke<br>Director: Jon Landau','Name: Shrek<br>Genre: movements <br>Released: 2003.12.26<br>Actor: Peter Facinelli,Elizabeth Reaser<br>Director: Wilfred Jackson','Name: The Extraordinary<br>Genre: love story<br>Released: 2010.4.28<br>Actor: Kellan Lutz,Nikki Reed<br>Director: George Cukor');

info_info[9] = new Array('Name: Around the World in 80 Days<br>Genre: love story<br>Released: 2007.4.19<br>Actor: Billy Burke,Kiowa Gordon,Alex Meraz<br>Director: Ridley Scott','Name: West Side Story<br>Genre: Horror film<br>Released: 1998.11.28<br>Actor: Bronson Pelletier<br>Director: Hugh Hudson','Name: Pete Docter<br>Genre: science fiction film<br>Released: 1999.9.29<br>Actor: Alex Meraz,Julia Jones<br>Director: Mark Osborne','Name: Chariots of Fire<br>Genre: history<br>Released: 1997.9.5<br>Actor: Chaske Spencer, Gil Birmingham<br>Director: Frank Darabont','Name: Gandhi<br>Genre: Horror film<br>Released: 2008.12.10<br>Actor: James Mangold,Tom Cruise<br>Director: William Wyler','Name: Terms of Endearment<br>Genre: documentary<br>Released: 2010.10.31<br>Actor: Falk Hentschel,Marc Blucas,Lennie Loftin<br>Director: Zeffirelli');

info_info[10] = new Array('Name: Forrest Gump<br>Genre: other<br>Released: 2005.8.4<br>Actor: Christian Finnegan,Nicholas Art<br>Director: Elia Kazan','Name: Braveheart<br>Genre: Horror film<br>Released: 2004.9.30<br>Actor: Brian Dykstra,Brian Tarantina<br>Director: Michael Curtiz','Name: The English Patient<br>Genre: science fiction film<br>Released: 2006.12.13<br>Actor: Jerrell Lee Wesley,Matthew Lawler<br>Director: Frank Capra','Name: Titanic<br>Genre: movements <br>Released: 2002.12.2<br>Actor: Ronn Surels,Eric Robert Bradshaw Bennett<br>Director: Carlos Saldanha','Name: Shakespeare in Love<br>Genre: Horror film<br>Released: 2010.5.7<br>Actor: Sara Underwood,Helen L. Welsh,Mark Wallace<br>Director: Guy Ritchie','Name: The Departed<br>Genre: history<br>Released: 2001.10.26<br>Actor: Adam Gregor,Mitch E. Bowan,Gerry Carbajal<br>Director: Joseph L.Mankiewicz');

info_info[11] = new Array('Name: Alice in Wonderland<br>Genre: history<br>Released: 2010.2.24<br>Actor: Jeffrey Corazzini,Holland Diaz<br>Director: Hayao Miyazaki','Name: Sherlock Holmes<br>Genre: science fiction film<br>Released: 2008.6.21<br>Actor: Suzanne Gillies,Erica McDermott,Nicole Signore<br>Director: David O.Selznick','Name: WALL-E<br>Genre: movements <br>Released: 2004.6.28<br>Actor: Michael Winterbottom,Casey Affleck<br>Director: Jerome Robbins','Name: Dawn of the Dinosaurs<br>Genre: Horror film<br>Released: 2009.9.19<br>Actor: Brent Briscoe,Deputy Jeff Plummer,Jay R. Ferguson<br>Director: Andrew Niccol','Name: The Meltdown<br>Genre: science fiction film<br>Released: 2007.9.30<br>Actor: Zach Josse,Rosa Pasquarella<br>Director: Hugh Hudson','Name: Alice in Wonderland<br>Genre: documentary<br>Released: 2010.11.5<br>Actor: Brett Bower,Debbi Tucker<br>Director: Anthony Minghella');

//节目列表图片
var info_picture = new Array();
info_picture[0] = new Array('img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg','img/5.jpg','img/6.jpg','img/7.jpg','img/8.jpg','img/9.jpg');
info_picture[1] = new Array('img/10.jpg','img/11.jpg','img/12.jpg','img/13.jpg','img/14.jpg','img/15.jpg','img/16.jpg','img/17.jpg');
info_picture[2] = new Array('img/18.jpg','img/19.jpg','img/20.jpg','img/21.jpg','img/22.jpg','img/23.jpg','img/24.jpg');
info_picture[3] = new Array('img/25.jpg','img/26.jpg','img/27.jpg','img/28.jpg','img/29.jpg','img/30.jpg','img/31.jpg','img/32.jpg');
info_picture[4] = new Array('img/33.jpg','img/34.jpg','img/35.jpg','img/36.jpg','img/37.jpg','img/38.jpg','img/39.jpg');
info_picture[5] = new Array('img/40.jpg','img/41.jpg','img/42.jpg','img/43.jpg','img/44.jpg','img/45.jpg');
info_picture[6] = new Array('img/46.jpg','img/47.jpg','img/48.jpg','img/49.jpg','img/50.jpg','img/51.jpg');
info_picture[7] = new Array('img/52.jpg','img/53.jpg','img/54.jpg','img/55.jpg','img/56.jpg','img/57.jpg');
info_picture[8] = new Array('img/58.jpg','img/59.jpg','img/60.jpg','img/61.jpg','img/62.jpg','img/63.jpg');
info_picture[9] = new Array('img/64.jpg','img/65.jpg','img/66.jpg','img/67.jpg','img/68.jpg','img/69.jpg');
info_picture[10] = new Array('img/70.jpg','img/71.jpg','img/72.jpg','img/73.jpg','img/74.jpg','img/75.jpg');
info_picture[11] = new Array('img/76.jpg','img/77.jpg','img/78.jpg','img/79.jpg','img/79.jpg','img/80.jpg');




