//index.js
//获取应用实例
const App = getApp()
Page({
  data: {
    navH:null, // 顶部导航栏高度
  },
  onLoad: function () {
    this.setData({
      navH: App.globalData.navHeight + 10,
    })
  },
  menuJump: function(e) {
    console.log(e,e.target.dataset)
    
    wx.navigateTo({
      url: '/pages/mapDemo/mapDemo',
      complete:function(com){
        // console.log(com)
      }
    })
  }
})
