export default defineConfig({
  integrations: [tailwind(), react()],
  output: "server",
  adapter: cloudflareAdapter()
});
