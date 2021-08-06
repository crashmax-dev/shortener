import { IUrl } from '~/models/Url'
import Loader from '~/components/Loader'
import isValidUrl from '~/lib/valid-url'
import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent
} from 'react'
import Github from '~/components/Github'

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

  useEffect(() => {
    inputGroup.current.addEventListener('animationend', () => {
      inputGroup.current.classList.remove('input-shake')
    })
  }, [])

  const inputSubmitEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      createShorten()
    }
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    setCopy(false)
  }

  const clickToCopy = () => {
    input.current.select()
    document.execCommand('copy')
    input.current.focus()
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
    <div className="main-container">
      <Github />
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
                <button
                  onClick={clickToCopy}
                  className="btn btn-outline-light"
                >
                  Copy
                </button>
                :
                <button
                  onClick={createShorten}
                  className="btn btn-outline-light"
                >
                  {loading ? <Loader /> : 'Shorten'}
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}