import React, {
  useRef,
  Fragment,
  useState,
  useEffect,
  KeyboardEvent
} from 'react'
import { useForm } from 'react-hook-form'
import { IUrl } from '~/models/Url'
import isURL from '~/lib/valid-url'
import Icon from '~/components/Icons'
import Header from '~/components/Header'
import History from '~/components/History'
import Clipboard from '~/components/Clipboard'

interface ApiReponse extends Partial<IUrl> {
  ok: boolean
  message?: string
}

interface FormInputs {
  url: string
}

export default function Index() {
  const formRef = useRef<HTMLFormElement>()
  const [isHasCopy, setHasCopy] = useState(false)
  const [history, setHistory] = useState<IUrl[]>([])

  const {
    reset,
    setFocus,
    register,
    getValues,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm()

  useEffect(() => {
    const data = window.localStorage.getItem('history')
    data && setHistory(JSON.parse(data))

    formRef.current.addEventListener('animationend', () => {
      formRef.current.classList.remove('input-shake')
    })

    setFocus('url')
  }, [setFocus])

  const onSubmitForm = async ({ url }: FormInputs) => {
    try {
      if (isHasCopy) {
        return
      }

      if (!isURL(url)) {
        return shakeInputField()
      }

      const response = await fetch('/api/shortener', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      })

      const data: ApiReponse = await response.json()

      if (data.ok) {
        reset({ url: window.location.href + data.slug })
        addToHistory(data)
        setHasCopy(true)
      } else {
        shakeInputField()
      }
    } catch (err) {
      alert(err)
    }
  }

  const addToHistory = ({ url, slug, timestamp }: ApiReponse) => {
    history.unshift({ url, slug, timestamp })
    window.localStorage.setItem('history', JSON.stringify(history))
  }

  const inputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isHasCopy && e.key === 'Backspace') {
      reset({ url: '' })
      setHasCopy(false)
    }
  }

  const shakeInputField = () => {
    formRef.current.classList.add('input-shake')
  }

  return (
    <Fragment>
      <Header history={history}>
        <form
          ref={formRef}
          className="input-form"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <input
            type="text"
            autoComplete="off"
            placeholder="Shorten your link"
            {...register('url')}
            onKeyDown={inputKeyPress}
          />
          {isHasCopy ?
            <Clipboard text={getValues('url')} />
            :
            <button>
              {isSubmitting ?
                <Icon.Loading /> :
                <Icon.Send />
              }
            </button>
          }
        </form>
      </Header>
      <History
        history={history}
        setHistory={setHistory}
      />
    </Fragment>
  )
}