import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getDisplayName } from '../utils/general'


const frameTickSource = Rx.Observable
  .interval(0, Rx.Scheduler.animationFrame)
  .multicast(new Rx.Subject())
  .refCount()


const minuteTickSource = Rx.Observable
  .interval(1000)
  .multicast(new Rx.Subject())
  .refCount()


export default (everyFrame = false) => WrappedComponent =>

  class extends Component {
    static displayName = `WithTick(${getDisplayName(WrappedComponent)})`


    constructor(props) {
      super(props)

      this.state = {
        counter: 0
      }
    }


    componentDidMount() {
      const tickSource = everyFrame ? frameTickSource : minuteTickSource

      this.subscription = tickSource.subscribe(counter => {
        this.setState({
          counter
        })
      })
    }


    componentWillUnmount() {
      this.subscription.unsubscribe()
    }


    render() {
      const { counter } = this.state
      const passThroughProps = this.props

      return <WrappedComponent counter={counter} {...passThroughProps} />
    }
  }
