'use strict';

function LinkGame(config) {
  if (!(this instanceof LinkGame)) {
    return new LinkGame(config);
  }
  this.score = 0; // 得分
  this.$box = $('#' + (config.boxId || 'game'));
  this.cellWidth = config.cellWidth || 42; // 每格的的宽度
  this.cellHeight = config.cellHeight || 42; // 每格的高度
  this.cellPadding = config.cellPadding || 15; //格子的padding值
  this.cols = config.cols + 2 || 10; // 列数
  this.rows = config.rows + 2 || 8; // 行数
  this.level = config.level || 0; // 等级
  this.leftDisorderTime = 5; // 剩余重排次数
  this.strokeStyle = config.strokeStyle || '#fbff98'; // 画布线条颜色
  this.lineWidth = config.lineWidth || 2; // 画布线条宽度
  this.leftTimes = config.leftTimes || 100; // 倒计时
  this.gifts = [ // 游戏主体小图
    'img/game/linkGame/gifts/0.png',
    'img/game/linkGame/gifts/1.png',
    'img/game/linkGame/gifts/2.png',
    'img/game/linkGame/gifts/3.png',
    'img/game/linkGame/gifts/4.png',
    'img/game/linkGame/gifts/5.png',
    'img/game/linkGame/gifts/6.png',
    'img/game/linkGame/gifts/7.png',
    'img/game/linkGame/gifts/8.png',
    'img/game/linkGame/gifts/9.png',
    'img/game/linkGame/gifts/10.png',
    'img/game/linkGame/gifts/11.png',
    'img/game/linkGame/gifts/12.png',
    'img/game/linkGame/gifts/13.png',
    'img/game/linkGame/gifts/14.png',
    'img/game/linkGame/gifts/15.png',
    'img/game/linkGame/gifts/16.png',
    'img/game/linkGame/gifts/17.png',
    'img/game/linkGame/gifts/18.png',
    'img/game/linkGame/gifts/19.png',
    'img/game/linkGame/gifts/20.png',
    'img/game/linkGame/gifts/21.png',
    'img/game/linkGame/gifts/22.png',
    'img/game/linkGame/gifts/23.png',
    'img/game/linkGame/gifts/24.png',
    'img/game/linkGame/gifts/25.png',
    'img/game/linkGame/gifts/26.png',
    'img/game/linkGame/gifts/27.png',
    'img/game/linkGame/gifts/28.png',
    'img/game/linkGame/gifts/29.png',
    'img/game/linkGame/gifts/30.png',
    'img/game/linkGame/gifts/31.png',
  ];
  this.nums = [ // 时间和实时分数图片
    'img/game/linkGame/layout/0.png',
    'img/game/linkGame/layout/1.png',
    'img/game/linkGame/layout/2.png',
    'img/game/linkGame/layout/3.png',
    'img/game/linkGame/layout/4.png',
    'img/game/linkGame/layout/5.png',
    'img/game/linkGame/layout/6.png',
    'img/game/linkGame/layout/7.png',
    'img/game/linkGame/layout/8.png',
    'img/game/linkGame/layout/9.png',
  ];
  this.xnums = [ // 剩余打乱顺序次数图片
    'img/game/linkGame/layout/x0.png',
    'img/game/linkGame/layout/x1.png',
    'img/game/linkGame/layout/x2.png',
    'img/game/linkGame/layout/x3.png',
    'img/game/linkGame/layout/x4.png',
    'img/game/linkGame/layout/x5.png',
  ];
  this.pnums = [ // 游戏结束时最终分数展示图片
    'img/game/linkGame/layout/p0.png',
    'img/game/linkGame/layout/p1.png',
    'img/game/linkGame/layout/p2.png',
    'img/game/linkGame/layout/p3.png',
    'img/game/linkGame/layout/p4.png',
    'img/game/linkGame/layout/p5.png',
    'img/game/linkGame/layout/p6.png',
    'img/game/linkGame/layout/p7.png',
    'img/game/linkGame/layout/p8.png',
    'img/game/linkGame/layout/p9.png',
  ];
  return this;
}

