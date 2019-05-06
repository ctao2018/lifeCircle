const app = getApp();
import {queryMyAcctUserInfoAndPoint,getTokenByCode} from '../../config/api'

Page({
  data: {
    userMsg:[],
  },

  onLoad() {
    
  },
  onShow() {
    this.setData({
     
   })
   app.getUrl(1)
    if (app.auth_info){
      this._queryMyAcctUserInfoAndPoint()
    }else{
      this.auth()
    }
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
          //console.log(result)
          if(result.data.code===0){
            my.setStorage({
              key: 'token',
              data: result.data.data
            });
            this._queryMyAcctUserInfoAndPoint()
          }else{
            my.showToast({
              content: '授权失败，请重试！'
            });
          }
        })
      })
  },
  //获取个人信息
  async _queryMyAcctUserInfoAndPoint() {
    let result = await queryMyAcctUserInfoAndPoint()
    //console.log('我的',result)
    if(result.data.code === 0){
      app.userInfo = result.data.data
      this.setData({userMsg:result.data.data,})
    }else{
      console.log(result)
    }
  },
  //去积分页面
  toJF() {
    my.navigateTo({ url: '/pages/integral/integral'})
  },
  //点击查看更多
  toList() {
    my.navigateTo({ url: '/pages/goodsclass/goodsclass'})
  },
  //点击去兑换
  toexchange() {
    my.navigateTo({ url: '/pages/goodsxn/goodsxn'})
  },
  //点击 去详情
  todetail() {
    my.navigateTo({ url: '/pages/submitorder/submitorder'})
  },
});
