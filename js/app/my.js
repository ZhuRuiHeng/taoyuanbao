var ws;
document.addEventListener('plusready',function(){
//	plus.storage.setItem('phone','18749830459');
	ws = plus.webview.currentWebview();
	//  刷新
	PullToRefresh(ws);
	var id = plus.storage.getItem('id');
	var user = plus.storage.getItem('user');
	
	console.log(user);  
	$('#user').html(user);
	
	//app推荐
	//自定义事件
	document.getElementById("openurl").addEventListener('tap',function(){
		var main =plus.webview.getWebviewById('index.html');
	    mui.fire(main,'gotuijian');	
	});
	
	
	
	
	
	//  获取个人信息
	$.ajax({    
		type:"get", 
		url : apiRoot + "?m=Home&c=Member&a=person_my",
   	    data : {
   		    id : id,
   		    user:user
     	},  
     	dataType : "json",
     	success : function(data){
     		console.log(JSON.stringify(data));
     		
     		//plus.storage.setItem('phone',data.data.phone+'');
     		if(data.tshi == 1){
     			if(data.nicheng){
     				$('#nicheng').html(data.nicheng);	
     			}else{
     				$('#nicheng').html('未添加');	
     			}
			    
			    // 去除地址内的空隔
			    var touxiang = $.trim(data.touxiang);
                touxiang = touxiang.replace(' ',"");
                if(touxiang){
                	$('#touxiang').attr('src',webRoot+touxiang);
                }
			    
			    $('#money').html(data.money);

			}else if(data.tshi == 0){
				plus.nativeUI.toast(data.tshi);						
			}
			
			//是否实名判断
			console.log(data.user+'+111111+')
			if(data.shiming == 1){
     			// 去除地址内的空隔
			    $('#shiming').html('已实名');
			}else{
				$('#shiming').html('');	
				
			}
			
     	},
     	error : function(e){
     		console.log(JSON.stringify(e));
     	}
	});
	
	//  修改支付密码
	$('#xiugai_pay').on('tap',function(){
//		alert('ok');
//		return;  
		// 检查支付密码是否已设置
		$.ajax({
			type : 'get',
			url : apiRoot + "?m=Home&c=Member&a=sel_pay_pass",
			data : {
				id : id
			},
			dataType : 'json',
			success : function(data){
				console.log(JSON.stringify(data));
				if(data.tshi==1){
					plus.webview.create('xiugai-pay.html','xiugai-pay.html').show('slide-in-right');
				}else{
					$(".alert").show();
			        $(".alert-back").show();
				}
			},
			error : function(e){
				console.log(JSON.stringify(e));
			}
		})
		
	})
	
	
	$('#dianji').on('tap',function(){
		plus.webview.create('new_file.html','new_file.html').show('slide-in-right');
	})
	
	
},false);