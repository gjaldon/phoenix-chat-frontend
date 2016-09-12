import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'

import { Settings } from './'

const props = {

}

describe('<Settings />', () => {
  it('should render', () => {
    const renderedComponent = shallow(
      <Settings {...props} />
    )
    expect(renderedComponent.is('div')).toEqual(true)
  })
})
