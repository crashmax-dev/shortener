import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import type { AppProps } from 'next/app'

type Props = AppProps<{
  session: Session
}>

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: Props) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
