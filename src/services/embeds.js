import axios from "axios";

const baseUrl = "/.netlify/functions/embeds";

const getEmbeds = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const openEmbed = async (id, password) => {
  const response = await axios.put(baseUrl, { id, password });
  return response.data;
};

const embedService = { getEmbeds, openEmbed };

export default embedService;
