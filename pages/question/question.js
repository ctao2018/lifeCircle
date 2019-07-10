const app = getApp();
import {getTokenByCode,queryAllValidHotCity,queryAllValidQuestionCategory,addQuestionByUser,
formalBusinessGuide,formalCommonQuestion,getCityInfoByCityCode} from '../../config/api';
import env from '../../config/env';
import parse from 'mini-html-parser2';

Page({
  data: {
    city:'佛山市',
    cityCode:'440600',
    selFlag:false,
    indexType: 0,
    title:'',
    textarea:'',
    hotCity:[],
    typeArr:[],
    categoryNo:'',
    submitF:false,
    tabArr:[
      {
        pic:'../../assets/consulting_icon1.png',
        name:'办事指南'
      },
      {
        pic:'../../assets/consulting_icon2.png',
        name:'常见问题'
      }
    ],
    curIndex:0,
    bsList:[],
    showBX:true,
    wtList:[],
    nodes:[],
    dtArr:[],
    pic_ban:env.pic_url+'zixunA.jpg',
    nocont:'',
    isShow:true,
  },

  onLoad(options) {
    if(options){
      this.setData({
        cityCode:options.cityAdcode,
        city:options.city,
        nocont:options.nocont
      })
    }
    if(this.data.nocont === 'true'){
      this.setData({isShow:false})
    }
    app.getUrl(3,this.data.city,this.data.cityCode)
    let t = new Date().getTime();
    let flagT = app.authIsOrNot(t);
    if (flagT){
      this._queryAllValidHotCity();
      this._queryAllValidQuestionCategory();
      this._formalBusinessGuide();
      this._formalCommonQuestion();
      if(!app.cityName){
        this._getCityInfoByCityCode()
      }else{
        this.setData({city:app.cityName})
      }
    }else{
      this.auth()
    }
  },
  onShow() {
    this.setData({
      submitF:false,
    })
    
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
            this._queryAllValidHotCity();
            this._queryAllValidQuestionCategory();
            this._formalBusinessGuide();
            this._formalCommonQuestion();
            if(!app.cityName){
              this._getCityInfoByCityCode()
            }else{
              this.setData({city:app.cityName})
            }
          }else{
            my.showToast({
              content: '授权失败，请重试！'
            });
          }
        })
      })
  },
  //选择类型
  bindPickerChange(e) {
    this.setData({
      indexType: e.detail.value,
      categoryNo:this.data.typeArr[e.detail.value].categoryNo
    });
  },
  //获取title
  getTit(e) {
    this.setData({
      title: e.detail.value,
    });
    // if(e.detail.value.length>3){
    //   this.setData({selFlag:true})
    // }else{
    //    my.showToast({
    //     content: '标题不能少于4个字!'
    //   });
    //   this.setData({selFlag:false})
    // }
  },
  //点击发布按钮
  fabu(e) {
    this.setData({
      textarea:e.detail.value.textarea,
      title: e.detail.value.inputTit,
    })
    if(this.data.title.length>3){
      if(!this.data.submitF){
        this._addQuestionByUser()
        this.setData({submitF:true})
      }
    }else{
      my.showToast({
        content: '标题不能少于4个字!'
      });
    }
  },
   //热门城市
  async _queryAllValidHotCity() {
    let result = await queryAllValidHotCity()
    // console.log('hotct',result)
    let hot = result.data.data
    this.setData({hotCity:[],})
    for(let i=0;i<hot.length;i++){
      let newL = {}
      newL.city = hot[i].cityName
      newL.adCode = hot[i].cityCode
      this.data.hotCity.push(newL)
    }
    this.setData({hotCity:this.data.hotCity})
  },
  //点击城市选择
  toCitySel() {
    my.chooseCity({
      showLocatedCity: true,
      showHotCities: true,
      hotCities: this.data.hotCity,
      success: (res) => {
        this.setData({
          city:res.city,
          cityCode:res.adCode,
          curIndex:0,
          showBX:true,
          bsList:[],
          wtList:[],
        })
        if(res.adCode === '110100'){
          this.setData({cityCode:110000})
        }else if(res.adCode === '120100'){
          this.setData({cityCode:120000})
        }else if(res.adCode === '310100'){
          this.setData({cityCode:310000})
        }else if(res.adCode === '500100'){
          this.setData({cityCode:500000})
        }
        this._formalBusinessGuide()
        this._formalCommonQuestion()
      },
    });
  },
  //根据cityCode查cityName 
  async _getCityInfoByCityCode() {
    let result = await getCityInfoByCityCode({
      cityCode:this.data.cityCode
    })
    //console.log(result)
    if(result.data.code === 0){
      this.setData({
        city:result.data.data.name
      })
    }
  },
  //问题分类
  async _queryAllValidQuestionCategory() {
    let result = await queryAllValidQuestionCategory()
    let cat = result.data.data
    this.data.typeArr = this.data.typeArr.concat(cat)
    //console.log(this.data.typeArr)
    this.setData({
      typeArr:this.data.typeArr,
      categoryNo:this.data.typeArr[0].categoryNo
      })
    //console.log('Category',this.data.typeArr,this.data.categoryNo)
  },
  //发布
  async _addQuestionByUser() {
    let result = await addQuestionByUser({
    category: this.data.categoryNo,
    cityCode:this.data.cityCode,
    cityName:this.data.city,
    description:this.data.textarea,
    title:this.data.title
  })
    console.log(result)
    if(result.data.code === 0){
      my.alert({
        title: '提交成功',
        content: '提问由专人解答，请您耐心等待。先看看社保资讯吧',
        buttonText: '好',
        success: () => {
          //my.redirectTo({url: '/pages/myquestion/myquestion'})
          my.switchTab({url: '/pages/circle/circle'})
        },
      });
    }else{
      my.showToast({
        content: result.data.message
      });
      this.setData({submitF:false})
    }
  },
  // tab点击切换
  tabClick(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      curIndex:index,
    })
    if(index === 1 ){
      this.setData({
        showBX:false,
      })
      
    }else{
      this.setData({
       showBX:true,
      })
      
    }
  },
  //办事指南列表查询
  async _formalBusinessGuide() {
    let result = await formalBusinessGuide({
      cityCode: this.data.cityCode,
      pageNum: 1,
      pageSize: 3,
    })
    //console.log('list',result)
    if(result.data.code === 0){
      let list = result.data.data.rows
      this.setData({bsList:list})
      if(list.length<1){
        this.setData({
          curIndex:1,
          showBX:false,
        })
      }
    }else{
      console.log(result)
    }
  },
  //办事指南 去详情
  toDetailbs(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.bsList[index].id
    my.navigateTo({ url: '/pages/guideDetail/guideDetail?id='+ id})
  },
  //办事指南 查看更多
  moreBS() {
    my.navigateTo({ url: '/pages/businessGuide/businessGuide?cityAdcode='+this.data.cityCode})
  },
  //常见问题 查看更多
  moreWT() {
    my.navigateTo({ url: '/pages/commonProblem/commonProblem?cityAdcode='+this.data.cityCode})
  },
  //常见问题列表查询
  async _formalCommonQuestion() {
    let result = await formalCommonQuestion({
      cityCode: this.data.cityCode,
      pageNum: 1,
      pageSize: 3,
    })
    //console.log('list',result)
    if(result.data.code === 0){
      let list = result.data.data.rows
      let flist = list.map((obj,index)=>{
        return {
          lists:obj,
          flag:false,
        }
      })
      this.setData({wtList:flist})
      this.changeNode()
      console.log(this.data.wtList)
    }else{
      console.log(result)
    }
  },
  //常见问题显示详情
  showDetail(e) {
    let index=e.currentTarget.dataset['index'];
    let fg = `wtList[`+ index +`].flag`;
    let flaga = this.data.wtList[index].flag;
    this.setData({
      [fg]:!flaga
    })
  },
  changeNode() {
    for(let i =0;i<this.data.wtList.length;i++){
      let html = app.escape2Html(this.data.wtList[i].lists.answer);
      parse(html, (err, nodes) => {
        if (!err) {
          let dt = `dtArr[`+ i +`].latitude`;
          this.setData({
            [dt]: nodes,
          });
        }
      })
    }
  },
  //to 纠错
  tojc(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.wtList[index].lists.id
    my.navigateTo({ url: '/pages/errorCorrection/errorCorrection?type=4&id='+ id})
  },
});
