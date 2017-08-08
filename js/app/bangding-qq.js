var ws;
var tel=0,t=60,tt,t2,code=0,aid=0;
	ws = plus.webview.currentWebview();
	var user = plus.storage.getItem('user');
	//var user = plus.storage.getItem('phone');
document.addEventListener('plusready',function(){
	$.ajax({
		    type:"get", 
		    url:apiRoot+"?m=Home&c=Member&a=get_shiming",
		    data : {
				user:user
			},
		    dataType : "json",
		    success:function(data){  
		    	 if(data.tishi==1){
		    	 	aid = data.aid;
		    	 	$('#name').val(data.name);
		    	 	$('#shenfenzheng').val(data.shenfenheng);
		    	 	$('#brankcard').val(data.brankcard);
		    	 	$('#phone').val(data.phone);
		    	 	$("#send_mms").hide();
		    	 	$("#yanzhengmano,#zhifu_pay,#zhifu,#zhuyi").hide();
		    	 	$("#baocunq").hide();
		    	 	
		    	 	$("#zhifu").html("")
		    	 	var zhifu=$("#zhifu");
		    	 	if(data.zhifu=='1'){
		    	 		zhifu.html("支付成功")
		    	 	}else{
		    	 		zhifu.html("支付中")
		    	 	}
		    	 	$("#isshow").html("审核中");
		    	 	
		    	 	if(data.isshow==1){
		    	 		$("#isshow").html("审核成功");
		    	 		$(".xiugaishiming").hide();
		    	 	}
//		    	 	else if(data.isshow==0){
//		    	 		$("#isshow").html("审核失败");
//		    	 	}
		    	 }else{
		    	 	$(".xiugaishiming").hide();
		    	 }
		    },error:function(e){
		    }
		});
	$('#yanzheng').on('tap',getcheck)
	//提交
	$('#baocunq').on('tap',function(){
		
		
	var name = $('#name').val();
	var phone = $('#phone').val();
	var yanzhengma = $('#yanzhengma').val();
	var brankcard = $('#brankcard').val();
	var shenfenheng = $('#shenfenzheng').val();
		if(!phone){ 
			plus.nativeUI.toast('手机号不能为空！');return;
		}else if(!phone.match(p1)){ 
			plus.nativeUI.toast('手机号码格式不正确！');return;
		}
		if(yanzhengma!=code){
			plus.nativeUI.toast('验证码错误');return;
		}
		if(!name){ 
			plus.nativeUI.toast('姓名不能为空！');return;
		}
		if(!brankcard){ 
			plus.nativeUI.toast('银行卡不能为空！');return;
		}
		if(!shenfenheng){ 
			plus.nativeUI.toast('身份证不能为空！');return;
		}
		
		$.ajax({
			type:"get",
			url :  "http://v.juhe.cn/verifybankcard4/query",
			
			data : {
				key:"05ceba0318bf4f0a17bbd6c36c8dfd9d",
				realname : name,
				mobile : phone,
				bankcard : brankcard,
				idcard : shenfenheng
			},
			dataType : 'json',
			success : function(data){
				console.log(JSON.stringify(data));
				var btnArray = ['取消', '确认'];
				
				if(data.error_code==0){
					if(data.result.res==1){
						//提示是否同意支付
						mui.confirm('此步骤需要支付3元审核费用，直接从账户扣除，是否同意？', '提示', btnArray, function(e) {
							if (e.index == 1) {
								
							  	plus.nativeUI.showWaiting( "等待中..." );  
								tijiaio_shiming(user,name,phone,brankcard,shenfenheng);
							} else {
								//取消跳转
								mui.toast('你取消了实名认证');
							}
						})
						
					}else{
						plus.nativeUI.toast(data.result.message);
					}
					
				}else{
					plus.nativeUI.toast(data.reason);
				}
				
			},
			error : function(e){
				console.log(JSON.stringify(e));
				plus.nativeUI.toast('失败！');
			}
			
		});
		
		
	})

},false);
function xiugaishiming(){
	$("#send_mms").show();
	$("#baocunq").show();
	$("#isshow").hide();
	$("#yanzhengmano,#zhifu_pay,#zhifu,#zhuyi").show();
}
function getcheck(){ 
		
		var phone = $('#phone').val();
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
		    dataType : "json",
		    success:function(data){  
		    	code = data.code;
		    	console.log(data)
		    	console.log(code);
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
function tijiaio_shiming(user,name,phone,brankcard,shenfenheng){
	$.ajax({
			type:"get",
			url : apiRoot + "?m=Home&c=Member&a=shiming",
			data : {
				aid:aid,
				user:user,
				name : name,
				phone : phone,
				brankcard : brankcard,
				shenfenheng : shenfenheng
			},
			dataType : 'json',
			success : function(data){
				console.log(JSON.stringify(data));
				if(data.tishi==1){
					plus.nativeUI.toast('成功！');
					ws.reload();
					//订单号aid
					var aid=data.aid;
					//跳转支付服务费
					//openNewPage('payment.html')
					
				}else{
					plus.nativeUI.toast(data.message);
				}
				plus.nativeUI.closeWaiting();
			},
			error : function(e){
				console.log(JSON.stringify(e));
				plus.nativeUI.toast('失败！');
				plus.nativeUI.closeWaiting();
			}
			//关闭
//			plus.nativeUI.closeWaiting();
		});
}
