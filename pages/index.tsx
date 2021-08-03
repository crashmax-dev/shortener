import { IUrl } from '~/models/Url'
import Layout from '~/components/Layout'
import React, { useState, useRef } from 'react'

interface ApiReponse extends Partial<IUrl> {
  ok: boolean
}

export default function Index() {
  const input = useRef<HTMLInputElement>()
  const [url, setUrl] = useState('')
  const [isCopy, setCopy] = useState(false)
  const [isSubmit, setSubmit] = useState(false)

  const toggleSubmit = () => setSubmit(!isSubmit)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') setCopy(false)
    setUrl(value)
  }

  const clickToCopy = () => {
    input.current.select()
    document.execCommand('copy')
    input.current.focus()
  }

  const createShortenUrl = async () => {
    if (!url.match('^(https:|http:|www\.)\S*')) return

    toggleSubmit()

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
      const url = window.location.href + data.slug
      setUrl(url)
      setCopy(true)
      setSubmit(false)
    }
  }

  return (
    <Layout>
      <div className="flex flex-col w-9/12 space-y-2">
        <input
          name="url"
          type="text"
          ref={input}
          value={url}
          onChange={handleInput}
          className="border rounded text-xl px-2 py-2 font-light"
        />
        {isCopy ?
          <button
            onClick={clickToCopy}
            className="bg-black text-xl font-light text-white rounded disabled:opacity-50 px-4 py-2"
          >
            Copy
          </button>
          :
          <button
            disabled={isSubmit}
            onClick={createShortenUrl}
            className="bg-black text-xl font-light text-white rounded disabled:opacity-50 px-4 py-2"
          >
            Shorten
          </button>
        }
      </div>
    </Layout>
  )
}