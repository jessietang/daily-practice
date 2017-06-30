/**
 * Created by jessietang on 2017/6/29.
 */
$(function(){
    /*==router切换==*/
    $('.router .router-link').each(function(index){
        var _this = $(this);
        var index = index;
        _this.click(function(){
            var that = $(this);
            that.addClass('activeRouter').siblings().removeClass('activeRouter');
            if(index == 0){
                // 这里js里面的路径，要相对于引用该js文件的文件的路径来写，这里就应该相对于webLocation.html等文件路径来写
                // window.location.href = "./webLocation.html"; 或者 window.location.href = "webLocation.html";
                window.location.href = "./webLocation.html";
            }else if(index == 1){
                window.location.href = "./graphicalReport.html";
            }else if(index == 2){
                window.location.href = "./modularManagement.html";
            }
        });
    });
});