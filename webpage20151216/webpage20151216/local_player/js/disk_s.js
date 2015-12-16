///////////////////////////////////////////////////////////////////////按键处理部分开始
/*********************************************************************/
/* Function: keyEvent                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-13                                 */
/*********************************************************************/
var isKeyClock = false; //遥控器按键锁定，用于播放请求处理过程中屏蔽遥控器按键
var isDoesnotItem = false; //无可用硬盘或服务器的状态
document.onkeypress = keyEvent;
function keyEvent(e)
{
	var keyValue = e.which;
	iPanel.ioctlWrite('printf', 'keyValue========disk========='+keyValue+'\n');
	//移动设备插拔的处理
	if (keyValue>=0xff20 && keyValue<=0xff34) {
		showUSBInfo(keyValue);
		return;
	}
	if (isDoesnotItem) {
		if (keyValue==213) {
			exitWebPage();
		}
		return (false);
	}
	if (isKeyClock) {
		return (false);
	}
	if (isMiniMenu) {
		keyMiniMenu(keyValue);
		return (false);
	}
	switch (keyValue) {
		case 213: //back
			keyBack();
			return (false);
			break;
		case 13: //Enter
			keyEnter();
			return (false);
			break;
		case 39: //right
			keyRight();
			return (false);
			break;
		case 37: //left
			keyLeft();
			return (false);
			break;
		case 40: //down
			keyDown();
			return (false);
			break;
		case 38: //up
			keyUp();
			return (false);
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
/* Function: keyLeft                                                 */
/* Description: keyLeft 键的处理函数                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-31                                 */
/*********************************************************************/
var isSelectDisk = false; //硬盘选择状态，true选择硬盘，false选择分区
function keyLeft()
{
	if (isSelectDisk) {
		return;
	}
	isSelectDisk = true;
	document.getElementById('partitionFocus').style.visibility = 'hidden';
	document.getElementById('hardDiskFocus').style.backgroundImage = "url("+hardDiskFocusOn.src+")";
	return;
}

/*********************************************************************/
/* Function: keyRight                                                */
/* Description: keyRight 键的处理函数                                */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-31                                 */
/*********************************************************************/
function keyRight()
{
	if (!isSelectDisk) {
		return;
	}
	isSelectDisk = false;
	document.getElementById('partitionFocus').style.visibility = 'visible';
	document.getElementById('hardDiskFocus').style.backgroundImage = "url("+hardDiskFocusOff.src+")";
	return;
}

/*********************************************************************/
/* Function: keyUp                                                   */
/* Description: keyUp 键的处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-31                                 */
/*********************************************************************/
function keyUp()
{
	if (isSelectDisk) {
		diskListPrevious();
		return;
	}
	zoneListPrevious();
	return;
}

/*********************************************************************/
/* Function: keyDown                                                 */
/* Description: keyDown 键的处理函数                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-31                                 */
/*********************************************************************/
function keyDown()
{
	if (isSelectDisk) {
		diskListNext();
		return;
	}
	zoneListNext();
	return;
}

/*********************************************************************/
/* Function: keyEnter                                                */
/* Description: keyEnter 键的处理函数                                */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-13                                 */
/*********************************************************************/
function keyEnter()
{
	if (isSelectDisk) {
		isSelectDisk = false;
		document.getElementById('partitionFocus').style.visibility = 'visible';
		document.getElementById('hardDiskFocus').style.backgroundImage = "url("+hardDiskFocusOff.src+")";
	}
	else {
		zoneSelect();
	}
	return;
}

/*********************************************************************/
/* Function: keyBack                                                 */
/* Description: keyBack 键的处理函数                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-13                                 */
/*********************************************************************/
function keyBack()
{
	if (!isSelectDisk) {
		isSelectDisk = true;
		document.getElementById('partitionFocus').style.visibility = 'hidden';
		document.getElementById('hardDiskFocus').style.backgroundImage = "url("+hardDiskFocusOn.src+")";
	}
	else {
		exitWebPage();
	}
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
	var tempStr = '';
	if (htmlTitle=='movie') {
		tempStr = '0';
	}
	else if (htmlTitle=='music') {
		tempStr = '1';
	}
	else if (htmlTitle=='photo') {
		tempStr = '2';
	}
	else if (htmlTitle=='games') {
		tempStr = '3';
	}
	else if (htmlTitle=='files') {
		tempStr = '4';
	}
	document.location.href = 'menu.html?'+tempStr;
	return;
}
///////////////////////////////////////////////////////////////////////按键处理部分结束


///////////////////////////////////////////////////////////////////////初始化处理部分开始
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
		init();
	}
	return;
}

