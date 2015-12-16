/*** 电影部分 ******************************************************************/
var SETUP_SubtitleDefault = 0; //字幕语言(0:chinese, 1:english)                 /
var	SETUP_Subtitlefirst = 1; //字幕首选语言(0:chinese, 1:english)               /
var SETUP_SubtitleSize = 1; //字幕大小(0:小, 1:中, 2:大)                        /
var SETUP_SubtitleColor = 1; //字幕颜色(0:黑, 1:白, 2:蓝)                       /
var SETUP_SubtitlePosition = 0; //字幕位置(0:下, 1:上)                          /
var SETUP_AspectRatio = 0; //视频大小(0表示4:3, 1表示16:9)                      /
var SETUP_AutoPlayMode = 1; //自动连续播放(0:否, 1:是)                          /
/*******************************************************************************/

/*** 音乐部分 ******************************************************************/
var cycleType = 0; //循环模式，0:顺序方式 1:循环方式 2:随机方式 3:单曲循环      /
var wordShowMode = 1; //显示歌词，1: 显示 0:不显示                              /
var isScreenSaver = 0; //设置的屏保状态，1:开 0:关								/
var screenSaverInterval = 6; //屏保图片切换时间间隔，取值:2--30秒               /
var screenSaverTime = 10; //屏保等待时间，取值:1--30分钟                        /
var screenSaverChange = 6; //屏保切换方式，取值：1--11                          /
/*******************************************************************************/

/*******************************************************************************/
var lanternMode = 0; //循环模式，0:顺序方式 1:循环方式 2:随机方式               /
var lanternInterval = 6; //幻灯播放时间间隔                                     /
var lanternChangeType = 6;	//切换效果0，1，2，... 11                           /
var imageAutoRotate = 1;	//自动旋转	1 y  0 n                                /
/*******************************************************************************/

