import React from "react"
import cssModules from "react-css-modules"
import { Presence } from "phoenix"
import { connect } from "react-redux"
import style from "./style.css"

export const Sidebar = (props) => {
  const listBy = (id, metas) => {
    return id
  }

  const orderByActivity = (a, b) => {
    if (a.active === b.active) return 0
    if (a.active === true) return -1
    return 1
  }

  const activeList = Presence.list(props.presences, listBy)

  const lobbyList = props.lobbyList.map(
    ({ id, name, avatar, last_viewed_by_admin_at, last_message, last_message_sent_at }) => {
    const active = activeList.includes(id)
    return {
      id,
      name,
      avatar,
      active,
      lastViewedByAdminAt: last_viewed_by_admin_at,
      lastMessage: last_message,
      lastMessageSentAt: last_message_sent_at
    }
  })

  const renderList = lobbyList
    .filter(({ id }) => { return id && id.length === 36 })
    .sort(orderByActivity)
    .map(({ id, active, name, avatar, lastMessageSentAt, lastMessage }) => {
      const newStyle = active ? { boxShadow: "inset 0px 0px 6px 4px rgba(58, 155, 207, 0.6)" } : {}
      const avatarStyle = { borderRadius: "50%", marginRight: "10px" }

      return (
        <div
          style={newStyle}
          className={style.user}
          key={id}
          onClick={() => { props.onRoomClick(id) }}>
          <img src={avatar} style={avatarStyle} />
          <div>{ name }</div>
          <div>{ lastMessage }</div>
          <span>{ lastMessageSentAt }</span>
        </div>
      )
    })

  return (
    <div className={style.sidebar}>
      <div className={style.header}>
        Search (coming soon)
      </div>
      { renderList }
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(cssModules(Sidebar, style))
