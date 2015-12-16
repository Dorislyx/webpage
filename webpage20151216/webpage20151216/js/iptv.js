// JavaScript Document
/*********************************************************************/
/* Function: keyEvent                                                */
/* Description: 遥控器按键处理函数                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/ 
document.onkeydown = keyEvent; 
//document.onkeypress = keyEvent; 
function keyEvent(e) {
	var	keyvalue = e.which; 
	player.printf(1, '----key---------'+keyvalue);
	player.printf(1, '----stopRecordStatus---------'+stopRecordStatus);
	if (stopRecordStatus && keyvalue != 1073742366) {
		return;
	}
	switch(keyvalue)
	{	
		case 48: 		 
		case 49:  
		case 50:  
		case 51:  
		case 52: 
		case 53: 
		case 54: 	
		case 55: 
		case 56: 
		case 57:
			var KeyNum = keyvalue-48;
			if (timeShiftStatus == 0) {
				numberKeySelectChannel(KeyNum);
			} else {
				SeekKeyNum(KeyNum); 
			}
			break;
		case 38: //Key Up
			if(menuStatus==1){			  
				return (false);
			}
			else if(timeShiftStatus == 1 && PlayTsstatus==0){
				return false;
			}
			else if(Tipsstatus == 0){
				return false;
			}
			else {
				keyUp();	
			}			  
			//document.getElementById("ListDiv").style.webkitTransform = "scale(1.0)";
			return false;
		break;	
		case 39: //Key Right	
			//keyChannelUp();
			if(ShowListst==1){
				return false;
			}
			if(menuStatus==1){
				keymenuLeft(); 
				return (false);
			}
			keyRight();
			return (false);
		break;
		case 40: //Key Down 
			if(menuStatus==1){
				return (false);
			}
			else if(timeShiftStatus == 1 && PlayTsstatus==0){
				return false;
			}
			else if(Tipsstatus == 0){
				return false;
			}
			else{
				keyDown();	
			}	  
			//document.getElementById("ListDiv").style.webkitTransform = "scale(0.2)";
		return false;
		break;
		case 37: //Key Left
			//keyChannelDown();
			if(ShowListst==1){
				return false;
			}
			if(menuStatus==1){
				keymenuRight();
				return (false);
			} 
			keyLeft();
			return (false);
		break;
		case 13: //Key Enter
		  	keyEnter();
		break; 
		case 1073742338: //menu
			if(timeShiftStatus == 1 && PlayTsstatus==0){
				return;
			} 
			else if(menuStatus == 0) {
				if(KeyExitNum != -1){ 
					KeyExit(KeyExitNum); // Close Html; 
					window.clearTimeout(MenuTimer);
					window.clearTimeout(TimerHiddDiv);	
					MenuTimer = setTimeout("moveMenu()",500);
					KeyExitNum = 0;
					TimerHiddFun(0);				
				}
				else{
					window.clearTimeout(MenuTimer);
					window.clearTimeout(TimerHiddDiv);	
					moveMenu();
					KeyExitNum = 0;
					TimerHiddFun(0);
				}				
			}
			else{
				window.clearTimeout(MenuTimer);
				KeyExit(0);
			}
			break;	
		case 213: //Key Back
		case 8: //Key Back
		  	keyBack();
			return (false);
		break;
		case 203: //Key Exit
			if(timeShiftStatus == 1){
				if(Ts_SeekStatus == 1){
					if(PlayTsstatus == 1){
						KeyExit(10);
					}
					return;
				}
				else if(PlayTsstatus == 0){
					return;
				}
			}
			else if(Tipsstatus == 0){
				return false;
			}
			else{
				KeyExit(KeyExitNum); // Close Html;		
			} 
		break;
		case 46: //Key Display
			var  ChannelInforTimer; 
			if(timeShiftStatus == 1 && PlayTsstatus==0){
				return;
			}
			else if(Tipsstatus == 0){
				return false;
			} 
			if(ShowListst==0){
			/*	if(pipStatus == 1){
					pipCloseFun();// Close PIP;
				}
				pipTop = pipPos[4];
				pipLeft = pipPos[5];
				pipSetWindowFun(pipLeft,pipTop,pipWidth,pipHeight); // Set pip Window;
				document.getElementById("pipDivTxt").style.top = pipPos[4] + "px";
				document.getElementById("pipDivTxt").style.left = pipPos[5] + "px";
			*/	if(KeyExitNum !=-1 && KeyExitNum != 11){ 
					KeyExit(KeyExitNum); // Close Html;
					ChannelInforTimer = setTimeout("showChannelInfo()",800);					
					TimerHiddFun(9); 	
			 	} 
				else{
					window.clearTimeout(ChannelInforTimer);
					showChannelInfo(); 	
			 	}			 
				//pipPlayFun(PipType,ChannelNum); 
			}
			else if(ShowListst==1){ 
				window.clearTimeout(TimerHiddDiv);				
				window.clearTimeout(ChannelListTimer); 
				showListDiv();
			}
			else{ 		
				window.clearTimeout(ChannelListTimer); 		
			 	KeyExit(1);				 
			}
		break;
		case 33: //Key Page Up
			if(timeShiftStatus == 1 && PlayTsstatus==0){
				return false;
			}
			else if(Tipsstatus == 0){
				return false;
			}
			else{
		  		//keyPageUp();
		  		keyPageDown();
			}
		break;
		case 34: //Key Page Down
			if(timeShiftStatus == 1 && PlayTsstatus==0){
				return false;
			}
			else if(Tipsstatus == 0){
				return false;
			}
			else{
		  		keyPageUp();
		  		//keyPageDown();
			}
		break;
		case 1073741880: //Vol +
			if(timeShiftStatus == 1 && PlayTsstatus==0){
				return false;
			}
			else if(Tipsstatus == 0){
				return false;
			}
			else{
		  		keyVolUp();
			}
		break;
		case 1073741884: //Vol -
			if(timeShiftStatus == 1 && PlayTsstatus==0){
				return false;
			}
			else if(Tipsstatus == 0){
				return false;
			}
			else{
		  		keyVolDown();
			}
		break;
		case 1073741879: //Mute
			if(timeShiftStatus == 1 && PlayTsstatus==0){
				return false;
			}
			else if(Tipsstatus == 0){
				return false;
			}
			else{
		  		keyMute();
			}
		break;
		case 1073741882: //Audio
			if(timeShiftStatus == 1 && PlayTsstatus==0){
				return false;
			}
			else if(Tipsstatus == 0){
				return false;
			}
			else{
		  		keyAudio(); 
			}
		break;
		case 460: //Subtitle
			if(timeShiftStatus == 1 && PlayTsstatus==0){
				return false;
			}
			else if(Tipsstatus == 0){
				return false;
			}
			else{
		  		keySubtitle(); 
			}
		break;
		case 1073741869: //Channel +
		  	keyChannelUp();
		break;
		case 1073741867: //Channel - 
		  	keyChannelDown();
		break;
		case 1073742339: //Key Sync
			if(Tipsstatus == 0){
				return false;
			}
			else{
		  		SyncStart(); 
			}
		break;
		case 1073741865: //Key Go To  Seek; 
			if(Tipsstatus == 0){
				return false;
			}
			if(TsReffwStatus == 1){ //Rew or Ffwd Status;
				return false;
			}
			else{
		  		SeekStart();
			} 
		break;
		case 403: //Key Red
		case 74: //Key Record;
			if(Tipsstatus == 0){
				return false;
			}
			else{
		  		keyRed(); 
			}
		break;
		case 404: //Key Green  // Pip show 
		   	keyGreen();
		break;
		case 405: //Key Yellow 
			if (timeShiftStatus == 1) {
				if (KeyExitNum == 7) {
					KeyExit(KeyExitNum);
				} else {
					KeyExit(KeyExitNum);
					TsgetTltime();// TimeShift Total Time
					TsposTlTimeFun();
					document.getElementById("TimeShiftDiv_H").style.top = "578px";
					KeyExitNum = 7; 
				}
			}
			break;
		case 406: //Key  blue, TimeShift;
			if(Tipsstatus == 0){
				return false;
			}
			else{ 
				timeShiftStart(); 			 	
			}   	
		break;
		case 0: //Key Pause ;
			if (timeShiftStatus == 0) {
				timeShiftStart();
				return;
			}
			if (Tipsstatus == 0) {
				return;
			}
			if(KeyExitNum !=-1){
				if(KeyExitNum ==7){
					PlayTsFun();
				} else{
					window.clearTimeout(TimerHiddDiv);
					KeyExit(KeyExitNum); // Close Html;
					setTimeout("PlayTsFun();",	500);	
				}		 
			}else{
		 		PlayTsFun(); 
			} 			  
		break;
		case 415: //Key Play and Pause 
			if (Tipsstatus == 0) {
				return;
			}
			if(KeyExitNum !=-1){
				if(KeyExitNum ==7){
					PlayTsFun();
				} else{
					window.clearTimeout(TimerHiddDiv);
					KeyExit(KeyExitNum); // Close Html;
					setTimeout("PlayTsFun();",	500);	
				}		 
			}else{
		 		PlayTsFun(); 
			} 			  
		break; 
		case 413: //Key Sotp		
			KeyExit(KeyExitNum); // Close Html;
			if(timeShiftStatus ==1){ 
				TipsTxtFun(3);
				ShowTimeShiftFun(1); 
			} 
			else if(Record_retT != -1){//Tips :IPTV Will stop recording;
				var Record_AddT = Record_retT.split("?");    
				Record_retNumT = Record_AddT[0]; // First Record Channel Num; 
				if(ChannelNum == Record_retNumT){ 
					TipsTxtFun(0);		
				}
			}
			else if(Record_retS != -1){  //Tips :IPTV  Will stop recording;
				var Record_AddS = Record_retS.split("?"); 
				Record_retNumS = Record_AddS[0]; // Second Record Channel Num;
				if(ChannelNum == Record_retNumS){ 
					TipsTxtFun(0); 
				}
			}
			else if(Rec_DVBStatus ==1){ //Tips : DVB Will stop recording;;
				TipsTxtFun(0);
			}
			else if(Tipsstatus == 0){
				return false;
			}
		break;
		case 412: //Key Rew
			if(Tipsstatus == 0){
				return false;
			} else if (Ts_SeekStatus == 1) {
				return;
			}
			else{
		  		rewTimeShift();
			} 
		break;
		case 417: //Key Ffwd
			if(Tipsstatus == 0){
				return false;
			} else if (Ts_SeekStatus == 1) {
				return;
			}
			else{
		  		ffwdTimeShift(); 
			}
		break;
		case 1073742380:	//To the beginning of PLTV stream
		case 1073742389:	//To the end of PLTV stream
			PlayTsFun();
		break;
		case 1073742366:	//end record
			stopRecordStatus = false;
			break;
		default:
		  break;	
	}
	return;
}