/*******************************************************************************/
var SETUP_KeyWav = 0;	//按键音0 关闭，1 按键音1，2 按键音2                    /
var SETUP_System = 7;  //制式 8种 0，1，2，…                                    /
var SETUP_ResetFactorySet = 0; //恢复默认设置     1是，0否                      /
var SETUP_DeleteSystemFile = 0; //清理系统文件	1是，0否                        /
/*******************************************************************************/
/*********************************************************************/
/* Function: keyEvent                                                */
/* Description: 遥控器按键处理函数    	                             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-24                               */
/*********************************************************************/
var isKeyClock = false; //遥控器按键锁定，用于播放请求处理过程中屏蔽遥控器按键
document.onkeypress = keyEvent;
function keyEvent(e)
{
	var keyValue = e.which;
	iPanel.ioctlWrite('printf', 'keyValue=======settings=========='+keyValue+'\n');
	if (isKeyClock) {
		return (false);
	}
	if (isCheckUpHDStatus) {
		if (keyValue != 13 && keyValue != 213)
		{
			return false;
		}
	}
	switch(keyValue)
	{
		case 13: //Enter
			keyEnter();
			return (false);
			break;
		case 213:	//back
			keyBack();
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
		case 37:	//left
			keyLeft();
			return (false);
			break;
		case 39:	//right
			keyRight();
			return (false);
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
		case 406: //蓝键
			keyBlue();
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
/* Function: keyRed		                                             */
/* Description: 遥控器按键处理函数    	                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-29                               */
/*********************************************************************/
function keyGreen()
{
	if (focusLeftOrRight == 'right') {
		rightFocusIndex = 0;
		showFocusStatus();
		if (leftFocusIndex == 0) {
			for (var i=0; i<movieDefaultValue.length; i++) {
				saveValueOfSetting[i] = movieDefaultValue[i];
			}
		} else if (leftFocusIndex == 1) {
			saveScreensaverOpenStatus = musicDefaultValue[2];
			tempStr = saveScreensaverOpenStatus == 0 ? 3 : 6;
			document.getElementById('setList').style.height = 49*tempStr-22+'px';
			document.getElementById('setListName').style.height = 49*tempStr-22+'px';
			document.getElementById('settingValue').style.height = 49*tempStr-22+'px';
			for (var i=0; i<musicDefaultValue.length; i++) {
				saveValueOfSetting[i] = musicDefaultValue[i];
			}
		} else if (leftFocusIndex == 2) {
			for (var i=0; i<photoDefaultValue.length; i++) {
				saveValueOfSetting[i] = photoDefaultValue[i];
			}
		} else {
			for (var i=0; i<systemDefaultValue.length; i++) {
				saveValueOfSetting[i] = systemDefaultValue[i];
			}
		}
		changeSettingValue();
		showDefaultValueList();
	}
	return;
}

/*********************************************************************/
/* Function: keyGreen	                                             */
/* Description: 保存设置		    	                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-29                               */
/*********************************************************************/
function keyRed()
{
	if (focusLeftOrRight == 'right') {
		var settingValueSaveStr = '';
		if (leftFocusIndex == 0) {
			if (movieDefaultValue[5] != saveValueOfSetting[5]) {
				aspectRatioStatus = saveValueOfSetting[5];
				getAspectRatioValue();
			}
			for (var i=0; i<movieDefaultValue.length; i++) {
				if (movieDefaultValue[i] != saveValueOfSetting[i]) {
					movieDefaultValue[i] = saveValueOfSetting[i];
					settingValueSaveStr += writeConfigMovie[i]+'='+movieDefaultValue[i]+'|';
				}
			}
		} else if (leftFocusIndex == 1) {
			for (var i=0; i<musicDefaultValue.length; i++) {
				if (musicDefaultValue[i] != saveValueOfSetting[i]) {
					musicDefaultValue[i] = saveValueOfSetting[i];
					if (i == 4) {
						var tempStr = (musicDefaultValue[i]+1)*2;
						settingValueSaveStr += writeConfigMusic[i]+'='+tempStr+'|';
					} else if (i == 3 || i == 5) {
						var tempStr = musicDefaultValue[i]+1;
						settingValueSaveStr += writeConfigMusic[i]+'='+tempStr+'|';
					} else {
						settingValueSaveStr += writeConfigMusic[i]+'='+musicDefaultValue[i]+'|';
					}
				}
			}
			saveScreensaverOpenStatus = musicDefaultValue[2];
			tempStr = saveScreensaverOpenStatus == 0 ? 3 : 6;
			document.getElementById('setList').style.height = 49*tempStr-22+'px';
			document.getElementById('setListName').style.height = 49*tempStr-22+'px';
			document.getElementById('settingValue').style.height = 49*tempStr-22+'px';
		} else if (leftFocusIndex == 2) {
			for (var i=0; i<photoDefaultValue.length; i++) {
				if (photoDefaultValue[i] != saveValueOfSetting[i]) {
					photoDefaultValue[i] = saveValueOfSetting[i];
					if (i == 1) {
						var tempValue = (photoDefaultValue[i]+1)*2;
						var tempStr = tempValue >= 0 ? tempValue : 2;
						settingValueSaveStr += writeConfigPhoto[i]+'='+tempStr+'|';
					} else if (i == 2) {
						var tempStr = photoDefaultValue[i]+1;
						settingValueSaveStr += writeConfigPhoto[i]+'='+tempStr+'|';
					} else {
						settingValueSaveStr += writeConfigPhoto[i]+'='+photoDefaultValue[i]+'|';
					}
				}
			}
		} else {
			if (systemDefaultValue[4] != saveValueOfSetting[4]) {
				currentTVSystem = saveValueOfSetting[4]>1 ? (saveValueOfSetting[4]+1) : saveValueOfSetting[4];
				changeTVSystem();
			}
			for (var i=0; i<systemDefaultValue.length; i++) {
				if (systemDefaultValue[i] != saveValueOfSetting[i]) {
					systemDefaultValue[i] = saveValueOfSetting[i];
					if (i == 2) {
						var tempStr = systemDefaultValue[i] == 0 ? 'chinese' : 'english';
						settingValueSaveStr += writeConfigSystem[i]+'='+tempStr+'|';
					} else {
						settingValueSaveStr += writeConfigSystem[i]+'='+systemDefaultValue[i]+'|';
					}
				} 
			}
		}
		if (settingValueSaveStr != '') {
			makeRequest('config?3|'+settingValueSaveStr, freshInit, 1);
		}
		backToLeft();
	}
	return;
}

function freshInit()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		if (SETUP_WebStyle != systemDefaultValue[0] || SETUP_SkinIndex != systemDefaultValue[1] || language_num != systemDefaultValue[2]) {
		SETUP_WebStyle = systemDefaultValue[0];
		SETUP_SkinIndex = systemDefaultValue[1];
		language_num = systemDefaultValue[2];
		SETUP_Language = (language_num == 1) ? 'english' : 'chinese';
		init();
		}
	}
	return;
}

/*********************************************************************/
/* Function: keyYellow	                                             */
/* Description: 遥控器按键处理函数    	                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-26                               */
/*********************************************************************/
function keyYellow()
{
	if (focusLeftOrRight == 'right') {
		backToLeft();
	}
	return;
}

/*********************************************************************/
/* Function: keyBlue	                                             */
/* Description: 遥控器按键处理函数    	                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-26                               */
/*********************************************************************/
function keyBlue()
{
	if (focusLeftOrRight == 'right') {
		return;
	}
	return;
}

