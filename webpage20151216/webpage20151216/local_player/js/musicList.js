/*** 音乐部分 ******************************************************************/
var cycleType = 0; //循环模式，0:顺序方式 1:循环方式 2:随机方式 3:单曲循环      /
var wordShowMode = 1; //显示歌词，1: 显示 0:不显示                              /
var isScreenSaver = 0; //设置的屏保状态，1:开 0:关                              /
var screenSaverInterval = 6; //屏保图片切换时间间隔，取值:2--30秒               /
var screenSaverTime = 10; //屏保等待时间，取值:1--30分钟                        /
var screenSaverChange = 6; //屏保切换方式，取值：1--10                          /
/*******************************************************************************/

///////////////////////////////////////////////////////////////////////按键处理部分开始
/*********************************************************************/
/* Function: keyEvent                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-26                                 */
/*********************************************************************/
var isKeyClock = false; //遥控器按键锁定，用于播放请求处理过程中屏蔽遥控器按键
var isDoesnotItem = false; //无可用硬盘或服务器的状态
var isEnterAndBack = false; //按下Enter和Back键
function keyEvent(e)
{
	var keyValue = e.which;
	iPanel.ioctlWrite('printf', 'keyValue===================='+keyValue+'\n');
	//移动设备插拔的处理
	if (keyValue>=0xff20 && keyValue<=0xff34) {
		showUSBInfo(keyValue);
		return;
	}
	//屏保开启时的处理
	if (isScreenSaver==1 && keyValue<0xff00) {
		clearTimeout(timerID_bgPicturePlay);
		clearInterval(timerID_moveDiv);
		screenSaverCounter = 0;
		if (isScreenSaverOpen) {
			screenSaverClose();
			return (false);
		}
	}
	//无项目的处理
	if (isDoesnotItem) {
		if (keyValue==213) {
			keyBack();
		}
		return (false);
	}
	if (isKeyClock && (keyValue<0xff00)) {
		return (false);
	}
	//按键的处理
	switch (keyValue) {
		case 213: //back(停止)
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

		case 1073741869: //channel+(频道+)
			keyChannelUp();
			break;
		case 1073741867: //channel-(频道-)
			keyChannelDown();
			break;

		case 403: //红键
			keyRed();
			break;
		case 404: //绿键
			keyGreen();
			break;
		case 405: //黄键
			keyYellow();
			break;
		case 406: //蓝键(信息)
			keyBlue();
			break;

		case 415: //play/pause(播放/暂停)
			keyPlayPause();
			break;
		case 1073741880: //volume+(音量+)
			keyVolumeUP();
			break;
		case 1073741884: //volume-(音量-)
			keyVolumeDown();
			break;
		case 1073741879: //mute(静音)
			keyVolumeMute();
			break;
		case 1073741882: //track(声道)
			keyTrack();
			break;

		case 284: //帮助
			keyHelp();
			break;
		case 1292: //字幕
			keySubtitle();
			break;
		case 1073741865: //定位
			keySeek();
			break;
		case 281: //收藏
			keyFavorite();
			break;
		case 56: //切换
			keyDesktop();
			break;
		case 519:	//设置
			makeRequest('stop', gotoSettingsPage, 0);
			break;

		case 0xff01: //播放到尾(buffer读完，解码器仍然解码)
			isEnterAndBack = false;
			break;
		case 0xff02: //播放到尾(解码器停止)
			if(isEnterAndBack==false) {
				playEnd();
			}
			isEnterAndBack = true;
			break;
		case 0xff04: //播放开始
			break;
		case 0xff06: //码流错误
			break;

		case 0xff41: //定时器，每30秒发送一次
			screenSaverEvent();
			break;

		default:
			return (-1);
			break;
	}
	return;
}

