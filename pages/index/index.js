import { lbajax } from '../../js/lbajax.js'
Page({
  onLoad(options) {
    this.ids = decodeURIComponent(options.scene)
    this.astrict = true
  },
  onShow(options) {
    this.init();
  },
  init() {
    lbajax('portal/cardinfo/read', 'GET', { id: this.ids }, res => {
      // console.log(res.data.available)
      // let available = 0
      if (res.data.available == 0){
        wx.showToast({
          title: '二维码已经过期',
          icon: 'none',
          duration: 3000
        })
        setTimeout(function(){
          wx.redirectTo({
            url: '../../pages/home/home'
          })
        },3000)
      }
      this.setData({
        payImg: res.data.avatar_info,

      })
      if (res.data.is_purchased) {
        wx.redirectTo({
          url: `/pages/details/details?id=${this.ids}`,
        })
      } else {
        this.setData({ initdata: res.data, loading: true })
      }
    })
  },
  payment() {
    if (this.astrict) {
      this.astrict = false
      const that = this
      lbajax('portal/cardinfo/order', 'POST', { id: this.ids }, res => {
        console.log(res)
        wx.requestPayment({
          ...res.data,
          'success': function (res) {
            wx.redirectTo({
              url: `/pages/details/details?id=${that.ids}`,
            })
          },
          'fail': function (res) {
          },
          complete() {
            that.astrict = true
          }
        })
      })
    }
  }
})
