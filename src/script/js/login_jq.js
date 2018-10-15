define(['config'],function(){
    require(['jquery','jquerycookie','jqueryvalidate'],function($,jquerycookie,jqueryvalidate){
        // 1.引入公共尾部
        !function(){
            $('#footer').load('footer.html #gome-footer');
        }();
        // 2.登录
        !function(){
            var $errtip=$('.err-tip p');
            var $name=$('.name input');
            var $pass=$('.pass input');
            // 2.4判断是否存在cookie
            if($.cookie('username')){
                $name.val($.cookie('username'));
                $('#auto').attr('checked','checked');
            }
            $('.submit').on('click',function(){
                var $namevalue=$('.name input').val();
                var $passvalue=$('.pass input').val();
                // 2.1判断用户名和密码是否为空
                if($namevalue!='' && $passvalue!=''){
                    $errtip.parent().hide();
                    $.ajax({
                        type:'post',
                        url:'http://10.31.162.61/myself/gome/php/login.php',
                        data:{
                            name:$('.name input').val(),
                            pass:$('.pass input').val()
                        }
                    }).done(function(d){  //2.2判断是否存在用户名
                        if(d){ //存在用户名
                            window.location.href="index.html";
                            // 2.3判断是否选中自动登录
                            if($('#auto:checked')){ //选中，则存入cookie
                                $.cookie('username',$('.name input').val(),{ expires: 7 });
                            }else{
                                $.cookie('username', null);
                                $('#auto').attr('checked','');
                            }
                        }else{
                            $errtip.html('账号或密码不匹配，请重新输入').parent().show();
                        }
                    });
                }else if($namevalue==''){ //用户名为空，错误提示出现，边框颜色变红
                    $errtip.html('请输入用户名').parent().show();
                    $name.css({borderColor:'#ff5757'});
                }else if($passvalue==''){ //密码为空，错误提示出现，边框颜色变红
                    $errtip.html('请输入密码').parent().show();
                    $pass.css({borderColor:'#ff5757'});
                }
                // 2.5当输入框获得焦点时，边框颜色变为a5a5a5
                $name.on('focus',function(){
                    $(this).css({borderColor:'#a5a5a5'});
                });
                $pass.on('focus',function(){
                    $(this).css({borderColor:'#a5a5a5'});
                });
            });
            // 2.6登录框点击按钮显示或隐藏
            var bstate=true;
            var $more=$('.more');
            var $show_hide=$('.show-hide');
            $more.on('click',function(){
                if(bstate){
                    bstate=false;
                    $show_hide.removeClass('hide').addClass('show');
                    $(this).css({'background-position':'0 -25px'})
                }else{
                    bstate=true;
                    $show_hide.removeClass('show').addClass('hide');
                    $(this).css({'background-position':'0 0'})
                }
            });
        }();
    });
});
