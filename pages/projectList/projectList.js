// pages/projectList/projectList2.js
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
  // 前往地图 
  goMap(){
    wx.navigateTo({
      url: '/pages/mapDemo/mapDemo',
    })
  },
  // 前往独立分包地图
  goMapPro(){
    wx.navigateTo({
      url: '/packageA/pages/mapPro/mapPro',
    })
  }
})