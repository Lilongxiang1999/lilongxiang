//app.js
App({
  onLaunch: function() {
    wx.cloud.init({
      env: 'lilongxiang-1zxjf',
      traceUser: true
    })
  },
  globalData: {
    imf: '',
  }
})