/*********************************************************************/
/* Function: keyBack	                                             */
/* Description: keyBack按键处理函数                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
function keyBack() {
	if(timeShiftStatus == 1 && PlayTsstatus==0){
		return;
	} 
	else if(menuStatus == 0) {
		if(KeyExitNum != -1){ 
			KeyExit(KeyExitNum); // Close Html; 
			window.clearTimeout(MenuTimer);
			window.clearTimeout(TimerHiddDiv);	
			MenuTimer = setTimeout("moveMenu()",500);
			KeyExitNum = 0;
			TimerHiddFun(0);				
		}
		else{
			window.clearTimeout(MenuTimer);
			window.clearTimeout(TimerHiddDiv);	
			moveMenu();
			KeyExitNum = 0;
			TimerHiddFun(0);
		}				
	}
	return; 
}

/*********************************************************************/
/* Function: KeyExit	                                             */
/* Description: 关闭页面,隐藏DIV                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
var KeyExitNum = -1; // -1 is No Html, other is Html is opening...
function KeyExit(Num){  
	if(Num == 0){ 
		moveMenu(); 	 
	}
	else if(Num == 1){ // Close Channel List;
		document.getElementById("ListDiv").style.left = "-400px";
		window.clearTimeout(ListFontTimer);
		ListFontTimer = setTimeout("TimerListFont()", 100); 
		//TimerListFont();
		ShowListst = 0; // ChannelListDiv is Hidden; 
	}
	else if(Num == 2){ // Close  Tips Div
		//document.getElementById("TipsDiv").style.webkitTransform = "scale(0,1)"; 
		document.getElementById("TipsDiv").style.opacity = "0"; 
		document.getElementById("TipsDiv_bg").style.opacity = "0";   
		setTimeout("document.getElementById('Tipscancel').style.visibility = 'visible'",300);
		Tipsstatus = 1; 
		TipsFocus = 0; 
	}
	else if(Num == 3){ // Close Vol;
		//document.getElementById("volumeDiv").style.webkitTransform = "scale(0.4)"; 
		document.getElementById("volumeDiv").style.opacity = "0";	
		var VolMutest = player.Ag_audio_getMute();//Get Mute ,0 is mute off, 1 is mute on;
		if(VolMutest){
			document.getElementById("MuteDiv").style.visibility = "visible";
			MuteIcost = 1;
		}
		else{
			document.getElementById("MuteDiv").style.visibility = "hidden";
			MuteIcost = 0;
		} 
	}
	else if(Num == 4){ // Close Channel Number;
		document.getElementById("ChannelNumDiv").style.visibility = "hidden";  
	}
	else if(Num == 5){ // Close Audio;
		document.getElementById("AudioDiv").style.visibility = "hidden"; 
	}  
	else if(Num == 6){ // Close Record Ico;	
		document.getElementById("RecordDiv").style.visibility = "hidden";
		RecIcoStatus = 0; 
	}  
	else if(Num == 7){ // Close TimeShift; 
		document.getElementById("TimeShiftDiv_H").style.top = "720px"; 
		//document.getElementById("TsPlDiv").style.top = "-276px";
		document.getElementById("TsPlDiv").style.opacity = "0";
		window.clearTimeout(TimerTsFun); 
	}  
	else if(Num == 8){// Close seekDiv
		document.getElementById("Ts_SeekDiv").style.width = "0px"; 
		Ts_SeekStatus = 0;  
	} 
	else if(Num == 9){ // Close Channel Infor;
		if (pipStatus == 1) {
			pipTop = pipPos[1];
			pipLeft = pipPos[0];
			pipSetWindowFun(pipLeft,pipTop,pipWidth,pipHeight); // Set pip Window;
			document.getElementById("pipDivTxt").style.top = pipTop + "px";
			document.getElementById("pipDivTxt").style.left = pipLeft + "px";
		}
		document.getElementById("ChannelInforDiv").style.top = "720px";
		ShowListst = 0; 
		ChannelNum = playNow;
		//pipCloseFun();
	} 
	else if(Num == 10){// Close seekDiv
		if(PlayTsstatus == 1){
			document.getElementById("Ts_SeekDiv").style.width = "0px"; 
			document.getElementById("TimeShiftDiv_H").style.top = "720px";
			window.clearTimeout(TimerTsFun); 
			Ts_SeekStatus = 0;  
		}
	}
	else if(Num == 11){ // Close PIP;
		pipCloseFun();
	} 
	window.clearTimeout(TimerHiddDiv);
	KeyExitNum = -1;
	return; 
} 
/*********************************************************************/
/* Function: TimerHiddFun	                                         */
/* Description: TimerHiddFun,隐藏DIV                    	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
var TimerHiddDiv;
function TimerHiddFun(KeyExitNum){	 
	if(KeyExitNum == 3){// Vol Hidden;
			window.clearTimeout(TimerHiddDiv);
			TimerHiddDiv = window.setTimeout("KeyExit(3);", 3000); 	
			return;
	}
	else if(KeyExitNum == 4){ // Channel Number Hidden;
			window.clearTimeout(TimerHiddDiv);
			TimerHiddDiv = window.setTimeout("document.getElementById('ChannelNumDiv').style.visibility = 'hidden'", 3000); 	
			return;
	}
	else if(KeyExitNum == 5){ // Audio Hidden;
			window.clearTimeout(TimerHiddDiv);
			TimerHiddDiv = window.setTimeout("KeyExit(5);", 3000); 	
			return;
	}  
	else if(KeyExitNum == 7){ // TimeShift Hidden;
		if(PlayTsstatus == 1){
			window.clearTimeout(TimerHiddDiv);
			TimerHiddDiv = window.setTimeout("KeyExit(7);", 3000);
			return; 	
		}
	}  
	else if(KeyExitNum == 9){ // Channel Infor Hidden;
			window.clearTimeout(TimerHiddDiv);
			TimerHiddDiv = window.setTimeout("KeyExit(9);", 10000); 	
			return;
	}
	else if(KeyExitNum == 10){
			window.clearTimeout(TimerHiddDiv);
			TimerHiddDiv = window.setTimeout("KeyExit(10);", 10000); 	
			return;
	}  
	return; 
}

/*********************************************************************/
/* Function: keyEnter                                                */
/* Description: keyEnter按键处理函数                    	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
function keyEnter() {
	//if(ShowListst==2 && menuStatus==0){
	if(ShowListst==2){
		if(timeShiftStatus == 1){//Tips : TimeShift...Don't Channel; 
			ShowTimeShiftFun(1);  
			TipsTxtFuntt(5);
			return;
		}else{
			ShowRecIcoFun(0);  // Record Ico Show;
			//StopChannel();// Stop current paly Channel;
			playChannel(ChannelNum); 
			KeyExit(1); // Channel is Hidden;	
			//showChannelInfo(); 
		}
	} 
	else if(ShowListst==1){
		if (pipStatus == 1) {
			pipCloseFun();
		}
		ShowRecIcoFun(0); // Record Ico Show;
		StopChannel();// Stop current paly Channel;
		playChannel(ChannelNum); 
		KeyExit(9); // Channel is Hidden;
		//showChannelInfo(); 
	}
	else if(TipsFocus ==0 && Tipsstatus ==0){
		KeyExit(2); // Tips is Hidden;
		setTimeout("KeyStop()",500);
	}
	else if(Ts_SeekStatus ==1 && Tipsstatus ==1){
		GetSeekTimeFun();
		PlayTsSeekFun(SeekTime);
	} 
	else if(TipsFocus ==1 || TipsFocus ==2){
		if (tips_status == 1 || tips_status == 2) {
			TipsTxtSt = -1;
			tips_status = 0;
		}
		ChannelNum = saveChannelNum;
		if(timeShiftStatus==1 && Tipsstatus == 0){
			KeyExit(2);	 // Tips is Hidden;			
			ShowTimeShiftFun(0); 
		}else{
			KeyExit(2);// Tips is Hidden;
		}
	} 
	else if(menuStatus==1){
		if (pipStatus == 1) {
			pipCloseFun();
		} else {
			timeShiftEnd();
		}
		if(focusNum ==0){
			KeyExit(0); // Menu is Hidden;
			window.setTimeout("showChannelInfo();",400);
		} else if (focusNum == 2) {
			moveMenu();
			window.setTimeout("url_pvr();",600);
		} else{
			keymenuEnter();
			//KeyExit(0); // Menu is Hidden;
			if (focusNum != 2) {
				StopChannel();// Stop current paly Channel;
			}
		}
		return (false);
	} 
	else if(pipStatus == 1){ // Play PIP ;
		pipCloseFun();// Close PIP;
		ChannelNum = pipPlayNow;
		//showChannelInfo();
		playChannel(pipPlayNow);
		ShowRecIcoFun(0);
	}
	else{
		return false;
	}
	return; 
}
function url_pvr() {
	document.location.href = 'pvr.html?'+playNow;
	return;
}

/*********************************************************************/
/* Function: keyUp		                                             */
/* Description: keyUp按键处理函数                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
var pipPlayTimer;
var saveChannelNum;
function keyUp() { 	
	if(ShowListst==1){  //Channel Infor
		document.getElementById("channelNum"+ChannelNum%10).style.color = "#646464";	
		document.getElementById("Channel_A"+ChannelNum%10).style.color = "#646464";	
		ChannelNum--; 
		if(ChannelNum < 0){
			ChannelNum = ChannelTotal-1;
		}
		//if(playNow != ChannelNum){		
			//pipPlayFun(PipType,ChannelNum);
		//}
/*		else if(playNow == ChannelNum){		
			pipCloseFun();
		} */
		document.getElementById("channelNum"+ChannelNum%10).style.color = "#646464";	
		document.getElementById("Channel_A"+ChannelNum%10).style.color = "#646464";	
		showChannelInfo();
		pipPlayFun(PipType,ChannelNum);
		return;
	} 
	else if(ShowListst==2){ // Channel List 
		if(ChannelNum<=0){ 	
			return;
		}
		if(ChannelNum==1){
			document.getElementById("barDivUp").style.borderBottomColor = "#646464";	 
		}else{
			document.getElementById("barDivDown").style.borderTopColor = "#f0f0f0";	 
		}		
		window.clearTimeout(ListFontTimeer);	
		document.getElementById("channelNum"+ChannelNum%10).style.color = "#646464";	
		document.getElementById("Channel_A"+ChannelNum%10).style.color = "#646464";	
		ChannelNum--;
		if(ChannelNum%10 ==9){
			showChannelList();
		} 	 	
		ListFocusFun();  
		ListFontTimeer = setTimeout("ListFontFun()",300);		
	} 
	else if(pipStatus == 1){
		pipPlayNow--; 
		if(pipPlayNow < 0){
			pipPlayNow = ChannelTotal-1;
		} 
		pipPlayFun(PipType,pipPlayNow);
	} 
	return;
}

/*********************************************************************/
/* Function: keyDown                                                 */
/* Description: keyDown按键处理函数                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
function keyDown() {  
	if(ShowListst==1){ //Channel Infor
		document.getElementById("channelNum"+ChannelNum%10).style.color = "#646464";	
		document.getElementById("Channel_A"+ChannelNum%10).style.color = "#646464";	
		ChannelNum++; 
		if(ChannelNum > ChannelTotal-1){
			ChannelNum = 0;
		}
		//if(playNow != ChannelNum){		
			//pipPlayFun(PipType,ChannelNum);
		//}
		/*else if(playNow == ChannelNum){		
			pipCloseFun();
		}*/ 
		document.getElementById("channelNum"+ChannelNum%10).style.color = "#646464";	
		document.getElementById("Channel_A"+ChannelNum%10).style.color = "#646464";	
		showChannelInfo(); 
		pipPlayFun(PipType,ChannelNum); 
		return;
	}
	else if(ShowListst == 2){ // Channel List
		if(ChannelNum >= ChannelTotal-1){ 
			return;
		}
		if(ChannelNum == ChannelTotal-2){
			document.getElementById("barDivDown").style.borderTopColor = "#646464";	 
		}else{
			document.getElementById("barDivUp").style.borderBottomColor = "#f0f0f0";	 
		}
		window.clearTimeout(ListFontTimeer);	
		document.getElementById("channelNum"+ChannelNum%10).style.color = "#646464";		 		 
		document.getElementById("Channel_A"+ChannelNum%10).style.color = "#646464";		 		 
		ChannelNum++; 
		if(ChannelNum%10 ==0){
			showChannelList();
		} 
		ListFocusFun(); 
		ListFontTimeer = setTimeout("ListFontFun()",300)		 
	}
	else if(pipStatus == 1){
		pipPlayNow++; 
		if(pipPlayNow > ChannelTotal-1){
			pipPlayNow = 0;
		} 
		pipPlayFun(PipType,pipPlayNow);
		
	} 
	return;
}

