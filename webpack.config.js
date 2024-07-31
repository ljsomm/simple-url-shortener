const NodemonPlugin = require('nodemon-webpack-plugin');
const path = require('path');

module.exports = {
    entry: "./src/main",
    target: "node",
    mode: process.env.ENV || "development",
    resolve: {
        extensions: [".js", ".ts"]
    },
    module: {
        rules: [
            {
                use: "ts-loader",
                test: /\.ts$/
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    plugins: [
        new NodemonPlugin()
    ],
    optimization: {
        minimize: !process.env.DEBUG
    }
}