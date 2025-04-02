import { RefObject } from "react";
import { Mesh, PlaneGeometry, ShaderMaterial } from "three";

export type BackgroundMesh = Mesh<PlaneGeometry, ShaderMaterial>;
export type BackgroundMeshRef = RefObject<BackgroundMesh | undefined>;
