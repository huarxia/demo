;function Dialog(){
	this.oDialog = null;
	this.settings={
		width:400,
		height:280,
		title:"",
		dir:"center",
		mark:false,
	}
}
function extend(obj1,obj2){
	for(var attr in obj2){
		obj1[attr] = obj2[attr];
	}
}
Dialog.prototype.init=function(opt){
	extend(this.settings,opt);
	if(this.json[opt.id]==undefined){
		this.json[opt.id] = true;
	}
	if(this.json[opt.id]){
		this.create();
		if(this.settings.mark){
			this.mark();
		}
		this.close();
		this.json[opt.id]=false;
	}
}
Dialog.prototype.json={}
Dialog.prototype.create=function(){
	this.oDialog = document.createElement("div");
	this.oDialog.className = "dialog";
	this.oDialog.innerHTML= "<div class='title'><span>"+this.settings.title+"</span><span class='close'>X</span></div><div class='content'></div>";
	document.body.appendChild(this.oDialog);
	this.setData();
}
Dialog.prototype.setData=function(){
	this.oDialog.style.width = this.settings.width + "px";
	this.oDialog.style.height = this.settings .height+ "px";
	if(this.settings.dir == "center"){
		this.oDialog.style.left = parseInt((viewWidth()-this.oDialog.offsetWidth)/2) + "px";
		this.oDialog.style.top = parseInt((viewHeight()-this.oDialog.offsetHeight)/2) + "px";
	}else if(this.settings.dir == "leftBottom"){
		this.oDialog.style.left = 0;
		this.oDialog.style.top = viewHeight()-this.oDialog.offsetHeight + "px";
	}else if(this.settings.dir == "rightBottom"){
		this.oDialog.style.left = viewWidth()-this.oDialog.offsetWidth + "px";
		this.oDialog.style.top = viewHeight()-this.oDialog.offsetHeight + "px";
	}
}
Dialog.prototype.mark=function(){
	var oMark = document.createElement("div");
	oMark.id="mark";
	this.oMark = oMark;
	document.body.appendChild(oMark);
	/*oMark.style.width = viewWidth()+"px";
	oMark.style.height = viewHeight()+"px";*/
}
Dialog.prototype.close=function(){
	var _this = this;
	var oClose = this.oDialog.getElementsByTagName("span")[1];
	oClose.onclick=function(){
		document.body.removeChild(_this.oDialog);
		_this.json[_this.settings.id]=true;
		_this.showNow=true;
		if(_this.settings.mark){
			document.body.removeChild(_this.oMark);
		}
	}
}
function viewWidth(){
	return document.documentElement.clientWidth;
}
function viewHeight(){
	return document.documentElement.clientHeight;
}