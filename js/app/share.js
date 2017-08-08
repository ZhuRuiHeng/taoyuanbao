var self,goodsid,title;
var shares=null,bhref=false;
var Intent=null,File=null,Uri=null,main=null;
if(window.plus){
	plusReady();
}else{
	document.addEventListener("plusready",plusReady,false);
}
// H5 plus事件处理
function plusReady(){ 
	$('#qq').on('tap',function(){shareChange(0);})
	$('#weixin').on('tap',function(){shareChange(1);})
	$('#pengyou').on('tap',function(){shareChange(2);})
	$('#kongjian').on('tap',function(){shareChange(0);})
//	$('#qq').on('tap',function(){shareChange(0);})
//	$('#kone').on('tap',function(){shareChange(0);})
	updateSerivces(); 
	if(plus.os.name=="Android"){
		Intent = plus.android.importClass("android.content.Intent");
		File = plus.android.importClass("java.io.File");
		Uri = plus.android.importClass("android.net.Uri");
		main = plus.android.runtimeMainActivity();
	}
}
/**
 * 更新分享服务
 */
function updateSerivces(){
	plus.share.getServices( function(s){
		console.log(s)
		shares={};
		for(var i in s){
			var t=s[i];
			shares[t.id]=t;
		}
	}, function(e){
		plus.nativeUI.toast( "获取分享服务列表失败："+e.message );
	} );
}
/**
 * 弹出分享平台选择
 */ 
function shareChange(i){
//	alert(i);
//	var uid = plus.storage.getItem('phone');
//	uid = uid?uid:'';
	var ids=[{id:"qq"},{id:"weixin",ex:"WXSceneSession"},{id:"weixin",ex:"WXSceneTimeline"},{id:"sinaweibo"}];
 	var s = shares[ids[i].id];
 	console.log(JSON.stringify(s))
	if ( s.authenticated ) {
		shareMessage(shares[ids[i].id],ids[i].ex);
	} else {
		s.authorize( function(){
				shareMessage(shares[ids[i].id],ids[i].ex);
			},function(e){
			plus.nativeUI.alert( "认证授权失败"+e.message,null,'提示' );
		});
	}
}  
	/**
   * 发送分享消息
   * @param {plus.share.ShareService} s
   */
function shareMessage(s,ex){
//	console.log(goodsid + "," + title);
	$('.mui-backdrop,.mui-popover').remove();
	var uid = plus.storage.getItem('id');
	console.log('uid'+uid);
	var msg={title : '淘元寳' , extra : {scene:ex}  , content:"亲，您的好友向你推荐一个超赞的App！",href:apiRoot+'?m=Home&c=Index&a=share&code=YB'+uid,thumbs:['/images/17.png']};
	s.send( msg, function(){
		plus.nativeUI.toast( "分享成功");
		$('#Popover_0').hide();
	}, function(e){
//		console.log(JSON.stringify(e));
		plus.nativeUI.toast( "分享失败" );
		$('#Popover_0').hide();
	});
}
