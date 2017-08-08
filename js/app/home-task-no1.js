var ws;
document.addEventListener('plusready',function(){
	var html='';
	PullToRefresh(ws);
	var userid = plus.storage.getItem('id');
	ws=plus.webview.currentWebview();
	
	plus.nativeUI.showWaiting('任务获取中...');
	//  获取未完成任务列表
    $.ajax({
    	type:"get",
    	url : apiRoot + "?m=Home&c=Release&a=weiwancheng",  
    	data : {
    		userid : userid,
    		renwuzhuangtai : 3 
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
								            '<p>任务ID：<span>'+v.renwu_id+'</span> <button data-fenlei="'+v.renwufenlei+'" data-renwu_id="'+v.renwu_id+'" data-wang="'+v.wangwanghao+'" type="button" class="mui-btn ly">驳回理由</button></p> '  +
							                '<p class="mui-ellipsis a">任务要求：<span class="renwu_yaoqiu">'+yaoqiu+'</span></p>' +
							                '<p>佣金： <span style="color: #FF5252;">¥</span><span style="color: #FF5252;">'+v.gongji+'</span>'+
							                '<button type="button" data-fenlei="'+v.renwufenlei+'" data-renwu_id="'+v.renwu_id+'" data-wang="'+v.wangwanghao+'" class="mui-btn guanshen" style="margin-top: -20px;">'+v.guanfang_sh+'</button></p>' +
							            '</div>' +
							        '</a>' +
							   ' </li>' +
							'</ul>';
        			
        		});
        		$('#weiwanliebiao').append(html);  
        	}
        	
        	// 点击查看驳回理由 
        	$('.ly').on('tap',function(){       		
        		var _this = $(this);
        		var fenlei = $(this).attr('data-fenlei');
        		var renwu_id = $(this).attr('data-renwu_id');
        		var tao_hao = $(this).attr('data-wang');
        		
        		plus.webview.create('no-reason.html','no-reason.html',{},{renwu_id:renwu_id,tao_hao:tao_hao}).show('slide-in-right');        		      		
        	})
        	
        	// 提交官方审核
        	$('.guanshen').on('tap',function(){       		
        		var _this = $(this);
        		var fenlei = $(this).attr('data-fenlei');
        		var renwu_id = $(this).attr('data-renwu_id');
        		var tao_hao = $(this).attr('data-wang');
        		var kankan = $(this).html();
//      		console.log(kankan);return;
        		if(kankan=='已交审核'){
        			plus.nativeUI.toast('任务已提交官方审核！');return;
        		}
        		
        		plus.nativeUI.showWaiting();
        		$.ajax({
        			type:"get",
        			url : apiRoot + "?m=Home&c=Release&a=tijiaoguanshen",
        			data : {
        				fenlei : fenlei,
        				renwu_id : renwu_id,
        				tao_hao : tao_hao
        			},
        			dataType : 'json',
        			success : function(data){
        				plus.nativeUI.closeWaiting();
        				console.log(JSON.stringify(data));
        				if(data.tshi==1){
        					plus.nativeUI.toast('提交成功！');
        					ws.reload();
        				}else{
        					plus.nativeUI.toast('提交失败！');
        				}
        			},
        			error : function(e){
        				plus.nativeUI.closeWaiting();
        				console.log(JSON.stringify(e));
        				plus.nativeUI.toast('提交失败');
        			}
        			
        		});
        		
        	})
        	
	    },
	    error : function(e){
	    	plus.nativeUI.closeWaiting();
        	console.log(JSON.stringify(e));
	    }
        
    });
    
    
},false);