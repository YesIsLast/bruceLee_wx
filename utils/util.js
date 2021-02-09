
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

module.exports = {
  formatTime: formatTime,
  getUserSetting: getUserSetting
}
