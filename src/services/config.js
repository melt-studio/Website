import axios from "axios";

const baseUrl = "/.netlify/functions/config";

const getConfig = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const updateConfig = async (config, password) => {
  const response = await axios.put(baseUrl, { config, password });
  return response.data;
};

const configService = { getConfig, updateConfig };

export default configService;
