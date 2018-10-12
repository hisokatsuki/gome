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
                var $future = new Date('2018-10-12 20:36:00');
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
            var $floorslide1=$('.gm-floor-1 .floor-slide');
            var $floor_slide1=$('.gm-floor-1 .floor-slide .slide li');
            var $prevbtn1=$('.gm-floor-1 .slide-btn .slide-prev');
            var $nextbtn1=$('.gm-floor-1 .slide-btn .slide-next');
            var $btnli1=$('.gm-floor-1 .floor-slide ol li');
            var $floorslide2=$('.gm-floor-2 .floor-slide');
            var $floor_slide2=$('.gm-floor-2 .floor-slide .slide li');
            var $prevbtn2=$('.gm-floor-2 .slide-btn .slide-prev');
            var $nextbtn2=$('.gm-floor-2 .slide-btn .slide-next');
            var $btnli2=$('.gm-floor-2 .floor-slide ol li');
            var $floorslide3=$('.gm-floor-3 .floor-slide');
            var $floor_slide3=$('.gm-floor-3 .floor-slide .slide li');
            var $prevbtn3=$('.gm-floor-3 .slide-btn .slide-prev');
            var $nextbtn3=$('.gm-floor-3 .slide-btn .slide-next');
            var $btnli3=$('.gm-floor-3 .floor-slide ol li');
            var $floorslide4=$('.gm-floor-4 .floor-slide');
            var $floor_slide4=$('.gm-floor-4 .floor-slide .slide li');
            var $prevbtn4=$('.gm-floor-4 .slide-btn .slide-prev');
            var $nextbtn4=$('.gm-floor-4 .slide-btn .slide-next');
            var $btnli4=$('.gm-floor-4 .floor-slide ol li');
            var $floorslide5=$('.gm-floor-5 .floor-slide');
            var $floor_slide5=$('.gm-floor-5 .floor-slide .slide li');
            var $prevbtn5=$('.gm-floor-5 .slide-btn .slide-prev');
            var $nextbtn5=$('.gm-floor-5 .slide-btn .slide-next');
            var $btnli5=$('.gm-floor-5 .floor-slide ol li');
            var $floorslide6=$('.gm-floor-6 .floor-slide');
            var $floor_slide6=$('.gm-floor-6 .floor-slide .slide li');
            var $prevbtn6=$('.gm-floor-6 .slide-btn .slide-prev');
            var $nextbtn6=$('.gm-floor-6 .slide-btn .slide-next');
            var $btnli6=$('.gm-floor-6 .floor-slide ol li');
            var $floorslide7=$('.gm-floor-7 .floor-slide');
            var $floor_slide7=$('.gm-floor-7 .floor-slide .slide li');
            var $prevbtn7=$('.gm-floor-7 .slide-btn .slide-prev');
            var $nextbtn7=$('.gm-floor-7 .slide-btn .slide-next');
            var $btnli7=$('.gm-floor-7 .floor-slide ol li');
            var $floorslide8=$('.gm-floor-8 .floor-slide');
            var $floor_slide8=$('.gm-floor-8 .floor-slide .slide li');
            var $prevbtn8=$('.gm-floor-8 .slide-btn .slide-prev');
            var $nextbtn8=$('.gm-floor-8 .slide-btn .slide-next');
            var $btnli8=$('.gm-floor-8 .floor-slide ol li');
            var $floorslide9=$('.gm-floor-9 .floor-slide');
            var $floor_slide9=$('.gm-floor-9 .floor-slide .slide li');
            var $prevbtn9=$('.gm-floor-9 .slide-btn .slide-prev');
            var $nextbtn9=$('.gm-floor-9 .slide-btn .slide-next');
            var $btnli9=$('.gm-floor-9 .floor-slide ol li');
            var $num=0;
            tools.tab_slide($btnli1,$floorslide1,$prevbtn1,$nextbtn1,$floor_slide1,'li','cur',$floor_slide1.size(),$num);
            tools.tab_slide($btnli2,$floorslide2,$prevbtn2,$nextbtn2,$floor_slide2,'li','cur',$floor_slide2.size(),$num);
            tools.tab_slide($btnli3,$floorslide3,$prevbtn3,$nextbtn3,$floor_slide3,'li','cur',$floor_slide3.size(),$num);
            tools.tab_slide($btnli4,$floorslide4,$prevbtn4,$nextbtn4,$floor_slide4,'li','cur',$floor_slide4.size(),$num);
            tools.tab_slide($btnli5,$floorslide5,$prevbtn5,$nextbtn5,$floor_slide5,'li','cur',$floor_slide5.size(),$num);
            tools.tab_slide($btnli6,$floorslide6,$prevbtn6,$nextbtn6,$floor_slide6,'li','cur',$floor_slide6.size(),$num);
            tools.tab_slide($btnli7,$floorslide7,$prevbtn7,$nextbtn7,$floor_slide7,'li','cur',$floor_slide7.size(),$num);
            tools.tab_slide($btnli8,$floorslide8,$prevbtn8,$nextbtn8,$floor_slide8,'li','cur',$floor_slide8.size(),$num);
            tools.tab_slide($btnli9,$floorslide9,$prevbtn9,$nextbtn9,$floor_slide9,'li','cur',$floor_slide9.size(),$num);
        }(),
        // 6.九个楼层--tab切换
        floor_tab:!function(){
            var $tab_title1=$('.gm-floor-1 .gm-floor-t .tab li');
            var $mainlist1=$('.gm-floor-1 .floor-b-r .main');
            var $tab_btn1=$('.gm-floor-1 .floor-b-r .tab-next');
            var $tab_title2=$('.gm-floor-2 .gm-floor-t .tab li');
            var $mainlist2=$('.gm-floor-2 .floor-b-r .main');
            var $tab_btn2=$('.gm-floor-2 .floor-b-r .tab-next');
            var $tab_title3=$('.gm-floor-3 .gm-floor-t .tab li');
            var $mainlist3=$('.gm-floor-3 .floor-b-r .main');
            var $tab_btn3=$('.gm-floor-3 .floor-b-r .tab-next');
            var $tab_title4=$('.gm-floor-4 .gm-floor-t .tab li');
            var $mainlist4=$('.gm-floor-4 .floor-b-r .main');
            var $tab_btn4=$('.gm-floor-4 .floor-b-r .tab-next');
            var $tab_title5=$('.gm-floor-5 .gm-floor-t .tab li');
            var $mainlist5=$('.gm-floor-5 .floor-b-r .main');
            var $tab_btn5=$('.gm-floor-5 .floor-b-r .tab-next');
            var $tab_title6=$('.gm-floor-6 .gm-floor-t .tab li');
            var $mainlist6=$('.gm-floor-6 .floor-b-r .main');
            var $tab_btn6=$('.gm-floor-6 .floor-b-r .tab-next');
            var $tab_title7=$('.gm-floor-7 .gm-floor-t .tab li');
            var $mainlist7=$('.gm-floor-7 .floor-b-r .main');
            var $tab_btn7=$('.gm-floor-7 .floor-b-r .tab-next');
            var $tab_title8=$('.gm-floor-8 .gm-floor-t .tab li');
            var $mainlist8=$('.gm-floor-8 .floor-b-r .main');
            var $tab_btn8=$('.gm-floor-8 .floor-b-r .tab-next');
            var $tab_title9=$('.gm-floor-9 .gm-floor-t .tab li');
            var $mainlist9=$('.gm-floor-9 .floor-b-r .main');
            var $tab_btn9=$('.gm-floor-9 .floor-b-r .tab-next');
            var $num=0;
            // 6.1滑过切换和点击切换
            tools.floortab_switch($tab_title1,$tab_btn1,$mainlist1,'li','.main',$tab_title1.size(),'active1',$num);
            tools.floortab_switch($tab_title2,$tab_btn2,$mainlist2,'li','.main',$tab_title2.size(),'active2',$num);
            tools.floortab_switch($tab_title3,$tab_btn3,$mainlist3,'li','.main',$tab_title3.size(),'active3',$num);
            tools.floortab_switch($tab_title4,$tab_btn4,$mainlist4,'li','.main',$tab_title4.size(),'active4',$num);
            tools.floortab_switch($tab_title5,$tab_btn5,$mainlist5,'li','.main',$tab_title5.size(),'active5',$num);
            tools.floortab_switch($tab_title6,$tab_btn6,$mainlist6,'li','.main',$tab_title6.size(),'active6',$num);
            tools.floortab_switch($tab_title7,$tab_btn7,$mainlist7,'li','.main',$tab_title7.size(),'active7',$num);
            tools.floortab_switch($tab_title8,$tab_btn8,$mainlist8,'li','.main',$tab_title8.size(),'active8',$num);
            tools.floortab_switch($tab_title9,$tab_btn9,$mainlist9,'li','.main',$tab_title9.size(),'active9',$num);
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