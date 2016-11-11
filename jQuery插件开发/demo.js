/**
 * Created by jessietang on 10/18/2016.
 */
$.extend({
    myAlert1: function(str){
        alert(str);
    },
    log: function(message){
        var oDate = new Date();
        var year = oDate.getFullYear();
        var month = oDate.getMonth() + 1;
        var date = oDate.getDate();
        var hour = oDate.getHours();
        var minutes = oDate.getMinutes();
        var seconds = oDate.getSeconds();
        var nowTime = year + '-' + month + '-' + date + '-' + hour + ':' + minutes + ':' + seconds;
        console.log(nowTime + " my msg: "+ message);
    }
});