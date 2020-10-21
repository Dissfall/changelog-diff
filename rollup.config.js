import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      banner: '#!/usr/bin/env node'
    }
  ],
  external: [...Object.keys(pkg.dependencies || {})],

  plugins: [
    typescript({
      typescript: require('typescript')
    })
  ]
};
