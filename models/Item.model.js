// jshint esversion:9

const { Schema, model } = require('mongoose');

const itemSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ['doces', 'salgados'],
    },
    price: {
      type: Number,
    },
    amount: {
      type: Number,
      default: 1,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Item', itemSchema);
