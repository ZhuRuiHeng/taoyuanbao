var ws;
var html1 = '';
var html2 = '';
var html3 = '';
var html4 = '';
var html5 = '';
var html6 = '';
var userid = ''; 
var yonghu = '';

document.addEventListener('plusready',function(){
	
	//console.log("当前页面URL："+plus.webview.currentWebview().getURL());
	userid = plus.storage.getItem('id');
	yonghu = plus.storage.getItem('user');
	//用户提交绑定淘宝账号审核，审核通过弹窗，审核不通过弹窗
	
	$.ajax({
    	type:"get",
    	url : apiRoot + "?m=Home&c=Photo&a=sel_bangdingtb",
    	data : {
    		id : userid
    	},
    	dataType : 'json',
    	success : function(data){
    	
    		plus.nativeUI.closeWaiting();
    		console.log('账号弹窗：'+JSON.stringify(data));
    		if(data.length > 0){
    			$.each(data, function(index,value){
    				console.log(value.state);
    				
    				if(value.state==1){
    					alert('value.zhanghao_shenhe'+value.zhanghao_shenhe);
    					 if(value.zhanghao_shenhe == 1){
		                	mui.alert('审核通过', '淘宝账号：“'+value.taobao_zhangh+value.aid+'”的审核状态', function(aid) {
								 
							});
							
		                   }else if(value.zhanghao_shenhe == 2){
			                    mui.alert('审核不通过', '淘宝账号审核状态', function(aid) {
									alert(value.aid);
								});
		                  	};
	                  	//传给后台有没有弹窗
	                  	$.ajax({
						    	type:"get",
						    	url : apiRoot + "?m=Home&c=Photo&a=bd",  
						    	data : {
						    		aid : value.aid,
						    		renwuzhuangtai : 0
						    	}, 
						        dataType : 'json',
						        success : function(data){
						        	plus.nativeUI.closeWaiting();
						        	console.log(JSON.stringify(data));
						        	if(state == "1"){
						        		
						        	}
						        },
						        error : function(e){
							    	plus.nativeUI.closeWaiting();
						        	console.log(JSON.stringify(e));
							    }
						        
						    });

    				}else{
    					//不弹
    				}
    			})
    		}else{ 
    			plus.nativeUI.toast('error');
    		}
    	},
    	error : function(e){
    		console.log(JSON.stringify(e));
    	}
    });
	// 刷新
	PullToRefresh(ws);
	//  获取当天日期
	var myDate = new Date();
	var dangtian = myDate.toLocaleDateString();
//	    dangtian = Date.prototype.toString;
        dangtian = dangtian.replace('年','-');
        dangtian = dangtian.replace('月','-');
        dangtian = dangtian.replace('日','');
        // 获取当天日期 年-月-日 的时间戳
        dangtian = get_unix_time(dangtian);
	    console.log('今天：'+dangtian);
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Photo&a=lunbotu&weizhi=2",
		dataType : 'json',
		success : function(data){
			console.log(JSON.stringify(data));
			if(data.tshi==1){     
				$("#yongjin_zong_add").html("当前总佣金:"+data.yongjin_zong_add);
				$("#renshu_zong_add").html("在线人数:"+data.renshu_zong_add);
				$('.1').attr('src',webRoot+data.pic_one); 
				//$('.1').parent().attr('onclick',"openNewPage('"+encodeURI(data.url_one)+"')");
				$('.1').parent().attr('href',encodeURI(data.url_one));
				//console.log(data.url_one)
				$('.2').attr('src',webRoot+data.pic_two);
				//$('.2').parent().attr('onclick',"openNewPage('"+encodeURI(data.url_two)+"')");
				$('.2').parent().attr('href',encodeURI(data.url_two));
				//console.log(data.url_one)
				$('.3').attr('src',webRoot+data.pic_three);
				//$('.3').parent().attr('onclick',"openNewPage('"+encodeURI(data.url_three)+"')");
				$('.3').parent().attr('href',encodeURI(data.url_three));
				//console.log(data.url_one)
				$('.4').attr('src',webRoot+data.pic_four);
				//$('.4').parent().attr('onclick',"openNewPage('"+encodeURI(data.url_four)+"')");
				$('.4').parent().attr('href',encodeURI(data.url_four));
				//console.log(data.url_one)
				$('.5').attr('src',webRoot+data.pic_5);
				//$('.5').parent().attr('onclick',"openNewPage('"+encodeURI(data.url_5)+"')");
				$('.5').parent().attr('href',encodeURI(data.url_5));
				//console.log(data.url_one)
				$('.6').attr('src',webRoot+data.pic_6);
				//$('.6').parent().attr('onclick',"openNewPage('"+encodeURI(data.url_6)+"')");
				$('.6').parent().attr('href',encodeURI(data.url_6));
				//console.log(data.url_one)
				$('.7').attr('src',webRoot+data.pic_7);
				//$('.7').parent().attr('onclick',"openNewPage('"+encodeURI(data.url_7)+"')");
				$('.7').parent().attr('href',encodeURI(data.url_7));
				//console.log(data.url_one)
				
				////////////////////////////////////////////////////////////
				//初始化超链接轮播页面 
				//var Page = null;  
	            mui('.mui-slider-item').on('tap', '.mui-slider-item a', function(e) { 
	            	var href = this.getAttribute('href');
					// href= https://jq.qq.com/?_wv=1027&k=4A6Y6ui;
	            	console.log('当前轮播图片地址：'+href);
	            	
	                //打开跳转链接
	                mui.openWindow({ //目标页面  
	                	url:'lunbo.html',
	                    id: 'lunbo.html',
	                    extras:{
	                    	href:href
	                    }
	                });  
	            });
								
		 	}
		},
		error : function(e){
			console.log('error');
		}
		
	});
	///////////////////////////////////////
	
	        
	//  查询淘宝账号
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Release&a=add_taobao",
		data : {
			userid : userid,
			dangtian : dangtian
		}, 
		dataType : 'json',
		success : function(data){
			console.log(JSON.stringify(data)+'6666666666666666666666666666666');  
			if(data.length>0){
				$.each(data, function(index,value) {
					html1 += '<div class="mui-input-row mui-radio">' +
								'<label><span class="liulanrenwu">'+value.taobao_zhangh+'</span><span  data-shu="'+(30-value.yijiecishu)+'"  class="jd">今日可接'+(30-value.yijiecishu)+'单</span></label>' +
								'<input name="radio1" type="radio" value="'+value.taobao_zhangh+'" checked>' +
							'</div>';
					html2 += '<div class="mui-input-row mui-radio">' +
								'<label><span class="liulanrenwu">'+value.taobao_zhangh+'</span><span  data-shu="'+(30-value.yijiecishu)+'"  class="jd">今日可接'+(30-value.yijiecishu)+'单</span></label>' +
								'<input name="radio2" type="radio" value="'+value.taobao_zhangh+'" checked>' +
							'</div>';
							
					html3 += '<div class="mui-input-row mui-radio">' +
								'<label><span class="liulanrenwu">'+value.taobao_zhangh+'</span><span  data-shu="'+(30-value.yijiecishu)+'"  class="jd">今日可接'+(30-value.yijiecishu)+'单</span></label>' +
								'<input name="radio3" type="radio" value="'+value.taobao_zhangh+'" checked>' +
							'</div>';
					html4 += '<div class="mui-input-row mui-radio">' +
								'<label><span class="liulanrenwu">'+value.taobao_zhangh+'</span><span  data-shu="'+(30-value.yijiecishu)+'"  class="jd">今日可接'+(30-value.yijiecishu)+'单</span></label>' +
								'<input name="radio4" type="radio" value="'+value.taobao_zhangh+'" checked>' +
							'</div>';	
					html5 += '<div class="mui-input-row mui-radio">' +
						'<label><span class="liulanrenwu">'+value.taobao_zhangh+'</span><span  data-shu="'+(30-value.yijiecishu)+'"  class="jd">今日可接'+(30-value.yijiecishu)+'单</span></label>' +
						'<input name="radio5" type="radio" value="'+value.taobao_zhangh+'" checked>' +
					'</div>';
					html6 += '<div class="mui-input-row mui-radio">' +
						'<label><span class="liulanrenwu">'+value.taobao_zhangh+'</span><span  data-shu="'+(30-value.yijiecishu)+'"  class="jd">今日可接'+(30-value.yijiecishu)+'单</span></label>' +
						'<input name="radio6" type="radio" value="'+value.taobao_zhangh+'" checked>' +
					'</div>';
							
 				})
				$('.xuanze_tao1').prepend(html1);
				$('.xuanze_tao2').prepend(html2);
				$('.xuanze_tao3').prepend(html3);
				$('.xuanze_tao4').prepend(html4);
				$('.xuanze_tao5').prepend(html5);
				$('.xuanze_tao6').prepend(html6);
			}else{
				$('.xuanze_tao1').prepend('您还没有绑定淘宝账号');
				$('.xuanze_tao2').prepend('您还没有绑定淘宝账号');
				$('.xuanze_tao3').prepend('您还没有绑定淘宝账号');
				$('.xuanze_tao4').prepend('您还没有绑定淘宝账号');
				$('.xuanze_tao5').prepend('您还没有绑定淘宝账号');
				$('.xuanze_tao6').prepend('您还没有绑定淘宝账号');
			}
		}, 
		error : function(e){ 
			console.log(JSON.stringify(e));
		}
	});
	
