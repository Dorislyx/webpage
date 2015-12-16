/******************************************************设置页面和当前页用到的变量*/
var lanternInterval = 6; //幻灯播放时间间隔
var lanternMode = 0; //循环模式，0:顺序方式 1:循环方式 2:随机方式
var lanternChangeType = 6;//切换效果
/*********************************************************************************/

///////////////////////////////////////////////////////////////////////按键处理部分开始
/*********************************************************************/
/* Function: keyEvent                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-26                                 */
/*********************************************************************/
var isKeyClock = false; //遥控器按键锁定，用于播放请求处理过程中屏蔽遥控器按键
var isDoesnotItem = false; //无可用硬盘或服务器的状态
function keyEvent(e)
{
	var keyValue = e.which;
	iPanel.ioctlWrite('printf', 'keyValue===================='+keyValue+'\n');
	//移动设备插拔的处理
	if (keyValue>=0xff20 && keyValue<=0xff34) {
		showUSBInfo(keyValue);
		return;
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
		case 1073741879: //mute
			if (isMusicListPlay) {
				volumeControl(3);
			}
			break;
		case 1073741884: //B160 音量-
			if (isMusicListPlay) {
				volumeControl(2);
			}
			break;
		case 1073741880: //B160 音量+
			if (isMusicListPlay) {
				volumeControl(1);
			}
			break;
		case 1073741882: //track(声道)
			keyTrack();
			break;
		case 519:	//设置
			makeRequest('winplay', nullFun, 0);
			makeRequest('showPic?0|0|1280|720|path|0|16|', gotoSettingsPage, 5);
			return false;
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

		case 0xff01: //播放到尾(buffer读完，解码器仍然解码)
			break;
		case 0xff02: //播放到尾(解码器停止)
			break;
		case 0xff03: //播放下一段
			break;
		case 0xff04: //播放开始
			break;

		case 0xff41: //定时器，每30秒发送一次
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
/* Author&Date: zhaopengjun 2010-5-13	                              */
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
		case 1073741879: //mute
			if (isMusicListPlay) {
				volumeControl(3);
			}
			break;
		case 1073741884: //B160 音量-
			if (isMusicListPlay) {
				volumeControl(2);
			}
			break;
		case 1073741880: //B160 音量+
			if (isMusicListPlay) {
				volumeControl(1);
			}
			break;
		case 1073741882: //track(声道)
			keyTrack();
			break;
		case 519:	//设置
			makeRequest('winplay', nullFun, 0);
			makeRequest('showPic?0|0|1280|720|path|0|16|', gotoSettingsPage, 5);
			return false;
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

		case 0xff01: //播放到尾(buffer读完，解码器仍然解码)
			break;
		case 0xff02: //播放到尾(解码器停止)
			break;
		case 0xff03: //播放下一段
			break;
		case 0xff04: //播放开始
			break;

		case 0xff41: //定时器，每30秒发送一次
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
		playMenuOpen();
	}
	else {
		miniMenuOpen();
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
	if (isFullScreen) {
		lanternPlayer();
	}
	else {
		channelSelect();
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
	if (isFullScreen) {
		if (isPlayMenu) {
			playMenuPrevious();
			playMenuHideTimer();
		}
		else if (imageSizeScale>100) {
			imageMove(0);
		}
		else if (isLanternStatus) {
			changeLanternTime(0);
		}
		return;
	}
	if (isMiniMenu) {
		miniMenuPrevious();
	}
	else if ((isAddPlayList && isEditPlayList) || (isAddOtherList && isEditOtherList)) {
		disablePlayList();
	}
	return;
}

/*********************************************************************/
/* Function: keyLeftCode                                             */
/* Description: keyLeftCode 按键处理函数                              */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-5-13	                            */
/*********************************************************************/
function keyLeftCode()
{
	if (isFullScreen) {
		if (isPlayMenu) {
			playMenuPrevious();
			playMenuHideTimer();
		}
		else if (imageSizeScale>100) {
			imageMove(0);
		}
		else if (isLanternStatus) {
			changeLanternTime(0);
		}
		else if (isMusicListPlay) {
			volumeControl(2);
		}
		return;
	}
	if (isMiniMenu) {
		miniMenuPrevious();
	}
	else if ((isAddPlayList && isEditPlayList) || (isAddOtherList && isEditOtherList)) {
		disablePlayList();
	}
	else if (isMusicListPlay && !isAddPlayList && !isAddOtherList) {
		volumeControl(2);
	}
	return;
}

/*********************************************************************/
/* Function: keyRight                                                */
/* Description: keyRight 按键处理函数                                  */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function keyRight()
{
	if (isFullScreen) {
		if (isPlayMenu) {
			playMenuNext();
			playMenuHideTimer();
		}
		else if (imageSizeScale>100) {
			imageMove(1);
		}
		else if (isLanternStatus) {
			changeLanternTime(1);
		}
		return;
	}
	if (isMiniMenu) {
		miniMenuNext();
	}
	else if (isAddPlayList && !isEditPlayList) {
		enablePlayList();
	}
	else if (isAddOtherList && !isEditOtherList) {
		enablePlayList();
	}
	return;
}

/*********************************************************************/
/* Function: keyRightCode                                            */
/* Description: keyRightCode 按键处理函数                             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-5-13	                            */
/*********************************************************************/
function keyRightCode()
{
	if (isFullScreen) {
		if (isPlayMenu) {
			playMenuNext();
			playMenuHideTimer();
		}
		else if (imageSizeScale>100) {
			imageMove(1);
		}
		else if (isLanternStatus) {
			changeLanternTime(1);
		}
		else if (isMusicListPlay) {
			volumeControl(1);
		}
		return;
	}
	if (isMiniMenu) {
		miniMenuNext();
	}
	else if (isAddPlayList && !isEditPlayList) {
		enablePlayList();
	}
	else if (isAddOtherList && !isEditOtherList) {
		enablePlayList();
	}
	else if (isMusicListPlay && !isAddPlayList && !isAddOtherList) {
		volumeControl(1);
	}
	return;
}

/*********************************************************************/
/* Function: keyUp                                                   */
/* Description: keyUp 按键处理函数                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function keyUp()
{
	if (isFullScreen) {
		if (isPlayMenu) {
			if (playMenuIndex==5) {
				changeLanternTime(1);
				playMenuHideTimer();
			}
		}
		else if (imageSizeScale>100) {
			imageMove(2);
		}
		return;
	}
	if (isMiniMenu) {
		return;
	}
	if ((isAddPlayList && isEditPlayList)||(isAddOtherList && isEditOtherList)) {
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
	if (isFullScreen) {
		if (isPlayMenu) {
			if (playMenuIndex==5) {
				changeLanternTime(0);
				playMenuHideTimer();
			}
		}
		else if (imageSizeScale>100) {
			imageMove(3);
		}
		return;
	}
	if (isMiniMenu) {
		return;
	}
	if ((isAddPlayList && isEditPlayList)||(isAddOtherList && isEditOtherList)) {
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
	if (isFullScreen) {
		playNext();
		return;
	}
	if (isMiniMenu) {
		return;
	}
	if ((isAddPlayList && isEditPlayList)||(isAddOtherList && isEditOtherList)) {
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
	if (isFullScreen) {
		playPrevious();
		return;
	}
	if (isMiniMenu) {
		return;
	}
	if ((isAddPlayList && isEditPlayList)||(isAddOtherList && isEditOtherList)) {
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
	if (isFullScreen) {
		if (isPlayMenu) {
			playMenuSelect()
			playMenuHideTimer();
		}
		return;
	}
	if (isMiniMenu) {
		miniMenuSelect();
		return;
	}
	if ((isAddPlayList && isEditPlayList) || (isAddOtherList && isEditOtherList)) {
		bgListDelete();
		return;
	}
	channelSelect();
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
		playMenuHide();
		if (!isFullAddMusic) {
			fileIndex = fileTotal-playTotal+playIndex;
		}
		isLanternStatus = false;
		revolutionAngle = 0; //图片旋转角度
		imageSizeScale = 100; //缩放比例
		clearTimeout(lanternTimerID);
		if (isMuteStatus==0 || isNoMusicList) {
			hideMusicListInfo();
		}
		setTimeout("makeRequest('config?3|lanternMode='+lanternMode+'|lanternInterval='+lanternInterval+'|', setConfig, 1)", 10);		
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
function keyRed()
{
	if (isFullScreen) {
		return;
	}
	if (isMiniMenu) {
		return;
	}
	if (isAddPlayList || isAddOtherList) {
		bgListDelete();
		return;
	}
}

/*********************************************************************/
/* Function: keyGreen                                                */
/* Description: keyGreen 绿色按键处理函数(取消操作)                  */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function keyGreen()
{
	if (isFullScreen) {
		return;
	}
	if (isMiniMenu) {
		return;
	}
	if ((isAddPlayList)||(isAddOtherList)) {
		playListEnd();
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
/* Function: keyChannelUp                                            */
/* Description: keyChannelUp 按键处理函数                            */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-01                                 */
/*********************************************************************/
function keyChannelUp()
{
	if (isFullScreen) {
		playNext();
	}
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
	if (isFullScreen) {
		playPrevious();
	}
	return;
}
///////////////////////////////////////////////////////////////////////按键处理部分结束


///////////////////////////////////////////////////////////////////////初始化部分开始
/*********************************************************************/
/* Function: setConfig                                               */
/* Description: 存储皮肤、语言设置                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-04                                 */
/*********************************************************************/
function setConfig()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		setTimeout("makeRequest('showPic?0|0|1280|720|path|0|16|', gotoBrowser, 5)", 10);
	}
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
/* Function: getConfig                                               */
/* Description: 获得皮肤、语言设置                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-31                                 */
/*********************************************************************/
function getConfig()
{
	makeRequest('config?2', getSetupParameter, 1);
	return;
}

/*********************************************************************/
/* Function: setParameter                                            */
/* Description: 设置皮肤、语言设置参数                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-31                                 */
/*********************************************************************/
function getSetupParameter()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==1) {
			var chinese = 'chinese';
			var english = 'english';
 			var parameter = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue.split('|');
			for (var i=0; i<parameter.length; i++) {
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
/* Author&Date: lixudong  2010-03-15                                 */
/*********************************************************************/
var ViewTotal = 8; //每页能显示的显目总数
function webStyleSet()
{
	ViewTotal = 8;
	document.getElementById('styleList').style.visibility = 'hidden';
	document.getElementById('divPicture').style.visibility = 'visible';
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
	
	music_LanguageSelect();
	photo_LanguageSelect();
	//显示背景菜单图片
	var tempURL = 'url(image/skin'+SETUP_SkinIndex+'/fileList.jpg)';
	document.getElementById('bgPicture').style.backgroundImage = tempURL;
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
	//显示当前路径
	document.getElementById('diskInfo').innerHTML = queuePathShow[0];
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
	var fastIndex = parseInt(fileIndex/ViewTotal)*ViewTotal;
	var begin = fastIndex+1;
	var end = fastIndex+ViewTotal;
	var pathIndex = queuePath.length-1;
	isKeyClock = true;
	var requestStr = zoneType+'|name|'+mediaType+'|'+queuePath[pathIndex]+'|'+begin+'$'+end;
	makeRequest('list?'+requestStr, getFileList, 4);
	return;
}

/*********************************************************************/
/* Function: getFileList                                             */
/* Description: 获得文件夹和文件列表数据                                 */
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
			document.getElementById('divInfo').innerHTML = photo_OPERATE_INFO[0]+photo_OPERATE_INFO[1];
			document.getElementById('divInfo').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/pSelect.png)';
			document.getElementById('divInfo').style.visibility = 'visible';
			isDoesnotItem = true;
			isKeyClock = false;
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
		for (var i=0; i< fileReturnTotal; i++) {
			parameter = responseXMLHead.item(i).childNodes[0].nodeValue.split('|');
			fileType[i] = parseInt(parameter[0]);
			fileExtend[i] = parameter[1].toUpperCase();
			fileSize[i] = parseFloat(parameter[2]);
			fileTime[i] = parameter[3];
			fileRealName[i] = parameter[4];
			fileShowName[i] = parameter[5];
			filePicture[i] = (parameter[6]=='no_picture')? 'image/defaultIcon'+fileType[i]+'.jpg' : 'file:///LocalPlayer'+parameter[6];
		}
		showFileList();
		isKeyClock = false;
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
		document.getElementById('styleList').style.height = "0px";
		document.getElementById('itemList').style.height = "0px";
		return;
	}
	//计算当前页号和总页数
	var pageTotal = parseInt((fileTotal-1)/ViewTotal);
	var pageCurrent = parseInt(fileIndex/ViewTotal);
	//计算当前页列表的结束位置
	document.getElementById('itemList').style.height = 48*fileReturnTotal+"px";
	//显示页码和翻页指示
	var tempPageNumber = photo_PAGE_NUMBER[0]+(pageCurrent+1)+photo_PAGE_NUMBER[1]+(pageTotal+1)+photo_PAGE_NUMBER[2];
	document.getElementById('pageNumber').innerHTML = tempPageNumber;
	var showStatus = (pageCurrent>0)? 'visible' : 'hidden';
	document.getElementById('pageUp').style.visibility = showStatus;
	showStatus = (pageCurrent<pageTotal)? 'visible' : 'hidden';
	document.getElementById('pageDown').style.visibility = showStatus;

	//显示文件夹和文件列表
	for (var i=0; i<ViewTotal; i++) {
		var tempImg = (i<fileReturnTotal)? 'url(image/fileIcon'+fileType[i]+'.png)' : 'url(image/null.png)';
		var tempStr = (i<fileReturnTotal)? fileShowName[i] : '';
		document.getElementById('iconList'+i).style.backgroundImage = tempImg;
		document.getElementById('textList'+i).innerHTML = tempStr;
	}
	//显示图标信息
	if (isMiniMenu || isAddPlayList || isAddOtherList) {
		document.getElementById('divPicture').style.visibility = 'hidden';
	}
	else {
		document.getElementById('divPicture').style.visibility = 'visible';
	}
	if (isAddOtherList || isAddPlayList) {		
		var pos = fileIndex%ViewTotal;
		document.getElementById('itemFocus').style.top = (0+48*pos)+"px";
		return;
	}	
	getPictureRequest();
}

/*********************************************************************/
/* Function: getPictureRequest                                       */
/* Description: 发送获得图片(海报、缩略图)的请求                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-19                                 */
/*********************************************************************/
function getPictureRequest()
{
	var pos = fileIndex%ViewTotal;
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
			var pos = fileIndex%ViewTotal;
			filePicture[pos] = responseXMLHead.item(0).childNodes[0].nodeValue;
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
	var pos = fileIndex%ViewTotal;
	document.getElementById('itemFocus').style.top = (0+48*pos)+"px";
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
	showStr += photo_FILE_INFO[0]+typeStr+'<br>';
	if (fileType[pos]!=0) {
		showStr += photo_FILE_INFO[1]+sizeStr+'<br>';
	}
	showStr += photo_FILE_INFO[2]+timeStr[0]+'<br>';
	showStr += photo_FILE_INFO[3]+timeStr[1]+'<br>';
	showStr += photo_FILE_INFO[4]+nameStr;
	//显示分区信息
	document.getElementById('itemInfo').innerHTML = showStr;
	document.getElementById('itemInfo').style.visibility = 'visible';
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
	document.getElementById('styleList').style.height = "0px";
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
	//document.getElementById('divPicture').style.visibility = 'hidden';
	document.getElementById('itemInfo').innerHTML = '';
	return;
}

/*********************************************************************/
/* Function: channelNext                                             */
/* Description: 向下移动焦点，选择下一个选项                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-12                                 */
/*********************************************************************/
function channelNext()
{
	if (fileIndex>(fileTotal-1)) {
		return;
	}
	fileIndex++;
	fileIndex = fileIndex>(fileTotal-1) ? 0 : fileIndex;
	var pos = fileIndex%ViewTotal;
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
/* Author&Date: lixudong  2010-03-12                                 */
/*********************************************************************/
function channelPrevious()
{
	if (fileIndex<0) {
		return;
	}
	fileIndex--;
	fileIndex = fileIndex<0 ? fileTotal-1 : fileIndex;
	var pos = fileIndex%ViewTotal;
	if (pos==(ViewTotal-1) || fileIndex==(fileTotal-1)) {
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
	fileIndex += ViewTotal;
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
	fileIndex -= ViewTotal;
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
/* Author&Date: lixudong  2009-12-05                                 */
/*********************************************************************/
function channelSelect()
{
	//选中文件后的处理
	var pos = fileIndex%ViewTotal;
	if (fileType[pos]!=0) {
		if (isAddPlayList && !isEditPlayList) {
			setTimeout("makeRequest('playlist?7|'+fileRealName["+pos+"], getBgListRequest, 0)", 10);
			return;
		}
		if (isAddOtherList && !isEditOtherList) {
			setTimeout("makeRequest('playlist?4|'+fileRealName["+pos+"], getBgListRequest, 0)", 10);
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
		if (isFullAddMusic) {
			playListEnd();
			return;
		}
		setTimeout("makeRequest('stop', exitWebPage, 0)",10);
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
///////////////////////////////////////////////////////////////////////功能处理部分结束


///////////////////////////////////////////////////////////////////////进入全屏播放状态后的处理开始
/*********************************************************************/
/* Function: getPlayListRequest                                      */
/* Description: 获得播放文件的列表                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-04                                 */
/*********************************************************************/
function getPlayListRequest()
{
	document.getElementById("bodyID").bgColor = 'transparent';
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
/* Author&Date: lixudong  2009-12-04                                 */
/*********************************************************************/
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
		document.getElementById('itemInfo').style.visibility = 'hidden';
		document.getElementById('divBrowser').style.visibility = 'hidden';
		hideOrVisibleDiv(0);
		gotoFullScreen();
	}
	return;
}

/*********************************************************************/
/* Function: gotoFullScreen                                          */
/* Description: 进入全屏播放状态                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-04                                 */
/*********************************************************************/
var isFullScreen = false; //全屏显示状态
function gotoFullScreen()
{
	clearTimeout(timerID_infoBar);
	isFullScreen = true;
	document.getElementById('divPicture').style.visibility = 'hidden';
	revolutionAngle = 0; //图片旋转角度
	if (!isLanternStatus) {
		document.getElementById('divSetupInfo').innerHTML = photo_LOAD_INFO[0];
		document.getElementById('divSetupInfo').style.visibility = 'visible';
	}
	document.getElementById('divSetupInfo').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/imageBrowser.png)';
	isKeyClock = true;
	setTimeout("makeRequest('showPic?0|0|1280|720|'+playRealName[playIndex]+'|2|16|'+playIndex+'|', showOtherType, 5)", 10);
	return;
}

/*********************************************************************/
/* Function: gotoBrowser                                             */
/* Description: 进入文件浏览状态                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-04                                 */
/*********************************************************************/
function gotoBrowser()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		isKeyClock = false;
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==0) {
			return;
		}
		isFullScreen = false;
		document.getElementById('divSound').style.top = '100px';
		document.getElementById('divSound').style.left = '1040px';
		if (!isFullAddMusic) {
			getFileListRequest();
		}
		document.getElementById("bodyID").bgColor = '#000000';
		document.getElementById('divBrowser').style.visibility = 'visible';
		document.getElementById('itemInfo').style.visibility = 'visible';
		document.getElementById('divPicture').style.visibility = 'hidden';
		document.getElementById('divSetupInfo').style.visibility = 'hidden';
		document.getElementById('fullWindows').innerHTML = '';
		hideOrVisibleDiv(1);
	}
	return;
}

/*********************************************************************/
/* Function: showOtherType                                           */
/* Description: 显示非JPG类型的文件                                  */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-04                                 */
/*********************************************************************/
function showOtherType()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		isKeyClock = false;
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		var returnIndex = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue;
		if (getStatus==0) {
			setTimeout("makeRequest('showPic?0|0|1280|720|path|0|16|', nullFun, 5)", 10);
			document.getElementById('fullWindows').innerHTML = photo_LOAD_INFO[1];
		}
		else {
			document.getElementById('fullWindows').innerHTML = '';
		}
		document.getElementById('divSound').style.top = '50px';
		document.getElementById('divSound').style.left = '1068px';
		if (isLanternStatus) {
			lanternTimerID = setTimeout('lanternShow()', lanternInterval*1000);
		}
		else {
			playIndex = parseInt(returnIndex);
			var showStr = photo_PLAY_BROWSE[0]+photo_PLAY_BROWSE[1]+(playIndex+1)+photo_PLAY_BROWSE[2]+playTotal+photo_PLAY_BROWSE[3];
			document.getElementById('divSetupInfo').innerHTML = showStr;
			document.getElementById('divSetupInfo').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/imageBrowser.png)';
			showInfoBar();
		}
	}
	return;
}

