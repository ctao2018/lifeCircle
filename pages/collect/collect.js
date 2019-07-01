const app = getApp();
import {articleCollect,cancelArticleCollect} from '../../config/api'

Page({
  data: {
    pageNum:1,
    pages:'',
    newsArr:[],
    showbtline:false,
  },

  onLoad() {
    //this._articleCollect()
  },
  onShow() {
   this.setData({
      pageNum:1,
      pages:'',
      newsArr:[],
      showbtline:false,
   })
   this._articleCollect()
  },
  onReady() {
    
  },
  //收藏列表
  async _articleCollect() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    const result = await articleCollect({
      pageNum: this.data.pageNum,
      pageSize: 10,
      largeClass: 'formal_news_info',
    })
    //console.log('sc',result)
    my.hideLoading()
    this.setData({pages:result.data.data.pages})
    let list = result.data.data.rows
    let newList = []
    for(let i =0;i<list.length;i++){
      list[i].addTime= list[i].addTime.substring(0, 10);
      if(list[i].picturesUrl){
        let imgArr = list[i].picturesUrl.split('|')
        let b = {imgUrl:imgArr,lists:list[i]}
        newList.push(b)
      }else{
        let b = {lists:list[i]}
        newList.push(b)
      }
    }
    let yArr = this.data.newsArr
    yArr = yArr.concat(newList)
    this.setData({newsArr:yArr})
    console.log('newsArr',this.data.newsArr)
  },
  //点击删除
  delCollect(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.newsArr[index].lists.id;
    my.confirm({
      content: '确认删除这条收藏吗？',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          this._cancelArticleCollect(id)
        }
      },
    });
  },
  //取消收藏
   async _cancelArticleCollect(id) {
    let result = await cancelArticleCollect(id)
    //console.log('取消',result)
    if(result.data.code === 0){
      this.setData({
        pageNum:1,
        pages:'',
        newsArr:[],
        showbtline:false,
      })
      this._articleCollect()
    }else{
       my.showToast({
          content: result.data.message
        });
    }
  },
  //点击去详情
  toNewsDetail(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.newsArr[index].lists.articleId;
    my.navigateTo({ url: '/pages/newsdetail/newsdetail?id='+ id})
  },
  onReachBottom(e) {
    if (this.data.pages>this.data.pageNum) {
        this.setData({
          pageNum: ++this.data.pageNum
        }, () => {
          this._articleCollect()
        })
      }else{
        this.setData({showbtline:true})
      }
  },
  onPullDownRefresh() {
    this.setData({
      pageNum:1,
      pages:'',
      newsArr:[],
      showbtline:false,
    })
    this._articleCollect()
    my.stopPullDownRefresh()
  },
});
