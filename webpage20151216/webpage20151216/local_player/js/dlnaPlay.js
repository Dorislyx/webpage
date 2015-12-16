// JavaScript Document
var streamStatus = 1;	//0 is stop, 1 is play, 2 is pause, 3 is FFWD, 4 is REW
var streamFastSpeed = 1; //记录快进快退的速度，1:正常播放; 2 4 8 16 32:快进速度取值; -2 -4 -8 -16 -32:快退进速度取值 
var isEndOfPlay = false;	//播放结束
var mediaType = 0;		//播放文件的类型	-1 :error; 0 :unknown; 1:image; 2:audio;3:video

///////////////////////////////////////////////////////////////////////按键处理部分开始
/*********************************************************************/
/* Function: keyEvent                                                */
/* Description: 遥控器按键处理函数 (上海白色)                        */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function keyEvent(e)
{
	var keyValue = e.which;
	switch (keyValue) {
		case 8:		//back
			//keyBack();
			break;
		case 13:	//enter
			keyEnter();
			break;
		case 37:	//left(REW)
			keyLeft();
			break;
		case 38:	//up
			break;
		case 39:	//right(FFWD)
			keyRight();
			break;
		case 40:	//down
			break;
		case 263:	//play/pause
			playerPlayPause();
			break;
		case 259:	//volume+
			volumeControl(1);
			break;
		case 260:	//volume-
			volumeControl(2);
			break;
		case 261:	//mute
			keyMute();
			break;
		case 262:	//track
			break;
		case 0xff01:	//播放到尾(buffer读完，解码器仍然解码)
			//isEndOfPlay = true;
			break;
		case 0xff02:	//播放到尾(解码器停止)
			//if (isEndOfPlay) {
				mediaType = 0;
				streamStatus = 0;
				//isEndOfPlay = false;
				showPlayerIcon();
			//}
			break;
		case 0x9973:	//DLNA_PLAY_SELECT_OK 确认DLNA播放
			break;
		case 0x9974:	//DLNA_PLAY_SELECT_CANCEL 取消DLNA播放
			break;
		case 0x9975:	//DLNA_PLAY_IDLE 空闲状态
			break;
		case 0x9976:	//DLNA_PLAY_START 播放状态 
			makeRequest('mediaType', getMediaType, 6);
			streamStatus = 1;
			showPlayerIcon();
			break;
		case 0x9977:	//DLNA_PLAY_STOP 停止状态 
			mediaType = 0;
			streamStatus = 0;
			showPlayerIcon();
			break;
		case 0x9978:	//DLNA_PLAY_PAUSE 暂停状态 
			streamStatus = 2;
			showPlayerIcon();
			break;
		case 0x9979:	//DLNA_PLAY_FAST_FORWARD 快进状态 
			streamStatus = 3;
			showPlayerIcon();
			break;
		case 0x997a:	//DLNA_PLAY_FAST_BACKWARD 快退状态
			streamStatus = 4;
			showPlayerIcon();
			break;
		default:
			break;
	}
	return;
}

/*********************************************************************/
/* Function: keyCode                                                 */
/* Description: 遥控器按键处理函数（华为黑色）                       */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function keyCode(e)
{
	var keyValue = e.which;
	iPanel.ioctlWrite('printf', 'keyValue=========dlna==========='+keyValue+'\n');
	switch (keyValue) {
		case 8:		//back
			//keyBack();
			break;
		case 13:	//enter
			keyEnter();
			break;
		case 37:	//left
			keyLeftHW();
			break;
		case 38:	//up
			break;
		case 39:	//right
			keyRightHW();
			break;
		case 40:	//down
			break;
		case 263:	//play/pause
			playerPlayPause();
			break;
		case 0x108:		//快进
			//playerForward();
			break;
		case 0x109:		//快退
			//playerBackward();
			break;
		case 261:	//mute
			keyMute();
			break;
		case 262:	//track
			break;
		case 0xff01:	//播放到尾(buffer读完，解码器仍然解码)
			//isEndOfPlay = true;
			break;
		case 0xff02:	//播放到尾(解码器停止)
			//if (isEndOfPlay) {
				mediaType = 0;
				streamStatus = 0;
				//isEndOfPlay = false;
				showPlayerIcon();
			//}
			break;
		case 0x9973:	//DLNA_PLAY_SELECT_OK 确认DLNA播放
			break;
		case 0x9974:	//DLNA_PLAY_SELECT_CANCEL 取消DLNA播放
			break;
		case 0x9975:	//DLNA_PLAY_IDLE 空闲状态
			break;
		case 0x9976:	//DLNA_PLAY_START 播放状态 
			makeRequest('mediaType', getMediaType, 6);
			streamStatus = 1;
			showPlayerIcon();
			break;
		case 0x9977:	//DLNA_PLAY_STOP 停止状态 
			mediaType = 0;
			streamStatus = 0;
			showPlayerIcon();
			break;
		case 0x9978:	//DLNA_PLAY_PAUSE 暂停状态 
			streamStatus = 2;
			showPlayerIcon();
			break;
		case 0x9979:	//DLNA_PLAY_FAST_FORWARD 快进状态 
			streamStatus = 3;
			showPlayerIcon();
			break;
		case 0x997a:	//DLNA_PLAY_FAST_BACKWARD 快退状态
			streamStatus = 4;
			showPlayerIcon();
			break;
		default:
			break;
	}
	return;
}

