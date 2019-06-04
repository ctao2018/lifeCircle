import fetchData from './fetch'


const api = {
  getTokenByCode,
  getCategory,
  getMenu,
  queryOpenCityValidModuleInfoByParam,
  queryAllHotspotCarousel,
  queryQuestionAnwserPage,
  questionAnwserPage,
  queryAllValidQuestionCategory,
  queryOfferQuestionPage,
  queryAllValidHotCity,
  addQuestionByUser,
  queryOfferQuestionById,
  queryAllValidMaterials,
  uploadPic,
  addAnswerByUser,
  queryQuestionAnwserById,
  praiseQuestionAnwser,
  queryMyAcctUserInfoAndPoint,
  queryVisitUserInfoById,
  queryVisitAnswerDynamicByParam,
  queryVisitQuestionDynamicByParam,
  userUpdateUserInfo,
  queryUnreadQuestionAndAnswerNum,
  queryMyPointBookPageByParam,
  batchSetQuestionIsRead,
  queryMyQuestionPageByParam,
  qusUserDeleteById,
  batchSetAnswerIsRead,
  queryMyAnswerPageByParam,
  userDeleteByAnswerId,
  queryAllValidSearchHotWord,
  querySearchQuestionAnswerPage,
  queryNewsChildrenCatalogTreeByParam,
  queryFNewsInfoPage,
  queryFNewsInfoDeatailById,
  queryChildAreaByParentId,
  queryListByUserId,
  addressSave,
  addressDelete,
  addressDetail,
  goodspage,
  goodsDetail,
  orderSubmit,
  alipayTradeCreate,
  payCallBack,
  orderPage,
  orderDetail,
  confirmOrder,
  getAreaInfoByCityCode,
  formalTransactInstitution,
  formalTransactInstitutiondt,
  formalFixHospitals,
  formalFixHospitalsdt,
  formalFixDrugstore,
  formalFixDrugstoredt,
  formalCommonQuestion,
  queryCommonQusCategory
};




//获取token
function getTokenByCode(params) {
  return fetchData('/auth/jwt/guest/getTokenByCode', params, 'post');
}

//首页广告列表
function getCategory(params) {
  return fetchData('/sharecom/notGrant/guest/queryValidAdvertisingByCategory?category=1', params);
}

//首页分类菜单列表
function getMenu(params) {
  return fetchData('/sharecom/notGrant/guest/queryAllValidIndexMenuByCategory?category=1', params);
}

//首页根据cityCode或城市名称查询城市有效开通模块信息
function queryOpenCityValidModuleInfoByParam(params) {
  return fetchData('/dist/notGrant/queryOpenCityValidModuleInfoByParam', params, 'post');
}

//首页热点滚动列表
function queryAllHotspotCarousel(params) {
  return fetchData('/quesans/notGrant/guest/queryAllHotspotCarousel?category=1', params);
}

//首页问答热门列表
function queryQuestionAnwserPage(params) {
  return fetchData('/quesans/notGrant/guest/queryQuestionAnwserPage', params);
}

//圈子问答热门列表
function questionAnwserPage(params) {
  return fetchData('/quesans/question/queryQuestionAnwserPage', params);
}

//悬赏问答问题类别
function queryAllValidQuestionCategory(params) {
  return fetchData('/quesans/questionCategory/queryAllValidQuestionCategory', params);
}

//悬赏问答列表
function queryOfferQuestionPage(params) {
  return fetchData('/quesans/question/queryOfferQuestionPage', params);
}

//悬赏问答 详情
function queryOfferQuestionById(params) {
  return fetchData('/quesans/question/queryOfferQuestionById/'+params);
}

//城市选择 热门城市
function queryAllValidHotCity(params) {
  return fetchData('/quesans/notGrant/guest/queryAllValidHotCity', params);
}

//提问 发布
function addQuestionByUser(params) {
  return fetchData('/quesans/question/addQuestionByUser', params,'post');
}

//回答 材料配置列表
function queryAllValidMaterials(params) {
  return fetchData('/quesans/materials/queryAllValidMaterials', params);
}

//上传图片
function uploadPic(params,header) {
  return fetchData('/sharecom/oss/picture/upload', params,'post',header);
}

//回答 提交答案
function addAnswerByUser(params) {
  return fetchData('/quesans/answer/addAnswerByUser', params,'post');
}

//圈子问答 详情
function queryQuestionAnwserById(params) {
  return fetchData('/quesans/question/queryQuestionAnwserById/'+params);
}

//圈子问答 详情 点赞
function praiseQuestionAnwser(params) {
  return fetchData('/quesans/question/praiseQuestionAnwser', params,'post');
}

//我的页面 获取个人信息
function queryMyAcctUserInfoAndPoint(params) {
  return fetchData('/acct/accUser/acctUserInfo/queryMyAcctUserInfoAndPoint', params);
}

//个人主页 获取用户资料
function queryVisitUserInfoById(params) {
  return fetchData('/acct/accUser/acctUserInfo/queryVisitUserInfoById/'+params);
}

//个人主页 回答
function queryVisitAnswerDynamicByParam(params) {
  return fetchData('/quesans/answer/queryVisitAnswerDynamicByParam', params);
}

//个人主页 提问
function queryVisitQuestionDynamicByParam(params) {
  return fetchData('/quesans/question/queryVisitQuestionDynamicByParam', params);
}

