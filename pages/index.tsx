import React, {
  useRef,
  useState,
  useEffect,
  MouseEvent,
  ChangeEvent,
  KeyboardEvent
} from 'react'
import { IUrl } from '~/models/Url'
import isValidUrl from '~/lib/valid-url'
import Icon from '~/components/Icons'
import Clipboard from '~/components/Clipboard'

interface ApiReponse extends Partial<IUrl> {
  ok: boolean
  message: string
}

export default function Index() {
  const input = useRef<HTMLInputElement>()
  const inputGroup = useRef<HTMLDivElement>()
  const [url, setUrl] = useState('')
  const [isCopy, setCopy] = useState(false)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<IUrl[]>([])

  useEffect(() => {
    const data = window.localStorage.getItem('history')
    data && setHistory(JSON.parse(data))

    inputGroup.current.addEventListener('animationend', () => {
      inputGroup.current.classList.remove('input-shake')
    })
  }, [])

  const updateHistory = ({ url, slug, timestamp }: ApiReponse) => {
    history.unshift({ url, slug, timestamp })
    window.localStorage.setItem('history', JSON.stringify(history))
  }

  const inputSubmitEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isCopy && e.keyCode === 13) {
      createShorten()
    }
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    setCopy(false)
  }

  const inputShake = () => {
    inputGroup.current.classList.add('input-shake')
  }

  const createShorten = async () => {
    try {
      if (!isValidUrl(input.current.value)) {
        return inputShake()
      }

      setLoading(true)

      const response = await fetch('/api/shortener', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: url
        })
      })

      const data = await response.json() as ApiReponse

      if (data.ok) {
        updateHistory(data)
        setUrl(window.location.href + data.slug)
        setCopy(true)
      } else {
        inputShake()
      }
    } catch (err) {
      alert(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="main-container">
        <Icon.Github />
        <div>
          <div className="container title-container">
            <h1>URL Shortener</h1>
          </div>
          <div className="input-form">
            <div className="input-group" ref={inputGroup}>
              <input
                ref={input}
                value={url}
                type="text"
                autoComplete="off"
                className="form-control"
                placeholder="Shorten your link"
                onChange={handleInput}
                onKeyDown={inputSubmitEnter}
              />
              <div className="input-group-append">
                {isCopy ?
                  <Clipboard text={url}>
                    <Icon.Copy />
                  </Clipboard>
                  :
                  <button onClick={createShorten}>
                    {loading ? <Icon.Loading /> : <Icon.Send />}
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="secondary-container">
        {history.map(({ url, slug, timestamp }, key) => (
          <div key={key} className="input-form">
            <div className="input-group">
              <input
                type="text"
                defaultValue={url}
                className="form-control border-reverse pointer"
                onKeyPress={e => e.preventDefault()}
                onMouseEnter={(e: MouseEvent<HTMLInputElement>) => {
                  e.currentTarget.value = window.location.href + slug
                }}
                onMouseLeave={(e: MouseEvent<HTMLInputElement>) => {
                  e.currentTarget.value = url
                }}
                onClick={() => {
                  window.open(window.location.href + slug, '_blank')
                }}
              />
              <div className="input-group-append">
                <button className="border-none tooltip">
                  <Icon.Info />
                  <div className="tooltip-text">
                    <p>Slug: {slug}</p>
                    <p>Created: {new Date(timestamp).toLocaleString()}</p>
                  </div>
                </button>
                <Clipboard
                  className="border-reverse"
                  text={window.location.href + slug}
                >
                  <Icon.Copy />
                </Clipboard>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}