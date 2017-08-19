var ws;
document.addEventListener('plusready',function(){
	ws=plus.webview.currentWebview();
	var id   = plus.storage.getItem('id');
	var user = plus.storage.getItem('user');
	//var title = document.getElementById('taobao_zhangh');
	console.log(user+1111111111111);
	//如果信息填写完成就显示内容
//	$.ajax({
//		    type:"get", 
//		    url:apiRoot+"?m=Home&c=Photo&a=get_bangdingtbinfo",
//		    data : {
//				user:user
//			},
//		    dataType : "json",
//		    success:function(data){  
//		    	 if(data.tishi==1){
//		    	 	
//		    	 	$('#taobao_zhangh').val(data.taobao_zhangh);
//		    	 	$('#taobao_nicheng').val(data.taobao_nicheng);
//		    	 	$('#cityResult3').val(data.taobao_address);
//		    	 	$('#userResult').val(data.zhanghao_sex);
//		    	 	$('#taobao_age').val(data.taobao_age);
//		    	 	$("#shili_img,#shili_text,.btn").hide();
//		    	 	
//		    	 	var zhuangtai=$("#zhuangtai");
//		    	 	if(data.zhuangtai=='1'){
//		    	 		zhuangtai.html("审核成功")
//		    	 	}else if(data.zhuangtai=='0'){
//		    	 		zhifu.html("审核失败")
//		    	 	}
//		    	 	$("#zhuangtai").html("审核中");
//		    	 	
//		    	 }else{
//		    	 	$("#shili_img,#shili_text,.btn").show();
//		    	 }
//		    },error:function(e){
//		    }
//		});
	//结束

	////////////////////////////////////////////////////////////////////
	    //  上传图片
	mui("body").on('tap','.tupian',function(){
	
		//alert(2)
		_this = $(this); 
		suoshu = _this.attr('data-id');
//		console.log(suoshu);return;
		plus.nativeUI.actionSheet({cancel:'取消',buttons:[{title:'相册添加'},{title:'拍照添加'}]},function(e){	
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
				console.log(t.responseText);
				plus.nativeUI.toast( "图片上传成功" );
			} else {
				plus.nativeUI.toast( "图片上传失败" );
			}  
		});
		//	 console.log(JSON.stringify(task));

		var f=files[0];
		task.addFile(f.path,{key:f.name});
		task.start(); 
	}
	//新增获取验证码
	 //获取验证吗
	var tel=0,t=60,tt,t2;
	$('#yanzheng').on('tap',getcheck)
	function getcheck(){ 
		phone = $('#taobao_sj').val();
		console.log("手机号："+phone)
		var leixing = 'zhuce';
		if(!phone){ 
			plus.nativeUI.toast('手机号不能为空！');return;
		}else if(!phone.match(p1)){ 
			plus.nativeUI.toast('手机号码格式不正确！');return;
		}
		console.log(apiRoot+"?m=Home&c=Index&a=yanzheng&phone="+phone+"&leixing="+leixing);
		$.ajax({
		    type:"get", 
		    url:apiRoot+"?m=Home&c=Index&a=yanzheng&phone="+phone+"&leixing="+leixing,
		    success:function(data){  
		    	code = data.code;
		    	console.log(data);
		    	tt = setInterval(function() {
		                time_less();
		             },1000);
		    toast('验证码发送成功');
		    },error:function(e){
		    	$('#yanzheng').unbind('tap');
		    	$('#yanzheng').on('tap',function() {
		            getcheck();
		        });
		        $('#yanzheng').html('获取验证码');
		    }
		});
	}
	
	function time_less () {
	    t--;
	    $('#yanzheng').html(t);
	    if(t <=0){
		    clearInterval(tt);
		    $('#yanzheng').unbind('tap');
		    $('#yanzheng').on('tap',function() {
		        getcheck();
		    });
			$('#yanzheng').html('重新获取');
			t = 60;
	    }
	}
	
	
	
	//获取验证码结束
	$('#tijiao').on('tap',function(){
		//alert(11);
		var my_taobao_pic = plus.storage.getItem('my_taobao_pic');
		var person_pic    = plus.storage.getItem('person_pic');
		var huiyuan_pic   = plus.storage.getItem('huiyuan_pic');
		var xinyu_pic     = plus.storage.getItem('xinyu_pic');
		var pingjia_pic   = plus.storage.getItem('pingjia_pic');
		
		var zhangdan1_pic = plus.storage.getItem('zhangdan1_pic');
		var zhangdan2_pic = plus.storage.getItem('zhangdan2_pic');
		var zhangdan3_pic = plus.storage.getItem('zhangdan3_pic');
//		var zhangdan4_pic = plus.storage.getItem('zhangdan4_pic');
//		var zhangdan5_pic = plus.storage.getItem('zhangdan5_pic');
//		var zhangdan6_pic = plus.storage.getItem('zhangdan6_pic');
//		var zhangdan7_pic = plus.storage.getItem('zhangdan7_pic');
//		var zhangdan8_pic = plus.storage.getItem('zhangdan8_pic');
//		var zhangdan9_pic = plus.storage.getItem('zhangdan9_pic');
//		var zhangdan10_pic = plus.storage.getItem('zhangdan10_pic');
//		console.log(my_taobao_pic+'=='); 
//		console.log(person_pic+'uuu');
//		console.log(huiyuan_pic+'---');
//		console.log(xinyu_pic+'***');
		//return;
		var taobao_zhangh  = $('#taobao_zhangh').val();
	    var taobao_age = $('#taobao_age').val();
	    var taobao_address = $('#cityResult3').val();
	    var taobao_nicheng = $('#taobao_nicheng').val();
	    var zhanghao_sex   = $('#userResult').val();
		//	    新增手机号，验证码
		var taobao_sj  = $('#taobao_sj').val();
		var taobao_yanz  = $('#taobao_yanz').val();
	    console.log('----1111'+taobao_nicheng+'---------------');
	    if (!taobao_zhangh) {
			plus.nativeUI.toast('淘宝账号不能为空！');
			return;
		} else if (!taobao_nicheng) {
			plus.nativeUI.toast('淘宝昵称不能为空！');
			return;
		} else if (!taobao_address) {
			plus.nativeUI.toast('地区不能为空！');
			return;
		} else if (!zhanghao_sex) {
			plus.nativeUI.toast('性别选项不能为空！');
			return;
		}else if (!taobao_age) {
			plus.nativeUI.toast('年龄不能为空！');
			return;
		}
		else if (!my_taobao_pic) {
			plus.nativeUI.toast('请上传淘宝截图！');
			return;
		}else if (!person_pic) {
			plus.nativeUI.toast('请上传个人资料截图！');
			return;
		}else if (!huiyuan_pic) {
			plus.nativeUI.toast('请上传会员中心截图！');
			return;
		}else if (!xinyu_pic) {
			plus.nativeUI.toast('请上传信誉评级截图！');
			return;
		}else if (!pingjia_pic) {
			plus.nativeUI.toast('请上传评价截图！');
			return;
		}else if (!zhangdan1_pic) {
			plus.nativeUI.toast('请至少上传一张支付宝账单截图！');
			return;
		}
		else if(!taobao_sj){
			plus.nativeUI.toast('手机号不能为空！');return;
		}
		else if(!taobao_yanz){
			plus.nativeUI.toast('验证码不能为空！');return;
		}
        plus.nativeUI.showWaiting('提交中...');
        
        
   
        
        $.ajax({
        	type:"get",
        	url : apiRoot + "?m=Home&c=Photo&a=bangding_taobao_zh",
        	data : {
        		           id : id,
        		         user : user,
        		taobao_zhangh : taobao_zhangh,
        	   taobao_nicheng : taobao_nicheng,
		 	   taobao_address : taobao_address,
		 	   	 zhanghao_sex : zhanghao_sex,
		 	   	   taobao_age : taobao_age,
		 	   	 	taobao_sj : taobao_sj,
		 	   	  taobao_yanz : taobao_yanz,
        		my_taobao_pic : my_taobao_pic,
        		   person_pic : person_pic,
        		  huiyuan_pic : huiyuan_pic,
        		    xinyu_pic : xinyu_pic,
        		  pingjia_pic : pingjia_pic,
        		zhangdan1_pic :zhangdan1_pic,
        		zhangdan2_pic :zhangdan2_pic,
        		zhangdan3_pic :zhangdan3_pic
//      		zhangdan4_pic :zhangdan4_pic,
//      		zhangdan5_pic :zhangdan5_pic,
//      		zhangdan6_pic :zhangdan6_pic,
//      		zhangdan7_pic :zhangdan7_pic
        		
        	},
        	dataType : 'json',
        	success : function(data){
        		plus.nativeUI.closeWaiting();
        		console.log(JSON.stringify(data)+'11111111111111');
        		if(data.rt==1){
        			plus.nativeUI.toast('已提交后台审核');
        			console.log(data.tshi);
        			ws.close();
        		}else{ 
        			plus.nativeUI.toast('提交失败');
        		}
        	},
        	error : function(e){
        		plus.nativeUI.closeWaiting();
        		plus.nativeUI.toast('提交失败');
        	//	console.log(JSON.stringify(e));
        	}
        });
	    
	})
	
	
},false);