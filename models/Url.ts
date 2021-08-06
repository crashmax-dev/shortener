import crypto from 'crypto'
import mongoose, { Schema, model } from 'mongoose'
import isValidUrl from '~/lib/valid-url'

export interface IUrl {
  url: string
  slug: string
  timestamp: number
}

const UrlSchema = new Schema({
  url: {
    type: String,
    validate: {
      validator: (url: string) => isValidUrl(url)
    }
  },
  slug: {
    type: String,
    default: () => crypto.randomBytes(4).toString('hex')
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.Url || model<IUrl>('Url', UrlSchema)