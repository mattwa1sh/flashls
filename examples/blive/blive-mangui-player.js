function BliveManguiPlayer(options)
{
	this.autoPlay					= typeof options.autoPlay !== 'undefined' ? options.autoPlay : false;
	this.muteStart					= typeof options.muteStart !== 'undefined' ? options.muteStart : false;
	this.videoType					= typeof options.videoType !== 'undefined' ? options.videoType : 'vod';
	this.vodLoop					= typeof options.vodLoop !== 'undefined' ? options.vodLoop : false;
	this.currentUrl 				= typeof options.currentUrl !== 'undefined' ? options.currentUrl : false;
	this.playerId					= options.playerId;
	this.debug						= typeof options.debug !== 'undefined' ? options.debug : false;
	this.allowHardwareAcceleration	= typeof options.allowHardwareAcceleration !== 'undefined' ? options.allowHardwareAcceleration : false;
	this.position					= 0;
	this.duration					= 0;
	this.objectName					= options.objectName;
	this.bandwidth					= 0;
	this.level						= 0;
	
	//callbacks
	this.onReadyCallback			= function() {};
	this.onCompleteCallback			= function() {};		
	this.onSeekCallback				= function() {};
	this.onPlayCallback				= function() {};
	
	this.playCallbackCalled			= false;
	
	this.flashObject				= null;
	this.currentUrlLoaded 			= false;
	
	this.loadStream = function(url)
	{
		this.currentUrl = url;
		this.appendLog('load stream  : ' + this.currentUrl);
		this.stop();
		this.load();
		this.currentUrlLoaded = true;
	}

	this.appendLog = function(txt)
	{
		if(this.debug)
		{
			var d = new Date();
			var msg = '[' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '] ' + txt;
			
			try { 
				console.log(msg);
			} catch (e) {}
		}
	}

	this.load = function()
	{
		if (this.flashObject != null)
		{
			this.flashObject.playerLoad(this.currentUrl);
			this.appendLog("load url " + this.currentUrl);
		}
	}

	this.play = function()
	{
		if(!this.currentUrl)
		{
			this.appendLog("ERROR : No url loaded");
			return;
		}
		
		if(!this.currentUrlLoaded)
		{
			this.loadStream(this.currentUrl);
		}
		
		this.appendLog('playing ' + this.currentUrl);
		
		if (this.flashObject != null)
		{
			this.appendLog('POSITION: ' + this.position);
			
			if(!this.playCallbackCalled)
			{
				try {
					this.onPlayCallback();
				} catch (e) {
					this.appendLog("ERROR " + e);
				}
				
				this.playCallbackCalled = true;
			}
			
			if(this.position > 0)
			{
				this.flashObject.playerResume();
				this.appendLog("continue playback");
			} else {
				this.flashObject.playerPlay(-1);
				this.appendLog("start playback");
			}
		}
	}

	this.pause = function()
	{
		if (this.flashObject != null)
		{
			this.flashObject.playerPause();
			this.appendLog("pause playback at " + this.position);
		}
	}

	this.resume = function()
	{
		if (this.flashObject != null)
		{
			this.flashObject.playerResume();
			this.appendLog("resume playback");
		}
	}

	this.stop = function()
	{
		if (this.flashObject != null)
		{
			this.flashObject.playerStop();
			this.appendLog("stopping playback");
		}
	}

	this.setLevel = function(level)
	{
		if (this.flashObject != null)
		{
			this.flashObject.playerSetLevel(level);
			this.appendLog("force level to :" + level);
		}
	}

	this.setStartFromLevel = function(level)
	{
		if (this.flashObject != null)
		{
			this.flashObject.playerSetstartFromLevel(level);
			this.appendLog("set start From level to :" + level);
		}
	}

	this.setSeekFromLevel = function(level)
	{
		if (this.flashObject != null)
		{
			this.flashObject.playerSetseekFromLevel(level);
			this.appendLog("set seek From level to :" + level);
		}
	}

	this.seek = function(position)
	{
		if (this.flashObject != null)
		{
			this.flashObject.playerSeek(position);
			this.appendLog("seek to :" + position);
			
			try {
				this.onSeekCallback();
			} catch (e) {
				this.appendLog("ERROR " + e);
			}
		}
	}

	this.setVolume = function(percent)
	{
		if (this.flashObject != null)
		{
			this.flashObject.playerVolume(percent);
			this.appendLog("set volume to :" + percent + "%");
		}
	}

	this.getBufferLength = function()
	{
		if (this.flashObject != null)
		{
			return this.flashObject.getbufferLength();
		}
	}

	this.getLowBufferLength = function()
	{
		if (this.flashObject != null)
		{
			return this.flashObject.getlowBufferLength();
		}
	}

	this.setlowBufferLength = function(new_len)
	{
		if (this.flashObject != null)
		{
			this.flashObject.playerSetlowBufferLength(new_len);
			this.appendLog("force low buffer len to :" + new_len);
		}
	}

	this.getMinBufferLength = function()
	{
		if (this.flashObject != null)
		{
			return this.flashObject.getminBufferLength();
		}
	}

	this.setminBufferLength = function(new_len)
	{
		if (this.flashObject != null)
		{
			this.flashObject.playerSetminBufferLength(new_len);
			this.appendLog("force min buffer len to :" + new_len);
		}
	}

	this.getMaxBufferLength = function()
	{
		if (this.flashObject != null)
		{
			return this.flashObject.getmaxBufferLength();
		}
	}

	this.setMaxBufferLength = function(new_len)
	{
		if (this.flashObject != null)
		{
			this.flashObject.playerSetmaxBufferLength(new_len);
			this.appendLog("force max buffer len to :" + new_len);
		}
	}

	this.toggleDebugLogs = function()
	{
		if (this.flashObject != null)
		{
			var state = this.flashObject.getLogDebug();
			state = !state;
			this.flashObject.playerSetLogDebug(state);
			this.appendLog("toggle debug logs to:" + state);
		}
	}

	this.toggleDebug2Logs = function()
	{
		if (this.flashObject != null)
		{
			var state = this.flashObject.getLogDebug2();
			state = !state;
			this.flashObject.playerSetLogDebug2(state);
			this.appendLog("toggle debug2 logs to:" + state);
		}
	}

	this.toggleFlushLiveUrlCache = function()
	{
		
		if (this.flashObject != null)
		{
			var state = this.flashObject.getflushLiveurlCache();
			state = !state;
			this.flashObject.playerSetflushLiveurlCache(state);
			this.appendLog("toggle flush live url cache to:" + state);
		}
	}

	this.toggleJsUrlStream = function()
	{
		if (this.flashObject != null)
		{
			var state = this.flashObject.getJSurlStream();
			state = !state;
			this.flashObject.playerSetJSurlStream(state);
			this.appendLog("toggle JS url stream to:" + state);
		}
	}

	this.toggleCapLeveltoStage = function()
	{
		if (this.flashObject != null)
		{
			var state = this.flashObject.getCapLeveltoStage();
			state = !state;
			this.flashObject.playerCapLeveltoStage(state);
			this.appendLog("toggle cap Level to Stage to:" + state);
		}
	}

	this.getAudioTrackList = function()
	{
		if (this.flashObject != null)
		{
			var ret = this.flashObject.getAudioTrackList();
			return ret;
		}
	}

	this.setAudioTrack = function(val)
	{
		if (this.flashObject != null)
		{
			this.flashObject.playerSetAudioTrack(val);
		}
	}

	this.onHLSReady = function(message)
	{
		this.appendLog("HLS Ready");
		
		// warn about old swf file
		if (this.flashObject != null)
		{
			if(!this.flashObject.getPlayerVersion || this.flashObject.getPlayerVersion() < 2)
			{
				alert('You are using an old swf player file, or perhaps your browser is using a cached version of the swf file.');
			} else { // all is well
				try {
					this.onReadyCallback();
				} catch (e) {
					this.appendLog("ERROR " + e);
				}
			}
		}
	}

	this.onVideoSize = function(width, height)
	{
		this.appendLog("onVideoSize(), " + width + "x" + height);
		/*
		if (this.flashObject != null)
		{
			var state = this.flashObject.getCapLeveltoStage();
			if (!state)
			{
				var ratio = width / height;
				if (height > 720)
				{
					height = 720;
					width = height * ratio;
				}
				this.appendLog("onVideoSize(),resize stage to " + width + "x" + height);
				this.flashObject.width = width;
				this.flashObject.height = height;
			}
		}
		*/
	}

	this.onComplete = function(message)
	{
		this.appendLog("onComplete(), playback completed");
		
		try {
			this.onCompleteCallback();
		} catch (e) {
			this.appendLog("ERROR " + e);
		}
	}

	this.onError = function(code, url, message)
	{
		this.appendLog("onError():error code:" + code + " url:" + url + " message:" + message);
	}

	this.onFragmentLoaded = function(bandwidth, level, width)
	{
		this.bandwidth = bandwidth;
		//this.appendLog("onFragmentLoaded(): bandwidth:" + bandwidth + " level:" + level + " width:" + width);
	}

	this.onFragmentPlaying = function(playmetrics)
	{
		this.appendLog("onFragmentPlaying(): metrics:" + playmetrics.level + " sn:" + playmetrics.seqnum + " cc:" + playmetrics.continuity_counter + " tags:" + playmetrics.tag_list);
	}

	this.onManifest = function(duration)
	{
		this.duration = duration.toFixed(2);
		this.appendLog("manifest loaded, playlist duration:" + this.duration);
	}

	this.onPosition = function(position, duration, live_sliding, buffer, program_date)
	{
		var newPosition = parseFloat(position.toFixed(2));
		
		if(newPosition > -1)
		{
			this.position = newPosition;
			//TODD! you may want to use parseInt(this.position) to set the time
		}
		
		/*
		document.getElementById('mediaInfo').rows[2].cells[1].innerHTML = position.toFixed(2);
		document.getElementById('mediaInfo').rows[2].cells[2].innerHTML = duration.toFixed(2);
		document.getElementById('mediaInfo').rows[2].cells[3].innerHTML = getLowBufferLength().toFixed(2);
		document.getElementById('mediaInfo').rows[2].cells[4].innerHTML = getMinBufferLength().toFixed(2);
		document.getElementById('mediaInfo').rows[2].cells[5].innerHTML = buffer.toFixed(2);
		document.getElementById('mediaInfo').rows[2].cells[6].innerHTML = getMaxBufferLength().toFixed(2);
		document.getElementById('mediaInfo').rows[2].cells[16].innerHTML = live_sliding.toFixed(2);
		document.getElementById('mediaInfo').rows[2].cells[17].innerHTML = new Date(program_date).toUTCString();
		*/
	}

	this.onState = function(newState)
	{
		// TODD!
		//this determines player state. below is included (for now) all the mangui states
		// you'll need to show different states of the chrome for each of these
		
		/*
		switch(event.state) {
		                case HLSPlayStates.IDLE:
		                case HLSPlayStates.PLAYING:
		                    _clip.dispatch(ClipEventType.BUFFER_FULL);
		                    break;
		                case HLSPlayStates.PLAYING_BUFFERING:
		                    _clip.dispatch(ClipEventType.BUFFER_EMPTY);
		                    break;
		                case HLSPlayStates.PAUSED_BUFFERING:
		                    _clip.dispatch(ClipEventType.BUFFER_EMPTY);
		                    _clip.dispatch(ClipEventType.PAUSE);
		                    break;
		                case HLSPlayStates.PAUSED:
		                    _clip.dispatch(ClipEventType.BUFFER_FULL);
		                    _clip.dispatch(ClipEventType.PAUSE);
		                    break;
		            }
		*/
		
		this.appendLog("switching state to " + newState);
	}

	this.onSwitch = function(newLevel)
	{
		this.appendLog("switching level to " + newLevel);
		this.level = newLevel;
		
		//document.getElementById('level').value = this.level;
	}

	this.onAudioTracksListChange = function(trackList)
	{
		// update audio switcher
		/*
		var d = document.getElementById('audioControl');
		var html = '';
		this.appendLog("new track list");
		
		
		for (var t in trackList)
		{
			this.appendLog("    " + trackList[t].title + " [" + trackList[t].id + "]");
			html += '<button onclick="setAudioTrack(' + t + ')">' + trackList[t].title + '</button>';
		}
		d.innerHTML = html;
		*/
	}

	this.onAudioTrackChange = function(trackId)
	{
		this.appendLog("switching audio track to " + trackId);
	}

	this.onRequestResource0 = function(url)
	{
		this.appendLog("loading fragment " + url + " for instance 0");
		this.urlRequest(url, this.urlReadBytes0, this.transferFailed0, "arraybuffer");
	}

	this.onRequestResource1 = function(url)
	{
		this.appendLog("loading fragment " + url + " for instance 1");
		this.urlRequest(url, this.urlReadBytes1, this.transferFailed1, "arraybuffer");
	}

	this.urlRequest = function(url, loadcallback, errorcallback, responseType)
	{
		var xhr = new XMLHttpRequest();
		
		xhr.open("GET", url, loadcallback ? true : false);
		
		if (responseType)
		{
			xhr.responseType = responseType;
		}
		
		if (loadcallback)
		{
			xhr.onload = loadcallback;
			xhr.onerror = errorcallback;
			xhr.send();
		}
		else
		{
			xhr.send();
			return xhr.status == 200 ? xhr.response : "";
		}
	}

	this.transferFailed0 = function(oEvent)
	{
		this.appendLog("An error occurred while transferring the file :" + oEvent.target.status);
		
		if (this.flashObject != null)
		{
			this.flashObject.resourceLoadingError0();
		}
	}

	this.transferFailed1 = function(oEvent)
	{
		this.appendLog("An error occurred while transferring the file :" + oEvent.target.status);
		
		if (this.flashObject != null)
		{
			this.flashObject.resourceLoadingError1();
		}
	}

	this.urlReadBytes0 = function(event)
	{
		this.appendLog("fragment loaded");
		var res = base64ArrayBuffer(event.currentTarget.response);
		resourceLoaded0(res);
	}

	this.urlReadBytes1 = function(event)
	{
		this.appendLog("fragment loaded");
		var res = base64ArrayBuffer(event.currentTarget.response);
		resourceLoaded1(res);
	}


	this.resourceLoaded0 = function(res)
	{
		if (this.flashObject != null)
		{
			this.flashObject.resourceLoaded0(res);
		}
	}

	this.resourceLoaded1 = function(res)
	{
		if (this.flashObject != null)
		{
			this.flashObject.resourceLoaded1(res);
		}
	}

	this.base64ArrayBuffer = function(arrayBuffer)
	{
		var base64 = ''
		var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
		var bytes = new Uint8Array(arrayBuffer)
		var byteLength = bytes.byteLength
		var byteRemainder = byteLength % 3
		var mainLength = byteLength - byteRemainder
		var a, b, c, d, chunk

		for (var i = 0; i < mainLength; i = i + 3)
		{
			chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]
			a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
			b = (chunk & 258048) >> 12 // 258048 = (2^6 - 1) << 12
			c = (chunk & 4032) >> 6 // 4032 = (2^6 - 1) << 6
			d = chunk & 63 // 63 = 2^6 - 1
			base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
		}

		if (byteRemainder == 1)
		{
			chunk = bytes[mainLength]
			a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2
			b = (chunk & 3) << 4 // 3 = 2^2 - 1
			base64 += encodings[a] + encodings[b] + '=='
		}
		else if (byteRemainder == 2)
		{
			chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]
			a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
			b = (chunk & 1008) >> 4 // 1008 = (2^6 - 1) << 4
			c = (chunk & 15) << 2 // 15 = 2^4 - 1
			base64 += encodings[a] + encodings[b] + encodings[c] + '='
		}

		return base64;
	}

	this.getFlashMovieObject = function()
	{
		this.appendLog("loading flash object at : " + this.playerId);
		
		if (window.document[this.playerId])
		{
			return window.document[this.playerId];
		}
		if (navigator.appName.indexOf("Microsoft Internet") == -1)
		{
			if (document.embeds && document.embeds[this.playerId])
				return document.embeds[this.playerId];
		}
		else // if (navigator.appName.indexOf("Microsoft Internet")!=-1)
		{
			return document.getElementById(this.playerId);
		}
	}
	
	/*
	 * These are the names of the callbacks and a map to the names 
	 * of the JS functions they are supposed to call
	 */
	
	this.callbackMap = {
		'onComplete'				: this.objectName + '.onComplete'
	,	'onError'					: this.objectName + '.onError'
	,	'onFragmentLoaded'			: this.objectName + '.onFragmentLoaded'	
	,	'onFragmentPlaying'			: this.objectName + '.onFragmentPlaying'
	,	'onManifest'				: this.objectName + '.onManifest'
	,	'onPosition'				: this.objectName + '.onPosition'
	,	'onVideoSize'				: this.objectName + '.onVideoSize'
	,	'onState'					: this.objectName + '.onState'
	,	'onAudioTracksListChange'	: this.objectName + '.onAudioTracksListChange'
	,	'onSwitch'					: this.objectName + '.onSwitch'
	,	'onAudioTrackChange'		: this.objectName + '.onAudioTrackChange'
	,	'onHLSReady'				: this.objectName + '.onHLSReady'
	};
	
	this.flashObject = this.getFlashMovieObject();
	
	this.initializeFlashObject = function()
	{
		this.appendLog("Trying to initialize object.");
		
		var self = this; 
		
		try {
			
			
			this.appendLog(this.flashObject);
			
			//do override default js callbacks
			this.appendLog("overriding callbacks");
			
			for(var key in this.callbackMap)
			{
				try {
					this.flashObject.overrideExternalCallback(key, this.callbackMap[key]); //key, this.callbackMap[key]
				} catch (e) {
					this.appendLog("ERROR: " + e);
				}
			}
			
			//set hardware acceleration
			this.appendLog("set hardware acceleration to " + this.allowHardwareAcceleration);
			
			try {
				this.flashObject.setAllowHardwareAcceleration(this.allowHardwareAcceleration);
				
			} catch (e) {
				this.appendLog("ERROR: " + e);
			}
			
			this.appendLog("cap level to stage");
			this.flashObject.playerCapLeveltoStage(true);
			
			this.appendLog('AutoPlay : ' + this.autoPlay);
			
			if(this.autoPlay && this.currentUrl != "undefined" && this.currentUrl.length > 4)
			{
				this.appendLog("Beginning autoplay of  " + this.currentUrl);
				this.play();
			}
		} catch (e) {
			this.appendLog("ERROR initializing object: " + e);
			setTimeout(function(){self.initializeFlashObject();}, 100);
		}
	}
	
	var self = this;
	setTimeout(function(){self.initializeFlashObject();}, 100);
	
}