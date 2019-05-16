const app = getApp();
import {questionAnwserPage,getTokenByCode,queryNewsChildrenCatalogTreeByParam,queryFNewsInfoPage} from '../../config/api'

Page({
  data: {
    currentTabsIndex:0,
    pageNum:1,
    pages:'',
    ansArr:[],
    isHot:'',
    showbtline:false,
    newstapindx:0,
    // typeArr:[{name:'问答',catalogNo:'',children:[]}], //0515改版
    typeArr:[],
    typeNews:[],
    showtyNews:false,
    catalogNo:'hot',
    chFlag:false,
    newsArr:[],
  },

  onLoad() {
    if (app.auth_info){
      this._questionAnwserPage()
    }else{
      this.auth()
    }
    this._queryNewsChildrenCatalogTreeByParam()
    this._queryFNewsInfoPage()
  },
  onShow() {
   this.setData({
    //  ansArr:[],
    //  pageNum:1,
    //  pages:'',
    //  showbtline:false,
     })
     app.getUrl(1)
     //let tok = my.getStorageSync({ key: 'token' })
  },
  onReady() {
    
  },
  //栏目列表
  async _queryNewsChildrenCatalogTreeByParam() {
    let result = await queryNewsChildrenCatalogTreeByParam({
      siteNo:'news'
    })
    //console.log('queryNewsChildrenCatalogTreeByParam',result)
    let list = result.data.data
    this.data.typeArr = this.data.typeArr.concat(list)
    this.setData({
      typeArr:this.data.typeArr,
    })
    for(let i =0;i<this.data.typeArr.length;i++){
      if(this.data.typeArr[i].children.length>0){
        this.setData({typeNews:this.data.typeArr[i].children})
      }
    }
  },
  // tab点击切换
  tabClick(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      currentTabsIndex:index,
      showbtline:false,
    })
    if(this.data.typeArr[index].children.length>0){
      this.setData({
        typeNews:this.data.typeArr[index].children,
        showtyNews:true,
        catalogNo:this.data.typeArr[index].children[0].catalogNo,
        newstapindx:0,
        chFlag:true,
        })
    }else{
      this.setData({
        typeNews:[],
        showtyNews:false,
        catalogNo:this.data.typeArr[index].catalogNo,
        chFlag:false,
        })
    }
    this.setData({
      pageNum:1,
      ansArr:[],
      pagesNews:'',
      pages:'',
      newsArr:[],
    })
    this._queryFNewsInfoPage()
    // if(index === 1 || index === 2){ //0515改版
    //   if(this.data.typeArr[index].children.length>0){
    //     this.setData({
    //       typeNews:this.data.typeArr[index].children,
    //       showtyNews:true,
    //       catalogNo:this.data.typeArr[index].children[0].catalogNo,
    //       newstapindx:0,
    //       })
    //   }else{
    //     this.setData({
    //       typeNews:[],
    //       showtyNews:false,
    //       catalogNo:this.data.typeArr[index].catalogNo,
    //       })
    //   }
    //   this.setData({
    //     pageNum:1,
    //     ansArr:[],
    //     pagesNews:'',
    //     pages:'',
    //     newsArr:[],
    //   })
    //   this._queryFNewsInfoPage()
    // }else{
    //   this.setData({
    //     pageNum:1,
    //     ansArr:[],
    //     isHot:'',
    //     showtyNews:false,
    //     newsArr:[],
    //   })
    //   this._questionAnwserPage()
    // }
  },
  //新闻二级菜单 点击
  newsClick(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      newstapindx:index,
      showbtline:false,
      catalogNo:this.data.typeNews[index].catalogNo,
      newsArr:[],
      pagesNews:'',
      pageNum:1,
    })
    this._queryFNewsInfoPage()
  },
  //新闻政策列表
  async _queryFNewsInfoPage() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    const result = await queryFNewsInfoPage({
      pageNum: this.data.pageNum,
      pageSize: 10,
      catalogNo: this.data.catalogNo,
    })
    //console.log('news',result)
    my.hideLoading()
    this.setData({pagesNews:result.data.data.pages})
    let list = result.data.data.rows
    this.data.newsArr = this.data.newsArr.concat(list)
    this.setData({newsArr:this.data.newsArr})
    //console.log('newsArr',this.data.newsArr)
  },
  //新闻 至详情
  toNewsDetail(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.newsArr[index].id
    my.navigateTo({ url: '/pages/newsdetail/newsdetail?id='+ id})
  },
  auth() {
    app.getUserInfo().then(
      auth => {
        let auth_code = auth.auth_code.authCode;
        getTokenByCode({
          appClient: '',
          code: auth_code,
          identityType: 1,
          mac: '',
          registePlat: 2
        }).then(result =>{
          if(result.data.code===0){
            my.setStorage({
              key: 'token',
              data: result.data.data
            });
            this._questionAnwserPage()
          }else{
            my.showToast({
              content: '授权失败，请重试！'
            });
          }
        })
      })
  },
  //问答热门列表
  async _questionAnwserPage() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    const result = await questionAnwserPage({
      pageNum: this.data.pageNum,
      pageSize: 10,
      isHot: this.data.isHot,
      subAnwserLength: 55
    })
    //console.log('问答',result)
    my.hideLoading()
    this.setData({pages:result.data.data.pages})
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
  //跳转至详情
  toDetailFn(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.ansArr[index].lists.id
    my.navigateTo({ url: '/pages/circledetail/circledetail?id='+ id})
  },
  //to 个人主页
  toPersonal(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.ansArr[index].lists.accountId
    my.navigateTo({ url: '/pages/personalpage/personalpage?id=' +id})
  },
  onReachBottom(e) {
    if(this.data.currentTabsIndex<1){
      if (this.data.pages>this.data.pageNum) {
        this.setData({
          pageNum: ++this.data.pageNum
        }, () => {
          this._questionAnwserPage()
        })
      }else{
        this.setData({showbtline:true})
      }
    }else{
      if (this.data.pagesNews>this.data.pageNum) {
        this.setData({
          pageNum: ++this.data.pageNum
        }, () => {
          this._queryFNewsInfoPage()
        })
      }else{
        this.setData({showbtline:true})
      }
    }
  },

  onPullDownRefresh() {
    this.setData({
      pageNum:1,
      ansArr:[],
      newsArr:[],
      showbtline:false,
    })
    this._questionAnwserPage()
    this._queryFNewsInfoPage()
    my.stopPullDownRefresh()
  }
  

});
