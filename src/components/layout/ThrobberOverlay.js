import React, { Component } from 'react'
import Throbber from '../Throbber'
import { connect } from 'react-redux'


const mapStateToProps = state => {
	return {
		checks: {
			isCreatingEntry: state.entries.isCreating,
			isDeletingEntry: state.entries.isDeleting,
			isUpdatingEntry: state.entries.isUpdating,
			isCreatingTask: state.tasks.isCreating,
			isDeletingTask: state.tasks.isDeleting,
			isUpdatingTask: state.tasks.isUpdating
		}
	}
}


const textMap = {
	isCreatingEntry: 'Creating Entry...',
	isDeletingEntry: 'Deleting Entry...',
	isUpdatingEntry: 'Updating Entry...',
	isCreatingTask: 'Creating Task...',
	isDeletingTask: 'Deleting Task...',
	isUpdatingTask: 'Updating Task...'
}


@connect(mapStateToProps)
export default class ThrobberOverlay extends Component {
	isLoading() {
		let values = Object.values(this.props.checks)
		return values.some(val => val)
	}


	getText() {
		let key = Object.keys(this.props.checks).filter(key =>
			this.props.checks[key] && key
		)[0]

		return textMap[key]
	}


	render() {
		if (!this.isLoading()) return null

		return (
			<div className="throbber-overlay">
				<div className="throbber-overlay__box">
					<Throbber text={this.getText()} />
				</div>
			</div>
		)
	}
}
