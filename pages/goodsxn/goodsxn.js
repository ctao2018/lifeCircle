const app = getApp();
import {goodsDetail,orderSubmit,alipayTradeCreate,payCallBack} from '../../config/api';
import parse from 'mini-html-parser2';

Page({
  data: {
    imgsrc:'../../assets/integral_bg.png',
    goodsId:'',
    goodsArr:[],
    nodes:[],
    noFlag:true,
    btnTxt:'立即兑换',
    orderArr:[],
    orderSn:'',
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
      noFlag:true,
      btnTxt:'立即兑换',
      orderArr:[],
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
      }else{
        this.setData({
          noFlag: false,
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
      this.setData({orderArr:result.data.data,})
      if(result.data.data.actualPrice === 0){
        my.alert({
          title: '兑换成功',
          buttonText: '确认',
          success: () => {
            my.navigateTo({ url: '/pages/orderlist/orderlist'})
          },
        });
      }else{
        this._alipayTradeCreate()
      }
    }else{
      console.log(result)
    }
  },
  //创建支付宝交易号
  async _alipayTradeCreate() {
    let result = await alipayTradeCreate({
      orderSn: this.data.orderArr.orderSn,
      totalAmount: this.data.orderArr.actualPrice
    })
   console.log('交易号',result)
   if(result.data.code === 0){
     this.setData({orderSn: result.data.data.orderSn})
     my.tradePay({
      tradeNO: result.data.data.tradeNo, 
        success: (res) => {
          console.log(res)
          if(res.resultCode === '9000'){
            my.redirectTo({ url: '/pages/orderlist/orderlist'})
            this._payCallBack(JSON.stringify(res),1)
          }else if(res.resultCode === '4000' || res.resultCode === '6001' || res.resultCode === '6002' || res.resultCode === '99'){
            this._payCallBack(JSON.stringify(res),0)
            my.alert({
              title: '交易失败，请重新下单！',
              buttonText: '确认',
              success: () => {
               
              },
            });
          }else{
            
          }
        },
        fail: (res) => {
          console.log(res)
          my.showToast({
            type: 'exception',
            content: '支付失败，请重试！'
          });
      }
    });
   }
  },
  //支付结果确认
  async _payCallBack(msg,sta) {
    let result = await payCallBack({
      alipayTradeResult: msg,
      orderSn: this.data.orderSn,
      payResultStatus: sta
    })
   console.log('支付结果确认',result)
   
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
