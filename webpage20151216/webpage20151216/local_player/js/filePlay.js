///////////////////////////////////////////////////////////////////////播控入口部分开始
/*********************************************************************/
/* Function: scanFilePlay                                            */
/* Description:  播放搜索文件                                        */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-23                                 */
/*********************************************************************/
var isScanFilePlay = false; //播放搜索文件状态
var scanFileType = 0; //播放文件的类型
var scanFileName; //播放文件的名称
var scanFileShowName;	//播放文件显示名称
var scanFileSize;	//播放文件大小
var scanFileTime;	//播放文件创建时间
var scanFileExtend;	//播放文件的类型
var isNonSupport = false; //不支持播放状态
function scanFilePlay()
{
	var pos = fileIndex%ViewTotal;
	scanFileType = fileType[pos];
	scanFileName = fileRealName[pos];
	scanFileShowName = fileShowName[pos];
	scanFileSize = fileSize[pos];
	scanFileTime = fileTime[pos];
	scanFileExtend = fileExtend[pos];

	if (scanFileType==1) { //电影文件的处理
		fileListHide();
		makeRequest('winplay?0|0|1280|720|', nullFun);
		var requestStatus = makeRequest('play?'+scanFileName, getVolumeRequest, 0);
		if (requestStatus) {
			isEnterAndBack = true;
			clearInterval(musicID_playProcess);
			clearTimeout(musicID_ProcessShow);
			isPlayProcessShow_music = false;
			streamStatus = 1;
		}
	}
	else if (scanFileType==2) { //音乐文件的处理
		fileListHide();
		var requestStatus = makeRequest('play?|'+scanFileName, musicInfoGet, 0);
		if (requestStatus) {
			isEnterAndBack = true;
			clearInterval(musicID_playProcess);
			clearTimeout(musicID_ProcessShow);
			isPlayProcessShow_music = false;
			musicPlayStatus = 1;
		}
	}
	else if (scanFileType==3) { //图片文件的处理
		fileListHide();
		photoLoadBegin();
		var requestStatus = makeRequest('showPic?0|0|1280|720|'+scanFileName+'|2|16|', photoLoadEnd, 5);
		if (requestStatus) {
			clearInterval(musicID_playProcess);
			clearTimeout(musicID_ProcessShow);
			isPlayProcessShow_music = false;
			musicPlayStatus = 1;
		}
	}
	else if (scanFileType==0) {	//文件夹的处理
		keyEnter();
	}
	else { //其它文件的处理
		isScanFilePlay = true;
		document.getElementById('messageText').innerHTML = file_OPERATE_INFO[11];
		document.getElementById('divMessage').style.visibility = 'visible';
		document.getElementById('divMessageShow').style.visibility = 'visible';
		isNonSupport = true;
	}
	return;
}

/*********************************************************************/
/* Function: fileListHide                                            */
/* Description: 隐藏文件列表                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-23                                 */
/*********************************************************************/
function fileListHide()
{
	if (scanFileType==1) { //电影文件的处理
		isScanFilePlay = true;
		document.getElementById('middleDiv').style.visibility = 'hidden';
		document.getElementById('divPlayerMovie').style.visibility = 'visible';
	}
	else if (scanFileType==2) { //音乐文件的处理
		isScanFilePlay = true;
		document.getElementById('middleDiv').style.visibility = 'hidden';
		document.getElementById('divPlayerMusic').style.visibility = 'visible';
		setTimeout("makeRequest('volume?2', musicGetVolumeStatus)", 10);
	}
	else if (scanFileType==3) { //图片文件的处理
		isScanFilePlay = true;
		document.getElementById('middleDiv').style.visibility = 'hidden';
		document.getElementById('divPlayerPhoto').style.visibility = 'visible';
	}
	document.getElementById('pageUp').style.visibility = 'hidden';
	document.getElementById('pageDown').style.visibility = 'hidden';
	return;
}

/*********************************************************************/
/* Function: fileListShow                                            */
/* Description: 显示文件列表                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-23                                 */
/*********************************************************************/
function fileListShow()
{
	if(httpRequest.readyState==4 && httpRequest.status==200) {
		isScanFilePlay = false;
		scanFileType = 0;
		document.getElementById('photoSetupInfo').style.visibility = 'hidden';
		document.getElementById('volumeBar').style.visibility = 'hidden';
		document.getElementById('divPlayerMovie').style.visibility = 'hidden';
		document.getElementById('divPlayerMusic').style.visibility = 'hidden';
		document.getElementById('divPlayerPhoto').style.visibility = 'hidden';
		document.getElementById('middleDiv').style.visibility = 'visible';
		var pageTotal = parseInt((fileTotal-1)/ViewTotal);
		var pageCurrent = parseInt(fileIndex/ViewTotal);
		var showStatus = (pageCurrent>0)? 'visible' : 'hidden';
		document.getElementById('pageUp').style.visibility = showStatus;
		showStatus = (pageCurrent<pageTotal)? 'visible' : 'hidden';
		document.getElementById('pageDown').style.visibility = showStatus;
	}
	return;
}
///////////////////////////////////////////////////////////////////////播控入口部分结束


///////////////////////////////////////////////////////////////////////按键处理部分开始
/*********************************************************************/
/* Function: playerKeyEvent                                          */
/* Description: 播放搜索文件后的遥控器按键处理函数                   */
/* Parameters: keyValue: 按键键值                                    */
/* Author&Date: lixudong  2010-01-23                                 */
/*********************************************************************/
var isStreamError = false; //播放码流错误
var isNoContent = false; //没有文件列表
var isEnterAndBack = false; //按下Enter键
function playerKeyEvent(keyValue)
{
	if (isKeyClock) {
		return;
	}
	if (isNoContent) {
		if (keyValue<0xff00 && keyValue==8) {
			playerKeyBack();
		}
		return;
	}
	if (isNonSupport) {
		isNonSupport = false;
		document.getElementById('divMessage').style.visibility = 'hidden';
		document.getElementById('divMessageShow').style.visibility = 'hidden';
		isScanFilePlay = false;
		return;
	}
	if (isStreamError) {
		if (keyValue<0xff00 && keyValue==8) {
			playerKeyBack();
		}
		else if (keyValue<0xff00 && keyValue==13) {
			playerKeyEnter();
		}
		else {
			document.getElementById('fileError').style.visibility = 'visible';
		}
		return;
	}
	switch(keyValue) {
		case 8: //back
			playerKeyBack();
			return (false);
			break;
		case 13: //Enter
			playerKeyEnter();
			return (false);
			break;

		case 38: //up
			playerKeyUp();
			return (false);
			break;
		case 40: //down
			playerKeyDown();
			return (false);
			break;
		case 37: //left
			if (RTypeStatus==0) {
				playerKeyLeft();
			} else {
				playerKeyLeftCode();
			}
			return (false);
			break;
		case 39: //right
			if (RTypeStatus==0) {
				playerKeyRight();
			} else {
				playerKeyRightCode();
			}
			return (false);
			break;
		case 0x108:		//快进
			if (scanFileType==1 && !isAllInfoShow && streamStatus!=0 && streamStatus!=2) {
				FastForward();
			}
			break;
		case 0x109:		//快退
			if (scanFileType==1 && !isAllInfoShow && streamStatus!=0 && streamStatus!=2) {
				FastRewind();
			}
			break;
		case 263: //play/pause
			playerKeyPlayPause();
			break;

		case 275: //红键
			playerKeyRed();
			break;
		case 276: //绿键
			playerKeyGreen();
			break;
		case 277: //黄键
			playerKeyYellow();
			break;
		case 278: //蓝键
			playerKeyBlue();
			keyBlue();
			break;

		case 259: //音量+
			if (scanFileType==1 && streamStatus==1) {
				volumeControl(1);
			}
			else if (scanFileType==2 && musicPlayStatus==1) {
				musicVolumeControl(1);
			}
			break;
		case 260: //音量-
			if (scanFileType==1 && streamStatus==1) {
				volumeControl(2);
			}
			else if (scanFileType==2 && musicPlayStatus==1) {
				musicVolumeControl(2);
			}
			break;
		case 261: //静音
			if (scanFileType==1 && streamStatus==1) {
				volumeControl(3);
			}
			else if (scanFileType==2 && musicPlayStatus==1) {
				musicVolumeControl(3);
			}
			break;
		case 262: //声道
			if (scanFileType==1 && streamStatus==1) {
				changeTrack();
			}
			break;
		case 66340:	//长按声道键
			if (scanFileType==1 && streamStatus==1) {
				changeAudioChannel();
			}
			break;

		case 1292: //字幕
			if (scanFileType==1) {
				changeSubtitle();
			}
			break;
		case 271: //定位
			playerKeyPlayPause();
			break;
		case 281: //收藏
			replayBookMark();
			break;

		case 56: //切换
			if (scanFileType==1) {
				changeTVSystem();
			}
			break;

		case 0xff01: //播放到尾(buffer读完，解码器仍然解码)
			isEnterAndBack = false;
			break;
		case 0xff02: //播放到尾(解码器停止)
			if (!isEnterAndBack) {
				playerKeyBack();
			}
			//playerKeyBack();
			break;
//		case 0xff03: //播放下一段
		case 0xff0b:	//文件播放快结束时
			playerKeyBack();
			break;
		case 0xff04: //播放开始
			hideBookMark();
			setTimeout("makeRequest('bookMark?1|000000|'+scanFileName+'|-1', getBookMark, 0)", 10);
			streamStatus = 1;
			streamFastSpeed = 1;
			hideProcess();
			document.getElementById('divPlayStatus').style.visibility = 'hidden';
			document.getElementById('playStatusIcon').src = 'image/player/play.png';
			break;
		case 0xff05: //播放到头(快退到第一段的开头; 文件的开头, 不发0xff04)
			//keyPlayPause();
			setTimeout("makeRequest('seek?0', nullFun)", 10);//lxd 2009-10-12 底层方式调整
			streamStatus = 1;
			streamFastSpeed = 1;
			showPlayStatus();
			break;
		case 0xff06: //码流错误
			isNoContent = true;
			document.getElementById('fileError').innerHTML = movie_FILE_ERROR[0]+movie_FILE_ERROR[4];
			document.getElementById('fileError').style.visibility = 'visible';
			break;
		case 0xff07: //文件音频不支持
			isStreamError = true;
			document.getElementById('fileError').innerHTML = movie_FILE_ERROR[1]+movie_FILE_ERROR[5];
			document.getElementById('fileError').style.visibility = 'visible';
			break;
		case 0xff08: //文件视频不支持
			isStreamError = true;
			document.getElementById('fileError').innerHTML = movie_FILE_ERROR[2]+movie_FILE_ERROR[5];
			document.getElementById('fileError').style.visibility = 'visible';
			break;
		case 0xff09: //文件音频、视频均不支持
			isNoContent = true;
			document.getElementById('fileError').innerHTML = movie_FILE_ERROR[3]+movie_FILE_ERROR[4];
			document.getElementById('fileError').style.visibility = 'visible';
			break;
			
		default:
			return (-1);
			break;
	}
	return;
}

