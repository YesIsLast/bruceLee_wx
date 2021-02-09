// pages/login/login.js
var utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 微信授权登陆
  bindGetUserInfo(e) {
    console.log("当前登录用户信息", e.detail.userInfo)
    let userStorage = e.detail.userInfo
    let that = this
    wx.showLoading({
      title: '登录中...',
    })
    utils.getUserSetting("scope.userInfo").then(res => {
      if (res) {
        wx.login({
          success(res) {
            wx.hideLoading()
            if (res.code) {
              userStorage.code = res.code
              wx.setStorage({
                key: "wxUserInfo",
                data: JSON.stringify(userStorage)
              })
              that.loginFun()
            } else {
              wx.showToast({
                title: '微信授权登录失败',
                icon: "none"
              })
            }
          }
        })
      }
    })

  },
  /**
   * 登录方法
   */
  loginFun: function () {
    wx.switchTab({
      url: '/pages/index/index',
      complete: function (com) {
        // console.log(com)
      }
    })
  }
})