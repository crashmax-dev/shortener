import crypto from 'crypto'
import mongoose, { Schema, model } from 'mongoose'

export interface IUrl {
  url: string
  slug: string
  timestamp: number
}

const UrlSchema = new Schema({
  url: {
    type: String,
    validate: {
      validator: (v: string) => v.match('^(https:|http:|www\.)\S*')
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