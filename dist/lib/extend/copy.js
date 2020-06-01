layui.define(['layer','jquery','element'], function(e){
	var layer = layui.layer,
		element = layui.element,
		$ = layui.$;
	
	var obj = {
		copy2 : function(e) {
			if(typeof(e) == 'string') e = document.getElementById(e);
			e.select();
			if(document.execCommand('copy')) {
				layer.msg('复制代码成功！');
				return true;
			}
			if(e.setSelectionRange) { // 标准浏览器
				e.setSelectionRange(0, 0)
			} else { // IE9-
				var range = e.createTextRange()
				range.moveEnd("character", 0)
			}
		}
		
	}
	
	e("copy", obj)
});
