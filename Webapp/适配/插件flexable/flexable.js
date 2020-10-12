// 这个插件也采用了传统插件的封装形式，采用了匿名函数自执行的方式将代码封装起来。
// 这样做的好处是可以避免全局变量的污染，
// 此外将window作为实现传入匿名函数中，这样一来可以减少全部变量的查找，提高性能。
// 原理：在所有资源加载之前执行这个JS。执行这个JS后，
// 会在<html>元素上增加一个data-dpr属性，以及一个font-size样式。
// JS会根据不同的设备添加不同的data-dpr值，比如说2或者3，
// 同时会给html加上对应的font-size的值，比如说75px。如此一来，
// 页面中的元素，都可以通过rem单位来设置。他们会根据html元素的font-size值做相应的计算，
// 从而实现屏幕的适配效果。 
// JS获取到当前设备屏幕的宽度(通过document.documentElement.clientWidth获取到) 
(function(win, lib) {
    // 获取到document
    var doc = win.document;
    //获取到html
    var docEl = doc.documentElement;
    //获取到视口标签
    var metaEl = doc.querySelector('meta[name="viewport"]');
    //获取手动设置的meta来控制dpr值
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    //设备缩放比
    var dpr = 0;
    //屏幕缩放比  dpr与scale是倒数关系
    var scale = 0;
    //定时器变量
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});
     // 这段代码对相应的dom元素进行了缓存获取，
    // 这样可以减少dom的访问次数，毕竟dom操作太昂贵，
    // 我们在实际编程中应该尽量减少dom操作。
    
     //如果页面中存在meta标签
    if (metaEl) {

        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            //两者是倒数关系
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        /*
        这里是判断是否存在手动设置的meta标签
        其中initial-dpr会把dpr强制设置为给定的值。如果手动设置了dpr之后，不管设备是多少的dpr，
        都会强制认为其dpr是你设置的值。
        在此不建议手动强制设置dpr，因为在Flexible中，
        只对iOS设备进行dpr的判断，对于Android系列，始终认为其dpr为1。
         */
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));    
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));    
            }
        }
    }
    // 这段代码首先会判断页面中是否已经存在相应的meta标签，
    // 如果存在，将会给出一个警告：将根据已有的meta标签来设置缩放比例


    /*
    在Flexible中，只对iOS设备进行dpr的判断，对于Android系列，始终认为其dpr为1。
     */
    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        //获取设备缩放比
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {               
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
         //设置缩放比例//scale和dpr成倒数关系
        scale = 1 / dpr;
    }
    // 下面这段代码在页面中不存在相应的meta标签时，
    // 会自动创建一个meta标签，并会根据页面的dpr来设置相应的页面缩放比。
    // 个人觉得这一点设计的很人性化，
    // 开发人员可以自己定义meta标签，如果没有定义，
    // 则代码会自动帮你根据不同的设备生成相应的meta标签，这个很不错。



    //给html标签设置自定义属性data-dpr
    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
          //通过JS来动态改写meta标签
         //如果不存在metaEl，则动态创建meta标签
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
            // console.log(docEl.firstElementChild);//head
            //这里是将新创建的meta标签插入到head标签中
        } else {
             //如果没有head标签，则新创建一个包裹元素
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }
    //刷新当前页面的rem基准值
    function refreshRem(){
         //获取设备的宽度
        // console.log(docEl.getBoundingClientRect());
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {
            //给屏幕设置最大的宽度值(1080,dpr是2)，防止页面在PC端展示遭到破坏
            width = 540 * dpr;
        }
        //Flexible会将视觉稿分成100份（主要为了以后能更好的兼容vh和vw）
        var rem = width / 10;
        // console.log(rem);
        //设置html元素的字体大小作为基准值
        docEl.style.fontSize = rem + 'px';
        //当前页面的rem基准值
        flexible.rem = win.rem = rem;
    }
    // getBoundingClientRect()；该方法获得页面中某个元素的左，
    // 上，右和下分别相对浏览器视窗的位置以及这个元素的宽和高，
    // 这个方法返回的是一个对象，即Object，该对象有是个属性：
    // top，left，right，bottom，width和height。 
    // 此外，手淘对于页面大小设置了一个临界点，
    // 当设备竖着时横向物理分辨率大于1080时，html的font-size就不会变化了，
    // 原因是：这样的分辨率已经可以去访问电脑版页面了，防止移动端页面在PC端展示遭到破坏。
   
   
   //监听resize事件
   //当设备屏幕尺寸发生变化时，更新当前页面的rem基准值
    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
     //监听pageshow事件
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);
  /*
    针对不同的浏览器做domReady兼容
    IE6,7,8都不支持DOMContentLoaded事件
     */
    if (doc.readyState === 'complete') {
        //针对不支持DOMContentLoaded事件做兼容
        //根据不同的dpr来设置不同的字体大小，因为
        // 防止页面设置了缩放scale属性值而导致不同设备上字体大小不一致
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        //如果支持DOMContentLoaded事件，则直接使用
         // alert("DOMContentLoaded");
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }
    

    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            //把rem转换为px
            val += 'px';
        }
        return val;
    }
      //把px转换为rem
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['640'] || (window['lib'] = {}));
//1. 640是设计稿的宽度
// 2.编辑器中改为 设置中cssrem  rootfontsize  改为以哪个配置作为基准的大小
// (window, window['640'] || (window['lib'] = {}));
// 参数window[‘lib’] || (window[‘lib’] = {} –> 如果lib已经定义
// window[‘lib’]能获取到），就传这个lib，如果没有定义就给lib赋值空对象，
// 并传入lib。为了避免重复定义。 
//  这个时候在flexible.js里面的lib其实就已经是window.lib了（js中对象按引用传递）
  