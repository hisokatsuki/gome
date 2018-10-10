define(['../thirdplugins/jquery'], function () {
    return {
        // 1.引入公共头部和尾部
        publich_h_f: !function () {
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
            // 滑过切换
            $ol_btn.hover(function(){
                $num=$(this).index();
                $(this).addClass('active').siblings('li').removeClass('active');
                $banner.children().eq($num).show().animate({opacity:1},800).siblings('li').hide().css({opacity:0});
            });
            // 点击切换
            $btnleft.on('click',function(){
                $num--;
                if($num<0){
                    $num=$len-1;
                }
                $ol_btn.eq($num).addClass('active').siblings('li').removeClass('active');
                $banner.children().eq($num).show().animate({opacity:1},800).siblings('li').hide().css({opacity:0});
            });
            $btnright.on('click',function(){
                $num++;
                if($num>$len-1){
                    $num=0;
                }
                $ol_btn.eq($num).addClass('active').siblings('li').removeClass('active');
                $banner.children().eq($num).show().animate({opacity:1},800).siblings('li').hide().css({opacity:0});
            });
            // banner轮播
            var timer=setInterval(function(){
                $num++;
                if($num>$len-1){
                    $num=0;
                }
                $ol_btn.eq($num).addClass('active').siblings('li').removeClass('active');
                $banner.children().eq($num).show().animate({opacity:1},800).siblings('li').hide().css({opacity:0});
            },5000);
            // 鼠标移到图片上停止轮播,移出继续轮播
            $banner.hover(function(){
                clearInterval(timer);
            },function(){
                timer=setInterval(function(){
                    $num++;
                    if($num>$len-1){
                        $num=0;
                    }
                    $ol_btn.eq($num).addClass('active').siblings('li').removeClass('active');
                    $banner.children().eq($num).show().animate({opacity:1},800).siblings('li').hide().css({opacity:0});
                },5000);
            });
        }(),
        // 二级导航效果
        subnav_effect:!function(){
            var $header=$('#header');
            $header.on('mouseover','#gome-category .gm-nav .nav-item',function(){
                $header.find('.subnav').show();
                $header.find('.subnav-content').eq($(this).index()).show().siblings('.subnav-content').hide();
            });
            $header.on('mouseout','#gome-category .gm-nav .nav-item',function(){
                $header.find('.subnav').hide();
                $header.find('.subnav-content').eq($(this).index()).hide();
            });
        }(),
        // 3.美日必抢效果
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
        // 4.楼层--幻灯片
        floor_slide:!function(){
            var $floorslide=$('.floor-slide');
            var $floor_slide=$('.floor-slide .slide li');
            var $prevbtn=$('.floor-slide .slide-btn .slide-prev');
            var $nextbtn=$('.floor-slide .slide-btn .slide-next');
            var $btnli=$('.floor-slide ol li');
            var $num=0;
            var $len=$floor_slide.size();
            $btnli.hover(function(){
                $num=$(this).index();
                $(this).addClass('cur').siblings('li').removeClass('cur');
                // $floor_slide.eq($num).show().animate({opacity:1}).siblings('li').animate({opacity:0}).hide();
                $floor_slide.eq($num).show().siblings('li').hide();
            })
            $prevbtn.on('click',function(){
                $num--;
                if($num<0){
                    $num=$len-1;
                }
                $floor_slide.eq($num).animate({opactiy:1}).siblings('li').animate({opactiy:0});
                $floor_slide.eq($num).show().siblings('li').hide();
                $btnli.eq($num).addClass('cur').siblings('li').removeClass('cur');
            });
            $nextbtn.on('click',function(){
                $num++;
                if($num>$len-1){
                    $num=0;
                }
                $floor_slide.eq($num).animate({opactiy:1}).siblings('li').animate({opactiy:0});
                $floor_slide.eq($num).show().siblings('li').hide();
                $btnli.eq($num).addClass('cur').siblings('li').removeClass('cur');
            });
            // 轮播
            var timer=setInterval(function(){
                $num++;
                if($num>$len-1){
                    $num=0;
                }
                $floor_slide.eq($num).animate({opactiy:1}).siblings('li').animate({opactiy:0});
                $floor_slide.eq($num).show().siblings('li').hide();
                $btnli.eq($num).addClass('cur').siblings('li').removeClass('cur');
            },5000);
            // 鼠标移到上面停止轮播，移出继续轮播
            $floorslide.hover(function(){
                clearInterval(timer);
            },function(){
                timer=setInterval(function(){
                    $num++;
                    if($num>$len-1){
                        $num=0;
                    }
                $floor_slide.eq($num).animate({opactiy:1}).siblings('li').animate({opactiy:0});
                $floor_slide.eq($num).show().siblings('li').hide();
                    $btnli.eq($num).addClass('cur').siblings('li').removeClass('cur');
                },5000);
            });
        }(),
        // 5.楼层--tab切换
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
        }(),
        // 楼梯效果
        stairs_effect:!function(){
            var $gm_stairs=$('#gm-stairs'); //楼梯导航
            var $stairs=$('.stairs'); //楼梯
            var $gm_floor=$('.gm-floor'); //楼层
            // 滚动条拉到一定距离，出现楼梯导航
            $(window).on('scroll',function(){
                var $scrolltop=$(window).scrollTop();
                if($scrolltop>1800){
                    $gm_stairs.show();
                }else{
                    $gm_stairs.hide();
                }
                $gm_floor.each(function(index,ele){
                    var $top=$gm_floor.eq(index).offset().top;
                    if($top>$scrolltop){
                        $stairs.removeClass('current');
                        $stairs.eq(index).addClass('current');
                        return false;
                    }
                });
            });
        }()
    }
})