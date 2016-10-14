import React from "react"
import renderer from "react-test-renderer"

import Touchable from ".."

const Compo = ({ touched, ...props }: { touched: boolean }) => (
  <span { ...props }>{ touched ? "touched" : "nope" }</span>
)
const Composed = Touchable(Compo)

test("touched props changes when touched", () => {
  const component = renderer.create(
    <Composed
      test
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  tree.props.onMouseDown()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  tree.props.onMouseUp()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

let flag = 0
const handleMouseDown = () => flag = 1
const handleMouseUp = () => flag = 2

test("touched props changes when touched and execute on{Event}", () => {
  const component = renderer.create(
    <Composed
      test
      onMouseDown={ handleMouseDown }
      onMouseUp={ handleMouseUp }
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  expect(flag).toEqual(0)

  tree.props.onMouseDown()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  expect(flag).toEqual(1)

  tree.props.onMouseUp()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  expect(flag).toEqual(2)
})
