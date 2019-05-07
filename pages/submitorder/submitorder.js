const app = getApp();
import {} from '../../config/api'

Page({
  data: {
    addrFlag:true,
  },

  onLoad() {
    
  },
  onShow() {
    
  },
  onReady() {
    
  },
  //点击填写收货地址
  toAddaddr() {
    my.navigateTo({ url: '/pages/myaddradd/myaddradd'})
  },
  //选择其他地址
  toaddrlist() {
     my.navigateTo({ url: '/pages/myaddr/myaddr'})
  },
  //点击提交订单
  tjorder() {
    my.navigateTo({ url: '/pages/orderlist/orderlist'})
  },
});
