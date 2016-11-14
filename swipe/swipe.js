;function Swipe(id){
	this.id=id;
	this.settings={
		dots:true,
		loop:true,
		autoplay:true,
		autodire:"left",
		autotime:3000
	}
}
function extend(obj1,obj2){
	for(var attr in obj2){
		obj1[attr] = obj2[attr];
	}
}
Swipe.prototype.init=function(opt){
	//阻止浏览器默认的行为
	document.ontouchmove=function(ev){
		ev.preventDefault();
	}
	var _this = this;
	this.oDiv = document.getElementById(this.id);
	this.oUl = this.oDiv.getElementsByTagName("ul")[0];
	this.aLi = this.oUl.getElementsByTagName("li");
	this.w = this.aLi[0].offsetWidth;
	this.bBtn = true;
	this.iNow = 0;
	this.autoTimer = null;
	extend(this.settings,opt);
	if(this.settings.loop){
		this.loop();
		//只有当循环播放时才允许自动播放
		if(this.settings.autoplay){
			this.iNow=1;
			clearInterval(this.autoTimer);
			this.autoplay();
		}
	}
	if(this.settings.dots){
		this.dots();//是否有小圆点
	}
	this.oUl.style.width = this.aLi.length*this.w + "px";
	this.oUl.ontouchstart=function(ev){
		_this.touchs = ev.changedTouches[0];
		_this.downX = _this.touchs.pageX;
		_this.downLeft = _this.oUl.offsetLeft;
		_this.timeNow = Date.now();//按下时的时间
		if(_this.settings.autoplay){
			clearInterval(_this.autoTimer);
		}
		_this.oUl.ontouchmove=function(ev){
			_this.touchs = ev.changedTouches[0];
			_this.move();
		}
		_this.oUl.ontouchend=function(ev){
			_this.touchs = ev.changedTouches[0];
			_this.end();
		}
	}
}
Swipe.prototype.move=function(){
	if(this.oUl.offsetLeft>=0&&(Date.now()-this.timeNow)>360){
		if(this.bBtn){
			this.downX = this.touchs.pageX;
			this.bBtn = false;
		}
		this.oUl.style.left = (this.touchs.pageX - this.downX)/3 + "px";
	}else if(this.oUl.offsetLeft<=this.oUl.parentNode.offsetWidth-this.oUl.offsetWidth&&(Date.now()-this.timeNow)>360){
		if(this.bBtn){
			this.downX = this.touchs.pageX;
			this.bBtn = false;
		}
		this.oUl.style.left = (this.touchs.pageX - this.downX)/3 + (this.oUl.parentNode.offsetWidth-this.oUl.offsetWidth) + "px";
	}else if((Date.now()-this.timeNow)>360){
		this.oUl.style.left = this.touchs.pageX - this.downX + this.downLeft + "px";
	}
}
Swipe.prototype.end=function(){
	this.oUl.ontouchmove=null;
	this.oUl.ontouchend=null;
	var _this = this;
	//如果滑动大于图片的三分之一或者快速滑动时候
	if(Math.abs(this.touchs.pageX-this.downX)>=this.w/3 || ((Date.now()-this.timeNow)<300)&&(Math.abs(this.touchs.pageX-this.downX)>30)){
		if(this.touchs.pageX<this.downX){
			if(this.iNow!=this.aLi.length-1){
				this.iNow++;
			}
		}else{
			if(this.iNow!=0){
				this.iNow--;
			}
		}
	}
	this.swipeShow();
	if(this.settings.autoplay){
		this.autoplay();
	}
}
Swipe.prototype.autoplay=function(){
	var _this=this;
	this.autoTimer = setInterval(function(){
		if(_this.iNow!=_this.aLi.length-1){
			if(_this.settings.autodire=="left"){
				_this.iNow++;
			}else if(_this.settings.autodire=="right"){
				_this.iNow--;
			}
			_this.swipeShow();
		}
	}, _this.settings.autotime);
}
Swipe.prototype.swipeShow=function(){
	var _this = this;
	startMove(this.oUl,{"left":-this.iNow*this.w},function(){
		if(_this.settings.loop&&_this.iNow==_this.aLi.length-1){
			_this.iNow = 1;
			_this.oUl.style.left = - _this.w + "px";
		}else if(_this.settings.loop&&_this.iNow==0){
			_this.iNow = _this.aLi.length-2;
			_this.oUl.style.left = - _this.w*_this.iNow + "px";
		}
	});
	for(var i=0;i<this.dotsLi.length;i++){
			this.dotsLi[i].className="";
		}
	if(this.settings.loop){
		if(this.iNow==this.aLi.length-1){
			this.iNowLoop = 0;
		}else if(this.iNow==0){
			this.iNowLoop = this.aLi.length-3;
		}else{
			this.iNowLoop = this.iNow-1;
		}
	}else{
		this.iNowLoop = this.iNow;
	}
	this.dotsLi[this.iNowLoop].className="active";
}
Swipe.prototype.dots=function(){
	var _this = this;
	this.dots = document.createElement("ul");
	this.dots.className="dots";
	var i=this.settings.loop?2:0;
	for(;i<this.aLi.length;i++){
		this.dots.innerHTML += "<li></li>";
	}
	this.dotsLi = this.dots.getElementsByTagName("li");
	this.oDiv.appendChild(this.dots);
	this.dots.style.marginLeft = -this.dots.offsetWidth/2 + "px";
	this.dots.getElementsByTagName("li")[0].className="active";
}
Swipe.prototype.loop=function(){
	this.oUl.insertBefore(this.aLi[this.aLi.length-1].cloneNode(true),this.aLi[0]);
	this.oUl.appendChild(this.aLi[1].cloneNode(true));
	this.oUl.style.left = -this.w + "px";
	this.iNow=1;
}