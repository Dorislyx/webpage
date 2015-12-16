// JavaScript Document
/********************************************************************/
/* Function: keyEvent												*/
/* Description: 接收遥控器按键										*/
/* Parameters: 遥控器键值												*/
/* Author&Date: zhaopengjun 2011-09-21								*/
/********************************************************************/
pressKeyEventControl(keyEvent);		//遥控器键值转换函数
function keyEvent(e) {
	/*if (stopKeyControl) {
		return;
	}*/
	switch(e) {
		case KEY_NUM_0:
		case KEY_NUM_1:
		case KEY_NUM_2:
		case KEY_NUM_3:
		case KEY_NUM_4:
		case KEY_NUM_5:
		case KEY_NUM_6:
		case KEY_NUM_7:
		case KEY_NUM_8:
		case KEY_NUM_9:
			var num = e-48;
			inputO.getInput(num);
			break;
		case KEY_LEFT:
			if (menuStatus == 1) {
				keymenuRight();
				return false;
			}
			keyLeft();
			return false;
			break;
		case KEY_RIGHT:
			if (menuStatus == 1) {
				keymenuLeft();
				return false;
			}
			keyRight();
			return false;
			break;
		case KEY_UP:
			if (menuStatus == 1) {
				return false;
			}
			keyUp();
			return false;
			break;
		case KEY_DOWN:
			if (menuStatus == 1) {
				return false;
			}
			keyDown();
			return false;
			break;
		case KEY_ENTER:
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
			keyEnter();
			break;
		case KEY_BACK:	
			keyBack();
			return false;
			break;
		case KEY_MUTE:
			keyMute();
			break;
		case KEY_VOL_UP:
			keyVolUp();
			break;
		case KEY_VOL_DOWN:
			keyVolDown();
			break;
		case KEY_BLUE:
			keyBlue();
			break;
		case KEY_YELLOW:
			keyYellow();
			break;
		case KEY_MENU:
			keyMenu();
			break;
		case KEY_DISPLAY:
			keyDisplay();
			break;
		case KEY_CH_UP:
			keyChannelUp();
			break;
		case KEY_CH_DOWN:
			keyChannelDown();
			break;
		default:
			break;
	}
	return;
}

/********************************************************************/
/* Function: keyChannelUp											*/
/* Description: 频道加操作											*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-12-13								*/
/********************************************************************/
function keyChannelUp() {
	dvbc.playPrevious();
	getChannelInfo();
	return;
}

/********************************************************************/
/* Function: keyChannelDown											*/
/* Description: 频道减操作											*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-12-13								*/
/********************************************************************/
function keyChannelDown() {
	dvbc.playNext();
	getChannelInfo();
	return;
}

/********************************************************************/
/* Function: keyLeft												*/
/* Description: keyLeft按键处理										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-21								*/
/********************************************************************/
function keyLeft() {
	if (showScanFrameStatus) {
		scanFocusLeftOrRightControl(0);
	} else {
		//hiddChannelList();
	}
	return;
}

/********************************************************************/
/* Function: keyRight												*/
/* Description: keyRight按键处理										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-21								*/
/********************************************************************/
function keyRight() {
	if (showScanFrameStatus) {
		scanFocusLeftOrRightControl(1);
	} else {
		//showChannelList();
	}
	return;
}

/********************************************************************/
/* Function: keyUp													*/
/* Description: keyUp按键处理											*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-21								*/
/********************************************************************/
function keyUp() {
	if (showScanFrameStatus) {
		moveScanFrameFocus(0);
	} else if (isChannelListShow) {
		moveListFocus(0);
	}
	return;
}

/********************************************************************/
/* Function: keyDown												*/
/* Description: keyDown按键处理										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-21								*/
/********************************************************************/
function keyDown() {
	if (showScanFrameStatus) {
		moveScanFrameFocus(1);
	} else if (isChannelListShow) {
		moveListFocus(1);
	}
	return;
}

/********************************************************************/
/* Function: keyEnter												*/
/* Description: keyEnter按键处理										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-21								*/
/********************************************************************/
function keyEnter() {
	if (showScanFrameStatus) {
		scanFocusEnter();
	} else if (isChannelListShow) {
		playChannel(channelListIndex);
	}
	return;
}

/********************************************************************/
/* Function: keyBack												*/
/* Description: keyBack按键处理										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-21								*/
/********************************************************************/
function keyBack() {
	if (inputO != null) {
		inputO.removeStr();
	}
	return;
}

