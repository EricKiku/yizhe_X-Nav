import axios from "axios";
const BingApiKey = "2150b45562434bb8b4d35f8f9650be71";
export const bingSearch = (key: string) => {
  return axios({
    url: `https://api.bing.microsoft.com/v7.0/search?q=${key}`,
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": BingApiKey,
    },
  });
};
