require.config({baseUrl:"https://cdnjs.cloudflare.com/ajax/libs/",paths:{jquery:"jquery/1.12.4/jquery.min",jquerycookie:"jquery-cookie/1.4.1/jquery.cookie.min",jqueryvalidate:"jquery-validate/1.17.0/jquery.validate.min"}}),define("config",function(){}),define("login_jq",["config"],function(){require(["jquery","jquerycookie","jqueryvalidate"],function(e,o,n){!function(){e("#footer").load("footer.html #gome-footer")}(),function(){var o=e(".err-tip p"),n=e(".name input"),i=e(".pass input");e.cookie("username")&&(n.val(e.cookie("username")),e("#auto").attr("checked","checked")),e(".submit").on("click",function(){var a=e(".name input").val(),t=e(".pass input").val();""!=a&&""!=t?(o.parent().hide(),e.ajax({type:"post",url:"http://localhost/myself/gome/php/login.php",data:{name:e(".name input").val(),pass:e(".pass input").val()}}).done(function(n){n?(window.location.href="index.html",e("#auto:checked")?e.cookie("username",e(".name input").val(),{expires:7}):(e.cookie("username",null),e("#auto").attr("checked",""))):o.html("账号或密码不匹配，请重新输入").parent().show()})):""==a?(o.html("请输入用户名").parent().show(),n.css({borderColor:"#ff5757"})):""==t&&(o.html("请输入密码").parent().show(),i.css({borderColor:"#ff5757"})),n.on("focus",function(){e(this).css({borderColor:"#a5a5a5"})}),i.on("focus",function(){e(this).css({borderColor:"#a5a5a5"})})});var a=!0,t=e(".more"),r=e(".show-hide");t.on("click",function(){a?(a=!1,r.removeClass("hide").addClass("show"),e(this).css({"background-position":"0 -25px"})):(a=!0,r.removeClass("show").addClass("hide"),e(this).css({"background-position":"0 0"}))})}()})}),require(["login_jq"]),define("login",function(){});