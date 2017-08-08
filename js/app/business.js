var ws;
document.addEventListener('plusready',function(){
	ws=plus.webview.currentWebview(); 
	PullToRefresh(ws);
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Photo&a=lunbotu&weizhi=1",
		dataType : 'json',
		success : function(data){
			console.log("shangjia"+JSON.stringify(data));
			if(data.tshi==1){     
				$('.1').attr('src',webRoot+data.pic_one); 
				$('.1').parent().attr('onclick',"openNewPage('"+encodeURI(data.url_one)+"')");
				$('.2').attr('src',webRoot+data.pic_two);
				$('.2').parent().attr('onclick',"openNewPage('"+encodeURI(data.url_two)+"')");
				$('.3').attr('src',webRoot+data.pic_three);
				$('.3').parent().attr('onclick',"openNewPage('"+encodeURI(data.url_three)+"')");
				$('.4').attr('src',webRoot+data.pic_four);
				$('.4').parent().attr('onclick',"openNewPage('"+encodeURI(data.url_four)+"')");
			}
		},
		error : function(e){
			console.log(JSON.stringify(e));
		}
		
	});
	
	
},false);