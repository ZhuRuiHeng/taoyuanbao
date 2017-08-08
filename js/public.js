/**
 * ------------------------------------------
 * 通用函数
 * ------------------------------------------
 */
var webRoot = "http://119.23.30.19";
var apiRoot = webRoot + "/api/index.php";
var p1=/^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\d{8}|14[57]\d{8})$/;//手机号码格式验证
//mui.init();
//mui.plusReady(function() {
////	plus.navigator.setStatusBarBackground('#3385FF'); //设置状态栏背景色
//	plus.webview.currentWebview().setStyle({
//		scrollIndicator: 'none'
//	}); //关闭滑动条显示	
//
//	//首页返回键处理
//	//处理逻辑：1秒内，连续两次按返回键，则退出应用；
//	var first = null;
//	var showMenu = null;
//	mui.back = function() {
//		if (showMenu) {
//			closeMenu();
//		} else {
//			//首次按键，提示‘再按一次退出应用’
//			if (!first) {
//				first = new Date().getTime();
//				mui.toast('再按一次退出应用1');
//				setTimeout(function() {
//					first = null;
//				}, 1000);
//			} else {
//				if (new Date().getTime() - first < 1000) {
//					plus.runtime.quit();
//				}
//			}
//		}
//	};
//})

	/**
	 * 尝试关闭页面
	 * @param {webview} _web
	 */	
	function closeWeb (_web) {
		var _this;
		if(typeof(_web) !=='object'){
			_this = plus.webview.getWebviewById(_web);
			if(_this!=null){
				_this.close();
			}			
		}else{
			for(var i in _web){
				_this = plus.webview.getWebviewById(_web[i]);
				if(_this!=null){
					_this.close();
				}
			}
		}
	}
	
	/**
	 * 尝试刷新页面
	 * @param {webview} _web
	 */		
	function reloadWeb (_web) {
		var _this;
		if(typeof(_web) !=='object'){
			_this = plus.webview.getWebviewById(_web);
			if(_this!=null){
				_this.reload();
			}			
		}else{
			for(var i in _web){
				_this = plus.webview.getWebviewById(_web[i]);
				if(_this!=null){
					_this.reload();
				}
			}
		}
	}
	
    // 后台添加的图片请使用该方法
	function getImgUrl(relativeImgUrl) { 
		if(relativeImgUrl != null){
			return webRoot+relativeImgUrl;
		}else{
			return '../img/login-1.png';   
		}
	}
	
    //压缩图片(路径，新图片额外后缀标识，覆盖原图片，清晰度)
	function compressImg(urls,adds,num){
		var all = urls.split('/');
		var name = all.pop();
		var end = name.split('.');
		var type = end.pop();
		var fileName = end.join('.');
		var newImg = all.join('/') +'/'+ fileName + adds + '.' + type;
		plus.zip.compressImage({
				src:urls,
				dst:newImg,
				overwrite:true,
				quality:num
			},
			function() {
				newImg;
			},function(error) {
				newImg = urls;
		});
		return newImg;
	}
	var toast = function (e) {
		plus.nativeUI.toast(e);
	}
	
    //下拉刷新
	function PullToRefresh(ws){
		ws=plus.webview.currentWebview();
		ws.setPullToRefresh({support:true,
			height:"50px",
			range:"200px",
			contentdown:{  
				caption:"下拉可以刷新"
			},
			contentover:{
				caption:"释放立即刷新"
			},
			contentrefresh:{
				caption:"正在刷新..."
			} 
		},function(){
			setTimeout(function(){
				ws.reload();
				ws.endPullToRefresh();
			},1500);
		});
	}    


