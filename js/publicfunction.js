
module.exports = {
  promptBox: (title, fn, time) => {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: time || 1000,
      mask: true,
      complete: function () {
        if (typeof fn == 'function') {
          setTimeout(() => {
            fn()
          }, time || 1000)
        }
      }
    })
  },
  big_img: (e) => {
    const img = e.currentTarget.dataset.img
    let imgs = e.currentTarget.dataset.imgs
    if (imgs.constructor !== Array) {
      imgs = [].push(imgs)
    }
    wx.previewImage({
      current: img,
      urls: imgs
    })
  },
  getPage: (pageName) => {
    let pages = getCurrentPages()
    return pages.find(function (page) {
      return page.__route__ == pageName
    })
  },
  getPage1: (num) => {
    if (getCurrentPages().length != 0) {
      return getCurrentPages()[getCurrentPages().length - num]
    }
  },
  lbPromise: class {
    constructor(num, fn) {
      this.l = 0;
      this.num = num;
      this.fn = fn
    }
    promise() {
      this.l++
      if (this.l == this.num) this.fn()
    }
  },
  acquire(e) {
    if (e.detail.formId) {
      getApp().globalData.formId.push(e.detail.formId)
    }
  },
}