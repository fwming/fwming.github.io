// 行线数量
var xNum = 15;
// 纵线数量
var yNum = 10;
// 间隔大小
var aWidth = 20;
// 棋盘四周留白
var around = 15;
// 右边预告空间
var rightSpace = 100;
// 头部空间
var topSpace = 2*around;

// 获取画布信息
var canvas = document.getElementById('canvas');
canvas.width = yNum*aWidth + around*3 + rightSpace;
canvas.height = xNum*aWidth + around*2 + topSpace;
var context = canvas.getContext('2d');

// 设置标题
context.font = 'bolder 130% Arial';
// context.font = 'bolder 18px Arial';
context.textAlign = 'center';
context.textBaseline = 'middle';
var linearGrad = context.createLinearGradient(0,0, canvas.width, 0);
linearGrad.addColorStop(0, '#9b21da');
linearGrad.addColorStop(1, '#d9e017');
context.fillStyle = linearGrad;
context.fillText('TETRIS-俄罗斯方块', canvas.width/2, (topSpace+around)/2);

// 线条样式
context.strokeStyle = 'rgba(238,238,238,1)';
// 绘制棋盘
drawChessBoard(context);

// 右侧信息栏
context.font = 'bolder 110% Arial';
context.rect(aWidth*yNum+around*2,topSpace+around, rightSpace,canvas.height-topSpace-around*2);
context.fillText('下一个',canvas.width-around-rightSpace/2,topSpace+around*3);

context.fillText('总得分',canvas.width-around-rightSpace/2,topSpace+aWidth*7+around*2);
context.fillStyle = '#000';
context.font = 'bold 14px Arial';
context.fillText('1234567890',canvas.width-around-rightSpace/2,topSpace+aWidth*8+around*2);


// 绘制棋盘
function drawChessBoard(cxt){
    cxt.lineWidth = 1;
    // 绘制行线
    for(var i = 0; i < xNum+1; i++){
        cxt.moveTo(around, i*aWidth+around+topSpace);
        cxt.lineTo(yNum*aWidth+around, i*aWidth+around+topSpace);
        cxt.stroke();
    }
    // 绘制纵线
    for(var i = 0; i < yNum+1; i++){
        cxt.moveTo(i*aWidth+around, around+topSpace);
        cxt.lineTo(i*aWidth+around, xNum*aWidth+around+topSpace);
        cxt.stroke();
    }
}
// 绘制nextBlock
function drawNextBlock(cxt){
    // 绘制行线
    for(var i = 0; i < 5; i++){
        cxt.moveTo(canvas.width-around-rightSpace+10, around*4+topSpace+i*aWidth);
        cxt.lineTo(canvas.width-around-10, around*4+topSpace+i*aWidth);
        cxt.stroke();
    }
    // 绘制纵线
    for(var i = 0; i < 5; i++){
        cxt.moveTo(canvas.width-around-rightSpace+10+i*aWidth, around*4+topSpace);
        cxt.lineTo(canvas.width-around-rightSpace+10+i*aWidth, around*4+topSpace+4*aWidth);
        cxt.stroke();
    }
}
// 根据位置和类型绘制, x:第几行，y:第几列
function drawChess(cxt, x, y, dx, dy, type){
    cxt.beginPath();
    cxt.rect(y*aWidth+dx, x*aWidth+dy, (aWidth-2), (aWidth-2));
    cxt.closePath();
    if(type == '1'){
        cxt.fillStyle = '#1881ec';
    }else if(type == '2'){
        cxt.fillStyle = '#506614';
    }
    
    cxt.fill();
}