/**
 * Created by jessietang on 2017/6/29.
 */
var map = new BMap.Map("mapPanel");    // 创建Map实例
//map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
//map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}));
map.addControl(new BMap.NavigationControl());
map.centerAndZoom("湖南",12);       // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
map.enablePinchToZoom(true);    //启用双指操作缩放

var data = [];
var opts = {
    width : 600,     // 信息窗口宽度
    //height: 500,     // 信息窗口高度
    title : "信息窗口" , // 信息窗口标题
    enableMessage:true//设置允许信息窗发送短息
};
// 获取当前位置并在地图上标记出来
var myPoint = [];
var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
        // 百度地图：28.0976997634,113.0557469769
        /*r = {
         point: {
         lng: 113.0557469769,
         lat: 28.0976997634
         }
         };*/
        var myIcon = new BMap.Icon("../icons/local.png", new BMap.Size(137,62));
        var marker = new BMap.Marker(r.point,{icon:myIcon});
        map.addOverlay(marker);
        map.centerAndZoom(r.point,16);
        console.log('您的位置：'+r.point.lng+','+r.point.lat);
        myPoint = [r.point.lng, r.point.lat];
        console.log(myPoint[0] + Math.random() / 1000);
        console.log(myPoint[0]);
        console.log(Math.random() / 1000);
        // 零散车显示 （根据当前定位随机显示附近的几个）
        data = [
            {
                carNum: "湘AE6666",
                option: {
                    lng: myPoint[0] + Math.random() / 100,
                    lat: myPoint[1] + Math.random() / 1000,
                    zIndex: 100,
                    UnitName: "网阔信息", // 所属企业
                    PlatformName: "成都网阔信息技术股份有限公司", // 接入平台
                    Location: "四川省成都市青羊区王家塘街84号",
                    SpeedCvt: "100",
                    LimitSpeed: "80",
                    GPSDateCvt: "2017-6-22"
                }
            },
            {
                carNum: "湘AE8888",
                option: {
                    lng: myPoint[0] - Math.random() / 100,
                    lat: myPoint[1] - Math.random() / 1000,
                    zIndex: 100,
                    UnitName: "网阔信息", // 所属企业
                    PlatformName: "成都网阔信息技术股份有限公司", // 接入平台
                    Location: "四川省成都市都江堰市都江堰市徐渡小学西南319米",
                    SpeedCvt: "60",
                    LimitSpeed: "40",
                    GPSDateCvt: "2017-6-20"
                }
            },
            {
                carNum: "湘AE0000",
                option: {
                    lng: myPoint[0] - Math.random() / 100,
                    lat: myPoint[1] - Math.random() / 1000,
                    zIndex: 100,
                    UnitName: "网阔信息", // 所属企业
                    PlatformName: "成都网阔信息技术股份有限公司", // 接入平台
                    Location: "四川省成都市都江堰市都江堰市徐渡小学西南319米",
                    SpeedCvt: "60",
                    LimitSpeed: "40",
                    GPSDateCvt: "2017-6-20"
                }
            },
            {
                carNum: "湘AE1111",
                option: {
                    lng: myPoint[0] + Math.random() / 100,
                    lat: myPoint[1] - Math.random() / 1000,
                    zIndex: 100,
                    UnitName: "网阔信息", // 所属企业
                    PlatformName: "成都网阔信息技术股份有限公司", // 接入平台
                    Location: "四川省成都市都江堰市都江堰市徐渡小学西南319米",
                    SpeedCvt: "60",
                    LimitSpeed: "40",
                    GPSDateCvt: "2017-6-20"
                }
            },
            {
                carNum: "湘AE2222",
                option: {
                    lng: myPoint[0] - Math.random() / 100,
                    lat: myPoint[1] - Math.random() / 100,
                    zIndex: 100,
                    UnitName: "网阔信息", // 所属企业
                    PlatformName: "成都网阔信息技术股份有限公司", // 接入平台
                    Location: "四川省成都市都江堰市都江堰市徐渡小学西南319米",
                    SpeedCvt: "60",
                    LimitSpeed: "40",
                    GPSDateCvt: "2017-6-20"
                }
            },
            {
                carNum: "湘AE3333",
                option: {
                    lng: myPoint[0] + Math.random() / 100,
                    lat: myPoint[1] + Math.random() / 1000,
                    zIndex: 100,
                    UnitName: "网阔信息", // 所属企业
                    PlatformName: "成都网阔信息技术股份有限公司", // 接入平台
                    Location: "四川省成都市都江堰市都江堰市徐渡小学西南319米",
                    SpeedCvt: "60",
                    LimitSpeed: "40",
                    GPSDateCvt: "2017-6-20"
                }
            }
        ];

        for(var i in data){
            var option = data[i].option;
            var html = '<div class="map-info-win"><table>' +
                "<tr><td>所属企业：</td><td>" + option.UnitName + '</td></tr>' +
                "<tr><td>所属接入平台：</td><td>" + option.PlatformName + '</td></tr>' +
                '<tr><td>地址：</td><td>' + option.Location + '</td></tr>' +
                "<tr><td>速度/限速值：</td><td>" + option.SpeedCvt + "/" + option.LimitSpeed + ' km/h</td></tr>' +
                '<tr><td>报警时间：</td><td>' + option.GPSDateCvt + '</td></tr>' +
                "</table></div>";
            // 这里js里面图片的路径应该相对于引用该js文件的文件的路径来写，这里就是相对于webLocation.html文件路径来写
            var myIcon = new BMap.Icon("../icons/nearCar.png", new BMap.Size(34,25));// 附近车辆定位图标
            var marker = new BMap.Marker(new BMap.Point(option.lng,option.lat),{icon:myIcon});// 创建标注
            map.addOverlay(marker);
            addClickHandler(html,marker,new BMap.Point(option.lng,option.lat));
        }
    }
    else {
        alert('failed'+this.getStatus());
    }
},{enableHighAccuracy: true});


