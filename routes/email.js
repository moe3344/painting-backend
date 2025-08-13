const express = require('express');
const nodemailer = require('nodemailer');
const Joi = require('joi');
const router = express.Router();

const emailSchema = Joi.object({
  to: Joi.string().email().required(),
  subject: Joi.string().min(3).max(100).required(),
  body: Joi.string().min(10).required(),
});

router.post('/send', async (req, res, next) => {
  const { error, value } = emailSchema.validate(req.body);
   console.log("hsofffffffffft", process.env.EMAIL_HOST )
    console.log( 'port', process.env.EMAIL_PORT)
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

 const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT == 465, // SendGrid supports 465 or 587
  auth: {
    user: process.env.EMAIL_USER, // should be "apikey"
    pass: process.env.EMAIL_PASS, // your actual SendGrid API key
  },
});

  const mailOptions = {
    from: 'MOE Painting <mohamad.hammoud3344@gmail.com>',
    to: 'mohamad.hammoud3344@gmail.com',
    subject: value.subject,
    text: value.body,
    html: `<div style="font-family: sans-serif; line-height: 1.6;">${value.body.replace(/\n/g, '<br>')}</div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email sending error:', err);
    next(new Error('Failed to send email.'));
  }
});

module.exports = router;