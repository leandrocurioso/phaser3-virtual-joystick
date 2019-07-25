const Path = require("path");
const PathToPhaser = Path.join(__dirname, "/node_modules/phaser/");
const Phaser = Path.join(PathToPhaser, "dist/phaser.js");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  target: "web",
  entry: "./src/boot.js",
  output: {
    filename: "bundle.min.js",
    path: Path.resolve(__dirname, "public", "js"),
    publicPath: Path.resolve(__dirname, "/js/")
  },
  optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        ie8: true,
        safari10: true,
        warnings: false,
        mangle: true,
        output: {
          comments: false
        }
      }
    })],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"]
            }
        }
      }  
    ]
  },
  devServer: {
    contentBase: Path.resolve(__dirname, "public"),
    publicPath: Path.resolve(__dirname, "/js/"),
    host: "0.0.0.0",
    port: 3000,
    open: true,
    watchContentBase: true,
    compress: true
  },
  resolve: {
    extensions: [".js"],
    alias: {
      phaser: Phaser
    }
  }
};
