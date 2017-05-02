/**
 * Created by jessietang on 2017/4/28.
 */
$(function(){
    /*==$(document).width() > 1000是header nav hover事件处理==*/
    var timer = null;
    $('.navigation .menu-item').hover(function(){
        if($(document).width() > 1000){
            var _this = $(this);
            _this.addClass('menu-item-active').siblings().removeClass('menu-item-active');
            timer = setTimeout(function(){
                $('.jq-navigation-subNav').fadeOut();
                _this.find('.jq-navigation-subNav').fadeIn();
            },300);
        }
    },function(){
        if($(document).width() > 1000){
            $(this).removeClass('menu-item-active');
            $('.jq-navigation-subNav').fadeOut();
            clearTimeout(timer);
        }
    });


    $(document).on('click', '.menu-item .glyphicon', function(){
        var $items = $('.navigation .menu-item');
        var $item = $(this).parent();
        if($(this).hasClass('glyphicon-plus')){
            $(this).removeClass('glyphicon-plus').addClass('glyphicon-minus');
            $items.removeClass('menu-item-active');
            $item.addClass('menu-item-active');
            $('.jq-navigation-subNav').hide();
            $(this).next().show();
        }else{
            $(this).removeClass('glyphicon-minus').addClass('glyphicon-plus');
            $item.removeClass('menu-item-active');
            $('.jq-navigation-subNav').hide();
        }
    });





});