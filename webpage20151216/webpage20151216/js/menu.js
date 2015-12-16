// JavaScript Document
/*/*********************************************************************/
/* Function: keyEvent												 */
/* Description: 遥控器按键处理函数										 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-10-09							 */
/*********************************************************************/
//document.onkeypress = keyEvent;
/*document.onkeydown = keyEvent;
var focusNum = 0;		//记录主菜单焦点位置的div
function keyEvent(e) {
	var keyValue = e.which;
	player.printf(1, '----key---------'+keyValue);
	hiddMenuByTime();
	switch (keyValue) { 
		case 13: //Enter
			if(menuStatus==1){
				keymenuEnter();
			}
			else if(menuStatus==0){
				moveMenu(); 
			}
			break;
		case 37: //left(快退)
			if(menuStatus==1){
				keymenuRight();
			}
			break; 
		case 39: //right
			if(menuStatus==1){
				keymenuLeft(); 
			}
			break;   
		case 1073742338: //menu  
			moveMenu();
			return (false);
			break;			 
		default: 
			break;
	}
	return;
}*/

 
/*********************************************************************/
/* Function: moveMenu												 */
/* Description: 主菜单移动函数										 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-10-09							 */
/*********************************************************************/
var menuStatus = 0;		//记录主菜单状态，0 隐藏， 1 显示
function moveMenu() {	
	window.clearTimeout(timerHiddMenu);
	if (menuStatus == 0) {
		document.getElementById("menuDiv").style.top = "562px";
		menuStatus = 1;		
	} else { 
		document.getElementById("menuDiv").style.top = "720px";
		menuStatus = 0;
	}
	hiddMenuByTime();
	return;
}

/*********************************************************************/
/* Function: hiddMenuByTime											 */
/* Description: 自动隐藏主菜单										 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-10-12							 */
/*********************************************************************/
var timerHiddMenu;
function hiddMenuByTime() {
	if (menuStatus == 1) {
		window.clearTimeout(timerHiddMenu);
		timerHiddMenu = window.setTimeout("hiddMenuAuto();", 20000);
	}
	return;
}

/*********************************************************************/
/* Function: hiddMenuAuto											 */
/* Description: 自动隐藏主菜单										 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2011-01-11							 */
/*********************************************************************/
var timer_autoHidd;
function hiddMenuAuto() {
	//window.clearTimeout(timer_autoHidd);
	document.getElementById("menuDiv").style.top = "720px";
	menuStatus = 0;
	timer_autoHidd = window.setTimeout("showPageFull();", 800);
	return;	
}

/*********************************************************************/
/* Function: menuinit												 */
/* Description: 初始化函数											 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-10-09							 */
/*********************************************************************/
var listTotal = 9;		//Menu Total; 
var fontListArray = new Array("Flash Player", "Settings", "VOD", "Local Player", "IPTV", "DVB", "PVR", "CSS Sample", "WEBSITE");	//图标下文字
var htmlHref;
function menuinit() {
	bodyFun();
	//htmlHref = document.location.href;
	var htmlHrefArr = htmlHref.split("?");
	focusNum = htmlHrefArr.length > 1 ? htmlHrefArr[1] : 0;
	focusNum = parseInt(focusNum);  
	if (focusNum > 0) {
		leftPx = htmlHrefArr[2].split(":");
	}
	loadImage();
	loadPageElement();
	//timerFont(); 
	return;
} 
 

/*********************************************************************/
/* Function: loadPageElement										 */
/* Description: 初始化时，显示菜单图标及文字							 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-10-12							 */
/*********************************************************************/
function loadPageElement() {
	for (var i=0; i<listTotal; i++) {
		document.getElementById("menuList"+i).style.left = leftPx[i]+"px";
		document.getElementById("menuListImg"+i).src = eval("oldImage"+i+".src");
		//document.getElementById("menuList"+i).style.backgroundImage = "url("+eval("oldImage"+i+".src")+")";
		document.getElementById("fontList"+i).innerHTML = fontListArray[i];
	}
	var hiddNum0 = focusNum-1 >= 0 ? (focusNum-1) : (listTotal+focusNum-1); 
	document.getElementById("menuList"+focusNum).style.opacity = "0.0";
	document.getElementById("menuList"+hiddNum0).style.opacity = "0.0"; 
	
	var numImage = (focusNum+4) >= listTotal ? (focusNum-5) : (focusNum+4);
	document.getElementById("menuListImg"+numImage).src = eval("newImage"+numImage+".src");
	//document.getElementById("menuList"+numImage).style.backgroundImage = "url("+eval("newImage"+numImage+".src")+")";
	document.getElementById("fontList"+numImage).style.fontSize = "28px";
	document.getElementById("fontList"+numImage).style.color = "#FFFFFF";
	
	//setTimeout("moveMenu();", 400);
	opacityIcon();
	return;
}

