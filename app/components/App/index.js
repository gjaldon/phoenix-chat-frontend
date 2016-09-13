import React from "react"
import cssModules from "react-css-modules"
import { connect } from "react-redux"
import style from "./style.css"
import Actions from "../../redux/actions"

export class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(Actions.userAuth())
  }

  render() {
    return (
      <div className={style.background}>
        <div className={style.backgroundHeader} />
        <div className={style.backgroundFooter} />
        {this.props.children}
      </div>
    )
  }
}

export default connect()(cssModules(App, style))