/*********************************************************************/
/* Function: showInfoBar                                             */
/* Description: 显示操作提示条                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-04                                 */
/*********************************************************************/
var timerID_infoBar; //操作提示条定时器
function showInfoBar()
{
	document.getElementById('divSetupInfo').style.visibility = 'visible';
	clearTimeout(timerID_infoBar);
	timerID_infoBar = setTimeout('hideInfoBar()', 3000);
	return;
}

/*********************************************************************/
/* Function: hideInfoBar                                             */
/* Description: 隐藏操作提示条                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-04                                 */
/*********************************************************************/
function hideInfoBar()
{
	clearTimeout(timerID_infoBar);
	document.getElementById('divSetupInfo').style.visibility = 'hidden';
	return;
}
///////////////////////////////////////////////////////////////////////进入全屏播放状态后的处理结束


///////////////////////////////////////////////////////////////////////全屏播放下的幻灯播放处理开始
/*********************************************************************/
/* Function: lanternPlayer                                           */
/* Description: 幻灯方式播放模式控制                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-05                                 */
/*********************************************************************/
var isLanternStatus = false; //幻灯播放状态记录
var lanternTimerID; //幻灯播放定时器
function lanternPlayer()
{
	if (isLanternStatus) {
		isLanternStatus = false;
		clearTimeout(lanternTimerID);
		var showStr = photo_PLAY_BROWSE[0]+photo_PLAY_BROWSE[1]+(playIndex+1)+photo_PLAY_BROWSE[2]+playTotal+photo_PLAY_BROWSE[3];
		document.getElementById('divSetupInfo').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/imageBrowser.png)';
		document.getElementById('divSetupInfo').innerHTML = showStr;
		showInfoBar();
	}
	else {
		clearTimeout(lanternTimerID);
		var showStr = photo_PLAY_SLIDE[0]+photo_CYC_TYPE[lanternMode]+photo_PLAY_SLIDE[1]+lanternInterval+photo_PLAY_SLIDE[2];
		document.getElementById('divSetupInfo').innerHTML = showStr;
		document.getElementById('divSetupInfo').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/lanternBackground.png)';
		showInfoBar();
		isLanternStatus = true;
		//lanternTimerID = setTimeout('lanternShow()', 2000);
		lanternTimerID = setTimeout('lanternShow()', 1);
	}
	//图片播放菜单底图的更换
	playMenuTotal = (isLanternStatus)? 6 : 9;
	var tempBg = (isLanternStatus)? 'url(image/imagePlayIcon2.png)' : 'url(image/imagePlayIcon1.png)';
	document.getElementById('imageMenuPic').style.backgroundImage = tempBg;
	//图片播放菜单焦点的处理
	playMenuIndex = (playMenuIndex>=playMenuTotal)? 0 : playMenuIndex;
	document.getElementById('imageMenuFocus').style.left = (22+playMenuIndex*55)+"px";
	return;
}

