// JavaScript Document
function getCurrTime(){
	curtime =  player.Ag_time_getLocalTime();
  //iPanel.ioctlWrite("printf","current time :" + curtime );
} 
var player = new AVPlayer();

function initDVBS(){                                      //初始化DVBS
	player.Ag_dvbs_init();
}
function selectTuner(tunerIndex){                         //选定Tuner
	player.Ag_dvbs_setTunerIndex(tunerIndex);
}
function showTP(){                                           //搜索TP接口
	 TpErr = player.Ag_dvbs_TPscanStart(0,0,0,0);
}
function showTpPlan(){                                      //搜索TP进度
	 percentTP = player.Ag_dvbs_TPscanGetProgress();
}

function showTpNUM(){                                       //获取Tp总数
	TpNum = player.Ag_dvbs_TPscanGetTPlist();
}
function searchJMD(){
	player.Ag_dvbs_EITScanStart();
}
function showTpName1(){                                     //获取TP信息
	showTpNUM();
	var aa = player.Ag_dvbs_TPscanGetTPInfo();
	for(var i=0;i<TpNum;i++){
		var obj = eval("("+aa+")");  
		arrTpFreq[i] = obj.freq;   
		arrTpSy[i] = obj.symborate;//["bb"][i]["symborate"]; 
		arrTpPr[i] = obj.polority;//["bb"][i]["polority"];
		//document.getElementById("font"+i).innerHTML = i;
		//document.getElementById("list"+i).innerHTML = arrTpFreq[i];
	}
}
function showTpName(){                                     //获取TP信息
	showTpNUM();
	var aa = player.Ag_dvbs_TPscanGetTPInfo();
	for(var i=0;i<TpNum;i++){
		var obj = eval("("+aa+")");  
		arrTpFreq[i] = obj.freq;   
		arrTpSy[i] = obj.symborate;//["bb"][i]["symborate"]; 
		arrTpPr[i] = obj.polority;//["bb"][i]["polority"];
		document.getElementById("font"+i).innerHTML = i;
		document.getElementById("list"+i).innerHTML = arrTpFreq[i];
	}
}
function ChNum(){                                             //获取频道总数
 totalCH = player.Ag_dvbs_Channel_GetCount();
}
function showCH(){                                            //搜索频道接口
    for(var i = 0;i<TpNum;i++){
		var aa = arrTpFreq[i];
		//var dd = aa/10;
		var bb = arrTpSy[i];
		var cc = arrTpPr[i];
	}
	//document.getElementById("prompt").innerHTML =arrTpSy[0] ;
	//player.Ag_dvbs_ChannelListScan2(0, 0, 0,0, int freq_10K, int symborate_kbps, int polority, int sateliteIndex, int deseqcPort, int switch22K);
	player.Ag_dvbs_ChannelListScan2(0,0,0,0,aa,bb,cc,0,0,0)
}
function showCH1(indexList){                                            //搜索频道接口
		var aa = arrTpFreq[indexList];
		//var dd = aa/10;
		var bb = arrTpSy[indexList];
		var cc = arrTpPr[indexList];
	//document.getElementById("prompt").innerHTML =arrTpSy[0] ;
	//player.Ag_dvbs_ChannelListScan2(0, 0, 0,0, int freq_10K, int symborate_kbps, int polority, int sateliteIndex, int deseqcPort, int switch22K);
	player.Ag_dvbs_ChannelListScan2(0,0,0,0,aa,bb,cc,0,0,0);  
}
function showCHInfo(){                                      //搜索频道返回信息
	 chInfo = player.Ag_dvbs_ChannelListGetScanStatus();
}

