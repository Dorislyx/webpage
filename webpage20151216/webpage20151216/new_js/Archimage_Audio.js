// JavaScript Document
/*
 * 声音控制的对象：
 * 1.音量调节的控制；
 * 2.静音控制；
 * 3.声道切换；
 * 4.音轨切换；
 * 
 * 使用方式及示例代码：
 * 1.首先创建Audio对象：	var audioObj = new Audio(5);
 * 
 * 2.获得当前音量值：		audioObj.volume = audioObj.getVolume();
 * 3.设置当前音量值：		audioObj.volume = 20; audioObj.setVolume(this.volume);
 * 4.音量加操作：			audioObj.setVolumeUp();
 * 5.音量减操作：			audioObj.setVolumeDown();
 * 
 * 6.获得静音状态：		audioObj.muteStatus = audioObj.getMute();
 * 7.设置静音状态：		audioObj.setMute();		//可加参数
 * 
 * 8.获得声道信息：		audioObj.audioChannel = audioObj.getStereo();
 * 9.设置声道状态：		audioObj.setStereo();	//可加参数
 * 
 * 10.获得音轨总数：		audioObj.audioTrackTotal = audioObj.getTrackTotal();
 * 11.获得当前音轨索引：	audioObj.audioTrackIndex = audioObj.getCurrentTrack();
 * 12.获得音轨语言：		audioObj.trackLanguage = audioObj.getTrackLanguage(this.audioTrackIndex);
 * 13.获得音轨PID：		audioObj.trackPID = audioObj.getTrackPID(this.audioTrackIndex);
 * 14.设置音轨PID：		audioObj.setTrackPID(this.trackPID);
 * 15.音轨切换：			audioObj.changeTrack();
 */
function Audio(length) {
	this.volume = this.getVolume();
	this.volumeLength = (length == null) ? 1 : length;
	this.muteStatus = this.getMute();
	this.audioChannel = this.getStereo();
	this.audioTrackTotal = this.getTrackTotal();
	this.audioTrackIndex = this.getCurrentTrack();
	this.trackLanguage = null;//this.getTrackLanguage(this.audioTrackIndex);
	this.trackPID = null;
	//this.init();
	this.stereoArray = new Array(0, 1, 2);	//声道参数数组
}

/*
 * 初始化音频信息：

Audio.prototype.init = function() {
	this.getVolume();
	this.getMute();
	this.getStereo();
	this.getCurrentTrack();
	this.getTrackTotal();
	this.getTrackLanguage(this.audioTrackIndex);
}
 */
/*
 * 获得音量值：
 */
Audio.prototype.getVolume = function() {
	var volume = AUDIO_getVolume();// return from 0 to 100.
	return volume;
}

/*
 * 设置音量值：
 */
Audio.prototype.setVolume = function(volume) {
	if (volume == null || volume < 0 || volume > 100) {
		return -1;
	} else {
		this.volume = volume;
	}
	if (this.getMute() == 1) {
		this.setMute(0);
		this.muteStatus = 0;
	}
	AUDIO_setVolume(volume);
}

/*
 * 音量加操作：
 * 修改后的this.volume设置为当前音量
 */
Audio.prototype.setVolumeUp = function() {
	this.volume = this.getVolume();
	this.volume += this.volumeLength;
	this.volume = this.volume > 100 ? 100 : this.volume;
	this.setVolume(this.volume);
}

/*
 * 音量减操作：
 * 修改后的this.volume设置为当前音量
 */
Audio.prototype.setVolumeDown = function() {
	this.volume = this.getVolume();
	this.volume -= this.volumeLength;
	this.volume = this.volume < 0 ? 0 : this.volume;
	this.setVolume(this.volume);
}

/*
 * 获得静音状态：
 */
Audio.prototype.getMute = function() {
	var mute = AUDIO_getMute();//0 is mute off, 1 is mute on.
	return mute;
}

/*
 * 设置静音状态：
 */
Audio.prototype.setMute = function(mute) {
	if (mute == null) {
		this.muteStatus = this.getMute() == 1 ? 0 : 1;
	} else if (mute != 0 && mute != 1) {
		return -1;
	} else {
		this.muteStatus = mute;
	}
	AUDIO_setMute(this.muteStatus);
}

/*
 * 获得声道状态：
 */
Audio.prototype.getStereo = function() {
	var channel = AUDIO_getStereo();//0 stereo, 1 left, 2 right, 3 mono
	return channel;
}

/*
 * 设置声道状态：
 */
Audio.prototype.setStereo = function(stereo) {
	if (this.getMute() == 1) {
		return -1;
	}
	if (stereo == null) {
		this.audioChannel++;
		this.audioChannel = (this.audioChannel >= this.stereoArray.length) ? 0 : this.audioChannel;
	} else if (stereo >= this.stereoArray.length || stereo < 0) {
		return -1;
	} else {
		this.audioChannel = stereo;
	}
	AUDIO_setStereo(this.audioChannel);
}

/*
 * 获得当前音轨：
 */
Audio.prototype.getCurrentTrack = function() {
	var track = AUDIO_getCurrentTrackIndex();
	return track;
}

/*
 * 获得音轨总数：
 */
Audio.prototype.getTrackTotal = function() {
	var total = AUDIO_getNoOfTrack();
	return total;
}

/*
 * 通过索引得到音轨语言：
 */
Audio.prototype.getTrackLanguage = function(index) {
	if (index == null) {
		return -1;
	}
	var language = AUDIO_getLanguageByIndex(index);
	return language;
}

/*
 * 通过索引得到音轨PID：
 */
Audio.prototype.getTrackPID = function(index) {
	if (index == null) {
		return -1;
	}
	var pid = AUDIO_getPIDByIndex(index);
	return pid;
}

/*
 * 设置音轨PID：
 */
Audio.prototype.setTrackPID = function(pid) {
	if (pid == null) {
		return -1;
	}
	AUDIO_setPID(pid);
}

/*
 * 音轨切换：
 */
Audio.prototype.changeTrack = function() {
	if (this.getMute() == 1) {
		return -1;
	}
	this.audioTrackIndex++;
	this.audioTrackIndex = (this.audioTrackIndex >= this.audioTrackTotal) ? 0 : this.audioTrackIndex;
	this.trackPID = this.getTrackPID(this.audioTrackIndex);
	this.setTrackPID(this.trackPID);
	this.trackLanguage = this.getTrackLanguage(this.audioTrackIndex);
}

var audioObj = new Audio(25);
