var xuqiu_jiage;
var pingtai_bilv;
var ws;
//  2016-11-28  添加  ///////////
var gwc_jia;
var scbb_jia;
var scdp_jia;
var gzdp_jia;
var jrpj_jia;
var bsj_jia;
var yhq_jia;
var fbb_jia;
var zbb_jia;
////////////////////

document.addEventListener('plusready',function(){
	var userid = plus.storage.getItem('id');
	var user_phone = plus.storage.getItem('user');
	ws = plus.webview.currentWebview();
	console.log(userid+' '+user_phone); 
	///  取出 任务每人价格 + 平台服务费率
	$.ajax({
		type:"get",
		url : apiRoot + "?m=Home&c=Release&a=jiage_feilv",
		data:{
			lei : 'good'
		},
		dataType : 'json',
		success : function(data){
//			console.log(111);
			console.log(JSON.stringify(data));
			if(data){
				xuqiu_jiage = Number(data.xuqiu_jiage);
				pingtai_bilv = Number(data.pingtai_bilv);
//				$('.xiaoijiage').html(data.xuqiu_jiage);
                //  2016-11-28 修改 ///////////////////////////////
				gwc_jia = Number(data.gwc_jia);
				scbb_jia = Number(data.scbb_jia);
				scdp_jia = Number(data.scdp_jia);
				gzdp_jia = Number(data.gzdp_jia);
				jrpj_jia = Number(data.jrpj_jia);
				bsj_jia = Number(data.bsj_jia);
				yhq_jia = Number(data.yhq_jia);
				fbb_jia = Number(data.fbb_jia);
				zbb_jia = Number(data.zbb_jia);
				$('.rwxq_jia').html(data.xuqiu_jiage);
				$('.gwc_jia').html(data.gwc_jia);
				$('.scbb_jia').html(data.scbb_jia);
				$('.scdp_jia').html(data.scdp_jia);
				$('.gzdp_jia').html(data.gzdp_jia);
				$('.jrpj_jia').html(data.jrpj_jia);
				$('.bsj_jia').html(data.bsj_jia);
				$('.yhq_jia').html(data.yhq_jia);
				$('.fbb_jia').html(data.fbb_jia);
				$('.zbb_jia').html(data.zbb_jia);
				//  以上  2016-11-28 修改 ////////////////////////////////
                
			}else{ 
				plus.nativeUI.toast('错误');
				return;
			}
		},
		error : function(e){
			console.log(e);
		}
	});
	
	////////////////////////////////////////////////////////////////////
	    //  上传图片
		$('#tupian').on('click',function() {
		_this = $(this); 
		
		plus.nativeUI.actionSheet({cancel:'取消',buttons:[{title:'相册添加'},{title:'拍照添加'}]},function(e){	
			console.log('---');
		if(e.index == 1){    
			$('#tupian').html('<img src="" style="width:50px;height:50px" />');
            console.log('====');
			 plus.gallery.pick( function(path){
			 	console.log(path);
			 	_this.find('img').attr('src',path);
			 	appendPic(path);
			 }, function(error){}, {} );
		}else if(e.index == 2){ 
			$('#tupian').html('<img src="" style="width:50px;height:50px" />');
			var cmr = plus.camera.getCamera(); 
			cmr.captureImage( function(path){
				path = "file://" + plus.io.convertLocalFileSystemURL(path);
				_this.find('img').attr('src',path);
				appendPic(path);
			}, function(err){}, {index:1} );   
		}
		})
	})
		
		
	var index = 1;
	var files = [];
	// 添加照片
	function appendPic(path) {
		var path_new = compressImg(path,'_w',30);//压缩图片
		   files[0] = {name:"uploadkey"+index,path:path_new};   //console.log(path_new);
		   setTimeout(upload,1000);
	}
	//创建对像
	function upload(){
		plus.nativeUI.showWaiting('照片获取中,请稍后...');
	    var  task = plus.uploader.createUpload(apiRoot + '?m=Home&c=Photo&a=uploadOnePhoto',{ method:"POST"},function ( t, status ) { 

			plus.nativeUI.closeWaiting();
			if (status == 200 ) {
//				toast( "头像上传中" );
				plus.storage.setItem('good',t.responseText);  //  获取到的图片路径 
				console.log('we'+t.responseText);
			} else {
				plus.nativeUI.toast( "头像上传失败" );
			}  
		});
		//	 console.log(JSON.stringify(task));

		var f=files[0];
		task.addFile(f.path,{key:f.name});
		task.start(); 
	}
	
	
	/////////////////////////////////////////////////////////////////////////////////////////
	
//	$('.gaibian').on('change',function(){})
    var xuyao_ren;
	var gouwuche;
	var shouc_baob;
	var shouc_dianp;
	var guanz_dianp;
	var jinru_pingj;
	var huobi_sanj;
	var lingqu_youhq;
	var suiji_liul;
	var zhubaob_liul;
	var zongrentou;
	var zuorenwuqian;
	var pingt_fwf;
	var zongji;
	//  任务需求 实时监听input
	$('.gaibian').bind('input propertychange', function() {  

		xuyao_ren = Number($('#xuyao_ren').val());
		gouwuche = Number($('#gouwuche').val());
		shouc_baob = Number($('#shouc_baob').val());
		shouc_dianp = Number($('#shouc_dianp').val());
		guanz_dianp = Number($('#guanz_dianp').val());
		jinru_pingj = Number($('#jinru_pingj').val());
		huobi_sanj = Number($('#huobi_sanj').val());
		lingqu_youhq = Number($('#lingqu_youhq').val());
		suiji_liul = Number($('#suiji_liul').val());
		zhubaob_liul = Number($('#zhubaob_liul').val());
		
//		zongrentou = xuyao_ren+gouwuche+shouc_baob+shouc_dianp+guanz_dianp+jinru_pingj+huobi_sanj+lingqu_youhq+suiji_liul+zhubaob_liul;             
        //   2016-11-28 注释 ////////
//      zongrentou = xuyao_ren+gouwuche+shouc_baob+shouc_dianp+guanz_dianp+jinru_pingj+huobi_sanj+lingqu_youhq+suiji_liul;
//		zuorenwuqian = zongrentou*xuqiu_jiage+zhubaob_liul*xuyao_ren*xuqiu_jiage; 
		//  以上 2016-11-28 注释  /////
		//  2016-11-28 添加修改  ///////////////////////////
		zuorenwuqian = xuyao_ren*xuqiu_jiage+gouwuche*gwc_jia+shouc_baob*scbb_jia+shouc_dianp*scdp_jia+guanz_dianp*gzdp_jia+jinru_pingj*jrpj_jia+huobi_sanj*bsj_jia+lingqu_youhq*yhq_jia+suiji_liul*fbb_jia+zhubaob_liul*xuyao_ren*zbb_jia;
		
		pingt_fwf = xuyao_ren*pingtai_bilv;
		zongji = zuorenwuqian+pingt_fwf;
		
		pingt_fwf = pingt_fwf.toFixed(2);
		zongji    = zongji.toFixed(2);
		$('#pingt_fwf').html(pingt_fwf);
		$('#zongji').html(zongji);
		
	//////////////////////////////////////////////////////////////////////////////	
		
		///////////////////////////////////////////////////////////////////////////////
		
		
	})
	
	//  点击发布
	$('.mui-btn-block').on('tap',function(){ 
		// 照片路径
		var pic_path = plus.storage.getItem('good');
		var shangp_minc = $('#shangp_minc').val();
		var dianp_minc = $('#dianp_minc').val();
		var shangp_jiag = $('#shangp_jiag').val();
		var find_baob = $('#find_baob').val();
		var sousuo_guanj = $('#sousuo_guanj').val();
		var paixufangshi = $('#paixufangshi').val();
		var zhekou_fuwu = $('#zhekou_fuwu').val();
		var fahuo_diqu = $('#fahuo_diqu').val();
		
		var yuedu = $('#yuedu').prop('checked');
		var guolv;
		if(yuedu==true){
			guolv = 1;
		}else{
			guolv = 0;
		}
		
		//  商品价格检查 只能是数字
        if(isNaN(shangp_jiag)){
		   alert("请输入商品的最小价格");return;
		}

////////////////// 判断前面几项是否为空  ///////////////////////////////////////////////
        if(!pic_path){ toast('未上传图片');return; }
        if(!shangp_minc){ toast('未填写商品名称');return; }
        if(!dianp_minc){ toast('未填写店铺名称');return; }
        if(!shangp_jiag){ toast('未填写商品价格');return; }
        if(!find_baob){ toast('未填写如何找到宝贝');return; }
        if(!sousuo_guanj){ toast('未填写搜索关键词');return; }
        if(!paixufangshi){ toast('未填写排序方式');return; }
        if(!zhekou_fuwu){ toast('未填写折扣服务');return; }
        if(!fahuo_diqu){ toast('未填写发货地区');return; }
		
///////////////////////////////////////////////////////////////////////////////////////
		
		//  日期转换为时间戳 
		//  获取发布开始时间戳
		
		var begin_time = $('#begin_time').val();
            begin_time = get_unix_time(begin_time);
           
        //  获取发布结束时间戳    
        
        var end_time = $('#end_time').val();    
            end_time = get_unix_time(end_time);
            
        // 获取当前时间戳    
        
        var timestamp1 = (Date.parse( new Date())/1000)-(24*60*60);
        if(begin_time==""){
        	plus.nativeUI.toast('发布时间未设置！');return; 
        }else if(begin_time<timestamp1){
        	plus.nativeUI.toast('发布时间不能早于24小时前！');return;
        }else if((begin_time<end_time-(24*60*60))){
        	plus.nativeUI.toast('发布开始到结束时间不能大于24小时！');return;
        }else if(begin_time>=end_time){
        	plus.nativeUI.toast('结束时间不能小于发布时间！');return;
        }
        
	
////////////////////////////////////////////////////////////////////////////////////////////////////////
 //// 判断输入的任务值是否大于0 且不是负数 且每一项都不能大于需要任务人数
        ////////0
        //  需要任务人数必须大于等于5人
        if(xuyao_ren<5){ 
        	plus.nativeUI.toast('需要人数需大于等于5人！');return;
        }else if(!Number.isInteger(xuyao_ren)){    		
            plus.nativeUI.toast('输入的做任务人数必须是整数'); 
            return;
        }  
        ////////1
		if(!Number.isInteger(gouwuche)){    		
            plus.nativeUI.toast('输入的做任务人数必须是整数'); 
            return;
        }else if( gouwuche < 0){
        	plus.nativeUI.toast('输入的做任务人数必须大于0'); 
            return;
        }else if(xuyao_ren < gouwuche){       	
        	plus.nativeUI.toast('每项任务的人数不能大于需要任务的人数'); 
            return;
        }
        ///////////////2
        if(!Number.isInteger(shouc_baob)){    		
            plus.nativeUI.toast('输入的做任务人数必须是整数'); 
            return;
        }else if( shouc_baob < 0){
        	plus.nativeUI.toast('输入的做任务人数必须大于0'); 
            return;
        }else if(xuyao_ren < shouc_baob){       	
        	plus.nativeUI.toast('每项任务的人数不能大于需要任务的人数'); 
            return;
        } 
        //////////3
        if(!Number.isInteger(shouc_dianp)){    		
            plus.nativeUI.toast('输入的做任务人数必须是整数'); 
            return;
        }else if( shouc_dianp < 0){
        	plus.nativeUI.toast('输入的做任务人数必须大于0'); 
            return;
        }else if(xuyao_ren < shouc_dianp){       	
        	plus.nativeUI.toast('每项任务的人数不能大于需要任务的人数'); 
            return;
        } 
        /////////4
        if(!Number.isInteger(guanz_dianp)){    		
            plus.nativeUI.toast('输入的做任务人数必须是整数'); 
            return;
        }else if( guanz_dianp < 0){
        	plus.nativeUI.toast('输入的做任务人数必须大于0'); 
            return;
        }else if(xuyao_ren < guanz_dianp){       	
        	plus.nativeUI.toast('每项任务的人数不能大于需要任务的人数'); 
            return;
        } 
        //////////////5
        if(!Number.isInteger(jinru_pingj)){    		
            plus.nativeUI.toast('输入的做任务人数必须是整数'); 
            return;
        }else if( jinru_pingj < 0){
        	plus.nativeUI.toast('输入的做任务人数必须大于0'); 
            return;
        }else if(xuyao_ren < jinru_pingj){       	
        	plus.nativeUI.toast('每项任务的人数不能大于需要任务的人数'); 
            return;
        } 
        //////////6
        if(!Number.isInteger(huobi_sanj)){    		
            plus.nativeUI.toast('输入的做任务人数必须是整数'); 
            return;
        }else if( huobi_sanj < 0){
        	plus.nativeUI.toast('输入的做任务人数必须大于0'); 
            return;
        }else if(xuyao_ren < huobi_sanj){       	
        	plus.nativeUI.toast('每项任务的人数不能大于需要任务的人数'); 
            return;
        } 
        ////////7
        if(!Number.isInteger(lingqu_youhq)){    		
            plus.nativeUI.toast('输入的做任务人数必须是整数'); 
            return;
        }else if( lingqu_youhq < 0){
        	plus.nativeUI.toast('输入的做任务人数必须大于0'); 
            return;
        }else if(xuyao_ren < lingqu_youhq){       	
        	plus.nativeUI.toast('每项任务的人数不能大于需要任务的人数'); 
            return;
        } 
        ///////////8
        if(!Number.isInteger(suiji_liul)){    		
            plus.nativeUI.toast('输入的做任务人数必须是整数'); 
            return;
        }else if( suiji_liul < 0){
        	plus.nativeUI.toast('输入的做任务人数必须大于0'); 
            return;
        }else if(xuyao_ren < suiji_liul){       	
        	plus.nativeUI.toast('每项任务的人数不能大于需要任务的人数'); 
            return;
        } 
        ///////////9
        if(!Number.isInteger(zhubaob_liul)){    		
            plus.nativeUI.toast('输入的做任务人数必须是整数'); 
            return;
        }else if( zhubaob_liul < 0){
        	plus.nativeUI.toast('输入的做任务人数必须大于0'); 
            return;
        }else if(xuyao_ren < zhubaob_liul){       	
        	plus.nativeUI.toast('每项任务的人数不能大于需要任务的人数'); 
            return;
        }
        
//////////////////////////////////////////////////////////////////////////////////////////////////////		 
					 
			
//          console.log('daona');return;  
        
        plus.nativeUI.showWaiting('提交中...');
        $.ajax({
        	type: "get",
        	url : apiRoot + "?m=Home&c=Release&a=add_juhuasuan",  
        	data : {
        		userid : userid,
        		user_phone : user_phone,
        		pic_path : pic_path,
				shangp_minc : shangp_minc,
				dianp_minc : dianp_minc,
				shangp_jiag : shangp_jiag,
				find_baob : find_baob,
				sousuo_guanj : sousuo_guanj,
				paixufangshi : paixufangshi,
				zhekou_fuwu : zhekou_fuwu,
				fahuo_diqu : fahuo_diqu,
				guolv : guolv,
				begin_time : begin_time,
				end_time : end_time,
				xuyao_ren : xuyao_ren,
				gouwuche : gouwuche,
				shouc_baob : shouc_baob,
				shouc_dianp : shouc_dianp,
				guanz_dianp : guanz_dianp,
				jinru_pingj : jinru_pingj,
				huobi_sanj : huobi_sanj,
				lingqu_youhq : lingqu_youhq,
				suiji_liul : suiji_liul,
				zhubaob_liul : zhubaob_liul,
				xuqiu_jiage : xuqiu_jiage,
				// 2016-11-28 添加 ///////////
				gwc_jia : gwc_jia,
				scbb_jia : scbb_jia,
				scdp_jia : scdp_jia,
				gzdp_jia : gzdp_jia,
				jrpj_jia : jrpj_jia,
				bsj_jia : bsj_jia,
				yhq_jia : yhq_jia,
				fbb_jia : fbb_jia,
				zbb_jia : zbb_jia,
				//  以上2016-11-28 添加 /////////////////////
				pingtai_bilv : pingtai_bilv,
				pingt_fwf : pingt_fwf,
		        zongji : zongji
        	},
        	dataType : 'json',
        	success : function(data){
        		plus.nativeUI.closeWaiting();
        		console.log(JSON.stringify(data));
        		if(data.tshi==1){
        			plus.nativeUI.toast('发布任务成功!');
        			plus.webview.create('notice.html','notice.html').show('slide-in-right');
        			reloadWeb('home.html');
        			ws.close();
        		}else{
        			plus.nativeUI.toast('提交失败');
        		}
        	},
        	error : function(e){
        		console.log(JSON.stringify(e));
        		plus.nativeUI.closeWaiting();
        		plus.nativeUI.toast('错误');
        	}
        	
        }); 
        
        
        
        
	})
///////////////////// 以上为点击发布 //////////////////////////////////////////////////////////////////////////////
	
	
},false);

////////////////////// 判断输入的任务值是否大于0 且不是负数   ///////////////////////////////////////////////////////////////////////////////////////////////////
   //// 判断输入的任务值是否大于0 且不是负数 
    function pan_zhi(z,xuyao_ren){
//  	if(parseInt(z)==z){ 
////			alert('是'); 
//			console.log('shi');
//		}else{
////			alert('否');
//          console.log('fou');return;
//		}
//  	console.log('--'+xuyao_ren);
    	if(!Number.isInteger(z)){    		
            plus.nativeUI.toast('输入的做任务人数必须是整数'); 
            return;
        }else if( z < 0){
        	plus.nativeUI.toast('输入的做任务人数必须大于0'); 
            return;
        }else if(xuyao_ren < z){       	
        	plus.nativeUI.toast('每项任务的人数不能大于需要任务的人数'); 
            return;
        }
        
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