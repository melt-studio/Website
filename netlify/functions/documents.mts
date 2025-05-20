import type { Context } from "@netlify/functions";
import axios from "axios";

type DocumentFields = {
  title?: string;
  pageUrl?: string;
  embedUrl?: string;
  media?: string;
  password?: string;
};

type DocumentMetadata = {
  id: string;
  createdTime: string;
};

type DocumentAirtable = DocumentMetadata & {
  fields: DocumentFields;
};

type DocumentLocked = DocumentMetadata & {
  fields: Omit<DocumentFields, "password" | "media" | "embedUrl" | "pageUrl"> & { locked: boolean };
};

type Document = DocumentMetadata & {
  fields: Omit<DocumentFields, "password" | "pageUrl">;
};

const KEY = Netlify.env.get("REACT_APP_AIRTABLE_KEY");
const APP = Netlify.env.get("REACT_APP_AIRTABLE_APP");
const TABLE = Netlify.env.get("REACT_APP_AIRTABLE_TABLE_EMBEDS");
const URL = `${APP}/${TABLE}`;

const headers = { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };

const pass = (body: any, status?: number) => {
  return new Response(JSON.stringify(body), status !== undefined ? { status } : {});
};

export default async (req: Request, _context: Context) => {
  if (req.method === "PUT") {
    const body = await req.json();

    if (body.pageUrl) return await getDocument(body.pageUrl);
    if (body.password && body.id) return await unlockDocument(body.id, body.password);
    return pass({ error: "Invalid request" }, 400);
  } else {
    return pass({ error: "Invalid request" }, 400);
  }
};

const formatDocument = (document: DocumentAirtable, full: boolean = false): Response => {
  const { id, createdTime, fields } = document;
  const { password, embedUrl, media, title } = fields;

  if (!embedUrl && !media) return pass({ error: "Document has no content" }, 400);

  const content =
    !full && password !== undefined
      ? {
          locked: true,
        }
      : {
          embedUrl,
          media,
        };

  const formattedDocument: Document | DocumentLocked = {
    id,
    createdTime,
    fields: { title, ...content },
  };

  return pass(formattedDocument);
};

const getDocument = async (pageUrl: any) => {
  if (typeof pageUrl !== "string") return pass({ error: "Invalid document url" }, 400);

  try {
    const response = await axios.get(URL, { headers });

    if (!response.data || !response.data.records) {
      return pass({ error: "No data/records found" }, 404);
    }

    const match = (response.data.records as DocumentAirtable[]).find(
      (document) =>
        document.fields.pageUrl !== undefined && document.fields.pageUrl.toLowerCase() === pageUrl.toLowerCase()
    );

    if (!match) return pass({ error: "Document not found" }, 404);

    return formatDocument(match);
  } catch (error) {
    console.log(error);
    return pass({ error: "Unable to fetch data" }, 500);
  }
};

const unlockDocument = async (id: string | undefined, userPassword: string | undefined) => {
  if (!userPassword || userPassword === "") {
    return pass({ error: "Incorrect Password" }, 401);
  }

  try {
    const response = await axios.get(`${URL}/${id}`, { headers });

    if (!response.data) return pass({ error: "Document not found" }, 404);

    if (response.data.fields.password !== userPassword) {
      return pass({ error: "Incorred Password" }, 401);
    }

    return formatDocument(response.data, true);
  } catch (error) {
    return pass({ error: "Document not found" }, 404);
  }
};
