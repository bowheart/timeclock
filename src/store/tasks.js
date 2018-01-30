import { createAction } from 'redux-actions'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs'

import { graphql, operations } from './graphql'

const ALL = 'ALL'


export const CREATE_TASK = 'CREATE_TASK'
export const CREATE_TASK_REQUESTED = 'CREATE_TASK_REQUESTED'
export const CREATE_TASK_FAILED = 'CREATE_TASK_FAILED'
export const TASK_CREATED = 'TASK_CREATED'

export const FETCH_TASKS = 'FETCH_TASKS'
export const FETCH_TASKS_REQUESTED = 'FETCH_TASKS_REQUESTED'
export const FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED'
export const TASKS_FETCHED = 'TASKS_FETCHED'

export const FETCH_TASK = 'FETCH_TASK'
export const FETCH_TASK_REQUESTED = 'FETCH_TASK_REQUESTED'
export const FETCH_TASK_FAILED = 'FETCH_TASK_FAILED'
export const TASK_FETCHED = 'TASK_FETCHED'

export const DELETE_TASK = 'DELETE_TASK'
export const DELETE_TASK_REQUESTED = 'DELETE_TASK_REQUESTED'
export const DELETE_TASK_FAILED = 'DELETE_TASK_FAILED'
export const TASK_DELETED = 'TASK_DELETED'

export const UPDATE_TASK = 'UPDATE_TASK'
export const UPDATE_TASK_REQUESTED = 'UPDATE_TASK_REQUESTED'
export const UPDATE_TASK_FAILED = 'UPDATE_TASK_FAILED'
export const TASK_UPDATED = 'TASK_UPDATED'


export const createTask = createAction(CREATE_TASK)
export const createTaskRequested = createAction(CREATE_TASK_REQUESTED)
export const createTaskFailed = createAction(CREATE_TASK_FAILED)
export const taskCreated = createAction(TASK_CREATED)

export const fetchTasks = createAction(FETCH_TASKS)
export const fetchTasksRequested = createAction(FETCH_TASKS_REQUESTED)
export const fetchTasksFailed = createAction(FETCH_TASKS_FAILED)
export const tasksFetched = createAction(TASKS_FETCHED)

export const fetchTask = createAction(FETCH_TASK)
export const fetchTaskRequested = createAction(FETCH_TASK_REQUESTED)
export const fetchTaskFailed = createAction(FETCH_TASK_FAILED)
export const taskFetched = createAction(TASK_FETCHED)

export const deleteTask = createAction(DELETE_TASK)
export const deleteTaskRequested = createAction(DELETE_TASK_REQUESTED)
export const deleteTaskFailed = createAction(DELETE_TASK_FAILED)
export const taskDeleted = createAction(TASK_DELETED)

export const updateTask = createAction(UPDATE_TASK)
export const updateTaskRequested = createAction(UPDATE_TASK_REQUESTED)
export const updateTaskFailed = createAction(UPDATE_TASK_FAILED)
export const taskUpdated = createAction(TASK_UPDATED)


const defaultState = {
	isCreating: false,
	isDeleting: false,
	isFetchingMany: false,
	isFetchingOne: false,
	isUpdating: false,
	itemsRequested: [],
	items: []
}

