//index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    imgUrls: [
      "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=151472226,3497652000&fm=26&gp=0.jpg",
      "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=151472226,3497652000&fm=26&gp=0.jpg",
      "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=151472226,3497652000&fm=26&gp=0.jpg"
    ],
    listData: [],
    current: 'links'
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
    this.initData()
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

  //更新 其他用户的一个状态 需要通过云函数来进行 不能直接操作数据库
  handleLinks(e) {
    const id = e.target.dataset.id
    wx.cloud.callFunction({
      name: 'update',
      data: {
        id: id,
        collection: 'users',
        data: "{links: _.inc(1)}" // 传递一个字符串 在服务端进行解析 
      }
    }).then(res => {
      console.log(res)
      const updated = res.result.stats.updated
      if (updated) {
        const cloneListDate = [...this.data.listData] // 复制一个出来更新 点赞数
        cloneListDate.forEach(element => {
          if (element._id == id) {
            element.links++
          }
        });
        this.setData({ // 更新数据
          listData: cloneListDate
        })
      }
    })
  },
  handleCurrent(e) {
    const current = e.target.dataset.current
    if (current == this.data.current) {
      return false
    }
    this.setData({
      current
    })
    this.initData()
  },
  handlDetail(e) {
    const id = e.target.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/detail/detail?userId=' + id,
    })
  },
  initData() {
    db.collection('users').field({
        userPhoto: true,
        nickName: true,
        links: true
      }).orderBy(this.data.current, 'desc')
      .get().then(res => {
        console.log(res.data)
        this.setData({
          listData: res.data
        })
      })
  }
})