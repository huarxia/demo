//验证页面内所有必填项是否输入并且符合填写要求，是返回true
$.fn.extend({
	checked:function(){
		var val = true;
		//判断input是否符合办好判断type="file"
		$(this).find("input").each(function(){
			if($(this).is(":visible")){
				if($(this).attr("type")=="file"){
					//如果是file的input那么需判断他的父级.uploadfile是否有，这个在ajax请求时成功需要给他加上，不成功清空
					if($(this).parents(".uploadfile").attr("val")==""){
						val =false;
						$(this).siblings(".message").show();
					}
				}else if($(this).attr("type")=="checkbox"){
					if(!$(this).is(':checked')){
						val =false;
						$(this).siblings(".message").show();
					}
				}else if($(this).attr("type")!="file" && $(this).attr("type")!="checkbox"){
					if($(this).val()==""){
						val =false;
						$(this).siblings(".message").show();
					}else if($(this).val()!="" && !verifyRule($(this))){
						val =false;
						$(this).siblings(".message").show();
					}
				}
			}
		});
		$(this).find("select").each(function(){
			if($(this).val()=="0"){
				val =false;
				$(this).siblings(".message").show();
			}
		});
		$(this).find("textarea").each(function(){
			if($(this).val()=="" || $(this).val()==null){
				val =false;
				$(this).siblings(".message").show();
			}
		});
		return val;
	}
});

//当失去焦点或者改变select时符合规则则隐藏提示信息
$.fn.extend({
	changedVal:function(){
		$(this).find("input").each(function(){
			var msg0 = $(this).siblings(".message").text();
			$(this).blur(function(){
				if($(this).val()!=""){
					if(!verifyRule($(this))){
						$(this).siblings(".message").show();
					}else{
						$(this).siblings(".message").hide();
					}
				}else{
					$(this).siblings(".message").text(msg0);
					$(this).siblings(".message").show();
				}
			});
		});
		$(this).find("select").each(function(){
			$(this).change(function(){
				if($(this).val()=="0"){
					$(this).siblings(".message").show();
				}else{
					$(this).siblings(".message").hide();
				}
			});
		});
		$(this).find("textarea").each(function(){
			$(this).blur(function(){
				if($(this).val()!=""){
					$(this).siblings(".message").hide();
				}else{
					$(this).siblings(".message").show();
				}
			});
		});
	}
});
//验证手机、邮箱是否符合规则
function verifyRule(obj){
	var valRule = true;
	if(obj.hasClass("tel") && !obj.val().match(/^1[3|5|8|7]\d{9}$/)){
		obj.siblings(".message").text("*请输入11位手机号码");
		valRule = false;
	}else if(obj.hasClass("email") && !obj.val().match(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/)){
		obj.siblings(".message").text("*请输入正确邮箱地址");
		valRule = false;
	}
	return valRule;
}