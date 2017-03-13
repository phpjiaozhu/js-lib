/*
*使用说明
*直接调用ReloadUrl();
*/
(function(mywin){
  mywin.ReloadUrl_flag = false;
	mywin.ReloadUrl = function(){
    if(ReloadUrl_flag){
      return;
    }
    ReloadUrl_flag = true;
    var urlArr = location.href.split('?');
    var str1 = urlArr[0];
    var str2 = urlArr[1];
    var url;
    if($_GET['frt']!=undefined){
      var param = str2.slice(0, str2.lastIndexOf('&'));
      url = str1.concat('?',param,'&frt='+(new Date()).getTime());
    }else{
      url = str1.concat('?',str2,'&frt='+(new Date()).getTime());
    }
    window.location.replace(url);
  }
    
  mywin.$_GET = (function(){
      var url = window.document.location.href.toString();
      var u = url.split("?");
      if(typeof(u[1]) == "string"){
          u = u[1].split("&");
          var get = {};
          for(var i in u){
              var j = u[i].split("=");
              get[j[0]] = j[1];
          }
          return get;
      } else {
          return {};
      }
  })();
})(window);