const app = getApp();
import {} from '../../config/api'

Page({
  data: {
    curIndex:0,
    listFg:true,
  },

  onLoad() {
    
  },
  onShow() {
   this.setData({
     curIndex:0,
   })
   
  },
  onReady() {
    
  },
  // tab点击切换
  tabClick(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      curIndex:index,
    })
    
  },
  //点击去详情
  toDetail() {
    my.navigateTo({ url: '/pages/orderdetail/orderdetail'})
  },
});