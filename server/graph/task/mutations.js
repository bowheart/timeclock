export function createTask(post, { task }, { db }) {
	task = {
		...{
			description: '',
			payPeriodDuration: 14
		},
		...task
	}

	db.tasks.save(task)

	return task
}


export function deleteTask(post, { _id }, { db }) {
	return db.tasks.remove({ _id })
}


export function updateTask(post, { task }, { db }) {
	let existingTask = db.tasks.findOne({ _id: task._id })

	if (!existingTask) return null

	let mergedTask = {
		...existingTask,
		...task
	}

	db.tasks.update({ _id: mergedTask._id }, mergedTask)

	return mergedTask
}
