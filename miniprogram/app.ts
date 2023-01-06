// app.ts
App({
  globalData: {
    userPhoto: '../../images/camera.jpg',
    hasUserPhoto: false
  },

  setUserPhoto(url:string) {
    this.globalData.userPhoto = url;
  },

  setHasUserPhoto(bool:boolean) {
    this.globalData.hasUserPhoto = bool;
  },
  
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})