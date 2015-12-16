// JavaScript Document 
var dvbObj = new JsApiObj(); //创建接口对象;
var channelNum = 0; // 频道号 默认 0;
var playNum = null; // 记录逻辑频道号; 
var dvbsearchSta = false; // dvb搜索状态; true 搜索   false 非搜索; 
var camenuSta = false; // ca菜单显示状态 true 显示  false 隐藏;
var timer_channelnum = null; // 定时显示频道号; 
var timer_tips = null; // 文字提示定时器;
var tipsDivId = null;  // 具体的提示id; 'upgrade' is 提示是否升级 , 'record' is 提示 是否停止录制, 'standby' is 是否待机, searchAgain is 搜索结果0再次搜索;
var tipsStatus = 0;  // 0 全部隐藏, 1 is 带按钮显示 2 is 纯文字显示 3 is pin-code;
var tipsRegStatus = false; // 激活 提示 显示 状态  false is  hidden, true is display;
var standbyStatus = false; // 待机状态
var volStatus = false;  // ture is 音量条显示   false is 音量条隐藏.
var timer_vol = null; // 定时显示音量条;
var dvbcheck = false;
var dvbisForceUpgrade = false;

var everyPageLine = 10;		//列表每页行数
var channelList ;		//频道列表
var channelListStatus = 0;		//频道列表显示状态(0: 不显示, 1: 显示)
var channelListFavouriteStatus = 0;		//收藏频道列表的状态(0: 不显示, 1: 显示)
var listCurrentPageNo = 0;	//列表当前的页数-1
var listTotalNum = 0;		//列表总数
var listFocusIndex = 0;		//焦点位置引索(相对于列表所有的引索)
var channelListFocus = new FocusFactory();	//频道列表的焦点控制
var dialogStatus = 0;		//对话框弹出状态(0: 不显示, 1: 显示)
var dialogButtonFocus = 0;		//对话框焦点位置(0~2)
var reminderDialogButtonFocus = 0;		//reminder框焦点位置(0: 跳转, 1: 取消)
var currentChannelNo = 0;		//dvb播放的当前的逻辑频道号
var channelInfoStatus = 0;		//频道信息是否显示的状态(0: 不显示, 1: 显示)
var programListStatus = 0;		//节目单列表显示状态(0: 不显示, 1: 显示)
var programList;		//节目单列表
var programListDelay = 0;		//节目单显示日期和当前日期的差值, 即延迟的天数
var showHelpInfoStatus = 0;		//帮助信息显示状态(0: 不显示, 1: 显示)
var reminderTimer = {};			//提醒的计时器对象
var remindeDialogStatus = 0;	//reminder提示框状态(0: 不显示, 1: 显示)
var reminderPlayLcn = 0;		//reminder即将播出的频道的逻辑频道号
var reminderPlayLcnArr = new Array();		//reminder即将播出的频道的逻辑频道号数组
var reminderListStatus = 0;		//reminder列表显示状态(0: 不显示, 1: 显示)
var CAhasintialied = 0;

var tipsTxtArr = new Array("Download process : 0",
"Download upgrade file over!",
"Upgrade process : 0",
"Upgrade Done!",
"Impulse PayPer View Pin-code :",
"Parental Control Pin-code :",
"Pin-code changed!",
"Pin-code Failure!",
"Pin-code Blocked!",
"Whether to upgrade?",
"Channel total is Zero, Please search again!",
"Whether the standby?",
"Smart Card OK!",
"Smart Card not present!",
"Smart Card Rejected!",
"AvailableCredit: ",
"CostOfEvent: ",
"No right to access this program!",
"Detector upgrade file...",
"No control word,No right to access this program.",
"Program information changes, rescan channel again...",
"Do you want to upgrade now ?",
"Checking Upgrade file... ",
"Individualize STB OK!",
"Individualize STB failed!",
"Clear individuation data Ok!",
"No pairing, stb need pairing!",
"Smart Card Insert Error!"
); //提示信息;
/*********************************************************************/
/* Function: keyEvent                                                */
/* Description: 按键处理 函数       		                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
document.onkeypress = keyEvent;
function keyEvent(e){
	var keyVal = e.which;
	keyInformation(keyVal); // 上抛消息处理函数;
	if(dvbcheck || tipsRegStatus || tipsDivId == "upgrade"){return;}
	switch(keyVal){
		case 48:
		case 49:
		case 50:
		case 51:
		case 52:
		case 53:
		case 54:
		case 55:
		case 56:
		case 57:
			numberSwitchChannel(keyVal);
			break;
		case 224:
			dvbObj.stopChannel();
			setTimeout("dvbObj.closeSTB();",2000);
			break;
		case 93: //待机;
			standbyFun(); 
			break;
		case 1073742854:
			dvbObj.stopChannel();
			
			document.location.href = "iptv.html"; 
			break;
		case 1073741879: // Mute;
			muteShow();
			break;
		case 34: // vol -
			volSwitch('-');
			break;
		case 33: // vol +
			volSwitch('+');
			break;
		case 37:
			keyLeft();
			break;
		case 39:
			keyRight();
			break;
		case 38: 
			keyUp();
			break;
		case 40:
			keyDown();
			break;
		case 1073741880: //channel+
			tipsDifvHiddenAll();
			channelSwith('channel+');
			break;
		case 1073741884: //channel-
			tipsDifvHiddenAll();
			channelSwith('channel-');
			break; 
		case 1073741920: //blue; dvb search;
		case 406:
			showDvbSet(); 
			break;
		case 1073741921: //menu CA menu;
		case 405:		//yellow; CA INFO
			showCaMenu();
			break;
		case 415: // play/pause;
			playDvb(channelNum);
			break;
		case 413: //stop;
			dvbObj.stopChannel();
			break;
		case 13:  //remove ca info
			keyEnter();
		    break;  
		case 417:	//channel list
			if(channelListStatus){
				hideChannelList();
			}else{
				showChannelList();
			}
			break;
		case 403:	//red Key
			if(dialogStatus)return;		//弹出框显示状态，屏蔽按键
			if(channelListStatus){
				editFavourite();
			}else{
				if(!channelListFavouriteStatus){
					showFavouriteList();
				}else{
					hideFavouriteList();
					programListDelay = 0;	//清空延迟的天数
				}
			}
			break;
		case 404:		//green Key
			if(dialogStatus)return;		//弹出框显示状态，屏蔽按键
			//var count = dvbObj.getScheduleEventIdCount("1990,12,3,12,0,0,2013,12,5,12,0,0");
			if(programListStatus){
				hideProgramList();	
				programListDelay = 0;
			}else{
				showProgramList();	
			}
			break;
		case 8:		//#键(DISPLAY键)
			if(dialogStatus)return;		//弹出框显示状态，屏蔽按键
			if(channelInfoStatus){		//显示时
				hideChannelInfo();
			}else{		//不显示时
				showChannelInfo();
			}
			break;
		case 46:	// *键
			if(dialogStatus)return;		//弹出框显示状态，屏蔽按键
			if(showHelpInfoStatus){
				hideHelpInfo();
			}else{
				showHelpInfo();
			}
			break;
		case 412:	//cs Key
			break;
		case 1073741865: //goto key(Reminder List)
			if(dialogStatus)return;		//弹出框显示状态，屏蔽按键
			if(reminderListStatus == 1){		//当显示时
				hideReminderList();
			}else if(reminderListStatus == 0){		//当不显示时
				showReminderList();
			}
			break;
		case 203: //exit  返回分发页面
			dvbObj.stopChannel();
			document.location.href = "./../DVBdispatch.html";
			break;
		default:
			break;
	}
	return;
}
/*********************************************************************/
/* Function: keyInformation                                          */
/* Description: 上抛键值处理 函数    		                	         */
/* Parameters: k 上抛的消息键值                                         */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
function keyInformation(k){
	switch(k){ 
		case 1073742488: //DVB_DS_OK clear No right to access  this  program
		    tipsDifvHiddenAll();
			break;
		case 1073742487: //DVB_RESCAN_CHANNEL
		    searchDvbAgain(); 
			tipsDivShow(2,"tipsTxtDiv",20);
		    break;
		case 1073742486://DVB_UPGRADE_CONFIRM
				if(dvbcheck || tipsDivId == "upgrade")
					break;
				dvbcheck = true;  
				dvbObj.stopChannel();
				tipsDivShow(2,"tipsTxtDiv",22);
				clearTimeout(timer_tips);
				setTimeout("dvbUpgradeCheack();",2000);
		    break;
		case 1073742492:  // upgrade force;
			if(dvbcheck || tipsDivId == "upgrade")
					break;
			dvbcheck = true;  
			dvbisForceUpgrade = true;
			dvbObj.stopChannel();
			tipsDivShow(2,"tipsTxtDiv",22);
			clearTimeout(timer_tips);
			setTimeout("dvbUpgradeCheack();",2000);
			break;
		case 1073742398:  // upgrade confirm;
			tipsDivId = "upgrade";
			dvbcheck = false;
			if(dvbisForceUpgrade == true)
			{
				dvbUpgradeFun();
				dvbisForceUpgrade = false;
			}
			else
			{
				tipsDivShow(1,"tipsBtn",21);
				clearTimeout(timer_tips);
			}
			break;
		case 1073742400:  // not check;
			clearTimeout(timer_tips);
			dvbcheck = false;
			tipsDivHidden("tipsTxtDiv");
			playDvb(channelNum);
			break;
		case 1073742477:  // Impulse_PayPer_View Pin-code needed;
			viewPicCode(); 
			clearTimeout(timer_tips);
			break; 
		case 1073742476:  // Parental_Control Pin-code needed 
			controlPinCode(); 
			clearTimeout(timer_tips);
			break;
		case 1073742479:  // Pin-code changed
			tipsDivShow(2,"tipsTxtDiv",6);
			break;
		case 1073742480: // Pin-code failure! ; 
			tipsDivShow(2,"tipsTxtDiv",7);
			break;
		case 1073742481: // Pin-code Blocked;
			tipsDivShow(2,"tipsTxtDiv",8);
			break;
		case 1073742482: // smart card OK
		  //tipsDifvHiddenAll();
			break;
		case 1073742483: // smart card not present
			//tipsDivShow(2,"tipsTxtDiv",13);
			//clearTimeout(timer_tips);
			break;
		case 1073742484: // smart card rejected
			//tipsDivShow(2,"tipsTxtDiv",14);
			break;
		case 1073742485: // No right to access  this  program
			tipsDivShow(2,"tipsTxtDiv",17);
			clearTimeout(timer_tips);
			break;
		case 1073742491: // No Pairing
			tipsDivShow(2,"tipsTxtDiv",26);
			clearTimeout(timer_tips);
			break;
		case 1073742478: // Smart card insert error
			//tipsDivShow(2,"tipsTxtDiv",27);
			//clearTimeout(timer_tips);
			break; 
		case 1073742489:    //Control word, do not have permission to watch
		    tipsDivShow(2,"tipsTxtDiv",19);
		    clearTimeout(timer_tips);
		    break;
		default:
			break;
	}
	return;
}

