/*
var data = {name:'xxoo',uid:1001,code:15356801};
FluxJsonp('/users',data,function(data){
  console.log(data);
},function(error){
  console.log(error);
});
*/

(function(_this){
  'use strict';
  _this.FluxJsonp = function(url, data, success_callback, error_callback){
    var head = window.document.getElementsByTagName("head")[0];
    var get_random = function () {
        return (new Date()).getTime() +''+ (function(min,max){
          return min+Math.round((Math.random())*(max-min));
        })(10000,99999);
    };
    var _script;
    var load_script = function(callback, data){
        var params = '';
        for(var i in data){
          params +='&'+i+'='+data[i];
        }
        _script = document.createElement('script');
        _script.onerror = function(){
            error_callback({status:101,msg:'client load fail'});
        }
        _script.onload = _script.onreadystatechange = function(){
        };
        _script.charset = "UTF-8";
        _script.async = true;
        _script.src = (url.indexOf('?')===-1)?(url+'?callback='+callback+''+params):(url+'&callback='+callback+''+params);
        head.appendChild(_script);
    }
    var callback_func = 'json_callback_'+get_random();
    window[callback_func] = function(data){
        success_callback(data);
        try{
          head.removeChild(_script);
          delete window[callback_func];
        }catch(e){
        console.log(e);
      }
    }
    load_script(callback_func, data);
  }
})(this);