/********************************************************************/
/* Function: keyMute												*/
/* Description: keyMute按键处理										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-26								*/
/********************************************************************/
function keyMute() {
	volumeMute();
	showVolumeStatus();
	return;
}

/********************************************************************/
/* Function: keyVolUp												*/
/* Description: keyVolUp按键处理										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-26								*/
/********************************************************************/
function keyVolUp() {
	if (showOrHiddInfo) {
		showInfo();
		setTimeout("volumeUp();",500);
	} else if (isChannelListShow) {
		hiddChannelList();
		setTimeout("volumeUp();",500);
	} else if (menuStatus == 1) {
		moveMenu();
		setTimeout("volumeUp();",500);
	} else {
		volumeUp();
	}
	return;
}

/********************************************************************/
/* Function: keyVolDown												*/
/* Description: keyVolDown按键处理									*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-26								*/
/********************************************************************/
function keyVolDown() {
	if (showOrHiddInfo) {
		showInfo();
		setTimeout("volumeDown();",500);
	} else if (isChannelListShow) {
		hiddChannelList();
		setTimeout("volumeDown();",500);
	} else if (menuStatus == 1) {
		moveMenu();
		setTimeout("volumeDown();",500);
	} else {
		volumeDown();
	}
	return;
}

/********************************************************************/
/* Function: keyMenu												*/
/* Description: keyMenu按键处理										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-12-13								*/
/********************************************************************/
function keyMenu() {
	if (showOrHiddInfo) {
		showInfo();
		setTimeout("moveMenu();",500);
	} else if (isChannelListShow) {
		hiddChannelList();
		setTimeout("moveMenu();",500);
	} else if (volShowStatus) {
		hiddenVolBar();
		setTimeout("moveMenu();",500);
	} else if (showScanFrameStatus) {
		hiddScanFrame();
		setTimeout("moveMenu();",500);
	} else {
		moveMenu();
	}
	return;
}

/********************************************************************/
/* Function: keyDisplay												*/
/* Description: keyDisplay按键处理									*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-12-12								*/
/********************************************************************/
function keyDisplay() {
	if (showScanFrameStatus) {
		return;
	} else if (menuStatus == 1) {
		moveMenu();
		setTimeout("showOrHiddChannelList();",500);
	} else if (showOrHiddInfo) {
		showInfo();
		setTimeout("showOrHiddChannelList();",500);
	} else if (volShowStatus) {
		hiddenVolBar();
		setTimeout("showOrHiddChannelList();",500);
	} else {
		showOrHiddChannelList();
	}
	return;
}

/********************************************************************/
/* Function: keyBlue												*/
/* Description: keyBlue按键处理										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-12-13								*/
/********************************************************************/
function keyBlue() {
	if (menuStatus == 1) {
		moveMenu();
		setTimeout("showScanFrame();",500);
	} else if (isChannelListShow) {
		hiddChannelList();
		setTimeout("showScanFrame();",500);
	} else if (volShowStatus) {
		hiddenVolBar();
		setTimeout("showScanFrame();",500);
	} else if (showOrHiddInfo) {
		showInfo();
		setTimeout("showScanFrame();",500);
	} else if (showScanFrameStatus) {
		hiddScanFrame();
	} else {
		showScanFrame();
	}
	return;
}

/********************************************************************/
/* Function: keyYellow												*/
/* Description: keyYellow按键处理										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-12-13								*/
/********************************************************************/
function keyYellow() {
	if (showScanFrameStatus) {
		return;
	} else if (menuStatus == 1) {
		moveMenu();
		setTimeout("showInfo();",500);
	} else if (isChannelListShow) {
		hiddChannelList();
		setTimeout("showInfo();",500);
	} else if (volShowStatus) {
		hiddenVolBar();
		setTimeout("showInfo();",500);
	} else {
		showInfo();
	}
	return;
}

/********************************************************************/
/* Function: showOrHiddChannelList									*/
/* Description: 显示或隐藏频道列表										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-12-13								*/
/********************************************************************/
function showOrHiddChannelList() {
	if (isChannelListShow) {
		hiddChannelList();
	} else {
		showChannelList();
	}
	return;
}
///////////////////////////////// 音频控制部分开始 //////////////////////////////////////////////////

/********************************************************************/
/* Function: volumeUp												*/
/* Description: 音量加操作											*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-26								*/
/********************************************************************/
function volumeUp() {
	if (audioObj == null) {
		audioObj = new Audio(5);
	}
	audioObj.setVolumeUp();
	showVolumeBar();
	showVolBar();
	showMuteStatus();
	showOrHiddMuteIcon();
	return;
}

