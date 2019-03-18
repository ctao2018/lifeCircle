const app = getApp();
import {} from '../../config/api'

Page({
  data: {
    clArr:[
      {name:'身份证',flaga:false},
      {name:'实体社保卡',flaga:false},
      {name:'本人工资卡',flaga:false},
      {name:'复印件',flaga:false},
      {name:'一寸照片≥4张',flaga:false},
      {name:'其他',flaga:false},
    ],
    urlLink:'',
    selCl:[],
    selLeng:0,
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
  //点击选择材料
  selCLfn(e) {
    let index=e.currentTarget.dataset['index'];
    let sItem = "clArr["+ index + "].flaga";
    if(this.data.clArr[index].flaga){
      this.setData({
        [sItem]:false,
      })
    }else{
      if(this.data.selLeng<3){
        this.setData({
          [sItem]:true,
        })
      }
    }
    let selArr = []
    let that = this
    that.data.clArr.forEach(function (e, i) {
      if(that.data.clArr[i].flaga){
        selArr.push(that.data.clArr[i].name)
      }
    })
    this.setData({selCl:selArr})
    let nowLeng = this.data.selCl.length
    this.setData({selLeng:nowLeng})
  },
});
