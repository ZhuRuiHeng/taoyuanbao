var ws;
var html = '';
document.addEventListener('plusready',function(){
	ws = plus.webview.currentWebview();
	PullToRefresh(ws);
	var yonghu = plus.storage.getItem('user');
	var aid  = getQueryString("aid");
	plus.nativeUI.showWaiting();
	// 资金明细
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Member&a=tixian_show",  
		data : {
			yonghu : yonghu,
			aid:aid
		},
		dataType : 'json',
		success : function(data){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(data));
			$("#tixianjinee").html("¥:"+data.tixianjine);
			$("#tixianjine").html(data.tixianjine);
			$("#isshow").html(data.isshow);
			$("#zhifubao").html(data.zhifubao);
			$("#shouxufei").html(data.shouxufei);
			$("#daozhang").html(data.daozhang);
			if(data.atime!=""){
				$("#atime .mid3").html(data.atime);
				$("#atime").addClass("finish");
			}
			if(data.btime!=""){
				$("#btime .mid3").html(data.btime);
				$("#btime").addClass("finish");
			}
			if(data.ctime!=""){
				$("#ctime .mid3").html(data.ctime);
				$("#ctime").addClass("finish");
			}
			if(data.dtime!=""){
				$("#dtime .mid3").html(data.dtime);
				$("#dtime").addClass("finish");
			}
		},
		error : function(e){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(e));
		}
		
	});
	
},false);
function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = window.location.search.substr(1).match(reg); 
if (r != null) return unescape(r[2]); return null; 
} 