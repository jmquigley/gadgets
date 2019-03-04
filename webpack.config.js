const {leader} = require("util.leader");

const MinifyPlugin = require("babel-minify-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin;
const path = require("path");
const webpack = require("webpack");
const pkg = require("./package.json");

let mode = process.env.NODE_ENV || "development";

const banner = new webpack.BannerPlugin({
	banner:
		"Gadgets v" +
		pkg.version +
		"\n" +
		`Mode: ${mode}\n` +
		"https://www.npmjs.com/package/gadgets\n" +
		"Copyright (c) 2019, James Quigley\n",
	entryOnly: true
});

leader(banner.options.banner);

const constants = new webpack.DefinePlugin({
	GADGETS_VERSION: JSON.stringify(pkg.version),
	NODE_ENV: mode
});

module.exports = {
	mode,
	performance: {hints: false},
	optimization: {
		minimize: false
	},
	entry: [
		path.resolve(
			__dirname,
			"node_modules",
			"font-awesome",
			"css",
			"font-awesome.min.css"
		),
		path.resolve(
			__dirname,
			"node_modules",
			"css-ripple-effect",
			"dist",
			"ripple.min.css"
		),
		path.resolve(
			__dirname,
			"node_modules",
			"quill",
			"dist",
			"quill.core.css"
		),
		path.resolve(
			__dirname,
			"node_modules",
			"quill",
			"dist",
			"quill.bubble.css"
		),
		path.resolve(
			__dirname,
			"node_modules",
			"quill",
			"dist",
			"quill.snow.css"
		),
		path.resolve(
			__dirname,
			"node_modules",
			"quill-markup",
			"public",
			"styles.css"
		),
		path.resolve(
			__dirname,
			"node_modules",
			"react-sortable-tree",
			"style.css"
		),
		path.resolve(__dirname, "index.js")
	],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		libraryTarget: "umd"
	},
	resolve: {
		extensions: [".js", ".jsx", ".css"]
	},
	externals: {
		react: {
			root: "React",
			commonjs2: "react",
			commonjs: "react",
			amd: "react"
		},
		"react-dom": {
			root: "ReactDOM",
			commonjs2: "react-dom",
			commonjs: "react-dom",
			amd: "react-dom"
		}
	},
	resolveLoader: {
		modules: [path.join(__dirname, "node_modules")]
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules|dist|demo|.*\.test\.tsx|.*\.d.ts/,
				loader: "babel-loader"
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							localIdentName: "[folder]_[local]-[hash:base64:5]"
						}
					},
					"postcss-loader"
				]
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
				loader:
					"url-loader?limit=10000&mimetype=application/octet-stream"
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
		new MiniCssExtractPlugin({filename: "styles.css"}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new CopyWebpackPlugin([
			{
				from: "node_modules/quill-markup/public/highlights/**/*.css",
				to: "highlights",
				flatten: true
			}
		]),
		new MinifyPlugin(),
		new BundleAnalyzerPlugin({
			analyzerMode: "static",
			reportFilename: "bundle.report.html"
		})
	]
};
