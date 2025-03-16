import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare"; // Ensure correct import

export default defineConfig({
  integrations: [tailwind(), react()],
  output: "server",
  adapter: cloudflare() // Ensure this is a function
});
