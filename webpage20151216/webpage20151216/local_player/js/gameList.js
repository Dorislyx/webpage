///////////////////////////////////////////////////////////////////////按键处理部分开始
/*********************************************************************/
/* Function: keyEvent                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
var isKeyClock = false; //遥控器按键锁定，用于播放请求处理过程中屏蔽遥控器按键
var isDoesnotItem = false; //无可用硬盘或服务器的状态
document.onkeypress = keyEvent;
function keyEvent(e)
{
	var keyValue = e.which;
	iPanel.ioctlWrite('printf', 'keyValue===================='+keyValue+'\n');
	//移动设备插拔的处理
	if (keyValue>=0xff20 && keyValue<=0xff34) {
		showUSBInfo(keyValue);
		return;
	}
	if (isDoesnotItem) {
		if (keyValue==8) {
			keyBack();
		}
		return (false);
	}
	if (isKeyClock) {
		return (false);
	}
	if (isGamePlay) {
		keyGame(keyValue);
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
		case 263: //play/pause(播放/暂停)
			keyEnter();
			return (false);
			break;
		case 37: //left(快退)
			keyLeft();
			return (false);
			break;
		case 39: //right(快进)
			keyRight();
			return (false);
			break;
		case 38: //up
			keyUp();
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

		case 275: //红键
			keyRed();
			break;
		case 276: //绿键
			keyGreen();
			break;
		case 277: //黄键
			keyYellow();
			break;
		case 278: //蓝键(信息)
			keyBlue();
			break;

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
			keyTrack();
			break;

		case 284: //帮助
			keyHelp();
			break;
		case 1292: //字幕
			keySubtitle();
			break;
		case 271: //定位
			keySeek();
			break;
		case 281: //收藏
			keyFavorite();
			break;
		case 519:	//设置
			document.location.href = 'file:////settings/land.html';
			break;

		default:
			return (-1);
			break;
	}
	return;
}

/*********************************************************************/
/* Function: keyGame                                                 */
/* Description: 游戏状态下的按键处理函数                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-03                                 */
/*********************************************************************/
function keyGame(keyValue)
{
	switch (keyValue) {
		case 8: //back
			gamePause();
			break;
		case 275: //红键
			gameExit();
			break;
		case 276: //绿键
			gameResume();
			break;
		case 0xff10: //开始游戏
			//isGamePlay = true;
			break;
		case 0xff11: //游戏停止
			isGamePlay = true;
			isGamePause = true;
			gameExit();
			break;
		default:
			return (-1);
			break;
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
	channelPagePrevious();
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
	exitWebPage();
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
	iPanel.ioctlWrite('player_game_status', '0');
	document.location.href = 'disk.html?'+mediaTypeIndex;
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
	isKeyClock = true;
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
		init();
	}
	return;
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
	return;
}

/*********************************************************************/
/* Function: init                                                    */
/* Description: 创建XMLHttpRequest对象；获得文件夹和文件列表         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-08                                 */
/*********************************************************************/
var serverIndex = 0; //当前物理接口
var mediaType = ''; //当前功能选项类型(movie, music, photo, game, file)
var mediaTypeIndex = 0; //当前功能选项类型的索引号
function init()
{
	game_LanguageSelect();
	//获得前一个网页传递的参数
	var hrefStr = document.location.href.split('?');
	var parameter = hrefStr[1].split('|');
	var tempPath = changeCompartStr(parameter[1], '*', '/');
	var tempPathShow = parameter[2]+':\\game\\';
	serverIndex = parseInt(parameter[3]);
	htmlTitle = parameter[4]+'List';
	mediaType = parameter[4];
	mediaTypeIndex = parseInt(parameter[5]);
	//显示功能选项图标
	var tempBgURL = 'url(image/'+SETUP_Language+'/dirList'+(mediaTypeIndex+1)+'.jpg)';
	document.getElementById('titleIcon').style.backgroundImage = tempBgURL;
	//显示当前路径
	document.getElementById('diskInfo').innerHTML = tempPathShow;
	//发送获得文件夹和文件列表的请求
	setTimeout("makeRequest('search?"+tempPath+"/game', getFileList, 2)", 10);
	return;
}

