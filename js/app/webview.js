var ws;
var html = '';
document.addEventListener('plusready',function(){
	var url  = getQueryString("url");
	plus.nativeUI.showWaiting();
	$(".webview").load(url,null,plus.nativeUI.closeWaiting());
},false);
function getQueryString(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg); 
  if (r != null) return unescape(r[2]); return null; 
} 