'use strict';
(function(_win){
	_win.CommonCheck = {
		isInt:(function(){
			return function(val){
				return /^[0-9]+$/.test(val);
			}
		})(),
		isXiaoShu:(function(){
			return function(val){
				if(val==0){
			      return true;
			    }
			    return /^0\.\d+$/.test(val.toString());
			}
		})(),
		checkphone:(function(){
			return function(mobile){
				var myreg = /^[1][34578]\d{9}$/;
			    if(!myreg.test(mobile)){
			        return true;
			    }
			}
		})(),
		isWeiXin:function(){
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
			    return true;
			}else{
			    return false;
			}
		}
	};
	
})(window);