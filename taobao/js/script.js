function main(){
	$(document).ready(function(){
		$(".fix_nav_r li").mouseenter(function(){
			$(this).find(".menu-hd").css({"background":"white","height":36}).siblings(".menu-bd").show();
		});
		$(".fix_nav_r li").mouseleave(function(){
			$(this).find(".menu-hd").css({"background":"none"}).siblings(".menu-bd").hide();
		});
		$(".tb-phone-exit").click(function(){
			$(".tb-phone").hide();
		});
		/*首页获取焦点与失去焦点*/
		var myshuru = document.getElementById("input");
		myshuru.onfocus = function(){
			if(myshuru.value == "搜\“在线洗衣\”试试，洗3件羽绒服29元"){
				myshuru.value = "";
				myshuru.style.color = "#3c3c3c"
			}
		}
		myshuru.onblur = function(){
			if(myshuru.value == ""){
				myshuru.value = "搜\“在线洗衣\”试试，洗3件羽绒服29元"
				myshuru.style.color = "#9c9c9c"
			}
		}
		/*第一个轮播*/
		/*显示箭头*/
		$(".srbl_lunbo").mouseenter(function(){
			$(this).find(".n_p").show();
		});
		$(".srbl_lunbo").mouseleave(function(){
			$(this).find(".n_p").hide();
		});
		/*复制第一个元素以防止露馅，并动态设置ul的宽度*/
		$(".srbl_ul").each(function(){
			$(this).find("li").eq(0).clone(true).appendTo($(this));
			$(this).css({"width":$(this).find("li").width()*$(this).find("li").length});
		});
		/*轮播开始*/
			/*点击右按钮*/
			var nowshow1 = 0;
			var nowshow2 = 0;
			var nowshow = null;
			var lunboshijian=520;
			var timer1 = null;
			/*动态设置小圆点个数*/
			var t_yuandianul = document.getElementById("t_yuandianul");
			var b_yuandianul = document.getElementById("b_yuandianul");
			var t_n_p_yuandianul = $(".t_n_p_yuandian");
			var b_n_p_yuandianul = $(".b_n_p_yuandian");
			dianNum(t_yuandianul,t_n_p_yuandianul);
			dianNum(b_yuandianul,b_n_p_yuandianul);
			function dianNum(obj1,obj2){
				    var numli = obj2.siblings(".srbl_ul").find("li").length;
					for(var i = 0 ; i < numli-1; i++){
					var mynewli = document.createElement("li");
					obj1.appendChild(mynewli);//appendChild()方法只有JS才能使用
				}
			}
			$(".np_box_n").each(function(){
				shezhixiaoyuandian(0,this);//设置第一个原点为橙色
			});
			function dianTagName(obj){
			    var li_length=obj.parents("ul").siblings(".n_p_yuandian").find("li").length;
			     for(var i=0;i<li_length;i++) {
			    	 //得到想找的这个对象
			    	 if(obj.parents("ul").siblings(".n_p_yuandian").find("li").eq(i).hasClass("dian_cur")){
			    	 	 return i;
			    	 }
			    }
			}
			/*右按钮*/
			$(".t_next").click(function(){
				var thisobj = $(this);
				nowshow1 = dianTagName(thisobj);
				nextShow(nowshow1,thisobj);
			});
			$(".b_next").click(function(){
				var thisobj = $(this);
				nowshow2 = dianTagName(thisobj);
				nextShow(nowshow2,thisobj);
			});
			/*左按钮*/
			$(".t_prev").click(function(){
				var thisobj = $(this);
				nowshow1 = dianTagName(thisobj);
				prevShow(nowshow1,thisobj);
			});
			$(".b_prev").click(function(){
				var thisobj = $(this);
				nowshow2 = dianTagName(thisobj);
				prevShow(nowshow2,thisobj);
			});
			function nextShow(nowshow,thisobj){
				$(".srbl_ul").stop();
				//if(!$(".srblt_ul").is(":animated")){
					if(nowshow == thisobj.parents(".n_p").siblings(".srbl_ul").find("li").length - 2){
						nowshow = 0;
						lunboxianshi2(thisobj);
					}else{
						nowshow = nowshow + 1;
						lunboxianshi(nowshow,thisobj);
					}
					shezhixiaoyuandian(nowshow,thisobj);
					return nowshow;
				//}
			}
			function prevShow(nowshow,thisobj){
				$(".srbl_ul").stop();
				//if(!$(".srblt_ul").is(":animated")){
					if(nowshow == 0){
						nowshow = thisobj.parents(".n_p").siblings(".srbl_ul").find("li").length - 2;
						lunboxianshi3(thisobj);
					}else{
						nowshow = nowshow - 1;
						lunboxianshi(nowshow,thisobj);
					}
					shezhixiaoyuandian(nowshow,thisobj);
					return nowshow;
				//}
			}
			//小圆点移上轮播
			$(".n_p_yuandian li").mouseenter(
				function(){
					$(".srbl_ul").stop();
					nowshow = $(this).index();
					lunboxianshi(nowshow,$(this));
					$(this).addClass("dian_cur").siblings("li").removeClass("dian_cur");
				}
			);
			function lunboxianshi(nowshow,thisobj){
			 	thisobj.parents("ul").siblings(".srbl_ul").animate(
			 		{
			 			"left":-520 * nowshow
			 		},lunboshijian
			 	);
			}
			function lunboxianshi2(thisobj){
			 	thisobj.parents("ul").siblings(".srbl_ul").animate(
			 		{
			 			"left":-520 * (thisobj.parents("ul").siblings(".srbl_ul").find("li").length - 1)
			 		},lunboshijian,function(){
			 			thisobj.parents("ul").siblings(".srbl_ul").css("left",0);
			 		}
			 	);
			}
			function lunboxianshi3(thisobj){
				thisobj.parents("ul").siblings(".srbl_ul").css("left",-520 * (thisobj.parents(".n_p").siblings(".srbl_ul").find("li").length - 1));
				thisobj.parents("ul").siblings(".srbl_ul").animate(
			 		{
			 			"left":-520 * (thisobj.parents(".n_p").siblings(".srbl_ul").find("li").length - 2)
			 		},lunboshijian
			 	);
			}
			//对小圆点的背景进行设置
			function shezhixiaoyuandian(nowshow,thisobj){
				$(thisobj).parents(".n_p").siblings(".n_p_yuandian").find("li").eq(nowshow).addClass("dian_cur").siblings("li").removeClass("dian_cur");
			}
			/*上帝之手点击自动轮播*/
			/*zidong(4000,$(".t_next"));
			zidong(3682,$(".b_next"));
			function zidong(shijianjiange,obj){
				timer1 = window.setInterval(function(){
		 				$(obj).trigger("click");
		 			}
	 			,shijianjiange);
			}*/
			/*右边选项卡*/
			$(".right_nav_hd li").mouseenter(function(){
				$(this).addClass("licur").siblings("li").removeClass("licur");
				$(".right_nav_bd_li").eq($(this).index()).show().siblings(".right_nav_bd_li").hide();
			});
			$(".mod").mouseenter(function(){
				$(this).addClass("mod-hover").siblings(".mod").removeClass("mod-hover");
			});
			$(".mod").mouseenter(function(){
				$(".bm_bd_box").eq($(this).index()).show().siblings(".bm_bd_box").hide();
				$(".bm_bd_box_close").click(function(){
					$(".bm_bd_box").hide();
				});
			});
			/*充值*/
			$(".bft_a").mouseenter(function(){
				$(this).addClass("bft_a_current").siblings("a").removeClass("bft_a_current");
				$(".box_find_tabs_body").stop();
				$(".box_find_tabs_body").animate({"left":-300*$(this).index()},309);
			});
			/*右边宝贝推荐*/
			$(".discover-item").mouseenter(function(){
				$(this).find(".preference-trigger-wrapper").css({"height":32});
			});
			$(".discover-item").mouseleave(function(){
				$(".preference-trigger-wrapper").css({"height":0});
			});
			$(".item").mouseenter(function(){
				$(this).find(".item-hover").show();
			}).mouseleave(function(){
				$(".item-hover").hide();
			});
			/*返回顶部*/
			$(".go-top").click(function(){
				$("html,body").animate({"scrollTop":0},1000);
			});
			/*遮罩*/
			/*$(".zhezhao").css({"width":$(window).width(),"height":$(window).height()});
			$("a").click(function(){
				$(".zhezhao").show().animate({"opacity":0.75},618).delay(10000).animate({"opacity":1},1000);
			});*/
	});
}