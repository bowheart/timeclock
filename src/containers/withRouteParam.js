import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getDisplayName } from '../utils/general'


export default paramName => WrappedComponent =>
  class extends Component {
    static displayName = `WithRouteParam(${getDisplayName(WrappedComponent)})`


    static propTypes = {
      match: PropTypes.object.isRequired
    }


    render() {
      let paramValue = this.props.match.params[paramName]
      let { match, ...passThroughProps } = this.props

      passThroughProps[paramName] = paramValue

      return <WrappedComponent {...passThroughProps} />
    }
  }
