import * as fs from "fs";
import * as path from "path";

import * as Webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as WebpackServe from "webpack-serve";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";

const buildDir = path.resolve(__dirname, "dist");
const cmd = process.argv[2];
const devMode = cmd === "watch";

const pagesDir = path.join(__dirname, "src", "pages");
const pages = fs.readdirSync(pagesDir).map(page => {
  const files = fs
    .readdirSync(path.join(pagesDir, page))
    .map(file => path.join(pagesDir, page, file));

  return {
    page,
    template: files.filter(file => /\.(html|hbs)$/.test(file))[0],
    entry: files.filter(file => /\.(j|t)s$/.test(file))[0]
  };
});

const htmlPages = pages.map(page => {
  return new HtmlWebpackPlugin({
    template: page.template,
    js: ["index", page.entry],
    filename: `${page.page}.html`
  });
});

const entry = pages.reduce(
  (entry, page) => {
    if (!page.entry) {
      return entry;
    }
    entry[page.page] = page.entry;
    return entry;
  },
  { index: path.join(__dirname, "src", "index.ts") } as {
    [key: string]: string;
  }
);

const config: Webpack.Configuration = {
  entry,
  target: "web",
  mode: devMode ? "development" : "production",
  devtool: devMode ? "cheap-module-source-map" : false,
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        query: {
          partialDirs: [path.join(__dirname, "src", "partials")]
        }
      },
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
              {
                loader: devMode
                  ? "style-loader"
                  : (MiniCssExtractPlugin.loader as any)
              },
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

      // This needs to be the last loader
      // {
      //   exclude: [/\.(js|ts)$/, /\.html$/, /\.json$/],
      //   loader: "file-loader",
      //   options: {
      //     name: "static/media/[name].[hash:8].[ext]"
      //   }
      // }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: path.join(
      "static",
      "js",
      devMode ? "[name].bundle.js" : "[name].bundle.js"
    ),
    chunkFilename: devMode ? "[id].js" : "[id].[hash].js",
    path: buildDir
  },
  plugins: [
    new CleanWebpackPlugin([buildDir]),
    new MiniCssExtractPlugin({
      filename: path.join(
        "static",
        "css",
        devMode ? "[name].css" : "[name].[hash].css"
      ),
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "pages", "home", "index.hbs"),
      title: "Jared Rickert's Portfolio",
      js: ["index", "home"],
      filename: "index.html"
    })
  ].concat(htmlPages),
  node: {
    fs: "empty"
  }
};

if (cmd === "build") {
  const compiler = Webpack(config);
  compiler.run(() => {});
} else if (cmd === "watch") {
  WebpackServe({}, { config }).then(res => {});
}
