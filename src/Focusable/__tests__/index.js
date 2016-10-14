import React from "react"
import renderer from "react-test-renderer"

import Focusable from ".."

const Compo = ({ focused, ...props }: { focused: boolean }) => (
  <span { ...props }>{ focused ? "focused" : "nope" }</span>
)
const Composed = Focusable(Compo)

test("focused props changes when focused", () => {
  const component = renderer.create(
    <Composed
      test
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  tree.props.onFocus()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  tree.props.onBlur()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

let flag = 0
const handleFocus = () => flag = 1
const handleBlur = () => flag = 2

test("focused props changes when focused and execute on{Event}", () => {
  const component = renderer.create(
    <Composed
      test
      onFocus={ handleFocus }
      onBlur={ handleBlur }
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  expect(flag).toEqual(0)

  tree.props.onFocus()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  expect(flag).toEqual(1)

  tree.props.onBlur()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  expect(flag).toEqual(2)
})
