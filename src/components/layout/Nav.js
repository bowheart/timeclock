import React from 'react'
import { NavLink } from 'react-router-dom'


export default function Nav() {
	return (
		<nav className="nav">
			<ul className="nav__items">
				<li className="nav__item">
					<NavLink
						className="nav__link"
						activeClassName="nav__link--active"
						to="/tasks"
						isActive={isActive}
					>
						Tasks
					</NavLink>
				</li>
				<li className="nav__item">
					<NavLink
						className="nav__link"
						activeClassName="nav__link--active"
						to="/overview"
					>
						Overview
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}


function isActive(match, location) {
	return match || location.pathname === '/'
}
