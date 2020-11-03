// miniprogram/pages/near/near.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '', // 中心经度
    latitude: '', //中心纬度
    markers: [],
    id: [] // 用户id
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
    this.getLocation()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getLocation()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getLocation() {
    wx.getLocation({
      type: 'gcj02 ',
      success: (res) => {
        const latitude = res.latitude
        const longitude = res.longitude
        this.setData({
          latitude,
          longitude
        })
        this.getNearUsers()
      }
    })
  },
  // 获取markers  经纬度 显示个人头像
  getNearUsers() {
    db.collection('users').where({
      location: _.geoNear({
        geometry: db.Geo.Point(this.data.longitude, this.data.latitude),
        minDistance: 0,
        maxDistance: 5000,
      }),
      isLocation: true
    }).field({
      longitude: true,
      latitude: true,
      userPhoto: true
    }).get().then((res) => {
      const data = res.data
      let markers = []
      let id = []
      data.forEach((element, index) => {
        if (element.userPhoto.includes('cloud://')) {
          wx.cloud.getTempFileURL({
            fileList: [element.userPhoto],
            success: res => {
              markers.push({
                id: index,
                iconPath: res.fileList[0].tempFileURL,
                latitude: element.latitude,
                longitude: element.longitude,
                width: 30,
                height: 30
              })
              id.push(element._id)
              this.setData({
                markers,
                id
              })
              console.log(marker, '11111111111111111 ===========>>>')
            },
            fail: console.error
          })
        } else {
          markers.push({
            id: index,
            iconPath: element.userPhoto,
            latitude: element.latitude,
            longitude: element.longitude,
            width: 30,
            height: 30
          })
          id.push(element._id)
        }
      })
      this.setData({
        markers,
        id
      })
    })
  },
  // 点击跳转到详情页
  markertap(e) {
    let markerId = this.data.id[e.detail.markerId]
    wx.navigateTo({
      url: '/pages/detail/detail?userId=' + markerId,
    })
  }
})