/*********************************************************************/
/* Function: keyEnter                                                */
/* Description: 遥控器按键处理函数    	                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-25                               */
/*********************************************************************/
var focusLeftOrRight = 'left';		//记录焦点位置，左 或 右
var leftFocusIndex = 0;				//记录焦点在左侧时的索引号
var rightFocusIndex = 0;			//记录焦点在右侧时的索引号
var leftFocusTotal = 4;				//左侧列表总数
var isCheckUpHDStatus = false;		//清理硬盘文件提示状态
var rightFocusTotal = new Array(6,6,4,7);	//右侧各列表对应总数
function keyEnter()
{
	if (isKeyClock) {
		return;
	}
	if (isCheckUpHDStatus) {
		document.getElementById('tipsCheckUpHD').style.visibility = 'hidden';
		document.getElementById("tipsCheckUpText").style.visibility = "hidden";
		isCheckUpHDStatus = false;
		if (rightFocusIndex == 5) {
			saveDefaultFactoryValue();
		}
		else if (rightFocusIndex == 6) {
			makeRequest('delTmp?all', nullFun, 1);
		}
	}
	else if (focusLeftOrRight == 'left') {
		gotoRightList();
	} 
	else if (leftFocusIndex == 3 && rightFocusIndex == 5) {
		document.getElementById('tipsCheckUpText').innerHTML = set_CLEAR_SYSTEM[1];
		document.getElementById('tipsCheckUpHD').style.visibility = 'visible';
		document.getElementById("tipsCheckUpText").style.visibility = "visible";
		isCheckUpHDStatus = true;
	}
	else if (leftFocusIndex == 3 && rightFocusIndex == 6) {
		document.getElementById('tipsCheckUpText').innerHTML = set_CLEAR_SYSTEM[0];
		document.getElementById('tipsCheckUpHD').style.visibility = 'visible';
		document.getElementById("tipsCheckUpText").style.visibility = "visible";
		isCheckUpHDStatus = true;
	}
	return;
}

/*********************************************************************/
/* Function: keyBack                                                 */
/* Description: 遥控器按键处理函数    	                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-25                               */
/*********************************************************************/
function keyBack()
{
	if (focusLeftOrRight == 'left') {
		var hrefStr = document.location.href.split('?');
		var param = hrefStr[1].split('@');
		var tempExt = (systemDefaultValue[0]==0||param[0]=='menu')? '.html' : '_s.html';
		var tempUrl = param[0]+tempExt+'?'+param[1];
		document.location.href = tempUrl;
	} else if (isCheckUpHDStatus){
		document.getElementById('tipsCheckUpHD').style.visibility = 'hidden';
		document.getElementById("tipsCheckUpText").style.visibility = "hidden";
		isCheckUpHDStatus = false;
	} else {
		backToLeft();
	}
	return;
}

/*********************************************************************/
/* Function: keyUp                                                   */
/* Description: 遥控器按键处理函数    	                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-25                               */
/*********************************************************************/
function keyUp()
{
	if (focusLeftOrRight == 'left') {
		leftFocusIndex--;
		leftFocusIndex = leftFocusIndex<0 ? leftFocusTotal-1 : leftFocusIndex;
	} else {
		var tempStr = rightFocusTotal[leftFocusIndex];
		if (leftFocusIndex == 1) {
			tempStr = saveScreensaverOpenStatus == 0 ? 3 : 6;
		}
		rightFocusIndex--;
		rightFocusIndex = rightFocusIndex<0 ? (tempStr-1) : rightFocusIndex;
		changeSettingValue();
	}
	showFocusStatus();
	return;
}

/*********************************************************************/
/* Function: keyDown                                                 */
/* Description: 遥控器按键处理函数    	                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-25                               */
/*********************************************************************/
function keyDown()
{
	if (focusLeftOrRight == 'left') {
		leftFocusIndex++;
		leftFocusIndex = leftFocusIndex>(leftFocusTotal-1) ? 0 : leftFocusIndex;
	} else {
		var tempStr = rightFocusTotal[leftFocusIndex];
		if (leftFocusIndex == 1) {
			tempStr = saveScreensaverOpenStatus == 0 ? 3 : 6;
		}
		rightFocusIndex++;
		rightFocusIndex = rightFocusIndex>(tempStr-1) ? 0 : rightFocusIndex;
		changeSettingValue();
	}
	showFocusStatus();
	return;
}

/*********************************************************************/
/* Function: keyLeft                                                 */
/* Description: 遥控器按键处理函数    	                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-25                               */
/*********************************************************************/
function keyLeft()
{
	if (focusLeftOrRight == 'right') {
		indexSettingValue--;
		indexSettingValue = indexSettingValue<0 ? totalSettingValue-1 : indexSettingValue;
		showValueChangeInfo();
	}
	return;
}