/*********************************************************************/
/* Function: keyCode                                                 */
/* Description: 华为（黑色）遥控器按键处理函数                           */
/* Parameters:     			                                         */
/* Author&Date: zhaopengjun 2010-5-12	                              */
/*********************************************************************/
function keyCode(e)
{
	var keyValue = e.which;
	iPanel.ioctlWrite('printf', 'keyValue===================='+keyValue+'\n');
	//移动设备插拔的处理
	if (keyValue>=0xff20 && keyValue<=0xff34) {
		showUSBInfo(keyValue);
		return;
	}
	//屏保开启时的处理
	if (isScreenSaver==1 && keyValue<0xff00) {
		clearTimeout(timerID_bgPicturePlay);
		clearInterval(timerID_moveDiv);
		screenSaverCounter = 0;
		if (isScreenSaverOpen) {
			screenSaverClose();
			return (false);
		}
	}
	//无项目的处理
	if (isDoesnotItem) {
		if (keyValue==213) {
			keyBack();
		}
		return (false);
	}
	if (isKeyClock && (keyValue<0xff00)) {
		return (false);
	}
	//按键的处理
	switch (keyValue) {
		case 213: //back(停止)
			keyBack();
			return (false);
			break;
		case 13: //Enter
			keyEnter();
			return (false);
			break;
		case 37: //left(快退)
			keyLeftCode();
			return (false);
			break;
		case 38: //up
			keyUp();
			return (false);
			break;
		case 39: //right(快进)
			keyRightCode();
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

		case 1073741869: //channel+(频道+)
			keyChannelUp();
			break;
		case 1073741867: //channel-(频道-)
			keyChannelDown();
			break;

		case 403: //红键
			keyRed();
			break;
		case 404: //绿键
			keyGreen();
			break;
		case 405: //黄键
			keyYellow();
			break;
		case 406: //蓝键(信息)
			keyBlue();
			break;

		case 415: //play/pause(播放/暂停)
			keyPlayPause();
			break;
		case 1073741880: //volume+(音量+)
			keyVolumeUP();
			break;
		case 1073741884: //volume-(音量-)
			keyVolumeDown();
			break;
		case 1073741879: //mute(静音)
			keyVolumeMute();
			break;
		case 1073741882: //track(声道)
			keyTrack();
			break;

		case 284: //帮助
			keyHelp();
			break;
		case 1292: //字幕
			keySubtitle();
			break;
		case 1073741865: //定位
			keySeek();
			break;
		case 281: //收藏
			keyFavorite();
			break;
		case 280: //切换
			keyDesktop();
			break;
		case 519:	//设置
			makeRequest('stop', gotoSettingsPage, 0);
			break;
			
		case 0xff01: //播放到尾(buffer读完，解码器仍然解码)
			isEnterAndBack = false;
			break;
		case 0xff02: //播放到尾(解码器停止)
			if(isEnterAndBack==false) {
				playEnd();
			}
			isEnterAndBack = true;
			break;
		case 0xff04: //播放开始
			break;
		case 0xff06: //码流错误
			break;

		case 0xff41: //定时器，每30秒发送一次
			screenSaverEvent();
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
/* Function: keyDesktop                                              */
/* Description: keyDesktop 按键处理函数                              */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-03                                 */
/*********************************************************************/
function keyDesktop()
{
	if (isFullScreen) {
		return;
	}
	miniMenuOpen();
	return;
}

/*********************************************************************/
/* Function: keyPlayPause                                            */
/* Description: keyPlayPause 按键处理函数                            */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function keyPlayPause()
{
	if (isMiniMenu || isAddPlayList) {
		return;
	}
	if (playStatus==1 || playStatus==2) {
		playPause();
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
	if (isMiniMenu) {
		miniMenuPrevious();
	}
	else if ((isAddPlayList && isEditPlayList) || (isAddOtherList && isEditOtherList)) {
		disablePlayList();
	}
	return;
}

/*********************************************************************/
/* Function: keyLeftCode                                                 */
/* Description: keyLeft 按键处理函数                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-5-12                                */
/*********************************************************************/
function keyLeftCode()
{
	if (isMiniMenu) {
		miniMenuPrevious();
	}
	else if ((isAddPlayList && isEditPlayList) || (isAddOtherList && isEditOtherList)) {
		disablePlayList();
	} else if (playStatus==1) {
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
	if (isMiniMenu) {
		miniMenuNext();
	}
	else if ((isAddPlayList && !isEditPlayList) || (isAddOtherList && !isEditOtherList)) {
		enablePlayList();
	}
	return;
}

/*********************************************************************/
/* Function: keyRightCode                                                */
/* Description: keyRightCode 按键处理函数                                */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-5-12                                */
/*********************************************************************/
function keyRightCode()
{
	if (isMiniMenu) {
		miniMenuNext();
	}
	else if ((isAddPlayList && !isEditPlayList) || (isAddOtherList && !isEditOtherList)) {
		enablePlayList();
	} else if (playStatus==1) {
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
	if (isMiniMenu || isFullScreen) {
		return;
	}
	if ((isAddPlayList&&isEditPlayList) || (isAddOtherList&&isEditOtherList)) {
		playListPrevious();
		return;
	}
	channelPrevious();
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
	if (isMiniMenu || isFullScreen) {
		return;
	}
	if ((isAddPlayList && isEditPlayList) || (isAddOtherList && isEditOtherList)) {
		playListNext();
		return;
	}
	channelNext();
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
	if (isMiniMenu || isFullScreen) {
		return;
	}
	if ((isAddPlayList && isEditPlayList) || (isAddOtherList && isEditOtherList)) {
		playListPageNext();
		return;
	}
	channelPageNext();
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
	if (isMiniMenu || isFullScreen) {
		return;
	}
	if ((isAddPlayList && isEditPlayList) || (isAddOtherList && isEditOtherList)) {
		playListPagePrevious();
		return;
	}
	channelPagePrevious();
	return;
}

/*********************************************************************/
/* Function: keyEnter                                                */
/* Description: keyEnter 按键处理函数                                */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-01                                 */
/*********************************************************************/
function keyEnter()
{
	if (isMiniMenu) {
		miniMenuSelect();
	}
	else if ((isAddPlayList && isEditPlayList) || (isAddOtherList && isEditOtherList)){
		bgListDelete();
	}
	else if (!isFullScreen) {
		channelSelect();
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
	if (isFullScreen) {
		document.getElementById('musicProcess').style.visibility = 'hidden';
		document.getElementById('divPlayerMusic').style.visibility = 'hidden';
		isFullScreen = false;
		return;
	}
	if (isMiniMenu) {
		miniMenuHide();
		return;
	}
	if ((isAddPlayList && isEditPlayList) || (isAddOtherList && isEditOtherList)) {
		disablePlayList();
		return;
	}
	channelBack();
	return;
}

/*********************************************************************/
/* Function: keyRed                                                  */
/* Description: keyRed 红色按键处理函数(确认操作)                    */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
var isFullScreen = false; //全屏显示状态
function keyRed()
{
	if (isMiniMenu) {
		return;
	}
	if (isAddPlayList || isAddOtherList) {
		bgListDelete();
	}
	else if ((playStatus==1 || playStatus==2) && !isFullScreen) {
		document.getElementById('divPlayerMusic').style.visibility = 'visible';
		document.getElementById('musicProcess').style.visibility = 'visible';
		isFullScreen = true;
	}
	else if (isFullScreen) {
		document.getElementById('musicProcess').style.visibility = 'hidden';
		document.getElementById('divPlayerMusic').style.visibility = 'hidden';
		isFullScreen = false;
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
	if (isMiniMenu) {
		return;
	}
	if (isAddPlayList || isAddOtherList) {
		playListEnd();
		if (playStatus != 0) {
			document.getElementById('fullPlayInfo').style.visibility = 'visible';
		}
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
	if (isMiniMenu || isAddPlayList) {
		return;
	}
	if (playStatus==1) {
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
	if (isMiniMenu || isAddPlayList) {
		return;
	}
	if (playStatus==1) {
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
	if (isMiniMenu || isAddPlayList) {
		return;
	}
	if (playStatus==1) {
		volumeControl(3);
	}
	return;
}

/*********************************************************************/
/* Function: keyChannelUp                                            */
/* Description: keyChannelUp 按键处理函数                            */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-01                                 */
/*********************************************************************/
function keyChannelUp()
{
	if (isMiniMenu || isAddPlayList) {
		return;
	}
	if (playStatus==0) {
		return;
	}
	playNext();
	return;
}

/*********************************************************************/
/* Function: keyChannelDown                                          */
/* Description: keyChannelDown 按键处理函数                          */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-01                                 */
/*********************************************************************/
function keyChannelDown()
{
	if (isMiniMenu || isAddPlayList) {
		return;
	}
	if (playStatus==0) {
		return;
	}
	playPrevious();
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
			screenSaverTime = screenSaverTime<1 ? 1 : screenSaverTime;
			screenSaverTime = screenSaverTime>30 ? 30 : screenSaverTime;
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
/* Author&Date: lixudong  2010-03-28                                 */
/*********************************************************************/
function webStyleSet()
{
	//显示背景菜单图片
	var tempURL = 'url(image/skin'+SETUP_SkinIndex+'/fileList.jpg)';
	document.getElementById('bgPicture').style.backgroundImage = tempURL;
	//MiniMenu背景图片
	tempURL = 'url(image/skin'+SETUP_SkinIndex+'/miniMenu5.png)';
	document.getElementById('miniMenuBg').style.backgroundImage = tempURL;
	tempURL = 'url(image/menuIconFocus.png)';
	document.getElementById('divMenuFocus').style.backgroundImage = tempURL;
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
function init()
{
	photo_LanguageSelect();
	music_LanguageSelect();
	file_LanguageSelect();
	//获得前一个网页传递的参数
	var hrefStr = document.location.href.split('?');
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
	var tempBgURL = 'url(image/'+SETUP_Language+'/dirList'+(mediaTypeIndex+1)+'.jpg)';
	document.getElementById('titleIcon').style.backgroundImage = tempBgURL;
	//全屏音乐背景图
	document.getElementById('divPlayerMusicBg').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/musicPlayerBg.png)';
	//全屏音乐进度条
	document.getElementById('musicProcess').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/musicProcessBar.png)';
	//全屏音乐音量条
	document.getElementById('musicVolume').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/musicVolumeBar.png)';
	document.getElementById('divVolume').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/miniProcess.jpg)';
	//全屏音乐进度文字中英文
	document.getElementById('musicBarText').innerHTML = file_OPERATE_INFO[7];
	//全屏音乐音量文字中英文
	document.getElementById('musicVolumeText').innerHTML = file_OPERATE_INFO[8];
	//显示当前路径
	document.getElementById('diskInfo').innerHTML = queuePathShow[0];
	//全屏播放提示信息
	document.getElementById('fullPlayInfo').innerHTML = (SETUP_Language=='chinese')? '按红色键全屏播放' : 'Press red key to full screen.';
	//发送获得音量请求
	setTimeout("makeRequest('volume?2', getVolumeStatus, 0)", 10);
	//发送获得文件夹和文件列表的请求
	getFileListRequest();
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
var fileNumber = 0; //文件的总数
function getFileList()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		//无可用文件夹和文件时的处理
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==0) {
			hideFileList();
			document.getElementById('divInfo').innerHTML = music_OPERATE_INFO[0]+music_OPERATE_INFO[1];
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
		fileNumber = getInfo[4];
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
	document.getElementById('itemList').style.height = (48*fileReturnTotal)+"px";
	//显示页码和翻页指示
	var tempPageNumber = music_PAGE_NUMBER[0]+(pageCurrent+1)+music_PAGE_NUMBER[1]+(pageTotal+1)+music_PAGE_NUMBER[2];
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
		//setTimeout("makeRequest('getPictur?0|'+filePicture["+pos+"]+'|'+fileRealName["+pos+"], getPicture, 0)", 10);
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
			filePicture[pos] = responseXMLHead.item(0).childNodes[0].nodeValue;
			filePicture[pos] = 'file:///LocalPlayer'+filePicture[pos];
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
	document.getElementById('itemFocus').style.top = (0+48*pos)+"px";
	if (playStatus==1 || playStatus==2) {
		return;
	}
	else if (playStatus==3 && (isAddPlayList || isAddOtherList) ) {
		document.getElementById('divPicture').style.visibility = 'hidden';
		document.getElementById('divPlayer').style.visibility = 'visible';
		return;
	}
	//获得项目图片显示数据
	var pictureStr = filePicture[pos];
	document.getElementById('itemIcon').src = pictureStr;
	//获得项目信息数据
	var showStr = '';
	var typeStr = fileExtend[pos];
	var sizeStr = changeDataUnit(fileSize[pos]);
	var timeStr = changeTimeFormat(fileTime[pos]);
	var nameStr = fileShowName[pos];
	showStr += music_FILE_INFO[0]+typeStr+'<br>';
	if (fileType[pos]!=0) {
		showStr += music_FILE_INFO[1]+sizeStr+'<br>';
	}
	showStr += music_FILE_INFO[2]+timeStr[0]+'<br>';
	showStr += music_FILE_INFO[3]+timeStr[1]+'<br>';
	showStr += music_FILE_INFO[4]+nameStr;
	//显示分区信息
	document.getElementById('itemInfo').innerHTML = showStr;
	//document.getElementById('itemInfo').style.visibility = 'visible';
	//显示图标信息
	if (isAddPlayList || isAddOtherList ) {
		document.getElementById('divPicture').style.visibility = 'hidden';
		document.getElementById('divPlayer').style.visibility = 'visible';
	}
	else {
		playStatus = 0;
		if (isMiniMenu || isAddPlayList) {
			document.getElementById('divPicture').style.visibility = 'hidden';
		}
		else {
			document.getElementById('divPicture').style.visibility = 'visible';
		}
		document.getElementById('divPlayer').style.visibility = 'hidden';
	}
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
	document.getElementById('itemList').style.height = "0px";
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
	if (playStatus==0) {
		document.getElementById('itemInfo').innerHTML = '';
	}
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
/* Author&Date: lixudong  2009-12-01                                 */
/*********************************************************************/
function channelSelect()
{
	//选中文件后的处理
	var pos = fileIndex%8;
	if (fileType[pos]!=0) {
		if (isAddPlayList && !isEditPlayList) {
			setTimeout("makeRequest('playlist?4|'+fileRealName["+pos+"], getBgListRequest, 0)", 10);
			return;
		}
		if (isAddOtherList && !isEditOtherList) {
			setTimeout("makeRequest('playlist?7|'+fileRealName["+pos+"], getBgListRequest, 0)", 10);
			return;
		}
		getPlayListRequest();
		return;
	}
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
		setTimeout("makeRequest('stop', exitWebPage, 0)", 10);
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
/* Author&Date: lixudong  2009-12-31                                 */
/*********************************************************************/
function exitWebPage()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		document.location.href = 'disk.html?'+mediaTypeIndex;
	}
	return;
}

/*********************************************************************/
/* Function: getPlayListRequest                                      */
/* Description: 获得播放文件的列表                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-30                                 */
/*********************************************************************/
function getPlayListRequest()
{
	var pathIndex = queuePath.length-1;
	var requestStr = zoneType+'|name|'+mediaType+'|'+queuePath[pathIndex]+'|'+(fileTotal-fileNumber+1)+'$'+fileTotal+'';
	isKeyClock = true;
	setTimeout("makeRequest('list?"+requestStr+"', getPlayList, 4)", 10);
	return;
}

/*********************************************************************/
/* Function: getPlayList                                             */
/* Description: 获得播放列表                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-30                                 */
/*********************************************************************/
var playStatus = 0; //记录当前播放状态，0:未开启 1:播放 2:暂停 3:停止
var playTotal = 0; //播放文件的总数
var playIndex = 0; //当前播放文件的索引号
var playType = new Array(); //播放文件的类型
var playExtend = new Array(); //播放文件的扩展名
var playSize = new Array(); //播放文件的大小
var playTime = new Array(); //播放文件的时间
var playRealName = new Array(); //播放文件的真实名称
var playShowName = new Array(); //播放文件的显示名称
function getPlayList()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		//计算文件的总数
		playTotal = fileNumber;
		playIndex = fileIndex-(fileTotal-fileNumber);
		//获得文件的信息
		var responseXMLHead = httpRequest.responseXML.getElementsByTagName('file');
		var parameter;
		for (var i=0; i<playTotal; i++) {
			parameter = responseXMLHead.item(i).childNodes[0].nodeValue.split('|');
			playType[i] = parseInt(parameter[0]);
			playExtend[i] = parameter[1].toUpperCase();
			playSize[i] = parseFloat(parameter[2]);
			playTime[i] = parameter[3];
			playRealName[i] = parameter[4];
			playShowName[i] = parameter[5];
		}
		isKeyClock = false;
		//关闭浏览器显示，进入播放状态
		isEnterAndBack = true;
		clearInterval(timerID_playProcess);
		clearTimeout(timerID_ProcessShow);
		isPlayProcessShow = false;
		playStatus = 1;
		document.getElementById('divPicture').style.visibility = 'hidden';
		document.getElementById('divPlayer').style.visibility = 'visible';
		document.getElementById('fullPlayInfo').style.visibility = 'visible';
		setTimeout("makeRequest('play?|'+playRealName[playIndex], showPlayInfo, 0)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: showPlayInfo                                            */
/* Description: 显示播放文件的信息及播放状态                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-12                                 */
/*********************************************************************/
var wordTime = new Array(); //歌词时间
var wordText = new Array(); //歌词文本
var wordTotal = 0; //歌词文件的总行数
var wordIndex = 0; //歌词文件的当前行数
function showPlayInfo()
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
			wordTime = new Array();
			wordText = new Array();
			showPlayInfoDiv();
			document.getElementById('divWord1').innerHTML = '';
			document.getElementById('divWord2').innerHTML = '';
			//全屏状态执行
			document.getElementById('divWordFull1').innerHTML = '';
			document.getElementById('divWordFull2').innerHTML = '';
		}
		else {
			//显示歌词信息
			showWordInfoDiv();
			document.getElementById('itemInfo').innerHTML = '';
			//全屏状态执行
			document.getElementById('musicFileInfo').innerHTML = '';
		}
		//显示播放状态和进度条
		showPlayStatus();
		showProcess();
		if (isMuteStatus) {
			showVolume();
		}
	}
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
	//全屏状态执行
	document.getElementById('divWordFull1').innerHTML = wordText[wordIndex];
	document.getElementById('divWordFull2').innerHTML = showStr;
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
	if (timeStr>=wordTime[wordIndex+1]) {
		wordIndex++;
		showWordInfoDiv();
	}
	return;
}

/*********************************************************************/
/* Function: showPlayInfoDiv                                         */
/* Description: 显示播放文件的信息                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-24                                 */
/*********************************************************************/
function showPlayInfoDiv()
{
	//显示文件信息
	var showStr = '';
	var typeStr = playExtend[playIndex];
	var sizeStr = changeDataUnit(playSize[playIndex]);
	var timeStr = changeTimeFormat(playTime[playIndex]);
	var nameStr = playShowName[playIndex];
	showStr += music_FILE_INFO[0]+typeStr+'<br>';
	showStr += music_FILE_INFO[1]+sizeStr+'<br>';
	showStr += music_FILE_INFO[2]+timeStr[0]+'<br>';
	showStr += music_FILE_INFO[3]+timeStr[1]+'<br>';
	showStr += music_FILE_INFO[4]+nameStr;
	document.getElementById('itemInfo').innerHTML = showStr;
	document.getElementById('musicFileInfo').innerHTML = showStr;
	return;
}

/*********************************************************************/
/* Function: showPlayStatus                                          */
/* Description: 显示播放状态图标                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-30                                 */
/*********************************************************************/
function showPlayStatus()
{
	var imgURL = '';
	var imgFullURL = '';
	if (playStatus==1) {
		imgURL = 'image/player/musicMiniPlay.png';
		imgFullURL = 'image/player/musicPlay.png';
	}
	else if (playStatus==2) {
		imgURL = 'image/player/musicMiniPause.png';
		imgFullURL = 'image/player/musicPause.png';
	}
	else {
		imgURL = 'image/player/musicMiniStop.png';
		imgFullURL = 'image/player/musicStop.png';
	}
	document.getElementById('musicPlayStatus').src = imgURL;
	//全屏状态执行
	document.getElementById('musicPlayStatusFull').src = imgFullURL;
	return;
}

/*********************************************************************/
/* Function: playPause                                               */
/* Description: 播放选中的文件                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-30                                 */
/*********************************************************************/
function playPause()
{
	var requestStatus;
	if (playStatus==1) {
		requestStatus = makeRequest('pause', showPlayStatus, 0);
		if (requestStatus) {
			playStatus = 2;
		}
	}
	else if (playStatus==2) {
		requestStatus = makeRequest('resume', showPlayStatus, 0);
		if (requestStatus) {
			playStatus = 1;
		}
	}
	return;
}

/*********************************************************************/
/* Function: playEnd                                                 */
/* Description: 播放结束后的处理                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-09-21                                 */
/*********************************************************************/
function playEnd()
{
	clearInterval(timerID_playProcess);
	clearTimeout(timerID_ProcessShow);
	isPlayProcessShow = false;
	//不同循环模式下，播放文件索引号的计算
	if (cycleType==2) {
		var randomVol = parseInt(Math.random()*playTotal);
		playIndex = (playIndex==randomVol)? (randomVol+1) : randomVol;
	}
	else if (cycleType==0 || cycleType==1) {
		playIndex++;
	}
	else {
		playIndex = playIndex;
	}
	//不同循环模式下，播放文件索引号越界的处理
	if (playIndex>=playTotal) {
		if (cycleType==1 || cycleType==2) {
			playIndex = 0;
			playStatus = 1;
		}
		else {
			playIndex--;
			playStatus = 3;
			showPlayStatus();
			counterProcess = totalTime;
			showProcessInfo();
			document.getElementById('divWord1').innerHTML = '';
			document.getElementById('divWord2').innerHTML = '';
			//全屏状态执行
			if (isFullScreen) {
				document.getElementById('divWordFull1').innerHTML = '';
				document.getElementById('divWordFull2').innerHTML = '';
				document.getElementById('musicProcess').style.visibility = 'hidden';
				document.getElementById('divPlayerMusic').style.visibility = 'hidden';
				isFullScreen = false;
			}
			return;
		}
	}
	//发送播放请求
	setTimeout("makeRequest('play?|'+playRealName[playIndex], showPlayInfo, 0)", 10);
	return;
}

/*********************************************************************/
/* Function: playNext                                                */
/* Description: 播放下一个文件                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-01                                 */
/*********************************************************************/
function playNext()
{
	clearInterval(timerID_playProcess);
	clearTimeout(timerID_ProcessShow);
	isPlayProcessShow = false;
	playStatus = 1;
	playIndex++;
	if (playIndex>=playTotal) {
			playIndex = 0;
	}
	setTimeout("makeRequest('play?|'+playRealName[playIndex], showPlayInfo, 0)", 10);
	return;
}

/*********************************************************************/
/* Function: playPrevious                                            */
/* Description: 播放前一个文件                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-01                                 */
/*********************************************************************/
function playPrevious()
{
	clearInterval(timerID_playProcess);
	clearTimeout(timerID_ProcessShow);
	isPlayProcessShow = false;
	playStatus = 1;
	playIndex--;
	if (playIndex<0) {
			playIndex = playTotal-1;
	}
	setTimeout("makeRequest('play?|'+playRealName[playIndex], showPlayInfo, 0)", 10);
	return;
}

/*********************************************************************/
/* Function: changeCycleType                                         */
/* Description: 切换循环模式                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-02                                 */
/*********************************************************************/
function changeCycleType()
{
	cycleType++;
	if (cycleType>3) {
		cycleType = 0;
	}
	return;
}
///////////////////////////////////////////////////////////////////////功能处理部分结束


///////////////////////////////////////////////////////////////////////屏保图片播放部分开始
/*********************************************************************/
/* Function: screenSaverSet                                          */
/* Description: 设置屏保状态                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-02                                 */
/*********************************************************************/
function screenSaverSet()
{
	isScreenSaver++;
	if (isScreenSaver>1) {
		isScreenSaver = 0;
	}
	return;
}

/*********************************************************************/
/* Function: getBgPictureList                                        */
/* Description: 获得屏保图片列表                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-02                                 */
/*********************************************************************/
var bgPictureName = new Array(); //屏保图片文件名
var bgPictureTotal = 0; //屏保图片文件总数
var bgPictureIndex = 0; //屏保图片文件索引
function getBgPictureList()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==0) {
			bgPictureTotal = 0;
		}
		else {
			var responseXMLHead = httpRequest.responseXML.getElementsByTagName('file');
			bgPictureTotal = responseXMLHead.length;
			var parameter;
			for (var i=0; i<bgPictureTotal; i++) {
				parameter = responseXMLHead.item(i).childNodes[0].nodeValue.split('|');
				bgPictureName[i] = parameter[1];
			}
		}
		isKeyClock = false;
		screenSaverOpen();
	}
	return;
}

/*********************************************************************/
/* Function: screenSaverEvent                                        */
/* Description: 屏保定时器事件响应                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-02                                 */
/*********************************************************************/
var screenSaverCounter = 0; //屏保计数器
function screenSaverEvent()
{
	if (isScreenSaver==0 || isScreenSaverOpen) {
		return;
	}
	screenSaverCounter++;
	if (screenSaverCounter<parseInt(screenSaverTime)*60/30) {
		return;
	}
	setTimeout("makeRequest('playlist?6', getBgPictureList, 0)", 10);
	return;
}

/*********************************************************************/
/* Function: screenSaverOpen                                         */
/* Description: 屏保开启操作                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-02                                 */
/*********************************************************************/
var isScreenSaverOpen = false; //屏保开启状态
function screenSaverOpen()
{
	hideOrVisibleDiv(0);
	document.getElementById('divBrowser').style.visibility = 'hidden';
	document.getElementById('divPlayer').style.visibility = 'hidden';
	document.getElementById('divMenu').style.visibility = 'hidden';
	document.getElementById('divMenuList').style.visibility = 'hidden';
	document.getElementById('musicProcess').style.visibility = 'hidden';
	document.getElementById('divPlayerMusic').style.visibility = 'hidden';
	isScreenSaverOpen = true;
	if (bgPictureTotal==0) {
		document.getElementById('divScreenSaver').style.visibility = 'visible';
		screenSaverPlay();
	}
	else {
		bgPicturePlay();
	}
	return;
}

/*********************************************************************/
/* Function: screenSaverPlay                                         */
/* Description: 默认屏保图标开启操作                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-02                                 */
/*********************************************************************/
var divStep = 4; //屏保移动步长
var divCurrent_x, divCurrent_y; //屏保移动的初始位置
var divStep_x, divStep_y; //屏保移动实际步长
var cycleNumber;  //屏保移动总次数(一次移动)
var cycleCounter=0;  //屏保移动次数计数器
function screenSaverPlay()
{
	//获得屏保图标初始位置和目标位置
	divCurrent_x = document.getElementById('divScreenSaver').style.left;
	divCurrent_y = document.getElementById('divScreenSaver').style.top;
	var tempPos_x = parseInt(Math.random()*530);
	var tempPos_y = parseInt(Math.random()*430);
	if ((divCurrent_x==tempPos_x) && (divCurrent_y==tempPos_y)) {
		setTimeout('screenSaverPlay', 50);
		return;
	}
	//计算实际步长
	var x_number = Math.abs((divCurrent_x-tempPos_x)/divStep)+0.1;
	var y_number = Math.abs((divCurrent_y-tempPos_y)/divStep)+0.1;
	cycleNumber = parseInt(Math.max(x_number, y_number));
	if (x_number>y_number) {
		divStep_y = divStep*y_number/x_number;
		divStep_y = (divCurrent_y>tempPos_y)? (-1*divStep_y) : divStep_y;
		divStep_x = (divCurrent_x>tempPos_x)? (-divStep) : divStep;
	}
	else {
		divStep_x = divStep*x_number/y_number;
		divStep_x = (divCurrent_x>tempPos_x)? (-1*divStep_x) : divStep_x;
		divStep_y = (divCurrent_y>tempPos_y)? (-divStep) : divStep;
	}
	//开始移动屏保图标
	cycleCounter=0;
	clearInterval(timerID_moveDiv);
	timerID_moveDiv = setInterval('screenSaverMove()', 30);
	return;
}

/*********************************************************************/
/* Function: screenSaverMove                                         */
/* Description: 默认屏保图标移动                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-02                                 */
/*********************************************************************/
function screenSaverMove()
{
	cycleCounter++;
	if (cycleCounter>=cycleNumber) {
		clearInterval(timerID_moveDiv);
		screenSaverPlay();
		return;
	}
	document.getElementById('divScreenSaver').style.left = parseInt(divCurrent_x+divStep_x*cycleCounter)+"px";
	document.getElementById('divScreenSaver').style.top  = parseInt(divCurrent_y+divStep_y*cycleCounter)+"px";
	return;
}

/*********************************************************************/
/* Function: bgPicturePlay                                           */
/* Description: 播放屏保图片                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-02                                 */
/*********************************************************************/
function bgPicturePlay()
{
	if (!isScreenSaverOpen) {
		return;
	}
	bgPictureIndex++;
	bgPictureIndex = (bgPictureIndex>bgPictureTotal-1)? 0 : bgPictureIndex;
	setTimeout("makeRequest('showPic?0|0|1280|720|'+bgPictureName[bgPictureIndex]+'|'+screenSaverChange+'|9|', bgPictureCycle, 5)", 10);
	return;
}

/*********************************************************************/
/* Function: bgPictureCycle                                          */
/* Description: 循环播放屏保图片                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-02                                 */
/*********************************************************************/
var timerID_bgPicturePlay; //屏保图片播放定时器
function bgPictureCycle()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		clearTimeout(timerID_bgPicturePlay);
		timerID_bgPicturePlay = setTimeout('bgPicturePlay()', parseInt(screenSaverInterval)*1000);
	}
	return;
}

/*********************************************************************/
/* Function: screenSaverClose                                        */
/* Description: 屏保开启操作                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-02                                 */
/*********************************************************************/
function screenSaverClose()
{
	if (isScreenSaverOpen) {
		isScreenSaverOpen = false;
		setTimeout("makeRequest('showPic?0|0|1280|720|path|0|16|', screenSaverExit, 5)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: screenSaverExit                                         */
/* Description: 停止前景图片播放                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-02                                 */
/*********************************************************************/
function screenSaverExit()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		document.getElementById('divScreenSaver').style.visibility = 'hidden';
		document.getElementById('divBrowser').style.visibility = 'visible';
		hideOrVisibleDiv(1);
		if (playStatus!=0 || isAddPlayList || isAddOtherList){
			document.getElementById('divPlayer').style.visibility = 'visible';
		}
		if (isMiniMenu) {
			document.getElementById('divMenu').style.visibility = 'visible';
			document.getElementById('divMenuList').style.visibility = 'visible';
		}
		if (isFullScreen) {
			document.getElementById('divPlayerMusic').style.visibility = 'visible';
			document.getElementById('musicProcess').style.visibility = 'visible';
		}
	}
	return;
}
///////////////////////////////////////////////////////////////////////屏保图片播放部分结束


///////////////////////////////////////////////////////////////////////进度条处理部分开始
/*********************************************************************/
/* Function: showProcess                                             */
/* Description: 显示进度条的入口函数                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-17                                 */
/*********************************************************************/
var timerID_playProcess; //循环定时器ID，播放的进度条控制
var timerID_ProcessShow; //定时器ID，显示播放进度条
var isPlayProcessShow = false; //显示播放进度条的状态
var counterProcess = 0; //当前时间标志
function showProcess()
{
	if (isPlayProcessShow) {
		return;
	}
	clearInterval(timerID_playProcess);
	clearTimeout(timerID_ProcessShow);
	counterProcess = 0;
	isPlayProcessShow = true;
	getTimeRequest();
	document.getElementById('divPlayProcess').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/miniProcess.jpg)';
	document.getElementById('divPlayProcess').style.visibility = 'visible';
	//全屏状态执行
	if (isFullScreen) {
		document.getElementById('musicProcess').style.visibility = 'visible';
	}
	timerID_playProcess = setInterval('getTimeRequest();', 1000);
	return;
}

/*********************************************************************/
/* Function: hideProcess                                             */
/* Description: 隐藏进度条函数                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-17                                 */
/*********************************************************************/
function hideProcess()
{
	clearInterval(timerID_playProcess);
	clearTimeout(timerID_ProcessShow);
	isPlayProcessShow = false;
	document.getElementById('processBar').style.width = '1px';
	document.getElementById('streamTime').innerHTML = '00:00/00:00';
	return;
}

/*********************************************************************/
/* Function: getTimeRequest                                          */
/* Description: 发送获得时间的请求                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-17                                 */
/*********************************************************************/
function getTimeRequest()
{
	if (playStatus!=1) {
		return;
	}
	if (counterProcess<=2) {
		setTimeout("makeRequest('timeall', getTimeInfo, 0)", 10);
	}
	else {
		counterProcess++;
		showProcessInfo();
	}
	return;
}

/*********************************************************************/
/* Function: getTimeInfo                                             */
/* Description: 获得视频文件的当前时间                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-17                                 */
/*********************************************************************/
var currentTime = 0; //文件的当前时间
var totalTime = 0; //文件的当前时间
function getTimeInfo()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var tempStr = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue;
		var param = tempStr.split('|');
		currentTime = parseInt(param[0], 10);
		totalTime = parseInt(param[1], 10);
		counterProcess = currentTime;
		showProcessInfo();
	}
	return;
}

