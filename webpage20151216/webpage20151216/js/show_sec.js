// JavaScript Document

/*********************************************************************/
/* Function: keyTimeZoomDown                                         */
/* Description: 进入Time Zoom页面        	                             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2011-03-17                               */
/*********************************************************************/
function keyTimeZoomDown() {
	document.location.href = 'tvGuide_2.html';
	return;
}

/*********************************************************************/
/* Function: keyFocusLeft                                            */
/* Description: 页面的左           	                             */
/* Parameters:                                                       */
/* Author&Date: gaogl 2011-01-14                                     */
/*********************************************************************/
function keyFocusLeft()
{
	if (focusLine==2) {
		lastFocusLR(1);
	}
	else if (focusLine>=0 && focusRow==1) {
		secondButtonOpe(1);
		focusRow = 0;
		secondButtonOpe(0);
	}
	return;
}

/*********************************************************************/
/* Function: keyFocusRight                                           */
/* Description: 页面的右          	                             */
/* Parameters:                                                       */
/* Author&Date: gaogl 2011-01-14                                     */
/*********************************************************************/
function keyFocusRight()
{
	if (focusLine==2) {
		lastFocusLR(0);
	}
	else if (focusLine>=0 && focusRow==0) {
		secondButtonOpe(1);
		focusRow = 1;
		secondButtonOpe(0);
	}
	return;
}

/*********************************************************************/
/* Function: lastFocusLR                                             */
/* Description: 焦点在选择框的左右键处理   	                             */
/* Parameters:lrStatus状态；0->right;1->left                          */
/* Author&Date: gaogl 2011-01-18                                     */
/*********************************************************************/
var focusLeftMess = ['message 00','message 01','message 02'];
var focusRightMess = ['message 10','message 11','message 12'];
var messNum = 2;//左选择框循环变量
var messRNum = 0;//右选择框循环变量
function lastFocusLR(lrStatus)
{
	if (focusRow==0) {
		if(lrStatus==0){
			messNum = (messNum>=2)?0:(messNum+1);
			document.getElementById('messL'+(messNum+2)%3).style.webkitTransitionDuration = '0s';
		}
		else {
			messNum = (messNum<=0)?2:(messNum-1);
			document.getElementById('messL'+messNum).style.webkitTransitionDuration = '0s';
		}
		document.getElementById('messL'+messNum).style.top = '-46px';
		document.getElementById('messL'+(messNum+1)%3).style.top = '0px';
		document.getElementById('messL'+(messNum+2)%3).style.top = '46px';
	}
	else if (focusRow==1) {
		if(lrStatus==0){
			messRNum = (messRNum>=2)?0:(messRNum+1);
			document.getElementById('messR'+(messRNum+2)%3).style.webkitTransitionDuration = '0s';
		}
		else {
			messRNum = (messRNum<=0)?2:(messRNum-1);
			document.getElementById('messR'+messRNum).style.webkitTransitionDuration = '0s';
		}
		document.getElementById('messR'+messRNum).style.left = '-250px';
		document.getElementById('messR'+(messRNum+1)%3).style.left = '0px';
		document.getElementById('messR'+(messRNum+2)%3).style.left = '250px';
	}
	setTimeout('changeDuration('+focusRow+')',10);
	return;
}

/*********************************************************************/
/* Function: changeDuration                                          */
/* Description: 过程时间              	                             */
/* Parameters:rowStatus列状态					                     */
/* Author&Date: gaogl 2011-01-18                                     */
/*********************************************************************/
function changeDuration(rowStatus)
{
	var strMess = (rowStatus==0)?'messL':'messR';
	var curNum = (rowStatus==0)? messNum : messRNum;
	document.getElementById(strMess+''+curNum).style.webkitTransitionDuration = '0.3s';
	document.getElementById(strMess+''+(curNum+2)%3).style.webkitTransitionDuration = '0.3s';
	return;
}

/*********************************************************************/
/* Function: keyFocusUp                                              */
/* Description: enp页面的上           	                             */
/* Parameters:                                                       */
/* Author&Date: gaogl 2011-01-14                                     */
/*********************************************************************/
function keyFocusUp()
{
	if (navigatorStatus)return;
	if (focusLine==0) {
		firstButtonOpe(1);
		navigaFocusBlue(1,0);
		//return;
	}
	secondButtonOpe(1);
	focusLine --;
	if (focusLine==-1) {
		firstButtonOpe(0);
		return;
	}
	secondButtonOpe(0);
	return;
}

