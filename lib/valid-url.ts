export default function isValidUrl(string: string, host?: string) {
  let url: URL

  try {
    url = new URL(string)

    if (url.host === (host || document.location.host)) {
      throw Error()
    }
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}