/********************************************************************/
/* Function: volumeDown												*/
/* Description: 音量减操作											*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-26								*/
/********************************************************************/
function volumeDown() {
	if (audioObj == null) {
		audioObj = new Audio(5);
	}
	audioObj.setVolumeDown();
	showVolumeBar();
	showVolBar();
	showMuteStatus();
	showOrHiddMuteIcon();
	return;
}

/********************************************************************/
/* Function: volumeMute												*/
/* Description: 静音操作												*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-26								*/
/********************************************************************/
function volumeMute() {
	if (audioObj == null) {
		audioObj = new Audio(5);
	}
	audioObj.setMute();
	showMuteStatus();
	showOrHiddMuteIcon();
	return;
}

/********************************************************************/
/* Function: volumeGetMute											*/
/* Description: 获得静音状态											*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-26								*/
/********************************************************************/
function volumeGetMute() {
	if (audioObj == null) {
		audioObj = new Audio(5);
	}
	audioObj.muteStatus = audioObj.getMute();
	return;
}

/********************************************************************/
/* Function: volumeSetStereo										*/
/* Description: 设置声道操作											*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-26								*/
/********************************************************************/
function volumeSetStereo() {
	if (audioObj == null) {
		audioObj = new Audio(5);
	}
	audioObj.setStereo();
}

/********************************************************************/
/* Function: volumeGetStereo										*/
/* Description: 获得声道信息											*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-26								*/
/********************************************************************/
function volumeGetStereo() {
	if (audioObj == null) {
		audioObj = new Audio(5);
	}
	audioObj.audioChannel = audioObj.getStereo();
	return;
}

/********************************************************************/
/* Function: showVolumeStatus										*/
/* Description: 显示音频信息											*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-26								*/
/********************************************************************/
function showVolumeBar() {
	document.getElementById("volumeBar").style.width = (audioObj.volume/100)*676+"px";
	document.getElementById("volumeText").innerHTML = audioObj.volume+"/100";
	return;
}

/*********************************************************************/
/* Function: showVolBar	    		                                 */
/* Description: 显示音量条			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-09-27                              */
/*********************************************************************/
function showVolBar() {
	if (volShowStatus) {
		window.clearTimeout(timer_vol);
	} else {
		document.getElementById("volumeDiv").style.height = "74px";
		volShowStatus = true;
	}
	timer_vol = window.setTimeout("hiddenVolBar()", 2000);
	return;
}

/*********************************************************************/
/* Function: hiddenVolBar		                                     */
/* Description: 隐藏音量条		  	 								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function hiddenVolBar() {
	document.getElementById("volumeDiv").style.height = "0px";
	volShowStatus = false;
	showOrHiddMuteIcon();
	return;
}

/*********************************************************************/
/* Function: showOrHiddMuteIcon	                                     */
/* Description: 判断静音图标的状态	  	 								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-15                              */
/*********************************************************************/
function showOrHiddMuteIcon() {
	if (audioObj.muteStatus == 0) {
		document.getElementById("muteIconImg").style.backgroundImage = "url(image/vol0.png)";
		document.getElementById("muteIcon").style.opacity = "0";
	} else {
		document.getElementById("muteIconImg").style.backgroundImage = "url(image/vol.png)";
		document.getElementById("muteIcon").style.opacity = "1";
	}
	return;
}

