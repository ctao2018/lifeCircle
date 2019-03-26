const app = getApp();
import {queryAllValidSearchHotWord,querySearchQuestionAnswerPage} from '../../config/api'

Page({
  data: {
    seaVal:'',
    showHot:true,
    hotArr:[],
  },

  onLoad() {
    
  },
  onShow() {
   this.setData({
     seaVal:'',
     hotArr:[],
   })
   this._queryAllValidSearchHotWord()
  },
  onReady() {
    
  },
  handleSubmit(value) {
    my.alert({
      content: value,
    });
  },
  //to 提问页面
  toQuestion() {
    my.navigateTo({ url: '/pages/question/question'})
  },
  //热门搜索
  async _queryAllValidSearchHotWord() {
    let result = await queryAllValidSearchHotWord()
    console.log('热门搜索',result)
    if(result.data.code === 0){
      this.setData({hotArr:result.data.data})
    }
  },
});
