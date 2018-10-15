define(['config','cart_data','../thirdplugins/jquery','tools'],function(config,data,jquery,tools){
    require(['jquery','jquerycookie'],function($,jquerycookie){
        // 1.获取cookie,添加购物车，对应商品显示
        !function(){
            var $sidarr=[];
            var $qtyarr=[];
            // 创建商品列表
            function create_cart(sid,num,beforebox){ //图片sid，商品qty,
                $.ajax({
                    url:'http://10.31.162.61/myself/gome/php/cartdata.php',
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
                            countpriceqty();
                        }
                    });
                });
            }
            // 1.页面加载检测购物车(cookie里面)是否有数据，有的话创建商品列表--详情页添加的商品
            if($.cookie('cartsid') && $.cookie('cartqty')){
                var $sidarr=$.cookie('cartsid').split(',');
                var $qtyarr=$.cookie('cartqty').split(',');
                $.each($sidarr,function(index,value){
                    create_cart(value,$qtyarr[index],$('.cart-bottom'));
                })
            }
            // 商品列表(cookie)不存在，购物车为空
            tools.if_exist($('.cart-empty-box'));
            // 推荐商品点击添加购物车
            var $item_btn=$('.container .container-item .item-btn');
            $item_btn.on('click',function(){ //点击推荐商品的加入购物车按钮
                var $sid=$(this).parent().find('.item-image img').attr('sid'); //获取对应的图片sid
                $(this).next().animate({opacity:1},1000).animate({opacity:0},1000); //添加购物车成功出现
                tools.cookietoArray(); //获取cookie，转为数组
                //判断点击的商品sid是否存在cookie中
                if($.inArray($sid,$sidarr)!=-1){ //存在cookie
                    var $cart_list=$('.cart-list:visible');
                    $.each($cart_list,function(index,ele){
                        if($sid==$(ele).find('img').attr('sid')){
                            var $num=$(ele).find('.cart-col-5 .count-input input').val(); //获取该sid商品列表中数量
                            $num++; //数量累加
                            $(ele).find('.cart-col-5 .count-input input').val($num); //重新赋值给input
                            var $dprice=$('.container-item .item-price').eq($sid-1).html(); //单价
                            var $total='¥ '+($dprice.substring(1)*$num).toFixed(2);
                            $(ele).find('.cart-col-6 .cart-amount').html($total);
                            $qtyarr[$.inArray($sid,$sidarr)]=$num;
                            $.cookie('cartqty',$qtyarr.toString(),{expires:10});
                            countpriceqty();
                        }
                    })
                }else{ //不存在cookie中
                    $sidarr.push($sid);
                    $.cookie('cartsid',$sidarr,{expires:10});
                    $qtyarr.push(1);
                    $.cookie('cartqty',$qtyarr,{expires:10});
                    create_cart($sid,1,$('.cart-bottom'));
                    countpriceqty();
                }
            });
            // input输入框修改数量，加数量和减数量
            var $gm_cart_lists=$('#gm-cart-lists');
            var $value=1;
            // 输入数量
            $gm_cart_lists.on('click','.count-input .qty',function(){
                $(this).on('input',function(){
                    $value=parseInt($(this).val());
                    tools.reg_input($(this),$value);
                    if($value>1){
                        $(this).parent().parent().find('.reduce').removeClass('count-disabled');
                    }else{
                        $(this).parent().parent().find('.reduce').addClass('count-disabled');
                    }
                    if($value<99){
                        $(this).parent().parent().find('.add').removeClass('count-disabled');
                    }else{
                        $(this).parent().parent().find('.add').addClass('count-disabled');
                    }
                    countpriceqty();
                });
            })
            // 加数量
            $gm_cart_lists.on('click','.cart-count .add',function(){
                var $qty=$(this).next().find('.qty');
                $value=parseInt($qty.val());
                $value++;
                if($value<99){
                    $(this).removeClass('count-disabled');
                    $(this).prev().removeClass('count-disabled');
                    $qty.val($value);
                }else{
                    $qty.val(99);
                    $(this).addClass('count-disabled');
                }
                countpriceqty();
                // $('.count-input input').val()
            });
            // 减数量
            $gm_cart_lists.on('click','.cart-count .reduce',function(){
                var $qty=$(this).parent().find('.qty');
                var $price=parseFloat($('.cart-list:visible .cart-shop-good .cart-amount').html().substring(2));
                console.log($price);
                $value=parseInt($qty.val());
                $value--;
                if($value>1){
                    $qty.val($value);
                    $(this).next().removeClass('count-disabled');
                    $(this).removeClass('count-disabled');
                    // $('.cart-shop-good .cart-amount').html('¥ '+$value*$price);
                }else{
                    $value=1;
                    $qty.val($value);
                    $(this).addClass('count-disabled');
                }
                $('.cart-shop-good .cart-amount').html('¥ '+($value*$price));
                countpriceqty();
            });
            // 计算总价和总数
            function countpriceqty(){
                var $countprice=0;
                var $countqty=0;
                var $cart_list=$('.cart-list:visible');
                $.each($cart_list,function(index,ele){
                    if($(ele).find('.cart-shop-good .cart-col-1 .checkbox_choose')){
                        $countprice+=(parseFloat($(ele).find('.cart-amount').html().substring(2)));
                        $countqty+=parseInt($(ele).find('.qty').val())
                    }
                });
                $countprice=$countprice.toFixed(2);
                $('.cart-bottom .bottom-total-pirce dd').html('¥'+$countprice);
                $('.cart-bottom .selected-qty').html($countqty);
            }
            // 计算数量改变后单个商品的价格
            function single_price(){
                var $dj = parseFloat(row.parents('.goods-item').find('.b-price').find('strong').html());
                var $cnum = parseInt(row.parents('.goods-item').find('.quantity-form input').val());
                return ($dj * $cnum).toFixed(2);
            }
        }();
    })
})

