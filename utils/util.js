
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 获取用户授权设置
 * 可参考下方文档来确定要检查的权限
 * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html
 * @param {string} authName 权限名称  
 */
const getUserSetting = authName => {
  return new Promise((resolve, reject)=>{
    wx.getSetting({
      success: function (res) {
        if (res.authSetting[authName]) {
          console.log("用户授权了" + JSON.stringify(res));
          resolve(true)
        } else {
          //用户没有授权
          console.log("用户没有授权" + authName);
          reject(false)
        }
      }
    });
  })
  
}
// 时间转换（秒-）
function timezh(value) {
  var theTime = parseInt(value); // 需要转换的时间秒
  var theTime1 = 0; // 分
  var theTime2 = 0; // 小时
  var theTime3 = 0; // 天
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
  var result = '';
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
}

module.exports = {
  formatTime: formatTime,
  getUserSetting: getUserSetting,
  timezh:timezh
}
