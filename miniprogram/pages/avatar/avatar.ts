// pages/avatar/avatar.ts
const appAvatar = getApp()
var canvas:any
var context:any
var imageWidth = 250

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhotoAvatar: "",
    currentBorder: "../../images/border1-1.png",
    borderArr: [
      [ 
        "../../images/border1-1.png",
        "../../images/border1-2.png"
      ],
      [ 
        "../../images/border2-1.png",
        "../../images/border2-2.png"
      ],
      [ 
        "../../images/border3-1.png",
        "../../images/border3-2.png"
      ],
      [ 
        "../../images/border4-1.png",
        "../../images/border4-2.png"
      ],
      [ 
        "../../images/border5-1.png",
        "../../images/border5-2.png"
      ],
      [ 
        "../../images/border6-1.png",
        "../../images/border6-2.png"
      ],
      [ 
        "../../images/border6-3.png",
        "../../images/border6-4.png"
      ],
      [ 
        "../../images/border7-1.png",
        "../../images/border7-2.png"
      ],
      [ 
        "../../images/border8-1.png",
        "../../images/border8-2.png"
      ],
      [ 
        "../../images/border9-1.png",
        "../../images/border9-2.png"
      ],
      [ 
        "../../images/border10-1.png",
        "../../images/border10-2.png"
      ],
      [ 
        "../../images/border11-1.png",
        "../../images/border11-2.png"
      ],[ 
        "../../images/border12-1.png",
        "../../images/border12-2.png"
      ],
      [ 
        "../../images/border12-3.png",
        ""
      ],
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      userPhotoAvatar: appAvatar.globalData.userPhoto
    })

    wx.createSelectorQuery()
      .select('#avatar') // 在 WXML 中填入的 id
      .node((res) => {
          canvas = res.node
          context = canvas.getContext('2d')
      })
      .exec() 

    wx.createSelectorQuery()
    .select('#avatar') // 在 WXML 中填入的 id
    .fields({ node: true, size: true })
    .exec((res) => {
        // Canvas 对象
        canvas = res[0].node
        // Canvas 画布的实际绘制宽高
        const renderWidth = res[0].width
        const renderHeight = res[0].height
        // Canvas 绘制上下文
        const ctx = canvas.getContext('2d')

        // 初始化画布大小
        const dpr = wx.getWindowInfo().pixelRatio
        canvas.width = renderWidth * dpr
        canvas.height = renderHeight * dpr
        ctx.scale(dpr, dpr)

        // 初始化原始头像
        const image = canvas.createImage()
        image.onload = () => {
            context.drawImage(image, 0, 0, imageWidth, imageWidth)
        }
        image.src = this.data.userPhotoAvatar
    })
  },

  drawBorder: function(e:any) {
    let borderUrl = e.currentTarget.dataset.url;
    if(borderUrl.length == 0) {
      return;
    }
    this.setData({
      currentBorder: borderUrl
    })
    wx.showLoading({
      title: "生成中..."
    });
    // 清空画布
    context.clearRect(0, 0, canvas.width, canvas.height)
    // 先绘制原始头像
    const image1 = canvas.createImage()
    image1.onload = () => {
        context.drawImage(image1, 0, 0, imageWidth, imageWidth)
        // 再绘制边框
        const image2 = canvas.createImage()
        image2.onload = () => {
            context.drawImage(image2, 0, 0, imageWidth, imageWidth)
        }
        image2.src = borderUrl
    }
    image1.src = this.data.userPhotoAvatar
    setTimeout(function () {
        wx.hideLoading()
    }, 300)
  },

  saveSvatar: function() {
    // 清空画布
    context.clearRect(0, 0, canvas.width, canvas.height)
    // 先绘制原始头像
    const image1 = canvas.createImage()
    image1.onload = () => {
        context.drawImage(image1, 0, 0, imageWidth, imageWidth)
        // 再绘制边框
        const image2 = canvas.createImage()
        image2.onload = () => {
            context.drawImage(image2, 0, 0, imageWidth, imageWidth)
            // 保存图片
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              width: imageWidth,
              height: imageWidth,
              destWidth: imageWidth * 4,  //生成图片的大小设置成canvas大小的四倍即可让图片清晰
              destHeight: imageWidth * 4,
              canvas: canvas,
              quality: 1,
              complete: function() {
                  wx.hideLoading();
              },
              success: function(e) {
                wx.saveImageToPhotosAlbum({
                  filePath: e.tempFilePath,
                  success: function(e) {
                      wx.showToast({
                          title: "成功保存到相册",
                          duration: 2e3
                      })
                  },
                  fail: function() {
                      wx.previewImage({
                          urls: [ e.tempFilePath ]
                      });
                  },
                  complete: function() {}
                });
              }
            })
        }
        image2.src = this.data.currentBorder
        
    }
    image1.src = this.data.userPhotoAvatar
  },

  bindNavigationTap() {
      // 清空画布
      context.clearRect(0, 0, canvas.width, canvas.height)
      wx.navigateTo({
        url: '../index/index',
      })
  },

})