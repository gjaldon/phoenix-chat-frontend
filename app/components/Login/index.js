import React from "react"
import cssModules from "react-css-modules"
import { connect } from "react-redux"
import style from "./style.css"
import Actions from "../../redux/actions"

import { default as Button } from "../Button"

export class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
    this.submit = this.submit.bind(this)
  }

  submit() {
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.dispatch(Actions.userLogin(user))
  }

  handleChange(input, e) {
    this.setState({ [input]: e.target.value })
  }

  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.form}>
          <div className={style.inputGroup}>
            <input
              value={this.state.email}
              onChange={ e => { this.handleChange("email", e) }}
              placeholder="Email"
              className={style.input}
              type="text" />
          </div>
          <div className={style.inputGroup}>
            <input
              value={this.state.password}
              onChange={ e => { this.handleChange("password", e) }}
              placeholder="Password"
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

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(cssModules(Login, style))
