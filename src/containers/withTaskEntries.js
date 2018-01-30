import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  fetchEntriesByTask, getTaskEntries, isActiveTask
} from '../store/entries'

import { getDisplayName } from '../utils/general'


const mapStateToProps = (state, {taskId}) => ({
  entries: getTaskEntries(state, taskId),
  isActiveTask: isActiveTask(state, taskId)
})


const mapDispatchToProps = {
  fetchEntriesByTask
}



export default () => WrappedComponent =>

  @connect(mapStateToProps, mapDispatchToProps)
  class extends Component {

    static displayName = `WithTaskEntries(${getDisplayName(WrappedComponent)})`


    static propTypes = {
      taskId: PropTypes.string.isRequired
    }


    componentDidMount() {
      this.props.fetchEntriesByTask(this.props.taskId)
    }


    render() {
      const {
        entries,
        fetchEntriesByTask,
        isActiveTask,
        taskId,
        ...passThroughProps
      } = this.props

      return <WrappedComponent
        entries={entries}
        isActiveTask={isActiveTask}
        taskId={taskId}
        {...passThroughProps}
      />
    }
  }
