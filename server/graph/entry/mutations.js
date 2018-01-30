import { activeEntry as fetchActiveEntry } from './queries'


export function clockIn(post, { taskId }, { db }) {

	// If there's currently an active entry, clock out of that task first
	clockOut(post, null, { db })

	let newEntry = {
		taskId,
		in: Date.now()
	}

	db.entries.save(newEntry)

	return newEntry
}


export function clockOut(post, args, { db }) {
	let activeEntry = fetchActiveEntry(post, null, { db })

	if (!activeEntry) return null

	activeEntry.out = Date.now()

	db.entries.update({ _id: activeEntry._id }, activeEntry)

	return activeEntry
}


export function deleteEntry(post, { _id }, { db }) {
	return db.entries.remove({ _id }, false)
}


export function updateEntry(post, { entry }, { db }) {
	let existingEntry = db.entries.findOne({ _id: entry._id })

	if (!existingEntry) return null

	let mergedEntry = {
		...existingEntry,
		...entry
	}

	db.entries.update({ _id: mergedEntry._id }, mergedEntry)

	return mergedEntry
}