/*********************************************************************/
/* Function: opacityIcon											 */
/* Description: 初始化后，隐藏左右两边的图标							 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2011-03-07							 */
/*********************************************************************/
function opacityIcon() {
	document.getElementById("menuList"+focusNum).style.opacity = "0";
	var opacityNum = (focusNum+1) >= listTotal ? 0 : (focusNum+1);
	document.getElementById("menuList"+opacityNum).style.opacity = "0";
	opacityNum = (focusNum-1) < 0 ? (listTotal+focusNum-1) : (focusNum-1);
	document.getElementById("menuList"+opacityNum).style.opacity = "0";
	opacityNum = (focusNum-2) < 0 ? (listTotal+focusNum-2) : (focusNum-2);
	document.getElementById("menuList"+opacityNum).style.opacity = "0";
	return;
}

/*********************************************************************/
/* Function: timerFont												 */
/* Description: 焦点文字缩放效果										 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-11-01							 */
/*********************************************************************/
var timerNum = 0;
var timerFontStatus;
function timerFont() {
	var numImage = (focusNum+4) >= listTotal ? (focusNum-5) : (focusNum+4);
	if (timerNum ==0) {
		//document.getElementById("fontList"+numImage).style.webkitTransform = "scale(1.4)";
		document.getElementById("fontList"+numImage).style.fontSize = "28px";
		timerNum = 1;
	} else {
		//document.getElementById("fontList"+numImage).style.webkitTransform = "scale(1.0)";
		document.getElementById("fontList"+numImage).style.fontSize = "22px";
		timerNum = 0;
	}
	timerFontStatus = window.setTimeout("timerFont();", 800);
	return;
}

/*********************************************************************/
/* Function: loadImage												 */
/* Description: 载入图片												 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-10-09							 */
/*********************************************************************/
var oldImage0 = new Image();
var oldImage1 = new Image();
var oldImage2 = new Image();
var oldImage3 = new Image();
var oldImage4 = new Image();
var oldImage5 = new Image();
var oldImage6 = new Image();
var oldImage7 = new Image();
var oldImage8 = new Image();
var newImage0 = new Image();
var newImage1 = new Image();
var newImage2 = new Image();
var newImage3 = new Image();
var newImage4 = new Image();
var newImage5 = new Image();
var newImage6 = new Image();
var newImage7 = new Image();
var newImage8 = new Image();
//var bgImageOld = new Array();
//var bgImageNew = new Array();
function loadImage() {
	//oldImage0.src = "image/Settings.png";
	oldImage0.src = "image/new_flash_off.png";
	//oldImage1.src = "image/vod.png";
	oldImage1.src = "image/new_Settings_off.png";
	//oldImage2.src = "image/network.png";  
	oldImage2.src = "image/new_vod_off.png";  
	//oldImage3.src = "image/iptv.png"; 
	oldImage3.src = "image/new_localPlayer_off.png"; 
	//oldImage4.src = "image/dvb.png";
	oldImage4.src = "image/new_iptv_off.png";
	//oldImage5.src = "image/pvr.png";
	oldImage5.src = "image/new_dvb_off.png";
	//oldImage5.src = "image/new_internet_off.png";
	//oldImage6.src = "image/OnDemand.png";
	oldImage6.src = "image/new_pvr_off.png";
	oldImage7.src = "image/new_OnDemand_off.png";
	oldImage8.src = "image/new_internet_off.png";
	
	//newImage0.src = "image/Settings_on.png";
	newImage0.src = "image/new_flash_on.png";
	//newImage1.src = "image/vod_on.png";
	newImage1.src = "image/new_Settings_on.png";
	//newImage2.src = "image/network_on.png"; 
	newImage2.src = "image/new_vod_on.png"; 
	//newImage3.src = "image/iptv_on.png"; 
	newImage3.src = "image/new_localPlayer_on.png"; 
	//newImage4.src = "image/dvb_on.png";
	newImage4.src = "image/new_iptv_on.png";
	//newImage5.src = "image/pvr_on.png";
	newImage5.src = "image/new_dvb_on.png";
	//newImage5.src = "image/new_internet_on.png";
	//newImage6.src = "image/OnDemand_on.png";
	newImage6.src = "image/new_pvr_on.png";
	newImage7.src = "image/new_OnDemand_on.png";
	newImage8.src = "image/new_internet_on.png";
	
	return;
}

