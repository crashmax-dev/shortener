import mongoose, { Schema, model } from 'mongoose'

export interface IUrl {
  url: string
  slug: string
  timestamp: number
}

const UrlSchema = new Schema({
  url: {
    type: String
  },
  slug: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.Url || model<IUrl>('Url', UrlSchema)