// components/tag-lee/tag-lee.js
Component({
  options: {
    styleIsolation: "apply-shared", // 组件样式对外隔离
  },
  /**
   * 组件的属性列表
   */
  properties: {
    backgroundColor:{
      type: String,
      value: "#d4bf00", // 
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tagActiveColor:"", // 标签选中颜色
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tagclick(e){
      console.log(e)
      this.setData({
        tagActiveColor: this.data.tagActiveColor==""?this.properties.backgroundColor:""
      })
    }
  }
})
