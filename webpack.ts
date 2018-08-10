import * as path from "path";
import * as Webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as WebpackServe from "webpack-serve";

const buildDir = path.resolve(__dirname, "dist");
const cmd = process.argv[2];

const config: Webpack.Configuration = {
  target: "web",
  entry: "./src/index.ts",
  mode: cmd === "build" ? "production" : "development",
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.ts/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]"
            }
          },
          {
            test: /\.ts/,
            use: [
              {
                loader: "ts-loader",
                options: {
                  transpileOnly: true
                }
              }
            ]
          },
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader", options: { importLoaders: 1 } },
              {
                loader: "postcss-loader",
                options: {
                  ident: "postcss",
                  plugins: () => [require("precss"), require("autoprefixer")]
                }
              }
            ]
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "[name].bundle.js",
    path: buildDir
  },
  plugins: [new CleanWebpackPlugin([buildDir]), new HtmlWebpackPlugin({})]
};

if (cmd === "build") {
  const compiler = Webpack(config);
  compiler.run(() => {});
} else if (cmd === "watch") {
  WebpackServe({}, { config }).then(res => {});
}
