// JavaScript Document
/*********************************************************************/
/* Function: showCurrentTime                                         */
/* Description: 显示日期及时间			                             */
/* Parameters: DIV的ID                                               */
/* Author&Date: zhaopengjun  2011-01-13                              */
/*********************************************************************/
function showCurrentTime(showId) {
	var currentT = player.Ag_time_getLocalTime();
	var ret = currentT.split("T");
	var currentY = ret[0].substring(0,4);
	var currentMon = ret[0].substring(4,6);
	var currentD = ret[0].substring(6,8);
	var currentH = ret[1].substring(0,2);
	var currentMin = ret[1].substring(2,4);
	var currentS = ret[1].substring(4,6);
	document.getElementById(showId).innerHTML = currentH+":"+currentMin+"&nbsp;&nbsp;"+currentMon+"/"+currentD;
}

/*********************************************************************/
/* Function: showKeyboardBackFun                                     */
/* Description: 关闭小键盘后的处理										 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-03-15                              */
/*********************************************************************/
function showKeyboardBackFun() {
	if (itemPoint == 0) {
		var name = document.getElementById("valueList20").innerHTML;
		var pass = document.getElementById("valueList21").innerHTML;
		if (name == "") {
			name = player.Ag_network_getPPPoEUserName();//"yuxing"
			document.getElementById("valueList20").innerHTML = name;
		}
		if (pass == "") {
			passwordValue = player.Ag_network_getPPPoEPasswd();// "123456" .
			var replaceStr = "";
			for (var i=0; i<passwordValue.length; i++) {
				replaceStr += "*";
			}
			document.getElementById("valueList21").innerHTML = replaceStr;
		}
		rightListDownMove();
	} else if (itemPoint == 1) {
		keyUpgradeDown();
	} else if (itemPoint == 5) {
		keyAddressDown();
	}
	return;
}

/*********************************************************************/
/* Function: showPageFull                                            */
/* Description: 主菜单自动隐藏时，显示页面	                             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-02-11                              */
/*********************************************************************/
function showPageFull() {
	//window.clearTimeout(TimerMenu);
	document.getElementById("bodyBack").style.top = "0px" ;
	return;
}

/*********************************************************************/
/* Function: init                                                    */
/* Description: 加载页面时对导航菜单进行定位                             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
var player = new AVPlayer();
var div_arr = ['item0','item1','item2','item3','item4','item5','item6','item7'];//导航中有的菜单条目
function init()
{
	focusNum= 6;
	var leftPxSettings = "346:565:784:1003:1222:1441:-311:-92:127";
	divLeftArray = focusNum+"?"+leftPxSettings;
	htmlHref = fontListArray[0] + "?" + divLeftArray;
	menuinit(); 
	player.printf(1, "focusNum==========================/*/*///"+focusNum);		
	setBackOpacity();
	for(var i = 0; i< div_arr.length; i++) {
		document.getElementById("item"+i).style.left = 1+288*i+'px';
	}
	showCurrentTime("timeShow");
	setInterval("showCurrentTime('timeShow');", 60000);
	getDVBInforFun();
	getVideoInfo();
	getNetInfo();
	getTimeInfo();
	getUpgradeInfo();
	getHomePageInfor();
	getInforFun();
	return;
}

/*********************************************************************/
/* Function: setBackOpacity	                                         */
/* Description: 设置透明度			                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function setBackOpacity()
{
	document.getElementById('logoShow').style.opacity = '0.7';
	//document.getElementById('upNavig').style.opacity = '0.7';
	document.getElementById('downItem').style.opacity = '0.7';
	return;
}

/*********************************************************************/
/* Function: keyEvent                                                */
/* Description: 遥控器按键处理函数                                     */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
var navigatorStatus = true;//焦点在导航时为true；不在导航时为false
var TimerMenu;
//document.onkeypress = keyEvent;
document.onkeydown = keyEvent;
function keyEvent(e)
{
	if (keyboardStatus) {
		keyBoardEvent(e);
		return false;
	}
	var keyValue = e.which;
	switch(keyValue){
		case 48: 		 
		case 49:  
		case 50:  
		case 51:  
		case 52: 
		case 53: 
		case 54: 	
		case 55: 
		case 56: 
		case 57:
			var num = keyValue-48;
			player.printf(1, "inputIPstatus===========inputIPstatus===============/*/*///"+inputIPstatus);		
			player.printf(1, "inputTimeStatus===========inputTimeStatus===============/*/*///"+inputTimeStatus);		
			if (inputIPstatus) {
				ipAddressInput(num);
			} else if (inputTimeStatus) {
				inputTimeTextFun(num);
			} else {
				DvbKeyNum(num); 
			}
			break;
		case 403:
		   	TotalFun();
		  	break;
		case 37://left
			keyLeft();
			return false;
			break;
		case 39://right
			keyRight();
			return false;
			break;
		case 38://up
			keyUp();
			return false;
			break;
		case 40://down
			keyDown();
			return false;
			break;
		case 13:
			keyEnter();
			return false;
			break;
		case 213:
		case 203:
			keyBack();
			return false;
			break;
		case 8:
			DvbKeyBackNum();
			return false;
			break;
		case 1073742338: //menu
			if(StopKeystates){
				return;
			}
			if (menuStatus == 0) {
				document.getElementById("bodyBack").style.top = "-720px" ;
				window.clearTimeout(TimerMenu);		
				TimerMenu = setTimeout("moveMenu()",1000); 
			}else{
				window.clearTimeout(TimerMenu);		
				document.getElementById("bodyBack").style.top = "0px" ;
				moveMenu();
			}
			return (false);
			break;
		case 1073742392:	//UPGRADE_GETFILE_ERROR
			document.getElementById("upgradeTipsDivTxt").innerHTML = "Get file error !";
			if (!upgradeTipsStatus) {
				document.getElementById("upgradeTipsDiv").style.opacity = "1.0";
				upgradeTipsStatus = true;
			}
			upgradeStatus = false;
			timerUpgradeTips = setTimeout("hiddUpgradeTips();", 3000);
			break;
		case 1073742395:	//UPGRADE_FAILED
			document.getElementById("upgradeTipsDivTxt").innerHTML = "Upgrade failed !";
			if (!upgradeTipsStatus) {
				document.getElementById("upgradeTipsDiv").style.opacity = "1.0";
				upgradeTipsStatus = true;
			}
			upgradeStatus = false;
			timerUpgradeTips = setTimeout("hiddUpgradeTips();", 3000);
			break;
		case 1073742396:	//UPGRADE_FINISH
			document.getElementById("upgradeTipsDivTxt").innerHTML = "Upgrade finish !";
			if (!upgradeTipsStatus) {
				document.getElementById("upgradeTipsDiv").style.opacity = "1.0";
				upgradeTipsStatus = true;
			}
			upgradeStatus = false;
			timerUpgradeTips = setTimeout("hiddUpgradeTips();", 3000);
			break;
		default:
			break;
	}
	return;
}

