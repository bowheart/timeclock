import React from 'react'

import TasksBreakdown from '../components/lists/TasksBreakdown'


export default function Overview() {
  return (
    <div className="page">
      <h2 className="page__header">Overview</h2>
      <div className="page__subheader">
        <button className="btn" onClick={openGmail}>
          <i className="fa fa-mail"></i>
          Email Dan
        </button>
      </div>
      <TasksBreakdown />
    </div>
  )
}


// TODO: kill all this when this feature is actually in place:
import { Entries, Task } from '../utils/general'
import store from '../store/store'
import { getTaskEntries } from '../store/entries'

function openGmail() {
  let state = store.getState()

  let lavaTask = state.tasks.items.filter(task => task.name.toLowerCase() === 'lava')[0]
  let lavaEntries = getTaskEntries(state, lavaTask._id)
  let payPeriod = Task.print.lastPayPeriodRange(lavaTask)
  let lavaHours = Task.print.hoursLastPayPeriod(lavaTask, lavaEntries, 'h')

  let intelbuddyTask = state.tasks.items.filter(task => task.name.toLowerCase() === 'intelbuddy')[0]
  let intelbuddyEntries = getTaskEntries(state, intelbuddyTask._id)
  let intelbuddyHours = Task.print.hoursLastPayPeriod(intelbuddyTask, intelbuddyEntries, 'h')

  let body = encodeURIComponent(`${payPeriod}
    Hours:
      Lava: ${lavaHours}
      Intelbuddy: ${intelbuddyHours}
  `.replace(/\t/g, '    '))

  let url = 'https://mail.google.com/mail/u/0/?view=cm&fs=1&to=dan@openside.com&su=hours&tf=1&body=' + body
  window.open(url)
}
