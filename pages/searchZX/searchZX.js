const app = getApp();
import {formalInsuranceDrugsInfo, formalFixHospitals, formalTransactInstitution, formalBusinessGuide, formalFixDrugstore, formalCommonQuestion} from '../../config/api'

Page({
  data: {
    cityCode:'440600',
    pageType:'',
    title:'',
    ssCont:'',
    ssList:[],
    ssFlag:false,
    showNodata:false,
    serMsg:'',
    jwflag:0,
    lng:'',
    lat:'',
    ypList:[],
    yyList:[],
    yygrade:[],
  },

  onLoad(options) {
    console.log(options)
    // if(options){
    //   this.setData({
    //     pageType:options.type,
    //     cityCode:options.cityAdcode,
    //   })
    // }
    this.setData({pageType:'hospital'})
    if(this.data.pageType === 'drugs'){
      this.getHis('drugsKey')
      this.setData({
        title:'医保药品目录'
      })
    }else if(this.data.pageType === 'hospital') {
      this.getHis('hospitalkey')
      this.setData({
        title:'定点医院'
      })
    }
  },
  onShow() {
    if(app.coordinate){
      this.setData({
        jwflag:1,
        lng:app.coordinate.lng,
        lat:app.coordinate.lat,
      })
    }else{
      this.setData({
        jwflag:0
      })
    }
    app.getUrl(3,this.data.city,this.data.cityCode);
    this.setTit();
  },
  onReady() {
    
  },
  //设置title
  setTit() {
    my.setNavigationBar({
      title: this.data.title,
    });
  },
  //获取缓存历史
  getHis(key) {
    let res = my.getStorageSync({ key: key});
    let list = res.data ? JSON.parse(res.data) : [];
    this.setData({ssList:list})
    console.log(this.data.ssList)
  },
  //存储
  setHis(key,data) {
     my.setStorageSync({
      key: key,
      data: JSON.stringify(data),
    });
  },
  //删除历史
  removeHis(key) {
    let that = this
    my.removeStorage({
      key: key,
      success: function(){
        that.getHis(key)
      }
    });
  },
  //点击清除历史
  removeBtn() {
    if(this.data.pageType === 'drugs'){
      this.removeHis('drugsKey')
    }else if(this.data.pageType === 'hospital') {
      this.removeHis('hospitalkey')
    }
  },
  //搜索值处理
  searchVal (val,arr) {
    val = val.trim() // 清除空格
    if (arr.length > 0) { // 有数据的话 判断
      if (arr.indexOf(val) !== -1) { // 有相同的，先删除 再添加 
        arr.splice(arr.indexOf(val), 1)
        arr.unshift(val)
      } else { // 没有相同的 添加
        arr.unshift(val)
      }
    } else { // 没有数据 添加
      arr.unshift(val)
    }
    if (arr.length > 6) { // 保留六个值
      arr.pop()
    }
    return arr
  },
  handleSubmit() {
    if(!this.data.ssCont){
      my.showToast({
        content: '请输入需要搜索的内容！'
      });
      return false;
    }
    let sslist = this.searchVal(this.data.ssCont,this.data.ssList)
    this.setData({ssList:sslist})
    console.log(this.data.ssList,this.data.pageType)
    this.setData({
      pageNum:1,
      pages:'',
      showbtline:false,
      ssFlag:true,
      serMsg:this.data.ssCont,
      ypList:[],
      yyList:[],
    })
    if(this.data.pageType === 'drugs'){
      this.setHis('drugsKey',sslist)
      this._formalInsuranceDrugsInfo()
    }else if(this.data.pageType === 'hospital') {
      this.setHis('hospitalkey',sslist)
      this._formalFixHospitals()
    }
    this.setData({
      ssCont:'',
    })
  },
  handleBlur(e) {
    this.setData({ssCont:e.detail.value})
    //console.log(this.data.ssCont)
  },
  handleConfirm(e) {
    this.setData({ssCont:e.detail.value})
    this.handleSubmit()
  },
  //药品列表
  async _formalInsuranceDrugsInfo() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    let result = await formalInsuranceDrugsInfo({
      regionNo: this.data.cityCode,
      pageNum: this.data.pageNum,
      pageSize: 10,
      category: '',
      name: this.data.serMsg,
    })
    my.hideLoading()
    //console.log('list',result)
    if(result.data.code === 0){
      this.setData({pages:result.data.data.pages})
      let list = result.data.data.rows
      this.data.ypList = this.data.ypList.concat(list)
      this.setData({
        ypList:this.data.ypList,
      })
      if(this.data.ypList.length<1){
        this.setData({showNodata:true})
      }
      console.log(this.data.ypList)
    }else{
      console.log(result)
    }
  },
  //医院 列表
  async _formalFixHospitals() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    let result = await formalFixHospitals({
      cityCode: this.data.cityCode,
      pageNum: this.data.pageNum,
      pageSize: 10,
      name: this.data.serMsg,
      longitude: this.data.lng,
      latitude: this.data.lat,
      flag: this.data.jwflag
    })
    my.hideLoading()
    //console.log('医院',result)
    if(result.data.code === 0){
      this.setData({pages:result.data.data.pages})
      let list = result.data.data.rows
      this.data.yyList = this.data.yyList.concat(list)
      this.setData({
        yyList:this.data.yyList,
      })
      console.log(this.data.yyList)
      if(this.data.yyList.length<1){
        this.setData({showNodata:true})
      }
      let gradeArr=[]
      for (let i = 0;i<this.data.yyList.length; i++) {
        gradeArr.push(this.data.yyList[i].grade.substring(0, 1))
      }
      this.setData({yygrade:gradeArr})
    }else{
      console.log(result)
    }
  },
  //历史列表 点击
  selSearch(e) {
    let index=e.currentTarget.dataset['index'];
    let name = this.data.ssList[index];
    this.setData({
        serMsg:name,
        pageNum:1,
        pages:'',
        showbtline:false,
        ssFlag:true,
        ypList:[],
        yyList:[],
      })
    if(this.data.pageType === 'drugs'){
      this._formalInsuranceDrugsInfo()
    }else if(this.data.pageType === 'hospital') {
      this._formalFixHospitals()
    }
  },
  //to 详情页面
  toDetail(e) {
    let index=e.currentTarget.dataset['index'];
    if(this.data.pageType === 'drugs'){
      let id = this.data.ypList[index].id;
      my.navigateTo({ url: '/pages/drugsDetail/drugsDetail?id='+ id})
    }else if(this.data.pageType === 'hospital') {
      let id = this.data.yyList[index].id
      my.navigateTo({ url: '/pages/hospitalDetail/hospitalDetail?id='+ id})
    }
    
  },
  onReachBottom(e) {
    if (this.data.pages>this.data.pageNum) {
      this.setData({
        pageNum: ++this.data.pageNum
      }, () => {
        if(this.data.pageType === 'drugs'){
          this._formalInsuranceDrugsInfo()
        }else if(this.data.pageType === 'hospital') {
          this._formalFixHospitals()
        }
      
      })
    }else{
      this.setData({showbtline:true})
    }
  },
});
