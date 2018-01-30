import React from 'react'
import PropTypes from 'prop-types'


export default function Throbber({ text }) {
	return (
		<div className="throbber">
			<p className="throbber__text">{text}</p>
			<div className="throbber__animation"></div>
		</div>
	)
}
Throbber.defaultProps = {
	text: 'Loading...'
}
Throbber.propTypes = {
	text: PropTypes.string.isRequired
}