/*********************************************************************/
/* Function: getFileList                                             */
/* Description: 获得文件夹和文件列表数据                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-08                                 */
/*********************************************************************/
var fileTotal = 0; //文件夹和文件的总数
var fileIndex = 0; //当前文件夹或文件的索引号
var fileRealName = new Array(); //文件夹或文件的真实名称
var fileShowName = new Array(); //文件夹或文件的显示名称
var fileInfo = new Array();		//游戏的描述
var fileURL = new Array(); //游戏视频的URL
var filePicture = new Array(); //文件夹或文件的显示图片
function getFileList()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		//无可用文件夹和文件时的处理
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		var responseXMLHead = httpRequest.responseXML.getElementsByTagName('file');
		fileTotal = responseXMLHead.length;
		if (getStatus==0 || fileTotal==0) {
			hideFileList();
			document.getElementById('divInfo').innerHTML = game_OPERATE_INFO[0]+game_OPERATE_INFO[1];
			document.getElementById('divInfo').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/pSelect.png)';
			document.getElementById('divInfo').style.visibility = 'visible';
			isKeyClock = false;
			isDoesnotItem = true;
			return;
		}
		isDoesnotItem = false;
		document.getElementById('divInfo').style.visibility = 'hidden';
		//获得文件夹和文件的信息
		var parameter;
		for (var i=0; i<fileTotal; i++) {
			parameter = responseXMLHead.item(i).childNodes[0].nodeValue.split('|');
			fileRealName[i] = parameter[0];
			fileShowName[i] = parameter[1];
			fileInfo[i] = parameter[2];
			fileURL[i] = parameter[3];
			filePicture[i] = parameter[4];
		}
		iPanel.ioctlWrite('player_game_status', '1');
		showFileList();
		isKeyClock = false;
	}
	return;
}

/*********************************************************************/
/* Function: showFileList                                            */
/* Description: 显示文件夹和文件列表                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-08                                 */
/*********************************************************************/
function showFileList()
{
	if (fileTotal<=0) {
		return;
	}
	//计算当前页号和总页数
	var pageTotal = parseInt((fileTotal-1)/8);
	var pageCurrent = parseInt(fileIndex/8);
	//计算当前页列表的结束位置
	var end = fileTotal-pageCurrent*8;
	end = (end>8) ? 8 : end;
	document.getElementById('itemList').style.height = 48*end+"px";
	//显示页码和翻页指示
	var tempPageNumber = game_PAGE_NUMBER[0]+(pageCurrent+1)+game_PAGE_NUMBER[1]+(pageTotal+1)+game_PAGE_NUMBER[2];
	document.getElementById('pageNumber').innerHTML = tempPageNumber;
	var showStatus = (pageCurrent>0)? 'visible' : 'hidden';
	document.getElementById('pageUp').style.visibility = showStatus;
	showStatus = (pageCurrent<pageTotal)? 'visible' : 'hidden';
	document.getElementById('pageDown').style.visibility = showStatus;
	//显示文件夹和文件列表
	for (var i=0; i<end; i++) {
		var pos = i+pageCurrent*8;
		document.getElementById('iconList'+i).style.backgroundImage = 'url(image/fileIcon5.png)';
		document.getElementById('textList'+i).innerHTML = fileShowName[pos];
	}
	showFileInfo();
	return;
}

/*********************************************************************/
/* Function: showFileInfo                                            */
/* Description: 显示文件夹或文件的信息                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-08                                 */
/*********************************************************************/
function showFileInfo()
{
	//移动焦点位置
	var pos = fileIndex%8;
	document.getElementById('itemFocus').style.top = 0+48*pos+"px";
	//获得项目图片显示数据
	//var pictureStr = (filePicture[fileIndex]=='no picture')? 'image/defaultIcon5.jpg' : 'file:///LocalPlayer'+filePicture[fileIndex];
	var pictureStr = 'image/defaultIcon5.jpg';
	document.getElementById('itemIcon').src = pictureStr;
	//显示图标信息
	if (isMiniMenu) {
		document.getElementById('divPicture').style.visibility = 'hidden';
	}
	else {
		document.getElementById('divPicture').style.visibility = 'visible';
	}
	//获得项目信息数据
	var showStr = game_FILE_INFO[0]+fileShowName[fileIndex]+'<br>'
	showStr += game_FILE_INFO[1]+fileInfo[fileIndex];
	document.getElementById('itemInfo').innerHTML = showStr;
	//显示分区信息
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
	document.getElementById('itemInfo').innerHTML = '';
	return;
}
///////////////////////////////////////////////////////////////////////初始化部分结束


///////////////////////////////////////////////////////////////////////功能处理部分开始
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
		showFileList();
	}
	showFileInfo();
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
		showFileList();
	}
	showFileInfo();
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
	showFileList();
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
	showFileList();
	return;
}

/*********************************************************************/
/* Function: channelSelect                                           */
/* Description: 播放选中的文件                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-20                                 */
/*********************************************************************/
function channelSelect()
{
	gamePlay();
	return;
}

