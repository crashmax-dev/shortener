import { prisma } from '@libs/prisma'
import { rateLimit } from '@libs/rate-limit'
import { validateURL } from '@libs/validate-url'
import { getUserSession } from './users'
import type { NextApiHandler } from 'next'

const limiter = rateLimit({
  interval: 60 * 60 * 1000,
  uniqueTokenPerInterval: 100
})

const handler: NextApiHandler = async (req, res) => {
  if (!validateURL(req.body.url)) {
    return res.status(400).json({ error: 'Invalid URL' })
  }

  try {
    await limiter.check(res, 10, 'CACHE_TOKEN')
  } catch (err) {
    return res.status(429).json({ error: 'Rate limit exceeded' })
  }

  try {
    const session = await getUserSession(req)
    const link = await prisma.link.create({
      data: {
        url: req.body.url,
        slug: req.body.slug ?? Math.random().toString(16).slice(2),
        userId: session!.id
      }
    })

    return res.status(201).json(link)
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export default handler
