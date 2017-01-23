// Packages
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

// Fonts
import '../../theme/assets/css/font-awesome.css'
import '../../theme/assets/css/fonts.css'

// Theme
import '../../theme/assets/css/bootstrap.min.css'
import '../../theme/assets/css/material-dashboard.css'
import '../../theme/assets/css/animation.css'
import '../../theme/assets/css/login.css'
import '../index.html'

// Components
import AppStore from './AppStore.jsx'
import Login from './Login.jsx'
import Sidebar from './Sidebar.jsx'
import MainPanel from './MainPanel.jsx'

// Check authentication
var authenticated = true
if (!authenticated) {
  AppStore.dispatch({ type: 'PUSH', component: 'Login.jsx' })
  render(
    <Provider store={AppStore}>
      <Login store={AppStore} />
    </Provider>,
    document.getElementById('app')
  )
}
else {
  AppStore.dispatch({ type: 'PUSH', component: 'Dashboard.jsx' })
  render(
    <Provider store={AppStore}>
      <div className="wrapper">
        <Sidebar store={AppStore} />
        <MainPanel store={AppStore} />
      </div>
    </Provider>,
    document.getElementById('app')
  )
}