/*********************************************************************/
/* Function: lanternShow                                             */
/* Description: 幻灯方式显示图片                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-05                                 */
/*********************************************************************/
function lanternShow()
{
	if (!isFullScreen) {
		return;
	}
	if (lanternMode==0) {
		if (playIndex>=playTotal-1) {
			keyBack();
			return;
		}
		playIndex++;
	}
	else if (lanternMode==1) {
		playIndex++;
		playIndex = (playIndex>=playTotal)? 0 : playIndex;
	}
	else if (lanternMode==2) {
		var randomVol = parseInt(Math.random()*playTotal);
		playIndex = (playIndex==randomVol)? (playIndex+1) : randomVol;
		playIndex = (playIndex>=playTotal)? 0 : playIndex;
	}
	changeImageFull();
	return;
}

/*********************************************************************/
/* Function: changeImageFull                                         */
/* Description: 发送显示图片的请求(全屏)                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-05                                 */
/*********************************************************************/
function changeImageFull()
{
	if (!isLanternStatus) {
		clearTimeout(timerID_infoBar);
		document.getElementById('divSetupInfo').innerHTML = photo_LOAD_INFO[0];
		document.getElementById('divSetupInfo').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/imageBrowser.png)';
		document.getElementById('divSetupInfo').style.visibility = 'visible';
		timerID_infoBar = setTimeout('hideInfoBar()', 3000);
	}
	revolutionAngle = 0; //图片旋转角度
	imageSizeScale = 100;
	setTimeout("makeRequest('showPic?0|0|1280|720|'+playRealName[playIndex]+'|'+lanternChangeType+'|9|'+playIndex+'|', showOtherType, 5)", 10);
	return;
}

