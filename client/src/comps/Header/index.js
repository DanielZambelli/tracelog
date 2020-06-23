import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Checkbox from '../Checkbox'
import { setGlobalState, clearState } from '../../state/actionCreators'
import { getTracelogCategories, getGlobalState, getTracelogCounts } from '../../state/selectors'
import './style.scss'

class Header extends Component {

  handleChange = event => {
    let value = event.target.value
    if(event.target.name === 'filterLastDays') value = parseInt(value)
    this.props.setGlobalState({ [event.target.name]: value })
  }

  handleLogoutClick = () => {
    this.props.clearState()
    this.props.history.push('/')
  }

  render(){
    const {
      categories,
      filterLastDays,
      filterCategory,
      filterError,
      filterWarnings,
      filterMessages,
      logCounts
    } = this.props
    return (
      <div className="header">
        <div className="logo">TRACELOG</div>

        <div className="filter filter__lastDays">
          <select className="select" name="filterLastDays" defaultValue={filterLastDays}  onChange={this.handleChange}>
            <option value="7">last 7 days</option>
            <option value="15">last 15 days</option>
            <option value="30">last 30 days</option>
            <option value="90">last 3 months</option>
            <option value="180">last 6 months</option>
          </select>
        </div>
        <div className="filter filter__category">
          <select className="select" name="filterCategory" defaultValue={filterCategory}  onChange={this.handleChange}>
            <option value="">Any category</option>
            <option value="+">has category</option>
            <option value="-">has no category</option>
            {categories.map((category, index) => <option key={index}>{category}</option>)}
          </select>
        </div>
        <div className="filter filter__type--error">
          <Checkbox
            name="filterError"
            label={`${logCounts.countErrors} errors`}
            checked={filterError}
            onClick={this.handleChange}
          />
        </div>
        <div className="filter filter__type--warning">
          <Checkbox
            name="filterWarnings"
            label={`${logCounts.countWarnings} warnings`}
            checked={filterWarnings}
            onClick={this.handleChange}
          />
        </div>
        <div className="filter filter__type--message">
          <Checkbox
            name="filterMessages"
            label={`${logCounts.countMessages} messages`}
            checked={filterMessages}
            onClick={this.handleChange}
          />
        </div>
        <div className="spacer" />
        <div className="link" onClick={this.handleLogoutClick}>
          Logout
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: getTracelogCategories(state),
  logCounts: getTracelogCounts(state),
  ...getGlobalState(state)
})

const mapDispatchToProps = {
  setGlobalState,
  clearState
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Header) )
