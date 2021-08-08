import React from 'react'
import Icon from './Icons'

const Anchor: React.FC = () => {
  const onClick = () => {
    document.querySelector('#history').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <div
      onClick={onClick}
      className="chevron-button"
    >
      <Icon.Chevron />
    </div>
  )
}

export default Anchor