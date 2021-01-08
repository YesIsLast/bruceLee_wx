// components/homeMenu.js
Component({
  options:{
    styleIsolation:"apply-shared", // 组件样式对外隔离
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
    menuBtnStatus:true, // 菜单按钮打开状态， true打开  false关闭
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 菜单点击状态
    menuFixedClick(){
      this.setData({
        menuBtnStatus:!this.data.menuBtnStatus
      })
      console.log("查看当前菜单按钮展开状态",this.data.menuBtnStatus)
    }
  }
})
