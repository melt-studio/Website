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
