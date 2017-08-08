var ws;
document.addEventListener('plusready',function(){
	var html = '';
	ws = plus.webview.currentWebview();
	var id = plus.storage.getItem('id');
	//  获取绑定的淘宝账号
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Photo&a=sel_bangdingtb",
		data : { 
			id : id
		},
		dataType : 'json',
		success : function(data){
			console.log(JSON.stringify(data));  
			if(data.length > 0){
				$.each(data, function(index,value){
	                console.log(data);
	                html+='<ul class="mui-table-view"><li class="mui-table-view-cell"><span>'+value.taobao_zhangh+'</span>';
	                 if(value.zhanghao_shenhe == 1){
	                    html+='<span class="mui-pull-right">审核通过</span>';
	                  }else if(value.zhanghao_shenhe == 2){
	                    html+='<span class="mui-pull-right">审核未通过</span>';
	                  }else if(value.zhanghao_shenhe == 0){
	                    html+='<span class="mui-pull-right">审核中</span>';
	                  }html+='</li></ul>';
	             });
				$('#bangdetaob').html(html);
			}else{
				$('#bangdetaob').html('<center>您还未绑定淘宝账号</center>');
			}
		}
	});
	
	
},false);