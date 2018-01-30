import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { deleteTask, updateTask } from '../../store/tasks'
import TaskForm from '../../components/forms/TaskForm'
import withRouteParam from '../../containers/withRouteParam'
import withTask from '../../containers/withTask'


const enhance = compose(
  withRouteParam('taskId'),
  withTask()
)


const mapStateToProps = state => ({
  isDeleting: state.tasks.isDeleting,
  isUpdating: state.tasks.isUpdating
})


const mapDispatchToProps = {
  deleteTask,
  updateTask
}


@enhance
@connect(mapStateToProps, mapDispatchToProps)
export default class Edit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      wasDeleted: false,
      wasUpdated: false
    }
  }


  componentWillReceiveProps(nextProps) {

    // Check if this task was deleted.
    if (this.props.isDeleting && !nextProps.isDeleting) {
      this.setState({
        wasDeleted: true
      })
    }

    // Check if the task was updated.
    if (this.props.isUpdating && !nextProps.isUpdating) {
      this.setState({
        wasUpdated: true
      })
    }
  }


  delete = () => {
    if (!confirm(`Delete task ${this.props.task.name}?`)) return

    this.props.deleteTask(this.props.task._id)
  }


  render() {
    if (this.state.wasDeleted || this.state.wasUpdated) return <Redirect to="/tasks" />

    return (
      <div className="page">
        <h2 className="page__header">Edit Task "<span className="task-name">{this.props.task.name}</span>"</h2>
        <TaskForm buttonText="Update" onSubmit={this.props.updateTask} task={this.props.task} />
        <div className="task-delete">
          <button className="btn--danger" onClick={this.delete}>Delete Task</button>
        </div>
      </div>
    )
  }
}
