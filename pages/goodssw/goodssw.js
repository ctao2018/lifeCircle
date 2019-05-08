const app = getApp();
import {} from '../../config/api'

Page({
  data: {
   banner: [
      '../../assets/imgaa.png',
      '../../assets/imgaa.png',
    ],
    currentTabsIndex:0,
    showTKbx:false,
    valueNum:1,
  },

  onLoad() {
    
  },
  onShow() {
    
  },
  onReady() {
    
  },
  // tab点击切换
  tabClick(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      currentTabsIndex:index,
    })
  },
  //点击购买按钮
  showTK() {
    if(!this.data.showTKbx){
      this.setData({showTKbx:true,})
    }else{
      this.setData({showTKbx:false,})
    }
    
  },
  //选择数量
  callBackFn(value){
   console.log(value);
  },
  //关闭弹框
  closeTK() {
    this.setData({showTKbx:false,})
  },
  
});