/*********************************************************************/
/* Function: playerKeyUp                                             */
/* Description: 按键处理函数                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-24                                 */
/*********************************************************************/
function playerKeyUp()
{
	if (scanFileType==1) { //电影文件的处理
	}
	else if (scanFileType==2) { //音乐文件的处理
	}
	else if (scanFileType==3) { //图片文件的处理
	}
	return;
}

/*********************************************************************/
/* Function: playerKeyDown                                           */
/* Description: 按键处理函数                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-24                                 */
/*********************************************************************/
function playerKeyDown()
{
	if (scanFileType==1) { //电影文件的处理
	}
	else if (scanFileType==2) { //音乐文件的处理
	}
	else if (scanFileType==3) { //图片文件的处理
	}
	return;
}

/*********************************************************************/
/* Function: playerKeyLeft                                           */
/* Description: 按键处理函数                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-24                                 */
/*********************************************************************/
function playerKeyLeft()
{
	if (scanFileType==1) { //电影文件的处理
		if (isAllInfoShow) {
			allInfoPrevious();
		}
		else {
			if (streamStatus==2) {
				if (!isSeekSelect) {
					hideProcess();
				}
				seekSelect(0);
			}
			else if (streamStatus!=0) {
				FastRewind();
			}
		}
	}
	else if (scanFileType==2) { //音乐文件的处理
	}
	else if (scanFileType==3) { //图片文件的处理
	}
	return;
}

/*********************************************************************/
/* Function: playerKeyLeftCode                                      */
/* Description: 按键处理函数                                         */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-5-13                                */
/*********************************************************************/
function playerKeyLeftCode()
{
	if (scanFileType==1) { //电影文件的处理
		if (isAllInfoShow) {
			allInfoPrevious();
		}
		else {
			if (streamStatus==2) {
				if (!isSeekSelect) {
					hideProcess();
				}
				seekSelect(0);
			}
			else if (streamStatus==1) {
				volumeControl(2);
			}
		}
	}
	else if (scanFileType==2) { //音乐文件的处理
		if (musicPlayStatus==1) {
			musicVolumeControl(2);
		}
	}
	else if (scanFileType==3) { //图片文件的处理
	}
	return;
}

/*********************************************************************/
/* Function: playerKeyRight                                          */
/* Description: 按键处理函数                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-24                                 */
/*********************************************************************/
function playerKeyRight()
{
	if (scanFileType==1) { //电影文件的处理
		if (isAllInfoShow) {
			allInfoNext();
		}
		else {
			if (streamStatus==2) {
				if (!isSeekSelect) {
					hideProcess();
				}
				seekSelect(1);
			}
			else if (streamStatus!=0) {
				FastForward();
			}
		}
	}
	else if (scanFileType==2) { //音乐文件的处理
	}
	else if (scanFileType==3) { //图片文件的处理
	}
	return;
}

/*********************************************************************/
/* Function: playerKeyRightCode                                      */
/* Description: 按键处理函数                                         */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-5-13                                */
/*********************************************************************/
function playerKeyRightCode()
{
	if (scanFileType==1) { //电影文件的处理
		if (isAllInfoShow) {
			allInfoNext();
		}
		else {
			if (streamStatus==2) {
				if (!isSeekSelect) {
					hideProcess();
				}
				seekSelect(1);
			}
			else if (streamStatus==1) {
				volumeControl(1);
			}
		}
	}
	else if (scanFileType==2) { //音乐文件的处理
		if (musicPlayStatus==1) {
			musicVolumeControl(1);
		}
	}
	else if (scanFileType==3) { //图片文件的处理
	}
	return;
}

/*********************************************************************/
/* Function: playerKeyPlayPause                                      */
/* Description: 按键处理函数                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-24                                 */
/*********************************************************************/
function playerKeyPlayPause()
{
	if (scanFileType==1) { //电影文件的处理
		var requestStatus;
		if (isBookMarkSelece || isSetupBookMark || isReplayBookMark || streamStatus==0) {
			return;
		}
		if (streamStatus==1) {
			requestStatus = makeRequest('pause', showPlayPause);
			if (requestStatus) {
				streamStatus = 2;
				streamFastSpeed = 1;
				showPlayStatus();
			}
		}
		else {
			requestStatus = makeRequest('resume', showPlayPause);
			if (requestStatus) {
				streamStatus = 1;
				streamFastSpeed = 1;
				showPlayStatus();
			}
		}
	}
	else if (scanFileType==2) { //音乐文件的处理
		musicPlayPause();
	}
	else if (scanFileType==3) { //图片文件的处理
	}
	return;
}

/*********************************************************************/
/* Function: playerKeyEnter                                          */
/* Description: 按键处理函数                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-24                                 */
/*********************************************************************/
function playerKeyEnter()
{
	if (scanFileType==1) { //电影文件的处理
		if (isAllInfoShow) {
			allInfoSelect();
			return;
		}
		if (isStreamError) {
			document.getElementById('fileError').style.visibility = 'hidden';
			//isStreamError = false;
			return;
		}
		if (streamStatus==2) {
			seekPlay();
		}
		else if (streamStatus==3 || streamStatus==4) {
			playerKeyPlayPause();
		}
	}
	else if (scanFileType==2) { //音乐文件的处理
	}
	else if (scanFileType==3) { //图片文件的处理
		imageRevolution();
	}
	return;
}

/*********************************************************************/
/* Function: playerKeyBack                                           */
/* Description: 按键处理函数                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-24                                 */
/*********************************************************************/
function playerKeyBack()
{
	if (scanFileType==1) { //电影文件的处理
		setTimeout("makeRequest('stop', backOperate, 0)", 10);
	}
	else if (scanFileType==2) { //音乐文件的处理
		var requestStatus = makeRequest('stop', fileListShow, 0);
		if (requestStatus) {
			musicHideProcess();
		}
	}
	else if (scanFileType==3) { //图片文件的处理
		setTimeout("makeRequest('showPic?0|0|1280|720|path|0|16|', fileListShow, 5)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: playerKeyRed                                            */
/* Description: 按键处理函数                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-24                                 */
/*********************************************************************/
function playerKeyRed()
{
	if (scanFileType==1) { //电影文件的处理
		if (isBookMarkSelece) {
			bookMarkPlay();
		}
		else if (isSetupBookMark) {
			saveBookMark();
		}
	}
	else if (scanFileType==2) { //音乐文件的处理
	}
	else if (scanFileType==3) { //图片文件的处理
	}
	return;
}

/*********************************************************************/
/* Function: playerKeyGreen                                          */
/* Description: 按键处理函数                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-24                                 */
/*********************************************************************/
function playerKeyGreen()
{
	if (scanFileType==1) { //电影文件的处理
		if (isBookMarkSelece||isSetupBookMark) {
			hideBookMark();
		}
	}
	else if (scanFileType==2) { //音乐文件的处理
	}
	else if (scanFileType==3) { //图片文件的处理
	}
	return;
}

/*********************************************************************/
/* Function: playerKeyYellow                                         */
/* Description: 按键处理函数                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-24                                 */
/*********************************************************************/
function playerKeyYellow()
{
	if (scanFileType==1) { //电影文件的处理
		if (!isBookMarkSelece && !isSetupBookMark) {
			setupBookMarkRequest();
		}
		else if (isBookMarkSelece) {
			currentTimeBookMark = '000000';
			saveBookMark();
		}
	}
	else if (scanFileType==2) { //音乐文件的处理
	}
	else if (scanFileType==3) { //图片文件的处理
	}
	return;
}

/*********************************************************************/
/* Function: playerKeyBlue                                           */
/* Description: 按键处理函数                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-24                                 */
/*********************************************************************/
function playerKeyBlue()
{
	if (scanFileType==1) { //电影文件的处理
		if (streamStatus!=1 || isBookMarkSelece || isSetupBookMark || isReplayBookMark) {
			return;
		}
		if (isPlayProcessShow) {
			hideProcess();
			isAllInfoShow = true;
			showAllInfo();
		}
		else {
			if (isAllInfoShow) {
				hideAllInfo();
			}
			else {
				showProcess();
			}
		}
	}
	else if (scanFileType==2) { //音乐文件的处理
	}
	else if (scanFileType==3) { //图片文件的处理
	}
	return;
}
///////////////////////////////////////////////////////////////////////按键处理部分开始

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////电影开始
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////进度条处理部分开始
/*********************************************************************/
/* Function: showProcess                                             */
/* Description: 显示进度条的入口函数                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-07                                 */
/*********************************************************************/
var timerID_playProcess; //循环定时器ID，视频播放的进度条处理
var timerID_ProcessShow; //定时器ID，显示视频播放的进度条
var isPlayProcessShow = false; //显示视频播放的进度条的状态
function showProcess()
{
	hideVolume();
	if (isPlayProcessShow) {
		return;
	}
	clearInterval(timerID_playProcess);
	clearTimeout(timerID_ProcessShow);
	isPlayProcessShow = true;
	getCurrentTimeRequest();
	setTimeout("document.getElementById('divPlayProcess').style.visibility = 'visible'", 100);
	timerID_playProcess = setInterval('getCurrentTimeRequest()', 1000);
	if (streamStatus!=2) {
		timerID_ProcessShow = setTimeout('hideProcess()', 3000);
	}
	return;
}

/*********************************************************************/
/* Function: hideProcess                                             */
/* Description: 隐藏进度条函数                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-07                                 */
/*********************************************************************/
function hideProcess()
{
	if (streamStatus==3 || streamStatus==4) {
		if (!isAllInfoShow)
		 {
			return;
		}
	}
	clearInterval(timerID_playProcess);
	clearTimeout(timerID_ProcessShow);
	isPlayProcessShow = false;
	document.getElementById('divPlayProcess').style.visibility = 'hidden';
	return;
}

/*********************************************************************/
/* Function: getTotalTimeRequest                                     */
/* Description: 发送获得总时间的请求                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-07                                 */
/*********************************************************************/
function getTotalTimeRequest()
{
	setTimeout("makeRequest('time', getTotalTime)", 10);
	return;
}

/*********************************************************************/
/* Function: getTotalTime                                            */
/* Description: 获得视频文件的总时间                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-07                                 */
/*********************************************************************/
var totalTime = 0; //视频文件的总时间
function getTotalTime()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		totalTime = httpRequest.responseXML.getElementsByTagName("result").item(0).childNodes[0].nodeValue;
	}
	return;
}

/*********************************************************************/
/* Function: getCurrentTimeRequest                                   */
/* Description: 发送获得当前时间的请求                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-07                                 */
/*********************************************************************/
function getCurrentTimeRequest()
{
	setTimeout("makeRequest('timeall', getCurrentTime)", 10);
	return;
}

/*********************************************************************/
/* Function: getCurrentTime                                          */
/* Description: 获得视频文件的当前时间                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-07                                 */
/*********************************************************************/
var currentTime = 0; //视频文件的当前时间
function getCurrentTime()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var tempStr = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue;
		var param = tempStr.split('|');
		currentTime = parseInt(param[0], 10);
		totalTime = parseInt(param[1], 10);
		showProcessInfo();
	}
	return;
}

