define(['details_data','config','tools'],function(data,jquery,tools){
    require(['jquery','jquerycookie','jqueryvalidate'],function(){
        // 1.放大镜效果
        !function(){
            var $spic=$('#spic');
            var $sf=$('#sf');
            var $bf=$('#bf');
            var $bpic=$('#bpic');
            var $spicimg=$('#spic img');
            var $magnifier=$('.magnifier');
            // 2.1鼠标移到小图上，出现小放和大方，反之消失
            $spic.hover(function(){
                $sf.css('visibility','visible');
                $bf.css('visibility','visible');
                // 2.2设置小放的尺寸
                $sf.width($spic.width()*$bf.width()/$bpic.width());
                $sf.height($spic.height()*$bf.height()/$bpic.height());
                // 设置比例
                var $bili=$bpic.width()/$spic.width();
                // 2.3鼠标在小图上移动,小放跟着鼠标移动
                $spic.on('mousemove',function(ev){
                    var $l=ev.pageX-$sf.width()/2-$magnifier.offset().left;
                    var $t=ev.pageY-$sf.height()/2-$magnifier.offset().top;
                    if($l<0){
                        $l=0;
                    }else if($l>$spic.width()-$sf.width()){
                        $l=$spic.width()-$sf.width();
                    }
                    if($t<0){
                        $t=0;
                    }else if($t>$spic.height()-$sf.height()){
                        $t=$spic.height()-$sf.height();
                    }
                    $sf.css('left',$l);
                    $sf.css('top',$t);
                    // 大图移动的left和top
                    $bpic.css('left',-$l*$bili);
                    $bpic.css('top',-$t*$bili);
                });
            },function(){
                $sf.css('visibility','hidden');
                $bf.css('visibility','hidden');
            });
            var $ul=$('#ulist #list ul');
            var $left=$('#ulist #left');
            var $right=$('#ulist #right');
            var $num=5;
            var $distance=85;
            // 滑过li添加样式，及改变放大镜大图和小图的src
            $ul.on('mouseover','li',function(){
                $(this).find('img').addClass('active');
                $(this).siblings('li').find('img').removeClass('active');
                $bpic.attr("src",$(this).find('img').attr("src"));
                $spicimg.attr("src",$(this).find('img').attr("src"));
            });
            // 点击左右按钮，出现上下的li
            $left.on('click',function(){
                if($num>5){
                    $num--;
                    $ul.animate({left:($num-5)*$distance})
                }
            });
            $right.on('click',function(){
                var $li=$ul.children('li').size();
                if($num<$li){
                    $num++;
                    $ul.animate({left:-($num-5)*$distance})
                }
            });
            // 点击版本添加对应样式
            var $prdmod=$('.prdmod');
            $prdmod.on('click',function(){
                $(this).find('a').addClass('select');
                $(this).siblings('.prdmod').find('a').removeClass('select');
            })
            // 点击颜色添加对应样式
            var $prd_img_item=$('.prd-img-item');
            $prd_img_item.on('click',function(){
                $(this).find('a').addClass('select');
                $(this).siblings('.prd-img-item').find('a').removeClass('select');
            })
        }(),
        // 2.加减数量，input输入数量
        !function(){
            var $qty=$('.qty');
            var $add=$('.add');
            var $reduce=$('.reduce');
            var $value=1;
            // 输入数量
            $qty.on('input',function(){
                $value=parseInt($qty.val());
                tools.reg_input($qty,$value);
                if($value>1){
                    $reduce.removeClass('disab');
                }else{
                    $reduce.addClass('disab');
                }
                if($value<99){
                    $add.removeClass('disab');
                }else{
                    $add.addClass('disab');
                }
            });
            // 加数量
            $add.on('click',function(){
                $value=parseInt($qty.val());
                $value++;
                if($value<99){
                    $add.removeClass('disab');
                    $reduce.removeClass('disab');
                    $qty.val($value);
                }else{
                    $qty.val(99);
                    $add.addClass('disab');
                }
            });
            // 减数量
            $reduce.on('click',function(){
                $value=parseInt($qty.val());
                $value--;
                if($value>1){
                    $qty.val($value);
                    $add.removeClass('disab');
                    $reduce.removeClass('disab');
                }else{
                    $qty.val(1);
                    $reduce.addClass('disab');
                }
            });
        }(),
        // 3.加入购物车，数据存入cookie
        !function(){
            var $sidarr=[];
            var $qtyarr=[];
            var $addcart=$('#addcart');
            var arr=[1,2,3];
            // 获取cookie
            function getcookie(){
                if($.cookie('cartsid') && $.cookie('cartqty')){
                    $sidarr=$.cookie('cartsid').split(','); //从cookie中获取过来的是字符串,所以需要转为数组
                    $qtyarr=$.cookie('cartqty').split(',');
                }
            }
            $addcart.on('click',function(){
                var $sid=location.search.substring(5);
                getcookie();
                if($.inArray($sid,$sidarr)!=-1){ //存在cookie
                    if($.cookie('cartqty')==null){ //如果数量为null
                        var $value=parseInt($('.qty').val());
                        $qtyarr[$.inArray($sid,$sidarr)]=$value; //sid和qty是一一对应的，通过sid的索引位置找到qty索引位置、
                        $.cookie('cartqty',$qtyarr.toString(),{expires:10});
                        $sidarr[$.inArray($sid,$sidarr)]=$sid;
                        $.cookie('cartsid',$sidarr.toString(),{expires:10});
                    }else{
                        //数量不为null，数组的数量加上input的数量
                        var $value=parseInt($qtyarr[$.inArray($sid,$sidarr)])+parseInt($('.qty').val()); 
                        $qtyarr[$.inArray($sid,$sidarr)]=$value;
                        $.cookie('cartqty',$qtyarr,{expires:10});
                    }
                }else{ //不存在cookie，将sid和qty追加到cookie中
                    $sidarr.push($sid);
                    $.cookie('cartsid',$sidarr,{expires:10});
                    $qtyarr.push($('.qty').val());
                    $.cookie('cartqty',$qtyarr,{expires:10});
                }
                $('.add-success').animate({opacity:1},1000).animate({opacity:0},1000);
            });
        }()
    })
})