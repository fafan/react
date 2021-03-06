// Packages
import { createStore } from 'redux'
import Immutable from 'immutable'

// Define store, reducer, state, and action
var AppStore = createStore(
  function (state = Immutable.List(), action) {

    // state initialization
    if (action.type == '@@redux/INIT') {
      var state_data = loadStateFromWebstorage()
      if (state_data) state = Immutable.List(state_data)
      return state
    }

    // limit state buffer to max = 5
    if (state.size >= 5) state = state.delete(0)

    // log to console except result data
    var actionLog = {}
    Object.keys(action).forEach(function(key,index) { if (key != 'result') actionLog[key] = action[key] })
    console.log('ACTION REQUEST: ' + JSON.stringify(actionLog))
    //console.log('WEBSTORAGE: ' + JSON.stringify(loadStateFromWebstorage()) )

    // execute action
    switch (action.type) {
      case 'PUSH':
        // find already loaded data if existed
        var foundComponent = undefined
        var tickExpired = 30000 // use cached data in state until expired
        state.map(function(state_value, state_index) {
          if (state_value.component == action.component) {
            if (state_value.data) {
              var lastdata = {}
              var found = false
              Object.keys(state_value.data).forEach(function(data_key,data_index) {
                var tickCount = parseInt(new Date().getTime()) - parseInt(state_value.data[data_key].timestamp)
                if (!found  && (tickCount < tickExpired)) {
                  console.log('FOUND DATA: ' + data_key)
                  lastdata[data_key] = state_value.data[data_key]
                  delete state_value.data[data_key]
                  found = true
                }
              })
              foundComponent = found ? { component: state_value.component, data: lastdata } : undefined
            }
          }
        })
        // update state
        state = state.push( foundComponent ? foundComponent : {component: action.component} )
        console.log('STATE:' + JSON.stringify(state))
        saveStateToWebstorage(state)
        return state

      case 'POP':
        state = state.pop()
        console.log('STATE:' + JSON.stringify(state))
        saveStateToWebstorage(state)
        return state

      case 'API':
        jQuery(function ($) {
          $.ajax({
            url: API_URL[action.service.api] + API_ROOT + action.service.request.endpoint,
            type: action.service.request.method,
            data: action.service.request.params,
            dataType: 'json',
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Bearer ' + state.last().authorization.bearer)
            },
            success: function (data) {
              AppStore.dispatch({
                type: 'API_RESPONSE',
                service: action.service,
                result: data
              })
              if (action.nextAction) AppStore.dispatch(action.nextAction)
            },
            error: function (jqXHR, textStatus, errorThrown) {
              AppStore.dispatch({type: 'API_RESPONSE', error: [jqXHR, textStatus, errorThrown] })
            }
          })
        })
        return state

      case 'API_RESPONSE':
        if (action.error == undefined) {
          console.log('API SUCCESS')
          var lastState = state.last()
          if (!lastState.data) lastState.data = {}
          if (!lastState.data[action.service.name])
            lastState.data[action.service.name] = action.result
          else
            lastState.data[action.service.name] = Object.assign(lastState.data[action.service.name], action.result);
          lastState.data[action.service.name]['timestamp'] = new Date().getTime()
          state = state.pop()
          state = state.push(lastState)
          saveStateToWebstorage(state)
        }
        else {
          console.log('API ERROR: ' + JSON.stringify(action.service))
        }
        return state

      case 'NOTIFY':
        var position = action.notification.position.split('-') // Example, position: 'top-left'
        jQuery(function ($) {
          $.notify(
            { icon: 'notifications', message: action.notification.message },
            { type: action.notification.type, // type = ['','info','success','warning','danger'];
              timer: 1000, placement: { from: position[0], align: position[1]
            }
          })
        })
        return state

      default:
        return state
    }
  }
)

// Save state to webstorage
export function saveStateToWebstorage(state) {
  if (typeof(Storage) !== "undefined") {
    localStorage.state = JSON.stringify(state)
  } else {
    console.log('No Web Storage support')
  }
}

// Load state from webstorage
export function loadStateFromWebstorage() {
  if (typeof(Storage) !== "undefined") {
    return localStorage.state ? JSON.parse(localStorage.state) : undefined
  } else {
    console.log('No Web Storage support')
    return undefined
  }
}

export default AppStore
