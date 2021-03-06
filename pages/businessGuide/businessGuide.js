const app = getApp();
import {getTokenByCode,formalBusinessGuideca,formalBusinessGuide} from '../../config/api'

Page({
  data: {
   tabs:[],
   showBx:false,
   selindx:0,
   showbtline:false,
   cityCode:'440600',
   mnList:[],
   pages:'',
   pageNum:1,
   category:'',
  },

  onLoad(options) {
    if(options){
      this.setData({
        cityCode:options.cityAdcode,
      })
    }
    if(app.globalQuery){
      this.setData({
        cityCode:app.globalQuery.cityAdcode,
      })
      app.cityAdcode = app.globalQuery.cityAdcode;
      app.globalQuery = null;
    }
    app.getUrl(4,this.data.cityCode);
    let t = new Date().getTime();
    let flagT = app.authIsOrNot(t);
    if (flagT){
      this._formalBusinessGuideca()
      this._formalBusinessGuide()
    }else{
      this.auth()
    }
  },
  
  onShow() {
    this.setData({
    });
    my.hideLoading();
  },
  onReady() {
    
  },
  //认证
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
            this._formalBusinessGuideca()
            this._formalBusinessGuide()
          }else{
            my.showToast({
              content: '授权失败，请重试！'
            });
          }
        })
      })
  },
  //获取分类信息
  async _formalBusinessGuideca() {
    let result = await formalBusinessGuideca(this.data.cityCode)
    //console.log('分类',result)
    if(result.data.code === 0){
      let ylist = [{lists: {id:''}, title: '全部'}]
      let list = result.data.data
      let newList = list.map((obj,index) => {
        return {
          lists:obj,
          title:obj.categoryName
        }
      })
      ylist = ylist.concat(newList)
      this.setData({
        tabs:ylist
      })
      console.log('ylist',this.data.tabs)
    }else{
      console.log(result)
    }
  },
  //列表查询
  async _formalBusinessGuide() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    let result = await formalBusinessGuide({
      cityCode: this.data.cityCode,
      pageNum: this.data.pageNum,
      pageSize: 10,
      area: this.data.area,
      category:this.data.category,
    })
    my.hideLoading()
    //console.log('list',result)
    if(result.data.code === 0){
      this.setData({pages:result.data.data.pages})
      let list = result.data.data.rows
      this.data.mnList = this.data.mnList.concat(list)
      this.setData({mnList:this.data.mnList})
      console.log(this.data.mnList)
    }else{
      console.log(result)
    }
  },
  //tab点击
  handleTabClick({ index }) {
    this.setData({
      activeTab: index,
      selindx:index,
      category:this.data.tabs[index].lists.id,
      mnList:[],
      pageNum:1,
      showbtline:false,
    });
    this._formalBusinessGuide()
  },
  //tab 更多点击
  handlePlusClick() {
    this.setData({showBx:!this.data.showBx})
  },
  //关闭弹框
  closeBx() {
     this.setData({showBx:false})
  },
  //弹框 点击选择
  selTab(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      selindx:index,
      activeTab:index,
      showbtline:false,
      showBx:false,
      category:this.data.tabs[index].lists.id,
      mnList:[],
      pageNum:1,
      showbtline:false,
    })
    this._formalBusinessGuide()
  },
  //去详情
  toDetail(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.mnList[index].id
    my.navigateTo({ url: '/pages/guideDetail/guideDetail?id='+ id})
  },
  //去搜索
  toSearch() {
    my.navigateTo({ url: '/pages/searchZX/searchZX?pageType=businessGuide&cityCode=' + this.data.cityCode})
  },
  onReachBottom(e) {
    if (this.data.pages>this.data.pageNum) {
      this.setData({
        pageNum: ++this.data.pageNum
      }, () => {
        this._formalBusinessGuide()
      })
    }else{
      this.setData({showbtline:true})
    }
  },
  onPullDownRefresh() {
    this.setData({
      mnList:[],
      pageNum:1,
      showbtline:false,
    })
    this._formalBusinessGuide()
    my.stopPullDownRefresh()
  },
  onShareAppMessage() {
    return {
      path: '/pages/businessGuide/businessGuide?cityAdcode='+this.data.cityCode
    };
  },
});