///////////////////////////////////////////////////////////////////////按键处理部分结束

///////////////////////////////////////////////////////////////////////初始化部分开始
/*********************************************************************/
/* Function: getMediaType                                            */
/* Description: 获得播放文件的类型			                         */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-08-05                               */
/*********************************************************************/
function getMediaType()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		mediaType = getStatus;
		if (mediaType <= 0) {
			return;
		}
		if (mediaType == 2) {
			document.getElementById('musicPlayInfo').innerHTML = dlna_MUSIC_INFO;
		} else {
			document.getElementById('musicPlayInfo').innerHTML = '';
		}
		streamStatus = 1;
		showPlayerIcon();
	}
	return;
}

/*********************************************************************/
/* Function: getConfig                                               */
/* Description: 发送'获得所有参数'的请求                             */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function getConfig()
{
	makeRequest('config?2', getSetupParameter, 1);
	return;
}

/*********************************************************************/
/* Function: getSetupParameter                                       */
/* Description: 获得保存在'设置'中的所有参数              	         */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function getSetupParameter()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==1) {
			var chinese = 'chinese';
			var english = 'english';
			var parameter = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue.split('|');
			for(var i=0; i<parameter.length; i++) {
				eval(parameter[i]);	
			}
		}
		getRTypeRequest();
	}
	return;
}

/*********************************************************************/
/* Function: getRTypeRequest                                         */
/* Description: 获得使用遥控器的类型						         */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function getRTypeRequest()
{
	makeRequest('getRType', getRTypeResponse, 1);
}

/*********************************************************************/
/* Function: getRTypeResponse                                        */
/* Description: 根据使用遥控器的类型选择函数				         */
/* Parameters:  0是上海，1是华为                                     */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function getRTypeResponse()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		var responseXMLValue = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue;
		if (responseXMLValue == 1) {
			document.onkeypress = keyCode;
		} else {
			document.onkeypress = keyEvent;
		}
		init();
	}
}

/*********************************************************************/
/* Function: init                                                    */
/* Description: 初始化页面内容及相关参数					         */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function init()
{
	dlna_LanguageSelect();
	makeRequest('volume?2', getVolumeStatus, 0);
}

/*********************************************************************/
/* Function: getVolumeStatus                                         */
/* Description: 获得音量的状态，包括音量值和静音状态                 */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function getVolumeStatus()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var tempStr = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue;
		var parameter = tempStr.split('|');
		isMuteStatus = parseInt(parameter[0]);
		volumeLevel = parseInt(parameter[1]);
		volumeLevel = (volumeLevel%5 == 0) ? volumeLevel : (5+volumeLevel-volumeLevel%5);
		showMuteStatus();
		if (mediaType <= 0) {
			makeRequest('mediaType', getMediaType, 6);
		}
	}
	return;
}

///////////////////////////////////////////////////////////////////////初始化部分结束

///////////////////////////////////////////////////////////////////////功能实现部分开始
/*********************************************************************/
/* Function: keyBack                                                 */
/* Description: keyBack 按键处理函数						         */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function keyBack()
{
	makeRequest('stop', gotoMenuPage, 6);
	return;
}

/*********************************************************************/
/* Function: gotoMenuPage                                            */
/* Description: 返回到主页面								         */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function gotoMenuPage()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		document.location.href = "menu.html";
	}
	return;
}

