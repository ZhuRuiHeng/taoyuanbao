document.addEventListener('plusready',function(){
	var html='';
	var userid = plus.storage.getItem('id');
	
	plus.nativeUI.showWaiting('任务获取中...');
	//  获取未完成任务列表
    $.ajax({
    	type:"get",
    	url : apiRoot + "?m=Home&c=Release&a=weiwancheng",  
    	data : {
    		userid : userid,
    		renwuzhuangtai : 4 
    	},
        dataType : 'json',
        success : function(data){
        	
        	plus.nativeUI.closeWaiting();
        	console.log(JSON.stringify(data));
        	if(data.length>0){
        		$.each(data, function(index,v) {
        			var yaoqiu = v.gouwuche1+' '+v.shouc_baob1+' '+v.shouc_dianp1+' '+v.guanz_dianp1+' '+v.jinru_pingj1+' '+v.huobi_sanj1+' '+v.lingqu_youhq1+' '+v.suiji_liul1+' '+v.zhubaob_liul1;  
					console.log(yaoqiu); 
					var zhuangtai='';
					if(v.jieguo==0){
						zhuangtai = '官方审核中';
					}else if(v.jieguo==1){
						zhuangtai = '佣金已发放';
					}else if(v.jieguo==2){ 
						zhuangtai = '结束任务';
					} 
					console.log(v.jieguo);   
//					if(v.jieguo==1 || v.jieguo==2){											
	        			html += '<ul class="mui-table-view">' +
								    '<li class="mui-table-view-cell mui-media">' +
								        '<a href="javascript:;">' +
								            '<img class="mui-media-object mui-pull-left" src="'+webRoot+v.shangpingtupian+'">' +
								            '<div class="mui-media-body">' +
									            '<p>任务ID：<span>'+v.renwu_id+'</span> <span class="aa">'+zhuangtai+'</span></p> '  +
								                '<p class="mui-ellipsis a">任务要求：<span class="renwu_yaoqiu">'+yaoqiu+'</span></p>' +
								                '<p>佣金： <span style="color: #FF5252;">¥</span><span style="color: #FF5252;">'+v.gongji+'</span></p>' +
								            '</div>' +
								        '</a>' +
								   ' </li>' +
								'</ul>'; 
//      		    }
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