import axios from "axios";

const baseUrl = "/.netlify/functions/document";

const getDocument = async (pageUrl: string) => {
  const response = await axios.put(baseUrl, { pageUrl });
  return response.data;
};

const unlockDocument = async (id: string, password: string) => {
  const response = await axios.put(baseUrl, { id, password });
  return response.data;
};

const documentService = { getDocument, unlockDocument };

export default documentService;
