import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import SidebarItem from '../src/components/SidebarItem.jsx'

const { describe, it } = global

describe('SidebarItem', () => {

  it('should show icon', () => {
    const icon = 'store'
    const wrapper = shallow(
      <SidebarItem icon={icon} />
    )
    expect(wrapper.contains(<i className="material-icons">{icon}</i>)).to.equal(true)
  })

  it('should show label', () => {
    const label = 'Sidebar Test'
    const wrapper = shallow(
      <SidebarItem label={label} />
    )
    expect(wrapper.contains(<p>{label}</p>)).to.equal(true)
  })

  it('should be active item', () => {
    const wrapper = shallow(
      <SidebarItem active="true" />
    )
    expect(wrapper.props().className).to.equal("active");
  })

  it('should have all values', () => {
    const icon = 'store'
    const label = 'Sidebar Test'
    const wrapper = shallow(
      <SidebarItem icon={icon} label={label} active="true" />
    )
    expect(wrapper.contains(<i className="material-icons">{icon}</i>)).to.equal(true)
    expect(wrapper.contains(<p>{label}</p>)).to.equal(true)
    expect(wrapper.props().className).to.equal("active");
  })

})
