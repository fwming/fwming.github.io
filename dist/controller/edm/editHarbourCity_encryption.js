eval(function(p,a,c,k,e,r){e=function(c){return(c<62?'':e(parseInt(c/62)))+((c=c%62)>35?String.fromCharCode(c+29):c.toString(36))};if('0'.replace(0,e)==0){while(c--)r[e(c)]=k[c];k=[function(e){return r[e]||e}];e=function(){return'([3-9a-cfhj-lo-xzA-Z]|[1-3]\\w)'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(j(){K.use([\'1j\',\'w\',\'x\',\'1k\',\'1l\'],j(){4 w=K.w,1k=K.1k,1l=K.1l,1j=K.1j x=K.x;4 $1K=$(\'.edit_en\');4 $1L=$(\'.edit_tc\');4 $1M=$(\'.edit_sc\');1j.2N({elem:\'#test2\',2O:\'https://gitee.com/fwmlc/2P/upload_process/master\',multiple:2Q,before:j(2R){2R.2S(j(index,F,1N){$(\'#demo2\').append(\'<Z src="\'+1N+\'" alt="\'+F.2T+\'" class="K-1j-Z">\')})},done:j(2U){z.G(2U)}});4 L=\'\';4 8=[];4 H=2V Date();4 y=H.getFullYear();4 m=H.getMonth()+1;4 d=H.getDate();9(d>15){m++;d=\'1\'}I{d=\'15\'}$(\'.10\').11(d+\'.\'+m+\'.\'+y);4 12={};4 C=\'1w\';1k.2N();1k.on(\'radio(version)\',j(H){C=H.value;z.G(\'版本：\'+C)});x.set({devmode:2Q,codeConfig:{},2W:[\'A\',\'1x\',\'strong\',\'italic\',\'underline\',\'del\',\'addhr\',\'|\',\'fontFomatt\',\'fontfamily\',\'fontSize\',\'colorpicker\',\'fontBackColor\',\'face\',\'|\',\'left\',\'center\',\'right\',\'|\',\'link\',\'unlink\',\'images\',\'image_alt\',\'video\',\'anchors\',\'|\',\'table\',\'2S\',\'help\',],height:\'578\'});4 2X=x.1O(\'l\');4 2Y=x.1O(\'o\');4 2Z=x.1O(\'p\');j 30(){x.1P(2X,$1K.A(),1m);x.1P(2Y,$1L.A(),1m);x.1P(2Z,$1M.A(),1m)}$(\'.M-F-1y\').N(j(){$(\'#M-F\').N()})$(\'#M-F\').31(j(){1n F=this.J[0];z.G(F);1n 1Q=2V FileReader();1Q.readAsBinaryString(F)1Q.onload=(e)=>{1n H=e.target.1N 1n 1z=32.read(H,{1R:\'binary\'})1n 33=\'\';z.G(33);O(4 1A in 1z.1S){1B=[];9(1z.1S.hasOwnProperty(1A)){1B=1B.concat(32.utils.sheet_to_json(1z.1S[1A]));12[1A]=1B}}z.G(12);9(12){w.P(\'上传文件成功\')}I{w.P(\'上传文件失败\')}}});$(\'.M-Z-1y\').N(j(){L=$(\'.L\').11().1o();9(!/.\\/$/.2P(L)){$(\'.L\').34({\'35-36\':\'red\'});w.P("请填写图片路径前缀,以\'/\'结束")}I{$(\'.L\').34({\'35-36\':\'#e6e6e6\'});$(\'#M-Z\').N()}});$(\'#M-Z\').31(j(){8=[];4 J=document.getElementById(\'M-Z\').J;z.G(J);O(4 i=0;i<J.k;i++){9(J[i].1R.indexOf(\'image/\')>=0){8.push(L+J[i].2T)}}9(8.k==J.k){w.P(\'上传图片成功\')}I{w.P(\'请上传图片类型\')}z.G(8)});$(\'.create-edm-1y\').N(j(){9(8.k>0&&12){z.time(\'1C\');1C(12);z.timeEnd(\'1C\')}I{w.P(\'请先上传文件和图片\')}})$(\'.save-1y\').N(j(){w.P("同步成功");30()})$(\'.1l-1x\').N(j(){4 1x=$(\'.look\').A();1l.copyFn(1x)})j 1C(5){4 7=0;4 10=$(\'.10\').11().1o();4 1T=$(\'.1T\').11().1o();4 1U=$(\'.1U\').11().1o();4 1V=$(\'.1V\').11().1o();4 1W=\'\';4 1X=\'\';4 1Y=\'\';4 Q=\'\';4 R=\'\';4 S=\'\';4 T=\'\';4 U=\'\';4 V=\'\';4 W=\'\';4 X=\'\';4 Y=\'\';4 1Z=\'\';4 20=\'\';4 21=\'\';4 22=\'\';4 23=\'\';4 24=\'\';4 25=\'\';4 26=\'\';4 27=\'\';4 28=\'\';4 29=\'\';4 2a=\'\';4 2b=\'\';4 2c=\'\';4 2d=\'\';4 2e=\'\';4 2f=\'\';4 2g=\'\';4 2h=\'\';4 2i=\'\';4 2j=\'\';4 q=\'\';4 r=\'\';4 2k=\'\';4 2l=\'\';4 2m=\'\';4 2n=\'\';4 2o=\'\';4 2p=\'\';4 2q=\'\';4 2r=\'\';4 2s=\'\';4 1p=\'\';4 1q=\'\';4 1r=\'\';4 1s=\'\';4 1t=\'\';4 1u=\'\';4 1D=\'\';4 1E=\'\';4 1F=\'\';$.ajax({1R:"get",2O:"./dist/views/conventional/2W/harbourCity/template.A",async:1m,dataType:\'A\',success:j(e){25=e.6(\'<!-- 2t -->\')[1].6(\'<!-- l -->\')[1];26=e.6(\'<!-- 2t -->\')[1].6(\'<!-- o -->\')[1];27=e.6(\'<!-- 2t -->\')[1].6(\'<!-- p -->\')[1];C==\'1w\'?1v=\'#BAA79C\':1v=\'#666666\';28=e.6(\'<!-- 2u -->\')[1].6(\'<!-- l -->\')[1].3(\'$2v\',10).3(\'$2w\',1T).3(\'$2x\',1v);29=e.6(\'<!-- 2u -->\')[1].6(\'<!-- o -->\')[1].3(\'$2v\',10).3(\'$2w\',1U).3(\'$2x\',1v);2a=e.6(\'<!-- 2u -->\')[1].6(\'<!-- p -->\')[1].3(\'$2v\',10).3(\'$2w\',1V).3(\'$2x\',1v);2b=e.6(\'<!-- 2y -->\')[1].6(\'<!-- l -->\')[1];2c=e.6(\'<!-- 2y -->\')[1].6(\'<!-- o -->\')[1];2d=e.6(\'<!-- 2y -->\')[1].6(\'<!-- p -->\')[1];2e=e.6(\'<!-- 2z -->\')[1].6(\'<!-- l -->\')[1];2f=e.6(\'<!-- 2z -->\')[1].6(\'<!-- o -->\')[1];2g=e.6(\'<!-- 2z -->\')[1].6(\'<!-- p -->\')[1];2h=e.6(\'<!-- 2A -->\')[1].6(\'<!-- l -->\')[1].3(\'$2B\',5.D[0].Remarks_EN.3(/\\n/g,\'<a>\'));2i=e.6(\'<!-- 2A -->\')[1].6(\'<!-- o -->\')[1].3(\'$2B\',5.D[0].Remarks_TC.3(/\\n/g,\'<a>\'));2j=e.6(\'<!-- 2A -->\')[1].6(\'<!-- p -->\')[1].3(\'$2B\',5.D[0].Remarks_SC.3(/\\n/g,\'<a>\'));q=e.6(\'<!-- q -->\')[1];r=e.6(\'<!-- r -->\')[1];2k=e.6(\'<!-- 2C -->\')[1].6(\'<!-- l -->\')[1];2l=e.6(\'<!-- 2C -->\')[1].6(\'<!-- o -->\')[1];2m=e.6(\'<!-- 2C -->\')[1].6(\'<!-- p -->\')[1];2n=e.6(\'<!-- 2D -->\')[1].6(\'<!-- l -->\')[1];2o=e.6(\'<!-- 2D -->\')[1].6(\'<!-- o -->\')[1];2p=e.6(\'<!-- 2D -->\')[1].6(\'<!-- p -->\')[1];2q=e.6(\'<!-- 2E -->\')[1].6(\'<!-- l -->\')[1];2r=e.6(\'<!-- 2E -->\')[1].6(\'<!-- o -->\')[1];2s=e.6(\'<!-- 2E -->\')[1].6(\'<!-- p -->\')[1];1p=e.6(\'<!-- 2F -->\')[1].6(\'<!-- l -->\')[1];1q=e.6(\'<!-- 2F -->\')[1].6(\'<!-- o -->\')[1];1r=e.6(\'<!-- 2F -->\')[1].6(\'<!-- p -->\')[1];1s=e.6(\'<!-- 2G -->\')[1].6(\'<!-- l -->\')[1];1t=e.6(\'<!-- 2G -->\')[1].6(\'<!-- o -->\')[1];1u=e.6(\'<!-- 2G -->\')[1].6(\'<!-- p -->\')[1];1D=e.6(\'<!-- 2H -->\')[1].6(\'<!-- l -->\')[1];1E=e.6(\'<!-- 2H -->\')[1].6(\'<!-- o -->\')[1];1F=e.6(\'<!-- 2H -->\')[1].6(\'<!-- p -->\')[1];4 1G=0;9(5.t.k){O(4 i=0;i<5.t.k;i++){9(!(C==\'2I\'&&5.t[i].2J==\'no\')){1G++;9(1G==1){T+=2n;U+=2o;V+=2p}9(5.t[i].2L==\'2M\'){T+=1p.3(\'$f\',8[7]).3(\'$E\',8[(7+1)]).3(\'$h\',5.t[i].13.3(/\\n/g,\'<a>\'));U+=1q.3(\'$f\',8[7]).3(\'$E\',8[(7+1)]).3(\'$h\',5.t[i].14.3(/\\n/g,\'<a>\'));V+=1r.3(\'$f\',8[7]).3(\'$E\',8[(7+1)]).3(\'$h\',5.t[i].16.3(/\\n/g,\'<a>\'));7+=2}I{T+=1s.3(\'$f\',8[7]).3(\'$h\',5.t[i].13.3(/\\n/g,\'<a>\'));U+=1t.3(\'$f\',8[7]).3(\'$h\',5.t[i].14.3(/\\n/g,\'<a>\'));V+=1u.3(\'$f\',8[7]).3(\'$h\',5.t[i].16.3(/\\n/g,\'<a>\'));7++}9(i<5.t.k-1){T+=q;U+=q;V+=q}}}9(1G){T+=r;U+=r;V+=r}}4 1H=0;9(5.u.k){O(4 i=0;i<5.u.k;i++){9(!(C==\'2I\'&&5.u[i].2J==\'no\')){1H++;9(1H==1){Q+=2k;R+=2l;S+=2m}9(5.u[i].2L==\'2M\'){Q+=1p.3(\'$f\',8[7]).3(\'$E\',8[(7+1)]).3(\'$h\',5.u[i].13.3(/\\n/g,\'<a>\'));R+=1q.3(\'$f\',8[7]).3(\'$E\',8[(7+1)]).3(\'$h\',5.u[i].14.3(/\\n/g,\'<a>\'));S+=1r.3(\'$f\',8[7]).3(\'$E\',8[(7+1)]).3(\'$h\',5.u[i].16.3(/\\n/g,\'<a>\'));7+=2}I{Q+=1s.3(\'$f\',8[7]).3(\'$h\',5.u[i].13.3(/\\n/g,\'<a>\'));R+=1t.3(\'$f\',8[7]).3(\'$h\',5.u[i].14.3(/\\n/g,\'<a>\'));S+=1u.3(\'$f\',8[7]).3(\'$h\',5.u[i].16.3(/\\n/g,\'<a>\'));7++}9(i<5.u.k-1){Q+=q;R+=q;S+=q}}}9(1H){Q+=r;R+=r;S+=r}}4 1I=0;9(5.v.k){O(4 i=0;i<5.v.k;i++){9(!(C==\'2I\'&&5.v[i].2J==\'no\')){1I++;9(1I==1){W+=2q;X+=2r;Y+=2s}9(5.v[i].2L==\'2M\'){W+=1p.3(\'$f\',8[7]).3(\'$E\',8[(7+1)]).3(\'$h\',5.v[i].13.3(/\\n/g,\'<a>\'));X+=1q.3(\'$f\',8[7]).3(\'$E\',8[(7+1)]).3(\'$h\',5.v[i].14.3(/\\n/g,\'<a>\'));Y+=1r.3(\'$f\',8[7]).3(\'$E\',8[(7+1)]).3(\'$h\',5.v[i].16.3(/\\n/g,\'<a>\'));7+=2}I{W+=1s.3(\'$f\',8[7]).3(\'$h\',5.v[i].13.3(/\\n/g,\'<a>\'));X+=1t.3(\'$f\',8[7]).3(\'$h\',5.v[i].14.3(/\\n/g,\'<a>\'));Y+=1u.3(\'$f\',8[7]).3(\'$h\',5.v[i].16.3(/\\n/g,\'<a>\'));7++}9(i<5.v.k-1){W+=q;X+=q;Y+=q}}}9(1I){W+=r;X+=r;Y+=r}}9(5.b){4 s=\'17="1J"\';O(4 i=0;i<5.b.k;i++){i%2?s=\'17="1J"\':s=\'17="37"\';C==\'1w\'?B=5.b[i].38:B=5.b[i].39;1Z+=1D.3(\'$18\',s).3(\'$19\',8[7]).3(\'$1a\',5.b[i].1b).3(\'$1c\',5.b[i].3a).3(\'$1d\',5.b[i].D).3(\'$1e\',5.b[i].1f).3(\'$1g\',B).3(\'$1h\',5.b[i].1i);20+=1E.3(\'$18\',s).3(\'$19\',8[7]).3(\'$1a\',5.b[i].1b).3(\'$1c\',5.b[i].3b).3(\'$1d\',5.b[i].D).3(\'$1e\',5.b[i].1f).3(\'$1g\',B).3(\'$1h\',5.b[i].1i);21+=1F.3(\'$18\',s).3(\'$19\',8[7]).3(\'$1a\',5.b[i].1b).3(\'$1c\',5.b[i].3c).3(\'$1d\',5.b[i].D).3(\'$1e\',5.b[i].1f).3(\'$1g\',B).3(\'$1h\',5.b[i].1i);7++}}9(5.c){4 s=\'17="1J"\';O(4 i=0;i<5.c.k;i++){i%2?s=\'17="1J"\':s=\'17="37"\';C==\'1w\'?B=5.c[i].38:B=5.c[i].39;22+=1D.3(\'$18\',s).3(\'$19\',8[7]).3(\'$1a\',5.c[i].1b).3(\'$1c\',5.c[i].3a).3(\'$1d\',5.c[i].D).3(\'$1e\',5.c[i].1f).3(\'$1g\',B).3(\'$1h\',5.c[i].1i);23+=1E.3(\'$18\',s).3(\'$19\',8[7]).3(\'$1a\',5.c[i].1b).3(\'$1c\',5.c[i].3b).3(\'$1d\',5.c[i].D).3(\'$1e\',5.c[i].1f).3(\'$1g\',B).3(\'$1h\',5.c[i].1i);24+=1F.3(\'$18\',s).3(\'$19\',8[7]).3(\'$1a\',5.c[i].1b).3(\'$1c\',5.c[i].3c).3(\'$1d\',5.c[i].D).3(\'$1e\',5.c[i].1f).3(\'$1g\',B).3(\'$1h\',5.c[i].1i);7++}}1W+=25+28+T+Q+W+2b+1Z+2e+22+2h;1X+=26+29+U+R+X+2c+20+2f+23+2i;1Y+=27+2a+V+S+Y+2d+21+2g+24+2j;$1K.A(1W);$1L.A(1X);$1M.A(1Y)},error:j(e){z.G(e);return 1m}})}})})($)',[],199,'|||replace|var|resource|split|imgIndex|imgArr|if|br|Exclusive|All_Tier|||_bannerImgSrc||_dynamicText||function|length|en|||tc|sc|line|space|itemDir|Exclusive_Highlight|New_Store_Highlight|Event_Highlight|layer|layedit||console|html|Points|EDM_Version|Remarks|_logoImgSrc|file|log|data|else|files|layui|imgUrl|load|click|for|msg|en_New_Store_Highlight|tc_New_Store_Highlight|sc_New_Store_Highlight|en_Exclusive_Highlight|tc_Exclusive_Highlight|sc_Exclusive_Highlight|en_Event_Highlight|tc_Event_Highlight|sc_Event_Highlight|img|startTime|val|excel_datas|Offer_EN|Offer_TC||Offer_SC|dir|_itemDir|_itemImgSrc|_itemTitle|Brand|_itemText|_itemRemarks|_itemDate|Redemption_Date|_itemPoints|_itemQty|QTY|upload|form|copy|false|let|trim|en_hasLogo|tc_hasLogo|sc_hasLogo|en_noLogo|tc_noLogo|sc_noLogo|versionBg|Normal|code|btn|workbook|sheet|persons|CreateEDM|en_imgText|tc_imgText|sc_imgText|isHasHeader_Exclusive_Highlight|isHasHeader_newStore_Highlight|isHasHeader_Event_Highlight|ltr|_edit_en|_edit_tc|_edit_sc|result|build|setContent|showPreview|type|Sheets|en_preSubject|tc_preSubject|sc_preSubject|en_layout|tc_layout|sc_layout|en_Exclusive|tc_Exclusive|sc_Exclusive|en_All_Tier|tc_All_Tier|sc_All_Tier|en_style|tc_style|sc_style|en_header|tc_header|sc_header|en_gift1|tc_gift1|sc_gift1|en_gift2|tc_gift2|sc_gift2|en_footer|tc_footer|sc_footer|en_newStoreHeader|tc_newStoreHeader|sc_newStoreHeader|en_exclusiveHeader|tc_exclusiveHeader|sc_exclusiveHeader|en_eventHeader|tc_eventHeader|sc_eventHeader|style|header|_startTime|_preSubject|_versionBg|gift1|gift2|footer|_remarks|newStoreHeader|exclusiveHeader|eventHeader|hasLogo|noLogo|imgText|Shui|BelongTo_Shui||Has_logo|yes|render|url|test|true|obj|preview|name|res|new|tool|index_en|index_tc|index_sc|Synchronize|change|XLSX|fromTo|css|border|color|rtl|Points_Normal|Points_Shui|Items_EN|Items_TC|Items_SC'.split('|'),0,{}))