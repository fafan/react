// React libraries
import React from 'react'
import { connect } from 'react-redux'

// Includes
import ImgSidebar from '../../theme/assets/img/sidebar-1.jpg'

// Sub-components
import SidebarItem from './SidebarItem.jsx'

const Sidebar = ({store}) => {
  var state = store.getState().last()
  var items = [
    {component: 'Dashboard.jsx', icon: 'dashboard', label: 'Dashboard'},
    {component: 'User.jsx', icon: 'group', label: 'User'},
    {component: 'UserProfile.jsx', icon: 'person', label: 'User Profile'},
    {component: 'TableList.jsx', icon: 'content_paste', label: 'Table List'},
    {component: 'Typography.jsx', icon: 'library_books', label: 'Typography'},
    {component: 'Icons.jsx', icon: 'bubble_chart', label: 'Icons'},
    {component: 'Maps.jsx', icon: 'location_on', label: 'Maps'},
    {component: 'Notifications.jsx', icon: 'notifications', label: 'Notifications'},
    {component: 'Upgrade.jsx', icon: 'unarchive', label: 'Upgrade'},
    {component: 'Test.jsx', icon: 'unarchive', label: 'Test'}
  ]
  return (
    <div className="sidebar" data-color="purple" data-image={ImgSidebar}>
      <div className="logo">
        <a href="./" className="simple-text">CREATIVE TIM</a>
      </div>

      <div className="sidebar-wrapper">
        <ul className="nav">
          {items.map(function(value, index){
            var activeItem = (value.component == state.component)
            // TO DO: Filter siderbar item by authorization here...
            return (
              <SidebarItem store={store} key={index} icon={value.icon} label={value.label} target={value.component} active={activeItem} />
            )
            // End authorization filter
            })
          }
        </ul>
      </div>

      <div className="sidebar-background"></div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(Sidebar)
