// jshint esversion:9

const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User.model');
const Item = require('../models/Item.model');
const { isAuthenticated } = require('./../middleware/jwt.middleware');

/************************** GET ALL ITEMS *********************************/

router.get('/items', isAuthenticated, async (req, res, next) => {
  try {
    const response = await Item.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Algo correu mal ao carregar os items da base de dados:', error });
  }
});

/************************** CREATE NEW ITEM *********************************/

router.post('/items', isAuthenticated, async (req, res, next) => {
  try {
    const { name, category, price, description } = req.body;

    if (!name && !category && !description && !price) {
      res.status(401).json({ message: 'Campos de item em falta.' });
      return;
    }

    let response = await Item.create(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Algo correu mal ao criar item na base de dados:', error });
  }
});

/************************** UPDATE ITEM *********************************/

router.put('/items/:itemId', isAuthenticated, async (req, res, next) => {
  try {
    const { itemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      res.status(401).json({ message: 'O id especificado não é valido.' });
      return;
    }

    let response = await Item.findByIdAndUpdate(itemId, req.body, { new: true });
    res.status(200).json({ message: `Item actualizado com sucesso => ${response}.` });
  } catch (error) {
    res.status(500).json({ message: 'Algo correu mal ao actualizar item na base de dados:', error });
  }
});

/************************** DELETE ITEM *********************************/

router.delete('/items/:itemId', isAuthenticated, async (req, res, next) => {
  try {
    const { itemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      res.status(401).json({ message: 'O id especificado não é valido.' });
      return;
    }

    await Item.findByIdAndRemove(itemId);

    res.status(200).json({ message: `Item com o id: ${itemId} foi apagado com sucesso.` });
  } catch (error) {
    res.status(500).json({ message: 'Algo correu mal ao apagar item na base de dados:', error });
  }
});

module.exports = router;
