var ws;
var gouwuche = '';
var shoucangbaobei = ''; 
var shoucangdianpu = ''; 
var guanzhudianpu =  '';
var jinrupingjia =  '';
var bisanjia = ''; 
var youhuiquan = ''; 
var suijiliulan =  ''; 
var zhubaobei = '';



document.addEventListener('plusready',function(){
	ws = plus.webview.currentWebview();
	var renwu_id = ws.renwu_id;
	var tao_hao  = ws.tao_hao;
	
	console.log(renwu_id +' '+ tao_hao);
	//进来弹窗提示淘宝号
	mui.alert('[特别注意]以下违规行为第一次发现扣除10元提现金额，第二次封号处理：1买家以任何方式私下联系商家！2擅自卡条件查找商品（商家要求的除外）！请遵守平台跟着，如有疑问请联系客服QQ：4001176017：', '请使用“'+tao_hao+'”淘宝账号完成任务，', function() {
				
	}); 

//定义跳转淘宝事件
	function launchApp() {
		if ( plus.os.name == "Android" ) {
			plus.runtime.launchApplication( {pname:"com.taobao.taobao"
				,extra:{url:"https://m.taobao.com/#index"}}, function ( e ) {
					alert( "打开失败:" + e.message );
			} );
		} else if ( plus.os.name == "iOS" ) {
			plus.runtime.launchApplication( {action:"taobao://"}, function ( e ) {
				alert( "打开失败: " + e.message );
			} );
		}
	}

	//复制粘贴
	document.getElementById("anniu").addEventListener('tap', function() {
			//mui.toast('请手动复制关键词');
			var btnArray = ['否', '是'];
			mui.confirm('是否跳转到淘宝', '提示', btnArray, function(e) {
				if (e.index == 1) {
					//跳转淘宝
				//window.location.href = 'https://m.taobao.com/#index';
				//openNewPage('taobao.html')
				launchApp();

				} else {
					//取消跳转
					mui.toast('你取消了跳转淘宝');
				}
			})
	});	

 
	
	//  获取任务信息
	plus.nativeUI.showWaiting('信息获取中...');
	$.ajax({
		type:"get",
		async:false,
		url : apiRoot + "?m=Home&c=Release&a=renwuxinxi", 
		data : {
			renwu_id : renwu_id,
			tao_hao : tao_hao,
			renwuzhonglei : 1 
		},
		dataType : 'json',
		//success
		success : function(data){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(data));
			if(data.tshi==1){
				var shangp_pic = data.shangp_pic.replace(/(^\s*)|(\s*$)/g, "");
				shangp_pic = shangp_pic.replace('|,|',''); 
				$('#shangp_pic').attr('src',webRoot+shangp_pic);
				$('#example1').attr('href',webRoot+shangp_pic);
//				console.log(webRoot+shangp_pic);
                var chang = data.shangp_minc.length;
                if(chang<=10){
                	shangp_minc = data.shangp_minc;
                }else if(chang>=11){
                	shangp_minc = data.shangp_minc.substring(0,4)+'*'+'*'+'*'+'*'+'*'+'*';
                	shangp_minc = shangp_minc + data.shangp_minc.substring(chang-4); 
                }
				$('#shangp_minc').html(shangp_minc);
				
				var len = data.dianpu_minc.length;
				if(len>=3){
					dianpu_minc = '*'+data.dianpu_minc.substring(1);
				    dianpu_minc = dianpu_minc.substring(0,len-1)+'*';
				}else if(len==2){
					dianpu_minc = data.dianpu_minc.substring(0,1)+'*';
				}else{
					dianpu_minc = data.dianpu_minc;
				}				
				$('#dianpu_minc').html(dianpu_minc); 
				$('#shangp_jiage').html(data.shangp_jiage);
				$('#find_baobei').html(data.find_baobei);
				$('#sousuo_guanj').val(data.sousuo_guanj);
				$('#paixufangshi').html(data.paixufangshi);
				$('#zhekou_fuwu').html(data.zhekou_fuwu);
				$('#fahuo_diqu').html(data.fahuo_diqu);
				$('#yongh').html(tao_hao);
				if(data.renwuzhuangtai==0){
					//取消任务
//					$('#quxiao').append('<h5 id="quxiaorenwu" style="line-height: 33px;">取消任务</h5>');
					//mui('#quxiaorenwu').on('tap',quxiaorenwu)
					document.getElementById("quxiaorenwu").addEventListener('tap', function() {
						plus.nativeUI.confirm('你确定要取消这个任务吗？',function(e){							
									if(e.index == 0){ 
										plus.nativeUI.showWaiting('请稍等...');
										$.ajax({
											type:"get",
											url : apiRoot + "?m=Home&c=Release&a=quxiaorenwu", 
											data : {
												renwu_id : renwu_id,
												tao_hao  : tao_hao 
											},
											dataType : 'json', 
											success : function(data){
												plus.nativeUI.closeWaiting();
												console.log(JSON.stringify(data));
												if(data.tshi==1){
													plus.nativeUI.toast('任务已取消！');
													
													reloadWeb('home-liulan.html');
													ws.close();
												}else{
													plus.nativeUI.toast('操作失败！');
												}
											},
											error : function(e){
												plus.nativeUI.closeWaiting();
												console.log(JSON.stringify(e));
											}
										});				
								   }				   	       
								},"选择删除",['确认','取消'])
						});
					
				}
				console.log('==='+data.renwuzhuangtai);  
//				$('#gongji').html(data.gongji); 
				//  2016-11-28  修改   ///////////////////
				gouwuche = (data.gouwuche == 1 ? '<p>加入购物车</p>' : '');
				shoucangbaobei = (data.shoucangbaobei == 1 ? '<p>收藏宝贝</p>' : '');
				shoucangdianpu = (data.shoucangdianpu == 1 ? '<p>收藏店铺</p>' : '');
				guanzhudianpu = (data.guanzhudianpu == 1 ? '<p>关注店铺</p>' : '');
				jinrupingjia = (data.jinrupingjia == 1 ? '<p>进入评价页面</p>' : '');
				bisanjia = (data.bisanjia == 1 ? '<p>货比三家(各1分钟)</p>' : '');
				youhuiquan = (data.youhuiquan == 1 ? '<p>领取优惠券</p>' : '');
				suijiliulan = (data.suijiliulan == 1 ? '<p>随机浏览副宝贝(各1分钟)</p>' : '');
//				var zhubaobei = (data.zhubaobei == 1 ? '<p>主宝贝浏览2分钟+：<span>'+data.meirenjiage+'元</span></p>' : '');    
				zhubaobei = ('<p>主宝贝浏览2分钟+'+data.zhubaobei+'分钟</p>');
				//  2016-11-28  修改   ///////////////////
				var gongji = '<p>共计：<span>'+data.gongji+'</span><span>元</span></p>';
				$('#xuqiu').append(gouwuche+shoucangbaobei+shoucangdianpu+guanzhudianpu+jinrupingjia+bisanjia+youhuiquan+suijiliulan+zhubaobei+gongji);          
			
			//判断上传位置
			uploadPics(data.shoucangdianpu,data.shoucangbaobei,data.guanzhudianpu,data.gouwuche,
				data.jinrupingjia,data.bisanjia,data.youhuiquan,data.suijiliulan);
			
			////  取消任务移动到上边70行
			
		
			
			
			
			}else{
				plus.nativeUI.toast('任务获取失败！');
			}
		},
		//error
		error : function(e){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(e));
		}
	});
		
	
	    //  上传图片
	 mui('.mui-table-view').on('tap','.tupian',function(){
		//$('.tupian').on('click',function() {
		_this = $(this); 
		suoshu = _this.attr('data-id');
//		console.log(suoshu);return;
//		plus.nativeUI.actionSheet({cancel:'取消',buttons:[{title:'相册添加'},{title:'拍照添加'}]},function(e){	
		plus.nativeUI.actionSheet({cancel:'取消',buttons:[{title:'相册添加'}]},function(e){	
//			console.log('---');
		if(e.index == 1){    
			_this.html('<img src="" style="width:65px;height:65px" />');
//          console.log('====');
			 plus.gallery.pick( function(path){
			 	console.log(path);
			 	_this.find('img').attr('src',path);
			 	appendPic(path);
			 }, function(error){
			 	_this.html('&#xe61b;');
			 }, {} );
		}else if(e.index == 2){ 
			_this.html('<img src="" style="width:65px;height:65px" />');
			var cmr = plus.camera.getCamera(); 
			cmr.captureImage( function(path){
				path = "file://" + plus.io.convertLocalFileSystemURL(path);
				_this.find('img').attr('src',path);
				appendPic(path);
			}, function(err){
				_this.html('&#xe61b;');
			}, {index:1} );
		}
		})
	})
		
		
	var index = 1;
	var files = [];
	// 添加照片
	function appendPic(path) {
		var path_new = compressImg(path,'_w',30);//压缩图片
		   files[0] = {name:"uploadkey"+index,path:path_new};   //console.log(path_new);
		   setTimeout(upload,1000);
	}
	//创建对像
	function upload(){
		plus.nativeUI.showWaiting('照片获取中,请稍后...');
	    var  task = plus.uploader.createUpload(apiRoot + '?m=Home&c=Photo&a=uploadOnePhoto',{ method:"POST"},function ( t, status ) { 

			plus.nativeUI.closeWaiting();
			if (status == 200 ) {
//				toast( "头像上传中" );
				plus.storage.setItem(suoshu,t.responseText);  //  获取到的图片路径 
				console.log('we'+t.responseText);
			} else {
				plus.nativeUI.toast( "图片上传失败" );
			}  
		});
		//	 console.log(JSON.stringify(task));

		var f=files[0];
		task.addFile(f.path,{key:f.name});
		task.start(); 
	}