/*********************************************************************/
/* Function: keyRight												 */
/* Description: right按键处理										 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-10-09							 */
/*********************************************************************/
var stopMoveStatus = 0;		//判断移动状态，0 非移动状态（可移动），1 移动状态（不可移动）
var moveLeftOrRight = "";	//记录主菜单移动方向
var leftPx = new Array(-311, -92, 127, 346, 565, 784, 1003, 1222, 1441);	//菜单列表左顶点坐标
function keymenuRight() {
	if (developTipsStatus) {
		developTipsStatus = false;
		document.getElementById("developTips").style.opacity = 0;
	}
	if (menuStatus == 1 && stopMoveStatus == 0) {
		hiddMenuByTime(); 
		stopMoveStatus = 1;
		moveLeftOrRight = "right";
		imageChangeMove();
		var hiddMoveDiv = focusNum-3;
		hiddMoveDiv = hiddMoveDiv < 0 ? hiddMoveDiv+listTotal : hiddMoveDiv; 
		changeDivLeftPx(); 
		var showMoveDiv = focusNum+1;
		showMoveDiv = showMoveDiv > (listTotal-1) ? 0 : showMoveDiv;
		document.getElementById("menuList"+hiddMoveDiv).style.opacity = "0.0";
		document.getElementById("menuList"+showMoveDiv).style.opacity = "1.0";
		focusNum--;
		focusNum = focusNum < 0 ? (listTotal-1) : focusNum; 
		setTimeout("focusIconMove();", 100);
	}
	return;
}
 
/*********************************************************************/
/* Function: keyLeft												 */
/* Description: left按键处理										 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-10-10							 */
/*********************************************************************/
function keymenuLeft() {
	if (developTipsStatus) {
		developTipsStatus = false;
		document.getElementById("developTips").style.opacity = 0;
	}
	if (menuStatus == 1 && stopMoveStatus == 0) {
		hiddMenuByTime();
		stopMoveStatus = 1;
		moveLeftOrRight = "left";
		imageChangeMove();
		focusNum++;
		focusNum = focusNum > (listTotal-1) ? 0 : focusNum;
		var hiddMoveDiv = focusNum-3;
		hiddMoveDiv = hiddMoveDiv < 0 ? hiddMoveDiv+listTotal : hiddMoveDiv;
		changeDivLeftPx();
		var showMoveDiv = focusNum+1;
		showMoveDiv = showMoveDiv > (listTotal-1) ? 0 : showMoveDiv;
		document.getElementById("menuList"+hiddMoveDiv).style.opacity = "1.0";
		document.getElementById("menuList"+showMoveDiv).style.opacity = "0.0"; 
		setTimeout("focusIconMove();", 100);
	}
	return;
}

/*********************************************************************/
/* Function: keyEnter												 */
/* Description: keyEnter按键处理									 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-10-12							 */
/*********************************************************************/
var firstGotoMenu = false;		//记录是否为第一次进入页面
function keymenuEnter() {
	if (menuStatus == 0) {
		return;
	}
	if (focusNum == 1 || focusNum == 5) {
		window.clearTimeout(timerHiddMenu);
		gotoPage();
	} else {
		moveMenu();
		setTimeout("gotoPage();", 800);
	}
	return;
}

/*********************************************************************/
/* Function: changeDivLeftPx										 */
/* Description: 改变菜单定位显示移动效果							 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-10-12							 */
/*********************************************************************/
function changeDivLeftPx() {
	if (moveLeftOrRight == "left") {
		var temp = leftPx.pop();
		leftPx.unshift(temp);
		/*var temp = leftPx[8];
		leftPx[8] = leftPx[7];
		leftPx[7] = leftPx[6];
		leftPx[6] = leftPx[5];
		leftPx[5] = leftPx[4];
		leftPx[4] = leftPx[3];
		leftPx[3] = leftPx[2];
		leftPx[2] = leftPx[1];
		leftPx[1] = leftPx[0];
		leftPx[0] = temp;*/
	} else {
		var temp = leftPx.shift();
		leftPx.push(temp);
		/*var temp = leftPx[0];
		leftPx[0] = leftPx[1];
		leftPx[1] = leftPx[2];
		leftPx[2] = leftPx[3];
		leftPx[3] = leftPx[4];
		leftPx[4] = leftPx[5];
		leftPx[5] = leftPx[6];
		leftPx[6] = leftPx[7];
		leftPx[7] = leftPx[8]
		leftPx[8] = temp;*/
	}
	for (var i=0; i<listTotal; i++) {
		document.getElementById("menuList"+i).style.left = leftPx[i]+"px";
	}
	return;
}

