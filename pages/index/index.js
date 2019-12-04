const app = getApp();
//获取云数据库引用
const db = wx.cloud.database();
const admin = db.collection('user');
let name = null;
let password = null;

Page({
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

  //注册
  register() {
    let that = this;
    let flag = false //是否存在 true为存在

    //获取openid校验，防止一个微信号多次注册
    wx.cloud.callFunction({
        name: "getOpenid",
        success(res) {
          // open = res.result.openid
          app.globalData.imf = res.result.openid
          console.log("获取openid成功")
        },
        fail(res) {
          console.log("获取openid失败", res)
        }
      }),

      wx.cloud.callFunction({
        name: "getshuju",
        success(res) {
          console.log("获取数据成功")

          //当数据库里没有值时需要让用户先新建一个
          if (res.result.data.length === 0) {
            that.saveuserinfo()
          } else {
            for (var i = 0; i < res.result.data.length; i++) {
              if (res.result.data[i]._openid === getApp().globalData.imf) {
                wx.showToast({ //弹窗提示
                  title: '该微信号已注册！',
                  icon: 'success',
                  duration: 2500
                })
              } else {
                //查询用户名是否已被注册
                admin.get({
                  success: (res) => {
                    let admins = res.data; //获取到的对象数组数据
                    console.log(admins);
                    for (let i = 0; i < admins.length; i++) { //遍历数据库对象集合
                      if (name === admins[i].name) { //用户名存在
                        flag = true;
                        break;
                      }
                    }
                    if (flag === true) { //已注册
                      wx.showToast({
                        title: '用户名已被注册！',
                        icon: 'success',
                        duration: 2500
                      })
                    } else { //未注册
                      that.saveuserinfo()
                    }
                  }
                })
              }
            }
          }

        },
        fail(res) {
          console.log("获取数据失败")
        }
      })

  },
  //注册用户信息
  saveuserinfo() {
    let that = this;
    admin.add({ //添加数据
      data: {
        name: name,
        password: password
      }
    }).then(res => {
      console.log('注册成功！')
      wx.showToast({
        title: '注册成功！',
        icon: 'success',
        duration: 3000
      })
      wx.redirectTo({
        url: '/pages/login/login',
      })
    })
  }
})