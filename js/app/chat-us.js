document.addEventListener('plusready',function(){
	
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Member&a=chatus&id=", 
		dataType : 'json',
		success : function(data){
			console.log(JSON.stringify(data));
			console.log(2)
			if(data){
				$('#diyiduan').html(data.diyiduan);
				$('#dierduan').html(data.dierduan);
				$('#tupian').attr('src',imgUrl(data.tupian));
			}
		},
		error : function(e){
			console.log(JSON.stringify(e));
		}
	});
	
	
},false);

// 后台添加的图片请使用该方法
	function imgUrl(lujing) { 
		if(lujing != null){ 
			return webRoot+lujing;
		}else{
			return '../img/login-1.png';   
		}
	}