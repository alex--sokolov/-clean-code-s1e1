const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devServer = (isDev) => !isDev ? {} : {
    devServer: {
        open: true,
        hot: true,
        liveReload: true,
        port: 8080
    }
};

module.exports = ({develop}) => ({
    mode: develop ? 'development' : 'production',
    devtool: develop ? 'inline-source-map' : false,
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext]',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            // {
            //     type: 'javascript/auto',
            //     test: /\.json$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             include: [path.resolve(__dirname, 'src')],
            //             options: {
            //                 name: '[name].[ext]'
            //             }
            //         }
            //     ]
            // },
            // {
            //     test: /\.json$/,
            //     use: 'json-loader',
            //     exclude: /node_modules/,
            // },
            {
                test: /\.[tj]s$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(?:mp3|aac|ogg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                'src/css/vars.scss',
                                'src/css/mixins.scss'
                            ]
                        }
                    }

                ]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            favicon: './src/assets/favicon.ico'
        }),
        new CopyPlugin({
            patterns: [{
                from: 'data/img/*.jpg',
                to: '',
                noErrorOnMissing: true,
            }],
        }),
        new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    ...devServer(develop)


});
