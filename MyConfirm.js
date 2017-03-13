/*
*使用说明
*在window.onload里面初始化，调用initConfirm();
*显示弹窗调用ShowConfirm('xxxxxxxxx',callback);//最后一个参数说明：传入一个你要处理的函数，点确定时候会触发
*hideAlertView()不需要调用，弹窗内部自己调用
*/
(function(_win){
	_win.reload = false;
	var callback = void(0);
	_win.ShowConfirm = function(msg, func){
	   if(typeof(func) != 'function'){
	   		alert('请传入一个方法！');
	   		return;
	   }
	   callback = func;
	   $('#confirmCont p').html(msg);
	   $('.ConfirmView').show();
	}
	_win.hideConfirm = function(flag){

	   $('#confirmCont p').html('');
	   $('.ConfirmView').hide();
	   if(flag==1){
			callback();
	   }
	}
	_win.initConfirm = function(){
		var htmls = '<div class="ConfirmView" style="width:100%;height:100%;background:rgba(0,0,0,0.6);position:fixed;left:0%;top:0%;z-index:1000000000;display:none;"><div id="confirmDiv" style="width:80%;margin-left:10%;margin-top:45%;z-background:rgba(255,255,255,0.85);border-radius:0.5em;-webkit-border-radius:0.5em;overflow:hidden;"><div id="confirmCont" style="width:100%;color:#000000;text-align:center;word-break:break-all;word-wrap:break-word;background:rgba(255,255,255,0.85);padding:3.7em 0 3.7em 0;float:left;"><p style="width:90%;margin-left:5%;background:transparent;font-size:1.5em;"></p></div><div id="confirmSure" onClick="hideConfirm(1);" style="width:50%;background:rgba(255,255,255,0.85);border-top:#BDBDBD 0.06em solid;color:#2E64FE;font-size:1.55em;text-align:center;padding:0.9em 0 0.9em 0;float:left;">确定</div><div id="confirmCancel" onClick="hideConfirm(0);" style="width:50%; background:rgba(255,255,255,0.85);border-top:#BDBDBD 0.06em solid;color:#2E64FE;font-size:1.55em;text-align:center;padding:0.9em 0 0.9em 0;float:left;">取消</div></div>';
		$(document.body).append(htmls);
	}
})(window);