//个人主页 查询提问和回答的未读条数
function queryUnreadQuestionAndAnswerNum(params) {
  return fetchData('/quesans/question/queryUnreadQuestionAndAnswerNum', params);
}

//个人信息 修改生日
function userUpdateUserInfo(params) {
  return fetchData('/acct/accUser/acctUserInfo/userUpdateUserInfo', params,'post');
}

//积分列表
function queryMyPointBookPageByParam(params) {
  return fetchData('/acct/acctPointBook/queryMyPointBookPageByParam', params);
}

//批量修改提问状态
function batchSetQuestionIsRead(params) {
  return fetchData('/quesans/question/batchSetQuestionIsRead', params,'post');
}

//我的提问列表
function queryMyQuestionPageByParam(params) {
  return fetchData('/quesans/question/queryMyQuestionPageByParam', params);
}

//我的提问 删除
function qusUserDeleteById(params) {
  return fetchData('/quesans/question/userDeleteById/'+params,'','post');
}

//批量修改回答状态
function batchSetAnswerIsRead(params) {
  return fetchData('/quesans/answer/batchSetAnswerIsRead', params,'post');
}

//我的回答列表
function queryMyAnswerPageByParam(params) {
  return fetchData('/quesans/answer/queryMyAnswerPageByParam', params);
}

//我的回答 删除
function userDeleteByAnswerId(params) {
  return fetchData('/quesans/answer/userDeleteByAnswerId/'+params,'','post');
}

//搜索 热门搜索
function queryAllValidSearchHotWord(params) {
  return fetchData('/quesans/searchHotWord/queryAllValidSearchHotWord', params);
}

//搜索 答案列表
function querySearchQuestionAnswerPage(params) {
  return fetchData('/quesans/question/querySearchQuestionAnswerPage', params);
}

//新闻 查询栏目
function queryNewsChildrenCatalogTreeByParam(params) {
  return fetchData('/dist/notGrant/queryNewsChildrenCatalogTreeByParam', params);
}

//新闻 列表
function queryFNewsInfoPage(params) {
  return fetchData('/dist/notGrant/queryFNewsInfoPage', params);
}

//新闻政策 详情
function queryFNewsInfoDeatailById(params) {
  return fetchData('/dist/formalNewsInfo/queryFNewsInfoDeatailById/'+params);
}

//城市选择
function queryChildAreaByParentId(params) {
  return fetchData('/sharecom/whArea/queryChildAreaByParentId', params);
}

//地址列表
function queryListByUserId(params) {
  return fetchData('/mall/address/queryListByUserId', params);
}

//添加或更新收货地址
function addressSave(params) {
  return fetchData('/mall/address/save', params,'post');
}

//收货地址 删除
function addressDelete(params) {
  return fetchData('/mall/address/delete/'+params,'','post');
}

//收货地址 详情
function addressDetail(params) {
  return fetchData('/mall/address/detail/'+params);
}

//(新品推荐、热门热卖）、商品列表页
function goodspage(params) {
  return fetchData('/mall/notGrant/goods/page', params);
}

//商品详情
function goodsDetail(params) {
  return fetchData('/mall/notGrant/goods/detail', params);
}

//下单
function orderSubmit(params) {
  return fetchData('/mall/order/submit',params,'post');
}

//创建支付宝交易号
function alipayTradeCreate(params) {
  return fetchData('/mall/pay/alipayTradeCreate',params,'post');
}

//支付宝支付结果确认（支付宝成功、失败回调）
function payCallBack(params) {
  return fetchData('/mall/pay/payCallBack',params,'post');
}

//订单列表
function orderPage(params) {
  return fetchData('/mall/order/page', params);
}

//订单详情
function orderDetail(params) {
  return fetchData('/mall/order/detail?orderId='+ params);
}

//确认收货
function confirmOrder(params) {
  return fetchData('/mall/order/confirmOrder?orderId='+params,'','post');
}

//获取行政区信息
function getAreaInfoByCityCode(params) {
  return fetchData('/dist/whArea/getAreaInfoByCityCode?cityCode='+params);
}

//经办机构列表查询
function formalTransactInstitution(params) {
  return fetchData('/dist/formalTransactInstitution/pageByParam', params);
}

//经办机构详情
function formalTransactInstitutiondt(params) {
  return fetchData('/dist/formalTransactInstitution/'+params);
}

//定点医院列表查询
function formalFixHospitals(params) {
  return fetchData('/dist/formalFixHospitals/pageByParam', params);
}

//定点医院详情
function formalFixHospitalsdt(params) {
  return fetchData('/dist/formalFixHospitals/'+params);
}

//定点药店列表查询
function formalFixDrugstore(params) {
  return fetchData('/dist/formalFixDrugstore/pageByParam', params);
}

//定点药店详情
function formalFixDrugstoredt(params) {
  return fetchData('/dist/formalFixDrugstore/'+params);
}

//常见问题列表查询
function formalCommonQuestion(params) {
  return fetchData('/dist/formalCommonQuestion/pageByParam', params);
}

//常见问题分类信息
function queryCommonQusCategory(params) {
  return fetchData('/dist/formalCommonQuestion/queryCommonQusCategory?cityCode='+ params);
}
export default api