/***************************************按键处理结束********************************************************/


/***************************************功能函数开始********************************************************/
/*********************************************************************/
/* Function: init	                                                 */
/* Description: 初始化 函数 			                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
function init(){
	var tatol = player.Ag_dvb_Channel_GetCount(0);
	if ( tatol == 0 ){
		dvbObj.initDVB();  //初始化 dvb; 
	}
	dvbObj.scanEITStart();//开始搜索eit信息 之后才能拿到epg的信息
	//var v = dvbObj.sycToNTP();//同步NTP时间
	//alert(v);
	if(dvbObj.getChannelTatol() > 0){
		//dvbObj.setErrorHandleMode();
		playDvb(channelNum);//
		dvbObj.syncTime();
	}else{
		dvbObj.searchdvb(33300,5060,64,"1");
		//showDvbSet();
	} 
	$("info11").innerHTML = "IP : "+dvbObj.getIPAddress();
	showCurrentTime();
	setTimeout("showTimePanel()",3000);
	showReminderDialog();
	dvbObj.envSet("3");
	//dvbObj.setTimeZone(12);
	//testTime();
	return;
}
/*********************************************************************/
/* Function: showDvbSet                                              */
/* Description:  显示DVB搜台选项   		                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
function showDvbSet(){
	//tipsDifvHiddenAll();
	$("startInput").focus();
	if(camenuSta){ //如果CA菜单显示,则隐藏;
		$("CAMenu").style.display = "none";
		camenuSta = false;
		dvbsearchSta = true;  
	}else if(!dvbsearchSta){ 
		dvbsearchSta = true;
	}else{ 
		dvbsearchSta = false; 
		$("dvbSearch").style.display = "none";
		return;
	}  
	$("startInput").value = ""; // 清空参数
	$("stepInput").value = ""; // 清空参数
	$("endInput").value = ""; // 清空参数
	$("symborateInput").value = ""; // 清空参数
	$("dvbSearch").style.display = "block"; // 显示搜索DVB参数;
	$("startInput").focus();
	return;
}
/*********************************************************************/
/* Function: showCaMenu                                              */
/* Description:  显示CA菜单       		                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
function showCaMenu(){	
	//tipsDifvHiddenAll();
	if(dvbsearchSta){
		dvbsearchSta = false; 
		$("dvbSearch").style.display = "none"; 
		camenuSta = true;
		getCAmenuVal();
		$("CAMenu").style.display = "block"; 
	}else if(!camenuSta){
		camenuSta = true;
		getCAmenuVal();
		$("CAMenu").style.display = "block";
	}else{
		camenuSta = false;
		$("CAMenu").style.display = "none";
		return;
	}
	return;
}
/*********************************************************************/
/* Function: getParameter                                            */
/* Description:  获取dvb搜台的参数   		                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
function getParameter(){
	var txtArr = new Array();
	txtArr[0] = $("startInput").value;
	txtArr[1] = $("stepInput").value;
	txtArr[2] = $("endInput").value;
	txtArr[3] = $("symborateInput").value;
	txtArr[4] = $("qamInput").value;
	txtArr[5] = $("AnnexMode").value;
	return txtArr;
}
/*********************************************************************/
/* Function: searchFun                                               */
/* Description: DVB 搜台          		                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
function searchDvb(){
	dvbObj.stopChannel();  
	setTimeout("searchFun();", 2000);
	return;
}/*********************************************************************/
/* Function: searchFun                                               */
/* Description: DVB 搜台          		                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
/*function searchFun(){  
	var parameter = getParameter(); 
	var startFreq = parseInt(parameter[0]);
	var stepFreq = parseInt(parameter[1]);
	var endFreq = parseInt(parameter[2]);
	if(startFreq == endFreq && stepFreq == 0){
		dvbObj.searchdvb(startFreq, parameter[3], parameter[4], parameter[5]); 
		$("dvbSearch").style.display = "none";
		waittingInfo.show();
		CheckScanStatus(); 
	}else{
		//for(var i = 0; startFreq + i * stepFreq <= endFreq; i++){
			//var frequency = startFreq + i * stepFreq;
			var  frequency = startFreq;
			dvbObj.searchdvb(frequency, parameter[3], parameter[4], parameter[5]); 
		//}
		
	}
	//$("dvbSearch").style.display = "none";
	//waittingInfo.show();
	//CheckScanStatus();
	return;
}
//搜索频点
function searchFreq(frequency, symborate, qam, annex){
	dvbObj.searchdvb(frequency, symborate, qam, annex); 
	checkScanStatus();
}
function checkScanStatus(frequency, step){
	var status = dvbObj.dvbScanStatus(); 
	if(status == 0){
		
	}else if(status == 1){
		checkScanStatus();
	}else if(status == 2){
		
	}
}*/
function searchDvb(){
	$("startInput").focus();
	$("dvbSearch").style.display = "none";
	waittingInfo.show();
	dvbObj.stopChannel();
	dvbObj.deleteChannelList();
	setTimeout(function(){
		searchScan.search();
	},300); 
}
var searchScan = new searchScanFactory();
function searchScanFactory(){
	var parameter, startFreq, stepFreq, endFreq, symborate, qam, annex, freq;
	var that = this;
	function getValue(){
		parameter = getParameter(); 
		startFreq = parseInt(parameter[0]);
		stepFreq = parseInt(parameter[1]);
		endFreq = parseInt(parameter[2]);
		symborate = parameter[3];
		qam = parameter[4];
		annex = parameter[5];
		freq = startFreq;
	}
	this.search = function(f){
		if(!f){
			getValue();
		}else{
			freq = f;
		}
		//alert("2=============================="+freq + " , " + symborate + " , " + qam + " , " + annex);
		dvbObj.searchdvb(freq, symborate, qam, annex);
		//$("dvbSearch").style.display = "none";
		//waittingInfo.show();
		that.checkSearch();
	};
	var timer;
	this.checkSearch = function(){
		var status = dvbObj.dvbScanStatus();
		if(status == 0){
			dvbsearchSta = false;
			$("freqInput").focus(); 
			$("dvbSearch").style.display = "none"; 
			showDvbSet();
			waittingInfo.hide();
		}else if(status == 1){
			clearTimeout(timer);
			timer = setTimeout(function(){
				that.checkSearch();
			},500);
		}else if(status == 2){
			freq += stepFreq;
			if(freq <= endFreq && stepFreq != 0){
				that.search(freq);
			}else{
				if(dvbObj.getChannelTatol() == 0){
					tipsDivId = "searchAgain";
					tipsDivShow(1,"tipsBtn",10);
				} 
				dvbsearchSta = false;
				$("freqInput").focus(); 
				$("dvbSearch").style.display = "none"; 
				playDvb(channelNum); 
				waittingInfo.hide();
			}
		}
	}
}
//搜台等待画面
var waittingInfo = new searchWaitting();
function searchWaitting(){
	var status = 0;//显示的状态(0: 不显示, 1: 显示)
	var timer;
	var pointNum = 0;
	this.show = function(){
		status = 1;
		$("waitting").style.display = "block";
		$("waitting").innerHTML = "Waitting";
		timer = setInterval(function(){
			pointNum++;
			if(pointNum < 4){
				$("waitting").innerHTML += ".";
			}else{
				pointNum = 0;
				$("waitting").innerHTML = "Waitting";
			}
		},1000);
	};
	this.hide = function(){
		status = 0;
		pointNum = 0;
		$("waitting").style.display = "none";
		clearInterval(timer);
	}
}
/*********************************************************************/
/* Function: CheckScanStatus                                         */
/* Description: 检测搜台状态        		                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
/*function CheckScanStatus(){
    var status = dvbObj.dvbScanStatus(); 
    if(status == 0){	//
			dvbsearchSta = false;
			$("freqInput").focus(); 
			$("dvbSearch").style.display = "none"; 
			showDvbSet();
			waittingInfo.hide();
	}else if(status == 1){
			setTimeout("CheckScanStatus()", 500);
			//CheckScanStatus();
	}else if(status == 2){ // if(status == 2);
		if(dvbObj.getChannelTatol() == 0){
			tipsDivId = "searchAgain";
			tipsDivShow(1,"tipsBtn",10);
		} 
		dvbsearchSta = false;
		$("freqInput").focus(); 
		$("dvbSearch").style.display = "none"; 
		playDvb(channelNum); 
		waittingInfo.hide();
	}
	return;
}*/
/*********************************************************************/
/* Function: searchAgin                                               */
/* Description: DVB 重新搜台          		                	         */
/* Parameters:                                                       */
/* Author&Date: qianmi  2012-11-21								 */
/*********************************************************************/
function searchDvbAgain(){
	dvbObj.stopChannel(); 
	var tunermodeAgain = dvbObj.getDVBInfo();
	var parameterAgain = tunermodeAgain.split("|"); 
	dvbObj.searchdvb(parameterAgain[0],parameterAgain[1],parameterAgain[2],parameter[3]); 
	CheckScanStatus(); 
	return;
}
/*********************************************************************/
/* Function: playDvb                                                 */
/* Description: DVB播放           		                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
function playDvb(num){ 		//num: 引索
	dvbObj.stopChannel();
	playNum = dvbObj.getLcn(num);
	currentChannelNo = playNum;
	dvbObj.playChannel(playNum);
	//showChannelNum(num);
	setTimeout(function(){
		if(dvbObj.isPlayAudio() == 1){
			$("audioChannel").style.display = "block";
		}else{
			$("audioChannel").style.display = "none";
		}
	},1500);
	showChannelPanel(dvbObj.getChannelNum(playNum));
	showChannelNum(dvbObj.getChannelNum(playNum));
	//alert("channelNum === "+channelNum + " , playNum == " + playNum);
	return;
}

function playChannel(channelNo){		//channelNo:逻辑频道号
	dvbObj.stopChannel();
	currentChannelNo = channelNo;
	dvbObj.playChannel(channelNo);
	for(var i = 0; i < dvbObj.getChannelTatol(); i++){
		if(channelNo == dvbObj.getLcn(i)){
			channelNum = i;
		}
	}
	//showChannelNum(num);
	setTimeout(function(){
		if(dvbObj.isPlayAudio() == 1){
			$("audioChannel").style.display = "block";
		}else{
			$("audioChannel").style.display = "none";
		}
	},1500);
	showChannelPanel(dvbObj.getChannelNum(playNum));
	showChannelNum(channelNo);
	return;
}
/*********************************************************************/
/* Function: getCAmenuVal                                            */
/* Description: CA菜单数据获取        		                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
function getCAmenuVal(){ 
	$("softVNum").value = dvbObj.getSoftVer();
	$("vercaverInput").value = dvbObj.getCpyCAVersion(); 
	$("caVNum").value = dvbObj.getCaVer();
	$("casystemIdInput").value = dvbObj.getCASysID(); 
	$("boxIdInput").value = dvbObj.getBoxId();
	$("pairStateInput").value = dvbObj.getPairState();
	$("smartCardInput").value = dvbObj.getSmartCard();
	$("IPInput").value = dvbObj.getIP();
	$("CreditInput").value = dvbObj.getCurrencyArray(); // 有卡及无卡余额;
	return;
}
/*********************************************************************/
/* Function: channelSwith                                            */
/* Description: DVB 频道切换        		                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
function channelSwith(str){
	if(tipsStatus !=0 || camenuSta || dvbsearchSta){return;}
	if(programListStatus){
		hideProgramList();
		showProgramList();
	}
	if(str == "channel+"){ // 频道+
		channelNum++;
		channelNum = channelNum >= dvbObj.getChannelTatol() ? 0 : channelNum;
	}else{// 频道-
		channelNum--;
		channelNum = channelNum < 0 ? dvbObj.getChannelTatol()-1 : channelNum; 
	}
	playDvb(channelNum); 
	return;
}
/*********************************************************************/
/* Function: volSwitch                                               */
/* Description: 音量按键操作        		                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
function volSwitch(str){
	if(tipsStatus !=0 || camenuSta || dvbsearchSta){return;}
	var vol = dvbObj.getVol();
	if(str == "+"){
		vol = vol+5;
		vol = (vol >= 100) ? 100 : vol;
	}else{
		vol = vol-5;
		vol = (vol <= 0) ? 0 : vol;
	} 
	dvbObj.setVol(vol);
	showVol(vol);
	return;
}
/*********************************************************************/
/* Function: showVol                                                 */
/* Description: 显示音量条        		                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
function showVol(num){
	if(dvbObj.getMute()){
		$("MuteDiv").style.display = "none";
		dvbObj.setMute(0);
	}
	clearTimeout(timer_vol);
	volStatus = true;
	$("volumeDiv").style.display = "block";
	$("volumeBar").style.width = parseInt((370/100)*num) + "px";
	$("volumeText").innerHTML = num + "/"  + "100"; 
	timer_vol = setTimeout('hiddenVol();',3000);
	return;
}
/*********************************************************************/
/* Function: hiddenVol                                               */
/* Description:  隐藏音量条        		                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
function hiddenVol(){
	clearTimeout(timer_vol);
	$("volumeDiv").style.display = "none";
	volStatus = false;
	return;
}
function muteShow(){
	if(volStatus){
		hiddenVol();
	}
	if(dvbObj.getMute()){
		$("MuteDiv").style.display = "none";
		dvbObj.setMute(0);
	}else{
		$("MuteDiv").style.display = "block";
		dvbObj.setMute(1);
	}
	return;
}
/*********************************************************************/
/* Function: showChannelNum                                          */
/* Description: 显示频道号            				   	             */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/ 
function showChannelNum(ChannelNum)
{
	window.clearTimeout(timer_channelnum);
	var Num = parseInt(ChannelNum)
	$("ChannenlNumDiv").innerHTML = "";   
	$("ChannenlNumDiv").innerHTML = Num;   
	timer_channelnum = setTimeout("$('ChannenlNumDiv').innerHTML = ''",5000);
	return;
}

