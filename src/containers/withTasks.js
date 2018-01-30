import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchTasks } from '../store/tasks'
import { getDisplayName } from '../utils/general'
import Throbber from '../components/Throbber'


const mapStateToProps = ({ tasks }) => ({
  tasks: tasks.items,
  isFetchingMany: tasks.isFetchingMany
})


const mapDispatchToProps = {
  fetchTasks
}


export default () => WrappedComponent =>

  @connect(mapStateToProps, mapDispatchToProps)
  class extends Component {

    static displayName = `WithTasks(${getDisplayName(WrappedComponent)})`


    static propTypes = {
      fetchTasks: PropTypes.func.isRequired, // from Redux
      isFetchingMany: PropTypes.bool.isRequired, // from Redux
      tasks: PropTypes.array.isRequired // from Redux
    }


    constructor(props) {
      super(props)

      this.state = {
        noTasksFound: false
      }
    }


    componentDidMount() {
      this.props.fetchTasks()
    }


    componentWillReceiveProps(nextProps) {

      // Check if no tasks were found.
      if (this.props.isFetchingMany && !nextProps.isFetchingMany && !nextProps.tasks.length) {
        this.setState({
          noTasksFound: true
        })
      }
    }


    render() {
      if (this.state.noTasksFound) {
        return <p className="text-center">No Tasks Found. Create one first!</p>
      }

      if (this.props.isFetchingMany) {
        return <Throbber text="Fetching Tasks..." />
      }

      if (!this.props.tasks.length) {
        return null // not fetched and not fetching yet
      }

      const {
        fetchTasks,
        isFetchingMany,
        tasks,
        ...passThroughProps
      } = this.props

      return <WrappedComponent tasks={tasks} {...passThroughProps} />
    }
  }