/*********************************************************************/
/* Function: keyFocusDown                                            */
/* Description: enp页面的下           	                             */
/* Parameters:                                                       */
/* Author&Date: gaogl 2011-01-14                                     */
/*********************************************************************/
var focusLine = -1;//第二部分的行号
var focusRow = 0;//第二部分的列号
function keyFocusDown()
{
	if (navigatorStatus) {
		navigaFocusBlue(0,0);
		//firstButtonOpe(0);
		//return;
	}
	if (focusLine>=2) {	//添加下面两个焦点的左右互切 by zhaopengjun
		secondButtonOpe(1);
		focusRow = focusRow == 0 ? 1 : 0;
		secondButtonOpe(0);
		return;
	}
	if (focusLine<0) {
		firstButtonOpe(1);
	}else{
		secondButtonOpe(1);
	}
	focusLine ++;
	secondButtonOpe(0);
	return;
}

/*********************************************************************/
/* Function: secondButtonOpe                                         */
/* Description: 界面中第二部分焦点处理  	                             */
/* Parameters:statust状态，0->获取焦点；1->失去焦点                     */
/* Author&Date: gaogl 2011-01-17                                     */
/*********************************************************************/
function secondButtonOpe(statust)
{
	if (statust==0) {
		document.getElementById("left"+focusLine+focusRow).style.color = '#ffffff';
		document.getElementById("button"+focusLine+focusRow).style.width = '248px';
		document.getElementById("button"+focusLine+focusRow).style.left = 32+380*focusRow+'px';
		document.getElementById('button'+focusLine+focusRow).style.webkitTransitionDuration = '0.3s';
	}
	else {
		document.getElementById("left"+focusLine+focusRow).style.color = '#929292';
		document.getElementById("button"+focusLine+focusRow).style.width = '0px';
		document.getElementById("button"+focusLine+focusRow).style.left = 162+250*focusRow+'px';
		document.getElementById('button'+focusLine+focusRow).style.webkitTransitionDuration = '0s';
	}
}

/*********************************************************************/
/* Function: firstButtonOpe                                          */
/* Description: 界面中第一部分焦点处理  	                             */
/* Parameters:statust状态，0->获取焦点；1->失去焦点                     */
/* Author&Date: gaogl 2011-01-17                                     */
/*********************************************************************/
var toEPGStatus = false;
function firstButtonOpe(statust)
{
	if (statust==0) {
		toEPGStatus = true;
		document.getElementById('focusButt').style.webkitTransitionDuration = '0.3s';
		//document.getElementById("linkPage0").style.color = '#FFFFFF';//'#ffffff';
		document.getElementById("focusButt").style.width = '370px';
		document.getElementById("focusButt").style.left = '375px';
	}else {
		toEPGStatus = false;
		document.getElementById('focusButt').style.webkitTransitionDuration = '0s';
		//document.getElementById("linkPage0").style.color = '#929292';
		document.getElementById("focusButt").style.width = '0px';
		document.getElementById("focusButt").style.left = '562px';
	}
}

