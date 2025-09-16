import type { Context } from "@netlify/functions";
import axios from "axios";

const KEY = Netlify.env.get("REACT_APP_AIRTABLE_KEY");
const APP = Netlify.env.get("REACT_APP_AIRTABLE_APP");
const TABLE = Netlify.env.get("REACT_APP_AIRTABLE_TABLE_TEAM");
const URL = `${APP}/${TABLE}`;

const headers = { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };

const pass = (body: any, status?: number) => {
  return new Response(JSON.stringify(body), status !== undefined ? { status } : {});
};

export default async (req: Request, _context: Context) => {
  if (req.method === "GET") {
    return await getTeam();
  } else {
    return pass({ error: "Invalid request" }, 400);
  }
};

const getTeam = async () => {
  try {
    const response = await axios.get(URL, { headers });

    if (!response.data || !response.data.records) {
      return pass({ error: "No data/records found" }, 404);
    }

    return pass(response.data.records);
  } catch (error) {
    console.log(error);
    return pass({ error: "Unable to fetch data" }, 500);
  }
};
