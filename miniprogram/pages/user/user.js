// miniprogram/pages/user/user.js
const app = getApp() // 通过内置的getApp方法 拿到 app.js 中的this对象
const db = wx.cloud.database() // 初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logged: false,
    userPhoto: "../../images/user/user-unlogin.png",
    nickName: "小妹妹",
    id: '',
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
    wx.cloud.callFunction({ // 如何数据库中存在用户 则调用此方法自动登录
      name: 'login',
      data: {}
    }).then((res) => {
      db.collection('users').where({
        _openid: res.result.openid
      }).get().then(res => {
        if (res.data.length) {
          this.getMessage()
          app.userInfo = Object.assign(app.userInfo, res.data[0]) // 更新用户信息写入全局
          this.setData({
            userPhoto: app.userInfo.userPhoto,
            nickName: app.userInfo.nickName,
            logged: true,
            id: app.userInfo._id
          })
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userPhoto: app.userInfo.userPhoto,
      nickName: app.userInfo.nickName,
      id: app.userInfo._id
    })
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
  /**
   * 点击登录按钮 
   */
  bindGetUserInfo(e) { // 直接操作数据库 向云数据库 添加个人信息 注意点：前端直接操作数据库记得设置权限
    let userInfo = e.detail.userInfo
    if (!this.data.logged && userInfo) {
      db.collection('users').add({
        data: {
          userPhoto: userInfo.avatarUrl,
          nickName: userInfo.nickName,
          friendList: [], // 好友列表
          signature: '', // 签名
          phoneNumber: '', // 电话号码
          weixinNumber: '', //微信号
          links: 0, // 点赞数
          time: new Date(), // 时间
          isLocation: true, // 是否显示位置信息
          longitude: this.longitude, // 中心经度
          latitude: this.latitude, //中心纬度
          location: db.Geo.Point(this.longitude, this.latitude)
        }
      }).then(res => {
        db.collection('users').doc(res._id).get().then(res => {
          app.userInfo = Object.assign(app.userInfo, res.data) // 授权 把用户信息写入全局
          this.setData({
            userPhoto: app.userInfo.userPhoto,
            nickName: app.userInfo.nickName,
            logged: true,
            id: app.userInfo._id
          })
        })
      });
    }
  },
  /**
   * 登录以后监听消息
   */
  getMessage() {
    db.collection('message').where({
      userId: app.userInfo._id
    }).watch({
      onChange: function (snapshot) {
        console.log('docs\'s changed events', snapshot.docChanges)
        if (snapshot.docChanges.length) {
          const list = snapshot.docChanges[0].doc.list
          if (list.length) {
            wx.showTabBarRedDot({
              index: 2
            })
            app.userMessage = list
          } else {
            wx.hideTabBarRedDot({
              index: 2,
            })
            app.userMessage = []
          }
        }
      },
      onError: function (err) {
        console.error('the watch closed because of error', err)
      }
    })
  },
  getLocation() {
    wx.getLocation({
      type: 'gcj02 ',
      success: (res) => {
        this.latitude = res.latitude
        this.longitude = res.longitude
      }
    })
  }
})