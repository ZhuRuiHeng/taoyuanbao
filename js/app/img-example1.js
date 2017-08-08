var ws;
document.addEventListener('plusready',function(){
	ws=plus.webview.currentWebview();
	plus.nativeUI.showWaiting('请稍等...');
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Release&a=jietushili_renwu",
		dataType : 'json',
		success : function(data){
			
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(data));
			//添加内容字段
			$("#shuoming").html(webRoot+data.html)
			if(data.tshi==1){
				$('#guanjianci').attr('src',webRoot+data.guanjianci);
				$('#rudian').attr('src',webRoot+data.rudian);
				$('#dibu').attr('src',webRoot+data.dibu);
				$('#dangqian').attr('src',webRoot+data.dangqian);
				$('#shoucangdianpu').attr('src',webRoot+data.shoucangdianpu);
				$('#shoucangbaobei').attr('src',webRoot+data.shoucangbaobei);
				$('#guanzhudianpu').attr('src',webRoot+data.guanzhudianpu);
				$('#gouwuche').attr('src',webRoot+data.gouwuche);
				$('#jinrupingjia').attr('src',webRoot+data.jinrupingjia);
				$('#bisanjia_one').attr('src',webRoot+data.bisanjia_one);
				$('#bisanjia_two').attr('src',webRoot+data.bisanjia_two);
				$('#bisanjia_three').attr('src',webRoot+data.bisanjia_three);
				$('#youhuiquan').attr('src',webRoot+data.youhuiquan);
				$('#liulan_one').attr('src',webRoot+data.liulan_one);
				$('#liulan_two').attr('src',webRoot+data.liulan_two);
				
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