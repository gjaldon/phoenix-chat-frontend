import React from "react"
import cssModules from "react-css-modules"
import { Presence } from "phoenix"
import { connect } from "react-redux"
import style from "./style.css"

export const Sidebar = props => {
  const listBy = (id, { metas: [first, ...rest] }) => {
    first.count = rest.length + 1
    first.id = id
    return first
  }

  const list = Presence.list(props.presences, listBy)
    .filter(({ id }) => { return id !== props.user.id })
    .map(({ id }) => {
      return (
        <div
          key={id}>
          { id }
        </div>
      )
    })

  return (
    <div className={style.sidebar}>
      { list }
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(cssModules(Sidebar, style))
