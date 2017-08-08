document.addEventListener('plusready',function(){
	var userid = plus.storage.getItem('id');
	var yonghu = plus.storage.getItem('user');
	//////////////////////////////////////////////////////
                    ////////////////////////////////////
	                
    
    
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Payfor&a=bohui_sel",
		data:{
			yonghu : yonghu,
			userid :userid
		},
		success:function(data){
			if(data==3){
				console.log('审核不通过'+data);
			}else if(data==2){
				console.log('审核通过'+data);
			}else{
				console.log('没有');
			}
		},
		error: function(e){  
			
		}
	});
	
	/////////////////////////////////////
	
	$.ajax({
		type:"get",
		url: apiRoot + "?m=Home&c=Payfor&a=sel_back",
		data:{
			yonghu : yonghu,
			userid :userid
		},
//						dataType:'json',
		success:function(data){
			if(data==34){
				console.log('返回浏览的');
			}else if(data==123){
				console.log('没有浏览的');
			}
		},
		error:function(e){
			
		}
	});
	
	$.ajax({
		type:"get",
		url: apiRoot + "?m=Home&c=Payfor&a=zhi_back",
		data:{
			yonghu : yonghu,
			userid :userid
		},
//						dataType:'json',
		success:function(data){
			if(data==34){
				console.log('返回直通车的');
			}else if(data==123){
				console.log('没有直通车的');
			}
		},
		error:function(e){
			
		}
	});
	
	$.ajax({
		type:"get",
		url: apiRoot + "?m=Home&c=Payfor&a=tao_back",
		data:{
			yonghu : yonghu,
			userid :userid
		},
//						dataType:'json',
		success:function(data){
			if(data==34){
				console.log('返回淘口令的');
			}else if(data==123){
				console.log('没有淘口令的');
			}
		},
		error:function(e){
			
		}
	});
	
	$.ajax({
		type:"get",
		url: apiRoot + "?m=Home&c=Payfor&a=good_back",
		data:{ 
			yonghu : yonghu,
			userid :userid
		},
//						dataType:'json',
		success:function(data){
			if(data==34){
				console.log('返回聚划算的');
			}else if(data==123){
				console.log('没有聚划算的');  
			}
		},
		error:function(e){
			
		}
	});
    //////////////////////////////////////////////////////
	
	
},false);