define(['../thirdplugins/jquery','header'], function (jquery,header) {
    return {
        // 1.banner数据
        banner:!function(){
            $.ajax({
                url:'http://localhost/myself/gome/php/banner_data.php',
                dataType:'json'
            }).done(function(d){
                var $d=d;
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
                url: 'http://localhost/myself/gome/php/countdown_data.php',
                dataType: 'json'
            }).done(function (data) {
                var $d = data;
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
                url:'http://localhost/myself/gome/php/floorfirst_data.php',
                dataType:'json'
            }).done(function(d){
                var $d=d;
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
                    var $scrolltop=$('html,body').scrollTop();
                    var $floors=$('.gm-floor');
                    $.each($floors,function(index,ele){
                        var $top=$(ele).offset().top-$(ele).height();
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
                url:'http://localhost/myself/gome/php/floorlist_data.php',
                dataType:'json'
            }).done(function(d){
                var $d=d;
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
                    var $scrolltop=$('html,body').scrollTop();
                    var $floors=$('.gm-floor');
                    $.each($floors,function(index,ele){
                        var $top=$(ele).offset().top-$(ele).height();
                        if($top<=$scrolltop){
                            if(index+1==1 || index+1==9){
                                floorlist($(ele).find('.mainlist'),'手机');
                            }else if(index+1==3 || index+1==6 ||index+1==7){
                                floorlist($(ele).find('.mainlist'),'电视');
                            }else if(index+1==4 ||index+1==5){
                                floorlist($(ele).find('.mainlist'),'国美超市');
                            }else{
                                floorlist($(ele).find('.mainlist'),'电脑');
                            }
                        }                    
                    });
                });
            });
        }()
    }
});