layui.define(['layer', 'jquery'], function(e){
	var layer = layui.layer,
		$ = layui.$;
	
	/*
	 * 验证
	 * return true/false
	 *
	 * */
	var verify = {
		phone: function(e){
			var regs = /^1[3|4|5|7|8][0-9]{9}$/;
			return regs.test(e);
		},
		email: function(e){
			var regs = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
			return regs.test(e);
		},
		isNull: function(e){
			return e == '';
		},
		all: function(e){
			
		}
	}
	

	e("verify", verify);
})
