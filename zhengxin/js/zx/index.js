define(function(require){
	$(function(){
		$(".search").find("input").focus(function(){
			var txt = $(this).val();
			if (txt == "请输入企业名、人名或其他关键词") {
				$(this).val("");
			}
		})
		$(".search").find("input").blur(function(){
			var txt = $(this).val();
			if (txt == "") {
				$(this).val("请输入企业名、人名或其他关键词");
			}
		})
		$(".hot-search").find("span").click(function(){
			var input = $(this).parents(".search").find("input");
			var txt = $(this).text();
			input.val(txt);
			tz(txt);
		});
		$("#search").click(function(){
			var txt = $("input").val();
			tz(txt);
		})
	})
	$(function(){
		var a = $(".head-nav ul").find("li").find("a");
		a.eq(1).click(function(){
			$("html body").animate({scrollTop:$(".service").offset().top}, 300);
		})
		a.eq(2).click(function(){
			$("body").animate({scrollTop:$(".bottom").offset().top}, 500);
		})
	})
	function tz(entname){
		window.open("./detail.html?entname"+entname);
	}
})