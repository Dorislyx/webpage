
var stbObject = new AVPlayer();

function dbgMsg(msg)
{
	if (ARCHIMAGE == 1) {
		if (DEBUG_OPEN == 1)
			stbObject.printf(1,"[dbgMsg] "+ msg + "\n");
	}
	else {
		if (DEBUG_OPEN == 1)
		stbObject.jsewrite("printf", "[dbgMsg] " + msg + "\n");
	}		
}

function runSystemCmd(cmd)
{
	if (ARCHIMAGE == 1) {
		
	}
	else {
		stbObject.runSystemCmd(cmd);
	}	
}
function reLoad()
{
	if (ARCHIMAGE == 1) {
		stbObject.Ag_browser_refresh();
	}
	else {
		stbObject.jsewrite("JseSystemControl","refresh");
	}		
}

function settingsReset()
{
	if (ARCHIMAGE == 1 && DEFINE_7405 == 1) {
		stbObject.Ag_settings_reset();
	}
	else {
		
	}		
}

function enterStandBy()
{
	if (ARCHIMAGE == 1) {
		
	}
	else {
		stbObject.jsewrite("JseSystemControl", "standby");
	}		
}

function wakeupFromStandBy()
{
	if (ARCHIMAGE == 1) {
		
	}
	else {
		stbObject.jsewrite("JseSystemControl", "wakeup");
	}		
}


		
function translateKey(val) {
	if (ARCHIMAGE == 1) {
		switch (val) {
			case 48: case 49: case 50: case 51: case 52: 
			case 53: case 54: case 55: case 56: case 57:
				return ["KEY_NUMERIC", val-48 ]; break;
			case 37: return ["KEY_LEFT", null]; break;	
			case 38: return ["KEY_UP", null]; break;
			case 39: return ["KEY_RIGHT", null]; break;
			case 40: return ["KEY_DOWN", null]; break;
			case 13: return ["KEY_ENTER", null]; break;
			case 213: return ["KEY_BACK", null]; break;
			
			case 415: return ["KEY_PLAY", null]; break;
			case 417: return ["KEY_FFWD", null]; break;
			case 412: return ["KEY_REW", null]; break;
			case 413: return ["KEY_STOP", null]; break;
			
			case 403: return ["KEY_RED", null]; break;
			case 404: return ["KEY_GREEN", null]; break;
			case 405: return ["KEY_YELLOW", null]; break;
			case 406: return ["KEY_BLUE", null]; break;
			
			case 220: return ["KEY_MIC", null]; break;
			case 1073741879: return ["KEY_MUTE", null]; break;
			
			case 460: return ["KEY_SUBTITLE", null]; break;
			
			case 33: return ["KEY_PG_UP", null]; break;
			case 34: return ["KEY_PG_DOWN", null]; break;
			
			case 46: return ["KEY_DISPLAY", null]; break;
			case 198: return ["KEY_WEB", null]; break;
			case 1073742340: return ["KEY_MOVIES", null]; break;
			case 1073741869: return ["KEY_CH_UP", null]; break;
			case 1073741867: return ["KEY_CH_DOWN", null]; break;
			case 1073741880: return ["KEY_VOL_UP", null]; break;
			case 1073741884: return ["KEY_VOL_DOWN", null]; break;
			case 1073742338: return ["KEY_MENU", null]; break;
			case 1073742339: return ["KEY_CS", null]; break;
			case 1073741882: return ["KEY_AUDIO", null]; break;
			case 1073741865: return ["KEY_GOTO", null]; break;
			case 1073742350: return ["EVENT_MEDIA_START", null]; break;
			case 1073742351: return ["EVENT_MEDIA_STOP", null]; break;
			case 1073742352: return ["EVENT_MEDIA_PAUSE", null]; break;
			case 1073742353: return ["EVENT_MEDIA_RESUME", null]; break;
			case 1073742354: return ["EVENT_MEDIA_FFWD", null]; break;
			case 1073742355: return ["EVENT_MEDIA_REW", null]; break;
			case 1073742357: return ["EVENT_MEDIA_CLOSE", null]; break;
			
			case 1073742380: return ["EVENT_PLTV_PLAYING", null]; break;
			case 1073742382: return ["EVENT_PLTV_RESUME", null]; break;
			case 1073742383: return ["EVENT_PLTV_CLOSE", null]; break;
			case 1073742384: return ["EVENT_PLTV_PAUSE", null]; break;
			case 1073742385: return ["EVENT_PLTV_FFWD", null]; break;
			case 1073742386: return ["EVENT_PLTV_REW", null]; break;
			case 1073742389: return ["EVENT_PLTV_EOS", null]; break;
			default: return ["KEY_UNKNOWN", null]; break;
		} 
	}
	else {
		switch (val) {
			case 48: case 49: case 50: case 51: case 52: 
			case 53: case 54: case 55: case 56: case 57:
				return ["KEY_NUMERIC", val-48 ]; break;
			case 37: return ["KEY_LEFT", null]; break;	
			case 38: return ["KEY_UP", null]; break;
			case 39: return ["KEY_RIGHT", null]; break;
			case 40: return ["KEY_DOWN", null]; break;
			case 13: return ["KEY_ENTER", null]; break;
			case 213: return ["KEY_BACK", null]; break;
			
			case 415: return ["KEY_PLAY", null]; break;
			case 417: return ["KEY_FFWD", null]; break;
			case 412: return ["KEY_REW", null]; break;
			case 413: return ["KEY_STOP", null]; break;
			
			case 403: return ["KEY_RED", null]; break;
			case 404: return ["KEY_GREEN", null]; break;
			case 155: return ["KEY_YELLOW", null]; break;
			case 35: return ["KEY_BLUE", null]; break;
			
			case 427: return ["KEY_CH_UP", null]; break;
			case 219: return ["KEY_CH_DOWN", null]; break;
			
			case 33: return ["KEY_PG_UP", null]; break;
			case 34: return ["KEY_PG_DOWN", null]; break;
			
			case 202: return ["KEY_NO_NAME", null]; break;
			case 46: return ["KEY_DISPLAY", null]; break;
			
			case 93: return ["KEY_STANDBY", null]; break;
			
			case 1073742350: return ["KEY_PLAY_START", null]; break;
			
			default: return ["KEY_UNKNOWN", null]; break;
		} 
	}	
}