/*********************************************************************/
/* Function: showMuteStatus		                                     */
/* Description: 显示是否静音提示		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function showMuteStatus() {
	if (audioObj.muteStatus == 1) {
		document.getElementById("volumeFlag").style.backgroundImage = "url(image/vol.png)";
		document.getElementById("volumeBar").style.background = "-webkit-gradient(linear, left top, left bottom, from(#c4c4c4), to(#585858))";
	} else {
		document.getElementById("volumeFlag").style.backgroundImage = "url(image/vol0.png)";
		document.getElementById("volumeBar").style.background = "-webkit-gradient(linear, left top, left bottom, from(#a5fd77), to(#40aa22))";
	}
	return;
}

/*********************************************************************/
/* Function: showStereoStatus	                                     */
/* Description: 显示声道信息			   								 */
/* Parameters:	type:0 is stereo,1 is track					         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function showStereoStatus(num,type) {
	if (type == 0) {
		document.getElementById("stereoText").innerHTML = stereoArrayText[num];
	} else {
		document.getElementById("stereoText").innerHTML = num;
		//document.getElementById("stereoText").innerHTML = num.toUpperCase();
	}
	if (stereoStatus) {
		window.clearTimeout(timer_stereo);
	} else {
		document.getElementById("stereoDiv").style.visibility = "visible";
		stereoStatus = true;
	}
	timer_stereo = window.setTimeout("hiddenStereoStatus()",2000);
	return;
}

/*********************************************************************/
/* Function: hiddenStereoStatus	                                     */
/* Description: 隐藏声道信息			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function hiddenStereoStatus() {
	document.getElementById("stereoDiv").style.visibility = "hidden";
	stereoStatus = false;
	return;
}

///////////////////////////////// 音频控制部分结束 //////////////////////////////////////////////////
function showPageFull() {
	return;
}

/********************************************************************/
/* Function: init													*/
/* Description: 创建dvbc对象											*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-21								*/
/********************************************************************/
function init() {
	var returnHref = document.location.href.split("?");
	focusNum= 1;
	//var leftPxSettings = "1003:1222:-92:127:346:565:784"-311, -92, 127, 346, 565, 784, 1003, 1222, 1441
	var leftPxSettings = "1441:-311:-92:127:346:565:784:1003:1222";
	divLeftArray = focusNum+"?"+leftPxSettings;
	htmlHref = fontListArray[0] + "?" + divLeftArray;  	 
	menuinit();
	player = new AVPlayer();
	dvbc.stopStream();
	dvbc.currentIndex = 0;
	dvbc.channelTotal = dvbc.getChannelTotal();
	if (dvbc.channelTotal == 0) {
		showScanFrame();
	} else {
		showScanFrame();	//现在的版本，如果不先搜台，就不能正常播放
		return;
		playChannel(dvbc.currentIndex);
		freshChannelList();
	}
	return;
}

///////////////////////////////// 频道搜索相关操作 //////////////////////////////////////////////////

/********************************************************************/
/* Function: showScanFrame											*/
/* Description: 显示搜索频道提示框										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-21								*/
/********************************************************************/
function showScanFrame() {
	if (showScanFrameStatus) {
		return;
	}
	document.getElementById("scanFrame").style.visibility = "visible";
	showScanFrameStatus = true;
	showScanFocus();
	return;
}

/********************************************************************/
/* Function: hiddScanFrame											*/
/* Description: 隐藏搜索频道提示框										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-21								*/
/********************************************************************/
function hiddScanFrame() {
	if (showScanFrameStatus) {
		document.getElementById("scanFrame").style.visibility = "hidden";
		showScanFrameStatus = false;
		hiddScanFocus();
		scanFocusIndex = 0;
		document.getElementById("scanTipsProcess").style.visibility = "hidden";
	}
	return;
}

/********************************************************************/
/* Function: moveScanFrameFocus										*/
/* Description: 搜索框内移动焦点										*/
/* Parameters: type is 0:上移，1:下移									*/
/* Author&Date: zhaopengjun 2011-09-23								*/
/********************************************************************/
function moveScanFrameFocus(type) {
	if (type == 0) {
		if (scanFocusIndex == 0) {
			return;
		} else {
			hiddScanFocus();
			scanFocusIndex--;
			showScanFocus();
		}
	} else {
		if (scanFocusIndex == 3) {
			return;
		} else {
			hiddScanFocus();
			scanFocusIndex++;
			showScanFocus();
		}
	}
	return;
}

/********************************************************************/
/* Function: hiddScanFocus											*/
/* Description: 搜索框焦点隐藏										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-23								*/
/********************************************************************/
function hiddScanFocus() {
	if (scanFocusIndex == 3) {
		var confirmId = scanFocusIsLeft ? 'scanConfirm' : 'scanCancel';
		document.getElementById(confirmId).style.backgroundImage = "-webkit-gradient(radial, 50% -10%, 15, 50% -10%, 110, from(#868686), to(#2a2a2a))";
		scanFocusIsLeft = true;
	} else {
		document.getElementById("scanParam"+scanFocusIndex).style.backgroundColor = "#000";
		if (scanFocusIndex == 0 || scanFocusIndex == 2) {
			inputO.loseFocus();
			inputO = null;
		}
	}
	return;
}

