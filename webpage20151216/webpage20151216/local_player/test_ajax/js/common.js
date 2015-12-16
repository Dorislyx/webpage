///////////////////////////////////////////////////////////////////////请求处理部分开始
/*********************************************************************/
/* Function: createRequest                                           */
/* Description: 创建XMLHttpRequest对象                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-05-10                                 */
/*********************************************************************/
var httpRequest = new XMLHttpRequest(); //XMLHttpRequest对象
function createRequest()
{
	//httpRequest = new XMLHttpRequest();
	if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
	}
	else if(window.ActiveXObject) {
		httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
	}
	return;
}

/*********************************************************************/
/* Function: makeRequest                                             */
/* Description: 发送XMLHttpRequest请求                               */
/* Parameters: requestURL 请求时发送的URL                            */
/*             responseFunction 响应时的处理函数                     */
/*             isGetSystem 请求类型  0:player 1:system               */
/*                                   2:game 3:download               */
/* Author&Date: lixudong  2009-05-10                                 */
/*********************************************************************/
function makeRequest(requestURL, responseFunction, isGetSystem )
{
	var reqURL = '';
	if (isGetSystem==1) {
		reqURL = 'http://127.0.0.1/system/'+requestURL;
	}
	else if (isGetSystem==2) {
		reqURL = 'http://127.0.0.1/game/'+requestURL;
	}
	else if (isGetSystem==3) {
		reqURL = 'http://127.0.0.1/ThunderDownloader/'+requestURL;
	}
	else if (isGetSystem==4) {
		reqURL = 'http://127.0.0.1/search/'+requestURL;
	}
	else if (isGetSystem==5) {
		reqURL = 'http://127.0.0.1/image/'+requestURL;
	}
	else if (isGetSystem==6) {
		reqURL = 'http://127.0.0.1/render/'+requestURL;
	}
	else if (isGetSystem==9) {
		reqURL = requestURL;
	}
	else {
		reqURL = 'http://127.0.0.1/LocalPlayer/'+requestURL;
	}
	return(insert_into_queue(reqURL, responseFunction));
}

/*********************************************************************/
/* Function: nullFun                                                 */
/* Description: 空函数，用于无返回操作的请求                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-08-27                                 */
/*********************************************************************/
function nullFun()
{
	return;
}
///////////////////////////////////////////////////////////////////////请求处理部分结束


///////////////////////////////////////////////////////////////////////移动设备插拔提示部分开始
/*********************************************************************/
/* Function: showUSBInfo                                             */
/* Description: 移动设备插拔模拟按键处理函数                         */
/* Parameters: simulativeKey 模拟按键的键值                          */
/* Author&Date: lixudong  2009-07-23                                 */
/*********************************************************************/
function showUSBInfo(simulativeKey)
{
	if (simulativeKey>0xff34 || simulativeKey<0xff20) {
		return;
	}
	switch(simulativeKey) {
		case 0xff21: //移动设备 sda(USB1) 插入
		case 0xff22: //移动设备 sdb(USB2) 插入
		case 0xff23: //移动设备 sdc(本地硬盘) 插入
		case 0xff24: //移动设备 sdd(未知) 插入
			usbInsert(simulativeKey);
			break;
		case 0xff20: //移动设备可用(mount完成)
			usbEnable();
			break;
		case 0xff31: //移动设备 sda(USB1) 拔出
		case 0xff32: //移动设备 sdb(USB2) 拔出
		case 0xff33: //移动设备 sdc(本地硬盘) 拔出
		case 0xff34: //移动设备 sdd(未知) 拔出
			usbClear(simulativeKey);
			break;
		case 0xff30: //移动设备移除(unmount完成)
			//usbDisable();
			break;
		default:
			return (-1);
			break;
	}
	return;
}

