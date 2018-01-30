import cuid from 'cuid'

import DateScalar from './DateScalar'
import { clockIn, clockOut, deleteEntry, updateEntry } from './entry/mutations'
import { activeEntry, entriesByTask } from './entry/queries'
import { createTask, deleteTask, updateTask } from './task/mutations'
import { allTasks, taskById } from './task/queries'


export default {
	Date: DateScalar,
	Mutation: {
		clockIn,
		clockOut,
		deleteEntry,
		updateEntry,

		createTask,
		deleteTask,
		updateTask
	},
	Query: {
		activeEntry,
		entriesByTask,

		allTasks,
		taskById
	}
}
