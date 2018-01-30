import { createAction } from 'redux-actions'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs'

import { graphql, operations } from './graphql'


export const FETCH_ACTIVE_ENTRY = 'FETCH_ACTIVE_ENTRY'
export const FETCH_ACTIVE_ENTRY_REQUESTED = 'FETCH_ACTIVE_ENTRY_REQUESTED'
export const FETCH_ACTIVE_ENTRY_FAILED = 'FETCH_ACTIVE_ENTRY_FAILED'
export const ACTIVE_ENTRY_FETCHED = 'ACTIVE_ENTRY_FETCHED'

export const FETCH_ENTRIES_BY_TASK = 'FETCH_ENTRIES_BY_TASK'
export const FETCH_ENTRIES_BY_TASK_REQUESTED = 'FETCH_ENTRIES_BY_TASK_REQUESTED'
export const FETCH_ENTRIES_BY_TASK_FAILED = 'FETCH_ENTRIES_BY_TASK_FAILED'
export const ENTRIES_FETCHED_BY_TASK = 'ENTRIES_FETCHED_BY_TASK'

export const CREATE_ENTRY = 'CREATE_ENTRY'
export const CREATE_ENTRY_REQUESTED = 'CREATE_ENTRY_REQUESTED'
export const CREATE_ENTRY_FAILED = 'CREATE_ENTRY_FAILED'
export const ENTRY_CREATED = 'ENTRY_CREATED'

export const DELETE_ENTRY = 'DELETE_ENTRY'
export const DELETE_ENTRY_REQUESTED = 'DELETE_ENTRY_REQUESTED'
export const DELETE_ENTRY_FAILED = 'DELETE_ENTRY_FAILED'
export const ENTRY_DELETED = 'ENTRY_DELETED'

export const UPDATE_ENTRY = 'UPDATE_ENTRY'
export const UPDATE_ENTRY_REQUESTED = 'UPDATE_ENTRY_REQUESTED'
export const UPDATE_ENTRY_FAILED = 'UPDATE_ENTRY_FAILED'
export const ENTRY_UPDATED = 'ENTRY_UPDATED'


export const fetchActiveEntry = createAction(FETCH_ACTIVE_ENTRY)
export const fetchActiveEntryRequested = createAction(FETCH_ACTIVE_ENTRY_REQUESTED)
export const fetchActiveEntryFailed = createAction(FETCH_ACTIVE_ENTRY_FAILED)
export const activeEntryFetched = createAction(ACTIVE_ENTRY_FETCHED)

export const fetchEntriesByTask = createAction(FETCH_ENTRIES_BY_TASK)
export const fetchEntriesByTaskRequested = createAction(FETCH_ENTRIES_BY_TASK_REQUESTED)
export const fetchEntriesByTaskFailed = createAction(FETCH_ENTRIES_BY_TASK_FAILED)
export const entriesFetchedByTask = createAction(ENTRIES_FETCHED_BY_TASK)

export const createEntry = createAction(CREATE_ENTRY)
export const createEntryRequested = createAction(CREATE_ENTRY_REQUESTED)
export const createEntryFailed = createAction(CREATE_ENTRY_FAILED)
export const entryCreated = createAction(ENTRY_CREATED)

export const deleteEntry = createAction(DELETE_ENTRY)
export const deleteEntryRequested = createAction(DELETE_ENTRY_REQUESTED)
export const deleteEntryFailed = createAction(DELETE_ENTRY_FAILED)
export const entryDeleted = createAction(ENTRY_DELETED)

export const updateEntry = createAction(UPDATE_ENTRY)
export const updateEntryRequested = createAction(UPDATE_ENTRY_REQUESTED)
export const updateEntryFailed = createAction(UPDATE_ENTRY_FAILED)
export const entryUpdated = createAction(ENTRY_UPDATED)


const defaultState = {
	isCreating: false,
	isDeleting: false,
	isFetchingMany: false,
	isFetchingOne: false,
	isUpdating: false,
	itemsRequested: [],
	tasksWhoseEntriesWereRequested: [],
	items: []
}