/*********************************************************************/
/* Function: keyEnter                                                */
/* Description: keyEnter 按键处理函数						         */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function keyEnter()
{
	if (streamStatus == 0) {	//停止状态，按键播放
		renderPlay();
	} else if (streamStatus == 2) {	//暂停时，按键SEEK播放
		if (currentTimeSeek == currentTime) {
			renderResume();
		} else {
			makeRequest('position', seekPlay, 6);
			//seekPlay();
		}
	} else if (streamStatus == 3 || streamStatus == 4) {	//快进、快退状态下，按键恢复播放
		renderResume();
	}
	return;
}

/*********************************************************************/
/* Function: keyLeft                                                 */
/* Description: keyLeft 按键处理函数						         */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-15                               */
/*********************************************************************/
function keyLeft()
{
	if (streamStatus == 2) {	//暂停状态，seek操作
		seekControl(0);
	} else if (streamStatus != 0) {
		//playerBackward();
	}
	return;
}

/*********************************************************************/
/* Function: keyRight                                                */
/* Description: keyRight 按键处理函数						         */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-15                               */
/*********************************************************************/
function keyRight()
{
	if (streamStatus == 2) {	//暂停状态，seek操作
		seekControl(1);
	} else if (streamStatus != 0) {
		//playerForward();
	}
	return;
}

/*********************************************************************/
/* Function: keyLeftHW                                               */
/* Description: keyLeftHW 按键处理函数						         */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function keyLeftHW()
{
	if (streamStatus == 1) {	//播放状态，音量减小
		volumeControl(2);
	} else if (streamStatus == 2) {	//暂停状态，seek操作
		seekControl(0);
	}
	return;
}

/*********************************************************************/
/* Function: keyRightHW                                              */
/* Description: keyRightHW 按键处理函数						         */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function keyRightHW()
{
	if (streamStatus == 1) {	//播放状态，音量增加
		volumeControl(1);
	} else if (streamStatus == 2) {	//暂停状态，seek操作
		seekControl(1);
	}
	return;
}

/*********************************************************************/
/* Function: keyRightHW                                              */
/* Description: keyRightHW 按键处理函数						         */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function keyMute()
{
	if (streamStatus == 1) {	//播放状态，音量减小
		volumeControl(3);
	}
	return;
}

/*********************************************************************/
/* Function: volumeControl                                           */
/* Description: 音量及静音操作函数							         */
/* Parameters: 1 is volume+, 2 is volume-, 3 is mute.                */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
var volumeOperate = 0; //指示音量操作类型，0:未知操作 1:音量加 2:音量减 3:静音/非静音
var isMuteStatus = 0; //记录静音状态，0:非静音，1:静音
var volumeLevel = 100; //音量值
var showVolumeBarStatus = false;		//记录音量条显示状态
function volumeControl(operate)
{
	var requestStatus;
	volumeOperate = operate;
	if (operate == 1 || operate == 2) {		//音量加减操作
		if (isMuteStatus==1) {
			requestStatus = makeRequest('volume?0', nullFun, 0);
			if (requestStatus) {
				isMuteStatus = 0;
			} else {
				return;
			}
		} else {
			var tempLevel = (volumeOperate==1)? (volumeLevel+5) : (volumeLevel-5);
			tempLevel = (tempLevel>=100)? 100 : tempLevel;
			tempLevel = (tempLevel<=0)? 0 : tempLevel;
			requestStatus = makeRequest('volume?3|'+tempLevel, nullFun, 0);
			if (requestStatus) {
				volumeLevel = tempLevel;
			} else {
				return;
			}
		}
	} else if (operate == 3) {		//静音操作
		var tempMuteStatus = (isMuteStatus==0)? 1:0;
		requestStatus = makeRequest('volume?'+tempMuteStatus, nullFun, 0);
		if (requestStatus) {
			isMuteStatus = tempMuteStatus;
		} else {
			return;
		}
	}
	showVolume();
	return;
}

