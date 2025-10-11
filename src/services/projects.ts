import axios from "axios";

const baseUrl = "/.netlify/functions/projects";

const getProjects = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const projectsService = { getProjects };

export default projectsService;
