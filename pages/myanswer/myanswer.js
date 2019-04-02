const app = getApp();
import {batchSetAnswerIsRead,queryMyAnswerPageByParam,userDeleteByAnswerId} from '../../config/api'

Page({
  data: {
    curIndex:0,
    swipeIndex: null,
    right: [{ type: 'delete', text: '删除' }],
    pages:'',
    pageNum:1,
    isReplay:'Y',
    ansArr:[],
    showbtline:false,
    delId:'',
  },

  onLoad() {
    this._batchSetAnswerIsRead()
  },
  onShow() {
   this.setData({
     curIndex:0,
     pages:'',
    pageNum:1,
    isReplay:'Y',
    ansArr:[],
    showbtline:false,
    delId:'',
   })
   this._queryMyAnswerPageByParam()
  },
  onReady() {
    
  },
  // tab点击切换
  tabClick(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      curIndex:index,
      pages:'',
      pageNum:1,
      ansArr:[],
      showbtline:false,
    })
    if(index===1){
      this.setData({ 
        isReplay:'W',
      })
    }else if(index === 2){
      this.setData({
        isReplay:'N',
      })
    }else {
      this.setData({
        isReplay:'Y',
      })
    }
    this._queryMyAnswerPageByParam()
  },
  //标记为已读
  async _batchSetAnswerIsRead() {
    const result = await batchSetAnswerIsRead({
      type:0,
    })
    console.log('已读',result)
  },
  //to 详情
  toDetail(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.ansArr[index].id
    my.navigateTo({ url: '/pages/circledetail/circledetail?id='+ id})
  },
  //列表
  async _queryMyAnswerPageByParam() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    const result = await queryMyAnswerPageByParam({
      pageNum: this.data.pageNum,
      pageSize: 10,
      answerState:this.data.isReplay
    })
    console.log('list',result)
    my.hideLoading()
    this.setData({pages:result.data.data.pages})
    let list = result.data.data.rows
    this.data.ansArr = this.data.ansArr.concat(list)
    this.setData({ansArr:this.data.ansArr})
    console.log(this.data.ansArr)
  },
  //删除
  async _userDeleteByAnswerId() {
    const result = await userDeleteByAnswerId(this.data.delId)
    //console.log('删除',result)
    if(result.data.code=== 0){
      my.showToast({
        content: '删除成功',
        success: () => {
          this.setData({
            pageNum:1,
            ansArr:[],
            showbtline:false,
          })
          this._queryMyAnswerPageByParam()
        },
      });
    }else{
      my.showToast({
        content: result.data.message,
      });
    }
  },
  onRightItemClick(e) {
    my.confirm({
      title: '提示',
      content: '确定要删除吗？',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {
          let indx = this.data.swipeIndex
          let id = this.data.ansArr[indx].answerId
          this.setData({delId:id})
          this._userDeleteByAnswerId()
          e.done();
        } else {
          
        }
      },
    });
  },
  onItemClick(e) {
    
  },
  onSwipeStart(e) {
    this.setData({
      swipeIndex: e.index,
    });
  },
  onReachBottom(e) {
    if (this.data.pages>this.data.pageNum) {
      this.setData({
        pageNum: ++this.data.pageNum
      }, () => {
        this._queryMyAnswerPageByParam()
      })
    }else{
      this.setData({showbtline:true})
    }
  },
});