/*********************************************************************/
/* Function: keyLeft                                                 */
/* Description: keyLeft按键处理函数                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
function keyLeft() {  
	if(TipsFocus==2){
	  return;
	}
	else if(Tipsstatus==0 && TipsFocus ==1){
		document.getElementById("Tipscancel").style.background = "-webkit-gradient(linear, left top, left bottom, from(#2E2E2E), to(#181818))";		
		document.getElementById("Tipscancel").style.borderColor = "#646464";
		document.getElementById("Tipsserver").style.background = "-webkit-gradient(linear, left top, left bottom, from(#011f55), to(#034eb3))";
		document.getElementById("Tipsserver").style.borderColor = "#1181FF"; 
		TipsFocus = 0; 
	} 
	else if (Ts_SeekStatus == 1) {
		seekLeft();
	}
	return;
}

/*********************************************************************/
/* Function: keyRight                                                */
/* Description: keyRight按键处理函数                    	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
function keyRight() { 
	if(TipsFocus==2){
	  return;
	}   
	else if(Tipsstatus==0 && TipsFocus ==0){
		document.getElementById("Tipsserver").style.background = "-webkit-gradient(linear, left top, left bottom, from(#2E2E2E), to(#181818))";
		document.getElementById("Tipsserver").style.borderColor = "#646464";
		document.getElementById("Tipscancel").style.background = "-webkit-gradient(linear, left top, left bottom, from(#011f55), to(#034eb3))";
		document.getElementById("Tipscancel").style.borderColor = "#1181FF";
		TipsFocus = 1;
		KeyExitNum =2;
	}
	else if (Ts_SeekStatus == 1) {
		seekRight();
	}
	return;
}

/*********************************************************************/
/* Function: keyChannelUp                                            */
/* Description: channel+		                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
function keyChannelUp() {
	KeyExit(KeyExitNum);
		player.printf(1, "KeyExitNum=========================="+KeyExitNum);
	KeyExit(4);
	if(menuStatus==1){
		KeyExit(0);
	} 
	else if(Tipsstatus==0){
		return;	
	} 
	else if(timeShiftStatus == 1){//Tips : TimeShift...Don't Channel; 
		if(Ts_SeekStatus == 1){
			KeyExit(8);
		}  
		saveChannelNum = ChannelNum;
		ChannelNum++;
		ShowTimeShiftFun(1); 
		TipsTxtFun(5);
 		TipsTxtSt = 2;
	} 
	else{
		ChannelNum++;
		ChannelSwitch(); 
	}
	return; 
}

/*********************************************************************/
/* Function: keyChannelDown                                          */
/* Description: channel-		                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
function keyChannelDown() {
	KeyExit(KeyExitNum);
	KeyExit(4);
	if(menuStatus==1){
		KeyExit(0);
	}
	else if(Tipsstatus==0){
		return;	
	} 
	else if(timeShiftStatus == 1){//Tips : TimeShift...Don't Channel; 
		if(Ts_SeekStatus == 1){
			KeyExit(8);
		}
		saveChannelNum = ChannelNum;
		ChannelNum--; 
		ShowTimeShiftFun(1);  
		TipsTxtFun(5);
 		TipsTxtSt = 2;
		return;
	} 
	else{
		ChannelNum--; 
		ChannelSwitch(); 
	}
	return; 
}

/*********************************************************************/
/* Function: keyVolUp		                                         */
/* Description: 音量加操作		                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
function keyVolUp() {	
	var VolMutest = player.Ag_audio_getMute();//Get Mute ,0 is mute off, 1 is mute on;  
	if(VolMutest){ 
		player.Ag_audio_setMute(0);
		document.getElementById("volumeFlag").style.backgroundImage = 'url(image/vol0.png)';  
		document.getElementById("volumeBar").style.background = "-webkit-gradient(linear, left top, left bottom, from(#a5fd77), to(#40aa22))";
		document.getElementById("MuteDiv").style.visibility = "hidden";
	}  
	volume = player.Ag_audio_getVolume(); 
	volume = volume+5;	
	if(KeyExitNum != -1){				
		if(ShowListst==2){
			if(volume>100){
				volume = 100;	 
			}	
			else if(volume<0){
				volume = 0;	 
			}
			player.Ag_audio_setVolume(volume);
			KeyExitNum = 1; 
		}
		else if(KeyExitNum == 3){
			window.clearTimeout(volumeHidden);
			volumeControl();
		}
		else{
			KeyExit(KeyExitNum); // Close Html;
			volumeHidden = setTimeout("volumeControl()",500);	
		}			
	}else{
		window.clearTimeout(volumeHidden);
		volumeControl();
	}
	return; 
}

/*********************************************************************/
/* Function: keyVolDown		                                         */
/* Description: 音量减操作		                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
function keyVolDown() {  
	var VolMutest = player.Ag_audio_getMute();//Get Mute ,0 is mute off, 1 is mute on;  
	if(VolMutest){ 
		player.Ag_audio_setMute(0);   
		document.getElementById("volumeFlag").style.backgroundImage = 'url(image/vol0.png)';  
		document.getElementById("volumeBar").style.background = "-webkit-gradient(linear, left top, left bottom, from(#a5fd77), to(#40aa22))";
		document.getElementById("MuteDiv").style.visibility = "hidden";
	}  
	volume = player.Ag_audio_getVolume(); 
	volume = volume-5; 
	if(KeyExitNum != -1){				
		if(ShowListst==2){
			if(volume>100){
				volume = 100;	 
			}	
			else if(volume<0){
				volume = 0;	 
			}
			player.Ag_audio_setVolume(volume);
			KeyExitNum = 1; 
		}
		else if(KeyExitNum == 3){
			window.clearTimeout(volumeHidden);
			volumeControl();
		}
		else{
			KeyExit(KeyExitNum); // Close Html;
			volumeHidden = setTimeout("volumeControl()",500);	
		}			
	}else{
		window.clearTimeout(volumeHidden);
		volumeControl();
	}
	return; 
}

/*********************************************************************/
/* Function: keyPageUp		                                         */
/* Description: 上翻页处理		                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
function keyPageUp() {
	if (ShowListst == 2) {
		document.getElementById("channelNum"+ChannelNum%10).style.color = "#646464";		
		document.getElementById("Channel_A"+ChannelNum%10).style.color = "#646464";		
		ChannelNum -= 10;
		if (ChannelNum < 0) {
			ChannelNum = 0; 
			document.getElementById("barDivUp").style.borderBottomColor = "#646464";
			document.getElementById("barDivDown").style.borderTopColor = "#f0f0f0";		
		} else {
			document.getElementById("barDivUp").style.borderBottomColor = "#f0f0f0";	
		}
		if(ChannelNum==0){
			document.getElementById("barDivUp").style.borderBottomColor = "#646464";	 
		}else{
			document.getElementById("barDivDown").style.borderTopColor = "#f0f0f0";	 
		}
		showChannelList();
		window.clearTimeout(ListFontTimeer);		
		ListFocusFun();
		ListFontTimeer = setTimeout("ListFontFun()",300); 
	}
	return; 
}

/*********************************************************************/
/* Function: keyPageDown	                                         */
/* Description: 下翻页处理		                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
function keyPageDown() {
	if (ShowListst == 2) {
		document.getElementById("channelNum"+ChannelNum%10).style.color = "#646464";			
		document.getElementById("Channel_A"+ChannelNum%10).style.color = "#646464";			
		ChannelNum += 10;
		if (ChannelNum > ChannelTotal-1) {
			ChannelNum = ChannelTotal-1; 
			document.getElementById("barDivDown").style.borderTopColor = "#646464";
			document.getElementById("barDivUp").style.borderBottomColor = "#f0f0f0";	 
		} else {
			document.getElementById("barDivDown").style.borderTopColor = "#f0f0f0";				
		}		
		if(ChannelNum == ChannelTotal-1){
			document.getElementById("barDivDown").style.borderTopColor = "#646464";	 
		}else{
			document.getElementById("barDivUp").style.borderBottomColor = "#f0f0f0";	 
		}
		showChannelList();
		window.clearTimeout(ListFontTimeer);		
		ListFocusFun();
		ListFontTimeer = setTimeout("ListFontFun()",300); 
	}
	return; 
}

/*********************************************************************/
/* Function: keyRed			                                         */
/* Description: keyRed按键处理函数                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
function keyRed() {	
	if(menuStatus==1){
		KeyExit(0);
	} 
	if(timeShiftStatus == 1){//Tips :TimeShift ,Don't Record.	
		//document.getElementById("TsPlDiv").style.top = "-267px"; 
		document.getElementById("TsPlDiv").style.opacity = "0";
		TipsTxtSt = 1;
		tips_status = 2;
		TipsTxtFun(2);
		return;
	}
	else{
		KeyExit(KeyExitNum);			
		if(playNow <=IPTVTotal ){//Record IPTV;		
			if(recordStatus==0 ){
				document.getElementById("RecordDiv").style.visibility = "visible";
				RecIcoStatus = 1; 
				recordChannel(0);// Record Channel;
				Record_retTT = Record_ret;
				Record_retT = playNow + "?" + Record_retTT; 
				setCookies("recordCookie1",Record_retT,10000);
				recordStatus =1;   	 
				setCookies('rec_status',recordStatus,10000);
			}
			else if(recordStatus == 1){ // The First Recording.  
				if(Record_retT != -1){
					var Record_AddT = Record_retT.split("?");
					Record_retNumT = Record_AddT[0]; //First Record Channel Num;
					if(playNow == Record_retNumT){					
						TipsTxtFun(0);  
					}
					else {		 
						if(Record_retS != -1){
							var Record_AddS = Record_retS.split("?");   
							Record_retNumS = Record_AddS[0]; // Second Record Channel Num;
							if(playNow == Record_retNumS){ 
								TipsTxtFun(0);
							} 
						} 
						else{
							document.getElementById("RecordDiv").style.visibility = "visible";
							RecIcoStatus = 1; 
							recordChannel(0);// Record Channel;
							Record_retSS = Record_ret;
							Record_retS = playNow + "?" + Record_retSS; 
							setCookies("recordCookie2",Record_retS,10000);
							recordStatus =2; 
							setCookies('rec_status',recordStatus,10000);
						}
					}  
				}
				else{	 
					if(Record_retS != -1){
						var Record_AddS = Record_retS.split("?");   
						Record_retNumS = Record_AddS[0]; // Second Record Channel Num;
						if(playNow == Record_retNumS){ 
							TipsTxtFun(0);
						}
						else{
							document.getElementById("RecordDiv").style.visibility = "visible";
							RecIcoStatus = 1; 
							recordChannel(0);// Record Channel;
							Record_retTT = Record_ret;
							Record_retT = playNow + "?" + Record_retTT; 
							setCookies("recordCookie1",Record_retT,10000);
							recordStatus = 2; 
							setCookies('rec_status',recordStatus,10000);
						} 
					} 
				} 
			}
			else if(recordStatus == 2){// The Seconde Recording.
				if(Record_retT != -1){
					var Record_AddT = Record_retT.split("?");   
					Record_retNumT = Record_AddT[0]; // Second Record Channel Num;
					if(ChannelNum == Record_retNumT){ 
						TipsTxtFun(0);
					}  
					else if(Record_retS != -1){
						var Record_AddS = Record_retS.split("?");   
						Record_retNumS = Record_AddS[0]; // Second Record Channel Num;
						if(ChannelNum == Record_retNumS){ 
							TipsTxtFun(0);
						} 
						else{ //Record Full.				 
							TipsTxtFuntt(4); 		
						}
					}
					else{ //Record Full.				 
						TipsTxtFuntt(4); 		
					}
				} 
				else if(Record_retS != -1){
					var Record_AddS = Record_retS.split("?");   
					Record_retNumS = Record_AddS[0]; // Second Record Channel Num;
					if(ChannelNum == Record_retNumS){ 
						TipsTxtFun(0);
					}
					else if(Record_retT != -1){
						var Record_AddT = Record_retT.split("?");   
						Record_retNumT = Record_AddT[0]; // Second Record Channel Num;
						if(ChannelNum == Record_retNumT){ 
							TipsTxtFun(0);
						}
					}
					else{ //Record Full.				 
						TipsTxtFuntt(4); 		
					}
				}  
			} 
		}
		else{// Record DVB;
			if(Rec_DVBStatus==0 ){ 		
				document.getElementById("RecordDiv").style.visibility = "visible"; 
				RecIcoStatus = 1;
				recordChannel(1);// Record Channel;
				Rec_DVBretT = ChannelNum + "?" + Rec_DVBret; 
				Rec_DVBStatus =1;   	 
			}
			else if(Rec_DVBStatus == 1){ // The First Recording.  
				if(Rec_DVBretT != -1){
					var Rec_DVBAddT = Rec_DVBretT.split("?");
					Rec_DVBNumT = Rec_DVBAddT[0]; // Record Channel Num;
					if(ChannelNum == Rec_DVBNumT){					
						TipsTxtFun(0);  
					}
					else {						
						TipsTxtFuntt(4);  
					}  
				}  
			}
		} 
	}
	return; 
}

/*********************************************************************/
/* Function: keyGreen		                                         */
/* Description: keyGreen按键处理函数                     	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
var pipStatus  = 0; // 0 is  pipDiv Hidden, 1 is pipDiv Display;
var TimerPip;
function keyGreen() {  // Pip Show;
	if(timeShiftStatus==1 || Tipsstatus == 0){ // TimeShifting... Don't PIP;
		return;
	}
/*	if(ShowListst == 1){
		KeyExit(9);
	}*/
	if(pipStatus == 0){ // Open PIP
		if (ShowListst == 1) {
			pipTop = pipPos[4];
			pipLeft = pipPos[5];
		} else {
			pipTop = pipPos[1];
			pipLeft = pipPos[0];
		}
		pipSetWindowFun(pipLeft,pipTop,pipWidth,pipHeight); // Set pip Window;
		document.getElementById("pipDivTxt").style.top = pipTop + "px";
		document.getElementById("pipDivTxt").style.left = pipLeft + "px";
		if(KeyExitNum !=-1 && ShowListst != 1){ 
			KeyExit(KeyExitNum); // Close Html;
			TimerPip = setTimeout("pipPlayFun(PipType,playNow)",800);	 	 
		} 
		else{
			window.clearTimeout(TimerPip); 
			pipPlayFun(PipType,playNow); 	 
		}	
		pipStatus = 1;
		//KeyExitNum = 11;
	}else{ // Close PIP
		pipCloseFun();
	}
	return; 
}


