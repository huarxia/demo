$(function(){
	$(".autor").changedVal();
	$(".submit").click(function(){
		if($(".autor").checked()){;
			alert("上传成功");
		}
	});
});