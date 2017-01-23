import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import AppStore from '../src/components/AppStore.jsx'
import Test from '../src/components/Test.jsx'

const { describe, it } = global

describe('Test', () => {

  it('should contains: <h1>Test</h1>', () => {
    const wrapper = shallow(
      <Test store={AppStore} />
    )
    expect(wrapper.contains(<h1>Test</h1>)).to.equal(true)
  })

  it('should dispatch action when button clicked', () => {
    /*
    const clickMe = sinon.stub();
    // Here we do a JSDOM render. So, that's why we need to
    // wrap this with a div.
    const wrapper = mount(
      <div>
        <Button onClick={clickMe}>ClickMe</Button>
      </div>,
    );

    wrapper.find('button').simulate('click');
    expect(clickMe.callCount).to.be.equal(1);
    */

    const wrapper = shallow(
      <Test store={AppStore} />
    )
  });

})
