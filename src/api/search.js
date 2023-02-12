import request from "../utils/request.js";
// 根据类别搜索（public）
export const searchPublicArticleByClass = (data) => {
  return request({
    method: "POST",
    url: "/search/searchPublicArticleByClass",
    data,
  });
};
// 根据类别搜索（private）
export const searchPrivateArticleByClass = (data) => {
  return request({
    method: "POST",
    url: "/search/searchPrivateArticleByClass",
    data,
  });
};
// 根据搜索内容查询
export const searchByInput = (data) => {
  return request({
    method: "post",
    url: "/search/searchByInput",
    data,
  });
};
// 根据搜索内容查询
export const searchByTime = (data) => {
  return request({
    method: "post",
    url: "/search/searchByTime",
    data,
  });
};
