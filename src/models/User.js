import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
  },
  password: String, // Made optional for Google auth users
  googleTokens: {
    access_token: String,
    refresh_token: String,
    expiry_date: Number
  },
  customColumns: [{
    header: String,
    type: {
      type: String,
      enum: ['text', 'date'],
      default: 'text'
    },
    visible: Boolean
  }]
}, { timestamps: true })

// Remove duplicate index
userSchema.index({ email: 1 }, { unique: true })

export default mongoose.models.User || mongoose.model('User', userSchema)
