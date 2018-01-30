import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './App'


const appRoot = document.getElementById('root')


function performRender() {
	render(
		<AppContainer>
			<App />
		</AppContainer>,
		appRoot
	)
}


performRender()


if (module.hot) {
	module.hot.accept('./App', performRender)
}
