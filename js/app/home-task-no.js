document.addEventListener('plusready',function(){
	var html='';
	var userid = plus.storage.getItem('id');
	
	//  获取未完成任务列表
    $.ajax({
    	type:"get",
    	url : apiRoot + "?m=Home&c=Release&a=weiwancheng",  
    	data : {
    		userid : userid,
    		renwuzhuangtai : 0
    	}, 
        dataType : 'json',
        success : function(data){
        	plus.nativeUI.closeWaiting();
        	console.log(JSON.stringify(data));
        	if(data.length>0){
        		$.each(data, function(index,v) {
        			var yaoqiu = v.gouwuche1+' '+v.shouc_baob1+' '+v.shouc_dianp1+' '+v.guanz_dianp1+' '+v.jinru_pingj1+' '+v.huobi_sanj1+' '+v.lingqu_youhq1+' '+v.suiji_liul1+' '+v.zhubaob_liul1;  
					console.log(yaoqiu); 
//					if(v.renwuzhuangtai==5){
//						html += '<ul class="mui-table-view">' +
//							    '<li class="mui-table-view-cell mui-media">' +
//							        '<a href="javascript:;">' +
//							            '<img class="mui-media-object mui-pull-left" src="'+webRoot+v.shangpingtupian+'">' +
//							            '<div class="mui-media-body">' + 
//								            '<p>任务ID：<span>'+v.renwu_id+'</span> <button type="button" data-fenlei="'+v.renwufenlei+'" data-renwu_id="'+v.renwu_id+'" data-wang="'+v.wangwanghao+'" class="mui-btn" >已取消</button></p> '  +
//							                '<p class="mui-ellipsis a">任务要求：<span class="renwu_yaoqiu">'+yaoqiu+'</span></p>' +
//							                '<p>佣金： <span style="color: #FF5252;">¥</span><span style="color: #FF5252;">'+v.gongji+'</span></p>' +
//							            '</div>' +
//							        '</a>' +
//							   ' </li>' +
//							'</ul>';
//					}else{
						html += '<ul class="mui-table-view">' +
							    '<li class="mui-table-view-cell mui-media">' +
							        '<a href="javascript:;">' +
							            '<img class="mui-media-object mui-pull-left" src="'+webRoot+v.shangpingtupian+'">' +
							            '<div class="mui-media-body">' +
								            '<p><span>'+v.shangp_minc+'</span> <button type="button" data-fenlei="'+v.renwufenlei+'" data-newadd="'+v.newadd+'" data-renwu_id="'+v.renwu_id+'" data-wang="'+v.wangwanghao+'" class="mui-btn" >继续任务</button></p> '  +
							                '<p class="mui-ellipsis a">任务要求：<span class="renwu_yaoqiu">'+yaoqiu+'</span></p>' +
							                '<p>佣金： <span style="color: #FF5252;">¥</span><span style="color: #FF5252;">'+v.gongji+'</span></p>' +
							            '</div>' +
							        '</a>' +
							   ' </li>' +
							'</ul>';
//					}
        			
        			
        		});
        		$('#weiwanliebiao').append(html);  
        	}
        	
        	// 点击继续任务
        	$('.mui-btn').on('tap',function(){
        		var _this = $(this);
        		var zhi = _this.html();
        		if(zhi=='已取消'){
        			plus.nativeUI.toast('任务已取消');return;
        		}
        		var fenlei = $(this).attr('data-fenlei');
        		var renwu_id = $(this).attr('data-renwu_id');
        		var tao_hao = $(this).attr('data-wang');
        		var newadd=$(this).attr('data-newadd');
        		if(fenlei==1){
        			if(newadd==2){
        				plus.webview.create('freeuser-inform.html','freeuser-inform.html',{},{renwu_id:renwu_id,tao_hao:tao_hao}).show('slide-in-right');
        			}else{
        				plus.webview.create('home-liulan-ing.html','home-liulan-ing.html',{},{renwu_id:renwu_id,tao_hao:tao_hao}).show('slide-in-right');
        			}
        			
        		}else if(fenlei==2){
        			plus.webview.create('home-car-ing.html','home-car-ing.html',{},{renwu_id:renwu_id,tao_hao:tao_hao}).show('slide-in-right');
        		}else if(fenlei==3){
        			plus.webview.create('home-tao-ing.html','home-tao-ing.html',{},{renwu_id:renwu_id,tao_hao:tao_hao}).show('slide-in-right');
        		}else if(fenlei==4){
        			plus.webview.create('home-good-ing.html','home-good-ing.html',{},{renwu_id:renwu_id,tao_hao:tao_hao}).show('slide-in-right');
        		}
        		
        	})
        	
	    },
	    error : function(e){
	    	plus.nativeUI.closeWaiting();
        	console.log(JSON.stringify(e));
	    }
        
    });
    
    
},false);