/*********************************************************************/
/* Function: showVolume                                              */
/* Description: 显示音量条		                                     */
/* Parameters: 													     */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
var timerID_Volume; //定时器ID，音量条的显示控制
function showVolume()
{
	hideProcess();
	clearTimeout(timerID_Volume);
	var imgURL = '';
	if (isMuteStatus==1) {
		muteURL = 'url(image/player/mute.png)';
		volumeURL = 'url(image/player/volumeBarOff.png)';
	} else {
		muteURL = 'url(image/player/muteOff.png)';
		volumeURL = 'url(image/player/volumeBar.png)';
	}
	var len = 4.5*volumeLevel;
	len = (len<=0)? 1 : len;
	len = (len>=450)? 450 : len;
	var showStr = ''+volumeLevel+'/100';
	document.getElementById('muteStatua').style.backgroundImage = muteURL;
	document.getElementById('volumeBar').style.backgroundImage = volumeURL;
	document.getElementById('volumeBar').style.width = ''+len+'px';
	if (len==1) {
		document.getElementById('volumeBar').style.visibility = 'hidden';
	} else {
		document.getElementById('volumeBar').style.visibility = 'visible';
	}
	document.getElementById('volumeLevel').innerHTML = showStr;
	document.getElementById('divVolume').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/volumeMessage.png)';
	document.getElementById('divVolume').style.visibility = 'visible';
	showVolumeBarStatus = true;
	showMuteStatus();
	timerID_Volume = setTimeout('hideVolume()', 4000);
	return;
}

/*********************************************************************/
/* Function: hideVolume                                              */
/* Description: 隐藏音量条                                           */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function hideVolume()
{
	clearTimeout(timerID_Volume);
	document.getElementById('divVolume').style.visibility = 'hidden';
	showVolumeBarStatus = false;
	showMuteStatus();
	return;
}

/*********************************************************************/
/* Function: showMuteStatus                                          */
/* Description: 显示静音状态图标                                     */
/* Parameters: 													     */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function showMuteStatus()
{
	if (isMuteStatus == 1) {
		var showOrHidden = showVolumeBarStatus ? 'hidden' : 'visible';
		document.getElementById('showMuteDiv').style.visibility = showOrHidden;
	} else {
		document.getElementById('showMuteDiv').style.visibility = 'hidden';
	}
	return;
}

/*********************************************************************/
/* Function: playerForward                                           */
/* Description: 快进操作                                             */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
var maxSpeed = 32;	//快进、快退的最大倍数
function playerForward()
{
	if (streamStatus == 0) {	//停止状态，操作无效
		return;
	}
	var tempSpeed = (streamStatus==4 || streamFastSpeed>=maxSpeed)? 2 : streamFastSpeed*2;
	var requestStatus = makeRequest('forward?'+tempSpeed, nullFun, 6);
	if (requestStatus) {
		streamFastSpeed = tempSpeed;
		streamStatus = 3;
		showPlayerIcon();
	}
	return;
}

/*********************************************************************/
/* Function: playerBackward                                          */
/* Description: 快退操作                                             */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function playerBackward()
{
	if (streamStatus == 0) {	//停止状态，操作无效
		return;
	}
	var tempSpeed = (streamStatus==3 || streamFastSpeed>=maxSpeed)? 2 : streamFastSpeed*2;
	var requestStatus = makeRequest('rewind?'+tempSpeed, nullFun, 6);
	if (requestStatus) {
		streamFastSpeed = tempSpeed;
		streamStatus = 4;
		showPlayerIcon();
	}
	return;
}

/*********************************************************************/
/* Function: hidePlayerIcon                                          */
/* Description: 隐藏播放状态图标                                     */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
var timerID_playStatus; //定时器ID，播放状态提示信息的控制
function hidePlayerIcon()
{
	clearTimeout(timerID_playStatus);
	document.getElementById('divPlayStatus').style.visibility = 'hidden';
	return;
}

/*********************************************************************/
/* Function: playerPlayPause                                         */
/* Description: 播放/暂停操作                                        */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function playerPlayPause()
{
	if (mediaType == 1) {
		return;
	}
	if (streamStatus == 0) {
		renderPlay();
	} else if (streamStatus == 1) {
		renderPause();
	} else if (streamStatus == 2) {
		renderResume();
	}
	return;
}

/*********************************************************************/
/* Function: renderPlay		                                         */
/* Description: 播放操作		                                     */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function renderPlay()
{
	var requestStatus = makeRequest('play', nullFun, 6);
	if (requestStatus) {
		streamStatus = 1;
		streamFastSpeed = 1;
		showPlayerIcon();
	}
	return;
}

