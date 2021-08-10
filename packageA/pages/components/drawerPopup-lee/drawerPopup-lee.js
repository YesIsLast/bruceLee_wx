// components/drawerPopup-lee/drawerPopup-lee.js
Component({
  options: {
    styleIsolation: "apply-shared", // 组件样式对外隔离
    multipleSlots: true, // 启用多个slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 当前抽屉组件唯一name标识,
    name: {
      // 必填项且不能重复，否则会导致意料之外的bug
      type: String,
      value: "drawer_popup"
    },
    // 是否显示
    show: {
      type: Boolean,
      value: false
    },
    // 抽屉方向 top right bottom left
    mode: {
      type: String,
      value: 'bottom',
    },
    // 抽屉高度 需要写入尺寸单位
    height: {
      type: String,
      value: '50vh'
    },
    // 抽屉宽度 需要写入尺寸单位
    width: {
      type: String,
      value: '100vw'
    },
    // 抽屉背景颜色
    backgroundColor: {
      type: String,
      value: '#ffffff'
    },
    // 圆角样式
    borderRadius: {
      type: String,
      value: "0 0 0 0"
    }
  },
  // 组件生命周期
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log("在组件实例进入页面节点树时执行")
      // 页面自定义样式
      this.setData({
        bottom: ['bottom', 'left', 'right'].includes(this.properties.mode) ? 0 : '',
        left: ['bottom', 'left', 'top'].includes(this.properties.mode) ? 0 : '',
        right: ['bottom', 'right', 'top'].includes(this.properties.mode) ? 0 : '',
        top: ['left', 'right', 'top'].includes(this.properties.mode) ? 0 : '',
        paddingLeft: this.properties.mode == 'left' ? '30rpx' : '0',
        paddingRight: this.properties.mode == 'right' ? '30rpx' : '0',
        paddingBottom: this.properties.mode == 'bottom' ? '40rpx' : '0',
        paddingTop: this.properties.mode == 'top' ? '40rpx' : '0',
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      console.log("在组件实例被从页面节点树移除时执行")
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    directionArr: ['top', 'right', 'bottom', 'left'],// 滑动方向数组下标
    // 显示行内样式
    modeStyleShow: ['translateY(-3vh)', 'translateX(3vw)', 'translateY(3vh)', 'translateX(-3vw)'],
    // 隐藏行内样式
    modeStyleHide: ['translateY(-100vh)', 'translateX(100vw)', 'translateY(100vh)', 'translateX(-100vw)'],
    showMask: false,
    translate: "", // 滑动方向 作用于transform:translateXY()
    // 定位抽屉bottom left right top
    bottom: "",
    left: "",
    right: "",
    top: "",
    // 处理动画执行时，产生的空白区域paddingLeft paddingRight paddingBottom paddingTop
    paddingLeft: "",
    paddingRight: "",
    paddingBottom: "",
    paddingTop: "",
  },
  // 监听
  observers: {
    "show": function (show) {
      if (show) {
        this.setData({
          showMask: show,
          translate: this.data.modeStyleShow[this.properties.directionArr.indexOf(this.properties.mode)]
        })
      } else {
        setTimeout(() => {
          this.setData({
            showMask: show,
            translate: this.data.modeStyleHide[this.properties.directionArr.indexOf(this.properties.mode)]
          })
        }, 300)
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 暴漏外置关闭方法
    emitClose: function () {
      // detail对象，提供给事件监听函数{向父组件传参}
      var myEventDetail = {
        name: this.properties.name, // 当前操作的抽屉框名称,传回父组件，关闭当前抽屉框
      }
      // 触发事件的选项{本次向父组件触发事件的配置项}
      var myEventOption = {}
      this.triggerEvent('close', myEventDetail, myEventOption)
    },
    // 蒙层防触摸穿透
    catchtouchmove: function () {

    }
  }
})
