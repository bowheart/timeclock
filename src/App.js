import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import store from './store/store'
import Header from './components/layout/Header'
import Nav from './components/layout/Nav'
import Main from './components/layout/Main'
import ThrobberOverlay from './components/layout/ThrobberOverlay'


export default function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div>
					<Header />
					<Nav />
					<Main />
					<ThrobberOverlay />
				</div>
			</BrowserRouter>
		</Provider>
	)
}
