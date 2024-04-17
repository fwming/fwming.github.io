(function() {
	layui.use(['upload', 'layer', 'layedit', 'form', 'copy'],	function() {
		var layer = layui.layer,
            form = layui.form,
            copy = layui.copy,
            upload = layui.upload,
            layedit = layui.layedit;

        // 获取编辑模式盒子
        var $_edit_en = $('.edit_en');
        var $_edit_tc = $('.edit_tc');
        var $_edit_sc = $('.edit_sc');

        upload.render({
            elem: '#test2',
            url: 'https://gitee.com/fwmlc/test/upload_process/master', //此处配置你自己的上传接口即可
            multiple: true,
            before: function(obj){
                //预读本地文件示例，不支持ie8
                obj.preview(function(index, file, result){
                    $('#demo2').append('<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img">')
                });
            },
            done: function(res){
                console.log(res);
                //上传完毕
            }
        });
<<<<<<< HEAD:dist/controller/edm/editHarbourCity.js

        $('.module-sorting>div').each(function(){
            $(this).drag({
                times: '300',
                isRealTime: false,
                lockX: false,
                lockY: true,
                zIndex: 999
            });
        });
=======
>>>>>>> 5cbf9426dc237eabf822377449afdeba19ef9d2a:dist/controller/edm/editHarbourCity_source.js

        // 图片路径
        var imgUrl = '';
        // 保存加载图片名称
        var imgArr = [];

        // 自动填充时间
        var data = new Date();
        var y = data.getFullYear();
        var m = data.getMonth() + 1;
        var d = data.getDate();
        if(d > 15){
            m++;
            d = '1';
        }else{
            d = '15';
        }
        $('.startTime').val(d+'.'+m+'.'+y);

        // 储存获取到的Excel数据
        var excel_datas = {};

        // 获取版本--默认Normal
        var EDM_Version = 'Normal';
        form.render();
        form.on('radio(version)', function(data){
            EDM_Version = data.value;
            console.log('版本：' + EDM_Version);
        });        

        // 编辑器初始化
		layedit.set({
			//开发者模式 --默认为false
			devmode: true,
			//插入代码设置
			codeConfig: {
				//hide: true,  //是否显示编码语言选择框
				//default: 'HTML' //hide为true时的默认语言格式
			},
			tool: [
				'html', 'code', 'strong', 'italic', 'underline', 'del', 'addhr', '|', 
				'fontFomatt', 'fontfamily', 'fontSize', 'colorpicker', 'fontBackColor', 'face', '|', 
				'left', 'center', 'right', '|', 'link', 'unlink', 'images', 'image_alt', 'video', 'anchors', '|', 
				'table', 'preview', 'help',
			],
			height: '578'
		});
		var index_en = layedit.build('en');
		var index_tc = layedit.build('tc');
		var index_sc = layedit.build('sc');

        // 同步编辑模式与微调模式
        function Synchronize(){
            layedit.setContent(index_en, $_edit_en.html(), false);
            layedit.setContent(index_tc, $_edit_tc.html(), false);
            layedit.setContent(index_sc, $_edit_sc.html(), false);
        };

        // 导入Excel文件
        $('.load-file-btn').click(function(){
            $('#load-file').click();
        });
        // 读取excel数据
        $('#load-file').change(function() {
            // 获取传递过来的内容
            let file = this.files[0];
            console.log(file);
            // 创建 FileReader 示例
            let showPreview = new FileReader();
            // 读取文件
            showPreview.readAsBinaryString(file);
            // 文件读取成功时的回调函数
            showPreview.onload = (e) => {
                // 获取传递的表格
                let data = e.target.result;
                // 以二进制流方式读取到整份的excel 表格对象
                let workbook = XLSX.read(data, {
                    type: 'binary'
                });
                // 表格的表格范围，可用于判断表头是否数量是否正确
                let fromTo = '';
                console.log(fromTo);
                // 遍历每张表读取
                for (var sheet in workbook.Sheets) {
                    persons = [];
                    // 判断文件是否是 excel 文件
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        // 对表格的内容进行处理
                        persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                        excel_datas[sheet] = persons;
                        // 如果只取第一张表，就取消注释这行
                        // break;
                    }
                };
                console.log(excel_datas);
                if(excel_datas){
                    layer.msg('上传文件成功');
                }else{
                    layer.msg('上传文件失败');
                }
            }
        });


        // 上传图片
		$('.load-img-btn').click(function(){            
            // 图片路径
            imgUrl = $('.imgUrl').val().trim();
            if(!/.\/$/.test(imgUrl)){
                $('.imgUrl').css({'border-color': 'red'});
                layer.msg("请填写图片路径前缀,以'/'结束");
            }else{
                $('.imgUrl').css({'border-color': '#e6e6e6'});
                $('#load-img').click();
            }
		});
		$('#load-img').change(function() {
            imgArr = [];
			var files = document.getElementById('load-img').files;
            console.log(files);
            
            for(var i = 0; i < files.length; i++){
                if(files[i].type.indexOf('image/') >= 0){
                    imgArr.push(imgUrl + files[i].name);
                }
            };
            if(imgArr.length == files.length){
                layer.msg('上传图片成功');
            }else{
                layer.msg('请上传图片类型');
            }
            console.log(imgArr);
		});


        // 一键生成
        $('.create-edm-btn').click(function(){
            if(imgArr.length>0 && excel_datas){
                console.time('CreateEDM');
                CreateEDM(excel_datas);
                console.timeEnd('CreateEDM');
            }else{
                layer.msg('请先上传文件和图片');
            }
        });


        // 同步模式
        $('.save-btn').click(function(){
            layer.msg("同步成功");
            Synchronize();
        });


        // 复制代码
		$('.copy-code').click(function() {
			var code = $('.look').html();
			copy.copyFn(code);
		});


        // 创建EDM函数
        function CreateEDM(resource){
            // 图片下标
            var imgIndex = 0;
            // 开始时间
            var startTime = $('.startTime').val().trim();
            // 小标题
            var en_preSubject = $('.en_preSubject').val().trim();
            var tc_preSubject = $('.tc_preSubject').val().trim();
            var sc_preSubject = $('.sc_preSubject').val().trim();
            // 整体结构
            var en_layout = '';
            var tc_layout = '';
            var sc_layout = '';
            // 动态资源
            var en_New_Store_Highlight = '';
            var tc_New_Store_Highlight = '';
            var sc_New_Store_Highlight = '';
            var en_Exclusive_Highlight = '';
            var tc_Exclusive_Highlight = '';
            var sc_Exclusive_Highlight = '';
            var en_Event_Highlight = '';
            var tc_Event_Highlight = '';
            var sc_Event_Highlight = '';
            var en_Exclusive = '';
            var tc_Exclusive = '';
            var sc_Exclusive = '';
            var en_All_Tier = '';
            var tc_All_Tier = '';
            var sc_All_Tier = '';

            // 静态资源
            var en_style = '';
            var tc_style = '';
            var sc_style = '';
            var en_header = '';
            var tc_header = '';
            var sc_header = '';
            var en_gift1 = '';
            var tc_gift1 = '';
            var sc_gift1 = '';
            var en_gift2 = '';
            var tc_gift2 = '';
            var sc_gift2 = '';
            var en_footer = '';
            var tc_footer = '';
            var sc_footer = '';
            var line = '';
            var space = '';
            var en_newStoreHeader = '';
            var tc_newStoreHeader = '';
            var sc_newStoreHeader = '';
            var en_exclusiveHeader = '';
            var tc_exclusiveHeader = '';
            var sc_exclusiveHeader = '';
            var en_eventHeader = '';
            var tc_eventHeader = '';
            var sc_eventHeader = '';
            var en_hasLogo = '';
            var tc_hasLogo = '';
            var sc_hasLogo = '';
            var en_noLogo = '';
            var tc_noLogo = '';
            var sc_noLogo = '';
            var en_imgText = '';
            var tc_imgText = '';
            var sc_imgText = '';


            // 获取静态资源
            $.ajax({
				type: "get",
				url: "./dist/views/conventional/tool/harbourCity/template.html",
				async: false,
				dataType: 'html',
				success: function(e) {
                    en_style = e.split('<!-- style -->')[1].split('<!-- en -->')[1];
                    tc_style = e.split('<!-- style -->')[1].split('<!-- tc -->')[1];
                    sc_style = e.split('<!-- style -->')[1].split('<!-- sc -->')[1];
                    EDM_Version == 'Normal'? versionBg = '#BAA79C' : versionBg = '#666666';
                    en_header = e.split('<!-- header -->')[1].split('<!-- en -->')[1].replace('$_startTime', startTime).replace('$_preSubject', en_preSubject).replace('$_versionBg',versionBg);
                    tc_header = e.split('<!-- header -->')[1].split('<!-- tc -->')[1].replace('$_startTime', startTime).replace('$_preSubject', tc_preSubject).replace('$_versionBg',versionBg);
                    sc_header = e.split('<!-- header -->')[1].split('<!-- sc -->')[1].replace('$_startTime', startTime).replace('$_preSubject', sc_preSubject).replace('$_versionBg',versionBg);
                    en_gift1 = e.split('<!-- gift1 -->')[1].split('<!-- en -->')[1];
                    tc_gift1 = e.split('<!-- gift1 -->')[1].split('<!-- tc -->')[1];
                    sc_gift1 = e.split('<!-- gift1 -->')[1].split('<!-- sc -->')[1];
                    en_gift2 = e.split('<!-- gift2 -->')[1].split('<!-- en -->')[1];
                    tc_gift2 = e.split('<!-- gift2 -->')[1].split('<!-- tc -->')[1];
                    sc_gift2 = e.split('<!-- gift2 -->')[1].split('<!-- sc -->')[1];
                    en_footer = e.split('<!-- footer -->')[1].split('<!-- en -->')[1].replace('$_remarks',resource.Remarks[0].Remarks_EN.replace(/\n/g, '<br>'));
                    tc_footer = e.split('<!-- footer -->')[1].split('<!-- tc -->')[1].replace('$_remarks',resource.Remarks[0].Remarks_TC.replace(/\n/g, '<br>'));
                    sc_footer = e.split('<!-- footer -->')[1].split('<!-- sc -->')[1].replace('$_remarks',resource.Remarks[0].Remarks_SC.replace(/\n/g, '<br>'));
                    line = e.split('<!-- line -->')[1];
                    space = e.split('<!-- space -->')[1];

                    en_newStoreHeader = e.split('<!-- newStoreHeader -->')[1].split('<!-- en -->')[1];
                    tc_newStoreHeader = e.split('<!-- newStoreHeader -->')[1].split('<!-- tc -->')[1];
                    sc_newStoreHeader = e.split('<!-- newStoreHeader -->')[1].split('<!-- sc -->')[1];
                    en_exclusiveHeader = e.split('<!-- exclusiveHeader -->')[1].split('<!-- en -->')[1];
                    tc_exclusiveHeader = e.split('<!-- exclusiveHeader -->')[1].split('<!-- tc -->')[1];
                    sc_exclusiveHeader = e.split('<!-- exclusiveHeader -->')[1].split('<!-- sc -->')[1];
                    en_eventHeader = e.split('<!-- eventHeader -->')[1].split('<!-- en -->')[1];
                    tc_eventHeader = e.split('<!-- eventHeader -->')[1].split('<!-- tc -->')[1];
                    sc_eventHeader = e.split('<!-- eventHeader -->')[1].split('<!-- sc -->')[1];
                    en_hasLogo = e.split('<!-- hasLogo -->')[1].split('<!-- en -->')[1];
                    tc_hasLogo = e.split('<!-- hasLogo -->')[1].split('<!-- tc -->')[1];
                    sc_hasLogo = e.split('<!-- hasLogo -->')[1].split('<!-- sc -->')[1];
                    en_noLogo = e.split('<!-- noLogo -->')[1].split('<!-- en -->')[1];
                    tc_noLogo = e.split('<!-- noLogo -->')[1].split('<!-- tc -->')[1];
                    sc_noLogo = e.split('<!-- noLogo -->')[1].split('<!-- sc -->')[1];
                    en_imgText = e.split('<!-- imgText -->')[1].split('<!-- en -->')[1];
                    tc_imgText = e.split('<!-- imgText -->')[1].split('<!-- tc -->')[1];
                    sc_imgText = e.split('<!-- imgText -->')[1].split('<!-- sc -->')[1];

<<<<<<< HEAD:dist/controller/edm/editHarbourCity.js
                    
                    
=======

                    // New_Store_Highlight
                    var isHasHeader_newStore_Highlight = 0;
                    if(resource.New_Store_Highlight.length){
                        for(var i = 0; i < resource.New_Store_Highlight.length; i++){
                            if(!(EDM_Version == 'Shui' && resource.New_Store_Highlight[i].BelongTo_Shui == 'no')){
                                isHasHeader_newStore_Highlight++;
                                if(isHasHeader_newStore_Highlight == 1){
                                    en_New_Store_Highlight += en_newStoreHeader;
                                    tc_New_Store_Highlight += tc_newStoreHeader;
                                    sc_New_Store_Highlight += sc_newStoreHeader;
                                }
                                if(resource.New_Store_Highlight[i].Has_logo == 'yes'){
                                    en_New_Store_Highlight += en_hasLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_logoImgSrc', imgArr[(imgIndex+1)]).replace('$_dynamicText', resource.New_Store_Highlight[i].Offer_EN.replace(/\n/g, '<br>'));
                                    tc_New_Store_Highlight += tc_hasLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_logoImgSrc', imgArr[(imgIndex+1)]).replace('$_dynamicText', resource.New_Store_Highlight[i].Offer_TC.replace(/\n/g, '<br>'));
                                    sc_New_Store_Highlight += sc_hasLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_logoImgSrc', imgArr[(imgIndex+1)]).replace('$_dynamicText', resource.New_Store_Highlight[i].Offer_SC.replace(/\n/g, '<br>'));

                                    imgIndex += 2;
                                }else{
                                    en_New_Store_Highlight += en_noLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_dynamicText', resource.New_Store_Highlight[i].Offer_EN.replace(/\n/g, '<br>'));
                                    tc_New_Store_Highlight += tc_noLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_dynamicText', resource.New_Store_Highlight[i].Offer_TC.replace(/\n/g, '<br>'));
                                    sc_New_Store_Highlight += sc_noLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_dynamicText', resource.New_Store_Highlight[i].Offer_SC.replace(/\n/g, '<br>'));

                                    imgIndex++;
                                }
                                // 加分割线
                                if(i < resource.New_Store_Highlight.length - 1){
                                    en_New_Store_Highlight += line;
                                    tc_New_Store_Highlight += line;
                                    sc_New_Store_Highlight += line;
                                }

                            }
                        };
                        // 末尾加空白间隔
                        if(isHasHeader_newStore_Highlight){
                            en_New_Store_Highlight += space;
                            tc_New_Store_Highlight += space;
                            sc_New_Store_Highlight += space;
                        }
                    };
                    
                    // Exclusive_Highlight
                    var isHasHeader_Exclusive_Highlight = 0;
                    if(resource.Exclusive_Highlight.length){
                        for(var i = 0; i < resource.Exclusive_Highlight.length; i++){
                            if(!(EDM_Version == 'Shui' && resource.Exclusive_Highlight[i].BelongTo_Shui == 'no')){
                                isHasHeader_Exclusive_Highlight++;
                                if(isHasHeader_Exclusive_Highlight == 1){
                                    en_Exclusive_Highlight += en_exclusiveHeader;
                                    tc_Exclusive_Highlight += tc_exclusiveHeader;
                                    sc_Exclusive_Highlight += sc_exclusiveHeader;
                                }
                                if(resource.Exclusive_Highlight[i].Has_logo == 'yes'){
                                    en_Exclusive_Highlight += en_hasLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_logoImgSrc', imgArr[(imgIndex+1)]).replace('$_dynamicText', resource.Exclusive_Highlight[i].Offer_EN.replace(/\n/g, '<br>'));
                                    tc_Exclusive_Highlight += tc_hasLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_logoImgSrc', imgArr[(imgIndex+1)]).replace('$_dynamicText', resource.Exclusive_Highlight[i].Offer_TC.replace(/\n/g, '<br>'));
                                    sc_Exclusive_Highlight += sc_hasLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_logoImgSrc', imgArr[(imgIndex+1)]).replace('$_dynamicText', resource.Exclusive_Highlight[i].Offer_SC.replace(/\n/g, '<br>'));
                                    
                                    imgIndex += 2;
                                }else{
                                    en_Exclusive_Highlight += en_noLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_dynamicText', resource.Exclusive_Highlight[i].Offer_EN.replace(/\n/g, '<br>'));
                                    tc_Exclusive_Highlight += tc_noLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_dynamicText', resource.Exclusive_Highlight[i].Offer_TC.replace(/\n/g, '<br>'));
                                    sc_Exclusive_Highlight += sc_noLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_dynamicText', resource.Exclusive_Highlight[i].Offer_SC.replace(/\n/g, '<br>'));

                                    imgIndex++;
                                }
                                // 加分割线
                                if(i < resource.Exclusive_Highlight.length - 1){
                                    en_Exclusive_Highlight += line;
                                    tc_Exclusive_Highlight += line;
                                    sc_Exclusive_Highlight += line;
                                }

                            }
                        };
                        // 末尾加空白间隔
                        if(isHasHeader_Exclusive_Highlight){
                            en_Exclusive_Highlight += space;
                            tc_Exclusive_Highlight += space;
                            sc_Exclusive_Highlight += space;
                        }
                    };

>>>>>>> 5cbf9426dc237eabf822377449afdeba19ef9d2a:dist/controller/edm/editHarbourCity_source.js
                    // Event_Highlight
                    var isHasHeader_Event_Highlight = 0;
                    if(resource.Event_Highlight.length){
                        for(var i = 0; i < resource.Event_Highlight.length; i++){
                            if(!(EDM_Version == 'Shui' && resource.Event_Highlight[i].BelongTo_Shui == 'no')){
                                isHasHeader_Event_Highlight++;
                                if(isHasHeader_Event_Highlight == 1){
                                    en_Event_Highlight += en_eventHeader;
                                    tc_Event_Highlight += tc_eventHeader;
                                    sc_Event_Highlight += sc_eventHeader;
                                }                                
                                if(resource.Event_Highlight[i].Has_logo == 'yes'){
                                    en_Event_Highlight += en_hasLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_logoImgSrc', imgArr[(imgIndex+1)]).replace('$_dynamicText', resource.Event_Highlight[i].Offer_EN.replace(/\n/g, '<br>'));
                                    tc_Event_Highlight += tc_hasLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_logoImgSrc', imgArr[(imgIndex+1)]).replace('$_dynamicText', resource.Event_Highlight[i].Offer_TC.replace(/\n/g, '<br>'));
                                    sc_Event_Highlight += sc_hasLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_logoImgSrc', imgArr[(imgIndex+1)]).replace('$_dynamicText', resource.Event_Highlight[i].Offer_SC.replace(/\n/g, '<br>'));

                                    imgIndex += 2;
                                }else{
                                    en_Event_Highlight += en_noLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_dynamicText', resource.Event_Highlight[i].Offer_EN.replace(/\n/g, '<br>'));
                                    tc_Event_Highlight += tc_noLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_dynamicText', resource.Event_Highlight[i].Offer_TC.replace(/\n/g, '<br>'));
                                    sc_Event_Highlight += sc_noLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_dynamicText', resource.Event_Highlight[i].Offer_SC.replace(/\n/g, '<br>'));

                                    imgIndex++;
                                }
                                // 加分割线
                                if(i < resource.Event_Highlight.length - 1){
                                    en_Event_Highlight += line;
                                    tc_Event_Highlight += line;
                                    sc_Event_Highlight += line;
                                }
                            }
                        };
                        // 末尾加空白间隔
                        if(isHasHeader_Event_Highlight){
                            en_Event_Highlight += space;
                            tc_Event_Highlight += space;
                            sc_Event_Highlight += space;
                        }
<<<<<<< HEAD:dist/controller/edm/editHarbourCity.js
                    }
                    
                    // Exclusive_Highlight
                    var isHasHeader_Exclusive_Highlight = 0;
                    if(resource.Exclusive_Highlight.length){
                        for(var i = 0; i < resource.Exclusive_Highlight.length; i++){
                            if(!(EDM_Version == 'Shui' && resource.Exclusive_Highlight[i].BelongTo_Shui == 'no')){
                                isHasHeader_Exclusive_Highlight++;
                                if(isHasHeader_Exclusive_Highlight == 1){
                                    en_Exclusive_Highlight += en_exclusiveHeader;
                                    tc_Exclusive_Highlight += tc_exclusiveHeader;
                                    sc_Exclusive_Highlight += sc_exclusiveHeader;
                                }
                                if(resource.Exclusive_Highlight[i].Has_logo == 'yes'){
                                    en_Exclusive_Highlight += en_hasLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_logoImgSrc', imgArr[(imgIndex+1)]).replace('$_dynamicText', resource.Exclusive_Highlight[i].Offer_EN.replace(/\n/g, '<br>'));
                                    tc_Exclusive_Highlight += tc_hasLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_logoImgSrc', imgArr[(imgIndex+1)]).replace('$_dynamicText', resource.Exclusive_Highlight[i].Offer_TC.replace(/\n/g, '<br>'));
                                    sc_Exclusive_Highlight += sc_hasLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_logoImgSrc', imgArr[(imgIndex+1)]).replace('$_dynamicText', resource.Exclusive_Highlight[i].Offer_SC.replace(/\n/g, '<br>'));
                                    
                                    imgIndex += 2;
                                }else{
                                    en_Exclusive_Highlight += en_noLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_dynamicText', resource.Exclusive_Highlight[i].Offer_EN.replace(/\n/g, '<br>'));
                                    tc_Exclusive_Highlight += tc_noLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_dynamicText', resource.Exclusive_Highlight[i].Offer_TC.replace(/\n/g, '<br>'));
                                    sc_Exclusive_Highlight += sc_noLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_dynamicText', resource.Exclusive_Highlight[i].Offer_SC.replace(/\n/g, '<br>'));

                                    imgIndex++;
                                }
                                // 加分割线
                                if(i < resource.Exclusive_Highlight.length - 1){
                                    en_Exclusive_Highlight += line;
                                    tc_Exclusive_Highlight += line;
                                    sc_Exclusive_Highlight += line;
                                }

                            }
                        }
                        // 末尾加空白间隔
                        if(isHasHeader_Exclusive_Highlight){
                            en_Exclusive_Highlight += space;
                            tc_Exclusive_Highlight += space;
                            sc_Exclusive_Highlight += space;
                        }
                    };
                    
                    // New_Store_Highlight
                    var isHasHeader_newStore_Highlight = 0;
                    if(resource.New_Store_Highlight.length){
                        for(var i = 0; i < resource.New_Store_Highlight.length; i++){
                            if(!(EDM_Version == 'Shui' && resource.New_Store_Highlight[i].BelongTo_Shui == 'no')){
                                isHasHeader_newStore_Highlight++;
                                if(isHasHeader_newStore_Highlight == 1){
                                    en_New_Store_Highlight += en_newStoreHeader;
                                    tc_New_Store_Highlight += tc_newStoreHeader;
                                    sc_New_Store_Highlight += sc_newStoreHeader;
                                }
                                if(resource.New_Store_Highlight[i].Has_logo == 'yes'){
                                    en_New_Store_Highlight += en_hasLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_logoImgSrc', imgArr[(imgIndex+1)]).replace('$_dynamicText', resource.New_Store_Highlight[i].Offer_EN.replace(/\n/g, '<br>'));
                                    tc_New_Store_Highlight += tc_hasLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_logoImgSrc', imgArr[(imgIndex+1)]).replace('$_dynamicText', resource.New_Store_Highlight[i].Offer_TC.replace(/\n/g, '<br>'));
                                    sc_New_Store_Highlight += sc_hasLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_logoImgSrc', imgArr[(imgIndex+1)]).replace('$_dynamicText', resource.New_Store_Highlight[i].Offer_SC.replace(/\n/g, '<br>'));

                                    imgIndex += 2;
                                }else{
                                    en_New_Store_Highlight += en_noLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_dynamicText', resource.New_Store_Highlight[i].Offer_EN.replace(/\n/g, '<br>'));
                                    tc_New_Store_Highlight += tc_noLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_dynamicText', resource.New_Store_Highlight[i].Offer_TC.replace(/\n/g, '<br>'));
                                    sc_New_Store_Highlight += sc_noLogo.replace('$_bannerImgSrc', imgArr[imgIndex]).replace('$_dynamicText', resource.New_Store_Highlight[i].Offer_SC.replace(/\n/g, '<br>'));

                                    imgIndex++;
                                }
                                // 加分割线
                                if(i < resource.New_Store_Highlight.length - 1){
                                    en_New_Store_Highlight += line;
                                    tc_New_Store_Highlight += line;
                                    sc_New_Store_Highlight += line;
                                }

                            }
                        }
                        // 末尾加空白间隔
                        if(isHasHeader_newStore_Highlight){
                            en_New_Store_Highlight += space;
                            tc_New_Store_Highlight += space;
                            sc_New_Store_Highlight += space;
                        }
                    }
=======
                    };
>>>>>>> 5cbf9426dc237eabf822377449afdeba19ef9d2a:dist/controller/edm/editHarbourCity_source.js

                    // Exclusive
                    if(resource.Exclusive){
                        var itemDir = 'dir="ltr"';
                        for(var i = 0; i < resource.Exclusive.length; i++){
                            i % 2 ? itemDir = 'dir="ltr"' : itemDir = 'dir="rtl"';
                            EDM_Version == 'Normal' ? Points = resource.Exclusive[i].Points_Normal : Points = resource.Exclusive[i].Points_Shui;
                            en_Exclusive += en_imgText.replace('$_itemDir', itemDir).replace('$_itemImgSrc', imgArr[imgIndex]).replace('$_itemTitle', resource.Exclusive[i].Brand).replace('$_itemText', resource.Exclusive[i].Items_EN).replace('$_itemRemarks', resource.Exclusive[i].Remarks).replace('$_itemDate', resource.Exclusive[i].Redemption_Date).replace('$_itemPoints', Points).replace('$_itemQty', resource.Exclusive[i].QTY);
                            tc_Exclusive += tc_imgText.replace('$_itemDir', itemDir).replace('$_itemImgSrc', imgArr[imgIndex]).replace('$_itemTitle', resource.Exclusive[i].Brand).replace('$_itemText', resource.Exclusive[i].Items_TC).replace('$_itemRemarks', resource.Exclusive[i].Remarks).replace('$_itemDate', resource.Exclusive[i].Redemption_Date).replace('$_itemPoints', Points).replace('$_itemQty', resource.Exclusive[i].QTY);
                            sc_Exclusive += sc_imgText.replace('$_itemDir', itemDir).replace('$_itemImgSrc', imgArr[imgIndex]).replace('$_itemTitle', resource.Exclusive[i].Brand).replace('$_itemText', resource.Exclusive[i].Items_SC).replace('$_itemRemarks', resource.Exclusive[i].Remarks).replace('$_itemDate', resource.Exclusive[i].Redemption_Date).replace('$_itemPoints', Points).replace('$_itemQty', resource.Exclusive[i].QTY);
                            imgIndex++;
                        }
                    };

                    // All_Tier
                    if(resource.All_Tier){
                        var itemDir = 'dir="ltr"';
                        for(var i = 0; i < resource.All_Tier.length; i++){
                            i % 2 ? itemDir = 'dir="ltr"' : itemDir = 'dir="rtl"';
                            EDM_Version == 'Normal' ? Points = resource.All_Tier[i].Points_Normal : Points = resource.All_Tier[i].Points_Shui;
                            en_All_Tier += en_imgText.replace('$_itemDir', itemDir).replace('$_itemImgSrc', imgArr[imgIndex]).replace('$_itemTitle', resource.All_Tier[i].Brand).replace('$_itemText', resource.All_Tier[i].Items_EN).replace('$_itemRemarks', resource.All_Tier[i].Remarks).replace('$_itemDate', resource.All_Tier[i].Redemption_Date).replace('$_itemPoints', Points).replace('$_itemQty', resource.All_Tier[i].QTY);
                            tc_All_Tier += tc_imgText.replace('$_itemDir', itemDir).replace('$_itemImgSrc', imgArr[imgIndex]).replace('$_itemTitle', resource.All_Tier[i].Brand).replace('$_itemText', resource.All_Tier[i].Items_TC).replace('$_itemRemarks', resource.All_Tier[i].Remarks).replace('$_itemDate', resource.All_Tier[i].Redemption_Date).replace('$_itemPoints', Points).replace('$_itemQty', resource.All_Tier[i].QTY);
                            sc_All_Tier += sc_imgText.replace('$_itemDir', itemDir).replace('$_itemImgSrc', imgArr[imgIndex]).replace('$_itemTitle', resource.All_Tier[i].Brand).replace('$_itemText', resource.All_Tier[i].Items_SC).replace('$_itemRemarks', resource.All_Tier[i].Remarks).replace('$_itemDate', resource.All_Tier[i].Redemption_Date).replace('$_itemPoints', Points).replace('$_itemQty', resource.All_Tier[i].QTY);
                            imgIndex++;
                        }
                    };

                    // EDM拼接
<<<<<<< HEAD:dist/controller/edm/editHarbourCity.js
                    en_layout += en_style + en_header + en_Event_Highlight + en_Exclusive_Highlight + en_New_Store_Highlight + en_gift1 + en_Exclusive + en_gift2 + en_All_Tier + en_footer;
                    tc_layout += tc_style + tc_header + tc_Event_Highlight + tc_Exclusive_Highlight + tc_New_Store_Highlight + tc_gift1 + tc_Exclusive + tc_gift2 + tc_All_Tier + tc_footer;
                    sc_layout += sc_style + sc_header + sc_Event_Highlight + sc_Exclusive_Highlight + sc_New_Store_Highlight + sc_gift1 + sc_Exclusive + sc_gift2 + sc_All_Tier + sc_footer;
=======
                    en_layout += en_style + en_header + en_New_Store_Highlight + en_Exclusive_Highlight + en_Event_Highlight + en_gift1 + en_Exclusive + en_gift2 + en_All_Tier + en_footer;
                    tc_layout += tc_style + tc_header + tc_New_Store_Highlight + tc_Exclusive_Highlight + tc_Event_Highlight + tc_gift1 + tc_Exclusive + tc_gift2 + tc_All_Tier + tc_footer;
                    sc_layout += sc_style + sc_header + sc_New_Store_Highlight + sc_Exclusive_Highlight + sc_Event_Highlight + sc_gift1 + sc_Exclusive + sc_gift2 + sc_All_Tier + sc_footer;
>>>>>>> 5cbf9426dc237eabf822377449afdeba19ef9d2a:dist/controller/edm/editHarbourCity_source.js

                    // EDM渲染
                    $_edit_en.html(en_layout);
                    $_edit_tc.html(tc_layout);
                    $_edit_sc.html(sc_layout);
				},
				error: function(e) {
					console.log(e);
					return false
				}
			});
        }
	})
})($)