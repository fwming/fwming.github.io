// 行线数量
var xNum = Math.floor(document.getElementById('canvasBox').offsetHeight / 30) || 25;
// 纵线数量
var yNum = Math.floor((document.getElementById('canvasBox').offsetWidth - 20) / 30) || 25;
// 间隔大小
var aWidth = 30;
// 棋子半径
var R = 12;
// 棋盘四周留白
var around = 15;
// 下棋方
var isMe = true;

// 获取画布信息
var canvas = document.getElementById('canvas');
canvas.width = (yNum-1)*aWidth + around*2;
canvas.height = (xNum-1)*aWidth + around*2;
var context = canvas.getContext('2d');

// var linearGrad = context.createLinearGradient(0, 0, canvas.width, canvas.height);
// var linearGrad = context.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/3, canvas.height/3, canvas.width);

// linearGrad.addColorStop(0, '#999');
// linearGrad.addColorStop(0.5, '#999');
// linearGrad.addColorStop(1, '#999');
// context.fillStyle = linearGrad;
// context.fillRect(0, 0, canvas.width, canvas.height);


var bgImg = new Image();
bgImg.src = './img/game/gobang/bg.jpg';
bgImg.onload = function(){
    context.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    // 线条样式
    context.strokeStyle = '#bfc0bb';
    // 绘制棋盘
    drawChessBoard(context);
    // 绘制棋盘边缘刻度
    drawMark(context, xNum, yNum);
}
    

// 绘制棋盘
function drawChessBoard(cxt){
    // 绘制行线
    for(var i = 0; i < xNum; i++){
        cxt.moveTo(around, i*aWidth+around);
        cxt.lineTo((yNum-1)*aWidth+around, i*aWidth+around);
        cxt.stroke();
    }
    // 绘制纵线
    for(var i = 0; i < yNum; i++){
        cxt.moveTo(i*aWidth+around, around);
        cxt.lineTo(i*aWidth+around, (xNum-1)*aWidth+around);
        cxt.stroke();
    }
}

// 根据位置和类型绘制棋子, x:第几行，y:第几列，me: true(我方)、false(AI)
function drawChess(cxt, x, y, me){
    // cxt.beginPath();
    // cxt.arc((y*aWidth + around), (x*aWidth + around), R, 0, 2*Math.PI);
    // cxt.closePath();
    // var gradient = cxt.createRadialGradient((y*aWidth + around + R/5), (x*aWidth + around - R/5), 0, (y*aWidth + around), (x*aWidth + around), R);
    // if(me){
    //     gradient.addColorStop(0, '#cccccc');
    //     gradient.addColorStop(0.3, '#000000');
    //     gradient.addColorStop(1, '#000000');
    // }else{
    //     gradient.addColorStop(0, '#ffffff');
    //     gradient.addColorStop(1, '#aaa');
    // }
    // cxt.fillStyle = gradient;
    // cxt.fill();

    if(me){
        var bgImg1 = new Image();
        bgImg1.src = './img/game/gobang/black.png';
        bgImg1.onload = function(){
            cxt.drawImage(bgImg1, (y*aWidth + around - R), (x*aWidth + around - R), 2*R, 2*R);
        }
    }else{
        var bgImg2 = new Image();
        bgImg2.src = './img/game/gobang/blue.png';
        bgImg2.onload = function(){
            cxt.drawImage(bgImg2, (y*aWidth + around - R), (x*aWidth + around - R), 2*R, 2*R);
        }
    }

}
// 绘制棋盘边缘小刻度
function drawMark(cxt, x, y){
    cxt.fillStyle = '#908e8d'
    cxt.font = 'bold 8px Arial';
    cxt.textAlign = 'center';
    cxt.textBaseline = 'middle';
    for(var i = 0; i < x; i++){
        cxt.fillText(i, around/2, i*aWidth + around);
    }
    for(var i = 0; i < y; i++){
        cxt.fillText(i, i*aWidth + around, around/2);
    }
}