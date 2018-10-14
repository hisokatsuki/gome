define(['../thirdplugins/jquery'], function () {
    return {
        // 1.搜索数据
        search_data:!function(){
            var $header=$('#header');
            // input搜索事件
            $header.on('click','.searchform input',function(){ //事件委托
                var $searchinput=$('.searchform input');
                var $gm_search=$('.gm-search-result');
                var $searchresult=$('.search-result');
                var $resultclose=$('.result-close');
                $searchinput.on('input',function(){
                    if($searchinput.val()!=''){
                        $.ajax({
                            url:"https://suggest.taobao.com/sug?code=utf-8&q="+$searchinput.val()+"&_ksTS=1539318438764_471&callback=jsonp472&k=1&area=c2c&bucketid=5",
                            dataType:'jsonp'
                        }).done(function(data){
                            var $d=data.result;
                            var $str='';
                            $.each($d,function(index,ele){
                                $str+='<li>'+
                                        '<a href="javascript:;">'+
                                            '<span class="result">'+ele[0]+'</span>'+
                                        '</a>'+
                                    '</li>';
                            });
                            $searchresult.html($str);
                            $gm_search.show();
                        });
                    }else{
                        $searchresult.html('');
                        $gm_search.hide();
                    }
                });
                // 点击对应的搜索结果，讲结果赋值给input
                $searchresult.on('click','li',function(){
                    $searchinput.val($(this).text());
                    $gm_search.hide();
                });
                // 获得焦点
                $searchinput.on('focus',function(){
                    if($searchinput.val()!=''){
                        $gm_search.show();
                    }
                });
                // 点击关闭
                $resultclose.on('click',function(){
                    $gm_search.hide();
                });
            });
        }(),
        // 2.搜索类型下拉事件
        search_type_effect:!function(){
            var $header=$('#header');
            $header.on('mouseover','.search-type-dropdown',function(){
                var $search_dropdown=$('.search-dropdown')
                var $search_type_dropdown=$('.search-type-dropdown');
                $search_dropdown.show();
                $search_type_dropdown.on('click','li',function(){
                    $search_type_dropdown.find('span').html($(this).text());
                    $search_dropdown.hide();
                });
                $search_type_dropdown.on('mouseout',function(){
                    $search_dropdown.hide();
                })
            });
        }(),
        // 3.二级导航效果
        subnav_effect:!function(){
            var $header=$('#header');
            var $num=0;
            // 3.1滑过对应一级导航，让二级导航show
            $header.on('mouseover','#gome-category .gm-nav .nav-item',function(){
                var $nav=$('#gome-category .gm-nav .nav-item');
                var $subnav=$('#gome-category .gm-nav .subnav-content');
                $num=$(this).index();
                $(this).addClass('active').siblings('li').removeClass('active');
                $subnav.eq($num).show().siblings('.subnav-content').hide();
                // 3.2滑过二级导航，让二级导航show
                $header.on('mouseover','#gome-category .gm-nav .subnav-content',function(){
                    $(this).show();
                    $nav.eq($num).addClass('active').siblings('li').removeClass('active');
                });
                $header.on('mouseout','#gome-category .gm-nav .subnav-content',function(){
                    $(this).hide();
                    $nav.eq($num).removeClass('active');
                });
                $header.on('mouseout','#gome-category .gm-nav .nav-item',function(){
                    $subnav.eq($num).hide();
                    $nav.eq($num).removeClass('active');
                });
            });
        }(),
        // 4.搜索和导航顶部悬浮
        search_nav_effect:!function(){
            $(window).on('scroll',function(){
                var $gm_sidecatrgory=$('.gm-sidecatrgory');
                var $gm_search_top=$('.gm-search-top');
                var $suspension_top=$('.suspension-top');
                var $gm_search_result=$('.gm-search-result');
                var $gm_nav=$('.gm-nav');
                if($('html,body').scrollTop()>722){
                    $gm_nav.hide();
                    $suspension_top.show();
                    $gm_search_top.addClass('search-top-fixed');
                    $gm_sidecatrgory.addClass('sidecatrgory-fixed').find('h2 span').show();
                    $gm_search_result.addClass('search-result-fixed');
                    $gm_sidecatrgory.on('mouseover',function(){
                        $gm_nav.show();
                    })
                    $gm_sidecatrgory.on('mouseout',function(){
                        $gm_nav.hide();
                    });
                }else{
                    $suspension_top.hide();
                    $gm_search_top.removeClass('search-top-fixed');
                    $gm_sidecatrgory.removeClass('sidecatrgory-fixed').find('h2 span').hide();
                    $gm_search_result.removeClass('search-result-fixed');
                    $gm_sidecatrgory.off();
                    $gm_nav.show();
                }
            });
        }(),
        // 5.导航栏右边的滚动广告
        scrollimgs_effect:!function(){
            var $header=$('#header');
            var $num=1;
            $header.on('click','.btn-up',function(){
                $num++;
                console.log($num);            
                if($num>3){
                    $num=3;
                }
                $('.scrollimgs ul').animate({top:-40*($num-1)})
            });
            $header.on('click','.btn-down',function(){
                if($num==1){
                    $('.scrollimgs ul').css({top:-80})
                }
                $num--;
                console.log($num);
                if($num<0){
                    $num=2;
                }
                $('.scrollimgs ul').animate({top:40*($num+1)})
            })
        }()
    }
})