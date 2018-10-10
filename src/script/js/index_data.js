define(['../thirdplugins/jquery'], function () {
    return {
        // banner数据
        banner:!function(){
            $.ajax({
                url:'http://localhost/myself/gome/php/getdata.php',
                dataType:'json'
            }).done(function(d){
                var $d=d.bannerlist;
                var $bannerstr='';
                $.each($d,function(index,ele){
                    $bannerstr+='<li style="background:'+ele.color+'"><a href="#"><img src="'+ele.url+'"></a></li>';
                });
                var $banner=$('.banner');
                $banner.append($bannerstr);
            });
        }(),
        // 美日必抢数据
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
                        $list1 += '<li><a href="#"><img src="'+ele.url+'"><div class="countdown-price"><span>￥</span><i>'+ele.price+'</i><i class="del">¥'+ele.delprice+'</i></div><p>'+ele.title+'</p></a></li>';
                    } else {
                        $list2 +='<li><a href="#"><img src="'+ele.url+'"><div class="countdown-price"><span>￥</span><i>'+ele.price+'</i><i class="del">¥'+ele.delprice+'</i></div><p>'+ele.title+'</p></a></li>';
                    }
                });
                $countdownlist1.html($list1);
                $countdownlist2.html($list2);
            });
        }(),
        // 楼层第一个tab页数据--精选热卖
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
                floorfirst($('.gm-floor-1 .floor-imgs'),1);
                floorfirst($('.gm-floor-2 .floor-imgs'),2);
            });
        }(),
        // 楼层其他tab页数据
        floor:!function(){
            $.ajax({
                url:'http://localhost/myself/gome/php/getdata.php',
                dataType:'json'
            }).done(function(d){
                var $d=d.floorlist;
                var $mainlist=$('.floor-b-r .mainlist');
                var $floorlist=[];
                $.each($mainlist,function(index){
                    $floorlist[index]='<ul class="tab-item">';
                    $.each($d,function(i,ele){
                        if(ele.type=="手机" && ele.tabpage==index+1){
                            $floorlist[index]+='<li><a href="http://localhost/myself/gome/src/details.html?sid='+ele.sid+'" target="_blank"><img class="lazyloading" src="'+ele.url+'" alt="'+ele.title+'" sid="'+ele.sid+'"><p class="p_name">'+ele.title+'</p><p class="p_price">'+ele.price+'</p></a></li>';
                        }
                    });
                    $floorlist[index]+='</ul>';  
                    $($mainlist[index]).html($floorlist[index]);
                });
            });
        }()
    }
});