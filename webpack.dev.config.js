const path = require('path');
module.exports = {
  entry: {
    client: './src/client.js',
    bundle: './src/bundle.js'
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: "[name].js"
  },
  mode: "development",
  module: {
    rules: [
      { test: /\.js$/, 
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-react']
        }
      },
      {
        test: /\.css$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].css',
                    outputPath: '../views/assets/'
                }
            },
            {
                loader: 'extract-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    url: false,
                    minimize: true,
                    sourceMap: true
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: function() {
                        return [
                            require('precss'),
                            require('autoprefixer')
                        ];
                    }
                }
            },
            {
                loader: 'sass-loader'
            }
        ]
      }
    ]
  }
}