/*********************************************************************/
/* Function: keyRight                                                */
/* Description: 遥控器按键处理函数    	                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-25                               */
/*********************************************************************/
function keyRight()
{
	if (focusLeftOrRight == 'left') {
		gotoRightList();
	} else {
		indexSettingValue++;
		indexSettingValue = indexSettingValue>=totalSettingValue ? 0 : indexSettingValue;
		showValueChangeInfo();
	}
	return;
}

/*********************************************************************/
/* Function: saveDefaultFactoryValue	                             */
/* Description: 恢复默认设置（出厂） 	                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-29                               */
/*********************************************************************/
function saveDefaultFactoryValue()
{
	var defaultFactoryValueStr = 'SETUP_Subtitlefirst=1|SETUP_SubtitleSize=1|SETUP_SubtitleColor=1|SETUP_SubtitlePosition=0|SETUP_AspectRatio=0|SETUP_AutoPlayMode=1|cycleType=0|wordShowMode=1|isScreenSaver=0|screenSaverInterval=6|screenSaverTime=10|screenSaverChange=6|lanternMode=0|lanternInterval=6|lanternChangeType=6|imageAutoRotate=1|SETUP_KeyWav=0|SETUP_System=7|SETUP_Language=english|SETUP_SkinIndex=0|SETUP_WebStyle=0|';
	makeRequest('config?3|'+defaultFactoryValueStr, nullFun, 1);
	aspectRatioStatus = 0;
	getAspectRatioValue();
	currentTVSystem = 7;
	changeTVSystem();
	setTimeout("makeRequest('config?2', setParameter, 1);", 500);
	setTimeout("backToLeft();", 600);
}

/*********************************************************************/
/* Function: changeSettingValue                                      */
/* Description: 得到当前选择设置值总数	                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-26                               */
/*********************************************************************/
function changeSettingValue()
{
	if (leftFocusIndex == 0) {
		totalSettingValue = setValueMovie[rightFocusIndex].length;
	} else if (leftFocusIndex == 1) {
		totalSettingValue = setValueMusic[rightFocusIndex].length;
	} else if (leftFocusIndex == 2) {
		totalSettingValue = setValuePhoto[rightFocusIndex].length;
		if (rightFocusIndex == 0) {
			totalSettingValue = totalSettingValue - 1;
		}
	} else {
		totalSettingValue = setValueSystem[rightFocusIndex].length;
	}
	indexSettingValue = saveValueOfSetting[rightFocusIndex];
}

/*********************************************************************/
/* Function: showValueChangeInfo                                     */
/* Description: 设置各选项中的值    	                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-26                               */
/*********************************************************************/
var indexSettingValue = 0;	//设置选项值的索引号
var totalSettingValue;		//设置选项值的总数
var saveValueOfSetting = new Array();		//临时保存设置值
var saveScreensaverOpenStatus;	//保存屏保图片开关状态的临时变量，0 关，1 开
function showValueChangeInfo()
{
	if (leftFocusIndex == 0) {
		document.getElementById('valueList'+rightFocusIndex).innerHTML = setValueMovie[rightFocusIndex][indexSettingValue];
	}
	else if (leftFocusIndex == 1) {
		var tempStr;
		document.getElementById('valueList'+rightFocusIndex).innerHTML = setValueMusic[rightFocusIndex][indexSettingValue];
		if (rightFocusIndex == 2) {
			saveScreensaverOpenStatus = indexSettingValue;
			tempStr = saveScreensaverOpenStatus == 0 ? 3 : 6;
			document.getElementById('setList').style.height = 49*tempStr-22+'px';
			document.getElementById('setListName').style.height = 49*tempStr-22+'px';
			document.getElementById('settingValue').style.height = 49*tempStr-22+'px';
		}
	} else if (leftFocusIndex == 2) {
		document.getElementById('valueList'+rightFocusIndex).innerHTML = setValuePhoto[rightFocusIndex][indexSettingValue];
	} else if (leftFocusIndex == 3) {
		document.getElementById('valueList'+rightFocusIndex).innerHTML = setValueSystem[rightFocusIndex][indexSettingValue];
		if (rightFocusIndex == 0) {
			document.getElementById('valueList1').innerHTML = setValueSystem[1][0];
			saveValueOfSetting[1] = 0;
		}
	}
	saveValueOfSetting[rightFocusIndex] = indexSettingValue;
	return;
}

