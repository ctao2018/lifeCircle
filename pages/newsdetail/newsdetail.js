const app = getApp();
import {queryFNewsInfoDeatailById,submitArticleCollect,cancelArticleCollect} from '../../config/api'
import parse from 'mini-html-parser2';
Page({
  data: {
   id:'',
   detail:[],
   nodes:[],
   scF:false,
  },

  onLoad(options) {
    if(options){
      this.setData({
        id:options.id,
      })
    }
    app.getUrl(2,this.data.id)
  },
  onShow() {
    this.setData({
      detail:[],
    });
    this._queryFNewsInfoDeatailById()
  },
  onReady() {
    
  },
  
  //详情
  async _queryFNewsInfoDeatailById() {
    let result = await queryFNewsInfoDeatailById(this.data.id)
    console.log('详情',result)
      
      this.setData({
        detail:result.data.data
      })
      if(result.data.data.collectInfo.isCollect){
        this.setData({scF:true})
      }else{
        this.setData({scF:false})
      }
      this.changeNode()
  },
  //点击收藏
  collectFn() {
    if(this.data.scF){
      this._cancelArticleCollect()
    }else{
       this._submitArticleCollect()
    }
  },
  //收藏
   async _submitArticleCollect() {
    let result = await submitArticleCollect({
      articleId:this.data.detail.id,
      category:this.data.detail.catalogNo,
      largeClass:this.data.detail.collectInfo.largeClass,
      picturesUrl:this.data.detail.pictureUrl,
      title:this.data.detail.title,
    })
    //console.log('收藏',result)
    if(result.data.code === 0){
       my.showToast({
          content: '收藏成功！'
        });
      this.setData({scF:true})
      this._queryFNewsInfoDeatailById()
    }else{
       my.showToast({
          content: result.data.message
        });
    }
  },
  //取消收藏
   async _cancelArticleCollect() {
    let result = await cancelArticleCollect(this.data.detail.collectInfo.collectId)
    //console.log('取消',result)
    if(result.data.code === 0){
       my.showToast({
          content: '取消收藏！'
        });
      this.setData({scF:false})
    }else{
       my.showToast({
          content: result.data.message
        });
    }
  },
  changeNode() {
    let html = this.data.detail.content
    parse(html, (err, nodes) => {
      if (!err) {
        this.setData({
          nodes,
        });
      }
    })
    //console.log(this.data.nodes)
  },
  onShareAppMessage() {
    return {
      title:this.data.detail.title,
      path: '/pages/newsdetail/newsdetail?id='+ this.data.id
    };
  },
});
