require('dotenv').config()

const path = require('path')
const autoprefixer = require('autoprefixer')
const { browserslist } = require('./package.json')
const Dotenv = require('dotenv-webpack')
const base = process.cwd()

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.resolve(base, 'src/js/index.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(base, 'dist/js'),
    publicPath: process.env.WEB_BASE + '/js/'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(base, 'src')
        ],
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              targets: {
                browsers: browserslist
              }
            }]
          ]
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
        test: /\.vue?$/,
        include: [
          path.resolve(base, 'src')
        ],
        loader: 'vue-loader',
        options: {
          loaders: {
            js: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['env', {
                    targets: {
                      browsers: browserslist
                    }
                  }]
                ]
              }
            },
            sass: {
              loader: 'style-loader!css-loader?url=false!sass-loader?indentedSyntax=true'
            }
          },
          postcss: [autoprefixer()]
        }
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: path.join(base, '.env')
    })
  ],
  resolve: {
    alias: {
      vue$: path.resolve(base, 'node_modules/vue/dist/vue.esm.js'),
      router$: path.resolve(base, 'node_modules/vue-router/dist/vue-router.esm.js'),
      '@': 'src'
    }
  }
}
