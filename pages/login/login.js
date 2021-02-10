// pages/login/login.js
var utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // input伪双向绑定
  bindKeyInput: function (e) {
    this.setData({
      [e.target.dataset.vmodel]: e.detail.value
    })
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
              userStorage.loginType = 1
              userStorage.username = userStorage.nickName
              wx.setStorage({
                key: "userInfo",
                data: JSON.stringify(userStorage)
              })
              // 设置登录类型
              let event = {
                target:{
                  dataset:{
                    logintype:1
                  }
                }
              }
              that.loginFun(event)
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
  loginFun: function (event) {
    // 校验登录类型，0、普通登录 1、微信登录
    if (event.target.dataset.logintype == "0") {
      console.log(this.data.username, this.data.password)
      // 登录校验
      if (this.data.username.length <= 0) {
        wx.showToast({
          title: '请输入用户名',
          icon: "none"
        })
        return
      }
      if (this.data.username != "admin") {
        wx.showToast({
          title: '用户名输入错误',
          icon: "none"
        })
        return
      }
      if (this.data.password.length <= 0) {
        wx.showToast({
          title: '请输入密码',
          icon: "none"
        })
        return
      }
      if (this.data.password != "123321") {
        wx.showToast({
          title: '密码输入错误',
          icon: "none"
        })
        return
      }
      // 登录成功，用户信息存储
      wx.setStorage({
        key: "userInfo",
        data: JSON.stringify({
          loginType: 0,
          username: this.data.username,
          password: this.data.password
        })
      })
    }

    wx.switchTab({
      url: '/pages/index/index',
      complete: function (com) {
        // console.log(com)
      }
    })
  }
})