/*********************************************************************/
/* Function: editPingCord                                            */
/* Description: 修改提示中的pingcord  				   	                 */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/ 
function editPingCord(){
	dvbObj.pingCord($('pinCodeInput').value);
	tipsDivHidden("tipspcord"); 
}
/*********************************************************************/
/* Function: getDownProcess                                          */
/* Description: 获取下载进度 并升级   				   	                 */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/ 
function getDownProcess(){
    var process = dvbObj.getProcess();
	  tipsDivShow(2,"tipsTxtDiv",0);
    if(process < 100){
      setTimeout("getDownProcess()", 1000);
			$("tipsTxt").innerHTML = 'Download upgrade file process : ' + process;
		}
    else if(process == 100){
			$("tipsTxt").innerHTML = 'Download upgrade file over, Upgrading...';
			dvbObj.DVBupgrade();
		}
		return;
}
/*********************************************************************/
/* Function: standbyFun                                              */
/* Description: 待机处理函数         				   	                 */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/ 
function standbyFun(){
	if(standbyStatus){
		standbyStatus = false;
		dvbObj.wakeUp(); 
	}else{
		clearList();
		tipsDivId = "standby";
		tipsDivShow(1,"tipsBtn",11);  
		$("comfirmBtn").focus();
	}
	return;
}
//清除频道列表、收藏列表、节目单列表、reminder列表
function clearList(){
	hideFavouriteList();
	hideProgramList();	
	programListDelay = 0;
	hideReminderList();
	hideChannelList();
}
/*********************************************************************/
/* Function: viewPicCode                                             */
/* Description: Impulse PayPer View Pin-code 处理 	                 */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/ 
function viewPicCode(){ // Impulse PayPer View Pin-code
	var Credit = dvbObj.getPurseInfo()[0]; // 卡余额;
	var Cost =  dvbObj.getPurseInfo()[1]; // 卡消费额;
	$("pincodetxt").innerHTML = tipsTxtArr[15] + Credit + "<br>" + tipsTxtArr[16] + Cost;
	$("tipspcord").style.lineHeight = "65px";
	tipsDivShow(3,"tipspcord",4); 
	$("pinCodeInput").focus(); 
	return;
}
/*********************************************************************/
/* Function: controlPinCode                                          */
/* Description: Parental Control Pin-code 处理 	                     */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/ 
function controlPinCode(){ //Parental_Control Pin-code
	$("pincodetxt").innerHTML = '';
	$("tipspcord").style.lineHeight = "150px"; 
	tipsDivShow(3,"tipspcord",5); 
	$("pinCodeInput").focus();
	return;
}
/*********************************************************************/
/* Function: tipsShow                                                */
/* Description: 提示框状态         				   	                 */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/ 
function tipsDivShow(sta,divid,num){
	clearTimeout(timer_tips);
	if(camenuSta){ //如果CA菜单显示,则隐藏;
		$("CAMenu").style.display = "none";
		camenuSta = false;
	}
	if(dvbsearchSta){
		dvbsearchSta = false; 
		$("dvbSearch").style.display = "none";  
	}
	$("pinCodeInput").value = ''; //清空 pin code; 
	tipsDifvHiddenAll();
	tipsStatus = sta; 
	var idArr = new Array("tipsTxtBtn","tipsTxt","pinCodeTitle");
	var txtid = idArr[tipsStatus-1];
	(sta==3) ? $(txtid).value = tipsTxtArr[num] : $(txtid).innerHTML = tipsTxtArr[num];  
	$(divid).style.display = "block";
	timer_tips = setTimeout(function (){tipsDivHidden(divid);},10000);
	return;     
}
/*********************************************************************/
/* Function: tipsDivHidden                                           */
/* Description: 隐藏提示框         				   	                 */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/ 
function tipsDivHidden(idsta){
	clearTimeout(timer_tips); 
	tipsStatus = 0;
	$(idsta).style.display = "none"; 
	return;
}
/*********************************************************************/
/* Function: tipsDifvHiddenAll                                       */
/* Description: 隐藏全部提示框         				   	             */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/ 
function tipsDifvHiddenAll(){ 
	tipsDivHidden("tipsBtn");
	tipsDivHidden("tipspcord");
	tipsDivHidden("tipsTxtDiv");
	return;
}
/*********************************************************************/
/* Function: confirmFun                                              */
/* Description: 弹出框的确认键处理   				   	                 */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/ 
function confirmFun(){
	if(tipsDivId == "upgrade"){
		dvbUpgradeFun();
	}
	if(tipsDivId == "standby"){ 
		standbyStatus = true;
		dvbObj.standby(); 
		$("cancelBtn").focus();
	}
	if(tipsDivId == "searchAgain"){ 
		showDvbSet();
	}
	tipsDivHidden("tipsBtn");
	return;
}
function cancelFun(){
	tipsDifvHiddenAll();
	if(tipsDivId == "upgrade"){
		dvbObj.DVBNoupgrade(1);
		clearTimeout(timer_tips);
		setTimeout("playDvb(channelNum);",2000);
		//playDvb(channelNum);
		tipsDivId = null;
	}
	return;
}
/*********************************************************************/
/* Function: dvbUpgradeCheack                                        */
/* Description: 检测升级服务器流     				   	                 */
/* Parameters:   freq,sysmborate,qam,checkTime                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/ 
function dvbUpgradeCheack(){
	var infoArr = dvbObj.getUpgadeInfo();
	dvbObj.checkUpgrade(infoArr[0], infoArr[1], infoArr[2], 64, infoArr[3], infoArr[4], infoArr[5]);
	return;
}
/*********************************************************************/
/* Function: dvbUpgradeFun                                           */
/* Description: DVB升级函数处理     				   	                 */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/ 
function dvbUpgradeFun(){ 
	var infoArr = dvbObj.getUpgadeInfo();
	dvbObj.upgradeDown(0,0,infoArr[2],0,infoArr[5]);
	getDownProcess();
	return;
}

