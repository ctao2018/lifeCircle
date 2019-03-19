const app = getApp();
import {queryOfferQuestionById} from '../../config/api'

Page({
  data: {
   id:'',
   detail:[],
  },

  onLoad(options) {
    if(options){
      this.setData({
        id:options.id,
      })
    }
  },
  onShow() {
    this.setData({
      detail:[]
    });
    this._queryOfferQuestionById()
  },
  onReady() {
    
  },
  
  //去回答
  toAnswer() {
     my.navigateTo({ url: '/pages/answer/answer?typeBack=2&id='+ this.data.id})
  },
  //详情
  async _queryOfferQuestionById() {
    let result = await queryOfferQuestionById(this.data.id)
    console.log('详情',result)
    this.setData({detail:result.data.data})
  },
});
