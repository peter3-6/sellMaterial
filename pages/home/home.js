import { lbajax } from '../../js/lbajax.js'

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
    this.init()
    this.page = 1
  },
  init() {
    lbajax('portal/cardinfo/mypurchased', 'GET', {}, res => {
      this.setData({
        initdata: res.data.data,
        total: res.data.total,
        purchased: res.data.purchased
      })
    })
    lbajax('portal/user/getinfo', 'GET', {}, res => {
      this.setData({ user: res.data })
    })
    const userInfo = wx.getStorageSync('userinfo')
    this.setData({ userInfo })
  },
  info(e) {
    console.log(e, '9999999999')
    if (e.detail.iv) {
      lbajax('portal/user/setinfo?_ajax=1', 'POST', { 'iv': e.detail.iv, 'encryptedData': e.detail.encryptedData }, (res) => {
        console.log(res, 'pppppppppppppp')
        if (res.code == 0) {
          wx.setStorageSync('userinfo', res.data)
          if (this.init) {
            this.init()
          }
        }
      })
    }
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
    ++this.page
    lbajax('portal/cardinfo/mypurchased', 'GET', { p: this.page }, res => {
      const initdata = this.data.initdata.concat(res.data.data)
      this.setData({ initdata })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})