/*********************************************************************/
/* Function: showProcessInfo                                         */
/* Description: 显示进度条相关的信息，包括进度条长度、播放时间       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-07                                 */
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
	var timeStr = currentTimeStr+' / '+totalTimeStr;
	document.getElementById('processBar').style.width = ''+len+'px';
	document.getElementById('streamTime').innerHTML = timeStr;
	return;
}
///////////////////////////////////////////////////////////////////////进度条处理部分结束

///////////////////////////////////////////////////////////////////////播放状态显示部分开始
/*********************************************************************/
/* Function: showPlayStatus                                          */
/* Description: 显示播放状态图标                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-09                                 */
/*********************************************************************/
var streamStatus = 1; //记录当前播放状态，0:停止 1:播放 2:暂停 3:快进 4:快退；该状态在isFullScreen和isMoviePlay都为true时有效
var streamFastSpeed = 1; //记录快进快退的速度，1:正常播放，2 4 8 16 32:快进速度取值，-2 -4 -8 -16 -32:快退进速度取值 
function showPlayStatus()
{
	clearTimeout(timerID_playStatus);
	if (isReplayBookMark) {
		hideNoBookMark();
	}
	hideAllInfo();
	hideProcess();
	var imgURL = '';
	if (streamStatus==0) {
		imgURL = 'image/player/stop.png';
	}
	else if (streamStatus==1) {
		imgURL = 'image/player/play.png';
		clearTimeout(timerID_playStatus);
		timerID_playStatus = setTimeout('hidePlayStatus()', 3000);
		showProcess();
	}
	else if (streamStatus==2) {
		imgURL = 'image/player/pause.png';
		showProcess();
	}
	else if (streamStatus==3) {
		imgURL = 'image/player/forward'+streamFastSpeed+'.png';
		showProcess();
	}
	else if (streamStatus==4) {
		imgURL = 'image/player/backward'+streamFastSpeed+'.png';
		showProcess();
	}
	document.getElementById('playStatusIcon').src = imgURL;
	document.getElementById('divPlayStatus').style.visibility = 'visible';
	return;
}

/*********************************************************************/
/* Function: hidePlayStatus                                          */
/* Description: 隐藏播放状态图标                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-09                                 */
/*********************************************************************/
var timerID_playStatus; //定时器ID，播放状态提示信息的控制
function hidePlayStatus()
{
	clearTimeout(timerID_playStatus);
	document.getElementById('divPlayStatus').style.visibility = 'hidden';
	return;
}

/*********************************************************************/
/* Function: showPlayToStart                                         */
/* Description:  显示快退到头后的状态图标                            */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-10-13                                 */
/*********************************************************************/
function showPlayToStart()
{
	if(httpRequest.readyState==4 && httpRequest.status==200) {
		streamStatus = 1;
		streamFastSpeed = 1;
		showPlayStatus();
	}
	return;
}
///////////////////////////////////////////////////////////////////////播放状态显示部分结束

///////////////////////////////////////////////////////////////////////音量状态显示部分开始
/*********************************************************************/
/* Function: getVolumeRequest                                        */
/* Description: 获得音量的状态的请求                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-24                                 */
/*********************************************************************/
function getVolumeRequest()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		setTimeout("makeRequest('volume?2', getVolumeStatus)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: getVolumeStatus                                         */
/* Description: 获得音量的状态，包括音量值和静音状态                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-24                                 */
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
	}
	subtitleFirstGet = true;
	return;
}

/*********************************************************************/
/* Function: showMuteStatus		                                     */
/* Description: 显示静音状态						       	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-04-16                              */
/*********************************************************************/
var showVolumeBarStatus = false;		//记录音量条显示状态
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
/* Function: volumeControl                                           */
/* Description: 音量控制操作                                         */
/* Parameters: operate 操作类型，1:音量加 2:音量减 3:静音/非静音     */
/* Author&Date: lixudong  2009-06-09                                 */
/*********************************************************************/
var volumeOperate = 0; //指示音量操作类型，0:未知操作 1:音量加 2:音量减 3:静音/非静音
var isMuteStatus = 0; //记录静音状态，0:非静音，1:静音
var volumeLevel = 100; //音量值
function volumeControl(operate)
{
	if (operate<1 || operate>3) {
		return;
	}
	if (streamStatus!=1) {
		return;
	}
	hideProcess();
	hideAllInfo();
	volumeOperate = operate;
	volumeOperateSelece();
	return;
}

/*********************************************************************/
/* Function: volumeOperateSelece                                     */
/* Description: 不同音量状态下的相关处理                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-09                                 */
/*********************************************************************/
function volumeOperateSelece()
{
	var requestStatus;
	if (volumeOperate==1 || volumeOperate==2) {
		if (isMuteStatus==1) {
			requestStatus = makeRequest('volume?0', nullFun);
			if (requestStatus) {
				isMuteStatus = 0;
			}
			else {
				return;
			}
		}
		else {
			var tempLevel = (volumeOperate==1)? (volumeLevel+5) : (volumeLevel-5);
			tempLevel = (tempLevel>=100)? 100 : tempLevel;
			tempLevel = (tempLevel<=0)? 0 : tempLevel;
			requestStatus = makeRequest('volume?3|'+tempLevel, nullFun);
			if (requestStatus) {
				volumeLevel = tempLevel
			}
			else {
				return;
			}
		}
	}
	else if (volumeOperate==3) {
		var tempMuteStatus = (isMuteStatus==0)? 1 : 0;
		requestStatus = makeRequest('volume?'+tempMuteStatus, nullFun);
		if (requestStatus) {
			isMuteStatus = tempMuteStatus;
		}
		else {
			return;
		}
	}
	showVolume();
	return;
}

/*********************************************************************/
/* Function: setVolume                                               */
/* Description: 设置音量大小                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-07-31                                 */
/*********************************************************************/
function setVolume()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var tempLevel = (volumeOperate==1)? (volumeLevel+5) : (volumeLevel-5);
		tempLevel = (tempLevel>100)? 100 : tempLevel;
		tempLevel = (tempLevel<0)? 0 : tempLevel;
		requestStatus = makeRequest('volume?3|'+tempLevel, nullFun);
		if (requestStatus) {
			volumeLevel = tempLevel;
			showVolume();
		}
	}
	return;
}

/*********************************************************************/
/* Function: showVolume                                              */
/* Description: 显示音量条                                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-09                                 */
/*********************************************************************/
var timerID_Volume; //定时器ID，音量条的显示控制
function showVolume()
{
	clearTimeout(timerID_Volume);
	var imgURL = '';
	if (isMuteStatus==1) {
		muteURL = 'url(image/player/mute.png)';
		volumeURL = 'url(image/player/volumeBarOff.png)';
	}
	else {
		muteURL = 'url(image/player/muteOff.png)';
		volumeURL = 'url(image/player/volumeBar.png)';
	}
	var len = 4.5*volumeLevel;
	len = (len<=0)? 1 : len;
	len = (len>=450)? 450 : len;
	var showStr = ''+volumeLevel+' / 100';
	document.getElementById('muteStatua').style.backgroundImage = muteURL;
	document.getElementById('volumeBar').style.backgroundImage = volumeURL;
	document.getElementById('volumeBar').style.width = ''+len+'px';
	if (len==1) {
		document.getElementById('volumeBar').style.visibility = 'hidden';
	}
	else {
		document.getElementById('volumeBar').style.visibility = 'visible';
	}
	document.getElementById('volumeLevel').innerHTML = showStr;
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
/* Author&Date: lixudong  2009-06-09                                 */
/*********************************************************************/
function hideVolume()
{
	clearTimeout(timerID_Volume);
	document.getElementById('volumeBar').style.visibility = 'hidden';
	document.getElementById('divVolume').style.visibility = 'hidden';
	showVolumeBarStatus = false;
	showMuteStatus();
	return;
}
///////////////////////////////////////////////////////////////////////音量状态显示部分结束


///////////////////////////////////////////////////////////////////////信息窗显示部分开始
/*********************************************************************/
/* Function: showAllInfo                                             */
/* Description: 显示信息窗的入口函数，发送获得Codec的请求            */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-23                                 */
/*********************************************************************/
function showAllInfo()
{
	setTimeout("makeRequest('getInfo?'+scanFileName+'|1', getAllCodec, 0)", 10);
	return;
}

/*********************************************************************/
/* Function: getAllCodec                                             */
/* Description: 获得Codec信息                                        */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-23                                 */
/*********************************************************************/
var isAllInfoShow = false; //信息窗显示状态
var timerID_allInfo = 0; //定时器ID，信息窗显示控制
var timerID_allInfoRe; //定时器ID，信息窗刷新显示控制
function getAllCodec()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var responseXMLHead = httpRequest.responseXML.getElementsByTagName('result');
		var tempStr = responseXMLHead.item(0).childNodes[0].nodeValue.split('|');
		currentTVSystem = parseInt(tempStr[6]); //当前的输出制式
		currentTVSystemSD = parseInt(tempStr[7]); //当前输出标清制式(辅助)
		isMuteStatus = parseInt(tempStr[8]); //记录静音状态
		volumeLevel = parseInt(tempStr[9]); //音量值
		volumeLevel = (volumeLevel%5 == 0) ? volumeLevel : (5+volumeLevel-volumeLevel%5);
		currentTrack = parseInt(tempStr[10]); //当前音轨序号，从0开始
		trackInfo1[currentTrack] = tempStr[11]; //音轨格式信息
		trackInfo2[currentTrack] = tempStr[12]; //音轨语言信息
		trackTotal = parseInt(tempStr[13]); //音轨总数量
		var subInfo = tempStr[14].split('/');	//拆分字幕
		subtitleTotal = parseInt(subInfo[1]); //字幕总数
		if (subtitleFirstGet) {
			if (parseInt(subInfo[0])>0 && subtitleTotal>=parseInt(subInfo[0])) {
				currentSubtitle = parseInt(subInfo[0]) - 1;
				subtitleFirstGet = false;
			}
		}
		currentTime = parseInt(tempStr[15]); //视频文件的当前时间
		totalTime = parseInt(tempStr[16]); //视频文件的总时间
		showAllInfoAction(tempStr);
	}
	return;
}

