// miniprogram/pages/editUserinfo/name/name.js
const app = getApp()
var utils = require('../../../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      nickName: app.userInfo.nickName,
      id: app.userInfo._id
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
      nickName: e.detail.value
    })
  },
  bindGetUserInfo(e) {
    this.setData({
      nickName: e.detail.userInfo.nickName
    })
    const data = {
      nickName: this.data.nickName
    }
    utils.changdata(this.data.id, data)
  },
  handleBtn() {
    const data = {
      nickName: this.data.nickName
    }
    utils.changdata(this.data.id, data)
  }
})