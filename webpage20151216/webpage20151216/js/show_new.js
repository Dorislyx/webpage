// JavaScript Document
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
}
/*********************************************************************/
/* Function: keyEvent												 */
/* Description: 遥控器按键处理函数									 */
/* Parameters:														 */
/* Author&Date: gaogl by 2011-01-12							 */
/*********************************************************************/
var player = new AVPlayer();
//document.onkeypress = keyEvent;
document.onkeydown = keyEvent;
var navigatorStatus = true;//焦点是否在导航条
function keyEvent(e) {
	var keyValue = e.which;
	//iPanel.ioctlWrite('printf', 'keyValue========zpj========='+keyValue+'\n');
	switch (keyValue) {
		case 213: //back(停止)
		case 8:
			keyBack();
			return (false);
			break;
		case 37: //left
			keyLeft();
			return (false);
			break;
		case 38: //up
			keyUp();
			return false;
			break;
		case 39: //right
			keyRight();
			return (false);
			break;
		case 40: //down
			keyDown();
			return false;
			break;
		case 13://enter
			keyEnter();
			break;
		case 1073742338: //menu
			keyShowMenu();
			return (false);
			break;
		default:
			return (-1);
			break;
	}
	return;
}

var timer_showPvrBg;
function keyShowMenu()
{
	window.clearTimeout(timer_showPvrBg);
	if (menuStatus == 0) {
		document.getElementById("bodyBack").style.top = "-720px" ;
	}else{
		timer_showPvrBg = window.setTimeout("showPageFull();",600);
	}
	moveMenu();
}
/*********************************************************************/
/* Function: showPageFull                                            */
/* Description: 主菜单自动隐藏时，显示页面	                             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-02-11                              */
/*********************************************************************/
function showPageFull() {
	document.getElementById("bodyBack").style.top = "0px" ;
	return;
}

function setBackOpacity()
{
	document.getElementById('logoShow').style.opacity = '0.7';
	document.getElementById('upNavig').style.opacity = '0.7';
	document.getElementById('backBar').style.opacity = '0.7';
	document.getElementById('focusBar').style.opacity = '0.7';
	document.getElementById('blackBack').style.opacity = '0.9';
}

/*********************************************************************/
/* Function: loadLevelImage                                          */
/* Description: 加载横排图片的图片                                      */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2011-01-30                                 */
/*********************************************************************/
var levelImg = new Array();
function loadLevelImage() 
{
	levelImg[0] = "img/01.jpg";
	levelImg[1] = "img/02.jpg";
	levelImg[2] = "img/03.jpg";
	levelImg[3] = "img/04.jpg";
	levelImg[4] = "img/05.jpg";
	levelImg[5] = "img/06.jpg";
	levelImg[6] = "img/07.jpg";
	levelImg[7] = "img/08.jpg";
	levelImg[8] = "img/09.jpg";
	levelImg[9] = "img/010.jpg";
	levelImg[10] = "img/011.jpg";
	levelImg[11] = "img/012.jpg";
	levelImg[12] = "img/013.jpg";
	levelImg[13] = "img/014.jpg";
	return;
}

/*********************************************************************/
/* Function: init                                                    */
/* Description: 页面加载函数                                           */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-10-30                                 */
/*********************************************************************/
var upNavigArray = ['Focus Effect','Vertical Menu','Level Menu','Picture Effect','Acid test','Time-Zoom'];
function init()
{
	focusNum= 3;
	var leftPxSettings = "1003:1222:1441:-311:-92:127:346:565:784";
	divLeftArray = focusNum+"?"+leftPxSettings;
	htmlHref = fontListArray[0] + "?" + divLeftArray;  	 
	menuinit(); 

	//setBackOpacity();
	showCurrentTime("timeShow");
	//setInterval("showCurrentTime('timeShow');", 60000);

	for  (var i=0;i< upNavigArray.length;i++) {
		document.getElementById("item"+i).innerHTML = upNavigArray[i];
		document.getElementById("item"+i).style.left = 224*i+'px';
	}
	for (var t=0;t<9;t++) {//v菜单top定位
		document.getElementById('vmenu'+t).style.top = 43+43*t+'px';//86-5
	}
	for (var x=9;x<vmenuTotal;x++) {
		document.getElementById('vmenu'+x).style.top = '387px';//86-5
	}
	loadLevelImage();
	for (var j=0; j<listTotalTest; j++) {
		document.getElementById("img"+j).src = levelImg[j];
	}
	return;
}

