/*
*使用说明
*在window.onload里面初始化，调用initDialog();
*显示弹窗调用ShowAlertView('xxxxxxxxx',0);//最后一个参数说明：1表示刷新页面，0表示不刷新
*hideAlertView()不需要调用，弹窗内部自己调用
*/
(function(_win){
	_win.reload = false;
	_win.ShowAlertView = function(msg, flag){
	   reload = (flag==1)? true : false;
	   $('#alertCont p').html(msg);
	   $('.AlertView').show();
	}
	_win.hideAlertView = function(){
	   $('#alertCont p').html('');
	   $('.AlertView').hide();
	   if(reload){
	      ReloadUrl();
	      return;
	   }
	}
	_win.initDialog = function(){
		var htmls = '<div class="AlertView" style="width:100%;height:100%;background:rgba(0,0,0,0.6);position:fixed;left:0%;top:0%;z-index:1000000000;display:none;"><div id="alertDiv" style="width:80%;margin-left:10%;margin-top:45%;z-background:rgba(255,255,255,0.85);border-radius:0.5em;-webkit-border-radius:0.5em;overflow:hidden;"><div id="alertCont" style="width:100%;color:#000000;text-align:center;word-break:break-all;word-wrap:break-word;background:rgba(255,255,255,0.85);padding:3.7em 0 3.7em 0;"><p style="width:90%;margin-left:5%;background:transparent;font-size:1.5em;"></p></div><div id="alertCancel" onClick="hideAlertView();" style="width:100%;background:rgba(255,255,255,0.85);border-top:#BDBDBD 0.06em solid;color:#2E64FE;font-size:1.55em;text-align:center;padding:0.9em 0 0.9em 0;">确定</div></div></div>';
		$(document.body).append(htmls);
	}
})(window);