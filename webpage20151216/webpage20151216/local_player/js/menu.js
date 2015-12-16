///////////////////////////////////////////////////////////////////////按键处理部分开始
/*********************************************************************/
/* Function: keyEvent                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-30                                 */
/*********************************************************************/
var isKeyClock = false; //遥控器按键锁定，用于播放请求处理过程中屏蔽遥控器按键
document.onkeypress = keyEvent;
function keyEvent(e)
{
	var keyValue = e.which;
	iPanel.ioctlWrite('printf', 'keyValue================='+keyValue+'\n');
	//移动设备插拔的处理
	if (keyValue>=0xff20 && keyValue<=0xff34) {
		showUSBInfo(keyValue);
		return;
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
			//document.location.href = 'http://192.168.100.105/style_webpage/menu.html';
			document.location.href = '../iptv.html';
			//systemInfo();
			return (false);
			break;
		case 13: //Enter
			exitWebPage();
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

		case 37: //left(快退)
			keyLeft();
			return (false);
			break;
		case 39: //right(快进)
			keyRight();
			return (false);
			break;
		case 519:	//设置
			document.location.href = 'file:////settings/land.html';
			break;
		case 56: //切换
		case 280:	//华为遥控器
			miniMenuOpen();
			break;
		default:
			return (-1);
			break;
	}
	return;
}

/*********************************************************************/
/* Function: keyRight                                                */
/* Description: 向右移动焦点，选择功能列表中的某一个                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-24                                 */
/*********************************************************************/
function keyRight()
{
	if (SETUP_WebStyle==0) {
		return;
	}
	////document.getElementById('B_menu'+focusProt).style.backgroundImage = eval('iconText'+focusProt+'.src');
	document.getElementById('B_menu'+focusProt).style.backgroundImage = "url("+eval('iconText'+focusProt+'.src')+")";
	document.getElementById('B_menu'+focusProt).innerHTML = menu_MODULE_STRING_STYLE[focusProt];
	focusProt++;
	if (focusProt>itemTotal) {
		focusProt = 0;
	}
	showItemFocuse();
	return;
}

/*********************************************************************/
/* Function: keyLeft                                                 */
/* Description: 向左移动焦点，选择功能列表中的某一个                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-24                                 */
/*********************************************************************/
function keyLeft()
{
	if (SETUP_WebStyle==0) {
		return;
	}
	////document.getElementById('B_menu'+focusProt).style.backgroundImage = eval('iconText'+focusProt+'.src');
	document.getElementById('B_menu'+focusProt).style.backgroundImage = "url("+eval('iconText'+focusProt+'.src')+")";
	document.getElementById('B_menu'+focusProt).innerHTML = menu_MODULE_STRING_STYLE[focusProt];
	focusProt--;
	if (focusProt<0) {
		focusProt = itemTotal;
	}
	showItemFocuse();
	return;
}

/*********************************************************************/
/* Function: keyUp                                                   */
/* Description: 向上移动焦点，选择功能列表中的某一个                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-17                                 */
/*********************************************************************/
var focusProt = 0;//记录焦点位置
function keyUp()
{
	if (SETUP_WebStyle==1) {
		return;
	}
	focusProt++;
	if (focusProt > itemTotal) {
		focusProt = 0;
	}
	showText();
	return;
}

/*********************************************************************/
/* Function: keyDown                                                 */
/* Description: 向下移动焦点，选择功能列表中的某一个                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-17                                 */
/*********************************************************************/
function keyDown()
{
	if (SETUP_WebStyle==1) {
		return;
	}
	focusProt--;
	if (focusProt < 0) {
		focusProt = itemTotal;
	}
	showText();
	return;
}

/*********************************************************************/
/* Function: setConfig                                               */
/* Description: 存储皮肤、语言设置                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-04-02                                 */
/*********************************************************************/
function setConfig()
{
	//makeRequest('Cookie?0|webConfig|'+SETUP_Language+'@'+SETUP_SkinIndex+'@'+SETUP_WebStyle, exitWebPage, 1);
	var tempParam = 'SETUP_Language='+SETUP_Language+'|SETUP_SkinIndex='+SETUP_SkinIndex+'|SETUP_WebStyle='+SETUP_WebStyle+'|';
	makeRequest('config?3|'+tempParam, exitWebPage, 1);
	return;
}