function search_TP() {                                       //搜索TP
	if (percentTP < 100) {
		if(TpErr==0){
		document.getElementById("planNum").innerHTML = percentTP+"%";
		document.getElementById("planB").style.width = percentTP*8+"px";
		//document.getElementById("prompt").innerHTML = percentTP;
	    showTpPlan();
		} else {
			alert("11111111111");
			return;
		}
        setTimeout("search_TP()",500);
	} else {
		document.getElementById("planNum").innerHTML = "100%";
		document.getElementById("planB").style.width = 100*8+"px";
		initTP();
		//searchCH();
		//showTpNUM();
		//searchCH();
	}
}
function initTP(){	
    tunerSelect=2;
    document.getElementById("prompt").innerHTML = "Search T P Finish";
	document.getElementById("startCH").style.visibility = "hidden";
	document.getElementById("searChHand").style.visibility = "visible";
	document.getElementById("searChAut").style.visibility = "visible";
}
var timer_scan;
function search_CH() {                                         //搜索频道
    showCHInfo();
	timer_scan = setTimeout("search_CH()",1000);
	if (chInfo ==0 ){
		document.getElementById("prompt").innerHTML = chInfo;
	} else if(chInfo ==1){
		document.getElementById("prompt").innerHTML = chInfo;
	} else {
		showPlay();
		document.getElementById("prompt").innerHTML = chInfo;
		clearTimeout(timer_scan);
	}
}
function searchTP(){                                          //开始搜索TP
	//iPanel.ioctlWrite("dvbs_blindscan_tp_start","-1");
	document.getElementById("planNum").innerHTML = "0%";
	document.getElementById("prompt").innerHTML = "Search T P .....";
	document.getElementById("planW").style.visibility = "visible";
	showTP();
	var aa = setTimeout("showTpPlan()",1000);

	search_TP();
	return;
}

function searchCH(){                                          //开始搜索频道
	//iPanel.ioctlWrite("dvbs_tp_search_start","0");

	document.getElementById("planNum").innerHTML = " ";
	document.getElementById("prompt").innerHTML = "搜 索 频 道 中.....";
	document.getElementById("planB").style.width = "0px";
	//document.getElementById("planB").style.visibility = "visible";
	//showTpNUM();
	showTpName1();
	showCH();
    search_CH();
	return;
}
function searchCH1(){                                          //开始搜索频道
	//iPanel.ioctlWrite("dvbs_tp_search_start","0");

	document.getElementById("planNum").innerHTML = " ";
	document.getElementById("prompt").innerHTML = "搜 索 频 道 中.....";
	document.getElementById("planB").style.width = "0px";
	//document.getElementById("planB").style.visibility = "visible";
	//showTpNUM();
	showTpName();
	showCH1(indexList);
    search_CH();
	return;
}
function showChTotal(){                                       //获取频道总数
	totalCH = player.Ag_dvbs_Channel_GetCount();
}
function enterPlay(indexList){                                //播放接口
    player.Ag_dvbs_stop();
    player.Ag_dvbs_Channel_GetInfo(indexList);
	player.Ag_dvbs_play();
}
function showTpList(){
	partList=0;
	TpSelect=2;
	tunerSelect=3;
	showTpNUM();
	document.getElementById("listCh").innerHTML = "T P L I S T";
	document.getElementById("searChHand").style.backgroundImage = "url(img/6.png)";
	document.getElementById("planW").style.visibility = "hidden";
	document.getElementById("planB").style.visibility = "hidden";
	document.getElementById("search").style.visibility = "hidden";
	document.getElementById("selectTu").style.visibility = "hidden";
    currPage = parseInt(indexList/pageNum+1);
	
	if(TpNum%pageNum == 0){
		totalPage = parseInt(TpNum/pageNum);
	} else {
		totalPage = parseInt(TpNum/pageNum+1);
	}
	showTpName();
	document.getElementById("pageNUM").innerHTML = currPage+"/"+totalPage;	
	document.getElementById("list").style.left = "0px";
	document.getElementById("font"+(indexList%10)).style.color = "white";
	document.getElementById("num"+(indexList%10)).style.color = "white";
}
function showPlay(){                                          //开始播放
    partList=3;
	indexList=0;
	document.getElementById("startCH").style.visibility = "hidden";
	document.getElementById("planW").style.visibility = "hidden";
	document.getElementById("search").style.visibility = "hidden";
	document.getElementById("bodyImg").style.visibility = "hidden";
	document.getElementById("selectTu").style.visibility = "hidden";
	document.getElementById("searChHand").style.visibility = "hidden";
	document.getElementById("searChAut").style.visibility = "hidden";
	//totalCH = player.Ag_dvbs_Channel_Count();
	ChNum();
	//showTpNUM();
    searchJMD();
	player.Ag_dvbs_Channel_GetInfo(0);
	player.Ag_dvbs_Channel_PrintInfo();
	player.Ag_dvbs_play();
	showList();
}
function ChInfo(){
	//ChNum();
	for(var i = 0;i<totalCH;i++){
	  var aa = player.Ag_dvbs_Channel_GetInfo(i);
	  var obj = eval("("+aa+")"); 
	  arrCH[i]=obj.channelName;
	  arrNum[i]=obj.lcn;
}
      ChInfo1();
}
function ChInfo1(){
	for(var i = 0;i<10;i++){
	  document.getElementById("font"+i).innerHTML = i;
	  document.getElementById("list"+i).innerHTML = arrCH[i];
	}
}
function showList(){                                       //频道列表
	partList=1;
	//ChNum();
    currPage = parseInt(indexList/pageNum+1);
	
	if(totalCH%pageNum == 0){
		totalPage = parseInt(totalCH/pageNum);
	} else {
		totalPage = parseInt(totalCH/pageNum+1);
	}
	ChInfo();
	document.getElementById("pageNUM").innerHTML = currPage+"/"+totalPage;	
	document.getElementById("list").style.left = "0px";
	document.getElementById("listCh").innerHTML = "CHANNEL LIST";
	document.getElementById("font"+(indexList%10)).style.color = "white";
	document.getElementById("list"+(indexList%10)).style.color = "white";
}


