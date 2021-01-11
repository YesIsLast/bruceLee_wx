// components/homeNav.js
const App = getApp();
Component({
  options: {
    styleIsolation: "apply-shared", // 组件样式对外隔离
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否固定导航栏
    fixed: {
      type: String,
      value: "static"
    },
  },
  // 组件生命周期钩子
  lifetimes: {
    // 页面准备就绪钩子
    ready: function () {

    },
    // 在组件实例进入页面节点树时执行钩子
    attached: function () {
      this.setData({
        navH: App.globalData.navHeight + 10,
        navT: App.globalData.navTop,
        navCH: App.globalData.navContentHeight,
        navCW: App.globalData.capsuleBtnWidth,
        navW: App.globalData.windowWidth - App.globalData.capsuleBtnWidth,
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navH: null, // 导航栏适配高度
    navT: null, // 导航栏内容距离顶部高度
    navCH: null, // 导航栏内容高度
    navW: null, // 导航栏宽度
    navCW: null, // 胶囊按钮所占宽度
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
