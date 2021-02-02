// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touchS: [0, 0], // 触摸滑动开始坐标
    touchE: [0, 0], // 触摸滑动结束坐标
    myMenuOpen: false, // 我的菜单是否展开
    myBackgroundSrc: "../../static/img/myBackground.jpg", // 封面图片地址
    themeModeChecked: false, // 主题模式开关切换
  },
  onReady() {
    // 页面准备完成执行我的页面动画上推效果
    setTimeout(() => {
      this.setData({
        myMenuOpen: true
      })
    }, 500)
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
    if (start[1] < end[1] - 50) {
      // console.log('下滑展开菜单')
      this.setData({
        myMenuOpen: false
      })
    } else if (start[1] > end[1] + 50) {
      // console.log('上滑收回菜单')
      this.setData({
        myMenuOpen: true
      })
    } else {
      // console.log('静止点击收回菜单')
      this.setData({
        myMenuOpen: true
      })
    }
  },
  // 更改封面图片
  changeMyBackground: function () {
    let mathRandom = Math.floor(Math.random() * 10)
    wx.showToast({
      title: '更换封面图片' + mathRandom,
      duration: 2000,
      icon: "none",
    })
    let arr = ["https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2Fattachments2%2Fday_120701%2F120701234484af8b43e19122ec.jpg&refer=http%3A%2F%2Fattachments.gfan.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614844384&t=879a4eea83ed344642935d5e9ce4a84c", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F23%2F20180223185304_teshv.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614844384&t=237ef5b3da0a2444104414ca860bc745", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201501%2F26%2F191943kzue7t3k7gbtb5eb.jpg&refer=http%3A%2F%2Fattachments.gfan.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614844384&t=33e7345d429b1afd048c341286fa0065", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2Fattachments2%2F201311%2F10%2F134503q89cmcmess962ssw.jpg&refer=http%3A%2F%2Fattachments.gfan.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614844384&t=f599a7588972283c7f24c1a35dcedf37", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180201%2F3e42c1cb223a4bfba4909742783d495e.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614844384&t=286414f8b4933f68ffe665abbdd798ef", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201808%2F06%2F204321vkkuufkf8296okvs.png&refer=http%3A%2F%2Fbbsfiles.vivo.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614844384&t=53bc1152ba9151f3ab7db71646ed8392", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201207%2F25%2F20120725172353_SVJWV.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614844384&t=e6538cc9e1c2e8d557b8d63665fb1e16", "https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/500fd9f9d72a6059c7b2b8872a34349b023bba89.jpg", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201410%2F25%2F20141025231925_HaQZf.thumb.700_0.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614844384&t=719eee962093b37940506b4b496ee404", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201608%2F29%2F195628tywyc2gnjeeg2z2b.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614844384&t=99cbc6102a7437959ba90be9d7ee6119"]
    this.setData({
      myBackgroundSrc: arr[mathRandom]
    })
  },
  // 主题模式切换
  themeModeChange: function () {
    this.setData({
      themeModeChecked: !this.data.themeModeChecked
    })
  }
})