/*********************************************************************/
/* Function: changeCycleType                                         */
/* Description: 切换循环模式                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-05                                 */
/*********************************************************************/
function changeCycleType()
{
	lanternMode++;
	if (lanternMode>2) {
		lanternMode = 0;
	}
	return;
}

/*********************************************************************/
/* Function: changeLanternTime                                       */
/* Description: 改变幻灯播放的时间间隔                               */
/* Parameters:  flag:增加或减小时间间隔标志, 0:减小 1:增加           */
/* Author&Date: lixudong  2009-12-08                                 */
/*********************************************************************/
function changeLanternTime(flag)
{
	//计算幻灯时间间隔
	if (flag==0) {
		lanternInterval = (lanternInterval<=2)? 30 : (lanternInterval-2);
	}
	else if (flag==1) {
		lanternInterval = (lanternInterval>=30)? 2 : (lanternInterval+2);
	}
	//显示幻灯时间间隔
	var showStr = photo_PLAY_SLIDE[0]+photo_PLAY_SLIDE[1]+lanternInterval+photo_PLAY_SLIDE[2];
	document.getElementById('divSetupInfo').innerHTML = showStr;
	//显示图片播放菜单中幻灯时间间隔
	document.getElementById('imageMenuTime').innerHTML = lanternInterval;
	showInfoBar();
	return;
}
///////////////////////////////////////////////////////////////////////全屏播放下的幻灯播放处理结束


///////////////////////////////////////////////////////////////////////全屏播放下的选择图片处理开始
/*********************************************************************/
/* Function: playNext                                                */
/* Description: 全屏状态下播放下一个图片                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-05                                 */
/*********************************************************************/
function playNext()
{
	//关闭幻灯
	if (isLanternStatus) {
		playMenuTotal = 9;
		document.getElementById('imageMenuPic').style.backgroundImage = 'url(image/imagePlayIcon1.png)';
		isLanternStatus = false;
		clearTimeout(lanternTimerID);
	}
	//播放下一个图片
	playIndex = (playIndex>=playTotal-1)? 0 : playIndex+1;
	changeImageFull();
	return;
}

/*********************************************************************/
/* Function: playPrevious                                            */
/* Description: 全屏状态下播放前一个图片                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-05                                 */
/*********************************************************************/
function playPrevious()
{
	//关闭幻灯
	if (isLanternStatus) {
		playMenuTotal = 9;
		document.getElementById('imageMenuPic').style.backgroundImage = 'url(image/imagePlayIcon1.png)';
		isLanternStatus = false;
		clearTimeout(lanternTimerID);
	}
	//播放前一个图片
	playIndex = (playIndex>0)? (playIndex-1) : playTotal-1;
	changeImageFull();
	return;
}
///////////////////////////////////////////////////////////////////////全屏播放下的选择图片处理结束


///////////////////////////////////////////////////////////////////////全屏播放下的图片旋转处理开始
/*********************************************************************/
/* Function: imageRevolution                                         */
/* Description: 图片旋转                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-05                                 */
/*********************************************************************/
var revolutionAngle = 0; //图片旋转角度
function imageRevolution()
{
	if (!isFullScreen || isLanternStatus) {
		return;
	}
	setTimeout("makeRequest('showPic?0|0|1280|720|path|99|90|', showImageRevolution, 5)", 10);
	return;
}

/*********************************************************************/
/* Function: showImageRevolution                                     */
/* Description: 图片旋转后的显示                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-05                                 */
/*********************************************************************/
function showImageRevolution()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		imageSizeScale = 100;
		revolutionAngle += 90;
		if (revolutionAngle>=360) {
			revolutionAngle = 0;
		}
		var tempStr = photo_PLAY_ROTATE[0]+photo_PLAY_ROTATE[1]+revolutionAngle+photo_PLAY_ROTATE[2];
		document.getElementById('divSetupInfo').innerHTML = tempStr;
		document.getElementById('divSetupInfo').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/imageRevolution.png)';
		showInfoBar();
	}
	return;
}
///////////////////////////////////////////////////////////////////////全屏播放下的图片旋转处理结束


