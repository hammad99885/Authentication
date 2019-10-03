// var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [`${__dirname}/src/index.jsx`, `${__dirname}/src/css/styles.css`],
  output: {
    path: `${__dirname}/dist/js`,
    filename: "bundle.js"
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
            plugins: [
              "transform-object-rest-spread",
              "transform-class-properties"
            ]
          }
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["react", "env"],
            plugins: [
              "transform-object-rest-spread",
              "transform-class-properties"
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                url: false
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                url: false
              }
            },
            "sass-loader"
          ]
        })
      }
      // {
      //  test: /\.scss$/,
      //  use: [
      //    "style-loader",
      //    {
      //      loader: "css-loader",
      //      options: {
      //        url: false
      //      }
      //    },
      //    "sass-loader"
      //  ]
      // },
      // {
      //  test: /\.css$/,
      //  use: [
      //    "style-loader",
      //    {
      //      loader: "css-loader",
      //      options: {
      //        url: false
      //      }
      //    }
      //  ]
      // }
    ]
  },
  devtool: "source-map",
  resolve: { extensions: [".js", ".jsx"] },
  node: {
    fs: "empty",
    net: "empty"
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "../css/styles.css"
    })
  ]
};
