import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, SECRET_TOKEN } from '@libs/env'
import { hashPassword } from '@libs/hash-password'
import { prisma } from '@libs/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { omit } from '@zero-dependency/utils'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' },
  secret: SECRET_TOKEN,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'E-mail', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: { email: credentials?.email },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            password: true
          }
        })

        if (!user?.password) {
          return null
        }

        const hash = hashPassword(credentials!.password, SECRET_TOKEN)
        if (user.password === hash) {
          return omit(user, ['password'])
        }

        return null
      }
    }),
    GitHubProvider({
      id: 'github',
      name: 'GitHub',
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET
    })
  ],
  callbacks: {
    session({ session, user }) {
      console.log({ session, user })

      if (session.user) {
        session.user.id = user.id
      }

      return session
    }
  }
})
