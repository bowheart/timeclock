import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Datetime from 'react-datetime'


export default class TaskForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  }


  static defaultProps = {
    buttonText: 'Submit',
    task: {}
  }


  static propTypes = {
    buttonText: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    task: PropTypes.object
  }


  constructor(props) {
    super(props)

    this.state = this.getDefaultState()
  }


  getDefaultState() {
    let {
      name, description, payPeriodStart, payPeriodDuration
    } = this.props.task

    return {
      name: name || '',
      description: description || '',
      payPeriodStart: payPeriodStart ? moment(payPeriodStart) : moment().weekday(1),
      payPeriodDuration: payPeriodDuration || 14
    }
  }


  onSubmit = event => {
    event.preventDefault()

    let task = {
      ...this.state,
      payPeriodStart: +this.state.payPeriodStart.startOf('day')
    }

    if (!task.name) return alert('please enter the task name')

    if (this.props.task) task._id = this.props.task._id

    this.props.onSubmit(task)
  }


  setDescription = event => {
    this.setState({
      description: event.target.value
    })
  }


  setName = event => {
    this.setState({
      name: event.target.value
    })
  }


  setPayPeriodDuration = event => {
    this.setState({
      payPeriodDuration: event.target.value
    })
  }


  setPayPeriodStart = instant => {
    if (typeof instant === 'string') return

    this.setState({
      payPeriodStart: instant
    })
  }


  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form__group">
          <label htmlFor="task-name" className="form__label">Name</label>
          <div className="form__control-wrapper">
            <input id="task-name" className="form__control" onChange={this.setName} value={this.state.name} autoFocus />
          </div>
        </div>
        <div className="form__group">
          <label htmlFor="task-description" className="form__label">Description</label>
          <div className="form__control-wrapper">
            <input id="task-description" className="form__control" onChange={this.setDescription} value={this.state.description} />
          </div>
        </div>
        <div className="form__group">
          <label htmlFor="task-pay-period-start" className="form__label">Start of pay period</label>
          <div className="form__control-wrapper">
            <Datetime dateFormat="MMM D, YYYY" inputProps={{className: 'form__control', id: 'task-pay-period-start'}} onChange={this.setPayPeriodStart} timeFormat={false} value={this.state.payPeriodStart} />
          </div>
        </div>
        <div className="form__group">
          <label htmlFor="task-pay-period-duration" className="form__label">Pay period duration (days)</label>
          <div className="form__control-wrapper">
            <input type="number" id="task-pay-period-duration" className="form__control" onChange={this.setPayPeriodDuration} value={this.state.payPeriodDuration} />
          </div>
        </div>
        <div className="form__btn">
          <button className="btn" type="button" onClick={this.context.router.history.goBack}>Cancel</button>
          <button className="btn--info" type="submit">{this.props.buttonText}</button>
        </div>
      </form>
    )
  }
}