/************************** DVB *********************************************/

function dvbInit(type, qam, bandwidth) 
{
	var result = 1;
	if (INCLUDE_DVBT == 0)
		return result;
		
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_dvb_init(type);
		dbgMsg("Ag_dvb_init ret " + result);
		stbObject.Ag_dvb_setScanParameters(5056900, qam, bandwidth);
		if (DEFINE_7405 == 1 && result != 0)
			result = 0;
	}
	else {
		
	}	

	return result;
}

function dvbScanFreq(freq) {
	var result = 1;
	
	if (INCLUDE_DVBT == 0)
		return result;
		
	dbgMsg("Ag_dvb_manualScan ... ");
	result = stbObject.Ag_dvb_manualScan(freq);
	dbgMsg("Ag_dvb_manualScan ret " + result);
	return result;
}

function dvbGetChannelListLength() {
	var result = 0;
	
	if (INCLUDE_DVBT == 0)
		return result;
		
	result = stbObject.Ag_dvb_getTotalNumbers();
	dbgMsg("Ag_dvb_getTotalNumbers ret " + result);
	return result;
}

function dvbChannelPlay(index) {
	var result = 1;
	var lcn = 0;
	if (INCLUDE_DVBT == 0)
		return result;
	lcn = stbObject.Ag_dvb_getLogicalChannelNumberByIndex(index);	
	result = stbObject.Ag_dvb_play(lcn);
	
	return result;
}

function dvbGetLCNByIndex(index)
 {
	var result = 0;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_dvb_getLogicalChannelNumberByIndex(index);	
		dbgMsg("Ag_dvb_getLogicalChannelNumberByIndex result = " + result);	
	}
	else {
		
	}	
	
	return result;	
 }
 
function dvbChannelStop() {
	var result = 1;
	
	if (INCLUDE_DVBT == 0)
		return result;
		
	result = stbObject.Ag_dvb_stopPlay();
	
	return result;
}


function dvbDeleteChannelList() {
	var result = 1;
	
	if (INCLUDE_DVBT == 0)
		return result;
		
	result = stbObject.Ag_dvb_deleteChannelList();
	
	return result;
}

function dvbGetCurrentSignalQuality() {
	var result = 1;
	
	if (INCLUDE_DVBT == 0)
		return result;
		
	result = stbObject.Ag_dvb_getCurrentSignalQuality();
	dbgMsg("Ag_dvb_getCurrentSignalQuality result = " + result);	
	return result;
}