/*********************************************************************/
/* Function: renderPause	                                         */
/* Description: 暂停操作		                                     */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function renderPause()
{
	var requestStatus = makeRequest('pause', nullFun, 6);
	if (requestStatus) {
		if (showVolumeBarStatus) {
			hideVolume();
		}
		streamStatus = 2;
		streamFastSpeed = 1;
		showPlayerIcon();
	}
	return;
}

/*********************************************************************/
/* Function: renderResume	                                         */
/* Description: 恢复操作		                                     */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function renderResume()
{
	var requestStatus = makeRequest('resume', nullFun, 6);
	if (requestStatus) {
		streamStatus = 1;
		streamFastSpeed = 1;
		showPlayerIcon();
	}
	return;
}

/*********************************************************************/
/* Function: showPlayerIcon                                          */
/* Description: 显示播放状态图标                                     */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function showPlayerIcon()
{
	clearTimeout(timerID_playStatus);
	var imgURL = '';
	if (streamStatus==0) {
		imgURL = 'image/player/stop.png';
		hideProcess();
	} else if (streamStatus==1) {
		imgURL = 'image/player/play.png';
		timerID_playStatus = setTimeout('hidePlayerIcon()', 3000);
		hideProcess();
	} else if (streamStatus==2) {
		imgURL = 'image/player/pause.png';
		showProcess();
	} else if (streamStatus==3) {
		imgURL = 'image/player/forward'+streamFastSpeed+'.png';
		showProcess();
	} else if (streamStatus==4) {
		imgURL = 'image/player/backward'+streamFastSpeed+'.png';
		showProcess();
	}
	document.getElementById('playStatusIcon').src = imgURL;
	document.getElementById('divPlayStatus').style.visibility = 'visible';
	return;
}

/*********************************************************************/
/* Function: showProcess                                             */
/* Description: 显示进度条的入口函数                                 */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
var timerID_playProcess; //循环定时器ID，视频播放的进度条处理
var timerID_showProcess; //定时器ID，显示视频播放的进度条
var timerID_ProcessShow; //选时定时器
var isPlayProcessShow = false; //显示视频播放的进度条的状态
function showProcess()
{
	hideVolume();
	if (isPlayProcessShow) {
		return;
	}
	clearInterval(timerID_playProcess);
	clearTimeout(timerID_showProcess);
	isPlayProcessShow = true;
	getCurrentTimeRequest();
	document.getElementById('playProcessBg').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/playProcess.png)';
	setTimeout("document.getElementById('divPlayProcess').style.visibility = 'visible'", 100);
	if (streamStatus != 2) {
		timerID_playProcess = setInterval('getCurrentTimeRequest()', 1000);
		timerID_showProcess = setTimeout('hideProcess()', 3000);
	}
	return;
}

/*********************************************************************/
/* Function: hideProcess                                             */
/* Description: 隐藏进度条函数                                       */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function hideProcess()
{
	if (streamStatus==2 || streamStatus==3 || streamStatus==4) {
		return;
	}
	clearInterval(timerID_playProcess);
	clearTimeout(timerID_showProcess);
	isPlayProcessShow = false;
	document.getElementById('divPlayProcess').style.visibility = 'hidden';
	return;
}

/*********************************************************************/
/* Function: getCurrentTimeRequest                                   */
/* Description: 发送获得当前时间和总时间的请求                       */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function getCurrentTimeRequest()
{
	makeRequest('time', getCurrentTime, 6);
	//makeRequest('position', getCurrentTime, 6);
	return;
}

/*********************************************************************/
/* Function: getCurrentTime                                          */
/* Description: 获得视频文件的当前时间                               */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
var totalTime = 0; //视频文件的总时间
var currentTime = 0; //视频文件的当前时间
function getCurrentTime()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==-1) {
			isPlayProcessShow = false;
			return;
		}
		var parameter = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue.split('|');
		totalTime = parseInt(parameter[0]/1000, 10);
		currentTime = parseInt(parameter[1]/1000, 10);
		currentTimeSeek = currentTime;
		totalTimeSeek = totalTime;
		showProcessInfo();
	}
	return;
}