//////////////////////////////////////////////////////////////////////////////////////////////////	
	// 去浏览任务界面前  获取选中的淘宝账号 
	$('#liulan_sure').on('tap',function(){
		var _this = $('input[type="radio"][name="radio1"]:checked').parent();
		var tao_hao = _this.find('span[class="liulanrenwu"]').html();
//      var tao_hao = $('input[type="radio"][name="radio1"]:checked').val();
		var haikejieshuliang = _this.find('span[class="jd"]').attr('data-shu');
//		console.log(haikejieshuliang);
        console.log('浏览任务淘宝号是：'+tao_hao);
        if(haikejieshuliang > 0){
          	plus.webview.create('home-liulan.html','home-liulan.html',{},{tao_hao:tao_hao}).show('slide-in-right'); 
        	
        }else if(haikejieshuliang == 0){
        	plus.nativeUI.toast('此账号日接单数已达上限');
        }else{
        	plus.nativeUI.toast('请先绑定淘宝账号');
        }
        
	})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 去直通车任务界面前  获取选中的淘宝账号 
	$('#zhitongche_sure').on('tap',function(){
		var _this = $('input[type="radio"][name="radio2"]:checked').parent();
		var tao_hao = $('input[type="radio"][name="radio2"]:checked').val();
		var haikejieshuliang = _this.find('span[class="jd"]').attr('data-shu');
//		console.log(haikejieshuliang);
        console.log('直通车任务淘宝号是：'+tao_hao);
        if(haikejieshuliang > 0){
        	plus.webview.create('home-car.html','home-car.html',{},{tao_hao:tao_hao}).show('slide-in-right'); 
        }else if(haikejieshuliang == 0){
        	plus.nativeUI.toast('此账号日接单数已达上限');
        }else{
        	plus.nativeUI.toast('请先绑定淘宝账号');
        }
        
	})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 去淘口令任务界面前  获取选中的淘宝账号 
	$('#taokouling_sure').on('tap',function(){
		var _this = $('input[type="radio"][name="radio3"]:checked').parent();
//		var tao_hao = _this.find('span[class="liulanrenwu"]').html();
		var tao_hao = $('input[type="radio"][name="radio3"]:checked').val();
		var haikejieshuliang = _this.find('span[class="jd"]').attr('data-shu');
		console.log('淘口令任务淘宝号是：'+tao_hao);
//		console.log(haikejieshuliang);
        if(haikejieshuliang > 0){
        	plus.webview.create('home-tao.html','home-tao.html',{},{tao_hao:tao_hao}).show('slide-in-right'); 
        }else if(haikejieshuliang == 0){
        	plus.nativeUI.toast('此账号日接单数已达上限');
        }else{
        	plus.nativeUI.toast('请先绑定淘宝账号');
        }
        
	})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 去聚划算任务界面前  获取选中的淘宝账号 
	$('#juhuasuan_sure').on('tap',function(){ 
		var _this = $('input[type="radio"][name="radio4"]:checked').parent();
	//	var tao_hao = _this.find('span[class="liulanrenwu"]').html();
		var tao_hao = $('input[type="radio"][name="radio4"]:checked').val();
		var haikejieshuliang = _this.find('span[class="jd"]').attr('data-shu');
		console.log(haikejieshuliang);
        console.log('聚划算回访淘宝号是：'+tao_hao);
        if(haikejieshuliang > 0){ 
        	plus.webview.create('home-good.html','home-good.html',{},{tao_hao:tao_hao}).show('slide-in-right'); 
        }else if(haikejieshuliang == 0){
        	plus.nativeUI.toast('此账号日接单数已达上限');
        }else{
        	plus.nativeUI.toast('请先绑定淘宝账号');
        }
        
	})
	
	// 去粉丝回访任务界面前  获取选中的淘宝账号 
	$('#fensi_sure').on('tap',function(){ 
		
		var _this = $('input[type="radio"][name="radio5"]:checked').parent();
		//var tao_hao = _this.find('span[class="liulanrenwu"]').html();
		var tao_hao = $('input[type="radio"][name="radio5"]:checked').val();
		var haikejieshuliang = _this.find('span[class="jd"]').attr('data-shu');
		console.log(haikejieshuliang);
        console.log('粉丝回访淘宝号是：'+tao_hao);
        if(haikejieshuliang > 0){ 
        	plus.webview.create('fensi-back.html','fensi-back.html',{},{tao_hao:tao_hao}).show('slide-in-right'); 
        }else if(haikejieshuliang == 0){
        	plus.nativeUI.toast('此账号日接单数已达上限');
        }else{
        	plus.nativeUI.toast('请先绑定淘宝账号');
        	//plus.webview.create('fensi-back.html','fensi-back.html',{},{tao_hao:tao_hao}).show('slide-in-right');
        }
        
	})
	/////////
	// 去免费试用任务界面前  获取选中的淘宝账号 
	$('#free_use').on('tap',function(){ 
			
		var _this = $('input[type="radio"][name="radio6"]:checked').parent();
		//var tao_hao = _this.find('span[class="liulanrenwu"]').html();
		var tao_hao = $('input[type="radio"][name="radio6"]:checked').val();
		var haikejieshuliang = _this.find('span[class="jd"]').attr('data-shu');
		console.log(haikejieshuliang);
        console.log('免费试用淘宝号是：'+tao_hao);
        if(haikejieshuliang > 0){ 
        	plus.webview.create('free-shiyong.html','free-shiyong.html',{},{tao_hao:tao_hao}).show('slide-in-right'); 
        }else if(haikejieshuliang == 0){
        	plus.nativeUI.toast('此账号日接单数已达上限');
        }else{
        	plus.nativeUI.toast('请先绑定淘宝账号');
        	//plus.webview.create('free-use.html','free-use.html',{},{tao_hao:tao_hao}).show('slide-in-right'); 
        }
        
	})
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    plus.nativeUI.showWaiting();
    console.log("gonghaoyonghu"+yonghu);
	// 获取公告内容
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Photo&a=gonggao",
		data : {
			dangtian : dangtian,
			yonghu : yonghu
		},
		dataType : 'json',
		success : function(data){
			plus.nativeUI.closeWaiting();
			console.log("gonghao"+JSON.stringify(data));
			if(data.tshi==1){     
				$('#tixian').html(data.money);
				$('#gonggao').html(data.gonggao);
				$('#liulan').html((data.liulande > 0) ? data.liulande : 0);
				$('#zhitongche').html((data.zhitongchede > 0) ? data.zhitongchede : 0);
				$('#taokouling').html((data.taokoulingde > 0) ? data.taokoulingde : 0);
				$('#juhuasuan').html((data.juhuasuande > 0) ? data.juhuasuande : 0);
				$('#jinri').html(data.jintian ? data.jintian : 0);
				$('#zuori').html(data.zuotian ? data.zuotian : 0);
				console.log('==='+yonghu);
				
			}
		},
		error : function(e){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(e));
		}
		
	});
	/////////////////////////////////////////////////////////////
	//  分享 
	
	$('.fenxiang').on('tap',function(){
		var zhi = $(this).attr('data-id');
		console.log(zhi); 
	})
	
	
	//////////////////////////////////////////////////////////////
	
	
	// 点击跳转到提现页面
	$('#cash').on('tap',function(){
		plus.webview.create('cash.html','cash.html').show('slide-in-right');
		
	})
