
	// 顶部固定栏渐变
	var search=function(){
		//获取变量
		var header = document.querySelector('.jd-header-wrapper');
		var banner = document.querySelector('.jd-banner');
		// 获取banner的高度
		var bannerH = banner.offsetHeight;
		// console.log(header,banner)
		// 滚动事件
		window.onscroll = function(){
			// 获取滚动条的高度
			var  top = document.body.scrollTop;
			if(top < bannerH){
				// 当滚动条的高度小于banner的高度
				// 设置颜色的透明度为
				var num = top/bannerH * 0.8;
				header.style.background="rgba(255,24,27,"+num+")";
			}else{
				header.style.background="rgba(255,24,27,0.8)";	
			}
		}
	}
	// 限时秒杀
	var timer = function(){
		var seckillItem = document.querySelector('.seckill-item');
		var items = seckillItem.querySelectorAll('span');
		// 定义秒杀时间
		var time = 10*60*60;
		// 设置定时器
		setInterval(function(){
			time--;
			var h = Math.floor(time/60/60);
			var s = Math.floor((time/60)%60);
			var m = time%60;		
			items[0].innerHTML = h > 10? h: '0' + h;
			items[2].innerHTML = s > 10? s: '0' + s;
			items[4].innerHTML = m > 10? m: '0' + m;
		},1000);
	}
	//banner图
	var  bannerSlide = function(){
		// 获取变量
		// 包裹框
		var banner = document.querySelector('.jd-banner-wrapper');
		var ul1 = banner.firstElementChild;
		var bannerW = banner.offsetWidth;
		var ul2 = banner.lastElementChild;
		var lis = ul2.querySelectorAll('li');
		var images = ul1.querySelectorAll('li');

		// var 定义变量
		var index = 1;
		// 添加动画
		var addtransition = function(){
			ul1.style.transition = 'all 0.5s ease';
			ul1.style.webkitTransition = 'all 0.5s ease';
		}
		//移动位置
		var setTransform = function(wz){
			ul1.style.transform = 'translateY('+wz+'px)';
			ul1.style.webkitTransform = 'translateX('+wz+'px)';
		}
		// 移除动画
		var removetransition = function(){
			ul1.style.transition = 'none';
			ul1.style.webkitTransition = 'none';
		}
		// 小圆点移动
		function setPoint(){
			for (var i = 0; i < lis.length; i++) {
				//清楚远点的类
				lis[i].className = '';
			}
			// 给当前的点加上类
			lis[index-1].className = "active";
		}
		// 定义定时器
		var timer = setInterval(function(){
			index ++ ;
			addtransition();
			setTransform(-index*bannerW);

		},2000);

		// 过度完成以后移除动画
		ul1.addEventListener('transitionEnd',function(){
			if (index >= 9) {
				index = 1;
			}
			if(index <= 0){
				index = 8;
			}
			removetransition();
			setTransform(-index*bannerW);
			setPoint();
		},false)
		// 处理兼容性
		ul1.addEventListener('webkitTransitionEnd',function(){
			if (index >= 9) {
				index = 1;
			}
			if(index <= 0){
				index = 8;
			}
			removetransition();
			setTransform(-index*bannerW);
			setPoint();
		},false);

		// 触摸滑动事件
		var startX = 0;
		var endX = 0;
		// 定义开关，判断是否开始移动
		var isMove = false;
		//开始 
		ul1.addEventListener('touchstart',function(e){
			isMove = false;
			// console.log('start')
			clearInterval(timer);
			startX = e.touches[0].clientX;
		},false);
		//移入
		ul1.addEventListener('touchmove',function(e){
			isMove = true;
			clearInterval(timer);//清楚滚动
			e.preventDefault();
			// console.log('move');
			// 记住结束位置
			endX = e.touches[0].clientX;
			//移动的位置
			moveX = endX - startX;	
			// 当前位置
			removetransition();
			setTransform(-index*bannerW + moveX);
		},false);
		// 移除
		ul1.addEventListener('touchend',function(e){
			// console.log(moveX)
			// console.log('end');
			// 判断是否移动过名并且移动的距离是大于banner宽度4分之1
			if(isMove && Math.abs(moveX) > bannerW/6){
				//如果moveX是小于0的说明是向右移动
				if (moveX < 0) {
					index++;
				} else  { //向左移动
					index--;
				}
			}
			addtransition();
			setTransform( -index * bannerW );
			timer = setInterval(function(){
				index ++ ;
				addtransition();
				setTransform(-index*bannerW);

			},2000);
		})

	}

	/**
	 * 分类
	 */
	 //左侧分类
	 var innerLeft = function () {
	 	// 父元素
	 	var parent = document.querySelector('.jd-catLeft');
	 	// 父元素下的ul 移动的ul
	 	var moveUl = parent.querySelector('ul');
	 	//子元素集合
	 	var lis = moveUl.querySelectorAll('li');
	 	// var 每个li的高度
	 	var lisH = document.querySelector('.jd-catLeft ul li').offsetHeight;
	 	console.log(lisH)
	 	// 获取父元素高度
	 	var parentHeight = parent.offsetHeight;
	 	var ulHeight = moveUl.offsetHeight;
	 	// 设置最大值和最小值
	 	var minDistance = parentHeight - ulHeight;
	 	var maxDistance = 0
	 	// console.log(minDistance + '最小值')
	    // 添加动画
		/*添加过渡*/
	    var addTransition = function(){
	        moveUl.style.webkitTransition = "all .3s ease 0s";
	        moveUl.style.transition = "all .3s ease 0s";
	    };
	    /*删除过渡*/
	    var removeTransition = function(){
	        moveUl.style.webkitTransition = "none";
	        moveUl.style.transition = "none";
	    };
		//移动位置
		var setTransform = function(wz){
			moveUl.style.transform = 'translateY('+wz+'px)';
			moveUl.style.webkitTransform = 'translateY('+wz+'px)';
		}
	 	// 点击子元素 
	 	// 封装一个tap方法替换click
	 	// for (var i = 0; i < lis.length; i++) {
	 	// 	lis[i].onclick = function(e){	
	 	// 		for(var j = 0; j < lis.length; j++){
	 	// 			if( j != i){
	 	// 				lis[j].className = '';
	 	// 			}
	 	// 		}			
	 	// 		this.classList.add('active');
	 	// 	}
	 	// }
	 
		/**
		 * 滑动
		 */
	    var startY = 0;//开始的Y坐标
	    var endY = 0;//结束的Y坐标
	    var moveY = 0;//滑动的距离
	    var distanceY = 0;//当前translateY的值
	    var delatDistance = 150;//吸附距离
	    //滑动的时候限制的最大滑动距离和最小滑动距离

	    moveUl.addEventListener('touchstart',function(e){
	    	startY = e.touches[0].clientY;
	    },false);

	    moveUl.addEventListener('touchmove',function(e){
	    	e.preventDefault();
	    	endY = e.touches[0].clientY;
	    	moveY = endY-startY;
	    	// 设置位置 判断是否满足条件
	    	if(distanceY+moveY >maxDistance + delatDistance){
	    		moveY = 0;
	    		distanceY = maxDistance + delatDistance;
	    	}else if(distanceY+moveY < minDistance - delatDistance){
	    		moveY = 0;
	    		distanceY = minDistance - delatDistance;
	    	};
	    	removeTransition();
	    	setTransform(distanceY + moveY);

	    },false);

	    moveUl.addEventListener('touchend',function(e){
	    	// 滑动接触以后记录位置	    	
            distanceY += moveY;
            //当超过了0的时候就让子容器弹回去
            // console.log(distanceY)
	        if(distanceY > maxDistance ){
	            // console.log('向下')
	            distanceY = maxDistance;
	        }else if(distanceY < minDistance){
	        	 // console.log('向上')
	        	 distanceY = minDistance;
	        };
	        addTransition();
	        setTransform(distanceY);
	    },false);

	    	//绑定自定义属性
	 	for(var i = 0; i < lis.length; i++){
	 		// dataset['index'] 如果 html标签中 已经有了 data-index属性 那么是 赋值操作
	 		// 如果 html标签中 没有 data-index属性 那么是 添加该属性的操作
	 			lis[i].dataset['index'] = i;
	 		}
	 	fox_tap(moveUl,function(e){
	 		for(var i = 0; i < lis.length; i++){
	 			lis[i].className = '';
	 		}
	 		// 当前的高亮
	 		e.target.parentNode.className="active";
	 		// 获取当前的index
	 		var curIndex = e.target.parentNode.dataset['index'];
	 		console.log('索引值为:'+curIndex);
	 		// 计算 移动的距离
			var moveDistance = curIndex*lisH*-1;
			

			// 对 moveDistance 进行修正
			if (moveDistance>maxDistance) {
				// 如果大于最大值,将他 改回来 
				moveDistance = maxDistance;
			}else if(moveDistance <minDistance){
				// 如果 小于最小值 将他 改回 最小值
				moveDistance = minDistance;
			}

			// 开始移动
			addTransition();
			// moveDistance 就是一个 符合要求的值
			setTransform(moveDistance);
	 	})

	}
	
	/**
	 * 右边
	 */
	 function innerRight(){
	 	var parent = document.querySelector('.jd-catRight');
	 	// 父元素下的ul 移动的ul
	 	var moveUl = parent.querySelector('.jd-catRight-con');
	 	// 获取父元素高度
	 	var parentHeight = parent.offsetHeight;
	 	var ulHeight = moveUl.offsetHeight;
	 	// 设置最大值和最小值
	 	var minDistance = parentHeight - ulHeight;
	 	var maxDistance = 0;
	 	// 定义吸附
	 	var delatDistance = 150;
	 	// 添加动画
		/*添加过渡*/
	    var addTransition = function(){
	        moveUl.style.webkitTransition = "all .3s ease 0s";
	        moveUl.style.transition = "all .3s ease 0s";
	    };
	    /*删除过渡*/
	    var removeTransition = function(){
	        moveUl.style.webkitTransition = "none";
	        moveUl.style.transition = "none";
	    };
		//移动位置
		var setTransform = function(wz){
			moveUl.style.transform = 'translateY('+wz+'px)';
			moveUl.style.webkitTransform = 'translateY('+wz+'px)';
		}
			/**
		 * 滑动
		 */
	    var startY = 0;//开始的Y坐标
	    var endY = 0;//结束的Y坐标
	    var moveY = 0;//滑动的距离
	    var distanceY = 0;//当前translateY的值

	    moveUl.addEventListener('touchstart',function(e){
	    	startY = e.touches[0].clientY;
	    },false);

	    moveUl.addEventListener('touchmove',function(e){
	    	e.preventDefault();
	    	endY = e.touches[0].clientY;
	    	moveY = endY-startY;
	    	// 设置位置 判断是否满足条件
	    	if(distanceY+moveY >maxDistance + delatDistance){
	    		moveY = 0;
	    		distanceY = maxDistance + delatDistance;
	    	}else if(distanceY+moveY < minDistance - delatDistance){
	    		moveY = 0;
	    		distanceY = minDistance - delatDistance;
	    	};
	    	removeTransition();
	    	setTransform(distanceY + moveY);

	    },false);

	    moveUl.addEventListener('touchend',function(e){
	    	// 滑动接触以后记录位置	    	
            distanceY += moveY;
            //当超过了0的时候就让子容器弹回去
            // console.log(distanceY)
	        if(distanceY > maxDistance ){
	            // console.log('向下')
	            distanceY = maxDistance;
	        }else if(distanceY < minDistance){
	        	 // console.log('向上')
	        	 distanceY = minDistance;
	        };
	        addTransition();
	        setTransform(distanceY);
	    },false);
	 }
	/**
	 * 封装tap事件
	 */
	function fox_tap(element,callBack){
		// 定义初始化时间
		var startTime = 0;
		// 最大延时
		var maxTime = 200;
		//判断是否移动
		var isMove = false;
		element.addEventListener('touchstart',function(e){
			// console.log('开始');
			isMove = false;
			starTime = Date.now();//获取当前点击时间
		})	
		element.addEventListener('touchmove',function(e){
			// console.log('移动');
			isMove = true;
		})	
		element.addEventListener('touchend',function(e){
			// console.log('结束');
			if((Date.now()-starTime) > maxTime){
				// console.log('无效---长按');
				return;
			}else if(isMove == true){
				// console.log('移动');
				return;
			}
			callBack(e);
		})	
	}