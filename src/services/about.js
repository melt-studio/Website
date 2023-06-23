import axios from "axios";

const baseUrl = "/.netlify/functions/about";

const getAbout = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const aboutService = { getAbout };

export default aboutService;
