import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  createEntry, getActiveEntry, updateEntry
} from '../../store/entries'


const mapStateToProps = state => ({
  activeEntry: getActiveEntry(state)
})


const mapDispatchToProps = {
  createEntry,
  updateEntry
}


@connect(mapStateToProps, mapDispatchToProps)
export default class ClockInButton extends Component {
  static propTypes = {
    taskId: PropTypes.string.isRequired
  }


  clockIn = () => {

    // First clock out of the active task (if any)
    if (this.props.activeEntry) {
      this.props.updateEntry({
        ...this.props.activeEntry,
        out: +Date.now()
      })
    }

    this.props.createEntry({
      in: +Date.now(),
      taskId: this.props.taskId
    })
  }


  render() {
    return (
      <button
        className="btn--success"
        onClick={this.clockIn}
      >
        Clock In
      </button>
    )
  }
}
