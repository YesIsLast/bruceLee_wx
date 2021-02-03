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
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if(utils.getUserSetting("scope.userInfo")){
      wx.login({
        success(res) {
          if (res.code) {
            console.log('登录成功！' + JSON.stringify(res))
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }else{
      
    }
    
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