//	console.log('aa'+$.myTime.UnixToDate('1478052000'));


	//  检查返还未接任务的金额
	//////////////////
	setTimeout("fanjin()",1000); 
	
	//  检查24小时未审核任务自动通过 用户检查
	setTimeout("shenhe()",1000);
	//  检查24小时未审核任务自动通过 商家检查
	setTimeout("shenhe_b()",1000);
	
	/////////////////////////////////////////////////////
	//  进入首页后检查半小时未完成任务 更该状态 用户检查
	if(userid){
		setTimeout("inspectTask()",1000);
	}	
	//  定时检查半小时未完成任务 更该状态  用户检查
	if(userid){
		setInterval("inspectTask()",180000);
	}
	
	//  进入首页后检查半小时未完成任务 更该状态  商家检查
	if(userid){
		setTimeout("inspectTask_b()",1000);
	}	
	//  定时检查半小时未完成任务 更该状态  商家检查
	if(userid){
		setInterval("inspectTask_b()",180000);
	}
	////////////////////////////////////////////////////
	
	//  检查商家驳回 用户不去官审的
	if(userid){
		setTimeout("bushenhe()",1000);
	}
	
	//  检查商家驳回任务不官方审核
	if(userid){
		setTimeout("bushenhede()",1000);
	}
	
	
},false);

	//   定时3分钟检查未完成的任务 用户检查
	function inspectTask(){
		return;
		$.ajax({
			type:"get",
			url : apiRoot + "?m=Home&c=Release&a=inspectTask",
			data:{
				yonghu : yonghu,
				userid :userid
			},
			dataType:'json',
			success:function(data){
				if(data.tshi==1){
					
				}else{
					
				}
			},
			error:function(e){
				
			}
			
		});
		
		
		//判断未完成
		$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Release&a=kan_renwu_geshu", 
		data : {
			userid : userid
		},
		dataType : 'json',
		success : function(data){
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(data));

			if(data.weiwan==0){
					//console.log('未完成任务已更改状态');
					$('.fudong').html('');
				}else{
					//console.log('没有未完成的任务');
					$(".fudong").html('Task');
				}
		},
		error : function(e){
			plus.nativeUI.closeWaiting();
			//console.log(JSON.stringify(e));
		}
		
	});
		
	}
	
	
	//   定时3分钟检查未完成的任务  商家检查
	function inspectTask_b(){
		$.ajax({
			type:"get",
			url : apiRoot + "?m=Home&c=Release&a=inspectTask_b",
			data:{
				yonghu : yonghu,
				userid :userid
			},
			dataType:'json',
			success:function(data){
				if(data.tshi==1){
					//console.log('未完成任务已更改状态');
				}else{
					//console.log('没有未完成的任务');
				}
			},
			error:function(e){
				
			}
			
		});
		
		
	}
    
    //  检查24小时为审核任务自动通过  用户检查
	function shenhe(){
		$.ajax({
			type:"get",
			url : apiRoot + "?m=Home&c=Release&a=shenhewei",
			data:{
				yonghu : yonghu,
				userid :userid
			},
			dataType:'json',
			success:function(data){
				if(data.tshi==1){
//					ws.reload();
					reloadWeb('cash-details.html');
					//console.log('超过24小时商家未审核的任务已更改状态');
				}else{
					//console.log('没有商家超过24小时未审核的任务');
				}
			},
			error:function(e){ 
				
			}
			
		});
		
		
	}
	
	//  检查24小时为审核任务自动通过  商家检查
	function shenhe_b(){
		$.ajax({
			type:"get",
			url : apiRoot + "?m=Home&c=Release&a=shenhewei_b",
			data:{
				yonghu : yonghu,
				userid :userid
			},
			dataType:'json',
			success:function(data){
				if(data.tshi==1){
//					ws.reload();
					reloadWeb('cash-details.html');
					//console.log('超过24小时商家未审核的任务已更改状态');
				}else{
					//console.log('没有商家超过24小时未审核的任务');
				}
			},
			error:function(e){ 
				
			}
			
		});
		
		
	}
	
	//  检查商家驳回 用户不去官审的  商家检查
	function bushenhe(){
		$.ajax({
			type:"get",
			url : apiRoot + "?m=Home&c=Release&a=bushenhe",
			data:{
				yonghu : yonghu,
				userid :userid
			},
			dataType:'json',
			success:function(data){
				if(data.tshi==1){
//					ws.reload();
					reloadWeb('cash-details.html');
					//console.log('商家驳回不官审状态更该');
				}else{
					//console.log('无商家驳回不官审');
				}
			},
			error:function(e){ 
				
			}
			
		});
		
		
	}
	
	//  检查商家驳回任务不官方审核  用户检查
	function bushenhede(){
		$.ajax({
			type:"get",
			url : apiRoot + "?m=Home&c=Release&a=bushenhede",
			data:{
				yonghu : yonghu,
				userid : userid
			},
			dataType:'json',
			success:function(data){
				if(data.tshi==1){
//					ws.reload();
					reloadWeb('cash-details.html');
					//console.log('商家驳回不官审状态更该');
				}else{
					//console.log('无商家驳回不官审');
				}
			},
			error:function(e){ 
				
			}
			
		});
		
		
	}

