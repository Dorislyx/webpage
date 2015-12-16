/*** 电影部分 ******************************************************************/
var SETUP_SubtitleDefault = 0; //字幕语言(0:chinese, 1:english)                 /
var SETUP_Subtitlefirst = 0; //字幕首选语言(0:chinese, 1:english)               /
var SETUP_SubtitleSize = 1; //字幕大小(0:小, 1:中, 2:大)                        /
var SETUP_SubtitleColor = 1; //字幕颜色(0:黑, 1:白, 2:蓝)                       /
var SETUP_SubtitlePosition = 0; //字幕位置(0:下, 1:上)                          /
var SETUP_AspectRatio = 0; //视频大小(0表示4:3, 1表示16:9)                      /
var SETUP_AutoPlayMode = 1; //自动连续播放(0:否, 1:是)                          /
/*******************************************************************************/

///////////////////////////////////////////////////////////////////////按键处理部分开始
/*********************************************************************/
/* Function: keyEvent                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
var isKeyClock = false; //遥控器按键锁定，用于播放请求处理过程中屏蔽遥控器按键
var isDoesnotItem = false; //无可用硬盘或服务器的状态
var isFullScreen = false; //全屏播放方式状态
var isPageUpDown = false; //是否选择上一段或下一段
var isStreamError = false; //播放码流错误
var isUsbRemove = false;
function keyEvent(e)
{
	var keyValue = e.which;
	iPanel.ioctlWrite('printf', 'keyValue===================='+keyValue+'\n');
	//移动设备插拔的处理
	if (keyValue>=0xff20 && keyValue<=0xff34) {
		if (keyValue>=0xff31) {
			if ((keyValue-0xff30)==serverIndex) {
				isUsbRemove = true;
			}
		}
		showUSBInfo(keyValue);
		return;
	}
	if (isDoesnotItem) {
		if (keyValue==8) {
			keyBack();
		}
		return (false);
	}
	if (isStreamError) {
		if (keyValue>=0xff00) {
			return;
		}
		if (keyValue==8) {
			keyBack();
		}
		else if (keyValue==13) {
			document.getElementById('fileError2').style.visibility = 'hidden';
		}
		else {
			showSetupInfo(1, -1);
		}
		return (false);
	}
	if (isKeyClock && keyValue<0xff00) {
		return (false);
	}
	if (isSeekInputOk && isSeekInput) {
		seekKeyEvent(keyValue);
		return (false);
	}
	if (isMiniMenu) {
		keyMiniMenu(keyValue);
		return (false);
	}
	switch (keyValue) {
		case 8: //back(停止)
			keyBack();
			return (false);
			break;
		case 13: //Enter
			keyEnter();
			return (false);
			break;
		case 37: //left(快退)
			keyLeft();
			return (false);
			break;
		case 38: //up
			keyUp();
			return (false);
			break;
		case 39: //right(快进)
			keyRight();
			return (false);
			break;
		case 40: //down
			keyDown();
			return (false);
			break;
		case 33: //pageup(上页)
			keyPageUp();
			return (false);
			break;
		case 34: //pagedown(下页)
			keyPageDown();
			return (false);
			break;

		case 257: //channel+(频道+)
			if (isFullScreen) {
				isPageUpDown = true;
				segmentNextPlay();
			}
			//keyChannelUp();
			break;
		case 258: //channel-(频道-)
			if (isFullScreen) {
				isPageUpDown = true;
				segmentPreviousPlay();
			}
			//keyChannelDown();
			break;

		case 275: //红键
			//keyRed();
			break;
		case 276: //绿键
			//keyGreen();
			break;
		case 277: //黄键
			//keyYellow();
			break;
		case 278: //蓝键(信息)
			//keyBlue();
			break;
		case 519:	//设置
			makeRequest('winplay', gotoSettingsPage, 0);
			return false;

		case 263: //play/pause(播放/暂停)
			keyPlayPause();
			break;
		case 259: //volume+(音量+)
			keyVolumeUP();
			break;
		case 260: //volume-(音量-)
			keyVolumeDown();
			break;
		case 261: //mute(静音)
			keyVolumeMute();
			break;
		case 262: //track(声道)
			//keyTrack();
			changeTrack();
			break;
		case 66340:	//长按声道键
			changeAudioChannel();
			break;

		case 56: //切换
			if (isFullScreen) {
				changeTVSystem();
			}
			else {
				miniMenuOpen();
			}
			break;
		case 284: //帮助
			//keyHelp();
			replayBookMark();
			break;
		case 1292: //字幕
			//keySubtitle();
			changeSubtitle();
			break;
		case 271: //定位
			keySeek();
			break;
		case 281: //收藏
			//keyFavorite();
			setupBookMarkRequest();
			break;

		case 0xff01: //播放到尾(buffer读完，解码器仍然解码)
			isPageUpDown = false;
			break;
		case 0xff02: //播放到尾(解码器停止)
			if (isUsbRemove) {
				return;
			}
			if (isFullScreen && !isPageUpDown) {
				showWebPageRequest();
			}
			break;
		//case 0xff0b: //播放下一段
		case 0xff03: //播放下一段
			if (SETUP_AutoPlayMode==1) {
				segmentAutoPlay();
			}
			break;
		case 0xff04: //播放开始
			hideBookMark();
			//setTimeout("makeRequest('bookMark?1|000000|'+fileRealName[fileIndex%8]+'|-1', getBookMark, 0)", 10);
			streamStatus = 1;
			streamFastSpeed = 1;
			hideProcess();
			document.getElementById('divPlayStatus').style.visibility = 'hidden';
			document.getElementById('playStatusIcon').src = 'image/player/play.png';
			break;
		case 0xff05: //播放到头(快退到第一段的开头; 文件的开头, 不发0xff04)
			setTimeout("makeRequest('seek?0', nullFun)", 10);
			streamStatus = 1;
			streamFastSpeed = 1;
			showPlayerIcon();
			break;
		case 0xff06: //码流错误
			if (isUsbRemove) {
				return;
			}
			isDoesnotItem = true;
			document.getElementById('fileError2').innerHTML = movie_FILE_ERROR[0]+movie_FILE_ERROR[4];
			document.getElementById('fileError2').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/pSelect.png)';
			document.getElementById('fileError2').style.visibility = 'visible';
			break;
		case 0xff07: //文件音频不支持
			isStreamError = true;
			document.getElementById('fileError2').innerHTML = movie_FILE_ERROR[1]+movie_FILE_ERROR[5];
			document.getElementById('fileError2').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/pSelect.png)';
			document.getElementById('fileError2').style.visibility = 'visible';
			break;
		//case 51: //3
		case 0xff08: //文件视频不支持
			isStreamError = true;
			document.getElementById('fileError2').innerHTML = movie_FILE_ERROR[2]+movie_FILE_ERROR[5];
			document.getElementById('fileError2').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/pSelect.png)';
			document.getElementById('fileError2').style.visibility = 'visible';
			break;
		//case 52: //4
		case 0xff09: //文件音频、视频均不支持
			isDoesnotItem = true;
			document.getElementById('fileError2').innerHTML = movie_FILE_ERROR[3]+movie_FILE_ERROR[4];
			document.getElementById('fileError2').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/pSelect.png)';
			document.getElementById('fileError2').style.visibility = 'visible';
			break;

		default:
			return (-1);
			break;
	}
	return;
}

/*********************************************************************/
/* Function: keyCode                                                */
/* Description: 华为（黑色）遥控器按键处理函数                           */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-01-28                                */
/*********************************************************************/
function keyCode(e)
{
	var keyValue = e.which;
	iPanel.ioctlWrite('printf', 'keyValue========huawei=========='+keyValue+'\n');
	if (keyValue>=0xff20 && keyValue<=0xff34) {
		if (keyValue>=0xff31) {
			if ((keyValue-0xff30)==serverIndex) {
				isUsbRemove = true;
			}
		}
		showUSBInfo(keyValue);
		return;
	}
	if (isDoesnotItem) {
		if (keyValue==8) {
			keyBack();
		} 
		return false;
	}
	if (isStreamError) {
		if (keyValue>=0xff00) {
			return;
		}
		if (keyValue==8) {
			keyBack();
		}
		else if (keyValue==13) {
			document.getElementById('fileError2').style.visibility = 'hidden';
		}
		else {
			showSetupInfo(1, -1);
		}
		return false;
	}
	if (isKeyClock && keyValue<=0xff01) {
		return false;
	}
	if (isSeekInputOk && isSeekInput) {
		seekKeyEvent(keyValue);
		return false;
	}
	if (isMiniMenu) {
		keyMiniMenu(keyValue);
		return (false);
	}
	switch (keyValue) {
		case 8: //back(停止)
			keyBack();
			return false;
		case 13: //Enter
			keyEnter();
			return (false);
			break;
		case 37: //left(快退)
			keyLeftCode();
			return false;
			break;
		case 38: //up
			keyUp();
			return false;
			break;
		case 39: //right(快进)
			keyRightCode();
			return false;
			break;
		case 40: //down
			keyDown();
			return false;
			break;
		case 33: //pageup(上页)
			keyPageUp();
			return false;
		case 34: //pagedown(下页)
			keyPageDown();
			return false;
		case 0x108:		//快进
			playerForward();
			break;
		case 0x109:		//快退
			playerBackward();
			break;

		case 275: //红键
			//keyRed();
			return false;
		case 276: //绿键
			//keyGreen();
			return false;
		case 277: //黄键
			//keyYellow();
			return false;
		case 278: //蓝键(信息)
		case 0x116:
			//keyBlue();
			return false;

		case 263: //play/pause(播放/暂停)
			keyPlayPause();
			return false;
		case 259: //volume+(音量+)
			keyVolumeUP();
			return false;
		case 260: //volume-(音量-)
			keyVolumeDown();
			return false;
		case 261: //mute(静音)
			keyVolumeMute();
			return false;
		case 262: //track(声道)
			changeTrack();
			return false;

		case 519:	//设置
			makeRequest('winplay', gotoSettingsPage, 0);
			return false;
		case 56: //切换
			if (isFullScreen) {
				changeTVSystem();
			}
			else {
				miniMenuOpen();
			}
			return false;
		case 0xff01: //播放到尾(buffer读完，解码器仍然解码)
			isPageUpDown = false;
			break;
		case 0xff02: //播放到尾(解码器停止)
			if (isUsbRemove) {
				return;
			}
			if (isFullScreen && !isPageUpDown) {
				showWebPageRequest();
			}
			break;
		//case 0xff0b: //播放下一段
		case 0xff03: //播放下一段
			if (SETUP_AutoPlayMode==1) {
				segmentAutoPlay();
			}
			break;
		case 0xff04: //播放开始
			hideBookMark();
			//setTimeout("makeRequest('bookMark?1|000000|'+fileRealName[fileIndex%8]+'|-1', getBookMark, 0)", 10);
			streamStatus = 1;
			streamFastSpeed = 1;
			hideProcess();
			document.getElementById('divPlayStatus').style.visibility = 'hidden';
			document.getElementById('playStatusIcon').src = 'image/player/play.png';
			break;
		case 0xff05: //播放到头(快退到第一段的开头; 文件的开头, 不发0xff04)
			setTimeout("makeRequest('seek?0', nullFun)", 10);
			streamStatus = 1;
			streamFastSpeed = 1;
			showPlayerIcon();
			break;
		case 0xff06: //码流错误
			if (isUsbRemove) {
				return;
			}
			isDoesnotItem = true;
			document.getElementById('fileError2').innerHTML = movie_FILE_ERROR[0]+movie_FILE_ERROR[4];
			document.getElementById('fileError2').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/pSelect.png)';
			document.getElementById('fileError2').style.visibility = 'visible';
			break;
		case 0xff07: //文件音频不支持
			isStreamError = true;
			document.getElementById('fileError2').innerHTML = movie_FILE_ERROR[1]+movie_FILE_ERROR[5];
			document.getElementById('fileError2').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/pSelect.png)';
			document.getElementById('fileError2').style.visibility = 'visible';
			break;
		case 0xff08: //文件视频不支持
			isStreamError = true;
			document.getElementById('fileError2').innerHTML = movie_FILE_ERROR[2]+movie_FILE_ERROR[5];
			document.getElementById('fileError2').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/pSelect.png)';
			document.getElementById('fileError2').style.visibility = 'visible';
			break;
		case 0xff09: //文件音频、视频均不支持
			isDoesnotItem = true;
			document.getElementById('fileError2').innerHTML = movie_FILE_ERROR[3]+movie_FILE_ERROR[4];
			document.getElementById('fileError2').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/pSelect.png)';
			document.getElementById('fileError2').style.visibility = 'visible';
			break;

		default:
			return (-1);
			break;
	}
	return;
}

