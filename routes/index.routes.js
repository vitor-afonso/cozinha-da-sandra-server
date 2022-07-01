// jshint esversion:9

const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User.model');
const Item = require('../models/Item.model');

/************************** HOME *********************************/

router.get('/', async (req, res, next) => {
  try {
    const response = await Item.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Algo correu mal ao carregar os items da base de dados:', error });
  }
});

module.exports = router;
