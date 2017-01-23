// React libraries
import React from 'react'
import { connect } from 'react-redux'

// Includes
//import ImgSidebar from '../../theme/assets/img/sidebar-1.jpg'

// Sub-components
//import SidebarItem from './SidebarItem.jsx'

const Login = ({store, state}) => {

  return (
    <div>
    <nav className="navbar navbar-primary navbar-transparent navbar-absolute">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="javascript:void()">Material Dashboard Login</a>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="javascript:void()">
                <i className="material-icons">dashboard</i> Dashboard
              </a>
            </li>
            <li className="">
              <a href="javascript:void()">
                <i className="material-icons">person_add</i> Register
              </a>
            </li>
            <li className=" active ">
              <a href="javascript:void()">
                <i className="material-icons">fingerprint</i> Login
              </a>
            </li>
            <li className="">
              <a href="javascript:void()">
                <i className="material-icons">lock_open</i> Lock
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div className="wrapper wrapper-full-page">
      <div className="full-page login-page" filter-color="black" data-image="../../assets/img/login.jpeg">
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                <form method="#" action="#">
                  <div className="card card-login card-hidden">
                    <div className="card-header text-center" data-background-color="rose">
                      <h4 className="card-title">Login</h4>
                      <div className="social-line">
                        <a href="#btn" className="btn btn-just-icon btn-simple">
                          <i className="fa fa-facebook-square"></i>
                        </a>
                        <a href="#pablo" className="btn btn-just-icon btn-simple">
                          <i className="fa fa-twitter"></i>
                        </a>
                        <a href="#eugen" className="btn btn-just-icon btn-simple">
                          <i className="fa fa-google-plus"></i>
                        </a>
                      </div>
                    </div>
                    <p className="category text-center">
                      Or Be Classical
                    </p>
                    <div className="card-content">
                      <div className="input-group">
                        <span className="input-group-addon">
                                                  <i className="material-icons">face</i>
                                              </span>
                        <div className="form-group label-floating">
                          <label className="control-label">First Name</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="input-group">
                        <span className="input-group-addon">
                                                  <i className="material-icons">email</i>
                                              </span>
                        <div className="form-group label-floating">
                          <label className="control-label">Email address</label>
                          <input type="email" className="form-control" />
                        </div>
                      </div>
                      <div className="input-group">
                        <span className="input-group-addon">
                                                  <i className="material-icons">lock_outline</i>
                                              </span>
                        <div className="form-group label-floating">
                          <label className="control-label">Password</label>
                          <input type="password" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="footer text-center">
                      <button type="submit" className="btn btn-rose btn-simple btn-wd btn-lg">Let's go</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="container">
            <nav className="pull-left">
              <ul>
                <li>
                  <a href="#">
                                      Home
                                  </a>
                </li>
                <li>
                  <a href="#">
                                      Company
                                  </a>
                </li>
                <li>
                  <a href="#">
                                      Portfolio
                                  </a>
                </li>
                <li>
                  <a href="#">
                                      Blog
                                  </a>
                </li>
              </ul>
            </nav>
            <p className="copyright pull-right">
              &copy;
              <a href="http://www.creative-tim.com">Creative Tim</a>, made with love for a better web
            </p>
          </div>
        </footer>
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

export default connect(mapStateToProps)(Login)
