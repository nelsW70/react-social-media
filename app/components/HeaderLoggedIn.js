import React, { useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import DispatchContext from '../DispatchContext'
import StateContext from '../StateContext'
import ReactTooltip from 'react-tooltip'

function HeaderLoggedIn(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  function handleLogout(e) {
    appDispatch({ type: 'logout' })
    appDispatch({
      type: 'flashMessage',
      value: 'You have successfully logged out.'
    })
    props.history.push('/')
  }

  function handlerSearchIcon(e) {
    e.preventDefault()
    appDispatch({ type: 'openSearch' })
  }

  return (
    <div className="flex-row my-3 my-md-0">
      <a
        data-for="search"
        data-tip="Search"
        onClick={handlerSearchIcon}
        className="text-white mr-2 header-search-icon"
        role="search"
      >
        <i className="fas fa-search"></i>
      </a>
      <ReactTooltip place="bottom" id="search" class="custom-tooltip" />{' '}
      <span
        onClick={() => appDispatch({ type: 'toggleChat' })}
        data-for="chat"
        data-tip="Chat"
        className={
          'mr-2 header-chat-icon ' +
          (appState.unreadChatCount ? 'text-danger' : 'text-white')
        }
      >
        <i className="fas fa-comment"></i>
        {appState.unreadChatCount ? (
          <span className="chat-count-badge text-white">
            {appState.unreadChatCount < 10 ? appState.unreadChatCount : '9+'}
          </span>
        ) : (
          ''
        )}
      </span>
      <ReactTooltip place="bottom" id="chat" class="custom-tooltip" />{' '}
      <Link
        data-for="profile"
        data-tip="My Profile"
        to={`/profile/${appState.user.username}`}
        className="mr-2"
      >
        <img
          className="small-header-avatar"
          src={appState.user.avatar}
          alt="user avatar"
        />
      </Link>
      <ReactTooltip place="bottom" id="profile" class="custom-tooltip" />{' '}
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>{' '}
      <button onClick={handleLogout} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  )
}

export default withRouter(HeaderLoggedIn)
