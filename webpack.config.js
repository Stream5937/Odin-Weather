const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  cache:false,
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'Weather Forecast',
        watchFiles: ['./src/*.*', './src/index.js', './src/index.html', 'public/**/*'],
        inject:false,   //stops double loading
    }),
  ],
  output: {
    //NOT using  .[contenthash]  to provide unique bundle name each time thus avoid build from cache
    //Not working filename: 'bundle.[contenthash].js',
    //Not working filename: '[name].[contenthash].js',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean:true,
  },
  optimization:{
    //runtimeChunk:'single',
    //error: [webpack-dev-middleware] Error: Conflict: Multiple chunks emit assets to the same filename bundle.js (chunks main and runtime)
    /*stackoverflow answer:
    to work had to change filename: "static/js/bundle.js" to filename: "static/js/[name].js"
    output: {
        path: undefined,
        publicPath: "/",
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
    }  */
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },
  /* dealing with caching NOT working yet!
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'deterministic',       //  'hashed',
    splitChunks: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
            },
        },
    },
},
*/
};
