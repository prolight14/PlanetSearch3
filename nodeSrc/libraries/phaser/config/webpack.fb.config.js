'use strict';
var webpack = require('webpack');
var exec = require('child_process').exec;
module.exports = {
    mode: 'development',
    context: __dirname + "/../src/",
    entry: {
        phaser: './phaser.js'
    },
    output: {
        path: __dirname + "/../build/",
        filename: 'phaser-facebook-instant-games.js',
        library: 'Phaser',
        libraryTarget: 'umd',
        sourceMapFilename: '[file].map',
        devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',
        devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]',
        umdNamedDefine: true
    },
    performance: { hints: false },
    plugins: [
        new webpack.DefinePlugin({
            "typeof CANVAS_RENDERER": JSON.stringify(true),
            "typeof WEBGL_RENDERER": JSON.stringify(true),
            "typeof EXPERIMENTAL": JSON.stringify(false),
            "typeof PLUGIN_3D": JSON.stringify(false),
            "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
            "typeof PLUGIN_FBINSTANT": JSON.stringify(true),
            "typeof FEATURE_SOUND": JSON.stringify(true)
        }),
        {
            apply: function (compiler) {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', function (compilation) {
                    exec('node scripts/copy-to-examples-fb.js', function (err, stdout, stderr) {
                        if (stdout)
                            process.stdout.write(stdout);
                        if (stderr)
                            process.stderr.write(stderr);
                    });
                });
            }
        }
    ],
    devtool: 'source-map'
};
//# sourceMappingURL=webpack.fb.config.js.map