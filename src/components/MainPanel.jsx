import React from 'react'
import { connect } from 'react-redux'

const MainPanel = ({store}) => {
  var state = store.getState().last()
  try {
    require.resolve('./' + state.component)
    var Component = require('./' + state.component).default
    return (<Component store={store} />)
  }
  catch(e) {
    jQuery(document).ready(function($) {
      store.dispatch({ type: 'NOTIFY', notification: { type: 'danger', message: 'Component not found: ' + state.component, position: 'top-left'} })
    })
    return null
  }

}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(MainPanel)
