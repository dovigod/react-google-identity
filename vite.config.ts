import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "React-Google-Identity",
      fileName: "index",
      formats: ["cjs", "umd", "es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});
