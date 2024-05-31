// 初始化数据
var allData = [];
for(var i = 0; i < xNum+4; i++){
    allData[i] = [];
    for(var j = 0; j < yNum; j++){
        allData[i][j] = 0;
    }
}
var nextData = [];
for(var i = 0; i < 3; i++){
    nextData[i] = [];
    for(var j = 0; j < 3; j++){
        nextData[i][j] = 0;
    }
}
// 是否开始下一块
var isNext = false;
var currentBlock = nextBlock();

// 模块进入主页面初始位置
var initSiteX = 4-currentBlock[0].length;
var initSiteY = 5;


// 监听键盘事件
document.addEventListener('keydown', function(event){
    // 把移动前位置还原为空
    for(var i = 0; i < currentBlock.length; i++){
        for(var j = 0; j < currentBlock[i].length; j++){
            if(currentBlock[i][j] == 1){
                allData[i+initSiteX][j+initSiteY] = 0;
            }
        }
    }
    if(event.key == 'ArrowLeft'){
        leftMove();
    }
    if(event.key == 'ArrowRight'){
        rightMove();
    }
    if(event.key == 'ArrowUp'){
        currentBlock = rotate(currentBlock);
    }
    if(event.key == 'ArrowDown'){
        downMove();
    }
    console.log(allData)
    // 根据新数据重新渲染画布
    renderChessBoard(context, currentBlock);
})

// 管理数据
function refreshAllData(data, x, y){
    // 把模块数据添加到总数据中
    for(var i = 0; i < data.length; i++){
        for(var j = 0; j < data[i].length; j++){
            if(data[i][j] == 1){
                allData[i+x][j+y] = 2;
            }
        }
    }
    return allData;
}

// 随机返回一个类型模块
function randomType(){
    var allType = [
        [
            [1,1],
            [1,1],
        ],//O
        [
            [0,1,0],
            [1,1,0],
            [0,1,0],
        ],//T
        [
            [0,1,0],
            [0,1,0],
            [0,1,1],
        ],//L
        [
            [0,1,0],
            [0,1,0],
            [1,1,0],
        ],//J
        [
            [0,0,1],
            [0,1,1],
            [0,1,0],
        ],//Z
        [
            [1,0,0],
            [1,1,0],
            [0,1,0],
        ],//S
        [
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
        ],//I

    ];
    var typeNo = Math.floor(Math.random()*7);
    return allType[typeNo];
}
// 根据数据渲染画面
function renderChessBoard(cxt, currentBlock){
    cxt.clearRect(around,topSpace+around,yNum*aWidth,xNum*aWidth);
    cxt.rect(around,topSpace+around,yNum*aWidth,xNum*aWidth);
    context.clip();
    drawChessBoard(cxt);

    // 将小块添加到总数据中
    for(var i = 0; i < currentBlock.length; i++){
        for(var j = 0; j < currentBlock[i].length; j++){
            allData[i+initSiteX][j+initSiteY] = currentBlock[i][j];
        }
    }
    // 遍历总数据并渲染
    for(var i = initSiteX; i < allData.length; i++){
        for(var j = 0; j < yNum; j++){
            if(allData[i][j] == 2){
                drawChess(cxt, i, j, around+1, around+1+topSpace, '2');
            }else if(allData[i][j] == 1){
                drawChess(cxt, i, j, around+1, around+1+topSpace, '1');
            }
        }
    }
}
// 旋转函数
function rotate(block){
    var newBlock = [];
    newBlock = JSON.parse(JSON.stringify(block));
    for(var i = 0; i < block.length; i++){
        for(var j = 0; j < block[i].length; j++){
            newBlock[i][j] = block[block[i].length - 1 - j][i];
        }
    }
    return newBlock;
}
// 左移
function leftMove(){
    initSiteY -= 1;
    if(initSiteY <= 0){
        initSiteY = 0;
    }
}
// 右移
function rightMove(){
    initSiteY += 1;
    if(initSiteY >= yNum - currentBlock[0].length){
        initSiteY = yNum - currentBlock[0].length;
    }
}
// 下移
function downMove(){
    initSiteX += 1;
    if(initSiteX >= allData.length-currentBlock.length){
        initSiteX = allData.length-currentBlock.length;
    }
    if(initSiteX+currentBlock.length >= allData.length){
        allData = refreshAllData(currentBlock, initSiteX, initSiteY);
        isNext = true;
    }
    // for(var i = 0; i < currentBlock.length; i++){
    //     for(var j = 0; j < currentBlock[i].length; j++){
    //         if(allData[i+x][j+y] == 2 && currentBlock[i][j] == 1){
    //             isNext = true;
    //             allData = refreshAllData(currentBlock, x, y);
    //         }
    //     }
    // }
    // 遍历所有小块都没有遮挡才能移动
    var isMove = true;
    // for(var i = 0; i < currentBlock.length; i++){
    //     for(var j = 0; j < currentBlock[i].length; j++){
    //         if(allData[i+x][j+y] == 2 && currentBlock[i][j] == 1){
    //             isMove = false;
    //             isNext = true;
    //             allData = refreshAllData(currentBlock, x, y);
    //         }
    //     }
    // }
    // if(isMove){
        // for(var i = 0; i < currentBlock.length; i++){
        //     for(var j = 0; j < currentBlock[i].length; j++){
        //         allData[i+x][j+y] = currentBlock[i][j];
        //     }
        // }
    // }
    if(isNext){
        isMove = true;
        nextBlock();
    }
}
// 下一个模块
function nextBlock(){
    var nextBlock = randomType();
    currentBlock = nextBlock;
    context.clearRect(canvas.width-around-rightSpace+10, around*3+topSpace,4*aWidth,4*aWidth);
    drawNextBlock(context);
    for(var i = 0; i < nextBlock.length; i++){
        for(var j = 0; j < nextBlock[i].length; j++){
            if(nextBlock[i][j] == 1){
                drawChess(context, i, j, canvas.width-around-rightSpace+11+aWidth, around*3+topSpace+4*aWidth+1, '1');
            }
        }
    }
    initSiteX = 4-currentBlock[0].length;
    initSiteY = 5;
    return currentBlock;
}