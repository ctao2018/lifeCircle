const app = getApp();
import {queryMyPointBookPageByParam} from '../../config/api'

Page({
  data: {
    curIndex:0,
    pages:'',
    pageNum:1,
    isGain:'',
    jfArr:[],
    showbtline:false,
    pointAll:'',
  },

  onLoad() {
    
  },
  onShow() {
   this.setData({
     curIndex:0,
     pages:'',
     pageNum:1,
     isGain:'',
     jfArr:[],
     showbtline:false,
   })
   this._queryMyPointBookPageByParam()
   this.setData({pointAll:app.userInfo.point})
  },
  onReady() {
    
  },
  // tab点击切换
  tabClick(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      curIndex:index,
    })
    if(index === 1 ){
      this.setData({
        pageNum:1,
        isGain:'Y',
        jfArr:[],
        showbtline:false,
      })
      this._queryMyPointBookPageByParam()
    }else if(index === 2){
      this.setData({
        pageNum:1,
        isGain:'N',
        jfArr:[],
        showbtline:false,
      })
      this._queryMyPointBookPageByParam()
    }else{
      this.setData({
        pageNum:1,
        isGain:'',
        jfArr:[],
        showbtline:false,
      })
      this._queryMyPointBookPageByParam()
    }
  },
  //to 规则页
  toRule() {
    my.navigateTo({ url: '/pages/integralrule/integralrule'})
  },
  //列表
  async _queryMyPointBookPageByParam() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    const result = await queryMyPointBookPageByParam({
      pageNum: this.data.pageNum,
      pageSize: 10,
      isGain:this.data.isGain
    })
    console.log('积分',result)
    my.hideLoading()
    this.setData({pages:result.data.data.pages})
    let list = result.data.data.rows
    this.data.jfArr = this.data.jfArr.concat(list)
    this.setData({jfArr:this.data.jfArr})
    console.log(this.data.jfArr)
  },
  onReachBottom(e) {
    if (this.data.pages>this.data.pageNum) {
      this.setData({
        pageNum: ++this.data.pageNum
      }, () => {
        this._queryMyPointBookPageByParam()
      })
    }else{
      this.setData({showbtline:true})
    }
  },
});
