//增加cookie
function addCookie(key,value,day){
    var d=new Date();
    d.setDate(d.getDate()+day);
    document.cookie=key+'='+encodeURIComponent(value)+';expires='+d;
}
// 获取cookie
function getCookie(key){
    var arr=decodeURIComponent(document.cookie).split('; ');
    for(var i=0;i<arr.length;i++){
        var newarr=arr[i].split('=');
        if(newarr[0]==key){
            return newarr[1];
        }
    }
}
// 删除cookie
function delCookie(key){
    addCookie(key,'',-1);
}