const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

export const sendAlertEmail = async (email:string,subject:string,message:string) => {
    const TOKEN = process.env.EMAIL_TOKEN;
    const transport = Nodemailer.createTransport(
        MailtrapTransport({
            token: TOKEN,
        })
    );
    const sender = {
        address: "amISup@demomailtrap.co",
        name: "Am I Up",
    };
    const recipients = [
        email,
    ];
    transport
        .sendMail({
            from: sender,
            to: recipients,
            subject: subject,
            text: message,
        })
        .then(console.log, console.error);
}


