const app = getApp();
import {} from '../../config/api'

Page({
  data: {
    wlFlag:true,
  },

  onLoad() {
    
  },
  onShow() {
    
  },
  onReady() {
    
  },
  //联系客服
  makePhoneCall() {
    my.makePhoneCall({ number:'0755-86622688'});
  },
  //点击确认收货
  shsure() {
    my.confirm({
      content: '已收到该订单商品',
      confirmButtonText: '已收货',
      cancelButtonText: '未收货',
      success: (result) => {
        console.log(result)
        if(result.confirm){
          my.showToast({
            type: 'success',
            content: '收货成功',
            duration: 2000,
          });
        }
      },
    });
  },
  //复制
  copyFn() {
    my.setClipboard({
      text:'20190507000012',
      success:()=>{
          my.showToast({
            content: '复制成功',
            duration: 1500,
          });
      }
    })
  },
});
