const merge = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require('./webpack.base.conf');

const config = merge(baseConfig, {
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        })
    ]
});

module.exports = config;