/*********************************************************************/
/* Function: exitWebPage                                             */
/* Description: 跳转到选中功能项对应的页面                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-30                                 */
/*********************************************************************/
function exitWebPage()
{
	//if (httpRequest.readyState==4 && httpRequest.status==200) {
		if (focusProt>=0 && focusProt<=4) {
			var tempURL = (SETUP_WebStyle==1)? 'disk_s.html?' : 'disk.html?';
			document.location.href = tempURL+focusProt;
		}
		else if (focusProt==5) {
			document.location.href = 'settings.html?menu@'+focusProt; //设置网页
		}
		else if (focusProt==6) {
			//document.location.href = 'download.html'; //下载网页
		}
	//}
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
	makeRequest('config?0|pagestart|1', pagestartFun , 1);
	return;
}

function pagestartFun()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		makeRequest('config?2', getSetupParameter, 1);
	}
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
			/*var getResult = httpRequest.responseXML.getElementsByTagName('result');
			if (getResult.length==1) {
				webStyleSet();
				init();
				return;
			}*/
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
	//背景图片
	var tempURL = 'url(style1/skin'+SETUP_SkinIndex+'/mainBg0.jpg)';
	document.getElementById('style1').style.backgroundImage = tempURL;
	return;
}

/*********************************************************************/
/* Function: selectStyle                                             */
/* Description: 切换风格                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-24                                 */
/*********************************************************************/
function selectStyle()
{
	if (SETUP_WebStyle==1) {
		showItem();
		document.getElementById('style1').style.visibility = 'visible';
		document.getElementById('style0').style.visibility = 'hidden';
	}
	else{
		for (var i=1; i<=itemTotal; i++) {
			document.getElementById('text'+i).style.visibility = 'visible';
		}
		showText();
		document.getElementById('style1').style.visibility = 'hidden';
		document.getElementById('style0').style.visibility = 'visible';
	}
	return;
}

/*********************************************************************/
/* Function: showItem                                                */
/* Description: 显示八宫格风格的选项                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-24                                 */
/*********************************************************************/
function showItem()
{
	for (var i=0; i<=itemTotal; i++) {
		document.getElementById('B_menu'+i).innerHTML = menu_MODULE_STRING_STYLE[i];
	}
	showItemFocuse();
	return;
}

/*********************************************************************/
/* Function: showItemFocuse                                          */
/* Description: 显示当前选项的状态                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-24                                 */
/*********************************************************************/
function showItemFocuse()
{
	document.getElementById('B_menu'+focusProt).innerHTML = '';
	////document.getElementById('B_menu'+focusProt).style.backgroundImage = eval('iconImg'+focusProt+'.src');
	document.getElementById('B_menu'+focusProt).style.backgroundImage = "url("+eval('iconImg'+focusProt+'.src')+")";
	document.getElementById('B_Text').innerHTML = menu_MODULE_STRING_STYLE[focusProt];
	document.getElementById('B_PoPo').style.left = (45 + 201*focusProt)+"px";
	return;
}

/*********************************************************************/
/* Function: init                                                    */
/* Description: 初始化函数                                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-17                                 */
/*********************************************************************/
var itemTotal = SETUP_ModuleAmount; //功能选项个数
function init()
{
	menu_LanguageSelect();
	htmlTitle = document.title;
	loadImage();
	var hrefStr = document.location.href.split('?');
	var parameter = parseInt(hrefStr[1]);
	parameter = (isNaN(parameter))? 0 : parameter;
	if (parameter>=0 && parameter<=itemTotal) {
		focusProt = parameter;
		selectStyle();
	}
	saveZoneIndex();
	return;
}

