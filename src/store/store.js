import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { createAction } from 'redux-actions'
import { entriesReducer as entries, entriesEpic } from './entries'
import { tasksReducer as tasks, tasksEpic } from './tasks'


let rootReducer = combineReducers({entries, tasks})
let rootEpic = combineEpics(entriesEpic, tasksEpic)


let epicMiddleware = createEpicMiddleware(rootEpic)


let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(epicMiddleware)
))


let tick = createAction('TICK')
// Rx.Observable.interval(1000)
// 	.subscribe(() => store.dispatch(tick()))


export default store



/*
	The shape of the store.

	{
		tasks: {
			isCreating: false,
			isDeleting: false,
			isFetchingMany: false,
			isFetchingOne: false,
			isUpdating: false,
			itemsRequested: [111],
			items: [
				{
					id: 111,
					name: 'blah',
					description: 'some description'
				}
			]
		},
		entries: {
			isCreating: false,
			isDeleting: false,
			isFetchingMany: false,
			isFetchingOne: false,
			isUpdating: false,
			itemsRequested: [123],
			tasksWhoseEntriesWereRequested: [111],
			items: [
				{
					id: 123,
					in: 123443532461,
					out: 132424532243,
					task: 111
				}
			]
		}
	}
*/
