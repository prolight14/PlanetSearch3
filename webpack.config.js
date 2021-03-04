"use strict";

// Modified from CartesianSystem

var debugging = !true;

if(!debugging)
{
    module.exports = {

        context: `${__dirname}/nodeSrc/`,

        devtool: "source-map",

        mode: "development",
        // mode: "production",

        entry: {
            PlanetSearch3: "./index.js",
        },

        output: {
            path: `${__dirname}/dist/`,
            filename: "[name].js",
            library: "PlanetSearch3",
            sourceMapFilename: '[file].map',
        },
    };
}
else
{
    // for when I need to debug things
    module.exports = {
        entry: "./src/index.ts",
        devtool: "source-map",

        mode: "development",
        // mode: "production",

        output: {
            filename: "./PlanetSearch3.js"
        },
        resolve: {
            extensions: [".ts"]
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: "ts-loader"
                }
            ]
        }
    };
}