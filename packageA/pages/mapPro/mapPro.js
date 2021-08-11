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
var voiceSettime = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baiduVoice: "请前往第一站",
    longitude: 125.430565, // 中心点坐标125.324282,43.883938
    latitude: 43.759411, // 中心点坐标
    markers: [{
      id: 9991, // 车辆位置
      longitude: "125.430565",
      latitude: "43.759411",
      width: 26,
      height: 26,
      zIndex: 9991,
      iconPath: "../../../static/img/carRED.png"
    }],
    polyline: [],
    siteTip: [], // 导航提示语
    ranges: 100, // 语音播报范围（米）
    roadAction: "iconzhihang", // 路线提示行进方向
    roadDistanceNum: 0, // 路线提示距离米
    roadName: "无名道路", // 路线提示道路名称
    openMapOverview: false, // 是否打开地图全览
    includePoints: [], // 地图全览站点数组
    mapScale: 15, // 地图缩放等会
    overviewText: "全览", // 全览按钮文字
    lineDistance: 0, // 路线全程距离(公里=1千米)
    lineDuration: 0, // 路线全程时间（秒=时-分）
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
      mask:true
    })
    // 使用外部json地图站点初始化
    this.initMapMarkers(markersList)
    // 规划路线
    this.initMapRoute(0)
    // 开启实时定位
    this.openLocationAddr("open")

  },
  onUnload: function () {

    // 停止语音播报
    clearTimeout(voiceSettime)
  },
  // 路线规划
  initMapRoute(index) {
    let that = this
    // 初始化地图变量
    that.siteTip = []
    that.lineDistance = 0
    that.lineDuration = 0
    myAmapFun.getDrivingRoute({
      origin: "125.430565,43.759411",
      waypoints: "125.400166,43.767901;125.400885,43.767067;125.376235,43.720019;125.283099,43.706361;125.039335,43.83177;125.172428,43.86568;125.212672,43.896869;125.230781,43.91038;125.228626,43.937598;125.261396,43.95463;125.257802,43.989404;125.320325,43.993347;125.400382,44.02312;125.426684,44.014408;125.331374,43.905996;125.33132,43.884032;",
      destination: "125.329954,43.917341",
      success: function (data) {
        console.log("路线规划完成响应值", data)
        // 更新路线距离与时间
        that.setData({
          lineDistance: (data.paths[0].distance / 1000).toFixed(2),
          lineDuration: that.timezh(data.paths[0].duration)
        })

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
            /// 处理行进方向
            let actionList = ["左转", "左转掉头", "右转", "右转掉头", "直行"]
            let actionIconList = ["iconzuozhuan", "iconzuodiaotou", "iconyouzhuan", "iconyoudiaotou", "iconzhihang"]
            let actionIconStr = "iconzhihang"
            for (let acIndex in actionList) {
              if (steps[i].action.length > 0 && steps[i].action.indexOf(actionList[acIndex]) != -1) {
                actionIconStr = actionIconList[acIndex]
              }
            }
            /// 处理地图旋转角度
            let rotateList = ["北", "东北", "东", "东南", "南", "西南", "西", "西北"]
            let rotateNumList = [0, 45, 90, 135, 180, 225, 270, 315, 360]
            let orientationRotate = 0
            for (let jj in rotateList) {
              if (steps[i].orientation && steps[i].orientation == rotateList[jj]) {
                orientationRotate = rotateNumList[jj]
              }
            }
            /// 路线导航提示语-结果赋值
            that.siteTip.push({
              action: steps[i].action, // 行驶方向
              actionIcon: actionIconStr, // 行驶方向 (左转，左转掉头，右转，右转掉头，直行)
              instruction: steps[i].instruction, // 提示语内容
              road: steps[i].road || "无名道路", // 道路名称
              distance: steps[i].distance, // 距离
              polyline: steps[i].polyline.split(';')[0], // 坐标
              orientation: steps[i].orientation, // 行进方向
              orientationRotate: orientationRotate, // 行进方向角度
            })
          }
        }
        // 正式使用时立即播报第一条导航提示语
        // that.voiceNavigation(-1)
        // 模拟车辆行驶
        for (let ii in that.siteTip) {
          (function (ii) {
            voiceSettime = setTimeout(function () {
              console.log(that.siteTip[ii])
              // 模拟测试语音导航
              Voice(that.siteTip[ii].instruction)
              // 更新提示语
              that.setData({
                roadAction: that.siteTip[ii].actionIcon,
                roadDistanceNum: that.siteTip[ii].distance,
                roadName: that.siteTip[ii].road
              })
              that.translateMarker(that.siteTip[ii].polyline.split(",")[1], that.siteTip[ii].polyline.split(",")[0], that.siteTip[ii].orientationRotate)
            }, ii * 8000);
          })(ii)
        }

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
          width: 4,
          borderColor: "#459068",
          arrowLine: true,
          borderWidth: 1
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
    // 播报第一条语音提示
    if (lon_lat === -1) {
      return Voice(this.siteTip[0].instruction + "然后，" + this.siteTip[1].instruction);
    }
    var _this = this
    var my_position = lon_lat.split(',')
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
        zIndex: 9,
        iconPath: "https://huixingappimage.oss-cn-beijing.aliyuncs.com/passenger/xuliehao_" + (i + 1) + ".png",
        callout: {
          content: "第" + (i + 1) + "站",
          display: "ALWAYS",
          bgColor: "#ffffff",
          borderRadius: 10,
          padding: 4,
          textAlign: "center",
          fontSize: 13
        }
      })
      this.setData({
        markers: this.data.markers
      })
    }
  },
  // 地图全览
  getMapOverview(event) {
    let mark = []
    wx.showLoading({
      title: "loading...",
      mask: true
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 3000);
    // 全览
    if (!event.currentTarget.dataset.params) {
      console.log("开启全览", this.data.mapScale)
      markersList.forEach(item => {
        mark.push({
          longitude: item.split(",")[0],
          latitude: item.split(",")[1],
        })
      })
      console.log(mark)
      // 展开
      this.setData({
        openMapOverview: true,
        overviewText: "聚焦",
        mapScale: 10,
        includePoints: mark
      })
    }
    // 关闭全览
    else {
      console.log("关闭全览", this.data.mapScale)
      // 展开
      this.setData({
        openMapOverview: false,
        overviewText: "全览",
        mapScale: 15,
        includePoints: [{ latitude: 0, longitude: 0 }]
      })
    }

  },
  // 微信小程序点平滑移动
  translateMarker(lat, lon, rotate) {
    // 同步地图中心点坐标
    this.setData({
      latitude: lat,
      longitude: lon
    })
    // 执行平滑移动
    this.mapCtx.translateMarker({
      markerId: 9991,
      duration: 1000,
      // rotate: rotate, // 设置车辆角度
      destination: {
        latitude: lat,
        longitude: lon,
      },
      fail: (err) => {
        console.error(err)
      }
    })
  },

  // 时间转换（秒-）
  timezh(value) {
    let theTime = parseInt(value); // 需要转换的时间秒
    let theTime1 = 0; // 分
    let theTime2 = 0; // 小时
    let theTime3 = 0; // 天
    if (theTime > 60) {
      theTime1 = parseInt(theTime / 60);
      theTime = parseInt(theTime % 60);
      if (theTime1 > 60) {
        theTime2 = parseInt(theTime1 / 60);
        theTime1 = parseInt(theTime1 % 60);
        if (theTime2 > 24) {
          // 大于24小时
          theTime3 = parseInt(theTime2 / 24);
          theTime2 = parseInt(theTime2 % 24);
        }
      }
    }
    let result = '';
    // if (theTime > 0) {
    //     result = "" + parseInt(theTime) + "秒";
    // }
    if (theTime1 > 0) {
      result = "" + parseInt(theTime1) + "分" + result;
    }
    if (theTime2 > 0) {
      result = "" + parseInt(theTime2) + "小时" + result;
    }
    if (theTime3 > 0) {
      result = "" + parseInt(theTime3) + "天" + result;
    }
    return result;
  },
  // 退出
  quitPageMap() {
    wx.showModal({
      title: '警告',
      content: '是否确认退出道路规划导航！',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.reLaunch({
            url: '/pages/projectList/projectList',
            fail(err){
              console.error(err)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})