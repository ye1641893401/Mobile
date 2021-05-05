webapp     由浏览器负责渲染页面  没办法调底层的功能
nativeApp     ios  android  原生语言开发  由移动设备 负责UI界面渲染
混合app

reactNative

1.frameWork7 ios
2.Amaze UI

1.不适配 两边留白

2.百分比适配 元素多了不行

3.em rem 适配 

em参照自己元素的font-szie大小
rem参照根元素html 的字体大小

4.viewport适配


混合开发： 使用userAgent判断当前页面是否在webView里打开
https://blog.csdn.net/u010394015/article/details/80608701
需求背景：需要判断网页是在否在自己app里的的webView里打开（电脑端浏览器、手机qq，手机qq浏览器，微信，微信朋友圈，微博，手机safari等除外）
1、app内部：需要调用原生app方法
2、非微信的其他浏览器或webview，提示请在微信中打开页面
3、微信：发起微信授权获取用户信息。

function openInWebview () {
    var ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') { // 微信浏览器判断
        return false
    } else if (ua.match(/QQ/i) == 'qq') { // QQ浏览器判断
        return false
    } else if (ua.match(/WeiBo/i) == "weibo") {
        return false
    } else {
        if (ua.match(/Android/i) != null) {
            return ua.match(/browser/i) == null
        } else if (ua.match(/iPhone/i) != null) {
            return ua.match(/safari/i) == null
        } else {
            return (ua.match(/macintosh/i) == null && ua.match(/windows/i) == null)
        }
    }
}

// 使用方式
if (openInWebview()) {
    // 在app内打开
    // to do something
} else {
    // 其他地方
    // 发起微信授权

备注：此判断在电脑端，使用手机模式预览，且选择安卓手机机型的时候，判断会有问题（会判断为是在app内打开）。但是在真机上是好的。
