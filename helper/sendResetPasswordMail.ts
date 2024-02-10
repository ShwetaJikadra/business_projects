import { Request, Response } from 'express';
import * as nodemailer from 'nodemailer';
import * as randomstring from 'randomstring';

const sendResetPasswordMail = async (fname: string, email: string, resetToken: string): Promise<void> => {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.GMAIL_USER || '',
          pass: process.env.GMAIL_PASSWORD || '',
        },
        tls: {
          // Adding this option to allow the connection when using port 587
          ciphers: 'SSLv3',
        },
      });
  
      const mailOptions = {
        from: process.env.GMAIL_USER || '',
        to: email,
        subject: 'Password Reset',
        html: `<p>hiii ${fname} please copy the link and <a href="http://localhost:2020/api/user/resetPassword?resetToken=${resetToken}"> reset your password</a></p>"`,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email has been sent ', info.response);
        }
      });
    } catch (error) {
      console.log(error);
      // Handle the error accordingly
      // For example, throw the error or log it
      throw error;
    }
  };

  export default sendResetPasswordMail