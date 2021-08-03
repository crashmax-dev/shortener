import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Shortener</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen">
        {children}
      </main>
    </>
  )
}