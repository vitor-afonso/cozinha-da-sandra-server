// jshint esversion:9

const nodemailer = require('nodemailer');

const sendResetPass = (email, id) => {
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
    subject: 'Reset Password',
    text: `To reset your password, please click on this link, http://localhost:3000/reset/${id}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      //console.log(error);
      res.status(400).json({ message: 'Something went wrong while trying to send email => ' + error });
    } else {
      //console.log('Email Sent: ' + info.response);
      res.status(200).json({ message: 'Email enviado com sucesso.' });
    }
    //res.redirect('/login');
  });
};

exports.sendResetPass = sendResetPass;
