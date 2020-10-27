// miniprogram/pages/editUserinfo/signature/signature.js
const app = getApp() // 通过内置的getApp方法 拿到 app.js 中的this对象
const db = wx.cloud.database()
var utils = require('../../../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signature: '',
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
      signature: app.userInfo.signature
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
    let value = e.detail.value
    this.setData({
      signature: value
    })
  },
  handleBtn() {
    const id = app.userInfo._id
    const data = {
      signature: this.data.signature
    }
    utils.changdata(id, data)
  }
})