// components/removeList/removeList.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    messageId: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    userMseeage: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleDelMessage() {
      wx.showModal({
        title: '提示消息',
        content: '是否删除',
        success: (res) => {
          if (res.confirm) {
            this.removeMessage()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    handleAddFrid() {
      wx.showModal({
        title: '提示消息',
        content: '申请好友',
        success: (res) => {
          if (res.confirm) {
            // 更新自己的 在客户端完成
            db.collection('users').doc(app.userInfo._id).update({
              data: {
                friendList: _.unshift(this.data.messageId)
              }
            }).then((res) => {})
            // 更新其他人的 在服务端完成
            wx.cloud.callFunction({
              name: 'update',
              data: {
                collection: 'users',
                id: this.data.messageId,
                data: `{friendList:_.unshift('${app.userInfo._id}')}`
              }
            }).then((res) => {
              console.log(res)
            })
            this.removeMessage()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    removeMessage() {
      db.collection('message').where({
        userId: app.userInfo._id
      }).get().then((res) => {
        let list = res.data[0].list
        list = list.filter((val, i) => {
          return val != this.data.messageId
        })
        // 调用云函数
        wx.cloud.callFunction({
          name: 'update',
          data: {
            collection: 'message',
            where: {
              userId: app.userInfo._id
            },
            data: {
              list
            }
          }
        }).then((res) => {
          console.log(res)
          this.triggerEvent('myevent', list)
        })
      })
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      db.collection('users').doc(this.data.messageId).field({
        userPhoto: true,
        nickName: true
      }).get().then((res) => {
        this.setData({
          userMseeage: res.data
        })
      })
    }
  },
})