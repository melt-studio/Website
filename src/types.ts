import { RefObject } from "react";
import { Mesh, PlaneGeometry, ShaderMaterial } from "three";

export type ShaderMesh = Mesh<PlaneGeometry, ShaderMaterial>;

export type BackgroundMeshRef = RefObject<ShaderMesh | undefined>;
export type BlobMeshRef = RefObject<ShaderMesh | undefined>;

type AirtableRecords = {
  id: string;
  createdTime: string;
};

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

export type ImageAirtable = File & {
  height: number;
  width: number;
  thumbnails: {
    small: Thumbnail;
    large: Thumbnail;
    full: Thumbnail;
  };
};

export type VideoAirtable = File & {};

export type PDFAirtable = File & {
  thumbnails: {
    small: Thumbnail;
    large: Thumbnail;
  };
};

export type Media = ImageAirtable | VideoAirtable | PDFAirtable;

type ProjectFields = {
  name: string;
  projectUrl: string;
  client: string;
  scope: string[];
  copy: string;
  copy2title: string;
  copy2: string;
  // tag: string;
  projectThumbnail: ImageAirtable[];
  splashImage: Media[];
  // coverThumb: Media[];
  projectImages: Media[];
  galleryImages: Media[];
  // approachCopy: string;
  // approachMedia: Media[];
  backgroundColor: string;
  // textColor: string;
};

export type ProjectAirtable = AirtableRecords & {
  fields: ProjectFields;
};

type AboutFields = {
  page: string;
  splashImage: Media[];
  splashText: string;
  whoWeAre: string;
  headline1: string;
  services: string[];
  clients: string[];
  headline2: string;
};

export type AboutAirtable = AirtableRecords & {
  fields: AboutFields;
};

export type TeamFields = {
  name: string;
  jobTitle: string;
  photo: ImageAirtable[];
};

export type TeamAirtable = AirtableRecords & {
  fields: TeamFields;
};

type DocumentFields = {
  title: string;
  pageUrl: string;
  embedUrl?: string;
  media?: Media[];
  password?: string;
};

type DocumentFieldsLocked = Omit<DocumentFields, "embedUrl" | "media" | "password">;

type DocumentFieldsUnlocked = Omit<DocumentFields, "password">;

export type DocumentAirtableLocked = {
  id: string;
  locked: boolean;
  fields: DocumentFieldsLocked;
};

export type DocumentAirtableUnlocked = {
  id: string;
  locked: boolean;
  fields: DocumentFieldsUnlocked;
};

export type ProjectFormatted = ProjectAirtable & {
  theme: [string, string];
  index: number;
  next: string | null;
  prev: string | null;
  contrast: {
    hex: string;
    diff: number;
    diffAbs: number;
    contrast: number;
    label: string;
  };
  thumbnailAspectRatio: number;
};