/*********************************************************************/
/* Function: showAllInfoAction                                       */
/* Description: 显示信息窗的内容                                     */
/* Parameters: allCodec 所有信息的数组                               */
/* Author&Date: lixudong  2010-01-23                                 */
/*********************************************************************/
function showAllInfoAction(allCodec)
{
	if (isReplayBookMark) {
		hideNoBookMark();
	}
	hidePlayStatus();
	var parameter = fileIndex;
	//isAllInfoShow = true;
	var sizeStr = changeDataUnit(allCodec[19]);
	if (typeof(allCodec[2])=='undefined') {
		allCodec[2] = movie_OPERATE[10];
	}
	if (typeof(allCodec[3])=='undefined') {
		allCodec[3] = movie_OPERATE[10];
	}
	if (isNaN(allCodec[4])) {
		allCodec[4] = movie_OPERATE[10];
	}
	if (typeof(allCodec[5])=='undefined') {
		allCodec[5] = movie_OPERATE[10];
	}
	var hh = doubleDigit(parseInt(totalTime/3600));
	var mm = doubleDigit(parseInt((totalTime%3600)/60));
	var ss = doubleDigit(totalTime%60);
	var totalTimeStr = ''+hh+':'+mm+':'+ss;
	hh = doubleDigit(parseInt(currentTime/3600));
	mm = doubleDigit(parseInt((currentTime%3600)/60));
	ss = doubleDigit(currentTime%60);
	var currentTimeStr = ''+hh+':'+mm+':'+ss;

	var showStr_volume = movie_VOLUME[0]+volumeLevel;
	if (isMuteStatus==1) {
		showStr_volume += movie_VOLUME[1];
	}
	else {
		showStr_volume += movie_VOLUME[2];
	}
	if (trackTotal==0) {
		var showStr_tack = movie_OPERATE[2]+movie_OPERATE[9];
	}
	else {
		showStr_tack = movie_OPERATE[2]+(currentTrack+1)+movie_OPERATE[4]+trackTotal+movie_OPERATE[5]+movie_OPERATE[6]+trackInfo1[currentTrack]+movie_OPERATE[7]+trackInfo2[currentTrack];
	}
	if (subtitleTotal==0) {
		var showStr_subtitle = movie_OPERATE[3]+movie_OPERATE[9];
	}
	else {
		showStr_subtitle = movie_OPERATE[3]+(currentSubtitle+1)+movie_OPERATE[4]+subtitleTotal+movie_OPERATE[5];
	}

	var tvSystemStr = '';
	if (currentTVSystem==0) {
		tvSystemStr='NTSC';
	}
	else if (currentTVSystem==1) {
		tvSystemStr='PAL';
	}
	else if (currentTVSystem==3) {
		tvSystemStr='480p';
	}
	else if (currentTVSystem==4) {
		tvSystemStr='576p';
	}
	else if (currentTVSystem==5) {
		tvSystemStr='720p/50Hz';
	}
	else if (currentTVSystem==6) {
		tvSystemStr='720p/60Hz';
	}
	else if (currentTVSystem==7) {
		tvSystemStr='1080i/50Hz';
	}
	else if (currentTVSystem==8) {
		tvSystemStr='1080i/60Hz';
	}
	else {
		tvSystemStr=movie_OPERATE[10];
	}
	tvSystemStr = movie_OPERATE[8]+tvSystemStr;

	switch(allCodec[20]) {
		case 'stereo':
			currentChannel = 0;
			break;
		case 'left':
			currentChannel = 1;
			break;
		case 'right':
			currentChannel = 2;
			break;
		default:
			return (-1);
			break;
	}

	var showStr = '';
	showStr += movie_STREAM[0]+scanFileExtend+movie_STREAM[1]+sizeStr+'<br>';
	showStr += movie_STREAM[2]+currentTimeStr+movie_STREAM[3]+totalTimeStr+'<br>';
	showStr += movie_STREAM[5]+allCodec[2]+movie_STREAM[6]+allCodec[5]+'<br>';
	showStr += movie_STREAM[7]+allCodec[3]+movie_STREAM[8]+allCodec[4]+'<br>';
	showStr += tvSystemStr+'&nbsp;&nbsp;&nbsp;'+showStr_subtitle+'<br>';

	showStr += movie_STREAM[9]+allCodec[0]+movie_STREAM[10]+allCodec[1]+'<br>';
	showStr += showStr_tack+'<br>';
	showStr += showStr_volume+'<br>';
	showStr += movie_AUDIO_CHANNEL[0]+movie_AUDIO_CHANNEL[currentChannel+1]+'<br>';
	showStr += movie_STREAM[4]+allCodec[18];
	document.getElementById('allInfo').innerHTML = showStr;
	if (isAllInfoShow) {
		document.getElementById('divAllInfo').style.visibility = 'visible';
	}
	clearTimeout(timerID_allInfoRe);
	timerID_allInfoRe = setTimeout('showAllInfo()', 1000);
	timerID_allInfo++;
	if (timerID_allInfo>=15) {
		//hideAllInfo();
	}
   	return;
}

/*********************************************************************/
/* Function: hideAllInfo                                             */
/* Description: 隐藏信息窗                                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-23                                 */
/*********************************************************************/
function hideAllInfo()
{
	timerID_allInfo = 0;
	clearTimeout(timerID_allInfoRe);
	isAllInfoShow = false;
	document.getElementById('divAllInfo').style.visibility = 'hidden';
	return;
}
///////////////////////////////////////////////////////////////////////信息窗显示部分结束


///////////////////////////////////////////////////////////////////////全屏信息时的功能选项开始
/*********************************************************************/
/* Function: allInfoNext                                             */
/* Description: 全部信息的选项焦点向右移动                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-10-10                                 */
/*********************************************************************/
var allInfoTotal = 4; //全屏信息时的焦点总数
var allInfoIndex = 0; //全屏信息时的焦点位置
function allInfoNext()
{
	if (allInfoIndex>=allInfoTotal-1) {
		allInfoIndex = 0;
	}
	else {
		allInfoIndex++;
	}
	document.getElementById('allInfoFocus').style.left = (132+116*allInfoIndex)+"px";
	return;
}

/*********************************************************************/
/* Function: allInfoPrevious                                         */
/* Description: 全部信息的选项焦点向左移动                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-10-10                                 */
/*********************************************************************/
function allInfoPrevious()
{
	if (allInfoIndex<=0) {
		allInfoIndex = allInfoTotal-1;
	}
	else {
		allInfoIndex--;
	}
	document.getElementById('allInfoFocus').style.left = (132+116*allInfoIndex)+"px";
	return;
}

/*********************************************************************/
/* Function: allInfoSelect                                           */
/* Description: 选中全部信息的选项                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-10-10                                 */
/*********************************************************************/
function allInfoSelect()
{
	if (allInfoIndex==0) {
		changeTrack();
	}
	else if (allInfoIndex==1) {
		changeSubtitle();
	}
	else if (allInfoIndex==2) {
		setupBookMarkRequest();
	}
	else if (allInfoIndex==3) {
		//changeAudioChannel();
		changeTVSystem();
	}
	return;
}
///////////////////////////////////////////////////////////////////////全屏信息时的功能选项结束


///////////////////////////////////////////////////////////////////////音轨操作部分开始
/*********************************************************************/
/* Function: changeTrack                                             */
/* Description: 切换音轨                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-11                                 */
/*********************************************************************/
function changeTrack()
{
	if (isAllInfoShow) {
		hideAllInfo();
	}
	setTimeout("makeRequest('track?0', getTrackInfo)", 10);
	return;
}

/*********************************************************************/
/* Function: getTrackInfo                                            */
/* Description: 获得音轨信息                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-11                                 */
/*********************************************************************/
var currentTrack = 0; //当前音轨序号，从0开始
var trackTotal = 0; //音轨总数量
var trackInfo1 = new Array(); //音轨格式信息
var trackInfo2 = new Array(); //音轨语言信息
function getTrackInfo()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==0) {
			showSetupInfo(2, -1);
			return;
		}
		currentTrack = httpRequest.responseXML.getElementsByTagName('curTrack').item(0).childNodes[0].nodeValue;
		currentTrack = parseInt(currentTrack);
		var responseXMLHead = httpRequest.responseXML.getElementsByTagName('track');
		trackTotal = responseXMLHead.length;
		for (var i=0; i<trackTotal; i++) {
			var param = responseXMLHead.item(i).childNodes[0].nodeValue.split('|');
			trackInfo1[i] = param[1];
			trackInfo2[i] = param[2];
		}
		if (trackTotal!=0) {
			currentTrack = (currentTrack>=(trackTotal-1))? 0 : currentTrack+1;
			setTimeout("makeRequest('track?1|'+currentTrack, getTrackInfoEnd)", 10);
		}
		else {
			showSetupInfo(2, -1);
		}
	}
	return;
}

/*********************************************************************/
/* Function: getTrackInfoEnd                                         */
/* Description: 获得音轨信息后显示提示                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-20                                 */
/*********************************************************************/
function getTrackInfoEnd()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		showSetupInfo(2, 0);
	}
	return;
}
///////////////////////////////////////////////////////////////////////音轨操作部分结束


///////////////////////////////////////////////////////////////////////声道操作部分开始
/*********************************************************************/
/* Function: changeAudioChannel                                      */
/* Description: 切换声道                                              */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-04-15                              */
/*********************************************************************/
function changeAudioChannel()
{
	if (isAllInfoShow) {
		hideAllInfo();
	}
	setTimeout("makeRequest('channel?0', getAudioChannelInfo)", 10);
	return;
}

/*********************************************************************/
/* Function: getAudioChannelInfo                                     */
/* Description: 获得声道信息                                           */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-04-15                              */
/*********************************************************************/
var currentChannel = 0; //当前声道序号，从0开始
var channelTotal = 3; //声道总数量
var channelInfo1 = new Array('stereo', 'left', 'right'); //音轨格式信息
var setChannelStr = 'stereo'; //音轨语言信息
function getAudioChannelInfo()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==0) {
			showSetupInfo(5, -1);
			return;
		}
		var tempStr = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue;
		switch(tempStr) {
			case 'stereo':
				currentChannel = 0;
				break;
			case 'left':
				currentChannel = 1;
				break;
			case 'right':
				currentChannel = 2;
				break;
			default:
			return (-1);
				break;
		}
		currentChannel++;
		currentChannel = currentChannel>=channelTotal ? 0 : currentChannel;
		setChannelStr = channelInfo1[currentChannel];
		setTimeout("makeRequest('channel?1|'+setChannelStr, getChannelInfoEnd)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: getChannelInfoEnd                                       */
/* Description: 获得声道信息后显示提示                                  */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-04-15                              */
/*********************************************************************/
function getChannelInfoEnd()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		showSetupInfo(5, 0);
	}
	return;
}
///////////////////////////////////////////////////////////////////////声道操作部分结束


