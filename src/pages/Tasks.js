import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import Create from './tasks/Create'
import Edit from './tasks/Edit'
import List from './tasks/List'
import View from './tasks/View'


export default function Tasks() {
  return (
    <Switch>
      <Route exact path="/tasks/create" component={Create} />
      <Route exact path="/tasks/edit/:taskId" component={Edit} />
      <Route exact path="/tasks/:taskId" component={View} />
      <Route exact path="/(|tasks)" component={List} />
    </Switch>
  )
}
