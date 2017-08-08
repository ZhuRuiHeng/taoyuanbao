document.addEventListener('plusready',function(){
	var id = plus.storage.getItem('id');  // 用户id
	//$("#shoujihao").val(plus.storage.getItem('user'))
	//console.log(plus.storage.getItem('user'))
	//手机号码
		var phone = plus.storage.getItem('user');
		var reg = /^(\d{3})\d{4}(\d{4})$/;
		tels = phone.replace(reg, "$1****$2");
		var shoujihao = $('#shoujihao').val(tels);
	 //获取验证吗
	var tel=0,t=60,tt,t2;
	$('#yanzheng').on('tap',getcheck)
	 
	function getcheck(){ 
		phone = phone;
		var leixing = 'tixian';
//		if(!phone){ 
//			plus.nativeUI.toast('手机号不能为空！');return;
//		}else if(!phone.match(p1)){ 
//			plus.nativeUI.toast('手机号码格式不正确！');return;
//		}
		console.log(apiRoot+"?m=Home&c=Index&a=yanzheng&phone="+phone+"&leixing="+leixing);
		$.ajax({
		    type:"get", 
		    url:apiRoot+"?m=Home&c=Index&a=yanzheng&phone="+phone+"&leixing="+leixing,
		    success:function(data){  
		    	code = data.code;
		    	console.log(data);
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
	
	
	// 点击下一步 确认
	$('#xiayibu').on('tap',function(){
		//var shoujihao = $('#shoujihao').val();
		var shoujihao = phone;
		var yanzhengma = $('#yanzhengma').val();
		console.log(phone);
//		if(!shoujihao){ 
//			plus.nativeUI.toast('手机号不能为空！');return;
//		}else if(!shoujihao.match(p1)){
//			plus.nativeUI.toast('手机号码格式不正确！');return;
//		}
		if(!yanzhengma){
			plus.nativeUI.toast('验证码不能为空！');return;
		}
		plus.nativeUI.showWaiting('验证中...');
		$.ajax({
			type : "get",
            url : apiRoot + "?m=Home&c=Member&a=ver_pay_yan",
            data : {
            	shoujihao : shoujihao,
            	yanzhengma : yanzhengma
            }, 
			dataType : "json",
			success : function(data){
				plus.nativeUI.closeWaiting();
				console.log(JSON.stringify(data));
				if(data.rt == 1){
					plus.webview.create('xiugai-pay1.html','xiugai-pay1.html').show('slide-in-right'); 
				}else if(data.rt == 0){
					plus.nativeUI.toast(data.tshi);
				}
			},
			error : function(e){
				plus.nativeUI.closeWaiting();
				console.log(JSON.stringify(e));
			}
		})
		
	})
	
},false);