// JavaScript Document
var player = null;	//dvbc接口对象
//var dvbc = null;	//dvbc类对象
var showScanFrameStatus = false;	//记录搜索框的显示、隐藏状态
var isChannelListShow = false;		//频道列表显示、隐藏状态
var channelListIndex = 0;			//初始频道列表焦点索引值
var channelListPageNum = 10;		//频道列表每页最多显示数
var showOrHiddInfo = false;			//频道信息的显示、隐藏状态
var channelName = new Array();		//保存频道名称

var qamParam = new Array('16QAM', '32QAM', '64QAM', '128QAM', '256QAM', '512QAM', '1024QAM', '2048QAM', '4096QAM');		//QAM值
var qamParamIndex = 0;		//默认QAM值
var scanFocusIndex = 0;		//搜索框焦点索引
var scanFocusIsLeft = true;	//搜索框button焦点状态
var inputO = null;			//输入框对象

var stopKeyControl = false;	//锁键

var audioObj = null;		//音频对象
var volShowStatus = false;	//记录音量条的显示状态
var timer_vol;	//音量条的控制
var stereoArrayText = new Array('Stereo','Left','Right');
var stereoStatus = false;
