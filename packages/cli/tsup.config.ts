import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/bin.ts"],
  format: ["esm"],
  target: "node20",
  outDir: "dist",
  clean: true,
  dts: false,
  banner: { js: "#!/usr/bin/env node" },
  external: ["chokidar", "@soltaoverbo/core"],
  esbuildOptions(options) {
    // Keep non-ASCII chars (ã, ç, etc.) as raw UTF-8 in the bundle
    // instead of escaping them as \xNN sequences
    options.charset = "utf8"
  },
})