/*********************************************************************/
/* Function: showProcessInfo                                         */
/* Description: 显示进度条相关的信息，包括进度条长度、播放时间       */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-14                               */
/*********************************************************************/
function showProcessInfo()
{
	currentTime = (currentTime>totalTime)? 0 : currentTime;
	var len = (totalTime==0||currentTime==0)? 1 : parseInt(480*currentTime/totalTime);
	len = (len>480)? 480 : len;
	len = (len<1)? 1 : len;
	var hh = doubleDigit(parseInt(currentTime/3600));
	var mm = doubleDigit(parseInt((currentTime%3600)/60));
	var ss = doubleDigit(currentTime%60);
	var currentTimeStr = ''+hh+':'+mm+':'+ss;
	hh = doubleDigit(parseInt(totalTime/3600));
	mm = doubleDigit(parseInt((totalTime%3600)/60));
	ss = doubleDigit(totalTime%60);
	var totalTimeStr = ''+hh+':'+mm+':'+ss;
	var timeStr = currentTimeStr+'/'+totalTimeStr;
	document.getElementById('processBar').style.width = ''+len+'px';
	var processBarStatus = len < 1 ? 'hidden' : 'visible';
	document.getElementById('processBar').style.visibility = processBarStatus;
	document.getElementById('seekBar').style.left = -52+len;
	document.getElementById('streamTime').innerHTML = timeStr;
/*	if (isSeekInput && !isSeekInputOk) {
		var tempTime = (isSeekSelect)? currentTimeSeek : currentTime;
		showSeekBar(currentTime);
		isSeekInputOk = true;
		document.getElementById('seekTime'+seekInputPos).style.color = '#0000ff';
	}*/
	return;
}

/*********************************************************************/
/* Function: seekControl	                                         */
/* Description: seek操作										     */
/* Parameters:  0：减1/16；1：加1/16.                                */
/* Author&Date: zpjtop0904  2010-07-20                               */
/*********************************************************************/
var isSeekSelect = false; //选择SEEK的时间点（SEEK状态）
var currentTimeSeek;	//当前seek时间
var totalTimeSeek;		//总时间
function seekControl(param)
{
	isSeekSelect = true;
	var seekStep = parseInt(totalTimeSeek/16);
	if (param==0) {
		currentTimeSeek -= seekStep;
		currentTimeSeek = (currentTimeSeek<=0)? 0 : currentTimeSeek;
	} else if (param==1) {
		currentTimeSeek += seekStep;
		currentTimeSeek = (currentTimeSeek>=totalTimeSeek)? totalTimeSeek : currentTimeSeek;
	} else {
		return;
	}
	seekShow();
	return;
}

/*********************************************************************/
/* Function: seekShow                                                */
/* Description: 显示SEEK的时间点                                     */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-20                               */
/*********************************************************************/
function seekShow()
{
	var len = (totalTimeSeek==0||currentTimeSeek==0)? 1 : parseInt(480*currentTimeSeek/totalTimeSeek);
	var len = (len>480)? 480 : len;
	var len = (len<1)? 1 : len;
	var hh = doubleDigit(parseInt(currentTimeSeek/3600));
	var mm = doubleDigit(parseInt((currentTimeSeek%3600)/60));
	var ss = doubleDigit(currentTimeSeek%60);
	var currentTimeStr = ''+hh+':'+mm+':'+ss;
	hh = doubleDigit(parseInt(totalTimeSeek/3600));
	mm = doubleDigit(parseInt((totalTimeSeek%3600)/60));
	ss = doubleDigit(totalTimeSeek%60);
	var totalTimeStr = ''+hh+':'+mm+':'+ss;
	var timeStr = currentTimeStr+'/'+totalTimeStr;
	document.getElementById('processBar').style.width = ''+len+'px';
	document.getElementById('streamTime').innerHTML = timeStr;
	//播放进度背景图片
	document.getElementById('playProcessBg').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/playProcess.png)';
	document.getElementById('divPlayProcess').style.visibility = 'visible';
	return;
}

/*********************************************************************/
/* Function: seekPlay                                                */
/* Description: 从选定的时间点开始播放                               */
/* Parameters:                                                       */
/* Author&Date: zpjtop0904  2010-07-20                               */
/*********************************************************************/
function seekPlay()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==-1) {
			return;
		}
		var parameter = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue.split('|');
		var totalByte = parseInt(parameter[0], 10);
		var seekPosition = parseInt(totalByte*currentTimeSeek/totalTimeSeek,10);
		var requestStatus = makeRequest('seek?'+seekPosition, nullFun, 6);
		if (requestStatus) {
			streamStatus = 1;
			showPlayerIcon();
		}
	}
	return;
}

///////////////////////////////////////////////////////////////////////功能实现部分结束
