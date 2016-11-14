/*

@author:刘天泽睿；
@time：2015-08-17；
@version：v1.0.0;
@description:前端QQ功能模仿，意在制作webapp类似功能

*/
window.onload=function(){
	var bBtn = true;
	var timeNow = 0;
	var swipe = getByClass("litop");
	//阻止默认的行为
    document.ontouchmove=function(ev){
        ev.preventDefault();
    }
	for(var i=0;i<swipe.length;i++){
		swipe[i].ontouchstart=function(ev){
			//一触发就让所有的回归开始
			for(var i=0;i<swipe.length;i++){
				this.style.webkitTransition = ".182s all ease";
				swipe[i].style.webkitTransform = "translateX(0px)";
			}
            var touchs = ev.changedTouches[0];
	        var downLeft = this.offsetLeft;
	        var curX = 0;
	        var downX = touchs.pageX - curX;
	        timeNow = Date.now();//按下时的时间
	        this.ontouchmove=function(ev){
	        	var touchs = ev.changedTouches[0];
	        	var l = touchs.pageX - downX;
	        	if(touchs.pageX - downX<0){
	        		this.style.webkitTransition = "none";
	        		this.style.webkitTransform = "translateX("+l+"px)";
	        	}
	        }
	        this.ontouchend=function(ev){
	        	var touchs = ev.changedTouches[0];
	        	var l = touchs.pageX - downX;
				if(((Date.now()-timeNow))<300&&touchs.pageX - downX<0){
	        		this.style.webkitTransition = ".182s all ease";
	                this.style.webkitTransform = "translateX(-230px)";
	            }else if(((Date.now()-timeNow))>300&&touchs.pageX - downX<0){
	            	var transZRegex = /\-?[0-9]+\.?[0-9]*/g;
					var endtrX = parseInt(this.style.webkitTransform.match(transZRegex)[0]);
	            	if(endtrX<-230){
	            		this.ontouchmove=null;
	            		this.style.webkitTransform = "translateX(-230px)";
	            	}else if(endtrX>-115){
						this.style.webkitTransition = ".182s all ease";
						this.style.webkitTransform = "translateX(0px)";
					}else{
						this.style.webkitTransition = ".182s all ease";
						this.style.webkitTransform = "translateX(-230px)";
					}
	            }
                this.ontouchmove=null;
                this.ontouchend=null;
	        }
        }
	}
}
$(function(){
	//置顶、标记为未读、删除
	//删除
	$(".sc").on("touchend",function(event){
		$(this).parents("li").animate({"background":"#010101","height":0},100,function(){
			$(this).remove();
		});
		event.preventDefault();
	});
	//标记为未读
	var unread = 0;
	$(".wd").on("touchend",function(event){
		if(unread == 0){
			$(this).parents("li").children(".litop").css({"webkitTransition":"none"});
			$(this).parents("li").children(".litop").css({"webkitTransform":"translateX(0px)"});
			$(this).parents(".set").siblings(".litop").children(".msgNum").text(1).hide();
			$(this).html("标记未读");
			unread = 1;
		}else if(unread == 1){
			$(this).parents("li").children(".litop").css({"webkitTransition":"none"});
			$(this).parents("li").children(".litop").css({"webkitTransform":"translateX(0px)"});
			$(this).parents(".set").siblings(".litop").children(".msgNum").show();
			$(this).html("标记已读");
			unread = 0;
		}
	});
	//置顶
	var curIndex = -1;
	var sortSignal = true;
	$(".zd").on("touchend",function(event){
		var arr = [];
        //现将其转换为数组
        for(var i=0;i<$("#chat").children("li").length;i++){
            arr[i] = $("#chat").children("li").eq(i);
        }
        var backgroundColor = "#fff";
        //console.log(arr);
        if(sortSignal){
        	curIndex = $(this).parents("li").index();
        	backgroundColor = "#eee"
        	$(this).html("取消");
	        sortSignal = false;
        }else{
        	$(this).html("置顶");
        	backgroundColor = "white"
	        sortSignal = true;
        }
        arr[0] = arr.splice(curIndex, 1, arr[0])[0];
        for(var i=0;i<arr.length;i++){
            $("#chat").append(arr[i]);
            $("#chat").children("li").eq(curIndex).children(".litop").css({"webkitTransition":"none","webkitTransform":"translateX(0px)"});
        }
	});
});
//通过class获取元素
;function getByClass(sclass){
    var allEle = document.getElementsByTagName("*");
    var aResult = [];
    var re = new RegExp("\\b"+sclass+"\\b"); //  \\b正则表达式单词边界
    for(var i=0;i<allEle.length;i++){
        if(re.test(allEle[i].className)){
            aResult.push(allEle[i]);
        }
    }
    return aResult;
}
function getStyle(obj,attr){//解决JS兼容问题获取正确的属性值
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}