module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      first_name: {
        type: String,
        required: true,
        trim: true
      },
      last_name: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        trim: true,
        lowercase: true,
        validate: {
          validator: function (v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) // Basic email validation
          },
          message: (props) => `${props.value} is not a valid email!`
        }
      },
      password: {
        type: String,
        required: true
      },
      role: {
        type: String,
        enum: ['User', 'Admin'], // Example roles
        default: 'User' // Default role
      }
    },
    { timestamps: true }
  )

  // Customize toJSON method to hide certain fields
  schema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const User = mongoose.model('User', schema)

  return User
}
