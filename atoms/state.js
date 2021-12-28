import { atom, selector } from "recoil";

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "1UciQOlny4hOBqMXoQJpJD",
});

export const playlistState = atom({
  key: "playlistState",
  default: null,
});

export const currentTrackIdState = atom({
  key: "currentTrackIdState",
  default: null
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false
});