/*********************************************************************/
/* Function: keyAudio		                                         */
/* Description: 切换声道			                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
function keyAudio() {
	KeyExit(KeyExitNum);
	if(menuStatus==1){
		KeyExit(0);
	} 
	var AudioType = player.Ag_audio_getStereo();
	AudioType++;
	if(AudioType >= 3){
		AudioType = 0;
	}
	player.Ag_audio_setStereo(AudioType);
	document.getElementById("AudioDiv").style.visibility = "visible";
	document.getElementById("AudioDiv_Txt").innerHTML = "";
	if(AudioType==0){
		var volumeTxt = "Stereo"
	}
	if(AudioType==1){
		var volumeTxt = "Left"
	}
	if(AudioType==2){
		var volumeTxt = "Right"
	}
	document.getElementById("AudioDiv_Txt").innerHTML = volumeTxt;
	KeyExitNum = 5; 
	TimerHiddFun(KeyExitNum); 
	return; 
} 

/*********************************************************************/
/* Function: keySubtitle	                                         */
/* Description: 切换音轨			                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
var Audiototal; // Total; 
var AudioTrack; // Track;
var AudioLanguage; //Language;
var AudioNum = 0;
function keySubtitle() {
	KeyExit(KeyExitNum); 
	if(menuStatus==1){
		KeyExit(0);
	} 
	Audiototal = player.Ag_audio_getNoOfTrack();
	if (Audiototal <= 0) {
		document.getElementById("AudioDiv").style.visibility = "visible";
		document.getElementById("AudioDiv_Txt").innerHTML = "No";
	} else {
		AudioNum = player.Ag_audio_getTrack(); //得到当前audio的index
		AudioNum++;
		if(AudioNum >= Audiototal){
			AudioNum = 0;
		}
		AudioTrack = player.Ag_audio_getPIDByIndex(AudioNum);
		AudioLanguage = player.Ag_audio_getLanguageByIndex(AudioNum); 
		player.Ag_audio_setPID(AudioTrack);
		document.getElementById("AudioDiv").style.visibility = "visible";
		document.getElementById("AudioDiv_Txt").innerHTML =  AudioLanguage;
	}
	//document.getElementById("AudioDiv_Txt").innerHTML =  AudioLanguage.toUpperCase();
	KeyExitNum = 5;
	TimerHiddFun(KeyExitNum);
	return; 
}

/*********************************************************************/
/* Function: keyMute		                                         */
/* Description: 静音设置			                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
function keyMute() { 
	var VolMutest = player.Ag_audio_getMute();//Get Mute ,0 is mute off, 1 is mute on;		
	if(VolMutest){
		player.Ag_audio_setMute(0);   
		document.getElementById("volumeFlag").style.backgroundImage = 'url(image/vol0.png)';  
		document.getElementById("volumeBar").style.background = "-webkit-gradient(linear, left top, left bottom, from(#a5fd77), to(#40aa22))";
	}
	else{
		player.Ag_audio_setMute(1);  
		document.getElementById("volumeFlag").style.backgroundImage = 'url(image/vol.png)'; 
		document.getElementById("volumeBar").style.background = "-webkit-gradient(linear, left top, left bottom, from(#c4c4c4), to(#585858))";
	} 
	document.getElementById("MuteDiv").style.visibility = "hidden";
	MuteIcost = 0;
	volume = player.Ag_audio_getVolume();		
	if(KeyExitNum != -1){
		if(KeyExitNum == 3){
			volumeControl();
		}
		else if(ShowListst == 2){
			showMuteStatus();
			return;
		}
		else{
			window.clearTimeout(TimerHiddDiv);
			KeyExit(KeyExitNum); // Close Html;
			volumeHidden = setTimeout("volumeControl()",500);	
		}				
	}else{
		window.clearTimeout(TimerHiddDiv);
		volumeControl();
	} 
	return; 
}
 
/*********************************************************************/
/* Function: KeyStop	                                             */
/* Description: KeyStop按键处理函数                     	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
function KeyStop() {
	if (timeShiftStatus == 1) { //Stop TimeShift;
		if(TipsTxtSt==1){ // Stop Timeshift , Recording start;
			KeyExit(7);   
			setTimeout("timeShiftEnd()",600);
			setTimeout("keyRed()",800); 
		}
		else if(TipsTxtSt == 2){
			KeyExit(7);  
			setTimeout("timeShiftEnd()",600);   
			setTimeout("ChannelSwitch()",500);  
		}
		else{
			KeyExit(7); 
			setTimeout("timeShiftEnd()",600);
		}		
	}
	else if(recordStatus == 1 || recordStatus == 2){
		if(TipsTxtSt==0){  // Stop Recording , Timeshift start;
			//setTimeout("StopRecord()",600);
			StopRecord();
			KeyExit(6); 
			//timeShiftStart(); 
			setTimeout("timeShiftStart()",800); 
		}
		else{
			KeyExit(6);
			StopRecord();
			//setTimeout("StopRecord()",600);
		}			
	} 
	KeyExit(KeyExitNum);
	TipsTxtSt = -1;
	return; 
}
/*********************************************************************/
/* Function: showPageFull                                            */
/* Description: 主菜单自动隐藏时，显示页面	                             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-02-11                              */
/*********************************************************************/
function showPageFull() {
	KeyExitNum = -1;
	return;
}

////////////////////////////////////////////////按键处理部分结束///////////////////////////////////////////////////

