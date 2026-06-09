// Import required packages
const nodemailer = require('nodemailer');



// Create reusable transporter object using the SMTP 


export const sendEmailAlert = async (email: string, subject: string, text: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        },

    });
    // Email options
    const mailOptions = {
        from: `"my app" <${process.env.MAIL_FROM}>`, // Sender address
        to: email, // List of receivers
        subject: subject, // Subject line
        text: text, // Plain text body 
    };
    console.log('email sended')
    // Send email
    transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            console.log('Error occurred: ' + error.message);
        }
        console.log('Email sent: ' + info.response);
    });
}