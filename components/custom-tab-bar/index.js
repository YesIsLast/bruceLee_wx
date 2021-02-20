Component({
  properties: {
    current: Number, // 组件默认选中项
  },
  lifetimes: {
    ready: function () {
      // 获取组件传参，并更新菜单选中项
      this.setData({
        selected: this.properties.current
      })
    }
  },
  data: {
    selected: 0,
    color: "#9e9e9e",
    selectedColor: "#ffffff",
    list: [{
      pagePath: "/pages/index/index",
      text: "首页"
    }, {
      pagePath: "/pages/projectList/projectList",
      text: "项目"
    }, {
      pagePath: "/pages/my/my",
      text: "我的"
    }]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url: url,
        success: function (res) {
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
  }
})