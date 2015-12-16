///////////////////////////////////////////////////////////////////////书签处理部分开始
var isSeleceBookMark = false; //书签选择状态
var isSetupBookMark = false; //书签设置状态
var isReplayBookMark = false; //书签再调用状态
var getBookMarkTime = ''; //获得的书签时间(串型，格式为hhmmss)
var setBookMarkTime = 0; //设置的书签时间(整形，单位为秒)
var timerID_bookMarkSelect; //定时器ID，选择书签播放提示的控制
var timerID_noBookMark; //定时器ID，没有或无效书签提示的控制
/*********************************************************************/
/* Function: requestBookMark                                         */
/* Description: 发送获得书签的请求(全屏播放后自动调用)               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function requestBookMark()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		setTimeout("makeRequest('bookMark?1|000000|'+fileRealName[fileIndex%8]+'|-1', getBookMark, 0)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: getBookMark                                             */
/* Description: 获得书签，显示确认信息                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function getBookMark()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		isKeyClock = false;
		setTimeout("makeRequest('volume?2', getVolumeStatus, 0)", 10);
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		//没有书签的处理
		if(getStatus==0) {
			if (isReplayBookMark) {
				showNoBookMark();
			}
			return;
		}
		//有书签的处理
		var parameter = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue.split('|');
		if(parameter[0]=='000000'){
			if (isReplayBookMark) {
				showNoBookMark();
			}
		}
		else {
			getBookMarkTime = parameter[0];
			showBookMark(getBookMarkTime);
		}
	}
	return;
}

/*********************************************************************/
/* Function: showBookMark                                            */
/* Description: 显示书签播放的确认信息                               */
/* Parameters: parameter 串型格式的时间(hhmmss)                      */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function showBookMark(parameter)
{
	if (parameter=='') {
		return;
	}
	clearTimeout(timerID_bookMarkSelect);
	isSeleceBookMark = true;
	var showStr = parameter.substring(0,2)+':'+parameter.substring(2,4)+':'+parameter.substring(4,6);
	showStr = movie_BOOK_MARK[0]+showStr+movie_BOOK_MARK[1];
	document.getElementById('divBookMarkText').style.backgroundImage = 'url(image/'+SETUP_Language+'/selectBar3.png)';

	document.getElementById('divBookMarkText').innerHTML = showStr;
	document.getElementById('divBookMark').style.visibility = 'visible';

	timerID_bookMarkSelect = setTimeout('hideBookMark()', 10000);
	return;
}

