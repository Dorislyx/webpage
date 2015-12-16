// JavaScript Document
var KEY_LEFT	= 37;
var KEY_UP		= 38;
var KEY_RIGHT	= 39;
var KEY_DOWN	= 40;
var KEY_ENTER	= 13;
var KEY_BACK	= 8;//213;

var KEY_MUTE	= 1073741879;
var KEY_VOL_UP	= 1073741880;
var KEY_VOL_DOWN= 1073741884;

var KEY_CH_UP	= 1073741869;
var KEY_CH_DOWN	= 1073741867;
var KEY_PG_UP	= 33;
var KEY_PG_DOWN	= 34;

var KEY_PLAY	= 415;
var KEY_FFWD	= 417;
var KEY_REW		= 412;
var KEY_STOP	= 413;

var KEY_EXIT	= 203;
var KEY_CLEAR	= 8;
var KEY_DISPLAY	= 46;
var KEY_MIC		= 220;

var KEY_RED		= 403;
var KEY_GREEN	= 404;
var KEY_YELLOW	= 405;
var KEY_BLUE	= 406;

var KEY_CS		= 1073742339;
var KEY_MOVIE	= null;
var KEY_WEB		= 198;
var KEY_MENU	= 1073742338;

var KEY_AUDIO	= 1073741882;
var KEY_GOTO	= 1073741865;
var KEY_SUBTITLE= 460;

var KEY_NUM_0	= 48;
var KEY_NUM_1	= 49;
var KEY_NUM_2	= 50;
var KEY_NUM_3	= 51;
var KEY_NUM_4	= 52;
var KEY_NUM_5	= 53;
var KEY_NUM_6	= 54;
var KEY_NUM_7	= 55;
var KEY_NUM_8	= 56;
var KEY_NUM_9	= 57;

function pressKeyEventControl(eventFun) {
	document.onkeydown = function(e) {
		var keyValue = e.which;
		eventFun(keyValue);
	};
}
