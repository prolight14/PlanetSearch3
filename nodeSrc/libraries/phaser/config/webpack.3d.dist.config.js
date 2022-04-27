'use strict';
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
module.exports = {
    mode: 'production',
    context: __dirname + "/../src/",
    entry: {
        phaser: './phaser.js',
        'phaser.min': './phaser.js'
    },
    output: {
        path: __dirname + "/../dist/",
        filename: '[name]3d.js',
        library: 'Phaser',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    performance: { hints: false },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                include: /\.min\.js$/,
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    compress: true,
                    ie8: false,
                    ecma: 5,
                    output: { comments: false },
                    warnings: false
                },
                warningsFilter: function () { return false; }
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "typeof CANVAS_RENDERER": JSON.stringify(true),
            "typeof WEBGL_RENDERER": JSON.stringify(true),
            "typeof EXPERIMENTAL": JSON.stringify(false),
            "typeof PLUGIN_3D": JSON.stringify(true),
            "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
            "typeof PLUGIN_FBINSTANT": JSON.stringify(false),
            "typeof FEATURE_SOUND": JSON.stringify(true)
        }),
        new CleanWebpackPlugin()
    ]
};
//# sourceMappingURL=webpack.3d.dist.config.js.map