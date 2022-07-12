// jshint esversion:9

const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    deliveryDate: {
      type: Date,
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected'],
      default: 'pending',
    },
    contact: {
      type: String,
    },
    address: {
      type: String,
    },
    total: {
      type: Number,
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    message: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Order', orderSchema);
