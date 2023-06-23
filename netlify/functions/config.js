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
  const TABLE = process.env.REACT_APP_AIRTABLE_TABLE_CONFIG;
  const URL = `${APP}/${TABLE}`;

  // eslint-disable-next-line no-undef
  const TABLE_PASSWORD = process.env.REACT_APP_AIRTABLE_TABLE_PASSWORDS;
  const URL_PASSWORD = `${APP}/${TABLE_PASSWORD}`;

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

  const getConfig = async () => {
    try {
      const response = await axios.get(URL, { headers });

      if (!response.data || !response.data.records) {
        return pass(404, { error: "No data/records found" });
      }

      const data = response.data.records.reduce((acc, record) => {
        const { id, fields } = record;
        const { mode, config } = fields;

        // Only return field if has mode and config set in fields
        if (mode === undefined || config === undefined) return acc;

        return { ...acc, [mode]: { ...JSON.parse(config), id } };
      }, {});

      return pass(200, data);
    } catch (error) {
      return pass(500, { error: "Unable to fetch data" });
    }
  };

  const updateConfig = async () => {
    const { body } = event;

    const { config, password } = JSON.parse(body);

    // Check password
    if (!password || password === "") {
      return pass(401, { error: "Wrong password" });
    }

    // Get password from Airtable
    try {
      const response = await axios.get(URL_PASSWORD, { headers });
      const data = response.data.records.map((r) => r.fields).find((f) => f.page === "Save Settings");

      if (!data || !data.password) {
        return pass(404, { error: "Airtable password record not found" });
      }

      if (data.password !== password) {
        return pass(401, { error: "Wrong password" });
      }
    } catch (error) {
      return pass(404, { error: "Airtable password record not found" });
    }

    // Check for config record on Airtable
    try {
      await axios.get(`${URL}/${config.id}`, { headers });
    } catch (error) {
      return pass(404, { error: "Airtable config record not found" });
    }

    const updatedConfig = {
      fields: {
        config: JSON.stringify({
          ...config,
          lastUpdated: new Date().toISOString(),
        }),
      },
    };

    try {
      // Airtable API patch will update only specified fields in data
      const response = await axios.patch(`${URL}/${config.id}`, updatedConfig, {
        headers,
      });

      const data = JSON.parse(response.data.fields.config);

      return pass(200, data);
    } catch (error) {
      return pass(500, { error: "Something went wrong, saving failed" });
    }
  };

  if (event.httpMethod === "GET") {
    getConfig();
  } else if (event.httpMethod === "PUT") {
    updateConfig();
  } else {
    return pass(500, { error: "Invalid request" });
  }
};
