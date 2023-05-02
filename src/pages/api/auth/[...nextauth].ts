import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { env } from '@libs/env'
import { prisma } from '@libs/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: env.githubClientId,
      clientSecret: env.githubClientSecret
    })
  ]
})
