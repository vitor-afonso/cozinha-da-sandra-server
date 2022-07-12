// jshint esversion:9

const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User.model');
const { isAuthenticated } = require('./../middleware/jwt.middleware');

/************************** GET ALL USERS *********************************/

router.get('/users', isAuthenticated, async (req, res, next) => {
  try {
    const response = await User.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Algo correu mal ao carregar os users da base de dados:', error });
  }
});

/************************** GET ONE USER *********************************/

router.get('/users/:userId', isAuthenticated, async (req, res, next) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(401).json({ message: 'Specified id is not valid' });
      return;
    }

    let response = await User.findById(userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Algo correu mal ao carregar 1 user da base de dados:', error });
  }
});

/************************** UPDATE USER *********************************/

router.put('/users/edit/:userId', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(401).json({ message: 'O userId especificado não é valido.' });
      return;
    }

    let response = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).json({ message: `User actualizado com sucesso => ${response}.` });
  } catch (error) {
    res.status(500).json({ message: 'Algo correu mal ao actualizar user na base de dados:', error });
  }
});

/************************** DELETE USER *********************************/

router.put('/users/delete/:userId', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(401).json({ message: 'O id especificado não é valido.' });
      return;
    }

    let response = await User.findByIdAndUpdate(userId, req.body, { new: true });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Algo correu mal ao apagar user na base de dados:', error });
  }
});

module.exports = router;