/*********************************************************************/
/* Function: hideBookMarkResponse                                    */
/* Description: 隐藏书签提示信息的                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function hideBookMarkResponse()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		hideBookMark();
	}
	return;
}

/*********************************************************************/
/* Function: hideBookMark                                            */
/* Description: 隐藏书签提示信息的                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function hideBookMark()
{
	isSeleceBookMark = false;
	isSetupBookMark = false;
	isReplayBookMark = false;
	clearTimeout(timerID_bookMarkSelect);
	document.getElementById('divBookMark').style.visibility = 'hidden';
	document.getElementById('divBookMarkText').innerHTML = '';
	return;
}

/*********************************************************************/
/* Function: bookMarkPlay                                            */
/* Description: 书签播放，即seek到书签指定的时间点开始播放           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function bookMarkPlay()
{			
	if (!isSeleceBookMark) {
		return;
	}
	isSeleceBookMark = false;
	var hh = parseInt(getBookMarkTime.substring(0,2),10);
	var mm = parseInt(getBookMarkTime.substring(2,4),10);
	var ss = parseInt(getBookMarkTime.substring(4,6),10);
	var tempStr = (hh*3600+mm*60+ss)*1000;
	setTimeout("makeRequest('seek?"+tempStr+"', hideBookMarkResponse, 0)", 10);
	return;
}

/*********************************************************************/
/* Function: saveBookMark                                            */
/* Description: 存储书签，即存储当前播放的时间点                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function saveBookMark()
{
	var hh = doubleDigit(parseInt(setBookMarkTime/3600));
	var mm = doubleDigit(parseInt((setBookMarkTime%3600)/60));
	var ss = doubleDigit(setBookMarkTime%60);
	var timeStr = ''+hh+mm+ss;
	var tempStr = timeStr+'|'+fileRealName[fileIndex%8]+'|-1';
	isSeleceBookMark = false;
	isSetupBookMark = false;
	setTimeout("makeRequest('bookMark?0|"+tempStr+"', hideBookMarkResponse, 0)", 10);
	return;
}

/*********************************************************************/
/* Function: setupBookMarkRequest                                    */
/* Description: 设置书签的请求                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function setupBookMarkRequest()
{
	if (!isFullScreen || streamStatus!=1) {
		return;
	}
	if (isSeleceBookMark || isSetupBookMark || isReplayBookMark) {
		return;
	}
	hideAllInfo();
	setTimeout("makeRequest('timing', getSetupTime, 0)", 10);
	return;
}

/*********************************************************************/
/* Function: getSetupTime                                            */
/* Description: 获得当前时间                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function getSetupTime()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if(getStatus==0){
			setBookMarkTime = 0;
		}
		else {
			setBookMarkTime = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue;
		}
		setupBookMark();
	}
	return;
}

/*********************************************************************/
/* Function: setupBookMark                                           */
/* Description: 设置书签，提示是否要存储书签                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function setupBookMark()
{
	if (setBookMarkTime<=0) {
		document.getElementById('fileError').innerHTML = movie_BOOK_MARK[2];
		document.getElementById('fileError').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/pSelect.png)';
		document.getElementById('fileError').style.visibility = 'visible';
		clearTimeout(timerID_noBookMark);
		timerID_noBookMark = setTimeout('hideNoBookMark()', 3000);
		return;
	}
	else {
		var hh = doubleDigit(parseInt(setBookMarkTime/3600));
		var mm = doubleDigit(parseInt((setBookMarkTime%3600)/60));
		var ss = doubleDigit(setBookMarkTime%60);
		var timeStr = ''+hh+':'+mm+':'+ss;
		var showStr = movie_BOOK_MARK[3]+timeStr+movie_BOOK_MARK[4];
		//document.getElementById('divBookMarkText').style.backgroundImage = 'url(image/pSelect.png)';

		document.getElementById('divBookMarkText').style.backgroundImage = 'url(image/'+SETUP_Language+'/selectBar2.png)';

		document.getElementById('divBookMarkText').innerHTML = showStr;
		document.getElementById('divBookMark').style.visibility = 'visible';
		isSetupBookMark = true;
		timerID_bookMarkSelect = setTimeout('hideBookMark()', 10000);
	}
	return;
}

/*********************************************************************/
/* Function: replayBookMark                                          */
/* Description: 发送获得书签的请求(全屏播放后按键调用)               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function replayBookMark()
{
	if (!isFullScreen || streamStatus!=1) {
		return;
	}
	if (isSeleceBookMark || isSetupBookMark || isReplayBookMark) {
		return;
	}
	hideAllInfo();
	isReplayBookMark = true;
	setTimeout("makeRequest('bookMark?1|000000|'+fileRealName[fileIndex%8]+'|-1', getBookMark, 0)", 10);
	return;
}

/*********************************************************************/
/* Function: showNoBookMark                                          */
/* Description: 显示书签未设置的提示信息                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function showNoBookMark()
{
	document.getElementById('fileError').innerHTML = movie_BOOK_MARK[5];
	document.getElementById('fileError').style.backgroundImage = 'url(style1/skin'+SETUP_SkinIndex+'/pSelect.png)';
	document.getElementById('fileError').style.visibility = 'visible';
	clearTimeout(timerID_noBookMark);
	timerID_noBookMark = setTimeout('hideNoBookMark()', 3000);
	return;
}

/*********************************************************************/
/* Function: hideNoBookMark                                          */
/* Description: 隐藏书签未设置的提示信息                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function hideNoBookMark()
{
	clearTimeout(timerID_noBookMark);
	isReplayBookMark = false;
	document.getElementById('fileError').style.visibility = 'hidden';
	document.getElementById('fileError').innerHTML = '';
	return;
}
///////////////////////////////////////////////////////////////////////书签处理部分结束


///////////////////////////////////////////////////////////////////////段处理部分开始
/*********************************************************************/
/* Function: segmentNextPlay                                         */
/* Description: 全屏播放时，选择下一段                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function segmentNextPlay()
{
	setTimeout("makeRequest('part?1', showSegmentInfo, 0)", 10);
	return;
}

/*********************************************************************/
/* Function: segmentPreviousPlay                                     */
/* Description: 全屏播放时，选择前一段                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function segmentPreviousPlay()
{
	setTimeout("makeRequest('part?0', showSegmentInfo, 0)", 10);
	return;
}

/*********************************************************************/
/* Function: segmentAutoPlay                                         */
/* Description: 自动跨段播放时的处理                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function segmentAutoPlay()
{
	setTimeout("makeRequest('part?4', showSegmentInfo, 0)", 10);
	return;
}

/*********************************************************************/
/* Function: showSegmentInfo                                         */
/* Description: 全屏播放时，按选段键后的屏幕提示                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function showSegmentInfo()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		isKeyClock = false;
		subtitleIndex = 0;
		subtitleFirstGet = true;
		var parameter;
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==0) {
			parameter = -1;
		}
		else {
			parameter = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue.split('|');
			parameter[1] = parseInt(parameter[1]);
			parameter[2] = parseInt(parameter[2]);
		}
		showSetupInfo(1, parameter);
	}
	return;
}
///////////////////////////////////////////////////////////////////////段处理部分结束

///////////////////////////////////////////////////////////////////////音轨操作部分开始
/*********************************************************************/
/* Function: changeTrack                                             */
/* Description: 切换音轨                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function changeTrack()
{
	if (isAllInfoShow) {
		hideAllInfo();
	}
	setTimeout("makeRequest('track?0', getTrackInfo, 0)", 10);
	return;
}

/*********************************************************************/
/* Function: getTrackInfo                                            */
/* Description: 获得音轨信息                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
var trackIndex = 0; //当前音轨序号，从0开始
var trackTotal = 0; //音轨总数量
var trackType = new Array(); //音轨类型信息
var trackLang = new Array(); //音轨语言信息
function getTrackInfo()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		//返回错误时的处理
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==0) {
			showSetupInfo(2, -1);
			return;
		}
		//获得音轨数据
		trackIndex = httpRequest.responseXML.getElementsByTagName('curTrack').item(0).childNodes[0].nodeValue;
		trackIndex = parseInt(trackIndex);
		var responseXMLHead = httpRequest.responseXML.getElementsByTagName('track');
		trackTotal = responseXMLHead.length;
		for (var i=0; i<trackTotal; i++) {
			var param = responseXMLHead.item(i).childNodes[0].nodeValue.split('|');
			trackType[i] = param[1];
			trackLang[i] = param[2];
		}
		//切换到下一个音轨
		if (trackTotal!=0) {
			trackIndex = (trackIndex>=(trackTotal-1))? 0 : trackIndex+1;
			setTimeout("makeRequest('track?1|'+trackIndex, getTrackInfoEnd, 0)", 10);
		}
		else {
			showSetupInfo(2, -1);
		}
	}
	return;
}

/*********************************************************************/
/* Function: getTrackInfoEnd                                         */
/* Description: 切换音轨后的信息提示控制                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function getTrackInfoEnd()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus!=0) {
			showSetupInfo(2, 0);
		}
	}
	return;
}
///////////////////////////////////////////////////////////////////////音轨操作部分结束


///////////////////////////////////////////////////////////////////////声道操作部分开始
/*********************************************************************/
/* Function: changeAudioChannel                                      */
/* Description: 切换声道                                              */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-04-15                              */
/*********************************************************************/
function changeAudioChannel()
{
	if (isAllInfoShow) {
		hideAllInfo();
	}
	setTimeout("makeRequest('channel?0', getAudioChannelInfo)", 10);
	return;
}

/*********************************************************************/
/* Function: getAudioChannelInfo                                     */
/* Description: 获得声道信息                                           */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-04-15                              */
/*********************************************************************/
var currentChannel = 0; //当前声道序号，从0开始
var channelTotal = 3; //声道总数量
var channelInfo1 = new Array('stereo', 'left', 'right'); //音轨格式信息
var setChannelStr = 'stereo'; //音轨语言信息
function getAudioChannelInfo()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==0) {
			showSetupInfo(5, -1);
			return;
		}
		var tempStr = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue;
		switch(tempStr) {
			case 'stereo':
				currentChannel = 0;
				break;
			case 'left':
				currentChannel = 1;
				break;
			case 'right':
				currentChannel = 2;
				break;
			default:
			return (-1);
				break;
		}
		currentChannel++;
		currentChannel = currentChannel>=channelTotal ? 0 : currentChannel;
		setChannelStr = channelInfo1[currentChannel];
		setTimeout("makeRequest('channel?1|'+setChannelStr, getChannelInfoEnd)", 10);
	}
	return;
}

/*********************************************************************/
/* Function: getChannelInfoEnd                                       */
/* Description: 获得声道信息后显示提示                                  */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-04-15                              */
/*********************************************************************/
function getChannelInfoEnd()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		showSetupInfo(5, 0);
	}
	return;
}
///////////////////////////////////////////////////////////////////////声道操作部分结束


