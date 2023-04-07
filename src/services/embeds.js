import axios from "axios";

const baseUrl = "/.netlify/functions/embeds";

const getEmbeds = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const embedService = { getEmbeds };

export default embedService;
