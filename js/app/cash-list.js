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
		url : apiRoot + "?m=Home&c=Member&a=tixian_list",  
		data : {
			yonghu : yonghu
		},
		dataType : 'json',
		success : function(data){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(data));
			 if(data.length>0){
			 	$.each(data, function(index,v) {
			 			html =  '<ul class="mui-table-view">'+
							        "<li class='mui-table-view-cell' onclick=openNewPage('cash-show.html?aid="+v.aid+"')>"+
							           	v.name+'<span class="jian">¥'+v.tixianjine+'</span>'+
							           	'<p>'+
							           		v.addtime+' <span class="ye">状态：'+v.isshow+'</span>'+
							           	'</p>'+
							        '</li>'+
							    '</ul>';
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