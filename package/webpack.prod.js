const path = require("path");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "menu-drop.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
        library: "MenuDrop",
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    },
    devtool: 'source-map',
});