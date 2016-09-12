import React from "react"
import cssModules from "react-css-modules"
import { connect } from "react-redux"
import { Link } from "react-router"
import style from "./style.css"
import Actions from "../../redux/actions"

import Button from "../Button"

export class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      website: ""
    }
    this.submit = this.submit.bind(this)
  }

  submit() {
    const organization = {
      website: this.state.website,
      owner_id: this.props.user.id
    }
    this.props.dispatch(Actions.organizationNew(organization))
  }

  handleChange(input, e) {
    this.setState({ [input]: e.target.value })
  }

  renderOrganization() {
    if (!this.props.user.public_key) {
      return (
        <div className={style.inputGroup}>
          <input
            onChange={e => { this.handleChange("website", e) }}
            placeholder="Website (e.g. https://phoenixchat.io)"
            type="text"
            className={style.input} />
          <Button
            onClick={this.submit}
            style={{ marginTop: "15px" }}
            type="primary">
            Create Organization
          </Button>
        </div>
      )
    }
    return (
      <div className={style.apiKey}>
        Your API key: {this.props.user.public_key}
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className={style.nav}>
          <Link
            className={style.logo}
            to="/">
            <img
              alt="learnphoenix logo"
              className={style.image}
              src="https://s3.amazonaws.com/learnphoenix-static-assets/favicons/favicon-96x96.png" />
            <div className={style.title}>
              PhoenixChat.io
            </div>
          </Link>
          <div />
        </div>
        <div className={style.settings}>
          {this.renderOrganization()}
        </div>
      </div>
    )
  }
}

Settings.propTypes = {
  user: React.PropTypes.object,
  organization: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(cssModules(Settings, style))