function listUp(){     //向上键循环列表
	document.getElementById("font"+(indexList%10)).style.color = "gray";
	document.getElementById("list"+(indexList%10)).style.color = "gray";
	indexList--;
	var b = (indexList%10)*39+166;
	document.getElementById("indexCH").style.top = b+"px";
	document.getElementById("font"+(indexList%10)).style.color = "white";
	document.getElementById("list"+(indexList%10)).style.color = "white";
}
function listUp1(){     //向上键循环列表
	document.getElementById("a"+(indexList1%10)).style.color = "gray";
	indexList1--;
	var b = (indexList1%10)*39+127;
	document.getElementById("indexCH1").style.top = b+"px";
	document.getElementById("a"+(indexList1%10)).style.color = "white";
}
function listDown(){   //向下键循环列表
	document.getElementById("font"+(indexList%10)).style.color = "gray";
	document.getElementById("list"+(indexList%10)).style.color = "gray";
	indexList++;	
	var b = (indexList%10)*39+166;
	document.getElementById("indexCH").style.top = b+"px";
	document.getElementById("font"+(indexList%10)).style.color = "white";
	document.getElementById("list"+(indexList%10)).style.color = "white";
}

function listDown1(){   //向下键循环列表
	document.getElementById("a"+(indexList1%10)).style.color = "gray";
	indexList1++;	
	var b = (indexList1%10)*39+127;
	document.getElementById("indexCH1").style.top = b+"px";
	document.getElementById("a"+(indexList1%10)).style.color = "white";
}
function chanelInfo(){ //获取当前播放频道信息
	partList=2;
	player.Ag_dvbs_Channel_GetInfo(indexList);
	nameCH = arrCH[indexList];
	var aa = player.Ag_dvbs_getPresentEvent("eng");
	document.getElementById("infoCHimg").style.top = "575px";
    var obj = eval("("+aa+")"); 
	//channelNum = url[0];
    //channelName = url[1];
	startTimeCh = obj.startTime;

	var bb = obj.duration;
	var dd = bb/60;
	var cc = obj.eventName;
	//var dd = obj.eventNameLen;
	//var ee = obj.extendDecBuf;
	//var ff = obj.extendDecBufLen;
	document.getElementById("infoCHname").innerHTML = nameCH;
	document.getElementById("infoCH").innerHTML = startTimeCh+indexList+"|"+nameCH+"|"+"Duration:"+dd+"|"+"EventName:"+cc;
}

