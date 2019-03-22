const app = getApp();
import {} from '../../config/api'

Page({
  data: {
    swipeIndex: null,
    right: [{ type: 'delete', text: '删除' }],
    curIndex:0,
    yesFlag:true,
    noFlag:false,
  },

  onLoad() {
    
  },
  onShow() {
   this.setData({
     curIndex:0,
   })
  },
  onReady() {
    
  },
  // tab点击切换
  tabClick(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      curIndex:index,
    })
    if(index === 1){
      this.setData({
        yesFlag:false,
        noFlag:true,
      })
    }else{
      this.setData({
        yesFlag:true,
        noFlag:false,
      })
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
          my.showToast({
            content: '删除成功',
          });
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
      swipeIndex: e.index || null,
    });
  },
});
