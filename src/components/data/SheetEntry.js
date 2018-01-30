import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Datetime from 'react-datetime'

import { Entry } from '../../utils/general'
import {
  deleteEntry, isActiveEntry, updateEntry
} from '../../store/entries'

import Timer from '../Timer'


const mapStateToProps = (state, {entry}) => ({
  isActiveEntry: isActiveEntry(entry)
})


const mapDispatchToProps = {
  deleteEntry,
  updateEntry
}


@connect(mapStateToProps, mapDispatchToProps)
export default class SheetEntry extends Component {
  static propTypes = {
    entry: PropTypes.object.isRequired
  }


  constructor(props) {
    super(props)

    this.cancelEditing = this.cancelEditing.bind(this)
    this.delete = this.delete.bind(this)
    this.edit = this.edit.bind(this)
    this.onchangeIn = this.onchangeIn.bind(this)
    this.onchangeOut = this.onchangeOut.bind(this)
    this.saveChanges = this.saveChanges.bind(this)

    this.dateFormat = 'MMM D, YYYY'
    this.timeFormat = 'h:mm a'
    this.format = `${this.dateFormat} ${this.timeFormat}`

    this.state = this.getDefaultState()
  }


  componentWillReceiveProps({ entry }) {

    // Check if this entry is getting an "out" property
    if (!this.props.entry.out && entry.out) {
      this.setState({
        out: moment(entry.out)
      })
    }
  }


  cancelEditing() {
    this.setState(this.getDefaultState())
  }


  delete() {
    if (!confirm('Delete this entry?')) return

    this.props.deleteEntry(this.props.entry._id)
  }


  edit() {
    this.setState({
      isEditing: true
    })
  }


  getDefaultState() {
    return {
      in: moment(this.props.entry.in),
      out: this.props.entry.out && moment(this.props.entry.out),
      isEditing: false
    }
  }


  onchangeIn(instant) {

    // Don't accept invalid dates
    if (typeof instant === 'string') return
    if (this.state.out && +this.state.out < +instant) return

    this.setState({
      in: instant
    })
  }


  onchangeOut(instant) {

    // Don't accept invalid dates
    if (typeof instant === 'string') return
    if (+instant < +this.state.in) return

    this.setState({
      out: instant
    })
  }


  saveChanges() {
    let entry = {
      ...this.props.entry,
      in: +this.state.in
    }
    if (this.state.out) entry.out = +this.state.out

    this.props.updateEntry(entry)
    this.setState({
      isEditing: false
    })
  }


  render() {
    let _in = moment(this.props.entry.in)
    let out = moment(this.props.entry.out || undefined)
    let inputProps = {
      className: 'form__control'
    }

    return (
      <tr className={`sheet__entry${this.props.highlight ? '--highlight' : ''}`}>
        <td className="sheet__column">
          {_in.format(this.dateFormat)}
        </td>
        <td className="sheet__column">
          {
            this.state.isEditing
              ? <Datetime dateFormat={this.dateFormat} inputProps={inputProps} onChange={this.onchangeIn} timeFormat={this.timeFormat} value={this.state.in} />
              : _in.format(this.timeFormat)
          }
        </td>
        <td className="sheet__column">
          {
            !this.props.entry.out
              ? '-'
              : this.state.isEditing
                ? <Datetime dateFormat={this.dateFormat} inputProps={inputProps} onChange={this.onchangeOut} timeFormat={this.timeFormat} value={this.state.out} />
                : out.format(this.timeFormat)
          }
        </td>
        <td className="sheet__column">
          {
            this.props.isActiveEntry
              ? <Timer tick={() => Entry.print.hours(this.props.entry, 'long')} />
              : Entry.print.hours(this.props.entry, 'long')
          }
        </td>
        <td className="sheet__column btn-group">
          {
            this.state.isEditing
              ? <button className="btn-group__btn--success" onClick={this.saveChanges}><i className="fa fa-floppy-o"></i></button>
              : <button className="btn-group__btn--info" onClick={this.edit}><i className="fa fa-pencil"></i></button>
          }
          {
            this.state.isEditing
              ? <button className="btn-group__btn" onClick={this.cancelEditing}><i className="fa fa-times"></i></button>
              : <button className="btn-group__btn--danger" onClick={this.delete}><i className="fa fa-trash"></i></button>
          }
        </td>
      </tr>
    )
  }
}
