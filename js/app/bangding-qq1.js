var ws;
document.addEventListener('plusready',function(){
	var html = '';
	ws = plus.webview.currentWebview();
	var id = plus.storage.getItem('id');
	//  获取绑定的QQ号
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Member&a=sel_bangdingqq",
		data : { 
			id : id
		},
		dataType : 'json',
		success : function(data){
			console.log(JSON.stringify(data));  
			if(data.length > 0){
				$.each(data, function(index,value){
					html += '<ul class="mui-table-view">' +
								'<li class="mui-table-view-cell">'+
									value.qqhao +
								'</li>'+
							'</ul> ';
				})
				$('#bangdeqq').html(html);
			}else{
				$('#bangdeqq').html('<center>您还未绑定QQ号码</center>');
			}
		},
		error : function(e){
			console.log(JSON.stringify(e));
		}
	});
	
	
},false);