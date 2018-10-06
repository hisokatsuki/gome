!function($){
    // 1.引入公共头部
    $('#header').load('header.html');
    // 放大镜
    var $magnifier=$('.magnifier');
    $.ajax({
        type:'get',
        url:'http://localhost/myself/gome/php/getdata.php',
        dataType:'json'
    }).done(function(data){
        $d=data.magnifier;
        var $magnifierlist=`<div id="spic">
                            <img src="${$d[0].url}">
                            <a href="#" class="icon-search"></a>
                            <div id="sf"></div>
                        </div>
                        <div id="bf">
                            <img src="${$d[6].url}" id="bpic">
                        </div>
                        <div id="ulist">
                            <a href="javascript:;" id="left"><i></i></a>
                            <a href="javascript:;" id="right"><i></i></a>
                            <div id="list">
                                <ul>`;
        $.each($d,function(index,element){
            if(index<6){
                $magnifierlist+=`<li><img src="${element.url}"></li>`;
            }
        });
        $magnifierlist+='</ul></div></div>';
        $magnifier.html($magnifierlist);
    });
}(jQuery);
!function($){
    var $spic=$('#spic');
    var $sf=$('#sf');
    var $bf=$('#bf');
    var $bpic=$('#bpic');
    var $magnifier=$('.magnifier');
    // 2.1鼠标移到小图上，出现小放和大方，反之消失
    $spic.hover(function(){
        $sf.css('visibility','visible');
        $bf.css('visibility','visible');
        // 2.2设置小放的尺寸
        $sf.width($spic.width()*$bf.width()/$bpic.width());
        $sf.height($spic.height()*$bf.height()/$bpic.height());
        // 设置比例
        var $bili=$bpic.width()/$spic.width();
        // 2.3鼠标在小图上移动,小放跟着鼠标移动
        $spic.on('mousemove',function(ev){
            var $l=ev.pageX-$sf.width()/2-$magnifier.offset().left;
            var $t=ev.pageY-$sf.height()/2-$magnifier.offset().top;
            if($l<0){
                $l=0;
            }else if($l>$spic.width()-$sf.width()){
                $l=$spic.width()-$sf.width();
            }
            if($t<0){
                $t=0;
            }else if($t>$spic.height()-$sf.height()){
                $t=$spic.height()-$sf.height();
            }
            $sf.css('left',$l);
            $sf.css('top',$t);
            // 大图移动的left和top
            $bpic.css('left',-$l*$bili);
            $bpic.css('top',-$t*$bili);
        });
    },function(){
        $sf.css('visibility','hidden');
        $bf.css('visibility','hidden');
    });
    // var $left=$('#left');
    // var $right=$('#right');
    // var $ul=$('#list ul');
    // var $li=$('#list ul li');
    // var $liwidth=$li.eq(0).outerWidth()+25; //一个li的尺寸，width+border+padding ,+25--margin-right值
    // var $num=5; //页面显示5个li，根据这个来判断点击左右箭头切换图片的效果
    // // 2.4设置ul的宽度
    // $ul.width($li.size()*$liwidth);
    // // 2.5点击左右箭头切换图片
    // $right.on('click',function(){
    //     if($num<$li.size()){
    //         $num++;
    //         // $left.css('color','#333')
    //         $ul.animate({
    //             left:-($num-5)*$liwidth
    //         },400);
    //     }if($num==$li.size()){
    //         // $right.css('color','#fff');
    //     }
    // });
    // $left.on('click',function(){
    //     if($num>6){
    //         $num--;
    //         // $right.css('color','#333');
    //         $ul.animate({
    //             left:-($num-5)*$liwidth
    //         },400);
    //     }if($num==5){
    //         // $left.css('color','#fff');
    //     }
    // });
    // // 2.6点击ul的li，切换小图和大图的图片
    // $li.on('click',function(){
    //     $src=$(this).find('img').attr('src');
    //     $spic.find('img').attr('src',$src);
    //     $bpic.attr('src',$src);
    // });
}(jQuery);