/*********************************************************************/
/* Function: keyVmenuUp                                              */
/* Description: 垂直菜单上特效  	                             */
/* Parameters:									                     */
/* Author&Date: gaogl 2011-01-20                                     */
/*********************************************************************/
function keyVmenuUp()
{
	if (!navigatorStatus && currVnum==0) {
		navigaFocusBlue(1,1);
	}
	else {
		if ((currVnum >3&&currVnum <=6)||(currDnum <=0)) {
			if (currVnum<=0) return;
			currVnum--;
			document.getElementById('focusMenu').style.top = 37+43*currVnum+'px';
		}
		else {
			currDnum--;
			var begin = (currDnum+8 >=vmenuTotal) ? (vmenuTotal-1) :(currDnum+8);
			var end = (currDnum-1 <=0) ? 0 : (currDnum-1);
			var init = (currDnum==0)? (begin-end+1) : (begin - end);
			for (var i=begin; i>=end; i--,init--) {
				document.getElementById('vmenu'+i).style.top = 43*init+'px';//86-5
			}
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyVmenuDown                                            */
/* Description: 垂直菜单下特效  	                             */
/* Parameters:									                     */
/* Author&Date: gaogl 2011-01-20                                     */
/*********************************************************************/
var vmenuTotal = 15;//列表中的总数
var currVnum = 0; //当前焦点所在的
var currDnum = 0;//当前的div索引号
function keyVmenuDown()
{
	if (navigatorStatus) {
		navigaFocusBlue(0,1);
	}
	else {
		if ((currDnum+6 >= vmenuTotal-1&&currVnum <=6)||(currDnum+6 < vmenuTotal-1&&currVnum < 3)) {
			if (currVnum >=6) return;
			currVnum++;
			document.getElementById('focusMenu').style.top = 37+43*currVnum+'px';
		}
		else {
			currDnum++;
			var init, begin, end;
			if (currDnum == 1) {
				begin = (currDnum-1 <=0)? 0 : (currDnum-1);
				end = currDnum+9;
				init = 1;
			}
			else {
				begin = (currDnum-2 <=0)? 0 : (currDnum-2);
				end = (currDnum+10 >= vmenuTotal)? vmenuTotal : (currDnum+10);
				init = 0;
			}
			for (var i=begin; i<end; i++,init++) {
				document.getElementById('vmenu'+i).style.top = 43*(init-1)+'px';//86-5
			}
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyMLevelLeft                                           */
/* Description: 水平菜单左特效  	                                 */
/* Parameters:									                     */
/* Author&Date: gaogl 2011-01-26                                     */
/*********************************************************************/
function keyLevelLeft()
{
	
	return;
}

/*********************************************************************/
/* Function: keyLevelRight                                           */
/* Description: 水平菜单右特效  	                                 */
/* Parameters:									                     */
/* Author&Date: gaogl 2011-01-26                                     */
/*********************************************************************/
function keyLevelRight()
{
	
	return;
}

/*********************************************************************/
/* Function: navigaFocusBlue                                         */
/* Description: 导航焦点的处理  	                                 */
/* Parameters:isFocus--1获取焦点，0是丢失焦点；num--导航选项         */
/* Author&Date: gaogl 2011-01-26                                     */
/*********************************************************************/
function navigaFocusBlue(isFocus,num)
{
	if (isFocus==0) {
		navigatorStatus = false;
		document.getElementById("focusBar").style.background = '-webkit-gradient(radial, 113 20, 65, 113 23, 130, from(#848484), to(#414141))';
		if (num==0) {
			for (var i=0;i<3;i++) {
				document.getElementById('messL'+i).style.webkitTransitionDuration = '0.3s';
				document.getElementById('messR'+i).style.webkitTransitionDuration = '0.3s';
			}
		}
		else if (num==1) {
			document.getElementById('focusMenu').style.border ='1px solid #548ef8';
			document.getElementById('focusMenu').style.webkitBoxShadow ='0px 0px 30px #4d70e3';
		}
		else if (num==2) {
			document.getElementById('hiddFocusMoveImg').style.visibility = 'hidden';
		}
		else if (num==3) {
			fontFrameFocus = true;
			document.getElementById("fontFrame").style.webkitTransitionDuration = '0.4s';
			document.getElementById('imgStyle').style.webkitTransitionDuration = '0.5s';
			document.getElementById('bigPic').style.webkitTransitionDuration = '0.5s';
			document.getElementById("fontFrame").style.background = '-webkit-gradient(radial, 157 16, 65, 157 16, 210, from(#056ded), to(#000f37))';
		}
	}
	else {
		navigatorStatus = true;
		document.getElementById("focusBar").style.background = '-webkit-gradient(radial, 113 20, 65, 113 23, 130, from(#056ded), to(#000f37))';
		if (num==0) {
			document.getElementById('messL'+(messNum+1)%3).style.webkitTransitionDuration = '0s';
			document.getElementById('messR'+(messRNum+1)).style.webkitTransitionDuration = '0s';
		}
		else if (num==1) {
			document.getElementById('focusMenu').style.border ='1px solid #929292';
			document.getElementById('focusMenu').style.webkitBoxShadow ='0px 0px 0px';
		}
		else if (num==2) {
			document.getElementById('hiddFocusMoveImg').style.visibility = 'visible';
		}
		else if (num==3){
			fontFrameFocus = false;
			document.getElementById("fontFrame").style.background = '-webkit-gradient(radial, 157 16, 65, 157 16, 210, from(#848484), to(#414141))';
			document.getElementById("fontFrame").style.webkitTransitionDuration = '0s';
			document.getElementById('imgStyle').style.webkitTransitionDuration = '0s';
			document.getElementById('bigPic').style.webkitTransitionDuration = '0s';
		}
	}
	return;
}


//多图片移动效果
var leftDivPosition = 0;
var aPositionLeft = new Array(85, 165, 290, 500, 710, 835, 915);
var aPositionTop = new Array(40, 110, 180, 190, 180, 110, 40);
var aPositionIndex = new Array(4, 6, 8, 10, 8, 6, 4);
//var aPositionScale = new Array(1.0, 1.4, 1.8, 2.4, 1.8, 1.4, 1.0);
var aPositionScale = new Array(0.4, 0.6, 0.8, 1.0, 0.8, 0.6, 0.4);
function leftMove() {
	showImg(0);
	return;
}

function rightMove() {
	showImg(1);
	return;
}

var moveStatus = 0;
function moveImg() {
	for(var i=0; i<7; i++) {
		var pos = (leftDivPosition + i >=11) ? (leftDivPosition+i-11) : leftDivPosition+i;
		//alert(pos);
		document.getElementById("imgDiv"+pos).style.left = aPositionLeft[i]+"px";
		document.getElementById("imgDiv"+pos).style.top = aPositionTop[i]+"px";
		document.getElementById("imgDiv"+pos).style.zIndex = aPositionIndex[i];
		document.getElementById("imgDiv"+pos).style.webkitTransform = "scale("+aPositionScale[i]+")";
	}
	window.setTimeout("moveStatus=0;", 300);
}

function showImg(e) {
	if (moveStatus == 1) {
		return;
	}
	moveStatus = 1;
	var pos;
	if (e==0) {
		pos = (leftDivPosition + 7 >=11) ? (leftDivPosition-4) : leftDivPosition+7;
		document.getElementById("imgDiv"+leftDivPosition).style.zIndex = 1;
		document.getElementById("imgDiv"+leftDivPosition).style.opacity = 0.0;
	} else {
		pos = (leftDivPosition - 1 < 0) ? 10 : leftDivPosition-1;
		var hidd = (leftDivPosition+6 >=11) ? (leftDivPosition-5) : leftDivPosition+6;
		document.getElementById("imgDiv"+hidd).style.zIndex = 1;
		document.getElementById("imgDiv"+hidd).style.opacity = 0.0;
	}
	document.getElementById("imgDiv"+pos).style.webkitTransitionDuration = "0s";
	document.getElementById("imgDiv"+pos).style.opacity = 1.0;
	if (e==0) {
		document.getElementById("imgDiv"+pos).style.left = aPositionLeft[6]+"px";
		document.getElementById("imgDiv"+pos).style.top = aPositionTop[6]+"px";
	} else {
		document.getElementById("imgDiv"+pos).style.left = aPositionLeft[0]+"px";
		document.getElementById("imgDiv"+pos).style.top = aPositionTop[0]+"px";
	}
	document.getElementById("imgDiv"+pos).style.zIndex = 1;
	//document.getElementById("imgDiv"+pos).style.webkitTransform = "scale("+aPositionScale[0]+")";
	setTimeout("showMoveFun("+e+");", 10);
}

function showMoveFun(e) {
	if (e==0) {
		var pos = (leftDivPosition + 7 >=11) ? (leftDivPosition-4) : leftDivPosition+7;
		document.getElementById("imgDiv"+pos).style.webkitTransitionDuration = "1s";
		leftDivPosition++;
		leftDivPosition = leftDivPosition >= 11 ? 0 : leftDivPosition;
	} else {
		var pos = (leftDivPosition - 1 < 0) ? 10 : leftDivPosition-1;
		document.getElementById("imgDiv"+pos).style.webkitTransitionDuration = "1s";
		leftDivPosition--;
		leftDivPosition = leftDivPosition < 0 ? 10 : leftDivPosition;
	}
	moveImg();
}
