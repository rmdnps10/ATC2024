import mongoose, { Schema } from 'mongoose'
import { ObjectId } from 'mongodb'

export const DetailWorkSchema = new Schema({
  _id: ObjectId,
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
  teamName: String,

  interviewText: String,
  commentList: Array
})

export const DetailWork =
  mongoose.models.DetailWork ?? mongoose.model('DetailWork', DetailWorkSchema)
