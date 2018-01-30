import React from 'react'
import PropTypes from 'prop-types'

import TaskBreakdown from '../data/TaskBreakdown'
import withTasks from '../../containers/withTasks'


export default withTasks()(TasksBreakdown)


function TasksBreakdown({ tasks }) {
	return (
		<table className="tasks-breakdown">
			<thead>
				<tr>
					<th className="tasks-breakdown__column-header">Task</th>
					<th className="tasks-breakdown__column-header">This Pay Period</th>
					<th className="tasks-breakdown__column-header">Last Pay Period</th>
					<th className="tasks-breakdown__column-header">All Time</th>
				</tr>
			</thead>
			<tbody>
				{
					tasks.map(task => (
						<TaskBreakdown key={task._id} taskId={task._id} />
					))
				}
			</tbody>
		</table>
	)
}
TasksBreakdown.propTypes = {
	tasks: PropTypes.array.isRequired
}
