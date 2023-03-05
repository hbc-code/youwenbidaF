//?所有接口的封装类

import httpReq from "./httpReq.js";
//const url = "https://xscqa.cqupt.edu.cn/question";
const url = "";

// "proxy": "https://xscqa.cqupt.edu.cn/question/"
/**
 * 登录
 */
export const reqLogin = (params) => httpReq(url + `/account/casLogin`, params, "GET");

/**
 * 登录
 */
//export const reqLogin = (params) => httpReq(url + "/admin/login", params, "POST");

//  export const logout = params => httpReq("/authserver/logout",params,"GET")

//?获取登录信息
export const reqLoginInfo = (params) =>
  httpReq(url + "/getAdminInfo", params, "GET");

//?统计数据接口
/**
 * 今日数据请求函数
 */
export const reqTodayData = (params) =>
  httpReq(url + "/admin/todayStatistic", params, "GET");

/**
 * 志愿者相关
 */
export const reqVolunteer = (params) =>
  httpReq(url + "/admin/getVolunteerStatistic", params, "GET");

/**
 * 学科相关m
 */
export const reqSubject = (params) =>
  httpReq(url + "/admin/getSubjectStatistic", params, "GET");

/**
 * 登录相关
 */
export const reqLoginStatistic = (params) =>
  httpReq(url + "/admin/loginStatistic", params, "GET");

/**
 * 问题相关
 */
export const reqQuestionStatistic = (params) =>
  httpReq(url + "/admin/questionStatistic", params, "GET");

//?问题管理页面
/**
 * 查询相关问题，如果参数都不传的话则为请求所有问题
 */
export const reqListQuestion = (params) =>
  httpReq(url + "/admin/listQuestion", params, "GET");
/**
 * 修改问题
 */
export const reqUpdateQuestion = (params) =>
  httpReq(url + "/admin/updateQuestion", params, "POST");
/**
 * 隐藏问题
 */
export const reqDisapperQuestion = (params) =>
  httpReq(url + "/admin/disappearQuestion", params, "POST");
/**
 * 查看提问者信息
 */
export const reqGetAccountById = (params) =>
  httpReq(url + "/account/getAccountById", params, "GET");
/**
 * 详情页_问题
 */
export const reqGetQuestionById = (params) =>
  httpReq(url + "/question/getQuestionById", params, "GET");
/**
 * 详情页_问题
 */
export const reqGetQuestionById2 = (params) =>
  httpReq(url + "/admin/listQuestionDetail", params, "GET");

//?用户管理页面接口
/**
 * 查询相关用户
 */
export const reqListAccount = (params) =>
  httpReq(url + "/admin/listAccount", params, "GET");
/**
 * 获取全部学科信息
 */
export const reqListAllSubject = (params) =>
  httpReq(url + "/admin/listAllSubject", params, "GET");
/**
 * 修改用户角色
 */
export const reqUpdateAccountRole = (params) =>
  httpReq(url + "/admin/updateAccountRole", params, "POST");

/**
 * 删除用户
 */
export const reqDeleteAccountById = (params) =>
  httpReq(url + "/admin/deleteAccountById", params, "POST");

//?资讯管理页面接口
/**
 * 查询相关咨询
 */
export const reqListNews = (params) =>
  httpReq(url + "/admin/listNews", params, "GET");
/**
 * 添加新的咨询
 */
export const reqAddNews = (params) =>
  httpReq(url + "/admin/addNews", params, "POST");
/**
 * 删除咨询
 */
export const reqDeleteNewsById = (params) =>
  httpReq(url + "/admin/deleteNewsById", params, "POST");
/**
 * 修改咨询
 */
export const reqUpdateNews = (params) =>
  httpReq(url + "/admin/updateNews", params, "POST");
/**
 * 查看资讯详情
 */
export const reqGetNews = (params) =>
  httpReq(url + "/admin/getNews", params, "GET");

//?学科管理页面请求接口
/**
 * 获取全部学院
 */
export const reqGetAllCollege = (params) =>
  httpReq(url + "/admin/getAllCollege", params, "GET");
/**
 * 查询相关学科
 */
export const reqListSubject = (params) =>
  httpReq(url + "/admin/listSubject", params, "GET");
/**
 * 添加学科
 */
export const reqAddSubject = (params) =>
  httpReq(url + "/admin/addSubject", params, "POST");
/**
 * 查询学科详情
 */
export const reqGetSubjectById = (params) =>
  httpReq(url + "/admin/getSubjectById", params, "GET");
/**
 * 修改学科信息
 */
export const reqUpdateSubject = (params) =>
  httpReq(url + "/admin/updateSubject", params, "POST");
/**
 * 删除学科
 */
export const reqDeleteSubject = (params) =>
  httpReq(url + "/admin/deleteSubject", params, "POST");

//?举报和反馈页面接口
/**
 * 举报查询
 */
export const reqListReport = (params) =>
  httpReq(url + "/admin/listReport", params, "GET");

/**
 * 查看举报信息详情
 */
export const reqGetReportById = (params) =>
  httpReq(url + "/admin/getReportById", params, "GET");

/**
 * 隐藏举报信息
 */
export const reqDeleteReportById = (params) =>
  httpReq(url + "/admin/deleteReportById", params, "POST");
/**
 * 解决举报信息
 */
export const reqUpdateReportState = (params) =>
  httpReq(url + "/admin/updateReportState", params, "POST");

/**
 * 警告被举报者
 */
export const reqWarnAccount = (params) =>
  httpReq(url + "/admin/warnAccount", params, "POST");

/**
 * 反馈查询
 */
export const reqListFeedback = (params) =>
  httpReq(url + "/admin/listFeedback", params, "GET");
/**
 * 隐藏反馈信息
 */
export const reqDeleteFeedbackById = (params) =>
  httpReq(url + "/admin/deleteFeedbackById", params, "POST");
/**
 * 解决反馈
 */
export const reqUpdateFeedbackState = (params) =>
  httpReq(url + "/admin/updateFeedbackState", params, "POST");
/**
 * 查看反馈
 */
export const reqGetFeedback = (params) =>
  httpReq(url + "/admin/getFeedback", params, "GET");

//?界面管理接口
/**
 * 查看所有图片
 */
export const reqListStaticImg = (params) =>
  httpReq(url + "/admin/listStaticImg", params, "GET");

/**
 *
 */
export const reqUpdateStaticImg = (params) =>
  httpReq(url + "/admin/updateStaticImg", params, "POST");

//?日志管理页面接口
/**
 * 查询相关日志
 */
export const reqListLog = (params) =>
  httpReq(url + "/admin/listLog", params, "GET");
/**
 * 查看日志信息详情
 */
export const reqGetLogById = (params) =>
  httpReq(url + "/admin/getLogById", params, "GET");

//?积分管理
/**
 * 查看所有积分规则
 */
export const reqAllRules = (params) =>
  httpReq(url + "/admin/listAllRules", params, "GET");
/**
 * 修改积分规则
 */
export const reqUpdateRule = (params) =>
  httpReq(url + "/admin/updateRule", params, "POST");