/*********************************************************************/
/* Function: imageChangeMove										 */
/* Description: 焦点图标恢复为普通图标								 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-10-11							 */
/*********************************************************************/
function imageChangeMove() {
	var numImage = (focusNum+4) >= listTotal ? (focusNum-5) : (focusNum+4);
	document.getElementById("menuListImg"+numImage).src = eval("oldImage"+numImage+".src");
	//document.getElementById("menuList"+numImage).style.backgroundImage = "url("+eval("oldImage"+numImage+".src")+")";
	document.getElementById("fontList"+numImage).style.fontSize = "18px";
	document.getElementById("fontList"+numImage).style.color = "#666666";
	//document.getElementById("menuList"+numImage).style.webkitTransform = "scale(1.0)";
}

/*********************************************************************/
/* Function: focusIconMove											 */
/* Description: 普通图标变为焦点图标								 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-10-11							 */
/*********************************************************************/
function focusIconMove() {
	var numImage = (focusNum+4) >= listTotal ? (focusNum-5) : (focusNum+4);
	document.getElementById("menuListImg"+numImage).src = eval("newImage"+numImage+".src");
	//document.getElementById("menuList"+numImage).style.backgroundImage = "url("+eval("newImage"+numImage+".src")+")";
	document.getElementById("fontList"+numImage).style.fontSize = "28px";
	document.getElementById("fontList"+numImage).style.color = "#FFFFFF";
	//document.getElementById("menuList"+numImage).style.webkitTransform = "scale(1.2)";
	stopMoveStatus = 0;
	return;
}
 
/*********************************************************************/
/* Function: gotoPage												 */
/* Description: 进入选中页面										 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-10-12							 */
/*********************************************************************/
var divLeftArray;
function gotoPage() { 
	divLeftArray = focusNum+"?"+leftPx.join(":");
	switch (focusNum) {
		case 0:	//iptv
			document.location.href = "iptv.html?-1"; 
			break;
		case 1:	//dvb
			//document.getElementById("developTips").style.opacity = 1;
			//developTipsStatus = true;
			document.location.href = "DVBdispatch.html";  			
			break;
		case 2:	//pvr
			document.location.href = "pvr.html";  			
			break;
		case 3: //css sample
			document.location.href = "show.html";  			
			break;
		case 4: //website
			document.location.href = "website.html"; 
			break;
		case 5:	//flash
			document.getElementById("developTips").style.opacity = 1;
			developTipsStatus = true;
			//document.location.href = "menu_test.html"; 
			break;
		case 6:	//settings
			document.location.href = "settings.html"; 
			break;
		case 7:	//vod
			document.location.href = "vod.html"; 
			break; 
		case 8:	//local player
			document.location.href = "local_player/menu.html"; 
			break;
		default:
			break;
	} 
	return;
} 


/*********************************************************************/
/* Function: bodyFun				     							 */
/* Description: 页面Div               								 */
/* Parameters:														 */
/* Author&Date: zhaopengjun by 2010-10-11							 */
/*********************************************************************/
function bodyFun() {
	var appendChild;  
	var objmenuDiv=document.createElement("div");
	objmenuDiv.id="menuDiv";  
	objmenuDiv.innerHTML="<div id='opa_bg'></div><div id='leftLine'></div><div id='rightLine'></div><div id='menuFocus'></div><div id='menuList0' takin_layer_alone='true'><img id='menuListImg0' /><div id='fontList0'></div></div><div id='menuList1' takin_layer_alone='true'><img id='menuListImg1' /><div id='fontList1'></div></div><div id='menuList2' takin_layer_alone='true'><img id='menuListImg2' /><div id='fontList2'></div></div><div id='menuList3' takin_layer_alone='true'><img id='menuListImg3' /><div id='fontList3'></div></div><div id='menuList4' takin_layer_alone='true'><img id='menuListImg4' /><div id='fontList4'></div></div><div id='menuList5' takin_layer_alone='true'><img id='menuListImg5' /><div id='fontList5'></div></div><div id='menuList6' takin_layer_alone='true'><img id='menuListImg6' /><div id='fontList6'></div></div><div id='menuList7' takin_layer_alone='true'><img id='menuListImg7' /><div id='fontList7'></div></div><div id='menuList8' takin_layer_alone='true'><img id='menuListImg8' /><div id='fontList8'></div></div><div id='menuLeft'></div><div id='menuRight'></div>";  
	document.body.appendChild(objmenuDiv);
	createDevelopText();
	return;
}

var developTipsStatus = false;
function createDevelopText() {
	var tips = document.createElement("div");
	tips.id = "developTips";
	tips.style.position = "absolute";
	tips.style.top = "300px";
	tips.style.left = "400px";
	tips.style.width = "480px";
	tips.style.height = "50px";
	tips.style.fontSize = "24px";
	tips.style.color = "#999";
	tips.style.textAlign = "center";
	tips.style.lineHeight = "50px";
	tips.style.opacity = "0";
	tips.innerHTML = "Developing...";
	document.body.appendChild(tips);
	return;
}
