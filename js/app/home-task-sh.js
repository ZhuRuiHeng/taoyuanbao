document.addEventListener('plusready',function(){
	var html='';
	var userid = plus.storage.getItem('id');
	
	//  获取未完成任务列表
    $.ajax({
    	type:"get",
    	url : apiRoot + "?m=Home&c=Release&a=weiwancheng",  
    	data : {
    		userid : userid,
    		renwuzhuangtai : 1
    	},
        dataType : 'json',
        success : function(data){
        	plus.nativeUI.closeWaiting();
        	console.log(JSON.stringify(data));
        	if(data.length>0){
        		$.each(data, function(index,v) {
        			var yaoqiu = v.gouwuche1+' '+v.shouc_baob1+' '+v.shouc_dianp1+' '+v.guanz_dianp1+' '+v.jinru_pingj1+' '+v.huobi_sanj1+' '+v.lingqu_youhq1+' '+v.suiji_liul1+' '+v.zhubaob_liul1;  
					console.log(yaoqiu); 
        			html += '<ul class="mui-table-view">' +
							    '<li class="mui-table-view-cell mui-media">' +
							        '<a href="javascript:;">' +
							            '<img class="mui-media-object mui-pull-left" src="'+webRoot+v.shangpingtupian+'">' +
							            '<div class="mui-media-body">' +
								            '<p><span>'+v.shangp_minc+'</span> <span class="aa">待审核</span></p> '  +
							                '<p class="mui-ellipsis a">任务要求：<span class="renwu_yaoqiu">'+yaoqiu+'</span></p>' +
							                '<p>佣金： <span style="color: #FF5252;">¥</span><span style="color: #FF5252;">'+v.gongji+'</span></p>' +
							            '</div>' +
							        '</a>' +
							   ' </li>' +
							'</ul>';
        			
        		});
        		$('#weiwanliebiao').append(html);  
        	}
        	
        	
        	
	    },
	    error : function(e){
	    	plus.nativeUI.closeWaiting();
        	console.log(JSON.stringify(e));
	    }
        
    });
    
    
},false);