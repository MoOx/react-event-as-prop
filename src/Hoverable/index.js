// @flow

import React, { Component } from "react"

type PropsType = {
  onMouseEnter?: Function | boolean,
  onMouseLeave?: Function | boolean,
}

type StateType = {
  hovered: boolean,
}

// @todo try a more complex type for ComposedComponent + return type
export default (ComposedComponent: Function) => {
  class Hoverable extends Component<void, PropsType, StateType> {
    props: PropsType

    state: StateType = {
      hovered: false,
    }

    handleMouseEnter: Function = (event: SyntheticEvent): void => {
      this.setState({ hovered: true })
      if (typeof this.props.onMouseEnter === "function") {
        this.props.onMouseEnter(event)
      }
    }

    handleMouseLeave: Function = (event: SyntheticEvent): void => {
      this.setState({ hovered: false })
      if (typeof this.props.onMouseLeave === "function") {
        this.props.onMouseLeave(event)
      }
    }

    render(): React$Element<any> {
      return (
        <ComposedComponent
          { ...this.props }
          { ...this.state }
          onMouseEnter={ this.handleMouseEnter }
          onMouseLeave={ this.handleMouseLeave }
        />
      )
    }
  }

  return Hoverable
}
