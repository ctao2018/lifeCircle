const app = getApp();
import {} from '../../config/api'

Page({
  data: {
    seaVal:'',
    showHot:false,
  },

  onLoad() {
    
  },
  onShow() {
   this.setData({
     
   })
  },
  onReady() {
    
  },
  handleSubmit(value) {
    my.alert({
      content: value,
    });
  },
  //to 提问页面
  toQuestion() {
    my.navigateTo({ url: '/pages/question/question'})
  },
});