///////////////////////////////////////////////////////////////////////字幕操作部分开始
/*********************************************************************/
/* Function: changeSubtitle                                          */
/* Description: 切换字幕                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function changeSubtitle()
{
	if (isAllInfoShow) {
		hideAllInfo();
	}
	setTimeout("makeRequest('subtitle?0|'+fileRealName[fileIndex%8], getSubtitleInfo, 0)", 10);
	return;
}

/*********************************************************************/
/* Function: getSubtitleInfo                                         */
/* Description: 获得字幕信息                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
var subtitleIndex = 0; //当前字幕序号，从0开始
var subtitleTotal = 0; //字幕总数量
var subtitleFirstGet = true;	//记录是否第一次获得字幕
var subtitleFile = new Array(); //字幕文件的URL音轨信息
function getSubtitleInfo()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		//获得字幕信息
		var responseXMLHead = httpRequest.responseXML.getElementsByTagName('subtitle');
		subtitleTotal = responseXMLHead.length;
		for (var i=0; i<subtitleTotal; i++) {
			var tempStr = responseXMLHead.item(i).childNodes[0].nodeValue;
			subtitleFile[i] = tempStr;
		}
		if (subtitleFirstGet) {
			var subtitleFirstStr = httpRequest.responseXML.getElementsByTagName('first').item(0).childNodes[0].nodeValue;
			if (subtitleFirstStr>0 && subtitleFirstStr<=subtitleTotal) {
				subtitleIndex = parseInt(subtitleFirstStr)-1;
			} else {
				subtitleIndex = 0;
			}
			subtitleFirstGet = false;
		}
		//切换到下一个字幕
		if (subtitleTotal!=0) {
			subtitleIndex = (subtitleIndex>=subtitleTotal-1)? 0 : subtitleIndex+1;
			setTimeout("makeRequest('subtitle?1|'+subtitleFile[subtitleIndex], getSubtitleInfoEnd, 0)", 10);
		}
		else{
			showSetupInfo(3, -1);
		}
	}
	return;
}

/*********************************************************************/
/* Function: getSubtitleInfoEnd                                      */
/* Description: 获得字幕信息后的显示操作                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function getSubtitleInfoEnd()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus!=0) {
			showSetupInfo(3, 0);
		}
	}
	return;
}
///////////////////////////////////////////////////////////////////////字幕操作部分结束


///////////////////////////////////////////////////////////////////////制式操作部分开始
/*********************************************************************/
/* Function: changeTVSystem                                          */
/* Description: 切换制式请求，制式切换的入口函数                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function changeTVSystem()
{
	if (isAllInfoShow) {
		hideAllInfo();
	}
	setTimeout("makeRequest('TVSystem?0|', getTVSystem, 0)", 10);
	return;
}

/*********************************************************************/
/* Function: getTVSystem                                             */
/* Description: 获得制式信息，制式切换的操作函数                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
var currentTVSystem; //当前的输出制式
var currentTVSystemSD; //当前输出标清制式(辅助)
function getTVSystem()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		//请求失败的处理
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==0) {
			return;
		}
		//获得制式数据
		var responseXMLHead = httpRequest.responseXML.getElementsByTagName('result');
		var parame = responseXMLHead.item(0).childNodes[0].nodeValue.split("|");
		currentTVSystem = parame[0];
		//切换到下一种制式
		currentTVSystem++;
		if (currentTVSystem>=9) {
			currentTVSystem = 0;
		}
		if (currentTVSystem==2) {
			currentTVSystem = 3;
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
		setTimeout("makeRequest('TVSystem?1|'+currentTVSystem+'|'+currentTVSystemSD, getTVSystemEnd, 0)", 10);
	}
}

/*********************************************************************/
/* Function: getTVSystemEnd                                          */
/* Description: 制式切换后的显示操作                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function getTVSystemEnd()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus!=0) {
			showSetupInfo(4, 0);
		}
	}
	return;
}
///////////////////////////////////////////////////////////////////////制式操作部分结束


///////////////////////////////////////////////////////////////////////状态条显示处理部分开始
/*********************************************************************/
/* Function: showSetupInfo                                           */
/* Description: 选择提示内容                                         */
/* Parameters: operate 操作类型，1:段操作 2:音轨 3:字幕 4:制式       */
/* Parameters: parameter 是否为分段视频  是否有音轨  是否有字幕      */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
var timerID_segmentSelect; //定时器ID，选段提示信息的控制
function showSetupInfo(operate, parameter)
{
	clearTimeout(timerID_segmentSelect);
	var showStr = '';
	//分段信息
	if (operate==1) {
		if (parameter==-1) {
			showStr = movie_OPERATE[0];
		}
		else {
			showStr = movie_OPERATE[1]+parameter[1]+movie_OPERATE[4]+parameter[2]+movie_OPERATE[5]+parameter[0];
		}
	}
	//音轨信息
	else if (operate==2) {
		if (parameter==-1) {
			showStr = movie_OPERATE[2]+movie_OPERATE[9];
		}
		else {
			showStr = movie_OPERATE[2]+(trackIndex+1)+movie_OPERATE[4]+trackTotal+movie_OPERATE[5]+movie_OPERATE[6]+trackType[trackIndex]+movie_OPERATE[7]+trackLang[trackIndex];
		}
	}
	//字幕信息
	else if (operate==3) {
		if (parameter==-1) {
			showStr = movie_OPERATE[3]+movie_OPERATE[9];
		}
		else {
			showStr = movie_OPERATE[3]+(subtitleIndex+1)+movie_OPERATE[4]+subtitleTotal+movie_OPERATE[5];
		}
	}
	//制式信息
	else if (operate==4) {
		var tvSystemStr = '';
		if (currentTVSystem==0) {
			tvSystemStr = 'NTSC';
		}
		else if (currentTVSystem==1) {
			tvSystemStr = 'PAL';
		}
		else if (currentTVSystem==3) {
			tvSystemStr = '480p';
		}
		else if (currentTVSystem==4) {
			tvSystemStr = '576p';
		}
		else if (currentTVSystem==5) {
			tvSystemStr = '720p/50Hz';
		}
		else if (currentTVSystem==6) {
			tvSystemStr = '720p/60Hz';
		}
		else if (currentTVSystem==7) {
			tvSystemStr = '1080i/50Hz';
		}
		else if (currentTVSystem==8) {
			tvSystemStr = '1080i/60Hz';
		}
		else {
			tvSystemStr = movie_OPERATE[10];
		}
		showStr = movie_OPERATE[8]+tvSystemStr;
	}
	else if (operate==5) {
		if (parameter==-1) {
			showStr = movie_OPERATE[0];
		}
		else {
			showStr = movie_AUDIO_CHANNEL[0]+movie_AUDIO_CHANNEL[currentChannel+1];
		}
	}
	else {
		return;
	}
	//信息显示
	document.getElementById('setupInfo').innerHTML = showStr;
	document.getElementById('divSetupInfo').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/setupInfo.png)';
	document.getElementById('divSetupInfo').style.visibility = 'visible';
	timerID_segmentSelect = setTimeout('hideSetupInfo()', 4000);
	return;
}

/*********************************************************************/
/* Function: hideSetupInfo                                           */
/* Description: 隐藏divSetupInfo容器                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-23                                 */
/*********************************************************************/
function hideSetupInfo()
{
	clearTimeout(timerID_segmentSelect);
	document.getElementById('divSetupInfo').style.visibility = 'hidden';
	document.getElementById('setupInfo').innerHTML = '';
	return;
}
///////////////////////////////////////////////////////////////////////状态条显示处理部分结束