/*********************************************************************/
/* Function: keyDown                                                 */
/* Description: 遥控器按键处理函数    	                             */
/* Parameters:                                                       */
/* Author&Date: gaogl 2011-01-12                                     */
/*********************************************************************/
function keyDown()
{
	if (menuStatus==1) return;
	if (itemPoint==0) {
		keyFocusDown();
	}
	else if (itemPoint==1) {
		keyVmenuDown();
	}
	else if (itemPoint==2) {
		if (navigatorStatus) {
			navigaFocusBlue(0,2);
			//document.getElementById("hiddFocusMoveImg").style.opacity = "0.0";
		}
	}
	else if(itemPoint==3){
		keyPictDown();
	}
	else if (itemPoint==5) {
		keyTimeZoomDown();
	}
	else {
		keyAcidDownUp(0);
	}
	return;
}

/*********************************************************************/
/* Function: keyUp                                                   */
/* Description: 遥控器按键处理函数    	                             */
/* Parameters:                                                       */
/* Author&Date: gaogl 2011-01-12                                     */
/*********************************************************************/
function keyUp()
{
	if (menuStatus==1) return;
	if (navigatorStatus)return;
	if (itemPoint==0) {
		keyFocusUp();
	}
	else if (itemPoint==1) {
		keyVmenuUp();
	}
	else if (itemPoint==2) {
		//document.getElementById("hiddFocusMoveImg").style.opacity = "0.7";
		navigaFocusBlue(1,2);
	}
	else if(itemPoint==3){
		keyPictUp();
	}
	else if (itemPoint==5) {
		return;
		keyTimeZoomDown();
	}
	else {
		keyAcidDownUp(1);
	}
	return;
}

