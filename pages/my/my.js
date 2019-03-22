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
  //点击去积分页面
  toJF() {
    my.navigateTo({ url: '/pages/integral/integral'})
  },
  //联系客服
  makePhoneCall() {
    my.makePhoneCall({ number:'0755-27398610'});
  },
  //to 我的提问
  toMyQuestion() {
    my.navigateTo({ url: '/pages/myquestion/myquestion'})
  },
  //to 我的回答
  toMyAnswer() {
    my.navigateTo({ url: '/pages/myanswer/myanswer'})
  },
});
