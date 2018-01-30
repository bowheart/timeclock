import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { isActiveTask } from '../../store/entries'
import ClockInButton from './ClockInButton'
import ClockOutButton from './ClockOutButton'


const mapStateToProps = (state, ownProps) => ({
  isActiveTask: isActiveTask(state, ownProps.taskId)
})


export default connect(mapStateToProps)(ClockToggleButton)


function ClockToggleButton({ isActiveTask, taskId }) {
  return isActiveTask
    ? <ClockOutButton />
    : <ClockInButton taskId={taskId} />
}
ClockToggleButton.propTypes = {
  taskId: PropTypes.string.isRequired
}