///////////////////////////////////////////////////////////////////////进度条处理部分开始
/*********************************************************************/
/* Function: showProcess                                             */
/* Description: 显示进度条的入口函数                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-24                                 */
/*********************************************************************/
var timerID_playProcess; //循环定时器ID，视频播放的进度条处理
var timerID_showProcess; //定时器ID，显示视频播放的进度条
var timerID_ProcessShow; //选时定时器
var isPlayProcessShow = false; //显示视频播放的进度条的状态
function showProcess()
{
	hideVolume();
	if (isPlayProcessShow) {
		return;
	}
	clearInterval(timerID_playProcess);
	clearTimeout(timerID_showProcess);
	isPlayProcessShow = true;
	getCurrentTimeRequest();
	document.getElementById('playProcessBg').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/playProcess.png)';
	setTimeout("document.getElementById('divPlayProcess').style.visibility = 'visible'", 100);
	timerID_playProcess = setInterval('getCurrentTimeRequest()', 1000);
	timerID_showProcess = setTimeout('hideProcess()', 3000);
	return;
}

/*********************************************************************/
/* Function: hideProcess                                             */
/* Description: 隐藏进度条函数                                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-24                                 */
/*********************************************************************/
function hideProcess()
{
	if (streamStatus==3 || streamStatus==4) {
		if (!isAllInfoShow) {
			return;
		}
	}
	clearInterval(timerID_playProcess);
	clearTimeout(timerID_showProcess);
	isPlayProcessShow = false;
	document.getElementById('divPlayProcess').style.visibility = 'hidden';
	return;
}

/*********************************************************************/
/* Function: getCurrentTimeRequest                                   */
/* Description: 发送获得当前时间和总时间的请求                       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-24                                 */
/*********************************************************************/
function getCurrentTimeRequest()
{
	setTimeout("makeRequest('timeall', getCurrentTime, 0)", 10);
	return;
}

/*********************************************************************/
/* Function: getCurrentTime                                          */
/* Description: 获得视频文件的当前时间                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-24                                 */
/*********************************************************************/
var totalTime = 0; //视频文件的总时间
var currentTime = 0; //视频文件的当前时间
function getCurrentTime()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==0) {
			isPlayProcessShow = false;
			return;
		}
		var parameter = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue.split('|');
		currentTime = parseInt(parameter[0], 10);
		totalTime = parseInt(parameter[1], 10);
		showProcessInfo();
	}
	return;
}

/*********************************************************************/
/* Function: showProcessInfo                                         */
/* Description: 显示进度条相关的信息，包括进度条长度、播放时间       */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-24                                 */
/*********************************************************************/
function showProcessInfo()
{
	currentTime = (currentTime>totalTime)? 0 : currentTime;
	var len = (totalTime==0||currentTime==0)? 1 : parseInt(480*currentTime/totalTime);
	len = (len>480)? 480 : len;
	len = (len<1)? 1 : len;
	var hh = doubleDigit(parseInt(currentTime/3600));
	var mm = doubleDigit(parseInt((currentTime%3600)/60));
	var ss = doubleDigit(currentTime%60);
	var currentTimeStr = ''+hh+':'+mm+':'+ss;
	hh = doubleDigit(parseInt(totalTime/3600));
	mm = doubleDigit(parseInt((totalTime%3600)/60));
	ss = doubleDigit(totalTime%60);
	var totalTimeStr = ''+hh+':'+mm+':'+ss;
	var timeStr = currentTimeStr+'/'+totalTimeStr;
	document.getElementById('processBar').style.width = ''+len+'px';
	document.getElementById('seekBar').style.left = (-52+len)+'px';
	document.getElementById('streamTime').innerHTML = timeStr;
	if (isSeekInput && !isSeekInputOk) {
		var tempTime = (isSeekSelect)? currentTimeSeek : currentTime;
		showSeekBar(currentTime);
		isSeekInputOk = true;
		document.getElementById('seekTime'+seekInputPos).style.color = '#0000ff';
	}
	//document.getElementById('divPlayProcess').style.visibility = 'visible';
	return;
}
///////////////////////////////////////////////////////////////////////进度条处理部分结束


///////////////////////////////////////////////////////////////////////信息窗显示部分开始
/*********************************************************************/
/* Function: showAllInfo                                             */
/* Description: 显示信息窗的入口函数，发送获得Codec的请求            */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-24                                 */
/*********************************************************************/
function showAllInfo()
{
	setTimeout("makeRequest('getInfo?'+fileRealName[fileIndex%8]+'|', getAllCodec, 0)", 10);
	return;
}

/*********************************************************************/
/* Function: getAllCodec                                             */
/* Description: 获得Codec信息                                        */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-24                                 */
/*********************************************************************/
var isAllInfoShow = false; //信息窗显示状态
var timerID_allInfo = 0; //定时器ID，信息窗显示控制
var timerID_allInfoRe; //定时器ID，信息窗刷新显示控制
function getAllCodec()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==0) {
			isAllInfoShow = false;
			return;
		}
		var responseXMLHead = httpRequest.responseXML.getElementsByTagName('result');
		var tempStr = responseXMLHead.item(0).childNodes[0].nodeValue.split('|');
		currentTVSystem = parseInt(tempStr[6]); //当前的输出制式
		currentTVSystemSD = parseInt(tempStr[7]); //当前输出标清制式(辅助)
		isMuteStatus = parseInt(tempStr[8]); //记录静音状态
		volumeLevel = parseInt(tempStr[9]); //音量值
		volumeLevel = (volumeLevel%5 == 0) ? volumeLevel : (5+volumeLevel-volumeLevel%5);
		trackIndex = parseInt(tempStr[10]); //当前音轨序号，从0开始
		trackType[trackIndex] = tempStr[11]; //音轨格式信息
		trackLang[trackIndex] = tempStr[12]; //音轨语言信息
		trackTotal = parseInt(tempStr[13]); //音轨总数量
		var subInfo = tempStr[14].split('/');	//拆分字幕
		subtitleTotal = parseInt(subInfo[1]); //字幕总数
		if (subtitleFirstGet) {
			if (parseInt(subInfo[0])>0 && subtitleTotal>=parseInt(subInfo[0])) {
				subtitleIndex = parseInt(subInfo[0]) - 1;
				subtitleFirstGet = false;
			}
		}
		currentTime = parseInt(tempStr[15]); //视频文件的当前时间
		totalTime = parseInt(tempStr[16]); //视频文件的总时间
		var infoStr = new Array(tempStr[0], tempStr[1], tempStr[2], tempStr[3], tempStr[4], tempStr[5], tempStr[18], tempStr[19], tempStr[20]);
		showAllInfoAction(infoStr);
	}
	return;
}

