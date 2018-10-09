define(['../thirdplugins/jquery'], function () {
    return {
        // 引入公共头部和尾部
        publich_h_f: !function () {
            $('#header').load('header.html');
            $('#footer').load('footer.html');
        }(),
        // banner效果
        banner_effect:!function(){
            var $banner=$('.banner');
            var $ol_btn=$('.gm-banner ol li');
            // alert($banner_btn.length);
            $ol_btn.hover(function(){
                
            });
        }(),
        // 美日必抢效果
        countdown_effect: !function () {
            // 点击按钮切换
            var $c_btnleft = $('.c-btn-left');
            var $c_btnright = $('.c-btn-right');
            var bstop = true;
            var $list1 = $('.list1');
            var $list2 = $('.list2');
            $c_btnleft.on('click', function () {
                if (bstop) {
                    bstop = false;
                    $list1.hide();
                    $list2.show();
                } else {
                    bstop = true;
                    $list1.show();
                    $list2.hide();
                }
            });
            $c_btnright.on('click', function () {
                if (bstop) {
                    bstop = false;
                    $list1.hide();
                    $list2.show();
                } else {
                    bstop = true;
                    $list1.show();
                    $list2.hide();
                }
            });
            // 倒计时
            var $time = '';
            function countDown() {
                var $future = new Date('2018-10-12 20:36:00');
                var $nowtime = new Date();
                $time = ($future - $nowtime) / 1000;
                var $h = parseInt($time % 86400 / 3600);
                var $m = parseInt($time % 3600 / 60);
                var $s = parseInt($time % 60);
                return '<em class="num">' + double($h) + '</em> : <em class="num">' + double($m) + '</em> : <em class="num">' + double($s) + '</em>';
            }
            // 补零
            function double(n) {
                return n < 10 ? '0' + n : n;
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
        // 楼层--幻灯片
        floor_slide:!function(){
            var $floor_slide=$('.floor-slide .slide li');
            var $prevbtn=$('.floor-slide .slide-btn .slide-prev');
            var $nextbtn=$('.floor-slide .slide-btn .slide-next');
            var $btnli=$('.floor-slide ol li');
            var $num=0;
            var $len=$floor_slide.size();
            $btnli.hover(function(){
                $num=$(this).index();
                $(this).addClass('cur').siblings('li').removeClass('cur');
                $floor_slide.eq($num).show().siblings('li').hide();
            })
            $prevbtn.on('click',function(){
                $num--;
                if($num<0){
                    $num=$len-1;
                }
                $floor_slide.eq($num).show().siblings('li').hide();
                $btnli.eq($num).addClass('cur').siblings('li').removeClass('cur');
            });
            $nextbtn.on('click',function(){
                $num++;
                if($num>$len-1){
                    $num=0;
                }
                $floor_slide.eq($num).show().siblings('li').hide();
                $btnli.eq($num).addClass('cur').siblings('li').removeClass('cur');
            });
            var timer=setInterval(function(){
                $num++;
                if($num>$len-1){
                    $num=0;
                }
                $floor_slide.eq($num).show().siblings('li').hide();
                $btnli.eq($num).addClass('cur').siblings('li').removeClass('cur');
            },5000);
        }(),
        // 楼层--tab切换
        floor_tab:!function(){
            var $tab_title=$('.gm-floor-t .tab li');
            var $mainlist=$('.floor-b-r .main');
            var $tab_btn=$('.floor-b-r .floor-tab-btn .tab-next');
            var $num=0;
            // 滑过切换
            $tab_title.hover(function(){
                $num=$(this).index();
                $(this).addClass('active').siblings('li').removeClass('active');
                $mainlist.eq($num).show().siblings('.main').hide();
            });
            // 点击切换
            $tab_btn.on('click',function(){
                $num++;
                if($num==$tab_title.size()){
                    $num=$tab_title.size()-1;
                }
                $tab_title.eq($num).addClass('active').siblings('li').removeClass('active');
                $mainlist.eq($num).show().siblings('.main').hide();
            })
        }()
    }
})