const actions = {
	[FETCH_ACTIVE_ENTRY](state, payload) {
		return state
	},
	[FETCH_ACTIVE_ENTRY_REQUESTED](state, payload) {
		return {
			...state,
			isFetchingOne: true
		}
	},
	[FETCH_ACTIVE_ENTRY_FAILED](state, payload) {
		return {
			...state,
			isFetchingOne: false
		}
	},
	[ACTIVE_ENTRY_FETCHED](state, payload) {

		// A parallel request fetched this guy first.
		if (!payload || entryFetched(state, payload._id)) return state

		return {
			...state,
			isFetchingOne: false,
			items: state.items.concat([payload])
		}
	},


	[FETCH_ENTRIES_BY_TASK](state, payload) {
		return state
	},
	[FETCH_ENTRIES_BY_TASK_REQUESTED](state, payload) {
		return {
			...state,
			isFetchingMany: true,
			tasksWhoseEntriesWereRequested: state.tasksWhoseEntriesWereRequested.concat([payload])
		}
	},
	[FETCH_ENTRIES_BY_TASK_FAILED](state, payload) {
		return {
			...state,
			isFetchingMany: false
		}
	},
	[ENTRIES_FETCHED_BY_TASK](state, payload) {
		let taskId = payload.length && payload[0].taskId

		return {
			...state,
			isFetchingMany: false,
			items: state.items.filter(entry => entry.taskId !== taskId).concat(payload)
		}
	},


	[CREATE_ENTRY](state, payload) {
		return state
	},
	[CREATE_ENTRY_REQUESTED](state, payload) {
		return {
			...state,
			isCreating: true
		}
	},
	[CREATE_ENTRY_FAILED](state, payload) {
		return {
			...state,
			isCreating: false
		}
	},
	[ENTRY_CREATED](state, payload) {
		return {
			...state,
			isCreating: false,
			items: [payload].concat(state.items)
		}
	},


	[DELETE_ENTRY](state, payload) {
		return state
	},
	[DELETE_ENTRY_REQUESTED](state, payload) {
		return {
			...state,
			isDeleting: true
		}
	},
	[DELETE_ENTRY_FAILED](state, payload) {
		return {
			...state,
			isDeleting: false
		}
	},
	[ENTRY_DELETED](state, payload) {
		return {
			...state,
			isDeleting: false,
			items: state.items.filter(item => item._id !== payload)
		}
	},


	[UPDATE_ENTRY](state, payload) {
		return state
	},
	[UPDATE_ENTRY_REQUESTED](state, payload) {
		return {
			...state,
			isUpdating: true
		}
	},
	[UPDATE_ENTRY_FAILED](state, payload) {
		return {
			...state,
			isUpdating: false
		}
	},
	[ENTRY_UPDATED](state, payload) {
		let entryIndex = state.items.findIndex(item => item._id === payload._id)

		return {
			...state,
			isUpdating: false,
			items: state.items.slice(0, entryIndex).concat([payload]).concat(state.items.slice(entryIndex + 1))
		}
	}
}


export const entriesReducer = (state=defaultState, action) => {
	return actions[action.type]
		? actions[action.type](state, action.payload) || state
		: state
}


export const fetchActiveEntryEpic = (action$, store) => {
	return action$
		.ofType(FETCH_ACTIVE_ENTRY)
		.mergeMap(({ payload }) => {
			store.dispatch(fetchActiveEntryRequested(payload))

			return graphql(operations.fetchActiveEntry)
				.map(({ activeEntry }) => activeEntryFetched(activeEntry))
				.catch(error => Observable.of(fetchActiveEntryFailed(error.xhr.response)))
		})
}

export const fetchEntriesByTaskEpic = (action$, store) => {
	return action$
		.ofType(FETCH_ENTRIES_BY_TASK)
		.map(({ payload: taskId }) => taskId)
		.filter(taskId => {
			return !store.getState().entries.tasksWhoseEntriesWereRequested.includes(taskId)
		})
		.mergeMap(taskId => {
			store.dispatch(fetchEntriesByTaskRequested(taskId))

			return graphql(operations.fetchEntriesByTask, { taskId })
				.map(({ entriesByTask }) => entriesFetchedByTask(entriesByTask))
				.catch(error => Observable.of(fetchEntriesByTaskFailed(error.xhr.response)))
		})
}

export const createEntryEpic = (action$, store) => {
	return action$
		.ofType(CREATE_ENTRY)
		.map(({ payload: entry }) => entry.taskId)
		.mergeMap(taskId => {
			store.dispatch(createEntryRequested(taskId))

			return graphql(operations.clockIn, { taskId })
				.map(({ clockIn }) => entryCreated(clockIn))
				.catch(error => Observable.of(createEntryFailed(error.xhr.response)))
		})
}

export const deleteEntryEpic = (action$, store) => {
	return action$
		.ofType(DELETE_ENTRY)
		.map(({ payload: _id }) => _id)
		.mergeMap(_id => {
			store.dispatch(deleteEntryRequested(_id))

			return graphql(operations.deleteEntry, { _id })
				.map(({ deleteEntry }) => entryDeleted(_id))
				.catch(error => Observable.of(deleteEntryFailed(error.xhr.response)))
		})
}

export const updateEntryEpic = (action$, store) => {
	return action$
		.ofType(UPDATE_ENTRY)
		.map(({ payload: entry }) => entry)
		.mergeMap(entry => {
			store.dispatch(updateEntryRequested(entry))

			return graphql(operations.updateEntry, { entry })
				.map(({ updateEntry }) => entryUpdated(updateEntry))
				.catch(error => Observable.of(updateEntryFailed(error.xhr.response)))
		})
}


export const entriesEpic = combineEpics(fetchActiveEntryEpic, fetchEntriesByTaskEpic, createEntryEpic, deleteEntryEpic, updateEntryEpic)




// Convenience methods for pulling values from the store.

export function entryFetched(state, _id) {
	return state.items.some(entry => entry._id === _id)
}

export function getActiveEntry(state) {
	return state.entries.items.filter(entry => !entry.out)[0]
}

export function getTaskByEntry(state, entry) { // TODO: change this to getTaskById and pass entry.taskId
	return state.tasks.items.filter(task => task._id === entry.taskId)[0]
}

export function getTaskEntries(state, taskId) {
	return state.entries.items.filter(entry => entry.taskId === taskId)
}

export function isActiveEntry(entry) {
	return !entry.out
}

export function isActiveTask(state, taskId) {
	return getTaskEntries(state, taskId).some(entry => !entry.out)
}
