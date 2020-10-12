1. 屏幕分辨率 

        描述屏幕大小(相对单位iPhone4余iphone5屏幕大小一样分辨率不一样)分辨率 (a*b)a是垂直*水平

2. 屏幕尺寸
        
        描述具体(绝对单位像 米 厘米)大小英寸 对角线长度

3. 屏幕密度
        
        每英寸上的物理像素的个数（1英寸=2.54cm）

4. 视口尺寸
        
        代表横纵向css像素的个数（css像素）

5. ppi 与 dpi 一样
       描述清晰度  每英寸像素数该值越高，则屏幕越细腻  
           根号下 分辨率屏放相加 / 屏幕尺寸  对角线上有多少点每英寸几个点
           高清屏（retina具备足够高的物理像素密度而使人体肉眼无法分辨其中单独像素点的液晶屏
           1.一种具备超高像素密度的液晶屏
           2.同样大小屏幕上显示的像素点由一个变为多个
           3。高清屏与普通屏相比，相同区域的物理像素点数，高清是普通的4倍，ppi>320
           ppi越大像素实际大小越小显示的越精细

    ## 独立像素
        ppi 的不同导致像素都是一英寸的时候实际大小不一样，那展示的时候都是10px ppi大的展示不全所以引入独立像素
        ios 叫pt android叫 dp
        获取：window.devicePixelRaito(像素与设备独立像素的关系)
6. dpi (像素密度)打印行业用dpi

      每英寸多少点，该值越高，则图片越细腻
      屏幕通常每英寸包含72或96个点，但打印文档的dpi通常要大得多。 1英寸是2.54厘米，1dpi≈0.39dpcm。
      dpi最初用于衡量打印物上每英寸的点数密度。DPI值越小图片越不精细。当DPI的概念用在计算机屏幕上时，就应称之为ppi。同理： PPI就是计算机屏幕上每英寸可以显示的像素点的数量。因此，在电子屏幕显示中提到的ppi和dpi是一样的，可认为  公式二：dpi=ppi
  
      
    
7. dppx 

      表示每个px的点数。 由于CSS px的固定比率为1:96，n.
      resolution 定义设备的分辨率。如：96dpi, 300dpi, 118dpcm
      max/min-resolution 定义设备的最大/小分辨率。
      @media only screen and (min-resolution :1dppx)
      @media only screen and (min-resolution :2dppx)
      @media only screen and (min-resolution :3dppx)
      @media only screen and (min-resolution :4dppx)

8.  dpcm

      每厘米上的点数。1英寸是2.54厘米, 1dpcm ≈ 2.54dpi.

9. dpr 
        
    像素比 ==>物理像素/设备独立像素
	一个方向上所占据的物理像素的个数/一个方向上所占据的css像素的个数
