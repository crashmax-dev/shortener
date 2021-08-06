import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Shortener</title>
      </Head>
      <main className="container">
        {children}
      </main>
    </>
  )
}