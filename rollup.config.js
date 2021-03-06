import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"
import external from "rollup-plugin-peer-deps-external"
import postcss from "rollup-plugin-postcss"
import resolve from "rollup-plugin-node-resolve"
import dts from "rollup-plugin-dts"
import url from "rollup-plugin-url"
import svgr from "@svgr/rollup"

import pkg from "./package.json"

const config = [
  {
    input: "src/index.js",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: [
      external(),
      postcss({
        modules: false,
      }),
      url(),
      svgr(),
      babel({
        exclude: "node_modules/**",
        plugins: ["external-helpers"],
      }),
      resolve(),
      commonjs({
        namedExports: { "react-konva": ["Stage", "Layer", "Image"] },
      }),
    ],
  },
  {
    input: "types.d.ts",
    output: [{ file: pkg.types, format: "es" }],
    plugins: [dts()],
  },
]

export default config
