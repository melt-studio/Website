import axios from "axios";

const KEY = process.env.REACT_APP_AIRTABLE_KEY;
const BASE = process.env.REACT_APP_BASE_NUM_ABOUT;
const URL = process.env.REACT_APP_AIRTABLE_ENDPOINT_URL;

export const getAllProjects = async () => {
  const data = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
  });
  return data.data.records;
};

export const deleteProject = async (id) => {
  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: KEY }).base(BASE);

  base(`${process.env.REACT_APP_AIRTABLE_BASE_TABLE}`).destroy(id, function (err, deletedRecords) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Deleted", deletedRecords.length, "records");
    window.location.assign("/");
  });
};

export const makeRequest = async () => {
  let res = await axios(URL, {
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
  });
  return res.data;
};
