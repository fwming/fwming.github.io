(function() {
	layui.use(['layer', 'form', 'copy'],	function() {
		var layer = layui.layer,
            form = layui.form,
            copy = layui.copy;

        // 获取编辑模式盒子
        var $_edit_en = $('.edit_en');
        var $_edit_tc = $('.edit_tc');
        var $_edit_sc = $('.edit_sc');

        // 图片路径
        var imgUrl = '';
        // 保存加载图片名称
        var imgArr = [];

        // 自动填充时间
        var data = new Date();
        var y = data.getFullYear();
        var m = data.getMonth();
        var d = data.getDate();

        if(d < 10){
            d = '0'+d;
        }
        var month = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
        var utm_campaign = 'enews_'+y+(m+1)+d;
        $('.startTime').val(d+' '+month[m]+' '+y);

        // 储存获取到的Excel数据
        var excel_datas = {};

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
                console.time('一键生成耗时：');
                CreateEDM(excel_datas);
                console.timeEnd('一键生成耗时：');
            }else{
                layer.msg('请先上传文件和图片');
            }
        });


        // 复制代码
        var layout_code_en = "";
        var layout_code_tc = "";
        var layout_code_sc = "";

        $('.copy-btn-en').click(function(){
            layer.msg("复制英文版源码成功");
            copy.copyFn(layout_code_en);
        });
        $('.copy-btn-tc').click(function(){
            layer.msg("复制繁体版源码成功");
            copy.copyFn(layout_code_tc);
        });
        $('.copy-btn-sc').click(function(){
            layer.msg("复制简体版源码成功");
            copy.copyFn(layout_code_sc);
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
            // excel表格数据
            var en_ExcelData = resource.V_EN;
            var tc_ExcelData = resource.V_TC;
            var sc_ExcelData = resource.V_SC;
            // 整体结构
            var en_layout = '';
            var tc_layout = '';
            var sc_layout = '';
            // 标题识别，当前标题和上一个不同时，自动添加当前标题间隔开
            var Belonging = '';
            // 静态资源
            var en_style = '';
            var tc_style = '';
            var sc_style = '';
            var en_header = '';
            var tc_header = '';
            var sc_header = '';
            var en_footer = '';
            var tc_footer = '';
            var sc_footer = '';
            // 动态资源
            var en_BelongingTitle = '';
            var tc_BelongingTitle = '';
            var sc_BelongingTitle = '';
            var en_topBanner = '';
            var tc_topBanner = '';
            var sc_topBanner = '';
            var en_general = '';
            var tc_general = '';
            var sc_general = '';
            var en_detailsPart = '';
            var tc_detailsPart = '';
            var sc_detailsPart = '';
            var en_btn_hasUrl = '';
            var tc_btn_hasUrl = '';
            var sc_btn_hasUrl = '';
            var img_hasUrl = '';
            var img_noUrl = '';

            // 获取模板资源
            $.ajax({
				type: "get",
				url: "./dist/views/conventional/tool/harbourCity/template_HC_MJML.html",
				async: false,
				dataType: 'html',
				success: function(e) {
                    en_style = e.split('<!-- style -->')[1].split('<!-- en -->')[1];
                    tc_style = e.split('<!-- style -->')[1].split('<!-- tc -->')[1];
                    sc_style = e.split('<!-- style -->')[1].split('<!-- sc -->')[1];
                    en_header = e.split('<!-- header -->')[1].split('<!-- en -->')[1].replaceAll('$_startDate', startTime).replaceAll('$_preSubject', en_preSubject);
                    tc_header = e.split('<!-- header -->')[1].split('<!-- tc -->')[1].replaceAll('$_startDate', startTime).replaceAll('$_preSubject', tc_preSubject);
                    sc_header = e.split('<!-- header -->')[1].split('<!-- sc -->')[1].replaceAll('$_startDate', startTime).replaceAll('$_preSubject', sc_preSubject);
                    en_footer = e.split('<!-- footer -->')[1].split('<!-- en -->')[1];
                    tc_footer = e.split('<!-- footer -->')[1].split('<!-- tc -->')[1];
                    sc_footer = e.split('<!-- footer -->')[1].split('<!-- sc -->')[1];

                    en_BelongingTitle = e.split('<!-- BelongingTitle -->')[1].split('<!-- en -->')[1];
                    tc_BelongingTitle = e.split('<!-- BelongingTitle -->')[1].split('<!-- tc -->')[1];
                    sc_BelongingTitle = e.split('<!-- BelongingTitle -->')[1].split('<!-- sc -->')[1];
                    en_topBanner = e.split('<!-- topBanner -->')[1].split('<!-- en -->')[1];
                    tc_topBanner = e.split('<!-- topBanner -->')[1].split('<!-- tc -->')[1];
                    sc_topBanner = e.split('<!-- topBanner -->')[1].split('<!-- sc -->')[1];
                    en_general = e.split('<!-- general -->')[1].split('<!-- en -->')[1];
                    tc_general = e.split('<!-- general -->')[1].split('<!-- tc -->')[1];
                    sc_general = e.split('<!-- general -->')[1].split('<!-- sc -->')[1];
                    en_detailsPart = e.split('<!-- detailsPart -->')[1].split('<!-- en -->')[1];
                    tc_detailsPart = e.split('<!-- detailsPart -->')[1].split('<!-- tc -->')[1];
                    sc_detailsPart = e.split('<!-- detailsPart -->')[1].split('<!-- sc -->')[1];
                    en_btn_hasUrl = e.split('<!-- btnPart -->')[1].split('<!-- en -->')[1];
                    tc_btn_hasUrl = e.split('<!-- btnPart -->')[1].split('<!-- tc -->')[1];
                    sc_btn_hasUrl = e.split('<!-- btnPart -->')[1].split('<!-- sc -->')[1];
                    img_hasUrl = e.split('<!-- imgPart -->')[1].split('<!-- hasUrl -->')[1];
                    img_noUrl = e.split('<!-- imgPart -->')[1].split('<!-- noUrl -->')[1];

                    // 添加头部静态资源到总结构中
                    en_layout += en_style + en_header;
                    tc_layout += tc_style + tc_header;
                    sc_layout += sc_style + sc_header;

                    // 依照excel表格顺序逐个添加各个模块内容
                    for(var i = 0; i < en_ExcelData.length; i++){
                        var bgColor = i % 2 ? '#F8F5F5': '#EFEEE9';
                        if(en_ExcelData[i].Belonging == 'TOP BANNER'){
                            var en_teamInColumn = '';
                            var tc_teamInColumn = '';
                            var sc_teamInColumn = '';
                            var topPadding = '';
                            // 添加日期字段，如果有的话
                            if(en_ExcelData[i].Content_Date){
                                try {
                                    topPadding = en_teamInColumn ? '5px': '20px';
                                    en_teamInColumn += en_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', 'Date:').replaceAll('$_detailsValue', en_ExcelData[i].Content_Date.trim().replaceAll(/\n/g, '<br>'));
                                    tc_teamInColumn += tc_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', '日期：').replaceAll('$_detailsValue', tc_ExcelData[i].Content_Date.trim().replaceAll(/\n/g, '<br>'));
                                    sc_teamInColumn += sc_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', '日期：').replaceAll('$_detailsValue', sc_ExcelData[i].Content_Date.trim().replaceAll(/\n/g, '<br>'));
                                } catch (error) {
                                    layer.alert('请检查Excel表格模板中 <strong style="color: #ff5722;">['+en_ExcelData[i].Belonging+']</strong> - <strong style="color: #ffb800;">['+en_ExcelData[i].Content_Title+']</strong> - <strong style="color: #31bdec;">[日期字段]</strong>，繁、简体是否与英文版同步！');
                                    console.log(error);
                                    return false;
                                }
                            }
                            // 添加时间字段，如果有的话
                            if(en_ExcelData[i].Content_Time){
                                try {
                                    topPadding = en_teamInColumn ? '5px': '20px';
                                    en_teamInColumn += en_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', 'Time:').replaceAll('$_detailsValue', en_ExcelData[i].Content_Time.trim().replaceAll(/\n/g, '<br>'));
                                    tc_teamInColumn += tc_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', '時間：').replaceAll('$_detailsValue', tc_ExcelData[i].Content_Time.trim().replaceAll(/\n/g, '<br>'));
                                    sc_teamInColumn += sc_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', '时间：').replaceAll('$_detailsValue', sc_ExcelData[i].Content_Time.trim().replaceAll(/\n/g, '<br>'));
                                } catch (error) {
                                    layer.alert('请检查Excel表格模板中 <strong style="color: #ff5722;">['+en_ExcelData[i].Belonging+']</strong> - <strong style="color: #ffb800;">['+en_ExcelData[i].Content_Title+']</strong> - <strong style="color: #31bdec;">[时间字段]</strong>，繁、简体是否与英文版同步！');
                                    console.log(error);
                                    return false;
                                }
                            }
                            // 添加地址字段，如果有的话
                            if(en_ExcelData[i].Content_Address){
                                try {
                                    topPadding = en_teamInColumn ? '5px': '20px';
                                    en_teamInColumn += en_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', 'Venue:').replaceAll('$_detailsValue', en_ExcelData[i].Content_Address.trim().replaceAll(/\n/g, '<br>'));
                                    tc_teamInColumn += tc_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', '地點：').replaceAll('$_detailsValue', tc_ExcelData[i].Content_Address.trim().replaceAll(/\n/g, '<br>'));
                                    sc_teamInColumn += sc_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', '地点：').replaceAll('$_detailsValue', sc_ExcelData[i].Content_Address.trim().replaceAll(/\n/g, '<br>'));
                                } catch (error) {
                                    layer.alert('请检查Excel表格模板中 <strong style="color: #ff5722;">['+en_ExcelData[i].Belonging+']</strong> - <strong style="color: #ffb800;">['+en_ExcelData[i].Content_Title+']</strong> - <strong style="color: #31bdec;">[地址字段]</strong>，繁、简体是否与英文版同步！');
                                    console.log(error);
                                    return false;
                                }
                            }
                            // 添加查询字段，如果有的话
                            if(en_ExcelData[i].Content_Query){
                                try {
                                    topPadding = en_teamInColumn ? '5px': '20px';
                                    en_teamInColumn += en_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', 'Enquiries:').replaceAll('$_detailsValue', en_ExcelData[i].Content_Query.trim().replaceAll(/\n/g, '<br>'));
                                    tc_teamInColumn += tc_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', '查詢：').replaceAll('$_detailsValue', tc_ExcelData[i].Content_Query.trim().replaceAll(/\n/g, '<br>'));
                                    sc_teamInColumn += sc_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', '查询：').replaceAll('$_detailsValue', sc_ExcelData[i].Content_Query.trim().replaceAll(/\n/g, '<br>'));
                                } catch (error) {
                                    layer.alert('请检查Excel表格模板中 <strong style="color: #ff5722;">['+en_ExcelData[i].Belonging+']</strong> - <strong style="color: #ffb800;">['+en_ExcelData[i].Content_Title+']</strong> - <strong style="color: #31bdec;">[查询字段]</strong>，繁、简体是否与英文版同步！');
                                    console.log(error);
                                    return false;
                                }
                            }
                            // 添加按钮字段，如果有的话
                            if(en_ExcelData[i].Link){
                                // 链接参数
                                if(!en_ExcelData[i].Utm_Tag){
                                    layer.alert('请检查Excel表格模板中 <strong style="color: #ff5722;">['+en_ExcelData[i].Belonging+']</strong> - <strong style="color: #ffb800;">['+en_ExcelData[i].Content_Title+']</strong> - <strong style="color: #31bdec;">[链接参数-Utm_Tag字段]</strong>，繁、简体是否与英文版同步！');
                                    return false;
                                }
                                try {
                                    var linkUat = '?utm_medium=edm&utm_campaign=$_utm_campaign&utm_source=xgate&utm_content={$extid}&utm_tag='+en_ExcelData[i].Utm_Tag.trim();
                                    en_teamInColumn += en_btn_hasUrl.replaceAll('$_btnUrl', en_ExcelData[i].Link.trim() + linkUat);
                                    tc_teamInColumn += tc_btn_hasUrl.replaceAll('$_btnUrl', tc_ExcelData[i].Link.trim() + linkUat);
                                    sc_teamInColumn += sc_btn_hasUrl.replaceAll('$_btnUrl', sc_ExcelData[i].Link.trim() + linkUat);
                                } catch (error) {
                                    layer.alert('请检查Excel表格模板中 <strong style="color: #ff5722;">['+en_ExcelData[i].Belonging+']</strong> - <strong style="color: #ffb800;">['+en_ExcelData[i].Content_Title+']</strong> - <strong style="color: #31bdec;">[链接字段]</strong>，繁、简体是否与英文版同步！');
                                    console.log(error);
                                    return false;
                                }
                            }

                            en_layout += en_topBanner.replaceAll('$_dynamicTitle', en_ExcelData[i].Content_Title.trim().replaceAll(/\n/g, '<br>')).replaceAll('$_bannerImgBigSrc', imgArr[imgIndex]).replaceAll('$_bannerImgSmallSrc', imgArr[imgIndex+1]).replaceAll('$_dynamicText', en_ExcelData[i].Content_Txt.trim().replaceAll(/\n/g, '<br>')).replaceAll('$_teamInColumn', en_teamInColumn).replaceAll('$_bgColor', bgColor);
                            tc_layout += tc_topBanner.replaceAll('$_dynamicTitle', tc_ExcelData[i].Content_Title.trim().replaceAll(/\n/g, '<br>')).replaceAll('$_bannerImgBigSrc', imgArr[imgIndex]).replaceAll('$_bannerImgSmallSrc', imgArr[imgIndex+1]).replaceAll('$_dynamicText', tc_ExcelData[i].Content_Txt.trim().replaceAll(/\n/g, '<br>')).replaceAll('$_teamInColumn', tc_teamInColumn).replaceAll('$_bgColor', bgColor);
                            sc_layout += sc_topBanner.replaceAll('$_dynamicTitle', sc_ExcelData[i].Content_Title.trim().replaceAll(/\n/g, '<br>')).replaceAll('$_bannerImgBigSrc', imgArr[imgIndex]).replaceAll('$_bannerImgSmallSrc', imgArr[imgIndex+1]).replaceAll('$_dynamicText', sc_ExcelData[i].Content_Txt.trim().replaceAll(/\n/g, '<br>')).replaceAll('$_teamInColumn', sc_teamInColumn).replaceAll('$_bgColor', bgColor);

                            imgIndex += 2;
                        }else{
                            if(en_ExcelData[i].Belonging && en_ExcelData[i].Belonging != Belonging){
                                Belonging = en_ExcelData[i].Belonging;
                                en_layout += en_BelongingTitle.replaceAll('$_belongTitle', en_ExcelData[i].Belonging.trim());
                                tc_layout += tc_BelongingTitle.replaceAll('$_belongTitle', tc_ExcelData[i].Belonging.trim());
                                sc_layout += sc_BelongingTitle.replaceAll('$_belongTitle', sc_ExcelData[i].Belonging.trim());
                            }
                            var en_imgPart = '';
                            var tc_imgPart = '';
                            var sc_imgPart = '';
                            var en_teamInColumn = '';
                            var tc_teamInColumn = '';
                            var sc_teamInColumn = '';
                            var topPadding = '';
                            // 添加日期字段，如果有的话
                            if(en_ExcelData[i].Content_Date){
                                try {
                                    topPadding = en_teamInColumn ? '5px': '20px';
                                    en_teamInColumn += en_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', 'Date:').replaceAll('$_detailsValue', en_ExcelData[i].Content_Date.trim().replaceAll(/\n/g, '<br>'));
                                    tc_teamInColumn += tc_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', '日期：').replaceAll('$_detailsValue', tc_ExcelData[i].Content_Date.trim().replaceAll(/\n/g, '<br>'));
                                    sc_teamInColumn += sc_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', '日期：').replaceAll('$_detailsValue', sc_ExcelData[i].Content_Date.trim().replaceAll(/\n/g, '<br>'));
                                } catch (error) {
                                    layer.alert('请检查Excel表格模板中 <strong style="color: #ff5722;">['+en_ExcelData[i].Belonging+']</strong> - <strong style="color: #ffb800;">['+en_ExcelData[i].Content_Title+']</strong> - <strong style="color: #31bdec;">[日期字段]</strong>，繁、简体是否与英文版同步！');
                                    console.log(error);
                                    return false;
                                }
                            }
                            // 添加时间字段，如果有的话
                            if(en_ExcelData[i].Content_Time){
                                try {
                                    topPadding = en_teamInColumn ? '5px': '20px';
                                    en_teamInColumn += en_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', 'Time:').replaceAll('$_detailsValue', en_ExcelData[i].Content_Time.trim().replaceAll(/\n/g, '<br>'));
                                    tc_teamInColumn += tc_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', '時間：').replaceAll('$_detailsValue', tc_ExcelData[i].Content_Time.trim().replaceAll(/\n/g, '<br>'));
                                    sc_teamInColumn += sc_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', '时间：').replaceAll('$_detailsValue', sc_ExcelData[i].Content_Time.trim().replaceAll(/\n/g, '<br>'));
                                } catch (error) {
                                    layer.alert('请检查Excel表格模板中 <strong style="color: #ff5722;">['+en_ExcelData[i].Belonging+']</strong> - <strong style="color: #ffb800;">['+en_ExcelData[i].Content_Title+']</strong> - <strong style="color: #31bdec;">[时间字段]</strong>，繁、简体是否与英文版同步！');
                                    console.log(error);
                                    return false;
                                }
                            }
                            // 添加地址字段，如果有的话
                            if(en_ExcelData[i].Content_Address){
                                try {
                                    topPadding = en_teamInColumn ? '5px': '20px';
                                    en_teamInColumn += en_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', 'Venue:').replaceAll('$_detailsValue', en_ExcelData[i].Content_Address.trim().replaceAll(/\n/g, '<br>'));
                                    tc_teamInColumn += tc_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', '地點：').replaceAll('$_detailsValue', tc_ExcelData[i].Content_Address.trim().replaceAll(/\n/g, '<br>'));
                                    sc_teamInColumn += sc_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', '地点：').replaceAll('$_detailsValue', sc_ExcelData[i].Content_Address.trim().replaceAll(/\n/g, '<br>'));
                                } catch (error) {
                                    layer.alert('请检查Excel表格模板中 <strong style="color: #ff5722;">['+en_ExcelData[i].Belonging+']</strong> - <strong style="color: #ffb800;">['+en_ExcelData[i].Content_Title+']</strong> - <strong style="color: #31bdec;">[地址字段]</strong>，繁、简体是否与英文版同步！');
                                    console.log(error);
                                    return false;
                                }
                            }
                            // 添加查询字段，如果有的话
                            if(en_ExcelData[i].Content_Query){
                                try {
                                    topPadding = en_teamInColumn ? '5px': '20px';
                                    en_teamInColumn += en_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', 'Enquiries:').replaceAll('$_detailsValue', en_ExcelData[i].Content_Query.trim().replaceAll(/\n/g, '<br>'));
                                    tc_teamInColumn += tc_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', '查詢：').replaceAll('$_detailsValue', tc_ExcelData[i].Content_Query.trim().replaceAll(/\n/g, '<br>'));
                                    sc_teamInColumn += sc_detailsPart.replaceAll('$_topPadding', topPadding).replaceAll('$_detailsName', '查询：').replaceAll('$_detailsValue', sc_ExcelData[i].Content_Query.trim().replaceAll(/\n/g, '<br>'));
                                } catch (error) {
                                    layer.alert('请检查Excel表格模板中 <strong style="color: #ff5722;">['+en_ExcelData[i].Belonging+']</strong> - <strong style="color: #ffb800;">['+en_ExcelData[i].Content_Title+']</strong> - <strong style="color: #31bdec;">[查询字段]</strong>，繁、简体是否与英文版同步！');
                                    console.log(error);
                                    return false;
                                }
                            }
                            // 添加按钮字段，如果有的话
                            if(en_ExcelData[i].Link){
                                // 链接参数
                                if(!en_ExcelData[i].Utm_Tag){
                                    layer.alert('请检查Excel表格模板中 <strong style="color: #ff5722;">['+en_ExcelData[i].Belonging+']</strong> - <strong style="color: #ffb800;">['+en_ExcelData[i].Content_Title+']</strong> - <strong style="color: #31bdec;">[链接参数-Utm_Tag字段]</strong>，繁、简体是否与英文版同步！');
                                    return false;
                                }
                                try {
                                    var linkUat = '?utm_medium=edm&utm_campaign=$_utm_campaign&utm_source=xgate&utm_content={$extid}&utm_tag='+en_ExcelData[i].Utm_Tag.trim();
                                    en_teamInColumn += en_btn_hasUrl.replaceAll('$_btnUrl', en_ExcelData[i].Link.trim() + linkUat);
                                    tc_teamInColumn += tc_btn_hasUrl.replaceAll('$_btnUrl', tc_ExcelData[i].Link.trim() + linkUat);
                                    sc_teamInColumn += sc_btn_hasUrl.replaceAll('$_btnUrl', sc_ExcelData[i].Link.trim() + linkUat);

                                    en_imgPart = img_hasUrl.replaceAll('$_imgSrc', imgArr[imgIndex]).replaceAll('$_imgUrl', en_ExcelData[i].Link.trim() + linkUat);
                                    tc_imgPart = img_hasUrl.replaceAll('$_imgSrc', imgArr[imgIndex]).replaceAll('$_imgUrl', tc_ExcelData[i].Link.trim() + linkUat);
                                    sc_imgPart = img_hasUrl.replaceAll('$_imgSrc', imgArr[imgIndex]).replaceAll('$_imgUrl', sc_ExcelData[i].Link.trim() + linkUat);
                                } catch (error) {
                                    layer.alert('请检查Excel表格模板中 <strong style="color: #ff5722;">['+en_ExcelData[i].Belonging+']</strong> - <strong style="color: #ffb800;">['+en_ExcelData[i].Content_Title+']</strong> - <strong style="color: #31bdec;">[链接字段]</strong>，繁、简体是否与英文版同步！');
                                    console.log(error);
                                    return false;
                                }
                            }else{
                                en_imgPart = img_noUrl.replaceAll('$_imgSrc', imgArr[imgIndex]);
                                tc_imgPart = img_noUrl.replaceAll('$_imgSrc', imgArr[imgIndex]);
                                sc_imgPart = img_noUrl.replaceAll('$_imgSrc', imgArr[imgIndex]);
                            }

                            en_layout += en_general.replaceAll('$_imgPart', en_imgPart).replaceAll('$_dynamicTitle', en_ExcelData[i].Content_Title.trim().replaceAll(/\n/g, '<br>')).replaceAll('$_dynamicText', en_ExcelData[i].Content_Txt.trim().replaceAll(/\n/g, '<br>')).replaceAll('$_teamInColumn', en_teamInColumn).replaceAll('$_bgColor', bgColor);
                            tc_layout += tc_general.replaceAll('$_imgPart', tc_imgPart).replaceAll('$_dynamicTitle', tc_ExcelData[i].Content_Title.trim().replaceAll(/\n/g, '<br>')).replaceAll('$_dynamicText', tc_ExcelData[i].Content_Txt.trim().replaceAll(/\n/g, '<br>')).replaceAll('$_teamInColumn', tc_teamInColumn).replaceAll('$_bgColor', bgColor);
                            sc_layout += sc_general.replaceAll('$_imgPart', sc_imgPart).replaceAll('$_dynamicTitle', sc_ExcelData[i].Content_Title.trim().replaceAll(/\n/g, '<br>')).replaceAll('$_dynamicText', sc_ExcelData[i].Content_Txt.trim().replaceAll(/\n/g, '<br>')).replaceAll('$_teamInColumn', sc_teamInColumn).replaceAll('$_bgColor', bgColor);

                            imgIndex ++;
                        }
                    }

                    // 添加footer静态资源到总结构中
                    en_layout += en_footer;
                    tc_layout += tc_footer;
                    sc_layout += sc_footer;


                    en_layout = en_layout.replaceAll('$_utm_campaign', utm_campaign);
                    tc_layout = tc_layout.replaceAll('$_utm_campaign', utm_campaign);
                    sc_layout = sc_layout.replaceAll('$_utm_campaign', utm_campaign);
                    // EDM渲染
                    $_edit_en.html(en_layout);
                    $_edit_tc.html(tc_layout);
                    $_edit_sc.html(sc_layout);

                    // 暴露源码
                    layout_code_en = en_layout;
                    layout_code_tc = tc_layout;
                    layout_code_sc = sc_layout;
				},
				error: function(e) {
					console.log(e);
					return false
				}
			});
        }
	})
})($)
