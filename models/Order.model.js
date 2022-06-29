// jshint esversion:9

const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    deliveryDate: {
      type: String,
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected'],
      default: 'pending',
    },
    contact: {
      type: Number,
    },
    address: {
      type: String,
      /* required: true */
    },
    total: {
      type: Number,
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    message: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Order', orderSchema);
