$(function(){
    Morris.Bar({
      element :'myfirstchart',
      data :[
        {x :'英语', y :3, z :2, a :3},
        {x :'语文', y :2, z :3, a :1},
        {x :'数学', y :2, z :2, a :4},
        {x :'物理', y :2, z :4, a :3}
      ],
      xkey: 'x',
      ykeys: ['y', 'z', 'a'],
      labels :['小学', '初中', '高中'],
      barColors:["#ef7d8a","#f88f55","#ecdc88"],//更换颜色
      //barSizeRatio:0.1//改变宽度，
      //barGap:8,//柱状图之间的间隙
    }).on('click', function(i, row){
      console.log(i, row);
  });
});