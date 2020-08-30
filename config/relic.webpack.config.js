/**
 * @author Astroleander
 * @date 2020/05/29
 *
 * 我决定采用自动化的方式分析目录以构建所需的 @entry , @alias, @HTMLWebPackPlugin ,
 * 为了方便后来者学习，我留下最后版本的手写版本
 * 
 * @date 2020/06/22
 * 此页面的意义是展示“如果我们手写一个 webpack 配置表，它看起来会是怎样的”
 * 并非是 webpack 配置的最佳实践
 * 此外，现在在用的自动化版本也仅仅是个人的一种尝试，成熟的实现务必参考各种 CLI 和 create-xxx
 */
const path = require("path");

const HTMLWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  /**
   * an absolute path, for resolving entry points and loaders from configuration.
   * @see https://webpack.js.org/configuration/entry-context/#context
   */
  context: path.resolve(__dirname, ".."),

  entry: {
    home: ["./src/home/index.js"],
    graphics: ["./src/lab-graphics/index.js"],
    algorithm: ["./src/lab-algorithm/index.js"],
    scenario: ["./src/lab-scenario/index.js"],
    framework: ["./src/lab-framework/index.js"],
    general: ["./config/weboratory.general.js"],
    config: ["./config/weboratory.config.js"],
    /**
     * 👇 NEEDS Webpack 5
     */
    // graphics: () => new Promise(r => r(['./src/lab-graphics/index.js']))
    /**
     * [ 🔀 branch ] 下面这种方法会使数个 js 文件视为同一个 chunk, 别这么干, 我们是在学习, 不是在优化
     */
    // home: ['./src/home/index.js', './config/weboratory.general.js'],
  },
  output: {
    filename: "[name].bundle.[hash:6].js",
    chunkFilename: "chunk.[id].[hash:6].js",
    path: path.resolve(__dirname, "../dist"),
    pathinfo: true,
  },
  resolve: {
    extensions: [".js", ".json", ".vue", ".jsx", ".svelte"],
    alias: {
      "@": path.join(__dirname, "..", "src"),
      "@graphics": path.join(__dirname, "..", "src", "lab-graphics"),
      "@algorithm": path.join(__dirname, "..", "src", "lab-algorithm"),
      "@framework": path.join(__dirname, "..", "src", "lab-framework"),
      "@scenario": path.join(__dirname, "..", "src", "lab-scenario"),
    },
    modules: [path.resolve(__dirname, "../src"), "../node_modules"],
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: "./src/lab-graphics/index.html",
      filename: "./lab-graphics/index.html",
      chunks: ["config", "general", "graphics"],
      hash: true,
      minify: { collapseInlineTagWhitespace: true },
    }),
    new HTMLWebPackPlugin({
      template: "./src/lab-algorithm/index.html",
      filename: "./lab-algorithm/index.html",
      chunks: ["config", "general", "algorithm"],
      hash: true,
      minify: { collapseInlineTagWhitespace: true },
    }),
    new HTMLWebPackPlugin({
      template: "./src/lab-scenario/index.html",
      filename: "./lab-scenario/index.html",
      chunks: ["config", "general", "scenario"],
      hash: true,
      minify: {
        collapseInlineTagWhitespace: true,
      },
    }),
    new HTMLWebPackPlugin({
      template: "./src/lab-framework/index.html",
      filename: "./lab-framework/index.html",
      chunks: ["config", "general", "framework"],
      hash: true,
      minify: {
        collapseInlineTagWhitespace: true,
      },
    }),
    new HTMLWebPackPlugin({
      template: "./src/home/index.html",
      filename: "./index.html",
      chunks: ["config", "general", "home"],
      hash: true,
      minify: { collapseInlineTagWhitespace: true },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:6].css",
      chunkFilename: "chunk.css.[id].[hash:6].css",
    }),
    new VueLoaderPlugin(),
    new BundleAnalyzerPlugin({
      analyzerPort: 19000,
    }),
  ],
  module: {
    rules: [
      /** jsx loader */
      {
        test: /\.jsx?$/, // Match both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      /** tsx loader */
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      /** vue loader */
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      /** html loader */
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: { minimize: false },
        },
      },
      /** css loader */
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      /** sass loader */
      {
        test: /\.s[a|c]ss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      /** img loader */
      {
        test: /\.(png|jpg|gif|obj)$/,
        use: [
          {
            loader: "url-loader",
            options: {},
          },
        ],
      },
      /**
       * svg loader
       * @date 2019/12/12
       * vue-svg-loader 会对 svg 进行压缩和优化，并不适用于对 svg 要进行深度操作的场合,
       * 所以我们采用另一个 svg 类库
       */
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
      /** font loader */
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
      /** yaml loader */
      {
        test: /\.ya?ml/,
        use: "js-yaml-loader",
      },
    ],
  },
};
