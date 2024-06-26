(function() {
	layui.use(['layer', 'element', 'form', 'colorpicker', 'copy'],
	function() {
		var layer = layui.layer,
		element = layui.element,
		form = layui.form,
		copy = layui.copy,
		colorpicker = layui.colorpicker;
		var $this = '';
		var allImg = [];
		form.render();
		function getObjectURL(file) {
			var url = null;
			if (window.createObjectURL != undefined) {
				url = window.createObjectURL(file)
			} else if (window.URL != undefined) {
				url = window.URL.createObjectURL(file)
			} else if (window.webkitURL != undefined) {
				url = window.webkitURL.createObjectURL(file)
			}
			return url
		};
		$('.load-img-btn').click(function() {
			$('#load-img').click()
		});
		$('input[type="file"]').change(function(e) {
			var edm_width = $('.flow-box').find('.edm-width').val();
			var img_natural_width = $('.flow-box').find('.img-natural-width').val();
			var all_img_href = $('.flow-box').find('.all-img-href').val();
			var files = document.getElementById('load-img').files;
			allImg = [];
			if (files.length) {
				$('.load-img-box').html('');
				for (var i = 0; i < files.length; i++) {
					var img = document.createElement('img');
					img.src = getObjectURL(files[i]);
					$('.load-img-box').append(img)
				};
				setTimeout(function() {
					$('.load-img-box img').each(function(index, val) {
						var obj_img = {};
						obj_img.name = files[index].name;
						var data = getImgNaturalDimensions(val);
						obj_img.width = data.w;
						obj_img.height = data.h;
						obj_img.href = all_img_href;
						obj_img.rowBgcolor = '#ffffff';
						obj_img.alt = '';
						allImg.push(obj_img);
						$(val).css({
							'width': data.w * edm_width / img_natural_width / edm_width * 100 + '%'
						})
					})
				},
				500);
				$('.output-edm').removeClass('layui-btn-disabled').attr('disabled', false)
			}
		});
		function getImgNaturalDimensions(oImg) {
			var nWidth, nHeight;
			if (oImg.naturalWidth) {
				nWidth = oImg.naturalWidth;
				nHeight = oImg.naturalHeight
			} else {
				var nImg = new Image();
				nImg.onload = function() {
					nWidth = nImg.width,
					nHeight = nImg.height
				}
			};
			return {
				w: nWidth,
				h: nHeight
			}
		};
		$('.flow-box .load-img-box').on('click', 'img',
		function() {
			$this = $(this);
			layer.open({
				type: 1,
				content: '<div class="pop-ups"><div class="layui-row layui-col-space15"><div class="layui-col-md12"><label class="layui-form-label">行背景色</label><div class="layui-input-block"><div class="row-bgcolor-colorpicker" lay-tips="语言字体颜色"></div><input type="text" readonly="readonly" class="row-bgcolor layui-input colorpicker-val" value="#ffffff"/></div></div><div class="layui-col-md12"><label class="layui-form-label">图片链接</label><div class="layui-input-block"><input type="text" class="img-href layui-input"/></div></div><div class="layui-col-md12"><label class="layui-form-label">图片Alt值</label><div class="layui-input-block"><input type="text" class="img-alt layui-input"/></div></div></div></div>',
				success: function(layero, index) {
					$('.pop-ups .row-bgcolor').val(allImg[$this.index()].rowBgcolor);
					colorpicker.render({
						elem: '.row-bgcolor-colorpicker',
						color: allImg[$this.index()].rowBgcolor || '#ffffff',
						predefine: true,
						colors: ['#F00', '#0F0', '#00F', 'rgb(255, 69, 0)', 'rgba(255, 69, 0, 0.5)'],
						change: function(color) {
							$(this.elem).next('input').val(color || '#ffffff')
						},
						done: function(color) {
							$(this.elem).next('input').val(color || '#ffffff')
						}
					});
					$('.pop-ups .img-href').val(allImg[$this.index()].href);
					$('.pop-ups .img-alt').val(allImg[$this.index()].alt);
				},
				btn: ['取消', '确定'],
				yes: function(index, layero) {
					layer.close(index)
				},
				btn2: function(index, layero) {
					allImg[$this.index()].rowBgcolor = $('.pop-ups .row-bgcolor').val().trim();
					allImg[$this.index()].href = $('.pop-ups .img-href').val().trim();
					allImg[$this.index()].alt = $('.pop-ups .img-alt').val().trim();
				}
			})
		});
		$('.flow-box .output-edm').click(function() {
			$this = $(this);
			var edm_mjml = '';
			var temporary_width = 0;
			var $this_parents = $(this).parents('.flow-box');
			var edm_width = $this_parents.find('.edm-width').val();
			var img_natural_width = $this_parents.find('.img-natural-width').val();
			var all_img_src = $this_parents.find('.all-img-src').val();
			var all_img_href = $this_parents.find('.all-img-href').val();

			edm_mjml += '<mjml><mj-head><mj-style> @media only screen and (max-width:480px) { .hide-mobile { display: none!important; height: 0!important; line-height:0!important; } .width100-mobile { width: 100%!important; } .paddingright30-mobile {padding-right: 30px!important;} } p { margin: 0!important; }</mj-style><mj-attributes><mj-all font-family="arial, sans-serif" ico-font-family="arial, sans-serif" line-height="24px" font-size="16px" padding="0" border="0"></mj-all></mj-attributes><mj-font name="PlayfairDisplay" href="https://imgsrv-uat.xgate.com/images/dGVuYW50MjA2/fonts/PlayfairDisplay.css"/></mj-head><mj-body width="'+ edm_width +'px">';

			for (var i = 0; i < allImg.length; i++) {
				var w = allImg[i].width * edm_width / img_natural_width;
				var href = allImg[i].href;
				var name = allImg[i].name;
				var alt = allImg[i].alt;
				if (w == edm_width) {
					edm_mjml += '<mj-section padding-top="0" padding-left="0" padding-right="0" padding-bottom="0">';
					if (href) {
						edm_mjml += '<mj-column><mj-image padding="0" src="' + all_img_src + name + '" href="'+ href +'" alt="'+ alt +'"></mj-column>';
					}else if(all_img_href){
						edm_mjml += '<mj-column><mj-image padding="0" src="' + all_img_src + name + '" href="'+ all_img_href +'" alt="'+ alt +'"></mj-column>';
					}else{
						edm_mjml += '<mj-column><mj-image padding="0" src="' + all_img_src + name + '" alt="'+ alt +'"></mj-column>';
					}
					edm_mjml += '</mj-section>';
					temporary_width = 0;
				} else {
					if (!temporary_width) {
						edm_mjml += '<mj-section padding-top="0" padding-left="0" padding-right="0" padding-bottom="0" background-color="#000000"><mj-group>';
					}
					if (temporary_width < edm_width) {
						temporary_width += w;
						if (href) {
							edm_mjml += '<mj-column padding-top="0" padding-left="0" padding-right="0" padding-bottom="0" width="' + w / edm_width * 100 + '%"><mj-image padding="0" src="' + all_img_src + name + '" href="'+ href +'" alt="'+ alt +'"></mj-image></mj-column>';
						}else if(all_img_href){
							edm_mjml += '<mj-column padding-top="0" padding-left="0" padding-right="0" padding-bottom="0" width="' + w / edm_width * 100 + '%"><mj-image padding="0" src="' + all_img_src + name + '" href="'+ all_img_href +'" alt="'+ alt +'"></mj-image></mj-column>';
						}else{
							edm_mjml += '<mj-column padding-top="0" padding-left="0" padding-right="0" padding-bottom="0" width="' + w / edm_width * 100 + '%"><mj-image padding="0" src="' + all_img_src + name + '" alt="'+ alt +'"></mj-image></mj-column>';
						}
						if (temporary_width >= edm_width) {
							temporary_width = 0
						}
					}
					if (!temporary_width) {
						edm_mjml += '</mj-group></mj-section>';
					}
				}
			};
			edm_mjml += '</mj-body></mjml>';
			
			$('.look').html(edm_mjml);
			layer.open({
				type: 1,
				title: '提示',
				area: 'auto',
				maxWidth: 360,
				content: '<div style="padding: 20px 15px;text-align: center;">代码成功生成，是否前往查看?</div>',
				btn: ['等等', '确定'],
				yes: function(index, layero) {
					layer.close(index)
				},
				btn2: function(index, layero) {
					element.tabChange('tabChange', '02')
				}
			});
			$('.copy-code').removeClass('layui-btn-disabled').attr('disabled', false)
		});
		$('.copy-code').click(function() {
			var code = $('.look').html();
			copy.copyFn(code)
		})
	})
})($)