/*********************************************************************/
/* Function: showProcessInfo                                         */
/* Description: 显示进度条相关的信息，包括进度条长度、播放时间       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-17                                 */
/*********************************************************************/
function showProcessInfo()
{
	currentTime = counterProcess;
	currentTime = (currentTime>totalTime)? totalTime : currentTime;
	var mm = doubleDigit(parseInt(currentTime/60));
	var ss = doubleDigit(currentTime%60);
	var currentTimeStr = ''+mm+':'+ss;
	mm = doubleDigit(parseInt(totalTime/60));
	ss = doubleDigit(totalTime%60);
	var totalTimeStr = ''+mm+':'+ss;
	var timeStr = currentTimeStr+'/'+totalTimeStr;
	//列表播放状态
	var len = (totalTime==0||currentTime==0)? 1 : parseInt(300*currentTime/totalTime);
	len = (len>300)? 300 : len;
	len = (len<1)? 1 : len;
	document.getElementById('processBar').style.width = len+"px";
	document.getElementById('streamTime').innerHTML = timeStr;
	//全屏播放状态
	var lenFull = (totalTime==0||currentTime==0)? 1 : parseInt(457*currentTime/totalTime);
	lenFull = (lenFull>457)? 457 : len;
	lenFull = (lenFull<1)? 1 : len;
	document.getElementById('musicProcessBar').style.width = lenFull+"px";
	document.getElementById('musicStreamTime').innerHTML = timeStr;
	//显示歌词信息
	if (wordTotal!=0) {
		getWordIndex(currentTimeStr);
	}
	return;
}
///////////////////////////////////////////////////////////////////////进度条处理部分结束


