/*
 * Function : FocusFactory(), 可以随时创建焦点，移动焦点
 * Params : divID:所创建div的ID(字符串类型), 
 * 			styleJson:所要改变的焦点样式(obj对象类型, 只需传入所需要改变的样式的值) 
 * 			initStyle: 初始化焦点样式名(字符串类型)
 * By : Luyunhai
 * Date : 2013.11.19
 * */
function FocusFactory(){
	this.DivID = "";
	this.createFocus = function(divID, initStyle){		//创建焦点
		var testDv = document.createElement("div");
		this.DivID = divID;
    	testDv.id = this.DivID;
	    testDv.className = initStyle;
	    document.body.appendChild(testDv);
	    testDv.style.display = "block";
    };
    this.moveFocus = function(styleJson){		//移动焦点(eg: {width:"20px",top:"40px"})
   		for(var key in styleJson){
			$(this.DivID).style[key] = styleJson[key];
		}
    };
    this.removeFocus = function(){		//删除焦点
    	var node = document.getElementById(this.DivID);
	    if (node) {
	        node.parentNode.removeChild(node);
	    }
    };
}