function pageAdd(){     //翻页 下一页
	if(currPage<totalPage){
		if((indexList+1)%10==0){
			document.getElementById("font"+(indexList%10)).style.color = "gray";
	        document.getElementById("list"+(indexList%10)).style.color = "gray";
			indexList = indexList+1;
			document.getElementById("indexCH").style.top = "166px";
			document.getElementById("font"+(indexList%10)).style.color = "white";
	        document.getElementById("list"+(indexList%10)).style.color = "white";
		} else {
			indexList = indexList+10;
	  }
		currPage = parseInt(indexList/pageNum+1);
		var a = currPage-1;
		a= a*10;
		document.getElementById("pageNUM").innerHTML = currPage+"/"+totalPage;	
		for(var i=0;i<10;i++){
			if((a+i)<totalCH-1){
				document.getElementById("font"+i).innerHTML = arrNum[a+i];
				document.getElementById("list"+i).innerHTML = arrCH[a+i];
			} else {
				document.getElementById("font"+i).innerHTML = "";
				document.getElementById("list"+i).innerHTML = "";
		   }
		}
	} else {
		return;
	}
}

function pageSub(){          //翻页 上一页
	if(currPage>1){
		if(indexList%10==0){
			document.getElementById("font"+(indexList%10)).style.color = "gray";
	        document.getElementById("list"+(indexList%10)).style.color = "gray";			
			indexList = indexList-1;
			document.getElementById("indexCH").style.top = "517px";
			document.getElementById("font"+(indexList%10)).style.color = "white";
	        document.getElementById("list"+(indexList%10)).style.color = "white";
		} else {		
			indexList=indexList-10;
	    }
		currPage = parseInt(indexList/pageNum+1);
		var a = currPage-1;
		a = a*10;
		document.getElementById("pageNUM").innerHTML = currPage+"/"+totalPage;	
		for(var i=0;i<10;i++){
			if(indexList>0){
				document.getElementById("font"+i).innerHTML = arrNum[a+i];
				document.getElementById("list"+i).innerHTML = arrCH[a+i];
			} else {
				return;
			}
		}
	} else {
		return;
	}
}
 
function startRe(){        //开始录制
	 record_task( );
	 document.getElementById("showRE").style.visibility = "visible";
}

function endRe(){	       //结束录制
//	 record_realTime_stop( );	
	 document.getElementById("showRE").style.visibility = "hidden";
}

function searchAg(){      //重新搜台
	partList=0;
	//iPanel.ioctlWrite("dvbs_tv_chnls_close");
	document.getElementById("bodyImg").style.visibility = "visible";
	document.getElementById("startCH").style.visibility = "visible";
	document.getElementById("planW").style.visibility = "visible";
	document.getElementById("search").style.visibility = "visible";
    document.getElementById("startCH").innerHTML = "重 新 搜 台";
}

//eit 

