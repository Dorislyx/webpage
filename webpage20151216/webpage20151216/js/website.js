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
/* Function: keyEvent                                                */
/* Description: 遥控器按键处理函数                                     */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-10-19                                 */
/*********************************************************************/
var player = new AVPlayer();
var navigatorStatus = true;//焦点在导航时为true；不在导航时为false
//document.onkeypress = keyEvent;
document.onkeydown = keyEvent;
function keyEvent(e)
{
	var keyValue = e.which;
	player.printf(1, '----key---------'+keyValue);

	switch(keyValue){
		case 37://left
			if (menuStatus == 1) {
				keymenuRight();
				return false;
			}
			keyLeft();
			//return false;
			break;
		case 39://right
			if (menuStatus == 1) {
				keymenuLeft();
				return false;
			}
			keyRight();
			//return false;
			break;
		case 38://up
			if (menuStatus == 1) {
				return false;
			}
			keyUp();
			//return false;
			break;
		case 40://down
			if (menuStatus == 1) {
				return false;
			}
			keyDown();
			//return false;
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
		case 1073742338: //menu
			keyShowMenu();
			break;
		default:
		break;
	}
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

function keyBack()
{
	if (menuStatus == 0) {
		keyShowMenu();
	}
	return;
}

/*********************************************************************/
/* Function: init                                                    */
/* Description: 页面加载函数                                         */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-26                                 */
/*********************************************************************/
var imageArray = new Array();
function init()
{
	focusNum=4;
	var leftPxSettings = "784:1003:1222:1441:-311:-92:127:346:565"
	divLeftArray = focusNum+"?"+leftPxSettings;
	htmlHref = fontListArray[0] + "?" + divLeftArray;
	menuinit(); 
	setBackOpacity();
	showCurrentTime("timeShow");
	//setInterval("showCurrentTime('timeShow');", 60000);
	//document.getElementById("timeShow").innerHTML = "09:30 15/11";
	addImageArray();
	for (var i=0; i<2;i++) {
		for (var j=0;j<4;j++) {
			var num = i*4+j;
			//document.getElementById("listImg"+i+j).src = imageArray[num];
			document.getElementById("list"+i+j).style.backgroundImage = "url("+imageArray[num]+")";
			document.getElementById("list"+i+j).style.left = 52+(242+56)*j+'px';
			document.getElementById("list"+i+j).style.top =30+ 215*i+'px';
		}
	}
	//focusPostPos();
	 focusInputPos();
}

function setBackOpacity()
{
	document.getElementById('logoShow').style.opacity = '0.7';
	//document.getElementById('focusInput').style.opacity = '0.7';
	document.getElementById('upNavig').style.opacity = '0.7';
	document.getElementById('downItem').style.opacity = '0.7';
	document.getElementById('blackBack').style.opacity = '0.9';
}

/*********************************************************************/
/* Function: addImageArray                                           */
/* Description: 加载图片                                             */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-26                                 */
/*********************************************************************/
var imageTotal = 0;
function addImageArray()
{
	imageTotal = 8;//22;
	totalPage = (parseInt(imageTotal%8)==0)?parseInt(imageTotal/8):(parseInt(imageTotal/8)+1)
	for (var i=0; i<imageTotal;i++) {
		//imageArray[i] = 'network/'+i+'.jpg';
		imageArray[i] = 'network/00'+i+'.jpg';
	}
}

/*********************************************************************/
/* Function: focusPostPos                                            */
/* Description: 焦点位置到浏览图片                                   */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-26                                 */
/*********************************************************************/
function focusPostPos()
{
	//document.getElementById("focusInput").style.visibility = 'hidden';
	document.getElementById("inputText").style.backgroundColor = '#555555';
	//document.getElementById("address").style.display = 'none';
	//document.getElementById("address").value='';
	//document.getElementById("address").blur();
	//document.getElementById("focusImg").style.visibility = 'visible';  
	changeToBig();
}

/*********************************************************************/
/* Function: focusInputPos                                           */
/* Description: 焦点位置到地址栏                                     */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-26                                 */
/*********************************************************************/
function focusInputPos()
{
	//document.getElementById("focusInput").style.visibility = 'visible';
	document.getElementById("inputText").style.backgroundColor = '#FFFFFF';
	//document.getElementById("address").focus();
	//document.getElementById("address").style.display = 'block';
	document.getElementById("inputText").innerHTML = "<input type='text' name='address' id='address' value='http://' style=\"width:938px; height:46px; font-size:28px; text-indent:8px; border-radius:4px;\" />";
	document.getElementById("address").focus();
	//document.getElementById("focusImg").style.visibility = 'visible';  
	if (!navigatorStatus) {
		changeToSmall(currLine,currRow);
		navigatorStatus = true;
	}
}

/*********************************************************************/
/* Function: keyDown                                                 */
/* Description: 下键的处理                                            */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-26                                 */
/*********************************************************************/
var currLine = 0,currRow = 0;
function keyDown()
{
	if (navigatorStatus) {
		navigatorStatus = false;
		focusPostPos();
	}
	else {
		keyDownPoster();
	}
	return;
}

/*********************************************************************/
/* Function: keyUp                                                   */
/* Description: 上键的处理                                            */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-26                                 */
/*********************************************************************/
function keyUp()
{
	if (navigatorStatus) return;
	keyUpPoster();
	return;
}

/*********************************************************************/
/* Function: keyLeft                                                 */
/* Description: 左键的处理                                            */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-26                                 */
/*********************************************************************/
function keyLeft()
{
	if (navigatorStatus) {
		return;
	}
	else {
		keyLeftPoster();
	}
	return;
}

/*********************************************************************/
/* Function: keyRight                                                */
/* Description: 右键的处理                                           */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-26                                 */
/*********************************************************************/
function keyRight()
{
	if (navigatorStatus) {
		return;
	}
	else {
		keyRightPoster();
	}
	return;
}

/*********************************************************************/
/* Function: keyEnter                                                */
/* Description: 确认键的处理                                         */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-26                                 */
/*********************************************************************/
function keyEnter()
{
	if(menuStatus==1){
		if (focusNum == 4) {
			keyShowMenu();
		} else {
			keymenuEnter();
		}
		return (false);
	} 
	if (navigatorStatus) {
		var addresText = document.getElementById("address").value;
		addresText = addresText.trim();
		if (addresText.substring(0,5)!='http:') {
			addresText = 'http://'+addresText;
		}
		document.location.href = addresText;
		return;
	}
	else {
		if (imageTotal==22) {
			keyEnterPoster();
		}
		//else if (imageTotal==7) {
		else if (imageTotal==8) {
			keyEnterNetwork();
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyRightPoster                                          */
/* Description: 右键的处理                                           */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-26                                 */
/*********************************************************************/
var currPageNum = 0;//当前页的索引
var totalPage = 0;//总的页数
function keyRightPoster()
{
	if (currRow>=3)return;
	var lastRowIndex = (imageTotal%4 >0)? imageTotal%4:3;
	var indexV = currPageNum*8+currLine*4+currRow;
	if (indexV >=(imageTotal-1)) {
		return;
	}
	changeToSmall(currLine,currRow);
	currRow++;
	changeToBig();
}

function changeToBig()
{
	//document.getElementById("back_text").innerHTML = "line=="+currLine+"==row=="+currRow;
	document.getElementById("list"+currLine+currRow).style.border = '3px solid #0066FF';
	document.getElementById("list"+currLine+currRow).style.webkitTransform = 'scale(1.2)';
	document.getElementById('list'+currLine+currRow).style.opacity = '1';
	currPathShow();
}

function changeToSmall(smallLine,smallRow)
{
	document.getElementById('list'+smallLine+smallRow).style.webkitTransform = 'scale(1)';
	document.getElementById('list'+smallLine+smallRow).style.border = '0px';
	document.getElementById('list'+smallLine+smallRow).style.opacity = '0.7';
}

/*********************************************************************/
/* Function: keyLeftPoster                                           */
/* Description: 右键的处理                                           */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-26                                 */
/*********************************************************************/
function keyLeftPoster()
{
	if (currRow <=0)return;
	changeToSmall(currLine,currRow);
	currRow--;
	changeToBig();
}

/*********************************************************************/
/* Function: keyDownPoster                                           */
/* Description: 下键的处理                                           */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-26                                 */
/*********************************************************************/
function keyDownPoster()
{
	var lineTotal = (parseInt(imageTotal%4)==0)?parseInt(imageTotal/4):(parseInt(imageTotal/4)+1)
	var lastLineIndex = (lineTotal+1)%2;
	//if (currPageNum>=(totalPage-1)&& currLine==lastLineIndex) return;//最后一行
	if (currLine==lastLineIndex) return;//最后一行
	changeToSmall(currLine,currRow);
	if (currLine==1) {
		currLine = 0;
		pageDown();
	}
	else {
		currLine++;
	}
	//if (currPageNum>=(totalPage-1)&&  currLine == lastLineIndex) {
	//	currRow = ((parseInt(imageTotal%4)-1)< currRow) ? (parseInt(imageTotal%4)-1) :currRow;
	//}
	changeToBig();
}

/*********************************************************************/
/* Function: pageDown                                                */
/* Description: 翻页                                                 */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-26                                 */
/*********************************************************************/
function pageDown()
{
	currPageNum = (currPageNum < (totalPage-1))? (currPageNum+1): (totalPage-1);
	for (var i=0; i< 2;i++) {
		for (var j=0;j< 4;j++) {
			var num = currPageNum*8+i*4+j;
			if (currPageNum==(totalPage-1) && num > (imageArray.length -1)) {
				document.getElementById("list"+i+j).style.backgroundImage = 'url(kong.jpg)';
			}
			else {
				document.getElementById("list"+i+j).style.backgroundImage = "url("+imageArray[num]+")";
			}
		}
	}
	return;
}


/*********************************************************************/
/* Function: keyUpPoster                                             */
/* Description: 上键的处理                                           */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-26                                 */
/*********************************************************************/
function keyUpPoster()
{
	if (currPageNum <=0 && currLine==0){
		focusInputPos();
		return;
	}
	changeToSmall(currLine,currRow);
	if (currLine==0) {
		currLine =1;
		pageUp();
	}
	else {
		currLine--;
	}
	changeToBig();
}

/*********************************************************************/
/* Function: pageUp                                                  */
/* Description: 翻页                                                 */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-26                                 */
/*********************************************************************/
function pageUp()
{
	currPageNum--;
	for (var i=0; i< 2;i++) {
		for (var j=0;j< 4;j++) {
			var num = currPageNum*8+i*4+j;
			document.getElementById("list"+i+j).style.backgroundImage = "url("+imageArray[num]+")";
		}
	}
}

/*********************************************************************/
/* Function: currPathShow                                            */
/* Description: 当前路径                                             */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-12-09                                 */
/*********************************************************************/
var currShowPath = '';
function currPathShow()
{
	var currNet = currPageNum*8+currLine*4+currRow;
	switch(currNet){
		case 0:
		currShowPath = 'http://www.google.com/'
		break;
		case 1:
		currShowPath = 'http://www.apple.com/';
		break;
		case 2:
		currShowPath = 'http://www.yahoo.com/';
		break;
		case 3:
		currShowPath = 'http://www.russia-travel.com/';
		break;
		case 4:
		currShowPath = 'http://www.html5video.org/';
		break;
		case 5:
		currShowPath = 'http://www.youtube.com/';
		break;
		case 6:
		currShowPath = 'https://chrome.google.com/webstore';
		case 7:
		currShowPath = 'http://edition.cnn.com/';
		break;
	}
	document.getElementById('inputText').innerHTML = currShowPath;
	return;
}
/*********************************************************************/
/* Function: keyEnterNetwork                                         */
/* Description: 连接到外网                                           */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-12-09                                 */
/*********************************************************************/
function keyEnterNetwork()
{
	document.location.href = currShowPath;
}
/*********************************************************************/
/* Function: keyEnterPoster                                          */
/* Description: 连接到外网                                           */
/* Parameters:                                                       */
/* Author&Date: Lucy gao  2010-11-26                                 */
/*********************************************************************/
function keyEnterPoster()
{
	var currNet = currPageNum*8+currLine*4+currRow;
	//player.Ag_broswer_snap("/mnt/usb1/network/1.jpg", 242, 169, 1);
	switch(currNet){
		case 0:
		document.location.href = 'http://www.google.com/';
		break;
		case 1:
		document.location.href = 'http://www.cnn.com/';
		break;
		case 2:
		document.location.href = 'http://www.baidu.com/';
		break;
		case 3:
		document.location.href = 'http://www.msn.com/';
		break;
		case 4:
		document.location.href = 'http://m.daum.net/';
		break;
		case 5:
		document.location.href = 'http://www.ebay.com/';
		break;
		case 6:
		document.location.href = 'http://www.tistory.com/';
		break;
		case 7:
		document.location.href = 'http://www.live.com/';
		break;
		case 8:
		document.location.href = 'http://en.wikipedia.org/';
		break;
		case 9:
		document.location.href = 'http://www.egloos.com/';
		break;
		case 10:
		document.location.href = 'http://www.wordpress.com/';
		break;
		case 11:
		document.location.href = 'http://www.yahoo.com/';
		break;
		case 12:
		document.location.href = 'http://blog.daum.net/';
		break;
		case 13:
		document.location.href = 'http://www.qq.com/';
		break;
		case 14:
		document.location.href = 'http://media.daum.net/';
		break;
		case 15:
		document.location.href = 'http://cafe.daum.net/';
		break;
		case 16:
		document.location.href = 'http://www.naver.com/';
		break;
		case 17:
		document.location.href = 'http://jr.naver.com/';
		break;
		case 18:
		document.location.href = 'http://m.naver.com/';
		break;
		case 19:
		document.location.href = 'http://www.blogger.com/';
		break;
		case 20:
		document.location.href = 'http://www.youtube.com/';
		break;
		case 21:
		document.location.href = 'http://www.facebook.com/';
		break;
	}
}
