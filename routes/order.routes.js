// jshint esversion:9

const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User.model');
const Order = require('../models/Order.model');
const { isAuthenticated } = require('./../middleware/jwt.middleware');

/************************** CREATE NEW ORDER *********************************/

router.post('/orders', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(401).json({ message: 'O userId especificado não é valido.' });
      return;
    }

    let response = await Order.create(req.body);

    await User.findByIdAndUpdate(userId, { $push: { orders: response._id } }, { new: true });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Algo correu mal ao criar order na base de dados:', error });
  }
});

/************************** GET ALL ORDERS *********************************/

router.get('/orders', isAuthenticated, async (req, res, next) => {
  try {
    const response = await Order.find({ deleted: false }).populate('userId').populate('items');
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Algo correu mal ao carregar as orders da base de dados:', error });
  }
});

/************************** GET ONE ORDER *********************************/

router.get('/orders/:orderId', isAuthenticated, async (req, res, next) => {
  const { orderId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(401).json({ message: 'Specified id is not valid' });
      return;
    }

    let response = await Order.findById(orderId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Algo correu mal ao carregar 1 order da base de dados:', error });
  }
});

/************************** UPDATE ORDER *********************************/

router.put('/orders/edit/:orderId', isAuthenticated, async (req, res, next) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(401).json({ message: 'O userId especificado não é valido.' });
      return;
    }
    let response = await Order.findByIdAndUpdate(orderId, req.body, { new: true });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Algo correu mal ao actualizar order na base de dados:', error });
  }
});

/************************** DELETE ORDER *********************************/

router.put('/orders/delete/:orderId', isAuthenticated, async (req, res, next) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(401).json({ message: 'O orderId especificado não é valido.' });
      return;
    }

    let response = await Order.findByIdAndUpdate(orderId, req.body, { new: true });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Algo correu mal ao apagar order na base de dados:', error });
  }
});

module.exports = router;
