import React from 'react'
import 'whatwg-fetch'
import { shallow } from 'enzyme'
import App from './App'

it('renders without crashing', () => {
  shallow(<App />)
})

it('renders welcome message', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('h1')).toIncludeText('')
})
