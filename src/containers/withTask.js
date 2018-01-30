import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { fetchTask } from '../store/tasks'
import { getDisplayName } from '../utils/general'
import Throbber from '../components/Throbber'


const mapStateToProps = (state, { taskId }) => {
  let task = state.tasks.items
    .filter(task => task._id === taskId)
    [0]

  return {
    isFetchingOne: state.tasks.isFetchingOne,
    task
  }
}


const mapDispatchToProps = {
  fetchTask
}


export default () => WrappedComponent =>

  @connect(mapStateToProps, mapDispatchToProps)
  class extends Component {

    static displayName = `WithTask(${getDisplayName(WrappedComponent)})`


    static propTypes = {
      taskId: PropTypes.string.isRequired
    }


    constructor(props) {
      super(props)

      this.state = {
        notFound: false,
        wasDeleted: false
      }
    }


    componentDidMount() {
      this.props.fetchTask(this.props.taskId)
    }


    componentWillReceiveProps(nextProps) {

      // Check if the task was not found
      if (
        this.props.isFetchingOne
        && !nextProps.isFetchingOne
        && !nextProps.task
      ) {
        this.setState({
          notFound: true
        })
      }

      // Check if the task was deleted
      if (this.props.task && !nextProps.task) {
        this.setState({
          wasDeleted: true
        })
      }
    }


    render() {
      if (this.state.wasDeleted || this.state.notFound) {
        return <Redirect to="/tasks" />
      }

      if (this.state.isFetchingOne) {
        return <Throbber text="Fetching Task..." />
      }

      if (!this.props.task) return null // not fetched and not fetching yet

      let {
        fetchTask, isFetchingOne, task, taskId, ...passThroughProps
      } = this.props

      return <WrappedComponent
        taskId={taskId}
        task={task}
        {...passThroughProps}
      />
    }
  }