/*********************************************************************/
/* Function: showAllInfoAction                                       */
/* Description: 显示信息窗的内容                                     */
/* Parameters: info 当前文件的相关信息                               */
/* Author&Date: lixudong  2009-11-24                                 */
/*********************************************************************/
function showAllInfoAction(info)
{
	if (isReplayBookMark) {
		hideNoBookMark();
	}
	hidePlayerIcon();
	//处理码流信息的数据
	var parameter = fileIndex%8;
	var sizeStr = changeDataUnit(info[7]);
	//var timeStr = changeTimeFormat(movieTime[parameter]);
	if (typeof(info[2])=='undefined') {
		info[2] = movie_OPERATE[10];
	}
	if (typeof(info[3])=='undefined') {
		info[3] = movie_OPERATE[10];
	}
	if (isNaN(info[4])) {
		info[4] = movie_OPERATE[10];
	}
	if (typeof(info[5])=='undefined') {
		info[5] = movie_OPERATE[10];
	}
	var hh = doubleDigit(parseInt(totalTime/3600));
	var mm = doubleDigit(parseInt((totalTime%3600)/60));
	var ss = doubleDigit(totalTime%60);
	var totalTimeStr = ''+hh+':'+mm+':'+ss;
	hh = doubleDigit(parseInt(currentTime/3600));
	mm = doubleDigit(parseInt((currentTime%3600)/60));
	ss = doubleDigit(currentTime%60);
	var currentTimeStr = ''+hh+':'+mm+':'+ss;

	var showStr_volume = movie_VOLUME[0]+volumeLevel;
	if (isMuteStatus==1) {
		showStr_volume += movie_VOLUME[1];
	}
	else {
		showStr_volume += movie_VOLUME[2];
	}
	if (trackTotal==0) {
		var showStr_tack = movie_OPERATE[2]+movie_OPERATE[9];
	}
	else {
		showStr_tack = movie_OPERATE[2]+(trackIndex+1)+movie_OPERATE[4]+trackTotal+movie_OPERATE[5]+movie_OPERATE[6]+trackType[trackIndex]+movie_OPERATE[7]+trackLang[trackIndex];
	}
	if (subtitleTotal==0) {
		var showStr_subtitle = movie_OPERATE[3]+movie_OPERATE[9];
	}
	else {
		showStr_subtitle = movie_OPERATE[3]+(subtitleIndex+1)+movie_OPERATE[4]+subtitleTotal+movie_OPERATE[5];
	}



	var tvSystemStr = '';
	if (currentTVSystem==0) {
		tvSystemStr = 'NTSC';
	}
	else if (currentTVSystem==1) {
		tvSystemStr = 'PAL';
	}
	else if (currentTVSystem==3) {
		tvSystemStr = '480p';
	}
	else if (currentTVSystem==4) {
		tvSystemStr = '576p';
	}
	else if (currentTVSystem==5) {
		tvSystemStr = '720p/50Hz';
	}
	else if (currentTVSystem==6) {
		tvSystemStr = '720p/60Hz';
	}
	else if (currentTVSystem==7) {
		tvSystemStr = '1080i/50Hz';
	}
	else if (currentTVSystem==8) {
		tvSystemStr = '1080i/60Hz';
	}
	else {
		tvSystemStr = movie_OPERATE[10];
	}
	tvSystemStr = movie_OPERATE[8]+tvSystemStr;
	switch(info[8]) {
		case 'stereo':
			currentChannel = 0;
			break;
		case 'left':
			currentChannel = 1;
			break;
		case 'right':
			currentChannel = 2;
			break;
		default:
			//return (-1);
			break;
	}
	
	//显示码流信息
	var showStr = '';
	showStr += movie_STREAM[0]+fileExtend[parameter]+movie_STREAM[1]+sizeStr+'<br>';
	showStr += movie_STREAM[2]+currentTimeStr+movie_STREAM[3]+totalTimeStr+'<br>';
	showStr += movie_STREAM[5]+info[2]+movie_STREAM[6]+info[5]+'<br>';
	showStr += movie_STREAM[7]+info[3]+movie_STREAM[8]+info[4]+'<br>';
	showStr += tvSystemStr+'&nbsp;&nbsp;&nbsp;'+showStr_subtitle+'<br>';
	showStr += movie_STREAM[9]+info[2]+movie_STREAM[10]+info[1]+'<br>';
	showStr += showStr_tack+'<br>';
	showStr += showStr_volume+'<br>';
	showStr += movie_AUDIO_CHANNEL[0]+movie_AUDIO_CHANNEL[currentChannel+1]+'<br>';
	showStr += movie_STREAM[4]+info[6];
	document.getElementById('allInfo').innerHTML = showStr;
	if (isAllInfoShow) {
		document.getElementById('allInfoText').style.backgroundImage = 'url(image/'+SETUP_Language+'/allInfoText.png)';
		document.getElementById('divAllInfo').style.visibility = 'visible';
	}
	//循环请求控制
	clearTimeout(timerID_allInfoRe);
	timerID_allInfoRe = setTimeout('showAllInfo()', 1000);
	//显示时间控制
	timerID_allInfo++;
	if (timerID_allInfo>=15) {
		//hideAllInfo();
	}
   	return;
}

/*********************************************************************/
/* Function: hideAllInfo                                             */
/* Description: 隐藏信息窗                                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-24                                 */
/*********************************************************************/
function hideAllInfo()
{
	timerID_allInfo = 0;
	clearTimeout(timerID_allInfoRe);
	isAllInfoShow = false;
	document.getElementById('divAllInfo').style.visibility = 'hidden';
	return;
}
///////////////////////////////////////////////////////////////////////信息窗显示部分结束


///////////////////////////////////////////////////////////////////////播放状态控制部分开始
/*********************************************************************/
/* Function: playerForward                                           */
/* Description: 快进操作                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function playerForward()
{
	if (!isFullScreen || serverIndex==3 || streamStatus==0) {
	//if (!isFullScreen || streamStatus==0) {
		return;
	}
	if (isSeleceBookMark || isSetupBookMark || isReplayBookMark) {
		return;
	}
	var tempSpeed = (streamStatus==4||streamFastSpeed>=64)? 2 : streamFastSpeed*2;
	var requestStatus = makeRequest('fast?'+tempSpeed, setPlayerEnd, 0);
	if (requestStatus) {
		streamFastSpeed = tempSpeed;
		streamStatus = 3;
		showPlayerIcon();
	}
	return;
}

/*********************************************************************/
/* Function: playerBackward                                          */
/* Description: 快退操作                                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function playerBackward()
{
	if (!isFullScreen || serverIndex==3 || streamStatus==0) {
	//if (!isFullScreen || streamStatus==0) {
		return;
	}
	if (isSeleceBookMark || isSetupBookMark || isReplayBookMark) {
		return;
	}
	var tempSpeed = (streamStatus==3||streamFastSpeed>=64)? 2 : streamFastSpeed*2;
	var requestStatus = makeRequest('rewind?'+tempSpeed, setPlayerEnd, 0);
	if (requestStatus) {
		streamFastSpeed = tempSpeed;
		streamStatus = 4;
		showPlayerIcon();
	}
	return;
}

/*********************************************************************/
/* Function: playerPlayPause                                         */
/* Description: 播放/暂停操作                                        */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function playerPlayPause()
{
	//if (!isFullScreen || serverIndex==3 || streamStatus==0) {
	if (!isFullScreen || streamStatus==0) {
		return;
	}
	if (isSeleceBookMark || isSetupBookMark || isReplayBookMark) {
		return;
	}
	var requestStatus;
	if (streamStatus==1) {
		requestStatus = makeRequest('pause', setPlayerEnd, 0);
		if (requestStatus) {
			hideVolume();
			streamStatus = 2;
			streamFastSpeed = 1;
			showPlayerIcon();
		}
	}
	else {
		requestStatus = makeRequest('resume', setPlayerEnd, 0);
		if (requestStatus) {
			streamStatus = 1;
			streamFastSpeed = 1;
			showPlayerIcon();
		}
	}
	return;
}

