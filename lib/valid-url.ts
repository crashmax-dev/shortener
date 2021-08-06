export default function isValidUrl(string: string) {
  let url: URL

  try {
    url = new URL(string)

    if (url.host === document.location.host) {
      throw Error()
    }
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}