document.addEventListener('plusready',function(){
	if(plus.storage.getItem('user')){
		 plus.webview.create('index.html','index.html').show('pop-in');return;   
	}
	$('#denglu').on('click',function(){
		
		var user = $('#user').val();
		var pass = $('#pass').val();
	//	console.log(user+pass);
		if(!user || !pass){  
			plus.nativeUI.toast('账号和密码不能为空');				
			return; 
		}else if(!user.match(p1)){
			plus.nativeUI.toast('手机号码格式不正确！');return;
		}
		plus.nativeUI.showWaiting('正在登录...');
		$.ajax({
			type:"get",
			url : apiRoot + "?m=Home&c=Member&a=login",
       	    data : {
       		    user : user,
       		    pass : pass
         	},
         	dataType : "json",
         	success : function(data){
         		plus.nativeUI.closeWaiting();
         		
         		console.log(JSON.stringify(data));
         		
         		if(data.rt == 1){
//					plus.nativeUI.toast(data.tshi);															
					plus.storage.setItem('id',data.data.id+'');
					plus.storage.setItem('user',data.data.yonghu+''); 
					plus.nativeUI.showWaiting('登录中...');
					setTimeout(function(){
						plus.nativeUI.closeWaiting();
						relogin(plus.webview.currentWebview().id); 
					},100);
					
//                  plus.webview.create('index.html','index.html').show('slide-in-right');
                    
                    //////////////////////////////////////////////////////
                    ////////////////////////////////////
	                
	                var yonghu = data.data.yonghu;
	                var userid = data.data.id;
	                
//					$.ajax({
//						type:"get",
//						url : apiRoot + "?m=Home&c=Payfor&a=bohui_sel",
//						data:{
//							yonghu : yonghu,
//							userid :userid
//						},
//						success:function(data){
//							if(data==3){
//								console.log('审核不通过'+data);
//							}else if(data==2){
//								console.log('审核通过'+data);
//							}else{
//								console.log('没有');
//							}
//						},
//						error: function(e){  
//							
//						}
//					});
					
					/////////////////////////////////////
					
//					$.ajax({
//						type:"get",
//						url: apiRoot + "?m=Home&c=Payfor&a=sel_back",
//						data:{
//							yonghu : yonghu,
//							userid :userid
//						},
////						dataType:'json',
//						success:function(data){
//							if(data==34){
//								console.log('返回浏览的');
//							}else if(data==123){
//								console.log('没有浏览的');
//							}
//						},
//						error:function(e){
//							
//						}
//					});
					
//					$.ajax({
//						type:"get",
//						url: apiRoot + "?m=Home&c=Payfor&a=zhi_back",
//						data:{
//							yonghu : yonghu,
//							userid :userid
//						},
////						dataType:'json',
//						success:function(data){
//							if(data==34){
//								console.log('返回直通车的');
//							}else if(data==123){
//								console.log('没有直通车的');
//							}
//						},
//						error:function(e){
//							
//						}
//					});
					
//					$.ajax({
//						type:"get",
//						url: apiRoot + "?m=Home&c=Payfor&a=tao_back",
//						data:{
//							yonghu : yonghu,
//							userid :userid
//						},
////						dataType:'json',
//						success:function(data){
//							if(data==34){
//								console.log('返回淘口令的');
//							}else if(data==123){
//								console.log('没有淘口令的');
//							}
//						},
//						error:function(e){
//							
//						}
//					});
					
//					$.ajax({
//						type:"get",
//						url: apiRoot + "?m=Home&c=Payfor&a=good_back",
//						data:{ 
//							yonghu : yonghu,
//							userid :userid
//						},
////						dataType:'json',
//						success:function(data){
//							if(data==34){
//								console.log('返回聚划算的');
//							}else if(data==123){
//								console.log('没有聚划算的');  
//							}
//						},
//						error:function(e){
//							
//						}
//					});
                    //////////////////////////////////////////////////////
                    
                    setTimeout(function(){
                    	plus.webview.currentWebview().close();
                    },5000) 
				}else if(data.rt == 0){
					plus.nativeUI.toast(data.tshi);						
				}
         	},
         	error : function(e){
         		console.log('error');
         	}
		});
		
	})
	
//	var aaa = plus.storage.getItem('user'); 
//	
//	console.log(aaa);
	
},false);

function relogin(_self) {
	var all = plus.webview.all();
	for(var i in all) {
		if(all[i].id !== plus.runtime.appid && all[i].id !== _self) {
			all[i].close();
		}
		if(i == all.length - 1) {
			plus.webview.create('index.html','index.html').show('pop-in');
			//goUrl('index.html');
			plus.webview.currentWebview().close();
		}
	}
}

//function relogin(_self) {
//var all = plus.webview.all();
////	console.log(JSON.stringify(all));
//for(var i in all) {
////	 var aaa = plus.runtime.appid;  
//if(all[i].id !== plus.runtime.appid && all[i].id !== _self) {
//all[i].close();   
//}
//if(i == all.length - 1) {
//var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
//var webviewContent= plus.webview.create('./index.html','index.html');//后台创建webview并打开show.html
//webviewContent.addEventListener("loaded", function() { //注册新webview的载入完成事件
//      nwaiting.close(); //新webview的载入完毕后关闭等待框
//      webviewContent.show("slide-in-right",20); //把新webview窗体显示出来，显示动画效果为速度200毫秒的右侧移入动画
//      }, false);
//////	 plus.webview.create('./index.html','index.html').show('slide-in-right');
//}
//}
//}