/*********************************************************************/
/* Function: init			                                         */
/* Description: 初始化函数		                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
var player = new AVPlayer();
var IPTVTotal; // IPTV total;
var DVBTotal;// DVB Total
var ChannelTotal; // IPTV + DVB Channel Total; 
var ChannelDVBName;
var ChannelDVBNumArr = new Array();
var ChannelDVBNum; //DVB logical Channel  Number;
var ChannelNum = 0;// channel number;    
var menufocus = 0; // Menu Focus;
var menuLiLeft; // menuFocusDiv Left;
var Tipsstatus = 1; // 0 is TipsDiv display , 1 is TipsDiv hidden;
var TipsFocus; // 0 is TipsFocus left ,1 is TipsFocus right;
var ListFontTimeer; 
var ChannelListTimer; 
var ListFontTimer;
var MenuTimer;
var MuteIcost = 0; // Mute Ico Status, 0 is Hidden , 1 is Display; 
var rec_info_img0 = new Image();
var rec_info_img1 = new Image();
function init() {
	focusNum= 0;
	var leftPxSettings = "-311, -92, 127, 346, 565, 784, 1003, 1222, 1441";
	divLeftArray = focusNum+"?"+leftPxSettings;
	htmlHref = fontListArray[0] + "?" + divLeftArray;  	 
	menuinit(); 
	GetChannelFun();  
	//var VolMutest = player.Ag_audio_getMute();//Get Mute ,0 is mute off, 1 is mute on; 
	var returnHref = document.location.href.split("?");
	if (returnHref.length == 2) {
		if (returnHref[1] >= 0) {
			playNow = returnHref[1];
			ChannelNum = playNow;
			document.getElementById("ChannelNumDiv").innerHTML = parseInt(ChannelNum)+1; //Channel Number;
			window.clearTimeout(timer_hiddChannel);
			timer_hiddChannel = window.setTimeout("hiddKeyChannelNum();", 3000);
		} else {
			playChannel(0); // Play Channel; 
		}
		Record_retT = getCookie('recordCookie1');
		Record_retS = getCookie('recordCookie2');
		recordStatus = getCookie('rec_status');
	} else {
		playChannel(0); // Play Channel; 
		//player.Ag_audio_setVolume(45); // set Volume for 45; 
		window.setTimeout("moveMenu();",200);
		KeyExitNum = 0; 
		setCookies("recordCookie1",Record_retT,10000);
		setCookies("recordCookie2",Record_retS,10000);
		setCookies('rec_status',recordStatus,10000);
	}
	rec_info_img0.src = "image/info_rec_on.png";
	rec_info_img1.src = "image/info_rec_off.png";
	ShowRecIcoFun(0);
	showMuteStatus();
}

function showMuteStatus() {
	var VolMutest = player.Ag_audio_getMute();//Get Mute ,0 is mute off, 1 is mute on;
	if(VolMutest){
		document.getElementById("MuteDiv").style.visibility = "visible";
		MuteIcost = 1;
	}
}

/*********************************************************************/
/* Function: DVBsanFun   	                                         */
/* Description: DVB san 		                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
function GetChannelFun(){
	ChannelTotal = ChannelName.length;
	DVBTotal = 0;//player.Ag_dvb_getTotalNumbers();//DVB Total;
	IPTVTotal = ChannelTotal - DVBTotal; //IPTVTotal;
	for(var i = 1; i < ChannelTotal; i++){
		ChannelDVBName = "DVBChannelName";//player.Ag_dvb_getChannelName(i,1);
		ChannelDVBInfor = "The DVB Channel Number , than ...";
		ChannelName[ChannelTotal] = ChannelDVBName+i; 
		ChannelInfor[ChannelInfor.length] = ChannelDVBInfor+i;		
	}
	for(var i = 0;i<DVBTotal-1; i++){
		ChannelDVBNumArr[ChannelDVBNum.length] = player.Ag_dvb_getLogicalChannelNumberByIndex(i); // Get the logical channel number;
	}
} 

/*********************************************************************/
/* Function: GetTimeFun   	                                         */
/* Description: Get Local Time                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
function GetTimeFun(){
	var LocalTime = player.Ag_time_getLocalTime();// "20080430T112600".
	var TimeArr = LocalTime.split("T");
	var TimeMonth = TimeArr[0].substring(4,6); //month
	var TimeDay = TimeArr[0].substring(6,8); //day
	var TimeHour = TimeArr[1].substring(0,2); //hour
	var TimeMinute = TimeArr[1].substring(2,4);	//minute
	document.getElementById("Tips_Time").innerHTML = TimeHour + ":" + TimeMinute; //  Time;
	document.getElementById("Tips_Date").innerHTML = TimeMonth + "/" + TimeDay; // Date;
} 

/*********************************************************************/
/* Function: playChannel	                                         */
/* Description: 播放选中频道		                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
var playNow;
function playChannel(ChannelNum) { // Play IPTV Channel;
	if(ChannelNum <= IPTVTotal){
		var ret = player.Ag_multicast_play(ChannelAdd[ChannelNum]);
		//player.printf(1, "play iptv status=========================="+ret);
	}
	else{// play  DVB Channel;
		var DVBNum = (ChannelNum - IPTVTotal)-1;
		ChannelDVBNum = ChannelDVBNumArr[DVBNum];
		player.Ag_dvb_play(ChannelDVBNum); 
	}
	playNow = ChannelNum;
	document.getElementById("ChannelNumDiv").innerHTML = ChannelNum+1;
	document.getElementById("ChannelNumDiv").style.visibility = "visible";
	window.clearTimeout(timer_hiddChannel);
	timer_hiddChannel = window.setTimeout("hiddKeyChannelNum();", 3000);
	return; 
}
function StopChannel(){
	if(ChannelNum <= IPTVTotal){ // Stop IPTV Channel;
		player.Ag_multicast_stop();
	}
	else{ // Stop DVB Channel;
		player.Ag_dvb_stopPlay();
	}
	return;
}
/*********************************************************************/
/* Function: ChannelSwitch	                                         */
/* Description: 频道切换函数		                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
function ChannelSwitch() {
	if(ChannelNum < 0){
		ChannelNum = (ChannelTotal-1);
	}  	
	else if(ChannelNum > ChannelTotal-1){
		ChannelNum = 0;
	}
	ShowRecIcoFun(0);
	StopChannel();
	playChannel(ChannelNum); 
	//showChannelInfo();
	return; 
}

/*********************************************************************/
/* Function: getChannelList	                                         */
/* Description: 获得频道列表		                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
function getChannelList() {
	for(var i =0; i<ChannelTotal; i++){ 
		channelName[i] = ChannelArr[0];
		channelAdd[i] = ChannelArr[1];
		channelInfo[i] = ChannelArr[2];		
	}
	return; 
}			
/*********************************************************************/
/* Function: ShowRecIcoFun	                                         */
/* Description: Show Record Ico                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
function ShowRecIcoFun(Num){
	if(Num==0){	
		if(Rec_DVBStatus ==1){
			if(	Rec_DVBretT != -1){ //The First recording.
				var ChannelDVBRecT = Rec_DVBretT.split("?");
				Rec_DVBNumT = ChannelDVBRecT[0];
				if(ChannelNum == Rec_DVBNumT){
					document.getElementById("RecordDiv").style.visibility = "visible";
					RecIcoStatus = 1; 
				}
				else{
					document.getElementById("RecordDiv").style.visibility = "hidden"; 
					RecIcoStatus = 0; 
				} 
			} 
		} 
		else if(recordStatus == 2 || recordStatus == 1){		
			if(	Record_retT != -1){ //The First recording.
				var ChannelRecT = Record_retT.split("?");
				Record_retNumT = ChannelRecT[0];
				if(ChannelNum == Record_retNumT){
					document.getElementById("RecordDiv").style.visibility = "visible";
					RecIcoStatus = 1; 
				}
				else{
					if(Record_retS != -1){ // The Second recording. 
						var ChannelRecS = Record_retS.split("?");
						Record_retNumS = ChannelRecS[0];
						if(ChannelNum == Record_retNumS){
							document.getElementById("RecordDiv").style.visibility = "visible";
							RecIcoStatus = 1;
						}
						else{
							document.getElementById("RecordDiv").style.visibility = "hidden"; 
							RecIcoStatus = 0; 
						}  	
					}
					else{
						document.getElementById("RecordDiv").style.visibility = "hidden"; 
						RecIcoStatus = 0; 
					}   
				} 
			} 
			else if(Record_retS != -1){ // The Second recording. 
				var ChannelRecS = Record_retS.split("?");
				Record_retNumS = ChannelRecS[0];
				if(ChannelNum == Record_retNumS){
					document.getElementById("RecordDiv").style.visibility = "visible";
					RecIcoStatus = 1;
				}
				else{
					document.getElementById("RecordDiv").style.visibility = "hidden";  
					RecIcoStatus = 0;
				}  	
			}
		}		
	}else{			
		if(Rec_DVBStatus ==1){
			if(	Rec_DVBretT != -1){ //The First recording.
				var ChannelDVBRecT = Rec_DVBretT.split("?");
				Rec_DVBNumT = ChannelDVBRecT[0];
				if(ChannelNum == Rec_DVBNumT){
					document.getElementById("ChannelTitle_Rec").style.backgroundImage = "url("+rec_info_img0.src+")"; 
				}
				else{
					document.getElementById("ChannelTitle_Rec").style.backgroundImage = "url("+rec_info_img1.src+")"; 
				} 
			} 
		}
		if(recordStatus ==1){
			if(	Record_retT != -1){ //The First recording.
				var ChannelRecT = Record_retT.split("?");
				Record_retNumT = ChannelRecT[0];
				if(ChannelNum == Record_retNumT){
					document.getElementById("ChannelTitle_Rec").style.backgroundImage = "url("+rec_info_img0.src+")"; 
				}
				else{
					document.getElementById("ChannelTitle_Rec").style.backgroundImage = "url("+rec_info_img1.src+")"; 
				} 
			} 
			else{
				if(Record_retS != -1){ // The Second recording. 
					var ChannelRecS = Record_retS.split("?");
					Record_retNumS = ChannelRecS[0];
					if(ChannelNum == Record_retNumS){
						document.getElementById("ChannelTitle_Rec").style.backgroundImage = "url("+rec_info_img0.src+")"; 
					}
					else{
						document.getElementById("ChannelTitle_Rec").style.backgroundImage = "url("+rec_info_img1.src+")"; 
					}  	
				} 
			} 
		}
		else if(recordStatus == 2){		
			if(	Record_retT != -1){ //The First recording.
				var ChannelRecT = Record_retT.split("?");
				Record_retNumT = ChannelRecT[0];
				if(ChannelNum == Record_retNumT){
					document.getElementById("ChannelTitle_Rec").style.backgroundImage = "url("+rec_info_img0.src+")"; 
				}
				else{
					if(Record_retS != -1){ // The Second recording. 
						var ChannelRecS = Record_retS.split("?");
						Record_retNumS = ChannelRecS[0];
						if(ChannelNum == Record_retNumS){
							document.getElementById("ChannelTitle_Rec").style.backgroundImage = "url("+rec_info_img0.src+")"; 
						}
						else{
							document.getElementById("ChannelTitle_Rec").style.backgroundImage = "url("+rec_info_img1.src+")"; 
						}  	
					} 
				} 
			} 
			else if(Record_retS != -1){ // The Second recording. 
				var ChannelRecS = Record_retS.split("?");
				Record_retNumS = ChannelRecS[0];
				if(ChannelNum == Record_retNumS){
					document.getElementById("ChannelTitle_Rec").style.backgroundImage = "url("+rec_info_img0.src+")"; 
				}
				else{
					document.getElementById("ChannelTitle_Rec").style.backgroundImage = "url("+rec_info_img1.src+")"; 
				}  	
			}
		}
		else if (recordStatus == 0) {
			document.getElementById("ChannelTitle_Rec").style.backgroundImage = "url("+rec_info_img1.src+")"; 
		}
	}
	return;
}
/*********************************************************************/
/* Function: showChannelList                                         */
/* Description: 显示频道列表		                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
var ShowListst = 0;// 0 is display , 1 is display MINIList , 2 is display Channel List Div;
var ListFocusDivTop; //  Channel List Div Top; 
var ListPageTotal;
function showChannelList() { 
	var page = parseInt(ChannelNum/10);
	ListPageTotal = parseInt((ChannelTotal-1)/10); ///page Total ; 
	for(var i = 0; i<10; i++){
		 var aa = (page*10)+i+1;
		if((page*10)+i<ChannelTotal)
		{
			document.getElementById("channelNum"+i).innerHTML = aa;
			document.getElementById("Channel_A"+i).innerHTML = ChannelName[(page*10)+i];	
		}
		else
		{
			document.getElementById("channelNum"+i).innerHTML = "";
			document.getElementById("Channel_A"+i).innerHTML = "";
		}   
	}
	document.getElementById("ListPage").innerHTML = (page+1) + "/"+ (ListPageTotal+1);	
	return;   
}

/*********************************************************************/
/* Function: showListDiv                                             */
/* Description: 显示频道列表Div                       	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
function showListDiv() {  	 
	if(ShowListst==1){		  
		window.clearTimeout(ChannelListTimer); 
		document.getElementById("ChannelInforDiv").style.top = "720px";	
		ChannelListTimer = setTimeout("document.getElementById('ListDiv').style.left = '0px'",400);	
		ListFocusFun();
		ListFontFun();
		showChannelList();
		pipCloseFun(); // Colse PIP;
		KeyExitNum = 1;
		ShowListst = 2;
		saveChannelNum = ChannelNum;
	}
	else {
		return false;
	} 
	return; 
}


/*********************************************************************/
/* Function: showChannelInfo                                         */
/* Description: 显示频道信息		                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/ 
function showChannelInfo() {		
	if(ChannelNum==0){
		document.getElementById("barDivUp").style.borderBottomColor = "#646464";
		document.getElementById("barDivDown").style.borderTopColor = "#f0f0f0";		 
	}
	else if(ChannelNum == ChannelTotal-1){
		document.getElementById("barDivUp").style.borderBottomColor = "#f0f0f0";
		document.getElementById("barDivDown").style.borderTopColor = "#646464";	
	}
	else{
		document.getElementById("barDivUp").style.borderBottomColor = "#f0f0f0";
		document.getElementById("barDivDown").style.borderTopColor = "#f0f0f0";	 
	}  			
	ShowRecIcoFun(1);
	GetTimeFun();
	document.getElementById("ChannelTitle").innerHTML = "";
	document.getElementById("ChannelTxt").innerHTML = ""; 
	document.getElementById("ChannelTitle").innerHTML = ChannelName[ChannelNum];
	document.getElementById("ChannelTxt").innerHTML = ChannelInfor[ChannelNum];
	document.getElementById("ChannelInforDiv").style.top = "558px"; 	
	KeyExitNum = 9;
	ShowListst = 1;
	TimerHiddFun(9);
	showDownPip();
	//pipPlayFun(PipType,ChannelNum);
	return; 
}

/*********************************************************************/
/* Function: showDownPip	                                         */
/* Description: 频道信息显示时，PIP处理                  	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
function showDownPip() {
	pipTop = pipPos[4];
	pipLeft = pipPos[5];
	pipSetWindowFun(pipLeft,pipTop,pipWidth,pipHeight); // Set pip Window;
	document.getElementById("pipDivTxt").style.top = pipPos[4] + "px";
	document.getElementById("pipDivTxt").style.left = pipPos[5] + "px";
	return;
}

/*********************************************************************/
/* Function: volumeControl	                                         */
/* Description: 音量控制			                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
var volumeHidden;
var volume;
function volumeControl() {
	if(volume>100){
		volume = 100;	 
	}	
	else if(volume<0){
		volume = 0;	 
	}
	player.Ag_audio_setVolume(volume); 
	var volbar = parseInt((676/100)*volume);
	//document.getElementById("volumeDiv").style.webkitTransform = "scale(1.0)"; 
	document.getElementById("volumeDiv").style.opacity = "1";
	document.getElementById("volumeText").innerHTML = volume + "/"  + "100"; 
	document.getElementById("volumeBar").style.width = volbar + "px";
	KeyExitNum = 3; 
	TimerHiddFun(3);
	return; 
} 

/*********************************************************************/
/* Function: recordChannel	                                         */
/* Description: 录制节目			                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/  
var RecIcoStatus = 0; // 0 is Recording Ico Hidden , 1 is Recording Ico display; 
var Record_retNumT; // The First Record IPTV ChannelNumber; 
var Record_retNumS; // The second Record IPTV ChannelNumber;
var Record_ret; // Recording IPTV return value;
var Record_retT = -1;//-1 is Not IPTV Recording, other is The First Record IPTV;
var Record_retS = -1;//-1 is  Not IPTV Recording, other is The second Record IPTV;
var Record_retTT; //The First Record IPTV return value;
var Record_retSS; //The second Record IPTV return value;
var retNum; //According to the Recording return value to stop recording;
var Rec_DVBStatus = 0; // DVB Recording Status;
var Rec_DVBret; //Recording DVB return value;
var Rec_DVBNumT;//Record DVB ChannelNumber; 
var Rec_DVBretT = -1;//-1 is Not Recording, other is  Record DVB;
function recordChannel(Num) { 
	if(Num==0){// record IPTV;
		var ChanneArr_Add = ChannelAdd[playNow].split(":"); 
		var ChannelIP = ChanneArr_Add[0]//Channel Ip ; 
		var ChannelPort = ChanneArr_Add[1];  // Channel Port ;
		var recorId = player.Ag_record_create();  
		Record_ret =  player.Ag_record_startByIPAndID(ChannelIP,ChannelPort,recorId); 
		getTimeForName(recorId);
	}
	else{ // record DVB;
		var Rec_DVBid = player.Ag_record_create();
		Rec_DVBret = player.Ag_record_startByLCNAndID(ChannelNum,Rec_DVBid);
		getTimeForName(recorId);
	}
	return; 
} 
/*********************************************************************/
/* Function: timeShiftStart	                                         */
/* Description: 时移开始			                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
var recordStatus = 0;	//0 is not record, 1 or 2 is record;
var timeShiftStatus = 0;	//0 is no timeShift, 1 is timeshift;
var RsTotalsize = 7200; //Timeshift Total Time;
var Tlbarleft; //Timeshift Bar left; 
var Plbarleft;// Play Bar left;
var PlbarleftDiv; // play Bar Div left; 
var TimerTsFun;
var Timerts;
var tips_status = 0;	// 1 is time shift, 2 is record
function timeShiftStart() {
	if (pipStatus == 1) {
		return;
	}
	if(timeShiftStatus ==1){
		KeyExit(KeyExitNum);
		TipsTxtFun(3);
		ShowTimeShiftFun(1);  
	}
	else if(Record_retT != -1){//Tips : IPTV Recording...Don't TimeShift;
		var Record_AddT = Record_retT.split("?");    
		Record_retNumT = Record_AddT[0]; // First Record Channel Num; 
		if(ChannelNum == Record_retNumT){ 
			if(KeyExitNum !=-1){ 
				window.clearTimeout(TimerHiddDiv);
				KeyExit(KeyExitNum); // Close Html;  
			}
			TipsTxtFun(1);
			TipsTxtSt = 0;
			tips_status = 1;
		}else{
			window.clearTimeout(Timerts);
			if(KeyExitNum !=-1){ 
				window.clearTimeout(TimerHiddDiv);
				KeyExit(KeyExitNum); // Close Html;
				Timerts = setTimeout("TimeShiftFun()",800);		 
			} 		
		}
	}
	else if(Record_retS != -1){  //Tips : IPTV Recording...Don't TimeShift;
		var Record_AddS = Record_retS.split("?"); 
		Record_retNumS = Record_AddS[0]; // Second Record Channel Num;
		if(ChannelNum == Record_retNumS){ 
			if(KeyExitNum !=-1){ 
				window.clearTimeout(TimerHiddDiv);
				KeyExit(KeyExitNum); // Close Html; 	 
			}
			TipsTxtFun(1);
			TipsTxtSt = 0;
		}else{
			window.clearTimeout(Timerts);
			if(KeyExitNum !=-1){ 
				window.clearTimeout(TimerHiddDiv);
				KeyExit(KeyExitNum); // Close Html;
				Timerts = setTimeout("TimeShiftFun()",800);		 
			}
		}
	}
	else if(Rec_DVBStatus ==1){ //Tips : DVB Recording...Don't TimeShift;
		if(KeyExitNum !=-1){ 
			window.clearTimeout(TimerHiddDiv);
			KeyExit(KeyExitNum); // Close Html; 	 
		}
		TipsTxtFun(1);
		TipsTxtSt = 0;
	}
	else if(KeyExitNum !=-1){ 
		window.clearTimeout(TimerHiddDiv);
		KeyExit(KeyExitNum); // Close Html;
		Timerts = setTimeout("TimeShiftFun()",800);		 
	}
	else{    
		window.clearTimeout(Timerts);
		TimeShiftFun();
	}	
	return; 
}
/*********************************************************************/
/* Function: TimeShiftFun	                                         */
/* Description: 时移开始			                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
function TimeShiftFun(){
		var Tsstart = player.Ag_timeShift_pause(); 
		if (Tsstart != 0) {
			return;
		}
		var TsBuffer = player.Ag_timeShift_setBufferSize(RsTotalsize);
		timeShiftStatus = 1; 
		PlayTsstatus = 0;
		document.getElementById("Ts_PLtime_S").innerHTML = "00";
		document.getElementById("Ts_PLtime_M").innerHTML = "00";
		document.getElementById("Ts_PLtime_H").innerHTML = "00";  
		document.getElementById("TsPlDiv").style.backgroundImage = "url(image/pause.png)"; 
		ShowTimeShiftFun(0);	
}
/*********************************************************************/
/* Function: ShowTimeShiftFun                                        */
/* Description: TimeShift coercion                  	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
function ShowTimeShiftFun(Num){
	if(Num == 0){
		if(PlayTsstatus == 1){
			TimerHiddFun(7);
		}
		else if(Ts_SeekStatus == 1 || PlayTsstatus == 0){
			window.clearTimeout(TimerHiddDiv);
		}
		//document.getElementById("TsPlDiv").style.top = "170px";
		document.getElementById("TsPlDiv").style.opacity = "1";
	}
	else{
		window.clearTimeout(TimerHiddDiv);
		//document.getElementById("TsPlDiv").style.top = "-267px";
		document.getElementById("TsPlDiv").style.opacity = "0";
	}
	TsposTlTimeFun();
	document.getElementById("TimeShiftDiv_H").style.top = "578px";
	KeyExitNum = 7; 
}
/*********************************************************************/
/* Function: PlayTsFun   	                                         */
/* Description: 时移播放   		                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
var PlayTsstatus = 0; //0 is Pause , 1 is Play;  
function PlayTsFun(){
	if(timeShiftStatus == 1){ 	
		if(Ts_SeekStatus == 1){
			KeyExit(8);
		} 
		if(PlayTsstatus == 0){ 
			document.getElementById("TsPlDiv").style.backgroundImage = "url(image/play.png)";
			document.getElementById("TimeShiftBar_PL_bar_Div").style.visibility = "visible";
			var Playst = player.Ag_timeShift_resume();
			TsRewNum = 0;
			TsffwdNum = 0;
			PlayTsstatus = 1; // Play
			TsReffwStatus = 0;
			TsgetTltime();// TimeShift Total Time
			ShowTimeShiftFun(0);
		}
		else{ // Pause;
			PauseTsFun();
		}
	}
	return; 
}
/*********************************************************************/
/* Function: PauseTsFun   	                                         */
/* Description: 时移暂停   		                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
function PauseTsFun(){
	if(PlayTsstatus == 1){ 
		document.getElementById("TsPlDiv").style.backgroundImage = "url(image/pause.png)";
		document.getElementById("TimeShiftBar_PL_bar_Div").style.visibility = "visible";
		var Pause = player.Ag_timeShift_pause();
		PlayTsstatus = 0; //Pause;
		ShowTimeShiftFun(0);
	}
	return;
}
/*********************************************************************/
/* Function: getTsTimeFun 	                                         */
/* Description: get TimeShift	                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
var Time_S; // TimeShift Seconds;
var Time_M; // TimeShift Minutes;
var Time_H; // TimeShift Hours;
var Time_SDiv; // TimeShift Seconds Div;
var Time_MDiv; // TimeShift Minutes Div;
var Time_HDiv; // TimeShift Hours Div;
var TimeNum;
var TstRecordTime; // Timeshift total;
var TsPlayTime; // play timeshift time;
function TsTimeFun(TimeNum){  
/*	var timeShow = getTimeFormat(TimeNum).split(":");
	Time_S = timeShow[2];
	Time_M = timeShow[1];
	Time_H = timeShow[0];*/
	if(TimeNum<60){ 	
		var Time_txt_S = TimeNum;	
		Time_M = "00";
		Time_H = "00"; 	 
		if(Time_txt_S < 10){
			Time_S = "0" + Time_txt_S;					
		}else{
			Time_S = Time_txt_S;
		} 
		document.getElementById(Time_SDiv).innerHTML = Time_S;
		document.getElementById(Time_MDiv).innerHTML = Time_M;
		document.getElementById(Time_HDiv).innerHTML = Time_H;
	}
	else {
		var leave1 = TimeNum;	
		var Time_txt_H = parseInt(leave1/3600);	
		var Time_txt_M = parseInt((leave1%3600)/60);
		var Time_txt_S = parseInt(leave1%60); 
		if(Time_txt_S <10){	
			Time_S = "0" + Time_txt_S; 	
		}else{
			Time_S = Time_txt_S; 
		} 
		if(Time_txt_M <10){ 
			Time_M = "0" + Time_txt_M; 			
		}else{
			Time_M = Time_txt_M; 
		}
		if(Time_txt_H < 10){ 
			Time_H = "0" + Time_txt_H;				
		}else{
			Time_H = Time_txt_H;
		}
		document.getElementById(Time_SDiv).innerHTML = Time_S;
		document.getElementById(Time_MDiv).innerHTML = Time_M;
		document.getElementById(Time_HDiv).innerHTML = Time_H; 	
	}
		/*document.getElementById(Time_SDiv).innerHTML = Time_S;
		document.getElementById(Time_MDiv).innerHTML = Time_M;
		document.getElementById(Time_HDiv).innerHTML = Time_H; 	*/
	return; 
}
function getTimeFormat(time) {
	var timeValue = parseInt(time);
	var time_h = parseInt(timeValue/3600);
	var time_m = parseInt(parseInt(timeValue/60)%60);
	var time_s = parseInt(timeValue%60);
	time_h = time_h > 99 ? 99 : time_h;
	time_h = time_h < 10 ? "0"+time_h : time_h;
	time_m = time_m < 10 ? "0"+time_m : time_m;
	time_s = time_s < 10 ? "0"+time_s : time_s;
	return (time_h+":"+time_m+":"+time_s);
}


