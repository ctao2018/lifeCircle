const app = getApp();
import {goodsDetail,queryListByUserId,orderSubmit} from '../../config/api'

Page({
  data: {
    addrFlag:false,
    goodsId:'',
    selNum:null,
    goodsArr:[],
    totalJF:'',
    totalMon:'',
    selAddr:{},
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
    if(app.selAddr){
      this.setData({selAddr:app.selAddr})
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
      if(result.data.data.actualPrice === 0){
        my.alert({
          title: '兑换成功',
          buttonText: '确认',
          success: () => {
            my.redirectTo({ url: '/pages/orderlist/orderlist'})
          },
        });
      }else{

      }
    }else{
      console.log(result)
    }
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
    this._orderSubmit()
    // my.navigateTo({ url: '/pages/orderlist/orderlist'})
  },
});
