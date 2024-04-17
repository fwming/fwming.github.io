/**
 * @class drag
 * @description Provide a drag function
 * @author Jesper - 13 January 2023.
 */

(function($){
    var drag = function(initData){
        console.log(initData);
        // 默认参数
        var defaults = {
            /**
             * @opacity 透明度、
             * @times 拖拽过程动画时长(毫秒)、
             * @isRealTime 是否实时切换（实时切换阴影位置、放开后再切换位置）、
             * @lockX 锁定X轴、
             * @lockY 锁定Y轴、
             */
            opacity: initData.opacity ? initData.opacity : 0.8,
            times: initData.times ? initData.times : 300,
            isRealTime: initData.isRealTime ? initData.isRealTime : false,
            lockX: initData.lockX ? initData.lockX : false,
            lockY: initData.lockY ? initData.lockY : false,
            initSite: initData.initSite ? initData.initSite : {
                x: 0,
                y: 0
            }
        };
        var $_that = $(this);
        // $_that.css({

        // });
        console.log(defaults);

        // 鼠标按下事件
        $_that.mousedown(function(event){
            $_that.parent('.module-sorting').removeClass('lock');
            // 获取当前鼠标按下时坐标
            var mouseSite = {
                x: event.pageX,
                y: event.pageY,
            };
            // 目标初始位置坐标
            var $_that_position = {
                x: $(this).position().left,
                y: $(this).position().top
            }

            // 鼠标移动事件
            var mouseMove = {};
            $(document).mousemove(function(event){
                // 获取鼠标偏移量
                mouseMove = {
                    x: defaults.lockX ? 0 : event.pageX - mouseSite.x,
                    y: defaults.lockY ? 0 : event.pageY - mouseSite.y,
                };
                var that_left = $_that_position.x + mouseMove.x;
                var that_top = $_that_position.y + mouseMove.y;
                if(that_left <= 0){
                    that_left = 0;
                }
                var max_left = $('.module-sorting').width() - $_that.width();
                if(that_left >= max_left){
                    that_left= max_left;
                }

                console.log(that_left,that_top);

                // 设置物体实时位置
                $_that.css({
                    'top': that_top,
                    'left': that_left,
                });
            }).mouseup(function(event){
                // 销毁鼠标移动、抬起事件
                $(this).off('mousemove');
                $(this).off('mouseup');

                $_that.parent('.module-sorting').addClass('lock');

                console.log($_that,$_that.prev());
                if($_that.position().left <= 500){
                    $_that.prev().before($_that);
                }
            })
        })
    }
    // 吸附函数，当达到某个临界值时自动定位到指定位置
    var adsorbent = function(){
        
    }




    // 将函数挂载到$下
    // 标签调用，$('#id').drag()
    $.fn.extend({
        drag: drag
    })
    // 直接调用，$.drag()
    $.extend({
        drag: drag
    })
})(jQuery)