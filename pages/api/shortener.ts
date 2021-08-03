import uuid from 'short-uuid'
import Url, { IUrl } from '~/models/Url'
import connectToDatabase from '~/lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function shortener(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      if (req.body.slug) {
        const data = await findUrl(req.body.slug)

        if (!data) {
          throw new Error('Link not found')
        }

        return res.status(200).json({
          ok: true,
          url: data.url,
          slug: data.slug,
          timestamp: data.timestamp
        })
      } else if (req.body.url) {
        const { url, slug, timestamp } = await createUrl(req.body.url)

        return res.status(200).json({
          ok: true,
          url,
          slug,
          timestamp
        })
      }
    } catch (err) {
      return res.status(400).json({ ok: false, message: err.toString() })
    }
  }

  res.status(400).json({ ok: false })
}

export const findUrl = async (slug: string): Promise<IUrl | null> => {
  await connectToDatabase()
  const data = await Url.find({ slug })

  if (data.length === 0) return null

  return {
    url: data[0].url,
    slug: data[0].slug,
    timestamp: data[0].timestamp
  }
}

const createUrl = async (url: string): Promise<IUrl> => {
  await connectToDatabase()
  return await Url.create({
    url,
    slug: uuid.generate()
  })
}