import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import codeTitle from "remark-code-title";
import { readFileSync } from "node:fs";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap()],
  experimental: {
    assets: true,
  },
  image: {
    service: sharpImageService(),
  },
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  site: "https://www.kevinzunigacuellar.com",
  markdown: {
    remarkPlugins: [codeTitle],
    shikiConfig: {
      theme: "dark-plus",
    },
  },
  vite: {
    plugins: [rawFonts([".ttf", ".woff"])],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});

// vite plugin to import fonts
function rawFonts(ext) {
  return {
    name: "vite-plugin-raw-fonts",
    transform(_, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }
    },
  };
}
