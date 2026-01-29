import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { AboutAirtable, ProjectFormatted, ShaderMesh, TeamAirtable, VideoAirtable } from "../types";
import config from "../config.json";

type State = {
  background: ShaderMesh | null;
  blob: ShaderMesh | null;
  gradient: HTMLDivElement | null;
  scroll: HTMLDivElement | null;
  // projectTiles: HTMLDivElement | null;
  ready: boolean;
  reel: VideoAirtable | null;
  video: HTMLVideoElement | null;
  videoPlaying: boolean;
  showReel: boolean;
  viewport: { width: number; height: number; aspect: number };
  controls: {
    colors: number;
    waves: number;
    distortion: number;
  };
  activeProject: ProjectFormatted | null;
  projects: ProjectFormatted[];
  about: AboutAirtable[];
  team: TeamAirtable[];
  pathname: string | undefined;
};

type Actions = {
  setValue: <K extends keyof State>(key: K, value: State[K]) => void;
};

const initialState = {
  config,
  background: null,
  blob: null,
  gradient: null,
  scroll: null,
  video: null,
  videoPlaying: false,
  // projectTiles: null,
  reel: null,
  showReel: false,
  ready: false,
  viewport: {
    width: window.innerWidth,
    height: window.innerHeight,
    aspect: window.innerWidth / window.innerHeight,
  },
  controls: {
    ...config.controls,
  },
  projects: [],
  activeProject: null,
  about: [],
  team: [],
  pathname: undefined,
};

type Store = State & Actions;

export const useStore = create<Store>()(
  immer((set) => ({
    ...initialState,
    setValue: (key, value): void => set(() => ({ [key]: value })),
  }))
);
