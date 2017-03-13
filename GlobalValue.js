/*
*使用说明
*GlobalValue(key,value);//设置你的全局变量，key必须为字符串
*GlobalValue(key);//获取你的全局变量,如果没有该全局变量则返回false
*/
'use strict';
(function(global){
	var f = function(){
		var kv = [];
		return function(){
			if(arguments.length<=0){
				alert('Please input parameters!');
				return false;
			}
			if(typeof arguments[0]!=='string'){
				alert('Please enter the correct parameters!');
				return false;
			}
			if(arguments.length==1){
				if(kv[arguments[0]]===undefined){
					return false;
				}else{
					return kv[arguments[0]];
				}
			}else{
				kv[arguments[0]] = arguments[1];
				return kv[arguments[0]];
			}
		}
	}
	global.GlobalValue = f();
})(this);