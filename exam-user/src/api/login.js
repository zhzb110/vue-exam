import request from "@/common/util/requset";
// 登录方法
export function loginByUsername(username, password) {
  const data = {
    username,
    password
  };
  return request({
    url: "/sys/login",
    method: "post",
    data
  });
}

export function logout() {
  return request({
    url: "/login/logout",
    method: "post"
  });
}
// 获取用户信息
export function getUserInfo(token) {
  return request({
    url: "/sys/user/info",
    method: "get",
    params: { token }
  });
}
