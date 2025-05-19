import { create } from "zustand";

const THEME_TITLE = "preferred-theme";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem(THEME_TITLE) || "forest",
  setTheme: (theme) => {
    localStorage.setItem(THEME_TITLE, theme);
    set({ theme });
  },
}));
