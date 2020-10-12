# 移动端事件

1. 触屏：支持

2. 指针：浏览器实现不统一

3. 事件
                                    pc端

	touchstart		               mousedown
	touchmove(不可能单独触发)		mousemove(可以单独触发)	  
	touchend                       mouseup

4. 默认事件

   浏览器 移动端长按默认复制 是事件的默认行为 在 touchstart

   下拉有橡皮筋效果    
   阻止默认行为  return false 本身阻止，有没有冒泡 ev.stopPropagation() 冒泡

# 注意：
    不能直接 dom.ontouchmove  绑事件 低版本不支持
    通过 addEventListener

    console.log(ev.cancelBubble) //查看是否可以取消默认事件

    多层嵌套要考虑 冒泡 阻止默认事件

    移动端长按不会触发click事件也就是不会触发a标签的默认click事件
    原因：click事件在移动端是同一像素点按下起开
    长按可能不在同一像素点
    2.移动端长按默认是复制粘贴

    document.addEventListener("touchstart",function(ev){
				ev=ev||event;
				ev.preventDefault();
	})
    这个一写滚动条失效