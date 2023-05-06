import validator from 'validator'
import * as yup from 'yup'

export function validateURL(url: string, host?: string) {
  return yup
    .object({
      url: yup
        .string()
        .trim()
        .required()
        .test('is-url', (value) => {
          try {
            const url = new URL(value)

            if (url.host === (host || window?.location.host)) {
              return false
            }

            return validator.isURL(value, {
              protocols: ['http', 'https']
            })
          } catch {
            return false
          }
        })
    })
    .isValidSync({ url })
}
