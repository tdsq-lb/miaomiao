// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 所有更新的封装 注意 data更新内容不写死 所有data为前端传过来的字符串 由服务端进行解析处理
exports.main = async (event, context) => {
  console.log(event, 'event ================>>>>>>')
  try {
    //判断event.data是否为 string 如果是 则把字符串转成js语句 执行
    if (typeof event.data == 'string') {
      event.data = eval('(' + event.data + ')') // eval  把字符串转成js语句
    }
    return await db.collection(event.collection).doc(event.id)
      .update({
        data: {
          ...event.data
        },
      })
  } catch (e) {
    console.error(e)
  }
}