//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    
  },
  onLoad: function () {
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
