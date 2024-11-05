import mongoose, { Schema } from 'mongoose'

export const DetailWorkSchema = new Schema({
  _id: String,
  title: String,
  thumbnailImg: String,
  category: String,
  oneLiner: String,

  description: String,
  mainImg: String,
  openAddress: String,

  artistName: String,
  artistURL: String,
  artistImg: String,
  artistIntroduction: String,

  interviewText: String,
  commentList: Array
})

export const DetailWork =
  mongoose.models.DetailWork ?? mongoose.model('DetailWork', DetailWorkSchema)
