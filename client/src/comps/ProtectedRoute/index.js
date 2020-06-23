import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const ProtectedRoute = ({ component: Component, token, ...rest }) => (
  <Route {...rest} render={(props) => (
    !!token
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const mapStateToProps = (state) => ({
  token: state.globalState.token
})

export default connect(mapStateToProps)(ProtectedRoute)
