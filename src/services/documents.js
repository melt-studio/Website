import axios from "axios";

const baseUrl = "/.netlify/functions/documents";

const getDocument = async (pageUrl) => {
  const response = await axios.put(baseUrl, { pageUrl });
  return response.data;
};

const unlockDocument = async (id, password) => {
  const response = await axios.put(baseUrl, { id, password });
  return response.data;
};

const documentService = { getDocument, unlockDocument };

export default documentService;
