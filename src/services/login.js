import axios from "axios";

const baseUrl = "/.netlify/functions/login";

const login = async (password) => {
  const response = await axios.put(baseUrl, { password });
  return response.data;
};

const loginService = { login };

export default loginService;
