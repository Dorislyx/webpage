function ShowListFactory(obj){
	this.position = obj.position || "absolute";		//列表的定位方式（默认：绝对定位）
	this.width = obj.width || "300px";		//列表的宽（默认：300px）
	this.height = obj.height || "200px";		//列表的高（默认：200px）
	this.top = obj.top || "0px";		//列表的top值（默认：0px）
	this.left = obj.left || "0px";		//列表的left值（默认：0px）
	this.styleJson = obj.style;		//可以设定一些非默认的样式的值（属性名要与js设置样式名对应）
	this.listId = obj.id || "list";		//设置列表的id（默认："list"）
	
	this.init = function(){		//初始化list
		var listDiv = document.createElement("div");
    	listDiv.id = this.listId;
	    document.body.appendChild(listDiv);
	    this._defaultListStyle();
    };
    this._getDom = function(id){
    	return document.getElementById(id);
    }
    this._addUnit = function(context, unit){		//context: 内容，unit: 所添加的单位
    	return (typeof context == "number") ? (context+unit) : context;
    }
    this._initStyle = function(){
    	this._getDom(this.listId).style.position = this.position;
    	this._getDom(this.listId).style.width = this._addUnit(this.width, "px");
    	this._getDom(this.listId).style.height = this._addUnit(this.height, "px");
    	this._getDom(this.listId).style.top = this._addUnit(this.top, "px");
    	this._getDom(this.listId).style.left = this._addUnit(this.left, "px");
    	//this._getDom(this.listId).className = this.className;
    }
    this._defaultListStyle = function(){
   		this._initStyle();
   		for(var key in this.styleJson){
			this._getDom(this.listId).style[key] = this.styleJson[key];
		}
    };
    
    /* function: 创建特殊的显示元素
     * params: 	 obj:	id: 元素id(String, 可选参数)
     * 					text: 元素的显示文字(String, 可选参数)
     * 					className: 元素的样式名(String, 可选参数)
     * */
    this.createUnit = function(obj){		
    	var unitDiv = document.createElement("div");
    	this._getDom(this.listId).appendChild(unitDiv);
    	if(obj.id){
    		unitDiv.id = obj.id;
    	}
    	if(obj.text){
    		unitDiv.innerHTML = obj.text;
    	}
    	if(obj.className){
    		unitDiv.className = obj.className;
    	}
    }
    
    /* function: 创建列表
     * params:   obj: 	listBoxStyle: 列表框的默认样式(String, 必选参数)
     * 					listLineStyle: 列表行的默认样式(String, 必选参数) 
     * 					lineIdKey: 每行id的key(String, 必选参数)
     * 					totalLine: 列表总行数(Number, 可选参数,  默认:1)
     * 					lineHeight: 每行的高度(Number, 可选参数, 默认:50)
     * */
    this.createList = function(obj){				
    	var list = document.createElement("div");
    	this._getDom(this.listId).appendChild(list);
    	list.className = obj.listBoxStyle;
    	for(var i = 0; i < (obj.totalLine||1); i++){
    		var listUnitDiv = document.createElement("div");
    		list.appendChild(listUnitDiv);
    		listUnitDiv.id = obj.lineIdKey + i;
    		listUnitDiv.className = obj.listLineStyle;
    		listUnitDiv.style.top = this._addUnit((obj.lineHeight||50) * i, "px");
    	}
    }
    
    /* function: 显示列表
     * params: 	obj:	id: 用于循环的key(String, 必选参数)
     * 					line: 列表的总行数(Number, 必选参数)
     * 					rowStyle: 列样式(字符串数组, 必选参数)
     * 					data: 所要显示的数据数组(对象二维数组, 必选参数)
     * */
    this.showListContext = function(obj){
    	for(var i = 0; i < obj.line; i++){		//清空列表原有的内容
    		var div = this._getDom(obj.id + i);
		    while(div.lastChild){
		    	div.removeChild(div.lastChild);
		    }
    	}
    	for(var i = 0; i < obj.data.length; i++){		//遍历行
	    	for(var j = 0; j < obj.data[i].length; j++){		//遍历单元格
	    		var unitDiv = document.createElement("div");
		    	this._getDom(obj.id + i).appendChild(unitDiv);
		    	if(obj.data[i][j].id){
		    		unitDiv.id = obj.data[i][j].id;
		    	}
		    	if(obj.data[i][j].text){
		    		unitDiv.innerHTML = obj.data[i][j].text;
		    	}
		    	if(obj.rowStyle[j]){
		    		unitDiv.className = obj.rowStyle[j];
		    	}
		    	if(obj.data[i][j].display){
		    		unitDiv.style.display = "block";
		    	}
	    	}
    	}
    }
     
     /*
     * function: 把数据进行分页
     * params:  obj:	limits: 每页的行数
     * 					data: 所要分页的全部数据
     * return: 分页后的数据(数组类型)
     * */
    this.dataListPaging = function(obj){
    	var pagingDataArr = new Array();	//分页后的数组，下标为页数减1
    	var everyPageData = new Array();	//每页数据的数组
    	var j = 0;
    	for(var i = 0; i < obj.data.length; i++){
    		everyPageData.push(obj.data[i]);
    		if(everyPageData.length == obj.limits || i == (obj.data.length-1)){
    			pagingDataArr.push(everyPageData);
    			everyPageData = [];
    		}
    	}
    	return pagingDataArr;
    };
    
    this.removeList = function(){		//销毁list
    	var node = document.getElementById(this.listId);
	    if (node) {
	        node.parentNode.removeChild(node);
	    }
    };
}
