// jshint esversion:9
const router = require('express').Router();
const mongoose = require('mongoose');
const Item = require('../models/Item.model');

router.get('/', async (req, res, next) => {
  try {
    const response = await Item.find({ active: true });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Algo correu mal ao carregar os items da base de dados:', error });
  }
});

module.exports = router;
