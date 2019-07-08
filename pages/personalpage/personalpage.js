const app = getApp();
import {queryVisitAnswerDynamicByParam,queryVisitUserInfoById,queryVisitQuestionDynamicByParam} from '../../config/api';
import env from '../../config/env';

Page({
  data: {
    currentTabsIndex:0,
    pageNum:1,
    pagesAns:'',
    pagesQus:'',
    ansArr:[],
    queArr:[],
    showbtline:false,
    showAnswer:true,
    showQuestion:false,
    id:'',
    userMsg:[],
    pic_bg:env.pic_url+'personal_bg.png',
  },

  onLoad(options) {
    if(options){
      this.setData({
       id:options.id,
      })
    }
  },
  onShow() {
   this.setData({
     ansArr:[],
     queArr:[],
     pageNum:1,
     pagesAns:'',
     pagesQus:'',
     showbtline:false,
     userMsg:[],
    })
    app.getUrl(2,this.data.id)
    if(this.data.showAnswer){
      this._queryVisitAnswerDynamicByParam()
    }else{
      this._queryVisitQuestionDynamicByParam()
    }
    this._queryVisitUserInfoById()
  },
  onReady() {
    
  },
  // tab点击切换
  tabClick(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      currentTabsIndex:index,
      showbtline:false,
    })
    if(index === 1){
      this.setData({
        showAnswer:false,
        showQuestion:true,
        pageNum:1,
        ansArr:[],
        queArr:[],
        pagesAns:'',
        pagesQus:'',
        })
      this._queryVisitQuestionDynamicByParam()
    }else{
      this.setData({
        showAnswer:true,
        showQuestion:false,
        pageNum:1,
        ansArr:[],
        queArr:[],
        pagesAns:'',
        pagesQus:'',
      })
     this._queryVisitAnswerDynamicByParam()
    }
  },
  //点击编辑
  toEditFn() {
    my.navigateTo({ url: '/pages/personalinfo/personalinfo'})
  },
  //获取个人信息
  async _queryVisitUserInfoById() {
    let result = await queryVisitUserInfoById(this.data.id)
    //console.log('msg',result)
    if(result.data.code === 0){
      this.setData({userMsg:result.data.data,})
    }else{
      console.log(result)
    }
  },
  //回答列表
  async _queryVisitAnswerDynamicByParam() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    const result = await queryVisitAnswerDynamicByParam({
      pageNum: this.data.pageNum,
      pageSize: 10,
      accountId: this.data.id,
      subAnwserLength: 55
    })
    console.log('回答',result)
    my.hideLoading()
    this.setData({pagesAns:result.data.data.pages})
    let list = result.data.data.rows
    let newList = []
    for(let i =0;i<list.length;i++){
      if(list[i].picturesUrl){
        let imgArr = list[i].picturesUrl.split('|')
        let b = {imgUrl:imgArr,lists:list[i]}
        newList.push(b)
      }else{
        let b = {lists:list[i]}
        newList.push(b)
      }
    }
    this.data.ansArr = this.data.ansArr.concat(newList)
    this.setData({ansArr:this.data.ansArr})
    console.log(this.data.ansArr)
  },
  //提问列表
  async _queryVisitQuestionDynamicByParam() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    const result = await queryVisitQuestionDynamicByParam({
      pageNum: this.data.pageNum,
      pageSize: 10,
      accountId: this.data.id,
      subAnwserLength: 55
    })
    console.log('提问',result)
    my.hideLoading()
    this.setData({pagesQus:result.data.data.pages})
    let list = result.data.data.rows
    this.data.queArr = this.data.queArr.concat(list)
    this.setData({queArr:this.data.queArr})
    console.log(this.data.queArr)
  },
  //回答 跳转至详情
  toDetailFn(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.ansArr[index].lists.id
    my.navigateTo({ url: '/pages/circledetail/circledetail?id='+ id})
  },
  //提问 跳转至详情
  toDetailQ(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.queArr[index].id
    my.navigateTo({ url: '/pages/circledetail/circledetail?id='+ id})
  },
  //去回答
  toAnswerCur(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.queArr[index].id
    my.navigateTo({ url: '/pages/answer/answer?id='+ id})
  },
  onReachBottom(e) {
    if(this.data.showAnswer){
      
      if (this.data.pagesAns>this.data.pageNum) {
      this.setData({
        pageNum: ++this.data.pageNum
        }, () => {
          this._queryVisitAnswerDynamicByParam()
        })
      }else{
        this.setData({showbtline:true})
      }
    }else{
      if (this.data.pagesQus>this.data.pageNum) {
      this.setData({
        pageNum: ++this.data.pageNum
        }, () => {
          this._queryVisitQuestionDynamicByParam()
        })
      }else{
        this.setData({showbtline:true})
      }
    }
    
  },

});
