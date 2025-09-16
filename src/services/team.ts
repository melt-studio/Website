import axios from "axios";

const baseUrl = "/.netlify/functions/team";

const getTeam = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const teamService = { getTeam };

export default teamService;
