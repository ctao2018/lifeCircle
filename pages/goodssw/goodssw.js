const app = getApp();
import {goodsDetail} from '../../config/api';
import parse from 'mini-html-parser2';

Page({
  data: {
   banner: [
      '../../assets/imgaa.png',
      '../../assets/imgaa.png',
    ],
    currentTabsIndex:0,
    showTKbx:false,
    valueNum:1,
    goodsId:'',
    goodsArr:[],
    nodes:[],
    noFlag:false,
    selNum:1,
  },

  onLoad(options) {
    if(options){
      this.setData({
        goodsId:options.id,
      })
      this._goodsDetail()
    }
  },
  onShow() {
     this.setData({
      showTKbx:false,
    })
  },
  onReady() {
    
  },
  // tab点击切换
  tabClick(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      currentTabsIndex:index,
    })
  },
  //商品详情
  async _goodsDetail() {
    let result = await goodsDetail({
      id:this.data.goodsId
    })
    console.log('goods',result)
    if(result.data.code === 0){
      this.setData({
        goodsArr: result.data.data.info
      })
      this.changeNode()
      if(result.data.data.info.goodsNumber < 1){
        this.setData({
          noFlag: true,
        })
      }else if(result.data.data.info.goodsIntegral>app.userInfo.point) {
        this.setData({
          noFlag: true,
        })
      }
    }else{
      console.log(result)
    }
  },
  changeNode() {
    let html = this.data.goodsArr.goodsDesc
    parse(html, (err, nodes) => {
      if (!err) {
        this.setData({
          nodes,
        });
      }
    })
    //console.log(this.data.nodes)
  },
  //点击购买按钮
  showTK() {
    if(!this.data.showTKbx){
      this.setData({showTKbx:true,})
    }else{
      if(!this.data.noFlag) {
        my.navigateTo({ url: '/pages/submitorder/submitorder?num='+this.data.selNum + '&id=' + this.data.goodsArr.id})
      }
    }
    
  },
  //选择数量
  callBackFn(value){
   console.log(value);
   this.setData({selNum:value,})
   let jf = this.data.goodsArr.goodsIntegral;
   if(jf*value > app.userInfo.point){
     this.setData({
       noFlag: true,
     })
   }else{
      this.setData({
       noFlag: false,
     })
   }
  },
  //关闭弹框
  closeTK() {
    this.setData({showTKbx:false,})
  },
  
});
