// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "lilongxiang-1zxjf",
  traceUser: true
})

// 云函数入口函数
exports.main = async(event, context) => {
  return cloud.database().collection("user").get();
}