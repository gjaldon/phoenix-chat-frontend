import React from "react"
import cssModules from "react-css-modules"
import { connect } from "react-redux"
import style from "./style.css"
import Actions from "../../redux/actions"

import { default as Button } from "../Button"

const validInput = { borderBottom: "3px solid #4CAF50" }
const invalidInput = { borderBottom: "3px solid #F44336" }

export class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordVerify: ""
    }
    this.submit = this.submit.bind(this)
  }

  submit() {
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    this.props.dispatch(Actions.userNew(user))
  }

  handleChange(input, e) {
    this.setState({ [input]: e.target.value })
  }

  validateEmail() {
    if (this.state.email.length < 1) return {}
    return /@/.test(this.state.email) ? validInput : invalidInput
  }

  validatePassword() {
    if (this.state.password.length < 1) return {}
    if (this.state.password.length < 6) return invalidInput
    return this.state.password === this.state.passwordVerify ? validInput : invalidInput
  }

  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.form}>
          <div className={style.inputGroup}>
            <input
              onChange={e => { this.handleChange("username", e) }}
              value={this.state.username}
              placeholder="Username"
              className={style.input}
              type="text" />
          </div>
          <div className={style.inputGroup}>
            <input
              onChange={e => { this.handleChange("email", e) }}
              style={this.validateEmail()}
              value={this.state.email}
              placeholder="Email"
              className={style.input}
              type="text" />
          </div>
          <div className={style.inputGroup}>
            <input
              onChange={e => { this.handleChange("password", e) }}
              value={this.state.password}
              placeholder="Password"
              className={style.input}
              type="password" />
          </div>
          <div className={style.inputGroup}>
            <input
              onChange={e => { this.handleChange("passwordVerify", e) }}
              style={this.validatePassword()}
              value={this.state.passwordVerify}
              placeholder="Verify Password"
              className={style.input}
              type="password" />
          </div>
          <Button
            onClick={this.submit}
            _style={{ width: "100%" }}
            type="primary">
            Submit
          </Button>
        </div>
      </div>
    )
  }
}

export default connect()(cssModules(Signup, style))
