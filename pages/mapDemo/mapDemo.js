// pages/mapDemo/mapDemo.js
// 引入外部json
var markersList = require('../../utils/markers').default;
// 引入高德微信小程序SDK
var amapFile = require('../../libs/amap-wx.130');//如：..­/..­/libs/amap-wx.js
// 创建SDK实例
var myAmapFun = new amapFile.AMapWX({ key: 'ab2ac69f9ce5b8fcbdbd6064950d40f8' });
// 引入百度语音识别
var Voice = require("../../libs/QS-baiduyy").default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baiduVoice: "测试语音播报",
    latitude: 43.892608,
    longitude: 125.331293,
    markers: [],
    polyline: []
  },
  onReady: function (e) {
    Voice(this.data.baiduVoice)
    // 创建地图点平滑移动对象
    this.mapCtx = wx.createMapContext('myMap')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '地图初始化...',
    })
    // 使用外部json地图站点
    markersList.forEach((item, index) => {
      this.data.markers.push({
        id: index,
        longitude: item.split(",")[0],
        latitude: item.split(",")[1],
        width:20,
        height:20,
        iconPath: "https://img2.baidu.com/it/u=4212724918,3779703514&fm=253&fmt=auto&app=120&f=JPG?w=192&h=192"
      })

      this.setData({
        markers: this.data.markers
      })
    })
    // 规划路线
    this.initMapRoute(0)
    // 点平滑移动
    // this.mapMoving("125.346636,43.886751","125.340366,43.883999")
  },

  // 路线规划
  initMapRoute(index) {
    console.log("准备路线规划")
    let that = this
    myAmapFun.getDrivingRoute({
      origin: "125.430565,43.759411",
      waypoints: "125.400166,43.767901;125.400885,43.767067;125.376235,43.720019;125.283099,43.706361;125.039335,43.83177;125.172428,43.86568;125.212672,43.896869;125.230781,43.91038;125.228626,43.937598;125.261396,43.95463;125.257802,43.989404;125.320325,43.993347;125.400382,44.02312;125.426684,44.014408;125.331374,43.905996;125.33132,43.884032;",
      destination: "125.329954,43.917341",
      success: function (data) {
        console.log("路线规划完成响应值",data)
        wx.hideLoading()
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
        let colorList = [
          "#ff0000",
          "rgb(214, 156, 31)",
          "rgb(216, 219, 22)",
          "rgb(109, 238, 24)",
          "rgb(39, 168, 201)",
        ]
        let polyline = []
        polyline.push({
            points: points,
            color: colorList[index], // 坑、所使用的颜色值请用十六进制（#ff0000），禁止使用RGB
            width: 4
        })
        that.setData({
          polyline: polyline
        });
        console.log("路线坐标点",that.data.polyline)
      },
      fail: function (info) {
        console.log(info)
        wx.hideLoading()
      }
    })
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
              // 点分段移动
              that.updateUserAddr(points[i].latitude, points[i].longitude)
              // 点平滑移动
              // that.translateMarker(points[i].latitude,points[i].longitude)
            }, i * 1000);
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
        iconPath: "https://www.baidu.com/img/PC_c49bac50464d752a96a926305eaca1a6.gif",
        width: 30,
        height: 30,
      }
    })
  },
  // 微信小程序点平滑移动
  translateMarker: function (lat, lon) {
    this.mapCtx.translateMarker({
      markerId: 15,
      autoRotate: false,
      duration: 1000,
      destination: {
        latitude: lat,
        longitude: lon,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
})