/*********************************************************************/
/* Function: gotoSettingsPage                                       */
/* Description: 进入设置页面				                              */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-01-28                              */
/*********************************************************************/
function gotoSettingsPage()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		document.location.href = 'file:////settings/land.html';
	}
}

/*********************************************************************/
/* Function: keySeek                                                 */
/* Description: keySeek 按键处理函数                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function keySeek()
{
	//if (!isFullScreen || serverIndex==3 || streamStatus==0) {
	if (!isFullScreen || streamStatus==0) {
		return;
	}
	if (streamStatus==1) {
		showSeekInput();
		//playerPlayPause();
	}
	return;
}

/*********************************************************************/
/* Function: keyPlayPause                                            */
/* Description: keyPlayPause 按键处理函数                            */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-04-15                                 */
/*********************************************************************/
function keyPlayPause()
{
	//if (serverIndex==3 || streamStatus==0) {
	if (streamStatus==0) {
		return;
	}
	if (!isFullScreen) {
		channelSelect();
	}
	else {
		playerPlayPause();
	}
	return;
}

/*********************************************************************/
/* Function: keyLeft                                                 */
/* Description: keyLeft 按键处理函数                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function keyLeft()
{
	if (!isFullScreen || streamStatus==0) {
		return;
	}
	if (isAllInfoShow) {
		allInfoPrevious();
		return;
	}
	if (streamStatus==2) {
		if (!isSeekSelect) {
			hideProcess();
		}
		seekSelect(0);
	}
	else {
		playerBackward();
	}
	return;
}

/*********************************************************************/
/* Function: keyLeftCode                                             */
/* Description: keyLeftCode 按键处理函数                              */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-5-12                                */
/*********************************************************************/
function keyLeftCode()
{
	if (!isFullScreen || streamStatus==0) {
		return;
	}
	if (isAllInfoShow) {
		allInfoPrevious();
		return;
	}
	if (streamStatus==2) {
		if (!isSeekSelect) {
			hideProcess();
		}
		seekSelect(0);
	}
	if (isFullScreen && streamStatus==1) {
		volumeControl(2);
	}
	return;
}

