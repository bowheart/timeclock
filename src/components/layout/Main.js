import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Tasks from '../../pages/Tasks'
import Overview from '../../pages/Overview'


export default function Main() {
	return (
		<main className="main">
			<Switch>
				<Route path="/(|tasks)" component={Tasks} />
				<Route path="/overview" component={Overview} />
			</Switch>
		</main>
	)
}
