const app = getApp();
import {} from '../../config/api'

Page({
  data: {
   
  },

  onLoad() {
    
  },
  onShow() {
    this.setData({
      
    });
    
  },
  onReady() {
    
  },
  
  //去回答
  toAnswer() {
     my.navigateTo({ url: '/pages/answer/answer?typeBack=2'})
  },
});