///////////////////////////////////////////////////////////////////////字幕操作部分开始
/*********************************************************************/
/* Function: changeSubtitle                                          */
/* Description: 切换字幕                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-11                                 */
/*********************************************************************/
function changeSubtitle()
{
	if (isAllInfoShow) {
		hideAllInfo();
	}
	setTimeout("makeRequest('subtitle?0|'+scanFileName, getSubtitleInfo)", 10);
	return;
}

/*********************************************************************/
/* Function: getSubtitleInfo                                         */
/* Description: 获得字幕信息                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-11                                 */
/*********************************************************************/
var currentSubtitle = 0; //当前字幕序号，从0开始
var subtitleTotal = 0; //字幕总数量
var subtitleFirstGet = true;	//记录是否第一次获得字幕
var subtitleFile = new Array(); //字幕文件的URL音轨信息
function getSubtitleInfo()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var responseXMLHead = httpRequest.responseXML.getElementsByTagName('subtitle');
		subtitleTotal = responseXMLHead.length;
		for (var i=0; i<subtitleTotal; i++) {
			var tempStr = responseXMLHead.item(i).childNodes[0].nodeValue;
			subtitleFile[i] = tempStr;
		}
		if (subtitleFirstGet) {
			var subtitleFirstStr = httpRequest.responseXML.getElementsByTagName('first').item(0).childNodes[0].nodeValue;
			if (subtitleFirstStr>0 && subtitleFirstStr<=subtitleTotal) {
				currentSubtitle = parseInt(subtitleFirstStr)-1;
			} else {
				currentSubtitle = 0;
			}
			subtitleFirstGet = false;
		}
		if (subtitleTotal!=0) {
			currentSubtitle = (currentSubtitle>=subtitleTotal-1)? 0 : currentSubtitle+1;
			setTimeout("makeRequest('subtitle?1|'+subtitleFile[currentSubtitle], getSubtitleInfoEnd)", 10);
		}
		else{
			showSetupInfo(3, -1);
		}
	}
	return;
}

/*********************************************************************/
/* Function: getSubtitleInfoEnd                                      */
/* Description: 获得字幕信息后的显示操作                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-20                                 */
/*********************************************************************/
function getSubtitleInfoEnd()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		showSetupInfo(3, 0);
	}
	return;
}
///////////////////////////////////////////////////////////////////////字幕操作部分结束


///////////////////////////////////////////////////////////////////////制式操作部分开始
/*********************************************************************/
/* Function: changeTVSystem                                          */
/* Description: 切换制式请求，制式切换的入口函数                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-11                                 */
/*********************************************************************/
function changeTVSystem()
{
	if (isAllInfoShow) {
		hideAllInfo();
	}
	setTimeout("makeRequest('TVSystem?0|', getTVSystem)", 10);
	return;
}

/*********************************************************************/
/* Function: getTVSystem                                             */
/* Description: 获得制式信息，制式切换的操作函数                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-11                                 */
/*********************************************************************/
var currentTVSystem; //当前的输出制式
var currentTVSystemSD; //当前输出标清制式(辅助)
function getTVSystem()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var responseXMLHead = httpRequest.responseXML.getElementsByTagName('result');
		var parame = responseXMLHead.item(0).childNodes[0].nodeValue.split("|");
		currentTVSystem = parame[0];
		currentTVSystem++;
		if (currentTVSystem>=9) {
			currentTVSystem = 0;
		}
		if (currentTVSystem==2) {
			currentTVSystem = 3;
		}
		if (currentTVSystem==0||currentTVSystem==1) {
			currentTVSystemSD = currentTVSystem;
		}
		else if (currentTVSystem==3||currentTVSystem==6||currentTVSystem==8) {
			currentTVSystemSD = 0;
		}
		else if (currentTVSystem==4||currentTVSystem==5||currentTVSystem==7) {
			currentTVSystemSD = 1;
		}
		else {
			return;
		}
		setTimeout("makeRequest('TVSystem?1|'+currentTVSystem+'|'+currentTVSystemSD, getTVSystemEnd)", 10);
	}
}

/*********************************************************************/
/* Function: getTVSystemEnd                                          */
/* Description: 制式切换后的显示操作                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-20                                 */
/*********************************************************************/
function getTVSystemEnd()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		showSetupInfo(4, 0);
	}
	return;
}
///////////////////////////////////////////////////////////////////////制式操作部分结束


///////////////////////////////////////////////////////////////////////SEEK操作部分开始
/*********************************************************************/
/* Function: getTimeRequest                                          */
/* Description: 发送获得时间的请求                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-19                                 */
/*********************************************************************/
function getTimeRequest()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		setTimeout("makeRequest('timeall', getTimeAll)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: getTimeAll                                              */
/* Description: 获得视频文件的当前时间                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-19                                 */
/*********************************************************************/
var currentTimeSeek = 0; //文件的当前时间
var totalTimeSeek = 0; //文件的当前时间
function getTimeAll()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var tempStr = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue;
		var param = tempStr.split('|');
		currentTimeSeek = parseInt(param[0], 10);
		totalTimeSeek = parseInt(param[1], 10);
	}
	return;
}

/*********************************************************************/
/* Function: seekSelect                                              */
/* Description: 选择SEEK的时间点                                     */
/* Parameters: param 时间的加减方向；0:减60秒，1:加60秒              */
/* Author&Date: lixudong  2009-06-19                                 */
/*********************************************************************/
var isSeekSelect = false; //选择SEEK的时间点
var fuzzySeekStep = 16;	//模糊定位的长度
var isFuzzySeek = true;	//模糊定位的状态
function seekSelect(param)
{
	isSeekSelect = true;
	if (param==0) {
		if (isFuzzySeek) {
			currentTimeSeek -= (totalTimeSeek/fuzzySeekStep);
		}
		else {
			currentTimeSeek -= 60;
		}
		currentTimeSeek = (currentTimeSeek<=0)? 0 : currentTimeSeek;
	}
	else if (param==1) {
		if (isFuzzySeek) {
			currentTimeSeek += (totalTimeSeek/fuzzySeekStep);
		}
		else {
			currentTimeSeek += 60;
		}
		currentTimeSeek = (currentTimeSeek>=totalTimeSeek)? totalTimeSeek : currentTimeSeek;
	}
	else {
		return;
	}
	seekShow()
	return;
}

/*********************************************************************/
/* Function: seekShow                                                */
/* Description: 显示SEEK的时间点                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-19                                 */
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
	var timeStr = currentTimeStr+' / '+totalTimeStr;
	document.getElementById('processBar').style.width = ''+len+'px';
	document.getElementById('streamTime').innerHTML = timeStr;
	document.getElementById('divPlayProcess').style.visibility = 'visible';
	return;
}

/*********************************************************************/
/* Function: seekPlay                                                */
/* Description: 从选定的时间点开始播放                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-19                                 */
/*********************************************************************/
function seekPlay()
{
	streamStatus = 1;
	setTimeout("makeRequest('seek?'+(currentTimeSeek*1000), showSeekPlay)", 10);
	return;	
}

/*********************************************************************/
/* Function: showSeekPlay                                            */
/* Description: 显示选时候的状态                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-07-30                                 */
/*********************************************************************/
function showSeekPlay()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		isSeekSelect = false;
		currentTime = currentTimeSeek;
		totalTime = totalTimeSeek;
		timerID_playStatus = setTimeout('hidePlayStatus()', 2000);
		setTimeout('showProcess()',1000);
		//timerID_ProcessShow = setTimeout('hideProcess()',2000);
		document.getElementById('playStatusIcon').src = 'image/player/play.png';
		document.getElementById('divPlayStatus').style.visibility = 'visible';
	}
	return;	
}
///////////////////////////////////////////////////////////////////////SEEK操作部分结束


///////////////////////////////////////////////////////////////////////书签处理部分开始
/*********************************************************************/
/* Function: requestBookMark                                         */
/* Description: 发送获得书签的请求(全屏播放后自动调用)               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-06                                 */
/*********************************************************************/
function requestBookMark()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		setTimeout("makeRequest('bookMark?1|000000|'+scanFileName+'|-1', getBookMark)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: getBookMark                                             */
/* Description: 获得书签，显示确认信息                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-25                                 */
/*********************************************************************/
var isBookMarkSelece = false; //书签选择状态，该状态为true时才可以选择书签播放
var getBookMarkTime = ''; //获得的书签的时间(串型，格式为hhmmss)
function getBookMark()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		isKeyClock = false;
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if(getStatus==0){
			if (isReplayBookMark) {
				showNoBookMark();
			}
			return;
		}
		var parameter = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue.split('|');
		if(parameter[0]=='000000'){
			if (isReplayBookMark) {
				showNoBookMark();
			}
			return;
		}
		getBookMarkTime = parameter[0];
		showBookMark(getBookMarkTime);
	}
	return;
}

/*********************************************************************/
/* Function: showNoBookMark                                          */
/* Description: 显示书签未设置的提示信息                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-25                                 */
/*********************************************************************/
var timerID_noBookMarkt;
function showNoBookMark()
{
	document.getElementById('fileError').innerHTML = movie_BOOK_MARK[5];
	document.getElementById('fileError').style.visibility = 'visible';
	clearTimeout(timerID_noBookMarkt);
	timerID_noBookMarkt = setTimeout('hideNoBookMark()', 3000);
	return;
}

/*********************************************************************/
/* Function: hideNoBookMark                                          */
/* Description: 隐藏书签未设置的提示信息                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-25                                 */
/*********************************************************************/
function hideNoBookMark()
{
	clearTimeout(timerID_noBookMarkt);
	isReplayBookMark = false;
	document.getElementById('fileError').style.visibility = 'hidden';
	document.getElementById('fileError').innerHTML = '';
	return;
}

