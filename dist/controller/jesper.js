layui.define(function(e){
	layui.use(['layer', 'form','element','jquery'], function() {
		var layer = layui.layer,
			form = layui.form,
			element = layui.element;
			$ = layui.$;
		
		//header模块切换
		$('.layui-header').on('click','[data-module]',function(){
			var module_id = $(this).attr('data-module');
			$('#'+module_id).removeClass('layui-hide').siblings('ul').addClass('layui-hide');
		})
		
	}),
	
	e("jesper",{})
});