/*********************************************************************/
/* Function: webStyleSet                                             */
/* Description: 载入网页要显示的图片		                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-31                                 */
/*********************************************************************/
var pageBg = new Image();
var diskBg = new Image();
var selectDiskImg = new Image();
var hardDiskFocusOff = new Image();
var hardDiskFocusOn = new Image();
var hardDiskBgOff = new Image();
var hardDiskBgOn = new Image();
var messageBg = new Image();
var partitionList = new Image();
var partitionFocus = new Image();
function webStyleSet()
{
	pageBg.src = 'style1/skin'+SETUP_SkinIndex+'/mainBg1.jpg';
	diskBg.src = 'style1/skin'+SETUP_SkinIndex+'/partitionBg.png';
	selectDiskImg.src = (SETUP_Language=='english')? 'style1/selectDiskEng.png' : 'style1/selectDiskChn.png';
	hardDiskFocusOff.src = 'style1/skin'+SETUP_SkinIndex+'/hardDiskFocusOff.png';
	hardDiskFocusOn.src = 'style1/skin'+SETUP_SkinIndex+'/hardDiskFocus.png';
	hardDiskBgOff.src = 'style1/hardDiskOff.png';
	hardDiskBgOn.src = 'style1/hardDiskOn.png';
	messageBg.src = 'style1/skin'+SETUP_SkinIndex+'/miniMenu3.png';
	partitionList.src = 'style1/partitionList.png';
	partitionFocus.src = 'style1/partitionFocus.png';
	return;
}

/*********************************************************************/
/* Function: showInfo                                                */
/* Description: 显示标题信息                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-31                                 */
/*********************************************************************/
function showInfo()
{
	//显示设备文字
	for (var i=0; i<4; i++) {
		document.getElementById('hardDiskText'+i).innerHTML = disk_DEVICE_NAME[i];
	}
	//显示标题图片
	var hrefStr = document.location.href.split('?');
	var parameter = parseInt(hrefStr[1]);
	var titleStr = new Array('movie', 'music', 'photo', 'games', 'files'); //功能选项数组
	htmlTitle = titleStr[parameter];
	var tempBgURL = 'url(style1/titleIcon'+(parameter+1)+'.png)';
	document.getElementById('styleList').style.backgroundImage = "url("+pageBg.src+")";
	document.getElementById('partitionBg').style.backgroundImage = "url("+diskBg.src+")";
	document.getElementById('hardDiskTitle').style.backgroundImage = "url("+selectDiskImg.src+")";
	document.getElementById('partitionList').style.backgroundImage = "url("+partitionList.src+")";
	document.getElementById('partitionFocus').style.backgroundImage = "url("+partitionFocus.src+")";
	document.getElementById('projectIcon').style.backgroundImage = tempBgURL;
	return;
}

/*********************************************************************/
/* Function: init                                                    */
/* Description: 创建XMLHttpRequest对象; 发送获得硬盘序号的请求       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-31                                 */
/*********************************************************************/
var htmlTitle = ''; //网页title标签的内容，用于区分不同功能的网页
function init()
{
	disk_LanguageSelect();
	showInfo();
	setTimeout("makeRequest('Cookie?1|zoneIndex', getZoneIndex, 1)", 1);
	return;
}

/*********************************************************************/
/* Function: getZoneIndex                                            */
/* Description: 获得硬盘序号信息，发送获得硬盘列表信息请求           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-11                                 */
/*********************************************************************/
var isFormMenu = false; //从菜单进入本网页
function getZoneIndex()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		isFormMenu = true;
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus!=0) {
			var getParameter = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue.split('@');
			serverIndex = parseInt(getParameter[0]);
			zoneIndex = parseInt(getParameter[1]);
			if (serverIndex!=9) {
				isFormMenu = false;
			}
		}
		setTimeout("makeRequest('getDrives', getDiskList, 4)", 1);
	}
	return;
}

