define(['config'],function(){
    require(['jquery','jquerycookie','jqueryvalidate'],function($,jquerycookie,jqueryvalidate){
        // 1.引入公共尾部
        !function(){
            $('#footer').load('footer.html #gome-footer');
        }();
        // 2.表单验证
        !function(){
            var $form=$('#form');
            var $uname=$('#uname');
            var $name_correct=$('.form-name .correct');
            var $name_blurbox=$('#uname-error');
            var bstop=true;
            // 2.1引用vilidate插件验证表单
            $form.validate({
                rules:{
                    username:{
                        required:true,
                        rangelength:[4,20]
                    },
                    password:{
                        required:true,
                        rangelength:[6,20]
                    },
                    c_password:{
                        required:true,
                        equalTo:"#password" 
                    },
                    mobile:{
                        required:true,
                        digits:true,
                        rangelength:[11,11]
                    }
                },
                messages:{
                    username:{
                        required:"请输入用户名",
                        rangelength:"用户名长度只能在4-20个字符之间"
                    },
                    password:{
                        required:"请输入密码",
                        rangelength:"长度应为6-20个字符"
                    },
                    c_password:{
                        required:"请输入密码",
                        equalTo:"两次密码不一致" 
                    },
                    mobile:{
                        required:"手机号不能为空",
                        digits:"手机号码格式有误，请重新输入",
                        rangelength:"手机号码格式有误，请重新输入"
                    }
                },
                // 验证成功出现正确的小图标
                success: function(label){
                    $(label).html('<i class="correct"></i>')
                }
            });
            // 2.2点击表单出现的样式
            var $input=$('input');
            $input.on('click',function(){
                $(this).css({borderColor:'#a5a5a5'});
                $(this).parent().find('.focus-box').show();
                $(this).parent().find('.blur-box').hide();
            });
            // 2.3失去焦点时，出现相应提示
            $input.on('blur',function(){
                $(this).parent().find('.focus-box').hide();
                $(this).parent().find('.blur-box').show(); 
                if($(this).val()==''){
                    $(this).css({borderColor:'#ff5757'});
                    $name_correct.hide();
                }
            });
            // 2.4传输表单数据，判断用户名是否存在数据库
            $uname.on('blur',function(){
                if($uname.val().length>=4){
                    $.ajax({
                        type:'post',
                        url:'http://localhost/myself/gome/php/register.php',
                        data:{
                            name:$uname.val()
                        }
                    }).done(function(d){
                        if(!d){
                            $name_correct.show();
                            $.cookie('username',$uname.val(),{ expires: 7 });
                            bstop=true;
                        }else{
                            $name_correct.hide();
                            $name_blurbox.html('该用户名已存在，立刻<a href="login.html" style="color:#069">登录</a>或更换用户名').show();
                            bstop=false;
                        }
                    });
                }else{
                    $name_correct.hide();
                    bstop=false;
                }
            });
            // 2.5点击注册按钮时，若验证不通过，阻止默认行为
            $form.on('submit',function(){
                if(!bstop){
                    return false;
                }
            });
        }();
    });
})