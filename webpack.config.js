const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackDevServer = require('webpack-dev-server');

module.exports = {
	mode: 'development', 
	entry: [
		'./src/js/index.js',
		'./src/scss/app.scss',
		'./src/index.html'
	], // 번들링 포인트
	output: { // 배포 파일
		/** 번들 파일 저장 폴더
		 * __dirname : node에서 제공하는 node 파일의 경로를 담고 있는 특별한 변수
		 * path.join('a', 'b')
		 * path.join('a/', '/b')
		 * path.join('a', '/b')
		 * path.join('a/', 'b')
		 * 등 / 에 상관없이 join() 메서드로 경로 오류를 잡아줌
		 */
		path: path.join(__dirname, './dist'),
		filename: 'js/index.js'
	},
	devtool: "cheap-eval-source-map",
	devServer: {
		publicPath: "/dist/", // 절대 경로로 지정하고 앞뒤 '/' 꼭 지정
		port: 9000
	},
	module: {
		rules: [ // 어플리케이션을 위해 적어줄 로더들 배열
			{
				test: /\.(sa|sc|c)ss$/, // 로더가 적용될 파일 매칭을 위한 배열
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					// 'sass-loader?outputStyle=expanded'
				]
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: 'raw-loader'
			},
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, 'src/js')
				],
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							'@babel/plugin-transform-runtime',
							['@babel/plugin-transform-regenerator', {
								'regenerator': true
							}]
						]
					}
				}
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin({
			test: /^(?!.*(hot-update)).*/,
		}),
		new HtmlWebpackPlugin({
			// template: './pickly-template/subscribe.html'
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			// filename: "./subscribe.css"
			filename: './css/app.css'
		})
	]
};