const app = getApp();
import {queryQuestionAnwserById,praiseQuestionAnwser} from '../../config/api'

Page({
  data: {
   zanY:false,
   showZK:true,
   id:'',
   detail:[],
   picArr:[],
   clList:[],
    nodes: [{
      name: 'text',
    }],
   myrich:[],
   praiseNumber:'',
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
      detail:[],
      zanY:false,
      showZK:true,
      picArr:[],
      clList:[],
      praiseNumber:'',
      zanFlag:true,
    });
    this._queryQuestionAnwserById()
  },
  onReady() {
    
  },
  //点赞
  zanClick() {
    if(this.data.zanFlag){
      this._praiseQuestionAnwser()
    }
  },
  //点击展开
  showZKtxt() {
    this.setData({showZK:true,})
  },
  //点赞
  async _praiseQuestionAnwser() {
    let result = await praiseQuestionAnwser({
      questionId:this.data.id,
      type: 1,
    })
    //console.log('点赞',result)
    if(result.data.code ===0){
      this.setData({
        zanY:true,
        praiseNumber:result.data.data.praiseNumber,
        zanFlag:false,
      })
    }
  },
  //详情
  async _queryQuestionAnwserById() {
    let result = await queryQuestionAnwserById(this.data.id)
    console.log('详情',result)
    let detArr = result.data.data
    if(result.data.code ===0){
      this.setData({detail:detArr})
      let pic= ''
      let cl = ''
      if(detArr.picturesUrl){
        pic = detArr.picturesUrl.split('|')
      }
      if(detArr.detailedList){
        cl = detArr.detailedList.split(',')
      }
      if(detArr.description.length>100){
        this.setData({showZK:false,})
      }else{
        this.setData({showZK:true,})
      }
      this.setData({
        picArr:pic,
        clList:cl,
        praiseNumber:detArr.praiseNumber,
      })
    }
  },
  //to 个人主页
  toPersonal() {
    let id = this.data.detail.accountId
    my.reLaunch({ url: '/pages/personalpage/personalpage?id=' +id})
  },
});