///////////////////////////////////////////////////////////////////////全屏播放下的图片放大和移动处理开始
/*********************************************************************/
/* Function: imageZoom                                               */
/* Description: 图片放大                                             */
/* Parameters:  flag:放大或缩小标志, 0:缩小标志 1:放大标志           */
/* Author&Date: lixudong  2009-12-05                                 */
/*********************************************************************/
var imageSizeScale = 100; //图片缩放比例
function imageZoom(flag)
{
	if (!isFullScreen || isLanternStatus) {
		return;
	}
	if (flag) {
		imageSizeScale += 25;
		imageSizeScale = (imageSizeScale>=800)? 800 : imageSizeScale
	}
	else {
		imageSizeScale -= 25;
		imageSizeScale = (imageSizeScale<=25)? 25 : imageSizeScale
	}
	setTimeout("makeRequest('zoomPic?'+imageSizeScale+'|0|0|', showImageZoom, 5)", 10);
	return;
}

/*********************************************************************/
/* Function: showImageZoom                                           */
/* Description: 图片放大后的显示                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-05                                 */
/*********************************************************************/
function showImageZoom()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var tempStr = photo_PLAY_ZOOM[0]+photo_PLAY_ZOOM[1]+imageSizeScale+photo_PLAY_ZOOM[2]
		document.getElementById('divSetupInfo').innerHTML = tempStr;
		document.getElementById('divSetupInfo').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/imageBrowser.png)';
		showInfoBar();
	}
	return;
}

/*********************************************************************/
/* Function: imageMove                                               */
/* Description: 图片的水平、垂直位移                                 */
/* Parameters: direction:方向指示，0:左移 1:右移 2:上移 3:下移       */
/* Author&Date: lixudong  2009-12-05                                 */
/*********************************************************************/
var imageMove_x = 30; //图片水平位移
var imageMove_y = 30; //图片垂直位移
var imageMoveState; //图片移动方向
function imageMove(direction)
{
	if (imageSizeScale<=100) {
		return;
	}
	imageMoveState = direction;
	var imagePos;
	if (direction==0 || direction==1) {
		imagePos = (direction==0)? -imageMove_x : imageMove_x;
		setTimeout("makeRequest('zoomPic?'+imageSizeScale+'|"+imagePos+"|0|', showImageMove, 5)", 10);
	}
	else if (direction==2 || direction==3) {
		imagePos = (direction==2)? -imageMove_y : imageMove_y;
		setTimeout("makeRequest('zoomPic?'+imageSizeScale+'|0|"+imagePos+"|', showImageMove, 5)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: showImageMove                                           */
/* Description: 图片移动后的显示                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-05                                 */
/*********************************************************************/
function showImageMove()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var tempStr = (imageMoveState>=0 && imageMoveState<=3)? photo_MOVIE_INFO[imageMoveState] : photo_MOVIE_INFO[4];
		document.getElementById('divSetupInfo').innerHTML = tempStr;
		document.getElementById('divSetupInfo').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/imageBrowser.png)';
		showInfoBar();
	}
	return;
}
///////////////////////////////////////////////////////////////////////全屏播放下的图片放大和移动处理结束


///////////////////////////////////////////////////////////////////////添加屏保图片部分开始
/*********************************************************************/
/* Function: playListBegin                                           */
/* Description: 进入屏保图片添加状态                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-01                                 */
/*********************************************************************/
var isAddPlayList = false; //添加屏保图片状态
var isEditPlayList = false; //编辑屏保图片列表
function playListBegin()
{
	if (isAddPlayList) {
		setTimeout("makeRequest('playlist?6', getBgList, 0)", 10);
		return;
	}
	if (isAddOtherList) {
		setTimeout("makeRequest('playlist?3', getBgList, 0)",10);
		return;
	}
}

/*********************************************************************/
/* Function: getBgListRequest                                        */
/* Description: 发送获得屏保图片列表的请求                           */
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
/* Function: playListEnd                                             */
/* Description: 退出屏保图片添加状态                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-01                                 */
/*********************************************************************/
function playListEnd()
{	
	hideOrVisibleDiv(0);
	for (var i=0; i< 8; i++) {
		document.getElementById('playList'+i).innerHTML = '';
	}
	bgListIndex = 0;
	if (isAddPlayList) {
		isAddPlayList = false;
		isEditPlayList = false;
		document.getElementById('divPicture').style.visibility = 'visible';
		showFileInfo();
	}
	else if (isAddOtherList) {
		isAddOtherList = false;
		isEditOtherList = false;
		cancelAddMusic();
	}
	document.getElementById('divPlayList').style.visibility = 'hidden';
	document.getElementById('itemFocus').style.visibility = 'visible';
	document.getElementById('listFocus').style.visibility = 'hidden';
}

/*********************************************************************/
/* Function: getBgList                                               */
/* Description: 获得屏保图片列表                                     */
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
		bgListTotal = responseXMLHead.length;
		//iPanel.ioctlWrite('printf', '=======list===0================='+bgListTotal+'\n');
		var parameter = '', pos, len;
		for (var i=0; i<bgListTotal; i++) {
			parameter = responseXMLHead.item(i).childNodes[0].nodeValue.split('|');
			pos = bgListTotal-1-i;
			bgListSerial[pos] = parameter[0];
			bgListName[pos] = parameter[1];
			bgListShowName[pos] = parameter[2];
		}
		bgListIndex = 0;
		showBgListMessage();
		document.getElementById('divPicture').style.visibility = 'hidden';
		document.getElementById('divPlayList').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/pPlaylist.jpg)';
		document.getElementById('divPlayList').style.visibility = 'visible';
		showBgList();
	}
	return;
}

/*********************************************************************/
/* Function: showBgListMessage                                       */
/* Description: 背景音乐列表提示信息                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-25                                 */
/*********************************************************************/
function showBgListMessage()
{
	//背景音乐列表提示信息
	if (isAddOtherList) {		
		document.getElementById('divTitle').innerHTML = music_OPERATE_INFO[2];
		document.getElementById('divMessage0').innerHTML = music_LIST_MESSAGE[0];
		document.getElementById('divMessage1').innerHTML = music_LIST_MESSAGE[1];;
	}
	else if (isAddPlayList) {
		document.getElementById('divTitle').innerHTML = photo_OPERATE_INFO[2];
		document.getElementById('divMessage0').innerHTML = photo_LIST_MESSAGE[0];
		document.getElementById('divMessage1').innerHTML = photo_LIST_MESSAGE[1];
	}
	return;
}

/*********************************************************************/
/* Function: showBgList                                              */
/* Description: 显示屏保图片列表                                     */
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
/* Description: 显示屏保图片列表文件信息                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-01                                 */
/*********************************************************************/
function showBgListInfo()
{
	var pos = bgListIndex%8;
	document.getElementById('listFocus').style.top = (62+48*pos)+"px";
	return;
}

