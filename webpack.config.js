"use strict";
// babel
require("babel-register");
// node
const path = require("path");
// webpack
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// setup
const LIMIT = 8192;
// input
const INDEX = "index.js";
// output
const BUNDLE = "bundle.js";
const CSS = "app.css";
// folders
const APP = "app";
const BUILD = "dist";

// config
const loaders = [
    { test: /\.js$/, loader: "babel", exclude: /node_modules/},
    { test: /\.styl$/, loader: ExtractTextPlugin.extract("style", "css!stylus") },
    { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css") },
    { test: /\.html$/, loader: "file?name=[name].[ext]" },
    { test: /\.ico$/i, loader: "file?name=[name].[ext]" },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: `url?limit=${LIMIT}&name=images/[hash].[ext]!image-webpack`
    },
    { test: /\.(eot|ttf|woff2|woff)$/i, loader: `url?limit=${LIMIT}&name=fonts/[hash].[ext]` }
];

const plugins = [
    new ExtractTextPlugin(CSS),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
];

const resolve = {
    root: [
        path.resolve(APP)
    ],
    alias: {
        "bootstrap-css": "bootstrap/dist/css/bootstrap.css",
        "bootstrap-theme": "bootstrap/dist/css/bootstrap-theme.css"
    }
};

// webpack
module.exports = {

    entry: INDEX,
    devtool: "source-map",
    output: {
        path: BUILD,
        filename: BUNDLE
    },
    module: {
        loaders: loaders
    },
    resolve,
    plugins

};