function showListPro(){  // 显示EPG信息
	
	partList=5;  
    ShowData();
    document.getElementById("indexCH1").style.top = "127px";
    document.getElementById("a"+(indexList1%10)).style.color = "white";
}
function StartGetEit(){
	getCurrTime();
	var key1="";
	var ret2="";
	var a = curtime.substring(0,9);
	var e_time = a+"235959";
	
	var startT = substring_fn(startTimeCh);
	var endT = substring_fn(e_time);
	var time_str = startT+","+endT;
	
	EitCount = player.Ag_dvbs_GetScheduleEventIdCount(time_str);
	//key1 = '{"channel":"'+ channelNum +'","startTime":"'+ curtime +'","endTime":"'+ e_time +'"}';
	//EitCount = player.Ag_dvbs_GetScheduleEventNoByRange("2009,1,8,13,0,00,2009,1,8,23,59,59");
	//ret2 = iPanel.ioctlRead("dvbs.programItem.count.schedule,"+key1);
	//iPanel.ioctlRead("dvbs.programItem.count.schedule,"+key1);
  //iPanel.ioctlWrite("printf","dvbs.programItem.count.schedule :" + ret2 );
}

//
function substring_fn(string) {
	var yy = parseInt(string.substring(0,4));
	var mm = parseInt(string.substring(4,6));
	var dd = parseInt(string.substring(6,8));
	var hh = parseInt(string.substring(9,11));
	var mn = parseInt(string.substring(11,13));
	var ss = parseInt(string.substring(13,15));
	var str = ""+yy+","+mm+","+dd+","+hh+","+mn+","+ss;
	return str;
}


function EitInfo(){
	
	for(var i =0 ; i<EitCount; i ++){
		//player.Ag_dvbs_GetScheduleEventIdCount("2009,1,8,13,0,00,2009,1,8,23,59,59");2009-1-8 13:0 00
		var eventID = player.Ag_dvbs_GetScheduleEventId(i);
	    eit = player.Ag_dvbs_GetScheduleEventInfoByID(eventID,"eng");
		var obj = eval("("+eit+")");
		var startTime = obj.startTime;
		var url = startTime.split(' ');
		var startTime1 = url[1];
		var endTime = obj.duration;
		var duration =endTime/60;
		var eventName = obj.eventName;
		//var a =  startTime.substring(8,10);
		//var b =  startTime.substring(10,12);
		arrEpgStart1[i] = startTime1;
		arrEpgStart2[i] = b;
		arrEpgTitle[i] = eit;
		arrEpgStart[i] = startTime;
		arrEpgEnd[i] = duration;
		arrTpPr[i] = eventName;
		document.getElementById("a"+i).innerHTML = arrEpgStart1[i]+":"+arrEpgEnd[i]+"&nbsp;&nbsp;"+arrTpPr[i];

	}
	//var cnt =10;
	//var post = 0;
	//var key2="";
	//key2 = '{"channel":"'+ channelNum +'","postion":"'+ post +'","count":"'+ cnt +'"}';
	//eit = iPanel.ioctlRead("dvbs.programItem.get,"+key2);
	//iPanel.ioctlWrite("printf","dvbs.programItem.get :" + eit );
}
function ShowData(){           //把读取到的EPG信息取出来
	
	StartGetEit();
	EitInfo();
//var eit = '{ "itemCount": 5, "items": [ { "programTitle": "Money Smart", "startTime": "20090108093000", "endTime": "20090108101500", "programInformation": "" }, { "programTitle": "Inside The Stock Exchange", "startTime": "20090108101500", "endTime": "20090108102500", "programInformation": "" }, { "programTitle": "Money Smart", "startTime": "20090108102500", "endTime": "20090108123500", "programInformation": "" }, { "programTitle": "Inside The Stock Exchange", "startTime": "20090108123500", "endTime": "20090108124500", "programInformation": "" }, { "programTitle": "Money Smart", "startTime": "20090108124500", "endTime": "20090108130000", "programInformation": "" } ] }';
/*	var obj = eval("("+eit+")");          
		return_code = obj["itemCount"];   
		for(var i=0;i<return_code;i++){ 
		var programTitle = obj["items"][i]["programTitle"];   
		var startTime = obj["items"][i]["startTime"]; 
		var endTime = obj["items"][i]["endTime"];
		var a =  startTime.substring(8,10);
		var b =  startTime.substring(10,12);
		arrEpgTitle[i] = programTitle;
		arrEpgStart[i] = startTime;
		arrEpgStart1[i] = a;
		arrEpgStart2[i] = b;
		arrEpgEnd[i] = endTime;
		document.getElementById("a"+i).innerHTML = arrEpgStart1[i]+":"+arrEpgStart2[i]+"&nbsp;&nbsp;"+arrEpgTitle[i];
	}
*/   //showListPro();
}