/*********************************************************************/
/* Function: gotoRightList  	                                     */
/* Description: 从设置模块进入设置选项的操作                             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-25                               */
/*********************************************************************/
function gotoRightList()
{
	focusLeftOrRight = 'right';
	rightFocusIndex = 0;
	document.getElementById('setListFocus').style.visibility = 'visible';
	document.getElementById('tipsButton').style.visibility = 'visible';
	document.getElementById('tipsText').style.visibility = 'visible';
	document.getElementById('projectFocus').style.backgroundImage = "url("+focusSetOff.src+")";
	if (leftFocusIndex == 0) {
		totalSettingValue = setValueMovie[0].length;
		for (var i=0; i<movieDefaultValue.length; i++) {
			saveValueOfSetting[i] = movieDefaultValue[i];
		}
	} else if (leftFocusIndex == 1) {
		totalSettingValue = setValueMusic[0].length;
		for (var i=0; i<musicDefaultValue.length; i++) {
			saveValueOfSetting[i] = musicDefaultValue[i];
		}
	} else if (leftFocusIndex == 2) {
		totalSettingValue = setValuePhoto[0].length;
		for (var i=0; i<photoDefaultValue.length; i++) {
			saveValueOfSetting[i] = photoDefaultValue[i];
		}
	} else {
		totalSettingValue = setValueSystem[0].length;
		for (var i=0; i<systemDefaultValue.length; i++) {
			saveValueOfSetting[i] = systemDefaultValue[i];
		}
	}
	changeSettingValue();
	return;
}

/*********************************************************************/
/* Function: backToLeft		  	                                     */
/* Description: 从设置选项返回设置模块的操作                             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-25                               */
/*********************************************************************/
function backToLeft()
{
	focusLeftOrRight = 'left';
	document.getElementById('tipsButton').style.visibility = 'hidden';
	document.getElementById('tipsText').style.visibility = 'hidden';
	document.getElementById('projectFocus').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/projectFocus.png)';
	document.getElementById('setListFocus').style.visibility = 'hidden';
	document.getElementById('setListFocus').style.top = '189px';
	saveScreensaverOpenStatus = musicDefaultValue[2];
	showSettingInfo();
	return;
}

/*********************************************************************/
/* Function: showFocusStatus                                         */
/* Description: 显示焦点位置	    	                                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-25                               */
/*********************************************************************/
function showFocusStatus()
{
	if (focusLeftOrRight == 'left') {
		document.getElementById('projectFocus').style.top = 174 + leftFocusIndex*46 + 'px';
		showSettingInfo();
	} else {
		document.getElementById('setListFocus').style.top = 189 + rightFocusIndex*49 + 'px';
	}
	return;
}

/*********************************************************************/
/* Function: showSettingInfo                                         */
/* Description: 显示设置列表信息         	                             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-25                               */
/*********************************************************************/
var isClearSysImage = false;	//清理硬盘文件按钮显示状态
function showSettingInfo()
{
	if (isClearSysImage && leftFocusIndex != 3) {
		isClearSysImage = false;
		document.getElementById('resetFactorySet').style.visibility = 'hidden';
		document.getElementById('clearSysImage').style.visibility = 'hidden';
	}
	var tempStr = rightFocusTotal[leftFocusIndex];
	if (leftFocusIndex == 1) {
		tempStr = saveScreensaverOpenStatus == 0 ? 3 : 6;
	}
	document.getElementById('listTitle').innerHTML = set_FILE_INFO[leftFocusIndex];
	document.getElementById('setList').style.height = 49*tempStr-22+'px';
	document.getElementById('setListName').style.height = 49*tempStr-22+'px';
	document.getElementById('settingValue').style.height = 49*tempStr-22+'px';
	for (var i=0; i<rightFocusTotal[leftFocusIndex]; i++) {
		document.getElementById('listName'+i).innerHTML = set_SET_ARRAY_INFO[leftFocusIndex][i];
	}
	if (leftFocusIndex == 3) {
		document.getElementById('setList').style.height = 49*(tempStr-2)-22+'px';
		document.getElementById('setListName').style.height = 49*(tempStr-2)-22+'px';
		document.getElementById('settingValue').style.height = 49*(tempStr-2)-22+'px';
		document.getElementById('resetFactorySet').style.visibility = 'visible';
		document.getElementById('clearSysImage').style.visibility = 'visible';
		isClearSysImage = true;
	}
	showDefaultValueList();
	return;
}

