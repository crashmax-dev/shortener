import * as yup from 'yup'
import validator from 'validator'

const isValidUrl = (host?: string) => yup.object({
  url: yup.string()
    .label('URL')
    .required()
    .trim()
    .test(
      'is-url',
      (value) => {
        try {
          const url = new URL(value)

          if (url.host === (host || window.location.host)) {
            return false
          }

          return validator.isURL(value, {
            protocols: ['http', 'https']
          })
        } catch (_) {
          return false
        }
      }
    )
})

const isURL = (url: string, host?: string) => {
  return isValidUrl(host).isValidSync({ url })
}

export default isURL