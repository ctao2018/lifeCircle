const app = getApp();
import {goodspage} from '../../config/api'

Page({
  data: {
    xpFlag:true,
    jgFlag:false,
    upFlag:false,
    downFlag:false,
    pageNum: 1,
    pageSize: 10,
    isNew:null,
    isHot:null,
    sort:'',
    order:'',
    goodsList:[],
    pages:'',
  },

  onLoad(options) {
    if(options.id === 'new'){
      this.setData({
        isNew:1,
        isHot:null,
      })
      this.goodsList()
    }else{
      this.setData({
        isNew:null,
        isHot:1,
      })
      this.goodsList()
    }
  },
  onShow() {
    
  },
  onReady() {
    
  },
  //商品列表
  async goodsList() {
    let result = await goodspage({
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize,
      isNew:this.data.isNew,
      isHot:this.data.isHot,
      sort:this.data.sort,
      order:this.data.order,
    })
    console.log('goodsList',result)
    if(result.data.code === 0){
      let newList = []
      newList = result.data.data.rows
      this.setData({
        pages:result.data.data.pages,
        goodsList:this.data.goodsList.concat(newList)
      })
    }else{
      console.log(result)
    }
  },
  //点击新品
  tapXP() {
    this.setData({
      xpFlag:true,
      jgFlag:false,
      upFlag:false,
      downFlag:false,
    })
  },
  //点击价格
  tapJG() {
    if(this.data.upFlag) {
      this.setData({
        xpFlag:false,
        jgFlag:true,
        upFlag:false,
        downFlag:true,
      })
    }else{
      this.setData({
        xpFlag:false,
        jgFlag:true,
        upFlag:true,
        downFlag:false,
      })
    }
    
  },
  onReachBottom(e) {
    if (this.data.pages>this.data.pageNum) {
      this.setData({
        pageNum: ++this.data.pageNum
      }, () => {
        this.goodsList()
      })
    }else{
      this.setData({showbtline:true})
    }
  },

  onPullDownRefresh() {
    this.setData({
      pageNum:1,
      goodsList:[],
      showbtline:false,
    })
    this.goodsList()
    my.stopPullDownRefresh()
  }
});
