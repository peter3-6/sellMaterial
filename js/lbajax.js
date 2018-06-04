const url = require('../config.js').url


const lbajax0 = (lb, method, data, fun, loading, domain) => {
  if (loading) wx.showLoading({ title: '网络加载...', mask: true })
  let token = false
  if (wx.getStorageSync('userinfo')) {
    try {
      token = wx.getStorageSync('userinfo').token;
    } catch (e) { }
  }
  let header = header = {
    'content-type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  };
  if (token) {
    header.token = token
  }
  wx.request({
    url: `${domain}${lb}`,
    method: method,
    data: data,
    header: header,
    success: function (res) {
      if (res.data.code == 100 || res.data.code == 101) {
        getApp().globalData.ajaxQueue.push([lb, method, data, fun, loading, domain])
        if (getApp().globalData.logining) {
          getApp().globalData.login()
        }
      } else {
        fun(res.data, res)
      }
    },
    fail: function () {
      wx.showToast({
        title: '网络错误',
        mask: true,
        icon: 'loading',
      })
    },
    complete: function (res) {
      if (loading) wx.hideLoading()
    }
  })
}
const lbajax = (lb, method, data, fun, loading) => {
  lbajax0(lb, method, data, fun, loading, url)
}



module.exports = {
  lbajax,
}