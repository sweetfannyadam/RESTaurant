import CONFIG from "./config";

const API_ENDPOINT = {
  LIST: `${CONFIG.BASE_URL}/list`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  IMAGE: {
    SMALL: (id) => `${CONFIG.BASE_URL}/images/small/${id}`,
    MEDIUM: (id) => `${CONFIG.BASE_URL}/images/medium/${id}`,
    LARGE: (id) => `${CONFIG.BASE_URL}/images/large/${id}`,
  },
};

export default API_ENDPOINT;
