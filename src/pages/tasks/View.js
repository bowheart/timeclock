import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import ClockToggleButton from '../../components/buttons/ClockToggleButton'
import Sheet from '../../components/lists/Sheet'
import withRouteParam from '../../containers/withRouteParam'
import withTask from '../../containers/withTask'


const enhance = compose(
  withRouteParam('taskId'),
  withTask()
)


export default enhance(View)


function View({ task }) {
  return (
    <div className="page">
      <h2 className="page__header task-name">{task.name}</h2>
      <h4 className="page__subheader task-description">{task.description}</h4>
      <div className="text-center">
        <ClockToggleButton taskId={task._id} />
      </div>
      <Sheet taskId={task._id} />
    </div>
  )
}
View.propTypes = {
  task: PropTypes.object.isRequired
}
