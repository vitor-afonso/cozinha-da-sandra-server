const router = require('express').Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken'); //<= to create and sign new JSON Web Tokens
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
      res.status(400).json({ message: 'Something went wrong while trying to send email => ' + error });
    } else {
      res.status(200).json({ message: 'Email Successfully Sent' });
    }
  });
});

router.post('/forgot', async (req, res, next) => {
  const email = req.body.email;

  let foundUser = await User.findOne({ email });

  if (foundUser) {
    try {
      sendResetPass(email, foundUser._id);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: 'Something went wrong', error });
    }
  }
});

// User clicks the link in email and go to form
// Comming from the reset form

router.post('/reset', async (req, res, next) => {
  const { userId, password } = req.body;

  let foundUser = await User.findById(userId);

  if (foundUser) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
      let updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: 'Unable to update users password', error });
    }
  } else {
    res.status(404).json({ message: 'User does not exist.', error });
  }
});

module.exports = router;
