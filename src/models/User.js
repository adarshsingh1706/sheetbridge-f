import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address']
  },
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
    visible: {
      type: Boolean,
      default: true
    }
  }]
}, { 
  timestamps: true,
  // Remove duplicate index definitions
  autoIndex: false 
})

// Create indexes manually
userSchema.index({ email: 1 }, { unique: true })
userSchema.index({ 'googleTokens.expiry_date': 1 })

export default mongoose.models.User || mongoose.model('User', userSchema)
