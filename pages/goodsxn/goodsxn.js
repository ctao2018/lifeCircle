const app = getApp();
import {goodsDetail,orderSubmit} from '../../config/api';
import parse from 'mini-html-parser2';

Page({
  data: {
    imgsrc:'../../assets/integral_bg.png',
    goodsId:'',
    goodsArr:[],
    nodes:[],
    noFlag:false,
    btnTxt:'立即兑换',
  },

  onLoad(options) {
    if(options){
      this.setData({
        goodsId:options.id,
      })
    }
  },
  onShow() {
    this.setData({
      goodsArr:[],
      nodes:[],
      noFlag:false,
      btnTxt:'立即兑换',
    })
    this._goodsDetail()
  },
  onReady() {
    
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
          btnTxt:'商品已售完',
        })
      }else if(result.data.data.info.goodsIntegral>app.userInfo.point) {
        this.setData({
          noFlag: true,
          btnTxt:'立即兑换',
        })
      }
    }else{
      console.log(result)
    }
  },
  //点击兑换
  exchange() {
    if(!this.data.noFlag){
      my.confirm({
        title: '确认兑换',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        success: (result) => {
         // console.log(result)
          if(result.confirm){
             this._orderSubmit()
          }
        },
      });
    }
    
  },
  //下单兑换
  async _orderSubmit() {
    let result = await orderSubmit({
      goodsId:this.data.goodsId,
      number:1,
    })
    console.log('duihuan',result)
    if(result.data.code === 0){
      if(result.data.data.actualPrice === 0){
        my.alert({
          title: '兑换成功',
          buttonText: '确认',
          success: () => {
            my.navigateTo({ url: '/pages/orderlist/orderlist'})
          },
        });
      }else{

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
});
