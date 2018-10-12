define(['../thirdplugins/jquery','header'], function (jquery,header) {
    return {
        // 1.banner数据
        banner:!function(){
            $.ajax({
                url:'http://localhost/myself/gome/php/getdata.php',
                dataType:'json'
            }).done(function(d){
                var $d=d.bannerlist;
                var $bannerstr='';
                $.each($d,function(index,ele){
                    $bannerstr+='<li style="background:'+ele.color+'"><a href="#"><img class="lazyloading" src="'+ele.url+'"></a></li>';
                });
                var $banner=$('.banner');
                $banner.append($bannerstr);
            });
        }(),
        // 2.美日必抢数据
        countdown_data:!function () {
            var $countdownlist1 = $('.list1');
            var $countdownlist2 = $('.list2');
            $.ajax({
                type: 'get',
                url: 'http://localhost/myself/gome/php/getdata.php',
                dataType: 'json'
            }).done(function (data) {
                var $d = data.countdown;
                var $list1 = '';
                var $list2 = '';
                $.each($d, function (index, ele) {
                    if (index < 4) {
                        $list1 += '<li><a href="#"><img class="lazyloading" src="'+ele.url+'"><div class="countdown-price"><span>￥</span><i>'+ele.price+'</i><i class="del">¥'+ele.delprice+'</i></div><p>'+ele.title+'</p></a></li>';
                    } else {
                        $list2 +='<li><a href="#"><img class="lazyloading" src="'+ele.url+'"><div class="countdown-price"><span>￥</span><i>'+ele.price+'</i><i class="del">¥'+ele.delprice+'</i></div><p>'+ele.title+'</p></a></li>';
                    }
                });
                $countdownlist1.html($list1);
                $countdownlist2.html($list2);
            });
        }(),
        // 3.楼层第一个tab页数据--精选热卖
        floor_first:!function(){
            
            $.ajax({
                url:'http://localhost/myself/gome/php/getdata.php',
                dataType:'json'
            }).done(function(d){
                var $d=d.floorfirst;
                function floorfirst(floorimgs,num){
                    var $floorimgs=floorimgs;
                    var $floorstr='<ul>';
                    $.each($d,function(i,ele){
                        if(ele.floor_num==num){
                            $floorstr+='<li><a href="#"><img class="lazyloading" src="'+ele.url+'"></a></li>';
                        }
                    });
                    $floorstr+='</ul>';  
                    $floorimgs.html($floorstr);
                }
                $(window).on('scroll',function(){
                    var $top=0;
                    var $scrolltop=$('html,body').scrollTop();
                    var $floors=$('.gm-floor');
                    $.each($floors,function(index,ele){
                        $top=$(ele).offset().top-$(ele).height();
                        if($top<=$scrolltop){
                            floorfirst($(ele).find('.floor-imgs'),index+1);
                        }                    
                    });
                });
            });
        }(),
        // 4.楼层其他tab页数据
        floor:!function(){
            $.ajax({
                url:'http://localhost/myself/gome/php/getdata.php',
                dataType:'json'
            }).done(function(d){
                var $d=d.floorlist;
                function floorlist(mainlist,type){
                    var $mainlist=mainlist;
                    var $floorlist=[];
                    $.each($mainlist,function(index){
                        $floorlist[index]='<ul class="tab-item">';
                        $.each($d,function(i,ele){
                            if(ele.type==type && ele.tabpage==index+1){
                                $floorlist[index]+='<li><a href="http://localhost/myself/gome/src/details.html?sid='+ele.sid+'" target="_blank"><img class="lazyloading" src="'+ele.url+'" alt="'+ele.title+'" sid="'+ele.sid+'"><p class="p_name">'+ele.title+'</p><p class="p_price">'+ele.price+'</p></a></li>';
                            }
                        });
                        $floorlist[index]+='</ul>';  
                        $($mainlist[index]).html($floorlist[index]);
                    });
                }
                $(window).on('scroll',function(){
                    var $top=0;
                    var $scrolltop=$('html,body').scrollTop();
                    var $floors=$('.gm-floor');
                    $.each($floors,function(index,ele){
                        $top=$(ele).offset().top-$(ele).height();
                        if($top<=$scrolltop){
                            floorfirst($(ele).find('.floor-imgs'),index+1);
                        }                    
                    });
                });
                floorlist($('.gm-floor-1 .floor-b-r .mainlist'),'手机');
                floorlist($('.gm-floor-2 .floor-b-r .mainlist'),'电脑');
                floorlist($('.gm-floor-3 .floor-b-r .mainlist'),'电视');
                floorlist($('.gm-floor-4 .floor-b-r .mainlist'),'国美超市');
                floorlist($('.gm-floor-5 .floor-b-r .mainlist'),'国美超市');
                floorlist($('.gm-floor-6 .floor-b-r .mainlist'),'电视');
                floorlist($('.gm-floor-7 .floor-b-r .mainlist'),'电视');
                floorlist($('.gm-floor-8 .floor-b-r .mainlist'),'电脑');
                floorlist($('.gm-floor-9 .floor-b-r .mainlist'),'手机');
            });
        }()
    }
});