function addClickHandler(content,marker,point){
    marker.addEventListener("click",function(e){
        openInfo(content,point);
    });
}
function openInfo(content,point){
    var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
    map.openInfoWindow(infoWindow,point); //开启信息窗口
}


$(function(){
    var searchKey = "";
    $('.searchBox').on('focus', function(){
        $('.autoComplete').show();
        $('.autoComplete').on('click', '.list', function(){
            searchKey = $(this).text();
            $('.searchBox').val(searchKey);
            $('.autoComplete').hide();
            console.log($(this).text());
        });
    });

    $('.searchBtn').on('click', function(){
        $('.autoComplete').hide();
        searchKey = $('.searchBox').val();
        if(searchKey.trim() == ''){
            alert('请输入车牌号');
        }else{
            for (var i in data) {
                if(data[i].carNum == searchKey){
                    var option = data[i].option;
                    console.log(option);
                    var currentLocation = "";
                    var html = '';
                    // 逆地址解析 经纬度 ==》 当前具体地址
                    $.ajax({
                        url: 'http://api.map.baidu.com/geocoder/v2/?ak=Cu2gMKwvBltUntF3DUEZcZ6w&location=' + option.lat + ',' + option.lng + '&output=json&pois=2',
                        dataType: 'jsonp',
                        jsonp: "callback",
                        success: function(d) {
                            var result = d.result;
                            console.log(d.result);
                            if (result) {
                                currentLocation = result.formatted_address;
                                console.log(currentLocation);
                            } else {
                                alert('解析地址失败');
                                currentLocation = "解析地址失败";
                            }
                            html = '<div class="map-info-win"><table>' +
                                "<tr><td>所属企业：</td><td>" + option.UnitName + '</td></tr>' +
                                "<tr><td>所属接入平台：</td><td>" + option.PlatformName + '</td></tr>' +
                                '<tr><td>地址：</td><td>' + currentLocation + '</td></tr>' +
                                "<tr><td>速度/限速值：</td><td>" + option.SpeedCvt + "/" + option.LimitSpeed + ' km/h</td></tr>' +
                                '<tr><td>报警时间：</td><td>' + option.GPSDateCvt + '</td></tr>' +
                                "</table></div>";
                            var myIcon = new BMap.Icon("../icons/nearCar.png", new BMap.Size(34,25));// 搜索到的车辆定位图标
                            var marker = new BMap.Marker(new BMap.Point(option.lng,option.lat),{icon:myIcon});// 创建标注
                            map.addOverlay(marker);
                            openInfo(html, new BMap.Point(option.lng,option.lat));
                            addClickHandler(html,marker,new BMap.Point(option.lng,option.lat));
                            map.centerAndZoom(new BMap.Point(option.lng,option.lat), 16);
                        },
                        error: function(d) {
                            alert('解析地址失败:' + d.msg);
                            currentLocation = "解析地址失败"+d.msg;
                        }
                    });
                    /*var html = '<div class="map-info-win"><table>' +
                     "<tr><td>所属企业：</td><td>" + option.UnitName + '</td></tr>' +
                     "<tr><td>所属接入平台：</td><td>" + option.PlatformName + '</td></tr>' +
                     '<tr><td>地址：</td><td>' + option.Location + '</td></tr>' +
                     "<tr><td>速度/限速值：</td><td>" + option.SpeedCvt + "/" + option.LimitSpeed + ' km/h</td></tr>' +
                     '<tr><td>报警时间：</td><td>' + option.GPSDateCvt + '</td></tr>' +
                     "</table></div>";*/
                    /*var myIcon = new BMap.Icon("../static/images/icons/1.png", new BMap.Size(300,157));// 搜索到的车辆定位图标
                     var marker = new BMap.Marker(new BMap.Point(option.lng,option.lat),{icon:myIcon});// 创建标注
                     map.addOverlay(marker);
                     openInfo(html, new BMap.Point(option.lng,option.lat));
                     addClickHandler(html,marker,new BMap.Point(option.lng,option.lat));
                     map.centerAndZoom(new BMap.Point(option.lng,option.lat), 11);*/
                }
            }
        }
    });

    function ajaxPage(url){
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'html',
            success: function(data){
                $('.ajaxPage').html(data);
            }
        });
    }


});