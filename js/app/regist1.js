var ws;
document.addEventListener('plusready',function(){
	ws = plus.webview.currentWebview();
    var user = ws.shoujihao;
    var qqhao = ws.qqhao;
    var yqcode = ws.yqcode;
   $('#wancheng').on('tap',function(){
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
       	url : apiRoot + "?m=Home&c=Member&a=regist",
       	data : {
       		yqcode:yqcode,
       		user : user,
       		pass : pass,
       		qqhao : qqhao
       	},
       	dataType : "json",
       	success : function(data){
       		console.log(JSON.stringify(data)+111111); 
       		if(data.rt > 0){
				plus.nativeUI.toast(data.tshi);
				closeWeb('regist.html');
				ws.close();
				console.log('成功')
//				setTimeout(function () {},1000);
			}else{
//				plus.nativeUI.toast(data.tshi);
				return;
				console.log('失败')
			}
       	},
       	error : function(e){
       		console.log(JSON.stringify(e));
       	}
       });
       
   })



},false);