//获取样式
function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}
	else{
		return getComputedStyle(obj,false)[name];
	}
}

//获取鼠标的位置
function getPos(ev){
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
	return{x:ev.clientX+scrollLeft,y:ev.clientY+scrollTop}  //以一个json的形式返回
	
}

//通过className选择元素
function getByClass(oParent,sClass){
	var aResult = [];
	var aEle = oParent.getElementsByTagName('*');
	for(var i=0; i<aEle.length; i++){
		if(aEle[i].className == sClass){
			aResult.push(aEle[i]);
		}
		
	}
	return aResult;   //返回一个数组
	
}

//完美运动框架
function startMove(obj,json,fnEnd){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
	var bStop=true;  //这一次运动就结束了---所有值都已经到了
	for(var attr in json){///

		//1.取当前的值			
		var cur = 0;
			if(attr == 'opacity'){
					cur = Math.round((parseFloat(getStyle(obj,attr)))*100);
			}
			else{
				cur = parseInt(getStyle(obj,attr));
				}

			//2.算速度
			var speed = (json[attr]-cur)/6;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
					
			//3.检测停止
			if(cur != json[attr]){
				bStop = false;
			}
			if(attr == 'opacity'){
				obj.style.filter = 'alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity = (cur+speed)/100;
			}else{
				obj.style[attr] = cur + speed + 'px';
			}
		}///
				
			if(bStop){
				clearInterval(obj.timer);
				if(fnEnd) fnEnd;
			}
		},30);
	}

//事件绑定函数
function myAddEvent(obj,ev,fn){
	if(obj.attachEvent){
		obj.attachEvent('on'+ev,fn);
	}
	else{
		obj.addEventListener(ev,fn,false);	
	}
}

//全兼容的 事件绑定  and  阻止默认事件
var EventUtil = {
	//Notice: type is not include 'on', for example: click mouseover mouseout and so on
	addHandler: function(element, type, handler){
		if (element.addEventListener){
			element.addEventListener(type, handler, false);
		} else if(element.attachEvent){
			element.attachEvent('on'+type, handler);
		} else {
			element['on'+type] = handler;
		}
	},

	preventDefault: function(event){
		if(event && event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false; // ie
		}
	}
};

//ajax函数
function ajax(url,fnSucc,fnFaild){
	//1.创建Ajax对象
	if(window.XMLHttpRequest){
		var oAjax = new XMLHttpRequest();
	}
	else{
		var oAjax = new ActiveXObject("Microsoft.XMLHttp");
		
	}
	//2.连接服务器
	oAjax.open('GET',url,true);
	//3.发送请求
	oAjax.send();
	//4.接受返回值
	oAjax.onreadystatechange = function(){
		if(oAjax.readyState == 4){  //读取完成
			if(oAjax.status == 200){  //成功
				fnSucc(oAjax.responseText);
			}
			else{
				if(fnFaild){     //传进来了才会用
					fnFaild(oAjax.status);
				}
			}
		}
	};
}

//js dom操作获取节点的一些方法
//js获取下一个兄弟节点
function getNextSibling(eleObj){
	var next = eleObj.nextSibling;
	if(next.nodeType == 3){ // 文本节点
		return next.nextSibling;
	}
	return next;
}
//js获取上一个兄弟节点
function getPreviousSibling(eleObj){
	var pre = eleObj.previousSibling;
	if(pre.nodeType == 3){
		return pre.previousSibling;
	}
	return pre;
}
//js获取所有子节点
function getChildNodes(parentNode){
	var childs = [];
	for(var i=0; i<parentNode.childNodes.length; i++){
		if(parentNode.childNodes[i].nodeType == 1){ // 元素节点
			childs.push(parentNode.childNodes[i]);
		}
	}
	return childs;
}

//js获取第一个子节点
function getFirstChildNode(parentNode){
	var first = parentNode.firstChild;
	if(first.nodeType == 3){ // 文本节点
		return first.nextSibling;
	}
	return first;
	/*return parentNode.firstElementChild;*/
}
//js获取最后一个子节点
function getLastChildNode(parentNode){
	var last = parentNode.lastChild;
	if(last.nodeType == 3){
		return last.nextSibling;
	}
	return last;
}

