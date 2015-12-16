// JavaScript Document
var player = new AVPlayer();
/*********************************************************************/
/* Function: keyEvent			                                     */
/* Description: 按键处理				   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-19                              */
/*********************************************************************/
document.onkeydown = keyEvent;
function keyEvent(e) {
	if (vodTipsStatus == 1) {
		if (e.which == 13) {
			closeVodTips();
		}
		return false;
	} else if (seekBarStatus) {
		keySeekControl(e);
		return false;
	}
	var keyValue = e.which;
	switch(keyValue) {
		case 37:	//left
			if (menuStatus == 1) {
				keymenuRight();
				return false;
			}
			keyLeft();
			return false;
			break;
		case 38:	//up
			if (menuStatus == 1) {
				return false;
			}
			keyUp();
			return false;
			break;
		case 39:	//right
			if (menuStatus == 1) {
				keymenuLeft();
				return false;
			}
			keyRight();
			return false;
			break;
		case 40:	//down
			if (menuStatus == 1) {
				return false;
			}
			keyDown();
			return false;
			break;
		case 13:	//enter
			keyEnter();
			break;
		case 213:	//back
			keyBack();
			return false;
			break;
		case 1073741880:	//vol+
			if (pageShowNum == 2) {
				keyVolUp();
			}
			break;
		case 1073741884:	//vol-
			if (pageShowNum == 2) {
				keyVolDown();
			}
			break;
		case 1073741879:	//mute
			if (pageShowNum == 2) {
				keyMute();
			}
			break;
		case 1073741882:	//audio
			if (pageShowNum == 2) {
				keyAudio();
			}
			break;
		case 460:	//track(subtitle)
			if (pageShowNum == 2) {
				keySubtitle();
			}
			break;
		case 415:	//play
			keyPlay();
			break;
		case 0:	//pause
			keyPause();
			break;
		case 417:	//FFWD
			keyFFWD();
			break;
		case 412:	//REW
			keyREW();
			break;
		case 413:	//STOP
			keySTOP();
			break;
		case 1073741865:	//GOTO_SEEK
			keyGOTO();
			break;
		case 1073742338:	//menu
			if (pageShowNum == 0) {
				window.clearTimeout(timer_vodMenu);
				moveMenu();
				timer_vodMenu = window.setTimeout("vodMoveMenu();",800);
			}
			break;
		case 1073742351:	//play to right
			if (pageShowNum == 2) {
				keySTOP();
			}
			hiddPlayIconFun();
			break;
		case 1073742359:	//play to left
			if (pageShowNum == 2) {
				showPlayIconFun();
			}
			break;
		case 46:	//display
			keyDisplay();
			break;
		default:
			break;
	}
	return;
}

/*********************************************************************/
/* Function: vodMoveMenu	                                         */
/* Description: menu按键处理				                             */
/* Parameters:                                			             */
/* Author&Date: zhaopengjun  2011-02-22                              */
/*********************************************************************/
var timer_vodMenu;
function vodMoveMenu() {
	if (menuStatus == 1) {
		if (firstFocusStatus) {
			document.getElementById("listTypeFocus").style.opacity = "0.0";
			document.getElementById("listTypeFocusMove").style.opacity = "1.0";
		} else {
			hiddListFocus(0);
		}
		document.getElementById("pvrFoot").style.opacity = "0";
	} else {
		if (firstFocusStatus) {
			document.getElementById("listTypeFocus").style.opacity = "1.0";
			document.getElementById("listTypeFocusMove").style.opacity = "0.0";
		} else {
			hiddListFocus(1);
		}
		document.getElementById("pvrFoot").style.opacity = "1";
	}
	return;
}

function hiddListFocus(e) {
	document.getElementById("focusGradientLeft").style.webkitTransitionDuration = "0";
	document.getElementById("focusGradientRight").style.webkitTransitionDuration = "0";
	if (e == 1) {
		document.getElementById("focusGradientLeft").style.width = "0px";
		document.getElementById("focusGradientRight").style.left = "537px";
		document.getElementById("focusGradientRight").style.width = "0px";
		document.getElementById("rightGradient").style.background = "-webkit-gradient(linear, right top, left top, from(rgba(0, 0, 0, 0.6)), color-stop(0.8, rgba(0, 0, 0, 0.6)), to(rgba(0, 0, 0, 0)))";
		document.getElementById("leftGradient").style.background = "-webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.6)), color-stop(0.8, rgba(0, 0, 0, 0.6)), to(rgba(0, 0, 0, 0)))";
	} else {
		document.getElementById("focusGradientLeft").style.width = "104px";
		document.getElementById("focusGradientRight").style.left = "433px";
		document.getElementById("focusGradientRight").style.width = "104px";
		document.getElementById("rightGradient").style.background = "-webkit-gradient(linear, right top, left top, from(rgba(0, 0, 0, 0.6)), color-stop(1, rgba(0, 0, 0, 0.6)), to(rgba(0, 0, 0, 0)))";
		document.getElementById("leftGradient").style.background = "-webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.6)), color-stop(1, rgba(0, 0, 0, 0.6)), to(rgba(0, 0, 0, 0)))";
	}
	document.getElementById("movieTitle").style.opacity = e;
	document.getElementById("buttonMovieLeft").style.opacity = e;
	document.getElementById("buttonMovieRight").style.opacity = e;
	window.setTimeout("document.getElementById('focusGradientLeft').style.webkitTransitionDuration = '0.6';",100);
	window.setTimeout("document.getElementById('focusGradientRight').style.webkitTransitionDuration = '0.6';",100);
	return;
}

/*********************************************************************/
/* Function: keySeekControl	                                         */
/* Description: SEEK按键处理				                             */
/* Parameters:                                			             */
/* Author&Date: zhaopengjun  2011-01-31                              */
/*********************************************************************/
function keySeekControl(e) {
	var keyValue = e.which;
	switch(keyValue) {
		case 13:
			seekKeyEnter();
			//hiddPlayIconFun();
			break;
		case 37:
			seekKeyLeft();
			break;
		case 38:
			break;
		case 39:
			seekKeyRight();
			break;
		case 40:
			break;
		case 213:
		case 1073741865:
			showOrHiddSeekBar();
			showPlayIconFun();
			return false;
			break;
		case 413:	//stop
			showOrHiddSeekBar();
			keySTOP();
			break;
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
			seekKeyNum(keyValue);
			break;
		default:
			break;
	}
	return;
}

/*********************************************************************/
/* Function: keyLeft			                                     */
/* Description: LEFT按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-17                              */
/*********************************************************************/
var firstFocusStatus = true;	//记录列表类型的焦点状态，true说明焦点在类型列表中，false说明焦点在文件列表中
function keyLeft() {
	if (firstFocusStatus) {
		firstListLeftMove();
	} else if (!firstFocusStatus && pageShowNum == 0) {
		movieListLeft();
	} else if (pageShowNum == 1) {
		keyLeftInfo();
	}
	return;
}