/*********************************************************************/
/* Function: showDefaultValueList                                    */
/* Description: 显示设置默认值列表        	                             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-27                               */
/*********************************************************************/
function showDefaultValueList()
{
	var tempStr = rightFocusTotal[leftFocusIndex];
	for (var i=0; i<tempStr; i++) {
		var indexParameter = defaultValueArray[leftFocusIndex][i];
		if (leftFocusIndex == 0) {
			document.getElementById('valueList'+i).innerHTML = setValueMovie[i][indexParameter];
		} else if (leftFocusIndex == 1) {
			document.getElementById('valueList'+i).innerHTML = setValueMusic[i][indexParameter];
		} else if (leftFocusIndex == 2) {
			document.getElementById('valueList'+i).innerHTML = setValuePhoto[i][indexParameter];
		} else {
			document.getElementById('valueList'+i).innerHTML = setValueSystem[i][indexParameter];
		}
	}
	return;
}

/*********************************************************************/
/* Function: getAspectRatioValue                                     */
/* Description: 获得视频比例			                      	         */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-29                               */
/*********************************************************************/
var aspectRatioStatus = 0;		//视频比例参数 0：4*3 1：16*9
function getAspectRatioValue()
{
	makeRequest('AspectRatio?0', setAspectRatioValue);
	return;
}

/*********************************************************************/
/* Function: setAspectRatioValue                                     */
/* Description: 设置视频比例			                      	         */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-29                               */
/*********************************************************************/
function setAspectRatioValue()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus == 1) {
			var getValue = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue.split('|');
			if (initAspectStatus) {
				movieDefaultValue[5] = getValue[1];
				aspectRatioStatus = getValue[1];
				initAspectStatus = false;
				init();
				isKeyClock = false;
				return;
			}
			if (aspectRatioStatus == 2 && getValue[0] != 0) {
				makeRequest('AspectRatio?1|0|'+getValue[1]+'|0|'+getValue[3], nullFun);
				isKeyClock = false;
				return;
			}
			if (getValue[1] == aspectRatioStatus) {
				isKeyClock = false;
				return;
			}
			makeRequest('AspectRatio?1|2|'+aspectRatioStatus+'|2|'+aspectRatioStatus, nullFun);
			isKeyClock = false;
		}
	}
	return;
}

/*********************************************************************/
/* Function: changeTVSystem                                          */
/* Description: 切换制式请求，制式切换的入口函数                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-11                                 */
/*********************************************************************/
function changeTVSystem()
{
	makeRequest('TVSystem?0|', getTVSystem);
	return;
}

/*********************************************************************/
/* Function: getTVSystem                                             */
/* Description: 获得制式信息，制式切换的操作函数                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-06-11                                 */
/*********************************************************************/
var currentTVSystem; //当前的输出制式
var currentTVSystemSD; //当前输出标清制式(辅助)
function getTVSystem()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var responseXMLHead = httpRequest.responseXML.getElementsByTagName('result');
		var parame = responseXMLHead.item(0).childNodes[0].nodeValue.split("|");
		if (initSystemStatus) {
			systemDefaultValue[4] = parame[0] > 2 ? parame[0]-1 : parame[0];
			currentTVSystem = parame[0] == 2 ? 3 : parame[0];	
			initSystemStatus = false;
		}
		if (currentTVSystem == parame[0]) {
			return;
		}
		if (currentTVSystem==0||currentTVSystem==1) {
			currentTVSystemSD = currentTVSystem;
		}
		else if (currentTVSystem==3||currentTVSystem==6||currentTVSystem==8) {
			currentTVSystemSD = 0;
		}
		else if (currentTVSystem==4||currentTVSystem==5||currentTVSystem==7) {
			currentTVSystemSD = 1;
		}
		else {
			return;
		}
		makeRequest('TVSystem?1|'+currentTVSystem+'|'+currentTVSystemSD, nullFun);
	}
}

/*********************************************************************/
/* Function: getConfig                            		             */
/* Description: 获得设置页面中的所有设置值				                 */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-26                               */
/*********************************************************************/
function getConfig()
{
	isKeyClock = true;
	//makeRequest('config?1|value_setup', setParameter, 1);
	makeRequest('config?2', setParameter, 1);
	return;
}

/*********************************************************************/
/* Function: setParameter                                            */
/* Description: 设置皮肤、语言设置参数                      	         */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-25                               */
/*********************************************************************/
var allSettingValue;	//得到的所有设置项的值
function setParameter()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus == 1) {
			allSettingValue = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue.split('|');
			var chinese = 'chinese';
			var english = 'english';
			for(var i=0; i<allSettingValue.length; i++) {
				eval(allSettingValue[i]);
			}
		}
		getSettingValueArray();
	}
	return;
}