function listInit(){
	channelList = {};
	channelList = new ShowListFactory({
		id:"channelList",		//表格的id
		top:0,	
		left:710,
		width:540,
		height:720,
		style:{
			background:'#000000',
			opacity: 0.8,
			//border: "solid 1px #444",
			"box-shadow": "0px 4px 4px #333",
			"border-radius": "5px"
		}
	}); 
	channelList.init();
	channelList.createList({		//创建分割线
		listBoxStyle:"listBoxStyle",
		listLineStyle:"listLineStyle",
		totalLine:11,
		lineIdKey:"listLine",
		lineHeight:50
	});
	channelList.createList({		//显示分割线
		line: 11,
		id: "listLine",
		rowStyle:["listLineStyle"],
		data:[]
	});
	channelList.createList({		//创建列表内容
		listBoxStyle:"channelListBoxStyle",
		listLineStyle:"channelListLineStyle",
		totalLine:everyPageLine,
		lineIdKey:"channelList",
		lineHeight:50
	});
}

//显示右下角的当前页数和总页数,    listCurrentPageNo: 列表的当前页数-1, totalPageNum: 列表总页数, listObj: 实例化的列表对象
function showBottomPage(listCurrentPageNo, totalPageNum, listObj){	
	if(totalPageNum == 0)return;	//空数据时不显示页码
	listObj.createUnit({		
		id:"pageText",
		className:"pageText",
		text: (listCurrentPageNo+1) + "/" + totalPageNum
	});
}

function showChannelPageContext(initListArr){
	if(initListArr.length == 0){
		channelListFocus.removeFocus();
	}
	var channelListTotalArr = initListArr;
	//listTotalNum = arr.length;
	listTotalNum = channelListTotalArr.length;   //------------------------------
	var channelListPagingDataArr = channelList.dataListPaging({
		limits:everyPageLine,
		//data:dataListFormat(arr)
		data:dataListFormat(channelListTotalArr)   //------------------------------
	});
	channelList.showListContext({		//显示列表内容
		line: everyPageLine,
		id: "channelList",
		rowStyle:["channelFavouriteRow","channelNoRow","channelNameRow"],
		data:channelListPagingDataArr[listCurrentPageNo]
	});
}

//显示频道列表标题
function showChannelListTitle(){
	channelList.createUnit({		//创建list标题
		id:"channelListTitle",
		className:"channelListTitle",
		text:"CHANNEL LIST"
	});
}

//显示频道列表
function showChannelList(){
	hideReminderList();
	hideFavouriteList();
	hideChannelInfo();
	channelListStatus = 1;
	listInit();
	showChannelListTitle();
	channelListFocusInit();
	showChannelPageContext(getChannelList());
	//showBottomPage(listCurrentPageNo, Math.ceil(arr.length/everyPageLine));
	var channelListTotalArr = getChannelList();
	showBottomPage(listCurrentPageNo, Math.ceil(channelListTotalArr.length/everyPageLine), channelList);   //------------------------------
}

function hideChannelList(){
	channelListStatus = 0;
	//channelList = {};		//频道列表
	listCurrentPageNo = 0;	//频道列表当前的页数-1
	listTotalNum = 0;		//频道列表总数
	listFocusIndex = 0;		//频道的焦点位置引索(相对于所有频道的引索)
	channelListFocus.removeFocus();
	channelList.removeList();
}

//添加或删除收藏频道
function editFavourite(){
	var channelObjArr = getChannelList();
	var singleChannel = channelObjArr[listFocusIndex];
	var fd = dvbObj.openTextFile("/root/favouriteChannel.txt");
	var textContext = dvbObj.readTextFile(fd, 1000);
	dvbObj.removeTextFile("/root/favouriteChannel.txt");
	fd = dvbObj.openTextFile("/root/favouriteChannel.txt");
	if(singleChannel.favourite){	//当已经被收藏时
		var favouriteChannelArr = textContext.split(",");
		for(var i = 0; i < favouriteChannelArr.length; i++){
			if(favouriteChannelArr[i] == singleChannel.channelNo){
				favouriteChannelArr.splice(i,1);
			}
		}
		dvbObj.writeTextFile(fd, favouriteChannelArr.join(","), 1000);
		//$("favourite"+(listFocusIndex%everyPageLine)).style.display = "none";
		$("favourite"+listFocusIndex).style.display = "none";
	}else{		//当没有被收藏时
		if(textContext == -1){		//文件为空时
			dvbObj.writeTextFile(fd, singleChannel.channelNo, 1000);
		}else{		//文件不为空时
			var favouriteChannelArr = textContext.split(",");
			favouriteChannelArr.push(singleChannel.channelNo);
			dvbObj.writeTextFile(fd, favouriteChannelArr.join(","), 1000);
		}
		//$("favourite"+(listFocusIndex%everyPageLine)).style.display = "block";
		$("favourite"+listFocusIndex).style.display = "block";
	}
}

//显示频道列表标题
function showFavouriteListTitle(){
	channelList.createUnit({		//创建list标题
		id:"favouriteListTitle",
		className:"channelListTitle",
		text:"FAVOURITE LIST"
	});
}

//显示收藏列表
function showFavouriteList(){
	hideReminderList();
	channelListFavouriteStatus = 1;
	hideChannelInfo();
	listInit();
	showFavouriteListTitle();
	channelListFocusInit();
	//showChannelPageContext();
	var channelListTotalArr = getChannelList();
	var favouriteArr = new Array();
	for(var i = 0; i < channelListTotalArr.length; i++){
		if(channelListTotalArr[i].favourite){
			favouriteArr.push(channelListTotalArr[i]);
		}
	}
	showChannelPageContext(favouriteArr);
	showBottomPage(listCurrentPageNo, Math.ceil(favouriteArr.length/everyPageLine),channelList);   //------------------------------
}

//隐藏收藏列表
function hideFavouriteList(){
	channelListFavouriteStatus = 0;
	listFocusIndex = 0;		//频道的焦点位置引索(相对于所有频道的引索)
	listCurrentPageNo = 0;	//频道列表当前的页数-1
	listTotalNum = 0;		//频道列表总数
	channelListFocus.removeFocus();
	channelList.removeList();
}

var arr = [{favourite:true,channelNo:1,channelName:"CCTV-1"},{favourite:true,channelNo:2,channelName:"CCTV-2"},
			{favourite:true,channelNo:3,channelName:"CCTV-3"},{favourite:false,channelNo:4,channelName:"CCTV-5"},
			{favourite:true,channelNo:5,channelName:"JSTV"},{favourite:false,channelNo:6,channelName:"ZTV"},
			{favourite:true,channelNo:7,channelName:"AUSRALIA TV"},{favourite:true,channelNo:8,channelName:"GTV"},
			{favourite:true,channelNo:9,channelName:"CCTV NEWS"},{favourite:true,channelNo:10,channelName:"Games TV"},
			{favourite:true,channelNo:11,channelName:"HLJTV"},{favourite:true,channelNo:12,channelName:"NMGTV"},
			{favourite:true,channelNo:13,channelName:"Music TV"},{favourite:true,channelNo:14,channelName:"Movies TV"},
			{favourite:true,channelNo:15,channelName:"MTV"},{favourite:false,channelNo:16,channelName:"SDTV"},
			{favourite:false,channelNo:17,channelName:"BTV-2"},{favourite:false,channelNo:18,channelName:"BTV-6"},
			{favourite:false,channelNo:19,channelName:"NMG TV"},{favourite:true,channelNo:20,channelName:"游戏风云"},
			{favourite:false,channelNo:21,channelName:"1 TV"},{favourite:true,channelNo:22,channelName:"2 TV"},
			{favourite:false,channelNo:23,channelName:"3 TV"},{favourite:false,channelNo:24,channelName:"4 TV"}];
			
