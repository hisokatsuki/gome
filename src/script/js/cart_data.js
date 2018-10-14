define(['../thirdplugins/jquery'],function(){
    return {
        // 1.引入头部和公共尾部
        public:!function(){
            $('#header').load('header.html #gome-topmenu');
            $('#footer').load('footer.html #gome-footer');
        }(),
        // 2.推荐商品数据
        recommend_prd:!function(){
            $.ajax({
                url:'http://localhost/myself/gome/php/cartdata.php',
                dataType:'json'
            }).done(function(data){
                var str='';
                $.each(data,function(index,ele){
                    if(index<5){
                        str+='<li class="container-item">'+       
                                '<a href="#" class="item-image">'+     
                                    '<img src="'+ele.url+'" sid="'+ele.sid+'">'+     
                                '</a>'+         
                                '<a href="#" class="item-title">'+ele.title+'</a>'+            
                                '<div class="item-price">'+ele.price+'</div>'+           
                                '<a href="javascript:;" class="item-btn">加入购物车</a>'+        
                                '<div class="add-success">加入成功</div>'+  
                            '</li>';
                    }
                });
                $('#gm-recommend-prd .container').html(str);
            });
        }()
    }
})
