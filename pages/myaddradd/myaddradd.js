const app = getApp();
import {} from '../../config/api'

Page({
  data: {
    showAddr:false
  },

  onLoad() {
    
  },
  onShow() {
   
  },
  onReady() {
    
  },
  tapname() {
    this.setData({showAddr:true})
  },
  onChange(val,code) {
    console.log("com",val)
    this.setData({showAddr:false})
  },
});
