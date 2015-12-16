// JavaScript Document
/*
 *
 *
 */
function DvbcObject() {
	this.currentLcn = null;
	this.currentIndex = null;
	this.currentName = null;
	this.currentFreq = null;
	this.freq = null;
	this.qam = null;
	this.rate = null;
	this.channelTotal = null;
}

//播放
DvbcObject.prototype.playStream = function(index) {
	if (index == null) {
		this.currentLcn = this.getLcnByIndex(this.currentIndex);
	} else {
		this.currentLcn = this.getLcnByIndex(index);
	}
	dvbc_playStream(this.currentLcn);
};

//播放上一频道
DvbcObject.prototype.playPrevious = function() {
	this.currentIndex = this.currentIndex >= (this.channelTotal-1) ? 0 : (this.currentIndex+1);
	this.playStream(this.currentIndex);
};

//播放下一频道
DvbcObject.prototype.playNext = function() {
	this.currentIndex = this.currentIndex <= 0 ? (this.channelTotal-1) : (this.currentIndex-1);
	this.playStream(this.currentIndex);
};

//停止
DvbcObject.prototype.stopStream = function() {
	dvbc_stopStream();
};

//扫描指定频点
DvbcObject.prototype.scanStream = function(freq, qam, rate) {
	dvbc_manualScan(freq, qam, rate);
};

//获得当前频点的频道总数
DvbcObject.prototype.getChannelTotal = function() {
	return dvbc_getChannelTotal();
};

//通过索引号获取频道的LCN
DvbcObject.prototype.getLcnByIndex = function(index) {
	return dvbc_getLcnByIndex(index);
};

//获取当前锁定的频点
DvbcObject.prototype.getCurrentFreq = function(lcn) {
	return dvbc_getCurrentFreq(lcn);
};

//获取频道名称
DvbcObject.prototype.getChannelName = function(lcn, lang) {
	return dvbc_getChannelName(lcn, lang);
};

//获取当前播放频道的lcn
DvbcObject.prototype.getCurrentLcn = function() {
	return dvbc_getCurrentChannelLcn();
};

//获取指定lcn频道的索引号
DvbcObject.prototype.getIndexByLcn = function(lcn) {
	return dvbc_getIndexByLcn(lcn);
};

var dvbc = new DvbcObject();


