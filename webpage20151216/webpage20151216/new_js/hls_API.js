// JavaScript Document
//创建录制ID
function createID() {
	return player.Ag_record_app_create();
}

//开始录制
function startRecord(url, id) {
	return player.Ag_record_app_start(url, id);	//返回值： 录制使用的handle；4 －－ 第一路APP后台录制   5 －－ 第二路APP后台录制        -1 －－ 出错
}

//停止录制
function stopRecord(handle) {
	return player.Ag_record_app_stop(handle);	//成功停止返回0，否则返回-1
}

//设置起始码速率 单位：波特率,设置播放的最大码速率
function setBitrate(startbitrate, maxbitrate) {
	return player.Ag_vod_app_select_bitrate(startbitrate, maxbitrate);	//成功返回0，否则返回-1
}

//返回当前播放时间（秒数）
function getCurrentTime() {
	return player.Ag_vod_app_get_currenttime();	//成功返回当前播放时间（秒数），否则返回-1
}

//返回播放的连接总数.index 只能选0值(只能同时播放一路)
function getLinkTotal(index) {
	return player.Ag_vod_app_get_rejoins(0);	//成功返回播放的连接总数，否则返回-1
}

//返回播放的数据总量.index 只能选0值(只能同时播放一路)
function getStreamSize(index) {
	return player.Ag_vod_app_get_stream_size(0);	//成功返回播放的数据总量 单位Kbyte，否则返回-1
}

//返回播放的url连接总数.index 只能选0值(只能同时播放一路)
function getURLTotal(index) {
	return player.Ag_vod_app_get_stream_number(0);	//成功返回播放的url连接总数，否则返回-1
}

//返回播放的链接中第n路对应的带宽值.index 只能选0值(只能同时播放一路)
function getStreamBitrate(index, n) {
	return player.Ag_vod_app_get_stream_bitrate(0, n);	//成功 返回播放的链接中第n路对应的带宽值，否则返回-1
}

//设置起始码速率,设置播放的最大码速率,handler(handler为ecmax_record_app_start返回值) : 值4和5 ，对于录制0和1
function setRecBitrate(handler, startbitrate, maxbitrate) {
	return player.Ag_record_app_select_bitrate(handler, startbitrate, maxbitrate);	//成功返回0，否则返回-1
}

//返回对应index值录制重新连接的总数,handler : 4,5 返回对应index录制0和录制1的
function getRecRejoinTotal(handler) {
	return player.Ag_record_app_get_rejoins(handler);	//成功返回对应index值录制重新连接的总数，否则返回-1
}

//返回对应index值录制接收的数据总量,handler : 4,5 返回对应index录制0和录制1的
function getRecStreamSize(handler) {
	return player.Ag_record_app_get_stream_size(handler);	//成功返回对应index值录制接收的数据总量，否则返回-1
}

//返回对应index值录制播放url可用连接总数,handler : 4,5 返回对应index录制0和录制1的
function getRecUrlTotal(handler) {
	return player.Ag_record_app_get_stream_number(handler);	//成功返回对应index值录制播放url可用连接总数，否则返回-1
}

//返回对应index值录制可用的连接中第n路对应的带宽值,handler : 4,5 返回对应index录制0和录制1的
function getRecStreamBitrate() {
	return player.Ag_record_app_get_stream_bitrate(handler, n);	//成功返回对应index值录制可用的连接中第n路对应的带宽值，否则返回-1
}

