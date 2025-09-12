import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import config from "./config.json";

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

export const useStore = create(
  immer((set) => ({
    ...initialState,
    setValue: (key, value) => set(() => ({ [key]: value })),
  }))
);