//  检查返还未接任务的金额
function fanjin(){
		
	
	    $.ajax({
			type:"get",
			url : apiRoot + "?m=Home&c=Payfor&a=bohui_sel",
			data:{
				yonghu : yonghu,
				userid :userid
			},
			success:function(data){
				if(data==3){
					//console.log('审核不通过'+data);
				}else if(data==2){
//					ws.reload();
					reloadWeb('cash-details.html');
					//console.log('审核通过'+data);
				}else{
					//console.log('没有');
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
					//console.log('返回浏览的');
				}else if(data==123){
					//console.log('没有浏览的');
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
					//console.log('返回直通车的');
				}else if(data==123){
					//console.log('没有直通车的');
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
					//console.log('返回淘口令的');
				}else if(data==123){
					//console.log('没有淘口令的');
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
					//console.log('返回聚划算的');
				}else if(data==123){
					//console.log('没有聚划算的');  
				}
			},
			error:function(e){
				
			}
		});
	    //////////////////////////////////////////////////////
	}

/////////////////////  日期与时间戳转换    ////////////////////////////////////////////////////////////////////////////////////////
    //  日期转换为时间戳
    function get_unix_time(dateStr){
	    var newstr = dateStr.replace(/-/g,'/'); 
	    var date =  new Date(newstr); 
	    var time_str = date.getTime().toString();
	    return time_str.substr(0,10);
    }
    
