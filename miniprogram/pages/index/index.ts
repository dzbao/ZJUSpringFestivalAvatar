// index.ts
// 获取应用实例
const appIndex = getApp()

Page({
  data: {
    userPhotoIndex: "",
    hasUserPhoto: false,
    bonus: 10,
    bonusText: [
      {
        title: '兔飞猛进',
        content: '新春大吉，国泰民安',
        confirmText: '收到！',
        cancelText: '好耶！'
      },
      {
        title: '扬眉兔气',
        content: '平安喜乐，诸事皆宜',
        confirmText: '收到！',
        cancelText: '好耶！'
      },
      {
        title: '大展鸿兔',
        content: '恭贺新禧，求是创新',
        confirmText: '收到！',
        cancelText: '好耶！'
      }
    ]
  },

  bindNavigationTap() {
    if (this.data.hasUserPhoto) {
      wx.navigateTo({
        url: '../avatar/avatar',
      })
    }
    else {
      wx.showToast({
        title: '请上传头像',
        icon: 'none',
        duration: 1000
      })
    }
  },

  onLoad() {
    this.setData({
      userPhotoIndex: appIndex.globalData.userPhoto,
      hasUserPhoto: appIndex.globalData.hasUserPhoto
    })
  },

  getLocalImg: function () {
    wx.chooseMedia({
      count: 1, // 默认9
      mediaType: ['image'],
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      camera: 'front',
      success:  (res) => {   //防止this改变
        wx.cropImage(
          {
            src: res.tempFiles[0].tempFilePath,
            cropScale: '1:1',
            success: (res) => {
              var tempFilePaths = res.tempFilePath
              appIndex.setUserPhoto(tempFilePaths)
              appIndex.setHasUserPhoto(true)
              this.setData({
                userPhotoIndex: tempFilePaths,
                hasUserPhoto: true
              })
            }
          }
        )
        // pc端调试注释掉crop代码，用这段
        // var tempFilePaths = res.tempFiles[0].tempFilePath
        // appIndex.setUserPhoto(tempFilePaths)
        // appIndex.setHasUserPhoto(true)
        // this.setData({
        //   userPhotoIndex: tempFilePaths,
        //   hasUserPhoto: true
        // })
        
      }
    })
  },

  bonusTap: function() {
    this.setData({
      bonus: this.data.bonus - 1
    })
    if (this.data.bonus > 0 && this.data.bonus < 6) {
      wx.showToast({
        title: "再点击" + String(this.data.bonus) + "次！",
        duration: 5e2
      })
    }
    else if (this.data.bonus == 0) {
      this.setData( {
        bonus: 10
      })
      let randIndex = Math.floor(Math.random() * (this.data.bonusText.length - 1))
      let randItem = this.data.bonusText[randIndex]
      wx.showModal({
        title: randItem.title, //提示的标题
        content: randItem.content, //提示的内容
        confirmText: randItem.confirmText,
        confirmColor: '#995f5f',
        cancelText: randItem.cancelText,
        cancelColor: '#995f5f',
      })
    }
  }
})
