// eslint-disable-next-line no-undef
const axios = require("axios");

// eslint-disable-next-line no-undef
exports.handler = (event, context, callback) => {
  // Get env var values defined in our Netlify site UI
  // eslint-disable-next-line no-undef
  const KEY = process.env.REACT_APP_AIRTABLE_KEY;
  // eslint-disable-next-line no-undef
  const APP = process.env.REACT_APP_AIRTABLE_APP;
  // eslint-disable-next-line no-undef
  const TABLE = process.env.REACT_APP_AIRTABLE_TABLE_PASSWORDS;
  const URL = `${APP}/${TABLE}`;

  const headers = {
    Authorization: `Bearer ${KEY}`,
    "Content-Type": "application/json",
  };

  // Here's a function we'll use to define how our response will look like when we call callback
  const pass = (code, body) => {
    callback(null, {
      statusCode: code,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  };

  const handleError = (error) => {
    const { status, statusText, data } = error.response;
    return pass(status ? status : 500, {
      error: {
        status,
        statusText,
        data,
      },
    });
  };

  const login = async () => {
    const { body } = event;

    const { password } = JSON.parse(body);

    if (!password || password === "") {
      return pass(401, { error: "Wrong password" });
    }

    // Get password from Airtable
    try {
      const response = await axios.get(URL, { headers });
      const data = response.data.records.map((r) => r.fields).find((f) => f.page === "Admin");

      if (!data || !data.password) {
        return pass(404, { error: "Airtable record not found" });
      }

      if (data.password !== password) {
        return pass(401, { error: "Wrong password" });
      }

      return pass(200, {});
    } catch (error) {
      // return pass(404, { error: "Airtable record not found" });
      handleError(error);
    }
  };

  if (event.httpMethod === "PUT") {
    login();
  } else {
    return pass(500, { error: "Invalid request" });
  }
};