/*********************************************************************/
/* Function: loadImage                                               */
/* Description: 加载图片                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-17                                 */
/*********************************************************************/
var iconText0 = new Image();
var iconText1 = new Image();
var iconText2 = new Image();
var iconText3 = new Image();
var iconText4 = new Image();
var iconText5 = new Image();
var iconText6 = new Image();
var iconImg0 = new Image();
var iconImg1 = new Image();
var iconImg2 = new Image();
var iconImg3 = new Image();
var iconImg4 = new Image();
var iconImg5 = new Image();
var iconImg6 = new Image();
var iconStyle = new Image();
var iconSkin = new Image();
var iconLanguage = new Image();
var iconSkin0Menu3 = new Image();
var iconSkin1Menu3 = new Image();
var iconSkin0Focus = new Image();
var iconMenu0Focus = new Image();
var iconMenu1Focus = new Image();
function loadImage()
{
	if (SETUP_WebStyle==1) {
		iconText0.src = 'style1/S_menu1.png';
		iconText1.src = 'style1/S_menu2.png';
		iconText2.src = 'style1/S_menu3.png';
		iconText3.src = 'style1/S_menu4.png';
		iconText4.src = 'style1/S_menu5.png';
		iconText5.src = 'style1/S_menu6.png';
		iconImg0.src = 'style1/B_menu1.png';
		iconImg1.src = 'style1/B_menu2.png';
		iconImg2.src = 'style1/B_menu3.png';
		iconImg3.src = 'style1/B_menu4.png';
		iconImg4.src = 'style1/B_menu5.png';
		iconImg5.src = 'style1/B_menu6.png';
	}
	else {
		iconText0.src = 'image/'+SETUP_Language+'/iconText1.png';
		iconText1.src = 'image/'+SETUP_Language+'/iconText2.png';
		iconText2.src = 'image/'+SETUP_Language+'/iconText3.png';
		iconText3.src = 'image/'+SETUP_Language+'/iconText4.png';
		iconText4.src = 'image/'+SETUP_Language+'/iconText5.png';
		iconText5.src = 'image/'+SETUP_Language+'/iconText7.png';
		iconImg0.src = 'image/icon1.jpg';
		iconImg1.src = 'image/icon2.jpg';
		iconImg2.src = 'image/icon3.jpg';
		iconImg3.src = 'image/icon4.jpg';
		iconImg4.src = 'image/icon5.jpg';
		iconImg5.src = 'image/icon7.jpg';
	}
	iconStyle.src = 'image/'+SETUP_Language+'/menuIcon12.png';
	iconSkin.src = 'image/'+SETUP_Language+'/menuIcon11.png';
	iconLanguage.src = 'image/'+SETUP_Language+'/menuIcon10.png';
	
	iconSkin0Menu3.src = 'image/skin'+SETUP_SkinIndex+'/miniMenu3.png';
	iconSkin1Menu3.src = 'style1/skin'+SETUP_SkinIndex+'/miniMenu3.png';
	iconSkin0Focus.src = 'image/menuIconFocus.png';
	iconMenu0Focus.src = 'style1/skin0/menuIconFocus.png';
	iconMenu1Focus.src = 'style1/skin1/menuIconFocus.png';
	return;
}

/*********************************************************************/
/* Function: saveZoneIndex                                           */
/* Description: 写入硬盘序号信息                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-17                                 */
/*********************************************************************/
function saveZoneIndex()
{
	setTimeout("makeRequest('Cookie?0|zoneIndex|9@9', nullFun, 1)", 10);
	return;
}
///////////////////////////////////////////////////////////////////////初始化部分结束


///////////////////////////////////////////////////////////////////////界面切换部分开始
/*********************************************************************/
/* Function: showText                                                */
/* Description: 显示列表的文字和当前选项图标                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-17                                 */
/*********************************************************************/
function showText()
{
	var pos1 = (focusProt+1)<=itemTotal ? (focusProt+1):(focusProt-itemTotal+0);
	var pos2 = (focusProt+2)<=itemTotal ? (focusProt+2):(focusProt-itemTotal+1);
	var pos3 = (focusProt+3)<=itemTotal ? (focusProt+3):(focusProt-itemTotal+2);
	var pos4 = (focusProt+4)<=itemTotal ? (focusProt+4):(focusProt-itemTotal+3);
	var pos5 = (focusProt+5)<=itemTotal ? (focusProt+5):(focusProt-itemTotal+4);
	document.getElementById('text1').innerHTML = menu_MODULE_STRING[pos1];
	document.getElementById('text2').innerHTML = menu_MODULE_STRING[pos2];
	document.getElementById('text3').innerHTML = menu_MODULE_STRING[pos3];
	document.getElementById('text4').innerHTML = menu_MODULE_STRING[pos4];
	document.getElementById('text5').innerHTML = menu_MODULE_STRING[pos5];
	showIcon();
	return;
}

/*********************************************************************/
/* Function: showIcon                                                */
/* Description: 显示当前选中的功能选项的图标和文字图标               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-17                                 */
/*********************************************************************/
function showIcon()
{
	////document.getElementById('iconText').style.backgroundImage = eval('iconText'+focusProt+'.src');
	document.getElementById('iconText').style.backgroundImage = "url("+eval('iconText'+focusProt+'.src')+")";
	document.getElementById('itemImg').src = eval('iconImg'+focusProt+'.src');
	return;
}
///////////////////////////////////////////////////////////////////////界面切换部分结束


