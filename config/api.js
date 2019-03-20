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
  praiseQuestionAnwser
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
export default api