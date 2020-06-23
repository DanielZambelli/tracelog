import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import ProtectedRoute from '../ProtectedRoute'
import ViewRoute from '../../routes/view'
import LoginRoute from '../../routes/login'
import 'typeface-open-sans'
import './style.scss'

class App extends Component{
  render(){
    return (
      <div className='app'>
        <Router>
          <Switch>
            <Route path='/login' component={LoginRoute} />
            <ProtectedRoute path='/view/:tracelogId' component={ViewRoute} />
            <ProtectedRoute path='/view/' component={ViewRoute} />
            <Redirect to="/login" />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
