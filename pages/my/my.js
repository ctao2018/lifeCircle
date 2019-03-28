const app = getApp();
import {getTokenByCode,queryMyAcctUserInfoAndPoint,queryUnreadQuestionAndAnswerNum} from '../../config/api'

Page({
  data: {
    userMsg:[],
    unRead:[],
  },

  onLoad() {
    
  },
  onShow() {
   this.setData({
     userMsg:[],
     unRead:[],
   })
   app.getUrl(1)
   this._queryUnreadQuestionAndAnswerNum()
   this._queryMyAcctUserInfoAndPoint()
  },
  onReady() {
    
  },
  //获取个人信息
  async _queryMyAcctUserInfoAndPoint() {
    let result = await queryMyAcctUserInfoAndPoint()
    console.log('我的',result)
    if(result.data.code === 0){
      app.userInfo = result.data.data
      this.setData({userMsg:result.data.data,})
    }else{
      console.log(result)
    }
  },
  //提问 回答 未读条数
  async _queryUnreadQuestionAndAnswerNum() {
    let result = await queryUnreadQuestionAndAnswerNum()
   // console.log('未读',result)
    if(result.data.code === 0){
      this.setData({unRead:result.data.data,})
    }else{
      console.log(result)
    }
  },
  //点击去个人主页
  toPersonal() {
    my.navigateTo({ url: '/pages/personalpage/personalpage?id='+this.data.userMsg.id})
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