//  时间戳转换为日期     调用      
//      var end_time = $.myTime.UnixToDate('1325349900');
//          alert(end_time);
               

(function($) {
    $.extend({
        myTime: {
            /**
             * 当前时间戳
             * @return <int>        unix时间戳(秒)  
             */
            CurTime: function(){
                return Date.parse(new Date())/1000;
            },
            /**              
             * 日期 转换为 Unix时间戳
             * @param <string> 2014-01-01 20:20:20  日期格式              
             * @return <int>        unix时间戳(秒)              
             */
            DateToUnix: function(string) {
                var f = string.split(' ', 2);
                var d = (f[0] ? f[0] : '').split('-', 3);
                var t = (f[1] ? f[1] : '').split(':', 3);
                return (new Date(
                        parseInt(d[0], 10) || null,
                        (parseInt(d[1], 10) || 1) - 1,
                        parseInt(d[2], 10) || null,
                        parseInt(t[0], 10) || null,
                        parseInt(t[1], 10) || null,
                        parseInt(t[2], 10) || null
                        )).getTime() / 1000;
            },
            /**              
             * 时间戳转换日期              
             * @param <int> unixTime    待时间戳(秒)              
             * @param <bool> isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)              
             * @param <int>  timeZone   时区              
             */
            UnixToDate: function(unixTime, isFull, timeZone) {
                if (typeof (timeZone) == 'number')
                {
                    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
                }
                var time = new Date(unixTime * 1000);
                var ymdhis = "";
                ymdhis += time.getUTCFullYear() + "-";
                ymdhis += (time.getUTCMonth()+1) + "-";
                ymdhis += time.getUTCDate();
                if (isFull === true)
                {
                    ymdhis += " " + time.getUTCHours() + ":";
                    ymdhis += time.getUTCMinutes() + ":";
                    ymdhis += time.getUTCSeconds();
                }
                return ymdhis;
            }
        }
    });
})(jQuery);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