/************************** IPTV *********************************************/
function iptvJoinMulticast(ipport) {
	if (ARCHIMAGE == 1) {
		var result = 1;
		result = stbObject.Ag_multicast_play(ipport);
		return result;
	}
	else {
		stbObject.jsewrite("JseIPTVControl", "play:"+ipport);
	}	
}

function iptvMulticastBlock(iplist) {
	if (ARCHIMAGE == 1 && DEFINE_7405 == 1) {
		var result = 1;
		var result = stbObject.Ag_multicast_block(iplist);
		dbgMsg("iptvMulticastBlock result = " + result);
		return result;
	}
}

function iptvMulticastunBlock(iplist) {
	if (ARCHIMAGE == 1 && DEFINE_7405 == 1) {
		var result = 1;
		var result = stbObject.Ag_multicast_unblock(iplist);
		dbgMsg("iptvMulticastunBlock result = " + result);
		return result;
	}
}

function iptvLeaveMulticast() {
	if (ARCHIMAGE == 1) {
		stbObject.Ag_multicast_stop();
	}
	else {
		stbObject.jsewrite("JseIPTVControl", "quit");
	}	
}

function iptvGetStatus() {
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_multicast_getStatus();
		if (DEFINE_7405 == 1)
		{
			switch (result) 
			{
				case 0: return "close";
				case 1: return "play";
				case 2: return "pause";
				case 3: return "resume";
				case 4: return "FFWD";
				case 5: return "REW";
				case 6: return "slow";
				case 7: return "seek";
				case 8: return "stop";
				case 9: return "startofstream";
				case 10: return "endofstream";
				case 11: return "error";
			}	

		}
	}
	else {
	}	
	dbgMsg("iptvGetStatus result = " + result);
	return result;
}

/************************ VOD **********************************************************/

function vodSetServerType(type)
{
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_vod_setType(type);
	}
	else {
		
	}	
	dbgMsg("vodSetServerType result = " + result);
	return result;
}

function vodOpen(vodurl)
{
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_vod_play(vodurl, 1);	
	}
	else {
		stbObject.jsewrite("JseVodControl", "open:" + vodurl);	
	}	
	dbgMsg("vodOpen result = " + result);
	return result;
	
}

function vodResume()
{
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_vod_resume();	
	}
	else {
		
	}	
	dbgMsg("vodResume result = " + result);
	return result;
	
}

function vodPause()
{
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_vod_pause();	
	}
	else {
		
	}	
	dbgMsg("vodPause result = " + result);
	return result;
	
}

function vodFast(speed)
{
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_vod_fast(speed);
	}
	else {
		stbObject.jsewrite("JseVodControl", "fast:"+speed);
	}	
	dbgMsg("vodFast result = " + result);
	return result;
	
}

function vodSeek(pos)
{
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_vod_seek(pos);
	}
	else {
		
	}	
	dbgMsg("vodSeek result = " + result);
	return result;
	
}

function vodClose()
{
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_vod_close();	
	}
	else {
		stbObject.jsewrite("JseVodControl", "quit");	
	}	
	dbgMsg("vodClose result = " + result);
	return result;
	
}

function vodGetDuration()
{
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_vod_getTotalTime();	
	}
	else {
		
	}	
	dbgMsg("vodGetDuration result = " + result);
	return result;
}
	
function vodGetCurrPosition()
{
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_vod_getCurrentTime();	
	}
	else {
		
	}	
	dbgMsg("vodGetCurrPosition result = " + result);
	return result;
}
	
function vodGetStatus()
{
	var ret;
	if (ARCHIMAGE == 1) {
		ret = stbObject.Ag_vod_getStatus();	
		dbgMsg("Ag_vod_getStatus result = " + ret);	
		if (DEFINE_7405 == 1)
		{
			switch (ret) 
			{
				case 0: return "close";
				case 1: return "play";
				case 2: return "pause";
				case 3: return "resume";
				case 4: return "FFWD";
				case 5: return "REW";
				case 6: return "slow";
				case 7: return "seek";
				case 8: return "stop";
				case 9: return "startofstream";
				case 10: return "endofstream";
				case 11: return "error";
			}	
	
		}
		else {
			switch (ret) 
			{
				case 0: return "close";
				case 1: return "open";
				case 2: return "play";
				case 3: return "pause";
				case 4: return "fast";
				case 5: return "stop";
				case 6: return "startofstream";
				case 7: return "endofstream";
			}	
		}
	}
	else {
		ret = stbObject.jseread("vodstate");	
	}	
}