/*********************************************************************/
/* Function: getDiskList                                             */
/* Description: 获得硬盘分区的总数和列表                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-31                                 */
/*********************************************************************/
var serverTotal = new Array(); //各硬盘或服务器分区的总数
var serverIndex = 0; //当前硬盘或服务器的索引号
var serverData = new Array();  //各硬盘或服务器的数据(二维数组)
serverData[0] = new Array();
serverData[1] = new Array();
serverData[2] = new Array();
serverData[3] = new Array();
function getDiskList()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		//无可用硬盘或服务器时的处理
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==0) {
			hideDiskState();
			hideZoneList();

			document.getElementById('messageText').style.backgroundImage = "url("+messageBg.src+")";
			document.getElementById('messageText').innerHTML = '<br>'+disk_DEVICE_NONE;
			document.getElementById('divMessage').style.visibility = 'visible';
			isKeyClock = false;
			isDoesnotItem = true;
			return;
		}
		isDoesnotItem = false;
		document.getElementById('divMessage').style.visibility = 'hidden';
		document.getElementById('hardDiskFocus').style.backgroundImage = "url("+hardDiskFocusOff.src+")";
		document.getElementById('partitionFocus').style.visibility = 'visible';
		//获得硬盘或服务器分区的总数和信息
		var getServerInfo = httpRequest.responseXML.getElementsByTagName('serverInfo').item(0).childNodes[0].nodeValue.split('|');
		var tempRequest;
		for (var i=0; i<4; i++) {
			serverTotal[i] = parseInt(getServerInfo[i]);
			for (var j=0; j<serverTotal[i]; j++) {
				tempRequest = httpRequest.responseXML.getElementsByTagName('server'+i)
				serverData[i][j] = tempRequest.item(j).childNodes[0].nodeValue;
			}
		}
		//获得第一个可用的硬盘或服务器序号
		if (isFormMenu) {
			for (var i=0; i<4; i++) {
				if (serverTotal[i]>0) {
					serverIndex = i;
					break;
				}
			}
			zoneIndex = 0;
		}
		//显示所有硬盘或服务器的状态
		showDiskState(serverIndex);
		//显示分区列表
		showZoneList();
		//解除按键锁定
		isKeyClock = false;
	}
	return;
}

/*********************************************************************/
/* Function: showDiskState                                           */
/* Description: 显示硬盘或服务器的状态                               */
/* Parameters: parameter 当前设备的序号                              */
/* Author&Date: lixudong  2010-03-31                                 */
/*********************************************************************/
function showDiskState(parameter)
{
	//超出硬盘或服务器定义范围的处理
	if (parameter<0 || parameter>3) {
		return;
	}
	//以不同文字颜色显示硬盘或服务器的状态
	var colorStr = '';
	for (var i=0; i<4; i++) {
		var tempColor = (parseInt(serverTotal[i])>0)? '#ffffff' : '#8a8a8a';
		document.getElementById('hardDiskText'+i).style.color = tempColor;
		if (parseInt(serverTotal[i])>0) {
			document.getElementById('hardDiskIcon'+i).style.backgroundImage = "url("+hardDiskBgOn.src+")";
		}
		else {
			document.getElementById('hardDiskIcon'+i).style.backgroundImage = "url("+hardDiskBgOff.src+")";
		}
	}
	//移动硬盘或服务器的焦点位置
	var tempPos = 43+parameter*48+"px";
	document.getElementById('hardDiskFocus').style.top = tempPos;
	document.getElementById('hardDiskFocus').style.visibility = 'visible';
	return;
}

