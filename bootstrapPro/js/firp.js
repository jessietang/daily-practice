/**
 * Created by jessietang on 11/11/2015.
 */
$(function(){
    $('.carousel').carousel();
    $(document).scroll(function(e){
        //$('#myScrollspy').
        console.log('1');
        var e = e || window.event;
        var scrollH = $(document).scrollTop();
        var headerH = $('.header').height();
        console.log(scrollH+','+headerH);
        if(scrollH > headerH || scrollH == headerH){
            //alert('a');
            $('#myScrollspy').addClass('myScrollspyfixed');
            $('.my-early-btn').removeClass('hidden');
        }else{
            $('#myScrollspy').removeClass('myScrollspyfixed');
            $('.my-early-btn').addClass('hidden');
        }
    });
});
