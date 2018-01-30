import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ClockToggleButton from '../buttons/ClockToggleButton'
import TaskBreakdown from '../data/TaskBreakdown'
import withTasks from '../../containers/withTasks'


export default withTasks()(TaskList)


function TaskList({ tasks }) {
	return (
		<ul className="task-list">
			{
				tasks.map(task =>
					<TaskListItem key={task._id} task={task} />
				)
			}
		</ul>
	)
}
TaskList.propTypes = {
	tasks: PropTypes.array.isRequired
}




function TaskListItem({ task }) {
	return (
		<li className="task-list__task">
			<div className="task-list__task__box">
				<Link className="task-list__task__view-btn" to={`tasks/${task._id}`}><i className="fa fa-eye"></i></Link>
				<Link className="task-list__task__edit-btn" to={`tasks/edit/${task._id}`}><i className="fa fa-pencil"></i></Link>
				<h4 className="task-list__task__name task-name">{task.name}</h4>
				<h5 className="task-list__task__description task-description">{task.description || '-'}</h5>
				<div className="task-list__task__clock-toggle">
					<ClockToggleButton taskId={task._id} />
				</div>
				<TaskBreakdown format="list" taskId={task._id} />
			</div>
		</li>
	)
}
TaskListItem.propTypes = {
	task: PropTypes.object.isRequired
}
