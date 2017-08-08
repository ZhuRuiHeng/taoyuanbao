var ws;
var html = '';
document.addEventListener('plusready',function(){
	ws = plus.webview.currentWebview();
	PullToRefresh(ws);
	var yonghu = plus.storage.getItem('user');
	
	plus.nativeUI.showWaiting();
	// 资金明细
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Member&a=zijin",  
		data : {
			yonghu : yonghu
		},
		dataType : 'json',
		success : function(data){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(data));
			 if(data.length>0){
			 	$.each(data, function(index,v) {
			 		if(v.churu=='收入'){
			 			html =  '<ul class="mui-table-view">'+
							        '<li class="mui-table-view-cell">'+
							           	'收入<span class="jia">+'+v.duoshao+'</span>'+
							           	'<p>'+
							           		v.addtime+' <span class="ye">余额：'+v.yuer+'</span>'+
							           	'</p>'+
							        '</li>'+
							    '</ul>';
			 		}else{
			 			html =  '<ul class="mui-table-view">'+
							        '<li class="mui-table-view-cell">'+
							           	v.churu+'<span class="jian">'+v.duoshao+'</span>'+
							           	'<p>'+
							           		v.addtime+' <span class="ye">余额：'+v.yuer+'</span>'+
							           	'</p>'+
							        '</li>'+
							    '</ul>';
			 		}
			 		$('#mingxi').prepend(html);
			 	})
			 }
		},
		error : function(e){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(e));
		}
		
	});
	
},false);