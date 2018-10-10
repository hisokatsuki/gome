define(['../thirdplugins/jquery'],function(){
    return {
        // 1.引入公共头部
        piblic:!function(){
            $('#header').load('header.html');
            $('#footer').load('footer.html');
        }(),
        // 2.获取数据
        details_data:!function(){
            var $sid=location.search.substring(5);
            $.ajax({
                type:'get',
                url:'http://localhost/myself/gome/php/detailsdata.php',
                data:{
                    sid:$sid
                },
                dataType:'json'
            }).done(function(data){
                var $urllist=data[0].arrurl.split(',');
                var $ul=$('#ulist #list ul');
                var $ulstr='';
                var $spicimg=$('#spic img');
                var $bfimg=$('#bf img');
                var $title=$('.hgroup h1');
                var $price=$('.price');
                $spicimg.attr("src",$urllist[0]);
                $bfimg.attr("src",$urllist[0]);
                $title.html(data[0].title);
                $price.html('<em>'+data[0].price.substring(0,1)+'</em>'+data[0].price.substring(1));
                // <em>¥</em>2799.00
                $.each($urllist,function(index,element){
                    $ulstr+='<li><img src="'+element+'"></li>';
                });
                $ul.html($ulstr);
            });
        }()
    }
})