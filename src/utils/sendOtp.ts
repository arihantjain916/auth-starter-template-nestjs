import axios from 'axios';
import nodemailer from 'nodemailer';

export async function sendEmail(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 465,
    secure: true,
    auth: {
      user: 'connect@thedesignethos.com', // the email you used to create app password
      pass: 'Sdesign123!', // your generated app password
    },
  });

  const mailOptions = {
    from: 'connect@thedesignethos.com',
    to: email,
    subject: 'Your login code for THE DESIGN ETHOS',
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <p>Hello,</p>

      <p>Your one-time password (OTP) to log in to <strong>THE DESIGN ETHOS</strong> is:</p>

      <h2 style="letter-spacing: 4px; color: #000;">${otp}</h2>

      <p>This code is valid for 10 minutes.</p>

      <p style="color: #d9534f;"><strong>For your security, do not share this code with anyone.</strong></p>

      <p>If you didn’t request this login, you can safely ignore this email/message.</p>

      <br/>
      <p>—<br/><strong>THE DESIGN ETHOS</strong></p>
    </div>
  `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email: ', error);
      return false;
    } else {
      console.log('Email sent: ', info.response);
      return true;
    }
  });
}

export async function sendSMS(phone: string, otp: string) {
  try {
    const smsString =  `Welcome to THE DESIGN ETHOS. 

Your login OTP is: ${otp}
Valid for 10 minutes. 

For security, do not share this code with anyone.`
    const payload = {
      listsms: [
        {
          sms: smsString,
          mobiles: phone,
          senderid: process.env.SMS_SENDER_ID,
          tempid: process.env.SMS_TEMP_ID,
          entityid: process.env.SMS_ENTITY_ID,
          unicode: '0',
        },
      ],
    };

    const url = 'https://api.celitix.com/rest/sms/sendsms';

    const res = await axios.post(url, payload, { headers: { 'Content-Type': 'application/json', key: process.env.CELITIX_KEY } });

    console.log("sms-res", res?.data);
  } catch (e) {
    console.log('sms-error', e.message);
  }
}
