import React from 'react'
import PropTypes from 'prop-types'

import withTick from '../containers/withTick'


export default withTick()(Timer)


function Timer({ tick }) {
	return tick()
}
Timer.propTypes = {
	tick: PropTypes.func.isRequired
}
