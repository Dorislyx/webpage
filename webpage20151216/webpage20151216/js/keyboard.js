// JavaScript Document

/*********************************************************************/
/* Function: keyBoardEvent	                                         */
/* Description: 模拟键盘按键操作		                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-01-05                              */
/*********************************************************************/
var keyboardStatus = false;	//模拟键盘显示状态
function keyBoardEvent(e) {
	var keyNum = e.which;
	switch (keyNum) {
		case 37:	//left
			keyboardLeft();
			return false;
			break;
		case 38:	//up
			keyboardUp();
			return false;
			break;
		case 39:	//right
			keyboardRight();
			return false;
			break;
		case 40:	//down
			keyboardDown();
			return false;
			break;
		case 13:	//enter
			keyboardEnter();
			return false;
			break;
		case 8:		//back
		case 213:
		case 203:
			keyboardBack();
			return false;
			break;
		default:
			break;
	}
	return;
}

/*********************************************************************/
/* Function: keyboardLeft	                                         */
/* Description: 模拟键盘左键操作		                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-01-05                              */
/*********************************************************************/
var smallKeyInputStr = "";	//键盘输入的字符串
var smallkeynum = 0;	//键盘焦点
function keyboardLeft() {
	if (smallkeynum <= 0) {
		smallkeynum = 40;
	}
	smallkeynum--;
	showKeyFocus();
	return;
}

/*********************************************************************/
/* Function: keyboardUp		                                         */
/* Description: 模拟键盘上键操作		                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-01-05                              */
/*********************************************************************/
function keyboardUp() {
	if (smallkeynum <=4 ) {
		smallkeynum += 40;
	}
	smallkeynum -= 5;
	showKeyFocus();
	return;
}

/*********************************************************************/
/* Function: keyboardRight	                                         */
/* Description: 模拟键盘右键操作		                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-01-05                              */
/*********************************************************************/
function keyboardRight() {
	if (smallkeynum >= 39) {
		smallkeynum = -1;
	}
	smallkeynum++;
	showKeyFocus();
	return;
}

/*********************************************************************/
/* Function: keyboardDown	                                         */
/* Description: 模拟键盘下键操作		                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-01-05                              */
/*********************************************************************/
function keyboardDown() {
	if (smallkeynum >= 35) {
		smallkeynum -= 40;
	}
	smallkeynum += 5;
	showKeyFocus();
	return;
}

/*********************************************************************/
/* Function: keyboardLeft	                                         */
/* Description: 模拟键盘确认键操作		                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-01-05                              */
/*********************************************************************/
var keyboardInput;	//输入框ID
var passwordStatus = false;	//记录是否为密码输入
var passwordValue;	//记录密码
var maxFontNum = 0;		//可输入最大数
function keyboardEnter() {
	var keyboardStr = 'abcdefghijklmnopqrstuvwxyz.:/@1234567890';
	var showStr = keyboardStr.substring(smallkeynum, smallkeynum+1);
	var len = smallKeyInputStr.length-1;
	smallKeyInputStr = (showStr=='@')? smallKeyInputStr.substring(0, len) : smallKeyInputStr+showStr;
	smallKeyInputStr = smallKeyInputStr.length > maxFontNum ? smallKeyInputStr.substr(0,maxFontNum) : smallKeyInputStr;
	if (passwordStatus) {
		passwordValue = smallKeyInputStr;
		var replaceStr = "";
		for (var i = 0; i<passwordValue.length; i++) {
			replaceStr += "*";
		}
		document.getElementById(keyboardInput).innerHTML = replaceStr+"_";
	} else {
		document.getElementById(keyboardInput).innerHTML = smallKeyInputStr+"_";
	}
	return;
}

/*********************************************************************/
/* Function: showKeyboard	                                         */
/* Description: 显示模拟键盘			                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-01-05                              */
/*********************************************************************/
function showKeyboard(num) {
	keyboardStatus = true;
	maxFontNum = num;
	//smallKeyInputStr = "";
	smallKeyInputStr = document.getElementById(keyboardInput).innerHTML;
	document.getElementById(keyboardInput).innerHTML = smallKeyInputStr+"_";
	smallkeynum = 0;
	//document.getElementById(keyboardInput).innerHTML = "";
	document.getElementById("divKeyboard").style.visibility = "visible";
	return;
}

/*********************************************************************/
/* Function: keyboardLeft	                                         */
/* Description: 关闭模拟键盘			                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-01-05                              */
/*********************************************************************/
function keyboardBack() {
	var L_str = document.getElementById(keyboardInput).innerHTML;
	document.getElementById(keyboardInput).innerHTML = L_str.substring(0,L_str.length-1);
	passwordStatus = false;
	keyboardStatus = false;
	document.getElementById("divKeyboard").style.visibility = "hidden";
	document.getElementById('keyboardFocus').style.left = "9px";
	document.getElementById('keyboardFocus').style.top  = "15px";
	showKeyboardBackFun();	//这个函数放在调用页面，用来执行退出小键盘后的操作
}

/*********************************************************************/
/* Function: showKeyFocus	                                         */
/* Description: 模拟键盘显示焦点		                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-01-05                              */
/*********************************************************************/
function showKeyFocus(){
	var axisY = parseInt(smallkeynum/5);
	var axisX = smallkeynum%5;
	document.getElementById('keyboardFocus').style.left = 9+43*axisX+"px";
	document.getElementById('keyboardFocus').style.top  = 15+39*axisY+"px";
	return;
}

