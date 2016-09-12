import React from "react"
import expect from "expect"
import { shallow } from "enzyme"

import { Home } from "./"

const props = {
  user: {
    email: "foo"
  }
}

describe("<Home />", () => {
  it("should render", () => {
    const renderedComponent = shallow(
      <Home {...props} />
    )
    expect(renderedComponent.is("div")).toEqual(true)
  })
})
