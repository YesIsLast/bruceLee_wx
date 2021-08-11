// packageA/pages/mapPro/mapPro.js
// 引入外部json
var markersList = require('../../../utils/markers').default;
// 引入高德微信小程序SDK
var amapFile = require('../../../libs/amap-wx.130'); //如：..­/..­/libs/amap-wx.js
// 创建SDK实例
var myAmapFun = new amapFile.AMapWX({
  key: 'ab2ac69f9ce5b8fcbdbd6064950d40f8'
});
// 引入百度语音识别
var Voice = require("../../../libs/QS-baiduyy").default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    drawerPopupLeeVal: false, // 变量是否显示弹出框
    baiduVoice: "请前往第一站",
    longitude: 125.324282, // 中心点坐标125.324282,43.883938
    latitude: 43.883938, // 中心点坐标
    markers: [{
      id: 9991,
      longitude: "125.324282",
      latitude: "43.883938",
      width: 13,
      height: 26,
      iconPath: "https://huixingappimage.oss-cn-beijing.aliyuncs.com/passenger/car.png"
    }],
    polyline: [],
    siteTip: [], // 导航提示语
    ranges: 100, // 语音播报范围（米）
  },
  onReady: function (e) {
    Voice(this.data.baiduVoice)
    // 创建地图点平滑移动对象
    this.mapCtx = wx.createMapContext('myMap')
    // 打开抽屉
    this.openDrawer({
      currentTarget: {
        dataset: {
          params: "drawerPopupLeeVal"
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({
      title: '地图初始化...',
    })
    // 使用外部json地图站点初始化
    this.initMapMarkers(markersList)
    // 规划路线
    this.initMapRoute(0)
    // 开启实时定位
    this.openLocationAddr("open")

    // 模拟车辆行驶
    let that = this
    for (let i in markersList) {
      (function (i) {
        setTimeout(function () {
          that.translateMarker(markersList[i].split(",")[1], markersList[i].split(",")[0])
        }, i * 2000);
      })(i)
    }
  },
  // 路线规划
  initMapRoute(index) {
    let that = this
    // 初始化地图变量
    that.siteTip = []
    myAmapFun.getDrivingRoute({
      origin: "125.430565,43.759411",
      waypoints: "125.400166,43.767901;125.400885,43.767067;125.376235,43.720019;125.283099,43.706361;125.039335,43.83177;125.172428,43.86568;125.212672,43.896869;125.230781,43.91038;125.228626,43.937598;125.261396,43.95463;125.257802,43.989404;125.320325,43.993347;125.400382,44.02312;125.426684,44.014408;125.331374,43.905996;125.33132,43.884032;",
      destination: "125.329954,43.917341",
      success: function (data) {
        console.log("路线规划完成响应值", data)
        wx.hideLoading()
        // 处理规划路线坐标点
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
            // 存储导航提示语,整理提示坐标
            var segments = {
              instruction: steps[i].instruction,
              road: steps[i].road,
              distance: steps[i].distance,
              polyline: steps[i].polyline.split(';')[0],
              orientation: steps[i].orientation,
            };
            that.siteTip.push(segments)
          }
        }
        // 立即播报第一条导航提示语
        Voice(that.siteTip[0].instruction + "然后，" + that.siteTip[1].instruction);

        let colorList = [
          "#4CC972",
          "rgb(214, 156, 31)",
          "rgb(216, 219, 22)",
          "rgb(109, 238, 24)",
          "rgb(39, 168, 201)",
        ]
        let polyline = []
        polyline.push({
          points: points,
          color: colorList[index], // 坑、所使用的颜色值请用十六进制（#ff0000），禁止使用RGB
          width: 6,
          borderColor: "#459068",
          arrowLine: true,
          borderWidth: 2
        })
        // 存储路线坐标组
        that.setData({
          polyline: polyline
        });
        console.log("路线坐标点", that.data.polyline)
      },
      fail: function (info) {
        console.log(info)
        wx.hideLoading()
      }
    })
  },





  // 语音导航
  voiceNavigation(lon_lat) {
    var _this = this
    var my_position = newName.split(',')
    for (var i = 0; i < _this.siteTip.length; i++) {
      // 提示点坐标
      var steps = _this.siteTip[i].polyline.split(',')
      // 计算当前位置与播报点的距离
      var distance = (_this.GetDistance(my_position[1], my_position[0], steps[1], steps[0])) * 1000
      if (distance <= _this.ranges && _this.steps_index.indexOf(i) == -1) {
        // 播报语音
        Voice(_this.siteTip[i].instruction);
      }
    }
  },
  // 计算两点坐标距离
  GetDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
  },
  // 获取实时位置
  openLocationAddr(type) {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log("获取实时位置", res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
      }
    })
    const _locationChangeFn = function (res) {
      console.log('定位坐标发生更改', res)
      // 校验提示语坐标范围并语音导航提醒
      that.voiceNavigation(res.longitude + "," + res.latitude)
    }
    if (type == "open") {
      console.warn("打开定位监听")
      wx.onLocationChange(_locationChangeFn)
    } else {
      console.warn("关闭定位监听")
      wx.offLocationChange(_locationChangeFn)
    }
  },
  // 打开指定抽屉
  openDrawer(event) {
    console.log("打开抽屉", event.currentTarget.dataset.params)
    this.setData({
      [event.currentTarget.dataset.params]: true
    })
  },
  /**
   * 关闭抽屉
   * @param {*} evevt 接收子组件传参，关闭指定抽屉
   */
  closeDrawer(evevt) {
    console.log("关闭抽屉", evevt.detail.name)
    this.setData({
      [evevt.detail.name]: false
    })
  },
  // markers站点初始化
  initMapMarkers(params) {
    for (let i = 0; i < params.length; i++) {
      let item = params[i]
      this.data.markers.push({
        id: i,
        longitude: item.split(",")[0],
        latitude: item.split(",")[1],
        width: 20,
        height: 20,
        iconPath: "https://huixingappimage.oss-cn-beijing.aliyuncs.com/passenger/xuliehao_1.png",
        callout: {
          content: "第" + (i + 1) + "站",
          display: "ALWAYS",
          bgColor: "#ffffff",
          borderRadius: 10,
          padding: 8,
          textAlign: "center",
          fontSize: 16
        }
      })
      this.setData({
        markers: this.data.markers
      })
    }
  },
  // 微信小程序点平滑移动
  translateMarker(lat, lon) {
    this.mapCtx.translateMarker({
      markerId: 9991,
      autoRotate: true,
      duration: 2000,
      destination: {
        latitude: lat,
        longitude: lon,
      },
      fail: (err) => {
        console.error(err)
      }
    })
  },

})