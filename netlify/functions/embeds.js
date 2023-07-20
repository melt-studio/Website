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
  const TABLE = process.env.REACT_APP_AIRTABLE_TABLE_EMBEDS;
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
    return {
      status,
      statusText,
      data,
    };
  };

  const getEmbeds = async () => {
    try {
      const response = await axios.get(URL, { headers });

      if (!response.data || !response.data.records) {
        return pass(404, { error: "No data/records found" });
      }

      const records = response.data.records.map(({ id, createdTime, fields }) => {
        const { password, embedUrl, ...fieldsRest } = fields;

        if (!fieldsRest.protected) {
          fieldsRest.embedUrl = embedUrl;
        }

        return {
          id,
          createdTime,
          fields: { ...fieldsRest },
        };
      });

      return pass(200, records);
    } catch (error) {
      // return pass(500, { error: "Unable to fetch data" });
      const errorData = handleError(error);
      console.log(errorData);
      return pass(errorData.status ? errorData.status : 500, { error: errorData });
    }
  };

  const openEmbed = async () => {
    const { body } = event;

    const { password: userPassword, id } = JSON.parse(body);

    // Check password
    if (!userPassword || userPassword === "") {
      return pass(401, { error: "Wrong password" });
    }

    // Get password from Airtable
    try {
      const response = await axios.get(`${URL}/${id}`, { headers });

      const { password, ...fieldsRest } = response.data.fields;

      const data = {
        id,
        createdTime: response.data.createdTime,
        fields: { ...fieldsRest },
      };

      if (!response || !response.data || !response.data.fields || !response.data.fields.password) {
        return pass(404, { error: "Airtable record not found" });
      }

      if (response.data.fields.password !== userPassword) {
        return pass(401, { error: "Wrong password" });
      }

      return pass(200, data);
    } catch (error) {
      // return pass(404, { error: "Airtable record not found" });
      const errorData = handleError(error);
      console.log(errorData);
      return pass(errorData.status ? errorData.status : 500, { error: errorData });
    }
  };

  if (event.httpMethod === "GET") {
    getEmbeds();
  } else if (event.httpMethod === "PUT") {
    openEmbed();
  } else {
    return pass(500, { error: "Invalid request" });
  }
};
