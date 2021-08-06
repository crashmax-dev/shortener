import { IUrl } from '~/models/Url'
import Layout from '~/components/Layout'
import Loader from '~/components/Loader'
import React, { useState, useRef, useEffect } from 'react'

interface ApiReponse extends Partial<IUrl> {
  ok: boolean
  message: string
}

export default function Index() {
  const input = useRef<HTMLInputElement>()
  const [url, setUrl] = useState('')
  const [isCopy, setCopy] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    input.current.addEventListener('animationend', () => {
      input.current.classList.remove('input_shake')
    })
  }, [])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    setCopy(false)
  }

  const clickToCopy = () => {
    input.current.select()
    document.execCommand('copy')
    input.current.focus()
  }

  const inputShake = () => {
    input.current.classList.add('input_shake')
  }

  const createShorten = async () => {
    try {
      if (!input.current.value) {
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
    <Layout>
      <input
        name="url"
        type="text"
        ref={input}
        value={url}
        autoComplete="off"
        onChange={handleInput}
        placeholder="https://..."
        style={{ marginBottom: '1rem' }}
      />
      {isCopy ?
        <button onClick={clickToCopy}>
          Copy
        </button>
        :
        <button
          disabled={loading}
          onClick={createShorten}
        >
          {loading ? <Loader /> : 'Shorten'}
        </button>
      }
    </Layout>
  )
}