/*********************************************************************/
/* Function: bgListDelete                                            */
/* Description: 清空屏保图片列表                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-01                                 */
/*********************************************************************/
function bgListDelete()
{
	if (isAddOtherList) {
		if (isEditOtherList) {
			setTimeout("makeRequest('playlist?2|'+bgListSerial[bgListIndex], hideBgList, 0)", 10);
		}
		else {
			setTimeout("makeRequest('playlist?2', hideBgList, 0)", 10);
		}
		return;
	}
	if (isEditPlayList) {
		setTimeout("makeRequest('playlist?5|'+bgListSerial[bgListIndex], hideBgList, 0)", 10);
	}
	else {
		setTimeout("makeRequest('playlist?5', hideBgList, 0)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: hideBgList                                              */
/* Description: 清空屏保图片列表显示区                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-01                                 */
/*********************************************************************/
function hideBgList()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		for (var i=0; i< 8; i++) {
			document.getElementById('playList'+i).innerHTML = '';
		}
		if (isAddOtherList) {
			setTimeout("makeRequest('playlist?3', getBgList, 0)", 10);
			return;
		}
		setTimeout("makeRequest('playlist?6', getBgList, 0)", 10);
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
		document.getElementById('divMessage0').innerHTML = photo_LIST_MESSAGE[2];
	}
	else if (isAddOtherList) {
		isEditOtherList = true;
		document.getElementById('divMessage0').innerHTML = music_LIST_MESSAGE[2];
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
		document.getElementById('divMessage0').innerHTML = photo_LIST_MESSAGE[0];
	}
	else if (isAddOtherList) {
		isEditOtherList = false;
		document.getElementById('divMessage0').innerHTML = music_LIST_MESSAGE[0];
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


///////////////////////////////////////////////////////////////////////添加屏保图片部分结束


///////////////////////////////////////////////////////////////////////背景音乐播放部分开始
/*********************************************************************/
/* Function: musicListPlay                                           */
/* Description: 显示背景音乐播放状态                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-08                                 */
/*********************************************************************/
var isMusicListPlay = false; //背景音乐播放状态
function musicListPlay()
{
	clearTimeout(timerID_musicList);
	if (!isMusicListPlay) {
		setTimeout("makeRequest('play?|filelist', showMusicListInfo, 0)", 10);
	}
	else {
		setTimeout("makeRequest('winplay', showMusicListInfo, 0)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: showMusicListInfo                                       */
/* Description: 显示背景音乐播放状态提示                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-08                                 */
/*********************************************************************/
var timerID_musicList; //背景音乐列表显示定时器
function showMusicListInfo()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (!isMusicListPlay && getStatus==0) {
			var showStr = (SETUP_Language=='english') ? '&nbsp;&nbsp;&nbsp;No music':'&nbsp;&nbsp;&nbsp;没有背景音乐';
			document.getElementById('soundPromet').innerHTML = showStr;
			document.getElementById('mutePict').style.visibility = 'hidden';
			document.getElementById('divSound').style.visibility = 'visible';
			isNoMusicList = true;
			timerID_musicList = setTimeout('hideMusicListInfo()', 4000);
			return;
		}
		if (getStatus==0) {
			isNoMusicList = !isMusicListPlay;
			hiddenSoundIcon();
		}
		else {
			isMusicListPlay = !isMusicListPlay;
			isNoMusicList = false;
			if (isMusicListPlay) {
				showMuteIcon(0);
			}
			else {
				hiddenSoundIcon();
			}
		}
		miniMenuShow();
	}
	return;
}

/*********************************************************************/
/* Function: hideMusicListInfo                                       */
/* Description: 隐藏背景音乐播放状态提示                             */
/* Parameters:                                                       */
/* Author&Date: gaogl  2010-04-22                                    */
/*********************************************************************/
function hideMusicListInfo()
{
	document.getElementById('divSound').style.visibility = 'hidden';
	document.getElementById('soundPromet').innerHTML = '';
	return;
}
///////////////////////////////////////////////////////////////////////背景音乐播放部分结束


///////////////////////////////////////////////////////////////////////图片播放功能菜单处理部分开始
/*********************************************************************/
/* Function: playMenuOpen                                            */
/* Description: 开启图片播放功能菜单                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-07                                 */
/*********************************************************************/
var isPlayMenu = false; //图片播放菜单开启状态
var playMenuTotal = 9; //图片播放菜单选项的总数
function playMenuOpen()
{
	if (!isPlayMenu) {
		playMenuTotal = (isLanternStatus)? 6 : 9;
		var tempBg = (isLanternStatus)? 'url(image/imagePlayIcon2.png)' : 'url(image/imagePlayIcon1.png)';
		document.getElementById('imageMenuPic').style.backgroundImage = tempBg;
		isPlayMenu = true;
		playMenuShow();

		document.getElementById('imageMenu').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/imagePlayBg.png)';
		document.getElementById('imageMenu').style.visibility = 'visible';
		playMenuHideTimer();
	}
	else {
		playMenuHide();
	}
	return;
}

/*********************************************************************/
/* Function: playMenuHideTimer                                       */
/* Description: 开启图片播放功能菜单                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-08                                 */
/*********************************************************************/
var timerID_playMenu; //图片播放菜单关闭定时器
var playMenuCloseTime = 10000; //图片播放菜单关闭定时时间
function playMenuHideTimer()
{
	clearTimeout(timerID_playMenu);
	timerID_playMenu = setTimeout('playMenuHide()', playMenuCloseTime);
	return;
}

/*********************************************************************/
/* Function: playMenuHide                                            */
/* Description: 关闭图片播放功能菜单                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-07                                 */
/*********************************************************************/
function playMenuHide()
{
	isPlayMenu = false;
	clearTimeout(timerID_playMenu);
	document.getElementById('imageMenu').style.visibility = 'hidden';
	return;
}

/*********************************************************************/
/* Function: playMenuShow                                            */
/* Description: 显示图片播放功能菜单                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-07                                 */
/*********************************************************************/
function playMenuShow()
{
	//循环方式图标的判断
	var tempType = lanternMode;
	document.getElementById('imageMenuCyc').style.backgroundImage = 'url(image/imagePlayCyc'+tempType+'.png)';
	//幻灯间隔时间的判断
	document.getElementById('imageMenuTime').innerHTML = lanternInterval;
	//显示功能菜单
	return;
}

/*********************************************************************/
/* Function: playMenuNext                                            */
/* Description: 下一个图片播放功能菜单选项                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-07                                 */
/*********************************************************************/
var playMenuIndex = 0; //功能菜单选项的序列号
function playMenuNext()
{
	playMenuIndex = (playMenuIndex>=playMenuTotal-1)? 0 : (playMenuIndex+1);
	document.getElementById('imageMenuFocus').style.left = (22+playMenuIndex*55)+"px";
	return;
}

/*********************************************************************/
/* Function: miniMenuPrevious                                        */
/* Description: 下一个图片播放功能菜单选项                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-07                                 */
/*********************************************************************/
function playMenuPrevious()
{
	playMenuIndex = (playMenuIndex<=0)? (playMenuTotal-1) : (playMenuIndex-1);
	document.getElementById('imageMenuFocus').style.left = (22+playMenuIndex*55)+"px";
	return;
}

/*********************************************************************/
/* Function: playMenuSelect                                          */
/* Description: 选中图片播放功能菜单选项的处理                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-08                                 */
/*********************************************************************/
function playMenuSelect()
{
	if (playMenuIndex==0) {
		musicListPlay();
	}
	else if (playMenuIndex==1) {
		addFullMusicList();
	}
	else if (playMenuIndex==2) {
		playPrevious();
	}
	else if (playMenuIndex==3) {
		playNext();
	}
	else if (playMenuIndex==4) {
		changeCycleType();
		//显示循环模式
		var showStr = photo_PLAY_SLIDE[0]+photo_CYC_TYPE[lanternMode];
		document.getElementById('divSetupInfo').innerHTML = showStr;
		showInfoBar();
		//显示图片播放菜单中循环模式
		document.getElementById('imageMenuCyc').style.backgroundImage = 'url(image/imagePlayCyc'+lanternMode+'.png)';
	}
	else if (playMenuIndex==5) {
		changeLanternTime(1);
	}
	else if (playMenuIndex==6) {
		imageZoom(1);
	}
	else if (playMenuIndex==7) {
		imageZoom(0);
	}
	else if (playMenuIndex==8) {
		imageRevolution();
	}
	return;
}
///////////////////////////////////////////////////////////////////////图片播放功能菜单处理部分结束


///////////////////////////////////////////////////////////////////////功能菜单处理部分开始
/*********************************************************************/
/* Function: miniMenuOpen                                            */
/* Description: 开启功能菜单                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-03                                 */
/*********************************************************************/
var isMiniMenu = false;
function miniMenuOpen()
{
	if (!isMiniMenu) {
		setTimeout("makeRequest('playlist?8', getMusicList, 0)", 10);
	}
	else {
		miniMenuHide();
	}
	return;
}

/*********************************************************************/
/* Function: getMusicList                                            */
/* Description: 获得背景音乐列表状态(存在与否)                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-08                                 */
/*********************************************************************/
var isNoMusicList = false; //是否有背景音乐列表
function getMusicList()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==0) {
			isNoMusicList = true;
		}
		else {
			isNoMusicList = false;
		}
		miniMenuTotal = (isNoMusicList)? 3 : 4;
		miniMenuIndex = (miniMenuIndex<=miniMenuTotal-1)? miniMenuIndex : 0;
		isMiniMenu = true;
		miniMenuShow();
		document.getElementById('divMenuFocus').style.backgroundImage = 'url(image/menuIconFocus.png)';
		document.getElementById('miniMenuBg').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/miniMenu4.png)';
		document.getElementById('divMenu').style.visibility = 'visible';
		document.getElementById('divMenuList').style.visibility = 'visible';
		document.getElementById('divPicture').style.visibility = 'hidden';
	}
	return;
}