/*********************************************************************/
/* Function: keyLeft                                                 */
/* Description: 左键的处理                                            */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyLeft()
{	
	if(menuStatus==1){
		keymenuRight();
		return (false);
	} 
	if (navigatorStatus) {
		focusToLeft();
	} else {
		if(itemPoint==0){
			keyNetLeft();
		}
		else if (itemPoint==1) {
			keyUpgradeLeft();
		}
		else if (itemPoint==2) {
			keyDVBLeft();
		}
		else if (itemPoint==3) {
			keyTimeLeft();
		}
		else if (itemPoint==4) {
			keyVideoLeft();
		}
		else if (itemPoint==5) {
			keyAddressLeft();
		}
		else if (itemPoint==6) {
			keyDefaultLeft();
		}
		else if (itemPoint==7) {
			keyInfoLeft();
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyRight                                                */
/* Description: 右键的处理                                            */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyRight()
{
	if(menuStatus==1){
		keymenuLeft(); 
		return (false);
	}
	if (navigatorStatus) {
		focusToRight();
	} else {
		if(itemPoint==0){
			keyNetRight();
		}
		else if (itemPoint==1) {
			keyUpgradeRight();
		}
		else if (itemPoint==2) {
			keyDVBRight();
		}
		else if (itemPoint==3) {
			keyTimeRight();
		}
		else if (itemPoint==4) {
			keyVideoRight();
		}
		else if (itemPoint==5) {
			keyAddressRight();
		}
		else if (itemPoint==6) {
			keyDefaultRight();
		}
		else if (itemPoint==7) {
			keyInfoRight();
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyDown                                                 */
/* Description: 下键的处理                                            */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyDown()
{
	if(menuStatus==1){ 
		return;
	}
	if(itemPoint==0){
		keyNetDown();
	}
	else if (itemPoint==1) {
		keyUpgradeDown();
	}
	else if (itemPoint==2) {
		keyDVBDown();
	}
	else if (itemPoint==3) {
		keyTimeDown();
	}
	else if (itemPoint==4) {
		keyVideoDown();
	}
	else if (itemPoint==5) {
		keyAddressDown();
	}
	else if (itemPoint==6) {
		keyDefaultDown();
	}
	else if (itemPoint==7) {
		keyInfoDown();
	}
	return;
}

/*********************************************************************/
/* Function: keyUp                                                   */
/* Description: 上键的处理                                            */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyUp()
{
	if(menuStatus==1){ 
		return;
	}
	if (navigatorStatus) {
		return;
	}
	if(itemPoint==0){
		keyNetUp();
	}
	else if (itemPoint==1) {
		keyUpgradeUp();
	}
	else if (itemPoint==2) {
		keyDVBUp();
	}
	else if (itemPoint==3) {
		keyTimeUp();
	}
	else if (itemPoint==4) {
		keyVideoUp();
	}
	else if (itemPoint==5) {
		keyAddressUp();
	}
	else if (itemPoint==6) {
		keyDefaultUp();
	}
	else if (itemPoint==7) {
		keyInfoUp();
	}
	return;
}

/*********************************************************************/
/* Function: keyEnter                                                */
/* Description: 确认键的处理                                           */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyEnter()
{
	if(menuStatus==1){
		if(focusNum ==6){
			window.clearTimeout(TimerMenu);		
			document.getElementById("bodyBack").style.top = "0px" ;
			moveMenu();
			return;
		} 
		keymenuEnter();
		return (false);
	} 
	if (navigatorStatus) {
		keyDown();
		//gotoChildList();
	} else if (itemPoint==0) {
		keyNetEnter();
	} else if (itemPoint==1) {
		keyUpgradeEnter();
	} else if (itemPoint==2) {
		keyDVBEnter();
	} else if (itemPoint==3) {
		keyTimeEnter();
	} else if (itemPoint==4) {
		keyVideoEnter();
	} else if (itemPoint==5) {
		keyAddressEnter();
	} else if (itemPoint==6) {
		keyDefaultEnter();
	} else if (itemPoint==7) {
		keyInfoEnter();
	}
	return;
}

/*********************************************************************/
/* Function: keyBack	                                             */
/* Description: 返回键的处理                                           */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-01-19                              */
/*********************************************************************/
function keyBack() {
	if(menuStatus==1){ 
		return;
	}
	if (navigatorStatus) {
		if(StopKeystates){
			return;
		}
		if (menuStatus == 0) {
			document.getElementById("bodyBack").style.top = "-720px" ;
			window.clearTimeout(TimerMenu);		
			TimerMenu = setTimeout("moveMenu()",1000); 
		}
		return;
	}
	if(itemPoint==0){
		keyNetBack();
	}
	else if (itemPoint==1) {
		keyUpgradeBack();
	}
	else if (itemPoint==2) {
		keyDVBBack();
	}
	else if (itemPoint==3) {
		keyTimeBack();
	}
	else if (itemPoint==4) {
		keyVideoBack();
	}
	else if (itemPoint==5) {
		keyAddressBack();
	}
	else if (itemPoint==6) {
		keyDefaultBack();
	}
	else if (itemPoint==7) {
		keyInfoBack();
	}
	return;
}

/*********************************************************************/
/* Function: focusToRight                                            */
/* Description: 在导航上，左键的处理                                    */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
var focusPoint = 0;//导航上，焦点所在的位置(0~3之间，因为目前规定导航上最多显示4个菜单)
var itemPoint = 0;//焦点指定当前的菜单索引号
var itemTotal = div_arr.length;//菜单总数
function focusToRight()
{
	//3为导航中显示菜单的个数
	if (focusPoint>=3) {//焦点移动到最右侧时，菜单移动的处理
		if(itemPoint >= itemTotal-1) {
			return;//已经显示了最后一个菜单
		}
		for(var i = 0; i< itemTotal; i++) {
			var leftTemp = document.getElementById("item"+i).style.left;
			leftTemp = parseInt(leftTemp.split('px')[0]); 			
			document.getElementById("item"+i).style.left =  (leftTemp-288)+'px';
		}
		itemPoint++;
	} else {
		focusPoint++;
		itemPoint ++;
		var moveWidth =focusPoint * 288+1;
		document.getElementById("focusBar").style.left = moveWidth+'px';
		document.getElementById("focusBarMove").style.left = moveWidth+'px';
	}
	document.getElementById("item"+(itemPoint-1)).style.color = '#b2b2b2';
	middleMove(itemPoint-1,itemPoint,0);
	return;
}

/*********************************************************************/
/* Function: focusToLeft                                             */
/* Description: 在导航上，右键的处理                                    */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function focusToLeft()
{
	if (focusPoint <= 0) {
		if(itemPoint <= 0) {
			return;//已经显示了第一个菜单
		}
		for(var i = 0; i< div_arr.length; i++) {
			var leftTemp = document.getElementById("item"+i).style.left;
			leftTemp = parseInt(leftTemp.split('px')[0]); 			
			document.getElementById("item"+i).style.left =  (leftTemp+288)+'px';
		}
		itemPoint--;
	} else {
		focusPoint--;
		itemPoint--;
		var moveWidth = focusPoint*288+1;
		document.getElementById("focusBar").style.left = moveWidth+'px';
		document.getElementById("focusBarMove").style.left = moveWidth+'px';
	}
	document.getElementById("item"+(itemPoint+1)).style.color = '#b2b2b2';
	middleMove(itemPoint+1,itemPoint,1);
	return;
}

/*********************************************************************/
/* Function: middleMove                                              */
/* Description: 中间部分的移动                                         */
/* Parameters:beginNum之前的,lastNum当前的,keyRightLeft左右标识         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function middleMove(beginNum,lastNum,keyRightLeft)
{
	var pos = itemPoint == (itemTotal-1) ? 0 : 1 ;
	document.getElementById("rightGt").style.opacity = pos;
	pos = itemPoint == 0 ? 0 : 1 ;
	document.getElementById("leftLt").style.opacity = pos;
	if (keyRightLeft==0) {
		document.getElementById("middle"+lastNum).style.visibility = 'visible';
		document.getElementById("middle"+beginNum).style.left = '-1080px';
		document.getElementById("middle"+lastNum).style.left = '108px';
	} else {
		document.getElementById("middle"+beginNum).style.left = '1280px';
		document.getElementById("middle"+lastNum).style.left = '108px';
	}
	setTimeout('itemFontColor()',300);
	return;
}

/*********************************************************************/
/* Function: itemFontColor                                           */
/* Description: 导航上焦点文字变亮        								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function itemFontColor()
{
	document.getElementById("item"+itemPoint).style.color = '#ffffff';
	return;
}

///////////////////////////////////////////////视频///设置页面按键处理///////////////////////////////////////////////

/*********************************************************************/
/* Function: getVideoInfo	                                         */
/* Description: 获得视频设置页面的相关信息 								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-04                              */
/*********************************************************************/
var videoFormatMode;		//当前视频制式
var videoScreenMode;		//屏幕比例
var videoScalingMode;		//输出制式
function getVideoInfo() {
	videoFormatMode = player.Ag_video_getTVSystem();
	videoScreenMode = player.Ag_video_getAspectRatio();// 0 is 4:3, 1 is 16:9.
	videoScalingMode = player.Ag_video_getDisplayMode();
	document.getElementById("video_mess0").innerHTML = formatArray[videoFormatMode];
	document.getElementById("video_mess1").innerHTML = screenArray[videoScreenMode];
	document.getElementById("video_mess2").innerHTML = scalingArray[videoScalingMode];
	//player.printf(1, "=============videoFormatMode============="+videoFormatMode);	
	//player.printf(1, "=============videoScreenMode============="+videoScreenMode);	
	//player.printf(1, "=============videoScalingMode============="+videoScalingMode);	
	return;
}

/*********************************************************************/
/* Function: keyVideoLeft	                                         */
/* Description: 视频设置页面，左键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
var videoSetFocus = 0;		//视频设置页面的焦点
//var formatArray = new Array("NTSC", "PAL", "SECAM", "480P", "576P", "720p/50Hz", "720p/60Hz", "1080i/50Hz", "1080i/60Hz", "1080p/60Hz", "1080p/24Hz", "1080p/25Hz", "1080p/30Hz");
var formatArray = new Array("NTSC", "PAL", "SECAM", "480P", "576P", "720p/50Hz", "720p/60Hz", "1080i/50Hz", "1080i/60Hz");
var screenArray = new Array("4:3", "16:9");
var scalingArray = new Array("Letterbox", "Pan&scan", "Full", "Zoom", "Full noliner");
function keyVideoLeft()
{
	if (videoSetFocus == 0) {
		videoFormatMode--;
		videoFormatMode = videoFormatMode < 0 ? (formatArray.length-1) : videoFormatMode;
		document.getElementById("video_mess0").innerHTML = formatArray[videoFormatMode];
	} else if (videoSetFocus == 1) {
		videoScreenMode--;
		videoScreenMode = videoScreenMode < 0 ? (screenArray.length-1) : videoScreenMode;
		document.getElementById("video_mess1").innerHTML = screenArray[videoScreenMode];
	} else if (videoSetFocus == 2) {
		videoScalingMode--;
		videoScalingMode = videoScalingMode < 0 ? (scalingArray.length-1) : videoScalingMode;
		document.getElementById("video_mess2").innerHTML = scalingArray[videoScalingMode];
	} else {
		if (userLeftStatus) {
			return;
		} else {
			userLeftStatus = true;
			document.getElementById("buttonFocus").style.left = '0px';
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyVideoRight	                                         */
/* Description: 视频设置页面，右键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyVideoRight()
{
	if (videoSetFocus == 0) {
		videoFormatMode++;
		videoFormatMode = videoFormatMode >= formatArray.length ? 0 : videoFormatMode;
		document.getElementById("video_mess0").innerHTML = formatArray[videoFormatMode];
	} else if (videoSetFocus == 1) {
		videoScreenMode++;
		videoScreenMode = videoScreenMode >= screenArray.length ? 0 : videoScreenMode;
		document.getElementById("video_mess1").innerHTML = screenArray[videoScreenMode];
	} else if (videoSetFocus == 2) {
		videoScalingMode++;
		videoScalingMode = videoScalingMode >= scalingArray.length ? 0 : videoScalingMode;
		document.getElementById("video_mess2").innerHTML = scalingArray[videoScalingMode];
	} else {
		if (userLeftStatus) {
			userLeftStatus = false;
			document.getElementById("buttonFocus").style.left = '210px';
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyVideoUp		                                         */
/* Description: 视频设置页面，上键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
var userLeftStatus = true;//焦点在"save"上时为true；在"cancel"上时为false
function keyVideoUp()
{
	if (videoSetFocus == 0) {
		navigatorStatus = true;
		document.getElementById("videoFocus").style.opacity = "0.0";
		document.getElementById("focusBarMove").style.opacity = '0.0';
		getVideoInfo();
	} else {
		if (videoSetFocus == 3) {
			document.getElementById("videoFocus").style.opacity = "1.0";
			document.getElementById("buttonFocus").style.opacity = '0.0';
			videoSetFocus = 2;
			return;
		}
		videoSetFocus--;
		document.getElementById("videoFocus").style.top = 73+videoSetFocus*50+"px";
	}
	return;
}

/*********************************************************************/
/* Function: keyVideoDown	                                         */
/* Description: 视频设置页面，下键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyVideoDown()
{
	if (navigatorStatus) {
		navigatorStatus = false;
		videoSetFocus = 0;
		userLeftStatus = true;
		document.getElementById("videoFocus").style.webkitTransitionDuration = "0s";
		document.getElementById("videoFocus").style.top = 73+videoSetFocus*50+"px";
		setTimeout("showSettingsFocus('videoFocus');", 10);
		document.getElementById("focusBarMove").style.opacity = '1.0';
		document.getElementById("buttonFocus").style.left = '0px';
	} else if (videoSetFocus >= 3) {
		return;
	} else {
		if (videoSetFocus == 2) {
			document.getElementById("videoFocus").style.opacity = "0.0";
			document.getElementById("buttonFocus").style.opacity = '1.0';
			videoSetFocus = 3;
			if (userLeftStatus) {
				document.getElementById("buttonFocus").style.left = '0px';
			} else {
				document.getElementById("buttonFocus").style.left = '210px';
			}
			return;
		}
		videoSetFocus++;
		videoSetFocus = videoSetFocus >= 3 ? (videoSetFocus-1) : videoSetFocus;
		document.getElementById("videoFocus").style.top = 73+videoSetFocus*50+"px";
	}
	return;
}

/*********************************************************************/
/* Function: showSettingsFocus                                       */
/* Description: 显示各设置页面的焦点    								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function showSettingsFocus(showId) {
	document.getElementById(showId).style.webkitTransitionDuration = "0.4s";
	document.getElementById(showId).style.opacity = "1.0";
	return;
}

/*********************************************************************/
/* Function: keyVideoEnter	                                         */
/* Description: 视频设置页面，确认键处理   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyVideoEnter()
{
	if (videoSetFocus != 3) {
		return;
	}
	if (userLeftStatus) {
		var mode0 = player.Ag_video_setTVSystem(videoFormatMode);
		var mode1 = player.Ag_video_setAspectRatio(videoScreenMode);
		var mode2 = player.Ag_video_setDisplayMode(videoScalingMode);
	} else {
		getVideoInfo();
	}
	videoSetFocus = 0;
	userLeftStatus = true;
	navigatorStatus = true;
	document.getElementById("buttonFocus").style.opacity = '0.0';
	document.getElementById("focusBarMove").style.opacity = '0.0';
	document.getElementById("videoFocus").style.top = 73+videoSetFocus*50+"px";
	return;
}

/*********************************************************************/
/* Function: keyVideoBack											 */
/* Description: 网络设置页面，返回键处理								 */
/* Parameters:														 */
/* Author&Date: zhaopengjun  2011-01-19                              */
/*********************************************************************/
function keyVideoBack() {
	if (videoSetFocus == 3) {
		document.getElementById("buttonFocus").style.opacity = '0.0';
	} else {
		document.getElementById("videoFocus").style.opacity = "0.0";
	}
	navigatorStatus = true;
	document.getElementById("focusBarMove").style.opacity = '0.0';
	getVideoInfo();
	return;
}

///////////////////////////////////////////////网络///设置页面按键处理///////////////////////////////////////////////

/*********************************************************************/
/* Function: getNetInfo	         		                             */
/* Description: 获得网络设置的信息     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-04                              */
/*********************************************************************/
var netLinkMode;		//link mode
var netIPAddress;		//IP地址
var netSubmask;			//submask
var netGateway;			//gateway
var netDNS;				//DNS
var netNTP;				//NTP
var netUserName;		//user name
var netUserPassword		//user password
function getNetInfo() {
	netLinkMode = player.Ag_network_getLinkMode();//1 is dhcp, 2 is pppoe, other static.
	
	netIPAddress = player.Ag_network_getIPAddress();//192.168.100.49
	netSubmask = player.Ag_network_getSubnetMask();//"255.255.255.0".
	netGateway = player.Ag_network_getDefaultGateway();//"192.168.100.1" .
	netDNS = player.Ag_network_getDNSServer(1);//192.168.100.97. 
	netNTP = player.Ag_network_getNTPServer();//192.168.100.97. 
	
	netUserName = player.Ag_network_getPPPoEUserName();//"yuxing"
	passwordValue = player.Ag_network_getPPPoEPasswd();// "123456" .
	var replaceStr = "";
	for (var i=0; i<passwordValue.length; i++) {
		replaceStr += "*";
	}
	var ipText = netIPAddress.split(".");
	for (var i=0; i<ipText.length; i++) {
		document.getElementById("ipAddressText0"+i).innerHTML = ipText[i];
	}
	var submaskText = netSubmask.split(".");
	for (var i=0; i<submaskText.length; i++) {
		document.getElementById("ipAddressText1"+i).innerHTML = submaskText[i];
	}
	var gatewayText = netGateway.split(".");
	for (var i=0; i<gatewayText.length; i++) {
		document.getElementById("ipAddressText2"+i).innerHTML = gatewayText[i];
	}
	var dnsText = netDNS.split(".");
	for (var i=0; i<dnsText.length; i++) {
		document.getElementById("ipAddressText3"+i).innerHTML = dnsText[i];
	}
	var ntpText = netNTP.split(".");
	for (var i=0; i<ntpText.length; i++) {
		document.getElementById("ipAddressText4"+i).innerHTML = ntpText[i];
	}
	//document.getElementById("valueList00").innerHTML = netIPAddress;
	//document.getElementById("valueList01").innerHTML = netSubmask;
	//document.getElementById("valueList02").innerHTML = netGateway;
	//document.getElementById("valueList03").innerHTML = netDNS;
	//document.getElementById("valueList04").innerHTML = netNTP;
	document.getElementById("valueList20").innerHTML = netUserName;
	document.getElementById("valueList21").innerHTML = replaceStr;
	if (netLinkMode <= 2) {
		setLinkMode = netLinkMode;
		document.getElementById("selectSign").style.top = 32+80*netLinkMode+"px";
	}
	if (netLinkMode != 0) {
		showNetPage(netLinkMode);
	}
	player.printf(1, "=============netLinkMode============="+netLinkMode);	
	player.printf(1, "=============netIPAddress============="+netIPAddress);	
	player.printf(1, "=============netSubmask============="+netSubmask);	
	player.printf(1, "=============netGateway============="+netGateway);	
	player.printf(1, "=============netDNS============="+netDNS);	
	player.printf(1, "=============netNTP============="+netNTP);	
	return;
}

/*********************************************************************/
/* Function: keyNetLeft	         		                             */
/* Description: 网络设置页面，左键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
var netSetFocus = 0;		//网络设置页面焦点
var netRightFocus = 0;		//网络设置右侧焦点
function keyNetLeft()
{
	if (inputIPstatus) {
		inputLeftMove();
		return;
	}
	if (!netFocusLeftStatus) {
		if ((netSetFocus == 0 && netRightFocus == 5) || (netSetFocus == 2 && netRightFocus == 2)) {
			if (!userLeftStatus) {
				userLeftStatus = true;
				document.getElementById("buttonFocusNet").style.left = '0px';
			}
		} else {
			netFocusLeftMove();
		}
	} else {
		if (netSetFocus == 3) {
			if (!userLeftStatus) {
				userLeftStatus = true;
				document.getElementById("buttonFocusNet").style.left = '0px';
			}
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyNetRight	                                         */
/* Description: 网络设置页面，右键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyNetRight()
{
	if (inputIPstatus) {
		inputRightMove();
		return;
	}
	if (netFocusLeftStatus && netSetFocus != 1) {
		if (netSetFocus == 3) {
			if (userLeftStatus) {
				userLeftStatus = false;
				document.getElementById("buttonFocusNet").style.left = '289px';
			}
			return;
		}
		netFocusRightMove();
	} else if (!netFocusLeftStatus) {
		if ((netSetFocus == 0 && netRightFocus == 5) || (netSetFocus == 2 && netRightFocus == 2)) {
			if (userLeftStatus) {
				userLeftStatus = false;
				document.getElementById("buttonFocusNet").style.left = '289px';
			}
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyNetUp		                                         */
/* Description: 网络设置页面，上键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyNetUp()
{
	if (netFocusLeftStatus) {
		if (netSetFocus == 0) {
			navigatorStatus = true;
			document.getElementById("netFocus").style.opacity = '0.0';
			document.getElementById("menu"+netSetFocus).style.color = "#999999";
			document.getElementById("focusBarMove").style.opacity = "0.0";
			getNetInfo();
		} else if (netSetFocus == 3) {
			netSetFocus = 2;
			document.getElementById("netFocus").style.webkitTransitionDuration = "0s";
			document.getElementById("netFocus").style.top = 2+80*netSetFocus+"px";
			document.getElementById("menu"+netSetFocus).style.color = "#dddddd";
			document.getElementById("buttonFocusNet").style.opacity = "0.0";
			showSmallRightMenu(netSetFocus);
			setTimeout("showBigRightMenu();", 200);
			setTimeout("showSettingsFocus('netFocus');", 10);
		} else {
			document.getElementById("menu"+netSetFocus).style.color = "#999999";
			netSetFocus--;
			document.getElementById("netFocus").style.top = 2+80*netSetFocus+"px";
			document.getElementById("menu"+netSetFocus).style.color = "#dddddd";
			showSmallRightMenu(netSetFocus);
			setTimeout("showBigRightMenu();", 200);
		}
	} else {
		if (netRightFocus == 0) {
			return;
		}
		rightListUpMove();
	}
	return;
}

/*********************************************************************/
/* Function: keyNetDown	            	                             */
/* Description: 网络设置页面，下键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyNetDown()
{
	if (netFocusLeftStatus) {
		if (navigatorStatus) {
			navigatorStatus = false;
			netSetFocus = 0;
			userLeftStatus = true;
			document.getElementById("settingValueFocus").style.top = "7px";
			document.getElementById("settingPPPoEFocus").style.top = "68px";
			document.getElementById("netFocus").style.webkitTransitionDuration = "0s";
			document.getElementById("netFocus").style.top = "2px";
			document.getElementById("menu"+netSetFocus).style.color = "#dddddd";
			setTimeout("showSettingsFocus('netFocus');", 10);
			document.getElementById("focusBarMove").style.opacity = "1.0";
			document.getElementById("buttonFocusNet").style.left = "0px";
			if (setLinkMode != 0) {
				showSmallRightMenu(netSetFocus);
				setTimeout("showBigRightMenu();", 200);
			}
		} else if (netSetFocus >= 2) {
			if (netSetFocus == 2) {
				document.getElementById("menu"+netSetFocus).style.color = "#999999";
				netSetFocus = 3;
				document.getElementById("netFocus").style.opacity = "0.0";
				document.getElementById("buttonFocusNet").style.opacity = "1.0";
			}
			return;
		} else {
			document.getElementById("menu"+netSetFocus).style.color = "#999999";
			netSetFocus++;
			netSetFocus = netSetFocus >= 3 ? (netSetFocus-1) : netSetFocus;
			document.getElementById("netFocus").style.top = 2+netSetFocus*80+"px";
			document.getElementById("menu"+netSetFocus).style.color = "#dddddd";
			showSmallRightMenu(netSetFocus);
			setTimeout("showBigRightMenu();", 200);
		}
	} else {
		rightListDownMove();
	}
	return;
}

/*********************************************************************/
/* Function: keyNetEnter	                                         */
/* Description: 网络设置页面，确认键处理   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
var setLinkMode = 0;	//设置网络连接模式
function keyNetEnter()
{
	if (netFocusLeftStatus) {
		if (netSetFocus == 1) {
			//var ret = player.Ag_network_setLinkMode(1);
			setLinkMode = netSetFocus;
			document.getElementById("selectSign").style.top = 32+80*netSetFocus+"px";
			document.getElementById("menu"+netSetFocus).style.color = "#999999";
			netSetFocus = 3;
			document.getElementById("netFocus").style.opacity = "0.0";
			document.getElementById("buttonFocusNet").style.opacity = "1.0";
		} else if (netSetFocus == 3) {
			saveAllNetSettings();
		} else {
			netFocusRightMove();
		}
	} else {
		if ((netSetFocus == 0 && netRightFocus == 5) || (netSetFocus == 2 && netRightFocus == 2)) {
			netButtonEnterFun();
		} else {
			if (netSetFocus == 0) {
				return;
			}
			if (netSetFocus == 2 && netRightFocus == 1) {
				passwordStatus = true;
			}
		}
	}
	return;
}

/*********************************************************************/
/* Function: ipAddressInput											 */
/* Description: 网络设置页面，输入框控制								 */
/* Parameters:														 */
/* Author&Date: zhaopengjun  2011-03-23                              */
/*********************************************************************/
function ipAddressInput(num) {
	var currValue = document.getElementById("ipAddressText"+netRightFocus+inputIPindex).innerHTML;
	if (currValue.length >= 3) {
		currValue = num;
	} else {
		currValue = ""+currValue+num;
		if (currValue.length == 3) {
			currValue = currValue > 255 ? 255 : currValue;
			currValue = currValue == 0 ? (inputIPindex == 0 ? 1 : 0) : currValue;
		}
	}
	document.getElementById("ipAddressText"+netRightFocus+inputIPindex).innerHTML = currValue;
	if (currValue.length == 3 && inputIPindex < 3) {
		inputRightMove();
	}
	return;
}

/*********************************************************************/
/* Function: inputLeftMove											 */
/* Description: 网络设置页面，输入框左键控制							 */
/* Parameters:														 */
/* Author&Date: zhaopengjun  2011-03-23                              */
/*********************************************************************/
function inputLeftMove() {
	inputIPindex--;
	inputIPindex = inputIPindex < 0 ? 3 : inputIPindex;
	document.getElementById("inputIPFocus").style.left = 40+45*inputIPindex+"px";
	return;
}

/*********************************************************************/
/* Function: inputRightMove											 */
/* Description: 网络设置页面，输入框打右键控制							 */
/* Parameters:														 */
/* Author&Date: zhaopengjun  2011-03-23                              */
/*********************************************************************/
function inputRightMove() {
	inputIPindex++;
	inputIPindex = inputIPindex >= 4 ? 0 : inputIPindex;
	document.getElementById("inputIPFocus").style.left = 40+45*inputIPindex+"px";
	return;
}

/*********************************************************************/
/* Function: keyNetBack												 */
/* Description: 网络设置页面，返回键处理								 */
/* Parameters:														 */
/* Author&Date: zhaopengjun  2011-01-19                              */
/*********************************************************************/
function keyNetBack() {
	if (netFocusLeftStatus) {
		if (netSetFocus == 3) {
			document.getElementById("buttonFocusNet").style.opacity = "0.0";
		} else {
			document.getElementById("netFocus").style.opacity = "0.0";
			if (netSetFocus < 3) {
				document.getElementById("menu"+netSetFocus).style.color = "#999999";
			}
		}
		netLinkMode = player.Ag_network_getLinkMode();
		showSmallRightMenu(netLinkMode);
		setTimeout("showBigRightMenu();", 200);
		netSetFocus = 0;
		navigatorStatus = true;
		document.getElementById("focusBarMove").style.opacity = "0.0";
		getNetInfo();
	} else {
		if ((netSetFocus == 0 && netRightFocus == 5) || (netSetFocus == 2 && netRightFocus == 2)) {
			document.getElementById("buttonFocusNet").style.opacity = "0.0";
		} else {
			var hiddId = netSetFocus == 0 ? "settingValueFocus" : "settingPPPoEFocus";
			document.getElementById(hiddId).style.opacity = "0.0";
			if (netSetFocus == 0) {
				document.getElementById("inputIPFocus").style.opacity = "0";
				inputIPstatus = false;
			}
		}
		document.getElementById("menu"+netSetFocus).style.color = "#dddddd";
		netRightFocus = 0;
		netFocusLeftStatus = true;
		document.getElementById("netFocus").style.opacity = "1.0";
	}
	return;
}

/*********************************************************************/
/* Function: saveAllNetSettings										 */
/* Description: 保存设置信息											 */
/* Parameters:														 */
/* Author&Date: zhaopengjun  2011-01-17                              */
/*********************************************************************/
function saveAllNetSettings() {
	player.printf(1, "userLeftStatus=========save================="+userLeftStatus);
	if (userLeftStatus) {
		var ret = player.Ag_network_setLinkMode(setLinkMode);
		if (setLinkMode == 0) {
			var ipValue = document.getElementById("valueList00").innerText;
			var subValue = document.getElementById("valueList01").innerText;
			var gateValue = document.getElementById("valueList02").innerText;
			var DNSValue = document.getElementById("valueList03").innerText;
			var NTPValue = document.getElementById("valueList04").innerText;
			var setIPaddress = player.Ag_network_setIPAddress(ipValue);
			var setSubmask = player.Ag_network_setSubnetMask(subValue);
			var setGateway = player.Ag_network_setDefaultGateway(gateValue);
			var setDNS = player.Ag_network_setDNSServer(1,DNSValue);
			var setNTP = player.Ag_network_setNTPServer(NTPValue);
		} else if (setLinkMode == 2) {
			var userValue = document.getElementById("valueList20").innerHTML;
			var setUser = player.Ag_network_setPPPoEUserName(userValue);
			var setPass = player.Ag_network_setPPPoEPasswd(passwordValue);
		}
	} else {
		getNetInfo();
	}
	navigatorStatus = true;
	//document.getElementById("menu"+netSetFocus).style.color = "#999999";
	netLinkMode = player.Ag_network_getLinkMode();
	if (!userLeftStatus) {
		showSmallRightMenu(netLinkMode);
		setTimeout("showBigRightMenu();", 200);
	}
	netFocusLeftStatus = true;
	netSetFocus = 0;
	netRightFocus = 0;
	document.getElementById("focusBarMove").style.opacity = "0.0";
	document.getElementById("buttonFocusNet").style.opacity = '0.0';
	return;
}

/*********************************************************************/
/* Function: netButtonEnterFun										 */
/* Description: Button上的按键处理									 */
/* Parameters:														 */
/* Author&Date: zhaopengjun  2011-01-04                              */
/*********************************************************************/
function netButtonEnterFun() {
	//player.printf(1, "valueList00=========valueList00================="+document.getElementById("valueList00").innerText);
	if (netSetFocus == 0) {
		if (userLeftStatus) {
			var ret = player.Ag_network_setLinkMode(setLinkMode);
			var ipValue = document.getElementById("valueList00").innerText;
			var subValue = document.getElementById("valueList01").innerText;
			var gateValue = document.getElementById("valueList02").innerText;
			var DNSValue = document.getElementById("valueList03").innerText;
			var NTPValue = document.getElementById("valueList04").innerText;
			var setIPaddress = player.Ag_network_setIPAddress(ipValue);
			var setSubmask = player.Ag_network_setSubnetMask(subValue);
			var setGateway = player.Ag_network_setDefaultGateway(gateValue);
			var setDNS = player.Ag_network_setDNSServer(1,DNSValue);
			var setNTP = player.Ag_network_setNTPServer(NTPValue);
		} else {
			getNetInfo();
		}
	} else {
		if (userLeftStatus) {
			var ret = player.Ag_network_setLinkMode(setLinkMode);
			var userValue = document.getElementById("valueList20").innerHTML;
			//var passValue = document.getElementById("valueList21").innerHTML;
			var setUser = player.Ag_network_setPPPoEUserName(userValue);
			var setPass = player.Ag_network_setPPPoEPasswd(passwordValue);
		} else {
			getNetInfo();
		}
	}
	navigatorStatus = true;
	//document.getElementById("menu"+netSetFocus).style.color = "#999999";
	netFocusLeftStatus = true;
	netSetFocus = 0;
	netRightFocus = 0;
	document.getElementById("focusBarMove").style.opacity = "0.0";
	document.getElementById("netFocus").style.top = "2px";
	document.getElementById("settingValueFocus").style.top = "7px";
	document.getElementById("settingPPPoEFocus").style.top = "68px";
	document.getElementById("buttonFocusNet").style.opacity = '0.0';
	netLinkMode = player.Ag_network_getLinkMode();
	if (!userLeftStatus) {
		showSmallRightMenu(netLinkMode);
		setTimeout("showBigRightMenu();", 200);
	}
	return;
}

/*********************************************************************/
/* Function: netFocusRightMove										 */
/* Description: 焦点右移操作											 */
/* Parameters:														 */
/* Author&Date: zhaopengjun  2011-01-04                              */
/*********************************************************************/
var netFocusLeftStatus = true;		//焦点在左侧时为true，右侧为false
var inputIPstatus = false;		//输入框焦点状态
var inputIPindex = 0;			//输入框焦点位置
function netFocusRightMove() {
	//var ret = player.Ag_network_setLinkMode(netSetFocus);
	setLinkMode = netSetFocus;
	document.getElementById("selectSign").style.top = 32+80*netSetFocus+"px";
	document.getElementById("netFocus").style.opacity = "0.0";
	document.getElementById("menu"+netSetFocus).style.color = "#999999";
	if (netSetFocus == 0) {
		document.getElementById("settingValueFocus").style.webkitTransitionDuration = "0s";
		document.getElementById("settingValueFocus").style.top = "7px";
		setTimeout("showSettingsFocus('settingValueFocus');", 10);
		document.getElementById("inputIPFocus").style.opacity = "1";
		inputIPstatus = true;
	} else {
		document.getElementById("settingPPPoEFocus").style.webkitTransitionDuration = "0s";
		document.getElementById("settingPPPoEFocus").style.top = "68px";
		document.getElementById("settingPPPoEFocus").style.opacity = "1.0";
		setTimeout("showSettingsFocus('settingPPPoEFocus');", 10);
		if (netSetFocus == 2 && netRightFocus == 1) {
			passwordStatus = true;
		}
		keyboardInput = "valueList"+netSetFocus+netRightFocus;
		showKeyboard(15);
	}
	netFocusLeftStatus = false;
	return;
}

/*********************************************************************/
/* Function: netFocusLeftMove										 */
/* Description: 焦点左移操作											 */
/* Parameters:														 */
/* Author&Date: zhaopengjun  2011-01-04                              */
/*********************************************************************/
function netFocusLeftMove() {
	document.getElementById("netFocus").style.opacity = "1.0";
	document.getElementById("menu"+netSetFocus).style.color = "#dddddd";
	netFocusLeftStatus = true;
	netRightFocus = 0;
	if (netSetFocus == 0) {
		document.getElementById("settingValueFocus").style.opacity = "0.0";
		inputIPstatus = false;
	} else {
		document.getElementById("settingPPPoEFocus").style.opacity = "0.0";
	}
	return;
}

/*********************************************************************/
/* Function: showSmallRightMenu                                      */
/* Description: 右侧菜单缩小处理                                       */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-01-04                              */
/*********************************************************************/
function showSmallRightMenu(num)
{
	document.getElementById("rightMenu").style.webkitTransitionDuration = '0s';
	document.getElementById("rightMenu").style.top = '170px';
	document.getElementById("rightMenu").style.height = '1px';
	document.getElementById("rightMenu").style.opacity = '0';
	showNetPage(num);
	return;
}

/*********************************************************************/
/* Function: showSmallRightMenu                                      */
/* Description: 右侧菜单缩小处理                                       */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-01-05                              */
/*********************************************************************/
function showNetPage(mode) {
	if (mode == 0) {
		document.getElementById("netDiv0").style.visibility = "visible";
		document.getElementById("netDiv1").style.visibility = "hidden";
		document.getElementById("netDiv2").style.visibility = "hidden";
	} else if (mode == 1) {
		document.getElementById("netDiv0").style.visibility = "visible";
		document.getElementById("netDiv1").style.visibility = "visible";
		document.getElementById("netDiv2").style.visibility = "hidden";
	} else {
		document.getElementById("netDiv0").style.visibility = "hidden";
		document.getElementById("netDiv1").style.visibility = "hidden";
		document.getElementById("netDiv2").style.visibility = "visible";
	}
	return;
}

/*********************************************************************/
/* Function: showBigRightMenu                                        */
/* Description: 右侧菜单展开处理                                       */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-01-04                              */
/*********************************************************************/
function showBigRightMenu()
{
	document.getElementById("rightMenu").style.webkitTransitionDuration = '0.4s';
	document.getElementById("rightMenu").style.top = '50px';
	document.getElementById("rightMenu").style.height = '250px';
	document.getElementById("rightMenu").style.opacity = '1';
	return;
}

/*********************************************************************/
/* Function: rightListUpMove	                                     */
/* Description: 右侧菜单中焦点向上移动							         */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-01-04                              */
/*********************************************************************/
function rightListUpMove() {
	if (netSetFocus == 0) {
		if (netRightFocus == 5) {
			inputIPstatus = true;
			netRightFocus = 4;
			document.getElementById("settingValueFocus").style.opacity = "1.0";
			document.getElementById("buttonFocusNet").style.opacity = "0.0";
			return;
		}
		netRightFocus--;
		document.getElementById("settingValueFocus").style.top = 7+46*netRightFocus+"px";
	} else if (netSetFocus == 2) {
		if (netRightFocus == 2) {
			netRightFocus = 1;
			document.getElementById("settingPPPoEFocus").style.opacity = "1.0";
			document.getElementById("buttonFocusNet").style.opacity = "0.0";
			if (netSetFocus == 2 && netRightFocus == 1) {
				passwordStatus = true;
			}
			keyboardInput = "valueList"+netSetFocus+netRightFocus;
			showKeyboard(15);
			return;
		}
		netRightFocus--;
		document.getElementById("settingPPPoEFocus").style.top = 68+75*netRightFocus+"px";
		if (netSetFocus == 2 && netRightFocus == 1) {
			passwordStatus = true;
		}
		keyboardInput = "valueList"+netSetFocus+netRightFocus;
		showKeyboard(15);
	}
	return;
}

/*********************************************************************/
/* Function: rightListDownMove	                                     */
/* Description: 右侧菜单中焦点向下移动							         */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-01-04                              */
/*********************************************************************/
function rightListDownMove() {
	if (netSetFocus == 0) {
		if (netRightFocus == 5) {
			return;
		}
		if (netRightFocus == 4) {
			inputIPstatus = false;
			netRightFocus = 5;
			document.getElementById("settingValueFocus").style.opacity = "0.0";
			document.getElementById("buttonFocusNet").style.opacity = "1.0";
			return;
		}
		netRightFocus++;
		document.getElementById("settingValueFocus").style.top = 7+46*netRightFocus+"px";
	} else if (netSetFocus == 2) {
		if (netRightFocus == 2) {
			return;
		}
		if (netRightFocus == 1) {
			netRightFocus = 2;
			document.getElementById("settingPPPoEFocus").style.opacity = "0.0";
			document.getElementById("buttonFocusNet").style.opacity = "1.0";
			return;
		}
		netRightFocus++;
		document.getElementById("settingPPPoEFocus").style.top = 68+75*netRightFocus+"px";
		if (netSetFocus == 2 && netRightFocus == 1) {
			passwordStatus = true;
		}
		keyboardInput = "valueList"+netSetFocus+netRightFocus;
		showKeyboard(15);
	}
	return;
}

///////////////////////////////////////////////时间///设置页面按键处理///////////////////////////////////////////////
/*********************************************************************/
/* Function: getTimeZoneShow         	                             */
/* Description: 通过时区值获得显示列表的索引							 */
/* Parameters: index 为时区值									         */
/* Author&Date: zhaopengjun  2011-02-12                              */
/*********************************************************************/
function getTimeZoneShow(index) {
	var listIndex;
	if (index == 0) {
		listIndex = 25;
	} else if (index <= 25) {
		listIndex = index-1;
	} else {
		listIndex = index;
	}
	return listIndex;
}

/*********************************************************************/
/* Function: getSetZoneValue         	                             */
/* Description: 通过索引值获得设置时区值								 */
/* Parameters: index 为索引									         */
/* Author&Date: zhaopengjun  2011-02-12                              */
/*********************************************************************/
function getSetZoneValue(index) {
	var value;
	if (index == 25) {
		value = 0;
	} else if (index < 25) {
		value = index+1;
	} else {
		value = index;
	}
	return value;
}

/*********************************************************************/
/* Function: getTimeInfo	         	                             */
/* Description: 获得时间设置的信息     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-06                              */
/*********************************************************************/
var localTimeYear = "";		//year
var localTimeMonth = "";	//month
var localTimeDay = "";		//day
var localTimeHour = "";		//hour
var localTimeMinute = "";	//minute
var localTimeSecond = "";	//second
var localTimeZone = "";		//time zone
function getTimeInfo() {
	var timeStr = player.Ag_time_getLocalTime();// "20080430T112600".
	localTimeZone = player.Ag_time_getTimeZone();
	zoneArrayIndex = getTimeZoneShow(localTimeZone);
	document.getElementById("timeList2").innerHTML = timeZoneArray[zoneArrayIndex];
	var localTimeStr = timeStr.split("T");
	localTimeYear = localTimeStr[0].substring(0,4);
	localTimeMonth = localTimeStr[0].substring(4,6);
	localTimeDay = localTimeStr[0].substring(6,8);
	localTimeHour = localTimeStr[1].substring(0,2);
	localTimeMinute = localTimeStr[1].substring(2,4);
	localTimeSecond = localTimeStr[1].substring(4,6);
	document.getElementById("timeInputText00").innerHTML = localTimeYear;
	document.getElementById("timeInputText01").innerHTML = localTimeMonth;
	document.getElementById("timeInputText02").innerHTML = localTimeDay;
	document.getElementById("timeInputText10").innerHTML = localTimeHour;
	document.getElementById("timeInputText11").innerHTML = localTimeMinute;
	document.getElementById("timeInputText12").innerHTML = localTimeSecond;
	//document.getElementById("timeList0").innerHTML = localTimeYear+"/"+localTimeMonth+"/"+localTimeDay;
	//document.getElementById("timeList1").innerHTML = localTimeHour+":"+localTimeMinute+":"+localTimeSecond;
	player.printf(1, "=============timeStr============="+timeStr);	
	player.printf(1, "=============localTimeZone============="+localTimeZone);	
	player.printf(1, "=============zoneArrayIndex============="+zoneArrayIndex);	
	return;
}

/*********************************************************************/
/* Function: keyTimeLeft	         	                             */
/* Description: 时间设置页面，左键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-07                              */
/*********************************************************************/
var timeSetFocus = 0;	//记录时间设置页面中，焦点位置
var zoneArrayIndex = 25;	//时区索引
//var timeZoneArray = new Array("GMT-12:00","GMT-11:00","GMT-10:00","GMT-09:00","GMT-08:00","GMT-07:00","GMT-06:00","GMT-05:00","GMT-04:00","GMT-03:00","GMT-02:00","GMT-01:00","GMT","GMT+01:00","GMT+02:00","GMT+03:00","GMT+04:00","GMT+05:00","GMT+06:00","GMT+07:00","GMT+08:00","GMT+09:00","GMT+10:00","GMT+11:00","GMT+12:00");
var timeZoneArray = new Array("Pacific/Apia","Pacific/Honolulu","America/Anchorage","America/Los_Angeles","America/Tijuana","America/Phoenix","America/Denver","America/Mazatlan","America/Chicago","America/Regina","America/Mexico_City","America/Bogota","America/New_York","America/Caracas","America/Halifax","America/Santiago","America/La_Paz","America/St_Johns","America/Sao_Paulo","America/Buenos_Aires","America/Montevideo","Atlantic/South_Georgia","Atlantic/Azores","Atlantic/Cape_Verde","Africa/Casablanca","UTC","Europe/London","Europe/Berlin","Africa/Kinshasa","Europe/Istanbul","Africa/Cairo","Asia/Jerusalem","Africa/Johannesburg","Europe/Moscow","Africa/Nairobi","Asia/Baghdad","Asia/Tehran","Asia/Muscat","Asia/Baku","Asia/Kabul","Asia/Karachi","Asia/Kolkata","Asia/Katmandu","Asia/Almaty","Asia/Dhaka","Asia/Rangoon","Asia/Bangkok","Asia/Hong_Kong","Asia/Singapore","Australia/Perth","Asia/Taipei","Asia/Tokyo","Asia/Seoul","Australia/Adelaide","Australia/Darwin","Australia/Sydney","Australia/Brisbane","Pacific/Noumea","Pacific/Auckland","Pacific/Kwajalein");
var networkTimeValue = "No";		//是否使用网络时间
function keyTimeLeft()
{
	if (timeSetFocus == 0 || timeSetFocus == 1) {
		inputTimeLeft();
	} else if (timeSetFocus == 2) {
		if (zoneArrayIndex <= 0) {
			zoneArrayIndex = 59;
		} else {
			zoneArrayIndex--;
		}
		document.getElementById("timeList2").innerHTML = timeZoneArray[zoneArrayIndex];
	} else if (timeSetFocus == 3) {
		networkTimeValue = networkTimeValue == "Yes" ? "No" : "Yes";
		document.getElementById("timeList3").innerHTML = networkTimeValue;
	} else if (timeSetFocus == 4) {
		if (!userLeftStatus) {
			userLeftStatus = true;
			document.getElementById("buttonFocusTime").style.left = '0px';
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyTimeRight	                                         */
/* Description: 时间设置页面，右键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-07                              */
/*********************************************************************/
function keyTimeRight()
{
	if (timeSetFocus == 0 || timeSetFocus == 1) {
		inputTimeRight();
	} else if (timeSetFocus == 2) {
		if (zoneArrayIndex >= 59) {
			zoneArrayIndex = 0;
		} else {
			zoneArrayIndex++;
		}
		document.getElementById("timeList2").innerHTML = timeZoneArray[zoneArrayIndex];
	} else if (timeSetFocus == 3) {
		networkTimeValue = networkTimeValue == "Yes" ? "No" : "Yes";
		document.getElementById("timeList3").innerHTML = networkTimeValue;
	} else if (timeSetFocus == 4) {
		if (userLeftStatus) {
			userLeftStatus = false;
			document.getElementById("buttonFocusTime").style.left = '212px';
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyTimeUp		                                         */
/* Description: 时间设置页面，上键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-07                              */
/*********************************************************************/
function keyTimeUp()
{
	if (timeSetFocus == 0) {
		navigatorStatus = true;
		document.getElementById("timeFocus").style.opacity = "0.0";
		document.getElementById("inputTimeFocus").style.opacity = "0";
		inputTimeStatus = false;
		document.getElementById("focusBarMove").style.opacity = "0.0";
		getTimeInfo();
	} else if (timeSetFocus == 4) {
		timeSetFocus = 3;
		document.getElementById("timeFocus").style.opacity = "1.0";
		document.getElementById("buttonFocusTime").style.opacity = "0.0";
	} else {
		inputCurrValue = "";
		timeSetFocus--;
		document.getElementById("timeFocus").style.top = 4+50*timeSetFocus+"px";
		if (timeSetFocus == 1) {
			document.getElementById("inputTimeFocus").style.opacity = "1";
			inputTimeStatus = true;
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyTimeDown	            	                         */
/* Description: 时间设置页面，下键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-07                              */
/*********************************************************************/
function keyTimeDown()
{
	if (navigatorStatus) {
		navigatorStatus = false;
		timeSetFocus = 0;
		userLeftStatus = true;
		document.getElementById("timeFocus").style.webkitTransitionDuration = "0s";
		document.getElementById("timeFocus").style.top = "4px";
		document.getElementById("inputTimeFocus").style.opacity = "1";
		inputCurrValue = "";
		inputTimeStatus = true;
		setTimeout("showSettingsFocus('timeFocus');", 10);
		document.getElementById("focusBarMove").style.opacity = '1.0';
		document.getElementById("buttonFocusTime").style.left = '0px';
	} else {
		if (timeSetFocus >= 4) {
			return;
		} else if (timeSetFocus == 3) {
			timeSetFocus = 4;
			document.getElementById("timeFocus").style.opacity = "0.0";
			document.getElementById("inputTimeFocus").style.opacity = "0";
			inputTimeStatus = false;
			document.getElementById("buttonFocusTime").style.opacity = "1.0";
		} else {
			inputCurrValue = "";
			timeSetFocus++;
			document.getElementById("timeFocus").style.top = 4+50*timeSetFocus+"px";
			if (timeSetFocus == 2) {
				document.getElementById("inputTimeFocus").style.opacity = "0";
				inputTimeStatus = false;
			}
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyTimeEnter	                                         */
/* Description: 时间设置页面，确认键处理   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-07                              */
/*********************************************************************/
function keyTimeEnter()
{
	if (timeSetFocus == 4) {
		if (userLeftStatus) {
			if (networkTimeValue == "Yes") {
				var ret = player.Ag_time_sycToNTP();
				player.printf(1, "Ag_time_sycToNTP============ret==============/*/*///"+ret);
			}/*
			var dateStrValue = document.getElementById("timeList0").innerHTML;
			var timeStrValue = document.getElementById("timeList1").innerHTML;
			dateStrValue = dateStrValue.replace(/\//g,":")+":"+timeStrValue;*/
			else {
				timeSaveValue();
				var ret = player.Ag_time_setLocalTime(dateStrValue);
				var setTimeZoneValue = getSetZoneValue(zoneArrayIndex);
				player.Ag_time_setTimeZone(setTimeZoneValue);
				getTimeInfo();
				showCurrentTime("timeShow");
			}
		} else {
			getTimeInfo();
		}
		navigatorStatus = true;
		document.getElementById("buttonFocusTime").style.opacity = "0.0";
		document.getElementById("focusBarMove").style.opacity = '0.0';
	}
	return;
}

function timeSaveValue() {
	var year = document.getElementById("timeInputText00").innerHTML;
	var month = document.getElementById("timeInputText01").innerHTML;
	var date = document.getElementById("timeInputText02").innerHTML;
	var hour = document.getElementById("timeInputText10").innerHTML;
	var minute = document.getElementById("timeInputText11").innerHTML;
	var second = document.getElementById("timeInputText12").innerHTML;
	year = year.length != 4 ? 2000 : year;
	month = month.length != 2 ? "0"+month : month;
	date = date.length != 2 ? "0"+date : date;
	hour = hour.length != 2 ? "0"+hour : hour;
	minute = minute.length != 2 ? "0"+minute : minute;
	second = second.length != 2 ? "0"+second : second;
	var dateValue = year+":"+month+":"+date+":"+hour+":"+minute+":"+second;
	var ret = player.Ag_time_setLocalTime(dateValue);
	return;
}

/*********************************************************************/
/* Function: inputTimeTextFun                                        */
/* Description: 时间设置页面，输入处理   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-03-23                              */
/*********************************************************************/
var inputTimeStatus = false;		//时间输入状态
var inputTimeIndex = 0;			//时间输入位置
var inputCurrValue = "";		//保存输入内容
function inputTimeTextFun(num) {
	if (timeSetFocus == 0) {
		//var currValue = document.getElementById("timeInputText"+timeSetFocus+inputTimeIndex).innerHTML;
		//var currValue = inputCurrValue;
		if (inputTimeIndex == 0) {
			if (inputCurrValue.length >= 4) {
				inputCurrValue = num;
			} else {
				inputCurrValue = ""+inputCurrValue+num;
				if (inputCurrValue.length == 4) {
					inputCurrValue = inputCurrValue < 2000 ? 2000 : inputCurrValue;
				}
			}
			inputCurrValue = inputCurrValue.toString();
			document.getElementById("timeInputText"+timeSetFocus+inputTimeIndex).innerHTML = inputCurrValue;
			if (inputCurrValue.length == 4) {
				inputTimeRight();
			}
		} else if (inputTimeIndex == 1) {
			if (inputCurrValue.length >= 2) {
				inputCurrValue = num;
			} else {
				inputCurrValue = ""+inputCurrValue+num;
				if (inputCurrValue.length == 2) {
					inputCurrValue = inputCurrValue > 12 ? 12 : inputCurrValue;
					inputCurrValue = inputCurrValue <= 0 ? 1 : inputCurrValue;
				}
			}
			inputCurrValue = inputCurrValue.toString();
			document.getElementById("timeInputText"+timeSetFocus+inputTimeIndex).innerHTML = inputCurrValue;
			if (inputCurrValue.length == 2) {
				inputTimeRight();
			}
		} else if (inputTimeIndex == 2) {
				//alert(inputCurrValue.length);
			if (inputCurrValue.length >= 2) {
				inputCurrValue = num;
			} else {
				inputCurrValue = ""+inputCurrValue+num;
				if (inputCurrValue.length == 2) {
					var year = document.getElementById("timeInputText00").innerHTML;
					var month = document.getElementById("timeInputText01").innerHTML;
					inputCurrValue = chkDate(year, month, inputCurrValue);
					inputCurrValue = inputCurrValue <= 0 ? 1 : inputCurrValue;
					//alert("inputCurrValue="+inputCurrValue);
				}
			}
			inputCurrValue = inputCurrValue.toString();
			document.getElementById("timeInputText"+timeSetFocus+inputTimeIndex).innerHTML = inputCurrValue;
		}
	} else if (timeSetFocus == 1) {
		//var currValue = document.getElementById("timeInputText"+timeSetFocus+inputTimeIndex).innerHTML;
		//var currValue = inputCurrValue;
		if (inputTimeIndex == 0) {
			if (inputCurrValue.length >= 2) {
				inputCurrValue = num;
			} else {
				inputCurrValue = ""+inputCurrValue+num;
				if (inputCurrValue.length == 2) {
					inputCurrValue = inputCurrValue >= 23 ? 23 : inputCurrValue;
				}
			}
			inputCurrValue = inputCurrValue.toString();
			document.getElementById("timeInputText"+timeSetFocus+inputTimeIndex).innerHTML = inputCurrValue;
			if (inputCurrValue.length == 2) {
				inputTimeRight();
			}
		} else if (inputTimeIndex == 1) {
			if (inputCurrValue.length >= 2) {
				inputCurrValue = num;
			} else {
				inputCurrValue = ""+inputCurrValue+num;
				if (inputCurrValue.length == 2) {
					inputCurrValue = inputCurrValue >= 60 ? 59 : inputCurrValue;
				}
			}
			inputCurrValue = inputCurrValue.toString();
			document.getElementById("timeInputText"+timeSetFocus+inputTimeIndex).innerHTML = inputCurrValue;
			if (inputCurrValue.length == 2) {
				inputTimeRight();
			}
		} else if (inputTimeIndex == 2) {
			if (inputCurrValue.length >= 2) {
				inputCurrValue = num;
			} else {
				inputCurrValue = ""+inputCurrValue+num;
				if (inputCurrValue.length == 2) {
					inputCurrValue = inputCurrValue >= 60 ? 59 : inputCurrValue;
				}
			}
			inputCurrValue = inputCurrValue.toString();
			document.getElementById("timeInputText"+timeSetFocus+inputTimeIndex).innerHTML = inputCurrValue;
		}
	}
	return;
}

/*********************************************************************/
/* Function: chkDate		                                         */
/* Description: 时间设置页面，判断日期输入	 							 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-03-25                              */
/*********************************************************************/
function chkDate(year, month, date) {
	var y = parseInt(year, 10);
	var m = parseInt(month, 10);
	var d = parseInt(date, 10);
	switch (m) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			if (d > 31) {
				return 31;
			} else {
				return d;
			}
			break;
		case 2:
			if (y%4==0 && d>29) {
				return 29;
			} else if (y%4!=0 && d>28) {
				return 28;
			} else {
				return d;
			}
			break;
		case 4:
		case 6:
		case 9:
		case 11:
			if (d > 30) {
				return 30;
			} else {
				return d;
			}
			break;
		default:
			return d;
			break;
	}
}

/*********************************************************************/
/* Function: inputTimeLeft	                                         */
/* Description: 时间设置页面，输入状态左键处理 							 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-03-23                              */
/*********************************************************************/
function inputTimeLeft() {
	inputCurrValue = "";
	inputTimeIndex--;
	inputTimeIndex = inputTimeIndex < 0 ? 2 : inputTimeIndex;
	document.getElementById("inputTimeFocus").style.left = 60+63*inputTimeIndex+"px";
	return;
}

/*********************************************************************/
/* Function: inputTimeRight	                                         */
/* Description: 时间设置页面，输入状态右键处理 							 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-03-23                              */
/*********************************************************************/
function inputTimeRight() {
	inputCurrValue = "";
	inputTimeIndex++;
	inputTimeIndex = inputTimeIndex > 2 ? 0 : inputTimeIndex;
	document.getElementById("inputTimeFocus").style.left = 60+63*inputTimeIndex+"px";
	return;
}

/*********************************************************************/
/* Function: keyTimeBack	                                         */
/* Description: 时间设置页面，返回键处理   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-19                              */
/*********************************************************************/
function keyTimeBack() {
	if (timeSetFocus == 4) {
		document.getElementById("buttonFocusTime").style.opacity = "0.0";
	} else {
		document.getElementById("timeFocus").style.opacity = "0.0";
		document.getElementById("inputTimeFocus").style.opacity = "0";
		inputTimeStatus = false;
	}
	navigatorStatus = true;
	document.getElementById("focusBarMove").style.opacity = '0.0';
	getTimeInfo();
	return;
}

///////////////////////////////////////////////升级///设置页面按键处理///////////////////////////////////////////////

/*********************************************************************/
/* Function: getUpgradeInfo	         	                             */
/* Description: 获得升级设置的信息	    								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-07                              */
/*********************************************************************/
var upgradeMode = 0;	//升级模式，0为auto
var upgradeURL = "";	//升级路径
var upgradeSetFocus = 0;	//焦点
function getUpgradeInfo() {
	upgradeMode = player.Ag_upgrade_getMode();
	upgradeURL = player.Ag_upgrade_getURL();
	var modeObj = Object(upgradeMode);
	player.printf(1, "=============modeObj============="+modeObj);
	player.printf(1, "=============upgradeMode============="+upgradeMode);
	player.printf(1, "=============upgradeURL============="+upgradeURL);
	document.getElementById("upgradeAddress").innerHTML = upgradeURL;
	var mode = upgradeMode == 0 ? "Auto" : "Manual";
	document.getElementById("upgradeModeValue").innerHTML = mode;
	var buttonText = upgradeMode == 0 ? "Save" : "Upgrade";
	document.getElementById("userSaveUpgrade").innerHTML = buttonText;
	return;
}

/*********************************************************************/
/* Function: keyUpgradeLeft	         	                             */
/* Description: 升级设置页面，左键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyUpgradeLeft()
{
	if (upgradeStatus) {
		return;
	}
	if (upgradeTipsStatus) {
		clearInterval(timerUpgradeTips);
		hiddUpgradeTips();
		return;
	}
	if (upgradeSetFocus == 0) {
		upgradeMode = upgradeMode == 0 ? 1 : 0;
		var mode = upgradeMode == 0 ? "Auto" : "Manual";
		document.getElementById("upgradeModeValue").innerHTML = mode;
		var buttonText = upgradeMode == 0 ? "Save" : "Upgrade";
		document.getElementById("userSaveUpgrade").innerHTML = buttonText;
	} else if (upgradeSetFocus == 2) {
		if (!userLeftStatus) {
			userLeftStatus = true;
			document.getElementById("buttonFocusUpgrade").style.left = '0px';
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyUpgradeRight	                                     */
/* Description: 升级设置页面，右键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyUpgradeRight()
{
	if (upgradeStatus) {
		return;
	}
	if (upgradeTipsStatus) {
		clearInterval(timerUpgradeTips);
		hiddUpgradeTips();
		return;
	}
	if (upgradeSetFocus == 0) {
		upgradeMode = upgradeMode == 0 ? 1 : 0;
		var mode = upgradeMode == 0 ? "Auto" : "Manual";
		document.getElementById("upgradeModeValue").innerHTML = mode;
		var buttonText = upgradeMode == 0 ? "Save" : "Upgrade";
		document.getElementById("userSaveUpgrade").innerHTML = buttonText;
	} else if (upgradeSetFocus == 2) {
		if (userLeftStatus) {
			userLeftStatus = false;
			document.getElementById("buttonFocusUpgrade").style.left = '205px';
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyUpgradeUp		                                     */
/* Description: 升级设置页面，上键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyUpgradeUp()
{
	if (upgradeStatus) {
		return;
	}
	if (upgradeTipsStatus) {
		clearInterval(timerUpgradeTips);
		hiddUpgradeTips();
		return;
	}
	if (upgradeSetFocus == 0) {
		navigatorStatus = true;
		document.getElementById("focusBarMove").style.opacity = '0.0';
		document.getElementById("upgradeFocus").style.opacity = "0.0";
		getUpgradeInfo();
	} else if (upgradeSetFocus == 1) {
		document.getElementById("upgradeAddress").style.borderColor = "#333333";
		document.getElementById("upgradeFocus").style.opacity = "1.0";
		upgradeSetFocus = 0;
	} else if (upgradeSetFocus == 2) {
		document.getElementById("upgradeAddress").style.borderColor = "#0569e7";
		document.getElementById("buttonFocusUpgrade").style.opacity = "0.0";
		upgradeSetFocus = 1;
		keyboardInput = "upgradeAddress";
		showKeyboard(150);
	}
	return;
}

/*********************************************************************/
/* Function: keyUpgradeDown	            	                         */
/* Description: 升级设置页面，下键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyUpgradeDown()
{
	if (upgradeStatus) {
		return;
	}
	if (upgradeTipsStatus) {
		clearInterval(timerUpgradeTips);
		hiddUpgradeTips();
		return;
	}
	if (navigatorStatus) {
		navigatorStatus = false;
		upgradeSetFocus = 0;
		userLeftStatus = true;
		document.getElementById("upgradeFocus").style.opacity = "1.0";
		document.getElementById("focusBarMove").style.opacity = '1.0';
		document.getElementById("buttonFocusUpgrade").style.left = '0px';
	} else {
		if (upgradeSetFocus >= 2) {
			return;
		} else if (upgradeSetFocus == 0) {
			document.getElementById("upgradeAddress").style.borderColor = "#0569e7";
			document.getElementById("upgradeFocus").style.opacity = "0.0";
			upgradeSetFocus = 1;
			keyboardInput = "upgradeAddress";
			showKeyboard(150);
		} else if (upgradeSetFocus == 1) {
			document.getElementById("upgradeAddress").style.borderColor = "#333333";
			document.getElementById("buttonFocusUpgrade").style.opacity = "1.0";
			upgradeSetFocus = 2;
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyUpgradeEnter	                                     */
/* Description: 升级设置页面，确认键处理   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyUpgradeEnter()
{
	if (upgradeStatus) {
		return;
	}
	if (upgradeTipsStatus) {
		clearInterval(timerUpgradeTips);
		hiddUpgradeTips();
		return;
	}
	if (upgradeSetFocus == 0) {
		return;
	} else if (upgradeSetFocus == 1) {
		keyboardInput = "upgradeAddress";
		showKeyboard(150);
	} else if (upgradeSetFocus == 2) {
		if (userLeftStatus) {
			if (upgradeMode == 0) {
				saveAutoSet();
				keyUpgradeBack();
			} else {
				upgradeStartFun();
			}
		} else {
			getUpgradeInfo();
			navigatorStatus = true;
			document.getElementById("focusBarMove").style.opacity = '0.0';
			document.getElementById("buttonFocusUpgrade").style.opacity = "0.0";
		}
	}
	return;
}

/*********************************************************************/
/* Function: saveAutoSet		                                     */
/* Description: 升级设置页面，保存自动升级设置							 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-03-22                              */
/*********************************************************************/
function saveAutoSet() {
	var mode = player.Ag_upgrade_setMode(upgradeMode);
	var urlSet = document.getElementById("upgradeAddress").innerHTML;
	var urlValue = player.Ag_upgrade_setURL(urlSet);
	return;
}

/*********************************************************************/
/* Function: keyUpgradeEnter	                                     */
/* Description: 升级设置页面，返回键处理   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-19                              */
/*********************************************************************/
function keyUpgradeBack() {
	if (upgradeSetFocus == 2) {
		document.getElementById("buttonFocusUpgrade").style.opacity = "0.0";
	} else if (upgradeSetFocus == 1) {
		document.getElementById("upgradeAddress").style.borderColor = "#333333";
	} else {
		document.getElementById("upgradeFocus").style.opacity = "0.0";
	}
	navigatorStatus = true;
	document.getElementById("focusBarMove").style.opacity = '0.0';
	getUpgradeInfo();
	return;
}

/*********************************************************************/
/* Function: upgradeStartFun	                                     */
/* Description: 升级开始				   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-10                              */
/*********************************************************************/
var upgradeSign;		//升级标记
var upgradeTipsStatus = false;	//升级提示状态
var upgradeStatus = false;		//升级状态
var timerUpgrade, timerUpgradeTips;
function upgradeStartFun() {
	var mode = player.Ag_upgrade_setMode(upgradeMode);
	var urlSet = document.getElementById("upgradeAddress").innerHTML;
	var urlValue = player.Ag_upgrade_setURL(urlSet);
	upgradeStatus = true;
	document.getElementById("upgradeTipsDivTxt").innerHTML = "Upgrading, please wait......";
	document.getElementById("upgradeTipsDiv").style.opacity = "1.0";
	upgradeTipsStatus = true;
	upgradeSign = player.Ag_upgrade_byURL(urlSet); // return 0 ok, -1 failed.
	player.printf(1, "=============upgradeSign============="+upgradeSign);	
	//timerUpgrade = setInterval("showUpgradeProcess();",100);
	return;
}

/*********************************************************************/
/* Function: showUpgradeProcess	                                     */
/* Description: 升级进度				   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-10                              */
/*********************************************************************/
function showUpgradeProcess() {
	var percent = player.Ag_upgrade_getUpgradePercent();
	document.getElementById("upgradeTipsDivTxt").innerHTML = "Upgrading, please wait......<br>"+percent+"%";
	player.printf(1, "=============percent============="+percent);	
	if (percent >= 100) {
		clearInterval(timerUpgrade);
	}
	return;
}

/*********************************************************************/
/* Function: hiddUpgradeTips	                                     */
/* Description: 隐藏提示				   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-10                              */
/*********************************************************************/
function hiddUpgradeTips() {
	document.getElementById("upgradeTipsDiv").style.opacity = "0.0";
	upgradeTipsStatus = false;
	navigatorStatus = true;
	document.getElementById("focusBarMove").style.opacity = '0.0';
	document.getElementById("buttonFocusUpgrade").style.opacity = "0.0";
}

///////////////////////////////////////////////默认///设置页面按键处理///////////////////////////////////////////////

/*********************************************************************/
/* Function: keyDefaultLeft	         	                             */
/* Description: 默认设置页面，左键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
var defaultSetFocus = 0;
function keyDefaultLeft()
{
	if (!userLeftStatus) {
		userLeftStatus = true;
		document.getElementById("buttonFocusDefault").style.left = '0px';
	}
	return;
}

/*********************************************************************/
/* Function: keyDefaultRight                                         */
/* Description: 默认设置页面，右键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyDefaultRight()
{
	if (userLeftStatus) {
		userLeftStatus = false;
		document.getElementById("buttonFocusDefault").style.left = '289px';
	}
	return;
}

/*********************************************************************/
/* Function: keyDefaultUp	                                         */
/* Description: 默认设置页面，上键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyDefaultUp()
{
	if (!navigatorStatus) {
		navigatorStatus = true;
		document.getElementById("buttonFocusDefault").style.opacity = "0.0";
		document.getElementById("focusBarMove").style.opacity = "0.0";
	}
	return;
}

/*********************************************************************/
/* Function: keyDefaultDown            	                             */
/* Description: 默认设置页面，下键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyDefaultDown()
{
	if (navigatorStatus) {
		navigatorStatus = false;
		userLeftStatus = true;
		document.getElementById("buttonFocusDefault").style.webkitTransitionDuration = "0s";
		document.getElementById("buttonFocusDefault").style.left = '0px';
		document.getElementById("focusBarMove").style.opacity = '1.0';
		setTimeout("showSettingsFocus('buttonFocusDefault');", 10);
	}
	return;
}

/*********************************************************************/
/* Function: keyDefaultEnter	                                     */
/* Description: 默认设置页面，确认键处理   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyDefaultEnter()
{
	if (userLeftStatus) {
		//player.Ag_settings_reset();
		var mode0 = player.Ag_video_setTVSystem(5);
		var mode1 = player.Ag_video_setAspectRatio(1);
		var mode2 = player.Ag_video_setDisplayMode(0);
		var ret = player.Ag_network_setLinkMode(0);
		var setIPaddress = player.Ag_network_setIPAddress("192.168.100.105");
		var setSubmask = player.Ag_network_setSubnetMask("255.255.255.0");
		var setGateway = player.Ag_network_setDefaultGateway("192.168.100.1");
		var setDNS = player.Ag_network_setDNSServer(1,"192.168.100.109");
		var setNTP = player.Ag_network_setNTPServer("192.168.100.109");
		var setUser = player.Ag_network_setPPPoEUserName("hybroad");
		var setPass = player.Ag_network_setPPPoEPasswd("000000");
		var ret = player.Ag_time_sycToNTP();
		var mode = player.Ag_upgrade_setMode(0);
		var urlValue = player.Ag_upgrade_setURL("http://yuxupg.fetchtv.com.au/yuxupg/YX6936U.txt");
		var setScan = player.Ag_dvb_setScanParameters(65560,64,0); 
		var mainURL = player.Ag_homePage_set("file:///home/fetchtv/sui/internet_test_redirect.html");
		getDVBInforFun();
		getVideoInfo();
		getNetInfo();
		getTimeInfo();
		getUpgradeInfo();
		getHomePageInfor();
		getInforFun();
	}
	navigatorStatus = true;
	document.getElementById("buttonFocusDefault").style.opacity = "0.0";
	document.getElementById("focusBarMove").style.opacity = "0.0";
	return;
}

/*********************************************************************/
/* Function: keyDefaultBack		                                     */
/* Description: 默认设置页面，返回键处理   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-19                              */
/*********************************************************************/
function keyDefaultBack() {
	keyDefaultUp();
	return;
}

///////////////////////////////////////////////信息///显示页面按键处理///////////////////////////////////////////////

/*********************************************************************/
/* Function: getInforFun	      		                             */
/* Description: 信息设置页面getInfor  								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function getInforFun()
{
	var ModeNum = player.Ag_system_getModeNo();
	var SerialNum = player.Ag_system_getSerialNum();
	var SoftwareNum = player.Ag_system_getSoftwareVersion();
	var HardwareNum = player. Ag_system_getHardwareVersion();
	var MACAdd = player.Ag_network_getMACAddress();
	document.getElementById("InforDivTxt0").innerHTML = ModeNum;
	document.getElementById("InforDivTxt1").innerHTML = SerialNum;
	document.getElementById("InforDivTxt2").innerHTML = SoftwareNum;
	document.getElementById("InforDivTxt3").innerHTML = HardwareNum;
	document.getElementById("InforDivTxt4").innerHTML = MACAdd;
	return;
}
/*********************************************************************/
/* Function: keyInfoLeft	      		                             */
/* Description: 信息设置页面，左键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyInfoLeft()
{
	return;
}

/*********************************************************************/
/* Function: keyInfoRight	                                         */
/* Description: 信息设置页面，右键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyInfoRight()
{
	return;
}

/*********************************************************************/
/* Function: keyInfoUp		                                         */
/* Description: 信息设置页面，上键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyInfoUp()
{
	return;
}

/*********************************************************************/
/* Function: keyInfoDown            	                             */
/* Description: 信息设置页面，下键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyInfoDown()
{
	return;
}

/*********************************************************************/
/* Function: keyInfoEnter	                                         */
/* Description: 信息设置页面，确认键处理   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyInfoEnter()
{
	return;
}

/*********************************************************************/
/* Function: keyInfoBack	                                         */
/* Description: 信息设置页面，返回键处理   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-19                              */
/*********************************************************************/
function keyInfoBack()
{
	return;
}

///////////////////////////////////////////////地址///设置页面按键处理///////////////////////////////////////////////

/*********************************************************************/
/* Function: keyAddressLeft	      		                             */
/* Description: 地址设置页面，左键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
var AddSetUrl;
var homePageUrl; 
var AddSetFocus = 0;
var AddSetLeftFocus =0; 
function getHomePageInfor()
{
	homePageUrl = player.Ag_homePage_get();
	player.printf(1, "homePageUrl==================================================////////////////****-----"+homePageUrl);
	document.getElementById("addSetDivBoxTxt").innerHTML = homePageUrl;
	return;
}

/*********************************************************************/
/* Function: keyAddressLeft	      		                             */
/* Description: 地址设置页面，左键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyAddressLeft()
{
	if(AddSetLeftFocus == 1){
		document.getElementById("AddSetBottomFocus").style.left = "0px";
		AddSetLeftFocus = 0;
		return;
	}
	return;
}

/*********************************************************************/
/* Function: keyAddressRight	                                     */
/* Description: 地址设置页面，右键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyAddressRight()
{
	if(AddSetLeftFocus == 0){
		document.getElementById("AddSetBottomFocus").style.left = "265px";
		AddSetLeftFocus = 1;
		return;
	}
	return;
}

/*********************************************************************/
/* Function: keyAddressUp		                                     */
/* Description: 地址设置页面，上键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyAddressUp()
{
	AddSetFocus--;
	if(AddSetFocus ==1){
		//document.getElementById("AddSetFocus").style.opacity = "1";
		document.getElementById("addSetDivBoxTxt").style.borderColor = "#0569e7";
		document.getElementById("AddSetBottomFocus").style.opacity = '0';	
		keyboardInput = "addSetDivBoxTxt";
		showKeyboard(150);
	}
	else if(AddSetFocus == 0){
		navigatorStatus = true;
		//document.getElementById("AddSetFocus").style.opacity = "0";
		document.getElementById("addSetDivBoxTxt").style.borderColor = "#333333";
		document.getElementById("focusBarMove").style.opacity = '0';
		getHomePageInfor();
		AddSetLeftFocus = 0; 
	}
	if(AddSetFocus <= 0){
		AddSetFocus = 0;
		return;
	}  
	return;
}

/*********************************************************************/
/* Function: keyAddressDown	          	                             */
/* Description: 地址设置页面，下键处理     								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyAddressDown()
{
	if (navigatorStatus) {
		navigatorStatus = false;
		AddSetFocus = 0;
		AddSetLeftFocus = 0;
		document.getElementById("AddSetBottomFocus").style.left = "0px";
		document.getElementById("addSetDivBoxTxt").style.borderColor = "#0569e7";
		document.getElementById("focusBarMove").style.opacity = '1.0'; 
		keyboardInput = "addSetDivBoxTxt";
		showKeyboard(150);
	}
	AddSetFocus++;
	if(AddSetFocus >= 2){
		AddSetFocus = 2;
		//document.getElementById("AddSetFocus").style.opacity = "0";
		document.getElementById("addSetDivBoxTxt").style.borderColor = "#333333";
		document.getElementById("AddSetBottomFocus").style.opacity = '1'; 
		return;
	}
	if(AddSetLeftFocus==0){
		document.getElementById("AddSetBottomFocus").style.left = "0px"; 
		AddSetLeftFocus = 0;
	} else {
		document.getElementById("AddSetBottomFocus").style.left = "265px"; 
		AddSetLeftFocus = 1;
	}    
	return;
}

/*********************************************************************/
/* Function: keyAddressEnter                                         */
/* Description: 地址设置页面，确认键处理   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function keyAddressEnter()
{
	if(AddSetFocus==1){		
		keyboardInput = "addSetDivBoxTxt";
		showKeyboard(150);
	}
	else if(AddSetLeftFocus==0){
		AddSetUrl = document.getElementById("addSetDivBoxTxt").innerHTML;
		player.Ag_homePage_set(AddSetUrl);
		navigatorStatus = true;
		document.getElementById("AddSetBottomFocus").style.opacity = "0";
		document.getElementById("focusBarMove").style.opacity = '0';
		AddSetLeftFocus = 0;
		AddSetFocus = 0; 
	}
	else if(AddSetLeftFocus==1){
		document.getElementById("addSetDivBoxTxt").innerHTML = ""; 
		getHomePageInfor();
		navigatorStatus = true;
		document.getElementById("AddSetBottomFocus").style.opacity = "0";
		document.getElementById("focusBarMove").style.opacity = '0';
		AddSetLeftFocus = 0;
		AddSetFocus = 0; 
	}
	return;
}

/*********************************************************************/
/* Function: keyAddressBack                                         */
/* Description: 地址设置页面，返回键处理   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-19                              */
/*********************************************************************/
function keyAddressBack() {
	if (AddSetFocus == 1) {
		document.getElementById("addSetDivBoxTxt").style.borderColor = "#333333";
	} else if (AddSetFocus == 2) {
		document.getElementById("AddSetBottomFocus").style.opacity = '0';
	}
	navigatorStatus = true;
	document.getElementById("focusBarMove").style.opacity = '0';
	getHomePageInfor();
	return;
}
///////////////////////////////////////////////DVB///设置页面按键处理///////////////////////////////////////////////

/*********************************************************************/
/* Function: keyDVBLeft	         		                             */
/* Description: DVB设置页面，左键处理     								 */
/* Parameters:												         */
/* Author&Date:  zhaopengjun  2010-12-31                             */
/*********************************************************************/
var dvbFocus;
var dvbLeftFocus = 0; // 0 is Left Focus , 1 is Right Focus;
var DvbqamNum = 2;
var DvbBandNum = 0;
var FreNum = 858;
var QamNum = 64;
var BandNum;
var DvbSearchNum = 2;
var SearchNum = 0;
var StopKeystates; //true is Lock Key, false is  Unlocking Key; 
var TimerProgress;
var DvbTotalNum;
var searchstates = 1; // 0 is  Searching., 1 is Not Search;
var DvbqamArr = new Array("16QAM","32QAM","64QAM","128QAM","256QAM","1024QAM");
var DvbQamNumArr = new Array("16","32","64","128","256","1024");
var DvbBandArr = new Array("7M","8M");
var DvbBandNumArr = new Array("0","1");
var SearchNumArr = new Array("2","4","6","8","10"); 
function getDVBInforFun(){	
	document.getElementById("dvb_DivTxt0").innerHTML = FreNum; //Fre;
	document.getElementById("dvb_DivTxt1").innerHTML = DvbqamArr[DvbqamNum]; //Qam;
	document.getElementById("dvb_DivTxt2").innerHTML = DvbBandArr[DvbBandNum]; // Band;
	document.getElementById("dvb_DivTxt3").innerHTML = SearchNumArr[SearchNum]; // Search Number;
}
function keyDVBLeft()
{ 
	if(StopKeystates){
		return; 
	}
	if(Tipsst==1){
		return; 
	}
	if(dvbFocus == 1){ // Qam Txt;
		DvbqamNum--;
		if(DvbqamNum < 0){
			DvbqamNum = 5; 
		}
		document.getElementById("dvb_DivTxt1").innerHTML = DvbqamArr[DvbqamNum];
		QamNum = DvbQamNumArr[DvbqamNum]; 
		player.printf(1, "QamNum==================================================////////////////****-----"+QamNum);
	}
	else if(dvbFocus == 2){ // Band Txt;
		DvbBandNum--;
		if(DvbBandNum < 0){
			DvbBandNum = 1; 
		}
		document.getElementById("dvb_DivTxt2").innerHTML = DvbBandArr[DvbBandNum];
		BandNum = DvbBandNumArr[DvbBandNum];
		player.printf(1, "BandNum==================================================////////////////****---"+BandNum);
	}
	else if(dvbFocus == 3){	// Search Txt;	
		SearchNum--;
		if(SearchNum < 0){
			SearchNum = 4; 
		}
		document.getElementById("dvb_DivTxt3").innerHTML = SearchNumArr[SearchNum];
		DvbSearchNum = SearchNumArr[SearchNum];
		player.printf(1, "SearchNum==================================================////////////////****---"+SearchNum);
	}
	else if(dvbFocus <= 3){
		return;
	}
	else{
		if(dvbLeftFocus==1){
			document.getElementById("dvbBottomFocus").style.left = "0px";
			dvbLeftFocus = 0; 
		}
		else if(dvbLeftFocus==0){
			return;
		}
	} 
	return;
}

/*********************************************************************/
/* Function: keyDVBRight	                                         */
/* Description: DVB设置页面，右键处理     								 */
/* Parameters:												         */
/* Author&Date:  zhaopengjun  2010-12-31                            */
/*********************************************************************/
function keyDVBRight()
{
	if(StopKeystates){
		return; 
	}
	if(Tipsst==1){
		return; 
	}
	if(dvbFocus == 1){ // Qam Txt;
		DvbqamNum++;
		if(DvbqamNum > 5){
			DvbqamNum = 0; 
		}
		document.getElementById("dvb_DivTxt1").innerHTML = DvbqamArr[DvbqamNum];
		QamNum = DvbQamNumArr[DvbqamNum]; 
		player.printf(1, "QamNum==================================================////////////////****-----"+QamNum);
	}
	else if(dvbFocus == 2){// Band Txt;
		DvbBandNum++;
		if(DvbBandNum > 1){
			DvbBandNum = 0; 
		}
		document.getElementById("dvb_DivTxt2").innerHTML = DvbBandArr[DvbBandNum];
		BandNum = DvbBandNumArr[DvbBandNum];
		player.printf(1, "BandNum==================================================////////////////****---"+BandNum);
	}
	else if(dvbFocus == 3){//Search Txt	
		SearchNum++;
		if(SearchNum > 4){
			SearchNum = 0; 
		}
		document.getElementById("dvb_DivTxt3").innerHTML = SearchNumArr[SearchNum];
		DvbSearchNum = SearchNumArr[SearchNum];
		player.printf(1, "SearchNum==================================================////////////////****---"+SearchNum);
	}
	else if(dvbFocus <= 3){
		return;
	}
	else{
		if(dvbLeftFocus==0){
			document.getElementById("dvbBottomFocus").style.left = "245px"; 
			dvbLeftFocus = 1; 
		}
		else if(dvbLeftFocus==1){
			return;
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyDVBUp		                                         */
/* Description: DVB设置页面，上键处理     								 */
/* Parameters:												         */
/* Author&Date:  zhaopengjun  2010-12-31                            */
/*********************************************************************/
function keyDVBUp()
{
	if(StopKeystates){
		return; 
	}
	if(Tipsst==1){
		return; 
	}
	if(dvbFocus <= 0){
		navigatorStatus = true; 
		document.getElementById("dvbFocus").style.opacity = "0";
		document.getElementById("focusBarMove").style.opacity = '0';
		dvbFocus = 0;   
	} 
	else{ 
		DVBFocusFun(1);
	}
	return;
}

/*********************************************************************/
/* Function: keyDVBDown	            	                             */
/* Description: DVB设置页面，下键处理     								 */
/* Parameters:												         */
/* Author&Date:  zhaopengjun  2010-12-31                            */
/*********************************************************************/
function keyDVBDown()
{
	if(StopKeystates){
		return; 
	}
	if(Tipsst==1){
		return; 
	}
	if (navigatorStatus) {
		navigatorStatus = false;
		dvbFocus = 0;
		dvbLeftFocus = 0;
		document.getElementById("dvbFocus").style.webkitTransitionDuration = "0s";
		document.getElementById("dvbFocus").style.top = "68px";
		setTimeout("showSettingsFocus('dvbFocus');", 10);
		document.getElementById("dvbBottomFocus").style.left = "0px"; 
		document.getElementById("focusBarMove").style.opacity = '1.0'; 
	}  
	else{
		DVBFocusFun(0); 
	}
	return;
}

/*********************************************************************/
/* Function: DVBFocusFun	                                         */
/* Description: DVB  Focus                                           */
/* Parameters:												         */
/* Author&Date:  zhaopengjun  2010-12-31                            */
/*********************************************************************/
function DVBFocusFun(Num)
{
	if(Num==0){ // KeyDown;	
		if(dvbFocus >= 3){
			document.getElementById("dvbFocus").style.opacity = "0";
			document.getElementById("dvbBottomFocus").style.opacity = "1"; 
			dvbFocus = 4; 
			searchstates = 0; 
			return;
		}
		if(dvbLeftFocus==0){
			document.getElementById("dvbBottomFocus").style.left = "0px"; 
			dvbLeftFocus = 0;
		} else {
			document.getElementById("dvbBottomFocus").style.left = "245px"; 
			dvbLeftFocus = 1;
		}  
		dvbFocus++; 
	}
	else{ 
		if(dvbFocus == 4){ // Key Up;
			document.getElementById("dvbFocus").style.opacity = "1";
			document.getElementById("dvbBottomFocus").style.opacity = "0"; 
			dvbFocus = 3; 
			return;
		}
		dvbFocus--; 
	}
	document.getElementById("dvbFocus").style.top = 68+dvbFocus*49 +"px"; 
	return;
}
/*********************************************************************/
/* Function: keyDVBEnter	                                         */
/* Description: DVB设置页面，确认键处理   								 */
/* Parameters:												         */
/* Author&Date:  zhaopengjun  2010-12-31                            */
/*********************************************************************/
function keyDVBEnter()
{
	if(StopKeystates){
		return; 
	}
	if(dvbFocus ==0){
		return;
	}
	if(searchstates==0){
		StopKeystates = true; 
		searchFun();
	}
	else{
		DvbTipsEnter();
	}
	return;
}

/*********************************************************************/
/* Function: keyDVBBack	                        	                 */
/* Description: DVB设置页面，返回键处理   								 */
/* Parameters:												         */
/* Author&Date:  zhaopengjun  2011-01-19	                         */
/*********************************************************************/
function keyDVBBack() {
	if(StopKeystates || Tipsst == 1){
		return; 
	}
	if (dvbFocus == 4) {
		document.getElementById("dvbBottomFocus").style.opacity = "0";
	} else {
		document.getElementById("dvbFocus").style.opacity = "0";
	}
	navigatorStatus = true;
	document.getElementById("focusBarMove").style.opacity = '0.0';
	getDVBInforFun();
	return;
}

/*********************************************************************/
/* Function: searchFun  	                                         */
/* Description: DVB search            								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun   2010-12-31                             */
/*********************************************************************/
function searchFun()
{
	var type = player.Ag_dvb_deleteChannelList(); //Delete ChannelList;
	var setScan = player.Ag_dvb_setScanParameters(65560,QamNum,DvbBandNum); 
	player.printf(1, "setScan==================================================////////////////****---"+setScan);
	if(dvbLeftFocus==0){// Auto 
		if(DvbBandNum==0){
			BandNum = 7000000;
		}
		else{
			BandNum = 8000000;
		} 
		document.getElementById("dvb_DivTxtbar").style.opacity = "1";
		player.printf(1, "BandNum==================================================////////////////****"+BandNum);
		var auto = player.Ag_dvb_startScan(FreNum*1000000,BandNum,DvbSearchNum);
		ProgressFun();
		player.printf(1, "auto==================================================////////////////****"+auto);
	}
	else{ // Manual
		document.getElementById("dvb_DivTxt4").innerHTML = "0%";
		setTimeout("manualScanFun();", 10);
//		FreNum = FreNum*1000000;
	}
}

function manualScanFun() {
	player.printf(1, "FreNum==================================================////////////////****////"+FreNum);
	var  manual = player.Ag_dvb_manualScan(FreNum*1000000);	 
		document.getElementById("dvb_DivTxtbar").style.opacity = "1";
		document.getElementById("dvb_DivTxt4").innerHTML = "100%";
		document.getElementById("dvb_DivTxtbar").style.width = "320px";
	DvbTipsFun();
	player.printf(1, "manual==================================================////////////////****"+manual);
	return;
}
/*********************************************************************/
/* Function: ProgressFun  	                                         */
/* Description: DVB Progress           								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                             */
/*********************************************************************/
function ProgressFun(){	
	var AutoBar = 100;//player.Ag_dvb_getAutoScanProgress();
	player.printf(1, "manual===========================AutoBar==============="+AutoBar);
	document.getElementById("dvb_DivTxt4").innerHTML = AutoBar + "%";
	document.getElementById("dvb_DivTxtbar").style.width = AutoBar*(320/100) + "px";
	if (AutoBar >= 100) {
		DvbTipsFun();
		return;
	}
	TimerProgress = setTimeout("ProgressFun()",1000); 
}
/*********************************************************************/
/* Function: DvbTotalFun  	                                         */
/* Description: DVB输入函数            								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                             */
/*********************************************************************/
function DvbTotalFun()
{
	DvbTotalNum = player.Ag_dvb_getTotalNumbers();
	player.printf(1, "DvbTotalNum==================================================////////////////****"+DvbTotalNum); 
		
} 
/*********************************************************************/
/* Function: DvbKeyNum    	                                         */
/* Description: DVB输入函数            								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                             */
/*********************************************************************/
function DvbKeyNum(KeyNum){
	if(dvbFocus ==0){
		FreNum = document.getElementById("dvb_DivTxt0").innerHTML; 
		if(FreNum.length >=3){
			document.getElementById("dvb_DivTxt0").innerHTML = KeyNum;
		}
		else{
			document.getElementById("dvb_DivTxt0").innerHTML += KeyNum;
		}
		player.printf(1, "FreNum==================================================////////////////****----000====="+FreNum); 
	}
	return;
}

/*********************************************************************/
/* Function: DvbKeyBackNum 	                                         */
/* Description: DVB输入函数            								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                              */
/*********************************************************************/
function DvbKeyBackNum(){
	if(dvbFocus ==0){   
		FreNum = document.getElementById("dvb_DivTxt0").innerHTML;
		var aa = FreNum.length;
		FreNum = FreNum.substr(0,aa-1);
		document.getElementById("dvb_DivTxt0").innerHTML = FreNum; 
		player.printf(1, "FreNum==================================================////////////////****----111111====="+FreNum); 
	}
	return;
}
/*********************************************************************/
/* Function: DvbTipsEnter 	                                         */
/* Description: Dvb  Tips             								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                             */
/*********************************************************************/ 
function DvbTipsEnter(){
	if(Tipsst==1){		
		navigatorStatus = true; 
		dvbFocus = 0;  
		Tipsst = 0; 
		dvbLeftFocus = 0;
		document.getElementById("Dvb_TipsDiv").style.opacity = "0";   
		document.getElementById("dvbFocus").style.opacity = "0";
		document.getElementById("focusBarMove").style.opacity = '0';
		document.getElementById("dvbFocus").style.top = 68+dvbFocus*49 +"px"; 
		document.getElementById("dvbBottomFocus").style.left = "0px";
		document.getElementById("dvb_DivTxt4").innerHTML = "0%";
		document.getElementById("dvb_DivTxtbar").style.opacity = "0";
		document.getElementById("dvb_DivTxtbar").style.width = "0px";
	}
	return;
}

/*********************************************************************/
/* Function: DvbTipsFun    	                                         */
/* Description: Dvb  Tips             								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2010-12-31                             */
/*********************************************************************/
var Tipsst = 0; // 0 is Hidden, 1 is Display;
function DvbTipsFun(){
	searchstates = 1;
	if(Tipsst==0){
		window.clearTimeout(TimerProgress);
		setTimeout("StopKeystates = false;", 500);
		DvbTotalFun();
		document.getElementById("dvbBottomFocus").style.opacity = "0";
		document.getElementById("Dvb_TipsDiv").style.opacity = "1";		
		document.getElementById("Dvb_TipsDivTxt").innerHTML = "Scanning " + " " + "Done " + " " + " Total DVB Channels: " +" "+ DvbTotalNum;
		Tipsst = 1;
	}
	return;
}
/*********************************************     DVB   End     **************************************************/



///////////////////////////////////////////////各页面功能处理///////////////////////////////////////////////















var rightTipsMess = ["<font size='+2' color='#ffae00'>Tips:</font><br>Please press the Left key or Right key to choose icon","<font size='+2' color='#ffae00'>Tips:</font><br>Please press the Left key or Right key to choose user","<font size='+2' color='#ffae00'>Tips:</font><br>Please press the Left key or Right key to choose permission ","<font size='+2' color='#ffae00'>Tips:</font><br>Please press the Left key or Right key to choose superior","<font size='+2' color='#ffae00'>Tips:</font><br>Please press the Left key or Right key to choose credit","<font size='+2' color='#ffae00'>Tips:</font><br>Please press the Left key or Right key to choose save or cancel,<br>and press Enter key to related operation"];

