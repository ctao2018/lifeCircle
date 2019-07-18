const app = getApp();
import {orderDetail,confirmOrder} from '../../config/api'

Page({
  data: {
    orderId:'',
    detail:[],
  },

  onLoad(options) {
    if(options){
      this.setData({
        orderId:options.id,
      })
      this._orderDetail()
    }
  },
  onShow() {
    
  },
  onReady() {
    
  },
  //联系客服
  makePhoneCall() {
    my.makePhoneCall({ number:'0755-86622688'});
  },
  //详情
  async _orderDetail() {
    const result = await orderDetail(this.data.orderId)
    console.log('详情',result)
    if(result.data.code === 0){
      this.setData({detail:result.data.data})
    }else{
      my.showToast({
        type: 'exception',
        content: result.data.message,
        duration: 2000,
      });
    }
  },
  //点击确认收货
  shsure() {
    let id = this.data.detail.id
    my.confirm({
      content: '已收到该订单商品',
      confirmButtonText: '已收货',
      cancelButtonText: '未收货',
      success: (result) => {
        if(result.confirm){
          this._confirmOrder(id)
        }
      },
    });
  },
  //确认收货
  async _confirmOrder(id) {
    const result = await confirmOrder(id)
    console.log('收货',result)
    if(result.data.code === 0){
      my.showToast({
        type: 'success',
        content: '收货成功',
        duration: 2000,
        success: () => {
          this._orderDetail()
        }
      });
    }else{
      my.showToast({
        type: 'exception',
        content: result.data.message,
        duration: 2000,
      });
    }
  },
  //点击再次购买
  toBuy() {
    my.switchTab({url: '/pages/mall/mall'})
  },
  //复制
  copyFn() {
    let txt = this.data.detail.shippingNo
    my.setClipboard({
      text: txt,
      success:()=>{
          my.showToast({
            content: '复制成功',
            duration: 1500,
          });
      }
    })
  },
  //申请退款
  toRefund() {
    my.navigateTo({ url: '/pages/applyRefund/applyRefund?id='+this.data.orderId})
  },
});
