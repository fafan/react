// React libraries
import React from 'react'

const Test = ({store}) => {
  var state = store.getState().last()
  return (
    <div className="main-panel">
      <h1>Test</h1>
      <button className="btn" onClick={e => { store.dispatch({ type: 'POP' }) }}>Back</button>
    </div>
  )
}

export default Test