///////////////////////////////////////////////////////////////////////音量状态显示部分开始

/*********************************************************************/
/* Function: getVolumeStatus                                         */
/* Description: 获得音量的状态，包括音量值和静音状态                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-09                                 */
/*********************************************************************/
function getVolumeStatus()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var parameter = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue.split('|');
		isMuteStatus = parseInt(parameter[0]);
		volumeLevel = parseInt(parameter[1]);
		volumeLevel = (volumeLevel%5 == 0) ? volumeLevel : (5+volumeLevel-volumeLevel%5);
	}
	return;
}

/*********************************************************************/
/* Function: volumeControl                                           */
/* Description: 音量控制操作                                         */
/* Parameters: operate 操作类型，1:音量加 2:音量减 3:静音/非静音     */
/* Author&Date: lixudong  2009-06-17                                 */
/*********************************************************************/
var volumeOperate = 0; //指示音量操作类型，0:未知操作 1:音量加 2:音量减 3:静音/非静音
var isMuteStatus = 0; //记录静音状态，0:非静音，1:静音
var volumeLevel = 50; //音量值
function volumeControl(operate)
{
	if (operate<1||operate>3) {
		return;
	}
	volumeOperate = operate;
	//hideProcess();
	//document.getElementById('divPlayProcess').style.visibility = 'hidden';
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
	if (volumeOperate==1||volumeOperate==2) {
		if (isMuteStatus==1) {
			requestStatus = makeRequest('volume?0', nullFun, 0);
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
			requestStatus = makeRequest('volume?3|'+tempLevel, nullFun, 0);
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
		requestStatus = makeRequest('volume?'+tempMuteStatus, nullFun, 0);
		if (requestStatus) {
			isMuteStatus = tempMuteStatus;
		}
		else {
			return;
		}
	}
	showVolume();
	clearTimeout(timerID_Volume);
	timerID_Volume = setTimeout('hideVolume()', 5000);
	return;
}

/*********************************************************************/
/* Function: showVolume                                              */
/* Description: 显示音量条                                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-17                                 */
/*********************************************************************/
var timerID_Volume; //定时器ID，音量条的显示控制
function showVolume()
{
	var volumeURL = (isMuteStatus==1)? 'url(image/player/miniVolumeBarOff.png)' : 'url(image/player/miniVolumeBar.png)';
	var muteURL = (isMuteStatus==1)? 'url(image/player/mute.png)' : 'url(image/player/muteOff.png)';
	var volumeURLFull = (isMuteStatus==1)? 'url(image/player/musicVolumeOff.png)' : 'url(image/player/musicVolume.png)';
	var showStr = ''+volumeLevel+'/100';
	//列表播放状态
	var len = 3*volumeLevel;
	len = (len<=1)? 1 : len;
	len = (len>=300)? 300 : len;
	document.getElementById('muteIcon').style.backgroundImage = muteURL;
	document.getElementById('volumeLevel').innerHTML = showStr;
	document.getElementById('volumeBar').style.backgroundImage = volumeURL;
	document.getElementById('volumeBar').style.width = len+"px";
	document.getElementById('divVolume').style.visibility = 'visible';
	//全屏播放状态
	var lenFull = (457*volumeLevel)/100;
	lenFull = (lenFull<=1)? 1 : lenFull;
	lenFull = (lenFull>=457)? 457 : lenFull;
	document.getElementById('musicMuteIcon').style.backgroundImage = muteURL;
	document.getElementById('musicVolumeLevel').innerHTML = showStr;
	document.getElementById('musicVolumeBar').style.backgroundImage = volumeURLFull;
	document.getElementById('musicVolumeBar').style.width = lenFull+"px";
	if (isFullScreen) {
		document.getElementById('musicVolume').style.visibility = 'visible';
	}
	return;
}

/*********************************************************************/
/* Function: hideVolume                                              */
/* Description: 隐藏音量条                                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-17                                 */
/*********************************************************************/
function hideVolume()
{
	if (isMuteStatus==1) {
		return;
	}
	clearTimeout(timerID_Volume);
	document.getElementById('divVolume').style.visibility = 'hidden';
	document.getElementById('musicVolume').style.visibility = 'hidden';
	//showProcess();
	return;
}
///////////////////////////////////////////////////////////////////////音量状态显示部分结束


///////////////////////////////////////////////////////////////////////背景音乐添加处理部分开始
/*********************************************************************/
/* Function: playListBegin                                           */
/* Description: 进入背景音乐添加状态                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-01                                 */
/*********************************************************************/
var isAddPlayList = false; //添加背景音乐状态
var isEditPlayList = false; //编辑背景音乐列表
function playListBegin()
{
	isKeyClock = true;
	if (isAddPlayList) {
		setTimeout("makeRequest('playlist?3', getBgList, 0)",10);
	}
	else if (isAddOtherList) {
		setTimeout("makeRequest('playlist?6', getBgList, 0)",10);
	}	
	showBgListMessage();
	document.getElementById('divPlayList').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/pPlaylist.jpg)';
	document.getElementById('divPlayList').style.visibility = 'visible';
	document.getElementById('divPicture').style.visibility = 'hidden';
	document.getElementById('divPlayer').style.visibility = 'visible';
	return;
}

