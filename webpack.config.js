const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const Dotenv = require('dotenv-webpack')

module.exports = {
  resolve: {
    // 생략할 확장자
    extensions: ['.js', '.vue'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets')
    }
  },
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          'style-loader', // 해석된 부분을 삽입해서 사용
          'css-loader',// 먼저 로드됨 js에서 css를 해석하는 용도
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: '@import "~/scss/style";'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, //제외
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [ // static이 dist에 copy됨
        { from: 'static' }
      ]
    }),
    new VueLoaderPlugin(),
    new Dotenv()
  ],
  devServer: {
    host:'localhost',
    port: 8079,
    hot: true
  }
}
