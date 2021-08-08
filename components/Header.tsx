import React from 'react'
import Icon from './Icons'
import Anchor from './Anchor'
import { HistoryProps } from './History'

type HeaderProps = Omit<HistoryProps, 'setHistory'>

const Header: React.FC<HeaderProps> = ({ history, children }) => {
  return (
    <div className="header-container">
      <Icon.Github />
      <div className="container">
        <h1>URL Shortener</h1>
        {children}
        {history.length > 0 && <Anchor />}
      </div>
    </div>
  )
}

export default Header