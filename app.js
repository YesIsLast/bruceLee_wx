//app.js
App({
  onLaunch: function () {
    // 全局自定义导航栏高度适配
    // 感谢博主的计算公式 https://www.cnblogs.com/sese/p/9761713.html
    // 发现BUG：适配导航栏高度时，注意微信小程序的胶囊按钮有上下2px的外边距
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        // 计算
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2,
          capsuleBtnWidth = menuButtonObject.width + (res.windowWidth - menuButtonObject.right) * 2;
        // 赋值
        this.globalData.navHeight = navHeight; // 导航栏整体高度(信号栏 + 胶囊按钮栏)
        this.globalData.navContentHeight = menuButtonObject.height; // 导航栏内容区高度(胶囊按钮栏)
        this.globalData.navTop = navTop;//胶囊按钮与顶部的距离
        this.globalData.capsuleBtnWidth = capsuleBtnWidth // 胶囊按钮所占宽度(屏幕宽度-胶囊右边界坐标=胶囊右侧外边距)
        this.globalData.windowWidth = res.windowWidth // 手机屏幕宽度
      },
      fail(err) {
        console.error(err);
      }
    })
  },
  globalData: {

  }
})