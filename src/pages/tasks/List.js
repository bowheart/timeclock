import React from 'react'
import { Link } from 'react-router-dom'

import TaskList from '../../components/lists/TaskList'


export default function List() {
  return (
    <div className="page">
      <h2 className="page__header">Tasks</h2>
      <div>
        <Link className="btn add-task" to="/tasks/create">
          <i className="fa fa-plus"></i>
          &nbsp;Create Task
        </Link>
      </div>
      <TaskList />
    </div>
  )
}
