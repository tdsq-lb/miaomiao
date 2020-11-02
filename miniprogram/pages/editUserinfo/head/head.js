// miniprogram/pages/editUserinfo/head/head.js
const app = getApp()
var utils = require('../../../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto: '',
    id: ''
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
      userPhoto: app.userInfo.userPhoto,
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
  handleUploadImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        this.setData({
          userPhoto: tempFilePaths
        })
      }
    })
  },
  handleBtn() {
    const filePath = this.data.userPhoto
    const cloudPath = 'my-image' + new Date().getTime() + filePath.match(/\.[^.]+?$/)[0]
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: (res) => {
        console.log(res)
        const data = {
          userPhoto: res.fileID
        }
        utils.changdata(this.data.id, data)
      }
    })
  },
  bindGetUserInfo(e) {
    this.setData({
      userPhoto: e.detail.userInfo.avatarUrl
    })
    const data = {
      userPhoto: e.detail.userInfo.avatarUrl
    }
    utils.changdata(this.data.id, data)
    console.log(e)
  }
})