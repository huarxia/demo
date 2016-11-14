function changeNum(num){
	var cnNums = ["零","一", "二", "三", "四", "五", "六", "七", "八", "九"]; //汉字的数字
　　var cnIntRadice = ["", "十", "百", "千","万"]; //基本单位
	var numArr = num.split("");
	var numLen = numArr.length;
	var str = "";
	for(var i=0;i<numLen;i++){
		if(numLen==2 && num !=10){
			i++;
			str+= cnIntRadice[numLen-i] + cnNums[parseInt(numArr[i])];
		}else if(numLen==2 && num ==10){
			str = "十";
		}if(numLen==3 && num !=100){
			i++;
			str+= cnIntRadice[numLen-i] + cnNums[parseInt(numArr[i])];
		}else if(numLen==3 && num ==100){
			str = "一百";
		}else{
			str+= cnNums[parseInt(numArr[i])]+cnIntRadice[numLen-i-1];
		}
	}
	return str;
}