// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "./lib/index.js",
    path: __dirname,
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, 'sample'],
        loader: "ts-loader"
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new CheckerPlugin()
  ]
};
