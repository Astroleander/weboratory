const path = require('path');

const HTMLWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  /**
   * an absolute path, for resolving entry points and loaders from configuration.
   * @see https://webpack.js.org/configuration/entry-context/#context
   */
  context: path.resolve(__dirname, '..'),

  entry: {
    dashboard: ['./src/dashboard/index.js'],
    graphics: ['./src/lab-graphics/index.js'],
    general: ['./config/weboratory.general.js'],
    config: ['./config/weboratory.config.js'],
    /**
     * 👇 NEEDS Webpack 5
     */
    // graphics: () => new Promise(r => r(['./src/lab-graphics/index.js']))
    /**
     * ⛔ 下面这种方法会使数个 js 文件视为同一个 chunk, 别这么干
     */
    // dashboard: ['./src/dashboard/index.js', './config/weboratory.general.js'],
  },
  output: {
    filename: '[name].bundle.[hash:6].js',
    chunkFilename: 'chunk.[id].[hash:6].js',
    path: path.resolve(__dirname, '../dist'),
    pathinfo: true
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.jsx'],
    alias: {
      '@': path.join(__dirname, '..', 'src'),
      '@graphics': path.join(__dirname, '..', 'src', 'lab-graphics'),
    },
    modules: [path.resolve(__dirname, '../src'), '../node_modules']
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: './src/lab-graphics/index.html',
      filename: './lab-graphics/index.html',
      chunks: [ 'config', 'general', 'graphics'],
      hash: true,
      minify: { collapseInlineTagWhitespace: true }
    }),
    new HTMLWebPackPlugin({
      template: './src/dashboard/index.html',
      filename: './index.html',
      chunks: [ 'config', 'general', 'dashboard'],
      hash: true,
      minify: { collapseInlineTagWhitespace: true }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:6].css',
      chunkFilename: 'chunk.css.[id].[hash:6].css'
    }),
    new VueLoaderPlugin(),
    new BundleAnalyzerPlugin({
      analyzerPort: 19000
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: { minimize: false }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {}
          }
        ]
      },
      /**
       * @date 2019/12/12
       * vue-svg-loader 会对 svg 进行压缩和优化，并不适用于对 svg 要进行深度操作的场合,
       * 所以我们采用另一个 svg 类库
       */
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  }
};