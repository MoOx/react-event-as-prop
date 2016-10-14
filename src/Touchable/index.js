// @flow

import React, { Component } from "react"

type PropsType = {
  onMouseDown?: Function | boolean,
  onMouseUp?: Function | boolean,
}

type StateType = {
  touched: boolean,
}

// @todo try a more complex type for ComposedComponent + return type
export default (ComposedComponent: Function) => {
  class Touchable extends Component<void, PropsType, StateType> {
    props: PropsType

    state: StateType = {
      touched: false,
    }

    handleMouseDown: Function = (event: SyntheticEvent): void => {
      this.setState({ touched: true })
      if (typeof this.props.onMouseDown === "function") {
        this.props.onMouseDown(event)
      }
    }

    handleMouseUp: Function = (event: SyntheticEvent): void => {
      this.setState({ touched: false })
      if (typeof this.props.onMouseUp === "function") {
        this.props.onMouseUp(event)
      }
    }

    render(): React$Element<any> {
      return (
        <ComposedComponent
          { ...this.props }
          { ...this.state }
          onMouseDown={ this.handleMouseDown }
          onMouseUp={ this.handleMouseUp }
        />
      )
    }
  }

  return Touchable
}
