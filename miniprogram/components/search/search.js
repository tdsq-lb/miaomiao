// components/search/search.js
const app = getApp()
const db = wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isFocus: false,
    historyList: [],
    searchList: [],
    value: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击光标
    handleFocus() {
      wx.getStorage({
        key: 'searchHistory',
        success: (res) => {
          this.setData({
            historyList: res.data
          })
        }
      })
      this.setData({
        isFocus: true
      })
    },
    // 取消
    handleCancel() {
      this.setData({
        isFocus: false,
        value: '',
        searchList: []
      })
    },
    handleConfirm(e) {
      let value = e.detail.value
      let historyList = [...this.data.historyList]
      historyList.unshift(value)
      wx.setStorage({
        key: "searchHistory",
        data: [...new Set(historyList)]
      })
      this.changSearchList(value)
      this.setData({
        value: ''
      })
    },
    handleDelte() {
      wx.removeStorage({
        key: 'searchHistory',
        success: (res) => {
          this.setData({
            historyList: [],
            value: ''
          })
        }
      })
    },
    // 搜索
    changSearchList(value) {
      db.collection('users').where({
        nickName: db.RegExp({
          regexp: value,
          options: 'i',
        })
      }).field({
        userPhoto: true,
        nickName: true
      }).get().then((res) => {
        this.setData({
          searchList: res.data
        })
      })
    },
    handleHistoryBtn(e) {
      const value = e.target.dataset.value
      this.setData({
        value
      })
      this.changSearchList(value)
    }
  }
})