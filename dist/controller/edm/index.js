(function(){
	//文件保护操作，加密压缩-->混淆
	//操作对象
	var $this = '';
	//上传图片数组
	var allImg = [];
	//默认背景色
	var default_bgcolor = '#ffffff';
	
	/**
	 * tab切换
	 * *********/
	$('.box-content-header div').click(function(){
		$(this).addClass('active').siblings('div').removeClass('active');
		$('.box-content-content>div').eq($(this).index()).show().siblings('div').hide();
	});
	
	/**
	 * copy code
	 * *********/
	$('.copy-code').click(function(){
		$('#copy_box').text($('.look').html());
		copy('copy_box');
	});
	function copy(e){
		if(typeof(e) == 'string') e = document.getElementById(e);
		e.select();
		if(document.execCommand('copy')) {
			if($('.look').html()){
				layer.msg('复制代码成功！');
			}else{
				layer.msg('请先生成EDM！');
			}
			return true;
		}
		if(e.setSelectionRange) { // 标准浏览器
			e.setSelectionRange(0, 0);
		} else { // IE9-
			var range = e.createTextRange();
			range.moveEnd("character", 0);
		}
	};
	
	/**
	 * 语言项
	 * *********/
	$('.onoff-box').click(function(){
		$(this).toggleClass('checked');
		if($(this).hasClass('footer-onoff')){
			$('.edm-footer').parents('.row').toggle().prev('p.title').toggle();
		}
	});
		
	/**
	 * 图片编辑类弹窗
	 * *********/
	$('.pop-ups .close-pop-ups,.pop-ups .cancel').click(function(){
		$('.pop-ups').hide();
	});
	$('.pop-ups .ok').click(function(){
		//流编辑图片链接
		if($this.parents('.load-img-box')){
			allImg[$this.index()].href = $('.pop-ups .img-href').val().trim();
			allImg[$this.index()].rowBgcolor = $('.pop-ups .row-bgcolor').val().trim();
		}
		$('.pop-ups').hide();
	});
	
	/**
	 * 消息类弹窗
	 * *********/
	$('.pop-ups-info .close-pop-ups,.pop-ups-info .cancel').click(function(){
		$('.pop-ups-info').hide();
	});
	$('.pop-ups-info .ok').click(function(){
		if($this.attr('class').indexOf('column') >= 0){
			//获取父级元素，防止删除column后找不到$this
			var $this_parents = $this.parents('.column-box');
			
			$this.parents('.column').remove();
			//同步预览
			var tab_look = '<table style="width: 100%;" border="0" cellspacing="0" cellpadding="0"><tr>';
			$this_parents.find('.column').each(function(index, val){
				tab_look += '<td><img style="width: 100%;" src="'+ $(this).find('.img_src').val() +'"/></td>';
			});
			tab_look += '</tr></table>';
			$this_parents.parents('.col-md-7').find('.bg-onoff-box').html(tab_look);
			
		}else if($this.attr('class').indexOf('row') >= 0){
			$this.parents('.row').remove();
		}else if($this.attr('class').indexOf('output') >= 0){
			$('.look-btn').click();
		}else{
			alert('非法操作！');
		};
		
		$('.pop-ups-info').hide();
	});
	
	/**
	 * 颜色选择器
	 * *********/
	$('body').on('click','.picker', function(){
		$(this).colpick({
			layout: 'hex',
			color: '000000',
			onChange: function(hsb, hex, rgb, el) {
				$(el).find('.color-show').css({
					'background':'#'+hex
				}).parents('.color-show-box').siblings('.bgcolor').val('#'+hex);
			},
			onSubmit: function(hsb, hex, rgb, el){
				$(el).find('.color-show').css({
					'background':'#'+hex
				}).parents('.color-show-box').siblings('.bgcolor').val('#'+hex);
				$(el).colpickHide();
			}
		});
	});
	
	/**
	 * title提示框
	 * *********/
	$('body').on('mouseover','[j-title]',function(e){
		var e = e || window.event;
		var left=top=pagex=pagey=width=height=body_width=body_height=0;
		var title = $(this).attr('j-title');
		var dir = $(this).attr('j-title-dir');
		pagex = $(this).offset().left;
		pagey = $(this).offset().top;
		width = $(this).outerWidth();
		height = $(this).outerHeight();
		body_width = $('body').width();
		body_height = $('body').height();
		
		if(dir == 'top'){
			dir = 'tips-dir-t';
		}else if(dir == 'left'){
			dir = 'tips-dir-l';
		}else if(dir == 'bottom'){
			dir = 'tips-dir-b';
		}else{
			dir = 'tips-dir-r';
		};
		var tips = '<div class="tips"><div class="tips-content">'+ title +'<i class="tips-dir '+ dir +'"></i></div></div>';
		$('body').append(tips);
		if(dir == 'tips-dir-t'){
			$('.tips').css({
				left : pagex + 'px',
				bottom : (body_height - pagey + 10) + 'px'
			})
		}else if(dir == 'tips-dir-l'){
			$('.tips').css({
				right : (body_width - pagex + 10) + 'px',
				top : pagey + 'px'
			})
		}else if(dir == 'tips-dir-b'){
			$('.tips').css({
				left : pagex + 'px',
				top : (pagey + height + 10) + 'px'
			})
		}else{
			$('.tips').css({
				left : (pagex + width + 10) + 'px',
				top : pagey + 'px'
			})
		};
		
		$(this).mouseleave(function(){
			$('.tips').remove();
		});
		
	});
	
	
	/**
	 * 图片上传
	 * *********/
	//可识别路径转化
	function getObjectURL(file) {
		var url = null;
		if(window.createObjectURL != undefined) { //basic
			url = window.createObjectURL(file);
		} else if(window.URL != undefined) { //mozilla(firefox)
			url = window.URL.createObjectURL(file);
		} else if(window.webkitURL != undefined) { //webkit or chrome
			url = window.webkitURL.createObjectURL(file);
		}
		return url;
	};
	$('.load-img-btn').click(function(){
		$('#load-img').click();
	});
	$('input[type="file"]').change(function(e){
		var edm_width = $('.flow-box').find('.edm-width').val();
		var img_natural_width = $('.flow-box').find('.img-natural-width').val();
		var all_img_href = $('.flow-box').find('.all-img-href').val();
	    var files = document.getElementById('load-img').files;
	    allImg = [];
	    if(files.length){
			$('.load-img-box').html('');
		    for(var i = 0; i < files.length; i++){
		    	var img= document.createElement('img');
		    	img.src =  getObjectURL(files[i]);
		    	$('.load-img-box').append(img);
		    }
		    setTimeout(function(){
			    $('.load-img-box img').each(function(index,val){
			    	var obj_img = {};
			    	obj_img.name = files[index].name;
			    	var data = getImgNaturalDimensions(val);
			    	obj_img.width = data.w;
			    	obj_img.height = data.h;
			    	obj_img.href = all_img_href;
			    	obj_img.rowBgcolor = '#ffffff';
			    	allImg.push(obj_img);
			    	
			    	//设置预览图片样式
			    	$(val).css({'width':data.w*edm_width/img_natural_width/edm_width*100+'%'});
			    })
		    },500)
	    }
	});
	
	//获取图片真实属性
	function getImgNaturalDimensions(oImg) {
		var nWidth, nHeight;　　
		if(oImg.naturalWidth) { // 现代浏览器
			nWidth = oImg.naturalWidth;　　　　
			nHeight = oImg.naturalHeight;
		} else { // IE6/7/8
			var nImg = new Image();
			nImg.onload = function() {
				nWidth = nImg.width,
				nHeight = nImg.height;
			}
		};
		return {
			w: nWidth,
			h: nHeight
		};
	};
	
	/**
	 * 流编辑中的单个图片修改
	 * *********/
	$('.flow-box .load-img-box').on('click','img',function(){
		$this = $(this);
		var content = '<div><label>所在行背景色：</label><p class="picker" j-title="所在行背景色,在该行首列设置即可" j-title-dir="top"><span class="color-show-box"><span class="color-show"></span></span><input class="row-bgcolor bgcolor" type="text" /></p></div><div><label>图片链接(href)：</label><input class="img-href" type="text" /></div>';
		$('.pop-ups .pop-ups-box').addClass('active');
		$('.pop-ups .pop-ups-content').html(content);
		$('.pop-ups .row-bgcolor').val(allImg[$this.index()].rowBgcolor);
		$('.pop-ups .color-show').css({'background':allImg[$this.index()].rowBgcolor});
		$('.pop-ups .img-href').val(allImg[$this.index()].href);
		$('.pop-ups').show();
	});
	/**
	 * 流编辑生成EDM
	 * *********/
	$('.flow-box .output-edm').click(function(){
		$this = $(this);
		var edm_html = '';
		var temporary_width = 0;//临时宽度
		var $this_parents = $(this).parents('.flow-box');
		var edm_width = $this_parents.find('.edm-width').val();
		var table_bgcolor = $this_parents.find('.table-bgcolor').val()?$this_parents.find('.table-bgcolor').val():default_bgcolor;
		var img_natural_width = $this_parents.find('.img-natural-width').val();
		var lang_color = $this_parents.find('.lang-color').val();
		var lang_text = $this_parents.find('.lang-text').val();
		var all_img_src = $this_parents.find('.all-img-src').val();
		var all_img_href = $this_parents.find('.all-img-href').val();
		var preheader_text = $this_parents.find('.preheader-text').val();
		var href_type = $this_parents.find('.href-type option:selected').text();
		
		//拼接CSS
		edm_html += '<meta charset="UTF-8"/><div><style>html,body {margin: 0 !important;padding: 0 !important; width: 100% !important;}a {color: #888888;text-decoration: none;}* {-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;}div[style*="margin: 16px 0"] {margin: 0 !important;}table,td {mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;}table {border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;}table table table {table-layout: auto;}img {-ms-interpolation-mode: bicubic; display: block; border: 0; margin: auto}.main {width: '+ edm_width +'px !important;}.boxh { height:236px}.btn-link a {color: #FFFFFF !important;transition: all 100ms ease-in;}.btn-link a:hover{background: #333333 !important;border-color: #333333 !important; color: #ffffff !important}.web { display:block!important}.mobile { display:none !important}@media screen and (max-width: 660px){.main {width: 100% !important;}.stack-column,.stack-column-center {display: block !important;width: 100% !important;max-width: 100% !important;direction: ltr !important;height: auto !important;padding: 0px !important;}.stack-column-center {text-align: center !important;height: auto !important;padding: 0px !important; padding-bottom: 20px!important}.center-on-narrow {text-align: center !important;display: block !important;margin-left: auto !important;margin-right: auto !important;float: none !important;}table.center-on-narrow {display: inline-block !important;}.templateContainer {width: 100%!important}.templateColumn {width: 100%!important}.web { display:none!important}.mobile { display:block !important}.boxh { height:auto !important;}</style></div>';
		//开始拼接table
		edm_html += '<table class="main" style="border-collapse: collapse !important; border-spacing: 0px !important; table-layout: fixed !important; margin: 0px auto !important; width: 100%;" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tbody><tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><td align="center" valign="top" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;">';
		//拼接Preheader Text
		edm_html += '<!-- Visually Hidden Preheader Text : BEGIN --><div style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">'+ preheader_text +'</div><!-- Visually Hidden Preheader Text : END -->';
		edm_html += '<div style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width: '+ edm_width +'px;"><!--[if (gte mso 9)|(IE)]> <table cellspacing="0" cellpadding="0" border="0" width="'+ edm_width +'" align="center" style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;mso-table-lspace:0pt !important;mso-table-rspace:0pt !important;border-spacing:0 !important;border-collapse:collapse !important;table-layout:fixed !important;margin:0 auto !important;" mce_style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;mso-table-lspace:0pt !important;mso-table-rspace:0pt !important;border-spacing:0 !important;border-collapse:collapse !important;table-layout:fixed !important;margin:0 auto !important;" ><tr style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;" mce_style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;" ><td style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;mso-table-lspace:0pt !important;mso-table-rspace:0pt !important;" mce_style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;mso-table-lspace:0pt !important;mso-table-rspace:0pt !important;" ><![endif]--><!-- Email Body : BEGIN --><table style="max-width: '+ edm_width +'px; border-spacing: 0px !important; border-collapse: collapse !important; margin: 0px auto !important; table-layout: fixed !important; width: 100%; background: '+ table_bgcolor +';" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="'+ table_bgcolor +'"><tbody>';
		//拼接语言
		if($('.lang-onoff').hasClass('checked')){
			edm_html += '<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;"><table style="border-spacing: 0px !important; border-collapse: collapse !important; margin: 0px auto !important; table-layout: fixed !important; width: 100%;" border="0" cellspacing="0" cellpadding="0"><tbody><tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-height-rule: exactly; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; font-family: Microsoft JhengHei, Microsoft YaHei, Arial; font-size: 12px; line-height: 18px; color: #000000; text-align: right; padding: 15px; width: 30px;"><!-- *|XG:'+ href_type +'|* // --><span style="color: '+ lang_color +'!important; text-decoration: none!important">'+ lang_text +'</span><!-- *|END:XG:'+ href_type +'|* // --></td></tr></tbody></table></td></tr>';
		};
		
		for(var i = 0; i < allImg.length; i++){
			var w = allImg[i].width*edm_width/img_natural_width;
			var h = allImg[i].height;
			var href = allImg[i].href;
			var name = allImg[i].name;
			
			if(w == edm_width){//一行一张
				edm_html += '<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;"><table style="border-spacing: 0px !important; border-collapse: collapse !important; margin: 0px auto !important; table-layout: fixed !important; width: 100%; background: '+ allImg[i].rowBgcolor +';" bgcolor="'+ allImg[i].rowBgcolor +'" border="0" cellspacing="0" cellpadding="0"><tbody><tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">';
				if(allImg[i].href){
					edm_html += '<td class="banner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; padding: 0px; text-align: center;width: '+ w/edm_width*100 +'%;"><a style="line-height: 0;" href="'+ allImg[i].href +'" target="_blank"><img style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; max-width: '+ w +'px; -ms-interpolation-mode: bicubic; display: block; border: 0; margin: auto;" src="'+ all_img_src + allImg[i].name +'" alt="" width="'+ w +'" align="middle" border="0" /></a></td>';
				}else if(all_img_href){
					edm_html += '<td class="banner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; padding: 0px; text-align: center;width: '+ w/edm_width*100 +'%;"><a style="line-height: 0;" href="'+ all_img_href +'" target="_blank"><img style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; max-width: '+ w +'px; -ms-interpolation-mode: bicubic; display: block; border: 0; margin: auto;" src="'+ all_img_src + allImg[i].name +'" alt="" width="'+ w +'" align="middle" border="0" /></a></td>';
				}else{
					edm_html += '<td class="banner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; padding: 0px; text-align: center;width: '+ w/edm_width*100 +'%;"><img style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; max-width: '+ w +'px; -ms-interpolation-mode: bicubic; display: block; border: 0; margin: auto;" src="'+ all_img_src + allImg[i].name +'" alt="" width="'+ w +'" align="middle" border="0" /></td>';
				}
				edm_html += '</tr></tbody></table></td></tr>';
				temporary_width = 0;
			}else{
				if(!temporary_width){
					edm_html += '<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;"><table style="border-spacing: 0px !important; border-collapse: collapse !important; margin: 0px auto !important; table-layout: fixed !important; width: 100%; background: '+ allImg[i].rowBgcolor +';" bgcolor="'+ allImg[i].rowBgcolor +'" border="0" cellspacing="0" cellpadding="0"><tbody><tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">';
				}
				if(temporary_width < edm_width){//一行多张
					temporary_width += w;
					if(allImg[i].href){
						edm_html += '<td class="banner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; padding: 0px; text-align: center;width: '+ w/edm_width*100 +'%;"><a style="line-height: 0;" href="'+ allImg[i].href +'" target="_blank"><img style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; max-width: '+ w +'px; -ms-interpolation-mode: bicubic; display: block; border: 0; margin: auto;" src="'+ all_img_src + allImg[i].name +'" alt="" width="'+ w +'" align="middle" border="0" /></a></td>';
					}else if(all_img_href){
						edm_html += '<td class="banner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; padding: 0px; text-align: center;width: '+ w/edm_width*100 +'%;"><a style="line-height: 0;" href="'+ all_img_href +'" target="_blank"><img style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; max-width: '+ w +'px; -ms-interpolation-mode: bicubic; display: block; border: 0; margin: auto;" src="'+ all_img_src + allImg[i].name +'" alt="" width="'+ w +'" align="middle" border="0" /></a></td>';
					}else{
						edm_html += '<td class="banner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; padding: 0px; text-align: center;width: '+ w/edm_width*100 +'%;"><img style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; max-width: '+ w +'px; -ms-interpolation-mode: bicubic; display: block; border: 0; margin: auto;" src="'+ all_img_src + allImg[i].name +'" alt="" width="'+ w +'" align="middle" border="0" /></td>';
					}
					
					if(temporary_width >= edm_width){
						temporary_width = 0;
					}
				}
				if(!temporary_width){
					edm_html += '</tr></tbody></table></td></tr>';
				}
			}
		};
				
		//拼接footer
		if($('.footer-onoff').hasClass('checked')){
			edm_html += '<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;"><table style="border-spacing: 0px !important; border-collapse: collapse !important; margin: 0px auto !important; table-layout: fixed !important; width: 100%; background: #ffffff;" border="0" bgcolor="#ffffff" cellspacing="0" cellpadding="0"><tbody><tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><td class="banner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; padding: 15px 10px; text-align: center;">'+ $('.edm-footer').val() +'</td></tr></tbody></table></td></tr>';
		};
		
		edm_html += '</tbody></table><!-- Email Body : END --><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></div></td></tr></tbody></table>';
		//拼接JS
		edm_html += '<div><script type="text/javascript">document.getElementsByTagName("br")[0].style.display = "none";</script></div>';
		
		$('.look').html(edm_html);
		$('.pop-ups-info .pop-ups-content').html('生成页面成功，是否前往查看！');
		$('.pop-ups-info').show();
	})
	
})($)
