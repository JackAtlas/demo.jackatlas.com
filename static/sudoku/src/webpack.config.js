module.exports = {
    mode: 'none',
    entry: {
        index: './js/index'
    },
    output: {
        filename: '[name].js'
    },
    devtool: 'sourcemap',
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    'ts-loader'
                ]
            }
        ]
    }
}