/********************************************************************/
/* Function: showScanFocus											*/
/* Description: 搜索框焦点显示										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-23								*/
/********************************************************************/
function showScanFocus() {
	if (scanFocusIndex == 3) {
		document.getElementById("scanConfirm").style.backgroundImage = "-webkit-gradient(radial, 50% -10%, 15, 50% -10%, 110, from(#056be9), to(#011f66))";
	} else {
		document.getElementById("scanParam"+scanFocusIndex).style.backgroundColor = "#056ded";
		if (scanFocusIndex == 0 || scanFocusIndex == 2) {
			if (inputO == null) {
				var string_input = document.getElementById("scanParam"+scanFocusIndex).innerText;
				inputO = new InputObj("scanParam"+scanFocusIndex, "num", string_input, 9, "image/Cursor.gif", "image/none.gif", 24);
			}
			inputO.getFocus();
		}
	}
	return;
}

/********************************************************************/
/* Function: scanFocusLeftOrRightControl							*/
/* Description: 搜索框内移动焦点										*/
/* Parameters: type is 0:左移，1:右移									*/
/* Author&Date: zhaopengjun 2011-09-23								*/
/********************************************************************/
function scanFocusLeftOrRightControl(type) {
	if (scanFocusIndex == 0 || scanFocusIndex == 2) {
		if (inputO != null) {
			var pos = type == 0 ? -1 : 1;
			inputO.moveCursor(pos);
		}
	} else if (scanFocusIndex == 1) {
		if (type == 0) {
			qamParamIndex--;
			qamParamIndex = qamParamIndex < 0 ? (qamParam.length-1) : qamParamIndex;
		} else {
			qamParamIndex++;
			qamParamIndex = qamParamIndex > (qamParam.length-1) ? 0 : qamParamIndex;
		}
		document.getElementById("scanParam1").innerHTML = qamParam[qamParamIndex];
	} else if (scanFocusIndex == 3) {
		scanFocusIsLeft = scanFocusIsLeft ? false : true;
		var confirmId = scanFocusIsLeft ? 'scanConfirm' : 'scanCancel';
		var cancelId = scanFocusIsLeft ? 'scanCancel' : 'scanConfirm';
		document.getElementById(confirmId).style.backgroundImage = "-webkit-gradient(radial, 50% -10%, 15, 50% -10%, 110, from(#056be9), to(#011f66))";
		document.getElementById(cancelId).style.backgroundImage = "-webkit-gradient(radial, 50% -10%, 15, 50% -10%, 110, from(#868686), to(#2a2a2a))";
	}
	return;
}

/********************************************************************/
/* Function: scanFocusEnter											*/
/* Description: 搜索框内Enter键处理									*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-26								*/
/********************************************************************/
function scanFocusEnter() {
	if (scanFocusIndex == 3) {
		if (scanFocusIsLeft) {
			var freq = document.getElementById("scanParam0").innerText;
			var qam = qamParam[qamParamIndex].split('QAM')[0];
			var rate = document.getElementById("scanParam2").innerText;
			dvbc.scanStream(freq, qamParamIndex, rate);
			document.getElementById("scanTipsProcess").style.visibility = "visible";
			freshChannelList();
			playChannel(0);
			hiddScanFrame();
			//stopKeyControl = true;
		} else {
			hiddScanFrame();
		}
	}
	return;
}
///////////////////////////////// 频道搜索相关操作 结束 ////////////////////////////////////////////////

/////////////////////////////////// 频道列表操作 /////////////////////////////////////////////////////

/********************************************************************/
/* Function: freshChannelList										*/
/* Description: 刷新频道列表内容										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-22								*/
/********************************************************************/
function freshChannelList() {
	var pageNum = parseInt(dvbc.channelTotal/channelListPageNum);
	var pageCurr = parseInt(channelListIndex/channelListPageNum);
	var numL,textL;
	for (var i=0; i<channelListPageNum; i++) {
		var num = pageCurr*channelListPageNum+i;
		if (num >= dvbc.channelTotal) {
			numL = '';
			textL = '';
		} else {
			numL = num + 1;
			var lcn_l = dvbc.getLcnByIndex(num);
			var name_l = dvbc.getChannelName(lcn_l, 1);
			textL = name_l;//channelName[num];
		}
		document.getElementById("listNum"+i).innerHTML = numL;
		document.getElementById("listText"+i).innerHTML = textL;
	}
	pageUpOrDownIcon();
	return;
}

/********************************************************************/
/* Function: showChannelList										*/
/* Description: 显示频道列表											*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-22								*/
/********************************************************************/
function showChannelList() {
	if (isChannelListShow) {
		return;
	}
	document.getElementById("channelListDiv").style.left = "0px";
	isChannelListShow = true;
	return;
}

