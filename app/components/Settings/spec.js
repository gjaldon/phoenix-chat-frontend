import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'

import { Settings } from './'

const props = {
  user: {
    email: "foo",
    id: 1234,
    public_key: "asdf"
  }
}

describe('<Settings />', () => {
  it('should render', () => {
    const renderedComponent = shallow(
      <Settings {...props} />
    )
    expect(renderedComponent.is('div')).toEqual(true)
  })
  it('should have a submit function', () => {
    const component = new Settings()
    expect(component.submit).toExist()
  })
  // TODO does not work
  // it('should render a button if no key is present', () => {
  //   const renderedComponent = shallow(
  //     <Settings {...props} public_key="" />
  //   )
  //   expect(renderedComponent.find('button').length).toEqual(1)
  // })
  // it('should render no button if key is present', () => {
  //   const renderedComponent = shallow(
  //     <Settings {...props} />
  //   )
  //   expect(renderedComponent.find('button').length).toEqual(0)
  // })
})