/*********************************************************************/
/* Function: showZoneList                                            */
/* Description: 显示硬盘分区列表                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-31                                 */
/*********************************************************************/
var zoneTotal = 0; //硬盘或服务器分区的总数
var zoneIndex = 0; //当前硬盘或服务器分区的索引号
var zoneType = new Array(); //硬盘或服务器分区类型，取值 0, 1, 2, 3
var zoneName = new Array(); //硬盘或服务器分区的名称
var zoneSpace = new Array(); //硬盘或服务器分区的总空间
var zoneFree = new Array(); //硬盘或服务器分区的剩余空间
var zoneID = new Array(); //硬盘或服务器分区的标识符
var zoneLabel = new Array(); //硬盘或服务器分区的卷标
function showZoneList()
{
	//对分区总数的处理
	zoneTotal = serverTotal[serverIndex];
	//zoneTotal = 8;
	if (zoneTotal<=0) {
		return;
	}
	//获得当前硬盘或服务器的分区列表数据
	var param = new Array();
	for (var i=0; i<zoneTotal; i++) {
		param = serverData[serverIndex][i].split('|');
		zoneType[i] = param[0];
		zoneName[i] = param[1];
		zoneSpace[i] = parseFloat(param[2]);
		zoneFree[i] = parseFloat(param[3]);
		zoneID[i] = param[4];
		zoneLabel[i] = param[5];
	}
	//计算当前页号和总页数
	var pageTotal = parseInt((zoneTotal-1)/5);
	var pageCurrent = parseInt(zoneIndex/5);
	//计算当前页列表的结束位置
	var end = zoneTotal-pageCurrent*5;
	end = (end>5) ? 5 : end;
	document.getElementById('partitionList').style.height = 96*end+1+"px";
	//显示页码和翻页指示
	if (zoneTotal>5) {
		var tempPageNumber = disk_PAGE_NUMBER[0]+(pageCurrent+1)+disk_PAGE_NUMBER[1]+(pageTotal+1)+disk_PAGE_NUMBER[2];
		document.getElementById('pageInfoStyle').innerHTML = tempPageNumber;
		var showStatus = (pageCurrent>0)? 'url(style1/pageUp_S.png)' : 'url(style1/pageUp_N.png)';
		document.getElementById('pageUpStyle').style.backgroundImage = showStatus;
		showStatus = (pageCurrent<pageTotal)? 'url(style1/pageDn_S.png)' : 'url(style1/pageDn_N.png)';
		document.getElementById('pageDnStyle').style.backgroundImage = showStatus;
		document.getElementById('pageInfo').style.visibility = 'visible';
	}
	else {
		document.getElementById('pageInfo').style.visibility = 'hidden';
	}
	//显示当前硬盘或服务器的分区列表
	var pos, showStr='', totalStr='', freeStr='', tempWidth, tempColor;
	for (var i=0; i<end; i++) {
		pos = i+pageCurrent*5;
		if (serverIndex==3) {
			showStr = zoneName[pos];
			tempWidth = 155;
		}
		else {
			spaceStr = changeDataUnit(zoneSpace[pos]*1024);
			freeStr = changeDataUnit(zoneFree[pos]*1024);
			showStr = disk_DISK_SPACE[0]+zoneID[pos]+'('+spaceStr+'): '+disk_DISK_SPACE[1]+freeStr;
			tempWidth = parseInt((zoneSpace[pos]-zoneFree[pos])/zoneSpace[pos]*155);
			tempWidth = (tempWidth<=0)? 1 : tempWidth;
			tempWidth = (tempWidth>=155)? 155 : tempWidth;
			tempColor = (tempWidth>parseInt(155*0.9))? 'd8196d' : '19a5de'
		}
		document.getElementById('partitionText'+i).innerHTML = showStr;
		document.getElementById('partitionIcon'+i).style.width = tempWidth+"px";
	}
	//显示当前分区的信息
	showZoneInfo();
	return;
}

/*********************************************************************/
/* Function: showZoneInfo                                            */
/* Description: 显示分区列表选项的信息                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-31                                 */
/*********************************************************************/
function showZoneInfo()
{
	//移动焦点位置
	var pos = zoneIndex%5;
	document.getElementById('partitionFocus').style.top = 0+94*pos+"px";
	return;
}

/*********************************************************************/
/* Function: hideDiskState                                           */
/* Description: 隐藏硬盘或服务器的状态                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-31                                 */
/*********************************************************************/
function hideDiskState()
{
	for (var i=0; i<4; i++) {
		document.getElementById('hardDiskText'+i).style.color = '#8a8a8a';
		document.getElementById('hardDiskIcon'+i).style.backgroundImage = "url("+hardDiskBgOff.src+")";
	}
	document.getElementById('hardDiskFocus').style.visibility = 'hidden';
	//document.getElementById('hardDiskFocus').style.left = 29+36;
	hideZoneList();
	return;
}

