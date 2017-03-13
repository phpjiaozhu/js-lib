/*
*把define.js在head标签里面加载,<script type="text/javascript" src="public/js/define.js"></script>
*要传一个对象或字典数组进来
*define({'mw':640,'mh':750,'ph':1136,'startflag':false});
*或者
*var data = {'mw':640,'mh':750,'ph':1136,'startflag':false};
*define(data);
*或者
*var data = new Array();
*data['mw'] = 640;
*data['mh'] = 750;
*data['ph'] = 1136;
*data['startflag'] = false;
*define(data);
*直接使用变量
*alert(startflag);
*/
'use strict';
(function(global){
	global.define = function(data){
		for(var key in data){
			global[key] = data[key];
		}
	}
})(this);