function  uploadPics(shoucangdianpu,shoucangbaobei,guanzhudianpu,gouwuche,
				jinrupingjia,bisanjia,youhuiquan,suijiliulan){
					var tak_html = '';
			if(shoucangdianpu == 1){
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="shoucangdianpu_pic" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">收藏店铺截图</p></li>';
			}
			if(shoucangbaobei == 1){
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="shoucangbaobei_pic" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">收藏宝贝截图</p></li>';
			}
			if(guanzhudianpu == 1){
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="guanzhudianpu_pic" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">关注店铺截图</p></li>';
			}
			if(gouwuche == 1){
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="gouwuche_pic" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">加入购物车截图</p></li>';
			}
			if(jinrupingjia == 1){
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="jinrupingjia_pic" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">进入评价页面</p></li>';
			}
			if(bisanjia == 1){
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="bisanjia_pic_one" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">货比三家1</p></li>';
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="bisanjia_pic_two" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">货比三家2</p></li>';
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="bisanjia_pic_three" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">货比三家3</p></li>';
			}
			if(youhuiquan == 1){
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="youhuiquan_pic" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">领取优惠券</p></li>';
			}
			if(suijiliulan == 1){
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="liulanfu_one" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">浏览副宝贝1</p></li>';
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="liulanfu_two" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">浏览副宝贝2</p></li>';
			}
			$('#task_pic_li').after(tak_html);
	}

    function  uploadPicsTao(shoucangdianpu,shoucangbaobei,guanzhudianpu,gouwuche,
				jinrupingjia,bisanjia,youhuiquan,suijiliulan){
					var tak_html = '';
			if(shoucangdianpu == 1){
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="shoucangdianpu_pic" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">收藏店铺截图</p></li>';
			}
			if(shoucangbaobei == 1){
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="shoucangbaobei_pic" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">收藏宝贝截图</p></li>';
			}
			if(guanzhudianpu == 1){
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="guanzhudianpu_pic" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">关注店铺截图</p></li>';
			}
			if(gouwuche == 1){
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="gouwuche_pic" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">加入购物车截图</p></li>';
			}
			if(jinrupingjia == 1){
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="jinrupingjia_pic" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">进入评价页面</p></li>';
			}
			if(bisanjia == 1){
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="bisanjia_pic_one" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">货比三家1</p></li>';
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="bisanjia_pic_two" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">货比三家2</p></li>';
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="bisanjia_pic_three" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">货比三家3</p></li>';
			}
			if(youhuiquan == 1){
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="youhuiquan_pic" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">领取优惠券</p></li>';
			}
			if(suijiliulan == 1){
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="liulanfu_one" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">浏览副宝贝1</p></li>';
				tak_html +=  '<li class="mui-table-view-cell mui-col-xs-3"><i data-id="liulanfu_two" class="mui-icon iconfont tupian">&#xe61b;</i><p class="mui-ellipsis">浏览副宝贝2</p></li>';
			}
			$('#task_pic_li').after(tak_html);
	}
	function tishilinqu_img(type,data,renwu_id,tao_hao){
		if(data.linqu_img==undefined || data.linqu_img==null){
			//alert(1)
			data.linqu_img="../img/login-1.png";
		}
		//var html = "<div class='linqu_img'><ul><img src='"+data.linqu_img+"' width='80%' height='auto'/><li class='close_linqu_img' onclick='close_linqu_img("+renwu_id+","+tao_hao+","+type+")'>确定</li></ul></div>";
		var html = "<div class='linqu_img'><ul><img src='"+data.linqu_img+"' width='80%' height='auto'/><li class='close_linqu_img' onclick='close_linqu_img('"+renwu_id+"','"+tao_hao+"','"+type+"')'>确2定</li></ul></div>";
		$(document.body).prepend(html);
	}
function close_linqu_img(renwu_id,tao_hao,type){
	alert(3)
	$(".linqu_img").remove();
	reloadWeb('home.html');
	plus.webview.create('home-'+type+'-ing.html','home-'+type+'-ing.html',{},{renwu_id:renwu_id,tao_hao:tao_hao}).show('slide-in-right');
	ws.reload();
}    


