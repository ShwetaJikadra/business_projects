import nodemailer from 'nodemailer';
import UserCollection from '../schema/user.schema'; 
import IAsk from '../model/ask.model'; 

const sendMail = async (ask: IAsk): Promise<void> => {
  try {
    const user: any = await UserCollection.findById(ask.user);

    if (!user) {
      console.error('User not found for the ask.');
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_PASSWORD, 
      },
    });

    const seen: any[] = [];

    const mailOptions: any = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: 'Your Ask has been received',
      text: `Dear ${user.fname},\n\nAsk is sending by New User!\n\nDetails:\n${JSON.stringify(
        ask,
        (key, value) => {
          if (typeof value === 'object' && value !== null) {
            if (seen.includes(value)) return '[Circular]';
            seen.push(value);
          }
          return value;
        },
        2
      )}`,
    };

    const info: any = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);
        
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendMail;
