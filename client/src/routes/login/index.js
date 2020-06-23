import React, { Component } from 'react'
import { connect } from 'react-redux'
import arrowRight from '../../assets/icons/arrow-right.svg'
import { authenticate } from '../../state/actionCreators'
import './style.scss'

const KEY_ENTER = 13

class Login extends Component{

  state = {
    secret: process.env.REACT_APP_SI_SECRET || '',
    isValid: null
  }

  handleClick = async () => {
    if(!this.state.secret) return this.setState({ isValid: false })

    if(await this.props.authenticate(this.state.secret))
      this.props.history.push('/view/')
    else
      this.setState({ isValid: false })
  }

  handleEnter = event => {
    if(event.keyCode === KEY_ENTER)
      this.handleClick()
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { secret, isValid } = this.state
    return (
      <div className="login">
        <h1 className="logo">TRACELOG</h1>
        <div className={'form' + (isValid === false ? ' form--error'  : '')}>
          <input
            autoComplete="true"
            type="password"
            name="secret"
            className="form__input"
            placeholder="Tracelog service instance secret"
            value={secret}
            onChange={this.handleChange}
            onKeyDown={this.handleEnter}
          />
          <div className="form__btn" onClick={this.handleClick}>
            <img className="form__btn--icon" src={arrowRight} alt='' draggable={false} />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  authenticate,
}

export default connect(null, mapDispatchToProps)(Login)
