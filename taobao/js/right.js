window.onload = function(event){
	//处理低版本的getElementsByClassName
    if(!document.getElementsByClassName){
        document.getElementsByClassName= function(cls){
            var ret = [];
            var els = document.getElementsByTagName("*");
            for (var i = 0; i < els.length; i++){
                //判断els[i]中是否存在cls这个className;.indexOf("cls")判断cls存在的下标，如果下标>=0则存在;
                if(els[i].className === cls || els[i].className.indexOf("cls")>=0 || els[i].className.indexOf(" cls")>=0 || els[i].className.indexOf(" cls ")>0){
                    ret.push(els[i]);
                }
            }
            return ret;
        }
    }
	var vidBox = document.getElementsByClassName("vidBox")[0];
	var vt = document.getElementsByClassName("vidb_top")[0];
	var vcl = document.getElementsByClassName("vidb_center_left")[0];
	var vcc = document.getElementsByClassName("vidb_center_center")[0];
	var vcr = document.getElementsByClassName("vidb_center_right")[0];
	var vb = document.getElementsByClassName("vidb_bottom")[0];

	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
	var scrollLeft = document.documentElement.scrollLeft||document.body.scrollLeft;
	var clientWidth = document.documentElement.clientWidth ||document.body.clientWidth;
	var clientHeight = document.documentElement.clientHeight ||document.body.clientHeight;
	var disX = 0;
	var disY = 0;
	document.oncontextmenu = function(event){
		vidBox.style.display = "block";
		vcc.style.top = event.clientY+scrollTop - vcc.offsetHeight +"px";
		vcc.style.left = event.clientX+scrollLeft - vcc.offsetWidth +"px";
		fixed();
		//当鼠标按下时计算鼠标与拖拽对象的距离
		disX = event.clientX+scrollLeft-vcc.offsetLeft;
		disY = event.clientY+scrollTop-vcc.offsetTop;
		document.onmousemove=function(event){
			//当鼠标拖动时计算div的位置
			var l = event.clientX -disX;
			var t = event.clientY -disY;
			//不让用户拖出可视区域
			if(l<=0){
				l=0;
			}else if(l>document.documentElement.clientWidth-vcc.offsetWidth){
				l=document.documentElement.clientWidth-vcc.offsetWidth
			}
			if(t<0){
				t=0
			}else if(t>document.documentElement.clientHeight-vcc.offsetHeight){
				t =document.documentElement.clientHeight-vcc.offsetHeight
			}
			vcc.style.left = l + "px";
			vcc.style.top = t + "px";
			fixed();
		}
		document.onmouseup = function(){
			vidBox.style.display = "none";
			document.onmousemove = null;//当鼠标弹起时移出移动事件
			document.onmouseup = null;//移出up事件，清空内存
		}
		return false;//低版本出现禁止符号
	} 
	function fixed(){
		vt.style.height = vcc.offsetTop + "px";
		vb.style.height = clientHeight - vcc.offsetTop - vcc.offsetHeight + "px";

		vcl.style.width = vcc.offsetLeft + "px";
		vcl.style.top = vcc.offsetTop + "px";

		vcr.style.width = clientWidth - vcl.offsetWidth - vcc.offsetWidth + "px";
		vcr.style.top = vcc.offsetTop + "px";
	}
}