import React from 'react'
import PropTypes from 'prop-types'

import SheetEntry from '../data/SheetEntry'
import withTaskEntries from '../../containers/withTaskEntries'


export default withTaskEntries()(Sheet)


function Sheet({ entries }) {
	return (
		<table className="sheet">
			<thead>
				<tr>
					<th className="sheet__column-header">Date</th>
					<th className="sheet__column-header">In</th>
					<th className="sheet__column-header">Out</th>
					<th className="sheet__column-header">Total Time</th>
					<th className="sheet__column-header">Actions</th>
				</tr>
			</thead>
			<tbody>
				{rows(entries)}
			</tbody>
		</table>
	)
}
Sheet.propTypes = {
	entries: PropTypes.array.isRequired,
	taskId: PropTypes.string.isRequired
}





function rows(entries) {
	if (!entries.length) {
		return (
			<tr className="sheet__entry">
				<td className="sheet__column--empty" colSpan="5">No Entries</td>
			</tr>
		)
	}

  // Group rows on the same day with the same highlight
	let dayCounter = 0
	let lastDay = null

  entries = [ ...entries ].sort((a, b) => b.in - a.in)

	return entries.map(entry => {
		let day = +moment(entry.in).startOf('day')

		if (day !== lastDay) {
			lastDay = day
			dayCounter++
		}

		return (
      <SheetEntry entry={entry} highlight={dayCounter % 2} key={entry._id} />
    )
	})
}
