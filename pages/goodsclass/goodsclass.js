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
    spType:'',
  },

  onLoad(options) {
    if(options.id === 'new'){
      this.setData({
        spType:'new',
        isNew:1,
        isHot:null,
        sort:'addTime',
        order:'',
      })
    }else{
      this.setData({
        spType:'hot',
        isNew:null,
        isHot:null,
        sort:'addTime',
        order:'',
      })
    }
    this.goodsList()
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
  //点击去详情
  toDetail(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.goodsList[index].id
    let goodsType = this.data.goodsList[index].goodsType
    if(goodsType === 1){
      my.navigateTo({ url: '/pages/goodsxn/goodsxn?id='+ id})
    }else{
      my.navigateTo({ url: '/pages/goodssw/goodssw?id='+ id})
    }
  },
  //点击新品
  tapXP() {
    this.setData({
      xpFlag:true,
      jgFlag:false,
      upFlag:false,
      downFlag:false,
      pageNum:1,
      goodsList:[],
      sort:'addTime',
      order:'',
    })
    if(this.data.spType === 'new'){
      this.setData({
        isNew:1,
        isHot:null,
      })
    }else{
      this.setData({
        isNew:null,
        isHot:null,
      })
    }
    this.goodsList()
  },
  //点击价格
  tapJG() {
    this.setData({
      pageNum:1,
      goodsList:[],
      sort:'retailPrice',
    })
    if(this.data.upFlag) {
      this.setData({
        xpFlag:false,
        jgFlag:true,
        upFlag:false,
        downFlag:true,
        order:'desc',
      })
    }else{
      this.setData({
        xpFlag:false,
        jgFlag:true,
        upFlag:true,
        downFlag:false,
        order:'asc',
      })
    }
    if(this.data.spType === 'new'){
      this.setData({
        isNew:1,
        isHot:null,
      })
    }else{
      this.setData({
        isNew:null,
        isHot:null,
      })
    }
    this.goodsList()
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
