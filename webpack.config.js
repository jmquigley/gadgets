const {getMode, isProduction} = require('util.env');
const {leader} = require('util.leader');

const CircularDependencyPlugin = require('circular-dependency-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const NullPlugin = require('webpack-null-plugin');
const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

let MinifyPlugin = null;
if (isProduction()) {
	MinifyPlugin = require("babel-minify-webpack-plugin");
}

const banner = new webpack.BannerPlugin({
	banner:
		'Gadgets v' + pkg.version + '\n' +
		'Mode: ' + getMode() + '\n' +
		'https://www.npmjs.com/package/gadgets\n' +
		'Copyright (c) 2017, James Quigley\n',
	entryOnly: true
});

leader(banner.banner);

const constants = new webpack.DefinePlugin({
	GADGETS_VERSION: JSON.stringify(pkg.version),
	NODE_ENV: process.env.NODE_ENV
});

module.exports = {
	entry: [
		path.resolve(__dirname, 'node_modules', 'font-awesome', 'css', 'font-awesome.min.css'),
		path.resolve(__dirname, 'node_modules', 'css-ripple-effect', 'dist', 'ripple.min.css'),
		path.resolve(__dirname, 'node_modules', 'react-select', 'dist', 'react-select.css'),
		path.resolve(__dirname, 'node_modules', 'quill', 'dist', 'quill.core.css'),
		path.resolve(__dirname, 'node_modules', 'quill', 'dist', 'quill.bubble.css'),
		path.resolve(__dirname, 'node_modules', 'quill', 'dist', 'quill.snow.css'),
		path.resolve(__dirname, 'node_modules', 'quill-markup', 'public', 'styles.css'),
		path.resolve(__dirname, 'index.ts')
	],
	target: 'node',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		libraryTarget: "umd"
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.css']
	},
	externals: {
		react: {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		},
		'react-dom': {
			root: 'ReactDOM',
			commonjs2: 'react-dom',
			commonjs: 'react-dom',
			amd: 'react-dom'
		}
	},
	resolveLoader: {
		modules: [path.join(__dirname, "node_modules")]
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules|dist|demo/,
				loader: 'js-output-loader!babel-loader!awesome-typescript-loader'
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							localIdentName: '[folder]_[local]-[hash:base64:5]'
						}
					},
					'postcss-loader'
					]}
				)
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
		banner,
		constants,
		new CircularDependencyPlugin({
			exclude: /node_modules/,
			failOnError: true
		}),
		new ExtractTextPlugin({filename: "styles.css"}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new CopyWebpackPlugin([{
			from: 'node_modules/quill-markup/public/highlights/**/*.css',
			to: 'highlights',
			flatten: true
		}]),
		MinifyPlugin ? new MinifyPlugin() : new NullPlugin()
		// new BundleAnalyzerPlugin(),
	]
};