/*********************************************************************/
/* Function: miniMenuHide                                            */
/* Description: 关闭功能菜单                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-03                                 */
/*********************************************************************/
function miniMenuHide()
{
	isMiniMenu = false;
	document.getElementById('divMenu').style.visibility = 'hidden';
	document.getElementById('divMenuList').style.visibility = 'hidden';
	if (isAddPlayList || isAddOtherList) {
		document.getElementById('divPicture').style.visibility = 'hidden';
	}
	else {
		document.getElementById('divPicture').style.visibility = 'visible';
	}
	return;
}

/*********************************************************************/
/* Function: miniMenuShow                                            */
/* Description: 显示功能菜单                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-03                                 */
/*********************************************************************/
function miniMenuShow()
{
	var nomusicURL;
	//换肤和语言切换图标的显示
	document.getElementById('divMenuPos1').style.backgroundImage = 'url(image/'+SETUP_Language+'/menuIcon16.png)';
	nomusicURL = isAddOtherList ?('url(image/'+SETUP_Language+'/menuIcon36.png)'):('url(image/'+SETUP_Language+'/menuIcon6.png)');
	document.getElementById('divMenuPos2').style.backgroundImage = nomusicURL;
	nomusicURL = isAddPlayList ?('url(image/'+SETUP_Language+'/menuIcon33.png)'):('url(image/'+SETUP_Language+'/menuIcon3.png)');
	document.getElementById('divMenuPos3').style.backgroundImage = nomusicURL;
	//背景音乐开or关  判断
	if (isNoMusicList) {
		nomusicURL = 'url(image/'+SETUP_Language+'/menuIcon9.png)';
		document.getElementById('divMenuPos4').style.backgroundImage = nomusicURL;
		return;
	}
	nomusicURL = (isMusicListPlay)?('url(image/'+SETUP_Language+'/menuIcon8.png)'):('url(image/'+SETUP_Language+'/menuIcon7.png)');
	document.getElementById('divMenuPos4').style.backgroundImage = nomusicURL;
	return;
}

/*********************************************************************/
/* Function: miniMenuNext                                            */
/* Description: 下一个功能菜单选项                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-03                                 */
/*********************************************************************/
var miniMenuTotal = 4; //功能菜单选项的总数
var miniMenuIndex = 0; //功能菜单选项的序列号
function miniMenuNext()
{
	miniMenuIndex = (miniMenuIndex>=miniMenuTotal-1)? 0 : (miniMenuIndex+1);
	miniMenuIndex = (isAddPlayList &&(miniMenuIndex==2))?3:miniMenuIndex;
	miniMenuIndex = (isAddOtherList &&(miniMenuIndex==1))?2:miniMenuIndex;
	miniMenuIndex = (isNoMusicList&&(miniMenuIndex==3))?0:miniMenuIndex;
	document.getElementById('divMenuFocus').style.left = (49+miniMenuIndex*140)+"px";
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
	miniMenuIndex = (isNoMusicList&&(miniMenuIndex==3))?2:miniMenuIndex;
	miniMenuIndex = (isAddPlayList &&(miniMenuIndex==2))?1:miniMenuIndex;
	miniMenuIndex = (isAddOtherList &&(miniMenuIndex==1))?0:miniMenuIndex;
	document.getElementById('divMenuFocus').style.left = (49+miniMenuIndex*140)+"px";
	return;
}

/*********************************************************************/
/* Function: miniMenuSelect                                          */
/* Description: 选中功能菜单选项的处理                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-03                                 */
/*********************************************************************/
function miniMenuSelect()
{
	if (miniMenuIndex==0) {		
		if (isMusicListPlay) {
			setTimeout("makeRequest('stop', stopToSettings, 0)",10);
			return;
		}
		gotoSettings();
	}
	else if (miniMenuIndex==1) {
		miniMenuHide();
		addPictureList();
	}
	else if (miniMenuIndex==2) {
		miniMenuHide();
		addMusicList();
	}
	else if (miniMenuIndex==3) {
		musicListPlay();
	}
	return;
}

/*********************************************************************/
/* Function: gotoSettings                                            */
/* Description: 停止音乐播放后，进入设置页面                         */
/* Parameters:                                                       */
/* Author&Date: gaoguanglei  2010-04-13                              */
/*********************************************************************/
function stopToSettings()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==1) {
			gotoSettings();
		}
	}
	return;
}

/*********************************************************************/
/* Function: gotoSettings                                            */
/* Description: 进入设置页面                                         */
/* Parameters:                                                       */
/* Author&Date: gaoguanglei  2010-04-13                              */
/*********************************************************************/
function gotoSettings()
{
	var hrefStr = document.location.href.split('?');
	document.location.href = 'settings.html?photoList@'+hrefStr[1];
	return;
}

///////////////////////////////////////////////////////////////////////功能菜单处理部分结束


/*********************************************************************/
/* Function: addPictureList                                          */
/* Description: 添加屏保图片按钮的处理                               */
/* Parameters:                                                       */
/* Author&Date: gaoguanglei  2010-04-14                              */
/*********************************************************************/
function addPictureList()
{			
		if (isAddPlayList) {
			return;
		}		
		isAddPlayList = true;
		playListBegin();
		return;
}

