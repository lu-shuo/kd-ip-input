import pkg from './package.json'
import { terser } from 'rollup-plugin-terser' // 适用于ES6 +的JavaScript解析器，mangler和压缩器工具包.uglify.js只适合于es5
import resolve from '@rollup/plugin-node-resolve' // 告诉 Rollup 如何查找外部模块
import commonjs from '@rollup/plugin-commonjs' // 将CommonJS模块转换为 ES2015 供 Rollup 处理
import buble from '@rollup/plugin-buble' // 简化版babel，仅能编译简单ES5+语法，速度更快
import babel from '@rollup/plugin-babel'; // 导入babel
import vue from 'rollup-plugin-vue' // 处理vue文件
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'

let TARGET = process.env.TARGET

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} Darren Lu
 * @license ISC
 */`

const fileName = pkg.name; // 生成文件名

const builds = {
  'dev-esm': {
    input: 'src/index.js',
    file: `dist/${fileName}.esm.js`,
    format: 'es',
    env: 'development'
  },
  'dev-cjs': {
    input: 'src/index.js',
    file: `dist/${fileName}.cjs.js`,
    format: 'cjs',
    env: 'development'
  },
  'dev-umd': {
    input: 'src/index.js',
    file: `dist/${fileName}.js`,
    format: 'umd',
    env: 'development'
  },
  'prod-esm': {
    input: 'src/index.js',
    file: `dist/${fileName}.esm.min.js`,
    format: 'es',
    minify: true,
    env: 'production'
  },
  'prod-cjs': {
    input: 'src/index.js',
    file: `dist/${fileName}.cjs.min.js`,
    format: 'cjs',
    minify: true,
    env: 'production'
  },
  'prod-umd': {
    input: 'src/index.js',
    file: `dist/${fileName}.min.js`,
    format: 'umd',
    minify: true,
    env: 'production',
    name: 'kdIpInput'
  }
}

function genConfig(target) {
  const opts = builds[target]
  const c = {
    input: opts.input,
    output: {
      banner,
      file: opts.file, // *要写入的文件。也可用于生成 sourcemaps，如果适用
      format: opts.format // *包格式
    },
    plugins: [
      resolve(),
      commonjs(), // 必须防止在babel之前
      vue({ css: false }), // css: false 将<style>块转换为导入语句
      postcss({ extract: false, plugins: [autoprefixer] }),
    ]
  }

  if (['umd', 'iife'].includes(opts.format)) {
    c.output.name = opts.name || '__kdIpInput' // *代表你的 iife/umd 包，同一页上的其他脚本可以访问它
  }

  // 默认babel转译，可选buble 
  if (opts.transpile !== false) {
    if (opts.useBuble) {
      c.plugins.push(buble())
    } else {
      c.plugins.push(
        babel({
          babelHelpers: 'runtime', // 使plugin-transform-runtime生效
          exclude: "node_modules/**",
        })
      )
    }
  }
  // 压缩
  if (opts.env === 'production' || opts.minify) {
    c.plugins.push(terser({ module: opts.format === 'es' }))
  }

  return c
}

export default TARGET ? genConfig(TARGET) : Object.keys(builds).map(genConfig)