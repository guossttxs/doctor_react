var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: {
    bundle: [
      path.resolve(__dirname, 'app/doctorpage.js'),
      path.resolve(__dirname, 'app/patlistitem.js'),
      path.resolve(__dirname, 'app/patlist.js'),
      path.resolve(__dirname, 'app/patsearch.js'),
      path.resolve(__dirname, 'app/addDocDiag.js'),
      path.resolve(__dirname, 'app/addDocMed.js'),
      path.resolve(__dirname, 'app/docDiagList.js'),
      path.resolve(__dirname, 'app/myOrderList.js'),
      path.resolve(__dirname, 'app/orderinfo.js'),
      path.resolve(__dirname, 'app/doctorInfo.js'),
      path.resolve(__dirname, 'app/myInfo.js'),
      path.resolve(__dirname, 'app/typicalCase.js'),
      path.resolve(__dirname, 'app/pub.js'),
      path.resolve(__dirname, 'app/MedTemplate.js'),

    //path.resolve(__dirname, 'app/demo.js'),
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    loaders: [
    {
        test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
        exclude: [node_modules_dir],
        loader: 'babel-loader', // 加载模块 "babel" 是 "babel-loader" 的缩写
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(png|jpg)$/,
        exclude: [node_modules_dir],
        loader: 'url?limit=125000'
      },
      { 
        test: /.css$/, // Only .css files 
        exclude: [node_modules_dir],
        loader: 'style!css' // Run both loaders 
      }
      ]
    }
  };

  module.exports = config;
