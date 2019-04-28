const app = getApp();
import {} from '../../config/api'

Page({
  data: {
    showAddr:false,
    textarea:'',
    province: '',
    city: '',
    county: '',
  },

  onLoad() {
    
  },
  onShow() {
   
  },
  onReady() {
    
  },
  //点击省市区
  selCity() {
    this.setData({showAddr:true})
  },
  //点击省市区 返回结果
  onChange(val,code) {
    console.log("com",val)
    this.setData({
      showAddr:false,
      province: val[0],
      city: val[1],
      county: val[2],
    })
  },
  //点击保存按钮
   submitFn(e) {
     this.setData({textarea:e.detail.value.textarea})
   },
});
