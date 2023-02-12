import request from "../utils/request.js";

// 获取所有文章
export const getAllArticle = () => {
  return request({
    method: "get",
    url: "/article/getAllArticle",
  });
};
// 获取个人文章
export const getPrivateArticle = () => {
  return request({
    method: "get",
    url: "/article/getPrivateArticle",
  });
};
// 发布文章
export const publishArticle = (data) => {
  return request({
    method: "post",
    url: "/article/publishArticle",
    data,
  });
};
// 获取作者信息
export const getAuthorInfo = (data) => {
  return request({
    method: "post",
    url: "/article/getAuthorInfo",
    data,
  });
};
// 获取文章详情
export const getArticleDetail = (data) => {
  return request({
    method: "post",
    url: "/article/getArticleDetail",
    data,
  });
};
// 删除文章
export const deleteArticle = (data) => {
  return request({
    method: "post",
    url: "/article/deleteArticle",
    data,
  });
};
// 修改文章
export const updateArticle = (data) => {
  return request({
    method: "post",
    url: "/article/updateArticle",
    data,
  });
};
