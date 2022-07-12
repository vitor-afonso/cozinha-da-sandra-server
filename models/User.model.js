// jshint esversion:9

const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    contact: {
      type: Number,
    },
    address: {
      type: String,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    userType: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    info: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model('User', userSchema);
