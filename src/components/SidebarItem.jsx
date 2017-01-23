import React from 'react'

const SidebarItem = ({store, icon, label, target, active}) => {
  if (active) {
    var defaultCursor = {
      cursor: 'none'
    }
    return (
      <li className="active">
          <a href="javascript:void(0)" style={{cursor:'initial'}}>
              <i className="material-icons">{icon}</i>
              <p>{label}</p>
          </a>
      </li>
    )
  }
  else {
    return (
      <li className={active ? 'active' : ''}>
          <a href="javascript:void(0)" onClick={e => { store.dispatch({ type: 'PUSH', component: target }) }}>
              <i className="material-icons">{icon}</i>
              <p>{label}</p>
          </a>
      </li>
    )
  }
}

export default SidebarItem
