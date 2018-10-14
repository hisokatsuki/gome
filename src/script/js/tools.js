define(['../thirdplugins/jquery'],function(){
    return {
        // 1.补零
        double:function(n) {
            return n < 10 ? '0' + n : n;
        },
        // 2.楼层tab页切换
        floortab_switch:function(hoverele,clickele,showele,hideele1,hideele2,len,classname,num){
            hoverele.hover(function(){
                num=$(this).index();
                $(this).addClass(classname).siblings(hideele1).removeClass(classname);
                showele.eq(num).show().siblings(hideele2).hide();
            });
            clickele.on('click',function(){
                num++;
                if(num>=len){
                    num=len-1;
                }
                hoverele.eq(num).addClass(classname).siblings(hideele1).removeClass(classname);
                showele.eq(num).show().siblings(hideele2).hide();
            });
        },
        // 3.banner轮播--改变透明度
        shuffling:function(hoverele,showele,hideele,classname,num){
            hoverele.eq(num).addClass(classname).siblings(hideele).removeClass(classname);
            showele.children().eq(num).show().animate({opacity:1},800).siblings(hideele).hide().css({opacity:0});
        },
        // 4.美日必抢点击切换
        countdown_switch:function(list,num){
            list.eq(num).addClass('active').siblings().removeClass('active');
        },
        // 5.楼层第一个tab里的幻灯片
        tab_slide:function(hoverele,slide,prevbtn,nextbtn,showele,hideele,classname,len,num){
            function fadein_out(){
                hoverele.eq(num).addClass(classname).siblings(hideele).removeClass(classname);
                showele.eq(num).stop(true,true).fadeIn("slow").siblings(hideele).fadeOut("slow");
            }
            hoverele.hover(function(){
                num=$(this).index();
                fadein_out();
            });
            prevbtn.on('click',function(){
                num--;
                if(num<0){
                    num=len-1;
                }
                fadein_out();
            });
            nextbtn.on('click',function(){
                num++;
                if(num>len-1){
                    num=0;
                }
                fadein_out();
            });
            // 轮播
            var timer=setInterval(function(){
                num++;
                if(num>len-1){
                    num=0;
                }
                fadein_out();
            },5000);
            // 鼠标移到上面停止轮播，移出继续轮播
            slide.hover(function(){
                clearInterval(timer);
            },function(){
                timer=setInterval(function(){
                    num++;
                    if(num>len-1){
                        num=0;
                    }
                    fadein_out();
                },5000);
            });
        },
        // 6.输入数量的input设置输入规则
        reg_input:function(ele,value){
            var $reg=/^\d+$/g;
            if($reg.test(value)){
                if($(ele).val()>99){
                    $(ele).val(99);
                }else if($(ele).val()<1){
                    $(ele).val(1);
                }else{
                    $(ele).val(value);
                }
            }else{
                $(ele).val(1);
            }
        },
        // 7.购物车--cookie值转数组
        cookietoArray:function(){
            if($.cookie('cartsid')){
                $sidarr=$.cookie('cartsid').split(',');
            }
            if($.cookie('cartqty')){
                $qtyarr=$.cookie('cartqty').split(',');
            }
        },
        // 8.购物车--创建商品列表
        create_cart:function(sid,num,beforebox){ //图片sid，商品qty,
            $.ajax({
                url:'http://localhost/myself/gome/php/cartdata.php',
                dataType:'json'
            }).done(function(data){
                $.each(data,function(index,ele){
                    if(sid==ele.sid){
                        var $clone=$('.cart-list:hidden').clone(true); //对隐藏的商品列表进行克隆
                        $clone.find('.cart-col-2 img').attr('src',ele.url); //图片路径
                        $clone.find('.cart-col-2 img').attr('sid',ele.sid); //属性sid
                        $clone.find('.cart-col-3 .cart-name a').html(ele.title); //标题
                        $clone.find('.cart-col-4 .cart-price').html('¥ '+ele.price.substring(1)); //价格
                        $clone.find('.cart-col-5 .count-input input').val(num); //input数量框
                        $clone.css('display','block'); //克隆的商品列表是隐藏的，显示出来
                        $('.cart-title').show();
                        $('.cart-bottom').show();
                        $clone.insertBefore(beforebox); //插入到cart-bottom之前
                        var $dprice=parseFloat(ele.price.substring(1)); //单价
                        var $total='¥ '+($dprice*num).toFixed(2);
                        $clone.find('.cart-col-6 .cart-amount').html($total);
                    }
                });
            });
        },
        // 购物车--商品列表不存在，购物车为空
        if_exist:function(ele){
            if($.cookie('cartsid')){
                ele.hide();
            }else{
                ele.show();
            }
        }
    }
})