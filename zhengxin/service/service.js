define(function(require,exports,moudule){
	var config = require("../config/config");
	var utils = require("../common/utils");
	var isLogoutAlert = false;//登陆超时表识
	/**
	 * 向后台发送请求
	 * @param param 请求参数
	 * url 接口名
	 * @param callbackFunc 请求完成的回调函数 返回值是 dataType
	 */
	exports.invokeServer = function(param,url,callbackFunc){
		$.ajax({
			type : "POST",
			url : config.serverPath + service,
			data : param,
			dataType : "JSON",
			success : function(data){
				callbackFunc(data);
			}
			error : function(data){
				callbackFunc(data);
			}
		})
	 	/*var xhr = getXhr();
	 	param = parseParam(param);
	 	xhr.open("post",config.serverPath + url,true);
	 	xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
	 	//将数据以名值对的方式发送给后台
	 	xhr.onreadystatechange = function(){
	 		if (xhr.readyState == 4 && xhr.status == 200) {
	 			var data = JSON.parse(xhr.responseText);
	 			var code == data.header.code;
	 			if (code == "ETS-5BP9951" || code == "-120") {
	 				if (isLogoutAlert) {
	 					return;
	 				}
	 				isLogoutAlert = true;
	 				utils.clearSStorageInfo();
	 				utils.setSStorageInfo("isLogout","true");
	 				wundow.location.href = "./login.html?from=back";
	 				return;
	 			}
	 			data.param = JSON.parse(param);
	 			callbackFunc(data);
	 		}y
	 	};
	 	xhr.send(param);
	 	return xhr;*/
	}

	/**
	 *将JSON对象转换为 key = value 的形式
	 */
	function parseParam(param){
		var parseResult = "";
		parseResult = JSON.stringify(param);
		return parseResult;
	}

	/**
	 *获取 ajax 对象
	 */
	function getXhr(){
		if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		}else{
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	/**
	 *获取参数
	 */
	exports.getRequest = function(){
		var url = decodeURIComponent(location.search);//获取url中"?"符后的字符串
		var theRequest = new Object();
		if (url.index("?") != -1) {
			var str = url.substr(1);
			var strs = str.split("&");
			for(var i = 0; i < strs.length; i++){
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
})