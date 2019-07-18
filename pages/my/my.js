const app = getApp();
import {getTokenByCode,queryMyAcctUserInfoAndPoint,queryUnreadQuestionAndAnswerNum,queryOpenCityValidModuleInfoByParam} from '../../config/api';
import env from '../../config/env';

Page({
  data: {
    userMsg:[],
    unRead:[],
    pic_bg:env.pic_url+'personal_bg.png',
  },

  onLoad() {
    
  },
  onShow() {
   this.setData({
     unRead:[],
   })
   app.getUrl(1)
   let t = new Date().getTime();
   let flagT = app.authIsOrNot(t);
    // if (app.auth_info){
    if(flagT){
      this._queryMyAcctUserInfoAndPoint()
      this._queryUnreadQuestionAndAnswerNum()
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
            this._queryUnreadQuestionAndAnswerNum()
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
    console.log('我的',result)
    if(result.data.code === 0){
      app.userInfo = result.data.data
      this.setData({
        userMsg:result.data.data,
      })
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
    // my.navigateTo({ url: '/pages/personalpage/personalpage?id='+this.data.userMsg.id})
    my.navigateTo({ url: '/pages/personalinfo/personalinfo'})
  },
  //点击去积分页面
  toJF() {
    my.navigateTo({ url: '/pages/integral/integral'})
  },
  //联系客服
  makePhoneCall() {
    my.makePhoneCall({ number:'0755-86622688'});
  },
  //to 我的提问
  toMyQuestion() {
    my.navigateTo({ url: '/pages/myquestion/myquestion'})
  },
  //to 我的回答
  toMyAnswer() {
    my.navigateTo({ url: '/pages/myanswer/myanswer'})
  },
  //to 我的收藏
  toCollect() {
     my.navigateTo({ url: '/pages/collect/collect'})
  },
  //to 全部订单
  toOrderlist() {
    my.navigateTo({ url: '/pages/orderlist/orderlist'})
  },
  //to 收货地址
  toMyaddr() {
    my.navigateTo({ url: '/pages/myaddr/myaddr'})
  },
  //to 退款售后
  toRefund() {
    my.navigateTo({ url: '/pages/refund/refund'})
  },
  // 社保卡 点击
  toShebao() {
     this._queryOpenCityValidModuleInfoByParam()
  },
  //判断城市开通模块
  async _queryOpenCityValidModuleInfoByParam() {
    let result = await queryOpenCityValidModuleInfoByParam({
      cityCode: app.cityAdcode,
      moduleEn: 'mySocialSecurity'
    })
    //console.log('城市开通模块',result)
    if(result.data.data.length>0){
      let url = result.data.data[0].moduleUrl
      //console.log(url)
      my.showToast({
        content: '本服务由支付宝城市服务提供',
        duration: 1500,
        success: () => {
          my.ap.navigateToAlipayPage({
            path: url,
          })
        },
      });
    }else{
      my.showToast({
        content: '该城市暂未开通此服务！'
      });
    }
  },
});
