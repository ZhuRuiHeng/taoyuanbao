var ws;
document.addEventListener('plusready',function(){
	var yonghu = plus.storage.getItem('user');
	//console.log(yonghu)
	var pay_pass; 
	var yuer;
	ws = plus.webview.currentWebview();
	plus.nativeUI.showWaiting('请稍等...');
	// 查看可提现金额
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Member&a=ketijine",
		data : {
			yonghu : yonghu
		},
		dataType : 'json', 
		success : function(data){ 
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(data));
			if(data){
				$('#ketijine').html(data.money);
				pay_pass = data.pay_pass;
				yuer = data.money;
			}else{
				$('#ketijine').html(0);
			}
		},
		error : function(e){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(e));
		}
		
	});
	
	//  点击确认提现
	$('#querentixian').on('tap',function(){
		var zhifubao = $('#zhifubao').val();
		var name = $('#name').val();
		var yaoti = $('#yaoti').val();
		var zhifumima = $('#zhifumima').val();
		if(!zhifubao){
			plus.nativeUI.toast('支付宝账号不能为空！');return;
		}
		if(!name){
			plus.nativeUI.toast('姓名不能为空！');return;
		}
		
		if(yaoti < 20){
			plus.nativeUI.toast('提现金额不能小于20元！');return;
		}
		
		if( parseInt(yaoti) != yaoti){
			plus.nativeUI.toast('提现金额必须是整数！');return; 
		}
		
		if(!pay_pass){
			$(".btn").click(function(){	
				$(".alert").show()
				$(".alert-back").show()
			})
			$(".alert .mui-btn").click(function(){
				$(".alert").hide()
				$(".alert-back").hide()
			})
		}
		if(!zhifumima){
			plus.nativeUI.toast('支付密码不能为空！');return; 
		}
		
		hash = hex_md5(zhifumima);
		if(hash!==pay_pass){
			plus.nativeUI.toast('支付密码错误！');return;
		}
//		console.log(yuer);return;    
//		if(Number(yaoti)>Number(yuer)){
//			plus.nativeUI.toast('申请提现金额不能大于余额！');return;
//		}
		if(yaoti>yuer){
			plus.nativeUI.toast('申请提现金额不能大于余额！');return;
		}
		
		plus.nativeUI.showWaiting('提交中...');
		// 提交申请提现
		$.ajax({
			type:"get",
			url : apiRoot + "?m=Home&c=Member&a=tijiaoshenqing", 
			data : {
				  yonghu : yonghu,
				zhifubao : zhifubao,
			   	    name : name,
				   yaoti : yaoti,
				   yuer  : yuer
			},
			dataType : 'json',
			success : function(data){
				console.log(data)
				
				plus.nativeUI.closeWaiting();
				console.log(JSON.stringify(data));
				if(data.tshi==1){
					plus.nativeUI.toast('申请提现成功');
					reloadWeb('home.html');
					reloadWeb('my.html');
					reloadWeb('cash-details.html'); 
					ws.close();
				}else{
					plus.nativeUI.toast('申请提现失败');
				}
			},
			error : function(e){
				plus.nativeUI.closeWaiting();
				plus.nativeUI.toast('申请提现失败');
				console.log(JSON.stringify(e));
			}
			
		});
		
		
	})
	
	
},false);