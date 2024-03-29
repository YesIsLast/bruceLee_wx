//index.js
//获取应用实例
const App = getApp()
Page({
  data: {
    carouselTop: null, // 班车任务轮播图距离顶部坐标
    carousel_currentGo: false, // 接班动画
    carousel_currentBack: false, // 送班动画
    touchS: [0, 0], // 触摸滑动开始坐标
    touchE: [0, 0], // 触摸滑动结束坐标
    homeMenuOpen: false, // 首页菜单是否展开
    tabActive: 0, // tab选中项下标
  },
  onLoad: function () {
    this.setData({
      carouselTop: App.globalData.navHeight - 20
    })
  },
  onReady: function () {
    setTimeout(() => {
      this.setData({
        carousel_currentGo: true
      })
    }, 1000);

  },
  // tab选项卡点击事件
  tabClick(e) {
    console.log(e.currentTarget.dataset.params)
    this.setData({
      tabActive: e.currentTarget.dataset.params
    })
  },
  // 菜单下滑
  touchMenuStart: function (e) {
    let sx = e.touches[0].pageX
    let sy = e.touches[0].pageY
    this.data.touchS = [sx, sy]
  },
  touchMenuMove: function (e) {
    let sx = e.touches[0].pageX;
    let sy = e.touches[0].pageY;
    this.data.touchE = [sx, sy]
  },
  touchMenuEnd: function (e) {
    let start = this.data.touchS
    let end = this.data.touchE
    console.log(start)
    console.log(end)
    // 菜单执行操作后，滚动到页面顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
    if (start[1] < end[1] - 50) {
      console.log('下滑展开菜单')
      this.setData({
        homeMenuOpen: true
      })
    } else if (start[1] > end[1] + 50) {
      console.log('上滑收回菜单')
      this.setData({
        homeMenuOpen: false
      })
    } else {
      console.log('静止点击收回菜单')
      this.setData({
        homeMenuOpen: false
      })
    }
  },
  // 菜单跳转
  menuJump: function (e) {
    wx.navigateTo({
      url: '/pages/mapDemo/mapDemo',
      complete: function (com) {
        // console.log(com)
      }
    })
  },
  // 轮播动画切换结束事件
  bindanimationfinish(e) {
    // 判断当前轮播图所执行得动画
    setTimeout(() => {
      if (e.detail.current == 1) {
        this.setData({
          carousel_currentGo: false,
          carousel_currentBack: true
        })
      } else if (e.detail.current == 0) {
        this.setData({
          carousel_currentGo: true,
          carousel_currentBack: false
        })
      } else {
        this.setData({
          carousel_currentGo: true,
          carousel_currentBack: true
        })
      }
    }, 500);
  }
})
