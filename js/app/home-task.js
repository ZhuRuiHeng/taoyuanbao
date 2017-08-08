var ws;
document.addEventListener('plusready',function(){
	PullToRefresh(ws);
	ws = plus.webview.currentWebview();
	
	var userid = plus.storage.getItem('id');
	plus.nativeUI.showWaiting('信息获取中...');
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Release&a=kan_renwu_geshu", 
		data : {
			userid : userid
		},
		dataType : 'json',
		success : function(data){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(data));
			if(data){
				$('#weiwan').html(data.weiwan);
				$('#daishen').html(data.daishen);
				$('#yishen').html(data.yishen);
				$('#butongguo').html(data.butongguo);
				$('#guanfangshen').html(data.guanfangshen); 
				
			}
		},
		error : function(e){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(e));
		}
		
	});
	
	
	
},false);