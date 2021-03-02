
1. 移动端默认把数字当电话
2. 移动端自己放大字体智能 Font Boosting

h5 拉起app 下载
https://blog.csdn.net/echo_ae/article/details/80389769
https://www.cnblogs.com/wangyuanyuan-blog/p/6860907.html
https://echozq.github.io/echo-blog/2015/11/13/callapp.html
https://www.cnblogs.com/dhcn/p/7124686.html
iframe
var last = Date.now(),
	doc = window.document,
	ifr = doc.createElement('iframe');

//创建一个隐藏的iframe
ifr.src = nativeUrl;
ifr.style.cssText = 'display:none;border:0;width:0;height:0;';
doc.body.appendChild(ifr);

setTimeout(function() {
	doc.body.removeChild(ifr);
	//setTimeout回小于2000一般为唤起失败 
	if (Date.now() - last < 2000) {
    	if (typeof onFail == 'function') {
        	onFail();
    	} else {
        	//弹窗提示或下载处理等
    	}
	} else {
    	if (typeof onSuccess == 'function') {
        	onSuccess();
    	}
	}
}, 1000);
iframe方案的唤起原理是: 程序切换到后台时，计时器会被推迟(计时器不准的又一种情况)。如果app被唤醒那么网页必然就进入了后台，如果用户从app切回来，那么时间一般会超过2s;若app没有被唤起，那么网页不会进入后台，setTimeout基本准时触发，那么时间不会超过2s。

window.location.href直接跳转
window.location.href = nativeUrl;
a标签唤起
<a href="nativeUrl">唤起app</a>

var toApp = function () {
  if (ecWap.isiOSO) {
   // ios拉起
   // window.location.href = ecWap.pullUpAppcIient.action
  } else {
   //安卓拉起操作iframe
   var editor = $('#pullApp')[0].contentWindow;
   editor.document.open();
   editor.document.writeIn('<a id='pullUpApp' onclick="window.location.href=\" +ecWap.pullUpAppcIient.action+ '\'"></a>);
   editor.document.close();
   var ifmObj =  editor.document.getElementById('pullApp')
   ifmObj.click()
  }
}

var t = 2000, hasApp = true;
   var t1 = Date.nowO;
   var ifr =document.createElement("iframe");
   ifr.src = ecWap.pullllpAppcIient.action
   ifr.style.display = 'none';
   document.body.appendChild(ifr);
   setTimeout(function () {
    var t2 = Date.now();
    if (!t1 ||t2-t1 < t + 100){
      window.location.href = url;
    } else {
      return false;
	}
   },t)
