// @flow

import React, { Component } from "react"

type PropsType = {
  onFocus?: Function | boolean,
  onBlur?: Function | boolean,
}

type StateType = {
  focused: boolean,
}

// @todo try a more complex type for ComposedComponent + return type
export default (ComposedComponent: Function) => {
  class Focused extends Component<void, PropsType, StateType> {
    props: PropsType

    state: StateType = {
      focused: false,
    }

    handleFocus: Function = (event: SyntheticEvent): void => {
      this.setState({ focused: true })
      if (typeof this.props.onFocus === "function") {
        this.props.onFocus(event)
      }
    }

    handleBlur: Function = (event: SyntheticEvent): void => {
      this.setState({ focused: false })
      if (typeof this.props.onBlur === "function") {
        this.props.onBlur(event)
      }
    }

    render(): React$Element<any> {
      return (
        <ComposedComponent
          { ...this.props }
          { ...this.state }
          onFocus={ this.handleFocus }
          onBlur={ this.handleBlur }
        />
      )
    }
  }

  return Focused
}
