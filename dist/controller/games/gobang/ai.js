// 定义游戏是否结束
var over = false;

// 棋盘数据，初始化为0，避免重复点击覆盖
var chessBoardData = [];
for(var i = 0; i < xNum; i++){
    chessBoardData[i] = [];
    for(var j = 0; j < yNum; j++){
        chessBoardData[i][j] = 0;
    }
}

// 赢法三维数组，count:表示第几种赢法
// wins[i][j][count]
var wins = [];
var count = 0;
wins = initWins(xNum, yNum).wins;
count = initWins(xNum, yNum).count;
// 统计所有赢法，x:行数，y:竖数
function initWins(x, y){
    var count = 0;
    var wins = [];
    // 定义一个三维数组
    for(var i = 0; i < x; i++){
        wins[i] = [];
        for(var j = 0; j < y; j++){
            wins[i][j] = [];
        }
    }
    // 横向
    for(var i = 0; i < x; i++){
        for(var j = 0; j < (y-4); j++){
            // wins[0][0][0] = true
            // wins[0][1][0] = true
            // wins[0][2][0] = true
            // wins[0][3][0] = true
            // wins[0][4][0] = true

            // wins[0][1][1] = true
            // wins[0][2][1] = true
            // wins[0][3][1] = true
            // wins[0][4][1] = true
            // wins[0][5][1] = true            
            for(var k = 0; k < 5; k++){
                wins[i][j+k][count] = true;
            }
            count++;
        }
    }
    // 竖向
    for(var i = 0; i < y; i++){
        for(var j = 0; j < (x-4); j++){
            // wins[0][0][0] = true
            // wins[1][0][0] = true
            // wins[2][0][0] = true
            // wins[3][0][0] = true
            // wins[4][0][0] = true

            // wins[1][0][1] = true
            // wins[2][0][1] = true
            // wins[3][0][1] = true
            // wins[4][0][1] = true
            // wins[5][0][1] = true
            for(var k = 0; k < 5; k++){
                wins[j+k][i][count] = true;
            }
            count++;
        }
    }
    // 斜线
    for(var i = 0; i < (x-4); i++){
        for(var j = 0; j < (y-4); j++){
            for(var k = 0; k < 5; k++){
                wins[i+k][j+k][count] = true;
            }
            count++;
        }
    }
    // 反斜线
    for(var i = 0; i < (x-4); i++){
        for(var j = (y-1); j > 3; j--){
            for(var k = 0; k < 5; k++){
                wins[i+k][j-k][count] = true;
            }
            count++;
        }
    }
    return {wins: wins, count: count};
}

// 赢法统计数组
var myWins = [];
var computerWins = [];
for(var i = 0; i < count; i++){
    myWins[i] = 0;
    computerWins[i] = 0;
}

// 获取画布环境
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// 监听画布点击事件
canvas.addEventListener('click', function(e){
    if(over){
        return;
    }
    if(!isMe){
        return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(y / aWidth);
    var j = Math.floor(x / aWidth);
    // 该点为空白方可下子
    if(chessBoardData[i][j] == 0){
        drawChess(context, i, j, isMe);
        chessBoardData[i][j] = 1;
        
        for(var k = 0; k < count; k++){
            if(wins[i][j][k]){
                myWins[k] ++;
                computerWins[k] = 6;
                if(myWins[k] == 5){
                    layer.msg('你赢了！');
                    over = true;
                }
            }
        }
        if(!over){
            isMe = !isMe;
            computerAI();
        }
    }        
})

// AI程序
function computerAI(){
    var myScore = [];
    var computerScore = [];
    var max = 0;
    var u = 0, v = 0;
    for(var i = 0; i < xNum; i++){
        myScore[i] = [];
        computerScore[i] = [];
        for(var j = 0; j < yNum; j++){
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }

    for(var i = 0; i < xNum; i++){
        for(var j = 0; j < yNum; j++){
            if(chessBoardData[i][j] == 0){
                for(var k = 0; k < count; k++){
                    if(wins[i][j][k]){
                        if(myWins[k] == 1){
                            myScore[i][j] += 200;
                        }else if(myWins[k] == 2){
                            myScore[i][j] += 400;
                        }else if(myWins[k] == 3){
                            myScore[i][j] += 2000;
                        }else if(myWins[k] == 4){
                            myScore[i][j] += 10000;
                        }

                        if(computerWins[k] == 1){
                            computerScore[i][j] += 220;
                        }else if(computerWins[k] == 2){
                            computerScore[i][j] += 420;
                        }else if(computerWins[k] == 3){
                            computerScore[i][j] += 2200;
                        }else if(computerWins[k] == 4){
                            computerScore[i][j] += 20000;
                        }
                    }

                }
                if(myScore[i][j] > max){
                    max = myScore[i][j];
                    u = i;
                    v = j;
                }else if(myScore[i][j] == max){
                    if(computerScore[i][j] > computerScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
                if(computerScore[i][j] > max){
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                }else if(computerScore[i][j] == max){
                    if(myScore[i][j] > myScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    if(chessBoardData[u][v] == 0){
        drawChess(context, u, v, false);
        chessBoardData[u][v] = 2;
        
        for(var k = 0; k < count; k++){
            if(wins[u][v][k]){
                computerWins[k] ++;
                myWins[k] = 6;
                if(computerWins[k] == 5){
                    layer.msg('计算机赢了');
                    over = true;
                }
            }
        }
        if(!over){
            isMe = !isMe;
        }
    }else{
        layer.msg('平局了！');
        over = true;
    }
}