/*********************************************************************/
/* Function: showBookMark                                            */
/* Description: 显示书签播放的确认信息                               */
/* Parameters: parameter 串型格式的时间(hhmmss)                      */
/* Author&Date: lixudong  2009-06-06                                 */
/*********************************************************************/
function showBookMark(parameter)
{
	if (parameter=='') {
		return;
	}
	clearTimeout(timerID_bookMarkSelect);
	isBookMarkSelece = true;
	var showStr = parameter.substring(0,2)+':'+parameter.substring(2,4)+':'+parameter.substring(4,6);
	showStr = movie_BOOK_MARK[0]+showStr+movie_BOOK_MARK[1];
	document.getElementById('divBookMarkButton').style.backgroundImage = 'url(image/'+SETUP_Language+'/selectBar3.png)';
	document.getElementById('divBookMarkText').innerHTML = showStr;
	document.getElementById('divBookMark').style.visibility = 'visible';
	timerID_bookMarkSelect = setTimeout('hideBookMark()', 10000);
	return;
}

/*********************************************************************/
/* Function: hideBookMark                                            */
/* Description: 隐藏书签提示信息的                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-06                                 */
/*********************************************************************/
var timerID_bookMarkSelect; //定时器ID，是否选择书签播放提示的控制
function hideBookMark()
{
	isBookMarkSelece = false;
	isSetupBookMark = false;
	isReplayBookMark = false;
	clearTimeout(timerID_bookMarkSelect);
	document.getElementById('divBookMark').style.visibility = 'hidden';
	document.getElementById('divBookMarkText').innerHTML = '';
	return;
}

/*********************************************************************/
/* Function: hideBookMarkResponse                                    */
/* Description: 隐藏书签提示信息的                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-06                                 */
/*********************************************************************/
function hideBookMarkResponse()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		hideBookMark();
	}
	return;
}

/*********************************************************************/
/* Function: bookMarkPlay                                            */
/* Description: 书签播放，即seek到书签指定的时间点开始播放           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-06                                 */
/*********************************************************************/
function bookMarkPlay()
{			
	if (!isBookMarkSelece) {
		return;
	}
	isBookMarkSelece = false;
	var hh = parseInt(getBookMarkTime.substring(0,2),10);
	var mm = parseInt(getBookMarkTime.substring(2,4),10);
	var ss = parseInt(getBookMarkTime.substring(4,6),10);
	var tempBookMarkTime = (hh*3600+mm*60+ss)*1000;
	setTimeout("makeRequest('seek?+"+tempBookMarkTime+"', hideBookMarkResponse)", 10);
	return;
}

/*********************************************************************/
/* Function: setupBookMarkRequest                                    */
/* Description: 设置书签的请求                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-19                                 */
/*********************************************************************/
function setupBookMarkRequest()
{
	if (scanFileType==1 && streamStatus==1 && !isBookMarkSelece && !isSetupBookMark) {
		hideAllInfo();
		setTimeout("makeRequest('timing', setupBookMarkResponse)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: setupBookMarkResponse                                   */
/* Description: 设置书签的响应                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-19                                 */
/*********************************************************************/
var currentTimeBookMark; //设置书签的时间
function setupBookMarkResponse()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		currentTimeBookMark = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue;
		setupBookMark();
	}
	return;
}

/*********************************************************************/
/* Function: setupBookMark                                           */
/* Description: 设置书签，提示是否要存储书签                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-07                                 */
/*********************************************************************/
var isSetupBookMark = false; //书签设置状态
function setupBookMark()
{
	if (isReplayBookMark) {
		hideNoBookMark();
	}
	hideAllInfo();
	currentTimeBookMark = (currentTimeBookMark<0)? 0 : currentTimeBookMark;
	var hh = doubleDigit(parseInt(currentTimeBookMark/3600));
	var mm = doubleDigit(parseInt((currentTimeBookMark%3600)/60));
	var ss = doubleDigit(currentTimeBookMark%60);
	var timeStr = ''+hh+':'+mm+':'+ss;
	var showStr = movie_BOOK_MARK[3]+timeStr+movie_BOOK_MARK[4];
	document.getElementById('divBookMarkButton').style.backgroundImage = 'url(image/'+SETUP_Language+'/selectBar2.png)';
	document.getElementById('divBookMarkText').innerHTML = showStr;
	document.getElementById('divAllInfo').style.visibility = 'hidden';
	document.getElementById('divBookMark').style.visibility = 'visible';
	isSetupBookMark = true;
	timerID_bookMarkSelect = setTimeout('hideBookMark()', 10000);
	return;
}

/*********************************************************************/
/* Function: saveBookMark                                            */
/* Description: 存储书签，即存储当前播放的时间点                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-07                                 */
/*********************************************************************/
var tempRequestStr; //临时变量
function saveBookMark()
{
	var hh = doubleDigit(parseInt(currentTimeBookMark/3600));
	var mm = doubleDigit(parseInt((currentTimeBookMark%3600)/60));
	var ss = doubleDigit(currentTimeBookMark%60);
	var timeStr = ''+hh+mm+ss;
	tempRequestStr = timeStr+'|'+scanFileName+'|';
	isBookMarkSelece = false;
	isSetupBookMark = false;
	setTimeout("makeRequest('bookMark?0|'+tempRequestStr, hideBookMarkResponse)", 10);
	return;
}

/*********************************************************************/
/* Function: replayBookMark                                          */
/* Description: 发送获得书签的请求(全屏播放后按键调用)               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-25                                 */
/*********************************************************************/
var isReplayBookMark = false; //书签播放状态
function replayBookMark()
{
	if (scanFileType==1 && streamStatus==1 && !isBookMarkSelece && !isSetupBookMark && !isReplayBookMark) {
		hideAllInfo();
		isReplayBookMark = true;
		setTimeout("makeRequest('bookMark?1|000000|'+scanFileName+'|-1', getBookMark)", 10);
	}
	return;
}
///////////////////////////////////////////////////////////////////////书签处理部分结束


///////////////////////////////////////////////////////////////////////功能处理部分开始
/*********************************************************************/
/* Function: showSetupInfo                                           */
/* Description: 选择提示内容                                         */
/* Parameters: operate 操作类型，1:段操作 2:音轨 3:字幕 4:制式       */
/* Parameters: parameter 是否为分段视频  是否有音轨  是否有字幕      */
/* Author&Date: lixudong  2009-06-06/2009-06-11                      */
/*********************************************************************/
var timerID_segmentSelect; //定时器ID，选段提示信息的控制
function showSetupInfo(operate, parameter)
{
	clearTimeout(timerID_segmentSelect);
	var showStr = '';
	if (operate==1) {
		if (parameter==-1) {
			showStr = movie_OPERATE[0];
		}
		else {
			showStr = movie_OPERATE[1]+parameter[1]+movie_OPERATE[4]+parameter[2]+movie_OPERATE[5]+parameter[0];
		}
	}
	else if (operate==2) {
		if (parameter==-1) {
			showStr = movie_OPERATE[9];
		}
		else {
			showStr = movie_OPERATE[2]+(currentTrack+1)+movie_OPERATE[4]+trackTotal+movie_OPERATE[5]+movie_OPERATE[6]+trackInfo1[currentTrack]+movie_OPERATE[7]+trackInfo2[currentTrack];
		}
	}
	else if (operate==3) {
		if (parameter==-1) {
			showStr = movie_OPERATE[9];
		}
		else {
			showStr = movie_OPERATE[3]+(currentSubtitle+1)+movie_OPERATE[4]+subtitleTotal+movie_OPERATE[5];
		}
	}
	else if (operate==4) {
		var tvSystemStr = '';
		if (currentTVSystem==0) {
			tvSystemStr='NTSC';
		}
		else if (currentTVSystem==1) {
			tvSystemStr='PAL';
		}
		else if (currentTVSystem==3) {
			tvSystemStr='480p';
		}
		else if (currentTVSystem==4) {
			tvSystemStr='576p';
		}
		else if (currentTVSystem==5) {
			tvSystemStr='720p/50Hz';
		}
		else if (currentTVSystem==6) {
			tvSystemStr='720p/60Hz';
		}
		else if (currentTVSystem==7) {
			tvSystemStr='1080i/50Hz';
		}
		else if (currentTVSystem==8) {
			tvSystemStr='1080i/60Hz';
		}
		else {
			tvSystemStr=movie_OPERATE[10];
		}
		showStr = movie_OPERATE[8]+tvSystemStr;
	}
	else if (operate==5) {
		if (parameter==-1) {
			showStr = movie_OPERATE[0];
		}
		else {
			showStr = movie_AUDIO_CHANNEL[0]+movie_AUDIO_CHANNEL[currentChannel+1];
		}
	}
	else {
		return;
	}
	document.getElementById('setupInfo').innerHTML = showStr;
	document.getElementById('divSetupInfo').style.visibility = 'visible';
	timerID_segmentSelect = setTimeout('hideSetupInfo()', 4000);
	return;
}

/*********************************************************************/
/* Function: hideSetupInfo                                           */
/* Description: 隐藏divSetupInfo容器                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-06                                 */
/*********************************************************************/
function hideSetupInfo()
{
	clearTimeout(timerID_segmentSelect);
	document.getElementById('divSetupInfo').style.visibility = 'hidden';
	document.getElementById('setupInfo').innerHTML = '';
	return;
}

/*********************************************************************/
/* Function: showPlayPause                                           */
/* Description: 显示播放/暂停/快进/快退后的状态                      */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-20                                 */
/*********************************************************************/
function showPlayPause()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==0) {
			streamStatus = 1;
			streamFastSpeed = 1;
			hidePlayStatus();
			showSetupInfo(1, -1);
			return;
		}
		if (streamStatus==2) {
			var parameter = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue.split('|');
			currentTimeSeek = parseInt(parameter[0]);
			totalTimeSeek = parseInt(parameter[1]);
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyForward                                              */
/* Description: 快进快退操作函数                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-24                                 */
/*********************************************************************/
function FastForward()
{
	var tempSpeed = (streamStatus==4||streamFastSpeed>=64)? 2 : streamFastSpeed*2;
	var requestStatus = makeRequest('fast?'+tempSpeed, showPlayPause);
	if (requestStatus) {
		streamFastSpeed = tempSpeed;
		streamStatus = 3;
		showPlayStatus();
	}
	return;
}

/*********************************************************************/
/* Function: FastRewind                                              */
/* Description: 快退操作函数                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-24                                 */
/*********************************************************************/
function FastRewind()
{
	var tempSpeed = (streamStatus==3||streamFastSpeed>=64)? 2 : streamFastSpeed*2;
	var requestStatus = makeRequest('rewind?'+tempSpeed, showPlayPause);
	if (requestStatus) {
		streamFastSpeed = tempSpeed;
		streamStatus = 4;
		showPlayStatus();
	}
	return;
}

/*********************************************************************/
/* Function: backOperate                                             */
/* Description: 返回处理                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-24                                 */
/*********************************************************************/
function backOperate()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		fileListShow();
		if (isStreamError) {
			document.getElementById('fileError').style.visibility = 'hidden';
			isStreamError = false;
			return;
		}
		if (isNoContent) {
			isNoContent = false;
			document.getElementById('fileError').style.visibility = 'hidden';
			document.getElementById('fileError').innerHTML = '';
		}
		document.getElementById('processBar').style.width = '1px';
		currentTime = 0;
		totalTime = 0;
		hideBookMark();
		hideNoBookMark();
		//miniScreenPlay();
		currentTrack = 0;
		streamStatus = 0;
		streamFastSpeed = 1;
		hidePlayStatus(); //隐藏播放状态提示
		hideProcess(); //隐藏进度条
		hideSetupInfo(); //隐藏设置信息
		hideAllInfo(); //隐藏信息窗
		hideVolume(); //隐藏音量条
	}
	return;
}
///////////////////////////////////////////////////////////////////////功能处理部分结束
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////电影结束




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////音乐开始
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////功能处理部分开始
/*********************************************************************/
/* Function: musicInfoGet                                            */
/* Description: 显示播放文件的信息及播放状态                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-07                                 */
/*********************************************************************/
var wordTime = new Array(); //歌词时间
var wordText = new Array(); //歌词文本
var wordTotal = 0; //歌词文件的总行数
var wordIndex = 0; //歌词文件的当前行数
var wordShowMode = 1; //是否显示歌词 0 否， 1 是
function musicInfoGet()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		wordIndex = 0;
		//获得歌词信息
		var responseXMLHead = httpRequest.responseXML.getElementsByTagName('line');
		wordTotal = responseXMLHead.length;
		if (wordTotal!=0) {
			//获得歌词全部信息(拆分重复歌词)
			var tempStr, flagStr, pos_end, pos_begin, counter=0, serial=0, newStr=new Array();
			for (var i=0; i<wordTotal; i++) {
				tempStr = responseXMLHead.item(i).childNodes[0].nodeValue;
				for (var j=0; j<5; j++) {
					pos_end = tempStr.lastIndexOf(']');
					pos_begin = tempStr.lastIndexOf('[');
					if (pos_begin==-1) {
						break;
					}
					else {
						newStr[counter] = tempStr.substring(pos_begin);
						tempStr = tempStr.substring(0, pos_begin)+tempStr.substring(pos_end+1);
						counter++;
					}
				}
			}
			newStr.sort();
			//获得歌词全部信息(剔除非标准部分)
			for (var i=0; i<counter; i++) {
				tempStr = newStr[i];
				flagStr = tempStr.charAt(0)+tempStr.charAt(3)+tempStr.charAt(6)+tempStr.charAt(9);
				if(flagStr=='[:.]' && tempStr.substring(10)!='') {
					wordTime[serial] = tempStr.substring(1, 6);
					wordText[serial] = tempStr.substring(10);
					serial++;
				}
			}
			wordTotal = serial;
		}
		if (wordTotal==0 || wordShowMode==0) {
			//显示文件信息
			document.getElementById('divWord').style.visibility = 'hidden';
			document.getElementById('musicFileInfo').style.visibility = 'visible';
			musicInfoShow();
			wordTime = new Array();
			wordText = new Array();
			document.getElementById('divWord1').innerHTML = '';
			document.getElementById('divWord2').innerHTML = '';
		}
		else {
			//显示歌词信息
			document.getElementById('divWord').style.visibility = 'visible';
			document.getElementById('musicFileInfo').style.visibility = 'hidden';
			showWordInfoDiv();
		}
		//显示播放状态和进度条
		musicPlayIconShow();
		musicShowProcess();
	}
	return;
}

