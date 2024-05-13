/**
 * @class drag
 * @description Provide a drag function
 * @author Jesper - 13 January 2023.
 */

(function($){
    var Drag = function(){
        this.v = '2024/04/09'
    }

    var dray = new Drag();

    // 吸附函数，当达到某个临界值时自动定位到指定位置
    dray.prototype.adsorbent = function(){
        console.log('这是吸附函数');
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