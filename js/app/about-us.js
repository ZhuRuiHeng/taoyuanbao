document.addEventListener('plusready',function(){
	
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Member&a=aboutus", 
		dataType : 'json',
		success : function(data){
			console.log(JSON.stringify(data));
			if(data){
				$('#diyiduan').html(data.diyiduan);
				$('#dierduan').html(data.dierduan);
				
			}
		},
		error : function(e){
			console.log(JSON.stringify(e));
		}
	});
	
	
},false);