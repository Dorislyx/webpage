// JavaScript Document
/*********************************************************************/
/* Function: $   	                                                 */
/* Description: 通过id返回元素对象    		                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/
function $(id){
	var elemt = document.getElementById(id);
	return elemt;
}
/*********************************************************************/
/* Function: JsApiObj                                                */
/* Description: dvb 接口封装类    		                	         */
/* Parameters:                                                       */
/* Author&Date: biangang  2012-11-06								 */
/*********************************************************************/

function JsApiObj(){ 
	var player = new AVPlayer(); //创建 player 对象; 
	this.initDVB = function (){
		player.Ag_dvb_init(1); // dvb-t  初始化;   0--dvbs  1--dvbt 2--dvbc
		return;
	}
	this.searchdvb = function (freq,symborate,qam){ //DVB搜索
		player.Ag_dvb_deleteChannelList();
		var tunermode = player.Ag_dvb_getTunerMode(0); 
		player.Ag_dvb_ChannelListScan("0,"+freq+",7,0,0,0,0,0,0,0,0,0,0,0,0");
		return;
	}
	this.getDVBInfo = function (){
		var info = player.Ag_dvb_getScanChannelInfo();
		return info;
	}
	this.dvbScanStatus = function (){ // 检测dvb搜索状态;
		var staut = player.Ag_dvb_ChannelListGetScanStatus(0);
		return staut;
	}
	this.getChannelTatol = function (){ //获取搜索的dvb频道个数;
		var tatol = player.Ag_dvb_Channel_GetCount(0);
		player.printf(1, "total channel: "+tatol);
		return tatol;
	}
	this.getLcn = function (index){ //通过索引获取当前逻辑频道号;
		var lcn = player.Ag_dvb_GetLogicalChannelNumberByIndex(0,index);
		return lcn;
	}
	this.playChannel = function (lcn){ // 通过逻辑频道号播放对应频道; 
		player.Ag_dvb_play(0,lcn);
		return;
	}
	this.stopChannel = function (){//停止播放dvb;
		player.Ag_dvb_stop(0);
		return;
	} 
	this.pingCord = function (num){ // 写入ping cord; 
		player.Ag_dvb_pin_code_write(""+num.toString()[0]+","+num.toString()[1]+","+num.toString()[2]+","+num.toString()[3]+"",4);
		return;
	}
	this.getPurseInfo = function (){
		var arr = player.Ag_dvb_getPurseInfo();//  返回值是一个字符串，中间由 “|”隔开，前面的是卡中的可用余额，后面的是消费多少;
		return arr.split("|");
	}
	this.getCurrencyArray = function (){
		var CurrencyArr = player.Ag_dvb_getCurrencyCredit();
		return CurrencyArr;
	}
	this.getfred = function (index){ // 0 不升级  1 升级;
		player.Ag_dvb_GetUpgradeFeedback(index);
		return;
	}
	this.getUpgadeInfo = function (){
		var info = player.Ag_dvb_getUpgadeInfo();
		return info.split("|");
	}
	this.checkUpgrade = function (freq,sysmborate,qam,checkTime,ver,isForce){ //检测升级; Ag_dvb_upgrade_check(int freq,int symborate,int qam,int checkTime);
		player.Ag_dvb_upgrade_check(freq,sysmborate,qam,checkTime,ver,isForce);
		return;
	}
	this.upgradeDown = function (freq,sysmborate,qam,serverId){ // 下载 //int freq,int symborate,int qam, int serverId
		player.Ag_dvb_upgrade_download(freq,sysmborate,qam,serverId);
		return;
	}
	this.getProcess = function (){ // 获取下载进度;
		 var process = player.Ag_dvb_upgrade_getDownloadProcess();
		 return process;
	}
	this.DVBupgrade = function (){ //升级;
		player.Ag_dvb_upgrade_do();
		return;
	}
	this.DVBNoupgrade = function (feedback){ //升级;
		player.Ag_dvb_GetUpgradeFeedback(feedback);
		return;
	}
	this.getCaVer = function (){ //获取CA版本号
		var version = player.Ag_dvb_getCAVersion();
		return version.split(" ")[0];
	}
	this.getSoftVer = function (){ //获取软件版本;
		var ver = player.Ag_system_getSoftwareVersion();
		return ver;
	}
	this.getSerialNum = function (){ // 获取串号;
		var serialNum = player.Ag_system_getSerialNum();
		return serialNum;
	}
	this.getBoxId = function (){
		var boxid = player.Ag_dvb_getBoxID(); // get box id;
		return boxid;
	}
	this.getSmartCard = function (){
		var number = player.Ag_dvb_getSmartCardNum(); // get smart card number;
		return number;
	}
	this.getCpyCAVersion = function (){ //获得厂商的CA模块版本号;
		var number = player.Ag_dvb_getCpyCAVersion();
		return number.split(" ")[0];
	}
	this.getCASysID = function (){ //获得CA系统ID; 
		var number = player.Ag_dvb_getCASysID();
		return number;
	}
	this.getPairState = function (){
		var sta = player.Ag_dvb_getPairState(); //获得机卡绑定状态    
		return sta;
	}
	this.closeSTB = function (){ // close STB
		player.Ag_power_setPowerOff();
		return;
	} 
	this.standby = function (){//待机
		player.Ag_power_standby();
		return;
	}
	this.wakeUp = function (){ //唤醒待机;
		player.Ag_power_wakeUp();
		return;
	}
	this.clearCAInfo = function (){ //清除屏幕上的CA消息
		player.Ag_dvb_removeUserMsg();
		return;
	}
	this.getVol = function (){ // 获取音量;
		var vol = player.Ag_audio_getVolume();
		return vol;
	}
	this.setVol = function (num){ // 设置音量;
		player.Ag_audio_setVolume(num);
		return;
	}
	this.getMute = function (){ //获取静音状态
		var mute = player.Ag_audio_getMute();
		return mute;
	}
	this.setMute = function (num){ //设置静音;
		player.Ag_audio_setMute(num);
		return;
	}
	this.caRegister = function (IP){
		var ret = player.Ag_dvb_caRegister(IP,0);
		return ret;
	}
	this.caUnRegister = function (){
		player.Ag_dvb_caUnRegister();
		return;
	}
	this.getIP = function (){
		var ipAddress = player.Ag_network_getIPAddress();
		return ipAddress;
	}
	return;
} 