/*********************************************************************/
/* Function: setPlayerEnd                                            */
/* Description: 显示播放/暂停/快进/快退后的状态                      */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function setPlayerEnd()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var getStatus = httpRequest.responseXML.getElementsByTagName('status').item(0).childNodes[0].nodeValue;
		if (getStatus==0) {
			streamStatus = 1;
			streamFastSpeed = 1;
			hidePlayerIcon();
			showSetupInfo(1, -1);
			return;
		}
		if (streamStatus==2) {
			var parameter = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue.split('|');
			currentTimeSeek = parseInt(parameter[0]);
			totalTimeSeek = parseInt(parameter[1]);
			seekShow();
		}
	}
	return;
}

/*********************************************************************/
/* Function: showPlayerIcon                                          */
/* Description: 显示播放状态图标                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
var streamStatus = 1; //记录当前播放状态，0:停止 1:播放 2:暂停 3:快进 4:快退
var streamFastSpeed = 1; //记录快进快退的速度，1:正常播放; 2 4 8 16 32:快进速度取值; -2 -4 -8 -16 -32:快退进速度取值 
function showPlayerIcon()
{
	clearTimeout(timerID_playStatus);
	hideAllInfo();
	hideProcess();
	var imgURL = '';
	if (streamStatus==0) {
		imgURL = 'image/player/stop.png';
	}
	else if (streamStatus==1) {
		imgURL = 'image/player/play.png';
		timerID_playStatus = setTimeout('hidePlayerIcon()', 3000);
		showProcess();
	}
	else if (streamStatus==2) {
		imgURL = 'image/player/pause.png';
		//showProcess();
	}
	else if (streamStatus==3) {
		imgURL = 'image/player/forward'+streamFastSpeed+'.png';
		showProcess();
	}
	else if (streamStatus==4) {
		imgURL = 'image/player/backward'+streamFastSpeed+'.png';
		showProcess();
	}
	document.getElementById('playStatusIcon').src = imgURL;
	document.getElementById('divPlayStatus').style.visibility = 'visible';
	return;
}

/*********************************************************************/
/* Function: hidePlayerIcon                                          */
/* Description: 隐藏播放状态图标                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
var timerID_playStatus; //定时器ID，播放状态提示信息的控制
function hidePlayerIcon()
{
	clearTimeout(timerID_playStatus);
	document.getElementById('divPlayStatus').style.visibility = 'hidden';
	return;
}
///////////////////////////////////////////////////////////////////////播放状态控制部分结束


///////////////////////////////////////////////////////////////////////SEEK操作部分开始
/*********************************************************************/
/* Function: seekSelect                                              */
/* Description: 选择SEEK的时间点                                     */
/* Parameters: param 时间的加减方向；0:减1/16，1:加1/16              */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
var isSeekSelect = false; //选择SEEK的时间点
var currentTimeSeek;
function seekSelect(param)
{
	isSeekSelect = true;
	var seekStep = parseInt(totalTimeSeek/16);
	if (param==0) {
		currentTimeSeek -= seekStep;
		currentTimeSeek = (currentTimeSeek<=0)? 0 : currentTimeSeek;
	}
	else if (param==1) {
		currentTimeSeek += seekStep;
		currentTimeSeek = (currentTimeSeek>=totalTimeSeek)? totalTimeSeek : currentTimeSeek;
	}
	else {
		return;
	}
	seekShow()
	return;
}

/*********************************************************************/
/* Function: seekShow                                                */
/* Description: 显示SEEK的时间点                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function seekShow()
{
	var len = (totalTimeSeek==0||currentTimeSeek==0)? 1 : parseInt(480*currentTimeSeek/totalTimeSeek);
	var len = (len>480)? 480 : len;
	var len = (len<1)? 1 : len;
	var hh = doubleDigit(parseInt(currentTimeSeek/3600));
	var mm = doubleDigit(parseInt((currentTimeSeek%3600)/60));
	var ss = doubleDigit(currentTimeSeek%60);
	var currentTimeStr = ''+hh+':'+mm+':'+ss;
	hh = doubleDigit(parseInt(totalTimeSeek/3600));
	mm = doubleDigit(parseInt((totalTimeSeek%3600)/60));
	ss = doubleDigit(totalTimeSeek%60);
	var totalTimeStr = ''+hh+':'+mm+':'+ss;
	var timeStr = currentTimeStr+'/'+totalTimeStr;
	document.getElementById('processBar').style.width = ''+len+'px';
	document.getElementById('streamTime').innerHTML = timeStr;
	//播放进度背景图片
	document.getElementById('playProcessBg').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/playProcess.png)';
	document.getElementById('divPlayProcess').style.visibility = 'visible';
	return;
}

/*********************************************************************/
/* Function: seekPlay                                                */
/* Description: 从选定的时间点开始播放                               */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function seekPlay()
{
	streamStatus = 1;
	streamFastSpeed = 1;
	setTimeout("makeRequest('seek?'+(currentTimeSeek*1000), showSeekPlay, 0)", 10);
	return;	
}

/*********************************************************************/
/* Function: showSeekPlay                                            */
/* Description: 显示选时候的状态                                     */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function showSeekPlay()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		isSeekSelect = false;
		currentTime = currentTimeSeek;
		totalTime = totalTimeSeek;
		clearTimeout(timerID_playStatus);
		timerID_playStatus = setTimeout('hidePlayerIcon()', 3000);
		setTimeout('showProcess();',1000);
		document.getElementById('playStatusIcon').src = 'image/player/play.png';
		document.getElementById('divPlayStatus').style.visibility = 'visible';
	}
	return;	
}
///////////////////////////////////////////////////////////////////////SEEK操作部分结束


///////////////////////////////////////////////////////////////////////音量状态显示部分开始



