const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

// 源文件路径
const source = 'static/biz';
// const dist = 'static/build';

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: {
        index: './static/biz/index.js'
    },
    output: {
        filename: '[name].js',
        path: resolve('static/build')
    },
    resolve: {
        extensions: ['.css', '.js', '.vue'],
        // fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            vue: 'vue/dist/vue'
        }
    },
    externals: {
        // vue: 'Vue'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve(source)]
            },
            {
                test: /\.less$/,
                include: [resolve(source)],
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'less-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.css$/,
                //include: [resolve('static')],
                use: ExtractTextPlugin.extract({
                    use: ['css-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|jpe?gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            },
            {
                test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    name: '[name].[hash:7].[ext]'
                }
            }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new LodashModuleReplacementPlugin({
            collections: true
        }),
        new FriendlyErrorsPlugin()
    ]
};
