// JavaScript Document
/*********************************************************************/
/* Function: keyEvent			                                     */
/* Description: 按键处理				   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-19                              */
/*********************************************************************/
document.onkeydown = keyEvent;
function keyEvent(e) {
	if (keyboardStatus) {
		if (e.which == 406 && renameBoxStatus) {
			keyboardBack();
			showRenameBox();
		} else {
			keyBoardEvent(e);
		}
		return false;
	} else if (seekBarStatus) {
		keySeekControl(e);
		return false;
	}
	var keyValue = e.which;
	player.printf(1, "keyValue=========================="+keyValue);
	switch (keyValue) {
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
			return false;
			break;
		case 213:	//back
			keyBack();
			return false;
			break;
		case 33:	//page+
			keyPageDown();
			break;
		case 34:	//page-
			keyPageUp();
			break;
		case 1073741880:	//vol+
			if (fullScreen) {
				keyVolUp();
			}
			break;
		case 1073741884:	//vol-
			if (fullScreen) {
				keyVolDown();
			}
			break;
		case 1073741879:	//mute
			if (fullScreen) {
				keyMute();
			}
			break;
		case 1073741882:	//audio
			if (fullScreen) {
				keyAudio();
			}
			break;
		case 460:	//track(subtitle)
			if (fullScreen) {
				keySubtitle();
			}
			break;
		case 403:	//red
			keyRed();
			break;
		case 404:	//green
			keyGreen();
			break;
		case 405:	//yellow
			keyYellow();
			break;
		case 406:	//blue
			keyBlue();
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
			keyMenu();
			break;
		case 1073742359:	//MEDIA_TOLEFT
			keyPlay();
			break;
		case 1073742360:	//play to end
			if (seekBarStatus) {
				keyGOTO();
			}
			if (fullScreen) {
				keySTOP();
			} else {
				stopPlayFile();
			}
			hiddPlayIconFun();
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
			showOrHiddSeekBar();
			showPlayIconFun();
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
/* Function: keyMenu		                                         */
/* Description: menu键处理				                             */
/* Parameters:                                			             */
/* Author&Date: zhaopengjun  2011-03-15                              */
/*********************************************************************/
function keyMenu() {
	if(delTipsShowStatus || renameBoxStatus){
		return;
	} else if (fullScreen) {
		if (volShowStatus) {
			window.clearTimeout(timer_vol);
			hiddenVolBar();
		} else if (showPlayIconStatus) {
			window.clearTimeout(timer_hiddPlayIcon);
			hiddPlayIconFun();
		}
		setTimeout("showPageFull();",500);
	} else if (!fullScreen) {
		window.clearTimeout(timer_showPvrBg);
		if (menuStatus == 0) {
			window.clearTimeout(timer_showTime);
			document.getElementById("pvrBg").style.opacity = "0.0";
			document.getElementById("pvrMain").style.opacity = "0.0";
			//fullScreen = true;
		} else if (menuStatus == 1) {
			timer_showPvrBg = window.setTimeout("showPvrBg()",600);
			//fullScreen = false;
		}
	}
	moveMenu();
	return;
}

/*********************************************************************/
/* Function: showPvrBg		                                         */
/* Description: 显示PVR列表				                             */
/* Parameters:                                			             */
/* Author&Date: zhaopengjun  2011-01-28                              */
/*********************************************************************/
var timer_showPvrBg;
function showPvrBg() {
	document.getElementById("pvrBg").style.opacity = '0.9';
	document.getElementById("pvrMain").style.opacity = '1.0';
	document.getElementById("playFullScreen").style.opacity = "0";
	showCurrentTime('pageTimeShow');
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
	timer_showTime = window.setTimeout("showCurrentTime('pageTimeShow');", 60000);
	return;
}

/*********************************************************************/
/* Function: keyLeft			                                     */
/* Description: LEFT按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-19                              */
/*********************************************************************/
var firstFocusStatus = true;	//记录列表类型的焦点状态，true说明焦点在类型列表中，false说明焦点在文件列表中
function keyLeft() {
	if (firstFocusStatus) {
		firstListLeftMove();
	} else if (delTipsShowStatus) {
		delLeftMove();
	} else if (renameBoxStatus) {
		renameBoxLeft();
	}
	return;
}

/*********************************************************************/
/* Function: keyUp				                                     */
/* Description: UP按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-19                              */
/*********************************************************************/
function keyUp() {
	if (firstFocusStatus || delTipsShowStatus) {
		return;
	} else if (renameBoxStatus) {
		renameBoxUp();
	} else {
		if (fileListNum == 0) {
			changeFocusFun('up');
			return;
		} else if (fileListNum%pageShowNum == 0) {
			showFileInfo(fileListNum-1);
		}
		showListFocusTop('up');
	}
	return;
}

/*********************************************************************/
/* Function: keyRight			                                     */
/* Description: RIGHT按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-19                              */
/*********************************************************************/
function keyRight() {
	if (firstFocusStatus) {
		firstListRightMove();
	} else if (delTipsShowStatus) {
		delRightMove();
	} else if (renameBoxStatus) {
		renameBoxRight();
	}
	return;
}

/*********************************************************************/
/* Function: keyDown			                                     */
/* Description: DOWN按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-19                              */
/*********************************************************************/
function keyDown() {
	if (delTipsShowStatus) {
		return;
	} else if (renameBoxStatus) {
		renameBoxDown();
		return;
	}
	if (firstFocusStatus) {
		changeFocusFun('down');
	} else {
		if ((mainFocus == 0 && fileListNum >= listTotalNum-1) || (mainFocus != 0 && fileListNum >= typeListNum-1)) {
			return;
		} else if ((fileListNum+1)%pageShowNum == 0) {
			showFileInfo(fileListNum+1);
		}
		showListFocusTop('down');
	}
	return;
}

/*********************************************************************/
/* Function: keyEnter			                                     */
/* Description: ENTER按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-19                              */
/*********************************************************************/
var iptv_play = -1;		//记录IPTV是否播放，-1为否
function keyEnter() {
	if (menuStatus == 1) {
		if (focusNum == 2) {
			if (!fullScreen) {
				timer_showPvrBg = window.setTimeout("showPvrBg()",800);
			} else {
				setTimeout("showPageFull();",500);
			}
			moveMenu();
		} else if (focusNum == 0) {
			moveMenu();
			if (iptv_play == -1) {
				stopPlayFile();
			}
			window.setTimeout("url_ip();",800);
		} else {
			var play_status = getPlayStatus();
			if (play_status == 1 || play_status == 3 || play_status == 4) {
				stopPlayFile();
			}
			keymenuEnter();
		}
		return;
	}
	if (renameTipsStatus) {
		document.getElementById("renameTips").style.opacity = "0.0";
		renameTipsStatus = false;
	} else if (delTipsShowStatus) {
		if (fileLockFlag[fileListNum] == 1) {
			showDelTips();
			return;
		}
		if (delButtonLeft) {
			document.getElementById("delTipsText").innerHTML = "File deletions, please wait...";
			document.getElementById("delLeftButt").style.opacity = "0";
			document.getElementById("delRightButt").style.opacity = "0";
		}
		setTimeout("delEnterButton();", 10);
	} else if (renameBoxStatus) {
		renameEnterButton();
	} else if (firstFocusStatus && !fullScreen) {
		changeFocusFun('down');
	} else if (!firstFocusStatus && !fullScreen) {
		window.clearTimeout(timer_showTime);
		document.getElementById("pvrBg").style.opacity = "0.0";
		document.getElementById("pvrMain").style.opacity = "0.0";
		document.getElementById("playFullScreen").style.opacity = "1";
		fullScreen = true;
//		var play_status = getPlayStatus();
//		if (play_status == 2 || play_status == 0 || play_status == 5 || play_status == 6 || iptv_play != -1) {
			if (mainFocus == 0) {
				playFile(fileListNum);
			} else {
				var file_index = getIndexById(fileSetId[fileListNum]);
				playFile(file_index);
			}
			var play_status = getPlayStatus();
			if (play_status != 1) {
				showPlayIconFun();
			}
			showOrHiddMuteIcon();
//		}
	}
	return;
}

function url_ip() {
	document.location.href = 'iptv.html?'+iptv_play;
	return;
}
/*********************************************************************/
/* Function: keyBack			                                     */
/* Description: BACK按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-19                              */
/*********************************************************************/
function keyBack() {
	if (menuStatus == 1) {
		return;
	}
	if (fullScreen) {
		showPvrBg();
		hiddPlayIconFun();
		fullScreen = false;
	} else if (delTipsShowStatus) {
		showDelTips();
	} else if (renameBoxStatus) {
		showRenameBox();
	} else if (!firstFocusStatus) {
		backToList();
	} else if (firstFocusStatus) {
		window.clearTimeout(timer_showTime);
		document.getElementById("pvrBg").style.opacity = "0.0";
		document.getElementById("pvrMain").style.opacity = "0.0";
		document.getElementById("playFullScreen").style.opacity = "1";
		fullScreen = true;
		var play_status = getPlayStatus();
		if (play_status == 2 || play_status == 6) {
			keyMenu();
		} else if (play_status != 1) {
			showPlayIconFun();
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyPageDown		                                     */
/* Description: page+按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-26                              */
/*********************************************************************/
function keyPageDown() {
	if (delTipsShowStatus || renameBoxStatus) {
		return;
	}
	if (firstFocusStatus || fullScreen) {
		return;
	} else {
		if (fileListNum == typeListNum-1) {
			return;
		}
		document.getElementById("listRow"+fileListNum%pageShowNum).style.color = "#646464";
		fileListNum = fileListNum + pageShowNum;
		if (fileListNum >= typeListNum) {
			fileListNum = typeListNum-1;
			var showFocusNum = fileListNum%pageShowNum;
			document.getElementById("fileListFocus").style.top = 0+43*showFocusNum+"px";
			timer_fontColor = window.setTimeout("showFocusFontColor();",500);
		} else {
			fileListNum = parseInt(fileListNum/pageShowNum)*8;
			document.getElementById("fileListFocus").style.top = "0px";
			timer_fontColor = window.setTimeout("showFocusFontColor();",500);
		}
		showFileInfo(fileListNum);
	}
	return;
}

/*********************************************************************/
/* Function: keyPageUp			                                     */
/* Description: page-按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-26                              */
/*********************************************************************/
function keyPageUp() {
	if (delTipsShowStatus || renameBoxStatus) {
		return;
	}
	if (firstFocusStatus || fullScreen) {
		return;
	} else {
		if (fileListNum == 0) {
			return;
		}
		document.getElementById("listRow"+fileListNum%pageShowNum).style.color = "#646464";
		fileListNum = fileListNum - pageShowNum;
		if (fileListNum < 0) {
			fileListNum = 0;
			var showFocusNum = fileListNum%pageShowNum;
			document.getElementById("fileListFocus").style.top = 0+43*showFocusNum+"px";
			timer_fontColor = window.setTimeout("showFocusFontColor();",500);
		} else {
			fileListNum = parseInt(fileListNum/pageShowNum)*8;
			document.getElementById("fileListFocus").style.top = "0px";
			timer_fontColor = window.setTimeout("showFocusFontColor();",500);
		}
		showFileInfo(fileListNum);
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
	var play_status = getPlayStatus();
	if (play_status != 1) {
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
	var play_status = getPlayStatus();
	if (play_status != 1) {
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
	var play_status = getPlayStatus();
	if (play_status != 1) {
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
	var play_status = getPlayStatus();
	if (play_status != 1) {
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
	var play_status = getPlayStatus();
	if (play_status != 1) {
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
/* Function: keyRed				                                     */
/* Description: Red按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-21                              */
/*********************************************************************/
function keyRed() {
	if (firstFocusStatus || fullScreen || renameBoxStatus || delTipsShowStatus) {
		return;
	} else {
		if (fileLockFlag[fileListNum] == 1) {
			var ret = setFileMetadata(fileSetId[fileListNum],"lock","0");
			fileLockFlag[fileListNum] = ret == 0 ? 0 : 1;
		} else {
			var ret = setFileMetadata(fileSetId[fileListNum],"lock","1");
			fileLockFlag[fileListNum] = ret == 0 ? 1 : 0;
		}
		showOrHiddLockSign(fileLockFlag[fileListNum],fileListNum);
	}
	return;
}

/*********************************************************************/
/* Function: keyGreen			                                     */
/* Description: Green按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-21                              */
/*********************************************************************/
function keyGreen() {
	if (firstFocusStatus || fullScreen || renameBoxStatus) {
		return;
	} else {
		showDelTips();
	}
	return;
}

/*********************************************************************/
/* Function: keyYellow			                                     */
/* Description: Yellow按键处理										 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-21                              */
/*********************************************************************/
function keyYellow() {
	if (firstFocusStatus || fullScreen || renameBoxStatus || delTipsShowStatus) {
		return;
	} else {
		if (fileFavFlag[fileListNum] == 1) {
			var ret = setFileMetadata(fileSetId[fileListNum],"favorite","0");
			fileFavFlag[fileListNum] = ret == 0 ? 0 : 1;
		} else {
			var ret = setFileMetadata(fileSetId[fileListNum],"favorite","1");
			fileFavFlag[fileListNum] = ret == 0 ? 1 : 0;
		}
		showOrHiddFavSign(fileFavFlag[fileListNum],fileListNum);
	}
	return;
}

/*********************************************************************/
/* Function: keyBlue			                                     */
/* Description: Blue按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-21                              */
/*********************************************************************/
function keyBlue() {
	if (firstFocusStatus || fullScreen || delTipsShowStatus) {
		return;
	} else {
		showRenameBox();
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
	if (fullScreen) {
		var play_status = getPlayStatus();
		if (play_status == 1 || play_status == 4) {
			trickLevel = 0;
			pausePlayFile();
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
//return 0 is open, 1 is play, 2 is stop, 3 is pause, 4 is trickplay, 5 is end, 6 is close, 7 is to begin
function keyPlay() {
	if (renameBoxStatus || delTipsShowStatus) {
		return;
	}
	if (fullScreen) {
		var play_status = getPlayStatus();
		if (play_status == 3 || play_status == 4) {
			trickLevel = 0;
			resumePlayFile();
		} else if (play_status == 2 || play_status == 0 || play_status == 5 || play_status == 6 || play_status == 7) {
			if (mainFocus == 0) {
				playFile(fileListNum);
			} else {
				var file_index = getIndexById(fileSetId[fileListNum]);
				playFile(file_index);
			}
		}
		showPlayIconFun();
	} else {
		if (!firstFocusStatus) {
			window.clearTimeout(timer_showTime);
			document.getElementById("pvrBg").style.opacity = "0.0";
			document.getElementById("pvrMain").style.opacity = "0.0";
			document.getElementById("playFullScreen").style.opacity = "1";
			fullScreen = true;
			var file_index = getIndexById(fileSetId[fileListNum]);
			playFile(file_index);
			var play_status = getPlayStatus();
			if (play_status != 1) {
				showPlayIconFun();
			}
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
	if (fullScreen) {
		trickLevel = 0;
		stopPlayFile();
		showPlayIconFun();
	}
	return;
}

/*********************************************************************/
/* Function: keyFFWD			                                     */
/* Description: FFWD按键处理			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
var trickArray = new Array(2,4,8,16,32);	//快进快退的倍数
var trickLevel = 0;		//快进快退的索引
function keyFFWD() {
	if (fullScreen) {
		var trick_num = getSpeedStatus();
		if (trick_num < 0) {
			trickLevel = 0;
		}
		trickPlayFile(trickArray[trickLevel]);
		trickLevel = trickLevel >= 4 ? 0 : (trickLevel+1);
		showPlayIconFun();
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
	if (fullScreen) {
		var trick_num = getSpeedStatus();
		if (trick_num > 0) {
			trickLevel = 0;
		}
		trickPlayFile(-trickArray[trickLevel]);
		trickLevel = trickLevel >= 4 ? 0 : (trickLevel+1);
		showPlayIconFun();
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
	if (fullScreen) {
		var play_status = getPlayStatus();
		if (play_status == 1 || play_status == 3) {
			showOrHiddSeekBar();
			if (play_status == 1) {
				showPlayIconFun();
			}
		}
	}
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
	} else if (menuStatus == 1) {
		keyMenu();
	}
	var play_status = getPlayStatus();
	if (play_status == 1) {
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

//////////////////////////////////////////key end/////////////////////////////////////////////////
/*********************************************************************/
/* Function: showPageFull                                            */
/* Description: 主菜单自动隐藏时，显示页面	                             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-02-11                              */
/*********************************************************************/
function showPageFull() {
	if (!fullScreen) {
		showPvrBg();
	} else {
		if (!showPlayIconStatus && menuStatus == 0) {
			var play_status = getPlayStatus();
			if (play_status == 3 || play_status == 4) {
				showPlayIconFun();
			}
		}
	}
	return;
}

/*********************************************************************/
/* Function: firstListLeftMove	                                     */
/* Description: 主列表左移焦点		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-19                              */
/*********************************************************************/
var mainFocus = 0;		//主列表焦点位置
var timer_freshList;	//刷新列表定时器
function firstListLeftMove() {
	if (mainFocus == 0) {
		return;
	} else {
		fileListNum = 0;
		typeListNum = 0;
		window.clearTimeout(timer_freshList);
		mainFocus--;
		document.getElementById("listTypeFocus").style.left = 1+272*mainFocus+"px";
		document.getElementById("listTypeFocusMove").style.left = 1+272*mainFocus+"px";
		timer_freshList = window.setTimeout("freshFileList();", 500);
	}
	mainButtonStyle();
	return;
}

/*********************************************************************/
/* Function: firstListRightMove	                                     */
/* Description: 主列表右移焦点		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-19                              */
/*********************************************************************/
function firstListRightMove() {
	if (mainFocus == 2) {
		return;
	} else {
		fileListNum = 0;
		typeListNum = 0;
		window.clearTimeout(timer_freshList);
		mainFocus++;
		document.getElementById("listTypeFocus").style.left = 1+272*mainFocus+"px";
		document.getElementById("listTypeFocusMove").style.left = 1+272*mainFocus+"px";
		timer_freshList = window.setTimeout("freshFileList();", 500);
	}
	mainButtonStyle();
	return;
}

/*********************************************************************/
/* Function: mainButtonStyle	                                     */
/* Description: 主列表左右提示		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-21                              */
/*********************************************************************/
function mainButtonStyle() {
	if (mainFocus == 0) {
		document.getElementById("leftButton").style.opacity = "0";
		document.getElementById("RightButton").style.opacity = "1";
	} else if (mainFocus == 1) {
		document.getElementById("leftButton").style.opacity = "1";
		document.getElementById("RightButton").style.opacity = "1";
	} else {
		document.getElementById("leftButton").style.opacity = "1";
		document.getElementById("RightButton").style.opacity = "0";
	}
	return;
}

/*********************************************************************/
/* Function: freshFileList		                                     */
/* Description: 刷新文件列表信息		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-21                              */
/*********************************************************************/
function freshFileList() {
	typeListNum = 0;
	if (mainFocus == 0) {
		getFileList();
	} else if (mainFocus == 1) {
		getFileListType("favorite");
	} else {
		getFileListType("lock");
	}
	return;
}

/*********************************************************************/
/* Function: changeFocusFun		                                     */
/* Description: 两个焦点的切换		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-20                              */
/*********************************************************************/
function changeFocusFun(change) {
	if (change == 'up') {
		window.clearTimeout(timer_fontColor);
		firstFocusStatus = true;
		document.getElementById("listTypeFocusMove").style.opacity = "0.0";
		document.getElementById("listTypeFocus").style.opacity = "1.0";
		document.getElementById("fileListFocus").style.top = "-40px";
		document.getElementById("listRow"+fileListNum%pageShowNum).style.color = "#646464";
		//document.getElementById("pageTipsInfo").style.opacity = "0";
	} else {
		if (mainFocus == 0 && listTotalNum == 0) {
			return;
		} else if (mainFocus == 1 && typeListNum == 0) {
			return;
		} else if (mainFocus == 2 && typeListNum == 0) {
			return;
		}
		firstFocusStatus = false;
		fileListNum = pageCurrent*pageShowNum;
		document.getElementById("listTypeFocus").style.opacity = "0.0";
		document.getElementById("listTypeFocusMove").style.opacity = "1.0";
		document.getElementById("fileListFocus").style.webkitTransitionDuration = "0s";
		document.getElementById("fileListFocus").style.top = "-40px";
		document.getElementById("fileListFocus").style.opacity = "1.0";
		//document.getElementById("pageTipsInfo").style.opacity = "1";
		window.setTimeout("showSecFocus();", 10);
		timer_fontColor = window.setTimeout("showFocusFontColor();", 500);
	}
	return;
}

/*********************************************************************/
/* Function: showSecFocus		                                     */
/* Description: 显示列表焦点			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-28                              */
/*********************************************************************/
function showSecFocus() {
	document.getElementById("fileListFocus").style.webkitTransitionDuration = "0.4s";
	document.getElementById("fileListFocus").style.top = "0px";
	
	return;
}

/*********************************************************************/
/* Function: showListFocusTop	                                     */
/* Description: 列表焦点移动操作		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-20                              */
/*********************************************************************/
var timer_fontColor;		//show focus font color timer
function showListFocusTop(key) {
	window.clearTimeout(timer_fontColor);
	document.getElementById("listRow"+fileListNum%pageShowNum).style.color = "#646464";
	if (key == 'up') {
		fileListNum--;
	} else {
		fileListNum++;
	}
	var showFocusNum = fileListNum%pageShowNum;
	document.getElementById("fileListFocus").style.top = 0+43*showFocusNum+"px";
	timer_fontColor = window.setTimeout("showFocusFontColor();", 500);
}

/*********************************************************************/
/* Function: showFocusFontColor	                                     */
/* Description: 改变列表焦点文字颜色	   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-20                              */
/*********************************************************************/
function showFocusFontColor() {
	document.getElementById("listRow"+fileListNum%pageShowNum).style.color = "#ffffff";
	return;
}

/*********************************************************************/
/* Function: showPageSign		                                     */
/* Description: 显示上下翻页图标状态	   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-21                              */
/*********************************************************************/
function showPageSign(current,total) {
	document.getElementById("pageNumText").innerHTML = "Page "+(current+1)+"/"+(total+1);
	var upPageColor = current == 0 ? "#585858" : "#ffffff";
	var downPageColor = current < total ? "#ffffff" : "#585858";
	document.getElementById("pageButtonUp").style.borderBottomColor = upPageColor;
	document.getElementById("pageButtonDown").style.borderTopColor = downPageColor;
	return;
}

/*********************************************************************/
/* Function: showOrHiddLockSign	                                     */
/* Description: 显示或隐藏加锁标记		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-21                              */
/*********************************************************************/
function showOrHiddLockSign(flag,num) {
	var lockSta = flag == 1 ? "visible" : "hidden";
	document.getElementById("lockFlag"+num%pageShowNum).style.visibility = lockSta;
	return;
}

/*********************************************************************/
/* Function: showOrHiddFavSign	                                     */
/* Description: 显示或隐藏喜好标记		   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-21                              */
/*********************************************************************/
function showOrHiddFavSign(flag,num) {
	var favSta = flag == 1 ? "visible" : "hidden";
	document.getElementById("favFlag"+num%pageShowNum).style.visibility = favSta;
	return;
}

/*********************************************************************/
/* Function: showDelTips		                                     */
/* Description: 显示或隐藏删除提示信息									 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-24                              */
/*********************************************************************/
var delTipsShowStatus = false;	//删除提示的显示状态
var delButtonLeft = true;		//是否为删除提示的“确定”位置
function showDelTips() {
	var lockFileDel = fileLockFlag[fileListNum] == 1 ? "delLockTips" : "delTips";
	if (lockFileDel == "delTips") {
		document.getElementById("delTipsText").innerHTML = "Are you sure delete it ?";
		document.getElementById("delLeftButt").style.opacity = "1";
		document.getElementById("delRightButt").style.opacity = "1";
	}
	if (!delTipsShowStatus) {
		var delPosition = fileListNum%pageShowNum;
		if (delPosition<4) {
			document.getElementById(lockFileDel).style.top = 54+delPosition*43+"px";
		} else {
			document.getElementById(lockFileDel).style.top = 46+delPosition*43-104+"px";
		}
		delTipsShowStatus = true;
		document.getElementById(lockFileDel).style.opacity = "1";
	} else {
		delTipsShowStatus = false;
		document.getElementById(lockFileDel).style.opacity = "0";
		setTimeout("delLeftMove();", 100);
	}
	return;
}

/*********************************************************************/
/* Function: delRightMove		                                     */
/* Description: 删除提示中，右键处理	   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-24                              */
/*********************************************************************/
function delRightMove() {
	if (fileLockFlag[fileListNum] == 1) {
		return;
	}
	if (delButtonLeft) {
		delButtonLeft = false;
		document.getElementById("delLeftButt").style.borderColor = "#5b5b5b";
		document.getElementById("delLeftButt").style.backgroundImage = "-webkit-gradient(radial, 50% -20%, 20, 50% -20%, 80, from(#707070), to(#222222))";
		document.getElementById("delRightButt").style.borderColor = "#0b4d9e";
		document.getElementById("delRightButt").style.backgroundImage = "-webkit-gradient(radial, 50% -20%, 20, 50% -20%, 80, from(#066ced), to(#001745))";
	}
	return;
}

/*********************************************************************/
/* Function: delLeftMove		                                     */
/* Description: 删除提示中，左键处理	   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-24                              */
/*********************************************************************/
function delLeftMove() {
	if (fileLockFlag[fileListNum] == 1) {
		return;
	}
	if (!delButtonLeft) {
		delButtonLeft = true;
		document.getElementById("delLeftButt").style.borderColor = "#0b4d9e";
		document.getElementById("delLeftButt").style.backgroundImage = "-webkit-gradient(radial, 50% -20%, 20, 50% -20%, 80, from(#066ced), to(#001745))";
		document.getElementById("delRightButt").style.borderColor = "#5b5b5b";
		document.getElementById("delRightButt").style.backgroundImage = "-webkit-gradient(radial, 50% -20%, 20, 50% -20%, 80, from(#707070), to(#222222))";
	}
	return;
}

/*********************************************************************/
/* Function: delEnterButton		                                     */
/* Description: 删除提示中，确定键处理	   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-24                              */
/*********************************************************************/
function delEnterButton() {
	/*if (fileLockFlag[fileListNum] == 1) {
		showDelTips();
		return;
	}
	if (delButtonLeft) {
		document.getElementById("delTipsText").innerHTML = "File deletions, please wait...";
	}*/
	showDelTips();
	if (delButtonLeft) {
		if (mainFocus == 0) {
			deleteFile(fileListNum);
		} else {
			var file_index = getIndexById(fileSetId[fileListNum]);
			player.printf(1, "file_index=========================="+file_index);
			deleteFile(file_index);
		}
		listTotalNum = getFileTotal();
		freshFileList();
	}
	return;
}

/*********************************************************************/
/* Function: showRenameBox		                                     */
/* Description: 重命名提示显示或隐藏	   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-24                              */
/*********************************************************************/
var renameBoxStatus = false;		//重命名提示状态
var renameFocusRow = 0;			//重命名提示中，记录焦点上下位置
var renameButtonLeft = true;	//重命名提示中，左焦点位置
var renameTipsStatus = false;	//重命名提示状态
function showRenameBox() {
	if (!renameBoxStatus) {
		var delPosition = fileListNum%pageShowNum;
		if (delPosition<4) {
			document.getElementById("renameFileBox").style.top = 54+delPosition*43+"px";
			document.getElementById("renameTips").style.top = 54+delPosition*43+"px";
		} else {
			document.getElementById("renameFileBox").style.top = 46+delPosition*43-104+"px";
			document.getElementById("renameTips").style.top = 46+delPosition*43-104+"px";
		}
		document.getElementById("renameText").innerHTML = fileNameValue[fileListNum];
		renameBoxStatus = true;
		if (renameFocusRow == 0) {
			renameEnterButton();
		} else {
			renameBoxUp();
		}
		document.getElementById("renameFileBox").style.opacity = "1";
	} else {
		renameBoxStatus = false;
		document.getElementById("renameFileBox").style.opacity = "0";
	}
	return;
}

/*********************************************************************/
/* Function: renameBoxUp		                                     */
/* Description: 重命名提示中UP键处理	   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-24                              */
/*********************************************************************/
function renameBoxUp() {
	if (renameFocusRow == 0) {
		return;
	} else {
		renameFocusRow = 0;
		document.getElementById("renameText").style.borderColor = "#0363db";
		var renameButtId = renameButtonLeft ? "renameLeftButt" : "renameRightButt";
		document.getElementById(renameButtId).style.borderColor = "#5b5b5b";
		document.getElementById(renameButtId).style.backgroundImage = "-webkit-gradient(radial, 50% -20%, 20, 50% -20%, 80, from(#707070), to(#222222))";
		renameEnterButton();
	}
	return;
}

/*********************************************************************/
/* Function: renameBoxDown		                                     */
/* Description: 重命名提示中DOWN键处理	   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-24                              */
/*********************************************************************/
function renameBoxDown() {
	if (renameFocusRow == 1) {
		return;
	} else {
		renameFocusRow = 1;
		renameButtonLeft = true;
		document.getElementById("renameText").style.borderColor = "#222222";
		document.getElementById("renameLeftButt").style.borderColor = "#0b4d9e";
		document.getElementById("renameLeftButt").style.backgroundImage = "-webkit-gradient(radial, 50% -20%, 20, 50% -20%, 80, from(#066ced), to(#001745))";
	}
	return;
}

/*********************************************************************/
/* Function: renameBoxRight		                                     */
/* Description: 重命名提示中，右键处理	   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-24                              */
/*********************************************************************/
function renameBoxRight() {
	if (renameButtonLeft && renameFocusRow == 1) {
		renameButtonLeft = false;
		document.getElementById("renameLeftButt").style.borderColor = "#5b5b5b";
		document.getElementById("renameLeftButt").style.backgroundImage = "-webkit-gradient(radial, 50% -20%, 20, 50% -20%, 80, from(#707070), to(#222222))";
		document.getElementById("renameRightButt").style.borderColor = "#0b4d9e";
		document.getElementById("renameRightButt").style.backgroundImage = "-webkit-gradient(radial, 50% -20%, 20, 50% -20%, 80, from(#066ced), to(#001745))";
	}
	return;
}

/*********************************************************************/
/* Function: renameBoxLeft		                                     */
/* Description: 重命名提示中，右键处理	   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-24                              */
/*********************************************************************/
function renameBoxLeft() {
	if (!renameButtonLeft && renameFocusRow == 1) {
		renameButtonLeft = true;
		document.getElementById("renameLeftButt").style.borderColor = "#0b4d9e";
		document.getElementById("renameLeftButt").style.backgroundImage = "-webkit-gradient(radial, 50% -20%, 20, 50% -20%, 80, from(#066ced), to(#001745))";
		document.getElementById("renameRightButt").style.borderColor = "#5b5b5b";
		document.getElementById("renameRightButt").style.backgroundImage = "-webkit-gradient(radial, 50% -20%, 20, 50% -20%, 80, from(#707070), to(#222222))";
	}
	return;
}

/*********************************************************************/
/* Function: renameEnterButton	                                     */
/* Description: 重命名提示中，确定键处理   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-24                              */
/*********************************************************************/
function renameEnterButton() {
	if (renameFocusRow == 0) {
		keyboardInput = "renameText";
		document.getElementById("renameText").style.textAlign = "right";
		showKeyboard(20);
	} else {
		if (renameButtonLeft) {
			var renameValue = document.getElementById("renameText").innerHTML;
			var name = renameCheck(renameValue);
			//player.printf(1, "pvr rename===========name==============="+name);
			if (name == true) {
				var ret = setFileMetadata(fileSetId[fileListNum],"file_name",renameValue);
				fileNameValue[fileListNum] = ret == 0 ? renameValue : fileNameValue[fileListNum];
				document.getElementById("fileName"+fileListNum%pageShowNum).innerHTML = fileNameValue[fileListNum];
			} else {
				document.getElementById("renameTips").style.opacity = "1.0";
				renameTipsStatus = true;
			}
		}
		showRenameBox();
	}
	return;
}

/*********************************************************************/
/* Function: showKeyboardBackFun                                     */
/* Description: 重命名提示中，关闭小键盘后的处理							 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-03-15                              */
/*********************************************************************/
function showKeyboardBackFun() {
	document.getElementById("renameText").style.textAlign = "left";
	renameBoxDown();
	return;
}

/*********************************************************************/
/* Function: renameCheck		                                     */
/* Description: 重命名提示中，检查文件名								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-03-21                              */
/*********************************************************************/
function renameCheck(name) {
	var renameEle;
	if (name == "") {
		document.getElementById("renameTipsText").innerHTML = "Filename can't for empty !";
		return false;
	} else {
		for (var i=0; i<listTotalNum; i++) {
			renameEle = getFileInfo(i).split("@");
			var file_name_value = getFileMetadata(fileSetId[i],"file_name");
			file_name_value = file_name_value < 0 ? renameEle[0] : file_name_value;
			if (file_name_value == name) {
				document.getElementById("renameTipsText").innerHTML = "Filename repeat !";
				return false;
			} else if (name.indexOf(".") != -1 || name.indexOf(":") != -1 || name.indexOf("/") != -1){
				document.getElementById("renameTipsText").innerHTML = "Filename cannot contain . : /";
				return false;
			}
		}
		return true;
	}
}

/*********************************************************************/
/* Function: backToList			                                     */
/* Description: 从列表中返回到类型选项   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-28                              */
/*********************************************************************/
function backToList() {
		window.clearTimeout(timer_fontColor);
		firstFocusStatus = true;
		document.getElementById("listTypeFocusMove").style.opacity = "0.0";
		document.getElementById("listTypeFocus").style.opacity = "1.0";
		document.getElementById("fileListFocus").style.opacity = "0.0";
		document.getElementById("listRow"+fileListNum%pageShowNum).style.color = "#646464";
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
function showPlayIconFun() {
	if (volShowStatus) {
		window.clearTimeout(timer_vol);
		hiddenVolBar();
	} else if (menuStatus == 1) {
		keyMenu();
	}
	window.clearTimeout(timer_hiddPlayIcon);
	var play_status = getPlayStatus();
	if (play_status == 2) {
		showPvrBg();
		fullScreen = false;
		hiddPlayIconFun();
		return;
	}
	if (play_status == 4) {
		var trick_num = getSpeedStatus();
		if (trick_num < 0) {
			document.getElementById("playStatusIcon").style.backgroundImage = "url("+eval("playIconBack"+(-trick_num)+".src")+")";
		} else {
			document.getElementById("playStatusIcon").style.backgroundImage = "url("+eval("playIconSpeed"+trick_num+".src")+")";
		}
	} else if (play_status != 5) {
		document.getElementById("playStatusIcon").style.backgroundImage = "url("+eval("playIcon"+play_status+".src")+")";
	}
	if (showPlayIconStatus && !seekBarStatus) {
		if (displayStatus) {
			document.getElementById("playStatusIcon").style.top = "222px";
		}
		if (play_status == 1) {
			timer_hiddPlayIcon = window.setTimeout("hiddPlayIconFun();", 2000);
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
	showPlayIconStatus = false;
	displayStatus = false;
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
	var playCurrentTime = getCurrentTime();
	var playTotalTime = getTotalTime();
	var showTime = getTimeFormat(playCurrentTime)+" / "+getTimeFormat(playTotalTime);
	document.getElementById("playTimeShow").innerHTML = showTime;
	//document.getElementById("totalTimeShow").innerHTML = " / "+getTimeFormat(playTotalTime);
	//document.getElementById("currentTimeValue").innerHTML = getTimeFormat(playCurrentTime);
	//document.getElementById("totalTimeValue").innerHTML = getTimeFormat(playTotalTime);
	document.getElementById("playJinduBar").style.width = (playCurrentTime/playTotalTime)*608+"px";
	document.getElementById("seekBar").style.left = (playCurrentTime/playTotalTime)*608-58+"px";
	timer_play = window.setTimeout("showPlayTime();", 500);
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
		var playCurrentTime = getCurrentTime();
		var valueA = getTimeFormat(playCurrentTime).split(":");
		var value = valueA[0]+valueA[1]+valueA[2];
		for (var i=0; i<6; i++) {
			document.getElementById("seekText"+i).innerHTML = value.substring(i,(i+1));
		}
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
var seekValueArray = new Array('20px','32px','48px','60px','76px','88px');
function seekKeyNum(num) {
	var seekV = num-48;
	if ((seekInputIndex == 2 || seekInputIndex == 4) && seekV >= 6) {
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
		seekT = getCurrentTime();
	}
	seekPlayFile(seekT);
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
		var play_status = getPlayStatus();
		if (play_status == 1) {
			window.clearTimeout(timer_hiddPlayIcon);
			hiddPlayIconFun();
		} else {
			return;
		}
	} else if (menuStatus == 1) {
		keyMenu();
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

/*********************************************************************/
/* Function: init				                                     */
/* Description: 初始化				   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-20                              */
/*********************************************************************/
var fullScreen = false;		//full screen play file
var fileListNum = 0;	//list index
var listTotalNum = 0;		//list total
var timer_showTime;		//timer of show time
var player = new AVPlayer();
function init() {
	var returnHref = document.location.href.split("?");
	if (returnHref.length == 2) {
		iptv_play = returnHref[1];
	}
	focusNum= 2;
	//var leftPxSettings = "1003:1222:-92:127:346:565:784"-311, -92, 127, 346, 565, 784, 1003, 1222, 1441
	var leftPxSettings = "1222:1441:-311:-92:127:346:565:784:1003";
	divLeftArray = focusNum+"?"+leftPxSettings;
	htmlHref = fontListArray[0] + "?" + divLeftArray;  	 
	menuinit(); 
	
	listTotalNum = getFileTotal();
	player.printf(1, "listTotalNum=========================="+listTotalNum);
	getFileList();
	showCurrentTime('pageTimeShow');
	loadImagePvr();
	return;
}

/*********************************************************************/
/* Function: loadImagePvr		                                     */
/* Description: 载入图片				   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
var playIcon1 = new Image();
var playIcon2 = new Image();
var playIcon3 = new Image();
var playIconSpeed2 = new Image();
var playIconSpeed4 = new Image();
var playIconSpeed8 = new Image();
var playIconSpeed16 = new Image();
var playIconSpeed32 = new Image();
var playIconBack2 = new Image();
var playIconBack4 = new Image();
var playIconBack8 = new Image();
var playIconBack16 = new Image();
var playIconBack32 = new Image();
function loadImagePvr() {
	playIcon1.src = "image/play.png";
	playIcon2.src = "image/stop.png";
	playIcon3.src = "image/pause.png";
	playIconSpeed2.src = "image/forward2.png";
	playIconSpeed4.src = "image/forward4.png";
	playIconSpeed8.src = "image/forward8.png";
	playIconSpeed16.src = "image/forward16.png";
	playIconSpeed32.src = "image/forward32.png";
	playIconBack2.src = "image/backward2.png";
	playIconBack4.src = "image/backward4.png";
	playIconBack8.src = "image/backward8.png";
	playIconBack16.src = "image/backward16.png";
	playIconBack32.src = "image/backward32.png";
	return;
}

/*********************************************************************/
/* Function: getFileList		                                     */
/* Description: 获得文件列表			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-20                              */
/*********************************************************************/
var fileInfo = new Array();
var fileNameValue = new Array();
var fileLengthValue = new Array();
var fileSizeValue = new Array();
var fileDateValue = new Array();
var fileTimeValue = new Array();
var fileFavFlag = new Array();
var fileLockFlag = new Array();
var fileSetId = new Array();
var pltv_delete = false;
function getFileList() {
	for (var i=0; i<listTotalNum; i++) {
		fileInfo[i] = getFileInfo(i).split("@");
		player.printf(1, "fileInfo====="+i+"====================="+fileInfo[i]);
		if (fileInfo[i][0] == "PLTV") {
			deleteFile(i);
			pltv_delete = true;
			break;
		}
		//fileNameValue[i] = fileInfo[i][0];
		fileLengthValue[i] = fileInfo[i][5];
		fileSizeValue[i] = fileInfo[i][6];
		fileDateValue[i] = fileInfo[i][4].substr(0,10).replace(/\:/g,"/");
		fileTimeValue[i] = fileInfo[i][4].substr(10,8);
		fileSetId[i] = fileInfo[i][7];
		var file_name_value = getFileMetadata(fileSetId[i],"file_name");
		fileNameValue[i] = file_name_value < 0 ? fileInfo[i][0] : file_name_value;
		fileLockFlag[i] = getFileMetadata(fileSetId[i],"lock");
		fileFavFlag[i] = getFileMetadata(fileSetId[i],"favorite");
	}
	if (pltv_delete) {
		pltv_delete = false;
		listTotalNum = getFileTotal();
		getFileList();
		return;
	}
	typeListNum = listTotalNum;
	if (!firstFocusStatus && fileListNum >= typeListNum) {
		showListFocusTop('up');
	}
	showFileInfo(fileListNum);
	return;
}

/*********************************************************************/
/* Function: getFileListFav		                                     */
/* Description: 获得喜好文件			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-21                              */
/*********************************************************************/
var typeListNum = 0;		//当前类型文件的总个数
function getFileListType(fileType) {
	for (var i=0; i<listTotalNum; i++) {
		fileInfo[i] = getFileInfo(i).split("@");
		var ret = getFileMetadata(fileInfo[i][7],fileType);
		if (ret == 1) {
			//fileNameValue[typeListNum] = fileInfo[i][0];
			fileLengthValue[typeListNum] = fileInfo[i][5];
			fileSizeValue[typeListNum] = fileInfo[i][6];
			fileDateValue[typeListNum] = fileInfo[i][4].substr(0,10).replace(/\:/g,"/");
			fileTimeValue[typeListNum] = fileInfo[i][4].substr(10,8);
			fileSetId[typeListNum] = fileInfo[i][7];
			var file_name_value = getFileMetadata(fileSetId[typeListNum],"file_name");
			fileNameValue[typeListNum] = file_name_value < 0 ? fileInfo[i][0] : file_name_value;
			fileLockFlag[typeListNum] = getFileMetadata(fileSetId[typeListNum],"lock");
			fileFavFlag[typeListNum] = getFileMetadata(fileSetId[typeListNum],"favorite");
			typeListNum++;
		}
	}
	if (!firstFocusStatus && fileListNum >= typeListNum) {
		showListFocusTop('up');
	}
	showFileInfo(fileListNum);
	return;
}

/*********************************************************************/
/* Function: showFileInfo		                                     */
/* Description: 显示文件列表			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-20                              */
/*********************************************************************/
var pageShowNum = 8;	//每页最多显示文件数
var pageTotal= 0;
var pageCurrent = 0;
function showFileInfo(showStartNum) {
	//计算当前页号和总页数
	pageTotal = parseInt((typeListNum-1)/pageShowNum);
	pageCurrent = parseInt(showStartNum/pageShowNum);
	var forNum;
	if (pageCurrent < pageTotal) {
		document.getElementById("fileListTotal").style.height = "341px";
		forNum = pageShowNum;
	} else {
		var num = typeListNum-pageCurrent*pageShowNum;
		document.getElementById("fileListTotal").style.height = num*43+"px";
		forNum = num;
	}
	for (var i=0; i<forNum; i++) {
		var valueNum = i+pageCurrent*pageShowNum;
		document.getElementById("fileName"+i).innerHTML = fileNameValue[valueNum];
		document.getElementById("fileLength"+i).innerHTML = fileLengthValue[valueNum];
		document.getElementById("fileSize"+i).innerHTML = changeDataUnitExt(fileSizeValue[valueNum]);
		document.getElementById("fileDate"+i).innerHTML = fileDateValue[valueNum];
		document.getElementById("fileTime"+i).innerHTML = fileTimeValue[valueNum];
		showOrHiddLockSign(fileLockFlag[valueNum],valueNum);
		showOrHiddFavSign(fileFavFlag[valueNum],valueNum);
	}
	showPageSign(pageCurrent, pageTotal);
	return;
}













////////////////////////////////////////相关接口函数////////////////////////////////////////////////////
/*********************************************************************/
/* Function: getFileTotal		                                     */
/* Description: 获得文件总数			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-20                              */
/*********************************************************************/
function getFileTotal() {
	var totalNum = player.Ag_playBack_rangeFile(0, 0);
	return totalNum;
}

/*********************************************************************/
/* Function: getFileInfo		                                     */
/* Description: 获得文件信息			   								 */
/* Parameters:	num is file index							         */
/* Author&Date: zhaopengjun  2011-01-20                              */
/*********************************************************************/
function getFileInfo(num) {
	var information = player.Ag_playBack_getFileInfo(num);
	return information;
}

/*********************************************************************/
/* Function: setFileMetadata	                                     */
/* Description: 设置文件属性，0 is succeed,-1 is failed				 */
/* Parameters:	id is global id, key is name				         */
/* Author&Date: zhaopengjun  2011-01-21                              */
/*********************************************************************/
function setFileMetadata(id,key,value) {
	var ret = player.Ag_record_setMetaData(id, key, value);
	return ret;
}

/*********************************************************************/
/* Function: getFileMetadata	                                     */
/* Description: 获得文件属性，-1 is  invalid id, -2 is invalid key	 */
/* Parameters:	id is global id, key is name				         */
/* Author&Date: zhaopengjun  2011-01-21                              */
/*********************************************************************/
function getFileMetadata(id,key) {
	var ret = player.Ag_record_getMetaData(id, key);
	return ret;
}

/*********************************************************************/
/* Function: deleteFile			                                     */
/* Description: 删除文件				   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-24                              */
/*********************************************************************/
function deleteFile(num) {
//return 0 is success; -1 is index out of range, -2 is failure.
	var ret = player.Ag_playBack_deleteFile(num);
	player.printf(1, "========deleteFile==============="+ret);
	return;
}

/*********************************************************************/
/* Function: getIndexById		                                     */
/* Description: 用ID得INDEX			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-27                              */
/*********************************************************************/
function getIndexById(index_num) {
	var ret = player.Ag_playBack_getIndexByID(index_num);
	return ret;
}

/*********************************************************************/
/* Function: playFile			                                     */
/* Description: 播放文件				   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-27                              */
/*********************************************************************/
function playFile(num) {
	var ret = player.Ag_playBack_play(num);
	iptv_play = -1;
	return;
}

/*********************************************************************/
/* Function: stopPlayFile		                                     */
/* Description: 停止播放				   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
function stopPlayFile() {
	var ret = player.Ag_playBack_stop();
	return;
}

/*********************************************************************/
/* Function: pausePlayFile		                                     */
/* Description: 暂停播放				   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
function pausePlayFile() {
	var ret = player.Ag_playBack_pause();
	return;
}

/*********************************************************************/
/* Function: trickPlayFile		                                     */
/* Description: 快进快退				   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
function trickPlayFile(level) {
	var ret = player.Ag_playBack_trick(level);
	return;
}

/*********************************************************************/
/* Function: slowPlayFile		                                     */
/* Description: 慢放					   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
function slowPlayFile(level) {
	var ret = player.Ag_playBack_slow(level);
	return;
}

/*********************************************************************/
/* Function: seekPlayFile		                                     */
/* Description: seek play			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
function seekPlayFile(num) {
	var ret = player.Ag_playBack_seek(num);
	return;
}

/*********************************************************************/
/* Function: resumePlayFile		                                     */
/* Description: resume file			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
function resumePlayFile() {
	var ret = player.Ag_playBack_resume();
	return;
}

/*********************************************************************/
/* Function: getPlayStatus		                                     */
/* Description: 获得播放状态			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
//return 0 is open, 1 is play, 2 is stop, 3 is pause, 4 is trickplay, 5 is end, 6 is close, 7 is to begin
function getPlayStatus() {
	var ret = player.Ag_playBack_getStatus();
		player.printf(1, "========Ag_playBack_getStatus==============="+ret);
	return ret;
}

/*********************************************************************/
/* Function: getSpeedStatus		                                     */
/* Description: 获得Speed状态			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
// return -102/-32/-16/-8/-4/-2/-1/1/2/4/8/16/32/102.
function getSpeedStatus() {
	var ret = player.Ag_playBack_getSpeed();
	return ret;
}

/*********************************************************************/
/* Function: getCurrentTime		                                     */
/* Description: 获得当前时间			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
// return -1 if failed
function getCurrentTime() {
	var ret = player.Ag_playBack_getCurrentTime();
	return ret;
}

/*********************************************************************/
/* Function: getTotalTime		                                     */
/* Description: 获得总时间			   								 */
/* Parameters:												         */
/* Author&Date: zhaopengjun  2011-01-30                              */
/*********************************************************************/
// return -1 if failed
function getTotalTime() {
	var ret = player.Ag_playBack_getTotalTime();
	return ret;
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
/* Function: changeDataUnitExt                                       */
/* Description: 将字节(B)自动转换为TB, GB, MB, KB, B；带一位小数     */
/* Parameters: parameter 输入的数值                                  */
/* Author&Date: lixudong  2009-11-12                                 */
/*********************************************************************/
function changeDataUnitExt(parameter)
{
	var unit = 1000;
	var tempValue = parseFloat(parameter);
	tempValue = (isNaN(tempValue))? 0 : tempValue;
	if (tempValue>=unit*unit*unit*unit) {
		tempValue = parseInt(tempValue/unit/unit/unit/unit*10)/10+'TB';
	}
	else if (tempValue>=unit*unit*unit) {
		tempValue = parseInt(tempValue/unit/unit/unit*10)/10+'GB';
	}
	else if (tempValue>=unit*unit) {
		tempValue = parseInt(tempValue/unit/unit*10)/10+'MB';
	}
	else if (tempValue>=unit) {
		tempValue = parseInt(tempValue/unit*10)/10+'KB';
	}
	else {
		tempValue = parseInt(tempValue)+'B';
	}
	return (tempValue);
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