/*********************************************************************/
/* Function: TsgetPltime	                                         */
/* Description: get Play timeshift                    	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/ 
function TsgetTltime(){// TimeShift Total Time
		TstRecordTime = parseInt(player.Ag_timeShift_getRecordTime());	
		var newPlayTime = parseInt(player.Ag_timeShift_getPlayTime());
		var tsTime = TstRecordTime-newPlayTime;
		Time_SDiv = "Ts_TLtime_S";
		Time_MDiv = "Ts_TLtime_M";
		Time_HDiv = "Ts_TLtime_H"; 
		TsTimeFun(tsTime);  
}
/*********************************************************************/
/* Function: TsgetTltime	                                         */
/* Description: get timeshift Total                 	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/ 
function TsgetPltime(){ //Play  Time  
		TsPlayTime = player.Ag_timeShift_getPlayTime(); 		
		Time_SDiv = "Ts_PLtime_S";
		Time_MDiv = "Ts_PLtime_M";
		Time_HDiv = "Ts_PLtime_H"; 
		TsTimeFun(TsPlayTime);  
}
/*********************************************************************/
/* Function: TsposTlTimeFun	                                         */
/* Description: Timer Function		                   	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/ 
function TsposTlTimeFun(){
	if (PlayTsstatus != 1) {
		TsgetTltime();// TimeShift Total Time
	}
	TsgetPltime();//Play  Time 
	/*if(TstRecordTime >= RsTotalsize){ // TimeShift Total Time > Buffer;
		Tlbarleft = "637";
	}
	else if(TsPlayTime >= RsTotalsize){ // Play Total Time > Buffer;
		Plbarleft = "637";
		PlbarleftDiv = "669";
	}
	else{*/
		Tlbarleft = TstRecordTime*(628/RsTotalsize);
		Plbarleft = TsPlayTime*(628/RsTotalsize);
		PlbarleftDiv = TsPlayTime*(628/RsTotalsize);
	//}
	if (Tlbarleft <=1 ) {
		Tlbarleft = 1;
	}
	var sDivleft = document.getElementById("TimeShiftBar_PL_bar_Div").style.visibility;
	if (sDivleft == "visible") {
		Tlbarleft += 10;
	}
	document.getElementById("TimeShiftBar_PL_bar").style.width = Plbarleft + "px"; 
	document.getElementById("TimeShiftBar_PL_bar_Div").style.left = PlbarleftDiv + "px";	
	document.getElementById("TimeShiftBar_bar").style.width = Tlbarleft + "px";
	window.clearTimeout(TimerTsFun);
	TimerTsFun = setTimeout("TsposTlTimeFun()",900) ; 
	return; 
}

