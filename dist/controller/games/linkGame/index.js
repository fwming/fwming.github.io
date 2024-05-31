$(function () {
    // 获取浏览器可视区域宽、高，限制最大宽度为1250px
    // var window_width = $(window).width() > 1250 ? 1250 : $(window).width();
    // var window_height = $(window).height();

    var window_width = $('.layui-body').width() > 1250 ? 1250 : $('.layui-body').width();
    var window_height = $('.layui-body').height() - $('.layadmin-header').height();
  
    // 第一种计算方法，感觉列数的奇偶判断
    //方块td宽度
    var cellWidth = Math.floor(window_width/50)%2==0 && window_width < 600 ? 50 : Math.floor(window_width/60)%2==0 && window_width < 1260 ? 60 : Math.floor(window_width/70)%2==0 ? 70 : 80;
    //方块td高度
    var cellHeight = Math.floor(window_width/50)%2==0 && window_width < 600 ? 50 : Math.floor(window_width/60)%2==0 && window_width < 1260 ? 60 : Math.floor(window_width/70)%2==0 ? 70 : 80;
    //方块padding值
    var cellPadding = 15;
  
    // 第二种计算方法，根据宽度范围直接赋值
    // if(window_width > 1000){
    //   cellWidth = cellHeight = 80;
    // }else if(window_width > 800){
    //   cellWidth = cellHeight = 70;
    // }else if(window_width > 600){
    //   cellWidth = cellHeight = 60;
    // }else{
    //   cellWidth = cellHeight = 50;
    // }
  
    $('.wrapper').css({'width': window_width+'px','height': window_height+'px'});
    $('.start-btn').click(function () {
      $('audio').get(0).play();
      $('.init-box').addClass('hidden');
      $('.game-box').removeClass('hidden');
  
      
      var toolbar_height = $('.toolbar').height();
      // 控制cols和rows至少有一个是偶数
      var rows = Math.floor((window_height - toolbar_height) / cellHeight) * cellHeight + toolbar_height <= window_height ? Math.floor((window_height - toolbar_height) / cellHeight) : Math.floor((window_height - toolbar_height) / cellHeight) - 1;
      var cols = Math.floor(window_width / cellWidth) % 2 == 0 ? Math.floor(window_width / cellWidth) : rows % 2 == 0 ? Math.floor(window_width / cellWidth) : Math.floor(window_width / cellWidth) - 1;
  
  
      console.log(window_width, rows, cols, cellWidth);
  
      $('.game-area').css({'width': cols*cellWidth + 'px'});
  
      // 动态修改css参数
      console.log(cellHeight, cellWidth, $('.layui-fluid .wrapper'));
      $('.wrapper').css({'--cell-height': cellHeight+'px'});
      $('.wrapper').css({'--cell-width': cellWidth+'px'});
      
      var gameConfig = { //初始化参数配置
        cellWidth: cellWidth - cellPadding*2, //游戏主体图片宽度 = td宽度 - padding*2
        cellHeight: cellHeight - cellPadding*2, //游戏主体图片高度 = td高度 - padding*2      
        cellPadding: cellPadding, //格子padding值
        rows: rows, //行数
        cols: cols, //列数
        level: 0, //等级
        strokeStyle: 'red', //连接线条颜色
        lineWidth: 3, //线条宽度
        leftTimes: Math.floor(rows*cols*1.5), //倒计时(秒)
      }
      new LinkGame(gameConfig).init();
    });
  });