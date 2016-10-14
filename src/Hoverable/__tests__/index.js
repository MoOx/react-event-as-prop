import React from "react"
import renderer from "react-test-renderer"

import Hoverable from ".."

const Compo = ({ hovered, ...props }: { hovered: boolean }) => (
  <span { ...props }>{ hovered ? "hovered" : "nope" }</span>
)
const Composed = Hoverable(Compo)

test("hovered props changes when hovered", () => {
  const component = renderer.create(
    <Composed
      test
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  tree.props.onMouseEnter()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  tree.props.onMouseLeave()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

let flag = 0
const handleMouseEnter = () => flag = 1
const handleMouseLeave = () => flag = 2

test("hovered props changes when hovered and execute on{Event}", () => {
  const component = renderer.create(
    <Composed
      test
      onMouseEnter={ handleMouseEnter }
      onMouseLeave={ handleMouseLeave }
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  expect(flag).toEqual(0)

  tree.props.onMouseEnter()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  expect(flag).toEqual(1)

  tree.props.onMouseLeave()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  expect(flag).toEqual(2)
})
