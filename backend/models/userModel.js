import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  posts: [
    {
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
      postName: {
        type: String,
      },
    },
  ],
  wishlist: [
    {
      pgId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
      pgName: {
        type: String,
      },
      pgAddress: {
        type: String,
      },
      pgAmenities: {
        laundry: {
          type: Boolean,
          default: false,
        },
        refrigerator: {
          type: Boolean,
          default: false,
        },
        tv: {
          type: Boolean,
          default: false,
        },
        wifi: {
          type: Boolean,
          default: false,
        },
        bed: {
          type: Boolean,
          default: false,
        },
      },
      pgPhoto: {
        type: String,
      },
    },
  ],
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;
