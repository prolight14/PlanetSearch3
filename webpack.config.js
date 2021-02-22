module.exports = {
    entry: "./src/index.ts",
    devtool: "source-map",
    mode: "development",
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