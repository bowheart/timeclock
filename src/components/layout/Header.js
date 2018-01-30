import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Entry } from '../../utils/general'
import {
	fetchActiveEntry, getActiveEntry, getTaskByEntry
} from '../../store/entries'

import { fetchTask } from '../../store/tasks'
import Timer from '../Timer'
import ClockOutButton from '../buttons/ClockOutButton'


const mapStateToProps = state => {
	let activeEntry = getActiveEntry(state)

	return {
		activeTask: activeEntry && getTaskByEntry(state, activeEntry),
		activeEntry
	}
}


const mapDispatchToProps = {
	fetchActiveEntry,
	fetchTask
}


@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends Component {
	componentDidMount() {

		// Check if an active entry has been fetched.
		if (!this.props.activeEntry) {
			this.props.fetchActiveEntry()
		}
	}


	componentWillReceiveProps(nextProps) {

		// TODO: remove this check (let the epics handle it)
		// Check if the active entry's task has not been fetched yet
		if (!this.props.activeEntry && nextProps.activeEntry && !nextProps.activeTask) {
			this.props.fetchTask(nextProps.activeEntry.taskId)
		}
	}


	currentTaskMarkup() {
		let { activeEntry, activeTask } = this.props

		if (!activeEntry || !activeTask) {
			return (
				<div className="header__current-task">
					<span className="header__no-task">no current task</span>
				</div>
			)
		}

		return (
			<div className="header__current-task">
				<Link className="header__task-name task-name" to={`/tasks/${activeTask._id}`}>{activeTask.name}</Link>
				<span className="header__task-timer">
					<Timer tick={() => Entry.print.hours(activeEntry)} />
				</span>
				<ClockOutButton className="header__clock-out-btn" />
			</div>
		)
	}


	render() {

		return (
			<header className="header">
				<div className="header__logo">Timeclock</div>
				{this.currentTaskMarkup()}
			</header>
		)
	}
}
