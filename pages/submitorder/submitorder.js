const app = getApp();
import {goodsDetail,queryListByUserId,orderSubmit,alipayTradeCreate,payCallBack} from '../../config/api'

Page({
  data: {
    addrFlag:false,
    goodsId:'',
    selNum:null,
    goodsArr:[],
    totalJF:'',
    totalMon:'',
    selAddr:{},
    orderArr:[],
    orderSn:'',
    tradeNo:'',
  },

  onLoad(options) {
    //console.log(options)
    if(options){
      this.setData({
        goodsId:options.id,
        selNum:options.num,
      })
      this._goodsDetail()
    }
  },
  onShow() {
    //console.log(app.selAddr)
    this.setData({selAddr:{},})
    if(app.selAddr){
      this.setData({selAddr:app.selAddr})
      app.selAddr = null
    }else{
      this._queryListByUserId()
    }
  },
  onReady() {
    
  },
  //商品详情
  async _goodsDetail() {
    let result = await goodsDetail({
      id:this.data.goodsId
    })
    //console.log('goods',result)
    if(result.data.code === 0){
      let totalJF = result.data.data.info.goodsIntegral*this.data.selNum;
      let money = result.data.data.info.retailPrice*this.data.selNum;
      let totalMon = (Number(money)).toFixed(2)
      this.setData({
        goodsArr: result.data.data.info,
        totalJF: totalJF,
        totalMon: totalMon,
      })
    }else{
      console.log(result)
    }
  },
  //地址列表
  async _queryListByUserId() {
    let result = await queryListByUserId()
   //console.log('addr',result)
   if(result.data.code === 0){
     let addrList = result.data.data
      let obj = {}
      obj = addrList.find((item)=>{
        return item.isDefault === true
      })
      //console.log(obj)
      this.setData({
        addrList:addrList,
        selAddr:obj,
      })
      if(obj){
        this.setData({addrFlag:true})
      }else{
        this.setData({addrFlag:false})
      }
   }
  },
  //下单
  async _orderSubmit() {
    let result = await orderSubmit({
      cityName: this.data.selAddr.cityName,
      countyName: this.data.selAddr.countyName,
      detailInfo: this.data.selAddr.detailInfo,
      goodsId: this.data.goodsId,
      number: this.data.selNum,
      provinceName: this.data.selAddr.provinceName,
      telNumber: this.data.selAddr.telNumber,
      userName: this.data.selAddr.userName
    })
    console.log('下单',result)
    if(result.data.code === 0){
      this.setData({orderArr:result.data.data,})
      if(result.data.data.actualPrice === 0){
        my.alert({
          title: '兑换成功',
          buttonText: '确认',
          success: () => {
            my.redirectTo({ url: '/pages/orderlist/orderlist'})
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
   //console.log('交易号',result)
   if(result.data.code === 0){
     this.setData({
       orderSn: result.data.data.orderSn,
       tradeNo:result.data.data.tradeNo,
      })
     this.tradePay()
   }
  },
  //支付宝调起收银台
  tradePay() {
    my.tradePay({
      tradeNO: this.data.tradeNo, 
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
                my.navigateBack()
              },
            });
          }else{
            my.alert({
              title: '交易失败，请重新提交订单！',
              buttonText: '确认',
              success: () => {
                this.tradePay()
              },
            });
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
  //点击填写收货地址
  toAddaddr() {
    my.navigateTo({ url: '/pages/myaddradd/myaddradd'})
  },
  //选择其他地址
  toaddrlist() {
     my.navigateTo({ url: '/pages/myaddr/myaddr?type=1'})
  },
  //点击提交订单
  tjorder() {
    if(this.data.goodsArr.retailPrice>0){
      this._orderSubmit()
    }else{
      my.confirm({
        title: '确认兑换',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        success: (result) => {
          if(result.confirm){
            this._orderSubmit()
          }
        },
      });
    }
    // my.navigateTo({ url: '/pages/orderlist/orderlist'})
  },
});