/*********************************************************************/
/* Function: keyRight			                                     */
/* Description: Right按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-17                              */
/*********************************************************************/
function keyRight() {
	if (firstFocusStatus) {
		firstListRightMove();
	} else if (!firstFocusStatus && pageShowNum == 0) {
		movieListRight();
	} else if (pageShowNum == 1) {
		keyRightInfo();
	}
	return;
}

/*********************************************************************/
/* Function: keyUp				                                     */
/* Description: up按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-17                              */
/*********************************************************************/
function keyUp() {
	if (!firstFocusStatus && pageShowNum == 0) {
		changeFocusFun('up');
	}
	return;
}

/*********************************************************************/
/* Function: keyDown			                                     */
/* Description: down按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-17                              */
/*********************************************************************/
function keyDown() {
	if (firstFocusStatus && pageShowNum == 0) {
		changeFocusFun('down');
	}
	return;
}

/*********************************************************************/
/* Function: keyEnter			                                     */
/* Description: enter按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-21                              */
/*********************************************************************/
var pageShowNum = 0;	//记录当前显示的页面，0 是影片列表，1 是付费页面，2 是播放页面（即全屏）
function keyEnter() {
	if (menuStatus == 1) {
		if (focusNum == 7) {
			window.clearTimeout(timer_vodMenu);
			moveMenu();
			timer_vodMenu = window.setTimeout("vodMoveMenu()",800);
		} else {
			keymenuEnter();
		}
		return;
	}
	if (firstFocusStatus && pageShowNum == 0) {
		changeFocusFun('down');
	} else if (!firstFocusStatus && pageShowNum == 0) {
		showMovieInfoPage();
	} else if (pageShowNum == 1) {
		keyEnterInfo();
	}
	return;
}

