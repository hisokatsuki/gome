define(['../thirdplugins/jquery','tools'], function (jquery,tools) {
    return {
        // 1.引入公共头部和尾部
        publich_h_f:!function(){
            $('#header').load('header.html');
            $('#footer').load('footer.html');
        }(),
        // 2.banner效果
        banner_effect:!function(){
            var $banner=$('.banner');
            var $ol_btn=$('.gm-banner ol li');
            var $btnleft=$('.banner-btn .btn-left');
            var $btnright=$('.banner-btn .btn-right');
            var $num=0;
            var $len=$ol_btn.size();
            // 2.1滑过切换
            $ol_btn.hover(function(){
                $num=$(this).index();
                tools.shuffling($ol_btn,$banner,'li','active',$num);
            });
            // 2.2点击切换
            $btnleft.on('click',function(){
                $num--;
                if($num<0){
                    $num=$len-1;
                }
                tools.shuffling($ol_btn,$banner,'li','active',$num);
            });
            $btnright.on('click',function(){
                $num++;
                if($num>$len-1){
                    $num=0;
                }
                tools.shuffling($ol_btn,$banner,'li','active',$num);
            });
            // 2.3banner轮播
            var timer=setInterval(function(){
                $num++;
                if($num>$len-1){
                    $num=0;
                }
                tools.shuffling($ol_btn,$banner,'li','active',$num);
            },5000);
            // 2.4鼠标移到图片上停止轮播,移出继续轮播
            $banner.hover(function(){
                clearInterval(timer);
            },function(){
                timer=setInterval(function(){
                    $num++;
                    if($num>$len-1){
                        $num=0;
                    }
                    tools.shuffling($ol_btn,$banner,'li','active',$num);
                },5000);
            });
        }(),
        // 4.美日必抢效果
        countdown_effect:!function(){
            // 4.1点击按钮切换
            var $c_btnleft = $('.c-btn-left');
            var $c_btnright = $('.c-btn-right');
            var $list = $('.countdown-list');
            var $num=0;
            $c_btnleft.on('click', function () {
                $num--;
                if($num<0){
                    $num=1;
                }
                tools.countdown_switch($list,$num);
            });
            $c_btnright.on('click', function () {
                $num++;
                if($num>1){
                    $num=0;
                }
                tools.countdown_switch($list,$num);
            });
            // 4.2倒计时
            var $time = '';
            function countDown() {
                var $future = new Date('2018-12-30 00:00:00');
                var $nowtime = new Date();
                $time = ($future - $nowtime) / 1000;
                var $h = parseInt($time % 86400 / 3600);
                var $m = parseInt($time % 3600 / 60);
                var $s = parseInt($time % 60);
                return '<em class="num">' + tools.double($h) + '</em> : <em class="num">' + tools.double($m) + '</em> : <em class="num">' + tools.double($s) + '</em>';
            }           
            var $timebox = $('.time-box i');
            var $countdownbox = $('#gm-countdown');
            var timer = null;
            $timebox.html(countDown());
            timer = setInterval(function () {
                $timebox.html(countDown());
                if ($time <= 0) {
                    clearInterval(timer);
                    $countdownbox.hide();
                }
            }, 1000);
        }(),
        // 5.楼层--幻灯片
        floor_slide:!function(){
            var $gm_floor=$('.gm-floor');
            var $num=0;
            $.each($gm_floor,function(index,ele){
                var $floorslide=$(ele).find('.floor-slide');
                var $floor_slide=$(ele).find('.floor-slide .slide li');
                var $prevbtn=$(ele).find('.slide-btn .slide-prev');
                var $nextbtn=$(ele).find('.slide-btn .slide-next');
                var $btnli=$(ele).find('.floor-slide ol li');
                tools.tab_slide($btnli,$floorslide,$prevbtn,$nextbtn,$floor_slide,'li','cur',$floor_slide.size(),$num);   
            })
        }(),
        // 6.九个楼层--tab切换
        floor_tab:!function(){
            var $num=0;
            var $gm_floor=$('.gm-floor');
            // 6.1滑过切换和点击切换
            $.each($gm_floor,function(index,ele){
                var $tab_title=$(ele).find('.gm-floor-t .tab li');
                var $mainlist=$(ele).find('.floor-b-r .main');
                var $tab_btn=$(ele).find('.floor-b-r .tab-next');
                var classname='active'+(index+1);
                tools.floortab_switch($tab_title,$tab_btn,$mainlist,'li','.main',$tab_title.size(),classname,$num);
    
            })
        }(),
        // 7.楼梯效果
        stairs_effect:!function(){
            var $gm_stairs=$('#gm-stairs'); //楼梯导航
            var $stairs=$('.stairs'); //楼梯
            var $gm_floor=$('.gm-floor'); //楼层
            // 7.1滚动条拉到一定距离，出现楼梯导航
            $(window).on('scroll',function(){
                var $scrolltop=$(window).scrollTop();
                var $firsttop=$gm_floor.eq(0).offset().top;
                if($scrolltop>$firsttop-400){
                    $gm_stairs.show();
                }else{
                    $gm_stairs.hide();
                }
                // 7.2拉动滚动条的时候。楼梯添加相应的类名
                $gm_floor.each(function(index,ele){
                    var $top=$gm_floor.eq(index).offset().top;
                    if($top+100>$scrolltop){
                        $stairs.removeClass('current');
                        $stairs.eq(index).addClass('current');
                        return false;
                    }
                });
            });
            // 7.3点击楼梯时，当前楼梯添加类名，对应楼层置顶
            $stairs.on('click',function(){
                var $top=$gm_floor.eq($(this).index()).offset().top;
                $(this).addClass('current').siblings('.stairs').removeClass('current');
                $('html,body').animate({
                    scrollTop:$top
                },1000)
            });
            // 7.4点击上箭头，置顶
            var $fl_up=$('.fl_goto .up');
            var $fl_down=$('.fl_goto .down');
            $fl_up.on('click',function(){
                $('html,body').animate({
                    scrollTop:0
                });
            });
            // 7.5点击下箭头，置底
            $fl_down.on('click',function(){
                $('html,body').animate({
                    scrollTop:7974
                });
            });
        }()
    }
})