define(['../thirdplugins/jquery'], function () {
    return {
        // 搜索数据
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
            var $header=$('#header');
            $(window).on('scroll',function(){
                if($('html,body').scrollTop()>722){
                    $('.gm-nav').hide();
                    var $gm_sidecatrgory=$('.gm-sidecatrgory');
                    var $gm_search_top=$('.gm-search-top');
                    var $suspension_top=$('.suspension-top');
                    var $gm_search_result=$('.gm-search-result');
                    $suspension_top.show();
                    $gm_search_top.addClass('search-top-fixed');
                    $gm_sidecatrgory.addClass('sidecatrgory-fixed').find('h2 span').show();
                    $gm_search_result.addClass('search-result-fixed');
                    $gm_sidecatrgory.on('mouseover',function(){
                        $('.gm-nav').show();
                    })
                    $gm_sidecatrgory.on('mouseout',function(){
                        $('.gm-nav').hide();
                    });
                }else{
                        $header.find('.suspension-top').hide();
                        $header.find('.gm-search-top').removeClass('search-top-fixed');
                        $header.find('.gm-sidecatrgory').removeClass('sidecatrgory-fixed').find('h2 span').hide();
                        $header.find('.gm-search-result').removeClass('search-result-fixed');
                        $header.find('.gm-sidecatrgory').off();
                        $('.gm-nav').show();
                    }
            });
        }()
    }
})