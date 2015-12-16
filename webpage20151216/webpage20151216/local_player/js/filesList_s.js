// JavaScript Document
/*********************************************************************/
/* Function: keyEvent                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-03-31                              */
/*********************************************************************/
var isKeyClock = false; //遥控器按键锁定，用于播放请求处理过程中屏蔽遥控器按键
var isDoesnotItem = false; //无可用硬盘或服务器的状态
var searchFileStatus = false;	//搜索文件状态
document.onkeypress = keyEvent;
function keyEvent(e)
{
	var keyValue = e.which;
	iPanel.ioctlWrite('printf', 'keyValue=======filesList============='+keyValue+'\n');
	//移动设备插拔的处理
	if (keyValue>=0xff20 && keyValue<=0xff34) {
		if (keyValue>=0xff31) {
			if ((keyValue-0xff30)==serverIndex) {
				isUsbRemove = true;
			}
		}
		showUSBInfo(keyValue);
		return;
	}
	//无项目的处理
	if (isDoesnotItem) {
		if (keyValue==8) {
			isDoesnotItem = false;
			keyBack();
		}
		return (false);
	}
	if (isKeyClock && (keyValue<0xff00)) {
		return (false);
	}
	if (searchFileStatus&&keyValue!=0xff41) {
		searchPageEvent(keyValue);
		return (false);
	}
	if (isDeleteAsk) {
		keyDelete(keyValue);
		return (false);
	}
	if (isSortMenu) {
		keySort(keyValue);
		return (false);
	}
	//文件播放后按键处理入口 lxd 2010-01-23
	if (isScanFilePlay) {
		playerKeyEvent(keyValue);
		return (false);
	}
	//按键的处理
	switch (keyValue) {
		case 8: //back(停止)
			keyBack();
			return (false);
			break;
		case 13: //Enter
			keyEnter();
			return (false);
			break;
		case 37: //left(快退)
			keyLeft();
			return (false);
			break;
		case 38: //up
			keyUp();
			return (false);
			break;
		case 39: //right(快进)
			keyRight();
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

		case 284: //帮助
			keyHelp();
			break;
		case 1292: //字幕
			keySubtitle();
			break;
		case 271: //定位
		case 2082:
			iPanel.ioctlWrite('printf', 'keyValue=======定位=============\n');
			document.getElementById('searchStart').style.visibility = 'visible';
			document.getElementById('searchStartDiv').style.visibility = 'visible';
			document.getElementById("searchText").disabled = false;
			document.getElementById('searchText').focus();
			document.getElementById('searchText').value = '';
			document.getElementById('searchTipsText').innerHTML = file_OPERATE_INFO[5];
			searchFileStatus = true;
			break;
		case 281: //收藏
			keyFavorite();
			break;
		case 519:	//设置
			document.location.href = 'file:////settings/land.html';
			break;

		case 263: //play/pause
			//if (disSearchResult) {
				scanFilePlay(); //文件播放入口 lxd 2010-01-23
			//}
			break;

		default:
			return (-1);
			break;
	}
	return;
}

////////////////////////////////////////////////文件搜索开始

/*********************************************************************/
/* Function: searchPageEvent                                         */
/* Description: 搜索页面遥控器按键处理函数                              */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-01-18                               */
/*********************************************************************/
function searchPageEvent(keyValue)
{
	if (lockKeyStatus) {
		return false;
	}
	if (textStrNull==1) {
		if (keyValue == 13){
			textStrNull = 2;
		} else {
			textStrNull = 0;
		}
	}
	switch(keyValue) {
		case 8: //back
		case 271: //定位
		case 2082:
			document.getElementById('searchStart').style.visibility = 'hidden';
			document.getElementById('searchStartDiv').style.visibility = 'hidden';
			document.getElementById('searchTipsText').innerHTML = '';
			searchFileStatus = false;
			return (false);
			break;
		case 13:  //enter
			searchingFile();
			break;
		case 37: //left
			document.getElementById('searchText').focus();
			break;
		case 39:  //right
			document.getElementById('searchHref').focus();
			break;
		default:
			return (-1);
			break;
	}
	return;
}

/*********************************************************************/
/* Function: searchingFile                                           */
/* Description: 按搜索键开始文件搜索		                             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-01-18                               */
/*********************************************************************/
var searchFilePath;	//搜索文件的路径
var lockKeyStatus = false;	//搜索开始，锁定按键
var textStrNull = 0;	//输入框为空的判断
var textStr = '';		//要搜索的内容
var isScanResultPage = false;	//是否为搜索结果页面
var isExitScanPageTips = false;	//是否退出搜索结果页面提示
function searchingFile()
{
	if (textStrNull == 2) {
		textStrNull = 0;
		return;
	}
	if (searchFileStatus) {
		if (lockKeyStatus) {
			return;
		}
		document.getElementById('searchTipsText').innerHTML = '';
		textStr = document.getElementById('searchText').value;
		textStr = clearSpace(textStr);
		if (textStr=='') {
			textStrNull = 1;
			document.getElementById('searchText').value = '';
			document.getElementById('searchTipsText').innerHTML = file_OPERATE_INFO[5];
			document.getElementById('searchText').focus();
			return;
		}
		lockKeyStatus = true;
		document.getElementById("searchText").disabled = true;
		searchFilePath = diskZoneName+'|'+textStr+'|1$6';
		document.getElementById('processSearchingImage').style.width = '1px';
		document.getElementById('processBfb').innerHTML = '0%';
		document.getElementById('processDiv').style.visibility = 'visible';
		makeRequest('scan?'+searchFilePath, searchProcess, 4);
	}
}

