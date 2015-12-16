// JavaScript Document

/*********************************************************************/
/* Function: keyEvent                                                */
/* Description: 遥控器按键处理函数                                     */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-10-19                                 */
/*********************************************************************/
document.onkeypress = keyEvent;
//document.onkeydown = keyEvent;
function keyEvent(e)
{
	var keyValue = e.which;
	switch(keyValue){
		case 37://left
		keyLeft();
		return false;
		break;
		case 39://right
		keyRight();
		return false;
		break;
		case 38://up
		keyUp();
		return false;
		break;
		case 40://down
		keyDown();
		return false;
		break;
		case 13:
		keyEnter();
		return false;
		break;
		case 213:
		case 8:
		keyBack();
		return false;
		break;
	}
}

function keyBack()
{
	var returnHref = document.location.href.split("?");
	if (returnHref.length == 1) {
		document.location.href = "menu.html";
	} else {
		document.location.href = "menu.html?"+returnHref[1]+"?"+returnHref[2];
	}
	return;
	//document.location.href = 'settings.html';
}

/*********************************************************************/
/* Function: init                                                    */
/* Description: 页面加载函数                                           */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-18                                 */
/*********************************************************************/
function init()
{
	clearTimeout(timeId);
	document.getElementById("net_loading").style.visibility = 'hidden';
	document.getElementById("net_loading").style.width = '1px';
	for  (var i=0;i<4;i++) {
		document.getElementById("list"+i).style.top = 295+(34+25)*i+'px';
	}
	return;
}

/*********************************************************************/
/* Function: keyDown                                                 */
/* Description: 下键的处理                                            */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-22                                 */
/*********************************************************************/
var listTotal = 4;
var currList = 0;
function keyDown()
{
	if (currList >=listTotal-1)return;
	currList++;
	document.getElementById("focusBar").style.top = 295+(34+25)*currList+'px';
}

/*********************************************************************/
/* Function: keyUp                                                   */
/* Description: 上键的处理                                            */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-22                                 */
/*********************************************************************/
function keyUp()
{
	if (currList <= 0)return;
	currList--;
	document.getElementById("focusBar").style.top = 295+(34+25)*currList+'px';
}

/*********************************************************************/
/* Function: keyEnter                                                */
/* Description: enter键的处理                                            */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-22                                 */
/*********************************************************************/
function keyEnter()
{
	//loadingShow();
	switch(currList){
		case 0:
			var returnHref = document.location.href.split("?");
			document.location.href = "jiqimao.html?"+returnHref[1]+"?"+returnHref[2];
			//document.location.href = 'jiqimao.html';
			break;
		case 1:
			document.location.href = 'http://acid3.acidtests.org';
			break;
		case 2:
			document.location.href = 'http://acid2.acidtests.org';
			break;
		case 3:
			document.location.href = 'http://acid1.acidtests.org';
			break;
	}
}

function loadNetPage()
{
	document.getElementById("net_loading").style.webkitTransitionDuration = '0.0s';
	document.getElementById("net_loading").style.width = '1px';
	setTimeout('loadingShow()',10);
}
var timeId = null;
function loadingShow()
{
	//iPanel.ioctlWrite('printf', '\n===================='+'loading'+'\n');
	document.getElementById("net_loading").style.visibility = 'visible';
	document.getElementById("net_loading").style.webkitTransitionDuration = '3s';
	document.getElementById("net_loading").style.width = '250px';
	timeId = setTimeout('loadNetPage()',3000);
}