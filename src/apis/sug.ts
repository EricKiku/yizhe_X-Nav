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
export const san60SugApi = (key: string) => {
  return axios({
    url: "/360?encodein=utf-8&encodeout=utf-8&callback=window.sug.san60",
    method: "GET",
    params: {
      word: key,
    },
  });
};