/*function record_task( )
{
		iPanel.ioctlWrite("PVRAbility", "{'AllowPVR':'1','AllowConcurrent':'1'}");
		
		var curTime = iPanel.ioctlRead("JseSysRead:curdate");
 		psch_id = curTime + 1;

     var curProg_id = "eventID";
     var curProg_title="cctv";
     var curStartime = arrEpgStart[indexList1];
     var curEndtime  = arrEpgEnd[indexList1];
     var curProtectionModel =   "source";
     var curPriority = "RECORD_IF_NO_CONFLICT";
     var curContenPath = "DVB";
     var curAutodelete = 0;
     var curProDes = "";
     var key = '{"schedule_id":"'+ psch_id +'" ,"channel_num":"' + channelNum + '","channel_name":"'+ channelName + '","prog_id":"' + curProg_id + '","prog_title":"' + curProg_title + '","startime":"' + curStartime + '","endtime":"'+ curEndtime +'","protectionModel":"'+ curProtectionModel +'","priority":"'+ curPriority +'",contentPath":"'+ curContenPath+'"}';
     iPanel.ioctlWrite("PVR.Schedule.Update",""+key);
} 

function record_realTime( )
{ 
		iPanel.ioctlWrite("PVRAbility", "{'AllowPVR':'1','AllowConcurrent':'1'}");
 		var curTime = iPanel.ioctlRead("JseSysRead:curdate");
 		rsch_id = curTime + 0;
	  var a = curTime.substring(0,8);
	  var endTime = a+"235959";
     var curProg_id = "eventID";
     var curProg_title="cctv";
     var curProtectionModel =   "source";
     var curPriority = "RECORD_IF_NO_CONFLICT";
     var curContenPath = "DVB";
     var curAutodelete = 0;
     var curProDes = "";
     var key = '{"schedule_id":"'+ rsch_id +'" ,"channel_num":"' + channelNum + '","channel_name":"'+ channelName + '","prog_id":"' + curProg_id + '","prog_title":"' + curProg_title + '","startime":"' + curTime + '","endtime":"'+ endTime +'","protectionModel":"'+ curProtectionModel +'","priority":"'+ curPriority +'",contentPath":"'+ curContenPath+'"}';
     iPanel.ioctlWrite("PVR.Schedule.Update",""+key);
} 

function record_realTime_stop( )
{
	
	var key = '{"schedule_id":"' + rsch_id +'"}';
	iPanel.ioctlWrite("PVR.Schedule.Stop",""+key);
	
}

function GetPvrFileUrl( )
{
		//var iRet = iPanel.ioctlRead("PVR.Schedule.GetFileURL,"{"schedule_id":"<任务ID>"}"");
}

function PlayPvrFile( )
{
		var key="" ;
		key = '{"schedule_id":"'+ rsch_id +'"}';
		
		var iRet = iPanel.ioctlRead( "PVR.Schedule.GetFileURL,"+key );
		//{"fileURL":"file:///49666b12","schedule_id":"200901082107280"}
		var obj = eval("("+iRet+")");
		var iRet1 = obj["fileURL"]; 
		var a = iRet1.substring(8,16);
		var iRet2 = iRet1+"/"+a;
		iPanel.ioctlWrite("printf","record file :"+iRet1);
		iPanel.ioctlWrite("printf","record file :"+a);
		iPanel.ioctlWrite("printf","record file :"+iRet2);
		
		iPanel.ioctlWrite("File.OpenDir",""+iRet2);
		
}
*/