/*********************************************************************/
/* Function: timeShiftEnd	                                         */
/* Description: 时移结束			                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
function timeShiftEnd(){
	if(timeShiftStatus == 1) { //Stop TimeShift;	
		if(Ts_SeekStatus == 1){
			KeyExit(8);
		} 
		if(TipsTxtSt==1){
			player.Ag_timeShift_stop(0); 
			timeShiftStatus = 0;
			setTimeout("keyRed()",500); 	
		}
		else{
			player.Ag_timeShift_stop(0); 
			timeShiftStatus = 0;
			//player.Ag_timeShift_saveBuffer();
		}
		document.getElementById("TimeShiftBar_PL_bar_Div").style.visibility = "hidden";
	}
	return; 
} 
/*********************************************************************/
/* Function: StopRecord		                                         */
/* Description: Stop    Record                           	         */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-02								 */
/*********************************************************************/
var stopRecordStatus = false;	//stop record status
function StopRecord(){ //Stop Record;
	stopRecordStatus = true;	
	KeyExit(KeyExitNum);
	if(menuStatus==1){
		KeyExit(0);
	}	
	if(Rec_DVBStatus ==1){
		if(Rec_DVBretT != -1){
			var Rec_DVBAddT = Rec_DVBretT.split("?"); 
			Rec_DVBNumT = Rec_DVBAddT[0];		
			if(ChannelNum == Rec_DVBNumT){ 
				retNum = Rec_DVBAddT[1]; 
				Rec_DVBretT = -1;  
				Rec_DVBStatus = 0;  
			}
		}
	}
	if(recordStatus == 1){
		if(	Record_retT != -1){
			var Record_AddT = Record_retT.split("?"); 
			Record_retNumT = Record_AddT[0];		
			if(ChannelNum == Record_retNumT){ 
				retNum = Record_AddT[1]; 
				Record_retT = -1; 
				recordStatus = 0;
				setCookies('recordCookie1',Record_retT,10000);
				setCookies('rec_status',recordStatus,10000);
			}
		}
		else{
			if(Record_retS != -1){
				var Record_AddS = Record_retS.split("?");
				Record_retNumS = Record_AddS[0];		
				if(ChannelNum == Record_retNumS ){ 
					retNum = Record_AddS[1]; 
					Record_retS = -1;
					recordStatus = 0;   
					setCookies('recordCookie2',Record_retS,10000);
					setCookies('rec_status',recordStatus,10000);
				}
			}
		}
	}
	else if(recordStatus == 2){
//		if(	Record_retT != -1){
			var Record_AddT = Record_retT.split("?"); 
			var Record_AddS = Record_retS.split("?");
			Record_retNumS = Record_AddS[0];
			Record_retNumT = Record_AddT[0];		
			if(ChannelNum == Record_retNumT){ 
				retNum = Record_AddT[1]; 
				Record_retT = -1; 
				recordStatus = 1; 
				setCookies('recordCookie1',Record_retT,10000);
				setCookies('rec_status',recordStatus,10000);
			}
			else if(ChannelNum == Record_retNumS){
				retNum = Record_AddS[1]; 
				Record_retS = -1;
				recordStatus = 1;  
				setCookies('recordCookie2',Record_retS,10000);
				setCookies('rec_status',recordStatus,10000);
			}
	/*	}
		else{
			if(Record_retS != -1){
				var Record_AddS = Record_retS.split("?");
				Record_retNumS = Record_AddS[0];		
				if(ChannelNum == Record_retNumS ){ 
					retNum = Record_AddS[1]; 
					Record_retS = -1;
					recordStatus = 0;   
					setCookies('recordCookie2',Record_retS,10000);
					setCookies('rec_status',recordStatus,10000);
				}
			}
		}	*/	
	}  
	var	rec_stop = player.Ag_record_stop(retNum); 
	//var totalNum = player.Ag_playBack_rangeFile(0, 0);
	ShowRecIcoFun(0);
	ShowRecIcoFun(1);
	document.getElementById("RecordDiv").style.visibility = "hidden";
	RecIcoStatus = 0;
	return; 
}
/*********************************************************************/
/* Function: rewTimeShift      	                                     */
/* Description: IPTV时移的快退	                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
var TsRewNum = 0;
var TsReffwStatus = 0; // 0 NO rew or ffwd , 1 is  rew or ffdw;
function rewTimeShift() { 
	if (timeShiftStatus == 1) { // TimeShift Rew; 
		if(Ts_SeekStatus == 1){
			KeyExit(8);
		} 
		TsRewNum++;
		if(TsRewNum > 5){
			TsRewNum = 1;
		}
		var tt = Math.pow(2,TsRewNum);
		t = 0 - tt;
		player.Ag_timeShift_trick(t); 
		document.getElementById("TsPlDiv").style.backgroundImage = "url(image/backward" + tt + ".png)";
		document.getElementById("TimeShiftBar_PL_bar_Div").style.visibility = "visible";
		TsffwdNum = 0;
		PlayTsstatus = 0;
		TsReffwStatus = 1;
		ShowTimeShiftFun(0);
					
	}
	return; 
}

/*********************************************************************/
/* Function: ffwdTimeShift   	                                     */
/* Description: IPTV时移的快进	                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
var TsffwdNum = 0;
function ffwdTimeShift() { 
	if (timeShiftStatus == 1) { // TimeShift Ffwd;
		if(Ts_SeekStatus == 1){
			KeyExit(8);
		} 
		TsffwdNum++; 
		if(TsffwdNum > 5){
			TsffwdNum = 1;
		}
		var tt = Math.pow(2,TsffwdNum); 
		player.Ag_timeShift_trick(tt);  
		document.getElementById("TsPlDiv").style.backgroundImage = "url(image/forward" + tt + ".png)";
		document.getElementById("TimeShiftBar_PL_bar_Div").style.visibility = "visible";
		TsRewNum = 0;
		PlayTsstatus = 0;
		TsReffwStatus = 1;
		ShowTimeShiftFun(0);
	}
	return; 
}

/*********************************************************************/
/* Function: SyncStart   	                                         */
/* Description: IPTV同步     	                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
function SyncStart(){
	 KeyExit(KeyExitNum);
	if(menuStatus==1){
		KeyExit(0);
	}
	if(timeShiftStatus == 1){
		KeyExit(7);		
	}  
	var SyncStarts = player.Ag_timeShift_sync();
	PlayTsstatus = 1; // Play;
	return; 
}

/*********************************************************************/
/* Function: SeekStart   	                                         */
/* Description: IPTV Seek     	                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
var Ts_SeekStatus = 0; //0 is Not Seek ,1 is Seek;
var Seek_InputFocus = 0;
function SeekStart(){ 
	if(timeShiftStatus == 1){
		if(Ts_SeekStatus==0){   
			KeyExit(KeyExitNum);
			TsposTlTimeFun(); 
			if(PlayTsstatus == 1){
				KeyExitNum = 10;
				TimerHiddFun(10);   
			}
			else if(TsReffwStatus == 1){
				return;
			}
			else{
				KeyExitNum = 8;   
			}
			for (var i=0; i<=5; i++){
				if(TsPlayTime == 0){
					document.getElementById("Seek_Input_"+i).innerHTML= "0";
				}else{
					TsgetPltime();
					var timetxt = Time_H + Time_M + Time_S;  
					SeekTimeArr[i] = timetxt.substring(i,i+1);
					document.getElementById("Seek_Input_"+i).innerHTML = SeekTimeArr[i]; 
				}
				if(i==0){
					document.getElementById("Seek_Input_"+i).style.color = "blue";
				}else{
					document.getElementById("Seek_Input_"+i).style.color = "#000";
				}
			}
			document.getElementById("Ts_SeekDiv").style.width = "125px";  
			document.getElementById("Ts_SeekDiv").style.left = (PlbarleftDiv-55) + "px";
			document.getElementById("TimeShiftDiv_H").style.top = "578px";	
			Ts_SeekStatus = 1; 
			Seek_InputFocus = 0;
		}else{
			KeyExit(8);
			KeyExit(7);
		}
	}
	return; 
}

/*********************************************************************/
/* Function: PlayTsSeekFun 	                                         */
/* Description: Play Seek    	                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
function PlayTsSeekFun(SeekTime){
	var TsSeekTLTime = player.Ag_timeShift_getRecordTime();  
	if(SeekTime >TsSeekTLTime){ 		
		for (var i=0; i<=5; i++){
			document.getElementById("Seek_Input_"+i).innerHTML= "0";
			if(i==0){
				document.getElementById("Seek_Input_0").style.color = "blue";
			}else{
				document.getElementById("Seek_Input_"+i).style.color = "#000";
			}
		}
		KeyExit(8);
		TimerHiddFun(7);
		ShowTimeShiftFun(1); 
		TipsTxtSt = 0;
		TipsTxtFuntt(6) 
		Seek_InputFocus = 0;
	}
	else{
		document.getElementById("TsPlDiv").style.backgroundImage = "url(image/play.png)";
		document.getElementById("TimeShiftBar_PL_bar_Div").style.visibility = "visible";
		player.Ag_timeShift_seek(SeekTime);
		PlayTsstatus = 1;
		TsgetTltime();// TimeShift Total Time
		TsposTlTimeFun();
		KeyExit(8);
		TimerHiddFun(7);
	}
	return; 
}

/*********************************************************************/
/* Function: GetSeekTimeFun		                                     */
/* Description: get SeekTime								         */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/ 
var SeekTime;
var SeekTimeArr = new Array(); //Get Seek Time Array;
function GetSeekTimeFun(){
	if(Ts_SeekStatus == 1){		
		for(var i = 0; i<=5; i++){ 
			SeekTimeArr[i] = document.getElementById("Seek_Input_"+i).innerHTML; 
		} 
		var seek_Txt0 = parseInt(SeekTimeArr[0]);
		var seek_Txt1 = parseInt(SeekTimeArr[1]);
		var seek_Txt2 = parseInt(SeekTimeArr[2]);
		var seek_Txt3 = parseInt(SeekTimeArr[3]);
		var seek_Txt4 = parseInt(SeekTimeArr[4]);
		var seek_Txt5 = parseInt(SeekTimeArr[5]);
		SeekTime = (seek_Txt0 + seek_Txt1)*3600 + (seek_Txt2 + seek_Txt3)*60 + seek_Txt4*10 + seek_Txt5;
	} 
	return; 
}

