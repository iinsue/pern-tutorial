import { PaletteIcon } from "lucide-react";

import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

function ThemeSelector() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      {/* DROPDOWN TRIGGER */}

      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </button>

      <div
        tabIndex={0}
        className="dropdown-content bg-base-200 border-base-content/10 mt-2 w-56 rounded-2xl border p-1 shadow-2xl backdrop-blur-lg"
      >
        {THEMES.map((themeOption) => (
          <button
            key={themeOption.name}
            onClick={() => setTheme(themeOption.name)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-colors ${theme === themeOption.name ? "bg-primary/10 text-primary" : "hover:bg-base-content/5"} `}
          >
            <PaletteIcon className="size-4" />
            <span className="text-sm font-medium">{themeOption.label}</span>

            {/* THEME PREVIEW COLORS */}
            <div className="ml-auto flex gap-1">
              {themeOption.colors.map((color, i) => (
                <span
                  key={i}
                  className="size-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;
