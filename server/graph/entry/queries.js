export function activeEntry(post, args, { db }) {
	let entry = db.entries.find().find(entry => !entry.out)

	return entry || null
}


export function entriesByTask(post, { taskId }, { db }) {
	let entries = db.entries.find({
		taskId
	})

	return entries
}
