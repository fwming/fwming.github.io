function Tetris(config){
    this.xNum = config.xNum || 15;// 行线数量
    this.yNum = config.yNum || 10;// 纵线数量
    this.aWidth = config.aWidth || 20;// 间隔大小
    this.aRound = config.aRound || 15;// 棋盘四周留白
    this.rightSpace = config.rightSpace || 100;// 右边预告空间
    this.topSpace = config.topSpace || 2*this.aRound;// 头部空间
    this.gameBox = config.gameBox;// 游戏载体
    this.title = config.title || 'TETRIS-俄罗斯方块';// 游戏标题
    this.configOffsetX = config.offsetX || 4;// 模块出现位置，最右侧为0
    return this;
}

Tetris.prototype = {
    // 初始化
    init: function(){
        this.isGameOver = false; // 游戏是否结束
        this.isGamePause = false; // 游戏是否处于暂停状态
        this.score = 0; // 分数
        this.level = 1; // 等级
        this.time = 0; // 时间
        this.rows = 0; // 移动到第几行
        this.offsetX = this.configOffsetX; //初始位置
        this.isNext = false; // 是否开始下一块
        // 设置画布大小
        this.gameBox.width = this.yNum*this.aWidth + this.aRound*3 + this.rightSpace;
        this.gameBox.height = this.xNum*this.aWidth + this.aRound*2 + this.topSpace;
        this.context = this.gameBox.getContext('2d');
        // 设置标题
        this.context.font = 'bolder 130% Arial';
        // this.context.font = 'bolder 18px Arial';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.linearGrad = this.context.createLinearGradient(0,0, this.gameBox.width, 0);
        this.linearGrad.addColorStop(0, '#9b21da');
        this.linearGrad.addColorStop(1, '#d9e017');
        this.context.fillStyle = this.linearGrad;
        this.context.fillText(this.title, this.gameBox.width/2, (this.topSpace+this.aRound)/2);
        // 线条样式
        this.context.strokeStyle = 'rgba(238,238,238,1)';
        // 绘制主界面
        this.drawChessBoard(this.context);
        // 右侧信息栏
        this.context.font = 'bolder 110% Arial';
        this.context.rect(this.aWidth*this.yNum+this.aRound*2,this.topSpace+this.aRound, this.rightSpace,this.gameBox.height-this.topSpace-this.aRound*2);
        this.context.fillText('下一个',this.gameBox.width-this.aRound-this.rightSpace/2,this.topSpace+this.aRound*3);
        // 随机下一块
        this.currentBlock = this.randomNextBlock(this.context);
        this.nextBlock = [];
        // 绘制得分
        this.drawScore(this.context);
        // 绘制等级
        this.drawLevel(this.context);
        // 绘制时间
        // this.drawTime(this.context);
        this.context.clearRect(this.gameBox.width-this.aRound-this.rightSpace, this.topSpace+this.aWidth*13, this.rightSpace, this.aWidth*4);
        this.context.fillStyle = this.linearGrad;
        this.context.font = 'bold 14px Arial';
        this.context.fillText('时间',this.gameBox.width-this.aRound-this.rightSpace/2,this.topSpace+this.aWidth*13+this.aRound*2);
        this.context.fillStyle = '#000';
        this.context.fillText('00:00:00',this.gameBox.width-this.aRound-this.rightSpace/2,this.topSpace+this.aWidth*14+this.aRound*2);
        // 游戏开始运行
        this.sourceData = this.sourceData();//固定后的数据
        this.changeData = this.changeData();//操作的数据
        this.bindEvents(this.context);
        this.downMoveTimers = '';// 自动下落计时器
        this.gameTimers = '';// 游戏时间统计计时器
        this.start(this.context);
    },
    // 开始游戏
    start: function(cxt){
        this.downMoveTimers = setInterval(() => {
            if(this.isGameOver || this.isGamePause){
                clearInterval(this.downMoveTimers);
            }else{
                this.downMove(this.currentBlock);
                this.randerData(cxt);
                this.drawScore(cxt);
                this.drawLevel(cxt);
            }
        }, 1000 / this.level);
        this.drawTime(cxt);
    },
    // 暂停游戏
    gamePause: function(){
        this.isGamePause = true;
    },
    // 继续游戏
    gameContinues: function(cxt){
        this.isGamePause = false;
        this.start(cxt)
    },
    // 绘制得分
    drawScore: function(cxt){
        cxt.clearRect(this.gameBox.width-this.aRound-this.rightSpace, this.topSpace+this.aWidth*7, this.rightSpace, this.aWidth*4);
        cxt.fillStyle = this.linearGrad;
        cxt.font = 'bold 14px Arial';
        cxt.fillText('总得分',this.gameBox.width-this.aRound-this.rightSpace/2,this.topSpace+this.aWidth*7+this.aRound*2);
        cxt.fillStyle = '#000';
        cxt.fillText(this.score,this.gameBox.width-this.aRound-this.rightSpace/2,this.topSpace+this.aWidth*8+this.aRound*2);
    },
    // 绘制等级
    drawLevel: function(cxt){
        cxt.clearRect(this.gameBox.width-this.aRound-this.rightSpace, this.topSpace+this.aWidth*10, this.rightSpace, this.aWidth*4);
        cxt.fillStyle = this.linearGrad;
        cxt.font = 'bold 14px Arial';
        cxt.fillText('等级',this.gameBox.width-this.aRound-this.rightSpace/2,this.topSpace+this.aWidth*10+this.aRound*2);
        cxt.fillStyle = '#000';
        this.level = this.score / this.level > 5000 ? this.level+1 : this.level;
        cxt.fillText(this.level,this.gameBox.width-this.aRound-this.rightSpace/2,this.topSpace+this.aWidth*11+this.aRound*2);
    },
    // 绘制时间
    drawTime: function(cxt){        
        this.gameTimers = setInterval(() => {
            if(this.isGameOver || this.isGamePause){
                clearInterval(this.gameTimers);
            }else{
                cxt.clearRect(this.gameBox.width-this.aRound-this.rightSpace, this.topSpace+this.aWidth*13, this.rightSpace, this.aWidth*4);
                cxt.fillStyle = this.linearGrad;
                cxt.font = 'bold 14px Arial';
                cxt.fillText('时间',this.gameBox.width-this.aRound-this.rightSpace/2,this.topSpace+this.aWidth*13+this.aRound*2);
                cxt.fillStyle = '#000';
                this.time ++;

                var hour = Math.floor(this.time / 60 / 60);
                var minute = Math.floor((this.time - hour * 60 * 60) / 60);
                var second = this.time % 60;

                var k = this.zeroFill(hour+'', 2) + ':' + this.zeroFill(minute+'', 2) + ':' + this.zeroFill(second+'', 2);

                cxt.fillText(k,this.gameBox.width-this.aRound-this.rightSpace/2,this.topSpace+this.aWidth*14+this.aRound*2);
            }
        }, 1000)
    },
    // 计时器
    times: function(){

    },
    // 绘制
    drawChessBoard: function(cxt){
        cxt.lineWidth = 1;
        // 绘制行线
        for(var i = 0; i < this.xNum+1; i++){
            cxt.moveTo(this.aRound, i*this.aWidth+this.aRound+this.topSpace);
            cxt.lineTo(this.yNum*this.aWidth+this.aRound, i*this.aWidth+this.aRound+this.topSpace);
            cxt.stroke();
        }
        // 绘制纵线
        for(var i = 0; i < this.yNum+1; i++){
            cxt.moveTo(i*this.aWidth+this.aRound, this.aRound+this.topSpace);
            cxt.lineTo(i*this.aWidth+this.aRound, this.xNum*this.aWidth+this.aRound+this.topSpace);
            cxt.stroke();
        }
    },
    // 绘制nextBlock
    drawNextBlock: function(cxt){
        // 绘制行线
        for(var i = 0; i < 5; i++){
            cxt.moveTo(this.gameBox.width-this.aRound-this.rightSpace+10, this.aRound*4+this.topSpace+i*this.aWidth);
            cxt.lineTo(this.gameBox.width-this.aRound-10, this.aRound*4+this.topSpace+i*this.aWidth);
            cxt.stroke();
        }
        // 绘制纵线
        for(var i = 0; i < 5; i++){
            cxt.moveTo(this.gameBox.width-this.aRound-this.rightSpace+10+i*this.aWidth, this.aRound*4+this.topSpace);
            cxt.lineTo(this.gameBox.width-this.aRound-this.rightSpace+10+i*this.aWidth, this.aRound*4+this.topSpace+4*this.aWidth);
            cxt.stroke();
        }
    },
    // 根据位置和类型绘制, x:第几行，y:第几列
    drawChess: function(cxt, x, y, dx, dy, type){
        cxt.beginPath();
        cxt.rect(y*this.aWidth+dx, x*this.aWidth+dy, (this.aWidth-2), (this.aWidth-2));
        cxt.closePath();
        if(type == '1'){
            cxt.fillStyle = '#1881ec';
        }else if(type == '2'){
            cxt.fillStyle = '#506614';
        }
        
        cxt.fill();
    },
    // 随机出下一个模块并渲染在右侧预览
    randomNextBlock: function(cxt){
        var nextBlock = this.randomType();
        var newNextBlock = [];
        for(var i = 0; i < nextBlock.length; i++){
            var k = (nextBlock[i] << 1).toString('2');
            if(4-k.length == 1){
                newNextBlock.push('0'+k);
            }else if(4-k.length == 2){
                newNextBlock.push('00'+k);
            }else if(4-k.length == 3){
                newNextBlock.push('000'+k);
            }
        }
        cxt.clearRect(this.gameBox.width-this.aRound-this.rightSpace+10, this.aRound*4+this.topSpace,4*this.aWidth,4*this.aWidth);
        this.drawNextBlock(cxt);
        for(var i = 0; i < newNextBlock.length; i++){
            for(var j = 0; j < 4; j++){
                if(newNextBlock[i].charAt(j) == '1'){
                    this.drawChess(cxt, i, j, this.gameBox.width-this.aRound-this.rightSpace+11, this.aRound*4+this.topSpace+1, '1');
                }
            }
        }
        return nextBlock;
    },
    // 随机返回一个类型模块
    randomType: function(){
        // var allType = [
        //     [96,96],//O
        //     [32,96,32],//T
        //     [64,64,96],//L
        //     [32,32,96],//J
        //     [32,96,64],//Z
        //     [64,96,32],//S
        //     [32,32,32,32],//I
        // ];
        var allType = [
            [3,3],//O
            [1,3,1],//T
            [2,2,3],//L
            [1,1,3],//J
            [1,3,2],//Z
            [2,3,1],//S
            [2,2,2,2],//I
        ];
        var typeNo = Math.floor(Math.random()*7);
        return allType[typeNo];
    },
    // 模块固定后的数据
    sourceData: function(){
        var sourceData = [];
        for(var i = 0; i < this.xNum+1; i++){
            if(i == this.xNum){
                sourceData[i] = 1023;
            }else{
                sourceData[i] = 0;
            }
        }
        return sourceData;
    },
    // 模块操作表的数据，包括移动、旋转，最终渲染的数据为两个表数据之和
    changeData: function(){
        var changeData = [];
        for(var i = 0; i < this.xNum; i++){
            changeData[i] = 0;
        }
        return changeData;
    },
    // 下移
    downMove: function(block){
        this.rows++;
        // 判断是否满足下移条件：1、下一行没有遮挡；2、还没触底
        if(this.isDownMove()){
            for(var i = 0; i < this.xNum; i++){
                this.changeData[i] = 0;
            }        
            if(this.rows == 1){
                for(var i = 0; i < block.length; i++){
                    block[i] = block[i] << this.offsetX;
                }
                this.nextBlock = this.randomNextBlock(this.context);
            }
            if(this.rows >= block.length){
                this.changeData = this.changeData.slice(0, this.rows - block.length).concat(block.slice(-block.length).concat(this.changeData.slice(0,-this.rows)));
            }else{
                if(this.rows == 1){
                    this.changeData = block.slice(-1).concat(this.changeData.slice(0,-1));
                }else if(this.rows == 2){
                    this.changeData = block.slice(-2).concat(this.changeData.slice(0,-2));
                }else if(this.rows == 3){
                    this.changeData = block.slice(-3).concat(this.changeData.slice(0,-3));
                }
            }
        }else{
            // 判断顶部是否有溢出，有则游戏结束
            if(this.rows - block.length <= 0){
                this.isGameOver = true;
            }else{
                this.rows = 0;
                this.offsetX = this.configOffsetX;
                this.isNext = false;
                this.currentBlock = this.nextBlock;
                for(var i = 0; i < this.xNum; i++){
                    this.sourceData[i] += this.changeData[i];
                }
                // 清空操作表数据
                for(var i = 0; i < this.xNum; i++){
                    this.changeData[i] = 0;
                }
                // 消除函数
                this.clear();                    
            }
        }
    },
    // 判断能否下移
    isDownMove: function(){
        var isDownMove = true;
        for(var i = 0; i < this.xNum; i++){
            if(this.changeData[i] & this.sourceData[i+1]){
                isDownMove = false;
            }
        }
        return isDownMove;
    },
    // 左移
    leftMove: function(block){
        if(this.isLeftOrRightMove(block, 'left')){
            if(this.offsetX >= this.yNum-block.length){
                this.offsetX = this.yNum-block.length
            }else{
                this.offsetX++;
            }
            for(var i = 0; i < block.length; i++){
                this.currentBlock[i] = block[i] << 1;
            }
            for(var i = 0; i < this.xNum; i++){
                this.changeData[i] = this.changeData[i] << 1;
            }
        }
    },
    // 右移
    rightMove: function(block){
        if(this.isLeftOrRightMove(block, 'right')){
            if(this.offsetX <= 0){
                this.offsetX = 0;
            }else{
                this.offsetX--;
            }
            for(var i = 0; i < block.length; i++){
                this.currentBlock[i] = block[i] >> 1;
            }
            for(var i = 0; i < this.xNum; i++){
                this.changeData[i] = this.changeData[i] >> 1;
            }
        }
    },
    // 能否左右移动
    isLeftOrRightMove: function(block, dir){
        var isMove = true;
        if(dir === 'left'){
            for(var i = 0; i < block.length; i++){
                // 不能超出左边界
                if(this.currentBlock[i] & Math.pow(2, (this.yNum-1))){
                    isMove = false;
                }
            }
            for(var i = 0; i < this.xNum; i++){
                var k = this.changeData[i] << 1;
                if(k & this.sourceData[i]){
                    isMove = false;
                }
            }
        }
        if(dir == 'right'){
            for(var i = 0; i < block.length; i++){
                // 不能超出右边界
                if(this.currentBlock[i] & 1){
                    isMove = false;
                }
            }
            for(var i = 0; i < this.xNum; i++){
                var k = this.changeData[i] >> 1;
                if(k & this.sourceData[i]){
                    isMove = false;
                }
            }
        }
        return isMove;

    },
    // 旋转
    rotate: function(block){
        var kbs = [];
        for(var i = 0; i < block.length; i++){
            kbs[i] = block[i];
            block[i] = block[i] >> this.offsetX;
        }
        var newsArr = this.tenTotwo(block, block.length);

        // 旋转，x、y轴交换位置
        var newBlock2 = [];
        newBlock2 = JSON.parse(JSON.stringify(newsArr));
        for(var i = 0; i < newsArr.length; i++){
            for(var j = 0; j < newsArr[i].length; j++){
                newBlock2[i][j] = newsArr[newsArr[i].length - 1 - j][i];
            }
        }
        // 旋转后的十进制数据
        var k = this.twoToten(newBlock2);
        for(var i = 0; i < k.length; i++){
            k[i] = k[i] << this.offsetX;
        }
        // 判断旋转后的数据与源数据（固定后的数据）是否有重叠
        var isOverlap = false;
        for(var i = 0; i < k.length; i++){
            if(this.sourceData[this.rows - k.length + i] & k[i]){
                isOverlap = true;
            }
        }
        // 有重叠时返回原数据，不允许旋转，否则返回旋转后的数据
        if(isOverlap){
            return kbs;
        }else{
            // 清空操作表数据
            for(var i = 0; i < this.xNum; i++){
                this.changeData[i] = 0;
            }
            for(var i = 0; i < k.length; i++){
                this.changeData[this.rows - k.length + i] = k[i];
            }
            return k;
        }        
    },
    // 消除与得分计算
    clear: function(){
        this.sourceData = this.sourceData.filter(function(item){
            return item < 1023
        })
        this.sourceData.push(1023);
        if(this.xNum+1 - this.sourceData.length === 4){
            this.sourceData = [0,0,0,0].concat(this.sourceData);
            this.score += 100;
        }else if(this.xNum+1 - this.sourceData.length === 3){
            this.sourceData = [0,0,0].concat(this.sourceData);
            this.score += 60;
        }else if(this.xNum+1 - this.sourceData.length === 2){
            this.sourceData = [0,0].concat(this.sourceData);
            this.score += 30;
        }else if(this.xNum+1 - this.sourceData.length === 1){
            this.sourceData = [0].concat(this.sourceData);
            this.score += 10;
        }
    },
    // 渲染数据
    randerData: function(cxt){
        var allData = [];
        for(var i = 0; i < this.xNum; i++){
            allData[i] = this.sourceData[i] + this.changeData[i];
        }
        // 将合并后的数据转换成二维二进制数组
        var twoAllData = this.tenTotwo(allData, this.yNum);
        cxt.clearRect(this.aRound, this.aRound+this.topSpace,this.yNum*this.aWidth,this.xNum*this.aWidth);
        this.drawChessBoard(cxt);
        for(var i = 0; i < twoAllData.length; i++){
            for(var j = 0; j < this.yNum; j++){
                if(twoAllData[i][j] == '1'){
                    this.drawChess(cxt, i, j, this.aRound+1, this.aRound+this.topSpace+1, '1');
                }
            }
        }
    },
    // 删除数组的某几项
    delArray: function(Array, index, num){
        var array = [];
        array = Array.slice(0,index).concat(Array.slice(index+num, Array.length));
        return array;
    },
    // 十进制转换二进制，把一维的十进制数组展开成二维二进制数组
    tenTotwo: function(block, len){
        // 二维数组
        var newBlock = [];
        // 中间量
        var newBlocks = [];
        // 把十进制转换成二进制，在前面补零凑成一致长度，再展开成二维数组
        for(var i = 0; i < block.length; i++){
            var k = block[i].toString('2');
            newBlocks.push(this.zeroFill(k, len));
            var l = newBlocks[i].split('');
            newBlock.push(l);
        }
        return newBlock;
    },
    // 二进制转换十进制
    twoToten: function(block){
        // 把旋转后的二进制转换成十进制
        var changeNewBlock = [];
        for(var i = 0; i < block.length; i++){
            var k = parseInt(block[i].join(''), 2);
            changeNewBlock.push(k);
        }
        return changeNewBlock;
    },
    // 前面补0函数
    zeroFill: function(string, len){
        var str = '';
        for(var i = 0; i < len - string.length; i++){
            str += '0';
        }
        return str + string;
    },
    // 监听键盘事件
    bindEvents: function(cxt){
        var that = this;
        // 监听键盘事件
        document.addEventListener('keydown', function(event){
            switch (event.key) {
                case 'ArrowLeft':
                    that.leftMove(that.currentBlock);
                    break;
                case 'ArrowRight':
                    that.rightMove(that.currentBlock);
                    break;
                case 'ArrowUp':
                    console.time();
                    that.currentBlock = that.rotate(that.currentBlock);
                    console.timeEnd();
                    break;
                case 'ArrowDown':
                    that.downMove(that.currentBlock);
                    break;
                case ' ':
                    console.log('暂停');
                    that.gamePause();
                    break;
                case 'Enter':
                    console.log('继续');
                    that.gameContinues(that.context);
                    break;
            }



            // console.log(event.key)
            // if(event.key == 'ArrowLeft'){
            //     that.leftMove(that.currentBlock);
            // }
            // if(event.key == 'ArrowRight'){
            //     that.rightMove(that.currentBlock);
            // }
            // if(event.key == 'ArrowUp'){
            //     console.time();
            //     that.currentBlock = that.rotate(that.currentBlock);
            //     console.timeEnd()
            //     console.log(that.currentBlock)
            // }
            // if(event.key == 'ArrowDown'){
            //     that.downMove(that.currentBlock);
            // }
            // if(event.key == ' '){
            //     console.log('暂停');
            //     that.gamePause();
            // }
            // if(event.key == 'Enter'){
            //     console.log('继续');
            //     that.gameContinues(that.context);
            // }
            that.randerData(cxt);
            that.drawScore(cxt);
        })
    }
};