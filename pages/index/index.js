//index.js
//获取应用实例
const App = getApp()
Page({
  data: {
    navH:null, // 顶部导航栏高度
    carousel_currentGo:false, // 接班动画
    carousel_currentBack:false, // 送班动画
  },
  onLoad: function () {
    this.setData({
      navH: App.globalData.navHeight + 10
    })
  },
  onReady:function(){
    setTimeout(() => {
      this.setData({
        carousel_currentGo: true
      })
    }, 1000);
   
  },
  menuJump: function(e) {
    wx.navigateTo({
      url: '/pages/mapDemo/mapDemo',
      complete:function(com){
        // console.log(com)
      }
    })
  },
  // 轮播动画切换结束事件
  bindanimationfinish(e){
    console.log(e.detail)
    // 判断当前轮播图所执行得动画
    setTimeout(() => {
      if(e.detail.current == 1){
        this.setData({
          carousel_currentGo: false,
          carousel_currentBack:true
        })
      } else if(e.detail.current == 0) {
        this.setData({
          carousel_currentGo: true,
          carousel_currentBack:false
        })
      }else {
        this.setData({
          carousel_currentGo: true,
          carousel_currentBack:true
        })
      }
    }, 500);
  }
})
