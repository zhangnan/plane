let instance

export default class DataBus {
  constructor() {
    // 如果创建过DataBus了，就返回之前创造的
    if (instance) { return instance }

    instance = this

    this.init()
  }

  init() {
   
    this.userData = { openid: wx.getStorageSync('openid') || void 0 }
    wx.getSystemInfo({
      success: (res) => {
        this.systemInfo = res
      }
    })
  }
}