///////////////////////////////////////////////////////////////////////功能处理部分结束


///////////////////////////////////////////////////////////////////////游戏处理部分开始
/*********************************************************************/
/* Function: gamePlay                                                */
/* Description: 开始游戏                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-03                                 */
/*********************************************************************/
var isGamePlay = false; //游戏播放状态
var isGamePause = false; //游戏暂停状态
function gamePlay()
{
	if (!isGamePlay) {
		isGamePlay = true;
		showGamePlay();
		setTimeout("makeRequest('run?'+fileRealName[fileIndex], nullFun, 2);", 10);
	}
	return;
}

/*********************************************************************/
/* Function: gamePause                                               */
/* Description: 暂停游戏                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-03                                 */
/*********************************************************************/
function gamePause()
{
	if (isGamePlay && !isGamePause) {
		isGamePause = true;
		showGamePause();
		setTimeout("makeRequest('ctrl?1', nullFun, 2)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: gameResume                                              */
/* Description: 恢复游戏                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-03                                 */
/*********************************************************************/
function gameResume()
{
	if (isGamePlay && isGamePause) {
		isGamePause = false;
		showGameResume()
		setTimeout("makeRequest('ctrl?2', nullFun, 2)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: gameExit                                                */
/* Description: 退出游戏                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-03                                 */
/*********************************************************************/
function gameExit()
{
	if (isGamePlay && isGamePause) {
		isGamePlay = false;
		isGamePause = false;
		var showStr = game_EXIT_INFO[0];
		//document.getElementById('divGameStatusText').style.backgroundImage = 'url(image/null.png)';
		document.getElementById('divGameStatusText').innerHTML = showStr;
		isKeyClock = true;
		//setTimeout("makeRequest('close', showGameExit, 2)", 10);
		var statusGame = makeRequest('close', showGameExit, 2);
		if (!statusGame) {
			isKeyClock = false;
			isGamePlay = true;
			isGamePause = true;
			gameResume();
		}
	}
	return;
}

/*********************************************************************/
/* Function: showGamePlay                                            */
/* Description: 显示开始游戏状态                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-03                                 */
/*********************************************************************/
function showGamePlay()
{
	hideOrVisibleDiv(0);
	document.getElementById('divBrowser').style.visibility = 'hidden';
	return;
}

/*********************************************************************/
/* Function: showGamePause                                           */
/* Description: 显示暂停游戏状态                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-03                                 */
/*********************************************************************/
function showGamePause()
{
	var showStr = game_EXIT_INFO[1];
	document.getElementById('divGameStatusText').style.backgroundImage = 'url(image/'+SETUP_Language+'/selectBar2.png)';
	document.getElementById('divGameStatusText').innerHTML = showStr;
	document.getElementById('divGameStatus').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/pSelect.png)'
	document.getElementById('divGameStatus').style.visibility = 'visible';
	return;
}

/*********************************************************************/
/* Function: showGameResume                                          */
/* Description: 显示恢复游戏状态                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-03                                 */
/*********************************************************************/
function showGameResume()
{
	document.getElementById('divGameStatus').style.visibility = 'hidden';
	return;
}

/*********************************************************************/
/* Function: showGameExit                                            */
/* Description: 显示退出游戏状态                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-03                                 */
/*********************************************************************/
function showGameExit()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		isKeyClock = false;
		document.getElementById('divGameStatus').style.visibility = 'hidden';
		document.getElementById('divBrowser').style.visibility = 'visible';
		hideOrVisibleDiv(1);
	}
	return;
}
///////////////////////////////////////////////////////////////////////游戏处理部分结束








/*********************************************************************/
/* Function: changeLanguage                                          */
/* Description: 中英文切换                                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-28                                 */
/*********************************************************************/
function changeLanguage()
{
	if (SETUP_Language=='chinese') {
		SETUP_Language = 'english';
	}
	else if (SETUP_Language=='english') {
		SETUP_Language = 'chinese';
	}
	game_LanguageSelect();
	//显示功能选项图标
	var tempBgURL = 'url(image/'+SETUP_Language+'/dirList'+(mediaTypeIndex+1)+'.jpg)';
	document.getElementById('titleIcon').style.backgroundImage = tempBgURL;
	showFileList();
	miniMenuShow();
	return;
}


/*********************************************************************/
/* Function: changeSkin                                              */
/* Description: 皮肤切换                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-28                                 */
/*********************************************************************/
function changeSkin()
{
	SETUP_SkinIndex = (SETUP_SkinIndex>=SETUP_SkinTotal-1)? 0 : (SETUP_SkinIndex+1);
	ShowChangeSkin();
	return;
}

/*********************************************************************/
/* Function: ShowChangeSkin                                          */
/* Description: 显示皮肤切换                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-28                                 */
/*********************************************************************/
function ShowChangeSkin()
{
	//显示背景菜单图片
	var tempURL = 'url(image/skin'+SETUP_SkinIndex+'/fileList.jpg)';
	document.getElementById('bgPicture').style.backgroundImage = tempURL;
	//显示提示框图片
	tempURL = 'url(image/skin'+SETUP_SkinIndex+'/pSelect.png)';
	document.getElementById('divInfo').style.backgroundImage = tempURL;
	//功能菜单背景图片
	tempURL = 'url(image/skin'+SETUP_SkinIndex+'/miniMenu2.png)';
	document.getElementById('divMenu').style.backgroundImage = tempURL;
	//显示USB提示框图片
	tempURL = 'url(image/skin'+SETUP_SkinIndex+'/usbInfo.png)';
	document.getElementById('usbDiv').style.backgroundImage = tempURL;
	return;
}




///////////////////////////////////////////////////////////////////////功能菜单处理部分开始
/*********************************************************************/
/* Function: miniMenuOpen                                            */
/* Description: 开启功能菜单                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-30                                 */
/*********************************************************************/
var isMiniMenu = false;
function miniMenuOpen()
{
	if (!isMiniMenu) {
		isMiniMenu = true;
		miniMenuShow();
		//显示功能菜单背景图片
		document.getElementById('divMenu').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/miniMenu2.png)';
		document.getElementById('divMenu').style.visibility = 'visible';
		document.getElementById('divPicture').style.visibility = 'hidden';
	}
	else {
		miniMenuHide();
	}
	return;
}

/*********************************************************************/
/* Function: miniMenuHide                                            */
/* Description: 关闭功能菜单                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-30                                 */
/*********************************************************************/
function miniMenuHide()
{
	isMiniMenu = false;
	document.getElementById('divMenu').style.visibility = 'hidden';
		document.getElementById('divPicture').style.visibility = 'visible';
	return;
}

/*********************************************************************/
/* Function: miniMenuHide                                            */
/* Description: 显示功能菜单                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-30                                 */
/*********************************************************************/
function miniMenuShow()
{
	//更换换肤图标
	document.getElementById('divMenuPos1').style.backgroundImage = 'url(image/'+SETUP_Language+'/menuIcon11.png)';
	//语言切换图标
	document.getElementById('divMenuPos2').style.backgroundImage = 'url(image/'+SETUP_Language+'/menuIcon10.png)';
	return;
}

/*********************************************************************/
/* Function: miniMenuNext                                            */
/* Description: 下一个功能菜单选项                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-30                                 */
/*********************************************************************/
var miniMenuIndex = 0; //功能菜单选项的序列号
function miniMenuNext()
{
	miniMenuIndex = (miniMenuIndex>=1)? 0 : (miniMenuIndex+1);
	document.getElementById('divMenuFocus').style.left = 65+miniMenuIndex*140+"px";
	return;
}

/*********************************************************************/
/* Function: miniMenuPrevious                                        */
/* Description: 下一个功能菜单选项                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-30                                 */
/*********************************************************************/
function miniMenuPrevious()
{
	miniMenuIndex = (miniMenuIndex<=0)? 1 : (miniMenuIndex-1);
	document.getElementById('divMenuFocus').style.left = 65+miniMenuIndex*140+"px";
	return;
}

/*********************************************************************/
/* Function: miniMenuSelect                                          */
/* Description: 选中功能菜单选项的处理                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-30                                 */
/*********************************************************************/
function miniMenuSelect()
{
	if (miniMenuIndex==0) {
		changeSkin();
	}
	else if (miniMenuIndex==1) {
		changeLanguage();
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
		document.getElementById('itemFocus').style.visibility = 'hidden';
		document.getElementById('divPicture').style.visibility = 'hidden';
		document.getElementById('itemInfo').style.visibility = 'hidden';
	} else {
		var pageTotal = parseInt((fileTotal-1)/8);
		var pageCurrent = parseInt(fileIndex/8);
		var showStatus = (pageCurrent>0)? 'visible' : 'hidden';
		document.getElementById('pageUp').style.visibility = showStatus;
		showStatus = (pageCurrent<pageTotal)? 'visible' : 'hidden';
		document.getElementById('pageDown').style.visibility = showStatus;
		document.getElementById('itemFocus').style.visibility = 'visible';
		document.getElementById('divPicture').style.visibility = 'visible';
		document.getElementById('itemInfo').style.visibility = 'visible';
	}
	return;
}
