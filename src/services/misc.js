import axios from "axios";

const baseUrl = "/.netlify/functions/misc";

const getMisc = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const miscService = { getMisc };

export default miscService;
