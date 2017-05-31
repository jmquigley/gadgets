const BabiliPlugin = require("babili-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: [
		path.resolve(__dirname, 'node_modules', 'font-awesome', 'css', 'font-awesome.min.css'),
		path.resolve(__dirname, 'node_modules', 'css-ripple-effect', 'dist', 'ripple.min.css'),
		path.resolve(__dirname, 'lib', 'shared', 'ui.css'),
		path.resolve(__dirname, 'index.ts')
	],
	target: 'node',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		libraryTarget: "commonjs-module"
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.css']
	},
	resolveLoader: {
		modules: [path.join(__dirname, "node_modules")]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules|dist/,
				loader: 'babel-loader!awesome-typescript-loader'
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader?importLoaders=1',
						'postcss-loader'
					]
				})
			},
			{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff"
			},
			{
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff"
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader?limit=10000&mimetype=application/octet-stream"
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file-loader"
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader?limit=10000&mimetype=image/svg+xml"
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({filename: "styles.css"}),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify("production")
		}),
		new BabiliPlugin()
	]
};
