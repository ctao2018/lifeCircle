const app = getApp();
import {} from '../../config/api'

Page({
  data: {
    curIndex:0,
    yesFlag:true,
    noFlag:false,
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
    if(index === 1){
      this.setData({
        yesFlag:false,
        noFlag:true,
      })
    }else{
      this.setData({
        yesFlag:true,
        noFlag:false,
      })
    }
  },
});
