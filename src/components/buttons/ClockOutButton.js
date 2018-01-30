import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  getActiveEntry, updateEntry
} from '../../store/entries'


const mapStateToProps = state => ({
  activeEntry: getActiveEntry(state)
})


const mapDispatchToProps ={
  updateEntry
}


@connect(mapStateToProps, mapDispatchToProps)
export default class ClockOutButton extends Component {
  static defaultProps = {
    className: 'btn--info'
  }


  static propTypes = {
    className: PropTypes.string
  }


  clockOut = () => {
    this.props.updateEntry({
      ...this.props.activeEntry,
      out: +Date.now()
    })
  }

  render() {
    let { className } = this.props

    return (
      <button
        className={className}
        onClick={this.clockOut}
      >
        Clock Out
      </button>
    )
  }
}