/************************** PLTV *********************************************/
function pltvPause() {
    var result = 0;
    
	if (INCLUDE_PLTV == 0) {
		result = -2;
	}	
	else {	
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_timeShift_pause();
			dbgMsg("Ag_timeShift_pause = " + result);
		}
		else {
			result = -3;
		}	
    }
    return result ;
}

function pltvOpen(flg,lcn,ip) {
    var result = 0;
    
	if (INCLUDE_PLTV == 0) {
		result = -2;
	}	
	else {	
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_timeShift_start();//Ag_pltv_open(flg,lcn,ip);
			dbgMsg("Ag_pltv_open = " + result);
		}
		else {
			result = -3;
		}	
    }
    return result ;
}

function pltvSeek(pos) {
    var result = 0;
    
	if (INCLUDE_PLTV == 0) {
		result = -2;
	}	
	else {	
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_timeShift_seek(pos);
		}
		else {
			result = -3;
		}	
    }
	dbgMsg("pltvSeek = " + result);
    return result ;
}

function pltvResume() {
    var result = 0;
    
	if (INCLUDE_PLTV == 0) {
		result = -2;
	}	
	else {	
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_timeShift_resume();
			dbgMsg("Ag_timeShift_resume = " + result);
		}
		else {
			result = -3;
		}	
    }
    return result ;
}

function pltvSync() {
    var result = 0;
    
	if (INCLUDE_PLTV == 0) {
		result = -2;
	}	
	else {	
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_timeShift_sync();
			dbgMsg("Ag_timeShift_sync = " + result);
		}
		else {
			result = -3;
		}	
    }
    return result ;
}

function pltvTrickPlay(speed) {
    var result = 0;
    
	if (INCLUDE_PLTV == 0) {
		result = -2;
	}	
	else {	
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_timeShift_trick(speed);
			dbgMsg("Ag_timeShift_trick = " + result);
		}
		else {
			result = -3;
		}	
    }
    return result ;
}

function pltvStop() {
    var result = 0;
    
	if (INCLUDE_PLTV == 0) {
		result = -2;
	}	
	else {	
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_timeShift_stop();
			dbgMsg("Ag_timeShift_start = " + result);
		}
		else {
			result = -3;
		}	
    }
    return result ;
}

function pltvGetRecordTime() {
    var result = 0;
    
	if (INCLUDE_PLTV == 0) {
		result = -2;
	}	
	else {	
		if (ARCHIMAGE == 1) {
			if (DEFINE_7405 == 1)
				result = stbObject.Ag_timeShift_getTotalTime();
			else
				result = stbObject.Ag_timeShift_getRecordTime();
		}
		else {
			result = -3;
		}	
    }
	dbgMsg("pltvGetRecordTime = " + result);
    return result ;
}

function pltvGetPlayTime() {
    var result = 0;
    
	if (INCLUDE_PLTV == 0) {
		result = -2;
	}	
	else {	
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_timeShift_getPlayTime();
			dbgMsg("Ag_timeShift_getPlayTime = " + result);
		}
		else {
			result = -3;
		}	
    }
    return result ;
}

function pltvGetStatus() {
    var result = 0;
    
	if (INCLUDE_PLTV == 0) {
		result = -2;
	}	
	else {	
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_timeShift_getStatus();
			dbgMsg("Ag_timeShift_getStatus = " + result);
		}
		else {
			result = -3;
		}	
    }
    return result ;
}


/************************** Teletext *********************************************/
function teletextOpen() {
	var result = 0;
	if (INCLUDE_TELETEXT == 1)
	{
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_teletext_open();
		}
		else {
			result = stbObject.teletextOpen();
		}
	}	
	dbgMsg("teletextOpen = " + result);
	return result ;
}

function teletextClose() {
	var result = 0;
	if (INCLUDE_TELETEXT == 1)
	{
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_teletext_close();
		}
		else {
			result = stbObject.teletextClose();
		}
	}	
	dbgMsg("teletextClose = " + result);
	return result ;
}

function teletextShow() {
	var result = 0;
	if (INCLUDE_TELETEXT == 1)
	{
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_teletext_show();
		}
		else {
			result = stbObject.teletextShow();
		}
	}	
	dbgMsg("teletextShow = " + result);
	return result ;
}

function teletextHide() {
	var result = 0;
	if (INCLUDE_TELETEXT == 1)
	{
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_teletext_hide();
		}
		else {
			result = stbObject.teletextHide();
		}
	}	
	dbgMsg("teletextHide = " + result);
	return result ;
}