/*********************************************************************/
/* Function: seekLeft		                                         */
/* Description: Seek KeyValueFunction                  	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/  
function seekLeft() {
	player.printf(1, "KeyExitNum============Seek_InputFocus=============="+Seek_InputFocus);
	document.getElementById("Seek_Input_"+Seek_InputFocus).style.color = "#000";
	Seek_InputFocus = Seek_InputFocus == 0 ? 5 : (Seek_InputFocus-1);
	document.getElementById("Seek_Input_"+Seek_InputFocus).style.color = "blue";
	return;
}

/*********************************************************************/
/* Function: seekRight		                                         */
/* Description: Seek KeyValueFunction                  	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/  
function seekRight() {
	player.printf(1, "KeyExitNum============Seek_InputFocus=============="+Seek_InputFocus);
	document.getElementById("Seek_Input_"+Seek_InputFocus).style.color = "#000";
	Seek_InputFocus = Seek_InputFocus == 5 ? 0 : (Seek_InputFocus+1);
	document.getElementById("Seek_Input_"+Seek_InputFocus).style.color = "blue";
	return;
}

/*********************************************************************/
/* Function: SeekKeyNum		                                         */
/* Description: Seek KeyValueFunction                  	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/  
function SeekKeyNum(KeyNum){
	if(Ts_SeekStatus == 1){
		TimerHiddFun(10);
		if(Seek_InputFocus==0){ 
			document.getElementById("Seek_Input_0").innerHTML = KeyNum;
			document.getElementById("Seek_Input_0").style.color = "#000";
			document.getElementById("Seek_Input_1").style.color = "blue";
			Seek_InputFocus = 1;
		}  
		else if(Seek_InputFocus ==1){  
			document.getElementById("Seek_Input_1").style.color = "#000";
			document.getElementById("Seek_Input_2").style.color = "blue";
			document.getElementById("Seek_Input_1").innerHTML = KeyNum; 
			Seek_InputFocus = 2; 
		}
		else if(Seek_InputFocus == 2){  
			document.getElementById("Seek_Input_2").style.color = "#000";
			document.getElementById("Seek_Input_3").style.color = "blue";
			document.getElementById("Seek_Input_2").innerHTML = KeyNum;
			Seek_InputFocus = 3; 
		}
		else if(Seek_InputFocus == 3){  
			document.getElementById("Seek_Input_3").style.color = "#000";
			document.getElementById("Seek_Input_4").style.color = "blue";
			document.getElementById("Seek_Input_3").innerHTML = KeyNum;
			Seek_InputFocus = 4; 
		} 
		else if(Seek_InputFocus == 4){  
			document.getElementById("Seek_Input_4").style.color = "#000";
			document.getElementById("Seek_Input_5").style.color = "blue";
			document.getElementById("Seek_Input_4").innerHTML = KeyNum;
			Seek_InputFocus = 5; 
		} 
		else if(Seek_InputFocus == 5){  
			document.getElementById("Seek_Input_5").style.color = "#000";
			//document.getElementById("Seek_Input_5").style.color = "blue";
			document.getElementById("Seek_Input_5").innerHTML = KeyNum;
			GetSeekTimeFun();
			PlayTsSeekFun(SeekTime);
		} 
	} 
	return; 
}
/*********************************************************************/
/* Function: MenuFocusFun 	                                         */
/* Description: Menu焦点移动		                      	             */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/
function MenuFocusFun() {		
	menuLiLeft = menufocus*200;
	if(menufocus < 0)
	{
		menufocus = 5;
		menuLiLeft = menufocus*200; 
	}  
	else if(menufocus >5)
	{
		menufocus = 0;
		menuLiLeft = menufocus*200;
	}  
	document.getElementById("menuDivLi").style.left = menuLiLeft + "px"; 
	return; 
}

/*********************************************************************/
/* Function: ListFocusFun 	                                         */
/* Description: Channel List焦点移动		                      	     */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/ 
function ListFocusFun() {	     
	ListFocusDivTop = (ChannelNum%10)*39;
	document.getElementById("ListFocusDiv").style.top = ListFocusDivTop + "px";	
	return; 
}
function ListFontFun(){
	document.getElementById("channelNum"+ChannelNum%10).style.color = "#fff";
	document.getElementById("Channel_A"+ChannelNum%10).style.color = "#fff";
	return;  
}
function TimerListFont(){	
	document.getElementById("channelNum"+ChannelNum%10).style.color = "#646464";	
	document.getElementById("Channel_A"+ChannelNum%10).style.color = "#646464";	
	if(ChannelNum == ChannelTotal-2){
		document.getElementById("barDivDown").style.borderTopColor = "#646464";	
		document.getElementById("barDivUp").style.borderBottomColor = "#f0f0f0"; 
	}
	else if(ChannelNum == 0){
		document.getElementById("barDivUp").style.borderBottomColor = "#646464";
		document.getElementById("barDivDown").style.borderTopColor = "#f0f0f0";	 	
	}
	else{
		document.getElementById("barDivUp").style.borderBottomColor = "#f0f0f0";
		document.getElementById("barDivDown").style.borderTopColor = "#f0f0f0";	 
	}
	ChannelNum = playNow;  
	return;
}
/*********************************************************************/
/* Function: TipsTxtFun    	                                         */
/* Description: Tips              		                      	     */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/ 
var TipsTxtSt = -1; //-1 is none. 0 is Timeshift, 1 is Recording, 2 is ChannelSwitch. 
function TipsTxtFun(Num) {
	if(Tipsstatus==1){ 
		document.getElementById("TipsDivTxt").innerHTML = " ";
		document.getElementById("TipsDivTxt").innerHTML = TipsTxtArr[Num];
		document.getElementById("Tipsserver").style.background = " "; 
		document.getElementById("Tipsserver").style.background = "-webkit-gradient(linear, left top, left bottom, from(#011f55), to(#034eb3))";
		document.getElementById("Tipsserver").style.borderColor = "#1181FF";
		document.getElementById("Tipscancel").style.background = " "; 
		document.getElementById("Tipscancel").style.background = "-webkit-gradient(linear, left top, left bottom, from(#2E2E2E), to(#181818))";
		document.getElementById("Tipscancel").style.borderColor = "#646464"; 
		//document.getElementById("TipsDiv").style.webkitTransform = "scale(1,1)";  
		document.getElementById("TipsDiv").style.opacity = "1";  
		document.getElementById("TipsDiv_bg").style.opacity = "0.9";  
		document.getElementById("Tipsserver").style.left = "88px";
		document.getElementById("Tipscancel").style.visibility = "visible";
		Tipsstatus = 0;
		TipsFocus = 0; 
	}
	return; 
}

/*********************************************************************/
/* Function: TipsTxtFun    	                                         */
/* Description: Tips              		                      	     */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/  
function TipsTxtFuntt(Num) {
	if(Tipsstatus==1){ 
		document.getElementById("TipsDivTxt").innerHTML = " ";
		document.getElementById("TipsDivTxt").innerHTML = TipsTxtArr[Num];
		document.getElementById("Tipsserver").style.borderColor = "#1181FF";
		document.getElementById("Tipsserver").style.background = "none"; 
		document.getElementById("Tipsserver").style.background = "-webkit-gradient(linear, left top, left bottom, from(#011f55), to(#034eb3))"; 
		document.getElementById("Tipscancel").style.visibility = "hidden";
		document.getElementById("Tipsserver").style.left = "150px"; 
		//document.getElementById("TipsDiv").style.webkitTransform = "scale(1,1)"; 
		document.getElementById("TipsDiv").style.opacity = "1";  
		document.getElementById("TipsDiv_bg").style.opacity = "0.9";  
		Tipsstatus = 0;
		TipsFocus = 2; 
	}
	return; 
} 
/*********************************************************************/
/* Function: pipPlayFun    	                                         */
/* Description: pip Play           		                      	     */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/ 
var PipType = 0; //0 is multicast, 1 is vod, 2 is dvb-t;
var pipPlayNow; 
function pipPlayFun(PipType,ChannelNum){
	window.clearTimeout(pipPlayTimer);
	pipPlayTimer = window.setTimeout("pip_play("+PipType+","+ChannelNum+");", 500);
	//var pipret = player.Ag_pip_streamPlay(PipType,ChannelAdd[ChannelNum]);
	pipPlayNow = ChannelNum;
	var pipshow = player.Ag_pip_show();
	pipStatus = 1;
	document.getElementById("pipDivTxt").innerHTML = pipPlayNow+1;
	document.getElementById("pipDivTxt").style.visibility = "visible";
	return;
}

function pip_play(type, channel) {
	var pipret = player.Ag_pip_streamPlay(type,ChannelAdd[channel]);
	return;
}

/*********************************************************************/
/* Function: pipPlayFun    	                                         */
/* Description: pip Set Window     		                      	     */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/ 
var pipPos = new Array("65","50","240","180","375","65");
var pipLeft = pipPos[0];
var pipTop = pipPos[1];
var pipWidth = pipPos[2];
var pipHeight = pipPos[3];
function pipSetWindowFun(pipLeft,pipTop,pipWidth,pipHeight){ 
	var pipset = player.Ag_pip_setWindow(pipLeft,pipTop,pipWidth,pipHeight); 
	return;
}
/*********************************************************************/
/* Function: pipCloseFun   	                                         */
/* Description: pip Close        		                      	     */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2010-12-03								 */
/*********************************************************************/  
function pipCloseFun(){
	var pipclose = player.Ag_pip_streamClose();  //  PIP close;
	var piphidden = player.Ag_pip_hide(); // PIP window is Hidden;
	document.getElementById("pipDivTxt").style.visibility = "hidden";
	pipStatus = 0;
	return;
}

/*********************************************************************/
/* Function: numberKeySelectChannel                                  */
/* Description: 数字键选台						              	     */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-02-15								 */
/*********************************************************************/  
var numKeyStr = "";
var timer_keyChannel;
var timer_hiddChannel;
function numberKeySelectChannel(num) {
	window.clearTimeout(timer_keyChannel);
	numKeyStr += num;
	if (numKeyStr.length > 3) {
		numKeyStr = numKeyStr.substring(0,3);
	}
	document.getElementById("ChannelNumDiv").innerHTML = numKeyStr;
	document.getElementById("ChannelNumDiv").style.visibility = "visible";
	timer_keyChannel = window.setTimeout("playKeyChannel("+(numKeyStr-1)+");", 1000);
	return;
}

/*********************************************************************/
/* Function: playKeyChannel			                                 */
/* Description: 数字键选台后的播放					              	     */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-02-15								 */
/*********************************************************************/  
function playKeyChannel(num) {
	if (parseInt(num)>=IPTVTotal || parseInt(num)<0) {
		hiddKeyChannelNum();
		numKeyStr = "";
		return;
	}
	window.clearTimeout(timer_hiddChannel);
	ChannelNum = num;
	numKeyStr = "";
	KeyExit(KeyExitNum);
	ChannelSwitch();
	return;
}

/*********************************************************************/
/* Function: hiddKeyChannelNum		                                 */
/* Description: 隐藏频道号						              	     */
/* Parameters:                                                       */
/* Author&Date: zhaopengjun  2011-02-15								 */
/*********************************************************************/  
function hiddKeyChannelNum() {
	document.getElementById('ChannelNumDiv').style.visibility = 'hidden';
	return;
}

function setCookies(username,nameValue,hours){		//设置cookie
	var curCookie = username + "=" + nameValue;
	if(hours > 0){
		var date = new Date();
		var ms = hours*3600*1000;
		date.setTime(date.getTime() + ms);
		curCookie += "; expires=" + date.toGMTString();
	}
	document.cookie = curCookie;
}

function getCookie(username){			//获得cookie
	var dc = document.cookie;
	var dc_name = username + "=";
	var cookie_id = dc.indexOf(dc_name);
	if(cookie_id == -1){
		return false;
	} else {
		cookie_id += dc_name.length;
	}
	var end = dc.indexOf(';',cookie_id);
	if(end == -1){
		end = dc.length;
	}
	var value = dc.substring(cookie_id, end);
	return value;
}

/*********************************************************************/
/* Function: setFileMetadata	                                     */
/* Description: 设置文件属性，0 is succeed,-1 is failed				 */
/* Parameters:	id is global id, key is name				         */
/* Author&Date: zhaopengjun  2011-01-21                              */
/*********************************************************************/
function setFileMetadata(id,key,value) {
	var ret = player.Ag_record_setMetaData(id, key, value);
	return ret;
}

function getTimeForName(id) {
	var time = player.Ag_time_getLocalTime();
	setFileMetadata(id, "file_name", time);
	return;
}



