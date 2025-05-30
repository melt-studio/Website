import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BackgroundMesh, Doc } from "./types";
import config from "./config.json";

type State = {
  background: BackgroundMesh | null;
  ready: boolean;
  controls: {
    colors: number;
    waves: number;
    distortion: number;
  };
  documents: Doc[];
  document: Doc | null;
};

type Actions = {
  setValue: <K extends keyof State>(key: K, value: State[K]) => void;
};

const initialState = {
  config,
  background: null,
  ready: false,
  controls: {
    ...config.controls,
  },
  documents: [],
  document: null,
};

type Store = State & Actions;

export const useStore = create<Store>()(
  immer((set) => ({
    ...initialState,
    setValue: (key, value): void => set(() => ({ [key]: value })),
  }))
);