/*********************************************************************/
/* Function: keyRight                                                */
/* Description: keyRight 按键处理函数                                */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function keyRight()
{
	if (!isFullScreen || streamStatus==0) {
		return;
	}
	if (isAllInfoShow) {
		allInfoNext();
		return;
	}
	if (streamStatus==2) {
		if (!isSeekSelect) {
			hideProcess();
		}
		seekSelect(1);
	}
	else {
		playerForward();
	}
	return;
}

/*********************************************************************/
/* Function: keyRightCode                                            */
/* Description: keyRightCode 按键处理函数                              */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-5-12                                */
/*********************************************************************/
function keyRightCode()
{
	if (!isFullScreen || streamStatus==0) {
		return;
	}
	if (isAllInfoShow) {
		allInfoNext();
		return;
	}
	if (streamStatus==2) {
		if (!isSeekSelect) {
			hideProcess();
		}
		seekSelect(1);
	}
	if (isFullScreen && streamStatus==1) {
		volumeControl(1);
	}
	return;
}

/*********************************************************************/
/* Function: keyUp                                                   */
/* Description: keyUp 按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function keyUp()
{
	if (!isFullScreen) {
		channelPrevious();
		return;
	}
	return;
}

/*********************************************************************/
/* Function: keyDown                                                 */
/* Description: keyDown 按键处理函数                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function keyDown()
{
	if (!isFullScreen) {
		channelNext();
		return;
	}
	return;
}

/*********************************************************************/
/* Function: keyPageDown                                             */
/* Description: keyPageDown 按键处理函数                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function keyPageDown()
{
	if (!isFullScreen) {
		channelPageNext();
	}
	else {
		isPageUpDown = true;
		segmentNextPlay();
	}
	return;
}

/*********************************************************************/
/* Function: keyPageUp                                               */
/* Description: keyPageUp 按键处理函数                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function keyPageUp()
{
	if (!isFullScreen) {
		channelPagePrevious();
	}
	else {
		isPageUpDown = true;
		segmentPreviousPlay();
	}
	return;
}

/*********************************************************************/
/* Function: keyEnter                                                */
/* Description: keyEnter 按键处理函数                                */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function keyEnter()
{
	if (!isFullScreen) {
		channelSelect();
		return;
	}
	if (isStreamError) {
		document.getElementById('fileError2').style.visibility = 'hidden';
		isStreamError = false;
		return;
	}
	if (isAllInfoShow) {
		allInfoSelect();
		return;
	}
	if (streamStatus==2) {
		seekPlay();
	}
	else if (streamStatus==3 || streamStatus==4) {
		keyPlayPause();
	}
	return;
}