/********************************************************************/
/* Function: hiddChannelList										*/
/* Description: 隐藏频道列表											*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-22								*/
/********************************************************************/
function hiddChannelList() {
	if (isChannelListShow) {
		document.getElementById("channelListDiv").style.left = "-400px";
		isChannelListShow = false;
	}
	return;
}

/********************************************************************/
/* Function: moveListFocus											*/
/* Description: 频道列表中焦点移动										*/
/* Parameters: type is 0:上移，1:下移									*/
/* Author&Date: zhaopengjun 2011-09-22								*/
/********************************************************************/
function moveListFocus(type) {
	if (type == 0) {
		channelListIndex--;
		channelListIndex = channelListIndex < 0 ? 0 : channelListIndex;
		if (channelListIndex%channelListPageNum == (channelListPageNum-1)) {
			freshChannelList();
		}
	} else {
		channelListIndex++;
		channelListIndex = channelListIndex > (dvbc.channelTotal-1) ? (dvbc.channelTotal-1) : channelListIndex;
		if (channelListIndex%channelListPageNum == 0) {
			freshChannelList();
		}
	}
	document.getElementById("listFocus").style.top = channelListIndex%channelListPageNum*39+"px";
	return;
}

/********************************************************************/
/* Function: pageUpOrDownIcon										*/
/* Description: 翻页提示颜色切换										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-22								*/
/********************************************************************/
function pageUpOrDownIcon() {
	var pageNum = parseInt(dvbc.channelTotal/channelListPageNum);
	var pageCurr = parseInt(channelListIndex/channelListPageNum);
	if (pageCurr == 0) {
		document.getElementById("pageUpIcon").style.borderBottomColor = "#646464";
	} else {
		document.getElementById("pageUpIcon").style.borderBottomColor = "#f0f0f0";
	}
	if (pageCurr == pageNum) {
		document.getElementById("pageDownIcon").style.borderTopColor = "#646464";
	} else {
		document.getElementById("pageDownIcon").style.borderTopColor = "#f0f0f0";
	}
	document.getElementById("pageNumText").innerHTML = (pageCurr+1)+"/"+(pageNum+1);
	return;
}

/********************************************************************/
/* Function: channelListEnter										*/
/* Description: 列表中按Enter键										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-27								*/
/********************************************************************/
function channelListEnter() {
	var lcn = dvbc.getLcnByIndex(channelListIndex);
	dvbc.playStream(lcn);
	dvbc.currentIndex = channelListIndex;
	return;
}

/////////////////////////////////// 频道列表操作 结束 /////////////////////////////////////////////////////

/********************************************************************/
/* Function: channelPrevious										*/
/* Description: 播放上一频道											*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-27								*/
/********************************************************************/
function channelPrevious() {
	dvbc.playPrevious();
}

/********************************************************************/
/* Function: channelNext											*/
/* Description: 播放下一频道											*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-27								*/
/********************************************************************/
function channelNext() {
	dvbc.playNext();
}

/********************************************************************/
/* Function: playChannel											*/
/* Description: 播放频道												*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-12-12								*/
/********************************************************************/
function playChannel(channelListIndex) {
	dvbc.playStream(channelListIndex);
	getChannelInfo();
	return;
}

/********************************************************************/
/* Function: getChannelInfo											*/
/* Description: 刷新当前频道信息										*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-12-13								*/
/********************************************************************/
function getChannelInfo() {
	dvbc.currentLcn = dvbc.getLcnByIndex(dvbc.currentIndex);
	dvbc.currentName = dvbc.getChannelName(dvbc.currentLcn, 1);
	dvbc.currentFreq = dvbc.getCurrentFreq(dvbc.currentLcn);
	var info = [dvbc.currentLcn, dvbc.currentIndex, dvbc.currentName, dvbc.currentFreq];
	for (var i=0; i<4; i++) {
		document.getElementById("channelInfoRight").getElementsByTagName("li").item(i).innerHTML = info[i];
	}
	return;
}

/********************************************************************/
/* Function: showInfo												*/
/* Description: 显示相关信息											*/
/* Parameters: 														*/
/* Author&Date: zhaopengjun 2011-09-27								*/
/********************************************************************/
function showInfo() {
	if (showOrHiddInfo) {
		showOrHiddInfo = false;
		document.getElementById("channelInfoDiv").style.left = "-548px";
	} else {
		getChannelInfo();
		showOrHiddInfo = true;
		document.getElementById("channelInfoDiv").style.left = "0px";
	}
}







