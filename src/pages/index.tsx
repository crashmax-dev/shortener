import { useSession } from 'next-auth/react'

export default function IndexPage() {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    return (
      <div>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <a href="/api/auth/signout">Sign out</a>
      </div>
    )
  }

  return <a href="/api/auth/signin">Sign in</a>
}
