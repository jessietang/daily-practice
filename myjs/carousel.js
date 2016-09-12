;(function($){
	
	var Carousel = function(poster){
		//保存单个旋转木马对象
		var self = this;
		this.poster = poster;
		this.posterItemMain = poster.find('ul.poster-list');
		this.nextBtn = poster.find('div.poster-next-button');
		this.prevBtn = poster.find('div.poster-prev-button');
		this.posterFirstItem = poster.find('li.poster-item').eq(0);
		this.posterItems = poster.find('li.poster-item');
		
		if(this.posterItems.size()%2 == 0){  //偶数个li时  【放到获取第一张和最后一张的前面】
			this.posterItemMain.append(this.posterItems.eq(0).clone());  //把第一张克隆一个放到最后面去
			this.posterItems = this.posterItemMain.children();   //再重新获取一下所有的li
		};
		
		this.posterFirstItem = this.posterItems.first();
		this.posterLastItem = this.posterItems.last();
		this.rotateFlag   = true;   //解决点击快出现的bug
		
		//默认的配置参数
		this.setting = {
				"width":1000,  //幻灯片的宽度
				"height":270,   //幻灯片的高度
				"posterWidth":640,  //第一帧宽度
				"posterHeight":270,  //第一帧高度
				"scale":0.8,       //记录显示比例关系
				"speed":500,
				"autoPlay":false,
				"delay":5000,
				"verticalAlign":"middle"
		};
		$.extend(this.setting,this.getSetting());  //扩展获取人工配置的参数
		//console.log(this.setting);
		//console.log(this.posterItems.size());
		
		//设置配置参数值
		this.setSettingValue();
		this.setPosterPos();
		this.setVerticalAlign();
		
		//左旋转按钮
		this.nextBtn.click(function(){
			if(self.rotateFlag){
				self.rotateFlag = false;//解决点击快出现的bug
				self.carouseRotate("left");
			}
		});
		//右旋转按钮
		this.prevBtn.click(function(){
			if(self.rotateFlag){
				self.rotateFlag = false;//解决点击快出现的bug
				self.carouseRotate("right");
			}
		});
		//是否开启自动播放
		if(this.setting.autoPlay){
			this.autoPlay();
			this.poster.hover(function(){
				window.clearInterval(self.timer);
			},function(){
				self.autoPlay();
			});
		}
	};
	
	
	
	
	
	
	
	
	Carousel.prototype = {
		//6.自动播放
		autoPlay:function(){
			var self = this;
			this.timer = window.setInterval(function(){
				self.nextBtn.click();
			},this.setting.delay);
		},
		//5.旋转
		carouseRotate:function(dir){
			//alert('nnnn');
			var _this_ = this;
			var zIndexArr = [];
			if(dir === 'left'){   //左旋转
				this.posterItems.each(function(){
					var self = $(this),
						prev = self.prev().get(0)?self.prev():_this_.posterLastItem,
						width = prev.width(),
						height = prev.height(),
						zIndex = prev.css("zIndex"),
						opacity = prev.css("opacity"),
						left = prev.css("left"),
						top = prev.css("top");
						zIndexArr.push(zIndex);
						self.animate({
							width:width,
							height:height,
							zIndex:zIndex,
							opacity:opacity,
							left:left,
							top:top
						},_this_.setting.speed,function(){
							_this_.rotateFlag = true;  //解决点击快出现的bug
						});
				});
				//zIndex需要单独保存再设置，防止循环时候设置再取的时候值永远是最后一个的
				this.posterItems.each(function(i){
					$(this).css("zIndex",zIndexArr[i]);
				});
			}else if(dir === 'right'){  //右旋转
				this.posterItems.each(function(){
					var self = $(this),
						next = self.next().get(0)?self.next():_this_.posterFirstItem,
						width = next.width(),
						height = next.height(),
						zIndex = next.css("zIndex"),
						opacity = next.css("opacity"),
						left = next.css("left"),
						top = next.css("top");
						zIndexArr.push(zIndex);
						self.animate({
							width:width,
							height:height,
							zIndex:zIndex,
							opacity:opacity,
							left:left,
							top:top
						},_this_.setting.speed,function(){
							_this_.rotateFlag = true;  //解决点击快出现的bug
						});
				});
				//zIndex需要单独保存再设置，防止循环时候设置再取的时候值永远是最后一个的
				this.posterItems.each(function(i){
					$(this).css("zIndex",zIndexArr[i]);
				});
			}
			
		},
		//3.设置剩余的帧的位置关系
		setPosterPos:function(){
			var self = this;
			var sliceItems = this.posterItems.slice(1), //截取第一后剩余的
				sliceSize = sliceItems.size()/2,
				rightSlice = sliceItems.slice(0,sliceSize), //右边剩余的帧
				level = Math.floor(this.posterItems.size()/2),
				leftSlice = sliceItems.slice(sliceSize);  //左边剩余的帧
			//alert(leftSlice.size());
			
			//alert(level);
			//设置右边帧的位置关系和宽度高度top
			var rw = this.setting.posterWidth,
				rh = this.setting.posterHeight,
				gap = ((this.setting.width-this.setting.posterWidth)/2)/level;
			var firstLeft = (this.setting.width-this.setting.posterWidth)/2;//第一帧的left
			var fixOffsetLeft = firstLeft + rw;//第一帧右边距离左边的值，相对于幻灯片
			//alert(gap);
			//设置右边位置关系
			rightSlice.each(function(i){
				level--;
				rw = rw*self.setting.scale;
				rh = rh*self.setting.scale;
				var j = i;
				$(this).css({
					width:rw,
					height:rh,
					opacity:1/(++j),
					left:fixOffsetLeft+(++i)*gap-rw,
					top:self.setVerticalAlign(rh)
				});
			});
			//设置左边的位置关系
			var lw = rightSlice.last().width(),
				lh = rightSlice.last().height(),
				oloop = Math.floor(this.posterItems.size()/2);
			leftSlice.each(function(i){
				$(this).css({
					zIndex:i,
					width:lw,
					height:lh,
					opacity:1/oloop,
					left:i*gap,
					top:self.setVerticalAlign(lh)
				});
				lw = lw/self.setting.scale;
				lh = lh/self.setting.scale;
				oloop--;
			});
		},
		//4.设置垂直排列对齐
		setVerticalAlign:function(height){
			var verticalType = this.setting.verticalAlign,
				top = 0;
			if(verticalType === "middle"){
				top = (this.setting.height-height)/2;
			}else if(verticalType === "top"){
				top = 0;
			}else if(verticalType === "bottom"){
				top = this.setting.height-height;
			}else{  //人工配置的参数配错了的话执行
				top = (this.setting.height-height)/2;
			}
			return top;
		},
		//2.设置配置参数值去控制基本的宽，高，，，，
		setSettingValue:function(){
			this.poster.css({    //幻灯片
				width:this.setting.width,
				height:this.setting.height
			});
			this.posterItemMain.css({   //ul
				width:this.setting.width,
				height:this.setting.height
			});
			
			//计算上下切换按钮宽度
			var w = (this.setting.width-this.setting.posterWidth)/2;
			//设置切换按钮的宽，高，层级关系
			//console.log((this.posterItems.size())/2);  //3.5
			this.nextBtn.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil((this.posterItems.size())/2)
			});
			this.prevBtn.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil((this.posterItems.size())/2)
			});
			//设置第一帧的宽高,层级关系
			this.posterFirstItem.css({
				width:this.setting.posterWidth,
				height:this.setting.posterHeight,
				left:w,
				top:0,
				zIndex:Math.floor((this.posterItems.size())/2)
			});
			
		},
		//1.获取人工配置参数
		getSetting:function(){
			var setting = this.poster.attr("data-setting");
			if(setting && setting != ""){
				return $.parseJSON(setting);   //转化成json对象
			}else{
				return {};
			}
		}
	};
	Carousel.init = function(posters){
		var _this_ = this;
		posters.each(function(){
			new _this_($(this));  //_this_指Carousel   this指posters中的每一个,包装成jq对象
		});
		
	};
	window["Carousel"] = Carousel;
})(jQuery);