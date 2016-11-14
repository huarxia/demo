var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 425;
var ballCorlor = "rgb(0,102,153)";//小圆的颜色
var RADIUS = 8;//小圆的半径
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
 
var curShowTimeSeconds = 0;//定义一个变量为当前到结束时间所有的毫秒数
var balls = [];//定义一个数组来存放产生的彩色掉落小球
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]//掉落小球随机颜色对照表
window.onload=function(){
    var canvas = document.getElementById("canvas");
    if(canvas.getContext("2d")){
        var context = canvas.getContext("2d");
    }
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    CurShowTimeSeconds = getCurShowTimeSeconds();
    setInterval(function(){//动画函数包含构建时间的显示即动画的update更新
        render(context);
        update();
    },50);
}
function update(){
    var nextShowTimeSeconds = getCurShowTimeSeconds();
    var nextHours = parseInt(nextShowTimeSeconds/3600);//获得倒计时下一次的小时数
    var nextMinutes = parseInt(nextShowTimeSeconds-nextHours*3600)/60;//获得倒计时下一次的分钟数
    var nextSeconds = nextShowTimeSeconds%60;//获得倒计时下一次的秒数
 
    var curHours = parseInt(CurShowTimeSeconds/3600);//获得倒计时的小时数
    var curMinutes = parseInt(CurShowTimeSeconds-curHours*3600)/60;//获得倒计时的分钟数
    var curSeconds = CurShowTimeSeconds%60;//获得倒计时的秒数
    if(nextSeconds!=curSeconds){
        if(parseInt(curHours/10)!=parseInt(nextHours/10)){
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHours/10));
        }
        if(parseInt(curHours%10)!=parseInt(nextHours%10)){
            addBalls(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(curHours%10));
        }
        if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
            addBalls(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes/10));
        }
        if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
            addBalls(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes%10));
        }
        if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
            addBalls(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds/10));
        }
        if(parseInt(curHours%10)!=parseInt(nextSeconds%10)){
            addBalls(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds%10));
        }
        CurShowTimeSeconds=nextShowTimeSeconds;
    }
    updateBalls();
}
function updateBalls(){
    for(var i=0;i<balls.length;i++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if(balls[i].y>WINDOW_HEIGHT){
            balls[i].y = WINDOW_HEIGHT;
            balls[i].vy = -balls[i].vy*0.65;
        }
    }
    //减少内存让跳出显示画布外的小球从数组中移除
    var cnt = 0
    for( var i = 0; i < balls.length; i ++ ){
        if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WINDOW_WIDTH ){
            balls[cnt++] = balls[i];
        }
    }
    while(balls.length > cnt){
        balls.pop();
    }
}
function addBalls(x,y,num){
    for(var i=0; i<digit[num].length; i++){//该数字的点阵行
        for(var j=0; j<digit[num][i].length; j++){//该数字的点阵列
            if(digit[num][i][j]==1){
                var aBall ={
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),//x方向的坐标
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),//y方向的坐标
                    g:1.5+Math.random(),//y方向的加速度
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 5,//x方向的速度
                    vy:-5,//y方向的速度
                    color: colors[ Math.floor( Math.random()*colors.length ) ]//小球的颜色值
                }
                balls.push( aBall );
            }
            //console.log(balls);
        }
    }
}
function getCurShowTimeSeconds(){
    var curTime = new Date();//获取单签时间
    var ret = curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();//获取当前时间已经走了多少秒
    return ret>=0?ret:0;//如果当前到结束时间所有的秒数不大于等于0则让其等于0
}
function render(cxt){
    cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height);//对矩形画布内进行刷新以免图形重叠
    var hours = parseInt(CurShowTimeSeconds/3600);//获得倒计时的小时数
    var minutes = parseInt(CurShowTimeSeconds-hours*3600)/60;//获得倒计时的分钟数
    var seconds = CurShowTimeSeconds%60;//获得倒计时的秒数
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10),cxt);//小时的十位
    renderDigit(MARGIN_LEFT+15*(RADIUS+1), MARGIN_TOP, parseInt(hours%10),cxt);//小时的个位
    renderDigit(MARGIN_LEFT+30*(RADIUS+1), MARGIN_TOP, 10,cxt);//：
    renderDigit(MARGIN_LEFT+39*(RADIUS+1), MARGIN_TOP, parseInt(minutes/10),cxt);//分钟的十位
    renderDigit(MARGIN_LEFT+54*(RADIUS+1), MARGIN_TOP, parseInt(minutes%10),cxt);//分钟的个位
    renderDigit(MARGIN_LEFT+69*(RADIUS+1), MARGIN_TOP, 10,cxt);//：
    renderDigit(MARGIN_LEFT+78*(RADIUS+1), MARGIN_TOP, parseInt(seconds/10),cxt);//秒的十位
    renderDigit(MARGIN_LEFT+93*(RADIUS+1), MARGIN_TOP, parseInt(seconds%10),cxt);//秒的个位
    for( var i = 0; i < balls.length; i ++ ){
        cxt.fillStyle=balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true);
        cxt.closePath();
        cxt.fill();
    }
}
function renderDigit(x,y,num,cxt){//从digit.js文件中遍历数字要绘出的数字点阵
    cxt.fillStyle = ballCorlor;//小球的颜色
    for(var i=0; i<digit[num].length; i++){//该数字的点阵行
        for(var j=0; j<digit[num][i].length; j++){//该数字的点阵列
            if(digit[num][i][j]==1){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS, 0, 2*Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}