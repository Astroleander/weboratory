const path = require("path");
const fs = require("fs");

const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");
const entryList = {
  output: (name) => `./${name}/index.html`,
  names: fs.readdirSync(path.resolve("src")),
  entries: {},
  HTMLWebpackPlugins: [],
  alias: {},
};
entryList.names = entryList.names.filter((name) => name.substring(0, 4) === "lab-");
entryList.names.forEach((name) => {
  entryList.entries[name] = [`./src/${name}/index.js`];
  entryList.alias[`@${name.substring(4)}`] = path.join(__dirname, "..", "src", name);
  entryList.HTMLWebpackPlugins.push(
    new HTMLWebpackPlugin({
      /** [ 👇特性 ] 在 .html 中使用 <%= [htmlWebpackPlugin.options.xxxx] %> 来使用自定义变量, 代价是不能使用 html-loader */
      /** [ 🥊竞争 ] html-loader 同样有自己的方案, 你可以选择任意的模板语法, 然后使用 preprocessor 来处理你的模板 @see https://webpack.js.org/loaders/html-loader/#templating*/
      name,
      id: name.replace(/^lab/, 'laboratory'),
      // template: `./src/${name}/index.html`,
      template: `./template.html`,
      filename: entryList.output(name),
      chunks: ["config", "general", `${name}`],
      hash: true,
      minify: { collapseInlineTagWhitespace: true },
    })
  );
});
module.exports = {
  /**
   * an absolute path, for resolving entry points and loaders from configuration.
   * @see https://webpack.js.org/configuration/entry-context/#context
   */
  context: path.resolve(__dirname, ".."),
  entry: {
    home: ["./src/home/index.js"],
    // graphics: ["./src/lab-graphics/index.js"],
    // algorithm: ["./src/lab-algorithm/index.js"],
    // scenario: ["./src/lab-scenario/index.js"],
    // framework: ["./src/lab-framework/index.js"],
    general: ["./config/weboratory.general.js"],
    config: ["./config/weboratory.config.js"],
    ...entryList.entries,
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
    extensions: [".js", ".json", ".vue", ".jsx"],
    alias: {
      "@": path.join(__dirname, "..", "src"),
      ...entryList.alias,
    },
    modules: [path.resolve(__dirname, "../src"), "../node_modules"],
  },
  plugins: [
    ...entryList.HTMLWebpackPlugins,
    new HTMLWebpackPlugin({
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
    new DefinePlugin({
      ENTRIES: JSON.stringify(entryList.names),
    })
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
      /** ts 文件绕行 ts-loader, 不进行 babel 转译 */
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
        exclude: /template\.html$/,
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
      /** less loader */
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
          },        ]
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