/*********************************************************************/
/* Function: keyBack                                                 */
/* Description: keyBack 按键处理函数                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function keyBack()
{
/*	isPageUpDown = true;
	if (!isFullScreen) {
		channelBack();
	}
	else {
		isKeyClock = true;
		setTimeout("makeRequest('winplay', showWebPageRequest, 0)", 10);
	}
*/	
	makeRequest('winplay', backUpHtml, 0);
	return;
}

function backUpHtml() {
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		document.location.href = backURL;
	}
	return;
}

/*********************************************************************/
/* Function: keyRed                                                  */
/* Description: keyRed 红色按键处理函数(确认操作)                    */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function keyRed()
{
	if (!isFullScreen) {
		return;
	}
	if (isSeleceBookMark) {
		bookMarkPlay();
		return;
	}
	if (isSetupBookMark) {
		saveBookMark();
		return;
	}
	return;
}

/*********************************************************************/
/* Function: keyGreen                                                */
/* Description: keyGreen 绿色按键处理函数(取消操作)                  */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function keyGreen()
{
	if (!isFullScreen) {
		return;
	}
	if (isSeleceBookMark||isSetupBookMark) {
		hideBookMark();
		return;
	}
	return;
}

/*********************************************************************/
/* Function: keyYellow                                               */
/* Description: keyYellow 黄色按键处理函数(设置书签)                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function keyYellow()
{
	if (!isFullScreen) {
		return;
	}
	if (isSeleceBookMark) {
		setBookMarkTime = 0;
		saveBookMark();
	}
	return;
}

/*********************************************************************/
/* Function: keyBlue                                                 */
/* Description: keyBlue 蓝色按键处理函数                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function keyBlue()
{
	if (!isFullScreen || streamStatus!=1) {
		return;
	}
	if (isSeleceBookMark || isSetupBookMark || isReplayBookMark) {
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
	return;
}

/*********************************************************************/
/* Function: keyVolumeUP                                             */
/* Description: keyVolumeUP 按键处理函数                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function keyVolumeUP()
{
	if (isFullScreen && streamStatus==1) {
		volumeControl(1);
	}
	return;
}

/*********************************************************************/
/* Function: keyVolumeDown                                           */
/* Description: keyVolumeDown 按键处理函数                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function keyVolumeDown()
{
	if (isFullScreen && streamStatus==1) {
		volumeControl(2);
	}
	return;
}

/*********************************************************************/
/* Function: keyVolumeMute                                           */
/* Description: keyVolumeMute 按键处理函数                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function keyVolumeMute()
{
	if (isFullScreen && streamStatus==1) {
		volumeControl(3);
	}
	return;
}
///////////////////////////////////////////////////////////////////////按键处理部分结束


///////////////////////////////////////////////////////////////////////初始化部分开始
/*********************************************************************/
/* Function: getConfig                                               */
/* Description: 发送'获得所有参数'的请求                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-04-02                                 */
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
/* Author&Date: lixudong 2010-04-02                                  */
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
		webStyleSet();
		getRTypeRequest();
	}
	return;
}

/*********************************************************************/
/* Function: getRTypeRequest                                         */
/* Description: 获得使用遥控器的类型							         */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-01-28                               */
/*********************************************************************/
function getRTypeRequest()
{
	makeRequest('getRType', getRTypeResponse, 1);
}

/*********************************************************************/
/* Function: getRTypeResponse                                         */
/* Description: 根据使用遥控器的类型选择函数					         */
/* Parameters:  0是上海，1是华为                                       */
/* Author&Date: zhaopengjun 2010-01-28                               */
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
/* Function: webStyleSet                                             */
/* Description: 设置每页显示的项目个数                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-04-01                                 */
/*********************************************************************/
var messageBg = new Image();
var messageTextBg = new Image();
var bookMarkBg = new Image();
function webStyleSet()
{
	messageBg.src = 'image/skin'+SETUP_SkinIndex+'/miniMenu2.png';
	messageTextBg.src = 'image/skin'+SETUP_SkinIndex+'/miniMenu3.png';
	bookMarkBg.src = 'image/skin'+SETUP_SkinIndex+'/pSelect.png';
	//MiniMenu背景图片
	document.getElementById('miniMenuBg').style.backgroundImage = messageBg.src;
	tempURL = 'url(image/menuIconFocus.png)';
	document.getElementById('divMenuFocus').style.backgroundImage = tempURL;
	document.getElementById('divBookMark').style.backgroundImage = bookMarkBg.src;
	return;
}

