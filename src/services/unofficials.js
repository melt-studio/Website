import axios from "axios";

const KEY = process.env.REACT_APP_AIRTABLE_KEY;
// const BASE = process.env.REACT_APP_BASE_NUM; 
const URL = process.env.REACT_APP_AIRTABLE_ENDPOINT_URL_UNOFFICIALS;

export const getAllUnofficials = async () => {
  const data = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
  });
  return data.data.records;
};