function teletextSetOutputMode(mode) {
	var result = 0;
	if (INCLUDE_TELETEXT == 1)
	{
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_teletext_setOutputMode(mode);
		}
		else {
			result = stbObject.teletextSetOutputMode(mode);
		}
	}	
	dbgMsg("teletextSetOutputMode = " + result);
	return result ;
}

function teletextGotoPage(num) {
	var result = 0;
	if (INCLUDE_TELETEXT == 1)
	{
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_teletext_gotoPage(num);
		}
		else {
			result = stbObject.teletextGotoPage(num);
		}
	}	
	dbgMsg("teletextGotoPage = " + result);
	return result ;
}

function teletextPageUp() {
	var result = 0;
	if (INCLUDE_TELETEXT == 1)
	{
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_teletext_pageUp();
		}
		else {
			result = stbObject.teletextPageUp();
		}
	}	
	dbgMsg("teletextPageUp = " + result);
	return result ;
}

function teletextPageDown() {
	var result = 0;
	if (INCLUDE_TELETEXT == 1)
	{
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_teletext_pageDown();
		}
		else {
			result = stbObject.teletextPageDown();
		}
	}	
	dbgMsg("teletextPageDown = " + result);
	return result ;
}

function teletextSubPageUp() {
	var result = 0;
	if (INCLUDE_TELETEXT == 1)
	{
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_teletext_subPageUp();
		}
		else {
			result = stbObject.teletextSubPageUp();
		}
	}	
	dbgMsg("teletextSubPageUp = " + result);
	return result ;
}

function teletextSubPageDown() {
	var result = 0;
	if (INCLUDE_TELETEXT == 1)
	{
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_teletext_subPageDown();
		}
		else {
			result = stbObject.teletextSubPageDown();
		}
	}	
	dbgMsg("teletextSubPageDown = " + result);
	return result ;
}

/************************** subtitle *********************************************/
function subtitleShow() {
	var result = 0;
	if (INCLUDE_SUBTITLE == 1)
	{
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_subtitle_show();
			dbgMsg("Ag_subtitle_show = " + result);
		}
		else {
			
		}	
	}
	return result;	
}

function subtitleHide() {
	var result = 0;
	if (INCLUDE_SUBTITLE == 1)
	{
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_subtitle_hide();
			dbgMsg("Ag_subtitle_hide = " + result);
		}
		else {
			
		}	
	}
	return result;	
}

function subtitleGetTatolNum() {
	var result = 0;
	if (INCLUDE_SUBTITLE == 1)
	{
		if (ARCHIMAGE == 1) {
			if (DEFINE_7405 == 1)
				result = stbObject.Ag_subtitle_getTotalNumber();
			else	
				result = stbObject.Ag_subtitle_getTotalNum();
			dbgMsg("Ag_subtitle_show = " + result);
		}
		else {
			
		}	
	}	
	return result;
}
function subtitleGetLanguageByIndex(idx) {
	var result = 0;
	if (INCLUDE_SUBTITLE == 1)
	{
		if (ARCHIMAGE == 1) {
			dbgMsg("idx = " + idx);
			result = stbObject.Ag_subtitle_getLanguageByIndex(idx);
			dbgMsg("Ag_subtitle_getLanguageByIndex = " + result);
		}
		else {
			
		}	
	}
	return result;	
}
function subtitleSet(idx) {
	var result = 0;
	if (INCLUDE_SUBTITLE == 1)
	{
		if (ARCHIMAGE == 1) {
			if (DEFINE_7405 == 1)
			{
				result = stbObject.Ag_subtitle_getLanguageByIndex(idx);
				dbgMsg("Ag_subtitle_getLanguageByIndex = " + result);
				result = stbObject.Ag_subtitle_setLanguage(result);
				dbgMsg("Ag_subtitle_setLanguage = " + result);
			}
			else {
				result = stbObject.Ag_subtitle_set(idx);
				dbgMsg("Ag_subtitle_set = " + result);
			}	
		}
		else {
			
		}	
	}
	return result;		
}

function subtitleSetLanguage(lang) {
	var result = 0;
	if (INCLUDE_SUBTITLE == 1)
	{
		if (ARCHIMAGE == 1) {
			result = stbObject.Ag_subtitle_setLanguage(lang);
			dbgMsg("Ag_subtitle_setLanguage = " + result);
		}
		else {
			
		}	
	}
	return result;		
}