/*********************************************************************/
/* Function: init                                                    */
/* Description: 创建XMLHttpRequest对象；获得文件夹和文件列表         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-18                                 */
/*********************************************************************/
var zoneType = 0; //是否为DLNA服务器，取值0,1,2时，均为硬盘，取值为3时为DLNA
var queuePath = new Array(); //路径队列
var queuePathShow = new Array(); //路径队列字符串
var queuefileIndex = new Array(); //文件指针队列
var serverIndex = 0; //当前物理接口
var mediaType = ''; //当前功能选项类型(movie, music, photo, game, file)
var mediaTypeIndex = 0; //当前功能选项类型的索引号
var playURL, backURL;
function init()
{
	movie_LanguageSelect();
	//获得前一个网页传递的参数
	var tempBgURL = 'url(image/skin'+SETUP_SkinIndex+'/fileList.jpg)';
	document.getElementById('bgPicture').style.backgroundImage = tempBgURL;
	var hrefStr = document.location.href.split('?');
	playURL = hrefStr[1];
	backURL = hrefStr[0];
	var parameter = hrefStr[1].split('|');
	zoneType = parseInt(parameter[0]);
	queuePath[0] = changeCompartStr(parameter[1], '*', '/');
	if (parameter[2] == 0) {
		parameter[2] = 'Server';
	}
	queuePathShow[0] = parameter[2]+':\\';
	queuefileIndex[0] = 0;
	serverIndex = parseInt(parameter[3]);
	htmlTitle = parameter[4]+'List';
	mediaType = parameter[4];
	mediaTypeIndex = parseInt(parameter[5]);
	//显示功能选项图标
	//var tempBgURL = 'url(image/'+SETUP_Language+'/dirList'+(mediaTypeIndex+1)+'.jpg)';
	//document.getElementById('titleIcon').style.backgroundImage = tempBgURL;
	//显示全屏下的全部信息框背景图片
	//document.getElementById('divAllInfo').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/allInfo.png)';
	//显示当前路径
	//document.getElementById('diskInfo').innerHTML = queuePathShow[0];
	//发送获得文件夹和文件列表的请求
	//getFileListRequest();
	makeRequest('play?'+playURL, hideWebPageRequest, 0);
	isKeyClock = true;
	return;
}

/*********************************************************************/
/* Function: getFileListRequest                                      */
/* Description: 发送获得文件夹和文件的请求                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-19                                 */
/*********************************************************************/
function getFileListRequest()
{
	var begin = parseInt(fileIndex/8)*8+1;
	var end = begin+7;
	var pathIndex = queuePath.length-1;
	isKeyClock = true;
	var requestStr = zoneType+'|name|'+mediaType+'|'+queuePath[pathIndex]+'|'+begin+'$'+end+'';
	makeRequest('list?'+requestStr, getFileList, 4);
	return;
}

/*********************************************************************/
/* Function: getFileList                                             */
/* Description: 获得文件夹和文件列表数据                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-18                                 */
/*********************************************************************/
var fileTotal = 0; //文件夹和文件的总数
var fileReturnTotal = 0; //实际返回的文件夹和文件的总数
var fileIndex = 0; //当前文件夹或文件的索引号
var fileType = new Array(); //文件夹或文件的类型
var fileExtend = new Array(); //文件夹或文件的扩展名
var fileSize = new Array(); //文件夹或文件的大小
var fileTime = new Array(); //文件夹或文件的时间
var fileRealName = new Array(); //文件夹或文件的真实名称
var fileShowName = new Array(); //文件夹或文件的显示名称
var filePicture = new Array(); //文件夹或文件的显示图片
function getFileList()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		//无可用文件夹和文件时的处理
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==0) {
			hideFileList();
			document.getElementById('divInfo').innerHTML = movie_FILE_ERROR[6]+movie_FILE_ERROR[4];
			document.getElementById('divInfo').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/pSelect.png)';
			document.getElementById('divInfo').style.visibility = 'visible';
			isKeyClock = false;
			isDoesnotItem = true;
			return;
		}
		isDoesnotItem = false;
		document.getElementById('divInfo').style.visibility = 'hidden';
		//获得文件夹和文件的总数
		var getInfo = httpRequest.responseXML.getElementsByTagName('fileNumInfo').item(0).childNodes[0].nodeValue.split('|');
		fileTotal = getInfo[0];
		fileReturnTotal = getInfo[1];
		//获得文件夹和文件的信息
		var responseXMLHead = httpRequest.responseXML.getElementsByTagName('file');
		var parameter;
		for (var i=0; i<fileReturnTotal; i++) {
			parameter = responseXMLHead.item(i).childNodes[0].nodeValue.split('|');
			fileType[i] = parseInt(parameter[0]);
			fileExtend[i] = parameter[1].toUpperCase();
			fileSize[i] = parseFloat(parameter[2]);
			fileTime[i] = parameter[3];
			fileRealName[i] = parameter[4];
			fileShowName[i] = parameter[5];
		}
		isKeyClock = false;
		showFileList();
	}
	return;
}
///////////////////////////////////////////////////////////////////////初始化部分结束


