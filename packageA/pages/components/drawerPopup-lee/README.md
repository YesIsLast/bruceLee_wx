# drawerPopup-lee 组件文档（微信小程序原生版）

#使用技术点：无

# 代码示例
```html
<!-- 使用方式 -->
<view bindtap="openDrawer" data-params="drawerPopupLeeVal"></view>
<!-- 组件抽屉 -->
<drawerPopupLee name="drawerPopupLeeVal" mode='bottom' width="100vw" height="50vh" borderRadius="30rpx 30rpx 0 0" show="{{drawerPopupLeeVal}}"
  bind:close="closeDrawer">
  <text>我是定制的内容1</text>
</drawerPopupLee>
```
```json
"usingComponents": {
	"drawerPopupLee": "/components/drawerPopup-lee/drawerPopup-lee"
},
```
```js
drawerPopupLeeVal: false, // 变量是否显示弹出框

// 打开指定抽屉
openDrawer(event) {
	console.log("打开抽屉", event.currentTarget.dataset.params)
	this.setData({
		[event.currentTarget.dataset.params]: true
	})
},
/**
 * 关闭抽屉
 * @param {*} evevt 接收子组件传参，关闭指定抽屉
 */
closeDrawer(evevt) {
	console.log("关闭抽屉",evevt.detail.name)
	this.setData({
		[evevt.detail.name]: false
	})
},
```
# 组件参数,(详细请查看组件prop注释)
|1|2|3|4|
|---|---|---|---|
|2|2|2|2|


# 组件实现效果
	1、上下左右方向弹出
	2、蒙版淡入淡出效果
	3、抽屉弹出动画
# uni-app兼容平台
	目前只进行了app平台的测试，其他平台是否兼容待测试
#常见问题
	1、蒙版全屏覆盖，想要实现次效果需禁用原生导航栏，或通过跳转到禁用原生导航的新页面来实现可参考案例[](https://ext.dcloud.net.cn/plugin?id=953)
		如禁用原生导航需要在page.json中对当前页的路由配置设置为
```js
"style": {
	"navigationBarTitleText": "HBUILDER",
	"app-plus": {
		"titleNView": false, // 是否使用自定义导航栏
		"animationType": "fade-in",
		"animationDuration": 300
	}
}
// 或
"style": {
	"navigationStyle":"custom"
}
```