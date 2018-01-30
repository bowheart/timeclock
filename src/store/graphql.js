import { Observable } from 'rxjs'


export const operations = {
	fetchActiveEntry: /* GraphQL */`
		query FetchActiveEntry {
			activeEntry {
				_id
				taskId
				in
				out
			}
		}
	`,

	fetchEntriesByTask: /* GraphQL */`
		query FetchEntriesByTask($taskId: ID) {
			entriesByTask(taskId: $taskId) {
				_id
				taskId
				in
				out
			}
		}
	`,

	clockIn: /* GraphQL */`
		mutation ClockIn($taskId: ID) {
			clockIn(taskId: $taskId) {
				_id
				taskId
				in
				out
			}
		}
	`,

	clockOut: /* GraphQL */`
		mutation clockOut {
			clockOut {
				_id
				taskId
				in
				out
			}
		}
	`,

	deleteEntry: /* GraphQL */`
		mutation deleteEntry($_id: ID) {
			deleteEntry(_id: $_id)
		}
	`,

	updateEntry: /* GraphQL */`
		mutation updateEntry($entry: EntryInput) {
			updateEntry(entry: $entry) {
				_id
				taskId
				in
				out
			}
		}
	`,

	fetchAllTasks: /* GraphQL */`
		query FetchAllTasks {
			allTasks {
				_id
				name
				description
				payPeriodStart
				payPeriodDuration
			}
		}
	`,

	fetchTaskById: /* GraphQL */`
		query FetchTaskById($_id: ID) {
			taskById(_id: $_id) {
				_id
				name
				description
				payPeriodStart
				payPeriodDuration
			}
		}
	`,

	createTask: /* GraphQL */`
		mutation CreateTask($task: TaskInput) {
			createTask(task: $task) {
				_id
				name
				description
				payPeriodStart
				payPeriodDuration
			}
		}
	`,

	deleteTask: /* GraphQL */`
		mutation DeleteTask($_id: ID) {
			deleteTask(_id: $_id)
		}
	`,

	updateTask: /* GraphQL */`
		mutation UpdateTask($task: TaskInput) {
			updateTask(task: $task) {
				_id
				name
				description
				payPeriodStart
				payPeriodDuration
			}
		}
	`
}


export function graphql(query, variables = null) {
	return Observable.ajax.post(
			'/graphql',
			{ query, variables },
			{ 'Content-Type': 'application/json' }
		)
		.map(({ response }) => response.data)
}
