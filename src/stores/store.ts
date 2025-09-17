import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { AboutAirtable, BackgroundMesh, ProjectAirtable, TeamAirtable } from "../types";
import config from "../config.json";

type State = {
  background: BackgroundMesh | null;
  ready: boolean;
  showReel: boolean;
  viewport: { width: number; height: number };
  controls: {
    colors: number;
    waves: number;
    distortion: number;
  };
  projects: ProjectAirtable[];
  about: AboutAirtable[];
  team: TeamAirtable[];
};

type Actions = {
  setValue: <K extends keyof State>(key: K, value: State[K]) => void;
};

const initialState = {
  config,
  background: null,
  showReel: false,
  ready: false,
  viewport: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  controls: {
    ...config.controls,
  },
  projects: [],
  about: [],
  team: [],
};

type Store = State & Actions;

export const useStore = create<Store>()(
  immer((set) => ({
    ...initialState,
    setValue: (key, value): void => set(() => ({ [key]: value })),
  }))
);
