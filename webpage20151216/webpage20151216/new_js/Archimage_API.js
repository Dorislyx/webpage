//Archimage API document
var player = new AVPlayer();
//IPTV_IPTV_IPTV_IPTV_IPTV_IPTV_IPTV_IPTV_IPTV_IPTV_IPTV_IPTV_IPTV_IPTV_IPTV_IPTV_IPTV_IPTV_IPTV_IPTV_IPTV
function IPTV_play(url) {
	player.Ag_multicast_play(url);
}

function IPTV_stop() {
	player.Ag_multicast_stop();
}

function IPTV_getStatus() {
	return player.Ag_multicast_getStatus();// return value: 0 is stop , and 1 is play
}

//AUDIO_AUDIO_AUDIO_AUDIO_AUDIO_AUDIO_AUDIO_AUDIO_AUDIO_AUDIO_AUDIO_AUDIO_AUDIO_AUDIO_AUDIO_AUDIO_AUDIO_AUDIO
function AUDIO_getMute() {
	return player.Ag_audio_getMute();//0 is mute off, 1 is mute on.
}

function AUDIO_setMute(num) {
	player.Ag_audio_setMute(num);
}

function AUDIO_getVolume() {
	return player.Ag_audio_getVolume();// return from 0 to 100.
}

function AUDIO_setVolume(volume) {
	player.Ag_audio_setVolume(volume);
}

function AUDIO_getStereo() {
	return player.Ag_audio_getStereo();//0 stereo, 1 left, 2 right, 3 mono
}

function AUDIO_setStereo(stereo) {
	player.Ag_audio_setStereo(stereo);
}

function AUDIO_getNoOfTrack() {
	return player.Ag_audio_getNoOfTrack();
}

function AUDIO_getLanguageByIndex(index) {
	return player.Ag_audio_getLanguageByIndex(index);
}

function AUDIO_getPIDByIndex(index) {
	return player.Ag_audio_getPIDByIndex(index);
}

function AUDIO_setPID(pid) {
	player.Ag_audio_setPID(pid);
}

function AUDIO_getCurrentTrackIndex() {
	return player.Ag_audio_getTrack();
}

//VIDEO_VIDEO_VIDEO_VIDEO_VIDEO_VIDEO_VIDEO_VIDEO_VIDEO_VIDEO_VIDEO_VIDEO_VIDEO_VIDEO_VIDEO_VIDEO_VIDEO
function VIDEO_setTVSystem(value) {
	//Video mode of TV System:0 is NTSC, 1 is PAL, 2 is SECAM, 3 is 480P, 4 is 576P, 5 is 720P50HZ, 6 is 720P60HZ, 7 is 1080I50HZ, 8 is 1080I60HZ, 9 is 1080P60HZ, 10 is 1080P24HZ, 11 is 1080P25HZ, 12 is 1080P30HZ.
	player.Ag_video_setTVSystem(value);
}

function VIDEO_getTVSystem() {
	return player.Ag_video_getTVSystem();
}

function VIDEO_setWindow(x, y, w, h) {
	player.Ag_video_setWindow(x,y,w,h);// "0, 0, 0, 0" means full screen.
}

function VIDEO_setAspectRatio(mode) {
	player.Ag_video_setAspectRatio(mode);	//0: ratio is 4:3, 1: ratio is 16:9.
}

function VIDEO_getAspectRatio() {
	return player.Ag_video_getAspectRatio();	// 0 is 4:3, 1 is 16:9.
}

function VIDEO_setDisplayMode(mode) {
	//0 is letterbox, either windowbox or letterbox to preserve aspect ratio. 1 is pan&scan, Used for 16x9 source with pan scan vectors on 4x3 display only，otherwise same as zoom. 2 is full, distort aspect ratio but see all the content and no sidebars. 3is zoom, cut off content to preserve aspect ratio. 4 is full noliner,non-linear upscaling to full screen where the edge of the content will have more distorted aspect ratio.
	player.Ag_video_setDisplayMode(mode);
}

function VIDEO_getDisplayMode() {
	return player.Ag_video_getDisplayMode();
}

function VIDEO_setAnalogueProtection(num) {
	player. Ag_video_setAnalogueProtection(num);	//0 is CGMS-A off,1 is CGMS-A on.
}

function VIDEO_getAnalogueProtection() {
	return player.Ag_video_getAnalogueProtection();
}

function VIDEO_setMacrovision(level) {
	player.Ag_video_setMacrovision(level);		//0 is None, 1 is level_1, 2 is level_2, 3 is level_3.
}

function VIDEO_getMacrovision() {
	return player.Ag_video_getMacrovision();
}

//BROWSER_BROWSER_BROWSER_BROWSER_BROWSER_BROWSER_BROWSER_BROWSER_BROWSER_BROWSER_BROWSER_BROWSER_BROWSER_BROWSER











