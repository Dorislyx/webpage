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
		return;
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
			break;
		case 276: //绿键
			break;
		case 277: //黄键
			break;
		case 278: //蓝键(信息)
			break;

		case 263: //play/pause(播放/暂停)
			break;
		case 259: //volume+(音量+)
			break;
		case 260: //volume-(音量-)
			break;
		case 261: //mute(静音)
			break;
		case 262: //track(声道)
			break;

		case 284: //帮助
			break;
		case 1292: //字幕
			break;
		case 271: //定位
			break;
		case 281: //收藏
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
/* Function: keyRight                                                */
/* Description: keyRight 按键处理函数                                */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function keyRight()
{
	channelRight();
	return;
}

/*********************************************************************/
/* Function: keyLeft                                                 */
/* Description: keyLeft 按键处理函数                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function keyLeft()
{
	channelLeft();
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
	document.location.href = 'disk_s.html?'+mediaTypeIndex;
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
/* Author&Date: lixudong  2010-04-01                                 */
/*********************************************************************/
var ViewTotal = 9; //每页能显示的显目总数
var messageBg = new Image();
function webStyleSet()
{
	//背景图片
	document.getElementById('styleList').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/mainBg1.jpg)';
	messageBg.src = 'style1/skin'+SETUP_SkinIndex+'/miniMenu3.png';
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
	//显示当前路径
	document.getElementById('styleDiskText').innerHTML = tempPathShow;
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
			document.getElementById('messageText').style.backgroundImage = "url("+messageBg.src+")";
			document.getElementById('messageText').innerHTML = game_OPERATE_INFO[0]+game_OPERATE_INFO[1];
			document.getElementById('divMessage').style.visibility = 'visible';
			isKeyClock = false;
			isDoesnotItem = true;
			return;
		}
		isDoesnotItem = false;
		document.getElementById('divMessage').style.visibility = 'hidden';
		//document.getElementById('styleFocus').style.visibility = 'visible';
		//获得文件夹和文件的信息
		var parameter;
		for (var i=0; i<fileTotal; i++) {
			parameter = responseXMLHead.item(i).childNodes[0].nodeValue.split('|');
			fileRealName[i] = parameter[0];
			fileShowName[i] = parameter[1];
			fileInfo[i] = parameter[2];
			fileURL[i] = parameter[3];
			//filePicture[i] = (parameter[4]=='no picture')? 'style1/fileType4.png' : 'file:///LocalPlayer'+parameter[4];
			filePicture[i] = 'style1/fileType4.png';
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
	var pageTotal = parseInt((fileTotal-1)/ViewTotal);
	var pageCurrent = parseInt(fileIndex/ViewTotal);
	//计算当前页列表的结束位置
	var end = fileTotal-pageCurrent*ViewTotal;
	end = (end>ViewTotal) ? ViewTotal : end;
	//显示页码和翻页指示
	var tempPageNumber = game_PAGE_NUMBER[0]+(pageCurrent+1)+game_PAGE_NUMBER[1]+(pageTotal+1)+game_PAGE_NUMBER[2];
	document.getElementById('pageInfoStyle').innerHTML = tempPageNumber;
	var showStatus = (pageCurrent>0)? 'url(style1/pageUp_S.png)' : 'url(style1/pageUp_N.png)';
	document.getElementById('pageUpStyle').style.backgroundImage = showStatus;
	showStatus = (pageCurrent<pageTotal)? 'url(style1/pageDn_S.png)' : 'url(style1/pageDn_N.png)';
	document.getElementById('pageDnStyle').style.backgroundImage = showStatus;
	/*if (fileTotal>ViewTotal) {
		var tempPageNumber = game_PAGE_NUMBER[0]+(pageCurrent+1)+game_PAGE_NUMBER[1]+(pageTotal+1)+game_PAGE_NUMBER[2];
		document.getElementById('pageInfoStyle').innerHTML = tempPageNumber;
		var showStatus = (pageCurrent>0)? 'url(style1/pageUp_S.png)' : 'url(style1/pageUp_N.png)';
		document.getElementById('pageUpStyle').style.backgroundImage = showStatus;
		showStatus = (pageCurrent<pageTotal)? 'url(style1/pageDn_S.png)' : 'url(style1/pageDn_N.png)';
		document.getElementById('pageDnStyle').style.backgroundImage = showStatus;
		document.getElementById('pageInfo').style.visibility = 'visible';
	}
	else {
		document.getElementById('pageInfo').style.visibility = 'hidden';
	}*/
	//显示文件夹和文件列表
	var pos, tempImg, tempName
	for (var i=0; i<ViewTotal; i++) {
		pos = i+pageCurrent*ViewTotal;
		tempImg = (i<end)? filePicture[pos] : 'image/null.png';
		tempName = (i<end)? fileShowName[pos] : '';
		document.getElementById('iconList'+i).src = tempImg;
		document.getElementById('textList'+i).innerHTML = tempName;
	}
	showFileInfo();
	return;
}

