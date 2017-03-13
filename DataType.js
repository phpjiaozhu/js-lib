/*
*Type.isArray(sth);
*Type.isNumber(sth);
*Type.isString(sth);
*Type.isBoolean(sth);
*Type.isObject(sth);
*Type.isNull(sth);
*Type.isUndefined(sth);
*Type.isFunction(sth);
*返回值：true、false
*/
'use strict';
(function(global){
	global.Type = {};
	var typeArr = ['Number','String','Boolean','Array','Object','Null','Undefined','Function'];
	for(var i in typeArr){
		(function(type){
			Type['is'+type] = function(obj){
				return Object.prototype.toString.call(obj) === '[object '+type+']';
			}
		})(typeArr[i]);
	}
})(this);