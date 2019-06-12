const app = getApp();
import {formalInsuranceDrugsInfodt} from '../../config/api'
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
    app.getUrl(2,this.data.id)
  },
  onShow() {
    this.setData({
      detail:[],
    });
    this._formalInsuranceDrugsInfodt()
  },
  onReady() {
    
  },
  
  //详情
  async _formalInsuranceDrugsInfodt() {
    let result = await formalInsuranceDrugsInfodt(this.data.id)
    //console.log('详情',result)
      this.setData({
        detail:result.data.data,
      })
  },
  onShareAppMessage() {
    return {
      path: '/pages/drugsDetail/drugsDetail?id='+ this.data.id
    };
  },
});
