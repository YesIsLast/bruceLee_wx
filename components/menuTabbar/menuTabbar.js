// components/menuTabbar/menuTabbar.js
Component({
  options: {
    styleIsolation: "apply-shared", // 组件样式对外隔离
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    menuCurrent: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    menuClick(e) {
      let routeUrl = ["/pages/index/index", "/pages/mapDemo/mapDemo", "/pages/my/my"]
      this.setData({
        menuCurrent: e.currentTarget.dataset.params
      })

      wx.navigateTo({
        url: routeUrl[e.currentTarget.dataset.params],
        complete: function (com) {
          // console.log(com)
        }
      })
    }
  }
})