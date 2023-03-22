import axios from "axios";

const KEY = process.env.REACT_APP_AIRTABLE_KEY;
// const BASE = process.env.REACT_APP_BASE_NUM; 
const URL = process.env.REACT_APP_AIRTABLE_ENDPOINT_URL_MISC;

export const getAllMiscInfo = async () => {
  const data = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
  });
  return data.data.records;
};