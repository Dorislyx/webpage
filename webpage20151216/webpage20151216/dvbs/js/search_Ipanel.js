// JavaScript Documen
function getCurrTime(){
	curtime = iPanel.ioctlRead("JseSysRead:curdate");
  iPanel.ioctlWrite("printf","current time :" + curtime );
}
function showTP(){                                           //搜索TP接口
	percentTP = iPanel.ioctlRead("dvbs_blindscan_tp_get_progress");
}
function showCH(){                                            //搜索频道接口
	percentCH = iPanel.ioctlRead("dvbs_search_get_process");
}
function search_TP() {                                       //搜索TP
	if (percentTP < 100) {
		showTP();
		document.getElementById("planNum").innerHTML = percentTP+"%";
		document.getElementById("planB").style.width = percentTP*8+"px";
		setTimeout("search_TP()",500);
	} else {
		searchCH();
	}
}

function search_CH() {                                         //搜索频道
	if (percentCH < 100) {
		showCH();
		document.getElementById("planNum").innerHTML = percentCH+"%";
		document.getElementById("planB").style.width = percentCH*8+"px";
		setTimeout("search_CH()",500);
	} else {
		showPlay();
	}
}
function searchTP(){                                          //开始搜索TP
	iPanel.ioctlWrite("dvbs_blindscan_tp_start","-1");
	document.getElementById("planNum").innerHTML = "0%";
	document.getElementById("prompt").innerHTML = "搜 索 T P 中.....";
	document.getElementById("planW").style.visibility = "visible";
	search_TP();
	return;
}

function searchCH(){                                          //开始搜索频道
	iPanel.ioctlWrite("dvbs_tp_search_start","0");

	document.getElementById("planNum").innerHTML = "0%";
	document.getElementById("prompt").innerHTML = "搜 索 频 道 中.....";
	document.getElementById("planB").style.width = "0px";
	//document.getElementById("planB").style.visibility = "visible";
    search_CH();
	return;
}
function showPlay(){                                         //开始播放
	document.getElementById("startCH").style.visibility = "hidden";
	document.getElementById("planW").style.visibility = "hidden";
	document.getElementById("search").style.visibility = "hidden";
	document.getElementById("bodyImg").style.visibility = "hidden";
	totalCH = iPanel.ioctlRead("dvbs_tv_chnls_get_count");
	iPanel.ioctlWrite("dvbs_tv_chnls_open","1");
	showList();

}
function showList(){                                       //频道列表
	partList=1;
	
    currPage = parseInt(indexList/pageNum+1);
	
	if(totalCH%pageNum == 0){
		totalPage = parseInt(totalCH/pageNum);
	} else {
		totalPage = parseInt(totalCH/pageNum+1);
	}
	showList1();
	document.getElementById("pageNUM").innerHTML = currPage+"/"+totalPage;	
	document.getElementById("list").style.left = "0px";
	document.getElementById("font"+(indexList%10)).style.color = "white";
	document.getElementById("num"+(indexList%10)).style.color = "white";
}

function showList1(){                                           //读取频道信息
	for(var i=0;i<=totalCH;i++){
		var paras = iPanel.ioctlRead("dvbs_tv_chnls_paras_by_idx,"+i);	
		document.getElementById("font"+i).innerHTML = i;
		iPanel.ioctlWrite("printf", "  $$$$$$$$$$$$$###############\n" + paras);
		var url = paras.split('|');
		nameNum = url[0];
		nameCH=url[1];
		iPanel.ioctlWrite("printf", "  $$$$$$$$$$$$$###############\n" + nameCH);
		document.getElementById("list"+i).innerHTML = nameCH;
		arrCH[i]= nameCH;
		arrNum[i]=nameNum;
	} 
	
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
	document.getElementById("infoCHimg").style.top = "575px";
	var count = iPanel.ioctlRead("dvbs_get_current_tv_info");
	var url = count.split('|');
	channelNum = url[0];
    channelName = url[1];
	document.getElementById("infoCHname").innerHTML = channelName;
	document.getElementById("infoCH").innerHTML = count;
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
	iPanel.ioctlWrite("dvbs_tv_chnls_close");
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
	var a = curtime.substring(0,8);
	var e_time = a+"235959";
	key1 = '{"channel":"'+ channelNum +'","startTime":"'+ curtime +'","endTime":"'+ e_time +'"}';
	ret2 = iPanel.ioctlRead("dvbs.programItem.count.schedule,"+key1);
	iPanel.ioctlRead("dvbs.programItem.count.schedule,"+key1);
  iPanel.ioctlWrite("printf","dvbs.programItem.count.schedule :" + ret2 );
}
function EitInfo(){
	var cnt =10;
	var post = 0;
	var key2="";
	key2 = '{"channel":"'+ channelNum +'","postion":"'+ post +'","count":"'+ cnt +'"}';
	eit = iPanel.ioctlRead("dvbs.programItem.get,"+key2);
	iPanel.ioctlWrite("printf","dvbs.programItem.get :" + eit );
}
function ShowData(){           //把读取到的EPG信息取出来
	
	StartGetEit();
	EitInfo();
//var eit = '{ "itemCount": 5, "items": [ { "programTitle": "Money Smart", "startTime": "20090108093000", "endTime": "20090108101500", "programInformation": "" }, { "programTitle": "Inside The Stock Exchange", "startTime": "20090108101500", "endTime": "20090108102500", "programInformation": "" }, { "programTitle": "Money Smart", "startTime": "20090108102500", "endTime": "20090108123500", "programInformation": "" }, { "programTitle": "Inside The Stock Exchange", "startTime": "20090108123500", "endTime": "20090108124500", "programInformation": "" }, { "programTitle": "Money Smart", "startTime": "20090108124500", "endTime": "20090108130000", "programInformation": "" } ] }';
	var obj = eval("("+eit+")");          
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
   //showListPro();
}

function record_task( )
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
		//var iRet = iPanel.ioctlRead(“PVR.Schedule.GetFileURL,”{“schedule_id”:”<任务ID>”}””);
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
