import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/Soujanya-Hegde/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
});