function dataListFormat(dataArr){		//格式化数据，使方法showListContext的data可以操作数据， dataArr为一维对象数组
	var listDataArr = new Array();		//所输出的被格式化的二维数组
	//var print ="";
	for(var i = 0; i < dataArr.length; i++){
		var unitDataArr = new Array();		//每行元素的数组
		for(var key in dataArr[i]){
			//alert(typeof dataArr[i][key]);
			if((typeof dataArr[i][key]) == "boolean" && dataArr[i][key] == true){
				unitDataArr.push({
					text : "",
					id : (key+i),
					display:true
				});
				continue;
			}
			unitDataArr.push({
				text : (!dataArr[i][key]) ? "" : dataArr[i][key],
				id : (key+i)
			});
			//alert(dataArr[i][key]);
			//print += JSON.stringify({
			//	text : (!dataArr[i][key]) ? "" : dataArr[i][key],
			//	id : (key+i)
			//});
		}
		//print += ",";
		listDataArr.push(unitDataArr);
	}
	//alert(print);
	return listDataArr;
}

function getChannelList(){
	var channelTotal = dvbObj.getChannelTatol();
	var channelNoArr = new Array();		//逻辑频道号数组
	var channelNoShowArr = new Array();		//用来显示的频道号数组
	var channelNameArr = new Array();		//逻辑频道号对应的频道名称数组
	var channelObjArr = new Array();		//频道键值对数组, eg:[{channelNo:1,channelName:"cctv1"},{channelNo:2,channelName:"cctv2"}]
	var fd = dvbObj.openTextFile("/root/favouriteChannel.txt");
	var textContext = dvbObj.readTextFile(fd, 1000);
	var favouriteChannelNoArr = textContext.split(",") || [];		//被收藏的逻辑频道号
	//alert("favouriteChannelNoArr==="+favouriteChannelNoArr+", textContext======"+textContext);
	//var print = "";
	for(var i = 0; i < channelTotal; i++){
		channelNoArr.push(dvbObj.getLcn(i));
		channelNoShowArr.push(dvbObj.getChannelNum(dvbObj.getLcn(i)));
		channelNameArr.push(dvbObj.getChannelName(channelNoArr[i]));
		channelObjArr.push({
			favourite:false,
			channelNo:channelNoShowArr[i],
			channelName:strLength(channelNameArr[i], 28)
		});
		if(textContext != -1){
			for(var j = 0; j < favouriteChannelNoArr.length; j++){
				if(channelNoShowArr[i] == favouriteChannelNoArr[j]){
					channelObjArr[i].favourite = true;
				}
			}
		}
		//print += JSON.stringify(channelObjArr[i]);
	}
	//alert(print);
	return channelObjArr;
}

function channelListFocusInit(){
	channelListFocus.createFocus("channelListFocus", "channelListFocus");
}

function keyEnter(){
	if(channelListStatus){		//频道列表显示状态
		var totalChannnelListArr = getChannelList();
		for(var i = 0; i < totalChannnelListArr.length; i++){
			if(listFocusIndex == i){
				channelNum = listFocusIndex;
				tipsDifvHiddenAll();
				playDvb(channelNum); 
			}
		}
		return;
	}
	if(remindeDialogStatus){	//reminder提示框
		if(reminderDialogButtonFocus == 0){		//ok key
			//playChannel(reminderPlayLcn);
			//alert(reminderPlayLcn+" , "+dvbObj.getChannelTatol());
			for(var i = 0; i < dvbObj.getChannelTatol(); i++){
				if(reminderPlayLcn == parseInt(dvbObj.getLcn(i))){
					channelNum = i;
					playDvb(channelNum);
					//alert("reminderPlayLcn === "+reminderPlayLcn+" , playNum ==== "+playNum);
				}
			}
		}
		$("reminderDialog").style.display = "none";
		
		remindeDialogStatus = 0;
	}
	if(channelListFavouriteStatus){		//收藏频道列表显示状态
		//var totalChannnelListArr = getChannelList();
		if(dialogStatus == 0){		//当没弹出对话框时
			dialogStatus = 1;
			/*$("dialogContext").innerHTML = "How to operate the channel ? ";*/
			$("button0").innerHTML = "Play";
			$("button1").innerHTML = "Delete";
			$("button2").innerHTML = "Cancel";
			//$("channelList").style.display = "none";
			//$("channelListFocus").style.display = "none";
			//alert(listFocusIndex%everyPageLine);
			$("dialog").style.top = ((listFocusIndex%everyPageLine)*50 + 115) + "px";
			$("dialog").style.display = "block";
			//showFavouriteHandler();
			dialogFocusRefresh();
		}else{		//当已经弹出对话框时
			dialogStatus = 0;
			favouriteDialogEnter();
			$("dialog").style.display = "none";
			$("channelList").style.display = "block";
			$("channelListFocus").style.display = "block";
			dialogButtonFocus = 0;
		}
	}else if(programListStatus){		//节目单列表显示状态
		editReminder();
		showReminderDialog();
	}else if(reminderListStatus){
		//editReminder();
		deteleReminder();
		showReminderDialog();
		showReminderList();
	}else{
		dvbObj.clearCAInfo();
	}
}

//显示收藏列表里，确定键后的弹出框
/*function showFavouriteHandler(){
	var testDv = document.createElement("div");
	testDv.id = "dialog;
    testDv.style = "position:absolute;top:50px;left:500px;width:200px;height:50px;background:#000000;";
    document.body.appendChild(testDv);
    var button0 = document.createElement("div");
    button0.id = "button0";
    button0.className = "button";
    button0.innerHTML = "play";
    testDv.appendChild(button0);
    var button1 = document.createElement("div");
    button1.id = "button1";
    button1.className = "button";
    button1.innerHTML = "delete";
    testDv.appendChild(button1);
    var button2 = document.createElement("div");
    button2.id = "button2";
    button2.className = "button";
    button2.innerHTML = "cancel";
    testDv.appendChild(button2);
   	var dialog = new FocusFactory();
   	dialog.createFocus("dialog","dialog");
    
    //testDv.style.display = "block";
}*/

function favouriteDialogEnter(){
	if(dialogButtonFocus == 0){
		var channelListTotalArr = getChannelList();
		var favouriteArr = new Array();
		for(var i = 0; i < channelListTotalArr.length; i++){
			if(channelListTotalArr[i].favourite){
				favouriteArr.push(channelListTotalArr[i]);
			}
		}
		for(var j = 0; j < channelListTotalArr.length; j++){
			if(favouriteArr[listFocusIndex].channelNo == channelListTotalArr[j].channelNo){
				channelNum = j;
			}
		}
		//alert(favouriteArr[listFocusIndex].channelNo);
		var total = dvbObj.getChannelTatol();
		for(var i = 0; i < total; i++){
			var lcn = dvbObj.getLcn(i);
			if(dvbObj.getChannelNum(lcn) == favouriteArr[listFocusIndex].channelNo){
				tipsDifvHiddenAll();
				playDvb(i);
			}
		}
	}else if(dialogButtonFocus == 1){
		//hideFavouriteList();
		var channelListTotalArr = getChannelList();
		var favouriteArr = new Array();
		for(var i = 0; i < channelListTotalArr.length; i++){
			if(channelListTotalArr[i].favourite){
				favouriteArr.push(channelListTotalArr[i]);
			}
		}
		var deleteFavouriteNo = favouriteArr[listFocusIndex].channelNo;
		var fd = dvbObj.openTextFile("/root/favouriteChannel.txt");
		var textContext = dvbObj.readTextFile(fd, 1000);
		dvbObj.removeTextFile("/root/favouriteChannel.txt");
		fd = dvbObj.openTextFile("/root/favouriteChannel.txt");
		//alert(deleteFavouriteNo);
		var favouriteChannelArr = textContext.split(",");
		for(var i = 0; i < favouriteChannelArr.length; i++){
			if(favouriteChannelArr[i] == deleteFavouriteNo){
				favouriteChannelArr.splice(i,1);
			}
		}
		dvbObj.writeTextFile(fd, favouriteChannelArr.join(","), 1000);
		for(var i = 0; i < favouriteArr.length; i++){
			if(favouriteArr[i].channelNo == deleteFavouriteNo){
				favouriteArr.splice(i,1);
				if(i == favouriteArr.length){
					channelListFocus.moveFocus({
						top:((i-1)*50+113)+"px"
					});
					listFocusIndex--;
				}
				if(favouriteArr.length == 0){
					channelListFocus.removeFocus();
				}
			}
		}
		
		showChannelPageContext(favouriteArr);
		//showFavouriteList();
	}else if(dialogButtonFocus == 2){
		
	}
}

function dialogFocusRefresh(){
	for(var i = 0; i < 3; i++){
		$("button"+i).style.border = "solid 3px #333333";
		$("button"+i).style.color = "#666666";
	}
	$("button"+dialogButtonFocus).style.border = "solid 3px #999999";
	$("button"+dialogButtonFocus).style.color = "#ffffff";
}

function keyLeft(){
	if(dialogStatus == 1){	//收藏dialog
		(dialogButtonFocus > 0) ? (dialogButtonFocus--) : (dialogButtonFocus = 0);
		dialogFocusRefresh();
	}
	if(programListStatus){	//节目单列表刷新日期
		hideProgramList();
		//alert(programListDelay);
		programListDelay--;
		if(programListDelay < 0) {
			programListDelay = 0;
		}
		showReminderDialog();
		showProgramList(programListDelay);
	}
	if(remindeDialogStatus){	//reminder提醒框
		$("cancelReminder").style.border = "solid 3px #333333";
		$("cancelReminder").style.color = "#666666";
		$("okReminder").style.border = "solid 3px #999999";
		$("okReminder").style.color = "#ffffff";
		reminderDialogButtonFocus = 0;
	}
}

