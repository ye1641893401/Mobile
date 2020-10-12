window.onload = function(){
    searchBg()
    bannerEffect()
}

//    设置搜素条背景色
function searchBg(){
    let banner = $('#jd-banner')
    let search = $('#jd-search')
 
        window.onscroll = function(){
         if(document.documentElement.scrollTop < banner.offsetHeight){
 
            let opacity = document.documentElement.scrollTop/banner.offsetHeight
 
            search.style.background = `rgba(233,35,34,${opacity})`
        }
        
     }
}

// 倒计时
setInterval(TimeBack,1000)
function TimeBack(){
    let timeSpan = $('.SKTime')[0]
    // console.log(timeSpan.children[0])
    let start = new Date()
    let end = new Date('2019-9-2 14:00:00')
    if(end-start>0){
        getInterval(start,end)
        // console.log(getInterval(start,end).hour)
        // console.log(getInterval(start,end).second)
        // console.log(getInterval(start,end).minute)
        timeSpan.children[0].innerHTML = Math.floor(getInterval(start,end).hour/10)
        timeSpan.children[1].innerHTML = Math.floor(getInterval(start,end).hour%10)
        timeSpan.children[3].innerHTML = Math.floor(getInterval(start,end).minute/10)
        timeSpan.children[4].innerHTML = Math.floor(getInterval(start,end).minute%10)
        timeSpan.children[6].innerHTML = Math.floor(getInterval(start,end).second/10)
        timeSpan.children[7].innerHTML = Math.floor(getInterval(start,end).second%10)
    }
   
}

// 轮播
 function bannerEffect(){
    // 1.轮播展示框
    let show = $('#jd-banner')
    // 2.存放轮播图片框
    let imgBox = $('#bannerImgBox')
    // 3.clone图片
    let firstImg = imgBox.firstElementChild
    let lastImg = imgBox.lastElementChild
    // console.log(lastImg)
    // 末尾添加第一张，首位添加最后一张
    imgBox.appendChild(firstImg.cloneNode(true))
    imgBox.insertBefore(lastImg.cloneNode(true), imgBox.firstChild)
    // 存放图片盒子的宽
    imgBox.style.width = show.offsetWidth * imgBox.children.length + 'px';
    // 每一个盒子的宽
    for (let i = 0; i < imgBox.children.length; i++) {
        imgBox.children[i].style.width = imgBox.offsetWidth / imgBox.children.length + 'px'
    }

    // 调整第一张图片的位置
    // imgBox.style.transform = `translateX(${-imgBox.children[0].OffsetWidth}px)` 
    imgBox.style.left = -imgBox.children[0].offsetWidth + 'px'

    //动态设置样式
    window.onresize = function () {
        imgBox.style.width = show.offsetWidth * imgBox.children.length + 'px';
        // 每一个盒子的宽
        for (let i = 0; i < imgBox.children.length; i++) {
            imgBox.children[i].style.width = imgBox.offsetWidth / imgBox.children.length + 'px'
        }

        // 调整第一张图片的位置
        // imgBox.style.transform = `translateX(${-imgBox.children[0].OffsetWidth}px)` 
        imgBox.style.left = -imgBox.children[0].offsetWidth + 'px'
        bannerWidth = imgBox.children[0].offsetWidth;
    }

     /*定义图片索引:图片已经有一个宽度的默认偏移*/
     let index=1;
     let bannerWidth = imgBox.children[0].offsetWidth;
     let count = imgBox.children.length;
     let timerId;
    //  按钮功能
     function activeBtn(index){
        var btn = $('.banner-btn')[0].children
        /*先清除其它li元素的active样式*/
        for(var i=0;i<btn.length;i++){
            btn[i].classList.remove("BtnActive");
        }
        /*为当前li元素添加active样式*/
        btn[index-1].classList.add("BtnActive");
      
    }
// 自动播放
function startTime(){
    timerId=setInterval(function(){
        /*5.1 变换索引*/
        index++;
        
        /*5.2.添加过渡效果*/
        imgBox.style.transition="left 0.5s ease-in-out";
        /*5.3 设置偏移*/
        imgBox.style.left=(-index*bannerWidth)+"px";
        /*5.4 判断是否到最后一张，如果是则回到索引1的位置*/
        setTimeout(function(){
            if(index==count-1){
                index=1;
                /*如果一个元素的某个属性之前添加过过渡效果，那么过渡属性会一直存在，如果不想要，则需要清除过渡效果*/
                /*关闭过渡效果*/
                imgBox.style.transition="none";
                /*偏移到指定的位置*/
                imgBox.style.left=(-index*bannerWidth)+"px";
            }
            activeBtn(index)
        },500);
    },1000);
}

startTime()
    /*6.实现手动轮播*/
    var startX,moveX,distanceX;
    /*标记当前过渡效果是否已经执行完毕*/
    var isEnd=true;
    /*为图片添加触摸事件--触摸开始*/
    imgBox.addEventListener("touchstart",function(e){
        /*清除定时器*/
        clearInterval(timerId);
        /*获取当前手指的起始位置*/
        startX= e.targetTouches[0].clientX;
    });
    /*为图片添加触摸事件--滑动过程*/
    imgBox.addEventListener("touchmove",function(e){
        if(isEnd==true){
            console.log("touchmove");
            /*记录手指在滑动过程中的位置*/
            moveX= e.targetTouches[0].clientX;
            /*计算坐标的差异*/
            distanceX=moveX-startX;
            /*为了保证效果正常，将之前可能添加的过渡样式清除*/
            imgBox.style.transition="none";
            /*实现元素的偏移  left参照最原始的坐标
             * 重大细节：本次的滑动操作应该基于之前轮播图已经偏移的距离*/
            imgBox.style.left=(-index*bannerWidth + distanceX)+"px";
        }
    });
    /*添加触摸结束事件*/
    /*touchend:松开手指触发*/
    imgBox.addEventListener("touchend",function(e){
        /*松开手指，标记当前过渡效果正在执行*/
        isEnd=false;
        /*获取当前滑动的距离，判断距离是否超出指定的范围 100px*/
        if(Math.abs(distanceX) > 100){
            /*判断滑动的方向*/
            if(distanceX > 0){//上一张
                index--;
            }
            else{ //下一张
                index++;
            }
            /*翻页*/
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        else if(Math.abs(distanceX) > 0){ //得保证用户确实进行过滑动操作
            /*回弹*/
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left=-index*bannerWidth+"px";
        }
        /*将上一次move所产生的数据重置为0*/
        startX=0;
        moveX=0;
        distanceX=0;
    });

    /*webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕，当一个元素的过渡效果执行完毕的时候，会触发这个事件*/
    imgBox.addEventListener("webkitTransitionEnd",function(){
        console.log("webkitTransitionEnd");
        /*如果到了最后一张(count-1)，回到索引1*/
        /*如果到了第一张(0)，回到索引count-2*/
        if(index==count-1){
            index=1;
            /*清除过渡*/
            imgBox.style.transition="none";
            /*设置偏移*/
            imgBox.style.left=-index*bannerWidth+"px";
        }
        else if(index==0){
            index=count-2;
            /*清除过渡*/
            imgBox.style.transition="none";
            /*设置偏移*/
            imgBox.style.left=-index*bannerWidth+"px";
        }
        /*设置标记*/
        activeBtn(index);
        setTimeout(function(){
            isEnd=true;
            /*清除之前添加的定时器*/
            clearInterval(timerId);
            //重新开启定时器
            startTime();},100);
    });
    
  }

// zepto 按需引用

// 使用插件 swiper  轮播