/*********************************************************************/
/* Function: showFileInfo                                            */
/* Description: 显示文件夹或文件的信息                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-29                                 */
/*********************************************************************/
function showFileInfo()
{
	//移动焦点位置
	var pos = fileIndex%ViewTotal;
	var row = parseInt(pos/3);
	var tempLeft = (ViewTotal==9)? (row*259+450) : (row*175+438);
	var tempTop = 99+(pos%3)*147;
	document.getElementById('styleFocus').style.left = tempLeft+"px";
	document.getElementById('styleFocus').style.top = tempTop+"px";
	//获得项目信息数据
	var showStr = game_FILE_INFO[0]+fileShowName[fileIndex]+'<br>'
	showStr += game_FILE_INFO[1]+fileInfo[fileIndex];
	document.getElementById('itemInfo').innerHTML = showStr;
	return;
}
///////////////////////////////////////////////////////////////////////初始化部分结束


///////////////////////////////////////////////////////////////////////功能处理部分开始
/*********************************************************************/
/* Function: channelRight                                            */
/* Description: 向右移动焦点，选择下一个选项                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-12                                 */
/*********************************************************************/
function channelRight()
{
	if ((fileIndex>=fileTotal-1)) {
		return;
	}
	var pos = fileIndex%ViewTotal;
	if (pos>=ViewTotal-3) {
		return;
		//向右移动后可翻页的处理
		/*fileIndex += 3;
		fileIndex = (fileIndex>=fileTotal-1)? fileTotal-1 : fileIndex;
		getFileListRequest();*/
	}
	else {
		fileIndex += 3;
		fileIndex = (fileIndex>=fileTotal-1)? fileTotal-1 : fileIndex;
		showFileInfo();
	}
	return;
}

/*********************************************************************/
/* Function: channelLeft                                             */
/* Description: 向左移动焦点，选择下一个选项                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-12                                 */
/*********************************************************************/
function channelLeft()
{
	if (fileIndex<=0) {
		return;
	}
	var pos = fileIndex%ViewTotal;
	if (pos<3) {
		return;
		//向左移动后可翻页的处理
		/*fileIndex -= 3;
		if (fileIndex<=0) {
			fileIndex += 3;
		}
		else {
			getFileListRequest();
		}*/
	}
	else {
		fileIndex -= 3;
		showFileInfo();
	}
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
	var pos = fileIndex%3;
	if (pos==2 || fileIndex==(fileTotal-1)) {
		var pageTotal = parseInt((fileTotal-1)/ViewTotal);
		var pageCurrent = parseInt(fileIndex/ViewTotal);
		fileIndex += ViewTotal-2;
		if (fileIndex>(fileTotal-1)) {
			if (pageCurrent<pageTotal) {
				fileIndex = fileTotal-1;
			} else {
				fileIndex = 0;
			}
		}
		showFileList();
	}
	else {
		fileIndex++;
		showFileInfo();
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
	var pos = fileIndex%3;
	if (pos==0) {
		fileIndex -= ViewTotal-2;
		if (fileIndex<=0) {
			fileIndex = fileTotal-1;
		}
		showFileList();
	}
	else {
		fileIndex--;
		showFileInfo();
	}
	return;
}

/*********************************************************************/
/* Function: channelPageNext                                         */
/* Description: 向后翻页                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-12                                 */
/*********************************************************************/
function channelPageNext()
{
	if (fileIndex>(fileTotal-1)) {
		return;
	}
	var pageTotal = parseInt((fileTotal-1)/ViewTotal);
	var pageCurrent = parseInt(fileIndex/ViewTotal);
	fileIndex += ViewTotal;
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
/* Author&Date: lixudong  2010-03-12                                 */
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
		var showStr = '<br>'+game_EXIT_INFO[0];
		document.getElementById('statusImage').style.visibility = 'hidden';
		document.getElementById('messageText').innerHTML = showStr;
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
	document.getElementById('styleList').style.visibility = 'hidden';
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
	var showStr = '<br>'+game_EXIT_INFO[1];
	document.getElementById('messageText').style.backgroundImage = "url("+messageBg.src+")";
	document.getElementById('statusImage').style.backgroundImage = 'url(image/'+SETUP_Language+'/selectBar2.png)'
	document.getElementById('messageText').innerHTML = showStr;
	document.getElementById('statusImage').style.visibility = 'visible';
	document.getElementById('divMessage').style.visibility = 'visible';
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
	document.getElementById('statusImage').style.visibility = 'hidden';
	document.getElementById('divMessage').style.visibility = 'hidden';
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
		document.getElementById('divMessage').style.visibility = 'hidden';
		document.getElementById('styleList').style.visibility = 'visible';
	}
	return;
}
///////////////////////////////////////////////////////////////////////游戏处理部分结束


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