//创建USB信息显示的容器
var popStart = 720; //弹出框的起始位置
var popEnd = 610; //弹出框的终点位置
var popAbscissa = 900; //弹出框的横坐标位置
var createDiv = "<div id='usbDiv' style='margin:0 0 0 0; position:absolute; z-index:100; ";
createDiv += "left:"+popAbscissa+"px; top:628px; width:290px; height:92px; ";
createDiv += "line-height:52px; color:#ffffff; font-size:22px; text-indent:88px; visibility:hidden; background-image:url(image/skin"+SETUP_SkinIndex+"/usbInfo.png);'></div>";
document.write(createDiv);

/*********************************************************************/
/* Function: moveDiv                                                 */
/* Description: 移动DIV的垂直位置                                    */
/* Parameters: flag 移动方向，0:向下移动 1:向上移动                  */
/* Author&Date: lixudong  2009-07-23                                 */
/*********************************************************************/
function moveDiv(flag)
{
	var pos = (flag)? popEnd : popStart;
	var step = (flag)? 12 : -12;
	var currentPos = document.getElementById('usbDiv').style.top;
	currentPos -= step;
	if ((currentPos<popEnd)||(currentPos>popStart)) {
		currentPos = pos;
		clearInterval(timerID_moveDiv);
		if (flag == 0) {
			document.getElementById('usbDiv').style.visibility = 'hidden';
			document.getElementById('usbDiv').style.top = 628+"px";
			usbVisibleStatus = false;
			return;
		}
	}
	document.getElementById('usbDiv').style.top = currentPos+"px";
	return;
}

/*********************************************************************/
/* Function: showDiv                                                 */
/* Description: 显示移动设备插拔状态                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-07-23                                 */
/*********************************************************************/
var timerID_moveDiv; //移动DIV的定时器ID
var usbVisibleStatus = false;	//usb提示显示状态
function showDiv()
{
	clearInterval(timerID_moveDiv);
	if (usbVisibleStatus == false) {
		document.getElementById('usbDiv').style.top = 720+"px";
		document.getElementById('usbDiv').style.visibility = 'visible';
		usbVisibleStatus = true;
	}
	timerID_moveDiv = setInterval('moveDiv(1)', 50);
	return;
}

/*********************************************************************/
/* Function: hideDiv                                                 */
/* Description: 隐藏移动设备插拔状态                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-07-23                                 */
/*********************************************************************/
function hideDiv()
{
	clearInterval(timerID_moveDiv);
	timerID_moveDiv = setInterval('moveDiv(0)', 50);
	return;
}

/*********************************************************************/
/* Function: usbInsert                                               */
/* Description: 移动设备插入后的状态提示                             */
/* Parameters: deviceIndex 物理接口的序号                            */
/* Author&Date: lixudong  2009-07-24/2009-10-22                      */
/*********************************************************************/
var timerID_showDiv; //显示DIV的定时器ID
var deviceStatus = 0; //移动设备状态，1~4:插入移动设备
function usbInsert(deviceIndex)
{
	var tempIndex = deviceIndex-0xff20;
	deviceStatus = tempIndex;
	document.getElementById('usbDiv').innerHTML = common_USB_INFO[0];
	showDiv();
	clearTimeout(timerID_showDiv);
	timerID_showDiv = setTimeout('hideDiv()', 4000);
	return;
}

/*********************************************************************/
/* Function: usbEnable                                               */
/* Description: 移动设备挂接结束后的状态提示                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-07-24/2009-10-22                      */
/*********************************************************************/
function usbEnable()
{
	if (deviceStatus<=0) {
		return;
	}
	refreshDeviceShow(deviceStatus);
	deviceStatus = 0;
	document.getElementById('usbDiv').innerHTML = common_USB_INFO[1];
	showDiv();
	clearTimeout(timerID_showDiv);
	timerID_showDiv = setTimeout('hideDiv()', 4000);
	return;
}

