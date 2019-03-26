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
  userDeleteByAnswerId
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
export default api