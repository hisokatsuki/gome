!function($){
    // 1.引入公共尾部
    $('#footer').load('footer.html #gome-footer');
    // 2.遮罩和协议
    // 2.1点击同意协议，隐藏遮罩和协议
    var $yes=$('.yes');
    var $hide=$('#agreement,#mask');
    $yes.on('click',function(){
        $hide.hide();
    })
    // 2.2协议水平垂直居中
    var $agreement=$('#agreement');
    var $window=$(window);
    var $l=($window.width()-$agreement.outerWidth())/2;
    var $t=($window.height()-$agreement.outerHeight())/2;
    $agreement.css({
        'left':$l,
        'top':$t
    });
    $window.on('resize',function(){
        $agreement.css({
            'left':$l,
            'top':$t
        });
    });
    // 3.注册
    var $regbtn=$('.reg_btn');
    var $uname=$('#uname');
    var $pass=$('#pass');
    var $cpass=$('#c_pass');
    var $mobile=$('#mobile');
    var $name_correct=$('.form-name .correct');
    var $name_focusbox=$('.form-name .focus-box');
    var $name_blurbox=$('.form-name .blur-box');
    var $pass_correct=$('.form-pass .correct');
    var $pass_focusbox=$('.form-pass .focus-box');
    var $pass_blurbox=$('.form-pass .blur-box');
    var $cpass_correct=$('.form-c-pass .correct');
    var $cpass_focusbox=$('.form-c-pass .focus-box');
    var $cpass_blurbox=$('.form-c-pass .blur-box');
    var $mobile_correct=$('.form-mobile .correct');
    var $mobile_focusbox=$('.form-mobile .focus-box');
    var $mobile_blurbox=$('.form-mobile .blur-box');
    // 2.点击输入框时，出现提示
    $('input').on('click',function(){
        $(this).css({borderColor:'#a5a5a5'});
        $(this).parent().find('.focus-box').show();
        $(this).parent().find('.blur-box').hide();
    });
    // 失去焦点时，出现相应提示
    $('input').on('blur',function(){
        if($(this).val()==''){
            $(this).css({borderColor:'#ff5757'});
            $name_correct.hide();
            $(this).parent().find('.focus-box').hide();
            $(this).parent().find('.blur-box').show(); 
        }
    });
    // 输入用户名时，进行相应判断
    $uname.on('blur',function(){
        if($uname.val()!=''){
            $name_focusbox.hide();
            $.ajax({
                type:'post',
                url:'http://localhost/myself/gome/php/register.php',
                data:{
                    name:$uname.val()
                }
            }).done(function(d){
                if(!d){
                    $name_correct.show();
                }else{
                    $name_correct.hide();
                    $name_blurbox.html('<p>该用户名已存在，立刻<a href="login.html" style="color:#069">登录</a>或更换用户名</p>').show();
                }
            });
        }else{
            $name_blurbox.html('<p>请输入用户名</p>').show();
        }
    });
    // 输入密码时，进行相应判断
    $pass.on('blur',function(){
        if($pass.val()!=''){
            $pass_focusbox.hide();
            if($pass.val().length<6){
                $pass_correct.hide();
                $pass_blurbox.html('<p>长度应为6-20个字符</p>').show();
            }else{
                $pass_correct.show();
            }
        }else{
            $pass_correct.hide();
        }
    });
    // 输入确认密码时，进行相应判断
    $cpass.on('blur',function(){
        if($cpass.val()!=''){
            $cpass_focusbox.hide();
            if($cpass.val()==$pass.val()){
                $cpass_correct.show();
            }else{
                $cpass_correct.hide();
                $cpass_blurbox.html('<p>两次密码不一致</p>').show();
            }
        }else{
            $cpass_correct.hide();
        }
    });
    // 输入手机号时，进行相应判断
    var $reg_mobile=/^[1][35789]\d{9}$/;
    $mobile.on('blur',function(){
        if($mobile.val()!=''){
            $mobile_focusbox.hide();
            if($reg_mobile.test($mobile.val())){
                $mobile_correct.show();
            }else{
                $mobile_correct.hide();
                $mobile_blurbox.html('<p>手机号码格式有误，请重新输入</p>').show();
            }
        }else{
            $mobile_correct.hide();
        }
    });
    // 点击注册按钮时，判断各个输入框是否为空
    $regbtn.on('click',function(){
        if($('#uname').val()==''){
            $('#uname').css({borderColor:'#ff5757'});
            $('.form-name .blur-box').show();
        }else if($('#pass').val()==''){
            $('#pass').css({borderColor:'#ff5757'});
            $('.form-pass .blur-box').show();
        }else if($('#c_pass').val()==''){
            $('#c_pass').css({borderColor:'#ff5757'});
            $('.form-c-pass .blur-box').show();
        }else if($('#mobile').val()==''){
            $('#mobile').css({borderColor:'#ff5757'});
            $('.form-mobile .blur-box').show();
        }
    });
}(jQuery);