/*********************************************************************/
/* Function: getVolumeStatus                                         */
/* Description: 获得音量的状态，包括音量值和静音状态                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function getVolumeStatus()
{
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		var tempStr = httpRequest.responseXML.getElementsByTagName('result').item(0).childNodes[0].nodeValue;
		var parameter = tempStr.split('|');
		isMuteStatus = parseInt(parameter[0]);
		volumeLevel = parseInt(parameter[1]);
		volumeLevel = (volumeLevel%5 == 0) ? volumeLevel : (5+volumeLevel-volumeLevel%5);
		showMuteStatus();
	}
	return;
}

/*********************************************************************/
/* Function: volumeControl                                           */
/* Description: 音量控制操作                                         */
/* Parameters: operate 操作类型，1:音量加 2:音量减 3:静音/非静音     */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
var volumeOperate = 0; //指示音量操作类型，0:未知操作 1:音量加 2:音量减 3:静音/非静音
var isMuteStatus = 0; //记录静音状态，0:非静音，1:静音
var volumeLevel = 100; //音量值
function volumeControl(operate)
{
	if (operate<1 || operate>3) {
		return;
	}
	if (streamStatus!=1) {
		return;
	}
	hideProcess();
	hideAllInfo();
	volumeOperate = operate;
	volumeOperateSelece();
	return;
}

/*********************************************************************/
/* Function: showMuteStatus                                           */
/* Description: 显示静音状态图标                                         */
/* Parameters: 													     */
/* Author&Date: zhaopengjun  2010-03-04                               */
/*********************************************************************/
function showMuteStatus()
{
	if (isMuteStatus == 1) {
		var showOrHidden = showVolumeBarStatus ? 'hidden' : 'visible';
		document.getElementById('showMuteDiv').style.visibility = showOrHidden;
	} else {
		document.getElementById('showMuteDiv').style.visibility = 'hidden';
	}
	return;
}

/*********************************************************************/
/* Function: volumeOperateSelece                                     */
/* Description: 不同音量状态下的相关处理                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function volumeOperateSelece()
{
	var requestStatus;
	if (volumeOperate==1 || volumeOperate==2) {
		if (isMuteStatus==1) {
			requestStatus = makeRequest('volume?0', nullFun, 0);
			if (requestStatus) {
				isMuteStatus = 0;
			}
			else {
				return;
			}
		}
		else {
			var tempLevel = (volumeOperate==1)? (volumeLevel+5) : (volumeLevel-5);
			tempLevel = (tempLevel>=100)? 100 : tempLevel;
			tempLevel = (tempLevel<=0)? 0 : tempLevel;
			requestStatus = makeRequest('volume?3|'+tempLevel, nullFun, 0);
			if (requestStatus) {
				volumeLevel = tempLevel
			}
			else {
				return;
			}
		}
	}
	else if (volumeOperate==3) {
		var tempMuteStatus = (isMuteStatus==0)? 1:0;
		requestStatus = makeRequest('volume?'+tempMuteStatus, nullFun, 0);
		if (requestStatus) {
			isMuteStatus = tempMuteStatus;
		}
		else {
			return;
		}
	}
	showVolume();
	return;
}

/*********************************************************************/
/* Function: showVolume                                              */
/* Description: 显示音量条                                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
var timerID_Volume; //定时器ID，音量条的显示控制
var showVolumeBarStatus = false;		//记录音量条显示状态
function showVolume()
{
	hideProcess();
	clearTimeout(timerID_Volume);
	var imgURL = '';
	if (isMuteStatus==1) {
		muteURL = 'url(image/player/mute.png)';
		volumeURL = 'url(image/player/volumeBarOff.png)';
	}
	else {
		muteURL = 'url(image/player/muteOff.png)';
		volumeURL = 'url(image/player/volumeBar.png)';
	}
	var len = 4.5*volumeLevel;
	len = (len<=0)? 1 : len;
	len = (len>=450)? 450 : len;
	var showStr = ''+volumeLevel+'/100';
	document.getElementById('muteStatua').style.backgroundImage = muteURL;
	document.getElementById('volumeBar').style.backgroundImage = volumeURL;
	document.getElementById('volumeBar').style.width = ''+len+'px';
	if (len==1) {
		document.getElementById('volumeBar').style.visibility = 'hidden';
	}
	else {
		document.getElementById('volumeBar').style.visibility = 'visible';
	}
	document.getElementById('volumeLevel').innerHTML = showStr;
	document.getElementById('divVolume').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/volumeMessage.png)';
	document.getElementById('divVolume').style.visibility = 'visible';
	showVolumeBarStatus = true;
	showMuteStatus();
	timerID_Volume = setTimeout('hideVolume()', 4000);
	return;
}

/*********************************************************************/
/* Function: hideVolume                                              */
/* Description: 隐藏音量条                                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-11-25                                 */
/*********************************************************************/
function hideVolume()
{
	clearTimeout(timerID_Volume);
	document.getElementById('volumeBar').style.visibility = 'hidden';
	document.getElementById('divVolume').style.visibility = 'hidden';
	showVolumeBarStatus = false;
	showMuteStatus();
	return;
}
///////////////////////////////////////////////////////////////////////音量状态显示部分结束


///////////////////////////////////////////////////////////////////////全屏信息时的功能选项开始
/*********************************************************************/
/* Function: allInfoNext                                             */
/* Description: 全部信息的选项焦点向右移动                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-10-10                                 */
/*********************************************************************/
var allInfoTotal = 4; //全屏信息时的焦点总数
var allInfoIndex = 0; //全屏信息时的焦点位置
function allInfoNext()
{
	if (allInfoIndex>=allInfoTotal-1) {
		allInfoIndex = 0;
	}
	else {
		allInfoIndex++;
	}
	document.getElementById('allInfoFocus').style.left = (132+116*allInfoIndex)+"px";
	return;
}

/*********************************************************************/
/* Function: allInfoPrevious                                         */
/* Description: 全部信息的选项焦点向左移动                           */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-10-10                                 */
/*********************************************************************/
function allInfoPrevious()
{
	if (allInfoIndex<=0) {
		allInfoIndex = allInfoTotal-1;
	}
	else {
		allInfoIndex--;
	}
	document.getElementById('allInfoFocus').style.left = (132+116*allInfoIndex)+"px";
	return;
}

/*********************************************************************/
/* Function: allInfoSelect                                           */
/* Description: 选中全部信息的选项                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-10-10                                 */
/*********************************************************************/
function allInfoSelect()
{
	if (allInfoIndex==0) {
		changeTrack();
	}
	else if (allInfoIndex==1) {
		changeSubtitle();
	}
	else if (allInfoIndex==2) {
		setupBookMarkRequest();
	}
	else if (allInfoIndex==3) {
		changeTVSystem();
	}
	return;
}
///////////////////////////////////////////////////////////////////////全屏信息时的功能选项结束


