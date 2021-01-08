// pages/mapDemo/mapDemo.js
var amapFile = require('../../libs/amap-wx.130');//如：..­/..­/libs/amap-wx.js
var myAmapFun = new amapFile.AMapWX({ key: 'b1ecb0a188f2e8ff218310c9cead6f74' });
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 43.886751,
    longitude: 125.346636,
    markers: [
      {
        id: 1,
        name: '司机位置',
        iconPath: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1989415432,520912540&fm=26&gp=0.jpg",
        width: 30,
        height: 30,
        latitude: 43.886751,
        longitude: 125.346636,
      },
      {
        id: 2,
        latitude: 43.883999,
        longitude: 125.340366,
        name: '第一站',
        iconPath: "../../static/img/site.png",
        width: 23,
        height: 33
      }, {
        id: 3,
        latitude: 43.883964,
        longitude: 125.331464,
        name: '第二站',
        iconPath: "../../static/img/site.png",
        width: 23,
        height: 33
      }],
    polyline: []
  },

  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    myAmapFun.getDrivingRoute({
      origin: '125.340366,43.883999',
      destination: '125.331464,43.883964',
      success: function (data) {
        console.log(data)
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 8
          }]
        });

      },
      fail: function (info) {

      }
    })
    // that.mapMoving("125.346636,43.886751","125.340366,43.883999")
  },
  /**
   * 点平滑移动,每.5秒执行一次路线坐标
   * @param {*} start 开始坐标
   * @param {*} end 结束坐标
   */
  mapMoving() {
    let start = "125.346636,43.886751", end = "125.340366,43.883999"
    let that = this
    // 规划两个坐标的线路，取线路坐标组
    myAmapFun.getDrivingRoute({
      origin: start,
      destination: end,
      success: function (data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        // 循环坐标组，每次循环对司机位置更改一次
        for (let i in points) {
          // 设置演示器执行司机位置的更新
          (function (i) {
            setTimeout(function () {
              that.updateUserAddr(points[i].latitude,points[i].longitude)
              // that.translateMarker(points[i].latitude,points[i].longitude)
            },i*1000);
          })(i);
        }
      },
      fail: function (info) {

      }
    })
  },
  // 获取当前位置
  getLocationAddr: function () {
    wx.getLocation({
      type: 'gcj02',
      success(res) {

      }
    })
  },
  /**
   * 手动点分段移动
   * @param {*} lat 纬度
   * @param {*} lon 经度
   */
  updateUserAddr: function (lat, lon) {
    this.setData({
      ["markers[" + 0 + "]"]: {
        latitude: lat,
        longitude: lon,
        id: 1,
        name: '司机位置',
        iconPath: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1989415432,520912540&fm=26&gp=0.jpg",
        width: 30,
        height: 30,
      }
    })
  },
  // 微信小程序点平滑移动
  translateMarker: function(lat,lon) {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: false,
      duration: 1000,
      destination: {
        latitude:lat,
        longitude:lon,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
})