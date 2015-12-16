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
		case 224:
			dvbObj.stopChannel();
			setTimeout("dvbObj.closeSTB();",2000);
			break;
		case 93: //待机;
			standbyFun(); 
			break;
		case 1073741879: // Mute;
			muteShow();
			break;
		case 37: // vol -
			volSwitch('-');
			break;
		case 39:
			volSwitch('+');
			break;
		case 38: 
		case 1073741923: //channel+
			tipsDifvHiddenAll();
			channelSwith('channel+');
			break;
		case 40:
		case 1073741922: //channel-
			tipsDifvHiddenAll();
			channelSwith('channel-');
			break; 
		case 1073741920: //blue; dvb search;
			showDvbSet(); 
			break;
		case 1073741921: //menu CA menu;
			showCaMenu();
			break;
		case 415: // play/pause;
			playDvb(channelNum);
			break;
		case 413: //stop;
			dvbObj.stopChannel();
			break;
		case 13:  //remove ca info
		    dvbObj.clearCAInfo();
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
		  tipsDifvHiddenAll();
			break;
		case 1073742483: // smart card not present
			tipsDivShow(2,"tipsTxtDiv",13);
			clearTimeout(timer_tips);
			break;
		case 1073742484: // smart card rejected
			tipsDivShow(2,"tipsTxtDiv",14);
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
			tipsDivShow(2,"tipsTxtDiv",27);
			clearTimeout(timer_tips);
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
/* Description: 初始化 函数       		                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
function init(){ 
	dvbObj.initDVB();  //初始化 dvb; 
	if(dvbObj.getChannelTatol()>0){
		playDvb(channelNum);//
	}else{
		showDvbSet();
	} 
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
	$("freqInput").value = ""; // 清空参数
	$("symborateInput").value = ""; // 清空参数
	$("dvbSearch").style.display = "block"; // 显示搜索DVB参数;
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
	txtArr[0] = $("freqInput").value;
	txtArr[1] = $("symborateInput").value;
	txtArr[2] = $("qamInput").value;
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
function searchFun(){  
	var parameter = getParameter(); 
	dvbObj.searchdvb(parameter[0],parameter[1],parameter[2]); 
	CheckScanStatus(); 
	return;
}
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
	dvbObj.searchdvb(parameterAgain[0],parameterAgain[1],parameterAgain[2]); 
	CheckScanStatus(); 
	return;
}
/*********************************************************************/
/* Function: CheckScanStatus                                         */
/* Description: 检测搜台状态        		                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
function CheckScanStatus(){
    var status = dvbObj.dvbScanStatus(); 
    if(status == 0){
			dvbsearchSta = false;
			$("freqInput").focus(); 
			$("dvbSearch").style.display = "none"; 
			showDvbSet();
	}else if(status == 1){
			setTimeout("CheckScanStatus()", 500);
	}else if(status == 2){ // if(status == 2);
		if(dvbObj.getChannelTatol() == 0){
			tipsDivId = "searchAgain";
			tipsDivShow(1,"tipsBtn",10);
		} 
		dvbsearchSta = false;
		$("freqInput").focus(); 
		$("dvbSearch").style.display = "none"; 
		playDvb(channelNum); 
	}
	return;
}
/*********************************************************************/
/* Function: playDvb                                                 */
/* Description: DVB播放           		                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
function playDvb(num){ 
	dvbObj.stopChannel();
	playNum = dvbObj.getLcn(num);
	dvbObj.playChannel(playNum);
	showChannelNum(num);
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
	var Num = parseInt(ChannelNum+1)
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
		tipsDivId = "standby";
		tipsDivShow(1,"tipsBtn",11);  
	}
	return;
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
	dvbObj.checkUpgrade(infoArr[0],infoArr[1],infoArr[2],64,infoArr[3],infoArr[4]);
	return;
}
/*********************************************************************/
/* Function: dvbUpgradeFun                                           */
/* Description: DVB升级函数处理     				   	                 */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/ 
function dvbUpgradeFun(){ 
	dvbObj.upgradeDown(0,0,0,0);
	getDownProcess();
	return;
}
