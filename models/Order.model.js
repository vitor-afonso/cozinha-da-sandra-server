// jshint esversion:9

const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    deliveryDate: {
      type: Date,
      required: true,
    },
    deliveryMethod: {
      type: String,
      enum: ['delivery', 'takeAway'],
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'confirmed'],
      default: 'pending',
    },
    paid: {
      type: Boolean,
      default: false,
    },
    contact: {
      type: String,
    },
    address: {
      type: String,
    },
    deliveryFee: {
      type: Number,
    },
    amountForFreeDelivery: {
      type: Number,
    },
    deliveryDiscount: {
      type: Boolean,
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
