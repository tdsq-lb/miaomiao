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
    nickName: "小妹妹"
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
    wx.cloud.callFunction({ // 如何数据库中存在用户 则调用此方法自动登录
      name: 'login',
      data: {}
    }).then((res) => {
      db.collection('users').where({
        _openid: res.result.openid
      }).get().then(res => {
        if (res.data.length) {
          app.userInfo = Object.assign(app.userInfo, res.data[0]) // 更新用户信息写入全局
          this.setData({
            userPhoto: app.userInfo.userPhoto,
            nickName: app.userInfo.nickName,
            logged: true
          })
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  bindGetUserInfo(e) { // 直接操作数据库 向云数据库 添加个人信息 注意点：前端直接操作数据库记得设置权限
    let userInfo = e.detail.userInfo
    if (!this.data.logged && userInfo) {
      db.collection('users').add({
        data: {
          userPhoto: userInfo.avatarUrl,
          nickName: userInfo.nickName,
          signature: '', // 签名
          phoneNumber: '', // 电话号码
          weixinNumber: '', //微信号
          links: 0, // 点赞数
          time: new Date() // 时间
        }
      }).then(res => {
        db.collection('users').doc(res._id).get().then(res => {
          app.userInfo = Object.assign(app.userInfo, res.data) // 授权 把用户信息写入全局
          this.setData({
            userPhoto: app.userInfo.userPhoto,
            nickName: app.userInfo.nickName,
            logged: true
          })
        })
      });
    }
  }
})