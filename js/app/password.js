document.addEventListener('plusready',function(){
	var sms_type = '身份验证';
	//  获取短信验证码
	$('#huoqu').on('click',function(){
		getcheck(sms_type);
	})
	
	 //获取验证吗
	var tel=0,t=60,tt,t2;
	$('#yanzheng').on('tap',getcheck)
	 
	function getcheck(){ 
		phone = $('#shoujihao').val();
		var leixing = 'mimazhaohui';
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
		    	console.log(data)
		    	console.log(code);
		    	tt = setInterval(function() {
		                time_less();
		             },1000);
		    plus.nativeUI.toast('验证码发送成功');
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
	
	
	
	$('#xiayibu').on('click',function(){
		var user = $('#shoujihao').val();
		var yanzhengma = $('#yanzhengma').val();
//		alert(yanzhengma+'  '+user);
		if(!user){
			plus.nativeUI.toast('手机号码不能为空！');return;
		}else if(!user.match(p1)){
			plus.nativeUI.toast('手机号码格式不正确！');return;
		}
		
		
		if(!yanzhengma){
			plus.nativeUI.toast('验证码不能为空！');return;
		}
		
		$.ajax({
			type : "get",
            url : apiRoot + "?m=Home&c=Member&a=find_pass",
            data : {
            	user : user,
            	yanzhengma : yanzhengma
            },
			dataType : "json",
			success : function(data){
//				plus.nativeUI.toast('ok');
				console.log(JSON.stringify(data));
				if(data.rt == 1){
					plus.webview.create('password1.html','password1.html',{},{user:user}).show('slide-in-right');
				}else if(data.rt == 0){
					plus.nativeUI.toast(data.tshi);
				}
			},
			error : function(e){
				console.log(JSON.stringify(e));
				plus.nativeUI.toast('手机号码错误');
			}
		})
		
		
	})
	
},false);