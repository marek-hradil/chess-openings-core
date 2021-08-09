import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/package/index.ts',
  output: {
    file: './build/index.js',
    format: 'esm',
  },
  plugins: [
    nodePolyfills(),
    nodeResolve({ browser: true, extensions: ['ts'] }),
    typescript({ tsconfig: './tsconfig.json', module: 'esnext' }),
    terser(),
    filesize(),
  ],
}