/*********************************************************************/
/* Function: showDiskInfo                                            */
/* Description: 显示搜索信息                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-07-07                                 */
/*********************************************************************/
function showDiskInfo(diskInfo)
{
	diskInfo[4] = (diskInfo[4]>100)? 100 : diskInfo[4];
	diskInfo[4] = (diskInfo[4]<0)? 0 : diskInfo[4];
	document.getElementById('processBfb').innerHTML = diskInfo[4]+'%';
	var len = 2*diskInfo[4];
	len = (len<=0)? 1 : len;
	len = (len>=200)? 200 : len;
	document.getElementById('processSearchingImage').style.width = len+'px';
	setTimeout("makeRequest('scan?'+searchFilePath, searchProcess, 4)", 600);
	return;
}

/*********************************************************************/
/* Function: searchProcess                                           */
/* Description: 按搜索键开始文件搜索		                             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-01-18                               */
/*********************************************************************/
var copyFileIndex;		//保存搜索前的焦点索引
function searchProcess()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==-1) {
			var getDiskInfo = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue.split('|');
			showDiskInfo(getDiskInfo);
			return;
		}
		document.getElementById('processDiv').style.visibility = 'hidden';
		//文件夹读取后，个数为0的处理
		if (getStatus==0) {
			textStrNull = 1;
			document.getElementById('searchText').value = '';
			document.getElementById('searchTipsText').innerHTML = file_OPERATE_INFO[10];
			document.getElementById("searchText").disabled = false;
			document.getElementById('searchText').focus();
			lockKeyStatus = false;
			return;
		}
		if (!isScanResultPage) {
			copyFileIndex = fileIndex;
		}
		document.getElementById('searchStart').style.visibility = 'hidden';
		document.getElementById('searchStartDiv').style.visibility = 'hidden';
		fileFlag = new Array();
		searchFileStatus = false;
		isScanResultPage = true;
		fileIndex = 0;
		//获得文件夹和文件的总数
		var getInfo = httpRequest.responseXML.getElementsByTagName('fileNumInfo').item(0).childNodes[0].nodeValue.split('|');
		fileTotal = getInfo[0];
		fileReturnTotal = getInfo[1];
		//获得文件夹和文件的信息
		document.getElementById('scanResultTips').innerHTML = file_SCAN_INFO[0]+textStr+file_SCAN_INFO[1]+fileTotal+file_SCAN_INFO[2];
		document.getElementById('scanResultTips').style.visibility = 'visible';
		var responseXMLHead = httpRequest.responseXML.getElementsByTagName('file');
		var parameter;
		var pos = parseInt(fileIndex/ViewTotal)*ViewTotal;
		for (var i=0; i<fileReturnTotal; i++) {
			parameter = responseXMLHead.item(i).childNodes[0].nodeValue.split('|');
			fileType[i] = parseInt(parameter[0]);
			fileExtend[i] = parameter[1].toUpperCase();
			fileSize[i] = parseFloat(parameter[2]);
			fileTime[i] = parameter[3];
			fileRealName[i] = parameter[4];
			fileShowName[i] = parameter[5];
			fileDeleteName[pos+i] = parameter[4];
		}
		showFileList();
		lockKeyStatus = false;
	}
}

/*********************************************************************/
/* Function: getFileListRequestScan                                      */
/* Description: 发送获得文件夹和文件的请求                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-19                                 */
/*********************************************************************/
function getFileListRequestScan()
{
	var fastIndex = parseInt(fileIndex/ViewTotal)*ViewTotal;
	var begin = fastIndex+1;
	var end = fastIndex+ViewTotal;
	isKeyClock = true;
	var requestStr = diskZoneName+'|'+textStr+'|'+begin+'$'+end+'';
	makeRequest('scan?'+requestStr, getFileList, 4);
	return;
}

/*********************************************************************/
/* Function: searchFocusOn                                           */
/* Description: 搜索键获得焦点，背景图片改变                            */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-01-18                               */
/*********************************************************************/
function searchFocusOn()
{
	document.getElementById('searchImage').src = 'image/searchImageOn.png';
}

/*********************************************************************/
/* Function: searchFocusOff                                         */
/* Description: 搜索键失去焦点，背景图片改变                            */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-01-18                               */
/*********************************************************************/
function searchFocusOff()
{
	document.getElementById('searchImage').src = 'image/searchImageOff.png';
}

/////////////////////////////////////////////////////////文件搜索结束

