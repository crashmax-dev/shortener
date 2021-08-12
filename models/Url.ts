import crypto from 'crypto'
import mongoose, { Schema, model } from 'mongoose'

export interface IUrl {
  url: string
  slug: string
  visitors: number
  timestamp: number
}

const UrlSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    default: () => crypto.randomBytes(4).toString('hex')
  },
  visitors: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.Url || model<IUrl>('Url', UrlSchema)