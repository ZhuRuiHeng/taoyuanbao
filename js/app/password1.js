var ws;
document.addEventListener('plusready',function(){
	ws = plus.webview.currentWebview();
    user = ws.user;
   $('#wancheng').on('click',function(){
// 	   alert('121212');
       var pass = $('#pass').val();
       var pass1= $('#pass1').val();
       if(pass.length < 6){
       	    plus.nativeUI.toast('密码长度需要大于6！');return;
       }
       if(pass != pass1){
       	    plus.nativeUI.toast('第二次密码输入错误！');return;
       }
       $.ajax({
       	type:"get",
       	url : apiRoot + "?m=Home&c=Member&a=add_find_pass",
       	data : {
       		user : user,
       		pass : pass,
       	},
       	dataType : "json",
       	success : function(data){
       		console.log(JSON.stringify(data));
       		if(data.rt > 0){
				plus.nativeUI.toast(data.tshi);
				closeWeb('password.html'); 
				ws.close();
			}else{
				plus.nativeUI.toast(data.tshi);
				return;
			}
       	},
       	error : function(e){
       		console.log(JSON.stringify(e));
       	}
       });
       
   })



},false);