/*********************************************************************/
/* Function: showBgListMessage                                       */
/* Description: 背景音乐列表提示信息                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-24                                 */
/*********************************************************************/
function showBgListMessage()
{
	if (isAddPlayList) {
		//背景音乐列表提示信息
		document.getElementById('divTitle').innerHTML = music_OPERATE_INFO[2];
		document.getElementById('divMessage0').innerHTML = music_LIST_MESSAGE[0];
		document.getElementById('divMessage1').innerHTML = music_LIST_MESSAGE[1];
	}
	else if (isAddOtherList) {
		document.getElementById('divTitle').innerHTML = photo_OPERATE_INFO[2];
		document.getElementById('divMessage0').innerHTML = photo_LIST_MESSAGE[0];
		document.getElementById('divMessage1').innerHTML = photo_LIST_MESSAGE[1];
	}
	return;
}

/*********************************************************************/
/* Function: playListEnd                                             */
/* Description: 退出背景音乐添加状态                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-01                                 */
/*********************************************************************/
function playListEnd()
{
	for (var i=0; i<8; i++) {
		document.getElementById('playList'+i).innerHTML = '';
	}
	bgListIndex = 0;
	if (isAddPlayList) {
		isAddPlayList = false;
		isEditPlayList = false;
	}
	else if (isAddOtherList) {		
		isAddOtherList = false;
		isEditOtherList = false;
		cancelAddPicture();
	}
	if (playStatus==0) {
		document.getElementById('divPicture').style.visibility = 'visible';
		document.getElementById('divPlayer').style.visibility = 'hidden';
	}
	document.getElementById('divPlayList').style.visibility = 'hidden';	
	document.getElementById('itemFocus').style.visibility = 'visible';
	document.getElementById('listFocus').style.visibility = 'hidden';
	document.getElementById('pageUpList').style.visibility = 'hidden';
	document.getElementById('pageDownList').style.visibility = 'hidden';
	return;
}

