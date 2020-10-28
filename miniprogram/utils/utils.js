const db = wx.cloud.database()
const app = getApp()

const changdata = (id, data) => {
  console.log(id, data)
  wx.showLoading({
    title: '更新中',
  })
  db.collection('users').doc(id).update({
    data
  }).then(res => {
    wx.hideLoading()
    wx.showToast({
      title: '更新成功',
    })
    app.userInfo = Object.assign(app.userInfo, data)
    console.log(res)
  })
}

module.exports = {
  changdata
}