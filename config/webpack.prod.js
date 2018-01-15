var webpack = require ('webpack')
var path = require ('path')
var fs = require ('fs')
var config = {
    entry: './source/App.ts',
    target: 'node',
    devtool: 'eval-source-map',
    output: {
        path: path.join (__dirname, '../compiled'),
        filename: 'server.js'
    },
    resolve: {
        extensions: [
            '.webpack.js', 
            '.ts', 
            '.tsx', 
            '.js'
        ],
        modules: [
            path.resolve ('./source'),
            path.resolve ('./node_modules')
        ]
    },
    module: {
        loaders: [
            { 
              test: /\.tsx?$/, 
              loader: 'ts-loader' }
        ]
    }
}

module.exports = config