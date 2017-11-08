(function ($) {
    $.StaticInfoConfig = $.StaticInfoConfig == null ? {} : $.StaticInfoConfig;

    var staticInfoConfig = {
        taiyuan: {
            province: "太原市",
            mapCenterCity: "太原市",
            loginTitle: "太原市重点营运车辆<br/>联网联控系统",
            mainTitle: "太原市重点营运车辆联网联控系统",
            subMainTitle: "太原市重点营运车辆联网联控系统",
            footerContent: "航天科技控股集团山西有限公司 Copyright © 2005 - " + new Date().getFullYear()
        },
        datong: {
            province: "大同市",
            mapCenterCity: "大同市",
            loginTitle: "大同市重点营运车辆<br/>联网联控系统",
            mainTitle: "大同市重点营运车辆联网联控系统",
            subMainTitle: "大同市重点营运车辆联网联控系统",
            footerContent: "航天科技控股集团山西有限公司 Copyright © 2005 - " + new Date().getFullYear()
        },
        yangquan: {
            province: "阳泉市",
            mapCenterCity: "阳泉市",
            loginTitle: "阳泉市重点营运车辆" + "<br/>" + "联网联控系统",
            mainTitle: "阳泉市重点营运车辆联网联控系统",
            subMainTitle: "阳泉市重点营运车辆联网联控系统",
            footerContent: "航天科技控股集团山西有限公司 Copyright © 2005 - " + new Date().getFullYear()
        },
        changzhi: {
            province: "长治市",
            mapCenterCity: "长治市",
            loginTitle: "长治市重点营运车辆" + "<br/>" + "联网联控系统",
            mainTitle: "长治市重点营运车辆联网联控系统",
            subMainTitle: "长治市重点营运车辆联网联控系统",
            footerContent: "航天科技控股集团山西有限公司 Copyright © 2005 - " + new Date().getFullYear()
        },
        jincheng: {
            province: "晋城市",
            mapCenterCity: "晋城市",
            loginTitle: "晋城市重点营运车辆" + "<br/>" + "联网联控系统",
            mainTitle: "晋城市重点营运车辆联网联控系统",
            subMainTitle: "晋城市重点营运车辆联网联控系统",
            footerContent: "航天科技控股集团山西有限公司 Copyright © 2005 - " + new Date().getFullYear()
        },
        suozhou: {
            province: "朔州市",
            mapCenterCity: "朔州市",
            loginTitle: "朔州市重点营运车辆" + "<br/>" + "联网联控系统",
            mainTitle: "朔州市重点营运车辆联网联控系统",
            subMainTitle: "朔州市重点营运车辆联网联控系统",
            footerContent: "航天科技控股集团山西有限公司 Copyright © 2005 - " + new Date().getFullYear()
        },
        jinzhong: {
            province: "晋中市",
            mapCenterCity: "晋中市",
            loginTitle: "晋中市重点营运车辆" + "<br/>" + "联网联控系统",
            mainTitle: "晋中市重点营运车辆联网联控系统",
            subMainTitle: "晋中市重点营运车辆联网联控系统",
            footerContent: "航天科技控股集团山西有限公司 Copyright © 2005 - " + new Date().getFullYear()
        },
        xinzhou: {
            province: "忻州市",
            mapCenterCity: "忻州市",
            loginTitle: "忻州市重点营运车辆" + "<br/>" + "联网联控系统",
            mainTitle: "忻州市重点营运车辆联网联控系统",
            subMainTitle: "忻州市重点营运车辆联网联控系统",
            footerContent: "航天科技控股集团山西有限公司 Copyright © 2005 - " + new Date().getFullYear()
        },
        linfen: {
            province: "临汾市",
            mapCenterCity: "临汾市",
            loginTitle: "临汾市重点营运车辆" + "<br/>" + "联网联控系统",
            mainTitle: "临汾市重点营运车辆联网联控系统",
            subMainTitle: "临汾市重点营运车辆联网联控系统",
            footerContent: "航天科技控股集团山西有限公司 Copyright © 2005 - " + new Date().getFullYear()
        },
        lvliang: {
            province: "吕梁市",
            mapCenterCity: "吕梁市",
            loginTitle: "吕梁市重点营运车辆" + "<br/>" + "联网联控系统",
            mainTitle: "吕梁市重点营运车辆联网联控系统",
            subMainTitle: "吕梁市重点营运车辆联网联控系统",
            footerContent: "航天科技控股集团山西有限公司 Copyright © 2005 - " + new Date().getFullYear()
        }
    };

    // 当前配置
    var currentConfig = staticInfoConfig.taiyuan;

    var province = currentConfig.province,
        mapCenterCity = currentConfig.mapCenterCity,
        loginTitle = currentConfig.loginTitle,
        mainTitle = currentConfig.mainTitle,
        subMainTitle = currentConfig.subMainTitle,
        footerContent = currentConfig.footerContent;

    $.StaticInfoConfig.getProvince = function () {
        return province;
    };
    $.StaticInfoConfig.getMapCenterCity = function () {
        return mapCenterCity;
    };
    $.StaticInfoConfig.getLoginTitle = function () {
        return loginTitle;
    };
    $.StaticInfoConfig.getMainTitle = function () {
        return mainTitle;
    };
    $.StaticInfoConfig.getSubMainTitle = function () {
        return subMainTitle;
    };
    $.StaticInfoConfig.getFooterContent = function () {
        return footerContent;
    };

})(function () {
    var $;
    try {
        $ = window;
    }
    catch (e) {
        $ = this;
    }
    return $;
}());