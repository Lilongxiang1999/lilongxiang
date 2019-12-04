// pages/login/login.js
let app = getApp();
// 获取云数据库引用
const db = wx.cloud.database();
const admin = db.collection('user');
let name = null;
let password = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //输入用户名
  inputName: function(event) {
    name = event.detail.value
  },
  //输入密码
  inputPassword(event) {
    password = event.detail.value
  },

  //登陆
  //用户注册时将账号密码存入数据库，在登陆页面时，通过连接到数据库的云函数，
  //循环遍历出所有账号与密码进行对比。
  login() {
    let that = this;

    wx.cloud.callFunction({
      name: "getshuju",
      success(res) {
        console.log("获取云数据成功")
        let inf = res.result.data //获取数据库数据
        console.log(inf)

        for (var i = 0; i < inf.length; i++) {
          console.log(i)
          if (name === inf[i].name) { ///如果输入的值等于数据库name的值 验证用户名
            if (password !== inf[i].password) { //验证密码 如果输入值不等于数据库password的值
              console.log("密码输入错误")
              wx.showToast({ //弹窗提示
                title: '密码错误！！',
                icon: 'success',
                duration: 2500
              })
            } else {
              console.log("登陆成功")
              wx.showToast({
                  title: '登陆成功！！',
                  icon: 'success',
                  duration: 2500
                }),
                wx.navigateTo({
                  url: '/pages/home/home'
                })
            }
            break

          } else {
            console.log("无此用户名")
            console.log(name)
            wx.showToast({
              title: '无此用户名！！',
              icon: 'success',
              duration: 2500
            })
          }
        }
      },

      fail(res) {
        console.log("获取云函数数据失败", res)
      }
    })

    //登陆获取用户信息
    //   admin.get({
    //     success: (res) => {
    //       console.log("账号：" + name + "密码：" + password)
    //     }
    //   })
  },

  //跳转到注册页面并获取用户openid
  register() {
    wx.navigateTo({
        url: '/pages/index/index',
      })
  }
})