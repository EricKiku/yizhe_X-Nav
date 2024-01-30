import axios from "axios";

/**
 * @description bing.sug api请求
 * @param key string
 * @returns axios
 */
export const bingSugApi = (key: string) => {
  return axios({
    url: "/bing?type=cb&cb=window.sug.bing",
    method: "GET",
    params: {
      q: key,
    },
  });
};

/**
 * @description baidu.sug api请求
 * @param key string
 * @returns axios
 */
export const baiduSugApi = (key: string) => {
  return axios({
    url: "/baidu?cb=window.sug.baidu",
    method: "GET",
    params: {
      wd: key,
    },
  });
};

/**
 * @description google.sug api请求
 * @param key string
 * @returns axios
 */
export const googleSugApi = (key: string) => {
  return axios({
    url: "/google?client=chrome&jsonp=window.sug.google",
    method: "GET",
    params: {
      q: key,
    },
  });
};

/**
 * @description google.sug api请求
 * @param key string
 * @returns axios
 */
export const sogouSugApi = (key: string) => {
  return axios({
    url: "/sogou?type=web",
    method: "GET",
    params: {
      key: key,
    },
  });
};
