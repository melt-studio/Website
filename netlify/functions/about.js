// eslint-disable-next-line no-undef
const axios = require("axios");

// eslint-disable-next-line no-undef
exports.handler = (event, context, callback) => {
  // Get env var values defined in our Netlify site UI
  // eslint-disable-next-line no-undef
  const KEY = process.env.REACT_APP_AIRTABLE_KEY;
  // eslint-disable-next-line no-undef
  const URL = process.env.REACT_APP_AIRTABLE_ENDPOINT_URL_ABOUT;

  const headers = {
    Authorization: `Bearer ${KEY}`,
    "Content-Type": "application/json",
  };

  // Here's a function we'll use to define how our response will look like when we call callback
  const pass = (code, body) => {
    // console.log(body)
    callback(null, {
      statusCode: code,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  };

  const getAbout = async () => {
    try {
      const response = await axios.get(URL, { headers });

      if (!response.data || !response.data.records) {
        return pass(404, { error: "No data/records found" });
      }

      return pass(200, response.data.records);
    } catch (error) {
      return pass(500, { error: "Unable to fetch data" });
    }
  };

  if (event.httpMethod === "GET") {
    getAbout();
  } else {
    return pass(500, { error: "Invalid request" });
  }
};