///////////////////////////////////////////////////////////////////////功能处理部分开始
/*********************************************************************/
/* Function: showFileList                                            */
/* Description: 显示文件夹和文件列表                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-18                                 */
/*********************************************************************/
function showFileList()
{
	if (fileTotal<=0 || fileReturnTotal<=0) {
		return;
	}
	//计算当前页号和总页数
	var pageTotal = parseInt((fileTotal-1)/8);
	var pageCurrent = parseInt(fileIndex/8);
	//计算当前页列表的结束位置
	document.getElementById('itemList').style.height = 48*fileReturnTotal+6;
	//显示页码和翻页指示
	var tempPageNumber = movie_PAGE_NUMBER[0]+(pageCurrent+1)+movie_PAGE_NUMBER[1]+(pageTotal+1)+movie_PAGE_NUMBER[2];
	document.getElementById('pageNumber').innerHTML = tempPageNumber;
	var showStatus = (pageCurrent>0)? 'visible' : 'hidden';
	document.getElementById('pageUp').style.visibility = showStatus;
	showStatus = (pageCurrent<pageTotal)? 'visible' : 'hidden';
	document.getElementById('pageDown').style.visibility = showStatus;
	//显示文件夹和文件列表
	for (var i=0; i<fileReturnTotal; i++) {
		document.getElementById('iconList'+i).style.backgroundImage = 'url(image/fileIcon'+fileType[i]+'.png)';
		document.getElementById('textList'+i).innerHTML = fileShowName[i];
	}
	document.getElementById('divPicture').style.visibility = 'visible';
	getPictureRequest();
	return;
}

/*********************************************************************/
/* Function: getPictureRequest                                       */
/* Description: 发送获得图片(海报、缩略图)的请求                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-19                                 */
/*********************************************************************/
function getPictureRequest()
{
	var pos = fileIndex%8;
	filePicture[pos] = 'image/defaultIcon'+fileType[pos]+'.jpg';
	if (fileType[pos]==1 || fileType[pos]==3) {
		//isKeyClock = true;
		//setTimeout("makeRequest('getPictur?0|'+filePicture[fileIndex%8]+'|'+fileRealName[fileIndex%8], getPicture, 0)", 10);
		isKeyClock = false;
		showFileInfo();
	}
	else {
		isKeyClock = false;
		showFileInfo();
	}
	return;
}

/*********************************************************************/
/* Function: getPicture                                              */
/* Description: 获得图片(海报、缩略图)                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-19                                 */
/*********************************************************************/
function getPicture()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus!=0) {
			var responseXMLHead = httpRequest.responseXML.getElementsByTagName('result');
			var pos = fileIndex%8;
			//filePicture[pos] = responseXMLHead.item(0).childNodes[0].nodeValue;
			//filePicture[pos] = 'file:///LocalPlayer'+filePicture[pos];
			filePicture[pos] = 'image/defaultIcon'+fileType[pos]+'.jpg';
		}
		isKeyClock = false;
		showFileInfo();
	}
	return;
}

/*********************************************************************/
/* Function: showFileInfo                                            */
/* Description: 显示文件夹或文件的信息                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-19                                 */
/*********************************************************************/
function showFileInfo()
{
	//移动焦点位置
	var pos = fileIndex%8;
	document.getElementById('itemFocus').style.top = 48*pos;
	//获得项目图片显示数据
	var pictureStr = filePicture[pos];
	//document.getElementById('itemIcon').document.write("<img src='"+pictureStr+"' style='left:0; top:0; width:200; height:150;'/>");
	document.getElementById('itemIcon').src = pictureStr;
	//获得项目信息数据
	var showStr = '';
	var typeStr = fileExtend[pos];
	var sizeStr = changeDataUnit(fileSize[pos]);
	var timeStr = changeTimeFormat(fileTime[pos]);
	var nameStr = fileShowName[pos];
	showStr += movie_FILE_INFO[0]+typeStr+'<br>';
	if (fileType[pos]!=0) {
		showStr += movie_FILE_INFO[1]+sizeStr+'<br>';
	}
	showStr += movie_FILE_INFO[2]+timeStr[0]+'<br>';
	showStr += movie_FILE_INFO[3]+timeStr[1]+'<br>';
	showStr += movie_FILE_INFO[4]+nameStr;
	document.getElementById('itemInfo').innerHTML = showStr;
	//显示分区信息
	document.getElementById('itemInfo').style.visibility = 'visible';
	//document.getElementById('itemIcon').style.visibility = 'visible';
	return;
}

/*********************************************************************/
/* Function: hideFileList                                            */
/* Description: 显示文件夹和文件列表                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-20                                 */
/*********************************************************************/
function hideFileList()
{
	document.getElementById('itemList').style.height = 0;
	document.getElementById('pageUp').style.visibility = 'hidden';
	document.getElementById('pageDown').style.visibility = 'hidden';
	hideFileInfo();
	return;
}

/*********************************************************************/
/* Function: hideFileInfo                                            */
/* Description: 显示文件夹或文件的信息                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-20                                 */
/*********************************************************************/
function hideFileInfo()
{
	document.getElementById('itemIcon').src = 'image/null.jpg';
	//document.getElementById('divPicture').style.visibility = 'hidden';
	document.getElementById('itemInfo').innerHTML = '';
	return;
}

/*********************************************************************/
/* Function: channelNext                                             */
/* Description: 向下移动焦点，选择下一个选项                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-19                                 */
/*********************************************************************/
function channelNext()
{
	if (fileIndex>(fileTotal-1)) {
		return;
	}
	fileIndex++;
	fileIndex = fileIndex>(fileTotal-1) ? 0 : fileIndex;
	var pos = fileIndex%8;
	if (pos==0) {
		getFileListRequest();
	}
	else {
		getPictureRequest();
	}
	return;
}

/*********************************************************************/
/* Function: channelPrevious                                         */
/* Description: 向上移动焦点，选择前一个选项                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-19                                 */
/*********************************************************************/
function channelPrevious()
{
	if (fileIndex<0) {
		return;
	}
	fileIndex--;
	fileIndex = fileIndex<0 ? fileTotal-1 : fileIndex;
	var pos = fileIndex%8;
	if (pos==7 || fileIndex==(fileTotal-1)) {
		getFileListRequest();
	}
	else {
		getPictureRequest();
	}
	return;
}