/*********************************************************************/
/* Function: keyDelete                                               */
/* Description: 删除提问状态下的按键处理                             */
/* Parameters: keyValue 键值                                         */
/* Author&Date: lixudong  2009-12-16                                 */
/*********************************************************************/
function keyDelete(keyValue)
{
	if (keyValue==8 || keyValue==276) {
		hideDeletePrompt();
	}
	else if (keyValue==13) {
		document.getElementById('messageText').innerHTML = file_DELETE_INFO[0]+fileSelectTotal+file_DELETE_INFO[1];
		deleteItem();
	}
	return;
}

/*********************************************************************/
/* Function: keySort                                                 */
/* Description: 排序方式选择状态下的按键处理                         */
/* Parameters: keyValue 键值                                         */
/* Author&Date: lixudong  2009-12-16                                 */
/*********************************************************************/
function keySort(keyValue)
{
	if (keyValue==8 || keyValue==275) {
		hideSortMode();
	}
	else if (keyValue==13) {
		sortModeSelect();
	}
	else if (keyValue==38) {
		sortModePrevious();
	}
	else if (keyValue==40) {
		sortModeNext();
	}
	return;
}

/*********************************************************************/
/* Function: keyBack                                                 */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-03-31                              */
/*********************************************************************/
function keyBack()
{
	if (isExitScanPageTips) {
		document.getElementById('messageText').innerHTML = '';
		document.getElementById('divMessage').style.visibility = 'hidden';
		document.getElementById('divMessageShow').style.visibility = 'hidden';
		isExitScanPageTips = false;
	}
	else if (isScanResultPage) {
		var tempStr = file_SCAN_INFO[3];
		document.getElementById('messageText').innerHTML = tempStr;
		document.getElementById('divMessage').style.visibility = 'visible';
		document.getElementById('divMessageShow').style.visibility = 'visible';
		isExitScanPageTips = true;
	}
	else {
		channelBack();
	}
	return;
}

/*********************************************************************/
/* Function: keyEnter                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-03-31                              */
/*********************************************************************/
function keyEnter()
{
	if (isExitScanPageTips) {
		document.getElementById('messageText').innerHTML = '';
		document.getElementById('divMessage').style.visibility = 'hidden';
		document.getElementById('divMessageShow').style.visibility = 'hidden';
		isExitScanPageTips = false;
		isScanResultPage = false;
		document.getElementById('scanResultTips').style.visibility = 'hidden';
		fileIndex = copyFileIndex;
		fileFlag = new Array();
		getFileListRequest();
	}
	else {
		channelSelect();
	}
	return;
}

/*********************************************************************/
/* Function: keyLeft                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-03-31                              */
/*********************************************************************/
function keyLeft()
{
	channelLeft();
	return;
}

/*********************************************************************/
/* Function: keyUp                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-03-31                              */
/*********************************************************************/
function keyUp()
{
	channelPrevious();
	return;
}

/*********************************************************************/
/* Function: keyRight                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-03-31                              */
/*********************************************************************/
function keyRight()
{
	channelRight();
	return;
}

/*********************************************************************/
/* Function: keyDown                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-03-31                              */
/*********************************************************************/
function keyDown()
{
	channelNext();
	return;
}

/*********************************************************************/
/* Function: keyPageUp                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-03-31                              */
/*********************************************************************/
function keyPageUp()
{
	channelPagePrevious();
	return;
}

/*********************************************************************/
/* Function: keyPageDown                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-03-31                              */
/*********************************************************************/
function keyPageDown()
{
	channelPageNext();
	return;
}

/*********************************************************************/
/* Function: keyDown                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-03-31                              */
/*********************************************************************/
function keyDown()
{
	channelNext();
	return;
}

/*********************************************************************/
/* Function: keyRed                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-03-31                              */
/*********************************************************************/
function keyRed()
{
	if (!isSortMenu) {
		showSortMenu();
	}
	return;
}

/*********************************************************************/
/* Function: keyGreen                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-03-31                              */
/*********************************************************************/
function keyGreen()
{
	if (!isDeleteAsk) {
		showDeletePrompt();
	}
	return;
}

/*********************************************************************/
/* Function: keyYellow                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-03-31                              */
/*********************************************************************/
function keyYellow()
{
	channelFlagAll();
	return;
}

/*********************************************************************/
/* Function: keyBlue                                                */
/* Description: 遥控器按键处理函数                                   */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-03-31                              */
/*********************************************************************/
function keyBlue()
{
	channelFlag();
	return;
}

/*********************************************************************/
/* Function: channelBack                                             */
/* Description: 返回前一级目录的处理                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-16                                 */
/*********************************************************************/
function channelBack()
{
	//根目录时的处理
	var len = queuePath.length;
	if (len<=1) {
		document.location.href = 'disk_s.html?'+mediaTypeIndex;
		return;
	}
	//清除文件夹和文件的选中标记
	initDeleteList();
	//恢复前一级目录的队列数据
	queuePath.length--;
	queuePathShow.length--;
	queuefileIndex.length--;
	fileIndex = queuefileIndex[len-2];
	//显示前一级目录的路径
	document.getElementById('styleDiskText').innerHTML = queuePathShow[len-2];
	//发送获得文件夹和文件列表的请求
	getFileListRequest();
	return;
}

