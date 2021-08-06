import Url, { IUrl } from '~/models/Url'
import rateLimit from '~/lib/rate-limit'
import connectToDatabase from '~/lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500
})

export default async function shortener(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { slug, url } = req.body

      if (slug) {
        const data = await findUrl(slug)
        if (!data) throw new Error('Url is not found!')
        return response(res, 200, data)
      }

      if (url) {
        const data = await createUrl(url)

        try {
          await limiter.check(res, 10, 'CACHE_TOKEN')
        } catch (err) {
          return res.status(429).json({
            ok: false,
            message: 'Rate limit exceeded!'
          })
        }

        return response(res, 201, data)
      }
    } catch (err) {
      return res.status(400).json({
        ok: false,
        message: err._message || err.message
      })
    }
  }

  res.status(400).json({ ok: false })
}

const response = (res: NextApiResponse, code: number, { url, slug, timestamp }: IUrl) => {
  return res.status(code).json({
    ok: true,
    url,
    slug,
    timestamp
  })
}

export const findUrl = async (slug: string): Promise<IUrl | null> => {
  await connectToDatabase()
  return Url.findOne({ slug })
}

export const createUrl = async (url: string): Promise<IUrl> => {
  await connectToDatabase()
  return await Url.create({ url })
}