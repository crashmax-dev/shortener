import React, { forwardRef } from 'react'
import { usePagination } from 'react-use-pagination'
import Icon from './Icons'
import { IUrl } from '~/models/Url'
import ClipboardButton from './Clipboard'

interface HistoryProps {
  history: IUrl[]
  setHistory: React.Dispatch<React.SetStateAction<IUrl[]>>
}

const History = ({ history, setHistory }: HistoryProps, ref: React.LegacyRef<HTMLDivElement>) => {
  const {
    currentPage,
    totalPages,
    setNextPage,
    setPreviousPage,
    nextEnabled,
    previousEnabled,
    startIndex,
    endIndex
  } = usePagination({
    initialPageSize: 20,
    totalItems: history.length
  })

  const currentItems = history.slice(
    startIndex,
    endIndex + 1
  )

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
      window.localStorage.removeItem('history')
    }
  }

  return (
    <div className="history-container" ref={ref}>
      <div className="history-links scroll-shadow">
        {currentItems.map(({ url, slug, timestamp }, key) => (
          <div key={key} className="input-form">
            <input
              type="text"
              placeholder={url}
              onKeyPress={onKeyPress}
              onClick={() => onClick(slug)}
              onMouseEnter={e => onMouseEnter(e, slug)}
              onMouseLeave={onMouseLeave}
              className="link-item border-reverse pointer"
            />
            <ClipboardButton
              className="border-reverse"
              text={window.location.href + slug}
            />
          </div>
        ))}
      </div>
      <div className="history-controls">
        <div className="pagination input-form">
          <button
            className="button-border-full border-reverse"
            onClick={setPreviousPage}
            disabled={!previousEnabled}
          >
            <Icon.ChevronLeft />
          </button>
          <button className="button-border-full border-reverse">
            {currentPage + 1} / {totalPages}
          </button>
          <button
            className="button-border-full border-reverse"
            onClick={setNextPage}
            disabled={!nextEnabled}
          >
            <Icon.ChevronRight />
          </button>
        </div>
        <div className="input-form">
          <button
            onClick={clearHistory}
            className="button-border-full border-reverse"
          >
            Clear history
          </button>
        </div>
      </div>
    </div>
  )
}

export default forwardRef<HTMLDivElement, HistoryProps>(History)