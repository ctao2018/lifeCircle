const app = getApp();
import {} from '../../config/api'

Page({
  data: {
    
  },

  onLoad(options) {
    if(options){
      this.setData({
        city:options.city,
        cityAdcode:options.cityAdcode,
      })
    }
  },
  onShow() {
    this.setData({
    })
    app.getUrl(3,this.data.city,this.data.cityAdcode)
    this.setTit()
  },
  onReady() {
    
  },
  //设置title
  setTit() {
    my.setNavigationBar({
      title: '你好',
    });
  },
  handleSubmit() {
    if(this.data.ssCont){
      this.setData({
        title:this.data.ssCont,
        curCity:[],
        othCity:[],
        pageNum:1,
        pages:'',
        showbtline:false,
      })
      this._querySearchQuestionAnswerPage()
    }else{
      this.setData({
        showHot:true,
        curCity:[],
        othCity:[],
      })
    }
  },
  handleFocus() {
    this.setData({showbtn:false})
  },
  handleBlur(e) {
    this.setData({showbtn:true,ssCont:e.detail.value})
    //console.log(this.data.ssCont)
  },
  handleConfirm(e) {
    this.setData({ssCont:e.detail.value})
    this.handleSubmit()
  },
  //to 提问页面
  toQuestion() {
    my.navigateTo({ url: '/pages/question/question'})
  },
  //搜索列表
  async _querySearchQuestionAnswerPage() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    const result = await querySearchQuestionAnswerPage({
      pageNum: this.data.pageNum,
      pageSize: 10,
      category: '',
      title: this.data.title,
      cityCode: this.data.cityAdcode
    })
    //console.log('list',result)
     my.hideLoading()
    if(result.data.code ===0){
      this.setData({
        pages:result.data.data.pages,
        showHot:false,
      })
      let list = result.data.data.currentCityRows
      this.data.curCity = this.data.curCity.concat(list)
      let othCity = result.data.data.otherCityRows
      this.setData({
        curCity:this.data.curCity,
        othCity:othCity,
        })
    }
  },
  onReachBottom(e) {
    if (this.data.pages>this.data.pageNum) {
      this.setData({
        pageNum: ++this.data.pageNum
      }, () => {
        this._querySearchQuestionAnswerPage()
      })
    }else{
      this.setData({showbtline:true})
    }
  },
});