/*********************************************************************/
/* Function: channelSelect                                           */
/* Description: 选中文件夹或文件后的处理                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-01                                 */
/*********************************************************************/
function channelSelect()
{
	//选中文件后的处理
	var pos = fileIndex%ViewTotal;
	if (fileType[pos]!=0) {
		channelFlag();
		return;
	}
	//选中文件夹后的处理
	//清除文件夹和文件的选中标记
	initDeleteList();
	//存储当前目录的队列数据
	var len = queuePath.length;
	queuePath.length++;
	queuePathShow.length++;
	queuefileIndex.length++;
	queuePath[len] = fileRealName[pos];
	queuePathShow[len] = queuePathShow[len-1]+fileShowName[pos]+'\\';
	queuefileIndex[len-1] = fileIndex;
	fileIndex = 0; //初始化当前文件夹或文件的索引号
	//显示当前路径
	document.getElementById('styleDiskText').innerHTML = queuePathShow[len];
	//发送获得文件夹和文件列表的请求
	getFileListRequest();
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
			if (isScanResultPage) {
				getFileListRequestScan();
			} else {
				getFileListRequest();
			}
		}*/
	}
	else {
		fileIndex -= 3;
		showFileInfo();
	}
	return;
}

/*********************************************************************/
/* Function: channelRight                                            */
/* Description: 向右移动焦点，选择下一个选项                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-03-12                                 */
/*********************************************************************/
function channelRight()
{
	if (fileIndex>=fileTotal-1) {
		return;
	}
	var pos = fileIndex%ViewTotal;
	if (pos>=ViewTotal-3) {
		return;
		//向右移动后可翻页的处理
		/*fileIndex += 3;
		fileIndex = (fileIndex>=fileTotal-1)? fileTotal-1 : fileIndex;
		if (isScanResultPage) {
			getFileListRequestScan();
		} else {
			getFileListRequest();
		}*/
	}
	else {
		fileIndex += 3;
		fileIndex = (fileIndex>=fileTotal-1)? fileTotal-1 : fileIndex;
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
		if (isScanResultPage) {
			getFileListRequestScan();
		} else {
			getFileListRequest();
		}
	}
	else {
		fileIndex--;
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
		if (isScanResultPage) {
			getFileListRequestScan();
		} else {
			getFileListRequest();
		}
	}
	else {
		fileIndex++;
		showFileInfo();
	}
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
	if (isScanResultPage) {
		getFileListRequestScan();
	} else {
		getFileListRequest();
	}
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
	fileIndex -= ViewTotal;
	if (fileIndex<0) {
		//fileIndex = 0;
		fileIndex = fileTotal - 1;
	}
	if (isScanResultPage) {
		getFileListRequestScan();
	} else {
		getFileListRequest();
	}
	return;
}

///////////////////////////////////////////////////////////////////////初始化部分开始

/*********************************************************************/
/* Function: getConfig                            		             */
/* Description: 获得设置页面中的所有设置值				             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-26                               */
/*********************************************************************/
function getConfig()
{
	makeRequest('config?2', setParameter, 1);
	return;
}

/*********************************************************************/
/* Function: setParameter                                            */
/* Description: 设置皮肤、语言设置参数                               */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-25                               */
/*********************************************************************/
var allSettingValue;	//得到的所有设置项的值
var chinese = 'chinese';
var english = 'english';
function setParameter()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus == 1) {
			allSettingValue = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue.split('|');
			for(var i=0; i<allSettingValue.length; i++) {
				eval(allSettingValue[i]);	
			}
		}
		getRTypeRequest();
	}
	return;
}

/*********************************************************************/
/* Function: getRTypeRequest                                         */
/* Description: 获得使用遥控器的类型							         */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-01-28                               */
/*********************************************************************/
function getRTypeRequest()
{
	makeRequest('getRType', getRTypeResponse, 1);
}

/*********************************************************************/
/* Function: getRTypeResponse                                         */
/* Description: 根据使用遥控器的类型选择函数					         */
/* Parameters:  0是上海，1是华为                                       */
/* Author&Date: zhaopengjun 2010-01-28                               */
/*********************************************************************/
var RTypeStatus = 1; 	//记录遥控器的类型，0是上海，1是华为
function getRTypeResponse()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		var responseXMLValue = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue;
		if (responseXMLValue == 1) {
			RTypeStatus = 1;
			//document.onkeypress = keyCode;
		} else {
			RTypeStatus = 0;
			//document.onkeypress = keyEvent;
		}
		init();
	}
}

