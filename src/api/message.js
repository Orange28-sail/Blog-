import request from "../utils/request.js";

export const getAllMessage = () => {
  return request({
    method: "get",
    url: "/message/getAllMessage",
  });
};
export const postMessage = (data) => {
  return request({
    method: "post",
    url: "/message/postMessage",
    data,
  });
};