/*********************************************************************/
/* Function: getBgListRequest                                        */
/* Description: 发送获得背景音乐列表的请求                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-01                                 */
/*********************************************************************/
function getBgListRequest()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		playListBegin();
	}
	return;
}

/*********************************************************************/
/* Function: getBgList                                               */
/* Description: 获得背景音乐列表                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-01                                 */
/*********************************************************************/
var bgListTotal = 0; //播放列表文件总数
var bgListIndex = 0; //播放列表文件索引
var bgListSerial = new Array(); //播放列表序列号
var bgListName = new Array(); //播放列表文件名
var bgListShowName = new Array(); //播放列表文件名
function getBgList()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		var responseXMLHead = httpRequest.responseXML.getElementsByTagName('file');
		isKeyClock = false;
		bgListSerial = [];
		bgListName = [];
		bgListShowName = [];
		bgListTotal = responseXMLHead.length;
		var parameter = '', pos, len;
		for (var i=0; i<bgListTotal; i++) {
			parameter = responseXMLHead.item(i).childNodes[0].nodeValue.split('|');
			pos = bgListTotal-1-i;
			bgListSerial[pos] = parameter[0];
			bgListName[pos] = parameter[1];
			bgListShowName[pos] = parameter[2];
		}
		bgListIndex = 0;
		document.getElementById('listFocus').style.top = '62px';
		showBgList();
	}
	return;
}