/*********************************************************************/
/* Function: init                                                    */
/* Description: 创建XMLHttpRequest对象；获得文件夹和文件列表         */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-03-31                               */
/*********************************************************************/
var zoneType = 0; //是否为DLNA服务器，取值0,1,2时，均为硬盘，取值为3时为DLNA
var queuePath = new Array(); //路径队列
var queuePathShow = new Array(); //路径队列字符串
var queuefileIndex = new Array(); //文件指针队列
var serverIndex = 0; //当前物理接口
var mediaType = ''; //当前功能选项类型(movie, music, photo, game, file)
var mediaTypeIndex = 0; //当前功能选项类型的索引号
var ViewTotal = 6; //每页能显示的显目总数
var diskZoneName;
function init()
{
	file_LanguageSelect();
	movie_LanguageSelect();
	loadImageFun();
	//获得前一个网页传递的参数
	var hrefStr = document.location.href.split('?');
	var parameter = hrefStr[1].split('|');
	zoneType = parseInt(parameter[0]);
	queuePath[0] = changeCompartStr(parameter[1], '*', '/');
	diskZoneName = queuePath[0];
	if (parameter[2] == 0) {
		parameter[2] = 'Server';
	}
	queuePathShow[0] = parameter[2]+':\\';
	queuefileIndex[0] = 0;
	//显示当前路径
	document.getElementById('styleDiskText').innerHTML = queuePathShow[0];
	serverIndex = parseInt(parameter[3]);
	htmlTitle = parameter[4]+'List';
	mediaType = parameter[4];
	mediaTypeIndex = parseInt(parameter[5]);
	getFileListRequest();
	return;
}

/*********************************************************************/
/* Function: loadImageFun                                            */
/* Description: 载入图片               	                             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun 2010-04-01                               */
/*********************************************************************/
function loadImageFun()
{
	document.getElementById('middleDiv').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/mainBg1.jpg)';
	document.getElementById('lineDiv').style.backgroundImage = 'url(style1/line.png)';
	document.getElementById('keyButtonImg').style.backgroundImage = 'url(style1/fileTipsButton.png)';
	document.getElementById('tipsInfo1').style.backgroundImage = 'url(style1/fileListInfoBar.png)';
	document.getElementById('tipsInfo2').style.backgroundImage = 'url(style1/fileListInfoBar.png)';
	document.getElementById('styleFocus').style.backgroundImage = 'url(style1/focusStyle.png)';
	//搜索框背景图
	document.getElementById('searchBgImage').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/search_bg.png)';
	
	//显示USB提示框图片
	tempURL = 'url(image/skin'+SETUP_SkinIndex+'/usbInfo.png)';
	document.getElementById('usbDiv').style.backgroundImage = tempURL;
	//书签提示背景图
	document.getElementById('divBookMark').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/pSelect.png)';
	//码流提示信息框
	document.getElementById('divSetupInfo').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/setupInfo.png)';
	//无书签提示
	document.getElementById('fileError').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/pSelect.png)';
	//视频全屏信息框
	document.getElementById('divAllInfo').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/allInfo.png)';
	//视频全屏信息框按钮文字中英文 
	document.getElementById('allInfoText').style.backgroundImage = 'url(image/'+SETUP_Language+'/allInfoText.png)';
	//视频全屏进度背景图
	document.getElementById('divPlayProcess').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/playProcess.png)';
	//视频全屏音量背景图
	document.getElementById('divVolume').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/volumeMessage.png)';
	//全屏音乐背景图
	document.getElementById('divPlayerMusic').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/mainBg1.jpg)';
	//全屏音乐背景图
	document.getElementById('divPlayerMusicBg').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/musicPlayerBg.png)';
	//全屏音乐进度条
	document.getElementById('musicProcess').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/musicProcessBar.png)';
	//全屏音乐音量条
	document.getElementById('musicVolume').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/musicVolumeBar.png)';
	//提示信息背景
	document.getElementById('messageText').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/miniMenu3.png)';
	
	//搜索按钮中英文
	document.getElementById('search_button').innerHTML = file_OPERATE_INFO[6];
	//全屏音乐进度文字中英文
	document.getElementById('musicBarText').innerHTML = file_OPERATE_INFO[7];
	//全屏音乐音量文字中英文
	document.getElementById('musicVolumeText').innerHTML = file_OPERATE_INFO[8];
	//搜索中，文字提示中英文
	document.getElementById('scanProcessTips').innerHTML = file_OPERATE_INFO[9];
	document.getElementById('tipsInfo1').innerHTML = file_OPERATE_INFO[4];
	document.getElementById('tipsInfo2').innerHTML = file_OPERATE_INFO[2];
	for (var i=0; i<5; i++) {
		document.getElementById('keyTipsText'+i).innerHTML = file_FILE_OPERATE[i];
	}
	return;
}

/*********************************************************************/
/* Function: getFileListRequest                                      */
/* Description: 发送获得文件夹和文件的请求                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-19                                 */
/*********************************************************************/
function getFileListRequest()
{
	var fastIndex = parseInt(fileIndex/ViewTotal)*ViewTotal;
	var begin = fastIndex+1;
	var end = fastIndex+ViewTotal;
	var pathIndex = queuePath.length-1;
	isKeyClock = true;
	var requestStr = zoneType+'|'+sortType+'|'+mediaType+'|'+queuePath[pathIndex]+'|'+begin+'$'+end+'';
	makeRequest('list?'+requestStr, getFileList, 4);
	return;
}

