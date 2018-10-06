!function($){
    // 引入公共头部和尾部
    $('#header').load('header.html');
    $('#footer').load('footer.html');
}(jQuery);

// 美日必抢 --拼接数据
!function($){
    var $countdownlist1=$('.list1');
    var $countdownlist2=$('.list2');
    $.ajax({
        type:'get',
        url:'http://localhost/myself/gome/php/getdata.php',
        dataType:'json'
    }).done(function(data){
        var $d=data.countdown;
        var $list1='';
        var $list2='';
        $.each($d,function(index,element){
            if(index<4){
                $list1+=`<li>
                                <a href="#">
                                    <img src="${element.url}">
                                    <div class="countdown-price">
                                        <span>￥</span>
                                        <i>${element.price}</i>
                                        <i class="del">¥${element.delprice}</i>
                                    </div>
                                    <p>${element.title}</p>
                                </a>
                                </li>`
            }else{
                $list2+=`<li>
                                <a href="#">
                                    <img src="${element.url}">
                                    <div class="countdown-price">
                                        <span>￥</span>
                                        <i>${element.price}</i>
                                        <i class="del">¥${element.delprice}</i>
                                    </div>
                                    <p>${element.title}</p>
                                </a>
                                </li>`
            }
        });
            $countdownlist1.html($list1);
            $countdownlist2.html($list2);
    });
}(jQuery);
// 美日必抢 --点击按钮切换/倒计时
!function($){
    // 点击按钮切换
    var $c_btnleft=$('.c-btn-left');
    var $c_btnright=$('.c-btn-right');
    var bstop=true;
    var $list1=$('.list1');
    var $list2=$('.list2');
    var $countdownlist=$('.countdown-list');
    $c_btnleft.on('click',function(){
        if(bstop){
            bstop=false;
            $list1.hide();
            $list2.show();
        }else{
            bstop=true;
            $list1.show();
            $list2.hide();
        }
    });
    $c_btnright.on('click',function(){
        if(bstop){
            bstop=false;
            $list1.hide();
            $list2.show();
        }else{
            bstop=true;
            $list1.show();
            $list2.hide();
        }
    });   
    // 倒计时
    var $time='';
    function countDown(){
        var $future=new Date('2018-10-12 20:36:00');
        var $nowtime=new Date();
        $time=($future-$nowtime)/1000;          
        var $h=parseInt($time%86400/3600);
        var $m=parseInt($time%3600/60);
        var $s=parseInt($time%60);
        return '<em class="num">'+double($h)+'</em> : <em class="num">'+double($m)+'</em> : <em class="num">'+double($s)+'</em>';
    }
    // 补零
    function double(n){
        return n<10 ? '0'+n : n;
    }
    var $timebox=$('.time-box i');
    var $countdownbox=$('#gm-countdown');
    var timer=null;
    var $num=$('.num');
    $timebox.html(countDown());
    timer=setInterval(function(){         
        $timebox.html(countDown());
        if($time<=0){
            clearInterval(timer);
            $countdownbox.hide();
        }
    },1000);  
}(jQuery);