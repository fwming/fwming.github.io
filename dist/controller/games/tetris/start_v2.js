// 初始化源数据，不做渲染
var sourceData = [];
for(var i = 0; i < xNum; i++){
    sourceData[i] = 0;
}
// 变化的数据，移动旋转等操作对象，固定后添加到源数据中，画布渲染的数据来源
var changeData = [];
for(var i = 0; i < xNum; i++){
    changeData[i] = 0;
}
// 是否开始下一块
var isNext = false;
var currentBlock = nextBlock();
console.log('当前模块', currentBlock);
var rows = 0;


// 模块进入游戏界面，rows表示进入第几行，初始值为0
// setInterval(function(){
//     blockIntoMain(currentBlock);
// },800);

function blockIntoMain(block){
    // nextBlock();
    console.log('进入界面的模块', block);
    // 把进来的数据添加到changeData前面
    for(var i = 0; i < xNum; i++){
        changeData[i] = 0;
    }
    rows += 1;
    console.log(rows)

    if(rows >= block.length){
        changeData = changeData.slice(0, rows - block.length).concat(block.slice(-block.length).concat(changeData.slice(0,-rows)));
    }else{
        if(rows == 1){
            changeData = block.slice(-1).concat(changeData.slice(0,-1));
        }else if(rows == 2){
            changeData = block.slice(-2).concat(changeData.slice(0,-2));
        }else if(rows == 3){
            changeData = block.slice(-3).concat(changeData.slice(0,-3));
        }
    }


    // if(rows == 1){
    //     changeData = block.slice(-1).concat(changeData.slice(0,-1));
    // }else if(rows == 2){
    //     changeData = block.slice(-2).concat(changeData.slice(0,-2));
    // }else if(rows == 3){
    //     changeData = block.slice(-3).concat(changeData.slice(0,-3));
    // }else if(rows == 4){
    //     changeData = block.slice(-4).concat(changeData.slice(0,-4));
    // }else{
    //     changeData = changeData.slice(0, rows - block.length).concat(block.slice(-block.length).concat(changeData.slice(0,-rows)));
    // }
    
    // 根据新数据重新渲染画布
    renderChessBoard(context, changeData);
}

// 监听键盘事件
document.addEventListener('keydown', function(event){
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
})

// 管理数据，把操作结束的变化数据添加到源数据中
function refreshSourceData(block, rows){
    // if(rows == 1){
    //     changeData = block.slice(-1).concat(changeData.slice(0,-1));
    // }else if(rows == 2){
    //     changeData = block.slice(-2).concat(changeData.slice(0,-2));
    // }else if(rows == 3){
    //     changeData = block.slice(-3).concat(changeData.slice(0,-3));
    // }else if(rows == 4){
    //     changeData = block.slice(-4).concat(changeData.slice(0,-4));
    // }else{
    //     changeData = changeData.slice(0, rows - block.length).concat(block.slice(-block.length).concat(changeData.slice(0,-rows)));
    // }
    // sourceData = changeData;
}

