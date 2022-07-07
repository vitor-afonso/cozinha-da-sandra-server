// jshint esversion:9

const nodemailer = require('nodemailer');

const sendResetPass = (email, id, res) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cozinhadasandra22@gmail.com',
      pass: 'rnoyafqeymyepaks',
    },
  });

  let mailOptions = {
    from: 'cozinhadasandra22@gmail.com',
    to: email,
    subject: 'Repor Password',
    text: `Para repor a sua password clique no link, http://localhost:3000/reset/${id}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400).json({ message: 'Algo correu mal ao enviar o email para repor password.', error });
    } else {
      res.status(200).json({ message: 'Email para repor password enviado com sucesso.', info });
    }
  });
};

exports.sendResetPass = sendResetPass;
