import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  sessionToken: String,
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  googleSheetId: String,
  customColumns: [{
    header: String,
    type: {
      type: String,
      enum: ['text', 'date']
    },
    visible: Boolean
  }]
})

// Delete password field when returning JSON
userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password
    return ret
  }
})

export default mongoose.models.User || mongoose.model('User', userSchema)
