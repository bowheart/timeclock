import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { Task } from '../../utils/general'
import Timer from '../Timer'
import withTask from '../../containers/withTask'
import withTaskEntries from '../../containers/withTaskEntries'


const enhance = compose(
  withTask(),
  withTaskEntries()
)


export default enhance(TaskBreakdown)


function TaskBreakdown({ entries, format, isActiveTask, task }) {
  let { name } = task

  if (format === 'list') {
    return (
      <ul className="task-breakdown--list">
        <li className="task-breakdown--list__item">
          <span className="task-breakdown--list__key">Today:</span>
          <span className="task-breakdown--list__value">
            {
              isActiveTask
                ? <Timer
                    tick={
                      () => Task.print.hoursToday(entries, 'h:mm')
                        + ' $'
                        + Task.print.moneyToday(entries)
                    }
                  />
                : Task.print.hoursToday(entries, 'h:mm')
                  + ' $'
                  + Task.print.moneyToday(entries)
            }
          </span>
        </li>
        <li className="task-breakdown--list__item">
          <span className="task-breakdown--list__key">This Pay Period:</span>
          <span className="task-breakdown--list__value">
            {
              isActiveTask
                ? <Timer
                    tick={
                      () => Task.print.hoursThisPayPeriod(
                          task,
                          entries,
                          'h:mm'
                        )
                        + ' $'
                        + Task.print.moneyThisPayPeriod(task, entries)
                    }
                  />
                : Task.print.hoursThisPayPeriod(task, entries, 'h:mm')
                  + ' $'
                  + Task.print.moneyThisPayPeriod(task, entries)
            }
          </span>
        </li>
        <li className="task-breakdown--list__item">
          <span className="task-breakdown--list__key">Last Pay Period:</span>
          <span className="task-breakdown--list__value">
            {
              Task.print.hoursLastPayPeriod(task, entries, 'h:mm')
              + ' $'
              + Task.print.moneyLastPayPeriod(task, entries)
            }
          </span>
        </li>
        <li className="task-breakdown--list__item">
          <span className="task-breakdown--list__key">All Time:</span>
          <span className="task-breakdown--list__value">
            {
              isActiveTask
                ? <Timer
                    tick={
                      () => Task.print.hoursAllTime(entries, 'h:mm')
                        + ' $'
                        + Task.print.moneyAllTime(entries)
                    }
                  />
                : Task.print.hoursAllTime(entries, 'h:mm')
                  + ' $'
                  + Task.print.moneyAllTime(entries)
            }
          </span>
        </li>
      </ul>
    )
  }

  return (
    <tr className="tasks-breakdown__row">
      <td className="tasks-breakdown__column task-name">{name}</td>
      <td className="tasks-breakdown__column">
        <span>
          {
            isActiveTask
              ? <Timer tick={() => Task.print.hoursThisPayPeriod(task, entries, 'h:mm')} />
              : Task.print.hoursThisPayPeriod(task, entries, 'h:mm')
          }
        </span>
        <span className="tasks-breakdown__range">({Task.print.payPeriodRange(task)})</span>
      </td>
      <td className="tasks-breakdown__column">
        <span>{Task.print.hoursLastPayPeriod(task, entries, 'h:mm')}</span>
        <span className="tasks-breakdown__range">({Task.print.lastPayPeriodRange(task)})</span>
      </td>
      <td className="tasks-breakdown__column">
        {
          isActiveTask
            ? <Timer tick={() => Task.print.hoursAllTime(entries, 'h:mm')} />
            : Task.print.hoursAllTime(entries, 'h:mm')
        }
      </td>
    </tr>
  )
}
TaskBreakdown.defaultProps = {
  format: 'row'
}
TaskBreakdown.propTypes = {
  entries: PropTypes.array.isRequired, // received from container
  format: PropTypes.oneOf(['list', 'row']).isRequired, // has default
  isActiveTask: PropTypes.bool.isRequired, // received from container
  task: PropTypes.object.isRequired
}
