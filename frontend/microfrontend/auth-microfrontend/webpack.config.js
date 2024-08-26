const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');

module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:3001/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3001,
    static: path.join(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
              noquotes: true,
            },
          },
          'svgo-loader',
        ],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "auth_microfrontend",
      filename: "remoteEntry.js",
      exposes: {
        './Register': './src/components/Register',
        './Login': './src/components/Login',
      },
      shared: { 
        "react": { singleton: true }, 
        "react-dom": { singleton: true }, 
        "react-router-dom": { singleton: true } 
      },
      }),
      new HtmlWebPackPlugin({
          template: './public/index.html',
      })
  ],
});