/*********************************************************************/
/* Function: hideZoneList                                            */
/* Description: 隐藏分区列表选项的信息                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-31                                 */
/*********************************************************************/
function hideZoneList()
{
	document.getElementById('partitionList').style.height = "1px";
	for (var i=0; i<5; i++) {
		document.getElementById('partitionIcon'+i).style.width = "1px";
		document.getElementById('partitionText'+i).innerHTML = '';
	}
	return;
}
///////////////////////////////////////////////////////////////////////初始化处理部分结束


///////////////////////////////////////////////////////////////////////功能处理部分开始
/*********************************************************************/
/* Function: zoneListNext                                            */
/* Description: 向下移动焦点，选择下一个选项                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-12                                 */
/*********************************************************************/
function zoneListNext()
{
	if (zoneIndex>=(zoneTotal-1)) {
		return;
	}
	zoneIndex++;
	var pos = zoneIndex%5;
	if (pos==0) {
		showZoneList();
	}
	showZoneInfo();
	return;
}

/*********************************************************************/
/* Function: zoneListPrevious                                        */
/* Description: 向上移动焦点，选择前一个选项                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-12                                 */
/*********************************************************************/
function zoneListPrevious()
{
	if (zoneIndex<=0) {
		return;
	}
	zoneIndex--;
	var pos = zoneIndex%5;
	if (pos==4) {
		showZoneList();
	}
	showZoneInfo();
	return;
}

/*********************************************************************/
/* Function: zoneSelect                                              */
/* Description: 选中分区后的处理(保存硬盘和分区信息)                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-01-04                                 */
/*********************************************************************/
function zoneSelect()
{
	if (!isKeyClock) {
		setTimeout("makeRequest('Cookie?0|zoneIndex|'+serverIndex+'@'+zoneIndex, gotoListPage, 1)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: gotoListPage                                            */
/* Description: 选中分区后的处理(跳转到项目列表目录)                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-12                                 */
/*********************************************************************/
function gotoListPage()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var hrefStr = document.location.href.split('?');
		var nameStr = changeCompartStr(zoneName[zoneIndex], '/', '*');
		var tempStr = zoneType[0]+'|'+nameStr+'|'+zoneID[zoneIndex]+'|'+serverIndex+'|'+htmlTitle+'|'+hrefStr[1];
		document.location.href = htmlTitle+'List_s.html?'+tempStr;
	}
	return;
}

/*********************************************************************/
/* Function: diskListNext                                            */
/* Description: 选择下一个硬盘或服务器                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-13                                 */
/*********************************************************************/
function diskListNext()
{
	if (serverIndex>=3) {
		return;
	}
	//计算下一个硬盘或服务器的索引号
	serverIndex++;
	var isFindDisk = false;
	for (var i=serverIndex; i<4; i++) {
		if (serverTotal[i]>0) {
			serverIndex = i;
			isFindDisk = true;
			break;
		}
	}
	//显示下一个硬盘或服务器的分区列表
	if (isFindDisk) {
		zoneIndex = 0;
		showDiskState(serverIndex);
		showZoneList();
	}
	else {
		serverIndex--;
	}
	return;
}

/*********************************************************************/
/* Function: diskListPrevious                                        */
/* Description: 选择前一个硬盘或服务器                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-13                                 */
/*********************************************************************/
function diskListPrevious()
{
	if (serverIndex<=0) {
		return;
	}
	//计算前一个硬盘或服务器的索引号
	serverIndex--;
	var isFindDisk = false;
	for (var i=serverIndex; i>=0; i--) {
		if (parseInt(serverTotal[i])>0) {
			serverIndex = i;
			isFindDisk = true;
			break;
		}
	}
	//显示前一个硬盘或服务器的分区列表
	if (isFindDisk) {
		zoneIndex = 0;
		showDiskState(serverIndex);
		showZoneList();
	}
	else {
		serverIndex++;
	}
	return;
}
///////////////////////////////////////////////////////////////////////功能处理部分结束


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
		document.getElementById('divMenu').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/miniMenu3.png)';
		document.getElementById('divMenu').style.visibility = 'visible';
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
	document.getElementById('divMenuFocus').style.left = 221+miniMenuIndex*114+"px";
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
	document.getElementById('divMenuFocus').style.left = 221+miniMenuIndex*114+"px";
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



