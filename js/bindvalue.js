
module.exports = class {
  constructor(that) {
    that.bindvalue = e => {
      this.bind(e, that)
    }
  }
  bind(e, that) {
    const name = e.currentTarget.dataset.name.split(',')
    const fn = e.currentTarget.dataset.fn
    if (fn) that.fn()
    let data = {}
    let value = []
    switch (e.type) {
      case 'tap':
        value = e.currentTarget.dataset.value.split(',')
        break;
      case 'input':
        value[0] = e.detail.value
        break;
      case 'change':
        value[0] = e.detail.current
        break;
      default:
        break;
    }
    name.forEach((item, index, arry) => {
      data[item] = value[index]
    })
    that.setData(data)
  }
}