function keyRight(){
	if(dialogStatus == 1){
		(dialogButtonFocus < 2) ? (dialogButtonFocus++) : (dialogButtonFocus = 2);
		dialogFocusRefresh();
	}
	if(programListStatus){
		hideProgramList();
		//alert(programListDelay);
		programListDelay++;
		if(programListDelay < 0) {
			programListDelay = 0;
		}
		//alert("programListDelay ======== "+programListDelay);
		showReminderDialog();
		showProgramList(programListDelay);
	}
	if(remindeDialogStatus){	//reminder提醒框
		$("okReminder").style.border = "solid 3px #333333";
		$("okReminder").style.color = "#666666";
		$("cancelReminder").style.border = "solid 3px #999999";
		$("cancelReminder").style.color = "#ffffff";
		reminderDialogButtonFocus = 1;
	}
}

function keyDown(){
	if(dialogStatus)return;		//弹出框显示状态，屏蔽按键
	if(channelListStatus == 0 && programListStatus == 0 && reminderListStatus == 0 && channelListFavouriteStatus == 0){
		tipsDifvHiddenAll();
		channelSwith('channel-');
	}
	var listIndex = 0;
	listFocusMove(1);
	if(channelListStatus){		//频道列表显示状态
		showChannelPageContext(getChannelList());
		return;
	}
	if(programListStatus){
		if((listFocusIndex%everyPageLine) == 0){
			showProgramPageContext(getProgramList());
			//alert((listFocusIndex%everyPageLine) + " , " + (everyPageLine-1));
		}
		return;
	}
	if(reminderListStatus){
		if((listFocusIndex%everyPageLine) == 0){
			showProgramPageContext(getProgramList());
		}
		return;
	}
}

function keyUp(){
	if(dialogStatus)return;		//弹出框显示状态，屏蔽按键
	if(channelListStatus == 0 && programListStatus == 0 && reminderListStatus == 0 && channelListFavouriteStatus == 0){
		tipsDifvHiddenAll();
		channelSwith('channel+');
	}
	var listIndex = 0;
	listFocusMove(0);
	if(channelListStatus){		//频道列表显示状态
		showChannelPageContext(getChannelList());
		return;
	}
	if(programListStatus){
		if((listFocusIndex%everyPageLine) == (everyPageLine-1)){
			showProgramPageContext(getProgramList());
			//alert((listFocusIndex%everyPageLine) + " , " + (everyPageLine-1));
		}
		return;
	}
	if(reminderListStatus){
		if((listFocusIndex%everyPageLine) == (everyPageLine-1)){
			showProgramPageContext(getProgramList());
		}
		return;
	}
}

function listFocusMove(status){		//列表焦点移动的方向(0: up, 1: down)
	var listIndex = 0;
	//if(channelListStatus){
		if(status){		//down
			if(listFocusIndex == (listTotalNum - 1))return;
			listFocusIndex++;
			if((listFocusIndex%everyPageLine) < (everyPageLine - 1)){
				listIndex = listFocusIndex%everyPageLine;
			}else{
				listIndex = everyPageLine - 1;
			}
			if((listFocusIndex%everyPageLine) == 0){
				listCurrentPageNo++;
				$("pageText").innerHTML = (listCurrentPageNo + 1) + "/" + Math.ceil(listTotalNum/everyPageLine);
			}
		}else{		//up
			if(listFocusIndex == 0)return;
			listFocusIndex--;
			if((listFocusIndex%everyPageLine) < (everyPageLine - 1)){
				listIndex = listFocusIndex%everyPageLine;
			}else{
				listIndex = everyPageLine - 1;
			}
			if((listFocusIndex%everyPageLine) == (everyPageLine-1)){
				listCurrentPageNo--;
				$("pageText").innerHTML = (listCurrentPageNo + 1) + "/" + Math.ceil(listTotalNum/everyPageLine);
			}
		}
		channelListFocus.moveFocus({
			top:(listIndex*50+113)+"px"
		});
	//}
}

var numberStore = "";	//保存数字键
var numberKeyTimer;		//数字键计时器
//数字键切台
function numberSwitchChannel(keyVal){
	var num = keyVal - 48;
	clearTimeout(numberKeyTimer);
	numberStore += num;
	showChannelNum(numberStore);
	numberKeyTimer = setTimeout(function(){
		var totalChannelList = getChannelList();
		for(var i = 0; i < totalChannelList.length; i++){
			if(totalChannelList[i].channelNo == numberStore){
				tipsDifvHiddenAll();
				playDvb(i);
				channelNum = i;
				$("ChannenlNumDiv").innerHTML = "";
				$("ChannenlNumDiv").innerHTML = numberStore;
				break;
			}
		}
		numberStore = "";
	},2000);
}

//隐藏节目频道信息
function hideChannelInfo(){
	channelInfoStatus = 0;
	$("channelInfo").style.display = "none";
}

function getDetailTimeArr(){
	//var date = new Date(new Date()-24*60*60*1000);
	var date = new Date();
	var dateArr = new Array();
	dateArr[0] = date.getFullYear();
	dateArr[1] = date.getMonth()+1;
	dateArr[2] = date.getDate();
	dateArr[3] = date.getHours();
	dateArr[4] = date.getMinutes();
	dateArr[5] = date.getSeconds();
	return dateArr;
}

//显示频道信息
function showChannelInfo(){
	channelInfoStatus = 1;
	hideFavouriteList();
	hideChannelList();
	var dateArr = getDetailTimeArr();
	$("channelInfo").style.display = "block";
	//var nowChannelInfo = eval("("+ dvbObj.getCurrPlayInfo() +")");
	//var nextChannelInfo = eval("("+ dvbObj.getNextPlayInfo() +")");
	var nowChannelInfo = eval("("+ dvbObj.getPresentEvent(dateArr[0],dateArr[1],dateArr[2],dateArr[3],dateArr[4],dateArr[5]) +")");
	var nextChannelInfo = eval("("+ dvbObj.getNextEvent(dateArr[0],dateArr[1],dateArr[2],dateArr[3],dateArr[4],dateArr[5]) +")");
	//alert(dvbObj.getCurrPlayInfo()+" , "+dvbObj.getNextPlayInfo());
	//$("nowName").innerHTML = "áéíó";
	$("nowName").innerHTML = "Now ("+ strLength(nowChannelInfo.eventName,30) +")";
	$("nowTime").innerHTML = showchannelTime(nowChannelInfo.startTime, nowChannelInfo.duration);
	//$("nowTime").innerHTML = "12:00:00 - 12:30:00";
	$("nowContext").innerHTML = strLength(nowChannelInfo.shortDec,210);
	
	$("nextName").innerHTML = "Next ("+ strLength(nextChannelInfo.eventName,30) +")";
	$("nextTime").innerHTML = showchannelTime(nextChannelInfo.startTime, nextChannelInfo.duration);
	$("nextContext").innerHTML = strLength(nextChannelInfo.shortDec,210);
}

//显示频道节目的播出时间(start: 开始时间[必选], duration: 总时间[可选, 秒]), 如果不传duration参数,就直接返回开始时间
function showchannelTime(start, duration){
	var startHour = parseInt(start.split(" ")[1].split(":")[0]);
	var startMinute = parseInt(start.split(" ")[1].split(":")[1]);
	var startSecond = parseInt(start.split(" ")[1].split(":")[2]);
	var addHour = 0;
	var addMinute = 0;
	var addSecond = 0;
	if(duration){
		addHour = parseInt(parseInt(duration) / 3600);
		addMinute = parseInt((parseInt(duration) - addHour * 3600) / 60);
		addSecond = parseInt(duration) - addHour * 3600 - addMinute * 60;
	}
	var endHour = startHour + addHour;
	var endMinute = startMinute + addMinute;
	var endSecond = startSecond + addSecond;
	if(endSecond >= 60){
		endSecond -= 60;
		endMinute += 1;
	}
	if(endMinute >= 60){
		endMinute -= 60;
		endHour += 1;
	}
	if(endHour >= 24){
		endHour -= 24;
	}
	//alert(endHour+":"+addZero(endMinute)+":"+addZero(endSecond));
	if(duration){
		//return addZero(startHour) + ":" + addZero(startMinute) + ":" + addZero(startSecond) + " - " + addZero(endHour) +":" + addZero(endMinute) + ":" + addZero(endSecond);
		return addZero(startHour) + ":" + addZero(startMinute) + " - " + addZero(endHour) +":" + addZero(endMinute);
	}else{
		//return addZero(startHour) + ":" + addZero(startMinute) + ":" + addZero(startSecond);
		return addZero(startHour) + ":" + addZero(startMinute);
	}
	
}

//时间补0
function addZero(num){
	if(num < 10){
		num = "0" + num;
	}
	return num;	
}

/*********************** 
 * Description: 字符串截取 ,
 * parameters: str为字符串, length为要求的长度
 * **********************/
function strLength(str, length){
	var len = str.length;
	if(len >= length){
		return str.substring(0,length-3) + "...";
	}
	return str;
}

//获取节目单列表的时间, delay为延迟的天数[int](0为当天, 1为第二天, 依次排序...),不传参数或参数小于0也为当天开始
function getProgramListTimeStr(delay){
	var dayNum = delay;
	if(!delay || delay < 0){
		dayNum = 0;
	}else{
		dayNum = delay;
	}
	//dvbObj.sycToNTP();
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate()+dayNum;
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	var startDate = new Date((date/1000+86400*dayNum)*1000);
	var startYear = startDate.getFullYear();
	var startMonth = startDate.getMonth()+1;
	var startDay = startDate.getDate();
	var toDate = new Date((date/1000+86400*(dayNum+1))*1000);
	var toYear = toDate.getFullYear();
	var toMonth = toDate.getMonth()+1;
	var toDay = toDate.getDate();
	//return startYear+","+startMonth+","+startDay+","+hour+","+minute+","+second+","+toYear+","+toMonth+","+toDay+","+hour+","+minute+","+second;
	return startYear+","+startMonth+","+startDay+","+0+","+0+","+0+","+startYear+","+startMonth+","+startDay+","+23+","+59+","+59;
}

