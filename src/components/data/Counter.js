import React from 'react'

import withTick from '../../containers/withTick'


export default withTick(true)(Counter)


export default function Counter({
  start,
  title
}) {
  return (
    <div className="counter">
      <h2>{title}</h2>
      <TickingCounter />
    </div>
  )
}





const TickingCounter = withTick(true)((
  start
) => {
  let now = Date.now()

  return
})
