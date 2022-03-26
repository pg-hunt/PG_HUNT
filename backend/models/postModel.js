import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      lat: {
        type: String,
        required: true,
      },
      long: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    types: [
      {
        share: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    gender: {
      type: String,
      enum: ['Boys', 'Girls', 'Both'],
      required: true,
    },
    meal: {
      weekdays: [
        {
          type: String,
          enum: ['Breakfast', 'Lunch', 'Dinner'],
          required: true,
        },
      ],
      weekends: [
        {
          type: String,
          enum: ['Breakfast', 'Lunch', 'Dinner'],
          required: true,
        },
      ],
      options: {
        type: String,
        enum: ['Veg-Only', 'Non-Veg'],
        required: true,
      },
    },
    maintenance: {
      type: Number,
      required: true,
    },
    gateOpen: {
      type: String,
      default: '00:00',
    },
    gateClose: {
      type: String,
      default: '23:59',
    },
    amenities: {
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
    contact: [{ type: Number, required: true }],
    media: [{ type: String, required: true }],
    createdBy: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: false,
        ref: 'User',
      },
      userName: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
