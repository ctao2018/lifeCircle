const app = getApp();
import {questionAnwserPage,getTokenByCode} from '../../config/api'

Page({
  data: {
    currentTabsIndex:0,
    pageNum:1,
    pages:'',
    ansArr:[],
    isHot:'',
    showbtline:false,
  },

  onLoad() {
    //this._questionAnwserPage()
  },
  onShow() {
    let tok = my.getStorageSync({ key: 'token' })
    if (tok.data){
      this._questionAnwserPage()
    }else{
      this.auth()
    }
    
   this.setData({
     ansArr:[],
     pageNum:1,
     pages:'',
     showbtline:false,
     })
  },
  onReady() {
    
  },
  auth() {
    app.getUserInfo().then(
      auth => {
          let auth_code = auth.auth_code.authCode;
         // console.log('auth_codeauth_code', auth_code)
          getTokenByCode({
            appClient: '',
            code: auth_code,
            identityType: 1,
            mac: '',
            registePlat: 2
          }).then(result =>{
           // console.log('result.data.data',result)
            my.setStorage({
              key: 'token',
              data: result.data.data
            });
            this._questionAnwserPage()
          })
      })
  },
  // tab点击切换
  tabClick(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      currentTabsIndex:index,
      showbtline:false,
    })
    if(index === 1){
      this.setData({pageNum:1,ansArr:[],isHot:'Y'})
      this._questionAnwserPage()
    }else{
      this.setData({pageNum:1,ansArr:[],isHot:''})
      this._questionAnwserPage()
    }
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
  onReachBottom(e) {
    if (this.data.pages>this.data.pageNum) {
      this.setData({
        pageNum: ++this.data.pageNum
      }, () => {
        this._questionAnwserPage()
      })
    }else{
      this.setData({showbtline:true})
    }
  },

  onPullDownRefresh() {
    this.setData({
      pageNum:1,
      ansArr:[],
      showbtline:false,
    })
    this._questionAnwserPage()
    my.stopPullDownRefresh()
  }
  

});
