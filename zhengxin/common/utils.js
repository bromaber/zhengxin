define(function(require, exports){
	var lStorage = window.localStorage;
	var sessionStorage = window.sessionStorage;
	function setCookie(cname, cvalue, exhours, path, domain, secure){
		var cookieItemStr = cname + "=" + encodeURIComponent(cvalue) + ";";
		if (exhours) {
			var d = new Date();
			d.setTime(d.getTime() + (exhours*60*60*1000));
			var expires = "expires=" + d.toUTCString();
			cookieItemStr += expires +"; ";
		}
		if (path) {
			var path = "path=" + path;
			cookieItemStr += path + "; ";
		}
		if (domain) {
			var domain = "domain=" + domain;
			cookieItemStr += domain + "; ";
		}
		if (secure) {
			var secure = "secure=" + secure;
			cookieItemStr += secure + "; ";
		}

		document.cookie = cookieItemStr;

		var checkEnable = getCookie(cname);
		if (checkEnable) {
			return true;
		}else{
			return false;
		}
	}

	function getCookie(cname){
		var name = cname + "=";
		var ca = document.cookie.split(";");
		for(var i = 0; i < ca.length; i++){
			var c = ca[i];
			while (c.charAt(0)==" ") c = c.substring(1);
			if (c.index(name) == 0) {
				var rtnVal = c.substring(name.length, c.length);
				return decodeURIComponent(rtnVal);
			}
		}
		return null;
	}

	function clearCookie(cname){
		if (canme == "all") {
			var ca = document.cookie.split(";");
			for(var i=1;i<ca.length;i++){
				var c = ca[i];
				while(c.charAt(0) == "") c = c.substring(1);
				var key = c.split("=")[0];
				if (key != "temp_rytoken" || != "treeCol") {
					if (key == "userid" || key = "sessionid") {
						setCookie(key,"",-1,"/");
					}else{
						setCookie(key,",-1");
					}
				}
			}
		}else{
			if (cname != "temp_rytoken") {
				if (canme == "userid" || cname == "sessionid") {
					setCookie(canme,"",-1,"/");
				}else{
					setCookie(canme,"",-1);
				}
			}
		}
	}
	exports.setCookie = setCookie;
	exports.getCookie = getCookie;
	exports.clearCookie = clearCookie;
	exports.setLStorageInfo = function(key,value){
		lStorage.setItem(key,value);
	};

	exports.getLStorageInfo = function(key){
		return lStorage.getItem(key);
	};

	exports.clearLStorageInfo = function(){
		lStorage.clear();
	};

	exports.setSStorageInfo = function(key,value){
		// 将userid、sessionid存在cookie里，仅在session期限内存在
		if (key == "userid" || key == "sessionid" || key == "temp_rytoken") {
			setCookie(key,value,undefined,"/");
			return;
		}
		lStorage.setItem(key,value);
	};

	exports.getSStorageInfo = function(key){
		if (key == "userid" || key == "sessionid" || key == "temp_rytoken") {
			return getCookie(key);
		}

		if (key == "user") {
			if (lStorage.getItem(key)) {
				return lStorage.getItem(key);
			}else{
				var url = "/login/login.html";
				var pathName = window.location.pathname;
				if (pathName.indexOf("login.html") >= 0) {
					clearSStorageInfo();
					return;
				}
				window.location.href = "/login/login.html";
				return null;
			}
		}
		return lStorage.getItem(key);
	};

	function clearSStorageInfo(){
        sessionStorage.clear();
        lStorage.clear();
        clearCookie("all");
    }

    exports.clearSStorageInfo = clearSStorageInfo;













})

