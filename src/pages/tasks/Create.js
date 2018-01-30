import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { createTask } from '../../store/tasks'
import TaskForm from '../../components/forms/TaskForm'


const mapStateToProps = state => ({
  isCreating: state.tasks.isCreating
})


const mapDispatchToProps = {
  createTask
}


@connect(mapStateToProps, mapDispatchToProps)
export default class Create extends Component {
  constructor(props) {
    super(props)

    this.state = {
      wasCreated: false
    }
  }

  componentWillReceiveProps(nextProps) {

    // Check if the task was created
    if (this.props.isCreating && !nextProps.isCreating) {
      this.setState({
        wasCreated: true
      })
    }
  }

  render() {
    if (this.state.wasCreated) return <Redirect to="/tasks" />

    return (
      <div className="page">
        <h2 className="page__header">Create Task</h2>
        <TaskForm buttonText="Create" onSubmit={this.props.createTask} />
      </div>
    )
  }
}
