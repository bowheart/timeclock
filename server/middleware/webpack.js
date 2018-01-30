import { Router } from 'express'
import { resolve } from 'path'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'


const compiler = webpack({
	entry: {
		app: [
			'react-hot-loader/patch',
			'webpack-hot-middleware/client',
			'./src/index.js'
		]
	},
	externals: {
		react: 'React',
		'react-datetime': 'Datetime',
		'react-dom': 'ReactDOM',
		'react-redux': 'ReactRedux',
		'react-router-dom': 'ReactRouterDOM',
		redux: 'Redux',
		'redux-actions': 'ReduxActions',
		'redux-observable': 'ReduxObservable',
		rxjs: 'Rx'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				plugins: [
					'transform-decorators-legacy',
					'react-hot-loader/babel'
				],
				presets: [
					[ 'es2015', { modules: false } ],
					'react',
					'stage-0'
				]
			}
		}]
	},
	output: {
		path: resolve('assets', 'js'),
		filename: '[name].js',
		publicPath: '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	watch: true
})


export default Router()
	.use(webpackDevMiddleware(compiler, {
		publicPath: '/'
	}))
	.use(webpackHotMiddleware(compiler))
