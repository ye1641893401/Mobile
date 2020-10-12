# 放大:
	一个css像素的面积变大,视觉视口内css像素的个数变少,视觉视口的尺寸变小(看到的少了)
# 缩小
	一个css像素的面积变大,视觉视口内css像素的个数变多,视觉视口的尺寸变大
	

# 在pc端缩放
    用户缩放影响视口的尺寸 影响布局视口  你放大放大 左右两个盒子会挨到一起说明缩放影响了布局视口

# 在移动端缩放  
      用户缩放影响视觉视口的尺寸 不会影响布局



 
# 用户缩放
   只影响视觉视口
   user-scalable = no
   ios10 不支持所以
   所以有 minmum-scale =1 允许最小的缩放比例
   maximum-scale = 1 允许最大的缩放比例 代替
   minmum-scale maximum-scale 
   没有这些指令，默认为20% - 500%
   有这些指令。可扩大到10%-1000%
   安卓webkit 不支持minmum-sclae 属性 （默认缩放25%-400%）
   IE不认识

# 系统（initial-scale）
                                     375
        系统缩放 content = "initial-scale=1.0" 与 width = device-width 效果一样
                        initial-scale = 2.0  面积变大个数变少 375/2
         系统缩放参照与理想视口改的是布局视口和视觉视口
        视觉视口大于布局视口  超出视觉视口不会出现滚动条 
        只写一个叫理想视口 width=device-width || initial-scale=1.0
        <meta name="viewport" content="width=device-width"/>
        完美视口
        超出视觉视口出现滚动条 
        <!-- width=device-width, initial-scale=1.0 作用一样把布局视口调整成和设备独立像素一      样大 
         把布局视口变成理想视口
        -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
  当你设计的宽度大于布局视口 可是视觉视口不会出现滚动条 他会包住布局视口 
	影响布局视口和视觉视口
	放大
		放大一个css像素的面积,视觉视口的尺寸变小，一个css像素包含的物的个数变多
	缩小
		缩小一个css像素的面积,视觉视口的尺寸变大，一个css像素包含的物理像素的个数变少