/////////////////////////////////从浏览图片文件或文件夹到添加音乐要做的操作（开始）///////////////////////////////////
/*********************************************************************/
/* Function: addMusicList                                            */
/* Description: 添加背景音乐按钮的处理                               */
/* Parameters:                                                       */
/* Author&Date: gaoguanglei  2010-04-08 / 2010-04-14                 */
/*********************************************************************/
var middleQueuePath = new Array(); //路径队列中最后一个
var middleFileIndex = 0;
var middleShowPath = new Array();//记录显示添加音乐列表前的路径队列
var middleQueuefileIndex = new Array(); //记录文件指针队列
function addMusicList()
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
	mediaType = 'music';
	fileIndex = 0;	
	isAddOtherList = true;
	getFileListRequest();
	playListBegin();
	return;
}

/*********************************************************************/
/* Function: addFullMusicList                                        */
/* Description: 全屏播放图片时添加背景音乐                           */
/* Parameters:                                                       */
/* Author&Date: gaoguanglei  2010-04-16                              */
/*********************************************************************/
var isSlideAddMusic = false; //全屏播放图片添加背景音乐前保存是否是幻灯
var isFullAddMusic = false; //全屏播放图片添加背景音乐
var middleFileTotal = 0;
var middleFileNumber = 0;
function addFullMusicList()
{
	isFullAddMusic = true;
	isSlideAddMusic = isLanternStatus;
	middleFileTotal = fileTotal;
	middleFileNumber = fileNumber;
	clearTimeout(lanternTimerID);
	hideInfoBar();
	addMusicList();
	setTimeout("keyBack()",50);
}

/*********************************************************************/
/* Function: cancelAddMusic                                          */
/* Description: 退出添加背景音乐操作                                 */
/* Parameters:                                                       */
/* Author&Date: gaoguanglei  2010-04-08                              */
/*********************************************************************/
var isAddOtherList = false; //添加屏保图片状态
var isEditOtherList = false; //编辑屏保图片列表
function cancelAddMusic()
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
	fileIndex = middleFileIndex;
	mediaType = 'photo';
	document.getElementById('diskInfo').innerHTML = queuePathShow[queuePathShow.length -1];
	if (isFullAddMusic) {
		fileTotal = middleFileTotal;
		fileNumber = middleFileNumber;
		document.getElementById("bodyID").bgColor = 'transparent';
		document.getElementById('itemInfo').style.visibility = 'hidden';
		document.getElementById('divBrowser').style.visibility = 'hidden';
		isLanternStatus = isSlideAddMusic;
		fileIndex = playIndex+(fileTotal-fileNumber);
		isFullAddMusic = false;
		hideOrVisibleDiv(0);
		gotoFullScreen();
	}
	else {
		getFileListRequest();
	}
	return;
}
/////////////////////////////////从浏览图片文件或文件夹到添加音乐要做的操作（结束）///////////////////////////////////

/////////////////////////////////////////音乐声音的控制及表现/////////////////////////////////////////////////////
/**********************************************************************/
/* Function: volumeOperateSelece                                      */
/* Description: 不同状态下的相关处理                                  */
/* Parameters:音量操作类型，0:未知操作 1:音量加 2:音量减 3:静音/非静音*/
/* Author&Date: gaoguanglei  2010-04-09                               */
/**********************************************************************/
function volumeControl(operate)
{
	var requestStatus;
	if (operate==1||operate==2) {
		if (isMuteStatus==1) {
			requestStatus = makeRequest('volume?0', nullFun);
			if (requestStatus) {
				isMuteStatus = 0;
			}
		}
		else {
			var tempLevel = (operate==1)? (volumeLevel+5) : (volumeLevel-5);
			tempLevel = (tempLevel>=100)? 100 : tempLevel;
			tempLevel = (tempLevel<=0)? 0 : tempLevel;
			requestStatus = makeRequest('volume?3|'+tempLevel, nullFun);
			if (requestStatus) {
				volumeLevel = tempLevel
			}
		}
		showSoundIcon();
	}
	else if (operate==3) {
		var tempMuteStatus = (isMuteStatus==0)? 1 : 0;
		requestStatus = makeRequest('volume?'+tempMuteStatus, nullFun);
		if (requestStatus) {
			isMuteStatus = tempMuteStatus;
		}
		showMuteIcon(1);
	}
	return;
}

/*********************************************************************/
/* Function: getVolumeStatus                                         */
/* Description: 获得音量的状态，包括音量值和静音状态                 */
/* Parameters:                                                       */
/* Author&Date: gaoguanglei  2010-04-09                              */
/*********************************************************************/
var isMuteStatus = 0; //记录静音状态，0:非静音，1:静音
var volumeLevel = 100; //音量值
function getVolumeStatus()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var tempStr = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue;
		var parameter = tempStr.split('|');
		isMuteStatus = parseInt(parameter[0]);
		volumeLevel = parseInt(parameter[1]);
		volumeLevel = (volumeLevel%5 == 0) ? volumeLevel : (5+volumeLevel-volumeLevel%5);
	}
	return;
}

/*********************************************************************/
/* Function: showMuteIcon                                            */
/* Description: 静音非静音的显示                                     */
/* Parameters:                                                       */
/* Author&Date: gaoguanglei  2010-04-09                              */
/*********************************************************************/
var sound_timerID = null;
function showMuteIcon(num)
{
	clearTimeout(sound_timerID);
	if(isMuteStatus==1){
		var str_value = SETUP_Language=='chinese' ? '音量: ' : 'Volume: ';
		document.getElementById('soundPromet').innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+str_value+volumeLevel;
		document.getElementById('mutePict').style.backgroundImage = 'url(image/player/mute.png)';
		document.getElementById('mutePict').style.visibility = 'visible';
		document.getElementById('divSound').style.visibility = 'visible';
	}	
	else if (num==1) {
		showSoundIcon();
	}
	return;
}

/*********************************************************************/
/* Function: showSoundIcon                                           */
/* Description: 非静音的显示                                         */
/* Parameters:                                                       */
/* Author&Date: gaoguanglei  2010-04-09                              */
/*********************************************************************/
function showSoundIcon()
{
	clearTimeout(sound_timerID);
	if (isMuteStatus==0) {
		document.getElementById('mutePict').style.backgroundImage = 'url(image/player/muteOff.png)';
		document.getElementById('mutePict').style.visibility = 'visible';
		if (SETUP_Language == 'chinese') {
			document.getElementById('soundPromet').innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;音量: '+volumeLevel;
		}
		else {
			document.getElementById('soundPromet').innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Volume: '+volumeLevel;
		}
		sound_timerID = setTimeout('hiddenSoundIcon()',4000);
		document.getElementById('divSound').style.visibility = 'visible';
	}
	return;
}

/*********************************************************************/
/* Function: hiddenSoundIcon                                         */
/* Description: 隐藏音量显示                                         */
/* Parameters:                                                       */
/* Author&Date: gaoguanglei  2010-04-09                              */
/*********************************************************************/
function hiddenSoundIcon()
{
	clearTimeout(sound_timerID);
	document.getElementById('divSound').style.visibility = 'hidden';
	return;
}
/////////////////////////////////////////音乐声音的控制及表现（结束）////////////////////////////////////////////////////

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
		}
	}
	return;
}
