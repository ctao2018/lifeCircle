const app = getApp();
import {} from '../../config/api'

Page({
  data: {
    clArr:['身份证','实体社保卡','本人工资卡','复印件','一寸照片≥4张','其他'],
    urlLink:'',
    sel:'',
  },

  onLoad() {
    
  },
  onShow() {
    
  },
  onReady() {
    
  },
  //获取链接
  getTit(e) {
    this.setData({
      urlLink: e.detail.value,
    });
  },
});
