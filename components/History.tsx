import React, { Dispatch, Fragment, KeyboardEvent, MouseEvent } from 'react'
import Icon from './Icons'
import { IUrl } from '~/models/Url'
import ClipboardButton from './Clipboard'

export interface HistoryProps {
  history: IUrl[]
  setHistory: Dispatch<React.SetStateAction<IUrl[]>>
}

const History: React.FC<HistoryProps> = ({ history, setHistory }) => {
  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
  }

  const onClick = (slug: string) => {
    window.open(window.location.href + slug, '_blank')
  }

  const onMouseEnter = (e: MouseEvent<HTMLInputElement>, slug: string) => {
    e.currentTarget.value = window.location.href + slug
  }

  const onMouseLeave = (e: MouseEvent<HTMLInputElement>) => {
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
    <Fragment>
      {history.length > 0 &&
        <div className="history-container" id="history">
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
              className="button-border-full"
            >
              Clear history
            </button>
          </div>
        </div>
      }
    </Fragment>
  )
}

export default History