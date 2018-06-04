//app.js
import { lbajax } from './js/lbajax.js'
import { getPage1 } from './js/publicfunction.js'
App({
  onLaunch: function () {
    // 展示本地存储能力
    const userinfo = wx.getStorageSync('userinfo')
    if (!userinfo) {
      this.globalData.login()
    }
    this.updata()

  },
  onShow(options) {
    // console.log(decodeURIComponent(options.scene), '********')
    // let share = false
    // switch (Number(options.scene)) {
    //   case 1007:
    //     share = true
    //     break;
    //   case 1008:
    //     share = true
    //     break;
    //   case 1036:
    //     share = true
    //     break;
    //   case 1044:
    //     share = true
    //     break;
    //   case 1073:
    //     share = true
    //     break;
    //   case 1074:
    //     share = true
    //     break;
    //   default:
    //     break;
    // }
  },
  updata() {
    try {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate)
      })
      updateManager.onUpdateReady(function () {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      })
      updateManager.onUpdateFailed(function () {
        // 新的版本下载失败
      })
    } catch (e) { }
  },
  globalData: {
    userInfo: null,
    check: false,
    ajaxQueue: [],
    logining:true,
    login: function () {
      const that = this
      this.logining=false
      wx.login({
        success: res => {
          lbajax('user/login/weapploginbycode?_ajax=1', 'POST', { code: res.code }, res => {
            console.log(res,'888888')
            wx.setStorageSync('userinfo', res.data)
            that.logining = true
            that.ajaxQueue.forEach((value, index, arry) => {
              lbajax(...value)
            })
            that.ajaxQueue = []
          })
        }
      })
    },
  }
})