/*********************************************************************/
/* Function: showBgList                                              */
/* Description: 显示背景音乐列表                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-01                                 */
/*********************************************************************/
function showBgList()
{
	if (bgListTotal<=0) {
		if (isEditPlayList || isEditOtherList) {
			keyLeft();
		}
		return;
	}
	//翻页指示状态
	var totalPage = parseInt((bgListTotal-1)/8);
	var currentPage = parseInt(bgListIndex/8);
	var showStatus = (currentPage>0)? 'visible' : 'hidden';
	document.getElementById('pageUpList').style.visibility = showStatus;
	showStatus = (currentPage<totalPage)? 'visible' : 'hidden';
	document.getElementById('pageDownList').style.visibility = showStatus;
	//显示文件列表
	for (var i=0; i<8; i++) {
		var pos = i+currentPage*8;
		var showStr = (pos<bgListTotal) ? bgListShowName[pos] : '';
		document.getElementById('playList'+i).innerHTML = showStr;
	}
	showBgListInfo();
	return;
}

/*********************************************************************/
/* Function: showBgListInfo                                          */
/* Description: 显示背景音乐列表文件信息                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-31                                 */
/*********************************************************************/
function showBgListInfo()
{
	var pos = bgListIndex%8;
	document.getElementById('listFocus').style.top = (62+48*pos)+"px";
	return;
}

/*********************************************************************/
/* Function: bgListDelete                                            */
/* Description: 清空背景音乐列表                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-14                                 */
/*********************************************************************/
function bgListDelete()
{
	if (isAddPlayList) {
		if (isEditPlayList) {
			setTimeout("makeRequest('playlist?2|'+bgListSerial[bgListIndex], hideBgList, 0)", 10);
		}
		else {
			setTimeout("makeRequest('playlist?2', hideBgList, 0)", 10);
		}
	}
	else if (isAddOtherList) {
		if (isEditOtherList) {
			setTimeout("makeRequest('playlist?5|'+bgListSerial[bgListIndex], hideBgList, 0)", 10);
		}
		else {
			setTimeout("makeRequest('playlist?5', hideBgList, 0)", 10);
		}
	}
	return;
}

/*********************************************************************/
/* Function: hideBgList                                              */
/* Description: 清空背景音乐列表显示区                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-14                                 */
/*********************************************************************/
function hideBgList()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		for (var i=0; i< 8; i++) {
			document.getElementById('playList'+i).innerHTML = '';
		}
		if (isAddPlayList) {
			setTimeout("makeRequest('playlist?3', getBgList, 0)", 10);
		}
		else if (isAddOtherList) {
			setTimeout("makeRequest('playlist?6', getBgList, 0)", 10);
		}
	}
	return;
}

/*********************************************************************/
/* Function: enablePlayList                                          */
/* Description: 背景音乐列表文件可浏览                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-05                                 */
/*********************************************************************/
function enablePlayList()
{
	if (bgListTotal == 0) {
		return;
	}
	if (isAddPlayList) {
		isEditPlayList = true;
		document.getElementById('divMessage0').innerHTML = music_LIST_MESSAGE[2];
	}
	else if (isAddOtherList) {
		isEditOtherList = true;
		document.getElementById('divMessage0').innerHTML = photo_LIST_MESSAGE[2];
	}
	document.getElementById('itemFocus').style.visibility = 'hidden';
	document.getElementById('listFocus').style.visibility = 'visible';
	return;
}

/*********************************************************************/
/* Function: disablePlayList                                         */
/* Description: 背景音乐列表文件不可浏览                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-05                                 */
/*********************************************************************/
function disablePlayList()
{
	if (isAddPlayList) {
		isEditPlayList = false;
		document.getElementById('divMessage0').innerHTML = music_LIST_MESSAGE[0];
	}
	else if (isAddOtherList) {
		isEditOtherList = false;
		document.getElementById('divMessage0').innerHTML = photo_LIST_MESSAGE[0];
	}
	document.getElementById('itemFocus').style.visibility = 'visible';
	document.getElementById('listFocus').style.visibility = 'hidden';
	return;
}

/*********************************************************************/
/* Function: playListNext                                            */
/* Description: 向下移动焦点，选择文件列表中的下一个                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-05                                 */
/*********************************************************************/
function playListNext()
{
	if (bgListIndex>=(bgListTotal-1)) {
		return;
	}
	bgListIndex++;
	var pos = bgListIndex%8;
	if (pos==0) {
		showBgList();
	}
	else {
		showBgListInfo();
	}
	return;
}

/*********************************************************************/
/* Function: playListPrevious                                        */
/* Description: 向上移动焦点，选择文件列表中的前一个                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-05                                 */
/*********************************************************************/
function playListPrevious()
{
	if (bgListIndex<=0) {
		return;
	}
	bgListIndex--;
	var pos = bgListIndex%8;
	if (pos==7) {
		showBgList();
	}
	else {
		showBgListInfo();
	}
	return;
}

/*********************************************************************/
/* Function: playListPageNext                                        */
/* Description: 向后翻页                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-05                                 */
/*********************************************************************/
function playListPageNext()
{
	if (bgListIndex>=(bgListTotal-1)) {
		return;
	}
	bgListIndex += 8;
	bgListIndex = (bgListIndex>=(bgListTotal-1))? (bgListTotal-1) : bgListIndex;
	showBgList();
	return;
}

/*********************************************************************/
/* Function: playListPagePrevious                                    */
/* Description: 向前翻页                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-05                                 */
/*********************************************************************/
function playListPagePrevious()
{
	if (bgListIndex<=0) {
		return;
	}
	bgListIndex -= 8;
	bgListIndex = (bgListIndex<=0)? 0 : bgListIndex;
	showBgList();
	return;
}
///////////////////////////////////////////////////////////////////////背景音乐添加 处理部分结束


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
		document.getElementById('divMenu').style.visibility = 'visible';
		document.getElementById('divMenuList').style.visibility = 'visible';
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
	var tempStatus;
	//设置图标的判断
	document.getElementById('divMenuPos1').style.backgroundImage = 'url(image/'+SETUP_Language+'/menuIcon16.png)';
	//循环方式图标的判断
	var tempType = cycleType;
	document.getElementById('divMenuPos2').style.backgroundImage = 'url(image/'+SETUP_Language+'/menuIcon2'+tempType+'.png)';
	//添加背景音乐图标
	tempStatus = isAddOtherList ? 33 : 3;
	document.getElementById('divMenuPos3').style.backgroundImage = 'url(image/'+SETUP_Language+'/menuIcon'+tempStatus+'.png)';
	//添加屏保图标
	tempStatus = isAddPlayList ? 36 : 6;
	document.getElementById('divMenuPos4').style.backgroundImage = 'url(image/'+SETUP_Language+'/menuIcon'+tempStatus+'.png)';
	//屏保状态设置图标的判断
	tempStatus = (isScreenSaver==1)? 4 : 5;
	document.getElementById('divMenuPos5').style.backgroundImage = 'url(image/'+SETUP_Language+'/menuIcon'+tempStatus+'.png)';
	return;
}

