const app = getApp();
import {getTokenByCode,formalInsuranceDrugsInfo} from '../../config/api'

Page({
  data: {
   type:[{name: '全部', type: ''}, {name: '西药', type: 'A'}, {name: '中成药', type: 'B'}, {name: '中药饮片', type: 'C'}],
   tapindx:0,
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
      app.globalQuery = null
    }
    app.getUrl(2,this.data.cityCode)
    this.auth()
    
  },
  
  onShow() {
    this.setData({
    });
    my.hideLoading()
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
            this._formalInsuranceDrugsInfo()
          }else{
            my.showToast({
              content: '授权失败，请重试！'
            });
          }
        })
      })
  },
  //列表查询
  async _formalInsuranceDrugsInfo() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    let result = await formalInsuranceDrugsInfo({
      regionNo: this.data.cityCode,
      pageNum: this.data.pageNum,
      pageSize: 10,
      category: this.data.category,
      name: '',
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
  // 选择
  typeClick(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      tapindx:index,
      category:this.data.type[index].type,
      showbtline:false,
      mnList:[],
      pageNum:1,
    })
    this._formalInsuranceDrugsInfo()
  },
  //去详情
  toDetail(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.mnList[index].id
    my.navigateTo({ url: '/pages/drugsDetail/drugsDetail?id='+ id})
  },
  //去搜索
  toSearch() {
    my.navigateTo({ url: '/pages/searchZX/searchZX?id='})
  },
  onReachBottom(e) {
    if (this.data.pages>this.data.pageNum) {
      this.setData({
        pageNum: ++this.data.pageNum
      }, () => {
        this._formalInsuranceDrugsInfo()
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
    this._formalInsuranceDrugsInfo()
    my.stopPullDownRefresh()
  }
});
