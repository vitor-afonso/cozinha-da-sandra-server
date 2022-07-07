// jshint esversion:9
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/User.model');
const { sendResetPass } = require('../utils/sendResetPass');

router.post('/send-email', (req, res, next) => {
  const { from, to, subject, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cozinhadasandra22@gmail.com',
      pass: 'rnoyafqeymyepaks',
    },
  });

  let mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      //console.log(error);
      res.status(400).json({ message: 'Algo correu mal ao tentar enviar email: ' + error });
    } else {
      res.status(200).json({ message: 'Email enviado com sucesso: ' + info.response });
    }
  });
});

router.post('/forgot', async (req, res, next) => {
  const email = req.body.email;

  let foundUser = await User.findOne({ email });

  if (foundUser) {
    try {
      sendResetPass(email, foundUser._id, res);
    } catch (error) {
      res.status(400).json({ message: 'Algo correu mal ao tentar fazer enviar email de recuperação da password.', error });
    }
  } else {
    res.status(500).json({ message: 'User não encontrado.', error });
  }
});

// User clicks the link in email and go to form
// Comming from the reset-form to /reset

router.post('/reset/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const { password } = req.body;
  const saltRounds = 10;

  let foundUser = await User.findById(userId);

  if (foundUser) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
      let updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: 'Algo correu mal ao tentar actualizar a password do user.', error });
    }
  } else {
    res.status(500).json({ message: 'User não encontrado.' });
  }
});

module.exports = router;
