define(['config','cart_data','../thirdplugins/jquery','tools'],function(config,data,jquery,tools){
    require(['jquery','jquerycookie'],function($,jquerycookie){
        // 1.获取cookie,添加购物车，对应商品显示
        !function(){
            var $sidarr=[];
            var $qtyarr=[];
            // 1.页面加载检测购物车(cookie里面)是否有数据，有的话创建商品列表--详情页添加的商品
            if($.cookie('cartsid') && $.cookie('cartqty')){
                var $sidarr=$.cookie('cartsid').split(',');
                var $qtyarr=$.cookie('cartqty').split(',');
                $.each($sidarr,function(index,value){
                    tools.create_cart(value,$qtyarr[index],$('.gm-cart-lists'),$('.cart-bottom'));
                })
            }
            // 商品列表(cookie)不存在，购物车为空
            tools.if_exist($('.cart-empty-box'));
            // 推荐商品点击添加购物车
            console.log($('.container'))
            $('container').on('click','.container-item .item-btn',function(){
                $(this).next().animate({opacity:1},1000).animate({opacity:0},1000);
                
            });
        }();
    })
})

