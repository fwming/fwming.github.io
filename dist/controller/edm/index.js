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
		var default_bgcolor = '#ffffff';
		var lang_onoff = false;
		var footer_onoff = false;
		var online_onoff = false;
		var loadjs_onoff = false;
		form.render();
		colorpicker.render({
			elem: '.table-bgcolor-colorpicker',
			color: '#ffffff',
			predefine: true,
			colors: ['#F00', '#0F0', '#00F', 'rgb(255, 69, 0)', 'rgba(255, 69, 0, 0.5)'],
			change: function(color) {
				$(this.elem).next('input').val(color || '#ffffff')
			},
			done: function(color) {
				$(this.elem).next('input').val(color || '#ffffff')
			}
		});
		colorpicker.render({
			elem: '.lang-color-colorpicker',
			color: '#ffffff',
			predefine: true,
			colors: ['#F00', '#0F0', '#00F', 'rgb(255, 69, 0)', 'rgba(255, 69, 0, 0.5)'],
			change: function(color) {
				$(this.elem).next('input').val(color || '#ffffff')
			},
			done: function(color) {
				$(this.elem).next('input').val(color || '#ffffff')
			}
		});
		form.on('switch(lang)',
		function(data) {
			if (data.elem.checked) {
				lang_onoff = true;
				$('.lang-text').attr('disabled', false)
			} else {
				lang_onoff = false;
				$('.lang-text').attr('disabled', true)
			}
		});
		form.on('switch(look)',
		function(data) {
			if (data.elem.checked) {
				online_onoff = true;
				$('.edm-online-version').show()
			} else {
				online_onoff = false;
				$('.edm-online-version').hide()
			}
		});
		form.on('switch(footer)',
		function(data) {
			if (data.elem.checked) {
				footer_onoff = true;
				$('.edm-footer').show()
			} else {
				footer_onoff = false;
				$('.edm-footer').hide()
			}
		});
		form.on('switch(loadjs)',
		function(data) {
			if (data.elem.checked) {
				loadjs_onoff = true;
				$('.edm-loadjs').show()
			} else {
				loadjs_onoff = false;
				$('.edm-loadjs').hide()
			}
		});
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
				content: '<div class="pop-ups"><div class="layui-row layui-col-space15"><div class="layui-col-md12"><label class="layui-form-label">行背景色</label><div class="layui-input-block"><div class="row-bgcolor-colorpicker" lay-tips="语言字体颜色"></div><input type="text" readonly="readonly" class="row-bgcolor layui-input colorpicker-val" value="#ffffff"/></div></div><div class="layui-col-md12"><label class="layui-form-label">图片链接</label><div class="layui-input-block"><input type="text" class="img-href layui-input"/></div></div></div></div>',
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
					$('.pop-ups .img-href').val(allImg[$this.index()].href)
				},
				btn: ['取消', '确定'],
				yes: function(index, layero) {
					layer.close(index)
				},
				btn2: function(index, layero) {
					allImg[$this.index()].href = $('.pop-ups .img-href').val().trim();
					allImg[$this.index()].rowBgcolor = $('.pop-ups .row-bgcolor').val().trim()
				}
			})
		});
		$('.flow-box .output-edm').click(function() {
			$this = $(this);
			var edm_html = '';
			var temporary_width = 0;
			var $this_parents = $(this).parents('.flow-box');
			var edm_width = $this_parents.find('.edm-width').val();
			var table_bgcolor = $this_parents.find('.table-bgcolor').val() ? $this_parents.find('.table-bgcolor').val() : default_bgcolor;
			var img_natural_width = $this_parents.find('.img-natural-width').val();
			var lang_color = $this_parents.find('.lang-color').val();
			var lang_text = $this_parents.find('.lang-text').val();
			var all_img_src = $this_parents.find('.all-img-src').val();
			var all_img_href = $this_parents.find('.all-img-href').val();
			var preheader_text = $this_parents.find('.preheader-text').val();
			var href_type = $this_parents.find('.href-type option:selected').text();
			var edm_footer = $this_parents.find('.edm-footer textarea').val();
			var edm_online_version = $this_parents.find('.edm-online-version textarea').val();
			var edm_js = $this_parents.find('.edm-loadjs textarea').val();
			var edm_style = '';
			$.ajax({
				type: "get",
				url: "./dist/controller/edm/edm-style.css",
				async: false,
				dataType: 'html',
				success: function(e) {
					edm_style = e
				},
				error: function(e) {
					console.log(e);
					return false
				}
			});
			edm_html += '<meta charset="UTF-8"/><div><style>' + edm_style + '</style></div>';
			if (loadjs_onoff) {
				edm_html += '<div><script type="text/javascript">' + edm_js + '</script></div>'
			}
			edm_html += '<table class="main" style="border-collapse: collapse !important; border-spacing: 0px !important; table-layout: fixed !important; margin: 0px auto !important; width: 100%;" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tbody><tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><td align="center" valign="top" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;">';
			edm_html += '<!-- Visually Hidden Preheader Text : BEGIN --><div style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">' + preheader_text + '</div><!-- Visually Hidden Preheader Text : END -->';
			edm_html += '<div style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width: ' + edm_width + 'px;"><!--[if (gte mso 9)|(IE)]> <table cellspacing="0" cellpadding="0" border="0" width="' + edm_width + '" align="center" style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;mso-table-lspace:0pt !important;mso-table-rspace:0pt !important;border-spacing:0 !important;border-collapse:collapse !important;table-layout:fixed !important;margin:0 auto !important;" mce_style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;mso-table-lspace:0pt !important;mso-table-rspace:0pt !important;border-spacing:0 !important;border-collapse:collapse !important;table-layout:fixed !important;margin:0 auto !important;" ><tr style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;" mce_style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;" ><td style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;mso-table-lspace:0pt !important;mso-table-rspace:0pt !important;" mce_style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;mso-table-lspace:0pt !important;mso-table-rspace:0pt !important;" ><![endif]--><!-- Email Body : BEGIN --><table style="max-width: ' + edm_width + 'px; border-spacing: 0px !important; border-collapse: collapse !important; margin: 0px auto !important; table-layout: fixed !important; width: 100%; background: ' + table_bgcolor + ';" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="' + table_bgcolor + '"><tbody>';
			if (online_onoff) {
				edm_html += '<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;"><table style="border-spacing: 0px !important; border-collapse: collapse !important; margin: 0px auto !important; table-layout: fixed !important; width: 100%; background: #ffffff;" border="0" bgcolor="#ffffff" cellspacing="0" cellpadding="0"><tbody><tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><td class="banner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; padding: 15px 10px; text-align: center;">' + edm_online_version + '</td></tr></tbody></table></td></tr>'
			}
			if (lang_onoff) {
				edm_html += '<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;"><table style="border-spacing: 0px !important; border-collapse: collapse !important; margin: 0px auto !important; table-layout: fixed !important; width: 100%;" border="0" cellspacing="0" cellpadding="0"><tbody><tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-height-rule: exactly; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; font-family: Microsoft JhengHei, Microsoft YaHei, Arial; font-size: 12px; line-height: 18px; color: #000000; text-align: right; padding: 15px; width: 30px;"><!-- *|XG:' + href_type + '|* // --><span style="color: ' + lang_color + '!important; text-decoration: none!important">' + lang_text + '</span><!-- *|END:XG:' + href_type + '|* // --></td></tr></tbody></table></td></tr>'
			};
			for (var i = 0; i < allImg.length; i++) {
				var w = allImg[i].width * edm_width / img_natural_width;
				var h = allImg[i].height;
				var href = allImg[i].href;
				var name = allImg[i].name;
				if (w == edm_width) {
					edm_html += '<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;"><table style="border-spacing: 0px !important; border-collapse: collapse !important; margin: 0px auto !important; table-layout: fixed !important; width: 100%; background: ' + allImg[i].rowBgcolor + ';" bgcolor="' + allImg[i].rowBgcolor + '" border="0" cellspacing="0" cellpadding="0"><tbody><tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">';
					if (allImg[i].href) {
						edm_html += '<td class="banner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; padding: 0px; text-align: center;width: ' + w / edm_width * 100 + '%;"><a style="line-height: 0;" href="' + allImg[i].href + '" target="_blank"><img style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; max-width: ' + w + 'px; -ms-interpolation-mode: bicubic; display: block; border: 0; margin: 0;line-height: 0;" src="' + all_img_src + allImg[i].name + '" alt="" width="' + w + '" align="middle" border="0" /></a></td>'
					} else if (all_img_href) {
						edm_html += '<td class="banner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; padding: 0px; text-align: center;width: ' + w / edm_width * 100 + '%;"><a style="line-height: 0;" href="' + all_img_href + '" target="_blank"><img style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; max-width: ' + w + 'px; -ms-interpolation-mode: bicubic; display: block; border: 0; margin: 0;line-height: 0;" src="' + all_img_src + allImg[i].name + '" alt="" width="' + w + '" align="middle" border="0" /></a></td>'
					} else {
						edm_html += '<td class="banner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; padding: 0px; text-align: center;width: ' + w / edm_width * 100 + '%;"><img style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; max-width: ' + w + 'px; -ms-interpolation-mode: bicubic; display: block; border: 0; margin: 0;line-height: 0;" src="' + all_img_src + allImg[i].name + '" alt="" width="' + w + '" align="middle" border="0" /></td>'
					}
					edm_html += '</tr></tbody></table></td></tr>';
					temporary_width = 0
				} else {
					if (!temporary_width) {
						edm_html += '<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;"><table style="border-spacing: 0px !important; border-collapse: collapse !important; margin: 0px auto !important; table-layout: fixed !important; width: 100%; background: ' + allImg[i].rowBgcolor + ';" bgcolor="' + allImg[i].rowBgcolor + '" border="0" cellspacing="0" cellpadding="0"><tbody><tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">'
					}
					if (temporary_width < edm_width) {
						temporary_width += w;
						if (allImg[i].href) {
							edm_html += '<td class="banner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; padding: 0px; text-align: center;width: ' + w / edm_width * 100 + '%;"><a style="line-height: 0;" href="' + allImg[i].href + '" target="_blank"><img style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; max-width: ' + w + 'px; -ms-interpolation-mode: bicubic; display: block; border: 0; margin: 0;line-height: 0;" src="' + all_img_src + allImg[i].name + '" alt="" width="' + w + '" align="middle" border="0" /></a></td>'
						} else if (all_img_href) {
							edm_html += '<td class="banner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; padding: 0px; text-align: center;width: ' + w / edm_width * 100 + '%;"><a style="line-height: 0;" href="' + all_img_href + '" target="_blank"><img style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; max-width: ' + w + 'px; -ms-interpolation-mode: bicubic; display: block; border: 0; margin: 0;line-height: 0;" src="' + all_img_src + allImg[i].name + '" alt="" width="' + w + '" align="middle" border="0" /></a></td>'
						} else {
							edm_html += '<td class="banner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; padding: 0px; text-align: center;width: ' + w / edm_width * 100 + '%;"><img style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; max-width: ' + w + 'px; -ms-interpolation-mode: bicubic; display: block; border: 0; margin: 0;line-height: 0;" src="' + all_img_src + allImg[i].name + '" alt="" width="' + w + '" align="middle" border="0" /></td>'
						}
						if (temporary_width >= edm_width) {
							temporary_width = 0
						}
					}
					if (!temporary_width) {
						edm_html += '</tr></tbody></table></td></tr>'
					}
				}
			};
			if (footer_onoff) {
				edm_html += '<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><td style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;"><table style="border-spacing: 0px !important; border-collapse: collapse !important; margin: 0px auto !important; table-layout: fixed !important; width: 100%; background: #ffffff;" border="0" bgcolor="#ffffff" cellspacing="0" cellpadding="0"><tbody><tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><td class="banner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; padding: 15px 10px; text-align: center; font-size: 12px;">' + edm_footer + '</td></tr></tbody></table></td></tr>'
			};
			edm_html += '</tbody></table><!-- Email Body : END --><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></div></td></tr></tbody></table>';
			$('.look').html(edm_html);
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