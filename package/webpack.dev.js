const path = require("path");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { library } = require("webpack");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "simple-carousel.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
        library: "SimpleCarousel",
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    },
    devtool: "eval-source-map",
});