/*********************************************************************/
/* Function: keyLeft                                                 */
/* Description: 左键的处理                                           */
/* Parameters:                                                       */
/* Author&Date: gaogl  2011-01-12                                    */
/*********************************************************************/
function keyLeft()
{
	if (menuStatus==1) {
		keymenuRight();
		return;
	}
	if (navigatorStatus) {
		focusToLeft();
	}
	else {
		if (itemPoint==3) {
			keyPictLeft();
		}
		else if (itemPoint==0) {
			keyFocusLeft();
		}
		else if (itemPoint==1) {
			return;//keyVmenuLeft();
		}
		else if (itemPoint==2) {
			rightMove();
			//keyLevelLeft();
		}
		else if (itemPoint==5) {
			return;
			keyTimeZoomDown();
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyRight                                                */
/* Description: 右键的处理                                            */
/* Parameters:                                                       */
/* Author&Date: gaogl  2011-01-12                                   */
/*********************************************************************/
function keyRight()
{
	if (menuStatus==1) {
		keymenuLeft();
		return;
	}
	if (navigatorStatus) {
		focusToRight();
	}
	else {
		if (itemPoint==3) {
			keyPictRight();
		}
		else if (itemPoint==0) {
			keyFocusRight();
		}
		else if (itemPoint==1) {
			return;//keyVmenuRight();
		}
		else if (itemPoint==2) {
			leftMove();
			//keyLevelRight();
		}
		else if (itemPoint==5) {
			return;
			keyTimeZoomDown();
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyEnter                                                */
/* Description: 确认键处理                                            */
/* Parameters: 									                     */
/* Author&Date: gaogl  2011-01-13                                    */
/*********************************************************************/
function keyEnter()
{
	if(menuStatus==1){ 
		if (focusNum == 3) {
			keyShowMenu();
		} else {
			keymenuEnter();
		}
		return (false);
	}
	if (navigatorStatus) {
		keyDown();
		return;
	}
	if (itemPoint==0 && toEPGStatus) {
		document.location.href = 'tvGuide_2.html';
	}
	else if (itemPoint==4 && acidRow>=0) {
		document.location.href = acidLink[acidRow];
	}
	return;
}

/*********************************************************************/
/* Function: keyBack	                                             */
/* Description: 返回键处理 				                             */
/* Parameters: 									                     */
/* Author&Date: zhaopengjun  2011-03-17                              */
/*********************************************************************/
function keyBack() {
	if (navigatorStatus && menuStatus == 0) {
		keyShowMenu();
	} else if (itemPoint == 0) {
		secondButtonOpe(1);
		focusLine = 0;
		focusRow = 0;
		keyFocusUp();
	} else if (itemPoint == 1) {
		navigaFocusBlue(1,1);
	} else if (itemPoint == 2) {
		navigaFocusBlue(1,2);
	} else if (itemPoint == 3) {
		if (albumLine > 0 || albumRow > 0) {
			albumLine = 0;
			albumRow = 0;
			document.getElementById('focusImg').style.left = 2+152*albumRow+'px';
			document.getElementById('focusImg').style.top = 117+140*albumLine+'px';
		}
		keyPictUp();
	} else if (itemPoint == 4) {
		document.getElementById('acid'+acidRow).style.fontSize = '24px';
		document.getElementById('acid'+acidRow).style.color = '#FFF';
		acidRow = 0;
		keyAcidDownUp(1);
	} else if (itemPoint == 5) {
		
	}
	return;
}

/*********************************************************************/
/* Function: focusToRight                                            */
/* Description: 在导航上，左键的处理                                 */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-10-19                                 */
/*********************************************************************/
var focusPoint = 0;//导航上，焦点所在的位置(0~3之间，因为目前规定导航上最多显示4个菜单)
var itemPoint = 0;//焦点指定当前的菜单索引号
function focusToRight()
{
	//3为导航中显示菜单的个数
	if(focusPoint>=3) {//焦点移动到最右侧时，菜单移动的处理
		if(itemPoint >= (upNavigArray.length-1)) return;//已经显示了最后一个菜单
		for(var i = 0; i< upNavigArray.length; i++) {
			var leftTemp = document.getElementById("item"+i).style.left;
			leftTemp = parseInt(leftTemp.split('px')[0]); 			
			document.getElementById("item"+i).style.left =  (leftTemp-224)+'px';
		}
		itemPoint++;
	}
	else {
		focusPoint++;
		itemPoint ++;
		var moveWidth = focusPoint*224+1;
		document.getElementById("focusBar").style.left = moveWidth+'px';
	}
	showCurrCont(0);
	return false;
}

/*********************************************************************/
/* Function: focusToLeft                                             */
/* Description: 在导航上，右键的处理                                 */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-10-19                                 */
/*********************************************************************/
function focusToLeft()
{
	if(focusPoint <=0) {
		if(itemPoint <=0) return;//已经显示了第一个菜单
		for(var i = 0; i< upNavigArray.length; i++) {
			var leftTemp = document.getElementById("item"+i).style.left;
			leftTemp = parseInt(leftTemp.split('px')[0]); 			
			document.getElementById("item"+i).style.left =  (leftTemp+224)+'px';
		}
		itemPoint--;
	}
	else {
		focusPoint--;
		itemPoint--;
		var moveWidth = focusPoint*224+1;
		document.getElementById("focusBar").style.left = moveWidth+'px';
	}
	showCurrCont(1);
	return;
}

/*********************************************************************/
/* Function: showCurrCont                                            */
/* Description: 中间部分的处理                                       */
/* Parameters:lrStates标识，1->left; 0->right                        */
/* Author&Date: Lucy gao  2010-10-19                                 */
/*********************************************************************/
function showCurrCont(lrStates)
{
	if (itemPoint==0) {
		document.getElementById("leftLt").style.opacity = '0';
	}
	else if (itemPoint==(upNavigArray.length-1)){
		document.getElementById("rightGt").style.opacity = '0';
	}
	else {
		document.getElementById("leftLt").style.opacity = '1';
		document.getElementById("rightGt").style.opacity = '1';
	}
	document.getElementById("item"+itemPoint).style.color = '#ffffff';
	document.getElementById('middle'+itemPoint).style.top = '189px';
	if (lrStates==0){
		document.getElementById("item"+(itemPoint-1)).style.color = '#b2b2b2';
		document.getElementById('middle'+(itemPoint-1)).style.top = '-460px';
	}
	else {
		document.getElementById("item"+(itemPoint+1)).style.color = '#b2b2b2';
		document.getElementById('middle'+(itemPoint+1)).style.top = '-460px';
	}
}

/*********************************************************************/
/* Function: keyPictDown                                             */
/* Description: 下到菜单一的内容    	                             */
/* Parameters:                                                       */
/* Author&Date: gaogl 2011-01-12                                     */
/*********************************************************************/
var albumLine = -1;//行
var albumRow = 0;//列
var fontFrameFocus = false;
var styleNum = 0;
function keyPictDown()
{
	if (navigatorStatus) {
		navigaFocusBlue(0,3)
		return;
	}
	if (fontFrameFocus) {
		fontFrameFocus = false;
		document.getElementById('focusImg').style.visibility = 'visible';
		document.getElementById("fontFrame").style.background = '-webkit-gradient(radial, 157 16, 65, 157 16, 210, from(#848484), to(#414141))';
	}
	if(albumLine>=1)return;
	albumLine++;
	pointAlbumFocus();
}

/*********************************************************************/
/* Function: keyPictUp                                               */
/* Description: 菜单一的上键的处理                                   */
/* Parameters:                                                       */
/* Author&Date: gaogl  2010-10-26                                    */
/*********************************************************************/
function keyPictUp()
{
	if(albumLine<=0) {
		if (!fontFrameFocus) {
			fontFrameFocus = true;
			albumLine = -1;
			document.getElementById('focusImg').style.visibility = 'hidden';
			document.getElementById("fontFrame").style.background = '-webkit-gradient(radial, 157 16, 65, 157 16, 210, from(#056ded), to(#000f37))';
		}
		else {
			navigaFocusBlue(1,3);
		}
		return;
	}
	albumLine--;
	pointAlbumFocus();
}

/*********************************************************************/
/* Function: keyAlbumRight                                           */
/* Description: 菜单四的右键的处理                                   */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-10-26                                 */
/*********************************************************************/
var changeStyle = new Array("Fade In - Out", "Top to bottom", "Left to Right",'Zoom in');//,'rotate');
function keyPictRight()
{
	if (fontFrameFocus) {
		styleNum = (styleNum+1)%changeStyle.length;
		document.getElementById("fontFrame").innerHTML = changeStyle[styleNum];
		return;
	}
	if(albumRow>=3) {
		if (albumLine == 0) {
			albumLine = 1;
			albumRow = 0;
			pointAlbumFocus();
		}
		return;
	}
	albumRow++;
	pointAlbumFocus();
}

/*********************************************************************/
/* Function: keyAlbumLeft                                            */
/* Description: 菜单四的左键的处理                                   */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-10-26                                 */
/*********************************************************************/
function keyPictLeft()
{
	if (fontFrameFocus) {
		styleNum = (styleNum-1+changeStyle.length)%changeStyle.length;
		document.getElementById("fontFrame").innerHTML = changeStyle[styleNum];
		return;
	}
	if(albumRow<=0) {
		if (albumLine == 1) {
			albumLine = 0;
			albumRow = 3;
			pointAlbumFocus();
		}
		return;
	}
	albumRow--;
	pointAlbumFocus();
}

/*********************************************************************/
/* Function: pointAlbumFocus                                         */
/* Description: 添加焦点标记                                         */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-10-26                                 */
/*********************************************************************/
function pointAlbumFocus()
{
	document.getElementById('focusImg').style.left = 2+152*albumRow+'px';
	document.getElementById('focusImg').style.top = 117+140*albumLine+'px';
	document.getElementById('imgStyle').style.webkitTransitionDuration = '0s';
	var alLen = (albumLine==0)?albumRow:(5+albumRow);
	document.getElementById("bigPic").src = 'img/'+albumArray[alLen][0];
	document.getElementById("citeText").innerHTML = albumArray[alLen][1];
	if (styleNum == 0) {
		document.getElementById("imgStyle").style.opacity = '0.0';
	} else if (styleNum == 1) {
		document.getElementById("imgStyle").style.height = "0px";
	} else if (styleNum == 2) {
		document.getElementById("imgStyle").style.left = "-400px";
	} else if (styleNum == 3) {
		//document.getElementById("imgStyle").style.webkitTransform = "scale(0.3)";
		toBigToSmall(1);
	}else if (styleNum == 4) {
		//document.getElementById("imgStyle").style.webkitTransform = "scale(1)";
		document.getElementById("imgStyle").style.webkitTransform = 'rotateY(180deg)';
	}
	setTimeout('changeShowImage()',10); 
	return;
}

/*********************************************************************/
/* Function: toBigToSmall                                           */
/* Description: 缩放功能                                             */
/* Parameters: bsStatus缩放标记；0->big;1->small                     */
/* Author&Date: gaogl  2011-01-12                                    */
/*********************************************************************/
function toBigToSmall(bsStatus)
{
	if (bsStatus==1) {
		document.getElementById('imgStyle').style.webkitTransitionDuration = '0s';
		document.getElementById('bigPic').style.webkitTransitionDuration = '0s';
		document.getElementById("imgStyle").style.top = "113px";
		document.getElementById("imgStyle").style.left = "150px";
		document.getElementById("imgStyle").style.width = "100px";
		document.getElementById("imgStyle").style.height = "75px";
		document.getElementById("bigPic").width = "100";
		document.getElementById("bigPic").height = "75";
	}
	else {		
		document.getElementById('imgStyle').style.webkitTransitionDuration = '0.5s';
		document.getElementById('bigPic').style.webkitTransitionDuration = '0.5s';
		document.getElementById("imgStyle").style.top = "0px";
		document.getElementById("imgStyle").style.left = "0px";
		document.getElementById("imgStyle").style.width = "400px";
		document.getElementById("imgStyle").style.height = "300px";
		document.getElementById("bigPic").width = "400";
		document.getElementById("bigPic").height = "300";
	}
}

/*********************************************************************/
/* Function: changeShowImage                                         */
/* Description: 显示特效结果                                           */
/* Parameters: 										                 */
/* Author&Date: gaogl  2011-01-13                                    */
/*********************************************************************/
var albumArray = [['pic1.jpg','Amy\'s Picture'],['pic2.jpg','Lucy\'s Picture'],['pic3.jpg','Grace\'s Picture'],['pic4.jpg','Afra\'s Picture'],['pic5.jpg','Linda\'s Picture'],['pic6.jpg','Camille\'s Picture'],['pic7.jpg','Cherry\'s Picture'],['pic8.jpg','Dora\'s Picture'],['pic9.jpg','Jamie\'s Picture'],['pic10.jpg','Candid Camera']];
function changeShowImage()
{
	document.getElementById('imgStyle').style.webkitTransitionDuration = '0.5s';
	if (styleNum == 0) {
		document.getElementById("imgStyle").style.opacity = '1.0';
	} else if (styleNum == 1) {
		document.getElementById("imgStyle").style.height = "300px";
	} else if (styleNum == 2) {
		document.getElementById("imgStyle").style.left = "0px";
	} else if (styleNum == 3) {
		//document.getElementById("imgStyle").style.webkitTransform = "scale(1)";
		toBigToSmall(0);
	}
	else if (styleNum == 4) {
		//document.getElementById("imgStyle").style.webkitTransform = "scale(1)";
		document.getElementById("imgStyle").style.webkitTransform = 'rotateY(360deg)';
	}
	return;
}

/*********************************************************************/
/* Function: keyAcidDownUp                                           */
/* Description: 菜单5的上、下键处理                                  */
/* Parameters:upDownStatus标志是上or下；0-down;1-up                  */
/* Author&Date: gaogl  2011-02-12                                    */
/*********************************************************************/
//var acidLink = new Array('http://acid1.acidtests.org','http://acid2.acidtests.org','http://acid3.acidtests.org');
var acidLink = new Array('acid/test1.htm','acid/test2.htm','acid/test30.htm');
var acidRow = -1;
function keyAcidDownUp(upDownStatus)
{
	if (acidRow>=(acidLink.length -1) && upDownStatus==0)return;
	if (acidRow!=-1) {
		document.getElementById('acid'+acidRow).style.fontSize = '24px';
		document.getElementById('acid'+acidRow).style.color = '#FFF';
	}
	if (upDownStatus==0) {
		acidRow++;
		if (acidRow==0) {
			navigaFocusBlue(0,4);
		}
	}
	else {
		acidRow--;
		if (acidRow==-1) {
			navigaFocusBlue(1,4);
			return;
		}
	}
	document.getElementById('acid'+acidRow).style.fontSize = '26px';
	document.getElementById('acid'+acidRow).style.color = '#056ded';
	return;
}
