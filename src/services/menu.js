import axios from "axios";

const baseUrl = "/.netlify/functions/menu";

const getMenu = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const menuService = { getMenu };

export default menuService;
