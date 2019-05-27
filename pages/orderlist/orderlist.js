const app = getApp();
import {orderPage,confirmOrder} from '../../config/api'

Page({
  data: {
    curIndex:0,
    pageNum:1,
    orderStatus:'',
    pages:'',
    orderArr:[],
  },

  onLoad() {
    
  },
  onShow() {
   this.setData({
     curIndex:0,
     pageNum:1,
     orderStatus:null,
     pages:'',
     orderArr:[],
    })
   this._orderPage()
  },
  onReady() {
    
  },
  // tab点击切换
  tabClick(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
       curIndex:index,
       pageNum:1,
       orderArr:[],
       showbtline:false,
    })
    if(index === 1){
      this.setData({orderStatus:201,})
    }else if(index === 2){
      this.setData({orderStatus:300,})
    }else if(index === 3){
      this.setData({orderStatus:301,})
    }else if(index === 4){
      this.setData({orderStatus:101,})
    }else{
      this.setData({orderStatus:null,})
    }
    this._orderPage()
  },
  //点击去详情
  toDetail(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.orderArr[index].id
    my.navigateTo({ url: '/pages/orderdetail/orderdetail?id=' + id})
  },
    //列表
  async _orderPage() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    const result = await orderPage({
      pageNum: this.data.pageNum,
      pageSize: 10,
      orderStatus: this.data.orderStatus,
    })
    //console.log('list',result)
    my.hideLoading()
    if(result.data.code === 0){
       this.setData({pages:result.data.data.pages})
      let list = result.data.data.rows
      this.data.orderArr = this.data.orderArr.concat(list)
      this.setData({orderArr:this.data.orderArr})
      console.log('orderArr',this.data.orderArr)
    }
  },
  //点击确认收货
  shsure(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.orderArr[index].id
    my.confirm({
      content: '已收到该订单商品',
      confirmButtonText: '已收货',
      cancelButtonText: '未收货',
      success: (result) => {
        if(result.confirm){
          this._confirmOrder(id)
        }
      },
    });
  },
  //确认收货
  async _confirmOrder(id) {
    const result = await confirmOrder(id)
    console.log('收货',result)
    if(result.data.code === 0){
      my.showToast({
        type: 'success',
        content: '收货成功',
        duration: 2000,
        success: () => {
          this.setData({
            pageNum:1,
            orderArr:[],
            showbtline:false,
          })
          this._orderPage()
        }
      });
    }else{
      my.showToast({
        type: 'exception',
        content: result.data.message,
        duration: 2000,
      });
    }
  },
  //点击再次购买
  toBuy(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.orderArr[index].orderGoodsList[0].goodsId
    let goodsType = this.data.orderArr[index].orderGoodsList[0].goodsType
    // if(goodsType === 1){
    //   my.navigateTo({ url: '/pages/goodsxn/goodsxn?id='+ id})
    // }else{
    //   my.navigateTo({ url: '/pages/goodssw/goodssw?id='+ id})
    // }
    my.switchTab({url: '/pages/mall/mall'})
  },
  onReachBottom(e) {
    if (this.data.pages>this.data.pageNum) {
        this.setData({
          pageNum: ++this.data.pageNum
        }, () => {
          this._orderPage()
        })
      }else{
        this.setData({showbtline:true})
      }
  },

  onPullDownRefresh() {
    this.setData({
      pageNum:1,
      orderStatus:'',
      pages:'',
      orderArr:[],
      showbtline:false,
    })
    this._orderPage()
    my.stopPullDownRefresh()
  }
});