/*********************************************************************/
/* Function: getFileList                                             */
/* Description: 获得文件夹和文件列表数据                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-18                                 */
/*********************************************************************/
var fileTotal = 0; //文件夹和文件的总数
var fileReturnTotal = 0; //实际返回的文件夹和文件的总数
var fileIndex = 0; //当前文件夹或文件的索引号
var fileType = new Array(); //文件夹或文件的类型
var fileExtend = new Array(); //文件夹或文件的扩展名
var fileSize = new Array(); //文件夹或文件的大小
var fileTime = new Array(); //文件夹或文件的时间
var fileRealName = new Array(); //文件夹或文件的真实名称
var fileShowName = new Array(); //文件夹或文件的显示名称
var fileFlag = new Array(); //文件的选中状态图标
var fileDeleteName = new Array(); //删除文件夹或文件的名称
function getFileList()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		//无可用文件夹和文件时的处理
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==-1 && isScanResultPage) {
			getFileListRequestScan();
			return;
		}
		if (getStatus==0) {
			document.getElementById('messageText').innerHTML = file_OPERATE_INFO[0]+file_OPERATE_INFO[1];
			document.getElementById('divMessage').style.visibility = 'visible';
			document.getElementById('divMessageShow').style.visibility = 'visible';
			isKeyClock = false;
			isDoesnotItem = true;
			return;
		}
		isDoesnotItem = false;
		document.getElementById('divMessage').style.visibility = 'hidden';
		document.getElementById('divMessageShow').style.visibility = 'hidden';
		//获得文件夹和文件的总数
		var getInfo = httpRequest.responseXML.getElementsByTagName('fileNumInfo').item(0).childNodes[0].nodeValue.split('|');
		fileTotal = getInfo[0];
		fileReturnTotal = getInfo[1];
		//显示搜索后的提示信息
		if (isScanResultPage) {
			document.getElementById('scanResultTips').innerHTML = file_SCAN_INFO[0]+textStr+file_SCAN_INFO[1]+fileTotal+file_SCAN_INFO[2];
		}
		//获得文件夹和文件的信息
		var responseXMLHead = httpRequest.responseXML.getElementsByTagName('file');
		var parameter;
		var pos = parseInt(fileIndex/ViewTotal)*ViewTotal;
		for (var i=0; i<fileReturnTotal; i++) {
			parameter = responseXMLHead.item(i).childNodes[0].nodeValue.split('|');
			fileType[i] = parseInt(parameter[0]);
			fileExtend[i] = parameter[1].toUpperCase();
			fileSize[i] = parseFloat(parameter[2]);
			fileTime[i] = parameter[3];
			fileRealName[i] = parameter[4];
			fileShowName[i] = parameter[5];
			fileDeleteName[pos+i] = parameter[4];
		}
		isKeyClock = false;
		showFileList();
	}
	return;
}
///////////////////////////////////////////////////////////////////////初始化部分结束

///////////////////////////////////////////////////////////////////////功能处理部分开始
/*********************************************************************/
/* Function: showFileList                                            */
/* Description: 显示文件夹和文件列表                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-15                                 */
/*********************************************************************/
function showFileList()
{
	if (fileTotal<=0 || fileReturnTotal<=0) {
		return;
	}
	//计算当前页号和总页数
	var pageTotal = parseInt((fileTotal-1)/ViewTotal);
	var pageCurrent = parseInt(fileIndex/ViewTotal);
	//显示页码和翻页指示
	document.getElementById('pageInfoStyle').innerHTML = file_PAGE_NUMBER[0]+(pageCurrent+1)+file_PAGE_NUMBER[1]+(pageTotal+1)+file_PAGE_NUMBER[2];
	var showStatus = (pageCurrent>0)? 'url(style1/pageUp_S.png)' : 'url(style1/pageUp_N.png)';
	document.getElementById('pageUpStyle').style.backgroundImage = showStatus;
	showStatus = (pageCurrent<pageTotal)? 'url(style1/pageDn_S.png)' : 'url(style1/pageDn_N.png)';
	document.getElementById('pageDnStyle').style.backgroundImage = showStatus;
	//显示文件夹和文件列表
	for (var i=0; i<ViewTotal; i++) {
		pos = pageCurrent*ViewTotal + i;
		var tempFlag = (fileFlag[pos])? 'url(style1/fileSelectOn.png)' : 'url(image/null.png)';
		var tempStr = (i<fileReturnTotal)? fileShowName[i] : '';
		var fileTypeIndex = fileType[i] >= 4 ? 5 : fileType[i];
		var tempImg = (i<fileReturnTotal)? 'style1/fileType'+fileTypeIndex+'.png' : 'style1/null.png';
		document.getElementById('styleIcon'+i).src = tempImg;
		document.getElementById('styleTip'+i).style.backgroundImage = tempFlag;
		document.getElementById('styleText'+i).innerHTML = tempStr;
	}
	isKeyClock = false;
	showFileInfo();
	return;
}

