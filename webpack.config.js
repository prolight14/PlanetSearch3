"use strict";

// Modified from CartesianSystem

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