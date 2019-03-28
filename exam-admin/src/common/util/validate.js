// 校验用户名
export function isvalidUsername(str) {
  if (str.trim() !== "") {
    return true;
  } else {
    return false;
  }
}
// 校验邮箱
export function validateEmail(email) {
  const re = "";
  return re.test(email);
}
// 身份证校验
// 手机号校验
