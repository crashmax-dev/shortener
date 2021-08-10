import React, { forwardRef } from 'react'
import Icon from './Icons'
import { IUrl } from '~/models/Url'
import ClipboardButton from './Clipboard'

interface HistoryProps {
  history: IUrl[]
  setHistory: React.Dispatch<React.SetStateAction<IUrl[]>>
}

const History = ({ history, setHistory }: HistoryProps, ref: React.LegacyRef<HTMLDivElement>) => {
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
  }

  const onClick = (slug: string) => {
    window.open(window.location.href + slug, '_blank')
  }

  const onMouseEnter = (e: React.MouseEvent<HTMLInputElement>, slug: string) => {
    e.currentTarget.value = window.location.href + slug
  }

  const onMouseLeave = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = ''
  }

  const clearHistory = () => {
    const isConfirm = confirm('Are you sure?')
    if (isConfirm) {
      setHistory([])
      window.localStorage.setItem('history', '[]')
    }
  }

  return (
    <div className="history-container" ref={ref}>
      {history.map(({ url, slug, timestamp }, key) => (
        <div key={key} className="input-form">
          <input
            type="text"
            placeholder={url}
            onKeyPress={onKeyPress}
            onClick={() => onClick(slug)}
            onMouseEnter={e => onMouseEnter(e, slug)}
            onMouseLeave={onMouseLeave}
            className="border-reverse pointer"
          />
          <button className="tooltip border-none">
            <Icon.Info />
            <div className="tooltip-text">
              <p>Slug: {slug}</p>
              <p>Created: {new Date(timestamp).toLocaleString()}</p>
            </div>
          </button>
          <ClipboardButton
            className="border-reverse"
            text={window.location.href + slug}
          />
        </div>
      ))}
      <div className="input-form">
        <button
          onClick={clearHistory}
          className="button-border-full border-reverse"
        >
          Clear history
        </button>
      </div>
    </div>
  )
}

export default forwardRef<HTMLDivElement, HistoryProps>(History)