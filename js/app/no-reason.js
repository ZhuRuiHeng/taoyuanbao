var ws;
document.addEventListener('plusready',function(){
	ws = plus.webview.currentWebview();
	var renwu_id = ws.renwu_id;
	var tao_hao  = ws.tao_hao;
	
	plus.nativeUI.showWaiting('请稍等...');
	// 查找驳回理由
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Release&a=bohuiliyou",  
		data : {
			renwu_id : renwu_id,
			tao_hao  : tao_hao
		},
		dataType : 'json',
		success : function(data){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(data));
			if(data.tshi==1){
				$('#liyou').html(data.bohuiliyou);
			}else{
				$('#liyou').html('无');
			}
		},
		error : function(e){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(e));
		}
		
	});
	
	
	
},false);