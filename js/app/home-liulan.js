var ws;
var html = '';
document.addEventListener('plusready',function(){
	PullToRefresh(ws);
	ws=plus.webview.currentWebview();
	var userid = plus.storage.getItem('id');
	//  选中的淘宝账号
	var tao_hao = ws.tao_hao;
	// 当前时间戳
	var timestamp = Date.parse(new Date())/1000;
//	console.log(timestamp); 
    plus.nativeUI.showWaiting('任务获取中...');
  //  获取浏览任务列表
    $.ajax({
    	type:"get",
    	url : apiRoot + "?m=Home&c=Release&a=sel_liulan", 
    	data : {
    		tao_hao : tao_hao,
    		renwuzhonglei : 1
    	},
        dataType : 'json',
        success : function(data){
        	
        	plus.nativeUI.closeWaiting();
        	console.log(JSON.stringify(data)+'\\\\\\\\\\\\');
        	if(data.length>0){
        		console.log('+11111+'+data[0].renwu_id)
				$.each(data, function(index,v) {
				//if(renwu_id!==""){
						
					var renwu_id=v.renwu_id;
					var yaoqiu = v.gouwuche1+' '+v.shouc_baob1+' '+v.shouc_dianp1+' '+v.guanz_dianp1+' '+v.jinru_pingj1+' '+v.huobi_sanj1+' '+v.lingqu_youhq1+' '+v.suiji_liul1+' '+v.zhubaob_liul1;  
					console.log(yaoqiu); 
					
					var shuliang = (v.gouwuche > 0 ? 1 : 0)+(v.shouc_baob > 0 ? 1 : 0)+(v.shouc_dianp > 0 ? 1 : 0)+(v.guanz_dianp > 0 ? 1 : 0)+(v.jinru_pingj > 0 ? 1 : 0)+(v.huobi_sanj > 0 ? 1 : 0)+(v.lingqu_youhq > 0 ? 1 : 0)+(v.suiji_liul > 0 ? 1 : 0)+(v.zhubaob_liul > 0 ? 1 : 0);   
					console.log('+000000+'+renwu_id);
					console.log('任务状态：'+v.taskState); 
					
					
					if(v.taskState==null){
						if(v.begin_time<timestamp){
							console.log('+333333+'+v.renwu_id)
							html +=  '<ul class="mui-table-view">'  +
									    '<li class="mui-table-view-cell mui-media">'  +
									       ' <a href="javascript:;">'  +
									            '<img class="mui-media-object mui-pull-left" src="'+webRoot+v.shangp_pic+'">'  +
									            '<div class="mui-media-body">'  +
										            '<p><span>'+v.shangp_minc+renwu_id+'</span> <button type="button" class="mui-btn" data-renwu_id="'+v.renwu_id+'" data-time="'+v.begin_time+'" >'+v.xianshi+'</button></p>'   +     
									                '<p class="mui-ellipsis a">任务要求：<span class="renwu_yaoqiu">'+yaoqiu+'</span></p>'  +
//									                '<p>佣金： <span style="color: #FF5252;">¥</span><span style="color: #FF5252;">'+((shuliang+1)*v.meirenjiage).toFixed(2)+'</span></p>'  +
									                '<p>佣金： <span style="color: #FF5252;">¥</span><span style="color: #FF5252;">'+v.yongjin+'</span><span style="text-align: right;float:right;color: #FF5252;">可领取单数 '+v.xuyao_ren+'</span></p>'  +
									            '</div>'  +
									        '</a>'  +
									    '</li>'  +
									'</ul>';
											
							
						}else if(v.begin_time>timestamp){
							
							html += '<ul class="mui-table-view">'  +
									    '<li class="mui-table-view-cell mui-media">'  +
									       ' <a href="javascript:;">'  +
									            '<img class="mui-media-object mui-pull-left" src="'+webRoot+v.shangp_pic+'">'  +
									            '<div class="mui-media-body">'  +
										            '<p>任务ID：<span>'+v.renwu_id+'</span> <button type="button" class="mui-btn" data-renwu_id="'+v.renwu_id+'" data-time="'+v.begin_time+'" >'+v.xianshi+'</button></p>'   +   
									                '<p class="a mui-ellipsis ">任务要求：<span class="renwu_yaoqiu">'+yaoqiu+'</span></p>'  +
//									                '<p>佣金： <span style="color: #FF5252;">¥</span><span style="color: #FF5252;">'+((shuliang+1)*v.meirenjiage).toFixed(2)+'</span></p>'  +
									                '<p>佣金： <span style="color: #FF5252;">¥</span><span style="color: #FF5252;">'+v.yongjin+'</span></p>'  +
									            '</div>'  +
									        '</a>'  +
									    '</li>'  +
									    '<div class="bg">'+
									    	'<span>'+v.begin_riqi+'</span>'  +
									    '</div>'+
									'</ul>';
						} 
					}
				})
				$('#liulanliebiao').append(html);
			}	
//		}else if{
//			return;
//		}
			//  判断任务开始时间   添加接受任务  
			$('.mui-btn').on('tap',function(){
				//alert(2)
				var xianshi = $(this).html();
				console.log('任务状态'+xianshi);
				if(xianshi=='已取消'){
					plus.nativeUI.toast('已取消任务不可再领取');
					$(this).parents(".mui-table-view");
					ws.close();
					return;
				}
				//加急任务
				else if(xianshi=='加急任务'){
					$('.jiaji-box,.mui-popup-backdrop').show();
					$('body').css('overflow','hidden');
					//mui(".mui-popup-buttons").on('tap','span',function(e){
						var id = mui(".mui-popup-buttons");
						var liS = mui(".mui-popup-buttons span");
						for(var j = 0 ; j < liS.length ; j++){
							liS[j].index = j;
						}
						mui('.mui-popup-buttons').on('tap','span',function(){
							var k = this.index;
							console.log(k);
							if(k == 0){
								mui.toast('领取任务成功');
								$('.jiaji-box,.mui-popup-backdrop').hide();
							}else{
								mui.toast('您取消了领取任务');
								$('.jiaji-box,.mui-popup-backdrop').hide();
							}
						});
							
					}
				//}
				var begin_time = $(this).attr('data-time');
				var renwu_id = $(this).attr('data-renwu_id');
				
				console.log(begin_time+' --- '+renwu_id); 
				if(begin_time>timestamp){
					plus.nativeUI.toast('此任务还没到可接受时间！');
					return;
				}
//				return;
				plus.nativeUI.showWaiting('信息获取中...');
				$.ajax({
					type:"get",
					url : apiRoot + "?m=Home&c=Release&a=jieshourenwu",  
					data : {
						userid : userid,
						renwu_id : renwu_id,
						tao_hao : tao_hao,
						renwuzhonglei : 1
					},
					dataType : 'json',
					success : function(data){
						
						plus.nativeUI.closeWaiting();
						console.log(JSON.stringify(data));
						console.log(JSON.stringify(data.rt+'ppppppppppppppppp'))
						if(data.rt==1){
							tishilinqu_img("liulan",data,renwu_id,tao_hao);
						}else if(data.rt==0){
							plus.nativeUI.toast(data.tshi);
						}else if(data.rt==2){     
							plus.nativeUI.toast(data.tshi);
							ws.reload();
						}else if(data.rt==3){
							console.log('----'+data.rt);      
							plus.nativeUI.toast(data.tshi);
							ws.reload();
						}else if(data.rt==4){							    
//							plus.webview.create('home-liulan-ing.html','home-liulan-ing.html',{},{renwu_id:renwu_id,tao_hao:tao_hao}).show('slide-in-right');							
						    plus.nativeUI.toast(data.tshi);
						}
//						plus.webview.create('home-liulan-ing.html','home-liulan-ing.html',{},{renwu_id:renwu_id,tao_hao:tao_hao}).show('slide-in-right');
					},
					error : function(e){
						plus.nativeUI.closeWaiting();
						console.log('111==='+JSON.stringify(e));  
					}  
				});
				
				

			})
			
        },
        error : function(e){
        	plus.nativeUI.closeWaiting();
        	console.log(JSON.stringify(e));
        	plus.nativeUI.toast('获取失败'); 
        }
    });



	
},false);

//function panduan(zhi,neirong){
//	shuliang = zhi > 0 ? 1 : 0;
//	
//}

