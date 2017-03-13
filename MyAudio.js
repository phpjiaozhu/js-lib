/*
*使用说明
*建立一个全局变量，并按照下面方式初始化(支持跨域音频地址)
*myAudio = new MyAudio('public/music.mp3',true);//第二个参数时循环设置，true为循环，false为不循环
*做一个定时器，定时检测是否音频加载完成，如下
*var check_audio = function(){
*        if(myAudio.isComplete()){
*            myAudio.play();//这是播放音频
*            //myAudio.stop();//停止音频
*            //myAudio.pause();//暂停音频
*            return;
*         }
*         requestAnimFrame(check_audio);
*    }
*check_audio();
*
*/
'use strict';
(function(win){
    
    win.MyAudio = function(src,loop){
        if(src.length<=0){
            return false;
        }
        return new LCAudio(src,loop);
    }

    var LCAudio = function(src,loop){
        this.crontabtime = 0;
        this.firstflag = true;
        this.crontabflag = false;
        this.curtime = 0;
        this.lastime = 0;
        this.duration = 0;
        this.playtime = 0;
        this.playflag = false;
        this.stopflag = false;
        this.pauseflag = false;
        this.src = src;
        this.loop = loop;
        this.currentTime = 0;
        this.isCompleted = false;
        this.buffer = null;
        this.arraybuffer = null;
        this.source = null;
        var tagflag = true;

        try {
           var myAudioContext = window.AudioContext||window.webkitAudioContext;
           this.context = new myAudioContext();
        }catch(e){
           tagflag = false;
        }
        if(!tagflag){
            alert('浏览器暂不支持本音频插件！');
            return false;
        }
        this.load();
    }
    LCAudio.prototype = {
        load:function(){
            this.request(this.src);
            return this;
        },
        request:function(url){
            var _this = this;
            var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';
            xhr.timeout = 15000;
            xhr.onload = function(e) { //下载完成
                _this.arraybuffer = xhr.response;
                _this.context.decodeAudioData(_this.arraybuffer, function (buffer) {
                    _this.isCompleted = true;
                    _this.source = _this.context.createBufferSource();
                    if(!_this.source){
                        alert('没有音频资源');
                        return false;
                    }
                    _this.source.loop = _this.loop;
                    if(!_this.source){
                        return false;
                    }
                    _this.buffer = buffer;
                    _this.duration = _this.buffer.duration;
                    _this.source.buffer = _this.buffer;
                    _this.source.connect(_this.context.destination);
                    return _this;
                }, function (e) {
                    alert('加载音频资源失败');
                    return false;
                });
            };
            xhr.send();
        },
        play:function(){
            var _this = this;
            _this.playflag = true;
            //指定位置开始播放
            if(_this.stopflag||_this.pauseflag){
                _this.source = _this.context.createBufferSource();
                if(!_this.source){
                    alert('没有音频资源');
                    return false;
                }
                _this.source.loop = _this.loop;
                if(!_this.source){
                    return false;
                }
                _this.source.buffer = _this.buffer;
                _this.source.connect(_this.context.destination);
            }
            if(_this.firstflag){
               var cronlasttime = 0;
               var crontab = function(){
                    _this.firstflag = false;
                    var croncurtime = (new Date()).getTime()/1000;
                    if(!_this.crontabflag){
                        if(_this.crontabtime>=_this.duration){
                            _this.playtime = 0;
                            _this.crontabtime = 0;
                        }else{
                            if(cronlasttime==0){
                                cronlasttime = croncurtime;
                                _this.crontabtime++;
                            }else{
                                if(croncurtime-cronlasttime>=1){
                                    cronlasttime = croncurtime;
                                    //console.log(_this.crontabtime);
                                    _this.crontabtime++;
                                }
                            }
                            
                        }
                        
                    }
                    requestAnimationFrame(crontab);
                }
                crontab();
            }
            
            _this.crontabflag = false;
            if(!_this.source.start){
                _this.source.start=_this.source.noteOn;
            }
            _this.lastime = _this.context.currentTime;
            if(_this.pauseflag){
                _this.source.start(0,_this.playtime);
            }else{
                _this.source.start(0);
            }
            return _this;
        },
        pause:function(){
            var _this = this;
            _this.crontabflag = true;
            _this.pauseflag = true;
             var time = _this.context.currentTime - _this.lastime;
            _this.playtime += time;
            _this.playtime = Math.floor(_this.playtime*1000)/1000;
            if(_this.playtime>=_this.duration){
                _this.playtime = 0;
            }
            //console.log(_this.playtime);
            if(!_this.source){
                alert('没有音频资源');
                return false;
            }
            if(!_this.source.stop){
                _this.source.stop = _this.source.noteOff;
            }
            _this.currentTime = _this.context.currentTime;
            _this.source.stop(_this.context.currentTime);
            return _this;
        },
        isPlayed:function(){
            return this.playflag;
        },
        stop:function(){
            var _this = this;
            _this.stopflag = true;
            if(!_this.source){
                alert('没有音频资源');
                return false;
            }
            if(!_this.source.stop){
                _this.source.stop = _this.source.noteOff;
            }
            _this.source.stop(0);
            return _this;
        },
        isComplete:function(){
            return this.isCompleted;
        }
    }

})(window);