/*********************************************************************/
/* Function: musicInfoShow                                           */
/* Description: 显示文件信息                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-26                                 */
/*********************************************************************/
function musicInfoShow()
{
	//获得大小字符串
	var sizeStr = changeDataUnit(scanFileSize);
	//获得时间值
	var dateStr = changeTimeFormat(scanFileTime);
	//获得类型
	var typeStr = scanFileExtend.toUpperCase();
	//显示文件夹信息
	var showStr = ''
	showStr += file_FILE_INFO[5]+file_FILE_INFO[0]+typeStr+'<br>';
	showStr += file_FILE_INFO[5]+file_FILE_INFO[1]+sizeStr+'<br>';
	showStr += file_FILE_INFO[6]+file_FILE_INFO[2]+dateStr[0]+'<br>';
	showStr += file_FILE_INFO[6]+file_FILE_INFO[3]+dateStr[1]+'<br>';
	showStr += file_FILE_INFO[5]+file_FILE_INFO[4]+scanFileShowName;
	document.getElementById('musicFileInfo').innerHTML = showStr;
	return;
}

/*********************************************************************/
/* Function: showWordInfoDiv                                         */
/* Description: 显示歌词信息                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-07                                 */
/*********************************************************************/
function showWordInfoDiv()
{
	var showStr = '';
	if (wordIndex>=(wordTotal-1)) {
		showStr = '';
	}
	else if (wordIndex>=(wordTotal-2)) {
		showStr = wordText[wordIndex+1];
	}
	else if (wordIndex>=(wordTotal-3)) {
		showStr = wordText[wordIndex+1]+'<br>'+wordText[wordIndex+2];
	}
	else if (wordIndex>=(wordTotal-4)) {
		showStr = wordText[wordIndex+1]+'<br>'+wordText[wordIndex+2]+'<br>'+wordText[wordIndex+3];
	}
	else if (wordIndex>=(wordTotal-5)) {
		showStr = wordText[wordIndex+1]+'<br>'+wordText[wordIndex+2]+'<br>'+wordText[wordIndex+3]+'<br>'+wordText[wordIndex+4];
	}
	else if (wordIndex>=(wordTotal-6)) {
		showStr = wordText[wordIndex+1]+'<br>'+wordText[wordIndex+2]+'<br>'+wordText[wordIndex+3]+'<br>'+wordText[wordIndex+4]+'<br>'+wordText[wordIndex+5];
	}
	else if (wordIndex>=(wordTotal-7)) {
		showStr = wordText[wordIndex+1]+'<br>'+wordText[wordIndex+2]+'<br>'+wordText[wordIndex+3]+'<br>'+wordText[wordIndex+4]+'<br>'+wordText[wordIndex+5]+'<br>'+wordText[wordIndex+6];
	}
	else if (wordIndex>=(wordTotal-8)) {
		showStr = wordText[wordIndex+1]+'<br>'+wordText[wordIndex+2]+'<br>'+wordText[wordIndex+3]+'<br>'+wordText[wordIndex+4]+'<br>'+wordText[wordIndex+5]+'<br>'+wordText[wordIndex+6]+'<br>'+wordText[wordIndex+7];
	}
	else if (wordIndex>=(wordTotal-9)) {
		showStr = wordText[wordIndex+1]+'<br>'+wordText[wordIndex+2]+'<br>'+wordText[wordIndex+3]+'<br>'+wordText[wordIndex+4]+'<br>'+wordText[wordIndex+5]+'<br>'+wordText[wordIndex+6]+'<br>'+wordText[wordIndex+7]+'<br>'+wordText[wordIndex+8];
	}
	else {
		showStr = wordText[wordIndex+1]+'<br>'+wordText[wordIndex+2]+'<br>'+wordText[wordIndex+3]+'<br>'+wordText[wordIndex+4]+'<br>'+wordText[wordIndex+5]+'<br>'+wordText[wordIndex+6]+'<br>'+wordText[wordIndex+7]+'<br>'+wordText[wordIndex+8]+'<br>'+wordText[wordIndex+9];
	}
	document.getElementById('divWord1').innerHTML = wordText[wordIndex];
	document.getElementById('divWord2').innerHTML = showStr;
	return;
}

/*********************************************************************/
/* Function: getWordIndex                                            */
/* Description: 显示进度条相关的信息，包括进度条长度、播放时间       */
/* Parameters: timeStr: 音乐的当前播放时间，格式为01:45的字符串      */
/* Author&Date: lixudong  2010-01-08                                 */
/*********************************************************************/
function getWordIndex(timeStr)
{
	if (wordTotal==0) {
		return;
	}
	if (timeStr>=wordTime[wordIndex+1]) {
		wordIndex++;
		if (timeStr>=wordTime[wordIndex+1]) {
			wordIndex++;
		}
		showWordInfoDiv();
	}
	return;
}

/*********************************************************************/
/* Function: musicPlayPause                                          */
/* Description: 暂停、恢复播放                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-25                                 */
/*********************************************************************/
function musicPlayPause()
{
	var requestStatus;
	if (musicPlayStatus==1) {
		requestStatus = makeRequest('pause', musicPlayIconShow);
		if (requestStatus) {
			musicPlayStatus = 2;
		}
	}
	else if (musicPlayStatus==2) {
		requestStatus = makeRequest('resume', musicPlayIconShow);
		if (requestStatus) {
			musicPlayStatus = 1;
		}
	}
	return;
}

/*********************************************************************/
/* Function: musicPlayIconShow                                       */
/* Description: 显示播放状态图标                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-25                                 */
/*********************************************************************/
var musicPlayStatus = 0; //记录当前播放状态，0:停止 1:播放 2:暂停
function musicPlayIconShow()
{
	var imgURL = '';
	if (musicPlayStatus==0) {
		imgURL = 'image/player/musicStop.png';
	}
	else if (musicPlayStatus==1) {
		imgURL = 'image/player/musicPlay.png';
	}
	else if (musicPlayStatus==2) {
		imgURL = 'image/player/musicPause.png';
	}
	else {
		imgURL = 'style1/null.png';
	}
	document.getElementById('musicPlayStatus').src = imgURL;
	return;
}
///////////////////////////////////////////////////////////////////////功能处理部分结束


///////////////////////////////////////////////////////////////////////进度条处理部分开始
/*********************************************************************/
/* Function: musicShowProcess                                        */
/* Description: 显示进度条的入口函数                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-17                                 */
/*********************************************************************/
var musicID_playProcess; //循环定时器ID，播放的进度条控制
var musicID_ProcessShow; //定时器ID，显示播放进度条
var isPlayProcessShow_music = false; //显示播放进度条的状态
var counterProcess_music = 0;
function musicShowProcess()
{
	if (isMuteStatus==1) {
		return;
	}
	if (isPlayProcessShow_music) {
		return;
	}
	clearInterval(musicID_playProcess);
	clearTimeout(musicID_ProcessShow);
	counterProcess_music = 0;
	isPlayProcessShow_music = true;
	musicGetTimeRequest();
	document.getElementById('musicProcess').style.visibility = 'visible';
	musicID_playProcess = setInterval('musicGetTimeRequest()', 1000);
	return;
}

