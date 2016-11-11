/**
 * Created by jessietang on 11/10/2016.
 */
$.fn.aToRed = function(){
    //在这里面,this指的是用jQuery选中的元素
    this.css("color","red");
    /*this.each(function(){
        $(this).append('---'+$(this).attr('href'));
    });*/
    // 支持链式调用
    return this.each(function(){
        $(this).append('---'+$(this).attr('href'));
    });
};

$.fn.aToOther = function(options){
    var defaults = {
        "color": "blue",
        "fontSize": "20px"
    };
    //当给extend方法传递一个以上的参数时，它会将所有参数对象合并到第一个里。
    // 同时，如果对象中有同名属性时，合并的时候后面的会覆盖前面的。
    /*var settings = $.extend(defaults, options);*/
    //上面代码调用extend时会将defaults的值改变，这样不好，因为它作为插件因有的一些东西
    // 应该维持原样，另外就是如果你在后续代码中还要使用这些默认值的话，当你再次访问它时
    // 它已经被用户传进来的参数更改了。

    //一个好的做法是将一个新的空对象做为$.extend的第一个参数，defaults和用户传递的参数对象紧随其
    // 后，这样做的好处是所有值被合并到这个空对象上，保护了插件里面的默认值。
    var settings = $.extend({},defaults,options);

    return this.css({
        "color": settings.color,
        "fontSize": settings.fontSize
    });
};