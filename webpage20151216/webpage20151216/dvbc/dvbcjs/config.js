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
		player.Ag_dvb_init(2); // dvb-c  初始化; 
		return;
	}
	this.deleteChannelList = function(){
		player.Ag_dvb_deleteChannelList();
	}
	this.searchdvb = function (freq,symborate,qam,annex){ //DVB搜索
		//player.Ag_dvb_deleteChannelList();
		var tunermode = player.Ag_dvb_getTunerMode(0); 
		player.Ag_dvb_ChannelListScan("0,0,0,0,0,0,0,"+freq+","+symborate+",0,0,"+qam+",0,0,"+annex+"");
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
		return tatol;
	}
	this.getLcn = function (index){ //通过索引获取当前逻辑频道号;
		var lcn = player.Ag_dvb_GetLogicalChannelNumberByIndex(0,index);
		return parseInt(lcn);
	}
	this.getChannelNum = function(lcn){	//通过逻辑频道号获取显示频道号
		return player.Ag_dvb_getProgramNumByLCN(0,lcn);
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
		player.Ag_dvb_pin_code_write(""+num.toString()[0]+num.toString()[1]+num.toString()[2]+num.toString()[3]+"",4);
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
	this.checkUpgrade = function (freq, sysmborate, qam, checkTime, ver, isForce, AnnexMode){ //检测升级; Ag_dvb_upgrade_check(int freq,int symborate,int qam,int checkTime, int AnnexMode);
		player.Ag_dvb_upgrade_check(freq,sysmborate,qam,checkTime,ver,isForce,AnnexMode);
		return;
	}
	this.upgradeDown = function (freq,sysmborate,qam,serverId,AnnexMode){ // 下载 //int freq,int symborate,int qam, int serverId
		player.Ag_dvb_upgrade_download(freq,sysmborate,qam,serverId,AnnexMode);
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
	this.scanEITStart = function() {//开始搜索eit信息 之后才能拿到epg的信息
		player.Ag_dvb_EITScanStart(0);
	}
	this.stopScanEIT = function() {//停止搜索eit的信息
		player.Ag_dvb_EITScanStop(0);
	}
	this.getCurrPlayInfo = function() {//获得当前播放节目的信息  Ag_dvb_getPresentEvent("eng");  返回值类型见例子
		var info = player.Ag_dvb_getPresentEvent("spa");
		//var info = player.Ag_dvb_getPresentEvent("eng");
		//alert("curr="+info);
		return info;
	}
	this.getNextPlayInfo = function() {//获得下一个节目信息。
		var info = player.Ag_dvb_getNextEvent("spa");
		//alert("next== "+info);
		return info;
	}
	this.getPresentEvent = function(nowYear, nowMonth, nowDay, nowHour, nowMinute, nowSecond){//获得当前播放节目的信息
		var info = player.Ag_dvb_getPresentEvent(nowYear, nowMonth, nowDay, nowHour, nowMinute, nowSecond, "spa");
		return info;
	}
	this.getNextEvent = function(nowYear, nowMonth, nowDay, nowHour, nowMinute, nowSecond){//获得下一个节目信息
		var info = player.Ag_dvb_getNextEvent(nowYear, nowMonth, nowDay, nowHour, nowMinute, nowSecond, "spa");
		return info;
	}
	this.getScheduleEventIdCount = function(timeArea) {//搜索2004-8-24，14：15:45 到 2012-8-25 20:25:40之间的event，eventCount最大60个
		var count = player.Ag_dvb_GetScheduleEventIdCount(timeArea);
		return count;
	}
	this.getEventIdByIndex = function(index,eventCount) {//eventCount 上个接口返回的总的个数
		var id = player.Ag_dvb_GetScheduleEventIdByIndex(index,eventCount);
		return id;
	}
	this.getEventInfoById = function(id) { //id 是上一个接口的返回值。返回值类型见例子
		var info = player.Ag_dvb_GetScheduleEventInfoByID(id,"spa");
		return info;
	}
	this.getChannelName = function(lcn) {//返回频道名，用法和play一样，参数为逻辑频道号
		var name = player.Ag_dvb_GetChannelNameByIndex(0,lcn);
		return name;
	}
	this.openTextFile = function(path){//创建或打开指定text文件,  path:要创建或打开的text文件的绝对路径, 返回值：成功返回指定文件的文件描述符，失败返回-1
		return player.Ag_textFile_open(path);
	};
	this.closeTextFile = function(fd){//关闭text文件,  fd: Ag_textFile_open返回的文件描述符,   返回值：成功返回0
   		return player.Ag_textFile_close(fd)	
	};
	/*
	 *	读取指定text文件的中的内容
   	 *	Ag_textFile_read(int fd, int nByte)
   	 *	fd: Ag_textFile_open返回的文件描述符
   	 *	nByte：要读出的字节数
   	 *	返回值：返回包含实际读出的字节数和读到的内容的JSON串如：{"nByte":"12","buffer":"hello world!"}
	 * */
	this.readTextFile = function(fd, nByte){
		//alert("str===="+player.Ag_textFile_read(fd, nByte));
		return player.Ag_textFile_read(fd, nByte);
	};
	/*
	 *	向text文件中以追加方式写入指定内容
   	 *	Ag_textFile_write(int fd, char *buffer, int nByte)
   	 *	fd:Ag_textFile_open返回的文件描述符
   	 *	buffer:存放要写入数据的buffer
   	 *	nByte：要写入文件内容的字节数最大为2047字节
   	 *	返回值：成功返回实际写入的字节数，失败返回-1
	 * */
	this.writeTextFile = function(fd, buffer, nByte){
		return player.Ag_textFile_write(fd, buffer, nByte);
	};
	/*
	 *	 删除指定的text文件
   	 *	Ag_textFile_remove(char *path)
   	 *	path:要删除text文件的绝对路径
   	 *	返回值：成功返回0，失败返回-1
	 * */
	this.removeTextFile = function(path){
		return player.Ag_textFile_remove(path);
	}
	//是否是音频频道， 音频的话 返回1,     不是返回0  ,   出错 返回-1 
	this.isPlayAudio = function(){
		return player.Ag_dvb_isPlayAudio(0);
	}
	//同步NTP服务器时间
	this.sycToNTP = function(){
		var value = player.Ag_time_sycToNTP();
		//alert(value);
		return value;
	}
	this.syncTime = function(){
		var value = player.Ag_dvb_syncTime(0);
		//alert(value);
		return value;
	}
	this.showFrontPanel = function(str){
		var value = player.Ag_frontPanel_showString(str);
		//alert(str+" , "+value);
		return value;
	}
	this.printf = function(value){
		var reg = player.Ag_printf(1, value);
		//alert(value);
		return reg;
	}
	this.envSet = function(value){
		var ret = player.Ag_system_cfe_envSet("TV_SYSTEM",value);
		return ret;
	}
	this.setTimeZone = function(timezone){
		var ret = player.Ag_time_setTimeZone(timezone);
		return ret;
	}
	this.getTimeZone = function(){
		var value = player.Ag_time_getTimeZone();
		return value;
	}
	this.getIPAddress = function(){
		var value = player.Ag_network_getIPAddress();
		return value;
	}
	this.getLocalTime = function(){
		var value = player.Ag_time_getLocalTime();
		return value;
	}
	this.setErrorHandleMode = function(){
		var ret = player.Ag_video_setErrorHandleMode(1);
		return ret;
	}

	return;
} 