// 随机返回一个类型模块
function randomType(){
    var allType = [
        [96,96],//O
        [32,96,32],//T
        [64,64,96],//L
        [32,32,96],//J
        [32,96,64],//Z
        [64,96,32],//S
        [32,32,32,32],//I
    ];
    var typeNo = Math.floor(Math.random()*7);
    return allType[typeNo];
}
// 根据变换数据渲染画面
function renderChessBoard(cxt, data){
    cxt.clearRect(around,topSpace+around,yNum*aWidth,xNum*aWidth);
    cxt.rect(around,topSpace+around,yNum*aWidth,xNum*aWidth);
    context.clip();
    drawChessBoard(cxt);
    // 遍历总数据并渲染
    var newSourceData = [];
    for(var i = 0; i < data.length; i++){
        var k = data[i].toString('2');
        if(yNum-k.length == 1){
            newSourceData.push('0'+k);
        }else if(yNum-k.length == 2){
            newSourceData.push('00'+k);
        }else if(yNum-k.length == 3){
            newSourceData.push('000'+k);
        }else if(yNum-k.length == 4){
            newSourceData.push('0000'+k);
        }else if(yNum-k.length == 5){
            newSourceData.push('00000'+k);
        }else if(yNum-k.length == 6){
            newSourceData.push('000000'+k);
        }else if(yNum-k.length == 7){
            newSourceData.push('0000000'+k);
        }else if(yNum-k.length == 8){
            newSourceData.push('00000000'+k);
        }else if(yNum-k.length == 9){
            newSourceData.push('000000000'+k);
        }else if(yNum-k.length == 10){
            newSourceData.push('0000000000'+k);
        }else if(yNum-k.length == 11){
            newSourceData.push('00000000000'+k);
        }
    }
    // context.clearRect(around, around+topSpace,yNum*aWidth,xNum*aWidth);
    drawNextBlock(context);
    for(var i = 0; i < newSourceData.length; i++){
        for(var j = 0; j < yNum; j++){
            if(newSourceData[i].charAt(j) == '1'){
                drawChess(context, i, j, around+1, around+topSpace+1, '1');
            }
        }
    }
}
// 旋转函数
function rotate(block){
    // 二维数组
    var newBlock = [];
    // 中间量
    var newBlocks = [];
    // 把十进制转换成二进制，在前面补零凑成一致长度，再展开成二维数组
    for(var i = 0; i < block.length; i++){
        if(block.length == 4){
            var k = (block[i] >> 4).toString('2');
        }else{
            var k = (block[i] >> 5).toString('2');
        }

        if(block.length - k.length == 1){
            newBlocks.push('0'+k);
        }else if(block.length - k.length == 2){
            newBlocks.push('00'+k);
        }else if(block.length - k.length == 3){
            newBlocks.push('000'+k);
        }else{
            newBlocks.push(k);
        }
        
        var l = newBlocks[i].split('');
        newBlock.push(l);
    }

    // 旋转，x、y轴交换位置
    var newBlock2 = [];
    newBlock2 = JSON.parse(JSON.stringify(newBlock));
    for(var i = 0; i < newBlock.length; i++){
        for(var j = 0; j < newBlock[i].length; j++){
            newBlock2[i][j] = newBlock[newBlock[i].length - 1 - j][i];
        }
    }

    // 把旋转后的二进制转换成十进制
    var changeNewBlock = [];
    for(var i = 0; i < newBlock2.length; i++){
        var k = parseInt(newBlock2[i].join(''), 2);
        changeNewBlock.push(k);
    }

    return changeNewBlock;
}
// 左移
function leftMove(){
    
}
// 右移
function rightMove(){

}
// 下移
// downMove(rows);
var isMove = true;
function downMove(){
    for(var i = 0; i < changeData.length-1; i++){
        console.log((sourceData[i+1].toString(2) & changeData[i].toString(2)));
        if(sourceData[i+1].toString(2) & changeData[i].toString(2) > 0){//0 可以移动，>0 不可以移动
            isMove = false;
            // refreshSourceData(currentBlock, rows);
        }else{
            // console.log('可以下移');

        }
    }
    console.log(isMove)
    if(isMove){
        // rows += 1;
        // console.log(rows);
        // refreshSourceData(currentBlock, rows);
        blockIntoMain(currentBlock);
    }
    console.log(sourceData, changeData)
    
}
// 随机出下一个模块并渲染在右侧预览
function nextBlock(){
    var nextBlock = randomType();
    var newNextBlock = [];
    for(var i = 0; i < nextBlock.length; i++){
        var k = (nextBlock[i] >> 4).toString('2');
        if(4-k.length == 1){
            newNextBlock.push('0'+k);
        }else if(4-k.length == 2){
            newNextBlock.push('00'+k);
        }else if(4-k.length == 3){
            newNextBlock.push('000'+k);
        }
    }
    context.clearRect(canvas.width-around-rightSpace+10, around*4+topSpace,4*aWidth,4*aWidth);
    drawNextBlock(context);
    for(var i = 0; i < newNextBlock.length; i++){
        for(var j = 0; j < 4; j++){
            if(newNextBlock[i].charAt(j) == '1'){
                drawChess(context, i, j, canvas.width-around-rightSpace+11, around*4+topSpace+1, '1');
            }
        }
    }
    return nextBlock;
}