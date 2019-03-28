import request from "@/common/util/requset";
// 获取表格数据
export function tableData(data) {
  return request({
    url: "/testques/list",
    method: "post",
    params: data
  });
}
