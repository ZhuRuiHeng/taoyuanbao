var ws;
document.addEventListener('plusready',function(){
	ws=plus.webview.currentWebview();
	plus.nativeUI.showWaiting('请稍等...');
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Release&a=jietushili",
		dataType : 'json',
		success : function(data){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(data));
			if(data.tshi==1){
				$('#my_tao').attr('src',webRoot+data.my_tao);
				$('#geren').attr('src',webRoot+data.geren);
				$('#huiyuan').attr('src',webRoot+data.huiyuan);
				$('#xinyu').attr('src',webRoot+data.xinyu);
				$('#pingjia').attr('src',webRoot+data.pingjia);
				$('#zhangdan').attr('src',webRoot+data.zhangdan);
				$('#shuoming2').html(data.shuoming2);
			}else{
				$('.mui-grid-view').html('<li>暂无示例</li>');
			}
		},
		error : function(e){
			console.log(JSON.stringify(e));
			plus.nativeUI.closeWaiting();
		}
	});
	
})