/*********************************************************************/
/* Function: showFileInfo                                            */
/* Description: 显示文件夹或文件的信息                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-15                                 */
/*********************************************************************/
function showFileInfo()
{
	//移动焦点位置
	var pos = fileIndex%ViewTotal;
	var row = parseInt(pos/3);
	var tempLeft = row*175+438;
	var tempTop = 119+(pos%3)*147;
	document.getElementById('styleFocus').style.left = tempLeft+"px";
	document.getElementById('styleFocus').style.top = tempTop+"px";
	//获得项目图片显示数据
	pictureStr = (fileType[pos]>=0 && fileType[pos]<=3)? 'url(style1/fileType'+fileType[pos]+'.png)' : 'url(style1/fileType5.png)';
	document.getElementById('fileIcondefault').style.backgroundImage = pictureStr;
	//获得项目信息数据
	var showStr = '';
	var typeStr = fileExtend[pos];
	var sizeStr = changeDataUnit(fileSize[pos]);
	var timeStr = changeTimeFormat(fileTime[pos]);
	var nameStr = fileShowName[pos];
	showStr += file_FILE_INFO[0]+typeStr+'<br>';
	if (fileType[pos]!=0) {
		showStr += file_FILE_INFO[1]+sizeStr+'<br>';
	}
	showStr += file_FILE_INFO[2]+timeStr[0]+'<br>';
	showStr += file_FILE_INFO[3]+timeStr[1]+'<br>';
	showStr += file_FILE_INFO[4]+nameStr;
	document.getElementById('fileInfoShow').innerHTML = showStr;
	//显示选中信息
	showSelectInfo();
	return;
}

///////////////////////////////////////////////////////////////////////项目删除处理部分结束
/*********************************************************************/
/* Function: initDeleteList                                          */
/* Description: 初始标记记录                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-16                                 */
/*********************************************************************/
function initDeleteList()
{
	fileDeleteName = new Array();
	fileFlag = new Array();
	fileSelectTotal = 0;
	return;
}

/*********************************************************************/
/* Function: showSelectInfo                                          */
/* Description: 显示选中文件或文件夹的状态                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-16                                 */
/*********************************************************************/
function showSelectInfo()
{
	//刷新文件的选中标志
	var pos = fileIndex%ViewTotal;
	var tempSelect = (fileFlag[fileIndex])? 'url(style1/fileSelectOn.png)' : 'url(image/null.png)';
	document.getElementById('styleTip'+pos).style.backgroundImage = tempSelect;
	//刷新选中项目个数显示
	showStr = '* '+file_SELECT_INFO[0]+fileSelectTotal+file_SELECT_INFO[1]+file_SELECT_INFO[2]+fileTotal+file_SELECT_INFO[3];
	document.getElementById('tipsFileSelect').innerHTML = showStr;
	return;
}

/*********************************************************************/
/* Function: channelFlag                                             */
/* Description: 选中文件或文件夹                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-16                                 */
/*********************************************************************/
var fileSelectTotal = 0; //选中的文件夹或文件总数量
function channelFlag()
{
	if (fileFlag[fileIndex]) {
		fileFlag[fileIndex] = false;
		fileSelectTotal--;
	}
	else {
		fileFlag[fileIndex] = true;
		fileSelectTotal++;
	}
	showSelectInfo();
	return;
}

/*********************************************************************/
/* Function: channelFlagAll                                          */
/* Description: 选中或取消所有可见的文件或文件夹                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-16                                 */
/*********************************************************************/
function channelFlagAll()
{
	var begin = parseInt(fileIndex/ViewTotal)*ViewTotal;
	var end = begin+ViewTotal;
	end = (end>fileTotal)? fileTotal : end;
	var isSelect = 0;
	//获得当前页中选中的文件夹和文件的个数
	for (var i=begin; i<end; i++) {
		if (fileFlag[i]) {
			isSelect++;
		}
	}
	//设置当前页文件夹和文件的选中状态
	if (isSelect==0) {
		for (var i=begin; i<end; i++) {
			fileFlag[i] = true;
		}
		fileSelectTotal += (end-1)%ViewTotal+1;
	}
	else {
		for (var i=begin; i<end; i++) {
			fileFlag[i] = false;
		}
		fileSelectTotal -= isSelect;
	}
	//显示当前页文件夹和文件的选中状态
	showFileList();
	return;
}

/*********************************************************************/
/* Function: showDeletePrompt                                        */
/* Description: 显示删除项目的提示                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-16                                 */
/*********************************************************************/
var isDeleteAsk = false; //删除确认提问状态
function showDeletePrompt()
{
	if (fileSelectTotal==0) {
		return;
	}
	isDeleteAsk = true;
	document.getElementById('messageText').innerHTML = '<br>'+file_SELECT_INFO[0]+fileSelectTotal+file_SELECT_INFO[1]+file_DELETE_INFO[2];
	document.getElementById('divMessage').style.visibility = 'visible';
		document.getElementById('divMessageShow').style.visibility = 'visible';
	return;
}

