import { RefObject } from "react";
import { Mesh, PlaneGeometry, ShaderMaterial } from "three";

export type BackgroundMesh = Mesh<PlaneGeometry, ShaderMaterial>;

export type BackgroundMeshRef = RefObject<BackgroundMesh | undefined>;

export type DocMedia = {
  filename: string;
  id: string;
  size: number;
  type: string;
  url: string;
};

export type Doc = {
  id: string;
  createdTime: string;
  fields: {
    title: string;
    pageUrl: string;
    embedUrl?: string;
    media?: DocMedia[];
    locked?: boolean;
  };
};

type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

type Image = {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: Thumbnail;
    large: Thumbnail;
    full: Thumbnail;
  };
};

type ProjectFields = {
  backgroundColor: string;
  coverImg: Image[];
  description: string;
  images: Image[];
  mainImage: Image[];
  mainVid: Image[];
  mobileImages: Image[];
  name: string;
  projectCopy: string;
  projectCopy2: string;
  projectScope: string[];
  projectUrl: string;
  tag: string;
  textColor: string;
};

export type ProjectAirtable = {
  id: string;
  createTime: string;
  fields: ProjectFields;
};

type AboutFields = {
  page: string;
  clients: string[];
  services: string[];
  headline1: string;
  headline2: string;
  copy1: string;
  whoWeAre: string;
};

export type AboutAirtable = {
  id: string;
  createTime: string;
  fields: AboutFields;
};

export type TeamFields = {
  name: string;
  jobTitle: string;
  photo: Image[];
};

export type TeamAirtable = {
  id: string;
  fields: TeamFields;
};
