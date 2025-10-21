import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { generate } from "@mewhhaha/ruwuter/fs-routes";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { PluginOption } from "vite";

export default defineConfig({
  plugins: [cloudflare(), tailwindcss(), ruwuter()],
  build: {
    target: "esnext",
    rollupOptions: {
      experimental: {
        resolveNewUrlToAsset: true,
      },
      resolve: {
        conditionNames: ["import"],
      },
      moduleTypes: {
        ".jpg": "dataurl",
        ".jpeg": "dataurl",
        ".png": "dataurl",
        ".gif": "dataurl",
        ".svg": "dataurl",
        ".ico": "dataurl",
      },
    },
  },
});

/**
 * Combined Vite plugin for @mewhhaha/ruwuter that:
 * - Watches for route file changes and regenerates routes
 * - Fixes import.meta.url references in the build output
 */
function ruwuter(): PluginOption {
  const appFolder = "app";

  return {
    name: "vite-plugin-ruwuter",
    async configResolved() {
      await generate(appFolder);
    },

    // Development: Generate and watch for route changes
    configureServer(server) {
      // Watch for route structure changes and regenerate routes
      const routesDir = path.resolve(
        path.join(import.meta.dirname, appFolder, "routes"),
      );
      server.watcher.on("all", (event, file) => {
        // Only react to add/remove events under app/routes
        if (
          event !== "add" &&
          event !== "unlink" &&
          event !== "addDir" &&
          event !== "unlinkDir"
        )
          return;

        const resolvedFilePath = path.resolve(file);
        if (!resolvedFilePath.startsWith(routesDir)) return;

        // Ignore edits to the generated file itself
        if (
          resolvedFilePath ===
          path.resolve(path.join(import.meta.dirname, appFolder, "routes.mts"))
        )
          return;

        generate(appFolder);
      });
    },

    // Build: Fix import.meta.url references
    renderChunk(code) {
      // Replace import.meta.url with a static string
      // This prevents runtime errors when import.meta.url is undefined
      return code.replaceAll(/import\.meta\.url/g, '"file://"');
    },
  };
}
