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
    lng:'',
    lat:'',
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
   if(app.coordinate){
      this.setData({
        lng:app.coordinate.lng,
        lat:app.coordinate.lat,
      })
    }
  },
  onReady() {
    this.mapCtx = my.createMapContext('map');
  },
  async _formalTransactInstitutiondt() {
    let result = await formalTransactInstitutiondt(this.data.id)
    console.log('dt',result)
    if(result.data.code === 0){
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
  //导航
  daohang() {
    this.mapCtx.showRoute({
      searchType:"drive",                // 搜索类型：10.1.50新增，有"walk", "bus", "drive", "ride", 默认值为walk
      startLat:this.data.lat,              // 起点纬度
      startLng:this.data.lng,             // 起点经度
      endLat:this.data.dtArr.latitude,                // 终点纬度
      endLng:this.data.dtArr.longitude,               // 终点经度
      mode:0,                           // 只有驾车模式和公交模式支持，可选,具体值见下表
    });
  },
  //纠错
  tojc() {
    my.navigateTo({ url: '/pages/errorCorrection/errorCorrection?type=1&id='+this.data.id})
  },
  onShareAppMessage() {
    return {
      path: '/pages/networkDetail/networkDetail?id='+ this.data.id
    };
  },
});