/*********************************************************************/
/* Function: channelPageNext                                         */
/* Description: 向后翻页                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-19                                 */
/*********************************************************************/
function channelPageNext()
{
	if (fileIndex>(fileTotal-1)) {
		return;
	}
	var pageTotal = parseInt((fileTotal-1)/8);
	var pageCurrent = parseInt(fileIndex/8);
	fileIndex += 8;
	if (fileIndex>=fileTotal) {
		if (pageCurrent<pageTotal) {
			fileIndex = fileTotal-1;
		} else {
			fileIndex = 0;
		}
	}
	getFileListRequest();
	return;
}

/*********************************************************************/
/* Function: channelPagePrevious                                     */
/* Description: 向前翻页                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-19                                 */
/*********************************************************************/
function channelPagePrevious()
{
	if (fileIndex<0) {
		return;
	}
	fileIndex -= 8;
	if (fileIndex<0) {
		fileIndex = fileTotal-1;
	}
	getFileListRequest();
	return;
}

/*********************************************************************/
/* Function: channelSelect                                           */
/* Description: 选中文件夹或文件后的处理                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-20                                 */
/*********************************************************************/
function channelSelect()
{
	//选中文件后的处理
	var pos = fileIndex%8;
	if (fileType[pos]!=0) {
		//发送播放请求
		var pos = fileIndex%8;
		isKeyClock = true;
		subtitleIndex = 0;
		subtitleFirstGet = true;
		setTimeout("makeRequest('play?'+playURL, hideWebPageRequest, 0)", 10);
		//hideWebPage();
		return;
	}
	//选中文件夹后的处理
	//存储当前目录的队列数据
	var len = queuePath.length;
	queuePath.length++;
	queuePathShow.length++;
	queuefileIndex.length++;
	queuePath[len] = fileRealName[pos];
	queuePathShow[len] = queuePathShow[len-1]+fileShowName[pos]+'\\';
	queuefileIndex[len-1] = fileIndex;
	fileIndex = 0; //初始化当前文件夹或文件的索引号
	//显示当前路径
	document.getElementById('diskInfo').innerHTML = queuePathShow[len];
	//发送获得文件夹和文件列表的请求
	getFileListRequest();
	return;
}

/*********************************************************************/
/* Function: channelBack                                             */
/* Description: 返回前一级目录的处理                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-20                                 */
/*********************************************************************/
function channelBack()
{
	//根目录时的处理
	var len = queuePath.length;
	if (len<=1) {
		exitWebPage();
		return;
	}
	//恢复前一级目录的队列数据
	queuePath.length--;
	queuePathShow.length--;
	queuefileIndex.length--;
	fileIndex = queuefileIndex[len-2];
	//显示前一级目录的路径
	document.getElementById('diskInfo').innerHTML = queuePathShow[len-2];
	//发送获得文件夹和文件列表的请求
	getFileListRequest();
	return;
}

/*********************************************************************/
/* Function: exitWebPage                                             */
/* Description: 跳转到选中功能项对应的页面                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-30                                 */
/*********************************************************************/
function exitWebPage()
{
	document.location.href = backURL;
	return;
}

/*********************************************************************/
/* Function: hideWebPageRequest                                      */
/* Description: 隐藏浏览器网页的请求                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-12                                 */
/*********************************************************************/
function hideWebPageRequest()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		setTimeout("makeRequest('webSlide?0|2|14', hideWebPage, 5)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: hideWebPage                                             */
/* Description: 隐藏浏览器网页的                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-12                                 */
/*********************************************************************/
function hideWebPage()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		isFullScreen = true;
		isKeyClock = false;
		document.getElementById('divBrowser').style.visibility = 'hidden';
		//document.getElementById('divPicture').style.visibility = 'hidden';
		document.getElementById('divPlayer').style.visibility = 'visible';
		setTimeout("makeRequest('webSlide?1|2|1', nullFun, 5)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: showWebPageRequest                                      */
/* Description: 显示浏览器网页的请求                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-12                                 */
/*********************************************************************/
function showWebPageRequest()
{
	document.location.href = backURL;
/*	if (httpRequest.readyState==4 && httpRequest.status==200) {
		setTimeout("makeRequest('webSlide?0|2|1', showWebPage, 5)", 10);
	}*/
	return;
}

/*********************************************************************/
/* Function: showWebPage                                             */
/* Description: 显示浏览器网页                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-12                                 */
/*********************************************************************/
function showWebPage()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		backOperate();
	}
	return;
}

/*********************************************************************/
/* Function: backOperate                                             */
/* Description: 返回处理                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function backOperate()
{
	//关闭全屏显示，打开浏览器显示
	isFullScreen = false;
	isKeyClock = false;
	document.getElementById('divBrowser').style.visibility = 'hidden';
	//document.getElementById('divPicture').style.visibility = 'visible';
	document.getElementById('divPlayer').style.visibility = 'hidden';
	//关闭错误提示窗口
	if (isDoesnotItem || isStreamError) {
		isDoesnotItem = false;
		isStreamError = false;
		document.getElementById('fileError').style.visibility = 'hidden';
		document.getElementById('fileError').innerHTML = '';
		document.getElementById('fileError2').style.visibility = 'hidden';
		document.getElementById('fileError2').innerHTML = '';
	}
	//初始化相关变量
	currentTrack = 0;
	streamStatus = 1;
	streamFastSpeed = 1;
	//关闭全屏下的所有窗口
	hideBookMark();
	hideNoBookMark();
	hidePlayerIcon(); //隐藏播放状态提示
	hideProcess(); //隐藏进度条
	currentTime = 0;
	totalTime = 0;
	document.getElementById('processBar').style.width = '1px';
	hideSetupInfo(); //隐藏设置信息
	hideAllInfo(); //隐藏信息窗
	hideVolume(); //隐藏音量条
	setTimeout("makeRequest('webSlide?1|2|12', nullFun, 5)", 10);
	return;
}
///////////////////////////////////////////////////////////////////////功能处理部分结束


///////////////////////////////////////////////////////////////////////功能菜单处理部分开始
/*********************************************************************/
/* Function: miniMenuOpen                                            */
/* Description: 开启功能菜单                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-27                                 */
/*********************************************************************/
var isMiniMenu = false;
function miniMenuOpen()
{
	if (!isMiniMenu) {
		isMiniMenu = true;
		miniMenuShow();
		//显示功能菜单背景图片
		//document.getElementById('divPicture').style.visibility = 'hidden';
		document.getElementById('divMenu').style.visibility = 'visible';
	}
	else {
		miniMenuHide();
	}
	return;
}

