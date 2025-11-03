import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
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
