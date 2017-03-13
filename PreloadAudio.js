/*
*使用说明
*建立一个全局变量
*window.preloadAudio = PreloadAudio('public/main.mp3').setPreload('auto');
*在window.onload里面去判断加载情况
*var isComplete = preloadAudio.isComplete();
*if(!isComplete){
*   alert('音频加载失败！');
*   window.location.reload();
*   return;
*}
*preloadAudio.play();//在你需要调用的地方调用
*preloadAudio.pause();//在你需要调用的地方调用
*/
(function(a){
	a.PreloadAudio = function(src){
		return new LoadAudio(src);
	}
	function LoadAudio(src){
		this.src = src;
		this.audio = document.createElement('audio');
		this.init();
	}
	LoadAudio.prototype = {
		init:function(){
			this.audio.src = this.src;
			this.audio.preload = "auto";
			return this;
		},
		getAudioObject:function(){
			return this.audio;
		},
		play:function(){
			if(!this.audio.canPlayType){
				return false;
			}
			this.audio.play();
		},
		isPause:function(){
			if(!this.audio.canPlayType){
				return false;
			}
			this.audio.paused;
		},
		pause:function(){
			if(!this.audio.canPlayType){
				return false;
			}
			this.audio.pause();
		},
		setPreload:function(mypreload){
			if(!this.audio.canPlayType){
				return this;
			}
			var reg = /^(auto)|(metadata)|(none)$/;
			if(!reg.test(mypreload)){
				alert('参数设置有误！');
				return this;
			}
			this.audio.preload = mypreload;
			return this;
		},
		setLoop:function(flag){
			if(!this.audio.canPlayType){
				return this;
			}
			if(flag){
				this.audio.loop = true;
			}
			return this;
		},
		setCurrentTime:function(curtime){
			if(!this.audio.canPlayType){
				return this;
			}
			this.audio.currentTime = curtime;
			return this;
		},
		getCurrentTime:function(){
			if(!this.audio.canPlayType){
				return this;
			}
			return this.audio.currentTime;
		},
		setVolume:function(volume){
			if(!this.audio.canPlayType){
				return this;
			}
			if(!/^[0|1]$/.test(volume)){
				if(!/^0\.\d+$/.test(volume.toString())){
					alert('参数设置有误！');
					return this;
				}
			}
			return this;
		},
		duration:function(){
			if(!this.audio.canPlayType){
				return false;
			}
			return this.audio.duration;
		},
		readyState:function(){
			if(!this.audio.canPlayType){
				return false;
			}
			return this.audio.readyState;
		},
		isComplete:function(){
			if(!this.audio.canPlayType){
				return false;
			}
			if(this.duration()>0&&this.readyState()==1){
				return true;
			}else{
				return false;
			}
		},
	};
})(window);