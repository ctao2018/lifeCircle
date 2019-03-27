const app = getApp();
import {queryAllValidSearchHotWord,querySearchQuestionAnswerPage} from '../../config/api'

Page({
  data: {
    seaVal:'',
    showHot:true,
    hotArr:[],
    curCity:[],
    othCity:[],
    pageNum:1,
    pages:'',
    showbtline:false,
    title:'',
    cityAdcode:'',
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
     seaVal:'',
     showHot:true,
     hotArr:[],
     curCity:[],
     othCity:[],
     pageNum:1,
    pages:'',
    showbtline:false,
    title:'',
   })
   this._queryAllValidSearchHotWord()
  },
  onReady() {
    
  },
  handleSubmit(value) {
    console.log(value)
    if(value){
      this.setData({
        title:value,
        curCity:[],
        othCity:[],
        pageNum:1,
        pages:'',
        showbtline:false,
      })
      this._querySearchQuestionAnswerPage()
    }else{
      this.setData({showHot:true})
    }
  },
  handleClear(value) {
    this.setData({
      value: '',
      seaVal:'',
      showHot:true,
    });
  },
  handleCancel() {
    this.setData({
      showHot:true,
      seaVal:'',
      value: '',
    })
  },
  //to 提问页面
  toQuestion() {
    my.navigateTo({ url: '/pages/question/question'})
  },
  //热门搜索
  async _queryAllValidSearchHotWord() {
    let result = await queryAllValidSearchHotWord()
    //console.log('热门搜索',result)
    if(result.data.code === 0){
      this.setData({hotArr:result.data.data})
    }
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
    console.log('list',result)
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
      // console.log('cur',this.data.curCity)
      // console.log('oth',this.data.othCity)
    }
  },
  //点击热门词条
  tapHot(e) {
    let index=e.currentTarget.dataset['index'];
    let tit = this.data.hotArr[index].title;
    this.setData({
      seaVal:tit,
      title:tit,
      curCity:[],
      othCity:[],
      pageNum:1,
      pages:'',
      showbtline:false,
    })
    this._querySearchQuestionAnswerPage()
  },
  //点击去详情 当前城市
  toDetailCur(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.curCity[index].id
    my.navigateTo({ url: '/pages/circledetail/circledetail?id='+ id})
  },
  //点击去详情 其他城市
  toDetailOth(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.othCity[index].id
    my.navigateTo({ url: '/pages/circledetail/circledetail?id='+ id})
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
