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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') setCopy(false)
    disableInputError()
    setUrl(value)
  }

  const disableInputError = () => {
    input.current.classList.remove('border-red-500', 'bg-red-100')
  }

  const enableInputError = () => {
    input.current.classList.add('border-red-500', 'bg-red-100')
  }

  const clickToCopy = () => {
    input.current.select()
    document.execCommand('copy')
    input.current.focus()
  }

  const createShortenUrl = async () => {
    try {
      setSubmit(true)

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
        disableInputError()
        setUrl(window.location.href + data.slug)
        setCopy(true)
      } else {
        enableInputError()
      }
    } catch (err) {
      console.log(err)
    } finally {
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
            className="bg-black text-xl font-light text-white rounded px-4 py-2"
          >
            Copy
          </button>
          :
          <button
            disabled={isSubmit}
            onClick={createShortenUrl}
            className="bg-black text-xl font-light text-white rounded px-4 py-2"
          >
            Shorten
          </button>
        }
      </div>
    </Layout>
  )
}