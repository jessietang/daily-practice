if (getStatus("dev")) {
	var HCXD = {
		toast: function(msg) {
			console.log("toast" + msg)
		},
		setTitle: function(msg) {
			console.log("title" + msg)
		},
		getBillboard: function() {
			console.log("店招图片")
		},
		openDialog: function() {
			console.log('打开菊花')
		},
		closeDialog: function() {
			console.log("关闭菊花")
		},
		share: function(mianTitle, subTitle, img, url) {
			console.log("分享")
			console.log('mianTitle:'+mianTitle)
			console.log('subTitle:'+subTitle)
			console.log('img:'+img)
			console.log('url:'+url)
		},
		seeCoupon: function() {
			console.log("查看")
		},
		setShare:function(mianTitle, subTitle, img, url) {
			console.log("setShare")
			console.log('mianTitle:'+mianTitle)
			console.log('subTitle:'+subTitle)
			console.log('img:'+img)
			console.log('url:'+url)
		},
		getUserId:function() {
			return 17151
		},
        toHome: function(){
            console.log('返回首页');
        },
        toAddTruck: function(){
        	console.log('到车辆认证页面');
		},
        closeWindow: function(){
        	console.log('关闭窗口');
		},
		getToken: function(){
        	console.log('获取token');
		},
        pushNV: function(url){
			console.log(url);
		}
	}
}

//121.41.1.206:8080
//http://120.26.85.230:8080
var src={};
var hostname = window.location.hostname
switch (hostname) {
	case "static.hcxdi.com":
		src = {
			api: 'http://xapi.hcxdi.com:80/truck',
			href: window.location.origin + "/xActivity/tactivity",
			shareHref:'http://xapi.hcxdi.com:80/truck'
		};
		break;
	case "xapi.hcxdi.com":
		src = {
			api: 'http://xapi.hcxdi.com:80/truck',
			href: window.location.origin + "/truck/xActivity/tactivity",
			shareHref:'http://xapi.hcxdi.com:80/truck'
		};
		break;
	case "test.dadachefu.com":
		src = {
			api: 'http://test.dadachefu.com/truck',
			href: window.location.origin + "/truck/xActivity/tactivity",
			shareHref:'http://test.dadachefu.com/truck'
		};
		break;
    case "120.26.85.230":
        src = {
            api: 'http://120.26.85.230:8080/truck',
            href: window.location.origin + '/truck/xActivity/tactivity',
            shareHref:'http://120.26.85.230:8080/truck'
        };
        break;
	case "tstatic.hcxdi.com":
		src = {
			api: 'http://test.hcxdi.com/truck',
			href: window.location.origin + "/truck/xActivity/tactivity",
			shareHref:'http://test.dadachefu.com/truck'
		};
		break;
    case "120.26.10.20":
        src = {
            api: 'http://120.26.10.20:8080/truck',
            href: window.location.origin + '/truck/xActivity/tactivity',
            shareHref:'http://120.26.10.20:8080/truck'
        };
        break;
	default:
		src = {
			api: window.location.origin+'/truck',
			href: window.location.origin+'/truck/xActivity/tactivity',
			shareHref:window.location.origin+'/truck'
		};
		break;
}
if (getStatus('devsrc')) {
	src = {
		// api: 'http://test.hcxdi.com/truck',
		api: 'http://test.dadachefu.com/truck',
		href: window.location.origin + "/outside"
	};
}
// if (hostname == "static.hcxdi.com") {
// 	 src = {
// 		api: 'http://118.178.134.197:8080/truck',
// 		href: window.location.origin + "/tactivity"
// 	}
// } else if (hostname == "tstatic.hcxdi.com") {
// 	 src = {
// 		// api: 'http://121.41.1.206:8080/truck',
// 		api: 'http://120.26.85.230:8080/truck',
// 		href: window.location.origin + "/tactivity"
// 	}
// } else {
// 	 src = {
// 		api: 'http://120.26.85.230:8080/truck',
// 		// api: 'http://121.41.1.206:8080/truck',
// 		href: window.location.origin + "/src"
// 	}
// }
/**
 * 获取url里面的参数
 * @param  {[type]} name [参数名字]
 * @return {[type]}      [订单]
 */
function getStatus(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r !== null) return unescape(r[2]);
	return null;
};
/**
 * ajax请求
 * @param  {[type]} data    [data信息]
 * @param  {[type]} success [请求成功函数]
 * @param  {[type]} error   [请求失败函数]
 * @return {[type]}         [description]
 */
function loadAjax(data, success, error) {
	var kai, guan;
	$.ajax({
		url: src.api + data.src,
		type: data.type,
		contentType: 'application/json',
		processData: false,
		dataType: 'json',
		beforeSend: function(request) {
			kai = new Date();
			request.setRequestHeader("token", getStatus('token'));
		},
		data: JSON.stringify(data.data),
		success: function(res) {
			console.log(res)
			if (res.code == 0) {
				success && success(res, status);
			} else if (res.code == 1 && res.msg == "error.user.not.found") {
				showMsg("用户在其他地方登陆")
			} else {
				showMsg(res.msg, HCXD)
			}

		},
		error: function(res) {
			showMsg("服务器哥哥在休息，请稍后再试")
			error && error(res)
		},
		complete: function() {
			guan = new Date();
			console.log("time:" + (guan - kai))
		}
	})
}
/**
 * 页面提示
 * @param  {[type]} msg [提示的文字]
 * @return {[type]}     [description]
 */
function showMsg(msg) {
	alert(msg)
}
/**
 * 判断是否移动设备访问
 * @return {Boolean} [description]
 */
function isMobileUserAgent() {
	return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
}
/**
 * 判断是否苹果移动设备访问
 * @return {Boolean} [description]
 */
function isAppleMobileDevice() {
	return (/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase()));
}
/**
 * 判断是否安卓移动设备访问
 * @return {Boolean} [description]
 */
function isAndroidMobileDevice() {
	return (/android/i.test(navigator.userAgent.toLowerCase()));
}
/**
 * 同时向客户端发送信息
 * @param  {[type]} data    [description]
 * @return {[type]}         [description]
 */
function AppInteraction(data, HCXD, fn) {
	if (isMobileUserAgent()) {
		if (isAppleMobileDevice()) {
			window.webkit.messageHandlers.AppInteraction.postMessage(data);
		} else if (isAndroidMobileDevice()) {
			if (HCXD) {
				fn && fn(HCXD);
			}
		}
	}
}
/**
 * 判字符串是否含有
 * @Author   QuTong
 * @DateTime 2017-04-15T11:51:46+0800
 * @param    {[type]}                 str    [description]
 * @param    {[type]}                 substr [description]
 * @return   {Boolean}                       [description]
 */
function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}
