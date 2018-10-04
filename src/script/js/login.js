!function($){
    // 引入公共尾部
    $('#footer').load('footer.html .gome-footer');
    // 登录
    var bstop=true;
        $('.submit').on('click',function(){
            console.log($('.name input').val());
            $.ajax({
                type:'post',
                url:'php/login.php',
                data:{
                    name:$('.name input').val(),
                    pass:$('.pass input').val()
                }
            }).done(function(d){
                if(d){
                    bstop=true;
                    window.location.href="index1.html";
                }else{
                    $('.name span').html('用户名不存在');
                    bstop=false;
                }
            })
            if(bstop){
                return false;
            }
        });
    // 登录框点击按钮显示或隐藏
    var bstop=true;
    var $more=$('.more');
    var $show_hide=$('.show-hide');
    $more.on('click',function(){
        if(bstop){
            bstop=false;
            $show_hide.removeClass('hide').addClass('show');
            $(this).css({'background-position':'0 -25px'})
        }else{
            bstop=true;
            $show_hide.removeClass('show').addClass('hide');
            $(this).css({'background-position':'0 0'})
        }
    });
}(jQuery);