/*********************************************************************/
/* Function: miniMenuShow                                            */
/* Description: 显示功能菜单                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-27                                 */
/*********************************************************************/
function miniMenuShow()
{
	//设置图标的判断
	document.getElementById('divMenuPos1').style.backgroundImage = 'url(image/'+SETUP_Language+'/menuIcon16.png)';
	//循环方式图标的判断
	var tempType = (SETUP_AutoPlayMode==1)? 5 : 4;
	document.getElementById('divMenuPos2').style.backgroundImage = 'url(image/'+SETUP_Language+'/menuIcon2'+tempType+'.png)';
	return;
}

/*********************************************************************/
/* Function: miniMenuHide                                            */
/* Description: 关闭功能菜单                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-27                                 */
/*********************************************************************/
function miniMenuHide()
{
	var tempSetup = 'SETUP_AutoPlayMode='+SETUP_AutoPlayMode+'|';
	makeRequest('config?3|'+tempSetup, miniMenuClose, 1);
	return;
}

/*********************************************************************/
/* Function: miniMenuClose                                           */
/* Description: 关闭功能菜单                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-27                                 */
/*********************************************************************/
function miniMenuClose()
{	
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==1) {
			isMiniMenu = false;
			//document.getElementById('divPicture').style.visibility = 'visible';
			document.getElementById('divMenu').style.visibility = 'hidden';
		}
	}
	return;
}

/*********************************************************************/
/* Function: miniMenuNext                                            */
/* Description: 下一个功能菜单选项                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-27                                 */
/*********************************************************************/
var miniMenuTotal = 2; //功能菜单选项的总数
var miniMenuIndex = 0; //功能菜单选项的序列号
function miniMenuNext()
{
	miniMenuIndex = (miniMenuIndex>=(miniMenuTotal-1))? 0 : (miniMenuIndex+1);
	document.getElementById('divMenuFocus').style.left = 44+miniMenuIndex*130;
	return;
}

/*********************************************************************/
/* Function: miniMenuPrevious                                        */
/* Description: 下一个功能菜单选项                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-03                                 */
/*********************************************************************/
function miniMenuPrevious()
{
	miniMenuIndex = (miniMenuIndex<=0)? (miniMenuTotal-1) : (miniMenuIndex-1);
	document.getElementById('divMenuFocus').style.left = 44+miniMenuIndex*130;
	return;
}

/*********************************************************************/
/* Function: miniMenuSelect                                          */
/* Description: 选中功能菜单选项的处理                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-28                                 */
/*********************************************************************/
function miniMenuSelect()
{
	if (miniMenuIndex==0) {
		var tempSetup = 'SETUP_AutoPlayMode='+SETUP_AutoPlayMode+'|';
		makeRequest('config?3|'+tempSetup, gotoSetupRequest, 1);
	}
	else if (miniMenuIndex==1) {
		changeCycleType();
		miniMenuShow();
	}
	return;
}

/*********************************************************************/
/* Function: gotoSetupRequest                                        */
/* Description: 选中功能菜单选项的处理                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-04-08                                 */
/*********************************************************************/
function gotoSetupRequest()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==1) {
			setTimeout("gotoSettings()", 10);
		}
	}
}

/*********************************************************************/
/* Function: gotoSettings                                            */
/* Description: 跳转到设置界面                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-30                                 */
/*********************************************************************/
function gotoSettings()
{
	var hrefStr = document.location.href.split('?');
	document.location.href = 'settings.html?movieList@'+hrefStr[1];
	return;
}

/*********************************************************************/
/* Function: changeCycleType                                         */
/* Description: 切换循环模式                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-04-02                                 */
/*********************************************************************/
function changeCycleType()
{
	SETUP_AutoPlayMode++;
	if (SETUP_AutoPlayMode>1) {
		SETUP_AutoPlayMode = 0;
	}
	return;
}

/*********************************************************************/
/* Function: keyMiniMenu                                             */
/* Description: 功能菜单状态下的按键响应                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-30                                 */
/*********************************************************************/
function keyMiniMenu(keyValue)
{
	switch (keyValue) {
		case 56: //切换
		case 8: //back
			miniMenuOpen();
			return (false);
			break;
		case 13: //Enter
			miniMenuSelect();
			return (false);
			break;
		case 37: //left(快退)
			miniMenuPrevious();
			return (false);
			break;
		case 39: //right(快进)
			miniMenuNext();
			return (false);
			break;
		default:
			return (-1);
			break;
	}
	return;
}
///////////////////////////////////////////////////////////////////////功能菜单处理部分结束