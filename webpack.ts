import * as path from "path";
import * as Webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as WebpackServe from "webpack-serve";

const buildDir = path.resolve(__dirname, "dist");
const cmd = process.argv[2];

const config: Webpack.Configuration = {
  entry: "./src/index.ts",
  mode: cmd === "build" ? "production" : "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  // devServer: {
  //   contentBase: buildDir
  // },
  output: {
    filename: "[name].bundle.js",
    path: buildDir
  },
  plugins: [new CleanWebpackPlugin([buildDir]), new HtmlWebpackPlugin({})]
};

console.log(cmd);
if (cmd === "build") {
  const compiler = Webpack(config);
  compiler.run(() => {});
} else if (cmd === "watch") {
  WebpackServe({}, { config }).then(res => {});
  // compiler.watch({}, () => {
  //   console.log("building");
  // });
}