/************************** Audio *********************************************/
function getAudioTrackTotalNumber()
{
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_audio_getNoOfTrack();
	}
	else {
		result = stbObject.getAudioTrackTotalNumber();		
	}	
	dbgMsg("Ag_audio_getNoOfTrack = " + result);
	return result;		
}
 
function getAudioChannel()
{
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_audio_getStereo();
	}
	else {
	}	
	dbgMsg("getAudioChannel = " + result);
	return result;		
}

function setAudioChannel(ch)
{
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_audio_setStereo(ch);
	}
	else {
		
	}	
	dbgMsg("setAudioChannel = " + result);
	return result;		
}

 function getAudioLanguageByIndex(idx)
 {
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_audio_getLanguageByIndex(idx);	
	}
	else {
		result = stbObject.getAudioLanguageByIndex(idx);	
	}	
	dbgMsg("getAudioLanguageByIndex = " + result);
	return result;		
 }
 
 
 function setAudioTrackByIndex(idx)
 {
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_audio_setTrack();	
	}
	else {
		result = stbObject.setAudioTrackByIndex(idx);	
	}	
	dbgMsg("setAudioTrackByIndex = " + result);
	return result;	
 }
 
 function setAudioMuteOff()
 {
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_audio_setMute(0);	
	}
	else {
		
	}	
	dbgMsg("Ag_audio_setMute = " + result);
	return result;	
 }
 
 function setAudioMuteOn()
 {
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_audio_setMute(1);	
	}
	else {
		
	}	
	dbgMsg("Ag_audio_setMute = " + result);
	return result;	
 }
 
 function setAudioVolume(vol)
 {
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_audio_setVolume(vol);	
	}
	else {
		
	}	
	dbgMsg("setAudioVolume = " + result);
	return result;	
 }
 
 function getAudioVolume()
 {
	var result = 0;
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_audio_getVolume();	
	}
	else {
		
	}	
	dbgMsg("getAudioVolume = " + result);
	return result;	
 }
 
 /************************** CPVR *********************************************/
 
 function recordCreate()
 {
	var id = 0;
	if (ARCHIMAGE == 1) {
		id = stbObject.Ag_record_create();	
		dbgMsg("Ag_record_create id = " + id);	
		if (id >= 0)
			return id;
	}
 }
 
 function recordIPTVStart(mcAddr, id)
 {
	var result = 0;
	
	if (ARCHIMAGE == 1) {
		var ip;
		var port;
		var s = mcAddr.indexOf(":");
		ip = mcAddr.substring(0,s);
		port = parseInt(mcAddr.substring(s+1), 10);
		dbgMsg(">>>>>>>>>>>>>>> ip = " + ip + "port = " + port);	
		result = stbObject.Ag_record_startByIPAndID(ip, port, id);
		dbgMsg("Ag_record_startByIPAndID result = " + result);	
	}
	else {
		
	}	
	
	return result;	
 }
 
 function recordDVBStart(lcn, id)
 {
	var result = 0;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_record_startByLCNAndID(lcn, id);
		dbgMsg("Ag_record_startByLCNAndID result = " + result);	
	}
	else {
		
	}	
	
	return result;	
 }
 
 function recordStop(handle)
 {
	var result = 0;
	
	if (ARCHIMAGE == 1) {
		if (DEFINE_7405 == 1)
			result = stbObject.Ag_record_stop(handle);	
		else
			result = stbObject.Ag_record_stop();	
	}
	else {
		
	}	
	dbgMsg("Ag_record_stop result = " + result);	
	return result;	
 }
 
 
 function getDvbtParameter(index)
 {
	var result = 0;
	
	if (ARCHIMAGE == 1 && DEFINE_7405 == 1) {
		result = stbObject.Ag_dvb_getParameter(index);
	}
	else {
		
	}	
	dbgMsg("getDvbtParameter ret = " + result);
	return result;	
 }
 
 function getRecordFileTotalNumber()
 {
	var result = 0;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_playBack_rangeFile(0, 1);
	}
	else {
		
	}	
	dbgMsg("getRecordFileTotalNumber ret = " + result);
	return result;	
 }
 
 function recordSetMetadata(id, key, value)
 {
	var result = 0;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_record_setMetaData(id, key, value);
	}
	else {
		
	}	
	dbgMsg("Ag_record_setMetaData ret = " + result);
	return result;	
 }
 
 function recordGetMetadata(id, key)
 {
	var result = 0;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_record_getMetaData(id, key);
	}
	else {
		
	}	
	dbgMsg("Ag_record_getMetaData ret = " + result);
	return result;	
 }
 
 function recordDelMetadata(id, key)
 {
	var result = 0;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_record_delMetaData(id, key);
	}
	else {
		
	}	
	dbgMsg("Ag_record_delMetaData ret = " + result);
	return result;	
 }
 
 /************************** PLAYBACK *********************************************/
 function playbackStart(idx)
 {
	var result = 0;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_playBack_rangeFile(0, 1);
		dbgMsg("Ag_playBack_rangeFile ret = " + result);
		if (result > 0)
			result = stbObject.Ag_playBack_play(idx);	
	}
	else {
		
	}	
	dbgMsg("playbackStart ret = " + result);
	return result;	
 }
 
 function playbackStop()
 {
	var result = 0;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_playBack_stop();
	}
	else {
	}	
	dbgMsg("playbackStop ret = " + result);
	return result;	
 }
 
 function playbackSeek(pos)
 {
	var result = 0;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_playBack_seek(pos);
	}
	else {
	}	
	dbgMsg("playbackSeek ret = " + result);
	return result;	
 }
 
 function playbackSetLock(idx,lock)
 {
	var result = 0;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_playBack_setLock(idx,lock);
	}
	else {
	}	
	dbgMsg("playbackSetLock ret = " + result);
	return result;	
 }
 
 function playbackSetFavorite(idx,flg)
 {
	var result = 0;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_playBack_setFavorite(idx,flg);
	}
	else {
	}	
	dbgMsg("playbackSetFavorite ret = " + result);
	return result;	
 }
 
 function playbackSetPasswaord(idx,pw)
 {
	var result = 0;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_playBack_setFilePass(idx,pw);
	}
	else {
	}	
	dbgMsg("playbackSetPasswaord ret = " + result);
	return result;	
 }
 
 function playbackGetFileInfo(idx)
 {
	var result = " ";
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_playBack_getFileInfo(idx);
	}
	else {
		
	}	
	dbgMsg("Ag_playBack_getFileInfo ret = " + result);
	return result;	
 }
 
 function playbackGetIndexByID(id)
 {
	var result = " ";
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_playBack_getIndexByID(id);
	}
	else {
		
	}	
	dbgMsg("playbackGetIndexByID ret = " + result);
	return result;	
 }
 
 function playbackGetIDByIndex(idx)
 {
	var result = " ";
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_playBack_getFileInfo(idx);
		var s = result.indexOf("@");
		var id = result.substring(0,s);
		result = id;
	}
	else {
		
	}	
	dbgMsg("playbackGetIDByIndex ret = " + result);
	return result;	
 }
 
 function playbackGetCurrPosition()
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_playBack_getCurrentTime();
	}
	else {
		
	}	
	dbgMsg("Ag_playBack_getCurrentTime ret = " + result);
	return result;	
 }
 
 function playbackGetRecFileDuration()
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_playBack_getTotalTime();
	}
	else {
		
	}	
	dbgMsg("Ag_playBack_getTotalTime ret = " + result);
	return result;	
 }
 
 function playbackREW(speed)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_playBack_trick(speed);
	}
	else {
		
	}	
	dbgMsg("Ag_playBack_trick ret = " + result);
	return result;	
 }
 
 function playbackFFWD(speed)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_playBack_trick(speed);
	}
	else {
		
	}	
	dbgMsg("Ag_playBack_trick ret = " + result);
	return result;	
 }
 
 function playbackPause()
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_playBack_pause();
	}
	else {
		
	}	
	dbgMsg("Ag_playBack_pause ret = " + result);
	return result;	
 }
 
 function playbackResum()
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_playBack_resume();
	}
	else {
		
	}	
	dbgMsg("Ag_playBack_resume ret = " + result);
	return result;	
 }
 
 function playbackDeleteFile(index)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_playBack_deleteFile(index);
	}
	else {
		
	}	
	dbgMsg("Ag_playBack_deleteFile ret = " + result);
	return result;	
 }
 
 function playbackGetStatus()
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		result = stbObject.Ag_playBack_getStatus();
	}
	else {
		
	}	
	dbgMsg("playbackGetStatus ret = " + result);
	return result;	
 }
 /************************** DOWNLOAD *********************************************/
 
 function dlOpen(url, metadata)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		if (DEFINE_7405 == 1)
		{
			result = stbObject.Ag_download_open(url, metadata);
		}
	}
	else {
	}	
	dbgMsg("Ag_download_open ret = " + result);
	return result;	
 }
 
 function dlStart(id)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		if (DEFINE_7405 == 1)
		{
			result = stbObject.Ag_download_start(id);
		}
	}
	else {
	}	
	dbgMsg("Ag_download_start ret = " + result);
	return result;	
 }
 
 function dlPause(id)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		if (DEFINE_7405 == 1)
		{
			result = stbObject.Ag_download_pause(id);
		}
	}
	else {
	}	
	dbgMsg("Ag_download_pause ret = " + result);
	return result;	
 }
 
 function dlResume(id)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		if (DEFINE_7405 == 1)
		{
			result = stbObject.Ag_download_resume(id);
		}
	}
	else {
	}	
	dbgMsg("Ag_download_resume ret = " + result);
	return result;	
 }
 
 function dlGetStatus(id)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		if (DEFINE_7405 == 1)
		{
			result = stbObject.Ag_download_getStatus(id);
		}
	}
	else {
	}	
	dbgMsg("Ag_download_getStatus ret = " + result);
	return result;	
 }
 
 function dlDelete(id, flg)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		if (DEFINE_7405 == 1)
		{
			result = stbObject.Ag_download_delete(id, flg);
		}
	}
	else {
	}	
	dbgMsg("Ag_download_delete ret = " + result);
	return result;	
 }
 
 function dlGetNumber()
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		if (DEFINE_7405 == 1)
		{
			result = stbObject.Ag_download_getNumber();
		}
	}
	else {
	}	
	dbgMsg("Ag_download_getNumber ret = " + result);
	return result;	
 }
 
 function dlGetIdByIndex(index)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		if (DEFINE_7405 == 1)
		{
			result = stbObject.Ag_download_getIdByIndex(index);
		}
	}
	else {
	}	
	dbgMsg("Ag_download_getIdByIndex ret = " + result);
	return result;	
 }
 
 function dlGetInfoById(id)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		if (DEFINE_7405 == 1)
		{
			result = stbObject.Ag_download_getInfoById(id);
		}
	}
	else {
	}	
	dbgMsg("Ag_download_getInfoById ret = " + result);
	return result;	
 }
 
 function dlStreamPlay(id)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		if (DEFINE_7405 == 1)
		{
			result = stbObject.Ag_download_play_start(id);
		}
	}
	else {
	}	
	dbgMsg("Ag_download_play_start ret = " + result);
	return result;	
 }
 
 function dlStreamPause(id)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		if (DEFINE_7405 == 1)
		{
			result = stbObject.Ag_download_play_pause(id);
		}
	}
	else {
	}	
	dbgMsg("Ag_download_play_pause ret = " + result);
	return result;	
 }
 
 function dlStreamStop(id)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		if (DEFINE_7405 == 1)
		{
			result = stbObject.Ag_download_play_stop(id);
		}
	}
	else {
	}	
	dbgMsg("Ag_download_play_stop ret = " + result);
	return result;	
 }
 
 function dlStreamResume(id)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		if (DEFINE_7405 == 1)
		{
			result = stbObject.Ag_download_play_resume(id);
		}
	}
	else {
	}	
	dbgMsg("Ag_download_play_resume ret = " + result);
	return result;	
 }
 
 function dlStreamGetStatus(id)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		if (DEFINE_7405 == 1)
		{
			result = stbObject.Ag_download_play_getStatus(id);
		}
	}
	else {
	}	
	dbgMsg("Ag_download_play_getStatus ret = " + result);
	return result;	
 }
 
 function fpLightControl(t,s)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		if (DEFINE_7405 == 1)
		{
			result = stbObject.Ag_frontPanel_lightControl(t,s);
		}
	}
	else {
	}	
	dbgMsg("fpLightControl ret = " + result);
	return result;	
 }
 
 function browserSetAlpha(value)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		if (DEFINE_7405 == 1)
		{
			result = stbObject.Ag_browser_setAlpha(value);
		}
	}
	else {
	}	
	dbgMsg("browserSetAlpha ret = " + result);
	return result;	
 }
 
 function browserSetColorKey(color, alpha)
 {
	var result = null;
	
	if (ARCHIMAGE == 1) {
		if (DEFINE_7405 == 1)
		{
			result = stbObject.Ag_browser_setColorKey(color, alpha);
		}
	}
	else {
	}	
	dbgMsg("browserSetColorKey ret = " + result);
	return result;	
 }
 
 
 
 
 
 
 









