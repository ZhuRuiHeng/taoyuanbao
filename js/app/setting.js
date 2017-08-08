document.addEventListener('plusready',function(){
	$('#logout').on('click',function(){
		plus.storage.clear();
		plus.webview.create('login.html','login.html').show('slide-in-left');
	})
},false);