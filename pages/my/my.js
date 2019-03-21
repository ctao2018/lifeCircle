const app = getApp();
import {} from '../../config/api'

Page({
  data: {
    
  },

  onLoad() {
    
  },
  onShow() {
   this.setData({
     
   })
  },
  onReady() {
    
  },
  //点击去个人主页
  toPersonal() {
    my.navigateTo({ url: '/pages/personalpage/personalpage'})
  },
  //联系客服
  makePhoneCall() {
    my.makePhoneCall({ number:'0755-27398610'});
  },
});