///////////////////////////////////////////////////////////////////////精确定位部分开始
/*********************************************************************/
/* Function: seekKeyEvent                                            */
/* Description: 选时输入时的遥控器按键处理函数                       */
/* Parameters: keyValue 键值                                         */
/* Author&Date: lixudong  2010-02-20                                 */
/*********************************************************************/
var seekInputPos = 0; //输入数字的当前位置
var timer_seekTimeTips;	//seek提示定时器
function seekKeyEvent(keyValue)
{
	//iPanel.ioctlWrite('printf', 'seekKeyValue================='+keyValue+'\n');
	if (isSeekTimeTipsDisplay) {
		clearTimeout(timer_seekTimeTips);
		hideSeekTips();
		return (false);
	}
	switch(keyValue) {
		case 8: //back
			hideSeekInput();
			break;
		case 37: //left
			moveSeekInput('left')
			return (false);
			break;
		case 39: //right
			moveSeekInput('right')
			return (false);
			break;
		case 13: //Enter
			enterSeekInput();
			break;
		case 271: //定位键
			hideSeekInput();
			break;
		case 48: //数字0
		case 49: //数字1
		case 50: //数字2
		case 51: //数字3
		case 52: //数字4
		case 53: //数字5
		case 54: //数字6
		case 55: //数字7
		case 56: //数字8
		case 57: //数字9
			changeSeekInput(keyValue);
			break;
		default:
			return (-1);
			break;
	}
	return;
}

/*********************************************************************/
/* Function: showSeekBar                                             */
/* Description: 显示选时框中的数字                                   */
/* Parameters: timeCurrent 当前时间                                  */
/* Author&Date: lixudong  2010-02-20                                 */
/*********************************************************************/
function showSeekBar(timeCurrent)
{
	var tempCurrent = timeCurrent;
	var hh = doubleDigit(parseInt(tempCurrent/3600));
	var mm = doubleDigit(parseInt((tempCurrent%3600)/60));
	var ss = doubleDigit(tempCurrent%60);
	var tempTimeStr = ''+hh+mm+ss;
	var showStr = '';
	for (var i=0; i<6; i++) {
		showStr = tempTimeStr.substring(i, i+1);
		document.getElementById('seekTime'+i).innerHTML = showStr;
	}
	return;
}

/*********************************************************************/
/* Function: showSeekInput                                           */
/* Description: 进入选时状态                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-02-20                                 */
/*********************************************************************/
var isSeekInput = false; //选时输入状态
var isSeekInputOk = false; //选时输入开始状态
function showSeekInput()
{
	if (!isFullScreen || isSetupBookMark || isReplayBookMark) {
		return;
	}
	if (!(streamStatus==1||streamStatus==2)) {
		return;
	}
	clearTimeout(timerID_showProcess);
	isSeekInput = true;
	document.getElementById('seekBar').style.visibility = 'visible';

	if (isSeekSelect) {
		showSeekBar(currentTimeSeek);
		isSeekInputOk = true;
		document.getElementById('seekTime'+seekInputPos).style.color = '#0000ff';
	}
	else {
		clearInterval(timerID_playProcess);
		clearTimeout(timerID_ProcessShow);
		isPlayProcessShow = true;
		getCurrentTimeRequest();
		document.getElementById('playProcessBg').style.backgroundImage = 'url(image/skin'+SETUP_SkinIndex+'/playProcess.png)';
		setTimeout("document.getElementById('divPlayProcess').style.visibility = 'visible'", 100);
		timerID_playProcess = setInterval('getCurrentTimeRequest()', 1000);
		timerID_ProcessShow = setTimeout('hideSeekInput()', 8000);
	}
	return;
}

/*********************************************************************/
/* Function: hideSeekInput                                           */
/* Description: 退出选时状态                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-02-21                                 */
/*********************************************************************/
function hideSeekInput()
{
	if (streamStatus!=2) {
		clearTimeout(timerID_ProcessShow);
		timerID_ProcessShow = setTimeout('hideProcess()', 3000);
	}
	isSeekInput = false; //选时输入状态
	isSeekInputOk = false; //选时输入开始状态
	document.getElementById('seekTime'+seekInputPos).style.color = '#a4a4a4';
	seekInputPos = 0;
	document.getElementById('seekBar').style.visibility = 'hidden';
	return;
}

/*********************************************************************/
/* Function: moveSeekInput                                           */
/* Description: 移动当前输入位置                                     */
/* Parameters: flag 取值'left'和'right'                              */
/* Author&Date: lixudong  2010-02-21                                 */
/*********************************************************************/
function moveSeekInput(flag)
{
	clearTimeout(timerID_ProcessShow);
	timerID_ProcessShow = setTimeout('hideSeekInput()', 8000);
	document.getElementById('seekTime'+seekInputPos).style.color = '#a4a4a4';
	if (flag=='left') {
		seekInputPos = (seekInputPos<=0)? 5 : seekInputPos-1;
	}
	else {
		seekInputPos = (seekInputPos>=5)? 0 : seekInputPos+1;
	}
	document.getElementById('seekTime'+seekInputPos).style.color = '#0000ff';
	return;
}

/*********************************************************************/
/* Function: moveSeekInput                                           */
/* Description: 修改输入内容                                         */
/* Parameters: keyNumber 输入数字的按键值                            */
/* Author&Date: lixudong  2010-02-21                                 */
/*********************************************************************/
function changeSeekInput(keyNumber)
{
	clearTimeout(timerID_ProcessShow);
	timerID_ProcessShow = setTimeout('hideSeekInput()', 8000);
	var showNumber = keyNumber-48;
	if ((seekInputPos==2||seekInputPos==4)&&(showNumber>=6)) {
		return;
	}
	document.getElementById('seekTime'+seekInputPos).innerHTML = showNumber;
	document.getElementById('seekTime'+seekInputPos).style.color = '#a4a4a4';
	seekInputPos = (seekInputPos>=5)? 0 : seekInputPos+1;
	document.getElementById('seekTime'+seekInputPos).style.color = '#0000ff';
	return;
}

/*********************************************************************/
/* Function: enterSeekInput                                          */
/* Description: 确认输入内容                                         */
/* Parameters:                                                       */
/* Author&Date: lixudong  2010-02-21                                 */
/*********************************************************************/
var isSeekTimeTipsDisplay = false;		//显示选时操作提示框状态
function enterSeekInput()
{
	var timeVol = new Array();
	var tempTime = 0;
	for (var i=0; i<6; i++) {
		timeVol[i] = parseInt(document.getElementById('seekTime'+i).innerHTML);
	}
	tempTime += (timeVol[0]*10+timeVol[1])*3600;
	tempTime += (timeVol[2]*10+timeVol[3])*60;
	tempTime += (timeVol[4]*10+timeVol[5]);
	if (tempTime >= totalTime) {
		document.getElementById('seekTimeTips').innerHTML = SETUP_Language=='chinese' ? '操作无效' : 'Invalid';
		document.getElementById('seekTimeTips').style.visibility = 'visible';
		isSeekTimeTipsDisplay = true;
		timer_seekTimeTips = setTimeout('hideSeekTips()', 3000);
		return;
	}
	//tempTime *= 1000;
	currentTimeSeek = tempTime;
	hideSeekInput();
	seekPlay();
	return;
}

/*********************************************************************/
/* Function: hideSeekTips                                          */
/* Description: 隐藏选时提示信息                                        */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-05-24                               */
/*********************************************************************/
function hideSeekTips()
{
	document.getElementById('seekTimeTips').style.visibility = 'hidden';
	isSeekTimeTipsDisplay = false;
}
///////////////////////////////////////////////////////////////////////精确定位部分结束