/*********************************************************************/
/* Function: keyBack			                                     */
/* Description: back按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-21                              */
/*********************************************************************/
function keyBack() {
	if (pageShowNum == 1) {
		keyBackInfo();
	} else if (pageShowNum == 2) {
		keyBackPlay();
	} else if (pageShowNum == 0 && !firstFocusStatus) {
		changeFocusFun('up');
	} else if (pageShowNum == 0 && firstFocusStatus) {
		if (menuStatus == 0) {
			window.clearTimeout(timer_vodMenu);
			moveMenu();
			timer_vodMenu = window.setTimeout("vodMoveMenu();",800);
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyPause			                                     */
/* Description: Pause按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
function keyPause() {
	if (pageShowNum == 2) {
		var play_status = getStatus();
		if (play_status == 1 || play_status == 3 || play_status == 4 || play_status == 5 || play_status == 9) {
			trickLevel = 0;
			vodPause();
			showPlayIconFun();
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyPlay			                                     */
/* Description: Play按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
//(0 is close, 1 is play, 2 is pause, 3 is play, 4 is fast forward, 5 is rewind, 8 is stop, 9 is to_left, 10 is to_right, 11 is error)
function keyPlay() {
	if (pageShowNum == 2) {
		var play_status = getStatus();
		if (play_status == 4 || play_status == 5 || play_status == 2) {
			trickLevel = 0;
			vodResume();
			showPlayIconFun();
		} else if (play_status == 0 || play_status == 8 || play_status == 10) {
			var playVodNum = playList.length;
			var playIndex = playList[movieListNum%playVodNum];
			vodPlay(playIndex,1);
			showPlayIconFun();
		}
	}
	return;
}

/*********************************************************************/
/* Function: keySTOP			                                     */
/* Description: Stop按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
function keySTOP() {
	if (pageShowNum == 2) {
		trickLevel = 0;
		showPlayIconFun();
		keyBackPlay();
	}
	return;
}

/*********************************************************************/
/* Function: keyFFWD			                                     */
/* Description: FFWD按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
var trickArray = new Array(2,4,8,16);	//快进快退的倍数
var trickLevel = 0;		//快进快退的索引
function keyFFWD() {
	if (pageShowNum == 2) {
		var play_status = getStatus();
		if (play_status != 4) {
			trickLevel = 0;
		}
		vodFast(trickArray[trickLevel]);
		showPlayIconFun();
		trickLevel = trickLevel >= 3 ? 0 : (trickLevel+1);
	}
	return;
}

/*********************************************************************/
/* Function: keyREW				                                     */
/* Description: REW按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
function keyREW() {
	if (pageShowNum == 2) {
		var play_status = getStatus();
		if (play_status != 5) {
			trickLevel = 0;
		}
		vodFast(-trickArray[trickLevel]);
		showPlayIconFun();
		trickLevel = trickLevel >= 3 ? 0 : (trickLevel+1);
	}
	return;
}

/*********************************************************************/
/* Function: keyGOTO			                                     */
/* Description: GOTO按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
var seekBarStatus = false;		//SEEK条的显示状态
function keyGOTO() {
	if (pageShowNum == 2) {
		var play_status = getStatus();
		if (play_status == 1 || play_status == 3 || play_status == 9) {
			showOrHiddSeekBar();
			if (play_status == 1 || play_status == 3 || play_status == 9) {
				showPlayIconFun();
			}
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyVolUp			                                     */
/* Description: vol+按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function keyVolUp() {
	var play_status = getStatus();
	if (play_status != 1 && play_status != 3 && play_status != 9) {
		return;
	}
	var mute_status = getMuteStatus();
	if (mute_status == 1) {
		setMuteStatus(0);
		showMuteStatus(0);
		showOrHiddMuteIcon();
	}
	var currV = getVolume();
	currV += 5;
	currV = currV >= 100 ? 100 : currV;
	setVolume(currV);
	showVolumeBar(currV);
	showVolBar();
	return;
}

/*********************************************************************/
/* Function: keyVolDown			                                     */
/* Description: vol-按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function keyVolDown() {
	var play_status = getStatus();
	if (play_status != 1 && play_status != 3 && play_status != 9) {
		return;
	}
	var mute_status = getMuteStatus();
	if (mute_status == 1) {
		setMuteStatus(0);
		showMuteStatus(0);
		showOrHiddMuteIcon();
	}
	var currV = getVolume();
	currV -= 5;
	currV = currV <= 0 ? 0 : currV;
	setVolume(currV);
	showVolumeBar(currV);
	showVolBar();
	return;
}

/*********************************************************************/
/* Function: keyMute			                                     */
/* Description: mute按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function keyMute() {
	var play_status = getStatus();
	if (play_status != 1 && play_status != 3 && play_status != 9) {
		return;
	}
	var mute_status = getMuteStatus();
	mute_status = mute_status == 1 ? 0 : 1;
	setMuteStatus(mute_status);
	var currV = getVolume();
	showVolumeBar(currV);
	showVolBar();
	showMuteStatus(mute_status);
	if (mute_status == 0) {
		showOrHiddMuteIcon();
	}
	return;
}

/*********************************************************************/
/* Function: keyAudio			                                     */
/* Description: audio按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function keyAudio() {
	var play_status = getStatus();
	player.printf(1, "play_status=========================="+play_status);
	if (play_status != 1 && play_status != 3 && play_status != 9) {
		return;
	}
	var stereo = getStereo();
	stereo = stereo >= 2 ? 0 : (stereo+1);
	setStereo(stereo);
	showStereoStatus(stereo,0);
	return;
}

/*********************************************************************/
/* Function: keySubtitle		                                     */
/* Description: subtitle按键处理			   							 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function keySubtitle() {
	var play_status = getStatus();
	if (play_status != 1 && play_status != 3 && play_status != 9) {
		return;
	}
	var track_total = getTrackTotal();
	var language;
	if (track_total <= 0) {
		language = "No";
	} else {
		var curr_track = getCurrTrack();
		curr_track = curr_track >= (track_total-1) ? 0 : (curr_track+1);
		var curr_pid = getPIDByIndex(curr_track);
		setPID(curr_pid);
		language = getTrackLanguage(curr_track);
	}
	showStereoStatus(language,1);
	return;
}

/*********************************************************************/
/* Function: keyDisplay			                                     */
/* Description: display按键处理		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-03-09                              */
/*********************************************************************/
var displayStatus = false;
function keyDisplay() {
	if (volShowStatus) {
		window.clearTimeout(timer_vol);
		hiddenVolBar();
	}
	var play_status = getStatus();
	if (play_status == 1 || play_status == 3 || play_status == 9) {
		window.clearTimeout(timer_hiddPlayIcon);
		if (!showPlayIconStatus) {
			showPlayTime();
			showPlayIconStatus = true;
			displayStatus = true;
			//document.getElementById("playStatusIcon").style.top = "222px";
			document.getElementById("playStatusBar").style.top = "599px";
		} else {
			hiddPlayIconFun();
		}
	}
	return;
}






/*********************************************************************/
/* Function: firstListLeftMove	                                     */
/* Description: 主列表左移焦点		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-17                              */
/*********************************************************************/
var mainFocus = 0;		//主列表焦点位置
var timer_freshList;	//刷新列表定时器
function firstListLeftMove() {
	if (mainFocus == 0) {
		return;
	} else {
		movieListNum = 0;
		window.clearTimeout(timer_freshList);
		mainFocus--;
		document.getElementById("listTypeFocus").style.left = 1+272*mainFocus+"px";
		document.getElementById("listTypeFocusMove").style.left = 1+272*mainFocus+"px";
		timer_freshList = window.setTimeout("freshList();", 500);
	}
	mainButtonStyle();
	return;
}

/*********************************************************************/
/* Function: firstListRightMove	                                     */
/* Description: 主列表右移焦点		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-17                              */
/*********************************************************************/
function firstListRightMove() {
	if (mainFocus == 3) {
		return;
	} else {
		movieListNum = 0;
		window.clearTimeout(timer_freshList);
		mainFocus++;
		document.getElementById("listTypeFocus").style.left = 1+272*mainFocus+"px";
		document.getElementById("listTypeFocusMove").style.left = 1+272*mainFocus+"px";
		timer_freshList = window.setTimeout("freshList();", 500);
	}
	mainButtonStyle();
	return;
}

/*********************************************************************/
/* Function: mainButtonStyle	                                     */
/* Description: 主列表左右提示		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-17                              */
/*********************************************************************/
function mainButtonStyle() {
	if (mainFocus == 0) {
		document.getElementById("leftButton").style.opacity = "0";
		document.getElementById("RightButton").style.opacity = "1";
	} else if (mainFocus == 3) {
		document.getElementById("leftButton").style.opacity = "1";
		document.getElementById("RightButton").style.opacity = "0";
	} else {
		document.getElementById("leftButton").style.opacity = "1";
		document.getElementById("RightButton").style.opacity = "1";
	}
	return;
}

/*********************************************************************/
/* Function: changeFocusFun		                                     */
/* Description: 焦点上下切换			 								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-17                              */
/*********************************************************************/
function changeFocusFun(change) {
	if (change == 'up') {
		firstFocusStatus = true;
		document.getElementById("listTypeFocusMove").style.opacity = "0.0";
		document.getElementById("listTypeFocus").style.opacity = "1.0";
	} else {
		firstFocusStatus = false;
		document.getElementById("listTypeFocus").style.opacity = "0.0";
		document.getElementById("listTypeFocusMove").style.opacity = "1.0";
	}
	showMovieTitle();
	return;
}

/*********************************************************************/
/* Function: showMovieFocus		                                     */
/* Description: 焦点上下切换时，影片遮罩处理							 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-17                              */
/*********************************************************************/
function showMovieFocus() {
	window.clearTimeout(timer_showLeftRightDiv);
	if (firstFocusStatus) {
		//document.getElementById("focusGradientLeft").style.webkitTransform = "scale(1,1)";
		//document.getElementById("focusGradientRight").style.webkitTransform = "scale(1,1)";
		document.getElementById("focusGradientLeft").style.width = "104px";
		document.getElementById("focusGradientRight").style.left = "433px";
		document.getElementById("focusGradientRight").style.width = "104px";
		changeFocusLeftRightDiv();
	} else {
		//document.getElementById("focusGradientLeft").style.webkitTransform = "scale(0,1)";
		//document.getElementById("focusGradientRight").style.webkitTransform = "scale(0,1)";
		document.getElementById("focusGradientLeft").style.width = "0px";
		document.getElementById("focusGradientRight").style.left = "537px";
		document.getElementById("focusGradientRight").style.width = "0px";
		timer_showLeftRightDiv = window.setTimeout("changeFocusLeftRightDiv();",500);
	}
	return;
}

var timer_showLeftRightDiv;
function changeFocusLeftRightDiv() {
	if (firstFocusStatus) {
		document.getElementById("rightGradient").style.background = "-webkit-gradient(linear, right top, left top, from(rgba(0, 0, 0, 0.6)), color-stop(1, rgba(0, 0, 0, 0.6)), to(rgba(0, 0, 0, 0)))";
		document.getElementById("leftGradient").style.background = "-webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.6)), color-stop(1, rgba(0, 0, 0, 0.6)), to(rgba(0, 0, 0, 0)))";
	} else {
		document.getElementById("rightGradient").style.background = "-webkit-gradient(linear, right top, left top, from(rgba(0, 0, 0, 0.6)), color-stop(0.8, rgba(0, 0, 0, 0.6)), to(rgba(0, 0, 0, 0)))";
		document.getElementById("leftGradient").style.background = "-webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.6)), color-stop(0.8, rgba(0, 0, 0, 0.6)), to(rgba(0, 0, 0, 0)))";
	}
	return;
}

/*********************************************************************/
/* Function: showMovieTitle		                                     */
/* Description: 焦点上下切换时,标题和箭头的处理							 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-18                              */
/*********************************************************************/
function showMovieTitle() {
	if (firstFocusStatus) {
		document.getElementById("movieTitle").style.opacity = "0";
		document.getElementById("buttonMovieLeft").style.opacity = "0";
		document.getElementById("buttonMovieRight").style.opacity = "0";
	} else {
		showMovieSign();
		document.getElementById("movieTitle").style.opacity = "1";
		document.getElementById("buttonMovieLeft").style.opacity = "1";
		document.getElementById("buttonMovieRight").style.opacity = "1";
	}
	window.setTimeout("showMovieFocus();",100);
	return;
}

/*********************************************************************/
/* Function: showPageFull                                            */
/* Description: 主菜单自动隐藏时，显示页面	                             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-02-11                              */
/*********************************************************************/
function showPageFull() {
	vodMoveMenu();
	return;
}




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
/* Function: init				                                     */
/* Description: 页面初始化处理										 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-18                              */
/*********************************************************************/
function init() {
	focusNum= 7;
	var leftPxSettings = "127:346:565:784:1003:1222:1441:-311:-92";
	divLeftArray = focusNum+"?"+leftPxSettings;
	htmlHref = fontListArray[0] + "?" + divLeftArray;
	menuinit(); 

	movie_url = movie_img_all;
	movie_name = movie_name_all;
	movie_price = movie_price_all;
	movie_period = movie_period_all;
	movie_released = movie_released_all;
	movie_time = movie_time_all;
	movie_director = movie_director_all;
	movie_star = movie_star_all;
	movie_info = movie_info_all;
	movieListTotal = movie_url.length;
	createDiv();
	loadVodImage();
	setType(0);

	showCurrentTime("pageTimeShow");
	setInterval("showCurrentTime('pageTimeShow');", 60000);
	return;
}

/*********************************************************************/
/* Function: loadVodImage		                                     */
/* Description: 载入图片												 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-21                              */
/*********************************************************************/
var leftMovieTips = new Image();
var leftMovieTipsOff = new Image();
var rightMovieTips = new Image();
var rightMovieTipsOff = new Image();
var playIcon1 = new Image();
var playIcon2 = new Image();
var playIcon3 = new Image();
var playIconSpeed2 = new Image();
var playIconSpeed4 = new Image();
var playIconSpeed8 = new Image();
var playIconSpeed16 = new Image();
var playIconBack2 = new Image();
var playIconBack4 = new Image();
var playIconBack8 = new Image();
var playIconBack16 = new Image();
function loadVodImage() {
	leftMovieTips.src = "image/leftSign.png";
	leftMovieTipsOff.src = "image/leftSignOff.png";
	rightMovieTips.src = "image/rightSign.png";
	rightMovieTipsOff.src = "image/rightSignOff.png";
	playIcon1.src = "image/play.png";
	playIcon2.src = "image/stop.png";
	playIcon3.src = "image/pause.png";
	playIconSpeed2.src = "image/forward2.png";
	playIconSpeed4.src = "image/forward4.png";
	playIconSpeed8.src = "image/forward8.png";
	playIconSpeed16.src = "image/forward16.png";
	playIconBack2.src = "image/backward2.png";
	playIconBack4.src = "image/backward4.png";
	playIconBack8.src = "image/backward8.png";
	playIconBack16.src = "image/backward16.png";
	return;
}

/*********************************************************************/
/* Function: createDiv			                                     */
/* Description: 动态创建影片列表										 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-18                              */
/*********************************************************************/
var movieListNum = 2;	//影片列表焦点
var movieListTotal;		//影片列表总数
function createDiv() {
	movieListNum = 2;
	for (var i=0; i<movieListTotal; i++) {
		var obj = document.createElement("img");
		obj.id = "createList" + i;
		obj.style.position = "absolute";
		if (i<5) {
			obj.style.left = movie_left[i+1];
			obj.style.top = movie_top[i+1];
			obj.style.width = movie_width[i+1];
			obj.style.height = movie_height[i+1];
		} else {
			obj.style.left = movie_left[6];
			obj.style.top = movie_top[4];
			obj.style.width = movie_width[4];
			obj.style.height = movie_height[4];
		}
		//obj.takinLayerAlone = "true";
		//obj.setAttribute("takin_layer_alone","true");
		obj.src = "url("+movie_url[i]+")";
		obj.style.webkitTransitionProperty = "all";
		obj.style.webkitTransitionDuration = "0.8s";
		obj.style.webkitBoxReflect = "below 4px -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), color-stop(0.65, rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 0.5)))";
		document.getElementById("addMovieDiv").appendChild(obj);
	}
	//window.setTimeout("showMovieList();",500);
	return;
}

/*********************************************************************/
/* Function: showMovieList		                                     */
/* Description: 显示影片列表图片										 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-18                              */
/*********************************************************************/
function showMovieList() {
	for (var i=0; i<movieListTotal; i++) {
		document.getElementById("createList"+i).style.width = movie_width[i+1];
	}
	return;
}

/*********************************************************************/
/* Function: freshList			                                     */
/* Description: 刷新不同类型影片										 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-18                              */
/*********************************************************************/
function freshList() {
	document.getElementById("addMovieDiv").innerHTML = "";
	if (mainFocus == 0) {
		movie_url = movie_img_all;
		movie_name = movie_name_all;
		movie_price = movie_price_all;
		movie_period = movie_period_all;
		movie_released = movie_released_all;
		movie_time = movie_time_all;
		movie_director = movie_director_all;
		movie_star = movie_star_all;
		movie_info = movie_info_all;
	} else if (mainFocus == 1) {
		movie_url = movie_img_cartoon;
		movie_name = movie_name_cartoon;
		movie_price = movie_price_cartoon;
		movie_period = movie_period_cartoon;
		movie_released = movie_released_cartoon;
		movie_time = movie_time_cartoon;
		movie_director = movie_director_cartoon;
		movie_star = movie_star_cartoon;
		movie_info = movie_info_cartoon;
	} else if (mainFocus == 2) {
		movie_url = movie_img_comedy;
		movie_name = movie_name_comedy;
		movie_price = movie_price_comedy;
		movie_period = movie_period_comedy;
		movie_released = movie_released_comedy;
		movie_time = movie_time_comedy;
		movie_director = movie_director_comedy;
		movie_star = movie_star_comedy;
		movie_info = movie_info_comedy;
	} else if (mainFocus == 3) {
		movie_url = movie_img_action;
		movie_name = movie_name_action;
		movie_price = movie_price_action;
		movie_period = movie_period_action;
		movie_released = movie_released_action;
		movie_time = movie_time_action;
		movie_director = movie_director_action;
		movie_star = movie_star_action;
		movie_info = movie_info_action;
	}
	movieListTotal = movie_url.length;
	createDiv();
	//window.setTimeout("createDiv();",100);
	return;
}

/*********************************************************************/
/* Function: movieListLeft		                                     */
/* Description: 影片列表中左键操作										 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-18                              */
/*********************************************************************/
var movie_left = new Array("-151px","0px","151px","334px","547px","724px","875px");
var movie_top = new Array("78px","78px","59px","37px","59px","78px","78px");
var movie_width = new Array("142px","142px","168px","198px","168px","142px","142px");
var movie_height = new Array("217px","217px","255px","299px","255px","217px","217px");
function movieListLeft() {
	if (movieListNum == 0) {
		return;
	}
	var start = (movieListNum-3) < 0 ? 0 : (movieListNum-3);
	var moveNum = (movieListNum+3) > 6 ? 6 : (movieListNum+3);
	var moveNumT = movieListTotal-movieListNum >= 3 ? moveNum : (movieListTotal-movieListNum+3);
	for(var i=0; i<moveNumT; i++) {
		var num = "createList"+(i+start);
		document.getElementById(num).style.top = movie_top[i+(7-moveNum)];
		document.getElementById(num).style.left = movie_left[i+(7-moveNum)];
		document.getElementById(num).style.width = movie_width[i+(7-moveNum)];
		document.getElementById(num).style.height = movie_height[i+(7-moveNum)];
	}
	movieListNum--;
	showMovieSign();
	return;
}

/*********************************************************************/
/* Function: movieListRight		                                     */
/* Description: 影片列表中右键操作										 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-18                              */
/*********************************************************************/
function movieListRight() {
	if (movieListNum == (movieListTotal-1)) {
		return;
	}
	var start = (movieListNum-2) < 0 ? 0 : (movieListNum-2);
	var moveNum = (movieListNum+4) > 6 ? 6 : (movieListNum+4);
	var moveNumT = movieListTotal-movieListNum >= 4 ? moveNum : 2+(movieListTotal-movieListNum);
	for(var i=0; i<moveNumT; i++) {
		var num = "createList"+(i+start);
		document.getElementById(num).style.top = movie_top[i+(7-moveNum)-1];
		document.getElementById(num).style.left = movie_left[i+(7-moveNum)-1];
		document.getElementById(num).style.width = movie_width[i+(7-moveNum)-1];
		document.getElementById(num).style.height = movie_height[i+(7-moveNum)-1];
	}
	movieListNum++;
	showMovieSign();
	return;
}

/*********************************************************************/
/* Function: showMovieSign		                                     */
/* Description: 显示影片名称及左右箭头状态								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-21                              */
/*********************************************************************/
function showMovieSign() {
	document.getElementById("movieTitle").innerHTML = movie_name[movieListNum].toUpperCase();
	if (movieListNum == 0) {
		document.getElementById("buttonMovieLeft").style.backgroundImage = "url("+leftMovieTipsOff.src+")";
	} else {
		document.getElementById("buttonMovieLeft").style.backgroundImage = "url("+leftMovieTips.src+")";
	}
	if (movieListNum == (movieListTotal-1)) {
		document.getElementById("buttonMovieRight").style.backgroundImage = "url("+rightMovieTipsOff.src+")";
	} else {
		document.getElementById("buttonMovieRight").style.backgroundImage = "url("+rightMovieTips.src+")";
	}
	return;
}

/*********************************************************************/
/* Function: showMovieInfoPage	                                     */
/* Description: 显示影片相关信息										 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-21                              */
/*********************************************************************/
function showMovieInfoPage() {
	showButtonFocus();
	if (mainFocus == 0) {
		document.getElementById("movieInfoGenre").innerHTML = "Genre: "+movie_genre_all[movieListNum];
	} else {
		var genre_show;
		if (mainFocus == 1) {
			genre_show = "Cartoon";
		} else if (mainFocus == 2) {
			genre_show = "Comedy";
		} else if (mainFocus == 3) {
			genre_show = "Action";
		}
		document.getElementById("movieInfoGenre").innerHTML = "Genre: "+genre_show;
	}
	document.getElementById("movieInfoImg").style.backgroundImage = "url("+movie_url[movieListNum]+")";
	document.getElementById("movieInfoTitle").innerHTML = movie_name[movieListNum].toUpperCase();
	document.getElementById("movieInfoValue").innerHTML = "Price: "+movie_price[movieListNum];
	document.getElementById("movieInfoArea").innerHTML = "Viewing Period: "+movie_period[movieListNum];
	document.getElementById("movieInfoRelease").innerHTML = "Released in: "+movie_released[movieListNum];
	document.getElementById("movieInfoTimeLength").innerHTML = "Run Time: "+movie_time[movieListNum];
	document.getElementById("movieInfoDirector").innerHTML = "Director: "+movie_director[movieListNum];
	document.getElementById("movieInfoStar").innerHTML = "Starring: "+movie_star[movieListNum];
	document.getElementById("movieInfoText").innerHTML = movie_info[movieListNum];
	document.getElementById("vodInfoPage").style.opacity = "1";
	pageShowNum = 1;
	return;
}

/*********************************************************************/
/* Function: showButtonFocus	                                     */
/* Description: 显示按钮焦点											 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-21                              */
/*********************************************************************/
function showButtonFocus() {
	if (movieBuyStatus) {
		buttonIndex = 1;
	} else {
		buttonIndex = 0;
	}
	document.getElementById("infoButton"+buttonIndex).style.backgroundImage = "-webkit-gradient(radial, 50% -10%, 15, 50% -10%, 110, from(#056be9), to(#011f66))";
	return;
}

/*********************************************************************/
/* Function: keyLeftInfo		                                     */
/* Description: 影片信息页面左键										 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-21                              */
/*********************************************************************/
var buttonIndex = 0;	//movie info page button index
var movieBuyStatus = false;		//影片购买状态
function keyLeftInfo() {
	if (movieBuyTips) {
		buyBoxMove();
	} else {
		buttonMove();
	}
	return;
}

/*********************************************************************/
/* Function: keyRightInfo		                                     */
/* Description: 影片信息页面右键										 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-21                              */
/*********************************************************************/
function keyRightInfo() {
	if (movieBuyTips) {
		buyBoxMove();
	} else {
		buttonMove();
	}
	return;
}

/*********************************************************************/
/* Function: buyBoxMove			                                     */
/* Description: 购买确认页面左右键										 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-21                              */
/*********************************************************************/
function buyBoxMove() {
	document.getElementById("buyButton"+buyButtonIndex).style.borderColor = "#636363";
	document.getElementById("buyButton"+buyButtonIndex).style.backgroundImage = "-webkit-gradient(radial, 50% -10%, 15, 50% -10%, 110, from(#838383), to(#2a2a2a))";
	buyButtonIndex = buyButtonIndex == 0 ? 1 : 0;
	document.getElementById("buyButton"+buyButtonIndex).style.borderColor = "#1064c2";
	document.getElementById("buyButton"+buyButtonIndex).style.backgroundImage = "-webkit-gradient(radial, 50% -10%, 15, 50% -10%, 110, from(#056be9), to(#011f64))";
	return;
}

/*********************************************************************/
/* Function: buttonMove			                                     */
/* Description: 影片信息中左右键控制									 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-21                              */
/*********************************************************************/
function buttonMove() {
	document.getElementById("infoButton"+buttonIndex).style.backgroundImage = "-webkit-gradient(radial, 50% -10%, 15, 50% -10%, 110, from(#868686), to(#2a2a2a))";
	if (movieBuyStatus) {
		buttonIndex = buttonIndex == 1 ? 2 : 1;
	} else {
		buttonIndex = buttonIndex == 0 ? 2 : 0;
	}
	document.getElementById("infoButton"+buttonIndex).style.backgroundImage = "-webkit-gradient(radial, 50% -10%, 15, 50% -10%, 110, from(#056be9), to(#011f66))";
	return;
}

/*********************************************************************/
/* Function: keyEnterInfo		                                     */
/* Description: 影片信息页面确认键										 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-21                              */
/*********************************************************************/
var movieBuyTips = false;		//购买提示状态
var buyButtonIndex = 0;			//购买提示框中的焦点位置
function keyEnterInfo() {
	if (movieBuyTips) {
		document.getElementById("buyMovieTips").style.opacity = "0";
		movieBuyTips = false;
		if (buyButtonIndex == 0) {
			movieBuyStatus = true;
			document.getElementById("infoButton"+buttonIndex).style.backgroundImage = "-webkit-gradient(radial, 50% -10%, 15, 50% -10%, 110, from(#868686), to(#2a2a2a))";
			buttonIndex = 1;
			document.getElementById("infoButton"+buttonIndex).style.backgroundImage = "-webkit-gradient(radial, 50% -10%, 15, 50% -10%, 110, from(#056be9), to(#011f66))";
		}
		return;
	}
	if (buttonIndex == 0) {
		buyButtonIndex = 1;
		buyBoxMove();
		document.getElementById("buyMovieTips").style.opacity = "1";
		movieBuyTips = true;
	} else if (buttonIndex == 1) {
		hiddenAllPage();
	} else if (buttonIndex == 2) {
		keyBackInfo();
	}
	return;
}

/*********************************************************************/
/* Function: keyBackInfo		                                     */
/* Description: 影片信息页面返回键										 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-21                              */
/*********************************************************************/
function keyBackInfo() {
	if (movieBuyTips) {
		movieBuyTips = false;
		document.getElementById("buyMovieTips").style.opacity = "0";
		return;
	}
	pageShowNum = 0;
	movieBuyStatus = false;
	document.getElementById("vodInfoPage").style.opacity = "0";
	document.getElementById("infoButton"+buttonIndex).style.backgroundImage = "-webkit-gradient(radial, 50% -10%, 15, 50% -10%, 110, from(#868686), to(#2a2a2a))";
	return;	
}

/*********************************************************************/
/* Function: keyBackPlay		                                     */
/* Description: 播放页面返回信息页面									 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-21                              */
/*********************************************************************/
function keyBackPlay() {
	vodClose();
	document.getElementById("pvrMain").style.opacity = "1";
	document.getElementById("playFullScreen").style.opacity = "0";
	pageShowNum = 1;
	return;
}

/*********************************************************************/
/* Function: hiddenAllPage		                                     */
/* Description: 隐藏所有页面播放影片									 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-21                              */
/*********************************************************************/
function hiddenAllPage() {
	document.getElementById("pvrMain").style.opacity = "0";
	document.getElementById("playFullScreen").style.opacity = "1";
	pageShowNum = 2;
	var playVodNum = playList.length;
	var playIndex = playList[movieListNum%playVodNum];
	vodPlay(playIndex,1);
	showOrHiddMuteIcon();
	return;
}

////////////////////////////////////////播放控制////////////////////////////////////////////////////

/*********************************************************************/
/* Function: showPlayIconFun	                                     */
/* Description: 显示播放图标			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
var showPlayIconStatus = false;		//记录播放控制图标的状态
var timer_hiddPlayIcon;
//return 0 is open, 1 is play, 2 is stop, 3 is pause, 4 is trickplay, 5 is end, 6 is close, 7 is to begin
//(0 is close, 1 is play, 2 is pause, 3 is play, 4 is fast forward, 5 is rewind, 8 is stop, 9 is to_left, 10 is to_right, 11 is error)
function showPlayIconFun() {
	if (volShowStatus) {
		window.clearTimeout(timer_vol);
		hiddenVolBar();
	}
	window.clearTimeout(timer_hiddPlayIcon);
	var play_status = getStatus();
	if (play_status == 0) {
		keyBackPlay();
		hiddPlayIconFun();
		return;
	}
	if (play_status == 4) {
		document.getElementById("playStatusIcon").style.backgroundImage = "url("+eval("playIconSpeed"+trickArray[trickLevel]+".src")+")";
	} else if (play_status == 5) {
			document.getElementById("playStatusIcon").style.backgroundImage = "url("+eval("playIconBack"+(trickArray[trickLevel])+".src")+")";
	} else if (play_status == 2) {
		document.getElementById("playStatusIcon").style.backgroundImage = "url("+eval("playIcon"+(play_status+1)+".src")+")";
	} else if (play_status == 1 || play_status == 3 || play_status == 9) {
		document.getElementById("playStatusIcon").style.backgroundImage = "url("+playIcon1.src+")";
	} else if (play_status == 10) {
		document.getElementById("playStatusIcon").style.backgroundImage = "url("+playIcon2.src+")";
	}
	if (showPlayIconStatus && !seekBarStatus) {
		if (displayStatus) {
			document.getElementById("playStatusIcon").style.top = "222px";
		}
		if (play_status == 1 || play_status == 3 || play_status == 9) {
			timer_hiddPlayIcon = window.setTimeout("hiddPlayIconFun();", 5000);
		}
	} else {
		window.clearTimeout(timer_play);
		showPlayTime();
		showPlayIconStatus = true;
		document.getElementById("playStatusIcon").style.top = "222px";
		document.getElementById("playStatusBar").style.top = "599px";
	}
	return;
}

/*********************************************************************/
/* Function: hiddPlayIconFun	                                     */
/* Description: 隐藏播放图标			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
function hiddPlayIconFun() {
	displayStatus = false;
	showPlayIconStatus = false;
	document.getElementById("playStatusIcon").style.top = "-276px";
	document.getElementById("playStatusBar").style.top = "720px";
	window.clearTimeout(timer_play);
	return;
}

/*********************************************************************/
/* Function: showPlayTime		                                     */
/* Description: 显示播放时间			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
var timer_play;
function showPlayTime() {
	var playCurrentTime = getCurrTime();
	var playTotalTime = getTotalTime();
	var showTime = getTimeFormat(playCurrentTime)+" / "+getTimeFormat(playTotalTime);
	document.getElementById("playTimeShow").innerHTML = showTime;
	//document.getElementById("currentTimeValue").innerHTML = getTimeFormat(playCurrentTime);
	//document.getElementById("totalTimeValue").innerHTML = getTimeFormat(playTotalTime);
	document.getElementById("playJinduBar").style.width = (playCurrentTime/playTotalTime)*608+"px";
	document.getElementById("seekBar").style.left = (playCurrentTime/playTotalTime)*608-58+"px";
	timer_play = window.setTimeout("showPlayTime();", 1000);
	return;
}
////////////////////////////////////////播放控制结束////////////////////////////////////////////////////

////////////////////////////////////////SEEK操作////////////////////////////////////////////////////

/*********************************************************************/
/* Function: showOrHiddSeekBar	                                     */
/* Description: 显示或隐藏SEEK条		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-31                              */
/*********************************************************************/
function showOrHiddSeekBar() {
	if (seekBarStatus) {
		document.getElementById("seekBar").style.opacity = "0";
		seekBarStatus = false;
	} else {
		var playCurrentTime = getCurrTime();
		var valueA = getTimeFormat(playCurrentTime).split(":");
		var value = valueA[0]+valueA[1]+valueA[2];
		for (var i=0; i<6; i++) {
			document.getElementById("seekText"+i).innerHTML = value.substring(i,(i+1));
		}
		seekInputIndex = 0;
		document.getElementById("seekValueBg").style.left = seekValueArray[seekInputIndex];
		document.getElementById("seekBar").style.opacity = "1";
		seekBarStatus = true;
	}
	return;
}

/*********************************************************************/
/* Function: seekKeyLeft		                                     */
/* Description: SEEK条左键操作		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-31                              */
/*********************************************************************/
function seekKeyLeft() {
	seekInputIndex = seekInputIndex == 0 ? 5 : (seekInputIndex-1);
	document.getElementById("seekValueBg").style.left = seekValueArray[seekInputIndex];
	return;
}

/*********************************************************************/
/* Function: seekKeyRight		                                     */
/* Description: SEEK条右键操作		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-31                              */
/*********************************************************************/
function seekKeyRight() {
	seekInputIndex = seekInputIndex == 5 ? 0 : (seekInputIndex+1);
	document.getElementById("seekValueBg").style.left = seekValueArray[seekInputIndex];
	return;
}

/*********************************************************************/
/* Function: seekKeyNum			                                     */
/* Description: SEEK条数字键操作		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-31                              */
/*********************************************************************/
var seekInputIndex = 0;		//seek时间的位置
var seekValueArray = new Array('12px','26px','45px','59px','78px','92px');
function seekKeyNum(num) {
	var seekV = num-48;
	if ((seekInputIndex == 2 || seekInputIndex == 4) && seekV >= 6) {
		document.getElementById("seekText"+seekInputIndex).innerHTML = 5;
		seekKeyRight();
		return;
	}
	document.getElementById("seekText"+seekInputIndex).innerHTML = seekV;
	seekKeyRight();
	return;
}

/*********************************************************************/
/* Function: seekKeyEnter		                                     */
/* Description: SEEK条确认键操作		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-31                              */
/*********************************************************************/
var vodTipsStatus = 0;		//vod tips status, 0 is hidden, 1 is show.
function seekKeyEnter() {
	var h1 = parseInt(document.getElementById("seekText0").innerHTML);
	var h2 = parseInt(document.getElementById("seekText1").innerHTML);
	var m1 = parseInt(document.getElementById("seekText2").innerHTML);
	var m2 = parseInt(document.getElementById("seekText3").innerHTML);
	var s1 = parseInt(document.getElementById("seekText4").innerHTML);
	var s2 = parseInt(document.getElementById("seekText5").innerHTML);
	var seekT = (h1*10+h2)*3600+(m1*10+m2)*60+(s1*10+s2);
	var playTotalTime = getTotalTime();
	if (seekT >= playTotalTime) {
		//seekT = getCurrTime();
		showOrHiddSeekBar();
		hiddPlayIconFun();
		document.getElementById("vodTips").style.opacity = "1";
		vodTipsStatus = 1;
	} else {
		vodSeek(seekT);
		showOrHiddSeekBar();
		showPlayIconFun();
	}
	return;
}

/*********************************************************************/
/* Function: closeVodTips		                                     */
/* Description: 关闭提示信息			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-03-22                              */
/*********************************************************************/
function closeVodTips() {
	document.getElementById("vodTips").style.opacity = "0";
	vodTipsStatus = 0;
	return;
}
////////////////////////////////////////SEEK操作结束////////////////////////////////////////////////////

////////////////////////////////////////声音控制////////////////////////////////////////////////////

/*********************************************************************/
/* Function: showVolBar	    		                                 */
/* Description: 显示音量条			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
var volShowStatus = false;	//记录音量条的显示状态
var timer_vol;	//音量条的控制
function showVolBar() {
	if (showPlayIconStatus) {
		var play_status = getStatus();
		if (play_status == 1 || play_status == 3 || play_status == 9) {
			window.clearTimeout(timer_hiddPlayIcon);
			hiddPlayIconFun();
		} else {
			return;
		}
	}
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
	var mute_status = getMuteStatus();
	if (mute_status == 0) {
		document.getElementById("muteIconImg").style.backgroundImage = "url(image/vol0.png)";
		document.getElementById("muteIcon").style.opacity = "0";
	} else {
		document.getElementById("muteIconImg").style.backgroundImage = "url(image/vol.png)";
		document.getElementById("muteIcon").style.opacity = "1";
	}
	return;
}

/*********************************************************************/
/* Function: showVolumeBar		                                     */
/* Description: 显示音量进度条		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function showVolumeBar(volume) {
	document.getElementById("volumeBar").style.width = (volume/100)*676+"px";
	document.getElementById("volumeText").innerHTML = volume+"/100";
	return;
}

/*********************************************************************/
/* Function: showMuteStatus		                                     */
/* Description: 显示是否静音提示		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function showMuteStatus(mute) {
	if (mute == 1) {
		document.getElementById("volumeFlag").style.backgroundImage = "url(image/vol.png)";
		document.getElementById("volumeBar").style.background = "-webkit-gradient(linear, left top, left bottom, from(#c4c4c4), to(#585858))";
		//window.clearTimeout(timer_vol);
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
var stereoArray = new Array('Stereo','Left','Right');
var stereoStatus = false;
function showStereoStatus(num,type) {
	if (type == 0) {
		document.getElementById("stereoText").innerHTML = stereoArray[num];
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

////////////////////////////////////////声音控制结束////////////////////////////////////////////////////

////////////////////////////////////////相关接口函数////////////////////////////////////////////////////
/*********************************************************************/
/* Function: printMsg			                                     */
/* Description: 打印输出				   								 */
/* Parameters: msg 要打印的变量								         */
/* Author&Date: zhaopengjun  2011-02-12                              */
/*********************************************************************/
function printMsg(msg) {
	player.printf(1, "printMsg==========================" + msg + "\n");
	return;
}

/*********************************************************************/
/* Function: setProtocol		                                     */
/* Description: Set connection protocol for BitBand server.			 */
/*				By default, UDP is applied.							 */
/* Parameters: protocol: 1 is UDP, 2 is TCP					         */
/* Author&Date: zhaopengjun  2011-02-12                              */
/*********************************************************************/
function setProtocol(protocol) {
	var ret = player.Ag_vod_setProtocol(protocol);
	return;
}

/*********************************************************************/
/* Function: setType			                                     */
/* Description: Set vod server type that you will be using.			 */
/* Parameters: Type:1 is bitband, 2 is entone, 3 is sjdd,			 */
/*			   4 is base rtsp and 5 is MMS.			  			     */
/* Author&Date: zhaopengjun  2011-02-12                              */
/*********************************************************************/
function setType(type) {
	var status = player.Ag_vod_setType(type);
	return;
}

/*********************************************************************/
/* Function: getType			                                     */
/* Description: Get current vod server type.						 */
/* Parameters: 														 */
/* Author&Date: zhaopengjun  2011-02-12                              */
/*********************************************************************/
function getType() {
	var type = player.Ag_vod_getType();
	return type;
}

/*********************************************************************/
/* Function: vodPlay			                                     */
/* Description: Open and start playing a stream.					 */
/* Parameters: url of VOD opened. Support rtsp, rtspl, mms.			 */
/* 			   protect is Invalid.		                             */
/* Author&Date: zhaopengjun  2011-02-12                              */
/*********************************************************************/
function vodPlay(url,protect) {
	var ret = player.Ag_vod_play(url,1);
	return ret;
}

/*********************************************************************/
/* Function: vodClose			                                     */
/* Description: Stop playing stream and quit VOD status.			 */
/* Parameters: 														 */
/* Author&Date: zhaopengjun  2011-02-12                              */
/*********************************************************************/
function vodClose() {
	player.Ag_vod_close();
	return;
}

/*********************************************************************/
/* Function: vodPause			                                     */
/* Description: Pause the stream.									 */
/* Parameters: 														 */
/* Author&Date: zhaopengjun  2011-02-12                              */
/*********************************************************************/
function vodPause() {
	player.Ag_vod_pause();
	return;
}

/*********************************************************************/
/* Function: vodResume			                                     */
/* Description: Resume the stream currently being paused.			 */
/* Parameters: 														 */
/* Author&Date: zhaopengjun  2011-02-12                              */
/*********************************************************************/
function vodResume() {
	player.Ag_vod_resume();
	return;
}

/*********************************************************************/
/* Function: vodFast			                                     */
/* Description: Set speed of fast forward or backward.				 */
/* Parameters: 														 */
/* Author&Date: zhaopengjun  2011-02-12                              */
/*********************************************************************/
function vodFast(level) {
	player.Ag_vod_fast(level);
	return;
}

/*********************************************************************/
/* Function: vodSlow			                                     */
/* Description: Vod slow motion										 */
/* Parameters: 														 */
/* Author&Date: zhaopengjun  2011-02-12                              */
/*********************************************************************/
function vodSlow(level) {
	player.Ag_vod_slow(level);
	return;
}

/*********************************************************************/
/* Function: vodSeek			                                     */
/* Description: Seek to one time which a stream will play at.		 */
/* Parameters: 														 */
/* Author&Date: zhaopengjun  2011-02-12                              */
/*********************************************************************/
function vodSeek(time) {
	player.Ag_vod_seek(time);
	return;
}

/*********************************************************************/
/* Function: getCurrTime		                                     */
/* Description: Get the seeked time. The returned time is in seconds.*/
/* Parameters: 														 */
/* Author&Date: zhaopengjun  2011-02-12                              */
/*********************************************************************/
function getCurrTime() {
	var time = player.Ag_vod_getCurrentTime();
	return time;
}

/*********************************************************************/
/* Function: getTotalTime		                                     */
/* Description: Get total time. The returned time is in seconds.	 */
/* Parameters: 														 */
/* Author&Date: zhaopengjun  2011-02-12                              */
/*********************************************************************/
function getTotalTime() {
	var totalTime = player.Ag_vod_getTotalTime();
	return totalTime;
}

/*********************************************************************/
/* Function: getStatus			                                     */
/* Description: Get the status of VOD.								 */
/* Parameters: 														 */
/* Author&Date: zhaopengjun  2011-02-12                              */
/*********************************************************************/
//(0 is close, 1 is play, 2 is pause, 3 is play, 4 is fast forward, 5 is rewind, 8 is stop, 9 is to_left, 10 is to_right, 11 is error)
function getStatus() {
	var state = player.Ag_vod_getStatus();
	printMsg(state)
	return state;
}

/*********************************************************************/
/* Function: getMuteStatus		                                     */
/* Description: 获得静音状态			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function getMuteStatus() {
	var mute = player.Ag_audio_getMute();//0 is mute off, 1 is mute on.
	return mute;
}

/*********************************************************************/
/* Function: setMuteStatus		                                     */
/* Description: 设置静音状态			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function setMuteStatus(flag) {
	var ret = player.Ag_audio_setMute(flag);//0 is mute off,1 is mute on.
	return;
}

/*********************************************************************/
/* Function: getVolume			                                     */
/* Description: 获得当前音量			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function getVolume() {
	var volume = player.Ag_audio_getVolume();// return from 0 to 100.
	return volume;
}

/*********************************************************************/
/* Function: setVolume			                                     */
/* Description: 设置当前音量			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function setVolume(volume) {
	var ret = player.Ag_audio_setVolume(volume);
	return;
}


/*********************************************************************/
/* Function: getStereo			                                     */
/* Description: 获得当前声道			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function getStereo() {
	var type = player.Ag_audio_getStereo();//0 stereo, 1 left, 2 right, 3 mono
	return type;
}

/*********************************************************************/
/* Function: setStereo			                                     */
/* Description: 设置当前声道			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function setStereo(num) {
	var ret = player.Ag_audio_setStereo(num);
	return;
}

/*********************************************************************/
/* Function: getTrackTotal		                                     */
/* Description: 获得音轨总数			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function getTrackTotal() {
	var total = player.Ag_audio_getNoOfTrack();
	return total;
}

/*********************************************************************/
/* Function: getTrackLanguage	                                     */
/* Description: 获得音轨语言			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function getTrackLanguage(index) {
	var language = player.Ag_audio_getLanguageByIndex(index);
	return language;
}

/*********************************************************************/
/* Function: getCurrTrack		                                     */
/* Description: 获得当前音轨索引		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function getCurrTrack() {
	var currTrack = player.Ag_audio_getTrack();
	return currTrack;
}

/*********************************************************************/
/* Function: getPIDByIndex		                                     */
/* Description: 获得音轨PID			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function getPIDByIndex(index) {
	var pid = player.Ag_audio_getPIDByIndex(index);
	return pid;
}

/*********************************************************************/
/* Function: setPID				                                     */
/* Description: 设置音轨PID			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-02-09                              */
/*********************************************************************/
function setPID(num) {
	var pid = player.Ag_audio_setPID(num);
	return;
}


/*********************************************************************/
/* Function: getTimeFormat		                                     */
/* Description: 转换时间格式			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
function getTimeFormat(time) {
	var timeValue = parseInt(time);
	var time_h = parseInt(timeValue/3600);
	var time_m = parseInt(parseInt(timeValue/60)%60);
	var time_s = parseInt(timeValue%60);
	time_h = time_h > 99 ? 99 : time_h;
	time_h = time_h < 10 ? "0"+time_h : time_h;
	time_m = time_m < 10 ? "0"+time_m : time_m;
	time_s = time_s < 10 ? "0"+time_s : time_s;
	return (time_h+":"+time_m+":"+time_s);
}
