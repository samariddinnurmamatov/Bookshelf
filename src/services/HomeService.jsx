import ApiService from "./ApiService";

export async function apiGetBook(params = {}) {
  return ApiService.fetchData({
    url: "/books",
    method: "get",
    params,
  });
}


export async function apiCreateBook(data = {}) {
  return ApiService.fetchData({
    url: "/books",
    method: "post",
    data,
  });
}