/*********************************************************************/
/* Function: musicHideProcess                                        */
/* Description: 隐藏进度条函数                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-17                                 */
/*********************************************************************/
function musicHideProcess()
{
	clearInterval(musicID_playProcess);
	clearTimeout(musicID_ProcessShow);
	isPlayProcessShow_music = false;
	document.getElementById('musicVolumeBar').style.visibility = 'hidden';
	document.getElementById('musicVolume').style.visibility = 'hidden';
	document.getElementById('musicProcess').style.visibility = 'hidden';
	document.getElementById('musicProcessBar').style.width = '1px';
	document.getElementById('musicStreamTime').innerHTML = '00:00 / 00:00';
	document.getElementById('divWord1').innerHTML = '';
	document.getElementById('divWord2').innerHTML = '';
	document.getElementById('musicFileInfo').innerHTML = '';
	return;
}

/*********************************************************************/
/* Function: musicGetTimeRequest                                     */
/* Description: 发送获得时间的请求                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-17                                 */
/*********************************************************************/
function musicGetTimeRequest()
{
	if (musicPlayStatus!=1) {
		return;
	}
	if (counterProcess_music<=2) {
		setTimeout("makeRequest('timeall', musicGetTimeInfo)", 10);
	}
	else {
		counterProcess_music++;
		musicShowProcessInfo();
	}
	return;
}

/*********************************************************************/
/* Function: musicGetTimeInfo                                        */
/* Description: 获得视频文件的当前时间                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-17                                 */
/*********************************************************************/
var musicCurrentTime = 0; //文件的当前时间
var musicTotalTime = 0; //文件的当前时间
function musicGetTimeInfo()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var tempStr = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue;
		var param = tempStr.split('|');
		musicCurrentTime = parseInt(param[0], 10);
		musicTotalTime = parseInt(param[1], 10);
		counterProcess_music = musicCurrentTime;
		musicShowProcessInfo();
	}
	return;
}

/*********************************************************************/
/* Function: musicShowProcessInfo                                    */
/* Description: 显示进度条相关的信息，包括进度条长度、播放时间       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-17                                 */
/*********************************************************************/
function musicShowProcessInfo()
{
	musicCurrentTime = counterProcess_music;
	musicCurrentTime = (musicCurrentTime>musicTotalTime)? musicTotalTime : musicCurrentTime;
	var len = (musicTotalTime==0||musicCurrentTime==0)? 1 : parseInt(457*musicCurrentTime/musicTotalTime);
	len = (len>457)? 457 : len;
	len = (len<1)? 1 : len;
	document.getElementById('musicProcessBar').style.width = ''+len+'px';
	var mm = doubleDigit(parseInt(musicCurrentTime/60));
	var ss = doubleDigit(musicCurrentTime%60);
	var musicCurrentTimeStr = ''+mm+':'+ss;
	mm = doubleDigit(parseInt(musicTotalTime/60));
	ss = doubleDigit(musicTotalTime%60);
	var musicTotalTimeStr = ''+mm+':'+ss;
	var timeStr = musicCurrentTimeStr+' / '+musicTotalTimeStr;
	document.getElementById('musicStreamTime').innerHTML = timeStr;
	getWordIndex(musicCurrentTimeStr);
	return;
}
///////////////////////////////////////////////////////////////////////进度条处理部分结束


///////////////////////////////////////////////////////////////////////音量状态显示部分开始
/*********************************************************************/
/* Function: musicGetVolumeStatus                                    */
/* Description: 获得音量的状态，包括音量值和静音状态                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-09                                 */
/*********************************************************************/
function musicGetVolumeStatus()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var tempStr = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue;
		var parameter = tempStr.split('|');
		isMuteStatus_music = parseInt(parameter[0]);
		volumeLevel_music = parseInt(parameter[1]);
		volumeLevel_music = (volumeLevel_music%5 == 0) ? volumeLevel_music : (5+volumeLevel_music-volumeLevel_music%5);
		if (isMuteStatus_music==1) {
			musicShowVolume();
		}
	}
	return;
}

/*********************************************************************/
/* Function: musicVolumeControl                                      */
/* Description: 音量控制操作                                         */
/* Parameters: operate 操作类型，1:音量加 2:音量减 3:静音/非静音     */
/* Author&Date: lixudong  2010-01-25                                 */
/*********************************************************************/
var volumeOperate_music = 0; //指示音量操作类型，0:未知操作 1:音量加 2:音量减 3:静音/非静音
var isMuteStatus_music = 0; //记录静音状态，0:非静音，1:静音
var volumeLevel_music = 100; //音量值
function musicVolumeControl(operate)
{
	if (operate<1||operate>3) {
		return;
	}
	volumeOperate_music = operate;
//	musicHideProcess();
//	document.getElementById('musicProcess').style.visibility = 'hidden';
	musicVolumeOperateSelece();
	return;
}

/*********************************************************************/
/* Function: musicVolumeOperateSelece                                */
/* Description: 不同音量状态下的相关处理                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-09                                 */
/*********************************************************************/
function musicVolumeOperateSelece()
{
	var requestStatus;
	if (volumeOperate_music==1||volumeOperate_music==2) {
		if (isMuteStatus_music==1) {
			requestStatus = makeRequest('volume?0', nullFun);
			if (requestStatus) {
				isMuteStatus_music = 0;
			}
			else {
				return;
			}
		}
		else {
			var tempLevel = (volumeOperate_music==1)? (volumeLevel_music+5) : (volumeLevel_music-5);
			tempLevel = (tempLevel>=100)? 100 : tempLevel;
			tempLevel = (tempLevel<=0)? 0 : tempLevel;
			requestStatus = makeRequest('volume?3|'+tempLevel, nullFun);
			if (requestStatus) {
				volumeLevel_music = tempLevel
			}
			else {
				return;
			}
		}
	}
	else if (volumeOperate_music==3) {
		var tempMuteStatus = (isMuteStatus_music==0)? 1 : 0;
		requestStatus = makeRequest('volume?'+tempMuteStatus, nullFun);
		if (requestStatus) {
			isMuteStatus_music = tempMuteStatus;
		}
		else {
			return;
		}
	}
	musicShowVolume();
	return;
}

/*********************************************************************/
/* Function: musicShowVolume                                         */
/* Description: 显示音量条                                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-17                                 */
/*********************************************************************/
var musicID_Volume; //定时器ID，音量条的显示控制
function musicShowVolume()
{
	var imgURL = '';
	if (isMuteStatus_music==1) {
		muteURL = 'url(image/player/mute.png)';
		volumeURL = 'url(image/player/musicVolumeOff.png)';
	}
	else {
		muteURL = 'url(image/player/muteOff.png)';
		volumeURL = 'url(image/player/musicVolume.png)';
	}
	var len = (457*volumeLevel_music)/100;
	len = (len<=1)? 1 : len;
	len = (len>=457)? 457 : len;
	var showStr = ''+volumeLevel_music+' / 100';
	document.getElementById('musicMuteIcon').style.backgroundImage = muteURL;
	document.getElementById('musicVolumeBar').style.backgroundImage = volumeURL;
	document.getElementById('musicVolumeBar').style.width = ''+len+'px';
	if (len==1) {
		document.getElementById('musicVolumeBar').style.visibility = 'hidden';
	}
	else {
		document.getElementById('musicVolumeBar').style.visibility = 'visible';
	}
	document.getElementById('musicVolumeLevel').innerHTML = showStr;
	document.getElementById('musicVolume').style.visibility = 'visible';
	clearTimeout(musicID_Volume);
	musicID_Volume = setTimeout("makeRequest('timeall', musicGetTimeInfo);musicHideVolume()", 4000);
	return;
}

/*********************************************************************/
/* Function: musicHideVolume                                         */
/* Description: 隐藏音量条                                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-17                                 */
/*********************************************************************/
function musicHideVolume()
{
	if (isMuteStatus_music==1) {
		return;
	}
	clearTimeout(musicID_Volume);
	document.getElementById('musicVolumeBar').style.visibility = 'hidden';
	document.getElementById('musicVolume').style.visibility = 'hidden';
//	musicShowProcess();
	return;
}
///////////////////////////////////////////////////////////////////////音量状态显示部分结束
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////音乐结束


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////图片开始
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*********************************************************************/
/* Function: imageRevolution                                         */
/* Description: 图片旋转                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-26                                 */
/*********************************************************************/
var revolutionAngle = 0; //图片旋转角度
function imageRevolution()
{
	var requestStatus = makeRequest('showPic?0|0|1280|720|path|99|90|', nullFun, 5);
	if (requestStatus) {
		revolutionAngle += 90;
		if (revolutionAngle>=360) {
			revolutionAngle = 0;
		}
		document.getElementById('photoSetupInfo').innerHTML = file_FILE_INFO[7]+file_FILE_INFO[8]+revolutionAngle+file_FILE_INFO[9];
		document.getElementById('photoSetupInfo').style.backgroundImage = 'url(image/imageRevolution.png)';
		photoShowInfoBar();
	}
	return;
}



/*********************************************************************/
/* Function: photoShowInfoBar                                        */
/* Description: 显示操作提示条                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-26                                 */
/*********************************************************************/
var photoID_infoBar; //操作提示条定时器
function photoShowInfoBar()
{
	document.getElementById('photoSetupInfo').style.visibility = 'visible';
	clearTimeout(photoID_infoBar);
	photoID_infoBar = setTimeout('photoHideInfoBar()', 3000);
	return;
}

/*********************************************************************/
/* Function: photoHideInfoBar                                        */
/* Description: 隐藏操作提示条                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-26                                 */
/*********************************************************************/
function photoHideInfoBar()
{
	clearTimeout(photoID_infoBar);
	document.getElementById('photoSetupInfo').style.visibility = 'hidden';
	return;
}


/*********************************************************************/
/* Function: photoLoadEnd                                            */
/* Description: 图片加载完毕后的处理                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-25                                 */
/*********************************************************************/
function photoLoadEnd()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		isKeyClock = false;
		photoHideInfoBar();
	}
	return;
}

/*********************************************************************/
/* Function: photoLoadBegin                                          */
/* Description: 图片加载开始后的处理                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-25                                 */
/*********************************************************************/
function photoLoadBegin()
{
	var showStr = file_FILE_INFO[10];
	document.getElementById('photoSetupInfo').innerHTML = showStr;
	document.getElementById('photoSetupInfo').style.backgroundImage = 'url(image/imageBrowser.png)';
	document.getElementById('photoSetupInfo').style.visibility = 'visible';
	isKeyClock = true;
	return;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////图片结束
