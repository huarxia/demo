window.onload=function(){
        var div1 = document.getElementById("div1");
        var oUl = div1.getElementsByTagName("ul")[0];
        var aLi = oUl.getElementsByTagName("li");
        var bBtn = true;
        var iNow = 0;
        var timeNow = 0;
        var w = aLi[0].offsetWidth;
        oUl.style.width = aLi.length*w + "px";
        //阻止默认的行为
        document.ontouchmove=function(ev){
            ev.preventDefault();
        }
        oUl.ontouchstart =function(ev){
            var touchs = ev.changedTouches[0];
            var downX = touchs.pageX;
            var downLeft = this.offsetLeft;
            timeNow = Date.now();//按下时的时间
            oUl.ontouchmove=function(ev){
                var touchs = ev.changedTouches[0];
                if(this.offsetLeft>=0){
                    if(bBtn){
                        downX = touchs.pageX;
                        bBtn = false;
                    }
                    this.style.left = (touchs.pageX - downX)/3 + "px";
                }else if(this.offsetLeft<=div1.offsetWidth-this.offsetWidth){
                    if(bBtn){
                        downX = touchs.pageX;
                        bBtn = false;
                    }
                    this.style.left = (touchs.pageX - downX)/3 + (div1.offsetWidth-this.offsetWidth) + "px";
                }else{
                    this.style.left = touchs.pageX - downX + downLeft + "px";
                }
            }
            oUl.ontouchend=function(ev){
                var touchs = ev.changedTouches[0];
                oUl.ontouchmove=null;
                oUl.ontouchend=null;
                //如果滑动大于图片的三分之一或者快速滑动时候
                if(Math.abs(touchs.pageX-downX)>w/3 || ((Date.now()-timeNow)<300)&&(Math.abs(touchs.pageX-downX)>30)){
                    if(touchs.pageX<downX){
                        if(iNow!=aLi.length-1){
                            iNow++;
                        }
                    }else{
                        if(iNow!=0){
                            iNow--;
                        }
                    }
                }
                startMove(this,{"left":-iNow*w});
            }
        }
    }