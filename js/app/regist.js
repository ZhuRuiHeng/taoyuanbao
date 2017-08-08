var ws;
document.addEventListener('plusready',function(){
	ws=plus.webview.currentWebview();
	
	 //获取验证吗
	var tel=0,t=60,tt,t2;
	$('#yanzheng').on('tap',getcheck)
	 
	function getcheck(){ 
		phone = $('#shoujihao').val();
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
	
	$('#xiayibu').on('tap',function(){

		var shoujihao = $('#shoujihao').val();
		var yanzhengma = $('#yanzhengma').val();
		var qqhao = $('#qqhao').val();
		var yqcode = $('#yqcode').val();
		var yuedu = $('#yuedu').prop('checked');
		if(!shoujihao){ 
			plus.nativeUI.toast('手机号不能为空！');return;
		}else if(!shoujihao.match(p1)){
			plus.nativeUI.toast('手机号码格式不正确！');return;
		}
		if(!yanzhengma){
			plus.nativeUI.toast('验证码不能为空！');return;
		}
		if(!qqhao){
			plus.nativeUI.toast('QQ号码不能为空！');return;
		}
		if(yuedu==false){
			plus.nativeUI.toast('未阅读相关服务条款和隐私！');return;
		}		
//		console.log(yuedu);
//		console.log(shoujihao+' '+yanzhengma+' '+qqhao+' '+yuedu);
		
		//  提交验证码 验证
		$.ajax({
			type : "get",
            url : apiRoot + "?m=Home&c=Member&a=register",
            data : {
            	   yqcode : yqcode,
            	shoujihao : shoujihao,
               yanzhengma : yanzhengma,
            	    qqhao : qqhao
            },
			dataType : "json",
			success : function(data){ 
				console.log(JSON.stringify(data));
				if(data.rt == 1){
					plus.webview.create('regist1.html','regist1.html',{},{yqcode:yqcode,shoujihao:shoujihao,qqhao:qqhao}).show('slide-in-right');
				}else if(data.rt == 0){
					plus.nativeUI.toast(data.tshi);
				}
			},
			error : function(e){
				console.log(JSON.stringify(e));
			}
		})
		
	})

	
},false);