/*********************************************************************/
/* Function: hideDeletePrompt                                        */
/* Description: 隐藏删除项目的提示                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-16                                 */
/*********************************************************************/
function hideDeletePrompt()
{
	isDeleteAsk = false;
	document.getElementById('messageText').innerHTML = '';
	document.getElementById('divMessage').style.visibility = 'hidden';
	document.getElementById('divMessageShow').style.visibility = 'hidden';
	return;
}

/*********************************************************************/
/* Function: deleteItem                                              */
/* Description: 删除标记的项目                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-16                                 */
/*********************************************************************/
var deleteIndexFinal = 0;	//记录文件标记的最后一位
function deleteItem()
{
	//删除一条标记的项目
	for (var i=0; i<fileTotal; i++) {
		if (fileFlag[i]) {
			fileFlag[i] = false;
			deleteIndexFinal = i;
			makeRequest('delete?'+fileDeleteName[i], deleteItemRequest, 1);
			return;
		}
	}
	//全部删除后的处理
	hideDeletePrompt();
	//文件夹删空的处理
	isDeleteAsk = false;
	if (fileSelectTotal==fileTotal) {
		channelBack();
		return;
	}
	fileIndex = deleteIndexFinal - fileSelectTotal;
	fileIndex = (fileIndex >= 0) ? fileIndex : 0;
	//初始标记记录
	initDeleteList();
	//显示删除后的列表
	if (isScanResultPage) {
		getFileListRequestScan();
	} else {
		getFileListRequest();
	}
	return;
}

/*********************************************************************/
/* Function: deleteItemRequest                                       */
/* Description: 重复删除标记的项目                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-16                                 */
/*********************************************************************/
function deleteItemRequest()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		deleteItem();
	}
	return;
}
///////////////////////////////////////////////////////////////////////项目删除处理部分结束



















///////////////////////////////////////////////////////////////////////排序方式选择开始
/*********************************************************************/
/* Function: showSortMenu                                            */
/* Description: 显示排序方式选择状态                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-16                                 */
/*********************************************************************/
var sortTotal = 4; //排序类型的总数
var sortIndex = 0; //排序类型的索引号
var sortType = 'name'; //排序模式
var isSortMenu = false; //排序选择模式
function showSortMenu()
{
	isSortMenu = true;
	
	document.getElementById('keyButtonTips').style.height = '22px';
	document.getElementById('keySortTextFocus').style.top = (24*sortIndex+26)+"px";
	document.getElementById('tipsInfo2').innerHTML = file_OPERATE_INFO[2]+file_OPERATE_INFO[3];
	document.getElementById('sortTextDiv').style.visibility = 'visible';
	for (var i=0; i<4; i++) {
		document.getElementById('keySortText'+i).innerHTML = file_SORT_INFO[i];
	}
	return;
}

/*********************************************************************/
/* Function: hideSortMode                                            */
/* Description: 隐藏排序方式选择状态                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-16                                 */
/*********************************************************************/
function hideSortMode()
{
	isSortMenu = false;
	
	document.getElementById('keyButtonTips').style.height = '135px';
	document.getElementById('sortTextDiv').style.visibility = 'hidden';
	document.getElementById('tipsInfo2').innerHTML = file_OPERATE_INFO[2];
	return;
}

/*********************************************************************/
/* Function: sortModeNext                                            */
/* Description: 选择下一个排序方式                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-16                                 */
/*********************************************************************/
function sortModeNext()
{
	sortIndex = (sortIndex>=sortTotal-1)? 0 : sortIndex+1;
	document.getElementById('keySortTextFocus').style.top = (24*sortIndex+26)+"px";
	return;
}

/*********************************************************************/
/* Function: sortModePrevious                                        */
/* Description: 选择上一个排序方式                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-16                                 */
/*********************************************************************/
function sortModePrevious()
{
	sortIndex = (sortIndex<=0)? sortTotal-1 : sortIndex-1;
	document.getElementById('keySortTextFocus').style.top = (24*sortIndex+26)+"px";
	return;
}

/*********************************************************************/
/* Function: sortModeSelect                                          */
/* Description: 选择一个排序方式后的处理                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-16                                 */
/*********************************************************************/
function sortModeSelect()
{
	var tempType = new Array('name', 'type', 'size', 'time');
	hideSortMode();
	if (sortType==tempType[sortIndex]) {
		return;
	}
	sortType = tempType[sortIndex];
	//初始标记记录
	initDeleteList();
	//显示排序后的列表
	fileIndex = 0;
	if (isScanResultPage) {
		getFileListSortScan();
	} else {
		getFileListRequest();
	}
	return;
}

/*********************************************************************/
/* Function: sortModeSelect                                          */
/* Description: 选择一个排序方式后的处理                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-16                                 */
/*********************************************************************/
function getFileListSortScan()
{
	makeRequest('sort?'+sortType+'|1$6', getFileList, 4);
	return;	
}

///////////////////////////////////////////////////////////////////////排序方式选择结束



