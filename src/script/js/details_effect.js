define(['details_data','../thirdplugins/jquery'],function(){
    return {
        // 放大镜效果
        magnifier:!function(){
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
        }()
    }
})