const app = getApp();
import {} from '../../config/api'

Page({
  data: {
   zanY:false,
   showZK:false,
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
  //点击展开
  showZKtxt() {
    this.setData({showZK:true,})
  },
});
