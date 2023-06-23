import axios from "axios";

const baseUrl = "/.netlify/functions/other";

const getOther = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const otherService = { getOther };

export default otherService;
