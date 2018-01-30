require('babel-register')({
	"plugins": [
		"transform-decorators-legacy"
	],
	"presets": [
		"es2015",
		"stage-0"
	]
})
require('./server')