LinkGame.prototype = {
  init: function (isReset) {
    var self = this;
    this.stack = [];
    this.iconTypeCount = this.level + 11; // 图片的种类
    this.count = (this.rows - 2) * (this.cols - 2); // 图片的总数
    this.remain = this.count; // 剩余的未有消去的图片
    this.pictures = []; // 图片集合
    this.linkPictures = [];
    this.preClickInfo = null; // 上一次被点中的图片信息
    this.leftTime = this.leftTimes; // 剩余时间
    this.points = []; // 图片可以相消时的拐点集合
    this.timmer = setInterval(function () {
      self.updateCountDown();
    }, 1000);
    this.createMap();
    this.disorder();
    !isReset && this.bindDomEvents();
    this.updateLevel();
    this.domUpdateScore();
  },
  reset: function () {
    this.init(true);
  },
  nextLevel: function () {
    clearInterval(this.timmer);
    this.reset();
  },
  // 模板替换
  replaceTpl: function (tpl, data) {
    return tpl.replace(/\${(\w+)}/ig, function (match, $1) {
      return data[$1];
    });
  },
  // 合并数组，并把相同的元素排除掉
  mergeArray: function (target, source) {
    source.forEach(function (e) {
      if (target.indexOf(e) === -1) {
        target.push(e);
      }
    })
  },
  // 生成一定范围内的随机数
  random: function (min, max) {
    return parseInt((Math.random() * max) + min);
  },
  // 交换对象属性
  swapProperties: function (obj1, obj2, properties) {
    properties.forEach(function (property) {
      var temp = obj1[property];
      obj1[property] = obj2[property];
      obj2[property] = temp;
    });
  },
  // 克隆对象（浅克隆）
  cloneObj: function (source) {
    var target = {};
    for (var pro in source) {
      source.hasOwnProperty(pro) && (target[pro] = source[pro]);
    }
    return target;
  },
  // 获取历史记录
  getHistoryScore: function () {
    return window.localStorage.getItem('highestScore') || 0;
  },
  // 保存最高分
  setHistoryScore: function (score) {
    var highestScore = this.getHistoryScore('highestScore');
    if (score > highestScore) {
      window.localStorage.setItem('highestScore', score);
    }
  },
  // 根据数值转换对应图片
  updateDomNumbers: function ($container, value, type) {
    var numList = [];
    var nums = type === 1 ? this.nums : (type === 2 ? this.xnums : this.pnums);
    $container.html('');
    // 使用数值直接显示倒计时、等级、剩余刷新次数、实时分数、最终得分
    // $container.html(value);
    // 根据数值转换成图片显示
    do {
      numList.push(value % 10);
      value = parseInt(value / 10);
    } while (value > 0);

    while (numList.length) {
      $container.append(this.replaceTpl('<img src="${src}" />', {
        src: nums[numList.pop()]
      }));
    }
  },
  // 倒计时
  updateCountDown: function () {
    --this.leftTime;
    if (this.leftTime < 0) {
      clearInterval(this.timmer);
      this.gameOver();
      return;
    }
    this.updateDomNumbers($('.time'), this.leftTime, 1);
  },
  gameOver: function () {
    $('.game-over').removeClass('hidden').find('.history-score').text(this.getHistoryScore() || 0);
    this.updateDomNumbers($('.current-score'), this.score, 3);
    this.setHistoryScore(this.score);
  },
  // 更新等级
  updateLevel: function () {
    this.updateDomNumbers($('.level'), this.level + 1, 1);
  },
  createMap: function () {
    var count = 0;
    for (var row = 0; row < this.rows; row++) {
      this.pictures.push([]);
      for (var col = 0; col < this.cols; col++) {
        // 边界元素
        if (row === 0 || row === this.rows - 1 || col === 0 || col === this.cols - 1) {
          this.pictures[row].push({
            row: row,
            col: col,
            isEmpty: true,
            isBoundary: true
          });

          // 内部元素
        } else {
          this.pictures[row].push({
            row: row,
            col: col,
            isEmpty: false,
            index: count,
            pic: this.gifts[parseInt(count / 2) % this.iconTypeCount],
            width: this.cellWidth,
            height: this.cellHeight,
            isBoundary: false
          });
          count++;
        }

      }
    }
  },
  // 打乱顺序
  disorder: function () {
    var pictures = this.pictures;
    var random = this.random.bind(this);
    for (var i = 0; i < this.count * 10; i++) {
      // 随机选中2张图片，调用this.swapProperties交换俩人的pic和isEmpty属性
      var picture1 = pictures[random(1, this.rows - 2)][random(1, this.cols - 2)];
      var picture2 = pictures[random(1, this.rows - 2)][random(1, this.cols - 2)];
      this.swapProperties(picture1, picture2, ['pic', 'isEmpty']);
    }
    this.renderMap();
    this.updateDisorderTime();
  },
  updateDisorderTime: function () {
    this.updateDomNumbers($('.disorder'), this.leftDisorderTime, 2);
  },
  renderMap: function () {
    this.$box.html(''); // 将视图清空
    var html = '';
    var pictures = this.pictures;
    var tpl = '<td><div class="pic-box ${empty}" data-row="${row}" data-col="${col}" data-index="${index}"><img class="pic" draggable=false src="${pic}" width=${width} height=${height} /></div></td>';
    for (var row = 1; row < this.rows - 1; row++) {
      html += '<tr class="game-row">';
      for (var col = 1; col < this.cols - 1; col++) {
        var picture = this.cloneObj(pictures[row][col]);
        picture.empty = picture.isEmpty ? 'empty' : '';
        html += this.replaceTpl(tpl, picture);
      }
      html += '</tr>';
    }
    this.$box.html(html);
  },
  // 检测连通性
  checkMatch: function (curClickInfo) {
    var pictures = this.pictures,
      preClickInfo = this.preClickInfo ? this.preClickInfo : {},
      preRow = +preClickInfo.row,
      preCol = +preClickInfo.col,
      preIndex = +preClickInfo.index,
      curRow = +curClickInfo.row,
      curCol = +curClickInfo.col,
      curIndex = +curClickInfo.index;

    // 如果点击的图片是空白的，则退出
    if (pictures[curRow][curCol].isEmpty) {
      return;
    }
    this.preClickInfo = curClickInfo;
    this.domAddActive(curIndex);
    if (preIndex !== preIndex) { // NaN
      return;
    }


    // 如果前后2次点击的是同一张图片，或者2张图片不是同类型的，则退出
    if (preIndex === curIndex || pictures[preRow][preCol].pic !== pictures[curRow][curCol].pic) {
      this.domRemoveActive(preIndex);
      return;
    }
    if (this.canCleanup(preCol, preRow, curCol, curRow)) {
      this.linkPictures = [];
      for (var i = 0; i < this.points.length - 1; i++) {
        this.mergeArray(this.linkPictures, this.countPoints(this.points[i], this.points[i + 1]));
      }
      this.drawLine();
      this.updateStatus(preRow, preCol, curRow, curCol, preIndex, curIndex);
    } else {
      this.domRemoveActive(preIndex);
    }
  },
  countPoints: function (start, end) {
    var points = [];
    var pictures = this.pictures;
    if (start[0] === end[0]) { // 同列
      var x = start[0];
      if (start[1] > end[1]) { // 从下到上
        for (var i = start[1]; i >= end[1]; i--) {
          points.push(pictures[i][x]);
        }
      } else { // 从上到下
        for (var i = start[1]; i <= end[1]; i++) {
          points.push(pictures[i][x]);
        }
      }
    } else if (start[1] === end[1]) { // 同行
      var y = start[1];
      if (start[0] > end[0]) { // 从右到左
        for (var i = start[0]; i >= end[0]; i--) {
          points.push(pictures[y][i]);
        }
      } else { // 从左到右
        for (var i = start[0]; i <= end[0]; i++) {
          points.push(pictures[y][i]);
        }
      }
    }
    return points;
  },
  domAddActive: function (index) {
    $('.game-row .pic-box').eq(index).addClass('active');
    return this;
  },
  domRemoveActive: function (index) {
    $('.game-row .pic-box').eq(index).removeClass('active');
    return this;
  },
  domAddEmpty: function (index) {
    $('.game-row .pic-box').eq(index).addClass('empty').removeClass('active');
    return this;
  },
  // 记分
  domUpdateScore: function () {
    this.updateDomNumbers($('.scoring'), this.score, 1);
  },
  // 连线
  drawLine: function (callback) {
    var $canvas = $('#canvas');
    if (!$canvas[0].getContext('2d')) return; // 不支持Canvas
    var canvas = document.getElementById('canvas');
    canvas.width = $('.game-area').width();
    canvas.height = $('.game-area').height();

    var linkList = this.linkPictures;
    var coordinate = [];
    for (var i = 0; i < linkList.length; i++) {
      var x = linkList[i].col === 0 ? 0 : (linkList[i].col === this.cols - 1 ? $('#game').width() : linkList[i].col * (this.cellWidth+this.cellPadding*2) - (this.cellWidth+this.cellPadding*2)/2);
      var y = linkList[i].row === 0 ? 0 : (linkList[i].row === this.rows - 1 ? $('#game').height() : linkList[i].row * (this.cellHeight+this.cellPadding*2) - (this.cellHeight+this.cellPadding*2)/2);
      coordinate.push([x, y]);
    }
    var ctx = $canvas[0].getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.save();
    for (var i = 0; i < linkList.length; i++) {
      if (i === 0) {
        ctx.moveTo(coordinate[i][0], coordinate[i][1]);
      }
      ctx.lineTo(coordinate[i][0], coordinate[i][1]);
    }
    ctx.stroke();
    ctx.restore();
    $canvas.removeClass('hidden');
    setTimeout(function () {
      ctx.clearRect(0, 0, $canvas.width(), $canvas.height());
      $canvas.addClass('hidden');
    }, 200);

  },
  updateStatus: function (preRow, preCol, curRow, curCol, preIndex, curIndex) {
    var self = this;
    this.remain -= 2;
    this.score += 10 * (this.linkPictures.length - 1);
    this.preClickInfo = null;
    this.domUpdateScore();
    setTimeout(function () {
      self.pictures[preRow][preCol].isEmpty = true;
      self.pictures[curRow][curCol].isEmpty = true;
      self.domAddEmpty(preIndex).domAddEmpty(curIndex);
      if (self.remain === 0) {
        ++self.level;
        self.nextLevel();
      }
    }, 200);
  },
  isRowEmpty: function (x1, y1, x2, y2) {
    if (y1 != y2) {
      return false;
    }
    x1 > x2 && (x1 = x1 + x2, x2 = x1 - x2, x1 = x1 - x2); //强制x1比x2小
    for (var j = x1 + 1; j < x2; ++j) { //from (x2,y2+1) to (x2,y1-1);
      if (!this.pictures[y1][j].isEmpty) {
        return false;
      }
    }
    return true;
  },
  isColEmpty: function (x1, y1, x2, y2) {
    if (x1 != x2) {
      return false;
    }
    y1 > y2 && (y1 = y1 + y2, y2 = y1 - y2, y1 = y1 - y2); //强制y1比y2小

    for (var i = y1 + 1; i < y2; ++i) { //from (x2+1,y2) to (x1-1,y2);
      if (!this.pictures[i][x1].isEmpty) {
        return false;
      }
    }
    return true;
  },
  addPoints: function () {
    var args = arguments,
      len = args.length,
      i = 0;

    for (; i < len;) {
      this.points.push(args[i++]);
    }
  },
  // 判断两个坐标是否可以相互消除
  canCleanup: function (x1, y1, x2, y2) {
    this.points = [];
    if (x1 === x2) {
      if (1 === y1 - y2 || 1 === y2 - y1) { //相邻
        this.addPoints([x1, y1], [x2, y2]);
        return true;
      } else if (this.isColEmpty(x1, y1, x2, y2)) { //直线
        this.addPoints([x1, y1], [x2, y2]);
        return true;
      } else { //两个拐点	(优化)
        var i = 1;
        while ((x1 + i < this.cols) && this.pictures[y1][x1 + i].isEmpty) {
          if (!this.pictures[y2][x2 + i].isEmpty) {
            break;
          } else {
            if (this.isColEmpty(x1 + i, y1, x1 + i, y2)) {
              this.addPoints([x1, y1], [x1 + i, y1], [x1 + i, y2], [x2, y2]);
              return true;
            }
            i++;
          }
        }
        i = 1;
        while ((x1 - i >= 0) && this.pictures[y1][x1 - i].isEmpty) {
          if (!this.pictures[y2][x2 - i].isEmpty) {
            break;
          } else {
            if (this.isColEmpty(x1 - i, y1, x1 - i, y2)) {
              this.addPoints([x1, y1], [x1 - i, y1], [x1 - i, y2], [x2, y2]);
              return true;
            }
            i++;
          }
        }

      }
    }

    if (y1 === y2) { //同行
      if (1 === x1 - x2 || 1 === x2 - x1) {
        this.addPoints([x1, y1], [x2, y2]);
        return true;
      } else if (this.isRowEmpty(x1, y1, x2, y2)) {
        this.addPoints([x1, y1], [x2, y2]);
        return true;
      } else {
        var i = 1;
        while ((y1 + i < this.rows) && this.pictures[y1 + i][x1].isEmpty) {
          if (!this.pictures[y2 + i][x2].isEmpty) {
            break;
          } else {
            if (this.isRowEmpty(x1, y1 + i, x2, y1 + i)) {
              this.addPoints([x1, y1], [x1, y1 + i], [x2, y1 + i], [x2, y2]);
              return true;
            }
            i++;
          }
        }
        i = 1;
        while ((y1 - i >= 0) && this.pictures[y1 - i][x1].isEmpty) {
          if (!this.pictures[y2 - i][x2].isEmpty) {
            break;
          } else {
            if (this.isRowEmpty(x1, y1 - i, x2, y1 - i)) {
              this.addPoints([x1, y1], [x1, y1 - i], [x2, y1 - i], [x2, y2]);
              return true;
            }
            i++;
          }
        }
      }
    }

    //一个拐点
    if (this.isRowEmpty(x1, y1, x2, y1) && this.pictures[y1][x2].isEmpty) { // (x1,y1) -> (x2,y1)
      if (this.isColEmpty(x2, y1, x2, y2)) { // (x1,y2) -> (x2,y2)
        this.addPoints([x1, y1], [x2, y1], [x2, y2]);
        return true;
      }
    }
    if (this.isColEmpty(x1, y1, x1, y2) && this.pictures[y2][x1].isEmpty) {
      if (this.isRowEmpty(x1, y2, x2, y2)) {
        this.addPoints([x1, y1], [x1, y2], [x2, y2]);
        return true;
      }
    }

    //不在一行的两个拐点
    if (x1 != x2 && y1 != y2) {
      i = x1;
      while (++i < this.cols) {
        if (!this.pictures[y1][i].isEmpty) {
          break;
        } else {
          if (this.isColEmpty(i, y1, i, y2) && this.isRowEmpty(i, y2, x2, y2) && this.pictures[y2][i].isEmpty) {
            this.addPoints([x1, y1], [i, y1], [i, y2], [x2, y2]);
            return true;
          }
        }
      }

      i = x1;
      while (--i >= 0) {
        if (!this.pictures[y1][i].isEmpty) {
          break;
        } else {
          if (this.isColEmpty(i, y1, i, y2) && this.isRowEmpty(i, y2, x2, y2) && this.pictures[y2][i].isEmpty) {
            this.addPoints([x1, y1], [i, y1], [i, y2], [x2, y2]);
            return true;
          }
        }
      }

      i = y1;
      while (++i < this.rows) {
        if (!this.pictures[i][x1].isEmpty) {
          break;
        } else {
          if (this.isRowEmpty(x1, i, x2, i) && this.isColEmpty(x2, i, x2, y2) && this.pictures[i][x2].isEmpty) {
            this.addPoints([x1, y1], [x1, i], [x2, i], [x2, y2]);
            return true;
          }
        }
      }

      i = y1;
      while (--i >= 0) {
        if (!this.pictures[i][x1].isEmpty) {
          break;
        } else {
          if (this.isRowEmpty(x1, i, x2, i) && this.isColEmpty(x2, i, x2, y2) && this.pictures[i][x2].isEmpty) {
            this.addPoints([x1, y1], [x1, i], [x2, i], [x2, y2]);
            return true;
          }
        }
      }
    }

    return false;
  },
  bindDomEvents: function () {
    var self = this;
    $('.wrapper').on('click', '.pic-box', function () {
      var supportDataSet = this.dataset ? true : false;
      var data = { // 兼容IE不支持dataset
        row: supportDataSet ? this.dataset.row : this.getAttribute('data-row'),
        col: supportDataSet ? this.dataset.col : this.getAttribute('data-col'),
        index: supportDataSet ? this.dataset.index : this.getAttribute('data-index')
      }
      self.checkMatch(data);
    }).on('click', '.disorder-box', function (event) {
      self.leftDisorderTime-- > 0 && self.disorder();
    }).on('click', '.replay-btn', function () {
      self.score = 0;
      self.level = 0;
      self.leftDisorderTime = 5;
      $('.game-over').addClass('hidden');
      self.reset();
    });

    // window.onbeforeunload = function (event) {
    //   return confirm("游戏可能会终止，您确定要刷新？");
    // };
  }
};