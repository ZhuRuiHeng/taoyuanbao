document.addEventListener('plusready',function(){
	var id = plus.storage.getItem('id');
	//  进入页面 获取个人资料
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Member&a=geren&id="+id,
		dataType : 'json', 
		success : function(data){
			console.log(JSON.stringify(data));            
//			var toux = data.touxiang.replace(/[\r\n]/g,""); //  去掉换行符 \n  
            var touxiang = $.trim(data.touxiang);
            touxiang = touxiang.replace(' ',"");
            if(touxiang){
            	$('#touxiang').attr('src',webRoot+touxiang);
            }			
			console.log(webRoot+touxiang);
			if(data.nicheng){
				$('#nicheng').val(data.nicheng);	
				console.log(data.nicheng);
			}else{
				$('#nicheng').attr('placeholder','未填写');
			}
			if(data.xingbie){
				$('#sex').val(data.xingbie);				
			}else{
				$('#sex').attr('placeholder','未填写');
			}
			if(data.age){
				$('#age').val(data.age);				
			}else{
				$('#age').attr('placeholder','未填写');
			}
			if(data.qqhao){
				$('#qq').val(data.qqhao);				
			}else{
				$('#qq').attr('placeholder','未填写');
			}
			
		},
		error : function(e){
			console.log(JSON.stringify(e));
		}
	});
	
	////////////////////////////////////////////////////////////////////
	//  添加头像图片
	$('#touxiang').on('click',function() {
		_this = $(this);
		plus.nativeUI.actionSheet({cancel:'取消',buttons:[{title:'相册添加'},{title:'拍照添加'}]},function(e){
		if(e.index == 1){    
			 plus.gallery.pick( function(path){
			 	_this.attr('src',path);
			 	appendPic(path);
			 }, function(error){}, {} );
		}else if(e.index == 2){ 
			var cmr = plus.camera.getCamera(); 
			cmr.captureImage( function(path){
				path = "file://" + plus.io.convertLocalFileSystemURL(path);
				_this.attr('src',path);
				appendPic(path);
			}, function(err){}, {index:1} );   
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
				plus.storage.setItem('avatar',t.responseText);  //  获取到的图片路径 
			} else {
				plus.nativeUI.toast( "头像上传失败" );
			}  
		});
		//	 console.log(JSON.stringify(task));

		var f=files[0];
		task.addFile(f.path,{key:f.name});
		task.start(); 
	}
	
    
	///////////////////////////////////////////////////////////////////////////////	
	
	//  修改完成 提交
	$('#baocun').on('tap',function(){
		var pic_dizhi = plus.storage.getItem('avatar');
        
//		var pic_dizhi = $('.home_top img').attr('src'); //   获取图片地址
		var nicheng = $('#nicheng').val();
		var sex = $("#sex").val();
		var age = $('#age').val();
		var qqhao = $('#qq').val();
//		alert(pic_dizhi);
//		alert(pic_dizhi + ' --1 '+nicheng+' --2 '+sex+' --3 '+id+' --4 '+age);return;
//      if(!nicheng){
//      	toast('昵称不能为空！');return;
//      }
        plus.nativeUI.showWaiting('提交中,请稍后...');
        $.ajax({
        	type:"get",
        	url : apiRoot + "?m=Home&c=Photo&a=geren_upd",
        	data : {
        		id : id,
        		qqhao : qqhao,
        		pic_dizhi : pic_dizhi,
        		nicheng : nicheng,
        		sex : sex,
        		age : age
        	}, 
        	dataType : 'json',
        	success : function(data){
        		console.log(JSON.stringify(data));
        		plus.nativeUI.closeWaiting();
//      		alert(data);
        		if(data > 0){
        			plus.nativeUI.toast('修改成功');
        			plus.webview.getWebviewById('my.html').reload(); 
        		}else{
        			plus.nativeUI.toast('修改失败');
        			plus.webview.getWebviewById('my.html').reload(); 
        		}
        	},
        	error : function(e){
        		plus.nativeUI.closeWaiting();
        		plus.nativeUI.toast('修改失败');
        		console.log(JSON.stringify(e));
        	}
        	
        });
		
	})
	
},false);