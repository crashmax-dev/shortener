import { prisma } from '@libs/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

// GET /api/users
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      createdAt: true,
      updatedAt: true
    }
  })

  return res.status(200).json(users)
}
