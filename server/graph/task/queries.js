export function allTasks(post, args, { db }) {
	return db.tasks.find()
}


export function taskById(post, { _id }, { db }) {
	let task = db.tasks.findOne({ _id })

	return task || null
}
