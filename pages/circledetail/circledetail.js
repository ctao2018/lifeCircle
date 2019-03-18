const app = getApp();
import {} from '../../config/api'

Page({
  data: {
   zanY:false,
  },

  onLoad() {
    
  },
  onShow() {
    this.setData({
      
    });
    
  },
  onReady() {
    
  },
  //点赞
  zanClick() {
    this.setData({zanY:true,})
  },
  
});
