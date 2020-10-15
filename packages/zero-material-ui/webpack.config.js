const path = require('path');
const package = require('./package.json');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(path.join(__dirname, '.', 'dist')),
    filename: 'index.js',
    library: '0soft/zero-material-ui',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(tsx|ts)?$/,
        use: [
          'babel-loader',
          'ts-loader',
          // 'react-docgen-typescript-loader'
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules')],
  },
  externals: {
    'next/link': 'next/link',
    ...Object.keys(package.peerDependencies).reduce((acc, k) => {
      return { ...acc, [k]: k };
    }, {}),
  },
};