const actions = {
	[CREATE_TASK](state, payload) {
		return state
	},
	[CREATE_TASK_REQUESTED](state, payload) {
		return {
			...state,
			isCreating: true
		}
	},
	[CREATE_TASK_FAILED](state, payload) {
		return {
			...state,
			isCreating: false
		}
	},
	[TASK_CREATED](state, payload) {
		return {
			...state,
			isCreating: false,
			items: state.items.concat([payload])
		}
	},


	[FETCH_TASKS](state, payload) {
		return state
	},
	[FETCH_TASKS_REQUESTED](state, payload) {
		return {
			...state,
			isFetchingMany: true,
			itemsRequested: state.itemsRequested.concat([ALL])
		}
	},
	[FETCH_TASKS_FAILED](state, payload) {
		return {
			...state,
			isFetchingMany: false
		}
	},
	[TASKS_FETCHED](state, payload) {
		return {
			...state,
			isFetchingMany: false,
			items: payload
		}
	},


	[FETCH_TASK](state, payload) {
		return state
	},
	[FETCH_TASK_REQUESTED](state, payload) {
		return {
			...state,
			isFetchingOne: true,
			itemsRequested: state.itemsRequested.concat([payload])
		}
	},
	[FETCH_TASK_FAILED](state, payload) {
		return {
			...state,
			isFetchingOne: false
		}
	},
	[TASK_FETCHED](state, payload) {
		return {
			...state,
			isFetchingOne: false,
			items: state.items.concat([payload])
		}
	},


	[DELETE_TASK](state, payload) {
		return state
	},
	[DELETE_TASK_REQUESTED](state, payload) {
		return {
			...state,
			isDeleting: true
		}
	},
	[DELETE_TASK_FAILED](state, payload) {
		return {
			...state,
			isDeleting: false
		}
	},
	[TASK_DELETED](state, payload) {
		return {
			...state,
			isDeleting: false,
			items: state.items.filter(item => item._id !== payload)
		}
	},


	[UPDATE_TASK](state, payload) {
		return state
	},
	[UPDATE_TASK_REQUESTED](state, payload) {
		return {
			...state,
			isUpdating: true
		}
	},
	[UPDATE_TASK_FAILED](state, payload) {
		return {
			...state,
			isUpdating: false
		}
	},
	[TASK_UPDATED](state, payload) {
		let taskIndex = state.items.findIndex(item => item._id === payload._id)

		return {
			...state,
			isUpdating: false,
			items: state.items.slice(0, taskIndex).concat([payload]).concat(state.items.slice(taskIndex + 1))
		}
	}
}


export const tasksReducer = (state=defaultState, action) => {
	return actions[action.type]
		? actions[action.type](state, action.payload) || state
		: state
}


export const createTaskEpic = (action$, store) => {
	return action$
		.ofType(CREATE_TASK)
		.map(({ payload: task }) => task)
		.mergeMap(task => {
			store.dispatch(createTaskRequested(task))

			return graphql(operations.createTask, { task })
				.map(({ createTask }) => taskCreated(createTask))
				.catch(error => Observable.of(createTaskFailed(error.xhr.response)))
		})
}

export const fetchTasksEpic = (action$, store) => {
	return action$
		.ofType(FETCH_TASKS)
		.filter(() => {
			let itemsRequested = store.getState().tasks.itemsRequested

			return !itemsRequested.includes(ALL)
		})
		.mergeMap(() => {
			store.dispatch(fetchTasksRequested())

			return graphql(operations.fetchAllTasks)
				.map(({ allTasks }) => tasksFetched(allTasks))
				.catch(error => Observable.of(fetchTasksFailed(error.xhr.response)))
		})
}

export const fetchTaskEpic = (action$, store) => {
	return action$
		.ofType(FETCH_TASK)
		.map(({ payload: _id }) => _id)
		.filter(_id => {
			let itemsRequested = store.getState().tasks.itemsRequested

			return !itemsRequested.includes(ALL) && !itemsRequested.includes(_id)
		})
		.mergeMap(_id => {
			store.dispatch(fetchTaskRequested(_id))

			return graphql(operations.fetchTaskById, { _id })
				.map(({ taskById }) => taskFetched(taskById))
				.catch(error => Observable.of(fetchTaskFailed(error.xhr.response)))
		})
}

export const deleteTaskEpic = (action$, store) => {
	return action$
		.ofType(DELETE_TASK)
		.map(({ payload: _id }) => _id)
		.mergeMap(_id => {
			store.dispatch(deleteTaskRequested(_id))

			return graphql(operations.deleteTask, { _id })
				.map(({ deleteTask }) => taskDeleted(_id))
				.catch(error => Observable.of(deleteTaskFailed(error.xhr.response)))
		})
}

export const updateTaskEpic = (action$, store) => {
	return action$
		.ofType(UPDATE_TASK)
		.map(({ payload: task }) => task)
		.mergeMap(task => {
			store.dispatch(updateTaskRequested(task))

			return graphql(operations.updateTask, { task })
				.map(({ updateTask }) => taskUpdated(updateTask))
				.catch(error => Observable.of(updateTaskFailed(error.xhr.response)))
		})
}

export const tasksEpic = combineEpics(createTaskEpic, fetchTasksEpic, fetchTaskEpic, deleteTaskEpic, updateTaskEpic)
