import type { Context } from "@netlify/functions";
import axios from "axios";

// type ProjectFields = {
//   title?: string;
//   pageUrl?: string;
//   embedUrl?: string;
//   media?: string;
//   password?: string;
// };

// type ProjectMetadata = {
//   id: string;
//   createdTime: string;
// };

// type Project = ProjectMetadata & {
//   fields: ProjectFields;
// };

// type DocumentLocked = DocumentMetadata & {
//   fields: Omit<DocumentFields, "password" | "media" | "embedUrl" | "pageUrl"> & { locked: boolean };
// };

// type Document = DocumentMetadata & {
//   fields: Omit<DocumentFields, "password" | "pageUrl">;
// };

const KEY = Netlify.env.get("REACT_APP_AIRTABLE_KEY");
const APP = Netlify.env.get("REACT_APP_AIRTABLE_APP");
const TABLE = Netlify.env.get("REACT_APP_AIRTABLE_TABLE_PROJECTS");
const URL = `${APP}/${TABLE}`;

const headers = { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };

const pass = (body: any, status?: number) => {
  return new Response(JSON.stringify(body), status !== undefined ? { status } : {});
};

export default async (req: Request, _context: Context) => {
  if (req.method === "GET") {
    return await getProjects();
  } else {
    return pass({ error: "Invalid request" }, 400);
  }
};

// const formatDocument = (document: DocumentAirtable, full: boolean = false): Response => {
//   const { id, createdTime, fields } = document;
//   const { password, embedUrl, media, title } = fields;

//   if (!embedUrl && !media) return pass({ error: "Document has no content" }, 400);

//   const content =
//     !full && password !== undefined
//       ? {
//           locked: true,
//         }
//       : {
//           embedUrl,
//           media,
//         };

//   const formattedDocument: Document | DocumentLocked = {
//     id,
//     createdTime,
//     fields: { title, ...content },
//   };

//   return pass(formattedDocument);
// };

const getProjects = async () => {
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
