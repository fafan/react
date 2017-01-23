// Packages
import React from 'react'
import { connect } from 'react-redux'

// UI Material theme
import '../../theme/assets/css/table.css'
import '../../theme/assets/css/pagination.css'

// Components
import Navigation from './Navigation.jsx'

// Functions
const initUsers = (store) => {
  var state = store.getState().last()
  var users = state.data ? (state.data.users ? state.data.users : undefined) : undefined
  var users_total = users ? (users.count_all ? users.count_all : 0) : 0
  var users_list = users ? (users.list ? users.list : []) : []
  var users_limit = users ? (users.limit ? users.limit : 10) : 10
  var users_offset = users ? (users.offset ? users.offset : 0) : 0
  return { total: users_total, list: users_list, limit: users_limit, offset: users_offset }
}

const getUsers = (store) => {
  var users = initUsers(store)
  var limitAndOffset = 'limit=' + users.limit + '&offset=' + users.offset
  store.dispatch({
    type: 'API', component: 'User.jsx',
    service: {
      api: 'API1', name: 'users', request: { method: 'GET', endpoint: '/user/list?' + limitAndOffset}
    }
  })
}

const searchUsers = (store, search) => {
  var users = initUsers(store)
  var limitAndOffset = 'limit=' + users.limit + '&offset=' + users.offset
  store.dispatch({
    type: 'API', component: 'User.jsx',
    service: {
      api: 'API1', name: 'users',
      request: { method: 'GET', endpoint: '/user/list?' + limitAndOffset + '&name=' + search}, // search by name
    },
    nextAction: {
      type: 'API', component: 'User.jsx',
      service: {
        api: 'API1', name: 'users',
        request: { method: 'GET', endpoint: '/user/list?' + limitAndOffset + '&email=' + search} // search by name_shop
      }
    }
  })
}

/*************************** THIS COMPONENT ***********************************/

const User = ({store}) => {
  var users = initUsers(store)
  jQuery(document).ready(function($){ if (users.total == 0) getUsers(store) })

  return (
    <div className="main-panel">

      <Navigation store={store} />

      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header" data-background-color="purple">
                  <h4 className="title">User List</h4>
                  <p className="category">Display and manage users information</p>
                </div>
                <div className="card-content table-responsive">
                  <div className="card-title">
                    <button className="btn btn-info" onClick={e => {
                        store.dispatch({ type: 'PUSH', component: 'UserNew.jsx' }) }
                    }>

                    <i className="material-icons">store</i> &nbsp;&nbsp; New User</button>

                  <form className="navbar-form navbar-right" role="search"
                      style={{ marginTop: '-20px', marginLeft: '-30px', marginRight: '0px' }}
                      onSubmit={e => {
                        searchUsers(store, document.getElementById('search').value)
                        e.preventDefault()
                      }}>

                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search" id="search" />
                        <span className="material-input"></span>
                      </div>
                      <button type="submit" className="btn btn-white btn-round btn-just-icon"
                        style={{ marginTop: '30px', marginLeft: '-10px' }}>
                        <i className="material-icons">search</i><div className="ripple-container"></div>
                      </button>
                    </form>
                  </div>
                  <table className="table">
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        users.list.map(function(value, index){
                        return (
                          <tr key={index}>
                            <td>{value.name}</td>
                            <td>{value.email}</td>
                            <td>{value.phone}</td>
                            <td className="td-actions text-right">
                              <button type="button" rel="tooltip" className="btn btn-sm btn-info" data-original-title="" title="">
                                <i className="material-icons">store</i>
                              </button>
                              <button type="button" rel="tooltip" className="btn btn-sm btn-success" data-original-title="" title="">
                                <i className="material-icons">edit</i>
                              </button>
                              <button type="button" rel="tooltip" className="btn btn-sm btn-danger" data-original-title="" title="">
                                <i className="material-icons">close</i>
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="card-content">
                  <div className="row">
                    <div className="col-sm-5">
                      Record 1-10 of {users.total}
                    </div>
                    <div className="col-sm-7">
                      <ul className="pagination pagination-info">
                        <li><a href="javascript:void(0);"> prev</a></li>
                        <li><a href="javascript:void(0);">1</a></li>
                        <li><a href="javascript:void(0);">next </a></li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(User)
