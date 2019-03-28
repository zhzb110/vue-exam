import request from "@/common/util/requset";
// 登录方法
export function apiGet(url) {
  return new Promise((resolve, reject) => {
    request({ url: "url", method: "get" })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function apiPost(url, data) {
  return new Promise((resolve, reject) => {
    request({ url: url, method: "post", data: data })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
