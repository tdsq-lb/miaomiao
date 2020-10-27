// miniprogram/pages/editUserinfo/phone/phone.js
const app = getApp() // 通过内置的getApp方法 拿到 app.js 中的this对象
var utils = require('../../../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: ''
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
    this.setData({
      phoneNumber: app.userInfo.phoneNumber
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
  handleText(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  handleBtn() {
    const id = app.userInfo._id
    const data = {
      phoneNumber: this.data.phoneNumber
    }
    utils.changdata(id, data)
  }
})