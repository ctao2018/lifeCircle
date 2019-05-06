const app = getApp();
import {} from '../../config/api'

Page({
  data: {
    xpFlag:true,
    jgFlag:false,
    upFlag:false,
    downFlag:false,
  },

  onLoad() {
    
  },
  onShow() {
    
  },
  onReady() {
    
  },
  //点击新品
  tapXP() {
    this.setData({
      xpFlag:true,
      jgFlag:false,
      upFlag:false,
      downFlag:false,
    })
  },
  //点击价格
  tapJG() {
    if(this.data.upFlag) {
      this.setData({
        xpFlag:false,
        jgFlag:true,
        upFlag:false,
        downFlag:true,
      })
    }else{
      this.setData({
        xpFlag:false,
        jgFlag:true,
        upFlag:true,
        downFlag:false,
      })
    }
    
  },
});