//获取节目单信息数组
function getProgramList(delay){
	if(!delay || (delay < 0) || (typeof delay != "number")){
		var daleyDay = 0;
	}else{
		var daleyDay = delay;
	}
	//alert(getProgramListTimeStr(1));
	var programCount = dvbObj.getScheduleEventIdCount(getProgramListTimeStr(daleyDay));
	//alert("getProgramListTimeStr(daleyDay)==================="+getProgramListTimeStr(daleyDay));
	//alert("programCount==================="+programCount);
	//var programCount = dvbObj.getScheduleEventIdCount("2013,11,7,0,0,0,2013,11,8,0,0,0");	
	var idArr = new Array();		//节目单id数组
	var infoArr = new Array();		//节目单具体信息数组
	var programArr = new Array();		//节目单对象数组
	var fd = dvbObj.openTextFile("/root/reminderProgram.txt");
	var textContext = dvbObj.readTextFile(fd, 1000);
	var reminderStoreArr = textContext.split(";") || [];		//设置提醒的对象数组{channelNo:900,programId:"12",startTime:"2013-11-7 12:30:00"};
	var storeIdArr = new Array();	//当前频道所设置的reminder节目的ID数组
	for(var i = 0; i < reminderStoreArr.length; i++){
		var singleInfo = eval("(" + reminderStoreArr[i] + ")");
		if(singleInfo.channelNo == currentChannelNo){
			storeIdArr.push(singleInfo.programId);
		}
	}
	for(var i = 0; i < programCount; i++){
		idArr.push(dvbObj.getEventIdByIndex(i, programCount));
		infoArr.push(eval("(" + dvbObj.getEventInfoById(idArr[i]) + ")"));
		//alert(i+"---"+infoArr[i]);
		//alert(showchannelTime(infoArr[i].startTime));
		programArr.push({
			startTime:showchannelTime(infoArr[i].startTime),
			programName:strLength(infoArr[i].eventName, 28),
			reminder:false		//true为显示铃铛图标，false不显示
		});
		for(var j = 0; j < storeIdArr.length; j++){		//读取文件中已经保存的reminder
			if(storeIdArr[j] == idArr[i]){
				programArr[i].reminder = true;
			}
		}
	}
	//alert(programCount);
	return programArr;
}

//节目单列表初始化
function programListInit(){
	programList = {};
	programList = new ShowListFactory({
		id:"programList",		//表格的id
		top:0,	
		left:710,
		width:540,
		height:720,
		style:{
			background:'#000000',
			opacity: 0.8,
			//border: "solid 1px #444",
			"box-shadow": "0px 4px 4px #333",
			"border-radius": "5px"
		}
	}); 
	programList.init();
	programList.createList({		//创建分割线
		listBoxStyle:"listBoxStyle",
		listLineStyle:"listLineStyle",
		totalLine:11,
		lineIdKey:"listLine",
		lineHeight:50
	});
	programList.createList({		//显示分割线
		line: 11,
		id: "listLine",
		rowStyle:["listLineStyle"],
		data:[]
	});
	programList.createList({		//创建列表内容
		listBoxStyle:"channelListBoxStyle",
		listLineStyle:"channelListLineStyle",
		totalLine:everyPageLine,
		lineIdKey:"programList",
		lineHeight:50
	});
}

//创建节目单标题的频道名
function showProgramNameListTitle(){
	programList.createUnit({		
		id:"programListTitle",
		className:"programListTitle",
		text:dvbObj.getChannelNum(currentChannelNo)+" - "+dvbObj.getChannelName(currentChannelNo)
	});
}

//创建节目单标题
function showProgramTitle(){
	programList.createUnit({		
		id:"programTitle",
		className:"programTitle",
		text:"PROGRAM LIST"
	});
}

//显示的日期
function showDateStore(){
	var d = new Date();
	var date = new Date((d/1000+86400*programListDelay)*1000);
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	return year+"-"+month+"-"+day;
}
//显示的日期
function showDate(){
	var d = new Date();
	var date = new Date((d/1000+86400*(programListDelay))*1000);
	//var date = new Date((d/1000+86400*(programListDelay-1))*1000);
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	return year+"-"+month+"-"+day;
}

//创建节目单标题日期
function showProgramDateListTitle(){
	programList.createUnit({		
		id:"programListDateTitle",
		className:"programListDateTitle",
		text:showDate()
		//text:year+" - "+month+" - "+day
	});
}

function showProgramPageContext(initListArr){
	if(initListArr.length == 0){
		channelListFocus.removeFocus();
	}
	var channelListTotalArr = initListArr;
	//listTotalNum = arr.length;
	listTotalNum = channelListTotalArr.length;   //------------------------------
	var channelListPagingDataArr = programList.dataListPaging({
		limits:everyPageLine,
		//data:dataListFormat(arr)
		data:dataListFormat(channelListTotalArr)   //------------------------------
	});
	programList.showListContext({		//显示列表内容
		line: everyPageLine,
		id: "programList",
		rowStyle:["programTimeRow","programNameRow","programReminderRow"],
		data:channelListPagingDataArr[listCurrentPageNo]
	});
}

//显示节目单列表
function showProgramList(delay){
	hideFavouriteList();
	hideChannelInfo();
	hideChannelList();
	hideReminderList();
	programListStatus = 1;
	programListInit();
	showProgramTitle();
	showProgramNameListTitle();
	showProgramDateListTitle();
	channelListFocusInit();
	showProgramPageContext(getProgramList(delay));
	//showBottomPage(listCurrentPageNo, Math.ceil(arr.length/everyPageLine));
	var programListTotalArr = getProgramList();
	showBottomPage(listCurrentPageNo, Math.ceil(programListTotalArr.length/everyPageLine), programList);   //------------------------------
}

//隐藏节目单列表
function hideProgramList(){
	programListStatus = 0;
	listFocusIndex = 0;		//频道的焦点位置引索(相对于所有频道的引索)
	listCurrentPageNo = 0;	//频道列表当前的页数-1
	listTotalNum = 0;		//频道列表总数
	//programListDelay = 0;	//清空时间延迟天数
	channelListFocus.removeFocus();
	programList.removeList();
}

//添加或删除节目单reminder
function editReminder(){
	var programObjArr = getProgramList();
	var singleProgram = programObjArr[listFocusIndex];
	//dvbObj.printf("singleProgram ============ "+JSON.stringify(singleProgram));
	//alert(JSON.stringify(singleProgram));
	var fd = dvbObj.openTextFile("/root/reminderProgram.txt");
	var textContext = dvbObj.readTextFile(fd, 1000);
	dvbObj.removeTextFile("/root/reminderProgram.txt");
	fd = dvbObj.openTextFile("/root/reminderProgram.txt");
	if(singleProgram.reminder){	//当已经被设置提醒时
		var strArr = textContext.split(";");
		var reminderProgramArr = new Array();
		for(var j = 0; j < strArr.length; j++){
			reminderProgramArr.push(eval("("+strArr[j]+")"));
		}
		for(var i = 0; i < reminderProgramArr.length; i++){
			//alert(reminderProgramArr[i].startTime + "---"+i+"---"+ (showDateStore()+" "+singleProgram.startTime));
			if((reminderProgramArr[i].channelNo == currentChannelNo) && (reminderProgramArr[i].programId == dvbObj.getEventIdByIndex(listFocusIndex,listTotalNum)) && (reminderProgramArr[i].startTime == (showDateStore()+" "+singleProgram.startTime))){
				//alert("-----remove-----");
				strArr.splice(i,1);
			}
		}
		dvbObj.writeTextFile(fd, strArr.join(";"), 1000);
		//$("reminder"+(listFocusIndex%everyPageLine)).style.display = "none";
		$("reminder"+listFocusIndex).style.display = "none";
	}else{		//当没有被reminder时
		if(textContext == -1){		//文件为空时
			dvbObj.writeTextFile(fd, {
				channelNo:currentChannelNo,
				programId:dvbObj.getEventIdByIndex(listFocusIndex,listTotalNum),
				programName:singleProgram.programName,
				startTime:showDateStore()+" "+singleProgram.startTime
			}, 1000);
		}else{		//文件不为空时
			var reminderProgramArr = textContext.split(";");		
			reminderProgramArr.push("{channelNo:"+currentChannelNo+",programId:"+dvbObj.getEventIdByIndex(listFocusIndex,listTotalNum)+",programName:'"+singleProgram.programName+"',startTime:\""+showDateStore()+" "+singleProgram.startTime+"\"}");
			dvbObj.writeTextFile(fd, reminderProgramArr.join(";"), 1000);
		}
		//alert("listFocusIndex ======= "+listFocusIndex+" , listFocusIndex%everyPageLine ========"+(listFocusIndex%everyPageLine));
		//$("reminder"+(listFocusIndex%everyPageLine)).style.display = "block";
		$("reminder"+listFocusIndex).style.display = "block";
	}
}

