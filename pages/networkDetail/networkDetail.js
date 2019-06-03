const app = getApp();
import {} from '../../config/api'

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
        content:"Hello Label",
        color:"#333333",
        fontSize:12,
        borderRadius:3,
        bgColor:"#ffffff",
        padding:6,
      },
    }],
  },

  onLoad() {
    
  },
  onShow() {
   this.setData({
   })
  },
  onReady() {
    
  },
  
});