/*********************************************************************/
/* Function: getSettingValueArray	                                 */
/* Description: 获得所有设置项的值		                      	         */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-27                               */
/*********************************************************************/
var language_num;	//语言编号，0为中文，1为英文
function getSettingValueArray()
{
	var tempValue;
	movieDefaultValue = new Array(SETUP_AutoPlayMode, SETUP_Subtitlefirst, SETUP_SubtitleSize, SETUP_SubtitleColor, SETUP_SubtitlePosition, SETUP_AspectRatio);
	
	tempValue = screenSaverInterval/2-1;
	screenSaverInterval = tempValue>=0 ? tempValue : 2;
	screenSaverChange = (screenSaverChange-1)>=0 ? (screenSaverChange-1) : 0;
	screenSaverTime = (screenSaverTime-1)>=0 ? (screenSaverTime-1) : 0;
	musicDefaultValue = new Array(cycleType, wordShowMode, isScreenSaver, screenSaverTime, screenSaverInterval, screenSaverChange);
	saveScreensaverOpenStatus = musicDefaultValue[2];

	tempValue = lanternInterval/2-1;
	lanternInterval = tempValue>=0 ? tempValue : 2;
	lanternChangeType = (lanternChangeType-1)>=0 ? (lanternChangeType-1) : 0;
	photoDefaultValue = new Array(lanternMode, lanternInterval, lanternChangeType, imageAutoRotate);

	language_num = SETUP_Language == 'english' ? 1 : 0;
	
	systemDefaultValue = new Array(SETUP_WebStyle, SETUP_SkinIndex, language_num, SETUP_KeyWav, SETUP_System, SETUP_ResetFactorySet, SETUP_DeleteSystemFile);
	
	defaultValueArray = new Array(movieDefaultValue, musicDefaultValue, photoDefaultValue, systemDefaultValue);
	loadImageSkin();
	initSystem();
}

/*********************************************************************/
/* Function: loadImageSkin		                                     */
/* Description: 载入图片				                      	         */
/* Parameters: 					                                     */
/* Author&Date: zhaopengjun 2010-05-13                               */
/*********************************************************************/
var skinImage0 = new Image();
var skinImage1 = new Image();
var skinList0 = new Image();
var skinList1 = new Image();
function loadImageSkin()
{
	skinImage0.src = 'style1/skin0/mainBg1.jpg';
	skinImage1.src = 'style1/skin1/mainBg1.jpg';
	skinList0.src = 'style1/skin0/settingsBg.png';
	skinList1.src = 'style1/skin1/settingsBg.png';
	return;
}

/*********************************************************************/
/* Function: initSystem			                                     */
/* Description: 初始化系统			                      	         */
/* Parameters: name，parameter	                                     */
/* Author&Date: zhaopengjun 2010-03-29                               */
/*********************************************************************/
var initSystemStatus = false;
var initAspectStatus = false;
function initSystem()
{
	initSystemStatus = true;
	initAspectStatus = true;
	currentTVSystem = systemDefaultValue[4];
	aspectRatioStatus = movieDefaultValue[5];
	changeTVSystem();
	getAspectRatioValue();
	return;
}

/*********************************************************************/
/* Function: defineSubstringFun                                      */
/* Description: 截串操作				                      	         */
/* Parameters: name变量名，parameter字符串                             */
/* Author&Date: zhaopengjun 2010-03-26                               */
/*********************************************************************/
function defineSubstringFun(name, parameter)
{
	name = name+'=';
	var stringName = name.length;
	var stringNum1 = parameter.indexOf(name);
	var stringNum3 = parameter.substring(stringNum1, parameter.length);
	var stringNum2 = stringNum3.indexOf('|');
	if (stringNum2 == -1) {
		stringNum2 = parameter.length;
	}
	var stringOk = parameter.substring((stringNum1+stringName), (stringNum1+stringNum2));
	if (stringNum1 == -1) {
		return 0;
	} else {
		return stringOk;
	}
}

/*********************************************************************/
/* Function: init                                                    */
/* Description: 初始化函数               	                             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-25                               */
/*********************************************************************/
function init()
{
	set_LanguageSelect();
	loadImageFun();
	for (var i=0; i<leftFocusTotal; i++) {
		document.getElementById('projectSet'+i).innerHTML = set_FILE_INFO[i];
	}
	document.getElementById('projectFocus').style.visibility = 'visible';
	for (var i=0; i<3; i++) {
		document.getElementById('listTips'+i).innerHTML = set_TIPS_INFO[i];
	}
	showSettingInfo();
	return;
}

