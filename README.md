# bruceLee_wx
微信小程序学习DEMO

# 微信扫一扫查看小程序

![Image text](./static/img/小李同学呢.png)

## 自定义菜单tabbar组件(两种tabbar组件，不同使用情况可自行选择使用)
- 不同的组件，不同的展示效果，请根据具体需求自行使用

  首先引入官方文档示例代码
  https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html
  更改组件需要的tabbar样式，调整需要跳转的页面路径
  注意别忘记修改app.json中的tabbar配置


## 踩坑记录

- 1、微信小程序的方法传值需要使用html5的`data-xx="xx"`,同时注意data-参数名称为全小写，因为在接收event的时候即便有大写的字母也会转换为小写，防止在event中因大小写接收不到参数值，`千万注意！` `千万注意！` `千万注意！`