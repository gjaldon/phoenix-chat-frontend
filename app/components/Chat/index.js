import React from "react"
import cssModules from "react-css-modules"
import { Socket, Presence } from "phoenix"
import { connect } from "react-redux"
import style from "./style.css"

import Sidebar from "../Sidebar"

export class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      presences: {},
      messages: [],
      input: "",
      currentRoom: null,
      lobbyList: []
    }
    this.changeChatroom = this.changeChatroom.bind(this)
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const params = this.props.user
    this.socket = new Socket(`${process.env.SOCKET_HOST}`, { params })
    this.socket.connect()
    this.configureAdminChannel()
  }

  componentWillUnmount() {
    if (this.channel) this.channel.leave()
    if (this.adminChannel) this.adminChannel.leave()
  }

  componentDidUpdate() {
    if (this.state.messages.length > 0) {
      const lastMessage = this[`chatMessage:${this.state.messages.length - 1}`]
      this.chatContainer.scrollTop = lastMessage.offsetTop
    }
  }

  handleChange(e) {
    this.setState({ input: e.target.value })
  }

  handleMessageSubmit(e) {
    if (e.keyCode === 13 && this.state.currentRoom && this.state.input) {
      this.channel.push("message", {
        room: this.state.currentRoom,
        body: this.state.input,
        timestamp: (new Date()).getTime()
      })
      this.setState({ input: "" })
    }
  }

  changeChatroom(room) {
    this.channel = this.socket.channel(`room:${room}`)
    this.setState({
      messages: []
    })
    this.configureRoomChannel(room)
  }

  configureAdminChannel() {
    this.adminChannel = this.socket.channel("admin:active_users")

    this.adminChannel.on("presence_state", state => {
      const presences = Presence.syncState(this.state.presences, state)
      this.setState({ presences })
    })

    this.adminChannel.on("presence_diff", state => {
      const presences = Presence.syncDiff(this.state.presences, state)
      this.setState({ presences })
    })

    this.adminChannel.on("lobby_list", ({ uuid }) => {
      if (!this.state.lobbyList.includes(uuid)) {
        this.setState({ lobbyList: this.state.lobbyList.concat([uuid]) })
      }
    })

    this.adminChannel.join()
      .receive("ok", ({ lobby_list }) => {
        console.log("Succesfully joined the active_users topic.")
        this.setState({ lobbyList: lobby_list })
      })

  }

  configureRoomChannel(room) {
    this.channel.join()
      .receive("ok", ({ messages }) => {
        console.log(`Succesfully joined the ${room} chat room.`, messages)
        this.setState({
          messages,
          currentRoom: room
        })
      })
      .receive("error", () => { console.log(`Unable to join the ${room} chat room.`) })

    this.channel.on("message", payload => {
      this.setState({
        messages: this.state.messages.concat([payload])
      })
    })
  }

  renderEmpty() {
    if (this.state.currentRoom) { return null }
    return (
      <div className={style.empty}>
        No chat selected
      </div>
    )
  }

  renderMessages() {
    return this.state.messages.map(({ body, id, from }, i) => {
      if (from === this.props.user.id) {
        return (
          <div
            className={style.message}
            key={id}>
            Me: { body }
          </div>
        )
      }
      const user = from.length === 36 ? from.substring(0, 10) : from
      const msg = `${user}: ${body}`
      return (
        <div
          className={style.message}
          key={id}>
          { msg }
        </div>
      )
    })
  }

  renderInput() {
    if (!this.state.currentRoom) { return null }
    return (
      <input
        value={this.state.input}
        onKeyDown={this.handleMessageSubmit}
        onChange={this.handleChange}
        className={style.input} />
    )
  }

  render() {
    return (
      <div>
        <Sidebar
          presences={this.state.presences}
          onRoomClick={this.changeChatroom}
          lobbyList={this.state.lobbyList} />
        <div className={style.chatWrapper}>
          <div
            ref={ref => { this.chatContainer = ref }}
            className={style.chatContainer}>
            { this.renderEmpty() }
            { this.renderMessages() }
          </div>
          { this.renderInput() }
        </div>
        { this.props.children }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(cssModules(Chat, style))
