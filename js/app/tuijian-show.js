var ws;
document.addEventListener('plusready',function(){
	ws = plus.webview.currentWebview();
	PullToRefresh(ws);
	var yonghu = plus.storage.getItem('user');
	var id = plus.storage.getItem('id');
	plus.nativeUI.showWaiting();
	//$("#url").val( apiRoot+"?m=Home&c=Index&a=share&code=YB"+id);
	// 资金明细
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Member&a=tuijian",  
		data : {
			id : id
		},
		dataType : 'json',
		success : function(data){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(data)+'000000000');
			$("#zje").html("¥:"+data.zje);
			$("#one_num").html(data.one_num);
			$("#two_num").html(data.two_num);
			$("#three_num").html(data.three_num);
			$(".money").html(data.money);
			$("#url").val( apiRoot+"?m=Home&c=Index&a=share&code=YB"+id);
		},
		error : function(e){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(e)+'000000000000');
		}
		
	});
	
},false);

function getQueryString(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg); 
  if (r != null) return unescape(r[2]); return null; 
} 