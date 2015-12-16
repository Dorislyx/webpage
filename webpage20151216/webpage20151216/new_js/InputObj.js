/*
 * inputObj对象：输入框对象，支持密码输入，阿拉伯数字输入，和英文输入，用于替代<input>标签
 * @id    		输入框的id；

 * @type 		输入框的类型："password"：密码 "normal":英文字母 "num":数字
 * @startStr    初始字符串

 * @maxLength   输入的最大长度

 * @cursorImg   闪烁光标图片
 * @blankImg    空白光标的图片

 * @imgHeight   图片的高度
 
 * @相关用法：
 * @moveCursor(-1)	光标左移1位
 * @moveCursor(1)	光标右移1位
 * @getFocus()		文本框获得焦点
 * @loseFocus()		文本框失去焦点
 * @removeStr()		删除光标前的字符
 * @getInput(num)	向文本框中输入字符
 * @inputStr		文本框中的字符串

 */
function InputObj(id, type, startStr, maxLength, cursorImg, blankImg, imgHeight) {
	
	/*----------------------基本属性--------------------*/
	this.id = id;		//输入框的ID
	this.type = (typeof(type) == "undefined" ? "normal" : type);		//输入类型
	this.startStr = (typeof(startStr) == "undefined" ? "" : startStr);		//输入框的初始值
	this.maxLength = (typeof(maxLength) == "undefined" ? 15 : maxLength);		//输入字符的最大长度，默认15，可修改
	this.cursorImg = (typeof(cursorImg) == "undefined" ? "image/Cursor.gif" : cursorImg);	//输入框光标图片，默认Cursor.gif，可修改
	this.blankImg = (typeof(blankImg) == "undefined" ? "image/none.gif" : blankImg);		//光标位置透明图片，默认none.gif，可修改
	this.imgHeight = (typeof(imgHeight) == "undefined" ? 20 : imgHeight);		//光标的高度，默认20，可修改
	
	/*----------------------其他相关属性--------------------*/
	this.input_timeout = -1;		//输入时的定时器
	
	this.numList = new Array();
	this.numList[0] = ["0"];
	this.numList[1] = ["1",".",","];
	this.numList[2] = ["A","B","C","2","a","b","c"];
	this.numList[3] = ["D","E","F","3","d","e","f"];
	this.numList[4] = ["G","H","I","4","g","h","i"];
	this.numList[5] = ["J","K","L","5","j","k","l"];
	this.numList[6] = ["M","N","O","6","m","n","o"];
	this.numList[7] = ["P","Q","R","S","7","p","q","r","s"];
	this.numList[8] = ["T","U","V","8","t","u","v"];
	this.numList[9] = ["W","X","Y","Z","9","w","x","y","z"];
	
	this.listIndex = -1;		//记录当前按键位置
	this.inputIndex	= 0;		//键值数组中的索引
	
	this.inputStr =	this.startStr;		//输入的内容
	this.cursorPos = this.inputStr.length;		//光标的位置
	
	this.pwdMark = "*";			//输入密码时的显示符
	
	/*----------------------显示光标--------------------*/
	this.getFocus = function() {
		this.$(this.id).innerHTML = this.getStr();
	};
	
	/*----------------------隐藏光标--------------------*/
	this.loseFocus = function() {
		var b_img = '<img src='+this.blankImg+' width=2 height='+this.imgHeight+'>';
		var tempStr = b_img;
		if(this.type == "password"){//如果输入的为密码
			for (var i=0;i<this.inputStr.length;i++){
				tempStr+= this.pwdMark+b_img;
			}
		}else{
			for (var i=0;i<this.inputStr.length;i++){
				tempStr+= this.inputStr.charAt(i)+b_img;
			}		
		}
		//this.$(this.id).innerHTML = tempStr;
		this.$(this.id).innerHTML = this.inputStr;
	};
	
	/*----------------------移动光标--------------------*/
	/*
	 * @ pos 为移动的步长，正数向右移，负数向左移
	 */
	this.moveCursor = function(pos) {
		this.cursorPos += pos;
		if (this.cursorPos < 0) {
			this.cursorPos = 0;
		} else if (this.cursorPos > this.inputStr.length) {
			this.cursorPos = this.inputStr.length;
		}
		this.$(this.id).innerHTML = this.getStr();
	};
	
	/*----------------------删除光标前的文字--------------------*/
	this.removeStr = function() {
		if (this.inputStr.length > 0 && this.cursorPos > 0) {
			if (this.listIndex > 0) {
				this.listIndex = -1;		//后退时再按键就不认为是同一个键
			}
			this.cursorPos--;
			this.inputStr = this.inputStr.substr(0,this.cursorPos) + this.inputStr.substr(this.cursorPos+1);
			this.$(this.id).innerHTML = this.getStr();
		}
	};
	
	/*----------------------输入文字--------------------*/
	this.getInput = function(num) {
		if (this.type == 'num' || this.type == 'password') {	//如果输入的是数字或密码的处理
			if (this.inputStr.length < this.maxLength) {		//如果当前字符长度小于总长度时，允许输入
				this.inputStr = this.inputStr.substr(0,this.cursorPos) + num + this.inputStr.substr(this.cursorPos);
				this.cursorPos++; 
				this.$(this.id).innerHTML = this.getStr();
			}
		} else {												//输入文字的处理
			if(this.listIndex == num){							//重复按下同一个键
				this.inputIndex++;
				this.inputIndex = (this.inputIndex >= this.numList[num].length) ? 0 : this.inputIndex;
				clearTimeout(this.input_timeout);
				/*
				 *关于setTimeout中使用this的问题：
				 *一个对象调用其相关方法时，this指代的是这个对象；
				 *当使用setTimeout设置一个延时处理时，实际上是告诉浏览器，在一段时间后，去执行某一方法；
				 *也就是说，实际上是浏览器（window）调用了这个方法；
				 *这时，这个方法内部的this指代的调用了该方法的对象，即window.
				 *如果定义一个变量，如上面的self，则setTimeout(self.funName, timer);
				 *这样的写法很像闭包，但实际不是，因为这个变量self并没有用在函数funName中；
				 *其原理和直接用this是一样的，所以结果也是一样的；
				 *这样，我们就可以考虑用闭包的方式了；
				 *即：使用匿名函数形成闭包。
				 */
				var self = this;
				//this.input_timeout = setTimeout(function(){self.listIndex=-1}, 800);	//超过800毫秒则不认为按的是同一个键.	
				this.input_timeout = setTimeout(function(){self.timeoutClose();}, 800);	//和上面注释功能一样，只是方便修改相应方法
				var select_list = this.numList[this.listIndex];
				this.inputStr = this.inputStr.substr(0,(this.cursorPos-1)) + select_list[this.inputIndex] + this.inputStr.substr(this.cursorPos);//按同一个键的时候只改变input_str的最后一个字母

				this.$(this.id).innerHTML = this.getStr();
			} else {//否则记录当前键的位置,并把对应的键的字母写入input_str
				if (this.inputStr.length<this.maxLength) {//当输入字符数不小于max_length的时候将不再响应
					clearTimeout(this.input_timeout);
					this.listIndex = num;
					this.inputIndex = 0;//还原input_index的值

					var select_list = this.numList[this.listIndex];
					this.inputStr = this.inputStr.substr(0,this.cursorPos) + select_list[this.inputIndex] + this.inputStr.substr(this.cursorPos);
					this.cursorPos++; 
					this.$(this.id).innerHTML = this.getStr();
				}
			}
		}
	}
	
	this.timeoutClose = function() {
		this.listIndex = -1;
	};

	/*----为了让光标在左右移动过程中不出现字体晃动的现象,
		  在每个字符之间都加入了一个和光标大小一样的透明图片,下面函数主要是实现这个功能---*/
	this.getStr = function() {
		var b_img = '<img src="'+this.blankImg+' "width=2 height='+this.imgHeight+'>';
		var c_img = '<img id="cursorLeft" src='+this.cursorImg+' width=2 height='+this.imgHeight+'>';
		var tempStr = ((this.cursorPos > 0) ? b_img : c_img);
		if(this.type == "password") {//如果输入的为密码
			for (var i=0;i<this.inputStr.length;i++) {
				if (i == (this.cursorPos-1)) {
					tempStr += this.pwdMark + c_img;
				} else {
					tempStr += this.pwdMark + b_img;
				}
			}
		} else {
			for (var i=0;i<this.inputStr.length;i++) {
				if (i == (this.cursorPos-1)) {
					tempStr += this.inputStr.charAt(i) + c_img;
				} else {
					tempStr += this.inputStr.charAt(i) + b_img;
				}
			}
		}
		return tempStr;
	};

	/*----------------------获得相关id的方法--------------------*/
	this.$ = function(myId) {
		return document.getElementById(myId);
	};
	
}