//删除reminder列表的提醒信息
function deteleReminder(){
	var programObjArr = getProgramList();
	var reminderArr = new Array();
	for(var i = 0; i < programObjArr.length; i++){
		if(programObjArr[i].reminder){
			reminderArr.push(programObjArr[i]);
		}
	}
	var singleProgram = reminderArr[listFocusIndex];
	var fd = dvbObj.openTextFile("/root/reminderProgram.txt");
	var textContext = dvbObj.readTextFile(fd, 1000);
	dvbObj.removeTextFile("/root/reminderProgram.txt");
	fd = dvbObj.openTextFile("/root/reminderProgram.txt");
	var strArr = textContext.split(";");
	var reminderProgramArr = new Array();
	for(var j = 0; j < strArr.length; j++){
		reminderProgramArr.push(eval("("+strArr[j]+")"));
	}
	for(var i = 0; i < reminderProgramArr.length; i++){
		if((reminderProgramArr[i].channelNo == currentChannelNo) && (reminderProgramArr[i].startTime == (showDateStore()+" "+singleProgram.startTime))){
			strArr.splice(i,1);
		}
	}
	dvbObj.writeTextFile(fd, strArr.join(";"), 1000);
	//$("reminder"+(listFocusIndex%everyPageLine)).style.display = "none";
	var record;
	for(var j = 0; j < reminderArr.length; j++){
		if(j == listFocusIndex){
			record = reminderArr.splice(i,1);
		}
	}
	//showProgramPageContext(reminderArr);

}

//显示reminder消息
function showReminderDialog(){
	reminderTimer = {};
	var fd = dvbObj.openTextFile("/root/reminderProgram.txt");
	var textContext = dvbObj.readTextFile(fd, 1000);
	if(textContext == -1) return;		//文件为空时
	var strArr = textContext.split(";");
	var reminderProgramArr = new Array();
	for(var i = 0; i < strArr.length; i++){
		var record = eval("("+ strArr[i] +")");
		var ret = insertTimer(record.startTime, record.channelNo, record.programName);
		if(!ret){
			strArr.splice(i,1);
		}
	}
	dvbObj.removeTextFile("/root/reminderProgram.txt");
	fd = dvbObj.openTextFile("/root/reminderProgram.txt");
	dvbObj.writeTextFile(fd, strArr.join(";"), 1000);
}

function reminderCurrentTimer(){
	var d = new Date();
	var t = d.getTime();
	t += 5 * 60 * 1000;
	var date = new Date(t);
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = addZero(date.getHours());
	var minute = addZero(date.getMinutes());
	return year+"-"+month+"-"+day+" "+hour+":"+minute;
}

//插入定时器(date: 日期, [eg: "2013-11-7 20:20"]; lcn: 逻辑频道号;), 返回值是定时器名
function insertTimer(date, lcn, programName){
	var reminderYear = date.split(" ")[0].split("-")[0];
	var reminderMonth = date.split(" ")[0].split("-")[1];
	var reminderDay = date.split(" ")[0].split("-")[2];
	var reminderHour = date.split(" ")[1].split(":")[0];
	var reminderMinute = date.split(" ")[1].split(":")[1];
	var reminderTime = reminderYear+"/"+reminderMonth+"/"+reminderDay+" "+reminderHour+":"+reminderMinute+":00";
	//alert(reminderTime);
	var timer = timestamp(reminderTime) - timestamp() - 5 * 60 * 1000;
	//alert(timer);
	//alert(timer);
	if(timer <= 0){
		return 0;
	}
	//alert(""+reminderYear+reminderMonth+reminderDay+reminderHour+reminderMinute+"_"+lcn);
	//alert("'"+programName+"' will be play, do you go to the channel ?"+timer);
	//reminderPlayLcn = lcn;
	reminderPlayLcnArr.push({
		lcn: lcn,
		startTime: reminderYear+"-"+reminderMonth+"-"+reminderDay+" "+reminderHour+":"+reminderMinute
	});
	reminderTimer[""+reminderYear+reminderMonth+reminderDay+reminderHour+reminderMinute+"_"+lcn] = setTimeout(function(){
		hideChannelList();
		hideFavouriteList();
		hideHelpInfo();
		hideProgramList();
		hideReminderList();
		var currTime = reminderCurrentTimer();
		$("reminderDialog").style.display = "block";
		$("cancelReminder").style.border = "solid 3px #333333";
		$("cancelReminder").style.color = "#666666";
		$("okReminder").style.border = "solid 3px #999999";
		$("okReminder").style.color = "#ffffff";
		reminderDialogButtonFocus = 0;
		$("reminderDialogContext").innerHTML = "[ "+strLength(programName,28)+" ] will be play, do you go to the channel ?";
		remindeDialogStatus = 1;
		
		var fd = dvbObj.openTextFile("/root/reminderProgram.txt");
		var textContext = dvbObj.readTextFile(fd, 1000);
		dvbObj.removeTextFile("/root/reminderProgram.txt");
		fd = dvbObj.openTextFile("/root/reminderProgram.txt");
		var strArr = textContext.split(";");
		var reminderProgramArr = new Array();
		for(var j = 0; j < strArr.length; j++){
			var obj = eval("("+strArr[j]+")");
			for(var i = 0; i < reminderPlayLcnArr.length; i++){
				//alert("strArr["+j+"]=="+strArr[j]+" , reminderPlayLcnArr["+i+"] === "+JSON.stringify(reminderPlayLcnArr[i])+" , currTime === "+currTime);
				if(obj.channelNo == reminderPlayLcnArr[i].lcn && obj.startTime == currTime && reminderPlayLcnArr[i].startTime == currTime){
				//if(obj.channelNo == reminderPlayLcnArr[i].lcn && obj.startTime == reminderPlayLcnArr[i].startTime){
					reminderPlayLcn = reminderPlayLcnArr[i].lcn;
					strArr.splice(j, 1);
					reminderPlayLcnArr.splice(i, 1);
					break;
				}
			}
			
		}
		dvbObj.writeTextFile(fd, strArr.join(";"), 1000);
	}, timer);
	return 1;
}

//指定日期转换为时间戳, date: 日期参数[eg:"2013/03/08 00:00:01"]
function timestamp(date){
	if(!date){
		var d = new Date();
	}else{
		var d = new Date(date);
	}
	var timestamp = Date.parse(d); 
	return timestamp; 
}
//alert(timestamp("1970/01/01 08:00:00"));

//两个日期的差值 [eg:DateDiff("2013-3-1","2013-1-31")]
function DateDiff(d1,d2){
    var day = 24 * 60 * 60 *1000;
	try{    
	   var dateArr = d1.split("-");
	   var checkDate = new Date();
	       checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
	   var checkTime = checkDate.getTime();
	  
	   var dateArr2 = d2.split("-");
	   var checkDate2 = new Date();
	        checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);
	   var checkTime2 = checkDate2.getTime();
	    
	   var cha = (checkTime - checkTime2)/day;  
	        return Math.ceil(cha);	
	    }catch(e){
	   return false;
	}
}
//alert(DateDiff("2013-3-1","2013-2-1"));

//创建reminder标题
function showReminderTitle(){
	programList.createUnit({		
		id:"reminderTitle",
		className:"programTitle",
		text:"REMINDER LIST"
	});
}

//显示reminder列表
function showReminderList(){
	hideProgramList();
	hideFavouriteList();
	hideChannelInfo();
	hideChannelList();
	reminderListStatus = 1;
	programListInit();
	showReminderTitle();
	showProgramNameListTitle();
	showProgramDateListTitle();
	channelListFocusInit();
	var programListTotalArr = getProgramList();
	var reminderArr = new Array();
	for(var i = 0; i < programListTotalArr.length; i++){
		if(programListTotalArr[i].reminder){
			reminderArr.push(programListTotalArr[i]);
		}
	}
	showProgramPageContext(reminderArr);
	//showBottomPage(listCurrentPageNo, Math.ceil(arr.length/everyPageLine));
	//var programListTotalArr = getProgramList();
	showBottomPage(listCurrentPageNo, Math.ceil(reminderArr.length/everyPageLine), programList);
}

//隐藏节目单列表
function hideReminderList(){
	reminderListStatus = 0;
	listFocusIndex = 0;		//频道的焦点位置引索(相对于所有频道的引索)
	listCurrentPageNo = 0;	//频道列表当前的页数-1
	listTotalNum = 0;		//频道列表总数
	//programListDelay = 0;	//清空延迟的天数
	channelListFocus.removeFocus();
	programList.removeList();
}

//显示帮助信息
function showHelpInfo(){
	$("helpInfo").style.display = "block";	
	showHelpInfoStatus = 1;
}

//隐藏帮助信息
function hideHelpInfo(){
	$("helpInfo").style.display = "none";	
	showHelpInfoStatus = 0;
}

//获取当前时间
var clearCurrentTime;
function showCurrentTime(){
	var date = new Date();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	//alert(second);
	$("currentTimeShow").innerHTML = addZero(hour) + ":" + addZero(minute) + ":" + addZero(second);
	clearTimeout(clearCurrentTime);
	clearCurrentTime = setTimeout("showCurrentTime()",1000);
	return addZero(hour) + ":" + addZero(minute) + ":" + addZero(second);
}

//显示前面板
function showFrontPanel(str){
	dvbObj.showFrontPanel(str);
}

//在前面板显示时间
function showTimePanel(){
	var time = showCurrentTime();
	var hour = time.split(":")[0];
	var minute = time.split(":")[1];
	showFrontPanel(hour+""+minute);
	window.panelTimeClear;
	clearTimeout(panelTimeClear);
	panelTimeClear = setTimeout("showTimePanel()",1000);
	//$("test").innerHTML = hour+":"+minute;
}

//在前面板显示频道
function showChannelPanel(channelNo){
	clearTimeout(panelTimeClear);
	showFrontPanel(channelNo);
	//$("test").innerHTML = channelNo;
	window.channelClear;
	clearTimeout(channelClear);
	channelClear = setTimeout(function(){
		showTimePanel();
	}, 3000);
}
//测试时间
function testTime(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	var time = year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
	alert(time);
	dvbObj.printf("testTime===================="+time);
}
