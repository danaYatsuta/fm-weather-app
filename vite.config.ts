import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: "/fm-weather-app/",
    plugins: [
      react({
        babel: {
          plugins: command === "build" ? ["babel-plugin-react-compiler"] : [],
        },
      }),
      tailwindcss(),
    ],
  };
});
