/*
*使用说明
*JsonToObject(jsonStr);//传入json字符串
*/
'use strict';
(function(global){
	global.JsonToObject = function(jsonstr){
		if(typeof(JSON) == undefined && typeof(eval) == undefined){
			return (new Function("return " + str))();  
		}else if(typeof(JSON) == undefined && typeof(eval) == 'function'){
			return eval('('+jsonstr+')');
		}else{
			return JSON.parse(jsonstr);
		}
	}
})(this);