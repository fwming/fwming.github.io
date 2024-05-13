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
            // 整体结构
            var en_layout = '';
            var tc_layout = '';
            var sc_layout = '';
            // 动态资源
            var en_Top_Banner = '';
            var tc_Top_Banner = '';
            var sc_Top_Banner = '';
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
            var en_AppExclusive = '';
            var tc_AppExclusive = '';
            var sc_AppExclusive = '';
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
				url: "./dist/views/conventional/tool/harbourCity/templateMJML.html",
				async: false,
				dataType: 'html',
				success: function(e) {
                    en_style = e.split('<!-- style -->')[1].split('<!-- en -->')[1];
                    tc_style = e.split('<!-- style -->')[1].split('<!-- tc -->')[1];
                    sc_style = e.split('<!-- style -->')[1].split('<!-- sc -->')[1];
                    EDM_Version == 'Normal'? versionBg = '#BAA79C' : versionBg = '#666666';
                    en_header = e.split('<!-- header -->')[1].split('<!-- en -->')[1].replaceAll('$_startTime', startTime).replaceAll('$_preSubject', en_preSubject).replaceAll('$_versionBg',versionBg);
                    tc_header = e.split('<!-- header -->')[1].split('<!-- tc -->')[1].replaceAll('$_startTime', startTime).replaceAll('$_preSubject', tc_preSubject).replaceAll('$_versionBg',versionBg);
                    sc_header = e.split('<!-- header -->')[1].split('<!-- sc -->')[1].replaceAll('$_startTime', startTime).replaceAll('$_preSubject', sc_preSubject).replaceAll('$_versionBg',versionBg);
                    en_gift1 = e.split('<!-- gift1 -->')[1].split('<!-- en -->')[1];
                    tc_gift1 = e.split('<!-- gift1 -->')[1].split('<!-- tc -->')[1];
                    sc_gift1 = e.split('<!-- gift1 -->')[1].split('<!-- sc -->')[1];
                    en_gift2 = e.split('<!-- gift2 -->')[1].split('<!-- en -->')[1];
                    tc_gift2 = e.split('<!-- gift2 -->')[1].split('<!-- tc -->')[1];
                    sc_gift2 = e.split('<!-- gift2 -->')[1].split('<!-- sc -->')[1];
                    en_footer = e.split('<!-- footer -->')[1].split('<!-- en -->')[1].replaceAll('$_remarks',resource.Remarks[0].Remarks_EN.replaceAll(/\n/g, '<br>'));
                    tc_footer = e.split('<!-- footer -->')[1].split('<!-- tc -->')[1].replaceAll('$_remarks',resource.Remarks[0].Remarks_TC.replaceAll(/\n/g, '<br>'));
                    sc_footer = e.split('<!-- footer -->')[1].split('<!-- sc -->')[1].replaceAll('$_remarks',resource.Remarks[0].Remarks_SC.replaceAll(/\n/g, '<br>'));
                    line = e.split('<!-- line -->')[1];
                    space = e.split('<!-- space -->')[1];
                    en_AppExclusive = e.split('<!-- AppExclusive -->')[1].split('<!-- en -->')[1];
                    tc_AppExclusive = e.split('<!-- AppExclusive -->')[1].split('<!-- tc -->')[1];
                    sc_AppExclusive = e.split('<!-- AppExclusive -->')[1].split('<!-- sc -->')[1];

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
                    
                    // Top_Banner
                    if(resource.Top_Banner.length){
                        for(var i = 0; i < resource.Top_Banner.length; i++){
                            if(!(EDM_Version == 'Shui' && resource.Top_Banner[i].BelongTo_Shui == 'no')){
                                if(resource.Top_Banner[i].Has_logo == 'yes'){
                                    en_Top_Banner += en_hasLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_logoImgSrc', imgArr[(imgIndex+1)]).replaceAll('$_dynamicText', resource.Top_Banner[i].Offer_EN.replaceAll(/\n/g, '<br>'));
                                    tc_Top_Banner += tc_hasLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_logoImgSrc', imgArr[(imgIndex+1)]).replaceAll('$_dynamicText', resource.Top_Banner[i].Offer_TC.replaceAll(/\n/g, '<br>'));
                                    sc_Top_Banner += sc_hasLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_logoImgSrc', imgArr[(imgIndex+1)]).replaceAll('$_dynamicText', resource.Top_Banner[i].Offer_SC.replaceAll(/\n/g, '<br>'));

                                    imgIndex += 2;
                                }else{
                                    en_Top_Banner += en_noLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_dynamicText', resource.Top_Banner[i].Offer_EN.replaceAll(/\n/g, '<br>'));
                                    tc_Top_Banner += tc_noLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_dynamicText', resource.Top_Banner[i].Offer_TC.replaceAll(/\n/g, '<br>'));
                                    sc_Top_Banner += sc_noLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_dynamicText', resource.Top_Banner[i].Offer_SC.replaceAll(/\n/g, '<br>'));

                                    imgIndex++;
                                }
                                // 加分割线
                                if(i < resource.Top_Banner.length - 1){
                                    en_Top_Banner += line;
                                    tc_Top_Banner += line;
                                    sc_Top_Banner += line;
                                }
                            }
                        }
                        en_Top_Banner += space;
                        tc_Top_Banner += space;
                        sc_Top_Banner += space;
                    }

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
                                    en_Event_Highlight += en_hasLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_logoImgSrc', imgArr[(imgIndex+1)]).replaceAll('$_dynamicText', resource.Event_Highlight[i].Offer_EN.replaceAll(/\n/g, '<br>'));
                                    tc_Event_Highlight += tc_hasLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_logoImgSrc', imgArr[(imgIndex+1)]).replaceAll('$_dynamicText', resource.Event_Highlight[i].Offer_TC.replaceAll(/\n/g, '<br>'));
                                    sc_Event_Highlight += sc_hasLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_logoImgSrc', imgArr[(imgIndex+1)]).replaceAll('$_dynamicText', resource.Event_Highlight[i].Offer_SC.replaceAll(/\n/g, '<br>'));

                                    imgIndex += 2;
                                }else{
                                    en_Event_Highlight += en_noLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_dynamicText', resource.Event_Highlight[i].Offer_EN.replaceAll(/\n/g, '<br>'));
                                    tc_Event_Highlight += tc_noLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_dynamicText', resource.Event_Highlight[i].Offer_TC.replaceAll(/\n/g, '<br>'));
                                    sc_Event_Highlight += sc_noLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_dynamicText', resource.Event_Highlight[i].Offer_SC.replaceAll(/\n/g, '<br>'));

                                    imgIndex++;
                                }
                                // 加分割线
                                if(i < resource.Event_Highlight.length - 1){
                                    en_Event_Highlight += line;
                                    tc_Event_Highlight += line;
                                    sc_Event_Highlight += line;
                                }
                            }
                        }
                        // 末尾加空白间隔
                        if(isHasHeader_Event_Highlight){
                            en_Event_Highlight += space;
                            tc_Event_Highlight += space;
                            sc_Event_Highlight += space;
                        }
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
                                    en_Exclusive_Highlight += en_hasLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_logoImgSrc', imgArr[(imgIndex+1)]).replaceAll('$_dynamicText', resource.Exclusive_Highlight[i].Offer_EN.replaceAll(/\n/g, '<br>'));
                                    tc_Exclusive_Highlight += tc_hasLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_logoImgSrc', imgArr[(imgIndex+1)]).replaceAll('$_dynamicText', resource.Exclusive_Highlight[i].Offer_TC.replaceAll(/\n/g, '<br>'));
                                    sc_Exclusive_Highlight += sc_hasLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_logoImgSrc', imgArr[(imgIndex+1)]).replaceAll('$_dynamicText', resource.Exclusive_Highlight[i].Offer_SC.replaceAll(/\n/g, '<br>'));
                                    
                                    imgIndex += 2;
                                }else{
                                    en_Exclusive_Highlight += en_noLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_dynamicText', resource.Exclusive_Highlight[i].Offer_EN.replaceAll(/\n/g, '<br>'));
                                    tc_Exclusive_Highlight += tc_noLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_dynamicText', resource.Exclusive_Highlight[i].Offer_TC.replaceAll(/\n/g, '<br>'));
                                    sc_Exclusive_Highlight += sc_noLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_dynamicText', resource.Exclusive_Highlight[i].Offer_SC.replaceAll(/\n/g, '<br>'));

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
                                    en_New_Store_Highlight += en_hasLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_logoImgSrc', imgArr[(imgIndex+1)]).replaceAll('$_dynamicText', resource.New_Store_Highlight[i].Offer_EN.replaceAll(/\n/g, '<br>'));
                                    tc_New_Store_Highlight += tc_hasLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_logoImgSrc', imgArr[(imgIndex+1)]).replaceAll('$_dynamicText', resource.New_Store_Highlight[i].Offer_TC.replaceAll(/\n/g, '<br>'));
                                    sc_New_Store_Highlight += sc_hasLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_logoImgSrc', imgArr[(imgIndex+1)]).replaceAll('$_dynamicText', resource.New_Store_Highlight[i].Offer_SC.replaceAll(/\n/g, '<br>'));

                                    imgIndex += 2;
                                }else{
                                    en_New_Store_Highlight += en_noLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_dynamicText', resource.New_Store_Highlight[i].Offer_EN.replaceAll(/\n/g, '<br>'));
                                    tc_New_Store_Highlight += tc_noLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_dynamicText', resource.New_Store_Highlight[i].Offer_TC.replaceAll(/\n/g, '<br>'));
                                    sc_New_Store_Highlight += sc_noLogo.replaceAll('$_bannerImgSrc', imgArr[imgIndex]).replaceAll('$_dynamicText', resource.New_Store_Highlight[i].Offer_SC.replaceAll(/\n/g, '<br>'));

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

                    // Exclusive
                    if(resource.Exclusive){
                        var itemDir = 'direction="ltr"';
                        var itemDir_i = 0;
                        for(var i = 0; i < resource.Exclusive.length; i++){
                            itemDir_i % 2 ? itemDir = 'direction="ltr"' : itemDir = 'direction="rtl"';
                            EDM_Version == 'Normal' ? Points = resource.Exclusive[i].Points_Normal : Points = resource.Exclusive[i].Points_Shui;
                            if(Points){
                                if(resource.Exclusive[i].Has_AppExclusive == 'yes'){
                                    en_All_Tier += en_AppExclusive;
                                    tc_All_Tier += tc_AppExclusive;
                                    sc_All_Tier += sc_AppExclusive;
                                }
                                en_Exclusive += en_imgText.replaceAll('$_itemDir', itemDir).replaceAll('$_itemImgSrc', imgArr[imgIndex]).replaceAll('$_itemTitle', resource.Exclusive[i].Brand).replaceAll('$_itemText', resource.Exclusive[i].Items_EN).replaceAll('$_itemRemarks', resource.Exclusive[i].Remarks).replaceAll('$_itemDate', resource.Exclusive[i].Redemption_Date).replaceAll('$_itemPoints', Points).replaceAll('$_itemQty', resource.Exclusive[i].QTY);
                                tc_Exclusive += tc_imgText.replaceAll('$_itemDir', itemDir).replaceAll('$_itemImgSrc', imgArr[imgIndex]).replaceAll('$_itemTitle', resource.Exclusive[i].Brand).replaceAll('$_itemText', resource.Exclusive[i].Items_TC).replaceAll('$_itemRemarks', resource.Exclusive[i].Remarks).replaceAll('$_itemDate', resource.Exclusive[i].Redemption_Date).replaceAll('$_itemPoints', Points).replaceAll('$_itemQty', resource.Exclusive[i].QTY);
                                sc_Exclusive += sc_imgText.replaceAll('$_itemDir', itemDir).replaceAll('$_itemImgSrc', imgArr[imgIndex]).replaceAll('$_itemTitle', resource.Exclusive[i].Brand).replaceAll('$_itemText', resource.Exclusive[i].Items_SC).replaceAll('$_itemRemarks', resource.Exclusive[i].Remarks).replaceAll('$_itemDate', resource.Exclusive[i].Redemption_Date).replaceAll('$_itemPoints', Points).replaceAll('$_itemQty', resource.Exclusive[i].QTY);
                                imgIndex++;
                                itemDir_i++;
                            }else{
                                imgIndex++;
                            }
                        }
                    }

                    // All_Tier
                    if(resource.All_Tier){
                        var itemDir = 'direction="ltr"';
                        var itemDir_i = 0;
                        for(var i = 0; i < resource.All_Tier.length; i++){
                            itemDir_i % 2 ? itemDir = 'direction="ltr"' : itemDir = 'direction="rtl"';
                            EDM_Version == 'Normal' ? Points = resource.All_Tier[i].Points_Normal : Points = resource.All_Tier[i].Points_Shui;
                            if(Points){
                                if(resource.All_Tier[i].Has_AppExclusive == 'yes'){
                                    en_All_Tier += en_AppExclusive;
                                    tc_All_Tier += tc_AppExclusive;
                                    sc_All_Tier += sc_AppExclusive;
                                }
                                en_All_Tier += en_imgText.replaceAll('$_itemDir', itemDir).replaceAll('$_itemImgSrc', imgArr[imgIndex]).replaceAll('$_itemTitle', resource.All_Tier[i].Brand).replaceAll('$_itemText', resource.All_Tier[i].Items_EN).replaceAll('$_itemRemarks', resource.All_Tier[i].Remarks).replaceAll('$_itemDate', resource.All_Tier[i].Redemption_Date).replaceAll('$_itemPoints', Points).replaceAll('$_itemQty', resource.All_Tier[i].QTY);
                                tc_All_Tier += tc_imgText.replaceAll('$_itemDir', itemDir).replaceAll('$_itemImgSrc', imgArr[imgIndex]).replaceAll('$_itemTitle', resource.All_Tier[i].Brand).replaceAll('$_itemText', resource.All_Tier[i].Items_TC).replaceAll('$_itemRemarks', resource.All_Tier[i].Remarks).replaceAll('$_itemDate', resource.All_Tier[i].Redemption_Date).replaceAll('$_itemPoints', Points).replaceAll('$_itemQty', resource.All_Tier[i].QTY);
                                sc_All_Tier += sc_imgText.replaceAll('$_itemDir', itemDir).replaceAll('$_itemImgSrc', imgArr[imgIndex]).replaceAll('$_itemTitle', resource.All_Tier[i].Brand).replaceAll('$_itemText', resource.All_Tier[i].Items_SC).replaceAll('$_itemRemarks', resource.All_Tier[i].Remarks).replaceAll('$_itemDate', resource.All_Tier[i].Redemption_Date).replaceAll('$_itemPoints', Points).replaceAll('$_itemQty', resource.All_Tier[i].QTY);
                                imgIndex++;
                                itemDir_i++;
                            }else{
                                imgIndex++;
                            }
                        }
                    }

                    // EDM拼接
                    en_layout += en_style + en_header + en_Top_Banner + en_Event_Highlight + en_Exclusive_Highlight + en_New_Store_Highlight + en_gift1 + en_Exclusive + en_gift2 + en_All_Tier + en_footer;
                    tc_layout += tc_style + tc_header + tc_Top_Banner + tc_Event_Highlight + tc_Exclusive_Highlight + tc_New_Store_Highlight + tc_gift1 + tc_Exclusive + tc_gift2 + tc_All_Tier + tc_footer;
                    sc_layout += sc_style + sc_header + sc_Top_Banner + sc_Event_Highlight + sc_Exclusive_Highlight + sc_New_Store_Highlight + sc_gift1 + sc_Exclusive + sc_gift2 + sc_All_Tier + sc_footer;

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