///////////////////////////////////////////////////////////////////////系统消息部分开始
/*********************************************************************/
/* Function: systemInfo                                              */
/* Description: 向系统发送退出的消息                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-17                                 */
/*********************************************************************/
function systemInfo()
{
	makeRequest('exit', nullFun, 1);
	return;
}
///////////////////////////////////////////////////////////////////////系统消息部分结束


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
		var tempURL = (SETUP_WebStyle==1)? 'url(style1/skin'+SETUP_SkinIndex+'/miniMenu3.png)' : 'url(image/skin'+SETUP_SkinIndex+'/miniMenu3.png)';
		document.getElementById('miniMenuBg').style.backgroundImage = tempURL;
		var tempURL = (SETUP_WebStyle==1)? 'url(style1/skin'+SETUP_SkinIndex+'/menuIconFocus.png)' : 'url(image/menuIconFocus.png)';
		document.getElementById('divMenuFocus').style.backgroundImage = tempURL;
		document.getElementById('divMenu').style.visibility = 'visible';
		document.getElementById('divMenuList').style.visibility = 'visible';
	}
	else {
		var tempParam = 'SETUP_Language='+SETUP_Language+'|SETUP_SkinIndex='+SETUP_SkinIndex+'|SETUP_WebStyle='+SETUP_WebStyle+'|';
		makeRequest('config?3|'+tempParam, miniMenuHide, 1);
		//miniMenuHide();
	}
	return;
}

/*********************************************************************/
/* Function: miniMenuShow                                            */
/* Description: 显示功能菜单                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-30                                 */
/*********************************************************************/
function miniMenuShow()
{
	//风格切换图标
	document.getElementById('divMenuPos1').style.backgroundImage = "url("+iconStyle.src+")";
	//更换换肤图标
	document.getElementById('divMenuPos2').style.backgroundImage = "url("+iconSkin.src+")";
	//语言切换图标
	document.getElementById('divMenuPos3').style.backgroundImage = "url("+iconLanguage.src+")";
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
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		isMiniMenu = false;
		document.getElementById('divMenuList').style.visibility = 'hidden';
		document.getElementById('divMenu').style.visibility = 'hidden';
	}
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
	miniMenuIndex = (miniMenuIndex>=2)? 0 : (miniMenuIndex+1);
	document.getElementById('divMenuFocus').style.left = (42+miniMenuIndex*140)+"px";
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
	miniMenuIndex = (miniMenuIndex<=0)? 2 : (miniMenuIndex-1);
	document.getElementById('divMenuFocus').style.left = (42+miniMenuIndex*140)+"px";
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
		changeStyle();
	}
	else if (miniMenuIndex==1) {
		changeSkin();
	}
	else if (miniMenuIndex==2) {
		changeLanguage();
	}
	return;
}

/*********************************************************************/
/* Function: changeLanguage                                          */
/* Description: 中英文切换                                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-30                                 */
/*********************************************************************/
function changeLanguage()
{
	if (SETUP_Language=='chinese') {
		SETUP_Language = 'english';
	}
	else {
		SETUP_Language = 'chinese';
	}
	menu_LanguageSelect();
	loadImage();
	miniMenuShow();
	if (SETUP_WebStyle==1) {
		showItem();
	}
	else {
		showText();
	}
	return;
}

/*********************************************************************/
/* Function: changeStyle                                             */
/* Description: 切换样式                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-24                                 */
/*********************************************************************/
function changeStyle()
{
	SETUP_WebStyle = (SETUP_WebStyle==0)? 1 : 0;
	SETUP_SkinIndex = 0;
	loadImage();
	ShowChangeSkin();
	selectStyle();
	return;
}

/*********************************************************************/
/* Function: changeSkin                                              */
/* Description: 皮肤切换                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-30                                 */
/*********************************************************************/
function changeSkin()
{
	SETUP_SkinIndex = (SETUP_SkinIndex>=SETUP_SkinTotal-1)? 0 : (SETUP_SkinIndex+1);
	loadImage();
	ShowChangeSkin();
	return;
}

/*********************************************************************/
/* Function: ShowChangeSkin                                          */
/* Description: 显示皮肤切换                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-30                                 */
/*********************************************************************/
function ShowChangeSkin()
{
	webStyleSet();
	//功能菜单背景图片
	var tempURL = (SETUP_WebStyle==1)? iconSkin1Menu3.src : iconSkin0Menu3.src;
	document.getElementById('miniMenuBg').style.backgroundImage = "url("+tempURL+")";
	var tempURL = (SETUP_WebStyle==1)? eval('iconMenu'+SETUP_SkinIndex+'Focus').src : iconSkin0Focus.src;
	document.getElementById('divMenuFocus').style.backgroundImage = "url("+tempURL+")";
	//显示USB提示框图片
	tempURL = 'url(image/skin'+SETUP_SkinIndex+'/usbInfo.png)';
	document.getElementById('usbDiv').style.backgroundImage = tempURL;
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