/*********************************************************************/
/* Function: refreshDeviceShow                                       */
/* Description: 刷新物理接口的请求                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-13                                 */
/*********************************************************************/
function refreshDeviceShow()
{
	if (htmlTitle=='movie' || htmlTitle=='music' || htmlTitle=='photo' || htmlTitle=='games' || htmlTitle=='files') {
		isKeyClock = true;
		if (isDoesnotItem) {
			isFormMenu = true;
		}
		else {
			isFormMenu = false;
		}
		setTimeout("makeRequest('getDrives', getDiskList, 4)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: usbClear                                                */
/* Description: 移动设备移除提示                                     */
/* Parameters: deviceIndex 物理接口的序号                            */
/* Author&Date: lixudong  2009-07-24/2009-10-22                      */
/*********************************************************************/
function usbClear(deviceIndex)
{
	var tempIndex = deviceIndex-0xff30;
	deviceStatus = tempIndex;
	document.getElementById('usbDiv').innerHTML = common_USB_INFO[2];
	showDiv();
	clearTimeout(timerID_showDiv);
	timerID_showDiv = setTimeout('hideDiv()', 3500);
	setTimeout('usbDisable()', 2000); //2009-10-27 (不处理0xff30的临时解决方法，但是不可靠)
	return;
}

/*********************************************************************/
/* Function: usbDisable                                              */
/* Description: 移动设备移除后的状态处理                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-10-22                                 */
/*********************************************************************/
var htmlTitle = ''; //网页title标签的内容，用于区分不同功能的网页
function usbDisable()
{
	if (deviceStatus==serverIndex) {
		if (htmlTitle=='movie' || htmlTitle=='music' || htmlTitle=='photo' || htmlTitle=='games' || htmlTitle=='files') {
			isKeyClock = true;
			isFormMenu = true;
			setTimeout("makeRequest('getDrives', getDiskList, 4)", 10);
		}
		else if (htmlTitle=='movieList' || htmlTitle=='musicList' || htmlTitle=='photoList' || htmlTitle=='gamesList' || htmlTitle=='filesList') {
			var tempStr = '0';
			if (htmlTitle=='movieList') {
				tempStr = '0';
			}
			else if (htmlTitle=='musicList') {
				tempStr = '1';
			}
			else if (htmlTitle=='photoList') {
				tempStr = '2';
			}
			else if (htmlTitle=='gamesList') {
				tempStr = '3';
			}
			else if (htmlTitle=='filesList') {
				tempStr = '4';
			}
			document.location.href = 'menu.html?'+tempStr;
			//setTimeout("document.location.href = 'menu.html?'+"+tempStr, 2000);
		}
	}
	else {
		setTimeout('refreshDeviceShow(deviceStatus)', 1000);
		//refreshDeviceShow(deviceStatus);
	}
	deviceStatus = 0;
	return;
}
///////////////////////////////////////////////////////////////////////移动设备插拔提示部分结束


///////////////////////////////////////////////////////////////////////公共函数部分开始
/*********************************************************************/
/* Function: clearZero                                               */
/* Description: 清除字符串前面多余的'0'字符                          */
/* Parameters: Parameter 输入的字符串                                */
/* Author&Date: lixudong  2009-05-14                                 */
/*********************************************************************/
function clearZero(inputStr)
{
	while (inputStr.substr(0, 1)=='0') {
		inputStr = inputStr.substr(1);
	}
	if (inputStr=='') {
		inputStr = '0';
	}
	return (inputStr);
}

/*********************************************************************/
/* Function: clearSpace                                              */
/* Description: 清除字符串前后多余的空格字符                         */
/* Parameters: inputStr 输入的字符串                                 */
/* Author&Date: zhaopengjun  2010-01-19                              */
/*********************************************************************/
function clearSpace(inputStr)
{
	inputStr = inputStr.replace(/(^\s*)|(\s*$)/g, '');
	return (inputStr);
}

/*********************************************************************/
/* Function: doubleDigit                                             */
/* Description: 把数字或数字字符转换为两位显示                       */
/* Parameters: Parameter 输入值                                      */
/* Author&Date: lixudong  2009-05-14                                 */
/*********************************************************************/
function doubleDigit(parameter)
{
	var temp = parseInt(parameter);
	var tempStr = (temp<=9)? ('0'+temp) : temp;
	return (tempStr);
}

/*********************************************************************/
/* Function: changeCompartStr                                        */
/* Description: 转换字符串的分隔符，把sourceStr转换为targetStr       */
/* Parameters: changeStr 需要转换的字符串                            */
/*             sourceStr 转换前的分隔符                              */
/*             targetStr 转换后的分隔符                              */
/* Author&Date: lixudong  2009-06-01                                 */
/*********************************************************************/
function changeCompartStr(changeStr, sourceStr, targetStr)
{
	var parameter = changeStr.split(sourceStr);
	var len = parameter.length;
	var tempStr = '';
	for (i=0; i<len; i++) {
		tempStr += parameter[i]+targetStr;
	}
	len = tempStr.length;
	tempStr = tempStr.substring(0, len-1);
	return (tempStr);
}

/*********************************************************************/
/* Function: changeDataUnitExt                                       */
/* Description: 将字节(B)自动转换为TB, GB, MB, KB, B；带一位小数     */
/* Parameters: parameter 输入的数值                                  */
/* Author&Date: lixudong  2009-11-12                                 */
/*********************************************************************/
function changeDataUnitExt(parameter)
{
	var unit = 1000;
	var tempValue = parseFloat(parameter);
	tempValue = (isNaN(tempValue))? 0 : tempValue;
	if (tempValue>=unit*unit*unit*unit) {
		tempValue = parseInt(tempValue/unit/unit/unit/unit*10)/10+'TB';
	}
	else if (tempValue>=unit*unit*unit) {
		tempValue = parseInt(tempValue/unit/unit/unit*10)/10+'GB';
	}
	else if (tempValue>=unit*unit) {
		tempValue = parseInt(tempValue/unit/unit*10)/10+'MB';
	}
	else if (tempValue>=unit) {
		tempValue = parseInt(tempValue/unit*10)/10+'KB';
	}
	else {
		tempValue = parseInt(tempValue)+'B';
	}
	return (tempValue);
}

/*********************************************************************/
/* Function: changeDataUnit                                          */
/* Description: 将字节(B)自动转换为TB, GB, MB, KB, B                 */
/* Parameters: parameter 输入的数值                                  */
/* Author&Date: lixudong  2010-04-07                                 */
/*********************************************************************/
function changeDataUnit(parameter)
{
	var unit = 1000;
	var tempValue = parseFloat(parameter);
	tempValue = (isNaN(tempValue))? 0 : tempValue;
	if (tempValue>=unit*unit*unit*unit) {
		tempValue = parseInt(tempValue/unit/unit/unit/unit)+'TB';
	}
	else if (tempValue>=unit*unit*unit) {
		tempValue = parseInt(tempValue/unit/unit/unit)+'GB';
	}
	else if (tempValue>=unit*unit) {
		tempValue = parseInt(tempValue/unit/unit)+'MB';
	}
	else if (tempValue>=unit) {
		tempValue = parseInt(tempValue/unit)+'KB';
	}
	else {
		tempValue = parseInt(tempValue)+'B';
	}
	return (tempValue);
}

/*********************************************************************/
/* Function: changeTimeFormat                                        */
/* Description: 转换时间格式，yyyy-mm-dd hh:mm:ss                    */
/* Parameters: parameter 输入的时间字符串(Sun Aug 30 13:09:52 2009)  */
/* Author&Date: lixudong  2009-08-30                                 */
/*********************************************************************/
function changeTimeFormat(parameter)
{
	var timeStr = parameter.split(' ');
	var monthStr = 'JanFebMarAprMayJunJulAugSepOctNovDec';
	var monthVol = doubleDigit(monthStr.indexOf(timeStr[1])/3+1);
	var dateStr = timeStr[4]+'-'+monthVol+'-'+doubleDigit(timeStr[2]);
	var tempStr = new Array(); //文件夹的类型
	tempStr[0] = dateStr;
	tempStr[1] = timeStr[3];
	return (tempStr);
}
///////////////////////////////////////////////////////////////////////公共函数部分结束