import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/countdown.ts',
  output: [
    {
      file: 'dist/countdown.esm.js',
      format: 'es'
    },
    {
      file: 'dist/countdown.cjs.js',
      format: 'cjs',
      exports: 'default'
    },
    {
      file: 'dist/countdown.umd.js',
      name: 'CountDown',
      format: 'umd'
    },
    {
      file: 'dist/countdown.umd.min.js',
      name: 'CountDown',
      format: 'umd',
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [nodeResolve(), commonjs(), typescript({ compilerOptions: { declarationDir: './types' } })]
}
