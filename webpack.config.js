var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:5020',
        'webpack/hot/only-dev-server',
        './scripts/index.tsx'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.(s?)css$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.ts(x?)$/,
                exclude: ['node_modules', './scripts/redux-devtools'],
                loader: 'react-hot'
            },
            {
                test: /\.ts(x?)$/,
                exclude: ['node_modules', './scripts/redux-devtools'],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }
        ],
        include: path.join(__dirname, 'src')
    }
};
