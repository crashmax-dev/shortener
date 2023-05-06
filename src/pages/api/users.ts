import { getSession } from 'next-auth/react'
import { prisma } from '@libs/prisma'
import type { NextApiHandler, NextApiRequest } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      links: true
    }
  })

  res.status(200).json(users)
}

export default handler

export async function getUserSession(req: NextApiRequest) {
  const session = await getSession({ req })
  if (session) {
    return session.user
  }

  const guestUser = await prisma.user.findFirst({
    where: {
      email: 'guest@crashmax.ru'
    }
  })

  return guestUser
}
