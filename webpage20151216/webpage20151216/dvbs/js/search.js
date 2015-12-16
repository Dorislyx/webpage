// JavaScript Document

var indexList = 0;   //频道列表索引
var indexList1 = 0;   // epg信息列表索引
var partList = 0;	//是否焦点在列表区域
var indexPage = 0; //控制翻页功能键索引
var percentTP = 0;     //扫描TP百分比
var percentCH = 0;     //搜索频道百分比
var tunerIndex = 1;        //tuner索引号
var tunerSelect = 0; 
var TpNum ;                //tp个数
var TpErr;
var chInfo;                //搜索频道返回信息
var startTimeCh;           //当前频道开始时间
var EitCount;              //获取的一段时间内节目总数
var TpSelect=0;           //选择手动搜台和自动搜台索引
var pageNum = 10;    //每页显示数量
var totalCH;         //频道总数量
var totalPage;       //当前页
var currPage ;       //总页数
var nameCH;          //频道名称
var nameNum;         //频道号
var channelName;     //当前频道名
var channelNum;     //当前频道号
var return_code;    //eit节目单总数
var curtime ;       //系统当前时间
var eit;            //节目单信息
var rsch_id;        //实时录制任务id
var psch_id;        //计划录制任务id

var arrCH = new Array();  //获取频道名称数组
var arrNum = new Array(); //获取频道号数组
var arrEpgTitle = new Array(); //获取Epg信息数组
var arrEpgStart = new Array(); //获取Epg信息开始时间
var arrEpgStart1 = new Array(); //获取Epg信息开始时间1
var arrEpgStart2 = new Array(); //获取Epg信息开始时间2
var arrEpgEnd = new Array(); //获取Epg信息结束时间
var arrTpFreq = new Array();
var arrTpSy = new Array();
var arrTpPr = new Array();
document.onkeydown = keyEvent;
//document.onkeypress = keyEvent;
function keyEvent(e) {	

	var keyValue = e.which;	
	    //iPanel.ioctlWrite("printf","===========n..............etwork_type" + keyValue +"\n");
	switch(keyValue) {
    	case 37:	//left
			if(partList==0 && tunerSelect==0){
				tunerChange();
			}
			if(partList==0&&tunerSelect==2){
				TpSelectChange();
			}
			return false;
			break;
		case 38:	//up
			if(partList==0&&tunerSelect ==1){
				tunerSelect = 0;
				document.getElementById("selectTuImg").style.backgroundImage = "url(img/5.png)";
				document.getElementById("startCH").style.backgroundImage = "url(img/6.png)";
			}
			if(partList==0&&TpSelect ==2&&tunerSelect==3){
				if (indexList%10==0) {
					pageSub();
				}else if(indexList==0){
					return;
					} else {
						listUp();
				}
			}
			if(partList==1){
				if (indexList%10==0) {
					pageSub();
				}else if(indexList==0){
					return;
					} else {
						listUp();
				}

			}
			if(partList==5){
				if (indexList1%10==0) {
					pageSub();
				}else if(indexList1==0){
					return;
					} else {
						listUp1();
				}

			}
			return false;
			break;
		case 39:	//right
			if(partList==0 && tunerSelect==0){
				tunerChange();
			}
			if(partList==0&&tunerSelect==2){
				TpSelectChange();
			}
			if(partList==0&&TpSelect==2&&tunerSelect==3){
				document.getElementById("list").style.left = "-720px";
				TpSelect=0;
				tunerSelect=2;
				document.getElementById("searChHand").style.backgroundImage = "url(img/5.png)";
			}
			return false;
			break;
		case 40:	//down
			if(partList==0){
				tunerSelect = 1;
				document.getElementById("selectTuImg").style.backgroundImage = "url(img/6.png)";
				document.getElementById("startCH").style.backgroundImage = "url(img/5.png)";
			}
			if(partList==0&&TpSelect ==2&&tunerSelect==3){
				if ((indexList+1)%10 == 0 && indexList != TpNum-1 ) {
					//document.getElementById("font"+(indexList%10)).style.color = "white";
					//document.getElementById("list"+(indexList%10)).style.color = "white";
					//document.getElementById("pageup").style.visibility = "visible";	
					//partList = 1;
					pageAdd();
				} else if(indexList == TpNum-1){
					var b = (indexList%10)*39+166;
					document.getElementById("indexCH").style.top = b+"px";
					return;
				}else {
					//document.getElementById("startCH").style.backgroundImage = "url(img/5.png)";
					listDown();				
				}
			}
			if(partList==1){
				if ((indexList+1)%10 == 0 && indexList != totalCh-1 ) {
					//document.getElementById("font"+(indexList%10)).style.color = "white";
					//document.getElementById("list"+(indexList%10)).style.color = "white";
					//document.getElementById("pageup").style.visibility = "visible";	
					//partList = 1;
					pageAdd();
				} else if(indexList == totalCH-1){
					var b = (indexList%10)*39+166;
					document.getElementById("indexCH").style.top = b+"px";
					return;
				}else {
					listDown();				
				}

			}
			if(partList==5){
				if ((indexList1+1)%10 == 0 && indexList1 != EitCount-1 ) {
					//document.getElementById("font"+(indexList%10)).style.color = "white";
					//document.getElementById("list"+(indexList%10)).style.color = "white";
					//document.getElementById("pageup").style.visibility = "visible";	
					//partList = 1;
					pageAdd();
				} else if(indexList1 == EitCount-1){
					var b = (indexList1%10)*39+127;
					document.getElementById("indexCH1").style.top = b+"px";
					return;
				}else {
					listDown1();				
				}

			}

			return false;
			break;
		case 13:                      //enter
			if(partList==0&&tunerSelect==1){
				selectTuner(tunerIndex);
				ChNum();
				if(totalCH>0){
					//player.Ag_dvbs_Channel_PrintInfo();
					showPlay();
					//clearTimeout(a);
				} else {
					showSearch();
					searchTP();
					return;
				   //clearTimeout(a);
				}
				
			} else if(partList==1){
				enterPlay(indexList);
			} else if(partList == 4){
				serachAg();
			}
			if(partList==0&&TpSelect==0&&tunerSelect==2){
				showTpList();
			} else if(partList==0&&TpSelect==1&&tunerSelect==2){
				searchCH1();
			} else if(partList==0&&TpSelect==2){
				searchCH();
			}
			
			return false;
			break;
		case 27:
			break;
		case 213:  //back			 返回分发页面
			document.location.href = "./../DVBDispatch.html";
			break;
		case 1073741880: //Vol+
		break;
		case 1073741884: //vol--
		break;
		case 203: //exit
		if(partList==1){
			partList=3;
			document.getElementById("list").style.left = "-720px";
		} else if(partList==2){
			partList=3;
			document.getElementById("infoCHimg").style.top = "720px";
		} else if(partList==3){
            player.Ag_dvbs_stop();
			//partList=4;
			//document.getElementById("searchAgain").style.visibility = "visible";
			return;
		} else if(partList==4){
			partList=3;
			document.getElementById("searchAgain").style.visibility = "hidden";
		} else {
			return;
		}
		return false;
		break;
		case 406: //blue
		if(partList==3||partList==2){
			partList=1;
			pageAdd();			     
			document.getElementById("infoCHimg").style.top = "720px";
			document.getElementById("list").style.left = "0px";
		}
		return false;
		break;
		case 403: //red 
		if(partList==5){
			startRe();
		} else if(partList==2){
			record_realTime( );
			document.getElementById("showRE").style.visibility = "visible";
		}
		return false;
		break;
	  case 405: //yellow 
		if(partList==2){
			endRe();
		}  
		return false;
		break;
		case 404: //gree
		if(partList==2){
			document.getElementById("showPro").style.left = "0px";
			partList=5;
            showListPro();

		} else if(partList==5){
			partList=2;
			document.getElementById("a"+(indexList1%10)).style.color = "gray";
			indexList1=0;
			document.getElementById("showPro").style.left = "-410px";
		}
        return false;
		break;
		case 46: //display
		if(partList==3){          
			chanelInfo();
		}
        return false;
		break;
		
		case 1073741867: //CHANNEL -
		if(partList==3){
			if(indexList>0){
				enterPlay(indexList);
				indexList--;
			} else {
				return;
			}
		}
		return false;
		break;
		case 1073741869: //CHANNEL +
		if(partList==3){
			if(indexList<totalCH-1){
				enterPlay(indexList);
				indexList++;
			} else {
				return;
			}
	    }
        return false;
		break;
		case 33: //page+
		if(partList==1){
			pageAdd();
		} else if(partList==0&&TpSelect==1&&tunerSelect==2){
			pageAdd();
		}
		return false;
		break;
		case 34: //page-
		if(partList==1){
			pageSub();
	    } else if(partList==0&&TpSelect==1&&tunerSelect==2){
			pageSub();
		}
        return false;
		break;
		case 49:	//right
		return false;
		break;
    case 263:	//play
		PlayPvrFile( );
		return false;
		break; 		
		case 270:	//stop
		return false;
		break;
	default:
	    break;
	}	
	return;
}
function init(){                                             //页面初始化
    initDVBS();
	//player.Ag_dvbs_Channel_PrintInfo();
	//showSearch();
	//showChTotal();
/*	if(totalCH>0){
        //player.Ag_dvbs_Channel_PrintInfo();
		showPlay();
        //clearTimeout(a);
	} else {
        showSearch();
		return;
//clearTimeout(a);
	}
*/}

function showSearch(){
	//document.getElementById("startCH").style.backgroundImage = "url(img/6.png);"
	document.getElementById("selectTuFont").innerHTML = "Tuner"+" "+tunerIndex;
}

function tunerChange(){
	if(tunerIndex==1){
		tunerIndex=2;
	} else {
		tunerIndex=1;
	}
	document.getElementById("selectTuFont").innerHTML = "Tuner"+" "+tunerIndex;
	selectTuner(tunerIndex);
}
function TpSelectChange(){
	if(TpSelect==0){
		TpSelect=1;
		document.getElementById("searChHand").style.backgroundImage = "url(img/6.png)";
		document.getElementById("searChAut").style.backgroundImage = "url(img/5.png)";
	} else {
		TpSelect=0;
		document.getElementById("searChHand").style.backgroundImage = "url(img/5.png)";
		document.getElementById("searChAut").style.backgroundImage = "url(img/6.png)";
	}

}