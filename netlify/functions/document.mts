import type { Context } from "@netlify/functions";
import axios from "axios";

type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

type File = {
  id: string;
  filename: string;
  url: string;
  size: number;
  type: string;
};

type Image = File & {
  height: number;
  width: number;
  thumbnails: {
    small: Thumbnail;
    large: Thumbnail;
    full: Thumbnail;
  };
};

type Video = File & {};

type PDF = File & {
  thumbnails: {
    small: Thumbnail;
    large: Thumbnail;
  };
};

type Media = Image | Video | PDF;

type DocumentFields = {
  title: string;
  pageUrl: string;
  embedUrl?: string;
  media?: Media[];
  password?: string;
};

type DocumentFieldsLocked = Omit<DocumentFields, "embedUrl" | "media" | "password">;

type DocumentFieldsUnlocked = Omit<DocumentFields, "password">;

type DocumentAirtableLocked = {
  id: string;
  locked: boolean;
  fields: DocumentFieldsLocked;
};

type DocumentAirtableUnlocked = {
  id: string;
  locked: boolean;
  fields: DocumentFieldsUnlocked;
};

type DocumentAirtable = {
  id: string;
  fields: DocumentFields;
};

const KEY = Netlify.env.get("REACT_APP_AIRTABLE_KEY");
const APP = Netlify.env.get("REACT_APP_AIRTABLE_APP");
const TABLE = Netlify.env.get("REACT_APP_AIRTABLE_TABLE_DOCUMENTS");
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
  const { id, fields } = document;
  const { password, embedUrl, media, title, pageUrl } = fields;

  if (!embedUrl && !media) return pass({ error: "Document has no content" }, 400);

  if (password === undefined || full) {
    const documentUnlocked: DocumentAirtableUnlocked = {
      id,
      locked: false,
      fields: {
        embedUrl,
        media,
        title,
        pageUrl,
      },
    };

    return pass(documentUnlocked);
  }

  const documentLocked: DocumentAirtableLocked = {
    id,
    locked: true,
    fields: {
      title,
      pageUrl,
    },
  };

  return pass(documentLocked);
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
      return pass({ error: "Incorrect Password" }, 401);
    }

    return formatDocument(response.data, true);
  } catch (error) {
    return pass({ error: "Document not found" }, 404);
  }
};
