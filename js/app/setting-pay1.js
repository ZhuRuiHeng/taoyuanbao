var ws;
document.addEventListener('plusready',function(){
	ws=plus.webview.currentWebview();
	var id = plus.storage.getItem('id');
	$('#wancheng').on('tap',function(){
		var pass = $('#pass').val();
		var pass1 = $('#pass1').val();
		if(!pass){
			plus.nativeUI.toast('密码不能为空！');return;
		}else if(pass.length < 6){
			plus.nativeUI.toast('密码长度不得小于6！');return;
		}
		if(pass != pass1){
			plus.nativeUI.toast('两次输入密码不相同！');return;
		}
		plus.nativeUI.showWaiting('提交中...');
		$.ajax({
			type:"get",
			url : apiRoot + "?m=Home&c=Member&a=upd_pay_pass",
			data : {
				  id : id,
				pay_pass : pass 
			},
			dataType : 'json',
			success : function(data){
				plus.nativeUI.closeWaiting();
				console.log(JSON.stringify(data));
				if(data.tshi == 1){
					plus.nativeUI.toast('设置成功！');	
					reloadWeb('cash.html');
					plus.webview.getWebviewById('setting-pay.html').close(); 
					ws.close();
				}else{
					plus.nativeUI.toast('设置失败！');
				}
			},
			error : function(e){
				plus.nativeUI.closeWaiting();
				plus.nativeUI.toast('修改失败！');
				console.log(JSON.stringify(e));
				
			}
		});
		
	})
},false);