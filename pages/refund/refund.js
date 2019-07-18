const app = getApp();
import {} from '../../config/api';

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
  //去详情
  toDetail(e) {
    let indx = e.currentTarget.dataset.index;
    let id = ''
    my.navigateTo({ url: '/pages/refundDetail/refundDetail?id='+ id})
  },
});
