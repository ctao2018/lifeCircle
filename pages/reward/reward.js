const app = getApp();
import {queryAllValidQuestionCategory,queryOfferQuestionPage,
queryAllValidHotCity} from '../../config/api'

Page({
  data: {
    city:'佛山市',
    cityAdcode:'440600',
    showTy: false,
    showTt: false,
    typeArr:[{name:'全部',id:''}],
    tyIndex:0,
    nowTy:'全部',
    catId:'',
    timeArr:['不限','最新','一周期','一个月前'],
    ttIndex:0,
    nowTt:'不限',
    timePart:'',
    pageNum:1,
    pages:'',
    curList:[],
    othList:[],
    showbtline:false,
    hotCity:[],
  },

  onLoad(options) {
    //console.log(options);
    if(options){
      this.setData({
        city:options.city,
        cityAdcode:options.cityAdcode,
      })
    }
    
    //this.getLocation()
  },
  onShow() {
    this.setData({
      catId:'',
      timePart:'',
      pageNum:1,
      pages:'',
      curList:[],
      othList:[],
      showbtline:false,
      hotCity:[],
      typeArr:[{name:'全部',id:''}],
    });
    this._queryOfferQuestionPage()
    this._queryAllValidQuestionCategory()
    this._queryAllValidHotCity()
  },
  onReady() {
    
  },
  //获取当前地理位置
  getLocation() {
    var that = this;
    my.getLocation({
      type: 1,
      success(res) {
        //console.log(res)
        that.setData({
          city: res.city,
          cityAdcode: res.cityAdcode
        })
        that._queryOfferQuestionPage()
      },
      fail() {
        my.alert({ title: '定位失败' });
      },
    })
  },
  //点击显示类型
  showTy() {
    if(this.data.showTy){
      this.setData({showTy:false})
    }else{
      this.setData({showTy:true})
    }
    this.setData({showTt:false})
  },
  //点击关闭 选择类型
  closeTy() {
    this.setData({showTy:false})
  },
  //点击类型
  selTy(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      tyIndex:index,
      nowTy:this.data.typeArr[index].name,
      catId:this.data.typeArr[index].categoryNo,
      showTy:false,
      pageNum:1,
      pages:'',
      curList:[],
      othList:[],
      showbtline:false,
    })
    this._queryOfferQuestionPage()
  },
  //点击显示时间范围
  showTt() {
    if(this.data.showTt){
      this.setData({showTt:false})
    }else{
      this.setData({showTt:true})
    }
    this.setData({showTy:false})
  },
  //点击关闭 选择时间
  closeTt() {
    this.setData({showTt:false})
  },
  //点击时间
  selTt(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      ttIndex:index,
      nowTt:this.data.timeArr[index],
      timePart:index,
      showTt:false,
      pageNum:1,
      pages:'',
      curList:[],
      othList:[],
      showbtline:false,
    })
    this._queryOfferQuestionPage()
  },
  //问题分类
  async _queryAllValidQuestionCategory() {
    let result = await queryAllValidQuestionCategory()
    let cat = result.data.data
    this.data.typeArr = this.data.typeArr.concat(cat)
    this.setData({typeArr:this.data.typeArr})
    //console.log('Category',this.data.typeArr)
  },
  //悬赏问答列表
  async _queryOfferQuestionPage() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    const result = await queryOfferQuestionPage({
      pageNum: this.data.pageNum,
      pageSize: 30,
      category: this.data.catId,
      timePart: this.data.timePart,
      cityCode: this.data.cityAdcode
    })
    console.log('问答',result)
    my.hideLoading()
    this.setData({pages:result.data.data.pages})
    let list = result.data.data.currentCityRows
    this.data.curList = this.data.curList.concat(list)
    let othlist = result.data.data.otherCityRows
    this.setData({
      curList:this.data.curList,
      othList:othlist,
      })
    // console.log('cur',this.data.curList)
    // console.log('oth',this.data.othList)
  },
  //热门城市
  async _queryAllValidHotCity() {
    let result = await queryAllValidHotCity()
    // console.log('hotct',result)
    let hot = result.data.data
    for(let i=0;i<hot.length;i++){
      let newL = {}
      newL.city = hot[i].cityName
      newL.adCode = hot[i].cityCode
      this.data.hotCity.push(newL)
    }
    this.setData({hotCity:this.data.hotCity})
  },
  //点击城市选择
  toCitySel() {
    my.chooseCity({
      showLocatedCity: true,
      showHotCities: true,
      hotCities: this.data.hotCity,
      success: (res) => {
        this.setData({
          city:res.city,
          cityAdcode:res.adCode,
          pageNum:1,
          pages:'',
          curList:[],
          othList:[],
          showbtline:false,
        })
        this._queryOfferQuestionPage()
      },
    });
  },
  //点击去详情 当前城市
  toDetailCur(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.curList[index].id
    if(this.data.curList[index].isCurrentUserReplayed === 0){
      my.navigateTo({ url: '/pages/problemdetail/problemdetail?id='+ id})
    }
  },
  //点击去详情 其他城市
  toDetailOth(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.othList[index].id
    if(this.data.othList[index].isCurrentUserReplayed === 0){
      my.navigateTo({ url: '/pages/problemdetail/problemdetail?id='+ id})
    }
  },
  //去回答 当前城市
  toAnswerCur(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.curList[index].id
    my.navigateTo({ url: '/pages/answer/answer?id='+ id})
  },
  //去回答 其他城市
  toAnswerOth(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.othList[index].id
    my.navigateTo({ url: '/pages/answer/answer?id='+ id})
  },
  onReachBottom(e) {
    if (this.data.pages>this.data.pageNum) {
      this.setData({
        pageNum: ++this.data.pageNum
      }, () => {
        this._queryOfferQuestionPage()
      })
    }else{
      this.setData({showbtline:true})
    }
  },
   onPullDownRefresh() {
    this.setData({pageNum:1,
      curList:[],
      othList:[],
      showbtline:false,
    })
    this._queryOfferQuestionPage()
    my.stopPullDownRefresh()
  }
});
