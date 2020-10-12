1. pc 无缝滑屏==轮播 只考虑一个方向 左--》右
   而且是自己滑动不会影响其他效果
   在使用的是定位加Left top

2. 移动端满屏滑动 我可以上下滑 ，这时候会触发 轮播在移动端这种叫放抖动
   移动不可以  因为left top 会在移动端发生重绘重排 ，滑一会手机没电了
   translateX||Y  他也会发生重绘重排但是只在它拿一层图层所以性能比较高而且高不是一点点

3. position 到 transform
   1.offsetleft 元素偏移量参照offsetParent
   2.transform 造成的偏移量不会被offsetLeft 使用不在同一图层上
   3.每次动的时候 offsetLeft在计算 移动没有这个API所以手动计算var translateX

4. 无缝思想
   无缝：复制一组图片，当点击第一组第一张时瞬间跳到第二组的第一张
						      当点击第二组最后一张时瞬间跳到第一组的最后一张
5. dom属性判断是否无缝（组件封装思想）
   <div class="carousel-wrap" needAuto >
   var needCarousel = carouselWrap.getAttribute("needAuto");
					needCarousel = needCarousel == null?false:true;
					if(needCarousel){
						arr=arr.concat(arr);
	}

6. 解读设置无过渡不生效问题
  jsz执行快设置样式没有立即渲染完成  下面的代码覆盖上面
  if(index == 1-arr.length){
		ulNode.style.transition="none";
		index = 1-arr.length/2;
		damu.css(ulNode,"translateX",index*document.documentElclientWidth);
  }
  加延迟解决
  setTimeout(function(){
  	index--;
  	ulNode.style.transition="1s transform";
  	xiaoyuandian(index);
  	damu.css(ulNode,"translateX",index*document.documentEclientWidth);
  },50)
  					