define(function(require){
	var service = require("../../service/service");
	var entname,punishbreak,punished;
	$(function(){
		$(".head-nav").find("input").focus(function(){
			var txt = $(this).val();
			if (txt == "请输入企业名、人名或其他关键词") {
				$(this).val("")
			}
		})
		$(".head-nav").find("input").blur(function(){
			var txt = $(this).val();
			if (txt == "") {
				$(this).val("请输入企业名、人名或其他关键词")
			}
		})
		entname = service.getRequest().entname;
		info();
		$("#fxxx").click(function(){
			riskInfo();
		})
		$(".s-btn").click(function(){
			var txt = $("input").val();
			window.open("./detail.html?entname"+txt);
		})
	})
	/*
	 * 风险信息
	 */
	function riskInfo(){
		var param = {
			"entname" : entname
		}
		service.invokeServer(param,"riskList.do",function(data){
			if (data == null || data == "-1") {
				return;
			}
			var messages = $("#message").find("table");
			if (data.data.cpws != null) {
				messages.eq(0).find("tr").eq(0).show();
				messages.eq(0).find("tr").eq(2).hide();
				var cpws = data.data.cpws.item;
				var mestab0 = messages.eq(0).find("tr").eq(1).find("td");
				mestab0.eq(0).html(cpws.sortTime);
				mestab0.eq(1).html(cpws.caseType);
				mestab0.eq(2).html(cpws.body);
				messages.eq(0).find("tr").eq(1).show();
			}
			if (data.data.ktgg != null) {
				messages.eq(3).find("tr").eq(0).show();
				messages.eq(3).find("tr").eq(2).hide();
				var ktgg = data.data.ktgg.item;
				var mestab3 = messages.eq(3).find("tr").eq(1).find("td");
				mestab3.eq(0).html(ktgg.sortTime);
				mestab3.eq(1).html(ktgg.caseNo);
				mestab3.eq(2).html(ktgg.caseCause);
				mestab3.eq(3).html(ktgg.body);
				if (ktgg.court.length > 0) {
					for(var i = 0; i < ktgg.court.length; i++){
						var br = "<br>";
						if (i == (ktgg.court.length - 1)) {
							br = "";
						}
						
					}
				}
			}
		})
	}
})