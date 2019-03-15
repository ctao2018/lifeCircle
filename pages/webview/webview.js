const app = getApp();


Page({
  data: {
   webUrl:''
  },

  onLoad() {
    this.setData({webUrl:app.webViewUrl})
    console.log(this.data.webUrl)
  },
  onReady() {
    
  },

});
