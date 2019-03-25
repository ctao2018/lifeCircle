const app = getApp();
import {getTokenByCode,queryMyAcctUserInfoAndPoint} from '../../config/api'

Page({
  data: {
    userMsg:[],
  },

  onLoad() {
    
  },
  onShow() {
    let tok = my.getStorageSync({ key: 'token' })
    if (tok.data){
      this._queryMyAcctUserInfoAndPoint()
    }else{
      this.auth()
    }
   this.setData({
     userMsg:[],
   })
  },
  onReady() {
    
  },
  auth() {
    app.getUserInfo().then(
      auth => {
        let auth_code = auth.auth_code.authCode;
        getTokenByCode({
          appClient: '',
          code: auth_code,
          identityType: 1,
          mac: '',
          registePlat: 2
        }).then(result =>{
          my.setStorage({
            key: 'token',
            data: result.data.data
          });
          this._queryMyAcctUserInfoAndPoint()
        })
      })
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
