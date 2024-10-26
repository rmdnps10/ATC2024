import mongoose, { Schema } from 'mongoose'

export const WorkSchema = new Schema({
  _id: String,
  title: String,
  thumbnailImg: String,
  category: String,
  oneLiner: String
})

export const Work = mongoose.models.Member ?? mongoose.model('Work', WorkSchema)
