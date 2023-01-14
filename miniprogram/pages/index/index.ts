// index.ts
// 获取应用实例
const appIndex = getApp();

Page({
  data: {
    userPhotoIndex: "",
    hasUserPhoto: false,
    bonus: 10,
    bonusText: [
      {
        title: '大展宏兔',
        content: '万事如意，阖家安康',
        confirmText: '收到！',
        cancelText: '必须滴！'
      },
      {
        title: '扬眉兔气',
        content: '恭贺新禧，万事大吉',
        confirmText: '撒花！',
        cancelText: '好耶！'
      },
      {
        title: '前兔似锦',
        content: '兔年大吉，步步高升',
        confirmText: '确认查收！',
        cancelText: '收下祝福！'
      },
      {
        title: '奋发兔强',
        content: '学业有成，万事顺遂',
        confirmText: '妥妥滴！',
        cancelText: '收到啦！'
      },
      {
        title: '兔必NO.1',
        content: '踔厉奋发，勇攀高峰',
        confirmText: '加油！',
        cancelText: '冲呀！'
      },
      {
        title: '兔飞猛进',
        content: '岁岁平安，大吉大利',
        confirmText: '当然啦！',
        cancelText: '一定会！'
      },
      {
        title: '谈兔不凡',
        content: '笑口常开，好运连连',
        confirmText: '谢谢！',
        cancelText: '同乐！'
      },
      {
        title: '兔个好运',
        content: '福星高照，财运亨通',
        confirmText: '新年好！',
        cancelText: '拜年啦！'
      },
      {
        title: '兔步青云',
        content: '一帆风顺，十全十美',
        confirmText: '好哒！',
        cancelText: '安排！'
      },
      {
        title: '好事成兔',
        content: '顺其自然，心想事成',
        confirmText: '收下祝福！',
        cancelText: '愿望成真！'
      },
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
        /* var tempFilePaths = res.tempFiles[0].tempFilePath
         appIndex.setUserPhoto(tempFilePaths)
         appIndex.setHasUserPhoto(true)
         this.setData({
           userPhotoIndex: tempFilePaths,
           hasUserPhoto: true
         })*/
        
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
