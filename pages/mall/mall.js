const app = getApp();
import {queryMyAcctUserInfoAndPoint,getTokenByCode,goodspage} from '../../config/api'

Page({
  data: {
    userMsg:[],
    hotList:[],
    newList:[],
  },

  onLoad() {
    
  },
  onShow() {
    this.setData({
     hotList:[],
     newList:[],
    })
   app.getUrl(1)
    if (app.auth_info){
      this._queryMyAcctUserInfoAndPoint()
    }else{
      this.auth()
    }
    this.newGoodsList()
    this.hotGoodsList()
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
      this.setData({
        userMsg:result.data.data,
      })
    }else{
      console.log(result)
    }
  },
  //新品列表
  async newGoodsList() {
    let result = await goodspage({
      pageNum:1,
      pageSize:3,
      isNew:1,
    })
    //console.log('新品',result)
    if(result.data.code === 0){
      this.setData({
        newList:result.data.data.rows
      })
    }else{
      console.log(result)
    }
  },
  //热门列表
  async hotGoodsList() {
    let result = await goodspage({
      pageNum:1,
      pageSize:6,
      isHot:1,
    })
    //console.log('热门',result)
    if(result.data.code === 0){
      this.setData({
        hotList:result.data.data.rows
      })
    }else{
      console.log(result)
    }
  },
  //去积分页面
  toJF() {
    my.navigateTo({ url: '/pages/integral/integral'})
  },
  //点击查看更多 新品
  toListNew() {
    my.navigateTo({ url: '/pages/goodsclass/goodsclass?id=new'})
  },
  //点击查看更多 热卖
  toListHot() {
    my.navigateTo({ url: '/pages/goodsclass/goodsclass?id=hot'})
  },
  //点击去详情 新品
  toDetailNew(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.newList[index].id
    let goodsType = this.data.newList[index].goodsType
    if(goodsType === 1){
      my.navigateTo({ url: '/pages/goodsxn/goodsxn?id='+ id})
    }else{
      my.navigateTo({ url: '/pages/goodssw/goodssw?id='+ id})
    }
  },
  //点击去详情 热门
  todetailHot(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.hotList[index].id
    let goodsType = this.data.hotList[index].goodsType
    if(goodsType === 1){
      my.navigateTo({ url: '/pages/goodsxn/goodsxn?id='+ id})
    }else{
      my.navigateTo({ url: '/pages/goodssw/goodssw?id='+ id})
    }
  },
  onPullDownRefresh() {
    this.setData({
      userMsg:[],
      hotList:[],
      newList:[],
    })
    this.newGoodsList()
    this.hotGoodsList()
    this._queryMyAcctUserInfoAndPoint()
    my.stopPullDownRefresh()
  }
});