///////////////////////////////////////////////////////////////////////////////////////////	
	
	//  点击提交图片
	var tijiaorenwu = document.getElementById('tijiaorenwu');
	tijiaorenwu.addEventListener('tap',function(){
//	$('#tijiaorenwu').on('tap',function(){ 
		var guanjianci         = plus.storage.getItem('guanjianci');
		var rudian             = plus.storage.getItem('rudian');
		var dibu               = plus.storage.getItem('dibu');
		var dangqianzhanghao   = plus.storage.getItem('dangqianzhanghao');
		var shoucangdianpu_pic = plus.storage.getItem('shoucangdianpu_pic');
		var shoucangbaobei_pic = plus.storage.getItem('shoucangbaobei_pic');
		var guanzhudianpu_pic  = plus.storage.getItem('guanzhudianpu_pic');
		var gouwuche_pic       = plus.storage.getItem('gouwuche_pic');
		var jinrupingjia_pic   = plus.storage.getItem('jinrupingjia_pic');
		var bisanjia_pic_one   = plus.storage.getItem('bisanjia_pic_one');
		var bisanjia_pic_two   = plus.storage.getItem('bisanjia_pic_two');
		var bisanjia_pic_three = plus.storage.getItem('bisanjia_pic_three');
		var youhuiquan_pic     = plus.storage.getItem('youhuiquan_pic');
		var liulanfu_one       = plus.storage.getItem('liulanfu_one');
		var liulanfu_two       = plus.storage.getItem('liulanfu_two');
//		console.log('==='+guanjianci);
//		console.log('---'+ridian);
		
		guanjianci         = (guanjianci ? guanjianci : '');
		rudian             = (rudian ? rudian : '');
		dibu               = (dibu ? dibu : '');
		dangqianzhanghao   = (dangqianzhanghao ? dangqianzhanghao : '');
		shoucangdianpu_pic = (shoucangdianpu_pic ? shoucangdianpu_pic : '');
		shoucangbaobei_pic = (shoucangbaobei_pic ? shoucangbaobei_pic : '');
		guanzhudianpu_pic  = (guanzhudianpu_pic ? guanzhudianpu_pic : '');
		gouwuche_pic       = (gouwuche_pic ? gouwuche_pic : '');
		jinrupingjia_pic   = (jinrupingjia_pic ? jinrupingjia_pic : '');
		bisanjia_pic_one   = (bisanjia_pic_one ? bisanjia_pic_one : '');
		bisanjia_pic_two   = (bisanjia_pic_two ? bisanjia_pic_two : '');
		bisanjia_pic_three = (bisanjia_pic_three ? bisanjia_pic_three : '');
		youhuiquan_pic     = (youhuiquan_pic ? youhuiquan_pic : '');
		liulanfu_one       = (liulanfu_one ? liulanfu_one : '');
		liulanfu_two       = (liulanfu_two ? liulanfu_two : '');
		
//		if(guanjianci==''&&rudian==''&&dibu==''&&dangqianzhanghao==''&&shoucangdianpu_pic==''&&shoucangbaobei_pic==''&&guanzhudianpu_pic==''&&gouwuche_pic==''&&jinrupingjia_pic==''&&bisanjia_pic_one==''&&bisanjia_pic_two==''&&bisanjia_pic_three==''&&youhuiquan_pic==''&&liulanfu_one==''&&liulanfu_two==''){          
//			plus.nativeUI.toast('您还未添加图片');return; 
//		}
        if(guanjianci==''){
        	plus.nativeUI.toast('缺少截图');return; 
        }else if(rudian==''){
        	plus.nativeUI.toast('缺少截图');return; 
        }else if(dibu==''){
        	plus.nativeUI.toast('缺少截图');return; 
        }else if(dangqianzhanghao==''){
        	plus.nativeUI.toast('缺少截图');return; 
        }
        if( shoucangdianpu !='' && shoucangdianpu_pic==''){
        	plus.nativeUI.toast('缺少截图');return; 
        }else if( shoucangbaobei !='' && shoucangbaobei_pic==''){
        	plus.nativeUI.toast('缺少截图');return; 
        }else if( guanzhudianpu !='' && guanzhudianpu_pic==''){
        	plus.nativeUI.toast('缺少截图');return; 
        }else if( gouwuche !='' && gouwuche_pic==''){
        	plus.nativeUI.toast('缺少截图');return; 
        }else if( jinrupingjia !='' && jinrupingjia_pic==''){
        	plus.nativeUI.toast('缺少截图');return; 
        }else if( bisanjia !='' && bisanjia_pic_one==''){
        	plus.nativeUI.toast('缺少截图');return; 
        }else if( bisanjia !='' && bisanjia_pic_two==''){
        	plus.nativeUI.toast('缺少截图');return; 
        }else if( bisanjia !='' && bisanjia_pic_three==''){
        	plus.nativeUI.toast('缺少截图');return; 
        }else if( youhuiquan !='' && youhuiquan_pic==''){
        	plus.nativeUI.toast('缺少截图');return; 
        }else if( suijiliulan !='' && liulanfu_one==''){
        	plus.nativeUI.toast('缺少截图');return; 
        }else if( suijiliulan !='' && liulanfu_two==''){
			plus.nativeUI.toast('缺少截图');return; 
		}
		plus.nativeUI.showWaiting('提交中...');
		// 提交添加的图片
		$.ajax({
			type:"get",
			url : apiRoot + "?m=Home&c=Photo&a=add_wan_renwu", 
			data : {
				renwu_id            : renwu_id,
				tao_hao             : tao_hao,
				guanjianci          : guanjianci,
				rudian              : rudian,
				dibu                : dibu,
				dangqianzhanghao    : dangqianzhanghao,
				shoucangdianpu_pic  : shoucangdianpu_pic,
				shoucangbaobei_pic  : shoucangbaobei_pic,
				guanzhudianpu_pic   : guanzhudianpu_pic,
				gouwuche_pic        : gouwuche_pic,
				jinrupingjia_pic    : jinrupingjia_pic,
				bisanjia_pic_one    : bisanjia_pic_one,
				bisanjia_pic_two    : bisanjia_pic_two,
				bisanjia_pic_three  : bisanjia_pic_three,
				youhuiquan_pic      : youhuiquan_pic,
				liulanfu_one        : liulanfu_one,
				liulanfu_two        : liulanfu_two
			},
			dataType : 'json',
			success : function(data){
				plus.nativeUI.closeWaiting();
				console.log(JSON.stringify(data));
				plus.storage.setItem('guanjianci','');
				plus.storage.setItem('rudian','');
				plus.storage.setItem('dibu','');
				plus.storage.setItem('dangqianzhanghao','');
				plus.storage.setItem('shoucangdianpu_pic','');
				plus.storage.setItem('shoucangbaobei_pic','');
				plus.storage.setItem('guanzhudianpu_pic','');
				plus.storage.setItem('gouwuche_pic','');
			    plus.storage.setItem('jinrupingjia_pic','');
				plus.storage.setItem('bisanjia_pic_one','');
				plus.storage.setItem('bisanjia_pic_two','');
				plus.storage.setItem('bisanjia_pic_three','');
				plus.storage.setItem('youhuiquan_pic','');
				plus.storage.setItem('liulanfu_one','');
				plus.storage.setItem('liulanfu_two','');
				if(data.tshi==1){
					plus.nativeUI.toast('提交成功！');
					reloadWeb('home-task.html');
					reloadWeb('home-task-no.html');
					ws.close();
				}else{
					plus.nativeUI.toast('提交失败！');
				}
				
			},
			error : function(e){
				plus.nativeUI.closeWaiting();
				console.log(JSON.stringify(e));
				plus.storage.setItem('guanjianci','');
				plus.storage.setItem('rudian','');
				plus.storage.setItem('dibu','');
				plus.storage.setItem('dangqianzhanghao','');
				plus.storage.setItem('shoucangdianpu_pic','');
				plus.storage.setItem('shoucangbaobei_pic','');
				plus.storage.setItem('guanzhudianpu_pic','');
				plus.storage.setItem('gouwuche_pic','');
			    plus.storage.setItem('jinrupingjia_pic','');
				plus.storage.setItem('bisanjia_pic_one','');
				plus.storage.setItem('bisanjia_pic_two','');
				plus.storage.setItem('bisanjia_pic_three','');
				plus.storage.setItem('youhuiquan_pic','');
				plus.storage.setItem('liulanfu_one','');
				plus.storage.setItem('liulanfu_two','');
			}
				
		});
		
		
	})
	
	
	
},false);