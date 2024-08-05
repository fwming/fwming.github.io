function GreedySnake(config){
    this.gameBox = config.gameBox;// 游戏载体
    this.widthSnake = config.widthSnake || 20; // 蛇身宽度
    this.speed = config.speed || 200; // 速度
    this.fast = config.fast || 100; // 快速
    this.direction = config.direction || 'up'; // 初始方向
    
    this.snakeBody = []; // 组装蛇的数据
    this.eatingNum = 0; // 吞吃数量
    this.score = 0; // 得分
    this.foods = ''; // 食物对象
    this.foodsX = 0; // 食物X坐标位置
    this.foodsY = 0; // 食物Y坐标位置
    this.timers = null; // 定时器
    this.timers2 = null; // 计时器
    this.switch = true; // 一次性开关
    return this;
}

GreedySnake.prototype = {
    // 初始化
    init: function(){
        $('#snakeBox').css({'--cell-width': this.widthSnake + 'px'});
        this.bindEvents();
        this.times();
        this.nextFoods('header');
        this.nextFoods('foods');
        this.start();
    },
    // 开始游戏
    start: function(){
        var that = this;
        clearInterval(that.timers);
        that.timers = setInterval(function(){
            that.moveSnake();
        }, that.speed);
    },
    // 加速
    addSpeed: function(){
        var that = this;
        clearInterval(that.timers);
        that.timers = setInterval(function(){
            that.moveSnake();
        }, that.fast);
    },
    // 随机生成一块食物
    nextFoods: function(className){
        this.foods = document.createElement('span');
        var x = Math.floor(Math.random()*20)*40;
        var y = Math.floor(Math.random()*15)*40;
        // 随机背景色
        var r = Math.floor(Math.random()*256);
        var g = Math.floor(Math.random()*256);
        var b = Math.floor(Math.random()*256);

        this.foods.style.left = x+'px';
        this.foods.style.top = y+'px';
        this.foods.style.transform = 'rotate(0deg)';

        this.foods.className = className;

        if(className == 'header'){
            var img = document.createElement('img');
            img.src = 'img/game/greedySnake/header.png';
            this.foods.append(img);
            this.snakeBody.push(this.foods);
        }else{
            // var img = document.createElement('img');
            // img.src = 'img/game/greedySnake/body-1.png';
            // this.foods.append(img);

            this.foodsX = x;
            this.foodsY = y;
            
            this.foods.style.backgroundColor = 'rgb('+r+','+g+','+b+')';
        }        
        this.gameBox.append(this.foods);
    },
    // 移动
    moveSnake: function(){
        // 获取蛇头位置
        snakeX = this.snakeBody[0].offsetLeft;
        snakeY = this.snakeBody[0].offsetTop;
        snakeT = this.snakeBody[0].style.transform;
        // 获取蛇尾位置        
        tailX = this.snakeBody[this.snakeBody.length - 1].offsetLeft;
        tailY = this.snakeBody[this.snakeBody.length - 1].offsetTop;
        
        // 选择移动方向
        if(this.direction == 'up'){
            snakeY -= this.widthSnake;
            snakeT = 'rotate(0deg)';
        }else if(this.direction == 'right'){
            snakeX += this.widthSnake;
            snakeT = 'rotate(90deg)';
        }else if(this.direction == 'down'){
            snakeY += this.widthSnake;
            snakeT = 'rotate(180deg)';
        }else{
            snakeX -= this.widthSnake;
            snakeT = 'rotate(270deg)';
        }
        // 判断是否超出游戏界面
        if(snakeX < 0 || snakeX >= $(this.gameBox).width() || snakeY < 0 || snakeY >= $(this.gameBox).height()){
            // this.gameOver();
            return;
        }
        // 蛇体移动
        for(var i = this.snakeBody.length - 1; i > 0; i--){
            this.snakeBody[i].style.top = this.snakeBody[i-1].style.top;
            this.snakeBody[i].style.left = this.snakeBody[i-1].style.left;
            this.snakeBody[i].style.transform = this.snakeBody[i-1].style.transform;            
        }
        // 更新蛇头位置
        this.snakeBody[0].style.top = snakeY + 'px';
        this.snakeBody[0].style.left = snakeX + 'px';
        this.snakeBody[0].style.transform = snakeT;

        // 判断是否吃到食物
        if(snakeX == this.foodsX && snakeY == this.foodsY){
            this.snakeBody.push(this.foods);
            this.nextFoods('foods');
            this.eatingNum ++;
            this.score += 10;
            $('.eatingNum').html(this.eatingNum);
            $('.score').html(this.score);
        }
    },
    gameOver: function(){
        clearInterval(this.timers);
        clearInterval(this.timers2);
    },
    // 计时器
    times: function(){
        var that = this;
        var time = 0;
        that.timers2 = setInterval(function(){
            time ++;
            var hour = Math.floor(time / 60 / 60);
            var minute = Math.floor((time - hour * 60 * 60) / 60);
            var second = time % 60;
    
            var k = that.zeroFill(hour+'', 2) + ':' + that.zeroFill(minute+'', 2) + ':' + that.zeroFill(second+'', 2);
            $('.times').html(k);
        }, 1000)
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
    bindEvents: function(){
        var that = this;
        // 监听键盘事件
        document.addEventListener('keydown', function(event){
            switch (event.key) {
                case 'ArrowLeft':
                    if(that.direction != 'right'){
                        that.direction = 'left';
                    }
                    break;
                case 'ArrowRight':
                    if(that.direction != 'left'){
                        that.direction = 'right';
                    }
                    break;
                case 'ArrowUp':
                    if(that.direction != 'down'){
                        that.direction = 'up';
                    }
                    break;
                case 'ArrowDown':
                    if(that.direction != 'up'){
                        that.direction = 'down';
                    }
                    break;
                case ' ':
                    if(that.switch){                        
                        that.addSpeed();
                        that.switch = false;
                    }
                    break;
                case 'Enter':
                    break;
            }
        })
        document.addEventListener('keyup', function(event){
            switch (event.key) {
                case ' ':
                    that.start();
                    that.switch = true;
                    break;
            }
        })
    }
};