/*********************************************************************/
/* Function: loadImageFun                                            */
/* Description: 载入图片               	                             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-25                               */
/*********************************************************************/
var focusSetOff = new Image();
function loadImageFun()
{
	//iPanel.ioctlWrite('printf', 'keyValue=======SETUP_WebStyle=========='+SETUP_WebStyle+'\n');
	if (SETUP_WebStyle == 0) {
		document.body.style.backgroundImage = '';
		document.getElementById('titleIcon').style.backgroundImage = 'url(style1/titleIcon6.png)';
		document.getElementById('pageLine').style.backgroundImage = 'url(style1/line.png)';
		document.getElementById('projectList').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/projectList.png)';
		document.getElementById('projectFocus').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/projectFocus.png)';
		document.getElementById('fileList').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/settingsBg.png)';
		document.getElementById('setList').style.backgroundImage = 'url(style1/setList.png)';
		document.getElementById('tipsButton').style.backgroundImage = 'url(style1/fileListButton.png)';
		document.getElementById('setListFocus').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/setListFocus.png)';
		document.getElementById('resetFactorySet').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/clearSystemButton.png)';
		document.getElementById('clearSysImage').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/clearSystemButton.png)';
		document.getElementById('tipsCheckUpText').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/miniMenu3.png)';
		focusSetOff.src = 'image/projectFocusOff.png';
	} else {
		document.body.style.backgroundImage = "url("+eval('skinImage'+SETUP_SkinIndex+'.src')+")";
		document.getElementById('titleIcon').style.backgroundImage = 'url(style1/titleIcon6.png)';
		document.getElementById('pageLine').style.backgroundImage = 'url(style1/line.png)';
		document.getElementById('projectList').style.backgroundImage = 'url(style1/projectList.png)';
		document.getElementById('projectFocus').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/projectFocus.png)';
		document.getElementById('fileList').style.backgroundImage = "url("+eval('skinList'+SETUP_SkinIndex+'.src')+")";
		document.getElementById('setList').style.backgroundImage = 'url(style1/setList.png)';
		document.getElementById('tipsButton').style.backgroundImage = 'url(style1/fileListButton.png)';
		document.getElementById('setListFocus').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/setListFocus.png)';
		document.getElementById('resetFactorySet').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/clearSystemButton.png)';
		document.getElementById('clearSysImage').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/clearSystemButton.png)';
		document.getElementById('tipsCheckUpText').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/miniMenu3.png)';
		focusSetOff.src = 'style1/projectFocusOff.png';
	}
	document.getElementById('resetFactorySet').innerHTML = set_SET_SYSTEM_INFO[5];
	document.getElementById('clearSysImage').innerHTML = set_SET_SYSTEM_INFO[6];
	//显示USB提示框图片
	tempURL = 'url(image/skin'+SETUP_SkinIndex+'/usbInfo.png)';
	document.getElementById('usbDiv').style.backgroundImage = tempURL;
	loadArrayFun();
	return;
}

var movieDefaultValue;
var musicDefaultValue;
var photoDefaultValue;
var systemDefaultValue;
var defaultValueArray;

var writeConfigMovie;
var writeConfigMusic;
var writeConfigPhoto;
var writeConfigSystem;

var set_SET_ARRAY_INFO;	//设置数组
var setValueMovie;	//电影设置数组
var setValueMusic;	//音乐设置数组
var setValuePhoto;	//相册设置数组
var setValueSystem;	//系统设置数组
function loadArrayFun()
{
	writeConfigMovie = new Array('SETUP_AutoPlayMode', 'SETUP_Subtitlefirst', 'SETUP_SubtitleSize', 'SETUP_SubtitleColor', 'SETUP_SubtitlePosition', 'SETUP_AspectRatio');
	writeConfigMusic = new Array('cycleType', 'wordShowMode', 'isScreenSaver', 'screenSaverTime', 'screenSaverInterval', 'screenSaverChange');
	writeConfigPhoto = new Array('lanternMode', 'lanternInterval', 'lanternChangeType', 'imageAutoRotate');
	writeConfigSystem = new Array('SETUP_WebStyle', 'SETUP_SkinIndex', 'SETUP_Language', 'SETUP_KeyWav', 'SETUP_System', 'SETUP_ResetFactorySet', 'SETUP_DeleteSystemFile');

	set_SET_ARRAY_INFO = new Array(set_SET_MOVIE_INFO, set_SET_MUSIC_INFO, set_SET_PHOTO_INFO, set_SET_SYSTEM_INFO);
	setValueMovie = new Array(autoPlayModeValue, languageValue, subtitleSizeValue, subtitleColorValue, subtitlePositionValue, aspectRatioValue);
	setValueMusic = new Array(lanternModeValue, wordShowModeValue, isScreenSaverValue, screenSaverTimeValue, lanternIntervalValue, lanternChangeTypeValue);
	setValuePhoto = new Array(lanternModeValue, lanternIntervalValue, lanternChangeTypeValue, autoPlayModeValue);
	setValueSystem = new Array(webStyleValue, skinIndexValue, languageValue, keyWavValue, systemValue, autoPlayModeValue, autoPlayModeValue);
}





