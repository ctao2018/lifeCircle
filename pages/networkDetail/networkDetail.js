const app = getApp();
import {formalTransactInstitutiondt} from '../../config/api'

Page({
  data: {
    scale: 14,
    longitude: 120.131441,
    latitude: 30.279383,
    markers: [{
      iconPath: '/image/mark_bs.png',
      id: 10,
      latitude: 30.279383,
      longitude: 120.131441,
      width: 19,
      height: 31,
      label:{
        content:"",
        color:"#333333",
        fontSize:12,
        borderRadius:3,
        bgColor:"#ffffff",
        padding:6,
      },
    }],
    id:'',
    dtArr:[],
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
     dtArr:[],
   })
   this._formalTransactInstitutiondt()
  },
  onReady() {
    
  },
  async _formalTransactInstitutiondt() {
    let result = await formalTransactInstitutiondt(this.data.id)
    console.log('dt',result)
    if(result.data.code === 0){
      // let markers=[{
      //   latitude: result.data.data.latitude,
      //   longitude: result.data.data.longitude,
      //   label:{
      //     content:result.data.data.name,
      //   },
      // }],
      let latitude = `markers[0].latitude`;
      let longitude = `markers[0].longitude`;
      let content = `markers[0].label.content`;
      this.setData({
        dtArr:result.data.data,
        [latitude]:result.data.data.latitude,
        [longitude]:result.data.data.longitude,
        [content]:result.data.data.name,
        longitude: result.data.data.longitude,
        latitude: result.data.data.latitude,
      })
    }else{
      console.log(result)
    }
  },
});