/*********************************************************************/
/* Function: miniMenuHide                                            */
/* Description: 关闭功能菜单时保存设置                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-27                                 */
/*********************************************************************/
function miniMenuHide()
{
	var tempSetup = 'cycleType='+cycleType+'|'+'isScreenSaver='+isScreenSaver+'|';
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
			document.getElementById('divMenu').style.visibility = 'hidden';
			document.getElementById('divMenuList').style.visibility = 'hidden';
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
var miniMenuTotal = 5; //功能菜单选项的总数
var miniMenuIndex = 0; //功能菜单选项的序列号
function miniMenuNext()
{
	miniMenuIndex = (miniMenuIndex>=(miniMenuTotal-1))? 0 : (miniMenuIndex+1);
	miniMenuIndex = (isAddOtherList &&(miniMenuIndex==2))?3:miniMenuIndex;
	miniMenuIndex = (isAddPlayList &&(miniMenuIndex==3))?4:miniMenuIndex;
	document.getElementById('divMenuFocus').style.left = (57+miniMenuIndex*140)+"px";
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
	miniMenuIndex = (isAddPlayList &&(miniMenuIndex==3))?2:miniMenuIndex;
	miniMenuIndex = (isAddOtherList &&(miniMenuIndex==2))?1:miniMenuIndex;
	document.getElementById('divMenuFocus').style.left = (57+miniMenuIndex*140)+"px";
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
		var tempSetup = 'cycleType='+cycleType+'|'+'isScreenSaver='+isScreenSaver+'|';
		makeRequest('config?3|'+tempSetup, gotoSetupRequest, 1);
	}
	else if (miniMenuIndex==1) {
		changeCycleType();
		miniMenuShow();
	}
	else if (miniMenuIndex==2) {
		miniMenuHide();
		addMusicList();
		document.getElementById('fullPlayInfo').style.visibility = 'hidden';
	}
	else if(miniMenuIndex==3) {
		miniMenuHide();
		addPictureList();
		document.getElementById('fullPlayInfo').style.visibility = 'hidden';
	}
	else if (miniMenuIndex==4) {
		screenSaverSet();
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
			setTimeout("makeRequest('stop', gotoSettings, 0)", 10);
		}
	}
	return;
}

/*********************************************************************/
/* Function: gotoSettings                                            */
/* Description: 跳转到设置界面                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-30                                 */
/*********************************************************************/
function gotoSettings()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var hrefStr = document.location.href.split('?');
		document.location.href = 'settings.html?musicList@'+hrefStr[1];
	}
	return;
}

/*********************************************************************/
/* Function: addMusicList                                            */
/* Description: 添加背景音乐按钮的处理                               */
/* Parameters:                                                       */
/* Author&Date: gaoguanglei  2010-04-14                              */
/*********************************************************************/
function addMusicList()
{
	if (isAddPlayList){
		return;
	}
	isAddPlayList = true;
	playListBegin();
}

/*********************************************************************/
/* Function: addPictureList                                          */
/* Description: 添加屏保图片                                         */
/* Parameters:                                                       */
/* Author&Date: gaoguanglei  2010-04-14                              */
/*********************************************************************/
var isAddOtherList = false; //添加屏保图片状态
var isEditOtherList = false; //编辑屏保图片列表
var middleQueuePath = new Array(); //路径队列中最后一个
var middleFileIndex = 0;
var middleShowPath = new Array();//记录显示添加音乐列表前的路径队列
var middleQueuefileIndex = new Array(); //记录文件指针队列
function addPictureList()
{
	if (isAddOtherList) {
		return;
	}
	middleQueuePath = [];
	middleQueuefileIndex = [];
	middleShowPath = [];
	middleFileIndex = fileIndex;
	for (var i=0; i< queuePath.length; i++) {
		middleQueuePath[i] = queuePath[i];
	}
	for (var j=0; j< queuefileIndex.length; j++) {
		middleQueuefileIndex[j] = queuefileIndex[j];
	}
	for (var t=0; t< queuePathShow.length; t++) {
		middleShowPath[t] = queuePathShow[t];
	}
	queuePath = new Array();
	queuePath[0] = middleQueuePath[0];
	document.getElementById('diskInfo').innerHTML = queuePathShow[0];
	mediaType = 'photo';
	fileIndex = 0;
	isAddOtherList = true;
	getFileListRequest();
	playListBegin();
}

/*********************************************************************/
/* Function: cancelAddPicture                                        */
/* Description: 退出添加背景音乐操作                                 */
/* Parameters:                                                       */
/* Author&Date: gaoguanglei  2010-04-08                              */
/*********************************************************************/
function cancelAddPicture()
{
	queuePath = [];	
	queuefileIndex = [];
	queuePathShow = [];
	for (var i=0; i< middleQueuePath.length; i++) {
		queuePath[i] = middleQueuePath[i];
	}
	for (var j=0; j< middleQueuefileIndex.length; j++) {
		queuefileIndex[j] =  middleQueuefileIndex[j];
	}
	for (var t=0; t< middleShowPath.length; t++) {
		queuePathShow[t] = middleShowPath[t];
	}
	var len = queuePathShow.length -1;
	fileIndex = middleFileIndex;
	mediaType = 'music';
	document.getElementById('diskInfo').innerHTML = queuePathShow[len];
	getFileListRequest();
	return;
}
///////////////////////////////////////////////////////////////////////功能菜单处理部分结束

/*********************************************************************/
/* Function: hideOrVisibleDiv 										 */
/* Description: 显示或隐藏翻页图标  									 */
/* Parameters: 0 is hide and 1 is visible                            */
/* Author&Date: zhaopengjun 2010-09-10                               */
/*********************************************************************/
function hideOrVisibleDiv(p)
{
	if (p == 0) {
		document.getElementById('pageUp').style.visibility = 'hidden';
		document.getElementById('pageDown').style.visibility = 'hidden';
		document.getElementById('listFocus').style.visibility = 'hidden';
		document.getElementById('itemFocus').style.visibility = 'hidden';
		if (isAddPlayList || isAddOtherList) {
			document.getElementById('divPlayList').style.visibility = 'hidden';
			document.getElementById('pageUpList').style.visibility = 'hidden';
			document.getElementById('pageDownList').style.visibility = 'hidden';
		}
		if (playStatus == 0) {
			document.getElementById('divPicture').style.visibility = 'hidden';
		} else {
			document.getElementById('fullPlayInfo').style.visibility = 'hidden';	
			document.getElementById('divPlayProcess').style.visibility = 'hidden';
			document.getElementById('divVolume').style.visibility = 'hidden';
			document.getElementById('musicVolume').style.visibility = 'hidden';
		}
	} else {
		var pageTotal = parseInt((fileTotal-1)/8);
		var pageCurrent = parseInt(fileIndex/8);
		var showStatus = (pageCurrent>0)? 'visible' : 'hidden';
		document.getElementById('pageUp').style.visibility = showStatus;
		showStatus = (pageCurrent<pageTotal)? 'visible' : 'hidden';
		document.getElementById('pageDown').style.visibility = showStatus;
		if (isEditPlayList || isEditOtherList) {
			document.getElementById('listFocus').style.visibility = 'visible';
		} else {
			document.getElementById('itemFocus').style.visibility = 'visible';
		}
		if (isAddPlayList || isAddOtherList) {
			document.getElementById('divPlayList').style.visibility = 'visible';
			var totalPage = parseInt((bgListTotal-1)/8);
			var currentPage = parseInt(bgListIndex/8);
			var showStatus = (currentPage>0)? 'visible' : 'hidden';
			document.getElementById('pageUpList').style.visibility = showStatus;
			showStatus = (currentPage<totalPage)? 'visible' : 'hidden';
			document.getElementById('pageDownList').style.visibility = showStatus;			
		} else {
			if (playStatus != 0) {
				document.getElementById('fullPlayInfo').style.visibility = 'visible';
			}
		}
		if (playStatus == 0) {
			document.getElementById('divPicture').style.visibility = 'visible';
		} else {
			document.getElementById('divPlayProcess').style.visibility = 'visible';
		}
	}
	return;
}
