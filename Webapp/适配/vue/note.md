1.rem 适配
 import 'lib-flexible'
2.px 自动转换为rem
  "postcss-pxtorem":'^4.0.1'

2.scss
 @function px($px) {
     @warn 'warn me'
     @return $px/20*1rem
 }
npm install node-sass sass-loader
字体转换 
@mixin font-dpr ($font-size) {
    font-size: $font-size;
    [data-dpr="2"] & {
      font-size: $font-size * 2;
    }
    [data-dpr="3"] & {
      font-size: $font-size * 3;
    }
  }
px转换为rem
  @function px2rem ($px, $base-font-size: 64px) {
    @if unitless($px) {
      @warn "Assuming #{$px} to be in pixels, attempting to convert it into pixels for you";
      @return px2rem($px * 1px);
    } @else if unit($px) == rem {
      @return $px;
    }
    @return ($px / $base-font-size) * 1rem;
  }
 
 https://blog.csdn.net/weixin_43650973/article/details/84931598