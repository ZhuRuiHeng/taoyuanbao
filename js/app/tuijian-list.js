var ws;

document.addEventListener('plusready',function(){
	ws = plus.webview.currentWebview();
	PullToRefresh(ws);
	
	var yonghu = plus.storage.getItem('user');
	var id = plus.storage.getItem('id');
	//var uid = getQueryString("uid");
	var uid = plus.storage.getItem('id');
	
	plus.nativeUI.showWaiting();
	//接收参数
	var self = plus.webview.currentWebview();
    var type = self.name;
    
    
    //关闭等待框
    plus.nativeUI.closeWaiting();
    //显示当前页面
    mui.currentWebview.show();
	
	// 资金明细
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Member&a=tuijian_list",  
		data : {
			uid : uid,
			type:type
		},
		dataType : 'json',
		success : function(data){
			console.log('000'+uid)
			console.log('111'+JSON.stringify(data)+'+++++++')
			plus.nativeUI.closeWaiting();
			if(data.length>0){
				$.each(data, function(index,v) {
					var nicheng = '';
					if(v.two_num==null){v.two_num='0';}
					if(v.nicheng!=null && v.nicheng!=''){nicheng='('+v.nicheng+')';}
					var html = '<ul class="mui-table-view"> '+
					'<li class="mui-table-view-cell" >'+
						'<a id="xiugai_pay" class="" href="#" onclick="xiaji('+v.aid+');">'+	
							v.yonghu+nicheng+'<span id="one_num" style="font-size:9pt;float:right;padding-right: 20px;">'+v.two_num+'人 (¥'+v.zong_yj+')</span>'+
						'</a>'+
					'</li></ul>';
					$("#tuijian_list").append(html);
				});
			}
		},
		error : function(e){
			plus.nativeUI.closeWaiting();
		}
		
	});
	
},false);
//function xiaji(aid){
//	openNewPage("tuijian-list.html?uid="+aid);
//}
function getQueryString(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg); 
  if (r != null) return unescape(r[2]); return null; 
} 