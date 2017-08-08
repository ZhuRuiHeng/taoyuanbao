
document.addEventListener('plusready',function(){
//	alert('dgd');
	console.log('233'); 
	var ws;
    ws=plus.webview.currentWebview();
	if(plus.storage.getItem('firstLogin')){
		if(plus.storage.getItem('user')){
			plus.webview.create('index.html','index.html').show('pop-in');
//			ws.close();
			return;
		}else{
			plus.webview.create('login.html','login.html').show('pop-in');
//			ws.close();
			return;
		}
	}else{
		plus.storage.setItem('firstLogin','firstLogin');
	} 
	
	 
//	$('#tiyan').on('click',function(){
//		console.log(11);
//		if(plus.storage.getItem('user')){
//			plus.webview.create('index.html','index.html').show('pop-in');
////			ws.close();
//			return;
//		}else{
//			plus.webview.create('login.html','login.html').show('pop-in');
////			ws.close();
//			return;
//		}
//	})
	
	
	
	
},false);