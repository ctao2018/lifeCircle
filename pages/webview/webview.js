const app = getApp();


Page({
  data: {
   webUrl:''
  },

  onLoad() {
    
  },
  onShow() {
    this.setData({webUrl: app.webViewUrl})
   // console.log(this.data.webUrl)
    app.webViewUrl = ''
  },
  onReady() {

  },

});
