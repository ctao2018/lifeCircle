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
  //点击昵称
  tapName() {
    my.showToast({
        content: '昵称需到支付宝设置页面修改'
      });
  },
  //点击年龄
  tapAge() {
    my.datePicker({
      format: 'yyyy-MM-dd',
      startDate: '1901-1-1',
      success: (res) => {
        my.alert({
        content: res.date,
      });
      },
    });
  },
});
