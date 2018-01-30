export default /* GraphQL */`
	scalar Date


	type Query {

		# entries
		activeEntry: Entry
		entriesByTask(taskId: ID): [Entry]!

		# tasks
		allTasks: [Task]!
		taskById(_id: ID): Task
	}


	type Mutation {

		# entries
		clockIn(taskId: ID): Entry
		clockOut: Entry
		deleteEntry(_id: ID): Boolean!
		updateEntry(entry: EntryInput): Entry

		# tasks
		createTask(task: TaskInput): Task
		deleteTask(_id: ID): Boolean!
		updateTask(task: TaskInput): Task
	}


	type Entry {
		_id: ID!
		taskId: ID!
		in: Date!
		out: Date
	}
	input EntryInput {
		_id: ID
		taskId: ID
		in: Date
		out: Date
	}


	type Task {
		_id: ID!
		name: String!
		description: String
		payPeriodStart: Date!
		payPeriodDuration: Int
	}
	input TaskInput {
		_id: ID
		name: String
		description: String
		payPeriodStart: Date
		payPeriodDuration: Int
	}
`
